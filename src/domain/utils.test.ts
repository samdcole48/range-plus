import { describe, it, expect } from 'vitest';
import { seededRandom } from './utils';

describe('seededRandom', () => {
  it('returns the same value for the same seed (determinism)', () => {
    expect(seededRandom(7)).toBe(seededRandom(7));
  });
});
