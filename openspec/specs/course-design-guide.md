# Range+ Course Design Guide

> **Purpose:** Reference guide for designing new golf courses that meet Range+ quality standards.
> **Audience:** AI agents and human engineers authoring new `CourseDefinition` files.
> **Authority:** Consolidates rules from `hole-data/spec.md`, `green-design/spec.md`, and `redesign-fairways/SPEC.md`.
> **Last Updated:** 2026-04-08

When adding a new course, create a new file under `src/data/courses/` following the existing pattern in `the-starter.ts`. Register it in `src/data/courses/index.ts` by adding it to `ALL_COURSES`.

---

## Quick Reference Checklist

Before submitting a new course, verify every item:

**Course Composition**
- [ ] 18 holes total
- [ ] Par 72 (sum of all par values)
- [ ] 4× Par-3, 10× Par-4, 4× Par-5
- [ ] All hole IDs are unique

**Fairway Rules**
- [ ] Par-3 fairways: ≥12 vertices each
- [ ] Par-4 fairways: ≥16 vertices each
- [ ] Par-5 fairways: ≥20 vertices each
- [ ] No interior angle <90° at any fairway vertex
- [ ] ≤6 straight holes on the course
- [ ] ≥5 dogleg holes on the course
- [ ] ≥2 S-curve or double-dogleg holes on the course

**Green Rules**
- [ ] Every green has ≥8 vertices
- [ ] Par-3 greens: width 35–50px, height 30–45px
- [ ] Par-4 greens: width 40–60px, height 35–55px
- [ ] Par-5 greens: width 50–75px, height 45–70px
- [ ] Avg par-3 green area < avg par-4 green area < avg par-5 green area
- [ ] All green vertices are inside the fairway polygon
- [ ] At least 4 distinct green shape categories used across the course

**Pin Positions**
- [ ] 3–4 pin positions per hole
- [ ] All pins are inside the green boundary
- [ ] Pins are spread: max pin-to-pin distance ≥40% of green's longest axis
- [ ] At least 2 pins are ≥5px from the green centroid

**Hole Geometry**
- [ ] All holes: `teePosition.y` > `pinPosition.y` (tee at bottom, green at top)
- [ ] Tee y in range 530–575
- [ ] Pin y in range 50–130

**Visual Elements**
- [ ] ≥25 trees per hole (radius 6–18px each)
- [ ] ≥3 rocks per hole
- [ ] ≥3 bushes per hole
- [ ] Flower beds on 3–4 specialty holes only

---

## Coordinate System

All geometry uses a **400×600 SVG viewBox**. Y increases **downward**.

```
(0,0) ─────────────────── (400,0)
  │         ← pin area (y ~50–130)          │
  │                                          │
  │           fairway runs                  │
  │           bottom to top                 │
  │                                          │
  │         ← tee area (y ~530–575)         │
(0,600) ─────────────────── (400,600)
```

**Orientation rule (non-negotiable):** Every hole plays bottom-to-top. `teePosition.y` MUST be greater than `pinPosition.y`. Diagonal holes (tee bottom-left, green top-right) are allowed as long as this rule holds.

---

## Course Composition

A standard Range+ course is 18 holes, Par 72.

| Distribution | Count | Total Par |
|---|---|---|
| Par-3 | 4 | 12 |
| Par-4 | 10 | 40 |
| Par-5 | 4 | 20 |
| **Total** | **18** | **72** |

Consider placing par-3s at holes 2, 5, 10, and 14 to break up longer holes and give players a breather. Par-5s work well at holes 3, 7, 11, and 15 for a classic feel.

---

## Fairway Design

### Routing Diversity (Course-Level)

A variety of routing shapes is required per course. Straight holes are boring — limit them.

| Routing Type | Required Count | Definition |
|---|---|---|
| **Straight** | ≤6 | Lateral offset ≤30px AND midpoint deviation <20px |
| **Slight Curve** | ≥2 | Midpoint deviation 20–40px OR lateral offset 20–60px |
| **Dogleg** | ≥5 | Lateral offset ≥60px OR midpoint deviation ≥40px |
| **S-Curve** | ≥2 | Fairway center crosses the tee-to-pin line (deviation changes sign) |

**Definitions:**
- **Lateral offset** — `abs(teePosition.x - pinPosition.x)` in pixels
- **Midpoint deviation** — lateral distance from the fairway's midpoint center to the straight tee-to-pin line

**Suggested per-course distribution:**

