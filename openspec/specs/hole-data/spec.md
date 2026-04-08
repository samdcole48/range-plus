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

> Current course: The Starter — 18 holes (4× Par-3, 10× Par-4, 4× Par-5) = Par 72

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
- **THEN** it has: `id`, `name`, `par`, `teePosition`, `pinPosition`, `pinPositions`, `greenBoundary`, `fairwayBoundary`, `waterHazards`, `yardsLength`

#### Scenario: BASE-DATA-009b — Holes observe standardized orientation
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `teePosition.y` and `pinPosition.y` values are compared
- **THEN** `teePosition.y` is greater than `pinPosition.y` (tee at bottom, green at top of the 400×600 viewBox)
- **NOTE:** Tee y SHOULD be in the range 530–575; pin y SHOULD be in the range 50–130. Diagonal holes (e.g., tee bottom-left, green top-right) are permitted when the y-axis rule is satisfied.

#### Scenario: BASE-DATA-010 — Par values are 3, 4, or 5 only
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `par` value is checked
- **THEN** it is one of `3`, `4`, or `5`

#### Scenario: BASE-DATA-011 — Green boundary is a valid polygon
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `greenBoundary.points` array is checked
- **THEN** it contains at least 3 points (minimum for a polygon)

> **CHG-GREEN-008 upgrade:** Per the green redesign, green polygons MUST have ≥8 vertices for shape fidelity.

#### Scenario: CHG-GREEN-008 — Green polygons have ≥8 vertices
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `greenBoundary.points.length` is checked
- **THEN** it is ≥ 8

---

## Green Size Scaling

### Requirement: Green sizes visually scale with par value

> Per CHG-GREEN-005/006/007 — greens must be par-scaled and meet minimum playable size.

| Par | Width Range (px) | Height Range (px) | Target Area (px²) |
|-----|-----------------|-------------------|-------------------|
| 3 | 35–50 | 30–45 | 900–1,800 |
| 4 | 40–60 | 35–55 | 1,200–2,600 |
| 5 | 50–75 | 45–70 | 1,800–4,000 |

#### Scenario: CHG-GREEN-005 — Par-3 greens are smaller than par-4 on average
- **GIVEN** all holes grouped by par
- **WHEN** average green bounding-box areas are compared
- **THEN** avg par-3 area < avg par-4 area

#### Scenario: CHG-GREEN-006 — Par-5 greens are larger than par-4 on average
- **GIVEN** all holes grouped by par
- **WHEN** average green bounding-box areas are compared
- **THEN** avg par-5 area > avg par-4 area

#### Scenario: CHG-GREEN-007 — No green below minimum playable size
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the green bounding box is calculated
- **THEN** width ≥ 35px AND height ≥ 30px

---

## Green Containment

### Requirement: All green vertices must lie inside the fairway

#### Scenario: CHG-GREEN-009 — All green vertices are inside the fairway
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** each point in `greenBoundary.points`
- **WHEN** `isPointInPolygon(point, fairwayBoundary)` is called
- **THEN** the result is `true`

---

## Multiple Pin Positions

### Requirement: Each hole provides 3–4 pin positions for variety

> Per **CHG-GREEN-001–004** and **D1** (design decision) from `openspec/changes/redesign-greens/SPEC.md`.
>
> - `pinPositions: Point[]` holds 3–4 valid positions inside the green
> - `pinPosition` equals `pinPositions[0]` for backward compatibility
> - `activePinPosition` in `GameState` holds the randomly selected pin for the current round (see `game-logic/spec.md`)

#### Scenario: CHG-GREEN-001 — HoleDefinition has pinPositions array
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** its structure is validated
- **THEN** it has a `pinPositions` field that is an array of `Point` objects

#### Scenario: CHG-GREEN-002 — Each hole has 3 or 4 pin positions
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `pinPositions.length` is checked
- **THEN** the count is 3 or 4

#### Scenario: CHG-GREEN-003 — pinPosition equals pinPositions[0]
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `pinPosition` is compared to `pinPositions[0]`
- **THEN** they are deeply equal (backward compatibility guarantee)

#### Scenario: CHG-GREEN-004 — All pin positions are inside the green
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** each point in `pinPositions`
- **WHEN** `isPointInPolygon(point, greenBoundary)` is called
- **THEN** the result is `true`

---

## Pin Spread Validation

### Requirement: Pin positions span the green to provide strategic variety

