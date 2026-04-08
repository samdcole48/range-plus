# Redesign Fairways — Shape Variety, Organic Curves, and Routing Diversity

> **Status:** DRAFT
> **Author:** Copilot (with human direction)
> **Created:** 2026-04-08
> **Prerequisite:** `remove-bjc-course` proposal must be completed first
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-4.4 (Baseline First), ENG-1.2 (Cite law behind decisions)
> **Affected Files:** `src/data/courses/the-starter.ts`, `src/data/holes.test.ts`, `openspec/specs/hole-data/spec.md`
> **Baseline Spec:** `openspec/specs/hole-data/spec.md`

---

## Problem Statement

The majority of fairways on The Starter course are straight corridors from tee to green with little routing variety. Players find the holes repetitive and boring because almost every hole plays the same way: hit it straight up a narrow channel.

> **Note:** Black Jack's Crossing was removed in the `remove-bjc-course` proposal due to even worse fairway quality (4-vertex rectangles). This proposal targets The Starter only.

### Evidence (Fairway Geometry Audit — 2026-04-08)

| Finding | Data |
|---------|------|
| **Straight routing** | 13 of 18 Starter holes (72%) have a tee-to-pin lateral offset of ≤20px — effectively dead straight |
| **Low curvature** | 15 of 18 Starter holes (83%) have midpoint fairway deviation <15px from the tee-to-pin line |
| **Only 5 true doglegs** | Only Azalea, The Cape, Peninsula, The Bend, and Amen Corner have meaningful lateral offset |
| **No S-curves or boomerangs** | Zero holes feature a fairway that curves one way then reverses (S-shape, bayonet, or boomerang) |
| **Adequate vertex counts** | The Starter avg is ~22 vertices per fairway, but shapes are still primarily straight corridors |

### Real-World Comparison

Real golf courses feature diverse hole routings:

| Routing Type | Description | Real-World Frequency |
|--------------|-------------|---------------------|
| **Straight** | Tee to green in a line | ~25–30% of holes |
| **Dogleg left** | Fairway bends left | ~20–25% |
| **Dogleg right** | Fairway bends right | ~20–25% |
| **Double dogleg** | Fairway bends twice (S-curve) | ~5–10% |
| **Boomerang/Bayonet** | Sharp bend approaching 90°+ | ~3–5% |
| **Slight curve** | Gentle sweep left or right | ~15–20% |

Hard rectangular corners do not exist on real fairways. Even holes marketed as "straight" have gradual width transitions and organic edges with subtle curves.

---

## Proposed Solution

Redesign fairway polygons on The Starter course to introduce routing variety and organic shapes. Four changes:

### Change 1 — Fairway Routing Diversity Requirements

Each 18-hole course MUST include a minimum distribution of routing types. (Currently applies to The Starter; future courses must also comply.)

| Routing Type | Minimum per 18-Hole Course | Definition |
|--------------|---------------------------|------------|
| **Straight** | 3–6 | Tee-to-pin lateral offset ≤30px AND midpoint deviation <20px |
| **Dogleg** (left or right) | 5+ | Tee-to-pin lateral offset ≥60px OR midpoint deviation ≥30px |
| **S-curve / Double dogleg** | 2+ | Fairway changes lateral direction at least once (midpoint deviates opposite to the tee-to-pin offset) |
| **Slight curve** | 2+ | Midpoint deviation 20–40px from the tee-to-pin line, lateral offset <60px |

**No more than 6 holes per course may be classified as "Straight."**

### Change 2 — Minimum Fairway Vertex Count (Organic Shapes)

Fairway polygons MUST have enough vertices to create smooth, organic curves — not rectangles or simple geometric shapes with hard corners.

| Par | Minimum Fairway Vertices |
|-----|--------------------------|
| 3 | ≥12 |
| 4 | ≥16 |
| 5 | ≥20 |

**Rationale:** Par-3 holes are shorter and simpler but still need organic edges. Par-4 and Par-5 holes are longer with more routing complexity, requiring more points to define curves and width transitions. This eliminates the 4-vertex rectangular fairways that plague BJC.

