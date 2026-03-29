# Recalibrate Hole Yardages for Casual Golfers

> **Status:** DRAFT
> **Author:** Copilot (with human direction)
> **Created:** 2026-03-29
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-4.4 (Baseline First)
> **Affected Files:** `src/data/holes.ts`, `src/data/holes.test.ts`, `openspec/specs/hole-data/spec.md`

---

## Problem Statement

Range+ is designed for casual golfers, but the current 18-hole course totals **6,850 yards** — closer to PGA Tour setups (7,200–7,300 yards) than a typical public/municipal course. User testing confirmed that holes feel too long for the target audience.

### Evidence

| Course Type | Total Yardage | Source |
|-------------|---------------|--------|
| **PGA Tour** | 7,200–7,300 | Industry standard |
| **Range+ (current)** | **6,850** | `src/data/holes.ts` |
| **Public/Municipal (middle tees)** | 6,200–6,700 | caddiehq.com, golferhive.com |
| **Recreational (casual)** | 5,800–6,300 | back2basics.golf |

The par 3s are roughly in range, but par 4s (avg 408 yards) and par 5s (avg 526 yards) are calibrated for skilled players, not the casual audience this app targets.

---

## Proposed Solution

Reduce all 18 hole yardages to bring the total course length to approximately **6,200 yards**, targeting the middle-tee yardage of a typical public/municipal golf course. Par distribution (4× Par-3, 10× Par-4, 4× Par-5 = Par 72) is **unchanged**.

### Target Yardage Ranges (Casual/Public Course)

| Par | Current Avg | Target Avg | Target Range |
|-----|-------------|------------|--------------|
| 3   | 166 yds     | ~150 yds   | 125–175 yds  |
| 4   | 408 yds     | ~365 yds   | 335–400 yds  |
| 5   | 526 yds     | ~494 yds   | 480–510 yds  |

### Proposed Yardage Changes

| # | Name | Par | Current | Proposed | Change | Rationale |
|---|------|-----|---------|----------|--------|-----------|
| 1 | The Welcome | 4 | 380 | 345 | −35 | Opening hole — welcoming, mid-iron approach |
| 2 | Island Green | 3 | 155 | 145 | −10 | Short water hole, keep accessible |
| 3 | Azalea | 5 | 520 | 485 | −35 | Reachable in 3 for casual players |
| 4 | The Cape | 4 | 410 | 370 | −40 | Medium difficulty par 4 |
| 5 | Postage Stamp | 3 | 140 | 125 | −15 | Shortest par 3, fun wedge shot |
| 6 | The Fork | 4 | 370 | 335 | −35 | Short par 4, birdie opportunity |
| 7 | Peninsula | 5 | 530 | 500 | −30 | Mid-length par 5 |
| 8 | The Bend | 4 | 395 | 355 | −40 | Medium par 4 |
| 9 | The Drive | 4 | 420 | 375 | −45 | Turn hole, driver + mid-iron |
| 10 | The Long Iron | 3 | 195 | 175 | −20 | Longest par 3, now a 6-iron vs 4-iron |
| 11 | Creek Valley | 5 | 510 | 480 | −30 | Shortest par 5, very reachable |
| 12 | The Closer | 4 | 440 | 390 | −50 | Challenging but not brutal |
| 13 | The Ridge | 4 | 405 | 365 | −40 | Medium-long par 4 |
| 14 | Cypress Point | 3 | 175 | 160 | −15 | Mid-range par 3 |
| 15 | Eagle's Reach | 5 | 545 | 510 | −35 | Longest par 5, risk/reward preserved |
| 16 | The Narrows | 4 | 385 | 350 | −35 | Accuracy hole |
| 17 | Amen Corner | 4 | 425 | 380 | −45 | Signature hole, still challenging |
| 18 | The Finish Line | 4 | 450 | 400 | −50 | Longest par 4, proper finisher |

### Summary

| Metric | Current | Proposed | Change |
|--------|---------|----------|--------|
| **Total Yardage** | 6,850 | 6,245 | −605 |
| **Par 3 Avg** | 166 | 151 | −15 |
| **Par 4 Avg** | 408 | 367 | −41 |
| **Par 5 Avg** | 526 | 494 | −32 |
| **Par Distribution** | 4-10-4 (Par 72) | 4-10-4 (Par 72) | No change |

---

## Scope

### In Scope

