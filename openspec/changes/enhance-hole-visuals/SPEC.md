# Enhance Hole Visuals — Dense Trees, Rocks, Bushes, Flower Beds

> **Status:** DRAFT
> **Author:** Copilot (with human direction)
> **Created:** 2026-03-29
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-4.4 (Baseline First), ENG-1.2 (Cite law behind decisions)
> **Affected Files:** `src/domain/types.ts`, `src/data/holes.ts`, `src/data/holes.test.ts`, `src/components/HoleView.tsx`, `src/components/HoleView.test.tsx`

---

## Problem Statement

All 18 holes currently have only 8–18 trees (simple circles) as their sole decorative element beyond fairway, green, bunkers, and water. This makes every hole feel visually bland and sparse compared to real golf courses, which feature dense tree lines, rocky outcroppings, manicured bushes, and seasonal flower plantings.

### Evidence (Baseline Audit — 2026-03-29)

| Finding | Data |
|---------|------|
| **Tree count** | Range: 8–18 trees per hole (avg ~14) |
| **Tree type** | All identical — circles with gradient + highlight |
| **Decorative variety** | Zero — no rocks, bushes, flowers, or other features |
| **Rough areas** | Completely empty — flat green with no character |
| **Visual identity** | Holes are differentiated only by fairway shape and hazard placement |

### Real-World Comparison

