# Game Logic — Baseline Specification

> **Status:** BASELINE (Adoption Snapshot)
> **Captured:** 2026-03-28
> **Purpose:** Document existing behavior BEFORE any changes (per ENG-4.4)
> **Source Files:** `src/domain/game.ts`, `src/domain/types.ts`

---

## Distance Calculation

### Requirement: Calculate yardage between two points on the course

> The distance calculation scales pixel distance to real-world yards using the
> hole's tee-to-pin distance as a reference. This documents the CURRENT behavior.

#### Scenario: BASE-DIST-001 — Tee to pin returns full hole yardage
- **GIVEN** a hole with a declared `yardsLength`
- **WHEN** `calculateDistanceYards` is called from tee position to pin position
- **THEN** the result equals the hole's `yardsLength`

#### Scenario: BASE-DIST-002 — Same point returns zero
- **GIVEN** any point on the course
- **WHEN** `calculateDistanceYards` is called from that point to itself (pin to pin)
- **THEN** the result is `0`

#### Scenario: BASE-DIST-003 — Midpoint returns proportional distance
- **GIVEN** a point exactly halfway between tee and pin
- **WHEN** `calculateDistanceYards` is called from that point to the pin
- **THEN** the result is approximately half the hole's `yardsLength`

---

## Point-in-Polygon Detection

### Requirement: Determine if a point lies within a polygon boundary

> Uses ray-casting algorithm for collision detection (green, fairway, hazards).

#### Scenario: BASE-PIP-001 — Point inside polygon returns true
- **GIVEN** a polygon defining a closed shape
- **AND** a point clearly inside that shape
- **WHEN** `isPointInPolygon` is called
- **THEN** the result is `true`

#### Scenario: BASE-PIP-002 — Point outside polygon returns false
- **GIVEN** a polygon defining a closed shape
- **AND** a point clearly outside that shape
- **WHEN** `isPointInPolygon` is called
- **THEN** the result is `false`

#### Scenario: BASE-PIP-003 — Point on edge returns true
- **GIVEN** a polygon defining a closed shape
- **AND** a point on the edge of that shape
- **WHEN** `isPointInPolygon` is called
- **THEN** the result is `true`

---

## Score Label Calculation

### Requirement: Return a human-readable label for the score relative to par

#### Scenario: BASE-SCORE-001 — Hole in One on any par
- **GIVEN** `strokes` is `1`
- **WHEN** `getScoreLabel` is called with any `par` value
- **THEN** the result is `"Hole in One"`

#### Scenario: BASE-SCORE-002 — Eagle (2 under par)
- **GIVEN** `strokes` is `par - 2`
- **WHEN** `getScoreLabel` is called
- **THEN** the result is `"Eagle"`

#### Scenario: BASE-SCORE-003 — Birdie (1 under par)
- **GIVEN** `strokes` is `par - 1`
- **WHEN** `getScoreLabel` is called
- **THEN** the result is `"Birdie"`

#### Scenario: BASE-SCORE-004 — Par (even)
- **GIVEN** `strokes` equals `par`
- **WHEN** `getScoreLabel` is called
- **THEN** the result is `"Par"`

#### Scenario: BASE-SCORE-005 — Bogey (1 over par)
- **GIVEN** `strokes` is `par + 1`
- **WHEN** `getScoreLabel` is called
- **THEN** the result is `"Bogey"`

#### Scenario: BASE-SCORE-006 — Double Bogey (2 over par)
- **GIVEN** `strokes` is `par + 2`
- **WHEN** `getScoreLabel` is called
- **THEN** the result is `"Double Bogey"`

#### Scenario: BASE-SCORE-007 — Triple Bogey (3 over par)
- **GIVEN** `strokes` is `par + 3`
- **WHEN** `getScoreLabel` is called
- **THEN** the result is `"Triple Bogey"`

#### Scenario: BASE-SCORE-008 — +N for more than 3 over
- **GIVEN** `strokes` is more than `par + 3`
- **WHEN** `getScoreLabel` is called
- **THEN** the result is `"+N"` where N is strokes minus par

---

## Game State Initialization

### Requirement: Create a fresh game state for a hole

#### Scenario: BASE-INIT-001 — Initial state has ball on tee
- **GIVEN** a valid `HoleDefinition`
- **WHEN** `createGameState` is called
- **THEN** `ballPosition` equals the hole's `teePosition`
- **AND** `strokeCount` is `0`
- **AND** `isComplete` is `false`
- **AND** `shotHistory` is empty
- **AND** `landedInOnePuttZone` is `false`

---

## Active Pin Position

### Requirement: Each game round selects and holds a stable active pin position

> Per **CHG-GREEN-012–015** from `openspec/changes/redesign-greens/SPEC.md`.
>
> `GameState.activePinPosition: Point` is set once at game creation by randomly selecting
> from `hole.pinPositions`. It does not change during play. All distance calculations and
> auto-putt ball placement use `activePinPosition`, NOT `hole.pinPosition`.

#### Scenario: CHG-GREEN-012 — createGameState sets activePinPosition from pinPositions
- **GIVEN** a `HoleDefinition` with `pinPositions` containing 3+ entries
- **WHEN** `createGameState` is called
- **THEN** `activePinPosition` is one of the entries in `hole.pinPositions`

