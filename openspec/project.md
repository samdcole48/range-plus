# Range+ — Project Context

> **Status:** ACTIVE
> **Type:** Client-side web application
> **Stack:** React 19 / TypeScript 5.9 / Vite 8

---

## Overview

Range+ is a golf hole simulator and scoring game built as a single-page web application. Players interact with SVG-based 2D golf course visualizations, place shots using a tap-to-preview mechanic, and receive real-time scoring feedback.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Presentation                    │
│  App.tsx → HoleView.tsx (SVG rendering + input)  │
├─────────────────────────────────────────────────┤
│                  Domain Logic                    │
│  game.ts (scoring, distance, collision, state)   │
│  types.ts (Point, Polygon, HoleDefinition, etc.) │
├─────────────────────────────────────────────────┤
│                  Data Layer                       │
│  holes.ts (12 hole definitions, Par-48 course)   │
│  holeSelection.ts (random selection logic)        │
└─────────────────────────────────────────────────┘
```

### Separation of Concerns
- **`src/domain/`** — Pure game logic with zero React/DOM dependencies. All functions are pure and testable in isolation.
- **`src/components/`** — React components handling SVG rendering, user interaction, and state display.
- **`src/data/`** — Static hole definitions and selection algorithms.

## Key Features

1. **Interactive Shot Placement** — Click to preview (shows crosshair + distance), click again to confirm
2. **Realistic Golf Physics** — Distance scaling, water hazard penalties (+2 strokes), green detection
3. **Automatic Putt Calculation** — ≤15 feet from pin = 1 putt; >15 feet = 2 putts
4. **Scoring System** — Hole in One, Eagle, Birdie, Par, Bogey, Double Bogey, Triple Bogey, +N
5. **12-Hole Course** — Par-48 course (3× Par-3, 6× Par-4, 3× Par-5) with random selection
6. **SVG Visualization** — Layered graphics: rough, fairway, sand, water, green, trees, tee, pin

## Coordinate System

- SVG viewBox: 400×600 pixels
- All hole geometry shares this coordinate space
- Yard distance is scaled per-hole based on tee-to-pin pixel distance vs declared yardage

## Domain Types

| Type | Purpose |
|------|---------|
| `Point` | 2D coordinate {x, y} |
| `Polygon` | Array of Points defining a closed shape |
| `HoleDefinition` | Complete hole layout (par, yardage, tee, pin, polygons, hazards) |
| `GameState` | Current game state (strokes, ball position, hole complete, score) |
