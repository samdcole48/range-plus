# Tasks — Replace Tap-to-Confirm with Confirm Button

> **Spec:** `openspec/changes/replace-tap-confirm-button/SPEC.md`
> **Branch:** `feature/replace-tap-confirm-button`

---

## Progress: 7/9 complete

---

## Tasks

- [x] **Task 1** — Test: Confirm button appears when preview is active (CHG-BTN-001) ✓
- [x] **Task 2** — Test: Clicking confirm button places the shot (CHG-BTN-002) ✓
- [x] **Task 3** — Test: Tapping course always repositions preview (CHG-BTN-003) ✓
- [x] **Task 4** — Test: Confirm button hidden when no preview (CHG-BTN-004) ✓
- [x] **Task 5** — Test: Confirm button hidden when hole is complete (CHG-BTN-005) ✓
- [x] **Task 6** — Test: "Tap to hit" hint removed from preview (CHG-BTN-006) ✓
- [x] **Task 7** — Test: First tap still shows preview with distance (CHG-BTN-007) ✓
  - File: `src/components/HoleView.test.tsx`
  - Write test: tap course → assert "Confirm" button is rendered

- [ ] **Task 2** — Test: Clicking confirm button places the shot (CHG-BTN-002)
  - File: `src/components/HoleView.test.tsx`
  - Write test: set preview → click "Confirm" → assert stroke increments, preview clears, button disappears

- [ ] **Task 3** — Test: Tapping course always repositions preview (CHG-BTN-003)
  - File: `src/components/HoleView.test.tsx`
  - Write test: set preview → tap near preview (within 30px) → assert preview moves, shot NOT placed
  - This replaces the old "second tap confirms" behavior

- [ ] **Task 4** — Test: Confirm button hidden when no preview (CHG-BTN-004)
  - File: `src/components/HoleView.test.tsx`
  - Write test: on initial render → assert no "Confirm" button exists

- [ ] **Task 5** — Test: Confirm button hidden when hole is complete (CHG-BTN-005)
  - File: `src/components/HoleView.test.tsx`
  - Write test: complete a hole → assert no "Confirm" button exists

- [ ] **Task 6** — Test: "Tap to hit" hint removed from preview (CHG-BTN-006)
  - File: `src/components/HoleView.test.tsx`
  - Write test: set preview → assert no "Tap to hit" text in document

- [ ] **Task 7** — Test: First tap still shows preview with distance (CHG-BTN-007)
  - File: `src/components/HoleView.test.tsx`
  - Write test: tap course → assert preview crosshair and distance label rendered
  - Regression test to ensure BASE-TAP-001 is preserved

- [ ] **Task 8** — Implement: Add SVG confirm button, remove threshold logic, remove hint (CHG-BTN-001–006)
  - File: `src/components/HoleView.tsx`
  - Remove `CONFIRM_THRESHOLD_PX` and 30px confirm branch from `handleClick`
  - Add "Confirm" button as SVG elements (rect + text) in bottom-right of 400×600 viewBox
  - Visible when `previewPoint && !isComplete`, with `e.stopPropagation()` on click
  - Wire button `onClick` to `placeShot()` + clear preview
  - Remove "Tap to hit" `<text>` from SVG preview group

- [ ] **Task 9** — Update baseline spec to reflect new interaction model
  - File: `openspec/specs/hole-view/spec.md`
  - Replace BASE-TAP-002 and BASE-TAP-003 with new button-based scenarios
