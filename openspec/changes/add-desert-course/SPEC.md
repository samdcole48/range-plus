# CHG: Add Desert Course — "Black Jack's Crossing"

> **Status:** DRAFT
> **Author:** AI-assisted
> **Created:** 2026-03-30
> **Constitutional Authority:** ENG-4.1 (Atomic TDD), ENG-2.3 (Scope control), ENG-3.5 (Immutability)
> **Affected Files:** `src/domain/types.ts`, `src/data/holes.ts`, `src/data/holeSelection.ts`, `src/data/courses/*` (new), `src/components/HoleView.tsx`, `src/data/holes.test.ts`
> **Guide Spec:** `openspec/specs/hole-data/spec.md`

---

## Problem Statement

Range+ currently has a single unnamed 18-hole course. There is no course-level data structure, no way to group holes by course, and no visual theming per course. The application needs multi-course support to add variety and replayability.

### Evidence

| Finding | Impact |
|---------|--------|
| No `CourseDefinition` type exists | Cannot group or identify courses |
| `PRESET_HOLES` is a flat array with no course association | Holes cannot be attributed to a specific course |
| HoleView rough color is hardcoded (`#3a6b24` → `#2a5218`) | All holes look identical regardless of setting |
| No desert terrain types (`Rock`, `Boulder`) in type system | Cannot model desert course features |
| Only 18 holes available | Limited replayability |

---

## Proposed Solution

### Change 1: Rename Existing Course to "The Starter"

The existing 18-hole course receives the name **"The Starter"** — a golf pun referencing both the course starter (the person who sends groups off the first tee) and the fact that this is the original/introductory course.

Each existing hole gains a `courseTheme: 'classic'` field to identify its visual style.

### Change 2: Add Course Architecture Types

Introduce multi-course data structures:

```typescript
interface Rock {
  position: Point;
  radius: number;  // 3–10px for small/medium desert rocks
}

interface Boulder {
  boundary: Polygon;  // Large irregular rock/cliff formations
}

interface CourseDefinition {
  id: string;
  name: string;
  theme: 'classic' | 'desert';
  holes: HoleDefinition[];
}
```

`HoleDefinition` gains optional fields:
- `courseTheme?: 'classic' | 'desert'` — drives visual rendering
- `rocks?: Rock[]` — small/medium rock decorations
- `boulders?: Boulder[]` — large cliff/mountain formations

### Change 3: Create "Black Jack's Crossing" Desert Course

A new 18-hole, Par-72 desert course inspired by Black Jack's Crossing at Lajitas Golf Resort in Lajitas, Texas. Designed by Lanny Wadkins, the real course is famous for its dramatic Big Bend desert terrain, canyon crossings, and Rio Grande views.

**Visual character:**
- Fairways and greens remain **green** (irrigated desert golf aesthetic)
- Rough is **sandy tan** instead of grass green
- Abundant **rocks** scattered in the rough (small/medium, 3–10px radius)
- **Boulders/cliffs** — large polygon formations (reddish-brown) in and around fairways
- Minimal or no trees (replaced by desert rock features)
- Bunkers render naturally (sand on sand, subtle contrast)

### Change 4: Restructure Data Layer for Multi-Course

```
src/data/
├── courses/
│   ├── index.ts              ← Barrel: exports courses + ALL_HOLES
│   ├── the-starter.ts        ← "The Starter" (existing 18 holes, moved here)
│   └── black-jacks-crossing.ts ← "Black Jack's Crossing" (new desert course)
├── holes.ts                  ← Re-exports ALL_HOLES as PRESET_HOLES (backward compat)
└── holeSelection.ts          ← getRandomHole pulls from combined 36 holes
```

### Change 5: Desert-Aware Rendering in HoleView

HoleView detects `hole.courseTheme` to select visual style:
- `'classic'` → existing green rough gradient, trees, bushes
- `'desert'` → sandy tan rough gradient, rocks, boulders, minimal vegetation

---

## Proposed Hole Assignments — Black Jack's Crossing

Yardages scaled from real Gold tees (~6,111 yds) to fit the 6,000–6,400 yd course constraint.
Based on the real Black Jack's Crossing at Lajitas Golf Resort, Lajitas, TX (designed by Lanny Wadkins).
The real course is set in the Chihuahuan Desert above the Rio Grande, featuring canyon carries, arroyos, mesas, and Big Bend mountain vistas.

**Par distribution:** 4× Par-3, 10× Par-4, 4× Par-5 = Par 72
**Total yardage:** ~6,170 yards

---

