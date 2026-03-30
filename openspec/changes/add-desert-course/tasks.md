# Tasks — Add Desert Course

> **Spec:** [SPEC.md](./SPEC.md)
> **Branch:** `feature/add-desert-course`
> **Status:** 0 of 27 tasks complete

## Progress Summary

| Status | Count |
|--------|-------|
| ✅ Done | 0 |
| 🔲 Pending | 27 |
| **Total** | **27** |

---

## Phase 1 — Types & Architecture

- [x] **Task 1** — Add `Rock` interface to types → `CHG-COURSE-001` → `types.ts` ✓
- [x] **Task 2** — Add `Boulder` interface to types → `CHG-COURSE-002` → `types.ts` ✓
- [x] **Task 3** — Add `courseTheme` to `HoleDefinition`; add optional `rocks`, `boulders` → `CHG-COURSE-003` → `types.ts` ✓
- [x] **Task 4** — Add `CourseDefinition` interface → `CHG-COURSE-004` → `types.ts` ✓

## Phase 2 — Data Restructuring

- [x] **Task 5** — Tag all existing holes with `courseTheme: 'classic'` → `CHG-COURSE-005` → `holes.ts` ✓
- [x] **Task 6** — Create `src/data/courses/the-starter.ts` with `THE_STARTER` course → `CHG-COURSE-006` → `courses/the-starter.ts` ✓
- [ ] **Task 7** — Create `src/data/courses/index.ts` barrel → `CHG-COURSE-007` → `courses/index.ts`
- [ ] **Task 8** — Update `holes.ts` to re-export `ALL_HOLES` as `PRESET_HOLES` → `CHG-COURSE-008` → `holes.ts`
- [ ] **Task 9** — Verify `getRandomHole` works with combined array → `CHG-COURSE-009` → `holeSelection.ts`

## Phase 3 — Desert Course Data

- [ ] **Task 10** — Create BJC course file with 18 holes → `CHG-COURSE-010` → `courses/black-jacks-crossing.ts`
- [ ] **Task 11** — Verify BJC par totals 72 → `CHG-COURSE-011` → `courses/black-jacks-crossing.ts`
- [ ] **Task 12** — Verify BJC par distribution (4/10/4) → `CHG-COURSE-012` → `courses/black-jacks-crossing.ts`
- [ ] **Task 13** — Verify all BJC holes have `courseTheme: 'desert'` → `CHG-COURSE-013` → `courses/black-jacks-crossing.ts`
- [ ] **Task 14** — Add rocks to all BJC holes (≥10 per hole) → `CHG-COURSE-014` → `courses/black-jacks-crossing.ts`
- [ ] **Task 15** — Add boulders to all BJC holes (≥2 per hole) → `CHG-COURSE-015` → `courses/black-jacks-crossing.ts`
- [ ] **Task 16** — Validate BJC geometry (greens ⊂ fairways, pins ⊂ greens) → `CHG-COURSE-016` → `courses/black-jacks-crossing.ts`
- [ ] **Task 17** — Validate BJC yardage per par → `CHG-COURSE-017` → `courses/black-jacks-crossing.ts`
- [ ] **Task 18** — Validate BJC total yardage in range → `CHG-COURSE-018` → `courses/black-jacks-crossing.ts`
- [ ] **Task 19** — Verify all hole IDs unique across courses → `CHG-COURSE-019` → `holes.test.ts`
- [ ] **Task 20** — Validate BJC pin positions (3–4 per hole, inside green) → `CHG-COURSE-020` → `courses/black-jacks-crossing.ts`

## Phase 4 — Test Adaptation

- [ ] **Task 21** — Update PRESET_HOLES count to 36 → `CHG-COURSE-021` → `holes.test.ts`
- [ ] **Task 22** — Update combined par total to 144 → `CHG-COURSE-022` → `holes.test.ts`
- [ ] **Task 23** — Scope "no rocks" test to classic-theme holes only → `CHG-COURSE-023` → `holes.test.ts`

## Phase 4 — Desert Rendering

- [ ] **Task 24** — Add desert rough gradient to HoleView → `CHG-COURSE-024` → `HoleView.tsx`
- [ ] **Task 25** — Render rocks as SVG circles → `CHG-COURSE-025` → `HoleView.tsx`, `HoleView.test.tsx`
- [ ] **Task 26** — Render boulders as SVG polygons → `CHG-COURSE-026` → `HoleView.tsx`, `HoleView.test.tsx`
- [ ] **Task 27** — Verify classic holes still render green rough → `CHG-COURSE-027` → `HoleView.test.tsx`
