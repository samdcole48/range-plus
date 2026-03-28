# Hole Design Guide

A comprehensive guide for designing new holes in Range+. Follow these principles and criteria to ensure every new hole meets the project's quality standards.

## Research Foundation

The 12 holes in Range+ are informed by studying the world's top 50 golf courses, including:

- **Augusta National** — strategic risk/reward, creek crossings, dramatic elevation
- **St Andrews (Old Course)** — shared greens, hidden bunkers, angular doglegs
- **Pebble Beach** — coastal peninsulas, ocean-adjacent greens, exposed positions
- **Pine Valley** — demanding carries, natural terrain, penalty areas
- **TPC Sawgrass** — island greens, water-dominated strategy
- **Royal Troon** — postage stamp greens, ring-of-bunkers defense

Each hole in Range+ translates a real-world strategic concept into the 400×600 SVG coordinate space.

## Design Principles

### 1. Every Hole Must Ask a Unique Strategic Question

Don't design "hit it straight" holes. Each hole should present a specific dilemma:
- Do I go over the water or lay up?
- Do I aim left for safety or right for a better angle?
- Do I take on the carry to reach in two, or play it safe?

### 2. Risk/Reward on Every Shot

Bold play should be rewarded. A player who takes on a dangerous line should have a shorter or easier next shot. But a safe route must always exist — no forced carries over water with no alternative.

### 3. Strategic Over Penal

Hazards should **create choices**, not just punishment. A bunker shouldn't just say "don't go here." It should say "going here is safe but leaves a harder approach; going the other way is risky but sets up an easier shot."

### 4. Natural Integration

Shapes should feel organic, not geometric. Greens should be kidney-shaped, elongated, or irregular — never hexagonal or perfectly circular. Fairway edges should curve naturally. Water boundaries should meander.

### 5. Fairway Wraps Around Green

The fairway polygon must extend past and surround the green on the sides and behind it. This creates the visual fringe/collar effect and ensures the green sits within the fairway corridor.

### 6. Variety

Across the full set of holes, vary:
- **Length** (short par 3 to long par 5)
- **Direction** (straight, dogleg left, dogleg right)
- **Required shot shape** (draw, fade, straight)
- **Hazard types** (water, bunkers, trees, combinations)
- **Green difficulty** (open front, guarded, elevated feel)

## Iconic Hole Archetypes

Each hole in Range+ is inspired by a famous real-world design concept:

| Archetype | Real-World Inspiration | Range+ Hole |
|-----------|----------------------|-------------|
| Island Green | TPC Sawgrass 17th | Hole 2 |
| Creek-crossing risk/reward | Augusta National 13th (Azalea) | Hole 3 |
| Cape / diagonal water carry | National Golf Links of America | Hole 4 |
| Postage Stamp / bunker ring | Royal Troon 8th | Hole 5 |
| Split fairway | Strategic design principle | Hole 6 |
| Peninsula green | Pebble Beach 7th | Hole 7 |
| Sharp dogleg | St Andrews 17th (Road Hole) | Hole 8 |
| Driveable par 4 | Risk/reward design principle | Hole 9 |

Holes 1, 10, 11, and 12 fill out the routing with complementary designs that ensure variety in par, direction, and hazard exposure.

## Acceptance Criteria for New Holes

Every new hole **MUST** satisfy all of the following:

1. **Has a `name`** that describes its character (e.g., "Island Green", "The Cape", "Split Decision")
2. **Has a `par`** of 3, 4, or 5
3. **Has `greenBoundary`** with **10–12 points** forming an organic shape (kidney, elongated, irregular — **NOT** hexagon or circle)
4. **Has `fairwayBoundary`** with **18–24 points** that wraps **AROUND** the green (extends above/behind it on both sides)
5. **Has strategically placed bunkers** (2–5 per hole, ~6 points each) guarding specific approach angles
6. **Has trees** (12–18 per hole) lining fairway edges and rough areas to define the visual corridor
7. **Fits within the 400×600 SVG viewport** — no coordinates outside this range
8. **Tee position near the bottom** (y between 460–570) and **pin near the top** (y between 40–170)
9. **Water hazards** (if any) have **7–10 point organic boundaries** and valid `dropZone` positions on dry land
10. **Does NOT break existing tests** — `PRESET_HOLES[0]` (Hole 1) has specific coordinates that tests depend on. Never modify it.
11. **`yardsLength` is realistic** for the par:
    - Par 3: 120–220 yards
    - Par 4: 300–460 yards
    - Par 5: 480–580 yards