#### Scenario: CHG-GREEN-010 — Pin positions are spread across the green
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the maximum distance between any two pin positions is measured
- **AND** the green's longest axis is measured
- **THEN** max pin distance ≥ 40% of the longest axis

#### Scenario: CHG-GREEN-011 — Not all pins at the centroid
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** the green centroid is calculated
- **WHEN** pin position distances from the centroid are measured
- **THEN** at least 2 pin positions are ≥ 5px from the centroid

#### Scenario: BASE-DATA-012 — Fairway boundary is a valid polygon
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `fairwayBoundary.points` array is checked
- **THEN** it contains at least 3 points

---

## Hole Names

### Reference: All 18 Holes

| # | ID | Name | Par | Yards |
|---|-----|------|-----|-------|
| 1 | hole-1 | The Welcome | 4 | 355 |
| 2 | hole-2 | Island Green | 3 | 145 |
| 3 | hole-3 | Azalea | 5 | 490 |
| 4 | hole-4 | The Cape | 4 | 370 |
| 5 | hole-5 | Postage Stamp | 3 | 125 |
| 6 | hole-6 | The Fork | 4 | 335 |
| 7 | hole-7 | Peninsula | 5 | 485 |
| 8 | hole-8 | The Bend | 4 | 360 |
| 9 | hole-9 | The Drive | 4 | 315 |
| 10 | hole-10 | The Long Iron | 3 | 170 |
| 11 | hole-11 | Creek Valley | 5 | 480 |
| 12 | hole-12 | The Closer | 4 | 385 |
| 13 | hole-13 | The Ridge | 4 | 365 |
| 14 | hole-14 | Cypress Point | 3 | 160 |
| 15 | hole-15 | Eagle's Reach | 5 | 505 |
| 16 | hole-16 | The Narrows | 4 | 350 |
| 17 | hole-17 | Amen Corner | 4 | 375 |
| 18 | hole-18 | The Finish Line | 4 | 395 |

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

---

## Decorative Visual Elements (Added: CHG-VIS-001 through CHG-VIS-008)

> **Added:** 2026-03-29 via `enhance-hole-visuals` change proposal

### Requirement: Each hole has dense tree coverage

#### Scenario: CHG-VIS-001 — Each hole has ≥25 trees
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `trees.length` is checked
- **THEN** the count is ≥ 25
- **AND** all tree radii are ≥ 6 and ≤ 18px

### Requirement: Each hole has rock clusters

#### Scenario: CHG-VIS-002 — Each hole has rocks array with ≥3 entries
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `rocks.length` is checked
- **THEN** the count is ≥ 3

#### Scenario: CHG-VIS-004 — Rock data validity
- **GIVEN** each rock on each hole
- **WHEN** position, width, height, rotation are inspected
- **THEN** position.x is 0–400, position.y is 0–600, width > 0, height > 0, rotation is a number

### Requirement: Each hole has bush/shrub clusters

#### Scenario: CHG-VIS-003 — Each hole has bushes array with ≥3 entries
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** `bushes.length` is checked
- **THEN** the count is ≥ 3

#### Scenario: CHG-VIS-005 — Bush data validity
- **GIVEN** each bush on each hole
- **WHEN** position and radius are inspected
- **THEN** position.x is 0–400, position.y is 0–600, radius > 0

### Requirement: Flower beds appear on 3–4 specialty holes only

#### Scenario: CHG-VIS-006 — FlowerBeds exist on 3–4 holes
- **GIVEN** all holes in `PRESET_HOLES`
- **WHEN** holes with non-empty `flowerBeds` are counted
- **THEN** the count is 3 or 4
- **AND** the specialty holes are: The Welcome (#1), Azalea (#3), Cypress Point (#14), The Finish Line (#18)

#### Scenario: CHG-VIS-007 — FlowerBed data validity
- **GIVEN** each flower bed on each hole that has them
- **WHEN** position, radius, color are inspected
- **THEN** position is within viewBox, radius > 0, color is a non-empty string

### New Type Definitions

```typescript
interface Rock {
  position: Point;
  width: number;   // 4–12px
  height: number;  // 3–8px
  rotation: number; // degrees, for visual variety
}

interface Bush {
  position: Point;
  radius: number;  // 4–8px
}

interface FlowerBed {
  position: Point;
  radius: number;  // 3–6px
  color: string;   // CSS color (e.g., '#e87da0', '#f5e642')
}
```

All fields added as optional to `HoleDefinition`: `rocks?`, `bushes?`, `flowerBeds?`.
