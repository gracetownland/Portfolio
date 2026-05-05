// Petal physics and lifecycle management
// Implements gravity, air resistance, wind drift, and 3D tumble simulation

import { CONFIG, Petal, Vec2, WindState } from './types';

export interface PetalSystemAPI {
  update(windState: WindState, deltaTime: number): void;
  spawnPetal(position: Vec2): void;
  shouldSpawnPetal(windState: WindState, deltaTime: number): boolean;
  getPetals(): Petal[];
  getActiveCount(): number;
  removeOldest(count: number): void;
}

/**
 * Creates a petal system that manages falling petal particles with realistic physics.
 * Petals are affected by gravity, air resistance, wind drift, and simulate 3D tumbling.
 *
 * @param canvasHeight - The height of the canvas, used for fade zone calculations
 * @returns PetalSystemAPI for managing petal lifecycle
 */
export function createPetalSystem(canvasHeight: number): PetalSystemAPI {
  let petals: Petal[] = [];
  let spawnAccumulator = 0; // tracks time since last spawn in ms

  function spawnPetal(position: Vec2): void {
    const petal: Petal = {
      position: { x: position.x, y: position.y },
      velocity: {
        x: (Math.random() - 0.5),          // random horizontal: -0.5 to 0.5
        y: 0.1 + Math.random() * 0.2,      // small initial downward: 0.1-0.3
      },
      size: 2.5 + Math.random() * 2.0,     // 2.5-4.5px
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (0.02 + Math.random() * 0.04) * (Math.random() < 0.5 ? 1 : -1),
      scaleY: 1.0,
      scalePhase: Math.random() * Math.PI * 2,
      opacity: 0.7 + Math.random() * 0.3,  // 0.7-1.0
      lifetime: 999,                         // effectively infinite until fade zone
    };

    petals.push(petal);
  }

  function update(windState: WindState, deltaTime: number): void {
    const dtNorm = deltaTime / 16.67; // normalize to 60fps frame

    for (let i = petals.length - 1; i >= 0; i--) {
      const petal = petals[i];

      // Apply gravity
      petal.velocity.y += CONFIG.PETAL_GRAVITY * dtNorm;

      // Apply air resistance (damping)
      petal.velocity.x *= CONFIG.PETAL_AIR_RESISTANCE;
      petal.velocity.y *= CONFIG.PETAL_AIR_RESISTANCE;

      // Apply wind lateral drift
      petal.velocity.x += windState.force.x * 0.02 * dtNorm;

      // Increased horizontal drift during gusts
      if (windState.gustIntensity > 0.5) {
        petal.velocity.x += windState.force.x * 0.05 * windState.gustIntensity * dtNorm;
      }

      // Update position
      petal.position.x += petal.velocity.x;
      petal.position.y += petal.velocity.y;

      // Update rotation
      petal.rotation += petal.rotationSpeed;

      // Simulate 3D tumble via oscillating scaleY (cos wave)
      petal.scalePhase += 0.05 * dtNorm;
      petal.scaleY = Math.cos(petal.scalePhase);

      // Fade in bottom zone
      const fadeStart = canvasHeight * (1 - CONFIG.PETAL_FADE_ZONE);
      if (petal.position.y > fadeStart) {
        petal.opacity -= 1 / CONFIG.PETAL_FADE_FRAMES;
      }

      // Remove petals that have faded out or fallen below canvas
      if (petal.opacity <= 0 || petal.position.y > canvasHeight + 20) {
        petals.splice(i, 1);
      }
    }
  }

  function getPetals(): Petal[] {
    return petals;
  }

  function getActiveCount(): number {
    return petals.length;
  }

  function shouldSpawnPetal(windState: WindState, deltaTime: number): boolean {
    // Don't spawn if at max active count
    if (petals.length >= CONFIG.PETAL_MAX_ACTIVE) {
      return false;
    }

    // Calculate effective release rate (petals per second)
    let releaseRate = CONFIG.PETAL_RELEASE_RATE;
    if (windState.gustIntensity > 0.5) {
      releaseRate *= CONFIG.PETAL_GUST_RATE_MULTIPLIER;
    }

    // Interval between spawns in ms
    const spawnInterval = 1000 / releaseRate;

    // Accumulate time
    spawnAccumulator += deltaTime;

    // Check if enough time has passed to spawn
    if (spawnAccumulator >= spawnInterval) {
      spawnAccumulator -= spawnInterval;
      return true;
    }

    return false;
  }

  function removeOldest(count: number): void {
    if (count <= 0) return;
    petals.splice(0, Math.min(count, petals.length));
  }

  return {
    update,
    spawnPetal,
    shouldSpawnPetal,
    getPetals,
    getActiveCount,
    removeOldest,
  };
}