## Quality Checklist

Use this checklist before submitting a new hole:

- [ ] Green shape is organic (not hexagonal or circular)
- [ ] Fairway wraps around green (extends past it on sides and behind)
- [ ] Bunkers guard specific approach angles (not randomly placed)
- [ ] Trees define the visual corridor (not scattered randomly)
- [ ] Water creates a strategic choice (not just decoration)
- [ ] Hole has a distinct character/theme different from existing holes
- [ ] All polygons have enough points for smooth curves
- [ ] Drop zones are on land (not in water or off-canvas)
- [ ] Par distribution stays balanced when adding new holes

## Coordinate Tips

### General Layout

- The SVG viewBox is `0,0` to `400,600`. Y increases **downward**.
- Tee at the bottom, pin at the top. A "straight" hole has tee and pin at similar x values.
- Scale is derived from tee-to-pin pixel distance divided by `yardsLength`.

### Doglegs

Offset the tee and pin x-positions to create a bend:
- **Dogleg left**: tee at x ≈ 280, pin at x ≈ 130 (ball moves left as it goes up)
- **Dogleg right**: tee at x ≈ 120, pin at x ≈ 270 (ball moves right as it goes up)
- Place trees and/or water at the inside corner of the dogleg to force the decision

### Island Greens

For island-green holes, the fairway should be just the tee area — the green sits separately, surrounded by water. The fairway polygon can be a small area around the tee box.

### Water Hazards

- Boundaries should have **organic curves** (7–10 points), not sharp right angles
- Vary point spacing for natural meander (tighter spacing on curves, wider on straight edges)
- `dropZone` must be on dry land, ideally offering a reasonable (but not easy) next shot

### Trees

- Radius of **10–16** works well for visual balance
- **Vary sizes** for a natural look (don't make all trees the same radius)
- Place trees to **define corridor edges**, not randomly in the rough
- Clusters of 2–3 trees at strategic points create "gates" the player must navigate

### Bunkers

- Typically small — polygon spans of **10–15 pixels**
- **6 points** per bunker creates smooth enough curves
- Place them to guard the **obvious** line — force players to think about angle of approach
- Greenside bunkers should protect the "easy" side, leaving a harder angle as the safe play

## Current Par Distribution

The 12 existing holes have the following distribution:

| Par | Count | Holes |
|-----|-------|-------|
| 3 | 3 | Holes 2, 5, 10 |
| 4 | 6 | Holes 1, 4, 6, 8, 9, 12 |
| 5 | 3 | Holes 3, 7, 11 |
| **Total** | **12** | **Par 48** |

When adding new holes, maintain a balanced distribution. A full 18-hole course should aim for approximately par 70–72 (typically 4 par 3s, 10 par 4s, 4 par 5s).

## Example: Anatomy of a Well-Designed Hole

Consider Hole 4 ("The Cape") — a par 4 cape hole inspired by the National Golf Links:

- **Strategic question**: How much of the diagonal water carry do you take on?
- **Bold line**: Cut across the water for a short approach to the pin
- **Safe line**: Play away from the water for a longer but dry second shot
- **Bunkers**: Guard the green on the "reward" side, so even a successful carry still demands precision
- **Trees**: Line the safe side to prevent bail-out shots from being too easy
- **Green shape**: Angled relative to the fairway, rewarding the aggressive line with a better angle in

This is the template to follow: every design element serves the central strategic question.
