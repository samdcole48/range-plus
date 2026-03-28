# Mobile Viewport Fit — HUD Score Swap & Putt Info

> **Status:** DRAFT
> **Author:** Copilot (with human direction)
> **Created:** 2026-03-28
> **Constitutional Authority:** ENG-5.1 (Change Proposal), ENG-4.4 (Baseline First)
> **Affected Files:** `src/components/HoleView.tsx`, `src/components/HoleView.test.tsx`, `src/index.css`, `src/domain/types.ts`, `src/domain/game.ts`, `src/domain/game.test.ts`

---

## Problem Statement

On mobile devices, the current layout requires scrolling to see the full UI. The vertical stack of **header → HUD → SVG course (400×600) → score card → Next Hole button** exceeds the viewport height of typical phones (667–844px logical). After completing a hole, the score card and "Next Hole" button render *below* the SVG, forcing the player to scroll down. They cannot see the shot tracer and hole layout while reading their score. This breaks the flow of a quick, tap-based game.

Additionally, the score card does not indicate whether the player 1-putted or 2-putted, even though this is a key piece of feedback — especially since putting is automatic and players want to know if their green approach was rewarded.

---

## Proposed Solution

### Minimal change: reuse the HUD for score display

Instead of adding overlays or restructuring the layout, **swap the HUD content when the hole is complete**:

- **During play:** HUD shows `Par | Strokes | To Pin` (current behavior, unchanged)
- **On completion:** HUD shows `Score Label | Strokes + Putts` (replaces the 3 HUD items)

The existing "New Hole" button in the app header (top-right) already allows the player to proceed — no button needs to move.

The `.score-card` div that currently renders below the SVG is **removed entirely**.

### Why this is better

- **Zero layout changes** — no `100dvh`, no overlay, no `overflow: hidden`, no flex restructuring
- **No scrolling** — score info appears in the HUD area (already visible)
- **Shot tracer stays visible** — no overlay covering the SVG
- **Fewest files touched** — only HoleView, its tests, game domain (for puttCount), and minor CSS

### Putt count display

The completed HUD explicitly states the putt count:
- `"1 Putt 🎯"` when the ball landed in the one-putt zone (≤15 feet)
- `"2 Putts"` when the ball landed outside the one-putt zone

This requires adding a `puttCount` field to `GameState` to make this explicit and testable rather than deriving it in the UI layer.

---

## Scope

### In Scope

1. **Add `puttCount` field to `GameState`** — explicit putt tracking in domain types (`src/domain/types.ts`)
2. **Set `puttCount` in `placeShot`** — when ball lands on green, set `puttCount` to 1 or 2 (`src/domain/game.ts`)
3. **Domain tests for `puttCount`** — verify putt count is set correctly in game state (`src/domain/game.test.ts`)
4. **HUD swap on completion** — when `isComplete`, render score label + stroke/putt info in the `.hud` div instead of Par/Strokes/To Pin (`src/components/HoleView.tsx`)
5. **Remove `.score-card`** — delete the score card div that renders below the SVG (`src/components/HoleView.tsx`)
6. **CSS: add `.hud-complete` styles** — styling for the completed-state HUD content (`src/index.css`)
7. **CSS: remove `.score-card` styles** — clean up unused styles (`src/index.css`)
8. **Component tests** — verify HUD swap behavior, putt count display, score card removal (`src/components/HoleView.test.tsx`)
9. **Update baseline spec** — add new scenarios and update existing ones (`openspec/specs/hole-view/spec.md`)

### Out of Scope

- Game logic changes beyond adding `puttCount` to state (scoring, physics unchanged)
- Layout restructuring (no `100dvh`, no overlay, no flex changes)
- Moving the "New Hole" button (stays in App header)
- Changes to `src/App.tsx`
- Hole data changes (`src/data/holes.ts`)
- Hole selection changes (`src/data/holeSelection.ts`)
- Desktop-specific layout optimizations
- Landscape orientation support
- Animation or transitions
- E2E tests

---

## Design Constraints

Per **Section 2.2** (Game State Immutability / ENG-3.5):
- `puttCount` is added as an immutable field on `GameState`; `placeShot` returns new state with it set

Per **ENG-3.4** (Method Length ≤50 lines):
- The HUD swap is a simple conditional within HoleView's existing render; no method length risk

Per **ENG-4.6** (Test Coverage):
- All new behavior (putt count, HUD swap, score card removal) must have test coverage ≥90%

Per **Section 2.1** (Coordinate System):
- SVG viewBox remains 400×600; no changes to rendering

---

## Detailed Design

### HUD Behavior (Before → After)

