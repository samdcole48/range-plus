# Add 6 Holes to Complete 18-Hole Par-72 Course

> **Status:** DRAFT
> **Author:** Copilot (with human direction)
> **Created:** 2026-03-28
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-4.4 (Baseline First)
> **Affected Files:** `src/data/holes.ts`, `src/data/holes.test.ts`, `openspec/specs/hole-data/spec.md`

---

## Problem Statement

Range+ currently offers a 12-hole Par-48 course (3× Par-3, 6× Par-4, 3× Par-5). A standard golf round is 18 holes at Par 72. Expanding to 18 holes delivers a full regulation-length experience and increases gameplay variety.

---

## Proposed Solution

Add 6 new hole definitions to `PRESET_HOLES` in `src/data/holes.ts`, bringing the total to **18 holes** with a combined **Par 72**.

### New Par Distribution

| Par | Current Count | New Holes | Final Count | Standard 18-Hole |
|-----|--------------|-----------|-------------|------------------|
| 3   | 3            | +1        | **4**       | 4                |
| 4   | 6            | +4        | **10**      | 10               |
| 5   | 3            | +1        | **4**       | 4                |
| **Total** | **12 (Par 48)** | **+6 (Par 24)** | **18 (Par 72)** | **18 (Par 72)** |

This matches the standard PGA par distribution for an 18-hole course.

### Proposed New Holes

| #  | ID            | Name              | Par | Yards | Design Concept |
|----|---------------|-------------------|-----|-------|----------------|
| 13 | hole-13-par4  | The Ridge         | 4   | 405   | Elevated tee, fairway narrows at landing zone, bunkers guarding green |
| 14 | hole-14-par3  | Cypress Point     | 3   | 175   | Coastal-inspired par 3 with water left, bunkers right |
| 15 | hole-15-par5  | Eagle's Reach     | 5   | 545   | Wide fairway with risk/reward second shot over water to reach green in two |
| 16 | hole-16-par4  | The Narrows        | 4   | 385   | Tight fairway lined with trees, premium on accuracy |
| 17 | hole-17-par4  | Amen Corner       | 4   | 425   | Dogleg left with water hazard along the inside of the turn |
| 18 | hole-18-par4  | The Finish Line   | 4   | 450   | Signature closing hole, long and challenging with bunkers and water |

---

## Scope

### In Scope

1. **6 new `HoleDefinition` objects** in `src/data/holes.ts` — each with complete geometry (tee, pin, green, fairway, hazards, bunkers, trees) in the 400×600 SVG viewBox coordinate space
2. **Update baseline spec** — `openspec/specs/hole-data/spec.md` scenarios that reference "12 holes" and "Par 48" must be updated to "18 holes" and "Par 72"
3. **New test scenarios** — validate the new course composition (18 holes, Par 72, 4× Par-3, 10× Par-4, 4× Par-5)
4. **Update existing tests** — `holes.test.ts` assertions that hardcode 12 or 48 must be updated
5. **Update documentation comments** — the JSDoc comment at the top of `holes.ts` referencing "12 unique holes (par 48)"

### Out of Scope

- Changes to game logic (`src/domain/game.ts`) — scoring, physics, and state management are hole-count agnostic
- Changes to `HoleView.tsx` — the component renders any `HoleDefinition` generically
- Changes to `holeSelection.ts` — `getRandomHole()` operates on `PRESET_HOLES` dynamically
- Changes to `App.tsx` — no hardcoded hole count references
- Front-nine / back-nine split or ordered play — holes are selected randomly (existing behavior)
- Course routing or sequential hole ordering

---

## Design Constraints

Per **Section 2.1** (Coordinate System Invariants):
- All geometry MUST use the 400×600 SVG viewBox coordinate space
- Polygons (fairway, green, bunkers, water) MUST form valid closed shapes (≥3 points)

Per **Section 2.4** (Hole Data Integrity):
- Every hole MUST have: `id`, `name`, `par` (3|4|5), `teePosition`, `pinPosition`, `greenBoundary`, `fairwayBoundary`, `waterHazards`, `yardsLength`
- Fairways MUST wrap around greens (green renders on top of contiguous turf)
- Water hazard `dropZone` MUST be on dry land (inside fairway, outside water)

Per **ENG-3.5** (Immutability):
- `PRESET_HOLES` remains a `const` array of immutable `HoleDefinition` objects

---

## Hole Design Guidelines

Each new hole should:
1. Have a **unique visual character** — different shape, hazard placement, or strategic challenge
2. Use **realistic yardages** for its par (Par-3: 130–220y, Par-4: 350–470y, Par-5: 500–600y)
3. Include **at least one strategic hazard** (water, bunkers, or tree lines) that creates decision-making
4. Have a green with **organic, non-circular shape** (≥8 boundary points for visual quality)
5. Follow the established coordinate convention: tee at bottom (~y:550-570), pin at top (~y:40-120)

