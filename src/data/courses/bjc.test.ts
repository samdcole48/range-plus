/**
 * Black Jack's Crossing (BJC) course validation tests.
 * Tasks 10–20 — CHG-COURSE-010 through CHG-COURSE-020
 * Per ENG-4.1: Tests written BEFORE implementation.
 */
import { describe, it, expect } from 'vitest';
import { BLACK_JACKS_CROSSING } from './black-jacks-crossing';
import { ALL_HOLES } from './index';
import { isPointInPolygon } from '../../domain/game';
import type { Point } from '../../domain/types';

function getBoundingBox(points: Point[]): { minX: number; maxX: number; minY: number; maxY: number } {
  return {
    minX: Math.min(...points.map((p) => p.x)),
    maxX: Math.max(...points.map((p) => p.x)),
    minY: Math.min(...points.map((p) => p.y)),
    maxY: Math.max(...points.map((p) => p.y)),
  };
}

function dist(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function centroid(points: Point[]): Point {
  const x = points.reduce((s, p) => s + p.x, 0) / points.length;
  const y = points.reduce((s, p) => s + p.y, 0) / points.length;
  return { x, y };
}

// ─── Task 10 — CHG-COURSE-010: 18 holes ──────────────────────────────────────

describe('CHG-COURSE-010 — BJC has 18 holes', () => {
  it('BLACK_JACKS_CROSSING has exactly 18 holes', () => {
    expect(BLACK_JACKS_CROSSING.holes.length).toBe(18);
  });
});

// ─── Task 11 — CHG-COURSE-011: par totals 72 ─────────────────────────────────

describe('CHG-COURSE-011 — BJC total par 72', () => {
  it('total par across all BJC holes is 72', () => {
    const total = BLACK_JACKS_CROSSING.holes.reduce((sum, h) => sum + h.par, 0);
    expect(total).toBe(72);
  });
});

// ─── Task 12 — CHG-COURSE-012: par distribution 4/10/4 ───────────────────────

describe('CHG-COURSE-012 — BJC par distribution 4/10/4', () => {
  it('has exactly 4 par-3 holes', () => {
    expect(BLACK_JACKS_CROSSING.holes.filter((h) => h.par === 3).length).toBe(4);
  });
  it('has exactly 10 par-4 holes', () => {
    expect(BLACK_JACKS_CROSSING.holes.filter((h) => h.par === 4).length).toBe(10);
  });
  it('has exactly 4 par-5 holes', () => {
    expect(BLACK_JACKS_CROSSING.holes.filter((h) => h.par === 5).length).toBe(4);
  });
});

// ─── Task 13 — CHG-COURSE-013: courseTheme desert ────────────────────────────

describe('CHG-COURSE-013 — all BJC holes have courseTheme desert', () => {
  it('every BJC hole has courseTheme "desert"', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      expect(hole.courseTheme, `${hole.name} must have courseTheme 'desert'`).toBe('desert');
    }
  });
});

// ─── Task 14 — CHG-COURSE-014: ≥10 rocks per hole ────────────────────────────

describe('CHG-COURSE-014 — all BJC holes have ≥10 rocks', () => {
  it('every BJC hole has ≥10 rocks with valid positions and radius 3–10', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      const rocks = hole.rocks ?? [];
      expect(rocks.length, `${hole.name} must have ≥10 rocks`).toBeGreaterThanOrEqual(10);
      for (const rock of rocks) {
        expect(rock.position.x, `${hole.name} rock.x`).toBeGreaterThanOrEqual(0);
        expect(rock.position.x, `${hole.name} rock.x`).toBeLessThanOrEqual(400);
        expect(rock.position.y, `${hole.name} rock.y`).toBeGreaterThanOrEqual(0);
        expect(rock.position.y, `${hole.name} rock.y`).toBeLessThanOrEqual(600);
        expect(rock.radius, `${hole.name} rock radius`).toBeGreaterThanOrEqual(3);
        expect(rock.radius, `${hole.name} rock radius`).toBeLessThanOrEqual(10);
      }
    }
  });
});

// ─── Task 15 — CHG-COURSE-015: ≥2 boulders per hole ─────────────────────────

describe('CHG-COURSE-015 — all BJC holes have ≥2 boulders', () => {
  it('every BJC hole has ≥2 boulders with ≥5 vertices each', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      const boulders = hole.boulders ?? [];
      expect(boulders.length, `${hole.name} must have ≥2 boulders`).toBeGreaterThanOrEqual(2);
      for (const boulder of boulders) {
        expect(
          boulder.boundary.points.length,
          `${hole.name} boulder must have ≥5 vertices`,
        ).toBeGreaterThanOrEqual(5);
      }
    }
  });
});

