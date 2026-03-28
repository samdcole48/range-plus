import type { GameState, HoleDefinition, Point, Polygon } from './types';

const FEET_PER_YARD = 3;
export const ONE_PUTT_THRESHOLD_FEET = 15;

export function calculateDistanceYards(
  from: Point,
  to: Point,
  hole: HoleDefinition
): number {
  const pixelDistance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
  const teeToPin = Math.sqrt(
    (hole.pinPosition.x - hole.teePosition.x) ** 2 +
    (hole.pinPosition.y - hole.teePosition.y) ** 2
  );
  if (teeToPin === 0) return 0;
  const scale = hole.yardsLength / teeToPin;
  return Math.round(pixelDistance * scale);
}

export function isPointInPolygon(point: Point, polygon: Polygon): boolean {
  const { points } = polygon;
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x, yi = points[i].y;
    const xj = points[j].x, yj = points[j].y;
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function getScoreLabel(strokes: number, par: number): string {
  if (strokes === 1) return 'Hole in One';
  const diff = strokes - par;
  if (diff <= -2) return 'Eagle';
  if (diff === -1) return 'Birdie';
  if (diff === 0) return 'Par';
  if (diff === 1) return 'Bogey';
  if (diff === 2) return 'Double Bogey';
  if (diff === 3) return 'Triple Bogey';
  return `+${diff}`;
}

export function createGameState(hole: HoleDefinition): GameState {
  return {
    hole,
    ballPosition: { ...hole.teePosition },
    strokeCount: 0,
    isComplete: false,
    shotHistory: [{ ...hole.teePosition }],
    landedInOnePuttZone: false,
    puttCount: 0,
  };
}

export function placeShot(state: GameState, target: Point): GameState {
  if (state.isComplete) return state;

  const onGreen = isPointInPolygon(target, state.hole.greenBoundary);

  if (onGreen) {
    const distToPin = calculateDistanceYards(target, state.hole.pinPosition, state.hole);
    const distFeet = distToPin * FEET_PER_YARD;
    const inOnePuttZone = distFeet <= ONE_PUTT_THRESHOLD_FEET;
    const putts = inOnePuttZone ? 1 : 2;
    return {
      ...state,
      ballPosition: { ...state.hole.pinPosition },
      strokeCount: state.strokeCount + 1 + putts,
      isComplete: true,
      shotHistory: [...state.shotHistory, { ...target }, { ...state.hole.pinPosition }],
      landedInOnePuttZone: inOnePuttZone,
      puttCount: putts,
    };
  }

  // Check water hazards
  for (const hazard of state.hole.waterHazards) {
    if (isPointInPolygon(target, hazard.boundary)) {
      return {
        ...state,
        ballPosition: { ...hazard.dropZone },
        strokeCount: state.strokeCount + 2,
        shotHistory: [...state.shotHistory, { ...target }, { ...hazard.dropZone }],
      };
    }
  }

  return {
    ...state,
    ballPosition: { ...target },
    strokeCount: state.strokeCount + 1,
    shotHistory: [...state.shotHistory, { ...target }],
  };
}