Professional golf courses feature:
- **Dense tree lines** bordering fairways on both sides (50–200 trees visible per hole)
- **Specimen trees** — large, standalone trees that define hole character (Augusta National's Eisenhower Tree, Pebble Beach's Lone Cypress)
- **Rock formations** — boulders and rock clusters in rough areas, near water features (Pebble Beach, Banff Springs)
- **Manicured bushes** — hedges and shrubs between trees and along boundaries (Augusta's azaleas, TPC Sawgrass holly bushes)
- **Flower beds** — seasonal plantings near tee boxes and signature holes (Augusta's azaleas, dogwoods, redbud)

---

## Proposed Solution

Add four categories of purely **decorative** elements (no gameplay impact) to all 18 holes:

### Change 1 — Increase Tree Density

Increase trees from ~14 avg to **30–50 per hole**. Create dense tree lines bordering both sides of the fairway extending into rough areas. Vary tree sizes more aggressively (radius 6–18px).

| Metric | Before | After |
|--------|--------|-------|
| Trees per hole | 8–18 | 30–50 |
| Avg trees per hole | ~14 | ~40 |
| Tree radius range | 10–15px | 6–18px |

### Change 2 — Add Rock Clusters

Add **5–12 rocks per hole** scattered in rough areas, near water features, and along tree lines. Rocks are rendered as small rotated ellipses in grey/brown tones.

| Property | Value |
|----------|-------|
| Count per hole | 5–12 |
| Width range | 4–12px |
| Height range | 3–8px |
| Placement | Rough areas, near water edges, along tree lines |
| Rendering | Rotated ellipses with gradient |

### Change 3 — Add Bushes / Shrubs

Add **5–10 bushes per hole** clustered between trees, along fairway borders, and near greens. Smaller than trees with distinct lighter coloring.

| Property | Value |
|----------|-------|
| Count per hole | 5–10 |
| Radius range | 4–8px |
| Placement | Between trees, along fairway edges, near tee boxes |
| Rendering | Circles with distinct bush gradient (lighter, more yellow-green) |

### Change 4 — Add Flower Beds (Select Holes Only)

Add flower beds to **3–4 "specialty" holes** as signature visual accents. Small colorful clusters near tee boxes or greens.

| Property | Value |
|----------|-------|
| Holes with flowers | 3–4 (e.g., Azalea, The Welcome, The Finish Line) |
| Count per hole | 2–4 beds |
| Radius range | 3–6px |
| Colors | Pink, white, yellow, red (seasonal flowers) |
| Placement | Near tee boxes, alongside fairways, near clubhouse areas |

---

## Scope

### In Scope

1. **Type additions** — Add `Rock`, `Bush`, `FlowerBed` interfaces to `src/domain/types.ts`
2. **Type change** — Add optional `rocks?: Rock[]`, `bushes?: Bush[]`, `flowerBeds?: FlowerBed[]` to `HoleDefinition`
3. **Data change** — Increase tree count to 30–50 per hole in `src/data/holes.ts`
4. **Data change** — Add rocks, bushes arrays to all 18 holes in `src/data/holes.ts`
5. **Data change** — Add flowerBeds to 3–4 selected holes in `src/data/holes.ts`
6. **Rendering change** — Add SVG rendering layers for rocks, bushes, flower beds in `HoleView.tsx`
7. **Rendering change** — Add SVG gradient definitions for rocks, bushes, flower beds in `HoleView.tsx`
8. **Test changes** — Add data validation tests in `holes.test.ts`
9. **Test changes** — Add rendering tests in `HoleView.test.tsx`

### Out of Scope

- **Gameplay mechanics** — All new elements are purely decorative (no collision detection)
- **Game logic** (`game.ts`) — No changes needed; decorative elements don't affect scoring, distance, or shot placement
- **Fairway/green geometry** — Unchanged
- **Bunker/water geometry** — Unchanged
- **Hole names, par, yardage** — Unchanged
- **Cart paths** — Deferred to future proposal
- **Animated elements** — No animations for decorative features

---

## New Type Definitions

```typescript
export interface Rock {
  position: Point;
  width: number;   // 4–12px
  height: number;  // 3–8px
  rotation: number; // degrees, for visual variety
}

export interface Bush {
  position: Point;
  radius: number;  // 4–8px
}

export interface FlowerBed {
  position: Point;
  radius: number;  // 3–6px
  color: string;   // CSS color (e.g., '#e87da0', '#f5e642')
}
```

Updated `HoleDefinition`:
```typescript
export interface HoleDefinition {
  // ... existing fields unchanged ...
  trees?: TreeCluster[];
  rocks?: Rock[];
  bushes?: Bush[];
  flowerBeds?: FlowerBed[];
}
```

---

## Rendering Layers (SVG Z-Order)

New elements insert into existing layer stack:

| Layer | Element | Existing? |
|-------|---------|-----------|
| 1 | Rough background | ✅ Existing |
| 2 | Fairway | ✅ Existing |
| 3 | Sand bunkers | ✅ Existing |
| 4 | Water hazards | ✅ Existing |
| 5 | Green | ✅ Existing |
| **6** | **Rocks** | 🆕 New — render below trees |
| **7** | **Bushes** | 🆕 New — render below trees |
| **8** | **Flower beds** | 🆕 New — render below trees |
| 9 | Trees | ✅ Existing (moved up from layer 6) |
| 10 | Tee box | ✅ Existing |
| 11 | Pin flag | ✅ Existing |
| 12 | Ball / Shot UI | ✅ Existing |

---

## Design Decisions

### D1: Purely decorative — no collision

**Decision:** All new elements are visual-only. No collision detection, no stroke penalties.

**Rationale:** Per **ENG-2.3** (Scope discipline), adding gameplay mechanics for decorative elements would require changes to `game.ts`, new test scenarios for collision, and new state management. The user explicitly requested decorative-only features. Gameplay impact is out of scope.

### D2: Data-driven, not procedural

**Decision:** Hand-place all decorative elements in `holes.ts` data, not procedurally generated at render time.

**Rationale:** Per user preference. Hand-placement gives full artistic control over each hole's visual identity. Procedural generation could place elements in visually awkward positions.

### D3: Optional fields on HoleDefinition

**Decision:** `rocks`, `bushes`, `flowerBeds` are optional (`?`) on `HoleDefinition`.

**Rationale:** Per **ENG-2.3**, keeping backward compatibility. Existing tests and code that don't reference these fields continue to work. `trees` is already optional.

### D4: Flower beds limited to specialty holes

**Decision:** Only 3–4 holes get flower beds, per user direction.

**Rationale:** User specifically requested "keep flower beds to a small number of specialty holes." Azalea (named after flowers), The Welcome (opening hole), and The Finish Line (closing hole) are natural candidates.

### D5: Rock rotation property

**Decision:** Rocks have a `rotation` field (degrees) for visual variety.

**Rationale:** Without rotation, all rocks would be axis-aligned ellipses, looking artificial. Rotation at varied angles creates natural-looking scattered rocks.

---

## Design Constraints

Per **Section 2.1** (Coordinate System Invariants):
- All positions MUST be within the 400×600 SVG viewBox
- Elements should not visually overlap with gameplay areas (green, tee box, pin)

Per **Section 2.4** (Hole Data Integrity):
- Optional fields must have valid data when present (no empty arrays for required-per-hole features)
- All coordinates within viewBox bounds

---

## Test Scenarios

### Phase 1: Type & Structure Tests

#### Scenario: CHG-VIS-001 — Each hole has ≥25 trees
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `trees.length` is checked
- **THEN** the count is ≥ 25

#### Scenario: CHG-VIS-002 — Each hole has rocks array with ≥3 entries
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `rocks.length` is checked
- **THEN** the count is ≥ 3

#### Scenario: CHG-VIS-003 — Each hole has bushes array with ≥3 entries
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `bushes.length` is checked
- **THEN** the count is ≥ 3

#### Scenario: CHG-VIS-004 — Rocks have valid dimensions and position
- **GIVEN** each rock on each hole
- **WHEN** position, width, height, rotation are inspected
- **THEN** position.x is 0–400, position.y is 0–600, width > 0, height > 0, rotation is a number

#### Scenario: CHG-VIS-005 — Bushes have valid position and radius
- **GIVEN** each bush on each hole
- **WHEN** position and radius are inspected
- **THEN** position.x is 0–400, position.y is 0–600, radius > 0

#### Scenario: CHG-VIS-006 — FlowerBeds exist on 3–4 holes only
- **GIVEN** all holes in `PRESET_HOLES`
- **WHEN** holes with non-empty `flowerBeds` are counted
- **THEN** the count is 3 or 4

#### Scenario: CHG-VIS-007 — FlowerBeds have valid position, radius, and color
- **GIVEN** each flower bed on each hole that has them
- **WHEN** position, radius, color are inspected
- **THEN** position is within viewBox, radius > 0, color is a non-empty string

#### Scenario: CHG-VIS-008 — Tree radius range is 6–18px
- **GIVEN** each tree on each hole
- **WHEN** `radius` is checked
- **THEN** radius is ≥ 6 and ≤ 18

### Phase 2: Rendering Tests

#### Scenario: CHG-VIS-009 — HoleView renders rock elements
- **GIVEN** a hole definition with rocks
- **WHEN** HoleView is rendered
- **THEN** SVG elements with test ID or class for rocks are present

#### Scenario: CHG-VIS-010 — HoleView renders bush elements
- **GIVEN** a hole definition with bushes
- **WHEN** HoleView is rendered
- **THEN** SVG elements with test ID or class for bushes are present

#### Scenario: CHG-VIS-011 — HoleView renders flower bed elements
- **GIVEN** a hole definition with flowerBeds
- **WHEN** HoleView is rendered
- **THEN** SVG elements with test ID or class for flower beds are present

#### Scenario: CHG-VIS-012 — HoleView renders no flower beds when absent
- **GIVEN** a hole definition without flowerBeds
- **WHEN** HoleView is rendered
- **THEN** no flower bed SVG elements are present

### Unchanged Scenarios (Verify No Regression)

- All BASE-DATA-* scenarios — hole data integrity unchanged
- All CHG-18H-* scenarios — 18 holes, Par 72, distributions
- All BASE-SCORE-* scenarios — scoring logic untouched
- All BASE-SHOT-* scenarios — shot placement logic untouched
- All BASE-RENDER-* scenarios — existing rendering layers unchanged
- All CHG-GREEN-* scenarios — green geometry and pin logic untouched

---

## Implementation Tasks

Tasks ordered per Atomic TDD cycle (**ENG-4.1**).

### Phase 1 — Types (tasks 1–2)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 1 | Add `Rock`, `Bush`, `FlowerBed` interfaces to types.ts | CHG-VIS-004, -005, -007 | `types.ts` |
| 2 | Add optional `rocks?`, `bushes?`, `flowerBeds?` to `HoleDefinition` | CHG-VIS-002, -003, -006 | `types.ts` |

### Phase 2 — Data Validation Tests (tasks 3–10)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 3 | Test: each hole has ≥25 trees | CHG-VIS-001 | `holes.test.ts` |
| 4 | Test: each hole has rocks[] with ≥3 entries | CHG-VIS-002 | `holes.test.ts` |
| 5 | Test: each hole has bushes[] with ≥3 entries | CHG-VIS-003 | `holes.test.ts` |
| 6 | Test: rocks have valid dimensions and position | CHG-VIS-004 | `holes.test.ts` |
| 7 | Test: bushes have valid position and radius | CHG-VIS-005 | `holes.test.ts` |
| 8 | Test: flower beds on 3–4 holes only | CHG-VIS-006 | `holes.test.ts` |
| 9 | Test: flower beds have valid position/radius/color | CHG-VIS-007 | `holes.test.ts` |
| 10 | Test: tree radius range 6–18px | CHG-VIS-008 | `holes.test.ts` |

### Phase 3 — Hole Data Enhancement (tasks 11–16)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 11 | Enhance holes 1–3 — add dense trees, rocks, bushes (+ flowers on Azalea) | CHG-VIS-001–008 | `holes.ts` |
| 12 | Enhance holes 4–6 — add dense trees, rocks, bushes | CHG-VIS-001–005 | `holes.ts` |
| 13 | Enhance holes 7–9 — add dense trees, rocks, bushes | CHG-VIS-001–005 | `holes.ts` |
| 14 | Enhance holes 10–12 — add dense trees, rocks, bushes | CHG-VIS-001–005 | `holes.ts` |
| 15 | Enhance holes 13–15 — add dense trees, rocks, bushes (+ flowers on Cypress Point) | CHG-VIS-001–008 | `holes.ts` |
| 16 | Enhance holes 16–18 — add dense trees, rocks, bushes (+ flowers on The Finish Line) | CHG-VIS-001–008 | `holes.ts` |

### Phase 4 — Rendering (tasks 17–22)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 17 | Add SVG gradient/filter defs for rocks | — | `HoleView.tsx` |
| 18 | Add SVG gradient/filter defs for bushes and flower beds | — | `HoleView.tsx` |
| 19 | Test: HoleView renders rock elements | CHG-VIS-009 | `HoleView.test.tsx` |
| 20 | Test: HoleView renders bush elements | CHG-VIS-010 | `HoleView.test.tsx` |
| 21 | Test: HoleView renders flower bed elements (present + absent) | CHG-VIS-011, -012 | `HoleView.test.tsx` |
| 22 | Add rock, bush, flower bed rendering layers to HoleView.tsx | CHG-VIS-009–012 | `HoleView.tsx` |

### Phase 5 — Verification & Docs (tasks 23–24)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 23 | Full regression: run all tests + lint + build | — | — |
| 24 | Update baseline spec `hole-data/spec.md` with new decorative fields | — | `openspec/specs/hole-data/spec.md` |

---

## Hole-by-Hole Visual Enhancement Guide

Inspiration for each hole's decorative character:

| # | Name | Theme | Trees | Rocks | Bushes | Flowers |
|---|------|-------|-------|-------|--------|---------|
| 1 | The Welcome | Friendly parkland | Dense lines both sides | Few near water | Scattered along edges | ✅ Near tee box (welcoming) |
| 2 | Island Green | Coastal/lakeside | Perimeter ring | Rocky water edge | Sparse near tee | — |
| 3 | Azalea | Augusta-inspired | Dense pine backdrop | Natural stone groupings | Azalea-style clusters | ✅ Signature hole (pink/white) |
| 4 | The Cape | Links/coastal | Wind-blown clusters | Rocky shoreline | Low scrub bushes | — |
| 5 | Postage Stamp | Compact/tight | Dense surrounding walls | Boulder accents | Tight hedge clusters | — |
| 6 | The Fork | Woodland split | Dense at fork junction | Natural rock outcrops | Between tree clusters | — |
| 7 | Peninsula | Lakeside peninsula | Dense tree peninsula | Shoreline rocks | Waterside shrubs | — |
| 8 | The Bend | Forest bend | Dense dogleg corners | Scattered rough boulders | Understory bushes | — |
| 9 | The Drive | Long parkland | Tree-lined avenue | Minimal | Evenly spaced hedges | — |
| 10 | The Long Iron | Open/strategic | Strategic clusters | Rough area accents | Sparse | — |
| 11 | Creek Valley | Valley/creek | Valley wall trees | Creek bed rocks | Creek-side shrubs | — |
| 12 | The Closer | Challenge hole | Dense intimidating lines | Dramatic rock features | Dense understory | — |
| 13 | The Ridge | Elevated/ridge | Ridge-line trees | Ridge rock formations | Slope bushes | — |
| 14 | Cypress Point | Coastal cypress | Iconic cypress clusters | Coastal rocks | ✅ Ice plant style | ✅ Colorful ground cover |
| 15 | Eagle's Reach | Mountain meadow | Scattered alpine | Mountain rock clusters | Alpine shrubs | — |
| 16 | The Narrows | Tight corridor | Dense corridor walls | Scattered | Tight hedging | — |
| 17 | Amen Corner | Augusta tribute | Dense pine cathedral | Natural stone | Azalea bushes | — |
| 18 | The Finish Line | Grand finale | Grand avenue trees | Decorative boulders | Manicured hedges | ✅ Celebration flowers |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Performance with 40+ trees per hole | SVG rendering could slow on low-end devices | Monitor frame rate; trees use simple circles + gradients (lightweight) |
| Visual clutter | Too many elements make holes hard to read | Place elements outside fairway; use subtle sizes for rocks/bushes |
| Large data file (`holes.ts`) | File is already 56KB, will grow to ~80–100KB | Acceptable for static data; no runtime impact |
| Inconsistent visual quality | Some holes may look better than others | Use the hole theme guide above; visual review each batch |

---

## Acceptance Criteria

- [ ] All 18 holes have ≥25 trees (up from 8–18)
- [ ] All 18 holes have ≥3 rocks with valid dimensions
- [ ] All 18 holes have ≥3 bushes with valid position/radius
- [ ] 3–4 holes have flower beds with valid color/position
- [ ] Tree radii range from 6–18px (varied sizes)
- [ ] Rock, bush, flower bed SVG rendering layers exist in HoleView.tsx
- [ ] New SVG gradients defined for rocks and bushes
- [ ] All existing tests pass (no regressions)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Visual spot-check confirms holes look more like real golf courses