### Hole 1 — "The Outpost" — Par 4, 385 yds
**Real course ref:** Opens above the pro shop with a sweeping downhill tee shot.
- **Fairway:** Wide and welcoming, slight right-to-left bias. Gentle downhill from tee to green.
- **Hazards:** Desert scrub flanks both sides. 2 bunkers guard the green (front-left, right).
- **Boulders:** Rock formations line the right side of the fairway (~3–4 medium boulders). One large cliff/mesa formation far right as backdrop.
- **Green:** Open in front, protected by subtle slopes. Medium-sized, gently contoured.
- **Rocks:** Scattered throughout the rough on both sides (15–20 small rocks).
- **SVG guidance:** Tee at bottom, fairway flows upward (north). Fairway slightly wider than typical. Boulder cluster right side at mid-fairway. Large mesa shape far right edge.

### Hole 2 — "Canyon Shot" — Par 3, 175 yds
**Real course ref:** Tee shot plays over a deep desert wash/canyon to a green set against a rocky backdrop.
- **Fairway:** Minimal — par-3 with a forced carry. Small apron around the green.
- **Hazards:** Deep arroyo/canyon between tee and green (model as a sandy void with boulder edges). 2 deep bunkers left and behind green.
- **Boulders:** Canyon walls represented as 2–3 large boulder polygons flanking the gap. Rocky backdrop behind green (1 massive cliff formation).
- **Green:** Medium-small, set into a natural alcove against rock wall. Slightly elevated.
- **Rocks:** Dense rock scatter around the canyon edges (20+ small rocks).
- **SVG guidance:** Tee at bottom-center. Gap/canyon in the middle third. Green in upper third backed by large cliff polygon.

### Hole 3 — "Mesa Bend" — Par 4, 330 yds
**Real course ref:** Tighter driving hole that snakes between desert vegetation and rocky edges. Accuracy off the tee is vital.
- **Fairway:** Narrow, slight dogleg left. Both sides slope off into native desert brush.
- **Hazards:** 1 bunker at the dogleg elbow (left). 1 greenside bunker (right).
- **Boulders:** Mesa/cliff face on the left at the dogleg — large polygon representing the rock wall the hole bends around. 1 medium boulder right of fairway near tee.
- **Green:** Slightly elevated, tucked behind the mesa. Kidney-shaped.
- **Rocks:** Rocky edges along both fairway sides (15+ rocks), denser near the mesa.
- **SVG guidance:** Tee at bottom-right. Fairway bends left around a large mesa polygon. Green in upper-left quadrant.

### Hole 4 — "Rio Grande" — Par 5, 510 yds
**Real course ref:** Long, bending par-5 along a ridge with vistas of distant mountains and Rio Grande valley. True three-shotter.
- **Fairway:** Long S-curve. Generous landing area off the tee, narrows for second shot, opens again near green.
- **Hazards:** Water hazard (representing Rio Grande tributary/wash) crossing the fairway before the green, with drop zone. 2 bunkers flanking the green.
- **Boulders:** Ridge formations along the left side — 2–3 large elongated cliff polygons representing the canyon wall/ridge. 1 boulder cluster right of the second landing area.
- **Green:** Large, contoured. Set in a natural bowl near the "river."
- **Rocks:** Heavy rock presence along the ridge (25+ rocks on the left), moderate on right (10+).
- **SVG guidance:** Tee at bottom. Fairway snakes upward with an S-curve. Water hazard crosses horizontally in the upper third. Green beyond the water. Cliff/ridge formations along the left edge.

### Hole 5 — "Desert Wash" — Par 3, 140 yds
**Real course ref:** Elevated tee to a green perched on a plateau with sharp drop-offs left and behind. Wind swirls from surrounding mesa transitions.
- **Fairway:** Minimal — short par-3 with elevated tee. Small landing area.
- **Hazards:** 1 large bunker front-right. Drop-offs left and behind (out of play, visual only).
- **Boulders:** 1 large mesa/plateau edge the green sits on (represent as a large irregular polygon beneath/around the green). 1 medium rock formation left.
- **Green:** Small, perched on a plateau. Compact and well-bunkered.
- **Rocks:** Moderate scatter around the plateau edges (12–15 rocks). Dense on the drop-off sides.
- **SVG guidance:** Tee at bottom-center (elevated feel). Green in upper-center sitting on a visually raised plateau. Boulders define the plateau edges.

### Hole 6 — "Boulder Alley" — Par 4, 365 yds
**Real course ref:** Dives slightly downhill, threading through a natural canyon corridor with native rock walls and desert scrub.
- **Fairway:** Straight to slightly right. Framed by canyon walls on both sides — the "alley."
- **Hazards:** 2 bunkers — one at the landing zone (right), one greenside (left). 
- **Boulders:** This is the most boulder-heavy hole. 3–4 large cliff/wall polygons on each side creating a corridor effect. The fairway runs between them.
- **Green:** Sits in a natural amphitheater at the end of the canyon. Medium-large.
- **Rocks:** Very dense — 25+ rocks scattered along both canyon walls.
- **SVG guidance:** Tee at bottom. Fairway is a straight corridor between large boulder polygons on both sides. Green in upper portion nestled between rock walls. The "alley" feel is key.

