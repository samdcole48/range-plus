# Refine Hole Visuals — Task Tracker

> **Spec:** `openspec/changes/refine-hole-visuals/SPEC.md`
> **Branch:** `feature/enhance-hole-visuals`
> **Status:** 0/9 tasks complete

## Tasks

### Phase 1 — Remove Rocks & Flowers

- [x] **Task 1** ✓ — Test: no hole has rocks → remove Rock type + data → CHG-REF-001
- [ ] **Task 2** — Test: no hole has flowerBeds → remove FlowerBed type + data → CHG-REF-002
- [ ] **Task 3** — Remove rock/flower rendering + gradient defs from HoleView.tsx + update render tests

### Phase 2 — Reposition Trees

- [ ] **Task 4** — Test: ≥80% trees within 60px of fairway bounding box X edges → FAIL → CHG-REF-003
- [ ] **Task 5** — Reposition trees holes 1–6 to hug fairway edges
- [ ] **Task 6** — Reposition trees holes 7–12 to hug fairway edges
- [ ] **Task 7** — Reposition trees holes 13–18 to hug fairway edges → CHG-REF-003 PASSES

### Phase 3 — Verify

- [ ] **Task 8** — Full regression: `npx vitest run` + `npm run lint` + `npm run build`
- [ ] **Task 9** — Update tasks.md complete
