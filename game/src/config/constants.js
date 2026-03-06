export const WORLD_WIDTH = 3000;
export const WORLD_HEIGHT = 3000;
export const MAX_STAGE = 5;
export const AI_MAX_STAGE = 4;
export const EVOLUTION_THRESHOLD = 5;
export const POINTER_DEADZONE = 16;
export const SPAWN_MARGIN = 90;
export const SPAWN_SAFE_RADIUS = 260;

export const STAGE_STATS = {
  1: { size: 38, speed: 228, radar: 340 },
  2: { size: 52, speed: 206, radar: 430 },
  3: { size: 70, speed: 182, radar: 520 },
  4: { size: 90, speed: 160, radar: 620 },
  5: { size: 114, speed: 138, radar: 720 },
};

export const COLORS = {
  background: 0x041526,
  player: 0x76ecff,
  herbivore: 0x72e67c,
  carnivore: 0xff6c5d,
  food: 0xa8ff80,
  panel: 0x02101a,
};

export const POOL_SIZES = {
  food: 240,
  herbivores: 34,
  carnivores: 20,
};

export const SPAWN_COUNTS = {
  food: 170,
  herbivores: 22,
  carnivores: 10,
};
