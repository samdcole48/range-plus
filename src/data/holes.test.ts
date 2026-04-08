import { describe, it, expect } from 'vitest';
import { PRESET_HOLES } from './holes';
import { getRandomHole } from './holeSelection';
import { isPointInPolygon } from '../domain/game';
import type { Point } from '../domain/types';
import { THE_STARTER } from './courses/the-starter';
import { ALL_COURSES, ALL_HOLES } from './courses';

function getBoundingBox(points: Point[]): { minX: number; maxX: number; minY: number; maxY: number } {
  return {
    minX: Math.min(...points.map(p => p.x)),
    maxX: Math.max(...points.map(p => p.x)),
    minY: Math.min(...points.map(p => p.y)),
    maxY: Math.max(...points.map(p => p.y)),
  };
}

function centroid(points: Point[]): Point {
  const x = points.reduce((s, p) => s + p.x, 0) / points.length;
  const y = points.reduce((s, p) => s + p.y, 0) / points.length;
  return { x, y };
}

function dist(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

describe('PRESET_HOLES', () => {
  it('has at least 6 holes', () => {
    expect(PRESET_HOLES.length).toBeGreaterThanOrEqual(6);
  });

  it('has exactly 18 holes', () => {
    expect(PRESET_HOLES.length).toBe(18);
  });

  it('totals par 72', () => {
    const total = PRESET_HOLES.reduce((sum, h) => sum + h.par, 0);
    expect(total).toBe(72);
  });

  it('includes a mix of par 3, 4, and 5', () => {
    const pars = new Set(PRESET_HOLES.map((h) => h.par));
    expect(pars.has(3)).toBe(true);
    expect(pars.has(4)).toBe(true);
    expect(pars.has(5)).toBe(true);
  });

  it('has 4 par-3 holes', () => {
    const par3s = PRESET_HOLES.filter((h) => h.par === 3);
    expect(par3s.length).toBe(4);
  });

  it('has 10 par-4 holes', () => {
    const par4s = PRESET_HOLES.filter((h) => h.par === 4);
    expect(par4s.length).toBe(10);
  });

  it('has 4 par-5 holes', () => {
    const par5s = PRESET_HOLES.filter((h) => h.par === 5);
    expect(par5s.length).toBe(4);
  });

  it('each hole has a unique id', () => {
    const ids = PRESET_HOLES.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each course yardage is between 6,000 and 6,400 yards', () => {
    for (const course of ALL_COURSES) {
      const total = course.holes.reduce((sum, h) => sum + h.yardsLength, 0);
      expect(total, `${course.name} yardage`).toBeGreaterThanOrEqual(6000);
      expect(total, `${course.name} yardage`).toBeLessThanOrEqual(6400);
    }
  });

  it('each hole has realistic yardage for its par', () => {
    const ranges: Record<number, [number, number]> = {
      3: [100, 250],
      4: [300, 500],
      5: [450, 650],
    };
    for (const hole of PRESET_HOLES) {
      const [min, max] = ranges[hole.par];
      expect(hole.yardsLength).toBeGreaterThanOrEqual(min);
      expect(hole.yardsLength).toBeLessThanOrEqual(max);
    }
  });
});

describe('Green design — CHG-GREEN-001/002', () => {
  it('each hole has 3 or 4 pin positions', () => {
    for (const hole of PRESET_HOLES) {
      expect(hole.pinPositions).toBeDefined();
      expect(hole.pinPositions.length).toBeGreaterThanOrEqual(3);
      expect(hole.pinPositions.length).toBeLessThanOrEqual(4);
    }
  });
});

describe('Green design — CHG-GREEN-003', () => {
  it('pinPosition equals pinPositions[0] on every hole', () => {
    for (const hole of PRESET_HOLES) {
      expect(hole.pinPosition).toEqual(hole.pinPositions[0]);
    }
  });
});

describe('Green design — CHG-GREEN-004', () => {
  it('all pin positions are inside the green boundary', () => {
    for (const hole of PRESET_HOLES) {
      for (const pin of hole.pinPositions) {
        const inside = isPointInPolygon(pin, hole.greenBoundary);
        expect(inside, `Pin (${pin.x},${pin.y}) on "${hole.name}" must be inside green`).toBe(true);
      }
    }
  });
});

describe('Green design — CHG-GREEN-005/006 (size scaling by par)', () => {
  function avgBBArea(par: 3 | 4 | 5): number {
    const holes = PRESET_HOLES.filter(h => h.par === par);
    const areas = holes.map(h => {
      const bb = getBoundingBox(h.greenBoundary.points);
      return (bb.maxX - bb.minX) * (bb.maxY - bb.minY);
    });
    return areas.reduce((s, a) => s + a, 0) / areas.length;
  }

  it('average par-3 green bounding-box area is smaller than par-4', () => {
    expect(avgBBArea(3)).toBeLessThan(avgBBArea(4));
  });

  it('average par-5 green bounding-box area is larger than par-4', () => {
    expect(avgBBArea(5)).toBeGreaterThan(avgBBArea(4));
  });
});

describe('Green design — CHG-GREEN-007 (minimum playable size)', () => {
  it('no green is smaller than 35×30 px', () => {
    for (const hole of PRESET_HOLES) {
      const bb = getBoundingBox(hole.greenBoundary.points);
      const w = bb.maxX - bb.minX;
      const h = bb.maxY - bb.minY;
      expect(w, `${hole.name} green width`).toBeGreaterThanOrEqual(35);
      expect(h, `${hole.name} green height`).toBeGreaterThanOrEqual(30);
    }
  });
});

describe('Green design — CHG-GREEN-008 (vertex count)', () => {
  it('every green polygon has at least 8 vertices', () => {
    for (const hole of PRESET_HOLES) {
      expect(
        hole.greenBoundary.points.length,
        `${hole.name} green vertex count`
      ).toBeGreaterThanOrEqual(8);
    }
  });
});

describe('Green design — CHG-GREEN-009 (green inside fairway)', () => {
  it('all green boundary vertices are inside the fairway polygon', () => {
    for (const hole of PRESET_HOLES) {
      for (const pt of hole.greenBoundary.points) {
        const inside = isPointInPolygon(pt, hole.fairwayBoundary);
        expect(inside, `Green vertex (${pt.x},${pt.y}) on "${hole.name}" must be inside fairway`).toBe(true);
      }
    }
  });
});

describe('Green design — CHG-GREEN-010 (pin spread)', () => {
  it('pin positions are spread at least 40% of the green longest axis', () => {
    for (const hole of PRESET_HOLES) {
      const bb = getBoundingBox(hole.greenBoundary.points);
      const longestAxis = Math.max(bb.maxX - bb.minX, bb.maxY - bb.minY);
      const threshold = longestAxis * 0.4;

      let maxDist = 0;
      for (let i = 0; i < hole.pinPositions.length; i++) {
        for (let j = i + 1; j < hole.pinPositions.length; j++) {
          maxDist = Math.max(maxDist, dist(hole.pinPositions[i], hole.pinPositions[j]));
        }
      }
      expect(maxDist, `${hole.name} pin spread`).toBeGreaterThanOrEqual(threshold);
    }
  });
});

describe('Green design — CHG-GREEN-011 (pins not at centroid)', () => {
  it('at least 2 pin positions are ≥5px from the green centroid', () => {
    for (const hole of PRESET_HOLES) {
      const c = centroid(hole.greenBoundary.points);
      const farPins = hole.pinPositions.filter(p => dist(p, c) >= 5);
      expect(farPins.length, `${hole.name} needs ≥2 pins ≥5px from centroid`).toBeGreaterThanOrEqual(2);
    }
  });
});

// ─── Visual Enhancement Tests (CHG-VIS-001 through CHG-VIS-008) ─────────────

describe('Decorative visuals — CHG-VIS-001 (dense trees)', () => {
  it('every classic hole has at least 25 trees', () => {
    const classicHoles = PRESET_HOLES.filter(h => h.courseTheme === 'classic');
    for (const hole of classicHoles) {
      expect(
        (hole.trees ?? []).length,
        `${hole.name} must have ≥25 trees`
      ).toBeGreaterThanOrEqual(25);
    }
  });
});

describe('Decorative visuals — CHG-VIS-003 (bushes present)', () => {
  it('every classic hole has a bushes array with at least 3 entries', () => {
    const classicHoles = PRESET_HOLES.filter(h => h.courseTheme === 'classic');
    for (const hole of classicHoles) {
      expect(hole.bushes, `${hole.name} must have bushes array`).toBeDefined();
      expect(
        (hole.bushes ?? []).length,
        `${hole.name} must have ≥3 bushes`
      ).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('Decorative visuals — CHG-VIS-005 (bush validity)', () => {
  it('each classic bush has valid position (0-400, 0-600) and positive radius', () => {
    const classicHoles = PRESET_HOLES.filter(h => h.courseTheme === 'classic');
    for (const hole of classicHoles) {
      for (const bush of (hole.bushes ?? [])) {
        expect(bush.position.x, `${hole.name} bush.x`).toBeGreaterThanOrEqual(0);
        expect(bush.position.x, `${hole.name} bush.x`).toBeLessThanOrEqual(400);
        expect(bush.position.y, `${hole.name} bush.y`).toBeGreaterThanOrEqual(0);
        expect(bush.position.y, `${hole.name} bush.y`).toBeLessThanOrEqual(600);
        expect(bush.radius, `${hole.name} bush.radius`).toBeGreaterThan(0);
      }
    }
  });
});

describe('Decorative visuals — CHG-VIS-008 (tree radius range)', () => {
  it('all classic tree radii are between 6 and 18px inclusive', () => {
    const classicHoles = PRESET_HOLES.filter(h => h.courseTheme === 'classic');
    for (const hole of classicHoles) {
      for (const tree of (hole.trees ?? [])) {
        expect(tree.radius, `${hole.name} tree.radius`).toBeGreaterThanOrEqual(6);
        expect(tree.radius, `${hole.name} tree.radius`).toBeLessThanOrEqual(18);
      }
    }
  });
});

// ─── Refine Hole Visuals Tests (CHG-REF-001 through CHG-REF-003) ─────────────

describe('Refined visuals — CHG-REF-001 (no rocks)', () => {
  it('CHG-REF-001: no classic hole has a rocks array', () => {
    const classicHoles = PRESET_HOLES.filter(h => h.courseTheme === 'classic');
    for (const hole of classicHoles) {
      expect((hole as unknown as Record<string, unknown>).rocks, `${hole.name} must have no rocks`).toBeUndefined();
    }
  });
});

it('CHG-REF-002: no hole has flowerBeds', () => {
  PRESET_HOLES.forEach(hole => {
    expect((hole as unknown as Record<string, unknown>).flowerBeds).toBeUndefined();
  });
});

it('CHG-YRD-001: at least 80% of trees are within 50 yards of fairway edges', () => {
  PRESET_HOLES.forEach(hole => {
    const trees = hole.trees ?? [];
    if (trees.length === 0) return;  // desert holes have no trees — skip

    const pixelDist = Math.hypot(
      hole.teePosition.x - hole.pinPosition.x,
      hole.teePosition.y - hole.pinPosition.y
    );
    const pxPerYard = pixelDist / hole.yardsLength;
    const thresholdPx = 50 * pxPerYard;

    const fairwayXs = hole.fairwayBoundary.points.map(p => p.x);
    const minX = Math.min(...fairwayXs);
    const maxX = Math.max(...fairwayXs);

    const passing = trees.filter(t =>
      t.position.x >= minX - thresholdPx &&
      t.position.x <= maxX + thresholdPx
    );
    const ratio = passing.length / trees.length;
    expect(ratio, `${hole.name}: only ${Math.round(ratio * 100)}% of trees within 50 yards of fairway`).toBeGreaterThanOrEqual(0.8);
  });
});

it('CHG-REF-003: at least 80% of trees are within 80px of fairway bounding box X edges', () => {
  PRESET_HOLES.forEach(hole => {
    const trees = hole.trees ?? [];
    if (trees.length === 0) return;  // desert holes have no trees — skip

    const fairwayXs = hole.fairwayBoundary.points.map(p => p.x);
    const minX = Math.min(...fairwayXs);
    const maxX = Math.max(...fairwayXs);

    const nearFairway = trees.filter(tree =>
      tree.position.x <= minX + 80 || tree.position.x >= maxX - 80
    );

    const ratio = nearFairway.length / trees.length;
    expect(ratio, `${hole.name} tree proximity ratio`).toBeGreaterThanOrEqual(0.8);
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

  it('falls back to the pool when all candidates are excluded (single-item pool)', () => {
    const singleHole = PRESET_HOLES[0];
    const result = getRandomHole(singleHole, [singleHole]);
    expect(result).toBe(singleHole);
  });
});

describe('CHG-COURSE-007 — courses barrel', () => {
  it('ALL_COURSES contains 1 course and ALL_HOLES combines all holes', () => {
    expect(ALL_COURSES).toHaveLength(1);
    expect(ALL_COURSES[0].id).toBe('the-starter');
    expect(ALL_HOLES.length).toBe(
      ALL_COURSES.reduce((sum, c) => sum + c.holes.length, 0)
    );
  });
});

describe('CHG-COURSE-008 — PRESET_HOLES backward compatibility', () => {
  it('PRESET_HOLES equals ALL_HOLES (combined courses)', () => {
    expect(PRESET_HOLES).toBe(ALL_HOLES);
  });
});

describe('CHG-COURSE-009 — getRandomHole with combined pool', () => {
  it('getRandomHole returns holes from PRESET_HOLES which spans all courses', () => {
    // Run 50 draws and verify every result is in PRESET_HOLES (ALL_HOLES)
    for (let i = 0; i < 50; i++) {
      const hole = getRandomHole();
      expect(PRESET_HOLES).toContain(hole);
    }
  });
});

describe('CHG-COURSE-005 — classic course theme', () => {
  it('every The Starter hole has courseTheme of classic', () => {
    for (const hole of THE_STARTER.holes) {
      expect(hole.courseTheme, `${hole.name} must have courseTheme 'classic'`).toBe('classic');
    }
  });
});

describe('CHG-COURSE-006 — The Starter course', () => {
  it('THE_STARTER is a CourseDefinition with name, classic theme, and 18 holes', () => {
    expect(THE_STARTER.id).toBe('the-starter');
    expect(THE_STARTER.name).toBe('The Starter');
    expect(THE_STARTER.theme).toBe('classic');
    expect(THE_STARTER.holes).toHaveLength(18);
  });
});
