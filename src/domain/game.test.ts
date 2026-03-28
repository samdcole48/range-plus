import { describe, it, expect } from 'vitest';
import {
  calculateDistanceYards,
  createGameState,
  placeShot,
  isPointInPolygon,
  getScoreLabel,
} from './game';
import type { HoleDefinition, Point } from './types';

const testHole: HoleDefinition = {
  id: 'test-par4',
  name: 'Test Hole',
  par: 4,
  teePosition: { x: 50, y: 450 },
  pinPosition: { x: 50, y: 50 },
  greenBoundary: { points: [{ x: 30, y: 30 }, { x: 70, y: 30 }, { x: 70, y: 70 }, { x: 30, y: 70 }] },
  fairwayBoundary: { points: [{ x: 30, y: 70 }, { x: 70, y: 70 }, { x: 70, y: 450 }, { x: 30, y: 450 }] },
  waterHazards: [],
  yardsLength: 400,
};

describe('calculateDistanceYards', () => {
  it('returns the hole length when ball is on the tee', () => {
    const distance = calculateDistanceYards(testHole.teePosition, testHole.pinPosition, testHole);
    expect(distance).toBe(400);
  });

  it('returns 0 when ball is on the pin', () => {
    const distance = calculateDistanceYards(testHole.pinPosition, testHole.pinPosition, testHole);
    expect(distance).toBe(0);
  });

  it('returns proportional distance for a point halfway', () => {
    const halfway: Point = { x: 50, y: 250 };
    const distance = calculateDistanceYards(halfway, testHole.pinPosition, testHole);
    expect(distance).toBe(200);
  });
});

describe('createGameState', () => {
  it('creates initial state with ball on tee', () => {
    const state = createGameState(testHole);
    expect(state.ballPosition).toEqual(testHole.teePosition);
    expect(state.strokeCount).toBe(0);
    expect(state.isComplete).toBe(false);
    expect(state.hole).toBe(testHole);
    expect(state.shotHistory).toEqual([testHole.teePosition]);
    expect(state.landedInOnePuttZone).toBe(false);
  });

  it('initializes puttCount to 0', () => {
    const state = createGameState(testHole);
    expect(state.puttCount).toBe(0);
  });
});

