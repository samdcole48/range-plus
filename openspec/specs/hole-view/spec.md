# HoleView Component — Baseline Specification

> **Status:** BASELINE (Adoption Snapshot)
> **Captured:** 2026-03-28
> **Purpose:** Document existing behavior BEFORE any changes (per ENG-4.4)
> **Source File:** `src/components/HoleView.tsx`

---

## Rendering

### Requirement: Render the SVG golf course canvas

#### Scenario: BASE-RENDER-001 — SVG canvas is rendered
- **GIVEN** a valid `HoleDefinition` is passed as prop
- **WHEN** HoleView mounts
- **THEN** an SVG element with the course visualization is rendered

#### Scenario: BASE-RENDER-002 — Par is displayed
- **GIVEN** a hole with a specific par value
- **WHEN** HoleView renders
- **THEN** the par value is displayed in the HUD

#### Scenario: BASE-RENDER-003 — Distance to green shown from tee on load
- **GIVEN** a hole with known yardage
- **WHEN** HoleView mounts (ball on tee)
- **THEN** the distance to the pin in yards is displayed

#### Scenario: BASE-RENDER-004 — Ball marker shown on tee initially
- **GIVEN** a new game state
- **WHEN** HoleView renders
- **THEN** the ball marker is positioned at the tee position

#### Scenario: BASE-RENDER-005 — Water hazards rendered on course
- **GIVEN** a hole with water hazards
- **WHEN** HoleView renders
- **THEN** water hazard areas are visually displayed on the SVG

#### Scenario: BASE-RENDER-006 — One-putt radius circle rendered around pin
- **GIVEN** a valid hole
- **WHEN** HoleView renders
- **THEN** a dashed circle indicating the 1-putt radius is drawn around the pin

---

## Stroke Counter

### Requirement: Display and track stroke count

#### Scenario: BASE-STROKE-001 — Stroke count starts at 0
- **GIVEN** a new game state
- **WHEN** HoleView renders
- **THEN** stroke count displays `0`

#### Scenario: BASE-STROKE-002 — Stroke count shows 1 after first shot
- **GIVEN** HoleView with initial state
- **WHEN** the user places one shot (not on green, not in water)
- **THEN** stroke count displays `1`

#### Scenario: BASE-STROKE-003 — Stroke count increments on each shot
- **GIVEN** HoleView with N shots placed
- **WHEN** the user places another shot
- **THEN** stroke count displays `N + 1`

#### Scenario: BASE-STROKE-004 — Stroke label displayed alongside count
- **GIVEN** HoleView rendering
- **WHEN** stroke count is visible
- **THEN** a "Strokes" label appears alongside the number

---

## Shot Placement Interaction

### Requirement: Preview then explicit confirm shot placement

#### Scenario: BASE-TAP-001 — First tap shows shot preview with distance
- **GIVEN** HoleView with game in progress
- **WHEN** the user taps on the course
- **THEN** a preview crosshair appears at the tap point
- **AND** a distance label shows yards from ball to preview point

#### Scenario: BASE-TAP-002 — Confirm button appears when preview is active
- **GIVEN** a preview is active on the course
- **WHEN** HoleView renders
- **THEN** a "Confirm" button is displayed in the bottom-right of the course
- **AND** the button is the sole way to confirm a shot

#### Scenario: BASE-TAP-003 — Clicking Confirm button places the shot
- **GIVEN** a preview is active on the course
- **WHEN** the user clicks the "Confirm" button
- **THEN** the shot is placed at the preview location
- **AND** the stroke count increments
- **AND** the preview and Confirm button both disappear

#### Scenario: BASE-TAP-004 — Any tap repositions the preview
- **GIVEN** a preview is active at any position
- **WHEN** the user taps anywhere on the course
- **THEN** the preview moves to the new tap location
- **AND** no shot is placed

#### Scenario: BASE-TAP-005 — Confirm button hidden when no preview
- **GIVEN** HoleView with no active preview
- **WHEN** HoleView renders
- **THEN** no "Confirm" button is visible

