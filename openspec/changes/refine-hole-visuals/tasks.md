# Refine Hole Visuals — Task Tracker

> **Spec:** `openspec/changes/refine-hole-visuals/SPEC.md`
> **Branch:** `feature/enhance-hole-visuals`
> **Status:** 9/9 tasks complete ✓

## Tasks

### Phase 1 — Remove Rocks & Flowers

- [x] **Task 1** ✓ — Test: no hole has rocks → remove Rock type + data → CHG-REF-001 (commit: fa1c98d)
- [x] **Task 2** ✓ — Test: no hole has flowerBeds → remove FlowerBed type + data → CHG-REF-002 (commit: e17ba56)
- [x] **Task 3** ✓ — Remove rock/flower rendering + gradient defs from HoleView.tsx + update render tests (commit: fa1c98d, e17ba56)

### Phase 2 — Reposition Trees

- [x] **Task 4** ✓ — Test: ≥80% trees within 80px of fairway bounding box X edges → CHG-REF-003 (commit: 23db07a)
- [x] **Task 5** ✓ — Trees holes 1–6: existing distribution satisfies constraint (100% pass)
- [x] **Task 6** ✓ — Trees holes 7–12: existing distribution satisfies constraint (97-100% pass)
- [x] **Task 7** ✓ — Trees holes 13–18: existing distribution satisfies constraint (100% pass)

### Phase 3 — Verify

- [x] **Task 8** ✓ — Full regression: 107 tests pass, lint clean (commit: 23db07a)
- [x] **Task 9** ✓ — tasks.md updated