### Hole 7 — "The Valley" — Par 4, 370 yds
**Real course ref:** Tough, long par-4 climbing back uphill. Green set against exposed canyon rock, framed by desert flora.
- **Fairway:** Uphill, slightly left-to-right. Wider landing zone, narrows approaching the green.
- **Hazards:** 2 bunkers protecting the elevated green (left and front-right).
- **Boulders:** 1 massive cliff face behind the green (dramatic backdrop). 2 medium boulders right of fairway at mid-point.
- **Green:** Elevated, medium-sized. Set against the cliff face backdrop.
- **Rocks:** Moderate scatter (15–18 rocks). Denser near the cliff face at the top.
- **SVG guidance:** Tee at bottom. Fairway widens then narrows upward. Green at top backed by a large cliff polygon. Conveys an "uphill valley" feel.

### Hole 8 — "Big Bend" — Par 5, 540 yds
**Real course ref:** Weaving through snake-like contours and desert washes along a high ridge with epic views. Significant elevation change.
- **Fairway:** Double dogleg (right then left). Very long. Landing areas are generous but desert penalizes strays.
- **Hazards:** 1 arroyo/dry wash crossing the fairway between 2nd and 3rd shots (model as sandy void). 2 bunkers at the green.
- **Boulders:** Ridge/cliff formations along the left for the entire length — 4–5 large polygons creating a continuous canyon wall. 2 medium boulders right of the first landing area.
- **Green:** Large, contoured, set at the end of the ridge.
- **Rocks:** Very heavy — 30+ rocks along the ridge. This is the most dramatic hole.
- **SVG guidance:** Tee at bottom-left. Fairway snakes right then left. Sandy wash crosses in the upper-middle. Continuous cliff wall along the left edge. Green at top-right.

### Hole 9 — "The Ascent" — Par 4, 350 yds
**Real course ref:** Finishes the front nine with an uphill par-4. Tee shot must clear a dry arroyo. Green is perched and exposed with panoramic canyon wall views.
- **Fairway:** Uphill, straight. Must carry an arroyo from the tee (model as sandy void/bunker near tee).
- **Hazards:** Arroyo in front of tee (sandy hazard, not water). 2 greenside bunkers.
- **Boulders:** 2 large rock formations flanking the elevated green. 1 medium boulder right of fairway.
- **Green:** Perched on a rise, exposed. Medium-sized. Panoramic backdrop.
- **Rocks:** Moderate (15 rocks), concentrated around the green and arroyo.
- **SVG guidance:** Tee at bottom. Sandy arroyo gap near the tee (lower third). Fairway climbs upward. Green at top, elevated, with boulder formations on either side.

---

### Hole 10 — "Mesa Top" — Par 4, 365 yds
**Real course ref:** Elevated tee looking down to the green, often playing into prevailing wind. Dramatic elevation drop.
- **Fairway:** Downhill from elevated tee. Slight dogleg right. Medium width.
- **Hazards:** 2 bunkers at the landing zone (left). 1 deep greenside pot bunker (front).
- **Boulders:** 1 large mesa edge polygon on the left (the mesa the tee sits on). 2 medium boulders right of fairway.
- **Green:** Below the mesa, medium-sized, slightly sunken feel.
- **Rocks:** Moderate (15 rocks), concentrated around the mesa edge.
- **SVG guidance:** Tee at bottom (elevated mesa edge — tee sits on the mesa plateau). Fairway climbs upward. Green at top, set into the rocky terrain. Mesa polygon near the tee (bottom). Conveys the "teeing off from the mesa edge" feel.

### Hole 11 — "The Corridor" — Par 4, 365 yds
**Real course ref:** Plays along higher ground/ridgeline with sweeping views and challenging wind. Canyon walls define the corridor.
- **Fairway:** Straight, narrow corridor between rock formations. Medium length.
- **Hazards:** 1 bunker left at landing zone. 1 greenside bunker right.
- **Boulders:** 2 large cliff walls on each side (4 total) forming a natural corridor. Less dense than Boulder Alley but still defining.
- **Green:** At the end of the corridor, medium-sized. Protected by rock and sand.
- **Rocks:** Moderate-heavy (20 rocks) lining the corridor walls.
- **SVG guidance:** Tee at bottom. Narrow fairway channel between cliff polygons. Green at top. Similar to Hole 6 but less claustrophobic.