**During play (unchanged):**
```
┌──────────────────────────────────┐
│  Par: 4    Strokes: 2   Pin: 87y│  ← .hud (3 hud-items)
└──────────────────────────────────┘
```

**On hole completion (NEW):**
```
┌──────────────────────────────────┐
│    🎯 Birdie!   3 Strokes       │  ← .hud .hud-complete
│                  1 Putt 🎯       │
└──────────────────────────────────┘
```

The HUD retains the same container (`.hud`) but swaps its children based on `gameState.isComplete`.

### Full Layout (After — on completion)

```
┌──────────────────────────────────┐
│  ⛳ Range+              New Hole  │  app-header (unchanged)
├──────────────────────────────────┤
│  🎯 Birdie!     3 Strokes       │  hud (swapped content)
│                  1 Putt 🎯       │
├──────────────────────────────────┤
│                                  │
│         SVG Course               │  course SVG (unchanged, fully visible)
│         (400×600 viewBox)        │
│                                  │
│     ← shot tracer visible →      │
│                                  │
└──────────────────────────────────┘
                                      ← NO score-card below
```

### GameState Change

```typescript
export interface GameState {
  hole: HoleDefinition;
  ballPosition: Point;
  strokeCount: number;
  isComplete: boolean;
  shotHistory: Point[];
  landedInOnePuttZone: boolean;
  puttCount: number;  // NEW: 0 while playing, 1 or 2 when hole completes on green
}
```

### HUD Swap Markup (in HoleView)

```tsx
<div className="hud">
  {gameState.isComplete ? (
    <div className="hud-complete" data-testid="hud-complete">
      <div
        data-testid="score-label"
        className={`score-label ${getScoreCssClass(gameState.strokeCount, hole.par)}`}
      >
        {getScoreLabel(gameState.strokeCount, hole.par)}
      </div>
      <div className="hud-complete-details">
        <div data-testid="final-strokes" className="score-detail">
          {gameState.strokeCount} Strokes
        </div>
        <div data-testid="putt-count" className="putt-info">
          {gameState.puttCount === 1 ? '1 Putt 🎯' : '2 Putts'}
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="hud-item">
        <span className="hud-label">Par</span>
        <span className="hud-value">{hole.par}</span>
      </div>
      <div className="hud-item">
        <span className="hud-label">Strokes</span>
        <span className="hud-value" data-testid="stroke-count">{gameState.strokeCount}</span>
      </div>
      <div className="hud-item">
        <span className="hud-label">To Pin</span>
        <span className="hud-value">{distanceToPin} yds</span>
      </div>
    </>
  )}
</div>
```

### CSS Changes

```css
/* NEW: completed-state HUD layout */
.hud-complete {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.hud-complete-details {
  text-align: right;
}

.putt-info {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 2px;
}

/* REMOVED: .score-card, .score-detail (no longer used) */
```

The existing `.score-label`, `.score-label.eagle`, `.score-label.birdie`, etc. classes are **kept** — they're reused inside the HUD-complete state with a smaller font size applied via `.hud-complete .score-label`.

```css
.hud-complete .score-label {
  font-size: 22px;  /* smaller than the old 32px score-card label */
}
```

---

## Test Scenarios

### Domain: Putt Count

#### Scenario: CHG-MVF-001 — Initial game state has puttCount 0
- **GIVEN** a new game state via `createGameState(hole)`
- **WHEN** `puttCount` is checked
- **THEN** it is `0`

#### Scenario: CHG-MVF-002 — Landing in one-putt zone sets puttCount to 1
- **GIVEN** a game in progress
- **WHEN** a shot lands on the green within 15 feet of the pin
- **THEN** `puttCount` is `1`

#### Scenario: CHG-MVF-003 — Landing outside one-putt zone sets puttCount to 2
- **GIVEN** a game in progress
- **WHEN** a shot lands on the green more than 15 feet from the pin
- **THEN** `puttCount` is `2`

#### Scenario: CHG-MVF-004 — puttCount remains 0 for non-green shots
- **GIVEN** a game in progress
- **WHEN** a shot lands on the fairway (not on green)
- **THEN** `puttCount` remains `0`

#### Scenario: CHG-MVF-005 — puttCount remains 0 for water hazard shots
- **GIVEN** a game in progress
- **WHEN** a shot lands in a water hazard
- **THEN** `puttCount` remains `0`

### Presentation: HUD Score Swap

#### Scenario: CHG-MVF-010 — HUD shows score on hole completion
- **GIVEN** the hole is complete
- **WHEN** HoleView renders
- **THEN** the `.hud` contains a `[data-testid="hud-complete"]` element
- **AND** the score label is visible within the HUD
- **AND** the Par/Strokes/To Pin items are NOT rendered

