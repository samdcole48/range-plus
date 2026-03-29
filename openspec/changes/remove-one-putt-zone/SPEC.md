# Remove One-Putt Zone

> **Status:** IN PROGRESS
> **Type:** Simplification / MVP
> **Priority:** High
> **Requested by:** Product Owner

---

## Problem Statement

From in-person testing, the 1-putt vs 2-putt zone mechanic (≤15 feet from pin = 1 putt, >15 feet = 2 putts) does not provide a good user experience. The distinction feels unnecessary for the MVP.

## Proposed Change

Remove the one-putt zone mechanic entirely. All shots landing on the green now always result in 2 automatic putts, regardless of distance to the pin.

### What Changes

| Area | Current Behavior | New Behavior |
|------|-----------------|--------------|
| Green landing (close to pin) | 1 putt | 2 putts |
| Green landing (far from pin) | 2 putts | 2 putts (unchanged) |
| One-putt radius SVG circle | Displayed around pin | Removed |
| HUD putt display | "1 Putt 🎯" or "2 Putts" | Always "2 Putts" |
| `landedInOnePuttZone` state | true/false based on distance | Removed from GameState |
| `ONE_PUTT_THRESHOLD_FEET` constant | 15 | Removed |
| Landing zone highlight | Circle (close) vs polygon (far) | Always green polygon |

### What Does NOT Change

- Water hazard penalty mechanics
- Score calculation (Eagle, Birdie, Par, etc.)
- Shot placement tap-to-preview system
- Distance display
- Shot tracer visualization

## Scenarios

### REMOVE-1PUTT-01: Green landing always adds 2 putts
**Given** a player lands their shot on the green
**When** the shot is confirmed at ANY position on the green
**Then** 2 putts are automatically added to stroke count

### REMOVE-1PUTT-02: No one-putt radius visual on course
**Given** the hole is rendered
**Then** no one-putt radius circle is displayed around the pin

### REMOVE-1PUTT-03: HUD always shows "2 Putts"
**Given** a player completes a hole by landing on the green
**Then** the HUD displays "2 Putts" regardless of where on the green they landed

### REMOVE-1PUTT-04: Remove landedInOnePuttZone from state
**Given** a game state is created or updated
**Then** the `landedInOnePuttZone` field does not exist on GameState

### REMOVE-1PUTT-05: Landing zone always shows green polygon
**Given** a player completes a hole by landing on the green
**Then** the landing zone highlight always shows the green boundary polygon (never a circle)

## Constitutional References

- **ENG-4.1**: Atomic TDD — each scenario tested individually
- **ENG-2.3**: Scope restriction — only touch files related to one-putt zone removal
- **ENG-3.5**: Immutability — maintain pure function state transitions