### Hole 12 — "Shortcut" — Par 4, 300 yds
**Real course ref:** Shortest par-4. Risk/reward — aggressive players can challenge the green off the tee, but desert and boulders punish misses.
- **Fairway:** Short, wide. Direct line to green is over/around a large boulder formation in the center-right.
- **Hazards:** 1 large bunker front-left of green. Desert scrub right.
- **Boulders:** 1 very large boulder/rock formation in the middle of the fairway area (the obstacle to carry or play around). 2 medium boulders flanking.
- **Green:** Large (reachable par-4), well-bunkered, slightly elevated.
- **Rocks:** Moderate (15 rocks), concentrated around the central boulder.
- **SVG guidance:** Tee at bottom. Large boulder polygon in the center-right of the fairway. Players must choose: safe left or aggressive carry right. Green at top.

### Hole 13 — "The Wash" — Par 3, 140 yds
**Real course ref:** Forced carry over a native arroyo to a protected green. Visually intimidating short par-3.
- **Fairway:** Minimal — par-3 over desert wash/arroyo.
- **Hazards:** Large arroyo/wash between tee and green (sandy void). 2 bunkers protecting the green (left, back-right).
- **Boulders:** Arroyo edges defined by 2–3 medium boulders. 1 large cliff formation behind the green.
- **Green:** Small-medium, protected. Set against rocky backdrop.
- **Rocks:** Dense around the wash (20+ rocks defining the arroyo bed and edges).
- **SVG guidance:** Tee at bottom. Wide sandy arroyo/wash void across the middle. Green on the far side in the upper third. Similar to Hole 2 but lower, wash-style rather than canyon.

### Hole 14 — "Cliff Turn" — Par 4, 340 yds
**Real course ref:** Moderate par-4 with strategic bunkering. Canyon views. Requires precise approach.
- **Fairway:** Dogleg right around a cliff/mesa formation. Medium width.
- **Hazards:** 2 bunkers — one at the dogleg (right), one greenside (left).
- **Boulders:** Large cliff/mesa polygon on the right that the hole doglegs around (similar concept to Hole 3 but mirrored). 1 medium boulder left of fairway.
- **Green:** Tucked behind the cliff on a slight plateau. Medium-sized.
- **Rocks:** Moderate (15 rocks), concentrated near the cliff face.
- **SVG guidance:** Tee at bottom-left. Fairway bends right around a large cliff polygon. Green in upper-right. Mirror of Hole 3's layout concept.

### Hole 15 — "Long Haul" — Par 4, 410 yds
**Real course ref:** Plays long, often into the wind. Bunkers guard both landing zone and approach. One of the toughest holes.
- **Fairway:** Long and straight. Slightly narrow. No bail-out — desert on both sides.
- **Hazards:** 3 bunkers — 1 at landing zone (left), 2 greenside (left and right).
- **Boulders:** 2 large rock formations flanking the fairway at mid-point, creating a "gateway." 1 medium boulder near the green.
- **Green:** Medium-sized, well-protected by bunkers. Slightly elevated.
- **Rocks:** Moderate (18 rocks), spread along the full length.
- **SVG guidance:** Tee at bottom. Long, straight, narrow fairway. Boulder "gateway" at the midpoint. Green at top with bunker ring. Conveys difficulty and length.

### Hole 16 — "Three Canyons" — Par 5, 480 yds
**Real course ref:** Notable elevation drop from tee to fairway. Green set against mountain backdrops. True three-shotter.
- **Fairway:** Wide S-curve with three distinct sections separated by rocky terrain (the "three canyons"). Generous landing areas.
- **Hazards:** 1 arroyo crossing between 1st and 2nd sections. 2 bunkers at the green.
- **Boulders:** 3 large cliff/canyon wall formations — one defining each canyon section. Creates a dramatic terraced feel.
- **Green:** Large, set against a mountain backdrop cliff polygon.
- **Rocks:** Heavy (25+ rocks) distributed across all three canyon sections.
- **SVG guidance:** Tee at bottom-left. Fairway climbs diagonally up to the right in three terraced sections separated by boulder formations. Green at top-right backed by cliff.

### Hole 17 — "The Crossing" — Par 3, 155 yds ⭐ SIGNATURE HOLE
**Real course ref:** The course's namesake hole. Breathtaking tee shot over a deep desert canyon to a peninsula-style green in a natural amphitheater. The most photographed and memorable hole.
- **Fairway:** Minimal — dramatic forced carry over a canyon to an isolated green.
- **Hazards:** Deep canyon/arroyo between tee and green (the largest void on the course). 1 bunker behind green. Desert scrub everywhere else.
- **Boulders:** This hole has the most dramatic boulder formations. 4–5 large cliff polygons forming the canyon walls on both sides. Canyon floor visible (sandy). Green sits on a rock shelf/peninsula.
- **Green:** Medium-small, set on a natural shelf/peninsula jutting into the canyon. Amphitheater setting — surrounded by canyon walls on three sides.
- **Rocks:** Very dense (25+ rocks) defining canyon edges and walls.
- **SVG guidance:** Tee at bottom-center. Massive canyon void in the middle (largest gap on the course). Green on a peninsula/shelf in the upper portion, surrounded by canyon wall polygons on 3 sides. This should be the most visually dramatic hole in the entire game.

