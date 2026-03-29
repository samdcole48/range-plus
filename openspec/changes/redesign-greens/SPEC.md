# Redesign Greens — Shape Variety, Size Scaling, and Pin Placement

> **Status:** DRAFT
> **Author:** Copilot (with human direction)
> **Created:** 2026-03-29
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-4.4 (Baseline First), ENG-1.2 (Cite law behind decisions)
> **Affected Files:** `src/domain/types.ts`, `src/data/holes.ts`, `src/data/holes.test.ts`, `src/domain/game.ts`, `src/domain/game.test.ts`, `src/components/HoleView.tsx`, `src/components/HoleView.test.tsx`
> **Guide Spec:** `openspec/specs/green-design/spec.md`

---

## Problem Statement

All 18 greens in Range+ are near-identical circular shapes (~45px diameter) with pins positioned within ~2px of center. This creates repetitive gameplay where every approach shot feels the same regardless of hole character. Players reported that "greens feel small and all identical."

### Evidence (Baseline Audit — 2026-03-29)

| Finding | Data |
|---------|------|
| **Shape uniformity** | All 18 greens are circular blobs with ~12 evenly-spaced polygon points |
| **Size uniformity** | 16 of 18 greens are 42–54px wide (visually indistinguishable) |
| **Pin clustering** | Average pin offset from green centroid: 2.38px (range 0.66–4.16px) |
| **No par scaling** | Par-3, Par-4, and Par-5 greens are the same pixel size |
| **No strategic variety** | No front/back or left/right pin decisions — every approach targets center |

### Real-World Comparison

Real golf courses use diverse green shapes (kidney, oval, L-shaped, peanut, irregular) with 4–6 pin positions per green. Pin locations change daily and dramatically affect approach strategy (go long vs. short, favor left vs. right). Larger par holes have larger greens.

Full reference data: `openspec/specs/green-design/spec.md`

---

## Proposed Solution

Redesign all 18 green polygons and add multiple pin positions per green. Three changes:

### Change 1 — Green Shape Variety

Replace all 18 circular green polygons with diverse shapes from 7 categories:

| Shape | Description | Count | Assigned To |
|-------|-------------|-------|-------------|
| **Circular** | Round, even depth | 2–3 | Simple par-3s, friendly holes |
| **Oval** | Elongated on one axis | 3–4 | Versatile; any par |
| **Kidney** | Bean-shaped, concave edge | 3–4 | Strategic par-4s and par-5s |
| **L-Shaped** | Two lobes at right angle | 1–2 | Doglegs, signature holes |
| **Peanut** | Two lobes joined by narrow neck | 1–2 | Challenging par-5s |
| **Oblong** | Long and narrow | 1–2 | Par-3s requiring precision |
| **Irregular** | Asymmetric, organic | 2–3 | Character holes |

At least 4 of 7 categories must be represented. No category has more than 4 greens.

### Change 2 — Green Size Scaling by Par

Green pixel sizes must visually scale with par value:

| Par | Width Range (px) | Height Range (px) | Target Area (px²) |
|-----|-----------------|-------------------|-------------------|
| 3 | 35–50 | 30–45 | 900–1,800 |
| 4 | 40–60 | 35–55 | 1,200–2,600 |
| 5 | 50–75 | 45–70 | 1,800–4,000 |

> **Design philosophy:** Greens are intentionally oversized relative to real-world yard scaling. This is an accepted constraint of the 400×600 SVG medium. The priority is gameplay variety and visual distinction, not yard accuracy.

### Change 3 — Multiple Pin Positions

Each green defines 3–4 pin positions. One is randomly selected each time the hole is played.

- Pins must be inside the green polygon with ≥4px edge clearance
- Pins must be spread across the green (≥40% of longest axis between most distant pins)
- Pins must span front-to-back variety (at least 2 of 3 depth zones covered)
- Not all pins at center (≥2 pins must be ≥5px from centroid)

---

## Proposed Green Assignments

Each hole's new green shape, approximate dimensions, and pin placement strategy:

| # | Name | Par | Shape | Size (W×H px) | Pin Positions | Pin Strategy |
|---|------|-----|-------|---------------|---------------|--------------|
| 1 | The Welcome | 4 | Oval | 50×42 | 3 | Front-center, mid-right, back-left |
| 2 | Island Green | 3 | Circular | 42×40 | 3 | Front-center, mid-left, back-center |
| 3 | Azalea | 5 | Kidney | 65×55 | 4 | Front-right, mid-center, back-left, back-right |
| 4 | The Cape | 4 | L-Shaped | 55×50 | 4 | Front lobe center, back lobe center, front-left, back-right |
| 5 | Postage Stamp | 3 | Circular | 36×34 | 3 | Front-center, mid-center, back-center |
| 6 | The Fork | 4 | Peanut | 55×44 | 4 | Left lobe, right lobe, neck-left, neck-right |
| 7 | Peninsula | 5 | Kidney | 68×58 | 4 | Front-center, mid-left, back-center, back-right |
| 8 | The Bend | 4 | Irregular | 52×46 | 3 | Front-left, mid-right, back-center |
| 9 | The Drive | 4 | Oblong | 42×52 | 3 | Front-center, mid-center, back-center |
| 10 | The Long Iron | 3 | Oval | 48×38 | 3 | Front-left, mid-center, back-right |
| 11 | Creek Valley | 5 | Peanut | 62×55 | 4 | Left lobe, right lobe, front-center, back-center |
| 12 | The Closer | 4 | Kidney | 54×48 | 3 | Front-center, mid-left, back-right |
| 13 | The Ridge | 4 | Oval | 48×44 | 3 | Front-right, mid-center, back-left |
| 14 | Cypress Point | 3 | Irregular | 44×40 | 3 | Front-center, mid-left, back-right |
| 15 | Eagle's Reach | 5 | L-Shaped | 70×60 | 4 | Front lobe, back lobe, front-right, back-left |
| 16 | The Narrows | 4 | Oblong | 40×55 | 3 | Front-center, mid-center, back-center |
| 17 | Amen Corner | 4 | Irregular | 50×48 | 4 | Front-left, front-right, back-left, back-right |
| 18 | The Finish Line | 4 | Oval | 55×48 | 4 | Front-center, mid-left, mid-right, back-center |

**Shape distribution:** Circular ×2, Oval ×4, Kidney ×3, L-Shaped ×2, Peanut ×2, Oblong ×2, Irregular ×3 → 7 categories represented. Max per category: 4 ✓

---

## Scope

### In Scope

1. **Type change** — Add `pinPositions: Point[]` to `HoleDefinition` in `src/domain/types.ts`
2. **Game state change** — Add `activePinPosition: Point` to `GameState` in `src/domain/types.ts`
3. **Game logic change** — Update `createGameState` in `src/domain/game.ts` to randomly select a pin from `pinPositions` and store it in `activePinPosition`
4. **Game logic change** — Update `calculateDistanceYards` and `placeShot` in `src/domain/game.ts` to use `activePinPosition` from `GameState` instead of `hole.pinPosition`
5. **Rendering change** — Update `HoleView.tsx` to use `activePinPosition` from game state for pin rendering and distance calculations
6. **Data change** — Redesign all 18 `greenBoundary` polygons in `src/data/holes.ts` with varied shapes and sizes
7. **Data change** — Add `pinPositions` arrays (3–4 positions each) to all 18 holes in `src/data/holes.ts`
8. **Data change** — Set `pinPosition` on each hole to `pinPositions[0]` as the default/legacy value
9. **Test changes** — Update and add tests in `holes.test.ts`, `game.test.ts`, `HoleView.test.tsx`
10. **Spec updates** — Update baseline specs affected by the changes

### Out of Scope

- Hole names, IDs, par values, yardages — unchanged
- Fairway polygons — only adjusted if needed to contain a resized green (minimal changes)
- Bunker and water hazard geometry — unchanged (unless a resized green overlaps them)
- `holeSelection.ts` — random selection is unaffected
- Pin placement UI (no visual indicator of which pin position was selected)
- Course routing or hole ordering

---

## Design Decisions

### D1: Where does the active pin live?

**Decision:** Add `activePinPosition: Point` to `GameState`. Selected in `createGameState`.

**Rationale:** Per **ENG-3.5** (Immutability), `HoleDefinition` is static data and must not be mutated. The active pin is per-play state, which belongs in `GameState`. `createGameState` already handles per-play initialization.