// ─── Task 16 — CHG-COURSE-016: geometry (green ⊂ fairway, pins ⊂ green) ──────

describe('CHG-COURSE-016 — BJC geometry validation', () => {
  it('all BJC green boundary vertices are inside the fairway polygon', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      for (const pt of hole.greenBoundary.points) {
        const inside = isPointInPolygon(pt, hole.fairwayBoundary);
        expect(
          inside,
          `Green vertex (${pt.x},${pt.y}) on "${hole.name}" must be inside fairway`,
        ).toBe(true);
      }
    }
  });

  it('all BJC pin positions are inside the green boundary', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      for (const pin of hole.pinPositions) {
        const inside = isPointInPolygon(pin, hole.greenBoundary);
        expect(
          inside,
          `Pin (${pin.x},${pin.y}) on "${hole.name}" must be inside green`,
        ).toBe(true);
      }
    }
  });
});

// ─── Task 17 — CHG-COURSE-017: yardage per par ───────────────────────────────

describe('CHG-COURSE-017 — BJC yardage per par', () => {
  it('all BJC holes have realistic yardage for their par', () => {
    const ranges: Record<number, [number, number]> = {
      3: [100, 250],
      4: [300, 500],
      5: [450, 650],
    };
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      const [min, max] = ranges[hole.par];
      expect(hole.yardsLength, `${hole.name} yardage`).toBeGreaterThanOrEqual(min);
      expect(hole.yardsLength, `${hole.name} yardage`).toBeLessThanOrEqual(max);
    }
  });
});

// ─── Task 18 — CHG-COURSE-018: total yardage 6000–6400 ───────────────────────

describe('CHG-COURSE-018 — BJC total yardage in range', () => {
  it('BJC total yardage is between 6,000 and 6,400 yards', () => {
    const total = BLACK_JACKS_CROSSING.holes.reduce((sum, h) => sum + h.yardsLength, 0);
    expect(total).toBeGreaterThanOrEqual(6000);
    expect(total).toBeLessThanOrEqual(6400);
  });
});

// ─── Task 19 — CHG-COURSE-019: unique IDs across ALL_HOLES ───────────────────

describe('CHG-COURSE-019 — all hole IDs unique across ALL_HOLES', () => {
  it('every hole ID in ALL_HOLES is unique', () => {
    const ids = ALL_HOLES.map((h) => h.id);
    const unique = new Set(ids);
    expect(unique.size, 'Duplicate hole IDs found').toBe(ids.length);
  });
});

// ─── Task 20 — CHG-COURSE-020: pinPositions 3–4, pinPosition = pinPositions[0] ─

describe('CHG-COURSE-020 — BJC pin positions', () => {
  it('every BJC hole has 3–4 pin positions', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      expect(hole.pinPositions.length, `${hole.name} pinPositions count`).toBeGreaterThanOrEqual(3);
      expect(hole.pinPositions.length, `${hole.name} pinPositions count`).toBeLessThanOrEqual(4);
    }
  });

  it('pinPosition equals pinPositions[0] on every BJC hole', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      expect(hole.pinPosition, `${hole.name} pinPosition`).toEqual(hole.pinPositions[0]);
    }
  });

  it('pin positions are spread at least 40% of the green longest axis', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      const bb = getBoundingBox(hole.greenBoundary.points);
      const longestAxis = Math.max(bb.maxX - bb.minX, bb.maxY - bb.minY);
      const threshold = longestAxis * 0.4;
      let maxSpread = 0;
      for (let i = 0; i < hole.pinPositions.length; i++) {
        for (let j = i + 1; j < hole.pinPositions.length; j++) {
          maxSpread = Math.max(maxSpread, dist(hole.pinPositions[i], hole.pinPositions[j]));
        }
      }
      expect(maxSpread, `${hole.name} pin spread`).toBeGreaterThanOrEqual(threshold);
    }
  });

  it('at least 2 pin positions are ≥5px from the green centroid', () => {
    for (const hole of BLACK_JACKS_CROSSING.holes) {
      const c = centroid(hole.greenBoundary.points);
      const farPins = hole.pinPositions.filter((p) => dist(p, c) >= 5);
      expect(farPins.length, `${hole.name} needs ≥2 pins ≥5px from centroid`).toBeGreaterThanOrEqual(2);
    }
  });
});
