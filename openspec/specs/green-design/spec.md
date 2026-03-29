# Green Design — Specification

> **Status:** BASELINE
> **Created:** 2026-03-29
> **Purpose:** Define acceptance criteria for green geometry, shape variety, pin placement, and visual distinction across all 18 holes
> **Constitutional Authority:** ENG-4.4 (Specification before implementation), ENG-1.2 (Cite law behind decisions)
> **Related Files:** `src/data/holes.ts`, `src/domain/types.ts`, `openspec/specs/hole-data/spec.md`

---

## Overview

This spec governs how putting greens are designed in Range+. Greens are the primary scoring target in every hole and a key driver of visual variety and strategic decision-making. This spec exists because the original 18 greens were near-identical ~45px circles with centered pins, producing repetitive gameplay.

### Design Philosophy

Range+ renders holes on a 400×600 SVG viewBox. All greens will be **intentionally oversized** relative to real-world yard scaling — this is an accepted constraint of the medium. The priority is **gameplay variety**: distinct shapes, meaningful pin placement, and visual differentiation between holes. We do NOT chase yard-accurate green sizing.

### Real-World Reference (For Shape & Proportion Guidance Only)

| Course Type | Par 3 | Par 4 | Par 5 |
|-------------|-------|-------|-------|
| PGA Tour | 3,000–3,500 sq ft | 5,000–6,000 sq ft | 6,000–8,000 sq ft |
| Municipal | ~3,000 sq ft | 4,000–5,000 sq ft | 5,000–6,000 sq ft |

These numbers inform **relative proportions** (par-5 greens should be visibly larger than par-3 greens) but NOT absolute pixel sizing.

---

## Section 1: Green Size Guidelines

### Requirement: Green pixel sizes scale with par value

Greens MUST be visually distinguishable in size by par value. Larger pars = larger greens.

| Par | Min Width (px) | Max Width (px) | Min Height (px) | Max Height (px) | Target Area (px²) |
|-----|---------------|---------------|-----------------|-----------------|-------------------|
| 3 | 35 | 50 | 30 | 45 | 900 – 1,800 |
| 4 | 40 | 60 | 35 | 55 | 1,200 – 2,600 |
| 5 | 50 | 75 | 45 | 70 | 1,800 – 4,000 |

> **Rationale:** Par-5 greens should reward reaching the green in regulation from longer approaches. Par-3 greens demand precision with a shorter club. Size differences should be noticeable on screen.

#### Scenario: GREEN-SIZE-001 — Par-3 greens are the smallest category
- **GIVEN** all holes in `PRESET_HOLES`
- **WHEN** green bounding box areas are compared by par value
- **THEN** the average par-3 green area is smaller than the average par-4 green area

#### Scenario: GREEN-SIZE-002 — Par-5 greens are the largest category
- **GIVEN** all holes in `PRESET_HOLES`
- **WHEN** green bounding box areas are compared by par value
- **THEN** the average par-5 green area is larger than the average par-4 green area

#### Scenario: GREEN-SIZE-003 — No green is smaller than minimum playable size
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the green bounding box width and height are measured
- **THEN** width ≥ 35px AND height ≥ 30px

#### Scenario: GREEN-SIZE-004 — No green exceeds maximum bounds
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the green bounding box width and height are measured
- **THEN** width ≤ 75px AND height ≤ 70px

---

## Section 2: Green Shape Variety

### Requirement: Greens use diverse shapes across the course

The 18-hole course MUST include a variety of green shapes. No more than 4 greens should share the same shape category.

#### Accepted Green Shape Categories

| Shape | Description | Strategic Effect |
|-------|-------------|-----------------|
| **Circular** | Roughly symmetrical in all directions | Forgiving; no directional bias |
| **Oval** | Elongated along one axis | Rewards approach from the long axis |
| **Kidney** | Curved with a pinched waist | Strong front/back distinction; risk-reward |
| **L-Shaped** | Right-angle bend | Hidden pins; controls approach angle |
| **Peanut** | Two lobes connected by narrow neck | Maximum pin separation; high difficulty |
| **Oblong** | Long and narrow, not symmetrical | Precision required on the narrow axis |
| **Irregular** | Asymmetric, organic shape | Unpredictable; unique character |

#### Scenario: GREEN-SHAPE-001 — At least 4 distinct shape categories are used
- **GIVEN** all 18 holes in `PRESET_HOLES`
- **WHEN** green shapes are categorized
- **THEN** at least 4 of the 7 shape categories above are represented

