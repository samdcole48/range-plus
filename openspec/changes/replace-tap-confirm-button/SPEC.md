# Replace Tap-to-Confirm with Explicit Confirm Button

> **Status:** DRAFT
> **Author:** Copilot (with human direction)
> **Created:** 2026-03-29
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-4.4 (Baseline First)
> **Affected Files:** `src/components/HoleView.tsx`, `src/components/HoleView.test.tsx`

---

## Problem Statement

The current shot placement uses a tap-to-preview-then-tap-again-to-confirm mechanic: the first tap sets a preview crosshair, and a second tap within 30px of the preview confirms the shot. In practice, this leads to **accidental shot placements** — users intending to reposition the preview accidentally tap too close to it and confirm an unintended shot. The 30px threshold is not forgiving enough to distinguish "I want to move my aim" from "I want to hit."

This is a usability problem identified through real user testing.

---

## Proposed Solution

Replace the "second tap near preview" confirmation with an **explicit "Confirm" button** fixed in the bottom-right corner of the screen. The button appears only when a preview is active and is the **sole way** to confirm a shot.

### Behavior Changes

| Aspect | Current (Tap-to-Confirm) | Proposed (Button Confirm) |
|--------|--------------------------|---------------------------|
| First tap on course | Sets preview | Sets preview (unchanged) |
| Tap within 30px of preview | **Confirms shot** | **Moves preview** (same as any tap) |
| Tap far from preview | Moves preview | Moves preview (unchanged) |
| Confirm mechanism | Second tap near preview | **"Confirm" button in bottom-right** |
| "Tap to hit" hint | Shown below crosshair | **Removed** |
| Cancel preview | Tap elsewhere | Tap elsewhere to reposition (unchanged) |

### Key Design Decisions

1. **Button text:** "Confirm" — clear, unambiguous action label
2. **Button position:** Inside the SVG, bottom-right corner of the 400×600 viewBox — part of the course map, always visible and thumb-friendly on mobile
3. **No cancel button:** Tapping elsewhere on the course repositions the preview, which is sufficient; no explicit cancel needed
4. **All taps reposition:** With the confirm threshold removed, every tap on the course either sets or moves the preview — no more accidental placements
5. **Remove "Tap to hit" hint:** The button itself communicates the confirm action; the in-SVG hint becomes redundant

---

## Scope

### In Scope

1. **Remove 30px confirm threshold logic** from `handleClick` in `HoleView.tsx` — all taps set/move preview
2. **Add "Confirm" button** — SVG element (rect + text) positioned in the bottom-right of the 400×600 viewBox, visible only when `previewPoint` is set and game is not complete
3. **Wire button to `placeShot()`** — clicking the SVG button calls the same `placeShot()` domain function and clears the preview
4. **Remove "Tap to hit" hint text** from the SVG preview group
5. **Remove `CONFIRM_THRESHOLD_PX` constant** (no longer needed)
6. **Update tests** — replace tap-to-confirm test scenarios with button-confirm scenarios
7. **Update baseline spec** — `openspec/specs/hole-view/spec.md` scenarios BASE-TAP-002 and BASE-TAP-003

### Out of Scope

- Changes to game logic (`src/domain/game.ts`) — `placeShot()` is called the same way
- Changes to scoring, hazards, or putt calculation
- Changes to the preview crosshair visual design (trajectory line, target ring, distance label remain)
- Changes to hole data or selection
- Accessibility improvements beyond this specific interaction (tracked as separate debt)

---

## Design Constraints

Per **Section 2.2** (Game State Immutability):
- The confirm button handler MUST use the same `placeShot()` pure function — no new state mutation patterns

Per **ENG-3.4** (Method Length ≤50 lines):
- The `handleClick` function will get simpler (removing the threshold branch), which improves compliance

Per **ENG-2.3** (Scope Boundary):
- Only touch `HoleView.tsx`, `HoleView.test.tsx`, and the baseline spec

---

## UI Specification

### Confirm Button

```
Position:  Inside the SVG, bottom-right corner of the 400×600 viewBox
Rendering: SVG elements (rect + text group) — NOT an HTML overlay
Visibility: Shown when previewPoint !== null AND !gameState.isComplete
Text:      "Confirm"
Style:     Dark rounded rect with white text, consistent with course HUD elements
Behavior:  onClick → placeShot(gameState, previewPoint), clear previewPoint
Note:      Must stop event propagation to prevent the SVG click handler
           from repositioning the preview when button is clicked
```

### Removed Elements