#### Scenario: CHG-GREEN-013 — Distance calculation uses activePinPosition
- **GIVEN** a `GameState` with `activePinPosition` set
- **WHEN** `calculateDistanceYards` is called from tee to `activePinPosition`
- **THEN** the result is > 0 and reflects the distance to the active pin

#### Scenario: CHG-GREEN-014 — Shot to green uses activePinPosition for auto-putt
- **GIVEN** a `GameState` with `activePinPosition` at a specific location
- **WHEN** `placeShot` lands on the green
- **THEN** `ballPosition` moves to `activePinPosition` (not `hole.pinPosition`)
- **AND** the last entry of `shotHistory` equals `activePinPosition`

#### Scenario: CHG-GREEN-015 — activePinPosition does not change mid-hole
- **GIVEN** a `GameState` initialized with an `activePinPosition`
- **WHEN** multiple `placeShot` calls are made
- **THEN** `activePinPosition` remains the same value throughout (immutability per ENG-3.5)

---

## Shot Placement

### Requirement: Process a shot and return updated game state

> Core game loop function. Immutable — returns new state, never mutates input.

#### Scenario: BASE-SHOT-001 — Ball moves to target position
- **GIVEN** a game state with ball at any position
- **WHEN** `placeShot` is called with a target point (not on green, not in water)
- **THEN** `ballPosition` updates to the target point

#### Scenario: BASE-SHOT-002 — Stroke count increments by 1
- **GIVEN** a game state with `strokeCount` N
- **WHEN** `placeShot` is called with a valid target
- **THEN** `strokeCount` is `N + 1`

#### Scenario: BASE-SHOT-003 — Original state is not mutated
- **GIVEN** a game state
- **WHEN** `placeShot` is called
- **THEN** the original state object is unchanged (immutability)

#### Scenario: BASE-SHOT-004 — Shot positions recorded in history
- **GIVEN** a game state
- **WHEN** `placeShot` is called
- **THEN** `shotHistory` contains the new position

#### Scenario: BASE-SHOT-005 — Green landing and pin recorded in history on completion
- **GIVEN** a game state with ball not on green
- **WHEN** `placeShot` is called with a target on the green
- **THEN** `shotHistory` includes both the green landing point and the pin position

#### Scenario: BASE-SHOT-006 — One-putt zone flag set when close to pin
- **GIVEN** a game state
- **WHEN** `placeShot` lands on the green within 15 feet of the pin
- **THEN** `landedInOnePuttZone` is `true`

#### Scenario: BASE-SHOT-007 — One-putt zone flag false when far from pin
- **GIVEN** a game state
- **WHEN** `placeShot` lands on the green but more than 15 feet from the pin
- **THEN** `landedInOnePuttZone` is `false`

#### Scenario: BASE-SHOT-008 — Drop zone recorded in history on water hazard
- **GIVEN** a game state
- **WHEN** `placeShot` lands in a water hazard
- **THEN** `shotHistory` includes the drop zone position

#### Scenario: BASE-SHOT-009 — Hole completes with 2-putt when far from pin
- **GIVEN** a game state with ball not on green
- **WHEN** `placeShot` lands on the green more than 15 feet from the pin
- **THEN** `isComplete` is `true`
- **AND** `strokeCount` includes the approach shot + 2 putts

#### Scenario: BASE-SHOT-010 — Hole completes with 1-putt when within 15 feet
- **GIVEN** a game state with ball not on green
- **WHEN** `placeShot` lands on the green within 15 feet of the pin
- **THEN** `isComplete` is `true`
- **AND** `strokeCount` includes the approach shot + 1 putt

#### Scenario: BASE-SHOT-011 — No shots allowed after hole is complete
- **GIVEN** a game state where `isComplete` is `true`
- **WHEN** `placeShot` is called
- **THEN** the state is returned unchanged

#### Scenario: BASE-SHOT-012 — Water hazard applies penalty and drops at drop zone
- **GIVEN** a game state with ball at any position
- **WHEN** `placeShot` lands in a water hazard
- **THEN** `ballPosition` moves to the hazard's `dropZone`
- **AND** `strokeCount` increments by 2 (shot + penalty)

#### Scenario: BASE-SHOT-013 — No penalty when shot misses water
- **GIVEN** a game state with ball at any position
- **WHEN** `placeShot` lands outside all water hazards
- **THEN** no penalty stroke is applied

---

## Constants

| Constant | Value | Purpose |
|----------|-------|---------|
| `ONE_PUTT_THRESHOLD_FEET` | `15` | Distance from pin (in feet) that qualifies for a 1-putt |

---

## Known Quirks / Potential Issues (Document Only)

> Per ENG-4.4: Document without fixing. Fix decisions come after safety net is complete.

| ID | Observation | Potential Issue |
|----|-------------|-----------------|
| QUIRK-001 | Water penalty is +1 penalty stroke (total +2 to strokeCount) | Confirm this matches standard golf rules |
| QUIRK-002 | No out-of-bounds detection — shots outside course area are allowed | May cause unexpected behavior at edge coordinates |
| QUIRK-003 | `isPointInPolygon` edge case behavior depends on ray-casting precision | Floating point edge cases possible |