#### Scenario: GREEN-SHAPE-002 — No single shape dominates
- **GIVEN** all 18 holes in `PRESET_HOLES`
- **WHEN** greens are grouped by shape category
- **THEN** no category has more than 4 greens

#### Scenario: GREEN-SHAPE-003 — Green polygons have sufficient vertex count for shape fidelity
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `greenBoundary.points` array is examined
- **THEN** it contains at least 8 points (enough to express curved shapes smoothly)

#### Scenario: GREEN-SHAPE-004 — Green polygon forms a valid non-self-intersecting shape
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `greenBoundary` polygon is checked
- **THEN** the polygon does not self-intersect

---

## Section 3: Pin Placement

### Requirement: Each green defines multiple pin positions with variety

Each hole MUST define 3–4 pin positions. One is randomly selected each time the hole is played, creating replay variety. Pins MUST NOT cluster at the green center.

#### Pin Position Zones

Pins are described using a 3×3 grid overlaid on the green's bounding box:

```
┌───────────────────────────┐
│ BACK-LEFT  │ BACK-CTR  │ BACK-RIGHT  │
├────────────┼───────────┼─────────────┤
│ MID-LEFT   │ MID-CTR   │ MID-RIGHT   │
├────────────┼───────────┼─────────────┤
│ FRONT-LEFT │ FRONT-CTR │ FRONT-RIGHT │
└───────────────────────────┘
       (closest to tee)
```

#### Scenario: GREEN-PIN-001 — Each hole defines 3–4 pin positions
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the `pinPositions` array is examined
- **THEN** it contains 3 or 4 entries

#### Scenario: GREEN-PIN-002 — All pin positions are inside the green boundary
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** each pin position in that hole's `pinPositions`
- **WHEN** `isPointInPolygon(pin, greenBoundary)` is called
- **THEN** the result is `true`

#### Scenario: GREEN-PIN-003 — Pin positions have minimum edge clearance
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** each pin position in that hole's `pinPositions`
- **WHEN** the distance from the pin to the nearest green edge is measured
- **THEN** the distance is ≥ 4px (ensuring the pin is not clipped to the green perimeter)

#### Scenario: GREEN-PIN-004 — Pin positions are spread across the green
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** the set of pin positions for that hole
- **WHEN** the maximum distance between any two pin positions is measured
- **THEN** it is ≥ 40% of the green's longest axis (pins are not all clustered together)

#### Scenario: GREEN-PIN-005 — Not all pin positions are at the green center
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** the green centroid is calculated
- **WHEN** pin position distances from the centroid are measured
- **THEN** at least 2 of the pin positions are ≥ 5px from the centroid

#### Scenario: GREEN-PIN-006 — One pin position is randomly selected per play
- **GIVEN** a hole is loaded for play
- **WHEN** the game initializes the hole
- **THEN** one pin position from the hole's `pinPositions` array is randomly selected
- **AND** that position is used as `pinPosition` for the duration of the hole

#### Scenario: GREEN-PIN-007 — Pin positions span front-to-back variety
- **GIVEN** each hole in `PRESET_HOLES`
- **AND** the green's bounding box is divided into front/middle/back thirds (relative to tee direction)
- **WHEN** pin positions are mapped to thirds
- **THEN** at least 2 of the 3 thirds contain a pin position

---

## Section 4: Green Containment Within Fairway

### Requirement: Green is fully enclosed by the fairway polygon

Per the existing design pattern, fairways wrap around greens so the green renders on top of contiguous turf.

#### Scenario: GREEN-CONTAIN-001 — Green polygon is inside or touching fairway polygon
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** the green boundary vertices are tested against the fairway boundary
- **THEN** all green vertices are inside or on the edge of the fairway polygon

---

## Section 5: Visual Distinction

### Requirement: Greens are visually unique across the course

Players should be able to recognize "this green is different" from hole to hole through shape, size, and orientation variety.

#### Scenario: GREEN-VISUAL-001 — No two adjacent holes share identical green dimensions
- **GIVEN** consecutive holes in `PRESET_HOLES` (hole N and hole N+1)
- **WHEN** their green bounding box widths and heights are compared
- **THEN** they differ by at least 5px in width OR 5px in height OR have different shapes

#### Scenario: GREEN-VISUAL-002 — Green orientation varies across the course
- **GIVEN** all holes in `PRESET_HOLES`
- **WHEN** the green's aspect ratio (width ÷ height) is computed
- **THEN** the course includes both wide greens (ratio > 1.2) and deep greens (ratio < 0.85)