**Impact:** All code that currently reads `state.hole.pinPosition` must be updated to read `state.activePinPosition`. This affects `game.ts` (distance calc, shot placement) and `HoleView.tsx` (pin rendering, distance display).

### D2: Keep `pinPosition` on `HoleDefinition`?

**Decision:** Yes — retain `pinPosition` as `pinPositions[0]` for backward compatibility and as a default.

**Rationale:** Per **ENG-2.3** (Minimize scope), keeping `pinPosition` avoids breaking any code paths that reference it during the migration. Tests can validate `pinPosition === pinPositions[0]`.

### D3: How is the random pin selected?

**Decision:** `createGameState` selects a random index from `hole.pinPositions` using `Math.random()`.

**Rationale:** Consistent with existing randomness pattern in `holeSelection.ts`. No seeding required per current architecture. (See QUIRK-DATA-001 for existing `Math.random()` usage.)

### D4: Green polygon redesign approach

**Decision:** Manually author new polygon coordinates for each hole, guided by the shape category in the assignment table above.

**Rationale:** These are artistic/design decisions that require human-guided iteration. Polygon coordinates must be validated visually and via automated tests (point-in-polygon for pins, containment in fairway).

### D5: Fairway adjustments

**Decision:** Minimal fairway adjustments only where a resized green extends beyond the current fairway boundary. Fairway changes are NOT a goal of this proposal.

**Rationale:** Per **ENG-2.3** (Scope discipline), fairway redesign is a separate concern. Only fix containment violations.

---

## Design Constraints

Per **Section 2.1** (Coordinate System Invariants):
- All geometry MUST use the 400×600 SVG viewBox coordinate space
- Polygons MUST form valid closed shapes (≥3 points; spec requires ≥8 for green shape fidelity)

Per **Section 2.2** (Game State Immutability / **ENG-3.5**):
- `GameState` transitions MUST return new objects. `activePinPosition` is set at init and read-only thereafter.

Per **Section 2.4** (Hole Data Integrity):
- Every hole MUST have: `pinPosition`, `greenBoundary`, `fairwayBoundary`, and all other required fields
- Green boundary MUST be a valid non-self-intersecting polygon

Per **openspec/specs/green-design/spec.md**:
- Green size ranges by par (Section 1)
- Shape variety minimums (Section 2)
- Pin placement rules (Section 3)
- Fairway containment (Section 4)

---

## Test Scenarios

### Phase 1: Type & Data Structure Tests

#### Scenario: CHG-GREEN-001 — HoleDefinition has pinPositions array
- **GIVEN** the `HoleDefinition` interface
- **WHEN** each hole in `PRESET_HOLES` is inspected
- **THEN** it has a `pinPositions` field that is an array of `Point` objects

#### Scenario: CHG-GREEN-002 — Each hole has 3 or 4 pin positions
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `pinPositions.length` is checked
- **THEN** the count is 3 or 4

#### Scenario: CHG-GREEN-003 — pinPosition equals pinPositions[0]
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `pinPosition` is compared to `pinPositions[0]`
- **THEN** they are deeply equal

#### Scenario: CHG-GREEN-004 — All pin positions are inside the green
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** each point in that hole's `pinPositions`
- **WHEN** `isPointInPolygon(point, greenBoundary)` is called
- **THEN** the result is `true`

### Phase 2: Green Geometry Tests

#### Scenario: CHG-GREEN-005 — Par-3 greens are smaller than par-4 on average
- **GIVEN** all holes grouped by par
- **WHEN** average green bounding box areas are compared
- **THEN** avg par-3 area < avg par-4 area

#### Scenario: CHG-GREEN-006 — Par-5 greens are larger than par-4 on average
- **GIVEN** all holes grouped by par
- **WHEN** average green bounding box areas are compared
- **THEN** avg par-5 area > avg par-4 area

#### Scenario: CHG-GREEN-007 — No green is below minimum playable size
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the green bounding box is calculated
- **THEN** width ≥ 35px AND height ≥ 30px

#### Scenario: CHG-GREEN-008 — Green polygons have ≥8 vertices
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `greenBoundary.points.length` is checked
- **THEN** it is ≥ 8