### Hole 18 — "Sunset Finish" — Par 5, 450 yds
**Real course ref:** Finishing hole cascading down towards the clubhouse. Sweeping desert panorama. Risk-reward for reaching in two.
- **Fairway:** Downhill, wide. Gentle dogleg left. Generous landing areas encourage aggressive play.
- **Hazards:** Water hazard (desert pond/seep) front-left of green with drop zone. 2 bunkers right of green.
- **Boulders:** 2 large cliff/mesa formations framing the hole on both sides (framing the "sunset view"). 1 medium boulder near the water hazard.
- **Green:** Large (reachable in 2 for big hitters). Set in a natural basin.
- **Rocks:** Moderate (15 rocks), mostly along the cliff formations.
- **SVG guidance:** Tee at bottom (elevated start — player looks upfield at the panorama). Fairway climbs and bends gently right. Water hazard front-right of green. Green at top-center. Cliff formations frame both sides. Conveys the "grand finale" feel.

---

### Desert Visual Summary by Hole

| # | Boulders | Rocks | Bunkers | Water | Arroyo/Wash | Key Visual Theme |
|---|----------|-------|---------|-------|-------------|-----------------|
| 1 | 4–5 | 15–20 | 2 | — | — | Wide open desert, mesa backdrop |
| 2 | 3–4 | 20+ | 2 | — | Canyon gap | Canyon carry par-3 |
| 3 | 2–3 | 15+ | 2 | — | — | Dogleg around mesa |
| 4 | 3–4 | 35+ | 2 | ✓ | — | Ridge hole, Rio Grande water |
| 5 | 2–3 | 12–15 | 1 | — | — | Plateau green, drop-offs |
| 6 | 6–8 | 25+ | 2 | — | — | Boulder corridor (densest) |
| 7 | 3 | 15–18 | 2 | — | — | Uphill valley, cliff backdrop |
| 8 | 6–7 | 30+ | 2 | — | Wash crossing | Double dogleg, ridge drama |
| 9 | 3 | 15 | 2 | — | Arroyo at tee | Uphill finish, perched green |
| 10 | 3 | 15 | 3 | — | — | Downhill from mesa |
| 11 | 4 | 20 | 2 | — | — | Ridgeline corridor |
| 12 | 3 | 15 | 1 | — | — | Short risk/reward, central boulder |
| 13 | 3–4 | 20+ | 2 | — | Wash void | Arroyo carry par-3 |
| 14 | 2–3 | 15 | 2 | — | — | Dogleg around cliff |
| 15 | 3 | 18 | 3 | — | — | Long and tough, boulder gateway |
| 16 | 3 | 25+ | 2 | — | Arroyo crossing | Three-tiered canyon descent |
| 17 | 4–5 | 25+ | 1 | — | Canyon void | ⭐ Signature canyon crossing |
| 18 | 3 | 15 | 2 | ✓ | — | Grand finale, downhill, water |

**Course totals:** ~55–65 boulders, ~330–380 rocks, 34 bunkers, 2 water hazards, 5 arroyo/wash features

---

## Scope

### In Scope
- New types: `Rock`, `Boulder`, `CourseDefinition`
- `courseTheme` field on `HoleDefinition`
- Data restructuring into `src/data/courses/` directory
- 18 new desert hole definitions with full polygon data
- `PRESET_HOLES` backward compatibility (re-exports combined 36 holes)
- `getRandomHole` pulls from both courses
- HoleView desert-aware rough rendering
- HoleView rock and boulder rendering
- Updated tests for multi-course architecture

### Out of Scope
- Course selection UI (play only one course)
- Per-course scorecards or statistics
- Course-specific background music or sound
- E2E tests
- Course-specific bunker rendering differences
- Desert-specific vegetation (cacti, tumbleweeds) — future enhancement

---

## Design Decisions

| ID | Decision | Rationale | Impact |
|----|----------|-----------|--------|
| D1 | Store `courseTheme` on each `HoleDefinition` | HoleView renders per-hole; random selection mixes courses, so each hole must self-describe its theme | Adds 1 field to every hole |
| D2 | Keep `PRESET_HOLES` as combined array | Backward compatibility — `getRandomHole`, tests, and any future consumers work unchanged | Tests need count/par updates |
| D3 | Desert rough = sandy tan, fairway = green | Matches real irrigated desert courses; maintains playability contrast | HoleView needs theme-aware gradient |
| D4 | Scale BJC yardages to Gold tees | Fits within existing 6,000–6,400 yd course constraint per test suite | Realistic but accessible |
| D5 | Separate files per course | Clean separation, independent maintenance, manageable file sizes | New directory under `src/data/` |