---

## Section 6: Type Changes Required

### Requirement: HoleDefinition supports multiple pin positions

The `HoleDefinition` type in `src/domain/types.ts` must be extended to support an array of pin positions while maintaining backward compatibility.

#### Scenario: GREEN-TYPE-001 — HoleDefinition has pinPositions array
- **GIVEN** the `HoleDefinition` interface
- **WHEN** it is inspected
- **THEN** it includes a `pinPositions: Point[]` field

#### Scenario: GREEN-TYPE-002 — pinPosition remains as active pin for a given play
- **GIVEN** a hole being played
- **WHEN** game state is initialized
- **THEN** `pinPosition` is set to one randomly selected entry from `pinPositions`

---

## Appendix A: Shape Reference Guide

Below are rough descriptions of how each shape category should look as polygon point distributions:

**Circular (~10-12 points):** Points distributed evenly around a center. Width ≈ Height.

**Oval (~10-14 points):** Elliptical. Width/Height ratio between 1.3 and 1.8 (or inverse).

**Kidney (~12-16 points):** One concave edge. Looks like a bean. Pinched waist on one side.

**L-Shaped (~10-14 points):** Two rectangular lobes meeting at a right angle. Clear directional bias.

**Peanut (~14-18 points):** Two circular lobes connected by a narrow neck. Maximum pin separation.

**Oblong (~10-14 points):** Long and thin. Width/Height ratio > 2.0 or < 0.5.

**Irregular (~12-18 points):** Asymmetric. No clear geometric classification. Organic feel.

---

## Appendix B: Recommended Distribution Across 18 Holes

This is a guideline, not a mandate. Implementation may adapt based on hole character.

| Shape | Suggested Count | Best For |
|-------|----------------|----------|
| Circular | 2–3 | Simple par-3s, friendly par-4s |
| Oval | 3–4 | Versatile; works for any par |
| Kidney | 3–4 | Strategic par-4s and par-5s |
| L-Shaped | 1–2 | Signature holes, doglegs |
| Peanut | 1–2 | Challenging par-5s |
| Oblong | 1–2 | Par-3s demanding precision |
| Irregular | 2–3 | Character holes |

---

## Appendix C: Current State Baseline (Pre-Change)

Captured 2026-03-29 for traceability per ENG-4.4.

| Hole | Name | Par | Green W×H (px) | Area (px²) | Pin Offset (px) | Shape |
|------|------|-----|----------------|------------|------------------|-------|
| 1 | The Welcome | 4 | 46×45 | 1,621 | 1.55 | Circular |
| 2 | Island Green | 3 | 44×49 | 1,666 | 1.60 | Circular |
| 3 | Azalea | 5 | 49×49 | 1,841 | 3.13 | Circular |
| 4 | The Cape | 4 | 46×46 | 1,624 | 4.10 | Circular |
| 5 | Postage Stamp | 3 | 30×30 | 674 | 0.66 | Circular |
| 6 | The Fork | 4 | 50×46 | 1,781 | 2.97 | Circular |
| 7 | Peninsula | 5 | 50×47 | 1,746 | 3.85 | Circular |
| 8 | The Bend | 4 | 46×47 | 1,620 | 4.16 | Circular |
| 9 | The Drive | 4 | 39×49 | 1,471 | 2.35 | Circular |
| 10 | The Long Iron | 3 | 54×46 | 1,924 | 2.77 | Circular |
| 11 | Creek Valley | 5 | 48×44 | 1,644 | 1.04 | Circular |
| 12 | The Closer | 4 | 53×50 | 2,073 | 0.75 | Circular |
| 13 | The Ridge | 4 | 43×43 | 1,464 | 3.19 | Circular |
| 14 | Cypress Point | 3 | 45×47 | 1,632 | 2.42 | Circular |
| 15 | Eagle's Reach | 5 | 48×46 | 1,710 | 1.02 | Circular |
| 16 | The Narrows | 4 | 42×45 | 1,503 | 3.16 | Circular |
| 17 | Amen Corner | 4 | 45×45 | 1,580 | 1.85 | Circular |
| 18 | The Finish Line | 4 | 48×47 | 1,739 | 0.90 | Circular |

**Issues identified:**
- All 18 greens are circular
- 16 of 18 greens are between 42-54px wide (visually near-identical)
- Average pin offset from centroid: 2.38px (barely noticeable)
- No size differentiation by par value in pixel terms