| Type | Suggested Holes |
|---|---|
| Straight | Par-3s (Island Green, Postage Stamp, etc.) — precision holes |
| Slight curve | Opener (hole 1), mid-round par-4s, closer |
| Dogleg | 5–6 par-4s and par-5s |
| S-curve | 2 par-4s or par-5s with landmark names (The Fork, Creek Valley, etc.) |

### Routing Type Guide

**Straight** — Tee to green in a line. Use only for par-3s and 1–2 simple par-4s. The challenge comes from distance or hazards, not routing.

**Slight Curve** — A gentle sweep left or right. The fairway drifts but doesn't bend sharply. Rewards players who read the shape.

**Dogleg Left/Right** — A clear bend in the fairway. Players must decide: aim at the corner to maximize distance, or play safely around. The bend creates risk-reward off the tee.

**S-Curve / Double Dogleg** — The fairway curves one way, then reverses direction. Think of a river channel. Two decision points. Used sparingly for variety.

### Fairway Polygon Rules

**Vertex counts** (minimum per par):

| Par | Min Vertices | Reason |
|---|---|---|
| 3 | 12 | Short but needs organic edges |
| 4 | 16 | Medium length with curves and width variation |
| 5 | 20 | Long hole; needs multiple vertices per turn section |

**No hard corners:** No interior angle between consecutive fairway vertices may be less than 90°. Real fairway edges curve naturally — even sharp doglegs use a sweeping arc, not a right-angle pivot. Use more vertices at bend points to create smooth curves that satisfy this rule.

**Width variation (recommended):** Fairways SHOULD vary in width to create strategic interest:
- **Landing zone** (primary target ~1/3 of the way up from tee) — wider
- **Pinch point** (before a bend or near a hazard) — narrower
- At least 4 holes per course should have a notable pinch point (narrows to ≤60% of maximum width)

### Fairway Shape Tips

When designing a dogleg, use 4–6 extra vertices at the bend to create a smooth, sweeping curve rather than a sharp corner. The interior of the bend should be narrower than the outside.

For S-curves, imagine the fairway as a gentle river: it flows one direction, then gradually reverses. The reversal point is often where a hazard (bunker, water) sits, forcing a decision.

For straight holes, avoid perfectly rectangular corridors. Even straight holes should have slightly organic edges — subtle width variation, gentle side curves that add visual texture without changing the routing classification.

---

## Green Design

### Size by Par

Greens must be visually larger for longer holes.

| Par | Width (px) | Height (px) | Target Area (px²) |
|---|---|---|---|
| 3 | 35–50 | 30–45 | 900–1,800 |
| 4 | 40–60 | 35–55 | 1,200–2,600 |
| 5 | 50–75 | 45–70 | 1,800–4,000 |

The average par-3 green area must be less than the average par-4, which must be less than par-5.

### Green Shapes

Avoid making all greens circular. Use at least 4 different shape categories across the 18 holes. No single shape should appear more than 4 times.

| Shape | Description | Best Used For |
|---|---|---|
| **Circular** | Symmetrical in all directions | Simple par-3s, friendly par-4s |
| **Oval** | Elongated on one axis | Versatile; works for any par |
| **Kidney** | Curved with a pinched waist | Strategic par-4s, par-5s |
| **L-Shaped** | Right-angle two-lobe form | Dogleg signature holes |
| **Peanut** | Two lobes with narrow neck | Challenging par-5s |
| **Oblong** | Long and thin (ratio >2.0) | Par-3s demanding precision |
| **Irregular** | Asymmetric, organic | Character holes |

All green polygons need ≥8 vertices for smooth shape rendering. Complex shapes (kidney, peanut, irregular) should use 12–18 vertices.

### Green Containment

Every point in `greenBoundary.points` must pass `isPointInPolygon(pt, fairwayBoundary)`. Design the fairway to wrap around and contain the entire green. When reshaping fairways, always verify this constraint hasn't been broken.

### Pin Positions

Each hole defines 3–4 pin positions in `pinPositions`. One is randomly selected each round for replay variety.

Rules:
- All pins must be inside the green boundary
- Each pin must be ≥4px from the green edge (not clipped to the perimeter)
- Max distance between any two pins ≥ 40% of the green's longest axis (spread them out)
- At least 2 pins must be ≥5px from the green centroid (not all clustered at the center)
- Pins should span at least 2 of the 3 front/middle/back thirds of the green

Think of pin positions as: front-left, back-right, middle, and one wild-card location on an interesting lobe or corner.

