# Contributing to Range+

## Getting Started

```bash
npm install         # Install dependencies
npm run dev         # Dev server at localhost:5173
npm test            # Run all 60 tests
npm run build       # Production build
```

## Development Workflow

1. Create a feature branch from `main`
2. Follow **Atomic TDD**: write a failing test → make it pass → refactor
3. All tests must pass before committing
4. TypeScript must be clean: `npx tsc --noEmit`
5. Create a PR with a descriptive title and body

## Key Rules

### No Code Without a Failing Test First

Per the project constitution (ENG-IV.4.1), every change to production code must be driven by a failing test. Write the test, watch it fail, then write the minimum code to make it pass.

### Don't Break Hole 1 Coordinates

Tests depend on `PRESET_HOLES[0]` having specific green boundary, water hazard, and pin positions. Never modify Hole 1's data.

### Fairways Must Wrap Greens

The fairway polygon must extend past and surround the green. See [HOLE_DESIGN_GUIDE.md](./HOLE_DESIGN_GUIDE.md) for details.

### Domain Logic Stays Pure

No React imports in `src/domain/`. All game logic, types, and calculations belong in the domain layer with zero framework dependencies.

### Components Stay Thin

Heavy logic belongs in `src/domain/game.ts`. Components in `src/components/` should primarily compose domain functions with SVG rendering, not implement game rules.

## Adding a New Hole

1. Read [`docs/HOLE_DESIGN_GUIDE.md`](./HOLE_DESIGN_GUIDE.md) for design principles and acceptance criteria
2. Add the hole definition to the `PRESET_HOLES` array in `src/data/holes.ts`
3. Run through the quality checklist in the design guide
4. Update any test count expectations if a specific count is asserted
5. Run all tests and verify TypeScript compiles cleanly:
   ```bash
   npm test && npx tsc --noEmit
   ```

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `docs:` — documentation only
- `test:` — adding or updating tests

Always include the co-authored-by trailer at the end of the commit message:

```
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

## Architecture Reference

See [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) for a full overview of the codebase structure, coordinate system, key algorithms, and testing strategy.