#### Scenario: CHG-GREEN-009 — All green vertices are inside the fairway
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** each point in that hole's `greenBoundary.points`
- **WHEN** `isPointInPolygon(point, fairwayBoundary)` is called
- **THEN** the result is `true`

### Phase 3: Pin Spread & Variety Tests

#### Scenario: CHG-GREEN-010 — Pin positions are spread across the green
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the maximum distance between any two pin positions is measured
- **AND** the green's longest axis is measured
- **THEN** max pin distance ≥ 40% of the longest axis

#### Scenario: CHG-GREEN-011 — Not all pins are at the centroid
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** the green centroid is calculated
- **WHEN** pin position distances from the centroid are measured
- **THEN** at least 2 pin positions are ≥ 5px from the centroid

### Phase 4: Game Logic Tests

#### Scenario: CHG-GREEN-012 — createGameState sets activePinPosition from pinPositions
- **GIVEN** a `HoleDefinition` with `pinPositions` containing 3+ entries
- **WHEN** `createGameState` is called
- **THEN** `activePinPosition` is one of the entries in `pinPositions`

#### Scenario: CHG-GREEN-013 — Distance calculation uses activePinPosition
- **GIVEN** a `GameState` with `activePinPosition` set
- **WHEN** `calculateDistanceYards` is called from tee to active pin
- **THEN** the result reflects the distance to the active pin, NOT to `hole.pinPosition`

#### Scenario: CHG-GREEN-014 — Shot to green uses activePinPosition for putt calculation
- **GIVEN** a `GameState` with `activePinPosition` at a specific location
- **WHEN** `placeShot` lands on the green
- **THEN** putt calculation (1-putt vs 2-putt) uses the distance to `activePinPosition`
- **AND** `ballPosition` moves to `activePinPosition` (not `hole.pinPosition`)

#### Scenario: CHG-GREEN-015 — activePinPosition does not change mid-hole
- **GIVEN** a `GameState` initialized with an `activePinPosition`
- **WHEN** multiple `placeShot` calls are made
- **THEN** `activePinPosition` remains the same value throughout

### Phase 5: Rendering Tests

#### Scenario: CHG-GREEN-016 — HoleView renders pin at activePinPosition
- **GIVEN** a game state with `activePinPosition` at coordinates (X, Y)
- **WHEN** HoleView renders
- **THEN** the pin flag is rendered at (X, Y), not at `hole.pinPosition`

### Unchanged Scenarios (Verify No Regression)

- BASE-DATA-003 — Unique IDs
- BASE-DATA-009 through BASE-DATA-012 — Valid geometry and required fields
- CHG-18H-001 through CHG-18H-005 — 18 holes, Par 72, correct distribution
- BASE-SCORE-001 through BASE-SCORE-008 — Scoring logic unchanged
- BASE-SHOT-001 through BASE-SHOT-013 — Shot placement logic behavior unchanged
- BASE-RENDER-001 through BASE-RENDER-006 — Rendering behavior unchanged (pin renders, but at new position)

---

## Implementation Tasks

Tasks are ordered to follow the Atomic TDD cycle (per **ENG-4.1**). Tests before production code. Data structure changes before logic changes.

### Phase 1 — Type & Data Structure (tasks 1–6)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 1 | Add `pinPositions: Point[]` to `HoleDefinition` type | CHG-GREEN-001 | `types.ts` |
| 2 | Add `activePinPosition: Point` to `GameState` type | CHG-GREEN-012 | `types.ts` |
| 3 | Test: each hole has `pinPositions` with 3–4 entries | CHG-GREEN-001, CHG-GREEN-002 | `holes.test.ts`, `holes.ts` |
| 4 | Test: `pinPosition === pinPositions[0]` for all holes | CHG-GREEN-003 | `holes.test.ts` |
| 5 | Test: all pin positions are inside the green | CHG-GREEN-004 | `holes.test.ts` |
| 6 | Add `pinPositions` arrays to all 18 holes in `holes.ts` | CHG-GREEN-001–004 | `holes.ts` |

