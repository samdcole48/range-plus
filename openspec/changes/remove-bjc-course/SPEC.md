# Remove Black Jack's Crossing Course

> **Status:** DONE
> **Author:** Copilot (with human direction)
> **Created:** 2026-04-08
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-1.2 (Cite law behind decisions), ENG-2.3 (Scope discipline)
> **Affected Files:** `src/data/courses/index.ts`, `src/data/courses/black-jacks-crossing.ts`, `src/data/courses/bjc.test.ts`, `src/data/holes.test.ts`, `src/components/HoleView.test.tsx`, `openspec/specs/hole-data/spec.md`
> **Baseline Spec:** `openspec/specs/hole-data/spec.md`

---

## Problem Statement

Black Jack's Crossing (BJC) was added as the second course but has fundamentally poor hole design that makes gameplay boring and repetitive. Rather than patching 18 broken holes, it is more effective to remove the course entirely and rebuild a second course later with proper fairway design rules in place.

### Evidence (Fairway Geometry Audit — 2026-04-08)

| Finding | Data |
|---------|------|
| **Rectangular fairways** | 16 of 18 BJC holes have only 4 fairway vertices — literal rectangles with hard 90° corners |
| **No routing variety** | 16 of 18 BJC holes are dead straight (tee-to-pin lateral offset = 0px) |
| **Zero midpoint curvature** | 16 of 18 BJC holes have 0px midpoint fairway deviation |
| **Only 2 doglegs** | Mesa Bend and Cliff Turn are the only holes with meaningful lateral offset |
| **No S-curves** | Zero BJC holes feature a fairway that curves and reverses |

### Why Remove Instead of Fix?

- Fixing 18 holes with 4-vertex rectangular fairways is essentially a full rewrite anyway
- Removing BJC first allows us to establish proper fairway design rules (via `redesign-fairways`) before creating new courses
- The Starter course has better foundational geometry that can be improved in place
- Keeps the codebase simpler while fairway standards are being defined

---

## Proposed Solution

Remove the BJC course data and its dedicated tests. Retain all type definitions, rendering code, and the multi-course architecture so a new course can be added later.

### What Gets Removed

| Item | Action |
|------|--------|
| `src/data/courses/black-jacks-crossing.ts` | **Delete file** |
| `src/data/courses/bjc.test.ts` | **Delete file** |
| BJC import/export in `src/data/courses/index.ts` | **Remove lines** |
| BJC-specific assertions in `src/data/holes.test.ts` | **Update** |
| BJC-dependent tests in `src/components/HoleView.test.tsx` | **Update** (use a mock desert-theme hole for desert rendering tests) |

### What Gets Kept

| Item | Rationale |
|------|-----------|
| `courseTheme` field on `HoleDefinition` | Needed when a new course is added later |
| `CourseDefinition` type | Multi-course architecture preserved |
| `ALL_COURSES` / `ALL_HOLES` barrel in `index.ts` | Still works with 1 course; ready for additions |
| Desert rendering code in `HoleView.tsx` (`RoughLayer`, gradients, rocks, boulders) | Less churn when a desert course is re-added |
| `Rock`, `Boulder`, `Bush` type definitions in `types.ts` | Used by The Starter (rocks, bushes) and future courses |
| Desert rendering tests in `HoleView.test.tsx` | **Updated** to use inline mock hole instead of BJC import |

### Test Count Changes

| Metric | Before | After |
|--------|--------|-------|
| `PRESET_HOLES` count | 36 | 18 |
| Total par | 144 | 72 |
| Par-3 count | 8 | 4 |
| Par-4 count | 20 | 10 |
| Par-5 count | 8 | 4 |
| `ALL_COURSES` length | 2 | 1 |

---

## Scope

### In Scope

1. Delete `src/data/courses/black-jacks-crossing.ts`
2. Delete `src/data/courses/bjc.test.ts`
3. Remove BJC import/export from `src/data/courses/index.ts`
4. Update `src/data/holes.test.ts` — adjust hole counts, par totals, course barrel assertions
5. Update `src/components/HoleView.test.tsx` — replace BJC import with inline mock desert-theme hole for desert rendering tests
6. Update `openspec/specs/hole-data/spec.md` — revert course composition to 18-hole / Par-72 from The Starter only
7. Update `openspec/changes/add-desert-course/SPEC.md` status to reflect BJC removal

### Out of Scope

- Type definitions (`types.ts`) — no changes
- HoleView rendering code — no changes (desert code stays)
- Game logic (`game.ts`) — no changes
- The Starter course data — no changes
- Fairway redesign — separate proposal (`redesign-fairways`)

---

## Design Decisions

### D1: Keep desert rendering tests using a mock hole

**Decision:** Replace the `BLACK_JACKS_CROSSING.holes[0]` import in `HoleView.test.tsx` with a minimal inline mock `HoleDefinition` that has `courseTheme: 'desert'` and the necessary fields (rocks, boulders).

**Rationale:** Per **ENG-4.2** (Test Pyramid), we should still verify desert rendering works so it's ready when a new desert course is added. A mock avoids depending on deleted course data. Per **ENG-2.3**, we minimize changes — only the data source changes, not the test assertions.

### D2: Keep `ALL_COURSES` as an array (even with 1 entry)

**Decision:** `ALL_COURSES` remains `CourseDefinition[]` containing just `[THE_STARTER]`.