---

## Design Constraints

Per project-rules.md:
- **Section 2.1:** All holes use 400×600 SVG viewBox coordinate space
- **Section 2.2:** Game state immutability — no mutation of HoleDefinition at runtime
- **Section 2.4:** Every hole MUST have tee, pin, green polygon, fairway polygon at minimum
- **ENG-3.5:** Value objects are immutable
- **ENG-2.3:** Scope control — only touch files required for this change

---

## Test Scenarios

### Phase 1 — Types & Architecture

#### Scenario: CHG-COURSE-001 — Rock type exists on HoleDefinition
- **GIVEN** the `HoleDefinition` interface in `types.ts`
- **WHEN** a hole definition includes `rocks`
- **THEN** each rock has `position: Point` and `radius: number`
- **AND** `rocks` is optional on `HoleDefinition`

#### Scenario: CHG-COURSE-002 — Boulder type exists on HoleDefinition
- **GIVEN** the `HoleDefinition` interface in `types.ts`
- **WHEN** a hole definition includes `boulders`
- **THEN** each boulder has `boundary: Polygon`
- **AND** `boulders` is optional on `HoleDefinition`

#### Scenario: CHG-COURSE-003 — courseTheme field exists on HoleDefinition
- **GIVEN** the `HoleDefinition` interface in `types.ts`
- **WHEN** a hole definition is created
- **THEN** it may include `courseTheme: 'classic' | 'desert'`
- **AND** `courseTheme` is optional (defaults to classic rendering behavior)

#### Scenario: CHG-COURSE-004 — CourseDefinition type exists
- **GIVEN** the type system in `types.ts`
- **WHEN** a course is defined
- **THEN** it has `id: string`, `name: string`, `theme: 'classic' | 'desert'`, `holes: HoleDefinition[]`

### Phase 2 — Data Restructuring

#### Scenario: CHG-COURSE-005 — Existing holes tagged as classic theme
- **GIVEN** the existing 18 holes from "The Starter" course
- **WHEN** any hole's `courseTheme` is inspected
- **THEN** it equals `'classic'`

#### Scenario: CHG-COURSE-006 — The Starter course exported from dedicated file
- **GIVEN** the file `src/data/courses/the-starter.ts`
- **WHEN** imported
- **THEN** it exports `THE_STARTER` as a `CourseDefinition` with `name: 'The Starter'`, `theme: 'classic'`, and 18 holes

#### Scenario: CHG-COURSE-007 — Courses barrel exports both courses
- **GIVEN** the file `src/data/courses/index.ts`
- **WHEN** imported
- **THEN** it exports `THE_STARTER`, `BLACK_JACKS_CROSSING`, `ALL_COURSES`, and `ALL_HOLES`
- **AND** `ALL_HOLES` contains all holes from both courses

#### Scenario: CHG-COURSE-008 — PRESET_HOLES backward compatibility
- **GIVEN** the file `src/data/holes.ts`
- **WHEN** `PRESET_HOLES` is imported
- **THEN** it equals `ALL_HOLES` (combined 36 holes from both courses)
- **AND** existing imports continue to work without changes

#### Scenario: CHG-COURSE-009 — getRandomHole works with combined holes
- **GIVEN** `getRandomHole` in `holeSelection.ts`
- **WHEN** called repeatedly
- **THEN** it returns holes from both courses
- **AND** exclusion still prevents the same hole from being returned consecutively

### Phase 3 — Desert Course Data

#### Scenario: CHG-COURSE-010 — BJC course has 18 holes
- **GIVEN** the Black Jack's Crossing course definition
- **WHEN** its holes are counted
- **THEN** there are exactly 18

#### Scenario: CHG-COURSE-011 — BJC course totals par 72
- **GIVEN** the Black Jack's Crossing course definition
- **WHEN** par values are summed
- **THEN** the total is 72

#### Scenario: CHG-COURSE-012 — BJC has correct par distribution
- **GIVEN** the Black Jack's Crossing course
- **WHEN** holes are grouped by par
- **THEN** there are 4 par-3s, 10 par-4s, and 4 par-5s

#### Scenario: CHG-COURSE-013 — BJC holes have desert theme
- **GIVEN** every hole in the Black Jack's Crossing course
- **WHEN** `courseTheme` is inspected
- **THEN** it equals `'desert'`