### Phase 2 — Green Geometry Redesign (tasks 7–13)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 7 | Test: avg par-3 green area < avg par-4 green area | CHG-GREEN-005 | `holes.test.ts` |
| 8 | Test: avg par-5 green area > avg par-4 green area | CHG-GREEN-006 | `holes.test.ts` |
| 9 | Test: no green below minimum playable size | CHG-GREEN-007 | `holes.test.ts` |
| 10 | Test: green polygons have ≥8 vertices | CHG-GREEN-008 | `holes.test.ts` |
| 11 | Test: all green vertices inside fairway | CHG-GREEN-009 | `holes.test.ts` |
| 12 | Redesign green polygons for holes 1–9 | CHG-GREEN-005–009 | `holes.ts` |
| 13 | Redesign green polygons for holes 10–18 | CHG-GREEN-005–009 | `holes.ts` |

### Phase 3 — Pin Spread Validation (tasks 14–16)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 14 | Test: pin positions are spread ≥40% of longest axis | CHG-GREEN-010 | `holes.test.ts` |
| 15 | Test: not all pins at centroid (≥2 pins ≥5px away) | CHG-GREEN-011 | `holes.test.ts` |
| 16 | Adjust pin positions in `holes.ts` if any fail spread tests | CHG-GREEN-010–011 | `holes.ts` |

### Phase 4 — Game Logic (tasks 17–21)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 17 | Test: `createGameState` sets `activePinPosition` from `pinPositions` | CHG-GREEN-012 | `game.test.ts`, `game.ts` |
| 18 | Test: distance calc uses `activePinPosition` | CHG-GREEN-013 | `game.test.ts`, `game.ts` |
| 19 | Test: putt calc uses `activePinPosition` | CHG-GREEN-014 | `game.test.ts`, `game.ts` |
| 20 | Test: `activePinPosition` stable across shots | CHG-GREEN-015 | `game.test.ts` |
| 21 | Update `game.ts` to use `activePinPosition` throughout | CHG-GREEN-012–015 | `game.ts` |

### Phase 5 — Rendering (tasks 22–23)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 22 | Test: HoleView renders pin at `activePinPosition` | CHG-GREEN-016 | `HoleView.test.tsx` |
| 23 | Update `HoleView.tsx` to use `activePinPosition` | CHG-GREEN-016 | `HoleView.tsx` |

### Phase 6 — Spec & Docs (tasks 24–25)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 24 | Update baseline spec `hole-data/spec.md` with new fields | — | `openspec/specs/hole-data/spec.md` |
| 25 | Update `game-logic/spec.md` with `activePinPosition` scenarios | — | `openspec/specs/game-logic/spec.md` |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Resized green extends outside fairway | Rendering artifact — green sits on rough | CHG-GREEN-009 test catches this; fairway adjusted minimally if needed |
| Pin positions too close to green edge | Pin flag visually clips outside green | ≥4px edge clearance rule; visual spot-check per hole |
| `Math.random()` always selects same pin in tests | Flaky tests | Tests verify `activePinPosition ∈ pinPositions`, not which index |
| Large diff — 18 green polygons rewritten | Hard to review | Split into two commits (holes 1–9, holes 10–18); visual review each batch |
| Existing tests break due to `activePinPosition` | Regression | Update test fixtures first; maintain backward compat via `pinPosition` field |
| HoleView.test.tsx fixture needs `activePinPosition` | Test failure | Update test fixtures to include `activePinPosition` |

---

## Acceptance Criteria

- [ ] All 18 greens have `pinPositions` arrays with 3–4 entries each
- [ ] `pinPosition === pinPositions[0]` for all holes (backward compat)
- [ ] All pin positions pass `isPointInPolygon` against their green boundary
- [ ] Pin positions are spread across each green (≥40% longest axis)
- [ ] At least 4 of 7 green shape categories represented across 18 holes
- [ ] No shape category has more than 4 greens
- [ ] Par-3 avg green area < Par-4 avg < Par-5 avg
- [ ] No green below minimum size (35×30 px)
- [ ] `createGameState` randomly selects `activePinPosition` from `pinPositions`
- [ ] All game logic uses `activePinPosition` instead of `hole.pinPosition`
- [ ] HoleView renders pin at `activePinPosition`
- [ ] All existing tests pass (no regressions)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Visual spot-check of all 18 greens confirms varied shapes
