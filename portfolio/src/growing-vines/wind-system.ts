import { NoiseFn2D, WindState, CONFIG } from './types';

export interface WindSystemAPI {
  update(time: number): WindState;
  isGust(): boolean;
}

interface GustState {
  active: boolean;
  startTime: number;
  duration: number;
}

export function createWindSystem(noise: NoiseFn2D): WindSystemAPI {
  const gust: GustState = {
    active: false,
    startTime: 0,
    duration: CONFIG.GUST_DURATION,
  };

  let currentGustIntensity = 0;

  function computeBaseWind(time: number): number {
    const slow = Math.sin((time / CONFIG.WIND_BASE_PERIOD) * Math.PI * 2) * 1.5;
    const medium = Math.sin((time / CONFIG.WIND_MED_PERIOD) * Math.PI * 2) * 0.8;
    const fast = Math.sin((time / CONFIG.WIND_FAST_PERIOD) * Math.PI * 2) * 0.3;
    return slow + medium + fast;
  }

  function easeInOut(t: number): number {
    // Smooth ease in/out using cubic
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function updateGust(time: number): void {
    if (gust.active) {
      const elapsed = time - gust.startTime;
      if (elapsed >= gust.duration) {
        gust.active = false;
        currentGustIntensity = 0;
      } else {
        // Ramp up and down smoothly over the gust duration
        const progress = elapsed / gust.duration;
        currentGustIntensity = easeInOut(progress < 0.5 ? progress * 2 : 2 - progress * 2);
      }
    } else {
      // Check if a new gust should start
      if (Math.random() < CONFIG.GUST_PROBABILITY) {
        gust.active = true;
        gust.startTime = time;
        // Vary gust duration between 1000-2000ms
        gust.duration = CONFIG.GUST_DURATION + (Math.random() - 0.5) * 500;
      }
    }
  }

  function update(time: number): WindState {
    updateGust(time);

    // Base horizontal wind from layered sine waves
    const baseX = computeBaseWind(time);

    // Add noise-based variation for organic feel
    const noiseVal = noise(time * 0.0003, 0.5);
    const noisyX = baseX + noiseVal * 0.5;

    // Vertical component: ~20% of horizontal, phase-shifted
    const verticalBase = Math.sin((time / CONFIG.WIND_BASE_PERIOD) * Math.PI * 2 + Math.PI / 3) * 0.3;
    const verticalNoise = noise(0.5, time * 0.0004) * 0.2;
    const baseY = verticalBase + verticalNoise;

    // Apply gust multiplier (2-3x during gusts)
    const gustMultiplier = 1 + currentGustIntensity * 2; // ranges from 1x to 3x

    // Scale to stay within amplitude range
    const scale = CONFIG.WIND_MAX_AMPLITUDE / 2.6; // 2.6 is approx max of base waves (1.5+0.8+0.3)
    const forceX = noisyX * scale * gustMultiplier;
    const forceY = baseY * scale * gustMultiplier;

    return {
      force: { x: forceX, y: forceY },
      gustIntensity: currentGustIntensity,
    };
  }

  function isGust(): boolean {
    return currentGustIntensity > 0.5;
  }

  return { update, isGust };
}
