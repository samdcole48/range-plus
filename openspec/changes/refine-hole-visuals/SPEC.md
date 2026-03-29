# Refine Hole Visuals — Remove Rocks/Flowers, Relocate Trees to Fairway Edges

> **Status:** DRAFT
> **Author:** Copilot (with human direction)
> **Created:** 2026-03-29
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-4.4 (Baseline First), ENG-1.2
> **Branch:** `feature/enhance-hole-visuals` (continuation)
> **Affected Files:** `src/domain/types.ts`, `src/data/holes.ts`, `src/data/holes.test.ts`, `src/components/HoleView.tsx`, `src/components/HoleView.test.tsx`
> **Builds on:** `openspec/changes/enhance-hole-visuals/SPEC.md`

---

## Problem Statement

After reviewing the `enhance-hole-visuals` implementation:

1. **Rocks and flower beds add visual noise with no gameplay relevance.** They are scattered in rough areas too far from play to register as meaningful scenery.
2. **Trees are too far from fairways to influence decision-making.** On Hole 1 for example, left-side trees sit at x:100–130 while the fairway left edge is at x:155–168 — a gap of 25–68px. From a player's perspective, these trees are just background wallpaper; they don't create the "should I go left or right?" tension that fairway-lining trees create on real courses.

### Real-World Reference

On courses like Augusta National, Pebble Beach, and TPC Sawgrass, trees line the **immediate edges** of fairways. They are a central part of course strategy — a wayward shot lands in the trees. In SVG terms, this means trees should be 3–15px outside the fairway polygon boundary, not 30–80px away.

---

## Proposed Changes

### Change 1 — Remove Rocks Entirely

- Delete `Rock` interface from `types.ts`
- Remove `rocks?` field from `HoleDefinition`
- Remove all `rocks` arrays from all 18 holes in `holes.ts`
- Remove rock rendering layer from `HoleView.tsx`
- Remove rock gradient defs from `HoleView.tsx`
- Remove rock-related tests from `holes.test.ts` and `HoleView.test.tsx`

### Change 2 — Remove Flower Beds Entirely

- Delete `FlowerBed` interface from `types.ts`
- Remove `flowerBeds?` field from `HoleDefinition`
- Remove all `flowerBeds` arrays from all 18 holes in `holes.ts`
- Remove flower bed rendering layer from `HoleView.tsx`
- Remove flower bed tests from `holes.test.ts` and `HoleView.test.tsx`

### Change 3 — Reposition Trees to Hug Fairway Edges

**Goal:** Trees should sit 3–18px outside the fairway boundary, creating visible corridors that influence shot selection.

**Rule:** For each hole, identify the fairway left-edge X range and right-edge X range at each Y level. Place trees such that:
- Left-side trees: `x = fairway_left_edge - 3` to `x = fairway_left_edge - 20`
- Right-side trees: `x = fairway_right_edge + 3` to `x = fairway_right_edge + 20`
- Trees should also be placed densely along doglegs to define the corner

**Keep bushes** — `Bush` type, `bushes?` field, and all bush data stay unchanged. Bushes are smaller and can remain where they are as understory.

---

## Per-Hole Tree Repositioning Guide

For each hole, derive approximate fairway left/right X edges from `fairwayBoundary.points` at key Y levels, then place trees 3–20px outside those edges.

| Hole | Fairway Left Edge (approx X) | Fairway Right Edge (approx X) | Left Tree Target X | Right Tree Target X |
|------|------------------------------|-------------------------------|-------------------|---------------------|
| 1 — The Welcome | 150–168 | 230–252 | 130–165 | 235–270 |
| 2 — Island Green | Narrow bridge ~160–240 | — | 130–158 | 242–275 |
| 3 — Azalea | ~150–165 | ~235–250 | 128–163 | 238–268 |
| 4 — The Cape | varies (dogleg) | varies | read from data | read from data |
| 5 — Postage Stamp | ~155–170 | ~230–245 | 133–168 | 232–260 |
| 6–18 | read fairway boundary | read fairway boundary | hug left edge | hug right edge |

**Minimum tree count:** ≥25 per hole (maintain density, just reposition).
**Radius range:** keep 6–18px variation.

---

## Scope

### In Scope
1. Remove `Rock` interface from `types.ts`
2. Remove `FlowerBed` interface from `types.ts`
3. Remove `rocks?` and `flowerBeds?` optional fields from `HoleDefinition`
4. Remove all `rocks` and `flowerBeds` arrays from all 18 holes in `holes.ts`
5. Reposition all tree coordinates in all 18 holes to hug fairway edges
6. Remove rock and flower bed rendering layers and gradient defs from `HoleView.tsx`
7. Remove rock and flower bed tests from `holes.test.ts` and `HoleView.test.tsx`
8. Keep `Bush`, `bushes?`, bush data, bush rendering, and bush tests — unchanged

