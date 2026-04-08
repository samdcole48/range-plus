import { useCallback } from 'react';
import type { Point, GameState } from '../domain/types';
import { placeShot } from '../domain/game';
import { SVG_VIEWPORT_WIDTH, SVG_VIEWPORT_HEIGHT } from '../domain/constants';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Extracts shot-placement interaction logic from HoleView.
 * Handles SVG coordinate conversion, preview placement, and shot confirmation.
 * Per ENG-3.4 — extracted to keep HoleView() body ≤50 lines.
 */
export function useHoleInteraction(
  gameState: GameState,
  setGameState: SetState<GameState>,
  setPreviewPoint: SetState<Point | null>,
) {
  const svgCoordsFromEvent = useCallback(
    (e: React.MouseEvent<SVGSVGElement>): Point | null => {
      const svg = e.currentTarget;
      if (!svg) return null;
      const rect = svg.getBoundingClientRect();
      return {
        x: Math.round((e.clientX - rect.left) * SVG_VIEWPORT_WIDTH / rect.width),
        y: Math.round((e.clientY - rect.top) * SVG_VIEWPORT_HEIGHT / rect.height),
      };
    },
    [],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (gameState.isComplete) return;
      const target = svgCoordsFromEvent(e);
      if (target) setPreviewPoint(target);
    },
    [gameState.isComplete, svgCoordsFromEvent, setPreviewPoint],
  );

  const handleConfirmShot = useCallback(
    (e: React.MouseEvent, previewPoint: Point | null) => {
      e.stopPropagation();
      if (!previewPoint) return;
      setGameState((prev) => placeShot(prev, previewPoint));
      setPreviewPoint(null);
    },
    [setGameState, setPreviewPoint],
  );

  return { handleClick, handleConfirmShot };
}
