import { WATER_PENALTY_STROKES, DEFAULT_PUTT_COUNT } from './constants';

describe('domain constants', () => {
  it('WATER_PENALTY_STROKES equals 2', () => {
    expect(WATER_PENALTY_STROKES).toBe(2);
  });

  it('DEFAULT_PUTT_COUNT equals 2', () => {
    expect(DEFAULT_PUTT_COUNT).toBe(2);
  });
});