### Change 3 — No Hard Corners (Organic Edge Rule)

Fairway polygons MUST NOT contain sharp right-angle or acute-angle corners. Specifically:

- **No interior angle < 90° between consecutive fairway vertices.** All transitions must be gradual curves.
- Practically, this means: when traversing the polygon, consecutive edge segments should not make sharp turns. The angle between any two adjacent edges (measured on the interior of the polygon) must be ≥ 90°.
- **Exception:** The polygon closure point (where the last vertex connects back to the first) is exempt if the start/end points are close together.

> **Design philosophy:** Real fairways have mowed grass edges that curve naturally. Even a sharp dogleg in real golf has a sweeping turn, not a 90° corner. More vertices at turn points create smoother visual curves.

### Change 4 — Fairway Width Variation

Fairways SHOULD vary in width along their length to create strategic interest:

- **Landing zones** (primary target areas off the tee) SHOULD be wider than the surrounding fairway
- **Pinch points** (narrow sections before hazards or bends) SHOULD be narrower
- At least 4 holes per course SHOULD have a notable pinch point (fairway narrows to ≤60% of its widest point)

> This is a SHOULD (recommendation), not a MUST, to allow design flexibility.

---

## Proposed Routing Assignments

### The Starter (18 Holes)

| # | Name | Par | Current Routing | Proposed Routing | Key Change |
|---|------|-----|-----------------|------------------|------------|
| 1 | The Welcome | 4 | Straight | Slight curve right | Add gentle rightward sweep; widen landing zone |
| 2 | Island Green | 3 | Straight | Straight | Keep as-is — island green is the feature |
| 3 | Azalea | 5 | Dogleg left | Dogleg left | Already good — increase vertex count for smoother curve |
| 4 | The Cape | 4 | Dogleg right | Dogleg right | Already good — smooth out hard corners |
| 5 | Postage Stamp | 3 | Straight | Straight | Keep — short par-3, precision is the challenge |
| 6 | The Fork | 4 | Straight (wide) | S-curve | Convert to S-shape: curve right off tee, then sweep left to green |
| 7 | Peninsula | 5 | Dogleg right | Double dogleg | Add second bend — sweep right, then back left toward peninsula green |
| 8 | The Bend | 4 | Dogleg right | Dogleg right (sharper) | Increase the curve intensity, add pinch point at the turn |
| 9 | The Drive | 4 | Straight | Slight curve left | Add subtle leftward sweep; reward aggressive drive line |
| 10 | The Long Iron | 3 | Straight | Straight | Keep — par-3, distance is the challenge |
| 11 | Creek Valley | 5 | Straight (wide) | S-curve | Sweep right past creek, then left toward green |
| 12 | The Closer | 4 | Slight angle | Dogleg left | Make the existing angle more pronounced with a clear bend |
| 13 | The Ridge | 4 | Straight | Slight curve right | Add gentle sweep, with elevated ridge feel via narrow pinch |
| 14 | Cypress Point | 3 | Straight | Straight | Keep — par-3 with water, simplicity is appropriate |
| 15 | Eagle's Reach | 5 | Straight | Dogleg left | Add clear leftward bend — reachable in two for big hitters who cut the corner |
| 16 | The Narrows | 4 | Straight | Slight curve left | Live up to the name: narrow pinch point plus gentle curve |
| 17 | Amen Corner | 4 | Dogleg left | Dogleg left (refined) | Already good — smooth out corners, add vertex count |
| 18 | The Finish Line | 4 | Straight | Slight curve right | Gentle rightward sweep to finish; dramatic wide landing zone |

**Resulting distribution:**
- Straight: 4 (holes 2, 5, 10, 14) ✓ within 3–6 range
- Dogleg: 6 (holes 3, 4, 8, 12, 15, 17) ✓ meets ≥5
- S-curve / Double dogleg: 2 (holes 6, 11) ✓ meets ≥2 — hole 7 also qualifies
- Slight curve: 5 (holes 1, 9, 13, 16, 18) ✓ meets ≥2

