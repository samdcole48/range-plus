# Redesign Greens — Task Tracker

> **Spec:** `openspec/changes/redesign-greens/SPEC.md`
> **Branch:** `feature/redesign-greens`
> **Status:** 25/25 tasks complete ✅

---

## Progress Summary

| Status | Count |
|--------|-------|
| ✅ Done | 25 |
| ⬜ Remaining | 0 |

---

## Tasks

### Phase 1 — Type & Data Structure

- [x] **Task 1** — Add `pinPositions: Point[]` to `HoleDefinition` type → `CHG-GREEN-001` → `types.ts` ✓
- [x] **Task 2** — Add `activePinPosition: Point` to `GameState` type → `CHG-GREEN-012` → `types.ts` ✓
- [x] **Task 3** — Test: each hole has `pinPositions` with 3–4 entries → `CHG-GREEN-001, CHG-GREEN-002` → `holes.test.ts`, `holes.ts` ✓
- [x] **Task 4** — Test: `pinPosition === pinPositions[0]` for all holes → `CHG-GREEN-003` → `holes.test.ts` ✓
- [x] **Task 5** — Test: all pin positions are inside the green → `CHG-GREEN-004` → `holes.test.ts` ✓
- [x] **Task 6** — Add `pinPositions` arrays to all 18 holes in `holes.ts` → `CHG-GREEN-001–004` → `holes.ts` ✓

### Phase 2 — Green Geometry Redesign

- [x] **Task 7** — Test: avg par-3 green area < avg par-4 green area → `CHG-GREEN-005` → `holes.test.ts` ✓
- [x] **Task 8** — Test: avg par-5 green area > avg par-4 green area → `CHG-GREEN-006` → `holes.test.ts` ✓
- [x] **Task 9** — Test: no green below minimum playable size → `CHG-GREEN-007` → `holes.test.ts` ✓
- [x] **Task 10** — Test: green polygons have ≥8 vertices → `CHG-GREEN-008` → `holes.test.ts` ✓
- [x] **Task 11** — Test: all green vertices inside fairway → `CHG-GREEN-009` → `holes.test.ts` ✓
- [x] **Task 12** — Redesign green polygons for holes 1–9 → `CHG-GREEN-005–009` → `holes.ts` ✓
- [x] **Task 13** — Redesign green polygons for holes 10–18 → `CHG-GREEN-005–009` → `holes.ts` ✓

### Phase 3 — Pin Spread Validation

- [x] **Task 14** — Test: pin positions spread ≥40% of longest axis → `CHG-GREEN-010` → `holes.test.ts` ✓
- [x] **Task 15** — Test: not all pins at centroid (≥2 pins ≥5px away) → `CHG-GREEN-011` → `holes.test.ts` ✓
- [x] **Task 16** — Adjust pin positions if any fail spread tests → `CHG-GREEN-010–011` → `holes.ts` ✓

### Phase 4 — Game Logic

- [x] **Task 17** — Test: `createGameState` sets `activePinPosition` from `pinPositions` → `CHG-GREEN-012` → `game.test.ts`, `game.ts` ✓ db90a4a
- [x] **Task 18** — Test: distance calc uses `activePinPosition` → `CHG-GREEN-013` → `game.test.ts`, `game.ts` ✓ dc0c0bc
- [x] **Task 19** — Test: putt calc uses `activePinPosition` → `CHG-GREEN-014` → `game.test.ts`, `game.ts` ✓ cde5cee
- [x] **Task 20** — Test: `activePinPosition` stable across shots → `CHG-GREEN-015` → `game.test.ts` ✓ 3a6a74e
- [x] **Task 21** — Update `game.ts` to use `activePinPosition` throughout → `CHG-GREEN-012–015` → `game.ts` ✓

### Phase 5 — Rendering

- [x] **Task 22** — Test: HoleView renders pin at `activePinPosition` → `CHG-GREEN-016` → `HoleView.test.tsx` ✓ a1cb6cf
- [x] **Task 23** — Update `HoleView.tsx` to use `activePinPosition` → `CHG-GREEN-016` → `HoleView.tsx` ✓ 7539d55

### Phase 6 — Spec & Docs

- [x] **Task 24** — Update baseline spec `hole-data/spec.md` with new fields → `openspec/specs/hole-data/spec.md` ✓ 6f6b5d0
- [x] **Task 25** — Update `game-logic/spec.md` with `activePinPosition` scenarios → `openspec/specs/game-logic/spec.md` ✓ 6f6b5d0
