import { Blossom, BlossomColor, BranchState, CONFIG, COLORS, NoiseFn2D, Vec2, WindState } from './types';

export interface BlossomSystemAPI {
  spawnBlossoms(branch: BranchState, progress: number): void;
  spawnCluster(position: Vec2, count: number): void;
  update(windState: WindState, time: number): void;
  getBlossoms(): Blossom[];
  getRandomBlossomPosition(): Vec2 | null;
}

/**
 * Mulberry32 seeded PRNG - produces deterministic pseudo-random numbers from a seed.
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
 * Returns a random number in [min, max] using the provided RNG.
 */
function randomRange(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

/**
 * Returns a random integer in [min, max] (inclusive) using the provided RNG.
 */
function randomInt(rng: () => number, min: number, max: number): number {
  return Math.floor(randomRange(rng, min, max + 1));
}

/**
 * Linearly interpolates between two values.
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Creates a randomized blossom color by interpolating between pink and white,
 * with a warm center color.
 */
function createBlossomColor(rng: () => number): BlossomColor {
  const t = rng();
  return {
    r: Math.round(lerp(COLORS.BLOSSOM_PINK.r, COLORS.BLOSSOM_WHITE.r, t)),
    g: Math.round(lerp(COLORS.BLOSSOM_PINK.g, COLORS.BLOSSOM_WHITE.g, t)),
    b: Math.round(lerp(COLORS.BLOSSOM_PINK.b, COLORS.BLOSSOM_WHITE.b, t)),
    centerR: COLORS.BLOSSOM_CENTER.r,
    centerG: COLORS.BLOSSOM_CENTER.g,
    centerB: COLORS.BLOSSOM_CENTER.b,
  };
}

/**
 * Creates a single blossom with randomized properties at the given position.
 */
function createBlossom(rng: () => number, position: Vec2): Blossom {
  return {
    position: { x: position.x, y: position.y },
    size: randomRange(rng, CONFIG.BLOSSOM_SIZE_MIN, CONFIG.BLOSSOM_SIZE_MAX),
    petalCount: randomInt(rng, CONFIG.BLOSSOM_PETAL_COUNT_MIN, CONFIG.BLOSSOM_PETAL_COUNT_MAX),
    rotation: randomRange(rng, 0, Math.PI * 2),
    color: createBlossomColor(rng),
    opacity: randomRange(rng, 0.7, 1.0),
    bobOffset: randomRange(rng, 0, Math.PI * 2),
    attachedBranch: 0,
  };
}

/**
 * Creates the blossom system responsible for spawning and managing blossoms
 * along branches and at junction points.
 */
export function createBlossomSystem(noise: NoiseFn2D, seed: number): BlossomSystemAPI {
  const rng = mulberry32(seed);
  const blossoms: Blossom[] = [];
  const basePositions: Vec2[] = [];
  // Track which blossom slots have already been used (keyed by "x,y" string)
  const usedSlots = new Set<string>();

  function slotKey(slot: Vec2): string {
    return `${slot.x.toFixed(2)},${slot.y.toFixed(2)}`;
  }

  function spawnBlossoms(branch: BranchState, progress: number): void {
    // Only spawn if branch has reached 40% growth
    if (progress < CONFIG.BLOSSOM_SPAWN_PROGRESS) {
      return;
    }

    const slots = branch.blossomSlots;
    if (!slots || slots.length === 0) {
      return;
    }

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const key = slotKey(slot);

      // Skip already-used slots
      if (usedSlots.has(key)) {
        continue;
      }

      // Only spawn blossoms in the outer 40% of the branch (toward tips)
      const tipFactor = (i + 1) / slots.length;
      if (tipFactor < 0.6) continue;

      // Low probability — only a few blossoms per branch
      const spawnProbability = 0.15;

      if (rng() < spawnProbability) {
        usedSlots.add(key);
        const blossom = createBlossom(rng, slot);
        blossoms.push(blossom);
        basePositions.push({ x: blossom.position.x, y: blossom.position.y });
      }
    }
  }

  function spawnCluster(position: Vec2, count: number): void {
    // Clamp count to configured cluster size range
    const clampedCount = Math.max(
      CONFIG.CLUSTER_SIZE_MIN,
      Math.min(CONFIG.CLUSTER_SIZE_MAX, count)
    );

    for (let i = 0; i < clampedCount; i++) {
      // Offset each blossom slightly (±5-10px) from the center position
      const offsetX = randomRange(rng, -10, 10);
      const offsetY = randomRange(rng, -10, 10);
      // Ensure minimum offset of ~5px from center
      const adjustedX = position.x + (offsetX >= 0 ? offsetX + 5 : offsetX - 5) * 0.5;
      const adjustedY = position.y + (offsetY >= 0 ? offsetY + 5 : offsetY - 5) * 0.5;

      blossoms.push(createBlossom(rng, { x: adjustedX, y: adjustedY }));
      basePositions.push({ x: adjustedX, y: adjustedY });
    }
  }

  function update(windState: WindState, time: number): void {
    for (let i = 0; i < blossoms.length; i++) {
      const blossom = blossoms[i];
      const base = basePositions[i];

      // Sine-wave bob oscillation using blossom's unique phase offset
      // Amplitude varies between 0.5-1.5px centered on CONFIG.BLOSSOM_BOB_AMPLITUDE (1.0)
      const bobPhase = time * 0.003 + blossom.bobOffset;
      const amplitudeVariation = 0.5 + Math.abs(Math.sin(blossom.bobOffset * 2.0));
      const bobY = Math.sin(bobPhase) * amplitudeVariation;

      // Wind influence: slight horizontal displacement based on wind force
      const windOffsetX = windState.force.x * 0.1;
      const windOffsetY = windState.force.y * 0.1;

      // Noise-based organic variation using blossom position + time
      const noiseX = noise(base.x * 0.01 + time * 0.0005, base.y * 0.01) * 0.5;
      const noiseY = noise(base.x * 0.01, base.y * 0.01 + time * 0.0005) * 0.5;

      // Apply displacement to base position
      blossom.position.x = base.x + windOffsetX + noiseX;
      blossom.position.y = base.y + bobY + windOffsetY + noiseY;
    }
  }

  function getBlossoms(): Blossom[] {
    return blossoms;
  }

  function getRandomBlossomPosition(): Vec2 | null {
    if (blossoms.length === 0) {
      return null;
    }
    const index = Math.floor(rng() * blossoms.length);
    return blossoms[index].position;
  }

  return {
    spawnBlossoms,
    spawnCluster,
    update,
    getBlossoms,
    getRandomBlossomPosition,
  };
}