#### Scenario: CHG-COURSE-014 — BJC holes have rocks
- **GIVEN** every hole in the Black Jack's Crossing course
- **WHEN** the `rocks` array is inspected
- **THEN** each hole has at least 10 rocks
- **AND** each rock has valid position (0–400, 0–600) and positive radius (3–10)

#### Scenario: CHG-COURSE-015 — BJC holes have boulders
- **GIVEN** every hole in the Black Jack's Crossing course
- **WHEN** the `boulders` array is inspected
- **THEN** each hole has at least 2 boulders
- **AND** each boulder has a valid polygon boundary within viewBox

#### Scenario: CHG-COURSE-016 — BJC holes have valid geometry
- **GIVEN** every hole in the Black Jack's Crossing course
- **WHEN** geometric integrity is validated
- **THEN** all green vertices are inside the fairway
- **AND** all pin positions are inside the green
- **AND** tee and pin are within the 400×600 viewBox

#### Scenario: CHG-COURSE-017 — BJC holes have realistic yardage per par
- **GIVEN** every hole in the Black Jack's Crossing course
- **WHEN** yardage is checked against par
- **THEN** par-3: 100–250 yds, par-4: 300–500 yds, par-5: 450–650 yds

#### Scenario: CHG-COURSE-018 — BJC total yardage in range
- **GIVEN** the Black Jack's Crossing course
- **WHEN** all hole yardages are summed
- **THEN** the total is between 6,000 and 6,400 yards

#### Scenario: CHG-COURSE-019 — BJC holes have unique IDs
- **GIVEN** all holes across both courses
- **WHEN** IDs are collected
- **THEN** every ID is unique (no collisions between courses)

#### Scenario: CHG-COURSE-020 — BJC pin positions valid
- **GIVEN** every hole in the Black Jack's Crossing course
- **WHEN** pin positions are inspected
- **THEN** each hole has 3–4 pin positions
- **AND** `pinPosition` equals `pinPositions[0]`
- **AND** all pin positions are inside the green boundary

### Phase 4 — Test Adaptation

#### Scenario: CHG-COURSE-021 — PRESET_HOLES contains 36 holes
- **GIVEN** `PRESET_HOLES` (the combined array)
- **WHEN** holes are counted
- **THEN** there are exactly 36

#### Scenario: CHG-COURSE-022 — Combined courses total par 144
- **GIVEN** `PRESET_HOLES` (36 holes)
- **WHEN** par values are summed
- **THEN** the total is 144

#### Scenario: CHG-COURSE-023 — Classic course has no rocks
- **GIVEN** only the holes from "The Starter" course
- **WHEN** the `rocks` property is inspected
- **THEN** no classic-themed hole has a `rocks` array

### Phase 5 — Desert Rendering

#### Scenario: CHG-COURSE-024 — Desert holes render sandy rough
- **GIVEN** a hole with `courseTheme: 'desert'` is rendered in HoleView
- **WHEN** the SVG rough background gradient is inspected
- **THEN** it uses sandy tan tones (not green)

#### Scenario: CHG-COURSE-025 — Rocks render as SVG circles
- **GIVEN** a hole with `rocks` data is rendered
- **WHEN** the SVG output is inspected
- **THEN** each rock appears as a circle at its position with its radius
- **AND** rocks use a brown/reddish fill

#### Scenario: CHG-COURSE-026 — Boulders render as SVG polygons
- **GIVEN** a hole with `boulders` data is rendered
- **WHEN** the SVG output is inspected
- **THEN** each boulder appears as a polygon from its boundary points
- **AND** boulders use a reddish-brown gradient fill

#### Scenario: CHG-COURSE-027 — Classic holes still render green rough
- **GIVEN** a hole with `courseTheme: 'classic'` (or no theme) is rendered
- **WHEN** the SVG rough background is inspected
- **THEN** it still uses the existing green gradient (no regression)

---

## Implementation Tasks

### Phase 1 — Types & Architecture (4 tasks)

| # | Task | Scenario | File(s) |
|---|------|----------|---------|
| 1 | Add `Rock` interface to types | CHG-COURSE-001 | `types.ts` |
| 2 | Add `Boulder` interface to types | CHG-COURSE-002 | `types.ts` |
| 3 | Add `courseTheme` to `HoleDefinition`; add optional `rocks`, `boulders` | CHG-COURSE-003 | `types.ts` |
| 4 | Add `CourseDefinition` interface | CHG-COURSE-004 | `types.ts` |

### Phase 2 — Data Restructuring (5 tasks)

