# Course Design Philosophy

The strategic principles and creative intent behind Range+ hole design. This document covers the **why** — design philosophy, real-world inspiration, and strategic thinking.

> **For technical rules** (vertex counts, routing minimums, green sizes, checklists): see `openspec/specs/course-design-guide.md`.

---

## Research Foundation

The holes in Range+ are informed by studying the world's top 50 golf courses, including:

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
- **Direction** (straight, dogleg left, dogleg right, S-curve)
- **Required shot shape** (draw, fade, straight, layup)
- **Hazard types** (water, bunkers, trees, combinations)
- **Green difficulty** (open front, guarded, elevated feel)

### 7. Routing Shapes Feel Real

Real fairways never have hard rectangular corners. Even a sharp dogleg uses a sweeping arc. Straight holes still have subtle organic width variation. S-curves mirror the natural flow of a river or valley. Always ask: does this routing feel like it was cut through actual terrain?

---

## Iconic Hole Archetypes

Each hole in Range+ is inspired by a famous real-world design concept:

| Archetype | Real-World Inspiration | Range+ Hole |
|-----------|----------------------|-------------|
| Island Green | TPC Sawgrass 17th | Island Green (hole 2) |
| Creek-crossing risk/reward | Augusta National 13th (Azalea) | Azalea (hole 3) |
| Cape / diagonal water carry | National Golf Links of America | The Cape (hole 4) |
| Postage Stamp / bunker ring | Royal Troon 8th | Postage Stamp (hole 5) |
| Split fairway / S-curve | Strategic design principle | The Fork (hole 6) |
| Peninsula green | Pebble Beach 7th | Peninsula (hole 7) |
| Sharp dogleg | St Andrews 17th (Road Hole) | The Bend (hole 8) |
| Driveable par 4 | Risk/reward design principle | The Drive (hole 9) |
| S-curve river valley | Natural terrain routing | Creek Valley (hole 11) |
| Reachable par 5 corner | Risk/reward, reachable in two | Eagle's Reach (hole 15) |
| Penultimate drama | Classic Amen Corner concept | Amen Corner (hole 17) |

---

## Technical Acceptance Criteria

> The specific rules, vertex minimums, routing distribution requirements, green size tables, and quality checklists live in:
> **`openspec/specs/course-design-guide.md`**
>
> That document is the authoritative technical reference for new course authors and AI agents. What follows are the philosophical principles behind those rules.

### Why Organic Shapes?

Real fairway edges are mowed grass — they curve naturally. Even straight holes have subtle width variation and soft side curves that add visual texture. Hard rectangular fairway corners don't exist in nature. Every polygon in Range+ should feel like it was shaped by terrain, not drawn with a ruler.

### Why Routing Diversity?

A course where every hole plays straight up a narrow corridor is exhausting and repetitive. Players should have to think differently on every hole — sometimes aiming at a corner, sometimes laying up, sometimes deciding how much of a carry to take on. Routing variety creates those different decision points.

### Why Width Variation?

Fairways that narrow at strategic points (before a bend, near a hazard) force decisions. A wide landing zone rewards a well-struck drive and sets up the second shot. A pinch point after the landing zone means even a good drive can leave an awkward stance or blocked sight line.

---

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

- Radius of **6–18px** works well for visual balance
- **Vary sizes** for a natural look (don't make all trees the same radius)
- Mix large (14–18px) anchor trees with smaller (6–10px) fill trees
- Place trees to **define corridor edges**, not randomly in the rough
- Clusters of 2–3 trees at strategic points create "gates" the player must navigate
- Minimum 25 trees per hole

### Bunkers

- Typically small — polygon spans of **10–15 pixels**
- **6 points** per bunker creates smooth enough curves
- Place them to guard the **obvious** line — force players to think about angle of approach
- Greenside bunkers should protect the "easy" side, leaving a harder angle as the safe play

## Current Par Distribution — The Starter

The 18 holes of The Starter have the following distribution:

| Par | Count | Holes |
|-----|-------|-------|
| 3 | 4 | Island Green, Postage Stamp, The Long Iron, Cypress Point |
| 4 | 10 | The Welcome, The Cape, The Fork, The Bend, The Drive, The Closer, The Ridge, The Narrows, Amen Corner, The Finish Line |
| 5 | 4 | Azalea, Peninsula, Creek Valley, Eagle's Reach |
| **Total** | **18** | **Par 72** |

When designing a new course, maintain this distribution: **4 par-3s, 10 par-4s, 4 par-5s = Par 72**.

## Example: Anatomy of a Well-Designed Hole

Consider **The Cape (hole 4)** — a par-4 cape hole inspired by the National Golf Links:

- **Strategic question**: How much of the diagonal water carry do you take on?
- **Bold line**: Cut across the water for a short approach to the pin
- **Safe line**: Play away from the water for a longer but dry second shot
- **Bunkers**: Guard the green on the "reward" side, so even a successful carry still demands precision
- **Trees**: Line the safe side to prevent bail-out shots from being too easy
- **Green shape**: Angled relative to the fairway, rewarding the aggressive line with a better angle in

This is the template to follow: every design element serves the central strategic question.