---

## Scope

### In Scope

1. **Fairway polygon redesign** — Rebuild all 18 Starter fairway polygons with organic shapes, increased vertex counts, and varied routing
2. **New spec scenarios** — Add fairway diversity and quality rules to `openspec/specs/hole-data/spec.md`
3. **New data tests** — Add tests validating vertex counts, routing diversity, and angle constraints
4. **Minor tee/pin position adjustments** — Where needed to support new routing (within orientation constraints)
5. **Tree/bush position adjustments** — Minor repositioning where fairway shape changes move trees into the fairway

### Out of Scope

- Green shapes, sizes, pin positions — unchanged (covered by `redesign-greens`)
- Game logic (`game.ts`) — no changes to scoring, distance, or collision
- HoleView rendering logic — SVG polygon rendering already handles any polygon shape
- Water hazard geometry — adjusted only if a reshaped fairway creates an overlap
- Bunker geometry — adjusted only if a reshaped fairway creates containment issues
- Hole names, IDs, par values, yardages — unchanged
- Course theme assignments — unchanged
- Black Jack's Crossing — removed in separate `remove-bjc-course` proposal

---

## Design Decisions

### D1: How do we define "routing type" algorithmically?

**Decision:** Use two metrics — **tee-to-pin lateral offset** and **midpoint fairway deviation** — to classify each hole.

| Metric | Definition |
|--------|------------|
| **Lateral offset** | `abs(teePosition.x - pinPosition.x)` in pixels |
| **Midpoint deviation** | The lateral distance between the center of the fairway at y=50% and the straight tee-to-pin line |

**Classification rules:**
- **Straight:** lateral offset ≤30px AND midpoint deviation <20px
- **Slight curve:** midpoint deviation 20–40px AND lateral offset <60px
- **Dogleg:** lateral offset ≥60px OR midpoint deviation ≥40px
- **S-curve:** the fairway center crosses the tee-to-pin line (deviation changes sign between 25% and 75% of the y-range)

**Rationale:** These are measurable from polygon data and can be validated in automated tests. Per **ENG-4.1**, all constraints must be testable.

### D2: What minimum vertex count per par?

**Decision:** Par-3 ≥12, Par-4 ≥16, Par-5 ≥20.

**Rationale:** A circle needs ~12 points to appear smooth. Longer fairways with curves need more points per turn. The current BJC 4-vertex fairways are the worst offenders and would need 3–5× more vertices. Per **ENG-3.1** (Complexity), we don't over-specify — these minimums allow design freedom while preventing rectangles.

### D3: How do we enforce "no hard corners"?

**Decision:** Measure the interior angle at each vertex of the fairway polygon. All interior angles must be ≥90°.

**Implementation:** For consecutive vertices A→B→C, compute the angle at B using the cross product and dot product of vectors BA and BC. The interior angle of the polygon at that vertex must be ≥90°.

**Rationale:** This is a geometric invariant that can be computed and tested automatically. It prevents the hard rectangular corners that make BJC fairways look artificial. Per **ENG-4.6**, all data integrity rules must have corresponding tests.

### D4: Should we adjust tee/pin positions?

**Decision:** Minimal adjustments only. Tee and pin positions MAY be moved laterally (x-axis) to support new routing, but MUST remain within the orientation constraints of **BASE-DATA-009b** (tee y=530–575, pin y=50–130, tee.y > pin.y).

**Rationale:** Per **ENG-2.3** (Scope discipline), tee/pin position changes should be minimal. Dogleg and S-curve routing is primarily achieved through fairway shape, not by moving endpoints.

### D5: Single-course scope

**Decision:** This proposal targets The Starter (18 holes) only. Black Jack's Crossing was removed in the `remove-bjc-course` proposal.

**Rationale:** Per **ENG-2.3** (Scope discipline), BJC removal is a separate concern handled by its own proposal. Future courses will be designed from scratch with these fairway rules already in place.

---

## Design Constraints