### Out of Scope
- Fairway geometry — unchanged
- Green geometry — unchanged
- Bunker/water geometry — unchanged
- Game logic — unchanged
- `Bush` type and data — unchanged

---

## Test Scenarios

### Removed Tests (rocks/flowers gone)
- CHG-VIS-002 (rocks ≥3 per hole) — **DELETE**
- CHG-VIS-004 (rocks valid dimensions) — **DELETE**
- CHG-VIS-006 (flower beds on 3–4 holes) — **DELETE**
- CHG-VIS-007 (flower beds valid data) — **DELETE**
- CHG-VIS-009 (HoleView renders rocks) — **DELETE**
- CHG-VIS-011 (HoleView renders flower beds) — **DELETE**
- CHG-VIS-012 (HoleView renders 0 flower beds when absent) — **DELETE**

### Updated Tests
- CHG-VIS-001 — still requires ≥25 trees per hole ✅ keep
- CHG-VIS-003 — still requires bushes ≥3 per hole ✅ keep
- CHG-VIS-005 — still requires bushes valid ✅ keep
- CHG-VIS-008 — still requires tree radii 6–18px ✅ keep
- CHG-VIS-010 — still requires HoleView renders bushes ✅ keep

### New Tests

#### Scenario: CHG-REF-001 — No hole has rocks
- **GIVEN** all holes in `PRESET_HOLES`
- **WHEN** `rocks` field is checked
- **THEN** it is `undefined` on every hole

#### Scenario: CHG-REF-002 — No hole has flowerBeds
- **GIVEN** all holes in `PRESET_HOLES`
- **WHEN** `flowerBeds` field is checked
- **THEN** it is `undefined` on every hole

#### Scenario: CHG-REF-003 — Trees line fairway edges (within 60px)
- **GIVEN** each hole in `PRESET_HOLES`
- **WHEN** each tree position is checked against the fairway bounding box
- **THEN** at least 80% of trees are within 60px of the fairway bounding box X edges

**Design intent:** Trees should create a visible corridor that pressures shot selection. A player should feel "if I miss left or right, I'm in the trees." 60px clearance on a 400px canvas achieves this while allowing natural variation in tree depth.

---

## Implementation Tasks

### Phase 1 — Remove Rocks & Flowers (TDD)

| # | Task | Scenario | File(s) |
|---|------|----------|---------|
| 1 | Test: no hole has rocks → FAIL → remove Rock type + data → PASS | CHG-REF-001 | `holes.test.ts`, `types.ts`, `holes.ts` |
| 2 | Test: no hole has flowerBeds → FAIL → remove FlowerBed type + data → PASS | CHG-REF-002 | `holes.test.ts`, `types.ts`, `holes.ts` |
| 3 | Remove rock/flower rendering from HoleView.tsx + gradient defs | CHG-VIS-009, -011, -012 | `HoleView.tsx`, `HoleView.test.tsx` |

### Phase 2 — Reposition Trees

| # | Task | Scenario | File(s) |
|---|------|----------|---------|
| 4 | Test: ≥80% of trees within 25px of fairway bounding box X edges → FAIL | CHG-REF-003 | `holes.test.ts` |
| 5 | Reposition trees holes 1–6 to hug fairway edges → partial PASS | CHG-REF-003 | `holes.ts` |
| 6 | Reposition trees holes 7–12 to hug fairway edges | CHG-REF-003 | `holes.ts` |
| 7 | Reposition trees holes 13–18 to hug fairway edges → full PASS | CHG-REF-003 | `holes.ts` |

### Phase 3 — Verify

| # | Task | File(s) |
|---|------|---------|
| 8 | Full regression: `npx vitest run` + `npm run lint` + `npm run build` | — |
| 9 | Update tasks.md | `tasks.md` |

---

## Acceptance Criteria

- [ ] No `Rock` interface in `types.ts`
- [ ] No `FlowerBed` interface in `types.ts`
- [ ] No `rocks` or `flowerBeds` fields on any hole
- [ ] No rock or flower bed rendering in `HoleView.tsx`
- [ ] All 18 holes still have ≥25 trees
- [ ] ≥80% of trees per hole within 60px of fairway bounding box X edges
- [ ] `Bush` type, data, and rendering unchanged
- [ ] All remaining tests pass
- [ ] Lint passes, build succeeds
