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

export interface HoleDefinition {
  id: string;
  par: 3 | 4 | 5;
  teePosition: Point;
  pinPosition: Point;
  greenBoundary: Polygon;
  fairwayBoundary: Polygon;
  waterHazards: WaterHazard[];
  yardsLength: number;
}

export interface GameState {
  hole: HoleDefinition;
  ballPosition: Point;
  strokeCount: number;
  isComplete: boolean;
  shotHistory: Point[];
  landedInOnePuttZone: boolean;
}