describe('placeShot', () => {
  it('moves the ball to the tapped position', () => {
    const state = createGameState(testHole);
    const target: Point = { x: 50, y: 300 };
    const next = placeShot(state, target);
    expect(next.ballPosition).toEqual(target);
  });

  it('increments stroke count by 1', () => {
    const state = createGameState(testHole);
    const target: Point = { x: 50, y: 300 };
    const next = placeShot(state, target);
    expect(next.strokeCount).toBe(1);
  });

  it('does not mutate the original state', () => {
    const state = createGameState(testHole);
    const target: Point = { x: 50, y: 300 };
    placeShot(state, target);
    expect(state.strokeCount).toBe(0);
    expect(state.ballPosition).toEqual(testHole.teePosition);
  });

  it('records shot positions in shotHistory', () => {
    let state = createGameState(testHole);
    state = placeShot(state, { x: 50, y: 350 });
    state = placeShot(state, { x: 50, y: 250 });
    expect(state.shotHistory).toEqual([
      testHole.teePosition,
      { x: 50, y: 350 },
      { x: 50, y: 250 },
    ]);
  });

  it('records green landing position and pin in history on completion', () => {
    let state = createGameState(testHole);
    state = placeShot(state, { x: 50, y: 300 });
    // Land on green
    const greenSpot: Point = { x: 65, y: 65 };
    state = placeShot(state, greenSpot);
    expect(state.isComplete).toBe(true);
    // History includes: tee, fairway, green landing, pin
    expect(state.shotHistory).toEqual([
      testHole.teePosition,
      { x: 50, y: 300 },
      greenSpot,
      testHole.pinPosition,
    ]);
  });

  it('sets landedInOnePuttZone true when landing close to pin', () => {
    const state = createGameState(testHole);
    const nearPin: Point = { x: 50, y: 49 };
    const next = placeShot(state, nearPin);
    expect(next.landedInOnePuttZone).toBe(true);
  });

  it('sets landedInOnePuttZone false when landing far from pin on green', () => {
    const state = createGameState(testHole);
    const farOnGreen: Point = { x: 65, y: 65 };
    const next = placeShot(state, farOnGreen);
    expect(next.landedInOnePuttZone).toBe(false);
  });

  it('records drop zone in history when hitting water', () => {
    const holeWithWater: HoleDefinition = {
      ...testHole,
      waterHazards: [{
        boundary: { points: [{ x: 20, y: 200 }, { x: 80, y: 200 }, { x: 80, y: 250 }, { x: 20, y: 250 }] },
        dropZone: { x: 50, y: 260 },
      }],
    };
    const state = createGameState(holeWithWater);
    const next = placeShot(state, { x: 50, y: 225 });
    expect(next.shotHistory).toEqual([
      holeWithWater.teePosition,
      { x: 50, y: 225 },
      { x: 50, y: 260 },
    ]);
  });

  it('marks hole complete with 2-putt when landing on green far from pin', () => {
    const state = createGameState(testHole);
    // Land on green but far from pin (pin is at 50,50; green is 30-70 x 30-70)
    const onGreen: Point = { x: 65, y: 65 };
    const next = placeShot(state, onGreen);
    expect(next.isComplete).toBe(true);
    // 1 shot + 2 putts = 3
    expect(next.strokeCount).toBe(3);
  });

  it('marks hole complete with 1-putt when landing within 15 feet of pin', () => {
    const state = createGameState(testHole);
    // Land very close to pin (50,50). 8 feet ≈ 2.67 yards ≈ 2.67 pixels at this scale
    const nearPin: Point = { x: 50, y: 49 };
    const next = placeShot(state, nearPin);
    expect(next.isComplete).toBe(true);
    // 1 shot + 1 putt = 2
    expect(next.strokeCount).toBe(2);
  });

  it('does not allow shots after hole is complete', () => {
    const state = createGameState(testHole);
    const onGreen: Point = { x: 50, y: 50 };
    const completed = placeShot(state, onGreen);
    expect(completed.isComplete).toBe(true);

    const afterComplete = placeShot(completed, { x: 50, y: 300 });
    expect(afterComplete).toBe(completed);
  });

  it('applies penalty stroke and drops at drop zone when landing in water', () => {
    const holeWithWater: HoleDefinition = {
      ...testHole,
      waterHazards: [{
        boundary: { points: [{ x: 20, y: 200 }, { x: 80, y: 200 }, { x: 80, y: 250 }, { x: 20, y: 250 }] },
        dropZone: { x: 50, y: 260 },
      }],
    };
    const state = createGameState(holeWithWater);
    const inWater: Point = { x: 50, y: 225 };
    const next = placeShot(state, inWater);
    // 1 shot + 1 penalty = 2 strokes
    expect(next.strokeCount).toBe(2);
    // Ball placed at drop zone, not in the water
    expect(next.ballPosition).toEqual({ x: 50, y: 260 });
    expect(next.isComplete).toBe(false);
  });

  it('does not apply penalty when shot misses the water', () => {
    const holeWithWater: HoleDefinition = {
      ...testHole,
      waterHazards: [{
        boundary: { points: [{ x: 20, y: 200 }, { x: 80, y: 200 }, { x: 80, y: 250 }, { x: 20, y: 250 }] },
        dropZone: { x: 50, y: 260 },
      }],
    };
    const state = createGameState(holeWithWater);
    const onFairway: Point = { x: 50, y: 300 };
    const next = placeShot(state, onFairway);
    expect(next.strokeCount).toBe(1);
    expect(next.ballPosition).toEqual(onFairway);
  });
});

describe('isPointInPolygon', () => {
  const square = { points: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }] };

  it('returns true for a point inside', () => {
    expect(isPointInPolygon({ x: 5, y: 5 }, square)).toBe(true);
  });

  it('returns false for a point outside', () => {
    expect(isPointInPolygon({ x: 15, y: 5 }, square)).toBe(false);
  });

  it('returns true for a point on the edge', () => {
    expect(isPointInPolygon({ x: 5, y: 0 }, square)).toBe(true);
  });
});

describe('getScoreLabel', () => {
  it('returns "Hole in One" for 1 on any par', () => {
    expect(getScoreLabel(1, 3)).toBe('Hole in One');
  });

  it('returns "Eagle" for 2 under par', () => {
    expect(getScoreLabel(2, 4)).toBe('Eagle');
  });

  it('returns "Birdie" for 1 under par', () => {
    expect(getScoreLabel(3, 4)).toBe('Birdie');
  });

  it('returns "Par" for even', () => {
    expect(getScoreLabel(4, 4)).toBe('Par');
  });

  it('returns "Bogey" for 1 over', () => {
    expect(getScoreLabel(5, 4)).toBe('Bogey');
  });

  it('returns "Double Bogey" for 2 over', () => {
    expect(getScoreLabel(6, 4)).toBe('Double Bogey');
  });

  it('returns "Triple Bogey" for 3 over', () => {
    expect(getScoreLabel(7, 4)).toBe('Triple Bogey');
  });

  it('returns "+N" for more than 3 over', () => {
    expect(getScoreLabel(8, 4)).toBe('+4');
  });
});
