# AGENTS.md - AI Entry Point

> **READ THIS FIRST** before making any changes to this codebase.
> Per **ENG-1.2 (AI-Engineer Pairing Law)**: AI assistants SHALL follow the Constitution strictly and explain the WHY behind every decision.

## Constitutional Authority

This project is governed by the **AA-Hangar-AI-Constitution**.

**Repository:** `https://github.com/AAInternal/AA-Hangar-AI-Constitution`

Per **ENG-1.2**: Every decision in this codebase MUST cite the specific constitutional law that mandates it.

---

## Authority Hierarchy

Per **ENG-1.1 (Priority Hierarchy)**: Security > Correctness > Reliability > Maintainability > Performance > DX

```
┌─────────────────────────────────────────────────────────┐
│                  AUTHORITY PRECEDENCE                    │
├─────────────────────────────────────────────────────────┤
│  1. AA-Hangar-AI-Constitution                           │
│     └── Engineering Laws are NON-NEGOTIABLE             │
│                                                         │
│  2. openspec/project-rules.md                           │
│     └── Project-specific adaptations WITHIN law bounds  │
│                                                         │
│  3. This file (AGENTS.md)                               │
│     └── Quick reference and entry point                 │
│                                                         │
│  4. openspec/changes/*/SPEC.md                          │
│     └── Current work specifications                     │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Language | TypeScript | 5.9 |
| Framework | React | 19.2 |
| Build | Vite | 8.0 |
| Test Runner | Vitest | 4.1 |
| Linter | ESLint | 9.39 |
| Hosting | Vercel (Free Tier) | — |

---

## Domain Context

Range+ is a golf hole simulator and scoring game. Players interact with SVG-based 2D course visualizations, place shots via tap-to-preview mechanics, and receive real-time scoring feedback (Birdie, Par, Bogey, etc.). The game features 12 preset holes forming a Par-48 course with realistic physics including water hazard penalties, green detection, and automatic putt calculation.

### Key Domain Concepts

| Term | Definition |
|------|------------|
| Hole | A single golf hole with tee box, fairway, green, pin, and optional hazards |
| Shot Placement | Tap-to-preview system: click once to preview, click again to confirm |
| Scoring | Automatic calculation based on strokes vs par (Eagle, Birdie, Par, Bogey, etc.) |
| Hazard | Water or sand areas that impose penalties (water = +2 strokes, drop zone) |
| Green Detection | Landing on the green triggers automatic putt calculation |
| One-Putt Zone | Within 15 feet of pin = 1 putt; otherwise 2 putts |
| Par | The expected number of strokes for a hole (3, 4, or 5) |

---

## Non-Negotiable Laws

Per the Constitution, these laws require executive approval to amend:

| Law ID | Title | Summary |
|--------|-------|---------|
| **ENG-4.1** | Atomic TDD Law | TDD SHALL be practiced in atomic cycles — ONE test at a time |
| **ENG-6.1** | Security by Design | Security SHALL be built in, not bolted on |
| **ENG-6.4** | Data Protection | All sensitive data SHALL be protected at rest and in transit |
| **ENG-6.7** | Audit Trail | All sensitive operations SHALL be logged with immutable records |

---

## Quality Gates

Per **ENG-3.1**, **ENG-3.2**, and **ENG-4.6**:

| Metric | Law | Threshold |
|--------|-----|-----------|
| Cyclomatic Complexity | ENG-3.1 | ≤10 per method |
| Cognitive Complexity | ENG-3.2 | ≤7 per method |
| Method Length | ENG-3.4 | ≤50 lines |
| Test Coverage (new code) | ENG-4.6 | ≥90% |
| Test Coverage (critical paths) | ENG-4.6 | 100% |

---

## ⛔ MANDATORY AGENT PROTOCOL

**Every coding task MUST follow this exact 8-step cycle. No exceptions.**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              MANDATORY AGENT PROTOCOL (Per ENG-4.1 — NON-NEGOTIABLE)        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Step 1 — IDENTIFY   Find the FIRST unchecked task in tasks.md             │
│                       Read the linked spec scenario ID                      │
│                       ↓                                                     │
│  Step 2 — RED        Write EXACTLY ONE failing test                         │
│                       Run tests → Required output: FAILED                   │
│                       ⛔ SHOW the failure output before continuing           │
│                       ↓                                                     │
│  Step 3 — GREEN      Write MINIMUM code to make that ONE test pass          │
│                       Run tests → Required output: PASSED                   │
│                       ⛔ SHOW the pass output before continuing              │
│                       ↓                                                     │
│  Step 4 — REFACTOR   Improve code quality (no behavior changes)             │
│                       Run tests → Required output: still PASSED             │
│                       ↓                                                     │
│  Step 5 — VERIFY     Run full test suite + lint                             │
│                       ALL gates must be green before proceeding             │
│                       ↓                                                     │
│  Step 6 — UPDATE     Open tasks.md and mark task [x] with ✓ + commit hash  │
│           TASKS.MD   Update progress summary counts                         │
│                       ↓                                                     │
│  Step 7 — COMMIT     git add -A && git commit -m "<conventional-msg>"      │
│                       Commit message MUST reference spec scenario ID        │
│                       ↓                                                     │
│  Step 8 — STOP AND   Report completed test, commit hash, and next task      │
│           REPORT     Wait for human confirmation before starting next cycle │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## ⛔ PROHIBITED ACTIONS

| Prohibited Action | Law Violated |
|-------------------|-------------|
| Writing more than one test method per cycle | ENG-4.1 |
| Writing production code before a failing test exists | ENG-4.1 |
| Skipping the RED step (no failure proof shown) | ENG-4.1 |
| Skipping the REFACTOR step | ENG-4.1 |
| Skipping the VERIFY step (full suite + lint) | ENG-4.1, ENG-4.2 |
| Not updating tasks.md after a cycle completes | ENG-6.7 |
| Committing without a spec scenario ID in the message | ENG-6.7 |
| Batching multiple tests into one commit | ENG-4.1 |
| Touching files outside the current task scope | ENG-2.3 |
| Proceeding to the next cycle without human confirmation | ENG-1.2 |

---

## Before You Code

1. **Read** `openspec/project-rules.md` for project-specific adaptations
2. **Check** `openspec/changes/` for active work specifications
3. **Follow** the Constitution laws — cite them in your decisions
4. **Test First** — Per **ENG-4.1**, no exceptions

---

## Project Structure

```
range-plus/
├── AGENTS.md                  # You are here
├── openspec/
│   ├── project-rules.md       # Project-specific rules
│   ├── project.md             # Project context and domain
│   ├── specs/                 # Baseline specifications
│   │   ├── game-logic/
│   │   │   └── spec.md        # Game mechanics baseline
│   │   ├── hole-view/
│   │   │   └── spec.md        # HoleView component baseline
│   │   └── hole-data/
│   │       └── spec.md        # Hole data & selection baseline
│   └── changes/               # Change proposals
├── src/
│   ├── main.tsx               # App entry point
│   ├── App.tsx                # Root component
│   ├── domain/                # Core game logic (pure functions)
│   │   ├── types.ts           # TypeScript interfaces
│   │   ├── game.ts            # Game mechanics
│   │   └── game.test.ts       # Game logic tests
│   ├── components/            # React components
│   │   ├── HoleView.tsx       # Main hole visualization
│   │   ├── HoleView.test.tsx  # Component tests
│   │   └── App.test.tsx       # App tests
│   └── data/                  # Game data
│       ├── holes.ts           # 12 preset hole definitions
│       ├── holes.test.ts      # Data validation tests
│       └── holeSelection.ts   # Random hole selection
├── vite.config.ts
├── tsconfig.json
└── eslint.config.js
```

---

## Known Technical Debt

Per **ENG-1.3 (Continuous Refactoring Law)**: Document debt for future remediation.

| Debt Item | Violates | Impact | Remediation Phase |
|-----------|----------|--------|-------------------|
| HoleView.tsx is ~550 lines | ENG-3.4 | Hard to maintain/test | Phase 2 — Extract sub-components |
| No E2E tests | ENG-4.2 | Missing test pyramid top | Phase 2 — Add E2E layer |
| No coverage reporting configured | ENG-4.6 | Can't verify thresholds | Phase 1 — Add Vitest coverage |

---

**Last Updated:** 2026-03-28
**Constitution Version:** AA-Hangar-AI-Constitution v1.0
