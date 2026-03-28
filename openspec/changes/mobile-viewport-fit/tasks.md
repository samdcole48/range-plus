# Mobile Viewport Fit — Tasks

> **Spec:** `openspec/changes/mobile-viewport-fit/SPEC.md`
> **Branch:** `feature/mobile-viewport-fit`
> **Progress:** 3 / 19

## Domain: Putt Count

- [x] 1. Add `puttCount: number` to `GameState` interface — CHG-MVF-001 — `types.ts` ✓
- [x] 2. Test: initial game state has `puttCount` 0 — CHG-MVF-001 — `game.test.ts` ✓
- [x] 3. Set `puttCount: 0` in `createGameState` — CHG-MVF-001 — `game.ts` ✓
- [ ] 4. Test: one-putt zone landing sets `puttCount` to 1 — CHG-MVF-002 — `game.test.ts`
- [ ] 5. Set `puttCount` in `placeShot` green-landing path — CHG-MVF-002 — `game.ts`
- [ ] 6. Test: outside one-putt zone sets `puttCount` to 2 — CHG-MVF-003 — `game.test.ts`
- [ ] 7. Test: fairway shot keeps `puttCount` 0 — CHG-MVF-004 — `game.test.ts`
- [ ] 8. Test: water hazard shot keeps `puttCount` 0 — CHG-MVF-005 — `game.test.ts`

## Presentation: HUD Score Swap

- [ ] 9. Test: HUD shows score on completion — CHG-MVF-010 — `HoleView.test.tsx`
- [ ] 10. Swap HUD content on completion in HoleView — CHG-MVF-010 — `HoleView.tsx`
- [ ] 11. Test: putt count "1 Putt 🎯" displayed in HUD — CHG-MVF-011 — `HoleView.test.tsx`
- [ ] 12. Test: putt count "2 Putts" displayed in HUD — CHG-MVF-012 — `HoleView.test.tsx`
- [ ] 13. Test: no score-card element exists — CHG-MVF-013 — `HoleView.test.tsx`
- [ ] 14. Remove score-card div from HoleView — CHG-MVF-013 — `HoleView.tsx`
- [ ] 15. Test: HUD shows normal items during play — CHG-MVF-014 — `HoleView.test.tsx`
- [ ] 16. Test: stroke count displayed in HUD — CHG-MVF-015 — `HoleView.test.tsx`
- [ ] 17. CSS: add `.hud-complete` styles, remove `.score-card` styles — CHG-MVF-010 — `index.css`
- [ ] 18. Remove "Next Hole →" button from score-card (already removed with card) — CHG-MVF-013 — `HoleView.tsx`
- [ ] 19. Update baseline spec with new/superseded scenarios — `openspec/specs/hole-view/spec.md`
