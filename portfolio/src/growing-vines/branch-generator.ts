import type { NoiseFn2D, Vec2, BranchState, BranchConfig, BezierSegment } from './types';
import { CONFIG } from './types';

export interface BranchGeneratorAPI {
  generateMainBranches(): BranchState[];
  growBranch(branch: BranchState, deltaTime: number, elapsed: number): void;
  getSwayDisplacement(branch: BranchState, windForce: Vec2, time: number): Vec2;
}

/**
 * Mulberry32 seeded PRNG — produces values in [0, 1).
 */
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a random number in [min, max) using the provided RNG.
 */
function randRange(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

/**
 * Creates a branch generator that produces procedurally unique branch layouts.
 *
 * @param noise - 2D simplex noise function for organic variation
 * @param canvasWidth - Canvas width in pixels
 * @param canvasHeight - Canvas height in pixels
 * @param seed - Procedural seed for deterministic randomization
 */
export function createBranchGenerator(
  noise: NoiseFn2D,
  canvasWidth: number,
  canvasHeight: number,
  seed: number
): BranchGeneratorAPI {
  const rng = mulberry32(seed);

  function generateMainBranches(): BranchState[] {
    const branchCount = Math.floor(
      randRange(rng, CONFIG.MAIN_BRANCH_COUNT_MIN, CONFIG.MAIN_BRANCH_COUNT_MAX + 1)
    );

    const branches: BranchState[] = [];

    // Split branches roughly evenly between left and right edges
    const leftCount = Math.ceil(branchCount / 2);
    const rightCount = branchCount - leftCount;

    // Distribute Y positions evenly with slight randomization to avoid clumping
    const leftYPositions = distributePositions(leftCount, CONFIG.START_Y_MIN, CONFIG.START_Y_MAX);
    const rightYPositions = distributePositions(rightCount, CONFIG.START_Y_MIN, CONFIG.START_Y_MAX);

    // Generate left-side branches (x = 0, angle pointing inward toward center)
    for (let i = 0; i < leftCount; i++) {
      const startY = leftYPositions[i] * canvasHeight;
      // Point generally inward with more variation: ±40° from horizontal
      const initialAngle = randRange(rng, -0.7, 0.7);
      const maxLength = randRange(rng, CONFIG.MAX_LENGTH_MIN, CONFIG.MAX_LENGTH_MAX) * canvasWidth;
      const baseThickness = randRange(rng, CONFIG.BASE_THICKNESS_MIN, CONFIG.BASE_THICKNESS_MAX);
      const growthSpeed = randRange(rng, 0.9, 1.1);
      const noiseOffsetX = rng() * 1000;
      const noiseOffsetY = rng() * 1000;

      const config: BranchConfig = {
        startX: -5, // slightly off-screen so base is hidden
        startY,
        initialAngle,
        maxLength,
        baseThickness,
        growthSpeed,
        depth: 0,
        noiseOffsetX,
        noiseOffsetY,
      };

      branches.push(createBranchState(config));
    }

    // Generate right-side branches (x = canvasWidth, angle pointing inward toward center)
    for (let i = 0; i < rightCount; i++) {
      const startY = rightYPositions[i] * canvasHeight;
      // Point generally inward with more variation: ±40° from horizontal
      const initialAngle = Math.PI + randRange(rng, -0.7, 0.7);
      const maxLength = randRange(rng, CONFIG.MAX_LENGTH_MIN, CONFIG.MAX_LENGTH_MAX) * canvasWidth;
      const baseThickness = randRange(rng, CONFIG.BASE_THICKNESS_MIN, CONFIG.BASE_THICKNESS_MAX);
      const growthSpeed = randRange(rng, 0.9, 1.1);
      const noiseOffsetX = rng() * 1000;
      const noiseOffsetY = rng() * 1000;

      const config: BranchConfig = {
        startX: canvasWidth + 5, // slightly off-screen so base is hidden
        startY,
        initialAngle,
        maxLength,
        baseThickness,
        growthSpeed,
        depth: 0,
        noiseOffsetX,
        noiseOffsetY,
      };

      branches.push(createBranchState(config));
    }

    return branches;
  }

  /**
   * Distributes N positions evenly within [min, max] with slight jitter.
   */
  function distributePositions(count: number, min: number, max: number): number[] {
    if (count <= 0) return [];
    if (count === 1) return [min + (max - min) * 0.5];
    const positions: number[] = [];
    const step = (max - min) / (count + 1);
    for (let i = 1; i <= count; i++) {
      // Even distribution with ±10% jitter
      const base = min + step * i;
      const jitter = (rng() - 0.5) * step * 0.3;
      positions.push(Math.max(min, Math.min(max, base + jitter)));
    }
    return positions;
  }

  function createBranchState(config: BranchConfig, spawnDelay: number = 0): BranchState {
    return {
      config,
      segments: [],
      currentLength: 0,
      isGrowing: true,
      tipPosition: { x: config.startX, y: config.startY },
      tipAngle: config.initialAngle,
      swayOffset: { x: 0, y: 0 },
      children: [],
      blossomSlots: [],
      spawnDelay,
    };
  }

  /** Segment length target in pixels */
  const SEGMENT_LENGTH = 12; // ~10-15px per segment
  /** Maximum angle perturbation from noise (radians) — organic undulation */
  const NOISE_ANGLE_SCALE = 0.25;
  /** Noise sampling frequency along branch length */
  const NOISE_FREQUENCY = 0.02;
  /** How often to record a blossom slot (every N segments) */
  const BLOSSOM_SLOT_INTERVAL = 5;

  function growBranch(branch: BranchState, deltaTime: number, elapsed: number): void {
    if (!branch.isGrowing) return;

    // Handle spawn delay: decrement and skip growth until delay expires
    if (branch.spawnDelay > 0) {
      branch.spawnDelay--;
      return;
    }

    const { config } = branch;

    // Calculate growth progress (0 to 1)
    const progress = branch.currentLength / config.maxLength;

    // --- Ease-in acceleration at growth start ---
    // When progress < GROWTH_EASE_IN_DURATION, apply smooth ease-in curve
    // Use a minimum factor of 0.1 so growth can always start
    let easeInFactor = 1.0;
    if (progress < CONFIG.GROWTH_EASE_IN_DURATION) {
      const t = progress / CONFIG.GROWTH_EASE_IN_DURATION;
      easeInFactor = Math.max(0.1, t * t); // quadratic ease-in with minimum
    }

    // --- Noise-based speed variation ---
    // Low-frequency noise creates natural growth spurts
    const noiseSpeedVariation = 0.7 + 0.3 * noise(
      config.noiseOffsetX + elapsed * 0.001,
      config.noiseOffsetY + 100
    );

    // Calculate how many pixels to grow this frame
    // growthSpeed is a multiplier (~0.8-1.2), base rate ~120px/s
    const baseGrowthRate = 120; // px per second
    const growthThisFrame = config.growthSpeed * baseGrowthRate * (deltaTime / 1000)
      * easeInFactor * noiseSpeedVariation;

    let remainingGrowth = growthThisFrame;

    while (remainingGrowth > 0 && branch.currentLength < config.maxLength) {
      // Determine segment length (don't overshoot maxLength)
      const distToEnd = config.maxLength - branch.currentLength;
      const segLen = Math.min(SEGMENT_LENGTH, remainingGrowth, distToEnd);

      if (segLen <= 0) break;

      // Sample noise for angle variation — perturbation around the initial direction
      // This prevents branches from spiraling; they stay generally on course
      const noiseVal = noise(
        config.noiseOffsetX + branch.currentLength * NOISE_FREQUENCY,
        config.noiseOffsetY
      );
      // Angle is the initial direction + gentle noise perturbation
      // The perturbation is relative to the initial angle, not accumulated
      const angleVariation = noiseVal * NOISE_ANGLE_SCALE;
      const newAngle = config.initialAngle + angleVariation;

      // Calculate the end point of this segment
      const endX = branch.tipPosition.x + Math.cos(newAngle) * segLen;
      const endY = branch.tipPosition.y + Math.sin(newAngle) * segLen;
      const endPoint: Vec2 = { x: endX, y: endY };

      // Calculate control points for a smooth cubic Bezier
      // cp1 extends from start in the direction of the current tip angle
      // cp2 extends back from end in the direction of the new angle
      const cp1Distance = segLen * 0.4;
      const cp2Distance = segLen * 0.4;

      const cp1: Vec2 = {
        x: branch.tipPosition.x + Math.cos(branch.tipAngle) * cp1Distance,
        y: branch.tipPosition.y + Math.sin(branch.tipAngle) * cp1Distance,
      };
      const cp2: Vec2 = {
        x: endX - Math.cos(newAngle) * cp2Distance,
        y: endY - Math.sin(newAngle) * cp2Distance,
      };

      // Calculate thickness using cubic easing taper
      const progress = (branch.currentLength + segLen) / config.maxLength;
      const cubicTaper = 1 - progress * progress * progress;
      const thickness = Math.max(
        config.baseThickness * cubicTaper,
        CONFIG.TIP_THICKNESS_MIN
      );

      const segment: BezierSegment = {
        start: { x: branch.tipPosition.x, y: branch.tipPosition.y },
        cp1,
        cp2,
        end: endPoint,
        thickness,
      };

      branch.segments.push(segment);
      branch.currentLength += segLen;
      branch.tipPosition = endPoint;
      branch.tipAngle = newAngle;
      remainingGrowth -= segLen;

      // Record blossom slot periodically (every BLOSSOM_SLOT_INTERVAL segments)
      if (branch.segments.length % BLOSSOM_SLOT_INTERVAL === 0) {
        branch.blossomSlots.push({ x: endPoint.x, y: endPoint.y });
      }

      // --- Sub-branch spawning logic ---
      // Only spawn if we haven't exceeded max depth
      if (config.depth < CONFIG.MAX_DEPTH) {
        // Spawn earlier and more frequently
        const spawnProbability = progress >= 0.15
          ? 0.04 * progress
          : 0;

        if (spawnProbability > 0 && rng() < spawnProbability) {
          // Stagger sub-branch start with randomized delay of 5-20 frames
          const delay = Math.floor(randRange(rng, CONFIG.SPAWN_DELAY_MIN, CONFIG.SPAWN_DELAY_MAX + 1));
          const childBranch = spawnSubBranch(branch, newAngle, endPoint, progress, delay);
          branch.children.push(childBranch);
        }
      }
    }

    // Check if branch has finished growing
    if (branch.currentLength >= config.maxLength) {
      branch.isGrowing = false;
    }

    // Recursively grow all children that are currently growing
    for (const child of branch.children) {
      if (child.isGrowing) {
        growBranch(child, deltaTime, elapsed);
      }
    }
  }

  /**
   * Spawns a sub-branch from the parent at the given position and angle.
   * Divergence angle is 20-55 degrees from parent tangent, randomly left or right.
   * Length is reduced per depth level, thickness is halved.
   */
  function spawnSubBranch(
    parent: BranchState,
    parentAngle: number,
    spawnPosition: Vec2,
    _progress: number,
    delay: number
  ): BranchState {
    const childDepth = parent.config.depth + 1;

    // Choose divergence angle between SUB_BRANCH_ANGLE_MIN and SUB_BRANCH_ANGLE_MAX degrees
    const divergenceDeg = randRange(rng, CONFIG.SUB_BRANCH_ANGLE_MIN, CONFIG.SUB_BRANCH_ANGLE_MAX);
    const divergenceRad = divergenceDeg * (Math.PI / 180);

    // Randomly choose left or right divergence
    const direction = rng() < 0.5 ? 1 : -1;
    const childAngle = parentAngle + direction * divergenceRad;

    // Calculate max length using depth reduction factor
    const lengthReduction = CONFIG.DEPTH_LENGTH_REDUCTION[childDepth] ?? 0.15;
    const childMaxLength = parent.config.maxLength * lengthReduction;

    // Reduce thickness by ~50%
    const childThickness = parent.config.baseThickness * 0.5;

    // Unique noise offsets from rng for procedural variation
    const noiseOffsetX = rng() * 1000;
    const noiseOffsetY = rng() * 1000;

    // Growth speed with slight variation
    const childGrowthSpeed = randRange(rng, 0.7, 1.1);

    const childConfig: BranchConfig = {
      startX: spawnPosition.x,
      startY: spawnPosition.y,
      initialAngle: childAngle,
      maxLength: childMaxLength,
      baseThickness: childThickness,
      growthSpeed: childGrowthSpeed,
      depth: childDepth,
      noiseOffsetX,
      noiseOffsetY,
    };

    return createBranchState(childConfig, delay);
  }

  /**
   * Calculates ambient sway displacement for a branch tip.
   * Uses noise for gentle oscillation, proportional to wind force.
   * Thinner branches (higher depth) sway more. Returns 1-3px displacement.
   */
  function getSwayDisplacement(branch: BranchState, windForce: Vec2, time: number): Vec2 {
    const { config } = branch;

    // Depth multiplier: thinner/deeper branches sway more
    const depthFactor = 1 + config.depth * 0.5;

    // Noise-based oscillation for organic movement
    const noiseX = noise(time * 0.002 + config.noiseOffsetX, config.noiseOffsetY);
    const noiseY = noise(time * 0.002 + config.noiseOffsetX + 50, config.noiseOffsetY + 50);

    // Displacement proportional to wind force magnitude and depth
    const dx = windForce.x * depthFactor * noiseX;
    const dy = windForce.y * depthFactor * noiseY;

    // Clamp displacement to 1-3px range
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    if (magnitude < 0.01) {
      return { x: 0, y: 0 };
    }

    const clampedMagnitude = Math.max(1, Math.min(3, magnitude));
    const scale = clampedMagnitude / magnitude;

    return {
      x: dx * scale,
      y: dy * scale,
    };
  }

  return {
    generateMainBranches,
    growBranch,
    getSwayDisplacement,
  };
}
