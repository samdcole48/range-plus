import { describe, it, expect } from 'vitest';
import type { Rock, Boulder } from './types';

describe('CHG-COURSE-001 — Rock type', () => {
  it('Rock can be constructed with position and radius', () => {
    const rock: Rock = { position: { x: 50, y: 100 }, radius: 5 };
    expect(rock.position.x).toBe(50);
    expect(rock.position.y).toBe(100);
    expect(rock.radius).toBe(5);
  });
});

describe('CHG-COURSE-002 — Boulder type', () => {
  it('Boulder can be constructed with a polygon boundary', () => {
    const boulder: Boulder = {
      boundary: { points: [{ x: 10, y: 10 }, { x: 30, y: 10 }, { x: 20, y: 30 }] },
    };
    expect(boulder.boundary.points).toHaveLength(3);
    expect(boulder.boundary.points[0]).toEqual({ x: 10, y: 10 });
  });
});