---

## Test Scenarios

### Updated Baseline Scenarios

#### Scenario: CHG-18H-001 — Course has 18 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** its length is checked
- **THEN** it contains exactly 18 holes
- **SUPERSEDES:** BASE-DATA-004

#### Scenario: CHG-18H-002 — Course totals Par 72
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** all par values are summed
- **THEN** the total is 72
- **SUPERSEDES:** BASE-DATA-005

#### Scenario: CHG-18H-003 — Course has 4 Par-3 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** holes with `par === 3` are counted
- **THEN** the count is 4
- **SUPERSEDES:** BASE-DATA-006

#### Scenario: CHG-18H-004 — Course has 10 Par-4 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** holes with `par === 4` are counted
- **THEN** the count is 10
- **SUPERSEDES:** BASE-DATA-007

#### Scenario: CHG-18H-005 — Course has 4 Par-5 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** holes with `par === 5` are counted
- **THEN** the count is 4
- **SUPERSEDES:** BASE-DATA-008

### New Validation Scenarios

#### Scenario: CHG-18H-006 — New holes have unique IDs
- **GIVEN** holes 13–18 in `PRESET_HOLES`
- **WHEN** their `id` values are checked against all other holes
- **THEN** there are no duplicates
- **NOTE:** Covered by existing BASE-DATA-003

#### Scenario: CHG-18H-007 — New holes have valid geometry
- **GIVEN** each of the 6 new holes
- **WHEN** their structure is validated
- **THEN** each has valid `greenBoundary` (≥3 points), valid `fairwayBoundary` (≥3 points), and all required fields
- **NOTE:** Covered by existing BASE-DATA-009 through BASE-DATA-012

#### Scenario: CHG-18H-008 — New hole yardages are realistic for their par
- **GIVEN** each of the 6 new holes
- **WHEN** yardage is compared to par
- **THEN** Par-3 holes are 100–250 yards, Par-4 holes are 300–500 yards, Par-5 holes are 450–650 yards

---

## Implementation Tasks

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 1 | Update course count test: 12 → 18 holes | CHG-18H-001 | `holes.test.ts` |
| 2 | Update course par test: Par 48 → Par 72 | CHG-18H-002 | `holes.test.ts` |
| 3 | Update Par-3 count test: 3 → 4 | CHG-18H-003 | `holes.test.ts` |
| 4 | Update Par-4 count test: 6 → 10 | CHG-18H-004 | `holes.test.ts` |
| 5 | Update Par-5 count test: 3 → 4 | CHG-18H-005 | `holes.test.ts` |
| 6 | Add yardage realism test | CHG-18H-008 | `holes.test.ts` |
| 7 | Add Hole 13 — The Ridge (Par 4, 405y) | CHG-18H-001 | `holes.ts` |
| 8 | Add Hole 14 — Cypress Point (Par 3, 175y) | CHG-18H-001 | `holes.ts` |
| 9 | Add Hole 15 — Eagle's Reach (Par 5, 545y) | CHG-18H-001 | `holes.ts` |
| 10 | Add Hole 16 — The Narrows (Par 4, 385y) | CHG-18H-001 | `holes.ts` |
| 11 | Add Hole 17 — Amen Corner (Par 4, 425y) | CHG-18H-001 | `holes.ts` |
| 12 | Add Hole 18 — The Finish Line (Par 4, 450y) | CHG-18H-001 | `holes.ts` |
| 13 | Update `holes.ts` JSDoc comment | — | `holes.ts` |
| 14 | Update baseline spec to reflect 18/72 | — | `openspec/specs/hole-data/spec.md` |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| New hole geometry overlaps or looks wrong in SVG | Visual bugs | Manual visual review after implementation; each hole tested in isolation |
| Water hazard drop zones inside water | Gameplay bug | Test that each drop zone is inside fairway and outside water polygons |
| Breaking existing tests | Regression | Update count-based tests (tasks 1–5) BEFORE adding holes |
| Bundle size increase | Performance | ~5KB additional JSON data — negligible for a static SPA |

---

## Acceptance Criteria

- [ ] `PRESET_HOLES.length === 18`
- [ ] Sum of all par values === 72
- [ ] Par distribution: 4× Par-3, 10× Par-4, 4× Par-5
- [ ] All 18 holes pass existing integrity tests (unique IDs, valid polygons, required fields)
- [ ] All 6 new holes have realistic yardages for their par
- [ ] All tests pass (`npx vitest run`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Baseline spec updated to reflect 18-hole course