1. **Update `yardsLength`** for all 18 holes in `src/data/holes.ts`
2. **Update baseline spec** — `openspec/specs/hole-data/spec.md` hole reference table with new yardages
3. **Update yardage realism test** — adjust acceptable ranges if needed
4. **Update `add-holes-18` spec** — mark yardages in that spec as superseded by this change

### Out of Scope

- Par values — unchanged
- Hole names, IDs, geometry — unchanged (SVG coordinates stay the same)
- Game logic (`src/domain/game.ts`) — scoring is yardage-agnostic
- `HoleView.tsx` — renders `yardsLength` from data, no changes needed
- `holeSelection.ts` — unaffected
- SVG polygon coordinates — yardage is a declared metadata field, not derived from geometry (see QUIRK-DATA-003)

---

## Design Constraints

Per **Section 2.4** (Hole Data Integrity):
- Par values MUST remain 3, 4, or 5
- All required fields must remain present

Per **QUIRK-DATA-003**:
- `yardsLength` is a declared value, not computed from SVG geometry
- Changing yardage does NOT require any coordinate changes

---

## Test Scenarios

### Updated Scenarios

#### Scenario: CHG-YARD-001 — Total course yardage is between 6,000 and 6,400
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** all `yardsLength` values are summed
- **THEN** the total is between 6,000 and 6,400 yards (inclusive)

#### Scenario: CHG-YARD-002 — Par 3 yardages are 100–200
- **GIVEN** each hole with `par === 3`
- **WHEN** `yardsLength` is checked
- **THEN** it is between 100 and 200 yards

#### Scenario: CHG-YARD-003 — Par 4 yardages are 300–420
- **GIVEN** each hole with `par === 4`
- **WHEN** `yardsLength` is checked
- **THEN** it is between 300 and 420 yards

#### Scenario: CHG-YARD-004 — Par 5 yardages are 450–550
- **GIVEN** each hole with `par === 5`
- **WHEN** `yardsLength` is checked
- **THEN** it is between 450 and 550 yards

#### Scenario: CHG-YARD-005 — Each hole still has a valid yardsLength
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `yardsLength` is checked
- **THEN** it is a positive integer

### Unchanged Scenarios (Verify No Regression)

- BASE-DATA-004 / CHG-18H-001 — Course has 18 holes
- BASE-DATA-005 / CHG-18H-002 — Course totals Par 72
- CHG-18H-003 through CHG-18H-005 — Par distribution 4-10-4
- BASE-DATA-003 — Unique IDs
- BASE-DATA-009 through BASE-DATA-012 — Valid geometry

---

## Implementation Tasks

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 1 | Add total course yardage range test (6,000–6,400) | CHG-YARD-001 | `holes.test.ts` |
| 2 | Update Par 3 yardage range test (100–200) | CHG-YARD-002 | `holes.test.ts` |
| 3 | Update Par 4 yardage range test (300–420) | CHG-YARD-003 | `holes.test.ts` |
| 4 | Update Par 5 yardage range test (450–550) | CHG-YARD-004 | `holes.test.ts` |
| 5 | Add positive integer yardsLength test | CHG-YARD-005 | `holes.test.ts` |
| 6 | Update all 18 `yardsLength` values in holes.ts | CHG-YARD-001 | `holes.ts` |
| 7 | Update baseline spec hole reference table | — | `openspec/specs/hole-data/spec.md` |
| 8 | Update add-holes-18 spec to note yardage superseded | — | `openspec/changes/add-holes-18/SPEC.md` |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Yardage shown in HUD no longer matches visual distance | Cosmetic confusion | Acceptable — QUIRK-DATA-003 already documents this disconnect |
| Existing yardage realism test may reject new values | Test failure | Update test ranges (task 2–4) before updating data (task 6) |
| User expectation mismatch if yardages feel too short | UX | Target 6,200 (middle of public course range), not minimum |

---

## Acceptance Criteria

- [ ] Total course yardage is between 6,000 and 6,400 yards
- [ ] Par 3 yardages: 100–200 yards each
- [ ] Par 4 yardages: 300–420 yards each
- [ ] Par 5 yardages: 450–550 yards each
- [ ] Par distribution unchanged: 4× Par-3, 10× Par-4, 4× Par-5 = Par 72
- [ ] All existing tests pass (no regressions)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Baseline spec updated with new yardages