#### Scenario: BASE-TAP-006 — Confirm button hidden when hole is complete
- **GIVEN** the hole is complete
- **WHEN** HoleView renders
- **THEN** no "Confirm" button is visible

#### Scenario: BASE-TAP-007 — No "Tap to hit" hint in SVG
- **GIVEN** a preview is active on the course
- **WHEN** HoleView renders
- **THEN** no "Tap to hit" text is displayed in the SVG

---

## Shot Completion & Scoring

### Requirement: Display score in HUD when hole is complete

> **Note:** As of CHG-MVF-010/013, the score-card below the SVG has been replaced by an in-HUD score display.

#### Scenario: BASE-COMPLETE-001 — Score shown in HUD on green landing
- **GIVEN** the ball lands on the green (hole completes)
- **WHEN** the game state transitions to complete
- **THEN** the HUD swaps to show the score (hud-complete state)
- **SUPERSEDED BY:** CHG-MVF-010

#### Scenario: BASE-COMPLETE-002 — Score label displayed in HUD
- **GIVEN** the hole is complete
- **WHEN** the HUD renders in completion state
- **THEN** the score label (Birdie, Par, Bogey, etc.) is displayed

#### Scenario: BASE-COMPLETE-003 — Final stroke total in HUD
- **GIVEN** the hole is complete
- **WHEN** the HUD renders in completion state
- **THEN** the final stroke count is displayed

#### Scenario: BASE-COMPLETE-004 — No further shots after completion
- **GIVEN** the hole is complete
- **WHEN** the user taps on the course
- **THEN** no shot is placed and state remains unchanged

#### Scenario: BASE-COMPLETE-005 — Putt count displayed on completion
- **GIVEN** the hole is complete
- **WHEN** the HUD renders in completion state
- **THEN** "1 Putt 🎯" or "2 Putts" is displayed
- **ADDED BY:** CHG-MVF-011, CHG-MVF-012

#### Scenario: BASE-COMPLETE-006 — Normal HUD items shown during play
- **GIVEN** the hole is in progress
- **WHEN** HoleView renders
- **THEN** the HUD shows Par, Strokes, and To Pin (not score)
- **ADDED BY:** CHG-MVF-014

---

## Shot Tracer

### Requirement: Display shot tracer after hole completion

#### Scenario: BASE-TRACER-001 — Shot tracer lines drawn after completion
- **GIVEN** the hole is complete with shot history
- **WHEN** HoleView renders
- **THEN** tracer lines are drawn connecting all shot positions

#### Scenario: BASE-TRACER-002 — Green landing zone highlighted after completion
- **GIVEN** the hole is complete
- **WHEN** HoleView renders
- **THEN** the green landing zone is visually highlighted

#### Scenario: BASE-TRACER-003 — No tracer before hole is complete
- **GIVEN** the hole is in progress (not complete)
- **WHEN** HoleView renders
- **THEN** no shot tracer lines are displayed

---

## Yardage Update

### Requirement: Distance to pin updates after each shot

#### Scenario: BASE-YARD-001 — Yardage updates after shot is placed
- **GIVEN** a shot has been placed moving the ball
- **WHEN** HoleView re-renders
- **THEN** the distance to pin reflects the new ball position

---

## Water Hazard Interaction

### Requirement: Water hazard penalty reflected in UI

#### Scenario: BASE-WATER-001 — Water hazard applies penalty and moves ball
- **GIVEN** the user places a shot landing in a water hazard
- **WHEN** the shot is processed
- **THEN** the ball moves to the drop zone
- **AND** the stroke count reflects the penalty

---

## Known Quirks / Potential Issues (Document Only)

| ID | Observation | Potential Issue |
|----|-------------|-----------------|
| QUIRK-HV-001 | HoleView.tsx is ~550 lines | Violates ENG-3.4 (≤50 lines per method); needs decomposition |
| QUIRK-HV-003 | No keyboard accessibility for shot placement | Only mouse/touch interaction supported |