Per **Section 2.1** (Coordinate System Invariants):
- All geometry MUST use the 400×600 SVG viewBox coordinate space
- Polygons MUST form valid closed shapes
- **Hole orientation is standardized: tee at bottom (y ~530–575), pin at top (y ~50–130). Bottom-to-top play direction. No exceptions.**
- Diagonal holes (tee bottom-left, green top-right) ARE permitted when the y-axis rule is satisfied

Per **Section 2.4** (Hole Data Integrity):
- Every hole MUST have a valid `fairwayBoundary` polygon
- Green boundary MUST be fully contained within the fairway

Per **BASE-DATA-009b**:
- `teePosition.y` MUST be greater than `pinPosition.y`

Per **CHG-GREEN-009**:
- All green vertices MUST remain inside the fairway after redesign

---

## Test Scenarios

### Phase 1: Fairway Vertex Count (Organic Shape)

#### Scenario: CHG-FWY-001 — Par-3 fairways have ≥12 vertices
- **GIVEN** each hole in `PRESET_HOLES` with `par === 3`
- **WHEN** `fairwayBoundary.points.length` is checked
- **THEN** it is ≥ 12

#### Scenario: CHG-FWY-002 — Par-4 fairways have ≥16 vertices
- **GIVEN** each hole in `PRESET_HOLES` with `par === 4`
- **WHEN** `fairwayBoundary.points.length` is checked
- **THEN** it is ≥ 16

#### Scenario: CHG-FWY-003 — Par-5 fairways have ≥20 vertices
- **GIVEN** each hole in `PRESET_HOLES` with `par === 5`
- **WHEN** `fairwayBoundary.points.length` is checked
- **THEN** it is ≥ 20

### Phase 2: No Hard Corners (Angle Constraint)

#### Scenario: CHG-FWY-004 — No fairway interior angle below 90°
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** each consecutive vertex triple (A, B, C) in `fairwayBoundary.points`
- **WHEN** the interior angle at B is calculated
- **THEN** it is ≥ 90°

### Phase 3: Routing Diversity (Course-Level)

#### Scenario: CHG-FWY-005 — Course has ≤6 straight holes
- **GIVEN** all holes in The Starter course
- **WHEN** holes are classified by routing type
- **THEN** the count of "Straight" holes is ≤ 6

#### Scenario: CHG-FWY-006 — Course has ≥5 dogleg holes
- **GIVEN** all holes in The Starter course
- **WHEN** holes are classified by routing type
- **THEN** the count of "Dogleg" holes is ≥ 5

#### Scenario: CHG-FWY-007 — Course has ≥2 S-curve or double dogleg holes
- **GIVEN** all holes in The Starter course
- **WHEN** holes are classified by routing type
- **THEN** the count of "S-curve" or "Double dogleg" holes is ≥ 2

### Phase 4: Existing Constraints Still Hold

#### Scenario: CHG-FWY-011 — All green vertices remain inside fairway (regression)
- **GIVEN** each hole in `PRESET_HOLES` after fairway redesign
- **AND** each point in `greenBoundary.points`
- **WHEN** `isPointInPolygon(point, fairwayBoundary)` is called
- **THEN** the result is `true`
- **NOTE:** This is a re-run of CHG-GREEN-009 to catch regressions

#### Scenario: CHG-FWY-012 — All pin positions remain inside green (regression)
- **GIVEN** each hole in `PRESET_HOLES` after fairway redesign
- **AND** each point in `pinPositions`
- **WHEN** `isPointInPolygon(point, greenBoundary)` is called
- **THEN** the result is `true`
- **NOTE:** Re-run of CHG-GREEN-004

#### Scenario: CHG-FWY-013 — Orientation rule still holds (regression)
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `teePosition.y` and `pinPosition.y` are compared
- **THEN** `teePosition.y > pinPosition.y`
- **NOTE:** Re-run of BASE-DATA-009b

### Unchanged Scenarios (Verify No Regression)

- BASE-DATA-001 through BASE-DATA-012 — All existing hole data integrity
- CHG-GREEN-001 through CHG-GREEN-011 — Green geometry and pin placement
- All game logic scenarios — no changes to `game.ts`
- All rendering scenarios — SVG handles any polygon shape