- `CONFIRM_THRESHOLD_PX` constant (line 69 of current HoleView.tsx)
- "Tap to hit" `<text>` element in the SVG preview group
- Distance-based confirm branch in `handleClick`

---

## Test Scenarios

### Replaced Scenarios

#### Scenario: CHG-BTN-001 — Confirm button appears when preview is active
- **GIVEN** HoleView with game in progress
- **WHEN** the user taps on the course (setting a preview)
- **THEN** a "Confirm" button appears on screen
- **SUPERSEDES:** BASE-TAP-002 (second tap confirms)

#### Scenario: CHG-BTN-002 — Clicking confirm button places the shot
- **GIVEN** a preview is active on the course
- **WHEN** the user clicks the "Confirm" button
- **THEN** the shot is placed at the preview location
- **AND** the stroke count increments
- **AND** the preview is cleared
- **AND** the confirm button disappears
- **SUPERSEDES:** BASE-TAP-002 (second tap confirms)

#### Scenario: CHG-BTN-003 — Tapping course always repositions preview
- **GIVEN** a preview is active on the course
- **WHEN** the user taps anywhere on the course (including near the preview)
- **THEN** the preview moves to the new tap location
- **AND** no shot is placed
- **SUPERSEDES:** BASE-TAP-002 (second tap within 30px confirms), BASE-TAP-003 (tap far moves preview)

### New Scenarios

#### Scenario: CHG-BTN-004 — Confirm button hidden when no preview
- **GIVEN** HoleView with no active preview
- **WHEN** HoleView renders
- **THEN** no "Confirm" button is visible

#### Scenario: CHG-BTN-005 — Confirm button hidden when hole is complete
- **GIVEN** the hole is complete
- **WHEN** HoleView renders
- **THEN** no "Confirm" button is visible (even if previewPoint state lingered)

#### Scenario: CHG-BTN-006 — "Tap to hit" hint removed from preview
- **GIVEN** a preview is active on the course
- **WHEN** HoleView renders
- **THEN** no "Tap to hit" text is displayed in the SVG

#### Scenario: CHG-BTN-007 — First tap still shows preview with distance
- **GIVEN** HoleView with game in progress and no active preview
- **WHEN** the user taps on the course
- **THEN** a preview crosshair appears at the tap point
- **AND** a distance label shows yards from ball to preview point
- **NOTE:** Validates BASE-TAP-001 is preserved

---

## Implementation Tasks

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 1 | Test: Confirm button appears when preview is active | CHG-BTN-001 | `HoleView.test.tsx` |
| 2 | Test: Clicking confirm button places the shot | CHG-BTN-002 | `HoleView.test.tsx` |
| 3 | Test: Tapping course always repositions preview (no 30px confirm) | CHG-BTN-003 | `HoleView.test.tsx` |
| 4 | Test: Confirm button hidden when no preview | CHG-BTN-004 | `HoleView.test.tsx` |
| 5 | Test: Confirm button hidden when hole is complete | CHG-BTN-005 | `HoleView.test.tsx` |
| 6 | Test: "Tap to hit" hint removed from preview | CHG-BTN-006 | `HoleView.test.tsx` |
| 7 | Test: First tap still shows preview with distance (regression) | CHG-BTN-007 | `HoleView.test.tsx` |
| 8 | Implement: Add SVG confirm button, remove threshold logic, remove hint | CHG-BTN-001–006 | `HoleView.tsx` |
| 9 | Update baseline spec to reflect new interaction model | — | `openspec/specs/hole-view/spec.md` |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Button overlaps score card on completion | Visual clash | Button is hidden when `isComplete` (CHG-BTN-005) |
| SVG button click propagates to SVG course click handler | Double action (places shot + moves preview) | Use `e.stopPropagation()` on the button group's click handler |
| Existing tests assert tap-to-confirm behavior | Test failures | Replace those tests in tasks 1–6 before changing production code (TDD) |
| Mobile touch target too small | Usability regression | Use minimum 44×44px touch target per WCAG 2.5.5 |

---

## Acceptance Criteria

- [ ] Tapping on the course NEVER directly places a shot — only sets/moves preview
- [ ] "Confirm" button appears in bottom-right when preview is active
- [ ] Clicking "Confirm" places the shot and clears the preview
- [ ] "Confirm" button is hidden when no preview is active
- [ ] "Confirm" button is hidden when hole is complete
- [ ] "Tap to hit" hint text is no longer rendered
- [ ] First tap preview (crosshair + distance) still works correctly
- [ ] All tests pass (`npx vitest run`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Baseline spec updated to reflect button-based confirmation
