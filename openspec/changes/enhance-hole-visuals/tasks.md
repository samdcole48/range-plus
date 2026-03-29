# Enhance Hole Visuals — Task Tracker

> **Spec:** `openspec/changes/enhance-hole-visuals/SPEC.md`
> **Branch:** `feature/enhance-hole-visuals`
> **Status:** 24/24 tasks complete

---

## Progress Summary

| Status | Count |
|--------|-------|
| ✅ Done | 24 |
| ⬜ Remaining | 0 |

---

## Tasks

### Phase 1 — Types

- [x] **Task 1** ✓ `1bc7499` — Add `Rock`, `Bush`, `FlowerBed` interfaces to types.ts → `CHG-VIS-004, -005, -007` → `types.ts`
- [x] **Task 2** ✓ `1bc7499` — Add optional `rocks?`, `bushes?`, `flowerBeds?` to `HoleDefinition` → `CHG-VIS-002, -003, -006` → `types.ts`

### Phase 2 — Data Validation Tests

- [x] **Task 3** ✓ `ae38172` — Test: each hole has ≥25 trees → `CHG-VIS-001` → `holes.test.ts`
- [x] **Task 4** ✓ `ae38172` — Test: each hole has rocks[] with ≥3 entries → `CHG-VIS-002` → `holes.test.ts`
- [x] **Task 5** ✓ `ae38172` — Test: each hole has bushes[] with ≥3 entries → `CHG-VIS-003` → `holes.test.ts`
- [x] **Task 6** ✓ `ae38172` — Test: rocks have valid dimensions and position → `CHG-VIS-004` → `holes.test.ts`
- [x] **Task 7** ✓ `ae38172` — Test: bushes have valid position and radius → `CHG-VIS-005` → `holes.test.ts`
- [x] **Task 8** ✓ `ae38172` — Test: flower beds on 3–4 holes only → `CHG-VIS-006` → `holes.test.ts`
- [x] **Task 9** ✓ `ae38172` — Test: flower beds have valid position/radius/color → `CHG-VIS-007` → `holes.test.ts`
- [x] **Task 10** ✓ `ae38172` — Test: tree radius range 6–18px → `CHG-VIS-008` → `holes.test.ts`

### Phase 3 — Hole Data Enhancement

- [x] **Task 11** ✓ `ae38172` — Enhance holes 1–3: dense trees, rocks, bushes (+ flowers on Azalea & Welcome) → `CHG-VIS-001–008` → `holes.ts`
- [x] **Task 12** ✓ `ae38172` — Enhance holes 4–6: dense trees, rocks, bushes → `CHG-VIS-001–005` → `holes.ts`
- [x] **Task 13** ✓ `ae38172` — Enhance holes 7–9: dense trees, rocks, bushes → `CHG-VIS-001–005` → `holes.ts`
- [x] **Task 14** ✓ `ae38172` — Enhance holes 10–12: dense trees, rocks, bushes → `CHG-VIS-001–005` → `holes.ts`
- [x] **Task 15** ✓ `ae38172` — Enhance holes 13–15: dense trees, rocks, bushes (+ flowers on Cypress Point) → `CHG-VIS-001–008` → `holes.ts`
- [x] **Task 16** ✓ `ae38172` — Enhance holes 16–18: dense trees, rocks, bushes (+ flowers on The Finish Line) → `CHG-VIS-001–008` → `holes.ts`

### Phase 4 — Rendering

- [x] **Task 17** ✓ `f77a12a` — Add SVG gradient/filter defs for rocks → `HoleView.tsx`
- [x] **Task 18** ✓ `f77a12a` — Add SVG gradient/filter defs for bushes and flower beds → `HoleView.tsx`
- [x] **Task 19** ✓ `f77a12a` — Test: HoleView renders rock elements → `CHG-VIS-009` → `HoleView.test.tsx`
- [x] **Task 20** ✓ `f77a12a` — Test: HoleView renders bush elements → `CHG-VIS-010` → `HoleView.test.tsx`
- [x] **Task 21** ✓ `f77a12a` — Test: HoleView renders flower bed elements (present + absent) → `CHG-VIS-011, -012` → `HoleView.test.tsx`
- [x] **Task 22** ✓ `f77a12a` — Add rock, bush, flower bed rendering layers to HoleView.tsx → `CHG-VIS-009–012` → `HoleView.tsx`

### Phase 5 — Verification & Docs

- [x] **Task 23** ✓ `f77a12a` — Full regression: all 111 tests pass, lint clean, build succeeds (253KB bundle)
- [x] **Task 24** ✓ — Update baseline spec `hole-data/spec.md` with new decorative fields → `openspec/specs/hole-data/spec.md`