---

## Implementation Tasks

Tasks are ordered to follow the Atomic TDD cycle (per **ENG-4.1**). Tests before production code.

### Phase 1 — Vertex Count Tests & Fixes (tasks 1–4)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 1 | Test: Par-3 fairways have ≥12 vertices | CHG-FWY-001 | `holes.test.ts` |
| 2 | Test: Par-4 fairways have ≥16 vertices | CHG-FWY-002 | `holes.test.ts` |
| 3 | Test: Par-5 fairways have ≥20 vertices | CHG-FWY-003 | `holes.test.ts` |
| 4 | Rebuild The Starter fairway polygons to meet vertex minimums | CHG-FWY-001–003 | `the-starter.ts` |

### Phase 2 — Angle Constraint Tests & Fixes (tasks 5–7)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 5 | Add `interiorAngle` helper to test utilities | CHG-FWY-004 | `holes.test.ts` |
| 6 | Test: No fairway interior angle below 90° | CHG-FWY-004 | `holes.test.ts` |
| 7 | Fix The Starter fairway angles violating 90° minimum | CHG-FWY-004 | `the-starter.ts` |

### Phase 3 — Routing Diversity Tests & Redesign (tasks 8–13)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 8 | Add `classifyRouting` helper to test utilities | CHG-FWY-005–007 | `holes.test.ts` |
| 9 | Test: Course has ≤6 straight holes | CHG-FWY-005 | `holes.test.ts` |
| 10 | Test: Course has ≥5 dogleg holes | CHG-FWY-006 | `holes.test.ts` |
| 11 | Test: Course has ≥2 S-curve holes | CHG-FWY-007 | `holes.test.ts` |
| 12 | Redesign The Starter fairways for routing diversity | CHG-FWY-005–007 | `the-starter.ts` |
| 13 | Adjust trees/bushes displaced by fairway changes | CHG-FWY-011 | `the-starter.ts` |

### Phase 4 — Regression & Spec Updates (tasks 14–17)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 14 | Verify all green containment tests pass | CHG-FWY-011 | `holes.test.ts` |
| 15 | Verify all pin containment tests pass | CHG-FWY-012 | `holes.test.ts` |
| 16 | Verify orientation rule holds | CHG-FWY-013 | `holes.test.ts` |
| 17 | Update `openspec/specs/hole-data/spec.md` with new fairway rules | — | `hole-data/spec.md` |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Reshaped fairway no longer contains green | Green renders on rough; CHG-GREEN-009 fails | CHG-FWY-011 regression test; adjust fairway to wrap green |
| New fairway shape overlaps water hazard awkwardly | Visual artifact | Manual visual check; adjust hazard position if needed |
| 90° angle rule is too strict for some tight doglegs | Cannot create sharp enough bends | Use more vertices at turn points to create smooth tight curves that satisfy the rule |
| Large diff — 18 fairway polygons rewritten | Hard to review | Split into routing type batches; visual review each |
| Tree/bush positions now inside fairway | Visual clutter | Task 13 adjusts displaced decorative elements |
| Classification algorithm disagrees with design intent | Test fails despite visually good routing | Tune classification thresholds in D1; routing classification is a guideline enforced at course level |

---

## Acceptance Criteria

- [ ] All Par-3 fairways have ≥12 vertices
- [ ] All Par-4 fairways have ≥16 vertices
- [ ] All Par-5 fairways have ≥20 vertices
- [ ] No fairway polygon has an interior angle <90°
- [ ] The Starter has ≤6 straight holes and ≥5 doglegs and ≥2 S-curves
- [ ] All green vertices remain inside their fairway (CHG-GREEN-009 regression)
- [ ] All pin positions remain inside their green (CHG-GREEN-004 regression)
- [ ] Orientation rule holds for all holes (BASE-DATA-009b regression)
- [ ] All existing tests pass (no regressions)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Visual spot-check confirms organic, curved fairways with varied routing
