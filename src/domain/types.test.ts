import { describe, it, expect } from 'vitest';
import type { Rock } from './types';

describe('CHG-COURSE-001 — Rock type', () => {
  it('Rock can be constructed with position and radius', () => {
    const rock: Rock = { position: { x: 50, y: 100 }, radius: 5 };
    expect(rock.position.x).toBe(50);
    expect(rock.position.y).toBe(100);
    expect(rock.radius).toBe(5);
  });
});
