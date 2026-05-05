// Animation loop and scene controller for the growing-vines system.
// Wires all subsystems together and drives the requestAnimationFrame loop.

import { createNoise2D } from './noise';
import { createBranchGenerator } from './branch-generator';
import { createWindSystem } from './wind-system';
import { createBlossomSystem } from './blossom-system';
import { createPetalSystem } from './petal-system';
import { createRenderer } from './renderer';
import { CONFIG } from './types';
import type { BranchState } from './types';

export interface SceneController {
  start(): void;
  destroy(): void;
}

/** Maximum deltaTime cap to prevent huge jumps on tab switch (ms). */
const MAX_DELTA = 50;

/**
 * Recursively checks whether a branch and all its children have finished growing.
 */
function isBranchDone(branch: BranchState): boolean {
  if (branch.isGrowing) return false;
  for (const child of branch.children) {
    if (!isBranchDone(child)) return false;
  }
  return true;
}

/**
 * Recursively spawns blossoms on a branch and all its children.
 */
function spawnBlossomsRecursive(
  branch: BranchState,
  blossomSystem: { spawnBlossoms(branch: BranchState, progress: number): void },
): void {
  const progress = branch.config.maxLength > 0
    ? branch.currentLength / branch.config.maxLength
    : 0;
  blossomSystem.spawnBlossoms(branch, progress);

  for (const child of branch.children) {
    spawnBlossomsRecursive(child, blossomSystem);
  }
}

/**
 * Recursively counts the total number of branches in a branch list (including children).
 */
function countBranchesRecursive(branchList: BranchState[]): number {
  let count = 0;
  for (const branch of branchList) {
    count += 1 + countBranchesRecursive(branch.children);
  }
  return count;
}

/**
 * Creates a scene controller that manages the full animation lifecycle.
 * Initializes canvas dimensions with devicePixelRatio scaling, creates all
 * subsystems with a shared procedural seed, and runs the animation loop.
 */
export function createScene(canvas: HTMLCanvasElement): SceneController {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    // Fallback: return a no-op controller if context unavailable
    return { start() {}, destroy() {} };
  }

  // --- Canvas dimension setup with DPR scaling ---
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // --- Procedural seed ---
  const seed = (Math.random() * 0xFFFFFFFF) | 0;

  // --- Create subsystems ---
  const noise = createNoise2D(seed);
  const branchGen = createBranchGenerator(noise, width, height, seed);
  const windSystem = createWindSystem(noise);
  const blossomSystem = createBlossomSystem(noise, seed + 1);
  const petalSystem = createPetalSystem(height);
  const renderer = createRenderer(ctx);

  // --- Generate initial branches ---
  const branches = branchGen.generateMainBranches();

  // --- State ---
  let phase: 'growing' | 'ambient' = 'growing';
  let elapsed = 0;
  let lastTimestamp: number | null = null;
  let animationFrameId: number | null = null;
  let visible = true;
  let observer: IntersectionObserver | null = null;
  let resizeTimeout: number | null = null;

  /**
   * Main animation tick called every frame via requestAnimationFrame.
   */
  function tick(timestamp: number): void {
    // Calculate deltaTime
    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }
    let deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    // Cap deltaTime to prevent huge jumps (e.g. tab switch)
    if (deltaTime > MAX_DELTA) {
      deltaTime = MAX_DELTA;
    }

    elapsed += deltaTime;

    // --- Growth phase ---
    if (phase === 'growing') {
      for (const branch of branches) {
        branchGen.growBranch(branch, deltaTime, elapsed);
      }

      // Spawn blossoms on all branches recursively
      for (const branch of branches) {
        spawnBlossomsRecursive(branch, blossomSystem);
      }

      // Check if all branches are done growing
      let allDone = true;
      for (const branch of branches) {
        if (!isBranchDone(branch)) {
          allDone = false;
          break;
        }
      }
      if (allDone) {
        phase = 'ambient';
      }
    }

    // --- Ambient updates (run during both phases for continuous motion) ---
    const windState = windSystem.update(elapsed);
    blossomSystem.update(windState, elapsed);
    petalSystem.update(windState, deltaTime);

    // Spawn petals from random blossom positions
    if (petalSystem.shouldSpawnPetal(windState, deltaTime)) {
      const pos = blossomSystem.getRandomBlossomPosition();
      if (pos) {
        petalSystem.spawnPetal(pos);
      }
    }

    // --- Element count limiting ---
    const branchCount = countBranchesRecursive(branches);
    const blossomCount = blossomSystem.getBlossoms().length;
    const petalCount = petalSystem.getActiveCount();
    const totalElements = branchCount + blossomCount + petalCount;

    if (totalElements > CONFIG.MAX_TOTAL_ELEMENTS) {
      const excess = totalElements - CONFIG.MAX_TOTAL_ELEMENTS;
      petalSystem.removeOldest(Math.min(excess, petalCount));
    }

    // --- Render ---
    renderer.clear();

    // Draw branches with wind sway displacement
    for (const branch of branches) {
      const sway = branchGen.getSwayDisplacement(branch, windState.force, elapsed);
      renderer.drawBranch(branch, sway);
    }

    // Draw blossoms
    const blossoms = blossomSystem.getBlossoms();
    for (const blossom of blossoms) {
      renderer.drawBlossom(blossom);
    }

    // Draw petals
    const petals = petalSystem.getPetals();
    for (const petal of petals) {
      renderer.drawPetal(petal);
    }

    // Request next frame
    animationFrameId = requestAnimationFrame(tick);
  }

  /**
   * Handles window resize by debouncing, re-initializing canvas dimensions,
   * and restarting the animation loop to fit the new viewport.
   */
  function handleResize(): void {
    if (resizeTimeout !== null) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(() => {
      resizeTimeout = null;

      // Cancel current animation frame
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      // Re-read dimensions and re-initialize canvas buffer
      const newWidth = canvas.offsetWidth;
      const newHeight = canvas.offsetHeight;
      const newDpr = window.devicePixelRatio || 1;
      canvas.width = newWidth * newDpr;
      canvas.height = newHeight * newDpr;
      ctx!.setTransform(newDpr, 0, 0, newDpr, 0, 0);

      // Restart the animation loop if currently visible
      if (visible) {
        lastTimestamp = null;
        animationFrameId = requestAnimationFrame(tick);
      }
    }, 300) as unknown as number;
  }

  function start(): void {
    // Listen for window resize to re-initialize canvas dimensions
    window.addEventListener('resize', handleResize);

    // Set up IntersectionObserver to pause/resume when canvas scrolls in/out of view
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (!visible) {
          visible = true;
          lastTimestamp = null; // reset to avoid a huge deltaTime jump
          animationFrameId = requestAnimationFrame(tick);
        }
      } else {
        visible = false;
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    }, { threshold: 0 });
    observer.observe(canvas);

    animationFrameId = requestAnimationFrame(tick);
  }

  function destroy(): void {
    window.removeEventListener('resize', handleResize);
    if (resizeTimeout !== null) {
      clearTimeout(resizeTimeout);
      resizeTimeout = null;
    }
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  return { start, destroy };
}
