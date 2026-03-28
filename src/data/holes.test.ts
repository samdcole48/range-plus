import { describe, it, expect } from 'vitest';
import { PRESET_HOLES } from './holes';
import { getRandomHole } from './holeSelection';

describe('PRESET_HOLES', () => {
  it('has at least 6 holes', () => {
    expect(PRESET_HOLES.length).toBeGreaterThanOrEqual(6);
  });

  it('includes a mix of par 3, 4, and 5', () => {
    const pars = new Set(PRESET_HOLES.map((h) => h.par));
    expect(pars.has(3)).toBe(true);
    expect(pars.has(4)).toBe(true);
    expect(pars.has(5)).toBe(true);
  });

  it('each hole has a unique id', () => {
    const ids = PRESET_HOLES.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('getRandomHole', () => {
  it('returns a hole from the presets', () => {
    const hole = getRandomHole();
    expect(PRESET_HOLES).toContain(hole);
  });

  it('can exclude the current hole to avoid repeats', () => {
    const current = PRESET_HOLES[0];
    for (let i = 0; i < 20; i++) {
      const next = getRandomHole(current);
      expect(next).not.toBe(current);
    }
  });
});
