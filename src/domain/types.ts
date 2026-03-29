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

export interface Rock {
  position: Point;
  width: number;   // 4–12px
  height: number;  // 3–8px
  rotation: number; // degrees, for visual variety
}

export interface Bush {
  position: Point;
  radius: number;  // 4–8px
}

export interface FlowerBed {
  position: Point;
  radius: number;  // 3–6px
  color: string;   // CSS color (e.g., '#e87da0', '#f5e642')
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
  rocks?: Rock[];
  bushes?: Bush[];
  flowerBeds?: FlowerBed[];
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
