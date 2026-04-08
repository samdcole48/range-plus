# Redesign Fairways — Task Tracker

> **Spec:** `openspec/changes/redesign-fairways/SPEC.md`
> **Prerequisite:** `remove-bjc-course` must be completed first
> **Branch:** `feature/redesign-fairways`
> **Started:** —
> **Status:** NOT STARTED

---

## Progress Summary

- **Total tasks:** 17
- **Completed:** 0
- **Remaining:** 17

---

## Phase 1 — Vertex Count Tests & Fixes

- [ ] **Task 1** — CHG-FWY-001: Test Par-3 fairways have ≥12 vertices (`holes.test.ts`)
- [ ] **Task 2** — CHG-FWY-002: Test Par-4 fairways have ≥16 vertices (`holes.test.ts`)
- [ ] **Task 3** — CHG-FWY-003: Test Par-5 fairways have ≥20 vertices (`holes.test.ts`)
- [ ] **Task 4** — CHG-FWY-001–003: Rebuild The Starter fairway polygons to meet vertex minimums (`the-starter.ts`)

## Phase 2 — Angle Constraint Tests & Fixes

- [ ] **Task 5** — CHG-FWY-004: Add `interiorAngle` helper to test utilities (`holes.test.ts`)
- [ ] **Task 6** — CHG-FWY-004: Test no fairway interior angle below 90° (`holes.test.ts`)
- [ ] **Task 7** — CHG-FWY-004: Fix The Starter fairway angles violating 90° minimum (`the-starter.ts`)

## Phase 3 — Routing Diversity Tests & Redesign

- [ ] **Task 8** — CHG-FWY-005–007: Add `classifyRouting` helper to test utilities (`holes.test.ts`)
- [ ] **Task 9** — CHG-FWY-005: Test course has ≤6 straight holes (`holes.test.ts`)
- [ ] **Task 10** — CHG-FWY-006: Test course has ≥5 dogleg holes (`holes.test.ts`)
- [ ] **Task 11** — CHG-FWY-007: Test course has ≥2 S-curve holes (`holes.test.ts`)
- [ ] **Task 12** — CHG-FWY-005–007: Redesign The Starter fairways for routing diversity (`the-starter.ts`)
- [ ] **Task 13** — CHG-FWY-011: Adjust trees/bushes displaced by fairway changes (`the-starter.ts`)

## Phase 4 — Regression & Spec Updates

- [ ] **Task 14** — CHG-FWY-011: Verify all green containment tests pass (`holes.test.ts`)
- [ ] **Task 15** — CHG-FWY-012: Verify all pin containment tests pass (`holes.test.ts`)
- [ ] **Task 16** — CHG-FWY-013: Verify orientation rule holds (`holes.test.ts`)
- [ ] **Task 17** — Update `openspec/specs/hole-data/spec.md` with new fairway rules
