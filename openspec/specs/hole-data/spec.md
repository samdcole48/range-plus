# Hole Data & Selection — Baseline Specification

> **Status:** BASELINE (Adoption Snapshot)
> **Captured:** 2026-03-28
> **Purpose:** Document existing behavior BEFORE any changes (per ENG-4.4)
> **Source Files:** `src/data/holes.ts`, `src/data/holeSelection.ts`

---

## Preset Holes Data

### Requirement: Course provides a valid set of golf holes

#### Scenario: BASE-DATA-001 — Course has at least 6 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** its length is checked
- **THEN** it contains at least 6 holes

#### Scenario: BASE-DATA-002 — Course includes a mix of par 3, 4, and 5
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** par values are examined
- **THEN** the array contains at least one Par-3, one Par-4, and one Par-5

#### Scenario: BASE-DATA-003 — Each hole has a unique ID
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** all `id` values are collected
- **THEN** there are no duplicates

---

## Course Composition

### Requirement: Course is a Par-72 with correct distribution

> Current course: 18 holes (4× Par-3, 10× Par-4, 4× Par-5) = Par 72

#### Scenario: BASE-DATA-004 — Course has 18 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** its length is checked
- **THEN** it contains exactly 18 holes

#### Scenario: BASE-DATA-005 — Course totals Par 72
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** all par values are summed
- **THEN** the total is 72

#### Scenario: BASE-DATA-006 — Course has 4 Par-3 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** holes with `par === 3` are counted
- **THEN** the count is 4

#### Scenario: BASE-DATA-007 — Course has 10 Par-4 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** holes with `par === 4` are counted
- **THEN** the count is 10

#### Scenario: BASE-DATA-008 — Course has 4 Par-5 holes
- **GIVEN** the `PRESET_HOLES` array
- **WHEN** holes with `par === 5` are counted
- **THEN** the count is 4

---

## Hole Definition Integrity

### Requirement: Every hole has valid geometry and metadata

#### Scenario: BASE-DATA-009 — Every hole has required fields
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** its structure is validated
- **THEN** it has: `id`, `name`, `par`, `teePosition`, `pinPosition`, `greenBoundary`, `fairwayBoundary`, `waterHazards`, `yardsLength`

#### Scenario: BASE-DATA-010 — Par values are 3, 4, or 5 only
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `par` value is checked
- **THEN** it is one of `3`, `4`, or `5`

#### Scenario: BASE-DATA-011 — Green boundary is a valid polygon
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `greenBoundary.points` array is checked
- **THEN** it contains at least 3 points (minimum for a polygon)

#### Scenario: BASE-DATA-012 — Fairway boundary is a valid polygon
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `fairwayBoundary.points` array is checked
- **THEN** it contains at least 3 points

---

## Hole Names

### Reference: All 18 Holes

| # | ID | Name | Par | Yards |
|---|-----|------|-----|-------|
| 1 | hole-1 | The Welcome | 4 | 380 |
| 2 | hole-2 | Island Green | 3 | 155 |
| 3 | hole-3 | Azalea | 5 | 520 |
| 4 | hole-4 | The Cape | 4 | 410 |
| 5 | hole-5 | Postage Stamp | 3 | 140 |
| 6 | hole-6 | The Fork | 4 | 370 |
| 7 | hole-7 | Peninsula | 5 | 530 |
| 8 | hole-8 | The Bend | 4 | 395 |
| 9 | hole-9 | The Drive | 4 | 420 |
| 10 | hole-10 | The Long Iron | 3 | 195 |
| 11 | hole-11 | Creek Valley | 5 | 510 |
| 12 | hole-12 | The Closer | 4 | 440 |
| 13 | hole-13 | The Ridge | 4 | 405 |
| 14 | hole-14 | Cypress Point | 3 | 175 |
| 15 | hole-15 | Eagle's Reach | 5 | 545 |
| 16 | hole-16 | The Narrows | 4 | 385 |
| 17 | hole-17 | Amen Corner | 4 | 425 |
| 18 | hole-18 | The Finish Line | 4 | 450 |

---

## Random Hole Selection

### Requirement: Select a random hole from the course

#### Scenario: BASE-SEL-001 — Returns a hole from presets
- **GIVEN** `getRandomHole` is called with no arguments
- **WHEN** the result is checked
- **THEN** it is one of the holes in `PRESET_HOLES`

#### Scenario: BASE-SEL-002 — Excludes specified hole to avoid repeats
- **GIVEN** `getRandomHole` is called with an `exclude` parameter
- **WHEN** the result is checked
- **THEN** it is NOT the excluded hole
- **AND** it is one of the remaining holes in `PRESET_HOLES`

---

## Known Quirks / Potential Issues (Document Only)

| ID | Observation | Potential Issue |
|----|-------------|-----------------|
| QUIRK-DATA-001 | `getRandomHole` uses `Math.random()` — not seeded | Non-deterministic; hard to test exhaustively |
| QUIRK-DATA-002 | No validation that water hazard drop zones are on dry land | Drop zone could theoretically be inside another hazard |
| QUIRK-DATA-003 | Hole yardages are declarations, not computed from geometry | Mismatch between declared yards and pixel distance is possible |
