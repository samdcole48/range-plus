# Range+ Project Constitution

**Authority:** AA-Hangar-AI-Constitution (https://github.com/AAInternal/AA-Hangar-AI-Constitution)
**Version:** 1.0.0
**Established:** 2026-03-28
**Stack:** React 19 / TypeScript 5.9 / Vite 8 / Vitest 4
**Domain:** Golf Simulation Game

> This Constitution EXTENDS the AA-Hangar-AI-Constitution with project-specific context.
> It CANNOT override any laws from the central constitution.

---

## Article 0: Project Context

### Section 0.1: Project Overview

Range+ is a browser-based golf hole simulator and scoring game. Users play through randomly selected golf holes, place shots on interactive SVG course visualizations, and receive real-time scoring feedback. The game features 12 preset holes forming a Par-48 course (3× Par-3, 6× Par-4, 3× Par-5) with realistic collision detection, hazard penalties, and automatic putt calculation.

### Section 0.2: Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Language | TypeScript | 5.9.3 |
| UI Framework | React | 19.2.4 |
| Build Tool | Vite | 8.0.1 |
| Test Runner | Vitest | 4.1.2 |
| Test Utils | @testing-library/react | 16.3.2 |
| DOM Simulation | jsdom | 29.0.1 |
| Linter | ESLint | 9.39.4 |

### Section 0.3: Bounded Contexts

| Context | Responsibility | Key Files |
|---------|---------------|-----------|
| **Game Domain** | Pure game logic: distance calculation, collision detection, scoring, state management | `src/domain/` |
| **Presentation** | SVG rendering, user interaction, shot placement UI, HUD display | `src/components/` |
| **Data** | Hole definitions, course layout, random hole selection | `src/data/` |

### Section 0.4: External Integrations

This project has no external integrations. It is a self-contained client-side application with no backend, API, or database dependencies.

---

## Article I: Adopted Constitutions (from AA-Hangar-AI-Constitution)

### Base Constitutions
- Engineering Constitution — `constitution/base/ENGINEERING-CONSTITUTION.md`
- Product Constitution — `constitution/base/PRODUCT-CONSTITUTION.md`
- Business Constitution — `constitution/base/BUSINESS-CONSTITUTION.md`

### Technology Adoption
- React/TypeScript — `constitution/avatars/technology/react-typescript/ADOPTION.md`

---

## Article II: Project-Specific Domain Laws

### Section 2.1: Coordinate System Invariants
- All hole geometry uses a 400×600 SVG viewBox coordinate space
- Real-world yards are scaled based on tee-to-pin distance per hole
- Polygon coordinates (fairway, green, bunkers, water) MUST form valid closed polygons

### Section 2.2: Game State Immutability
- Game state transitions MUST use pure functions returning new state objects
- No direct mutation of `GameState` — always spread and return new objects
- Per **ENG-3.5** (Immutability preference): value objects and game state are immutable

### Section 2.3: Scoring Rules
- Scoring labels are determined by strokes relative to par (Hole in One, Eagle, Birdie, Par, Bogey, Double Bogey, Triple Bogey, +N)
- Water hazard penalty is always +2 strokes with ball moved to drop zone
- Green landing triggers automatic putt: ≤15 feet from pin = 1 putt, otherwise 2 putts
- These rules MUST be tested exhaustively (per **ENG-4.6**: 100% on critical paths)

### Section 2.4: Hole Data Integrity
- All 12 holes MUST have valid polygon data for all declared features
- Par values MUST be 3, 4, or 5
- Every hole MUST have at minimum: tee position, pin position, green polygon, fairway polygon

---

## Article III: Deployment & Hosting

### Section 3.1: Vercel Deployment

This project is deployed on the **Vercel Free Tier** as a static Vite app.

| Property | Value |
|----------|-------|
| **Platform** | Vercel |
| **Project** | `range-plus` |
| **Scope** | `sam-coles-projects` |
| **Production URL** | https://range-plus.vercel.app |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Root Directory** | `.` (project root) |

### Section 3.2: Deployment Commands

| Action | Command |
|--------|---------|
| Deploy to production | `npm run deploy` |
| Preview deployment | `npm run deploy:preview` |
| List deployments | `npx vercel ls` |
| Inspect deployment | `npx vercel inspect <url>` |

### Section 3.3: Deployment Guardrails

- **Scope restriction:** The Vercel CLI is linked to the `sam-coles-projects/range-plus` project ONLY. Do NOT create new projects, modify other projects, or change the linked project.
- **No `vercel.json`:** Build settings are configured in the Vercel dashboard, not via a local config file. Do NOT create a `vercel.json`.
- **No backend yet:** This is currently a static frontend deployment. Do NOT add Vercel serverless functions (`api/` routes) without explicit approval.
- **Free tier limits:** Be aware of Vercel free tier limits (100 production deploys/day, 100GB bandwidth/month). Do NOT set up automatic deploy-on-push without approval.

---

## Article IV: Project-Specific Testing Conventions

### Section 4.1: Colocated Tests
This project uses **colocated test files** alongside source files (e.g., `game.test.ts` next to `game.ts`). This is the established convention and DOES NOT conflict with Constitution test structure requirements.

### Section 4.2: Test Commands

| Action | Command |
|--------|---------|
| Run all tests | `npx vitest run` |
| Run tests in watch mode | `npx vitest` |
| Run specific test file | `npx vitest run src/domain/game.test.ts` |
| Run with coverage | `npx vitest run --coverage` |
| Run lint | `npm run lint` |
| Build | `npm run build` |

### Section 4.3: Test Pyramid Targets (Per ENG-4.2)

| Layer | Target | Current Focus |
|-------|--------|---------------|
| Unit | 70-80% | Domain logic (game.ts), data validation (holes.ts) |
| Integration/Component | 15-25% | React component rendering & interaction (HoleView, App) |
| E2E | 5-10% | Full game flow (not yet implemented) |

---

## Appendix: Project-Specific Patterns

### Good: Pure Domain Logic
```typescript
// Game logic is pure — no React, no DOM, no side effects
function calculateScore(strokes: number, par: number): string {
  const diff = strokes - par;
  if (strokes === 1) return 'Hole in One';
  if (diff <= -2) return 'Eagle';
  if (diff === -1) return 'Birdie';
  if (diff === 0) return 'Par';
  // ...
}
```

### Bad: Mixing Domain Logic with UI
```typescript
// DON'T: Domain logic inside React component
function HoleView() {
  // This scoring logic belongs in src/domain/game.ts
  const score = strokes - par;
  const label = score === 0 ? 'Par' : score < 0 ? 'Birdie' : 'Bogey';
}
```