`pinPosition` (backward compat field) must equal `pinPositions[0]`.

---

## Visual Elements

All visual elements are rendered in the rough areas outside the fairway. They should frame the hole, not clutter it.

### Trees

- **Minimum:** ≥25 per hole
- **Radius:** 6–18px per tree
- Place trees densely along fairway edges to frame the corridor
- Vary radii for a natural canopy look — mix large (14–18px) anchor trees with smaller (6–10px) fill trees
- Keep trees outside the `fairwayBoundary` polygon to avoid blocking shots

### Rocks

- **Minimum:** ≥3 per hole
- **Size:** width 4–12px, height 3–8px
- **Rotation:** any angle (degrees)
- Cluster 3–5 rocks together near rough areas, hazard edges, or behind greens
- Position within the 400×600 viewBox (x: 0–400, y: 0–600)

### Bushes

- **Minimum:** ≥3 per hole
- **Radius:** 4–8px
- Place near tree clusters or along hazard banks for layered depth
- Position within the 400×600 viewBox

### Flower Beds (Specialty Holes Only)

- Restrict to **3–4 holes** per course — overuse diminishes the effect
- Choose holes with character names that suggest flora (Azalea, The Welcome, Cypress Point, etc.)
- **Radius:** 3–6px per bed
- **Color:** bright CSS colors (`#e87da0`, `#f5e642`, `#ff6b35`, etc.)
- Cluster beds in groups of 3–6 near the tee box, green surround, or rough areas

---

## Naming Conventions

Hole names should evoke character and place. Avoid generic names like "Hole 1" or "Par Four."

Good naming patterns:
- **Natural features:** Azalea, Creek Valley, Cypress Point, The Ridge
- **Architectural style:** The Cape, Peninsula, The Narrows, Island Green
- **Challenge descriptor:** Postage Stamp, The Long Iron, Eagle's Reach
- **Course position feel:** The Welcome (opener), Amen Corner, The Finish Line (closer)

Each hole's `id` should be `hole-1` through `hole-18` (sequential).

---

## Testing a New Course

After defining a new course, run the full test suite to verify all constraints pass:

```bash
npx vitest run src/data/holes.test.ts
npx vitest run
npm run lint
```

Key test scenarios that will catch design violations:

| Test | What It Catches |
|---|---|
| CHG-FWY-001/002/003 | Fairway vertex count too low |
| CHG-FWY-004 | Sharp corners (<90°) in fairway |
| CHG-FWY-005 | Too many straight holes |
| CHG-FWY-006 | Not enough doglegs |
| CHG-FWY-007 | Not enough S-curves |
| CHG-GREEN-009 | Green not contained within fairway |
| CHG-GREEN-004 | Pin outside green boundary |
| BASE-DATA-009b | Hole orientation wrong (tee/pin inverted) |
| CHG-VIS-001 | Not enough trees |

---

## Example Routing Targets (18-Hole Template)

Use this as a starting point. Swap hole names and adjust par to fit the course theme.

| # | Suggested Routing | Par | Notes |
|---|---|---|---|
| 1 | Slight curve right | 4 | Welcoming opener, wide landing zone |
| 2 | Straight | 3 | Precision par-3, first challenge |
| 3 | Dogleg left | 5 | Long par-5, risk-reward corner |
| 4 | Dogleg right | 4 | Mid-length par-4 with bend |
| 5 | Straight | 3 | Short par-3, small green |
| 6 | S-curve | 4 | Unique routing, signature hole |
| 7 | Dogleg right + slight left | 5 | Double dogleg or wide arc |
| 8 | Dogleg right (sharp) | 4 | Pinch point at the turn |
| 9 | Slight curve left | 4 | Turn nine, moderate challenge |
| 10 | Straight | 3 | Back nine opener, reset hole |
| 11 | S-curve | 5 | Long par-5 with hazard mid-hole |
| 12 | Dogleg left | 4 | Clear bend, approach from right |
| 13 | Slight curve right | 4 | Gentle slope or ridge feel |
| 14 | Straight | 3 | Par-3 over hazard |
| 15 | Dogleg left | 5 | Reachable par-5 for big hitters |
| 16 | Slight curve left | 4 | Narrow corridor hole |
| 17 | Dogleg left (refined) | 4 | Penultimate drama |
| 18 | Slight curve right | 4 | Grand closing hole, wide finish |

**Resulting distribution:** 4 straight · 6 slight-curve · 6 dogleg · 2 S-curve ✅