#### Scenario: CHG-MVF-011 — HUD completion shows putt count (1 putt)
- **GIVEN** the hole is complete with puttCount 1
- **WHEN** the HUD renders
- **THEN** text "1 Putt 🎯" is displayed within the HUD

#### Scenario: CHG-MVF-012 — HUD completion shows putt count (2 putts)
- **GIVEN** the hole is complete with puttCount 2
- **WHEN** the HUD renders
- **THEN** text "2 Putts" is displayed within the HUD

#### Scenario: CHG-MVF-013 — Score card below SVG is removed
- **GIVEN** the hole is complete
- **WHEN** HoleView renders
- **THEN** no `[data-testid="score-card"]` element exists in the DOM

#### Scenario: CHG-MVF-014 — HUD shows normal items during play
- **GIVEN** the hole is in progress (not complete)
- **WHEN** HoleView renders
- **THEN** the HUD shows Par, Strokes, and To Pin
- **AND** no `[data-testid="hud-complete"]` element exists

#### Scenario: CHG-MVF-015 — HUD completion shows stroke count
- **GIVEN** the hole is complete with 3 strokes
- **WHEN** the HUD renders
- **THEN** text "3 Strokes" is displayed within the HUD

---

## Implementation Tasks

| # | Task | Scenario ID | File(s) |
|---|------|-------------|---------|
| 1 | Add `puttCount: number` to `GameState` interface | CHG-MVF-001 | `types.ts` |
| 2 | Test: initial game state has `puttCount` 0 | CHG-MVF-001 | `game.test.ts` |
| 3 | Set `puttCount: 0` in `createGameState` | CHG-MVF-001 | `game.ts` |
| 4 | Test: one-putt zone landing sets `puttCount` to 1 | CHG-MVF-002 | `game.test.ts` |
| 5 | Set `puttCount` in `placeShot` green-landing path | CHG-MVF-002 | `game.ts` |
| 6 | Test: outside one-putt zone sets `puttCount` to 2 | CHG-MVF-003 | `game.test.ts` |
| 7 | Test: fairway shot keeps `puttCount` 0 | CHG-MVF-004 | `game.test.ts` |
| 8 | Test: water hazard shot keeps `puttCount` 0 | CHG-MVF-005 | `game.test.ts` |
| 9 | Test: HUD shows score on completion | CHG-MVF-010 | `HoleView.test.tsx` |
| 10 | Swap HUD content on completion in HoleView | CHG-MVF-010 | `HoleView.tsx` |
| 11 | Test: putt count "1 Putt 🎯" displayed in HUD | CHG-MVF-011 | `HoleView.test.tsx` |
| 12 | Test: putt count "2 Putts" displayed in HUD | CHG-MVF-012 | `HoleView.test.tsx` |
| 13 | Test: no score-card element exists | CHG-MVF-013 | `HoleView.test.tsx` |
| 14 | Remove score-card div from HoleView | CHG-MVF-013 | `HoleView.tsx` |
| 15 | Test: HUD shows normal items during play | CHG-MVF-014 | `HoleView.test.tsx` |
| 16 | Test: stroke count displayed in HUD | CHG-MVF-015 | `HoleView.test.tsx` |
| 17 | CSS: add `.hud-complete` styles, remove `.score-card` styles | CHG-MVF-010 | `index.css` |
| 18 | Remove "Next Hole →" button from score-card (already removed with card) | CHG-MVF-013 | `HoleView.tsx` |
| 19 | Update baseline spec with new/superseded scenarios | — | `openspec/specs/hole-view/spec.md` |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Existing HoleView tests break when score-card DOM is removed | CI failure | Update test selectors from `[data-testid="score-card"]` to `[data-testid="hud-complete"]` |
| `puttCount` field breaks existing test assertions for GameState | CI failure | Update affected test assertions in same TDD cycle |
| Score label text may be too long for HUD width on small screens | Truncated text | Use `text-overflow: ellipsis` or reduce font size in `.hud-complete .score-label` |

---

## Acceptance Criteria

- [ ] On hole completion, HUD swaps from Par/Strokes/To Pin to Score Label + Strokes + Putt count
- [ ] During play, HUD displays Par/Strokes/To Pin as before (unchanged)
- [ ] No `.score-card` element rendered below the SVG
- [ ] HUD shows "1 Putt 🎯" or "2 Putts" explicitly
- [ ] "New Hole" button remains in the app header (top-right, unchanged)
- [ ] `GameState.puttCount` is set correctly (0 while playing, 1 or 2 on completion)
- [ ] SVG course remains fully visible on completion (no overlay)
- [ ] All tests pass (`npx vitest run`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
