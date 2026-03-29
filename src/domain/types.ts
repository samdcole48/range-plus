export interface Point {
  x: number;
  y: number;
}

export interface Polygon {
  points: Point[];
}

export interface WaterHazard {
  boundary: Polygon;
  dropZone: Point;
}

export interface TreeCluster {
  position: Point;
  radius: number;
}

export interface Bunker {
  boundary: Polygon;
}

export interface HoleDefinition {
  id: string;
  name: string;
  par: 3 | 4 | 5;
  teePosition: Point;
  /** Legacy active pin — always equals pinPositions[0] for backward compat */
  pinPosition: Point;
  /** 3–4 positions per green; one randomly selected per play via activePinPosition */
  pinPositions: Point[];
  greenBoundary: Polygon;
  fairwayBoundary: Polygon;
  waterHazards: WaterHazard[];
  yardsLength: number;
  bunkers?: Bunker[];
  trees?: TreeCluster[];
}

export interface GameState {
  hole: HoleDefinition;
  ballPosition: Point;
  strokeCount: number;
  isComplete: boolean;
  shotHistory: Point[];
  puttCount: number;
  /** Randomly selected from hole.pinPositions at game init; fixed for the hole's duration */
  activePinPosition: Point;
}
