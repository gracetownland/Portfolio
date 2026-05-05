// Shared type definitions for the growing-vines animation system

export interface Vec2 {
  x: number;
  y: number;
}

export interface BezierSegment {
  start: Vec2;
  cp1: Vec2;
  cp2: Vec2;
  end: Vec2;
  thickness: number;
}

export interface BranchConfig {
  startX: number;
  startY: number;
  initialAngle: number;
  maxLength: number;
  baseThickness: number;
  growthSpeed: number;
  depth: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
}

export interface BranchState {
  config: BranchConfig;
  segments: BezierSegment[];
  currentLength: number;
  isGrowing: boolean;
  tipPosition: Vec2;
  tipAngle: number;
  swayOffset: Vec2;
  children: BranchState[];
  blossomSlots: Vec2[];
  spawnDelay: number;
}

export interface Blossom {
  position: Vec2;
  size: number;
  petalCount: number;
  rotation: number;
  color: BlossomColor;
  opacity: number;
  bobOffset: number;
  attachedBranch: number;
}

export interface BlossomColor {
  r: number;
  g: number;
  b: number;
  centerR: number;
  centerG: number;
  centerB: number;
}

export interface Petal {
  position: Vec2;
  velocity: Vec2;
  size: number;
  rotation: number;
  rotationSpeed: number;
  scaleY: number;
  scalePhase: number;
  opacity: number;
  lifetime: number;
}

export interface WindState {
  force: Vec2;
  gustIntensity: number;
}

export interface SceneState {
  seed: number;
  branches: BranchState[];
  blossoms: Blossom[];
  petals: Petal[];
  wind: WindState;
  phase: 'growing' | 'ambient';
  elapsed: number;
  canvasWidth: number;
  canvasHeight: number;
}

export type NoiseFn2D = (x: number, y: number) => number;

export const CONFIG = {
  // Branch generation
  MAIN_BRANCH_COUNT_MIN: 4,
  MAIN_BRANCH_COUNT_MAX: 8,
  START_Y_MIN: 0.2,
  START_Y_MAX: 0.85,
  MAX_LENGTH_MIN: 0.25,
  MAX_LENGTH_MAX: 0.45,
  BASE_THICKNESS_MIN: 6,
  BASE_THICKNESS_MAX: 12,
  TIP_THICKNESS_MIN: 0.5,
  SUB_BRANCH_ANGLE_MIN: 20,
  SUB_BRANCH_ANGLE_MAX: 55,
  MAX_DEPTH: 3,
  DEPTH_LENGTH_REDUCTION: [1.0, 0.5, 0.3, 0.15],

  // Growth animation
  GROWTH_DURATION_MIN: 4000,
  GROWTH_DURATION_MAX: 7000,
  GROWTH_EASE_IN_DURATION: 0.15,
  SUB_BRANCH_SPAWN_START: 0.25,
  SUB_BRANCH_SPAWN_END: 0.40,
  SPAWN_DELAY_MIN: 5,
  SPAWN_DELAY_MAX: 20,

  // Wind
  WIND_BASE_PERIOD: 8000,
  WIND_MED_PERIOD: 3000,
  WIND_FAST_PERIOD: 800,
  WIND_MAX_AMPLITUDE: 3,
  GUST_PROBABILITY: 0.002,
  GUST_DURATION: 1500,

  // Blossoms
  BLOSSOM_SPAWN_PROGRESS: 0.4,
  BLOSSOM_SIZE_MIN: 4,
  BLOSSOM_SIZE_MAX: 9,
  BLOSSOM_PETAL_COUNT_MIN: 5,
  BLOSSOM_PETAL_COUNT_MAX: 7,
  BLOSSOM_BOB_AMPLITUDE: 1.0,
  CLUSTER_SIZE_MIN: 2,
  CLUSTER_SIZE_MAX: 4,

  // Petals
  PETAL_GRAVITY: 0.4,
  PETAL_AIR_RESISTANCE: 0.98,
  PETAL_RELEASE_RATE: 2,
  PETAL_GUST_RATE_MULTIPLIER: 3,
  PETAL_MIN_ACTIVE: 15,
  PETAL_MAX_ACTIVE: 40,
  PETAL_FADE_ZONE: 0.1,
  PETAL_FADE_FRAMES: 25,

  // Performance
  MAX_TOTAL_ELEMENTS: 500,
  TARGET_FPS: 60,
} as const;

export const COLORS = {
  BRANCH_BASE: { r: 50, g: 30, b: 20 },
  BRANCH_TIP: { r: 120, g: 80, b: 50 },
  BLOSSOM_PINK: { r: 255, g: 192, b: 203 },
  BLOSSOM_WHITE: { r: 255, g: 245, b: 248 },
  BLOSSOM_CENTER: { r: 255, g: 105, b: 140 },
  PETAL_BASE: { r: 255, g: 200, b: 210 },
} as const;
