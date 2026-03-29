# Reposition Trees — Yard-Based Proximity to Fairway Edges

> **Status:** DRAFT  
> **Author:** Copilot (with human direction)  
> **Created:** 2026-03-29  
> **Constitutional Authority:** ENG-5.1, ENG-4.1, ENG-1.2  
> **Branch:** `feature/enhance-hole-visuals` (continuation)  
> **Affected Files:** `src/data/holes.ts`, `src/data/holes.test.ts`

---

## Problem Statement

An audit of all 18 holes revealed **182 trees** outside the 50-yard corridor. 12 of 17 measurable holes fail an 80% threshold. Trees at x=20–70 and x=355–395 (canvas extremes) are so far from the fairway they have zero influence on a player's shot decisions — they're background wallpaper.

### Audit Results (50-yard rule, ≥80% pass threshold)

| Hole | Pass % | Failing trees |
|------|--------|--------------|
| The Welcome | 56% ❌ | 13 |
| The Drive | 20% ❌ | 24 |
| The Closer | 36% ❌ | 19 |
| The Ridge | 46% ❌ | 16 |
| Cypress Point | 40% ❌ | 18 |
| The Finish Line | 46% ❌ | 16 |
| + 6 more holes | <80% ❌ | various |

### Why Yards, Not Pixels

The SVG canvas is 400×600px but holes vary from 125 yards (par-3) to 490 yards (par-5). The pixel-per-yard scale differs per hole:
- 490y hole (Azalea): 50y ≈ 52px  
- 125y hole (Postage Stamp): 50y ≈ 135px  

A pixel threshold is meaningless across holes with 4× different scales. A yard threshold is universally meaningful.

---

## Proposed Fix

### Rule: ≥80% of trees on every hole must be within 50 yards of the fairway bounding box

**Scale factor per hole:**
```
pxPerYard = sqrt((tee.x - pin.x)² + (tee.y - pin.y)²) / yardsLength
thresholdPx = 50 * pxPerYard
```

**Tree passes if:**
```
tree.x >= fairwayMinX - thresholdPx  AND  tree.x <= fairwayMaxX + thresholdPx
```

This creates a per-hole corridor: trees must be inside the fairway bounding box extended by 50 yards on each side.

### Tree Placement Philosophy

Trees that fail are at canvas extremes (x<80 or x>320 typically). They should be moved to just outside the fairway edges:
- Left side: `fairwayMinX - 5px` to `fairwayMinX - thresholdPx + 10px`
- Right side: `fairwayMaxX + 5px` to `fairwayMaxX + thresholdPx - 10px`

Keep natural variation in x (depth) and y (spread along the hole length). Vary radii 6–18px.

---

## Test Scenario

### CHG-YRD-001 — Trees within 50 yards of fairway (yard-scaled)

```typescript
it('CHG-YRD-001: ≥80% of trees are within 50 yards of fairway edges', () => {
  PRESET_HOLES.forEach(hole => {
    const pixelDist = Math.hypot(
      hole.teePosition.x - hole.pinPosition.x,
      hole.teePosition.y - hole.pinPosition.y
    );
    const pxPerYard = pixelDist / hole.yardsLength;
    const thresholdPx = 50 * pxPerYard;

    const fairwayXs = hole.fairwayBoundary.points.map(p => p.x);
    const minX = Math.min(...fairwayXs);
    const maxX = Math.max(...fairwayXs);

    const trees = hole.trees ?? [];
    const passing = trees.filter(t =>
      t.position.x >= minX - thresholdPx &&
      t.position.x <= maxX + thresholdPx
    );
    const ratio = passing.length / trees.length;
    expect(ratio).toBeGreaterThanOrEqual(0.8,
      `${hole.name}: only ${Math.round(ratio * 100)}% within 50 yards`
    );
  });
});
```

---

## Implementation Tasks

| # | Task | File |
|---|------|------|
| 1 | Write CHG-YRD-001 test → RED (fails on 12+ holes) | `holes.test.ts` |
| 2 | Reposition trees holes 1–6: move canvas-edge trees inside 50y corridor | `holes.ts` |
| 3 | Reposition trees holes 7–12: move canvas-edge trees inside 50y corridor | `holes.ts` |
| 4 | Reposition trees holes 13–18: move canvas-edge trees inside 50y corridor | `holes.ts` |
| 5 | Run full suite + lint + build — GREEN | — |
| 6 | Update tasks.md | `tasks.md` |

---

## Acceptance Criteria

- [ ] CHG-YRD-001 test written and passing
- [ ] ≥80% of trees per hole within 50 yards of fairway on all 18 holes
- [ ] Trees maintain ≥25 per hole with 6–18px radius variation
- [ ] All existing tests still pass
- [ ] Lint passes, build succeeds
