# Range+ Architecture

## Project Overview

Range+ is a mobile web app that simulates playing golf holes at a driving range. Players tap on an SVG course rendering to hit shots, with realistic scoring including auto-putt, water penalties, and shot tracing.

- **Frontend-only** — no backend, no API calls
- **Built with** React + TypeScript + Vite
- **Test suite** — 60 tests (Vitest + @testing-library/react)
- **Target device** — mobile phones (portrait orientation)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18+ with TypeScript |
| Build / Dev | Vite |
| Testing | Vitest with jsdom environment |
| Component Tests | @testing-library/react |
| State Management | None — `useState` only |
| Routing | None — single-page app |
| PWA | Meta tags configured for Add to Home Screen |

No external state management libraries, CSS frameworks, or routing libraries are used. The app is intentionally minimal in its dependency footprint.

## Code Structure

```
src/
├── domain/          # Pure domain logic (zero dependencies)
│   ├── types.ts     # All type definitions (Point, Polygon, HoleDefinition, GameState, etc.)
│   ├── game.ts      # Core game logic (distance calc, point-in-polygon, shot placement)
│   └── game.test.ts # 28 unit tests for domain logic
├── data/            # Static data
│   ├── holes.ts     # 12 preset hole definitions with full design data
│   ├── holeSelection.ts  # getRandomHole() with exclude-current logic
│   └── holes.test.ts     # 5 data tests
├── components/      # React components
│   ├── HoleView.tsx      # Main game component (SVG course + HUD + score card)
│   ├── HoleView.test.tsx  # 23 integration tests
│   └── App.test.tsx       # 4 app-level tests
├── App.tsx          # App shell (hole state, New Hole button)
├── index.css        # Dark theme mobile-first styles
├── main.tsx         # Entry point
└── test/
    └── setup.ts     # Vitest setup (jest-dom matchers)
```

### Separation of Concerns

- **`src/domain/`** — Pure TypeScript. No React imports. All game logic and types live here. This layer is fully testable without any DOM or component infrastructure.
- **`src/data/`** — Static hole definitions and selection logic. Depends only on domain types.
- **`src/components/`** — React components that compose domain logic with SVG rendering. Thin wrappers over domain functions.
- **`src/App.tsx`** — Minimal shell managing which hole is active.

## Coordinate System

The entire course is rendered in a single SVG element.

- **viewBox**: `0,0` to `400,600`
- **Y increases DOWNWARD** (standard SVG convention)
- **Tee positions**: near the bottom of the canvas (y ≈ 460–570)
- **Pin/green positions**: near the top of the canvas (y ≈ 40–170)
- **Scale**: calculated per-hole as `pixelsPerYard = teeToPin_pixels / hole.yardsLength`

This means a shot "up the fairway" toward the pin moves the ball to a **lower** y value.

## Key Algorithms

### Point-in-Polygon

`isPointInPolygon()` uses the **ray-casting algorithm** — cast a horizontal ray from the test point and count how many polygon edges it crosses. An odd count means the point is inside.

Used for:
- Detecting if the ball landed on the green
- Detecting if the ball landed in a water hazard

### Distance Calculation

`calculateDistanceYards()` converts pixel distance between two points to yards:
1. Compute Euclidean distance in pixels
2. Divide by `pixelsPerYard` (derived from the hole's known tee-to-pin distance)

### Auto-Putt

When the ball lands on the green:
- Within **15 feet** (`ONE_PUTT_THRESHOLD_FEET`) of the pin → **1 putt**
- Beyond 15 feet → **2 putts**

The hole is marked complete immediately — no manual putting.

### Water Penalty

When the ball lands in a water hazard:
- **1 penalty stroke** is added
- The ball is placed at the hazard's designated `dropZone` position
- Play continues from the drop zone

## Game Flow

1. **Tap anywhere** → shows a preview (crosshair + distance label from current ball position)
2. **Tap the same spot** → confirms the shot (ball moves to that position)
3. **Tap elsewhere** → moves the preview to the new location
4. **Ball lands on green** → auto-putt fires → hole is complete
5. **Ball lands in water** → penalty applied → ball placed at drop zone
6. **After completion** → shot tracer overlay appears + score card displays

## Rendering Architecture

The SVG course is rendered in strict layer order (back to front). This ordering is critical for correct visual appearance:

1. **Rough background** — gradient fill + texture patches
2. **Fairway** — stripe pattern + fringe border
3. **Sand bunkers** — gradient fill
4. **Water hazards** — gradient + shimmer SVG filter + ripple animation
5. **Green** — radial gradient + collar border + shadow
6. **Trees** — canopy circles + highlight + trunk shadow
7. **Tee box** — platform rectangle + tee markers
8. **Pin flag** — cup circle + stick line + flag polygon
9. **1-putt radius circle** — shows the auto-putt threshold
10. **Shot preview** — crosshair + distance label (during aiming)
11. **Shot tracer** — lines + dots connecting all shots (post-completion)
12. **Ball** — white circle + shine highlight
13. **Hole info label** — hole name, par, yardage

## Type System

### Core Geometry

```typescript
type Point = { x: number; y: number }
type Polygon = Point[]
```

### Hazards and Decorations

```typescript
type WaterHazard = {
  boundary: Polygon
  dropZone: Point
}

type TreeCluster = {
  position: Point
  radius: number
}

type Bunker = {
  boundary: Polygon
}
```

### Hole Definition

```typescript
type HoleDefinition = {
  id: number
  name: string
  par: number
  yardsLength: number
  teePosition: Point
  pinPosition: Point
  greenBoundary: Polygon
  fairwayBoundary: Polygon
  bunkers: Bunker[]
  waterHazards: WaterHazard[]
  trees: TreeCluster[]
}
```

### Game State

```typescript
type GameState = {
  hole: HoleDefinition
  ballPosition: Point
  strokeCount: number
  isComplete: boolean
  shotHistory: Point[]
  landedInOnePuttZone: boolean
}
```

## Testing Strategy

### Test Distribution

| File | Tests | Scope |
|------|-------|-------|
| `game.test.ts` | 28 | Pure domain logic unit tests |
| `HoleView.test.tsx` | 23 | Component integration tests |
| `holes.test.ts` | 5 | Data validation / structural tests |
| `App.test.tsx` | 4 | App-level integration tests |
| **Total** | **60** | |

### Patterns

- **Domain tests** are pure unit tests — no DOM, no React. They test `calculateDistanceYards`, `isPointInPolygon`, `processShot`, etc.
- **Component tests** use `@testing-library/react` with `fireEvent` to simulate user taps on the SVG.
- **Data tests** validate structural invariants of hole definitions (e.g., every hole has a green, every water hazard has a drop zone).
- **`tapToPlace(svg, x, y)` helper** fires two clicks at the same coordinates (first = preview, second = confirm) for test ergonomics.

### JSDOM Quirk

In JSDOM, `e.currentTarget` can be `null` in synthetic events dispatched by testing utilities. The click handler in `HoleView.tsx` includes a null guard for this case. Do not remove it — tests will break.

## Development Methodology

- Follows the **personal-ai-constitution** at `/Users/967506/personalWorkspace/personal-ai-constitution/`
- **Atomic TDD**: RED → GREEN → REFACTOR — no production code without a failing test first
- **Vertical slice development** — each feature is delivered as a complete slice through all layers
- **Constitutional governance** — scope changes require proposals reviewed against the constitution