| # | Task | Scenario | File(s) |
|---|------|----------|---------|
| 5 | Tag all existing holes with `courseTheme: 'classic'` | CHG-COURSE-005 | `holes.ts` |
| 6 | Create `src/data/courses/the-starter.ts` with `THE_STARTER` course | CHG-COURSE-006 | `courses/the-starter.ts` |
| 7 | Create `src/data/courses/index.ts` barrel | CHG-COURSE-007 | `courses/index.ts` |
| 8 | Update `holes.ts` to re-export `ALL_HOLES` as `PRESET_HOLES` | CHG-COURSE-008 | `holes.ts` |
| 9 | Verify `getRandomHole` works with combined array | CHG-COURSE-009 | `holeSelection.ts` |

### Phase 3 — Desert Course Data (11 tasks)

| # | Task | Scenario | File(s) |
|---|------|----------|---------|
| 10 | Create BJC course file with 18 hole stubs | CHG-COURSE-010 | `courses/black-jacks-crossing.ts` |
| 11 | Verify BJC par totals 72 | CHG-COURSE-011 | `courses/black-jacks-crossing.ts` |
| 12 | Verify BJC par distribution (4/10/4) | CHG-COURSE-012 | `courses/black-jacks-crossing.ts` |
| 13 | Verify all BJC holes have `courseTheme: 'desert'` | CHG-COURSE-013 | `courses/black-jacks-crossing.ts` |
| 14 | Add rocks to all BJC holes | CHG-COURSE-014 | `courses/black-jacks-crossing.ts` |
| 15 | Add boulders to all BJC holes | CHG-COURSE-015 | `courses/black-jacks-crossing.ts` |
| 16 | Validate BJC geometry (greens ⊂ fairways, pins ⊂ greens) | CHG-COURSE-016 | `courses/black-jacks-crossing.ts` |
| 17 | Validate BJC yardage per par | CHG-COURSE-017 | `courses/black-jacks-crossing.ts` |
| 18 | Validate BJC total yardage in range | CHG-COURSE-018 | `courses/black-jacks-crossing.ts` |
| 19 | Verify all hole IDs are unique across courses | CHG-COURSE-019 | `holes.test.ts` |
| 20 | Validate BJC pin positions (3–4 per hole, inside green) | CHG-COURSE-020 | `courses/black-jacks-crossing.ts` |

### Phase 4 — Test Adaptation (3 tasks)

| # | Task | Scenario | File(s) |
|---|------|----------|---------|
| 21 | Update PRESET_HOLES count to 36 | CHG-COURSE-021 | `holes.test.ts` |
| 22 | Update combined par total to 144 | CHG-COURSE-022 | `holes.test.ts` |
| 23 | Scope "no rocks" test to classic-theme holes only | CHG-COURSE-023 | `holes.test.ts` |

### Phase 5 — Desert Rendering (4 tasks)

| # | Task | Scenario | File(s) |
|---|------|----------|---------|
| 24 | Add desert rough gradient to HoleView | CHG-COURSE-024 | `HoleView.tsx` |
| 25 | Render rocks as SVG circles | CHG-COURSE-025 | `HoleView.tsx`, `HoleView.test.tsx` |
| 26 | Render boulders as SVG polygons | CHG-COURSE-026 | `HoleView.tsx`, `HoleView.test.tsx` |
| 27 | Verify classic holes still render green rough | CHG-COURSE-027 | `HoleView.test.tsx` |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Desert hole polygon data is very large (~75KB) | High | Larger bundle | Accept — static data, no runtime cost; consider lazy loading in future |
| HoleView complexity increases beyond 550 lines | High | Harder to maintain | Extract desert rendering into helper; document as tech debt for Phase 2 |
| Existing tests break during restructuring | Medium | Build failures | Phase 2 maintains backward compat via re-exports; tests updated incrementally |
| Desert holes don't "look right" visually | Medium | UX issue | Iterate on rendering colors/sizes; use real BJC course photos as reference |
| Random selection becomes unbalanced (more desert than classic) | Low | Minor UX | Both courses have 18 holes — selection is inherently 50/50 |

---

## Acceptance Criteria

- [ ] `Rock`, `Boulder`, `CourseDefinition` types exist in `types.ts`
- [ ] All existing holes have `courseTheme: 'classic'`
- [ ] "The Starter" course exported from `src/data/courses/the-starter.ts`
- [ ] "Black Jack's Crossing" course exported from `src/data/courses/black-jacks-crossing.ts`
- [ ] BJC has 18 holes, Par 72, 6,000–6,400 yards, matching real BJC par distribution
- [ ] Every BJC hole has rocks (≥10) and boulders (≥2)
- [ ] All geometric integrity checks pass (greens ⊂ fairways, pins ⊂ greens)
- [ ] `PRESET_HOLES` contains 36 holes (backward compatible)
- [ ] `getRandomHole` returns holes from both courses
- [ ] Desert holes render with sandy rough, rocks, and boulders
- [ ] Classic holes render unchanged (no visual regression)
- [ ] All tests pass, lint clean, build succeeds