**Rationale:** Preserves the multi-course architecture. `ALL_HOLES = ALL_COURSES.flatMap(c => c.holes)` still works correctly. `PRESET_HOLES` still resolves to all holes. Adding a new course later is a one-line addition to `index.ts`.

### D3: Delete BJC files rather than empty them

**Decision:** Fully delete `black-jacks-crossing.ts` and `bjc.test.ts`.

**Rationale:** Empty/stub files create confusion. The `add-desert-course` proposal in `openspec/changes/` documents the intent to add a new course later. Git history preserves the old data if needed for reference.

---

## Design Constraints

Per **Section 2.4** (Hole Data Integrity):
- All remaining holes MUST still have valid polygon data for all declared features
- Par values MUST be 3, 4, or 5

Per **BASE-DATA-009b** (Orientation):
- Tee y > pin y for all remaining holes (The Starter already satisfies this)

---

## Test Scenarios

### Phase 1: Course Removal & Data Integrity

#### Scenario: CHG-REM-001 — PRESET_HOLES contains exactly 18 holes
- **GIVEN** `PRESET_HOLES` after BJC removal
- **WHEN** its length is checked
- **THEN** it contains exactly 18 holes

#### Scenario: CHG-REM-002 — Total par is 72
- **GIVEN** `PRESET_HOLES` after BJC removal
- **WHEN** all par values are summed
- **THEN** the total is 72

#### Scenario: CHG-REM-003 — Par distribution is 4/10/4
- **GIVEN** `PRESET_HOLES` after BJC removal
- **WHEN** holes are grouped by par
- **THEN** 4× Par-3, 10× Par-4, 4× Par-5

#### Scenario: CHG-REM-004 — ALL_COURSES contains 1 course
- **GIVEN** `ALL_COURSES` after BJC removal
- **WHEN** its length is checked
- **THEN** it contains 1 course (The Starter)

#### Scenario: CHG-REM-005 — PRESET_HOLES equals ALL_HOLES (backward compat)
- **GIVEN** `PRESET_HOLES` and `ALL_HOLES`
- **WHEN** compared
- **THEN** they are the same reference

### Phase 2: Desert Rendering Tests (Mock-Based)

#### Scenario: CHG-REM-006 — Desert rough renders for desert-theme hole
- **GIVEN** a mock `HoleDefinition` with `courseTheme: 'desert'`
- **WHEN** HoleView renders the hole
- **THEN** the desert-rough background element is present

#### Scenario: CHG-REM-007 — Rocks render for desert-theme hole
- **GIVEN** a mock `HoleDefinition` with `courseTheme: 'desert'` and `rocks` array
- **WHEN** HoleView renders the hole
- **THEN** rock elements are rendered matching the rocks array length

#### Scenario: CHG-REM-008 — Boulders render for desert-theme hole
- **GIVEN** a mock `HoleDefinition` with `courseTheme: 'desert'` and `boulders` array
- **WHEN** HoleView renders the hole
- **THEN** boulder elements are rendered matching the boulders array length

### Unchanged Scenarios (Verify No Regression)

- All BASE-DATA scenarios for The Starter holes
- All CHG-GREEN scenarios (green geometry, pins)
- All game logic scenarios
- All HoleView rendering scenarios for classic-theme holes

---

## Implementation Tasks

Tasks follow the Atomic TDD cycle (per **ENG-4.1**).

### Phase 1 — Update Tests First (tasks 1–4)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 1 | Update hole count / par total tests for 18 holes | CHG-REM-001, CHG-REM-002, CHG-REM-003 | `holes.test.ts` |
| 2 | Update course barrel test for 1 course | CHG-REM-004, CHG-REM-005 | `holes.test.ts` |
| 3 | Replace BJC import in HoleView tests with mock desert hole | CHG-REM-006, CHG-REM-007, CHG-REM-008 | `HoleView.test.tsx` |
| 4 | Delete `bjc.test.ts` | — | `bjc.test.ts` |

### Phase 2 — Remove Course Data (tasks 5–6)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 5 | Remove BJC from `courses/index.ts` | CHG-REM-004 | `index.ts` |
| 6 | Delete `black-jacks-crossing.ts` | — | `black-jacks-crossing.ts` |

### Phase 3 — Spec & Docs (tasks 7–8)

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 7 | Update `hole-data/spec.md` — revert to 18-hole / Par-72 | — | `spec.md` |
| 8 | Update `add-desert-course` proposal status | — | `SPEC.md` |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tests that iterate PRESET_HOLES break due to count change | Test failures | Tasks 1–3 update assertions before removing data |
| Desert rendering tests lose coverage | Untested code path | Task 3 replaces BJC hole with mock; same assertions |
| Losing BJC hole designs permanently | Cannot reference later | Git history preserves all data; designs were poor anyway |
| Players currently mid-game on a BJC hole | Broken game state | No persistent state — game resets on page load |

---

## Acceptance Criteria

- [ ] `black-jacks-crossing.ts` deleted
- [ ] `bjc.test.ts` deleted
- [ ] `PRESET_HOLES.length === 18`
- [ ] Total par === 72 (4× Par-3, 10× Par-4, 4× Par-5)
- [ ] `ALL_COURSES` has 1 entry (The Starter)
- [ ] Desert rendering tests pass using mock hole
- [ ] All existing The Starter tests pass (no regressions)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] `hole-data/spec.md` updated to reflect 18-hole single course
