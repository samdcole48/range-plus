import type { HoleDefinition } from '../domain/types';

/**
 * Preset hole definitions.
 * Coordinate system: 0,0 is top-left. Y increases downward.
 * All holes are designed for a 400x600 canvas viewport.
 * yardsLength represents the tee-to-pin distance in real yards.
 */
export const PRESET_HOLES: HoleDefinition[] = [
  // Hole 1 — Par 4, straight with water right
  {
    id: 'hole-1-par4',
    par: 4,
    yardsLength: 380,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 200, y: 60 },
    greenBoundary: {
      points: [
        { x: 183, y: 44 }, { x: 217, y: 44 }, { x: 222, y: 60 },
        { x: 219, y: 76 }, { x: 181, y: 76 }, { x: 178, y: 60 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 181, y: 76 }, { x: 219, y: 76 }, { x: 240, y: 180 },
        { x: 250, y: 300 }, { x: 248, y: 420 }, { x: 240, y: 530 },
        { x: 230, y: 570 }, { x: 170, y: 570 }, { x: 160, y: 530 },
        { x: 152, y: 420 }, { x: 150, y: 300 }, { x: 160, y: 180 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 250, y: 170 }, { x: 310, y: 185 }, { x: 315, y: 240 },
          { x: 295, y: 270 }, { x: 245, y: 255 }, { x: 240, y: 210 },
        ],
      },
      dropZone: { x: 235, y: 200 },
    }],
  },

  // Hole 2 — Par 3, short with water left of green
  {
    id: 'hole-2-par3',
    par: 3,
    yardsLength: 155,
    teePosition: { x: 200, y: 480 },
    pinPosition: { x: 200, y: 150 },
    greenBoundary: {
      points: [
        { x: 180, y: 132 }, { x: 220, y: 132 }, { x: 226, y: 150 },
        { x: 222, y: 168 }, { x: 178, y: 168 }, { x: 174, y: 150 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 178, y: 168 }, { x: 222, y: 168 }, { x: 235, y: 250 },
        { x: 240, y: 350 }, { x: 235, y: 450 }, { x: 225, y: 490 },
        { x: 175, y: 490 }, { x: 165, y: 450 }, { x: 160, y: 350 },
        { x: 165, y: 250 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 120, y: 120 }, { x: 172, y: 130 }, { x: 170, y: 175 },
          { x: 120, y: 185 }, { x: 100, y: 165 }, { x: 105, y: 135 },
        ],
      },
      dropZone: { x: 175, y: 180 },
    }],
  },

  // Hole 3 — Par 5, long dogleg left
  {
    id: 'hole-3-par5',
    par: 5,
    yardsLength: 520,
    teePosition: { x: 280, y: 560 },
    pinPosition: { x: 130, y: 55 },
    greenBoundary: {
      points: [
        { x: 112, y: 38 }, { x: 148, y: 38 }, { x: 154, y: 55 },
        { x: 150, y: 72 }, { x: 110, y: 72 }, { x: 106, y: 55 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 110, y: 72 }, { x: 150, y: 72 }, { x: 170, y: 140 },
        { x: 200, y: 230 }, { x: 240, y: 320 }, { x: 270, y: 400 },
        { x: 295, y: 480 }, { x: 300, y: 540 }, { x: 295, y: 570 },
        { x: 265, y: 570 }, { x: 260, y: 540 }, { x: 240, y: 460 },
        { x: 210, y: 370 }, { x: 170, y: 280 }, { x: 140, y: 200 },
        { x: 115, y: 130 },
      ],
    },
    waterHazards: [],
  },

  // Hole 4 — Par 4, water crossing mid-fairway
  {
    id: 'hole-4-par4',
    par: 4,
    yardsLength: 350,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 185, y: 65 },
    greenBoundary: {
      points: [
        { x: 167, y: 48 }, { x: 203, y: 48 }, { x: 209, y: 65 },
        { x: 205, y: 82 }, { x: 165, y: 82 }, { x: 161, y: 65 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 165, y: 82 }, { x: 205, y: 82 }, { x: 220, y: 160 },
        { x: 235, y: 270 }, { x: 240, y: 390 }, { x: 235, y: 500 },
        { x: 225, y: 570 }, { x: 175, y: 570 }, { x: 165, y: 500 },
        { x: 160, y: 390 }, { x: 165, y: 270 }, { x: 180, y: 160 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 140, y: 300 }, { x: 260, y: 300 }, { x: 265, y: 330 },
          { x: 260, y: 355 }, { x: 140, y: 355 }, { x: 135, y: 330 },
        ],
      },
      dropZone: { x: 200, y: 365 },
    }],
  },

  // Hole 5 — Par 3, water both sides of green
  {
    id: 'hole-5-par3',
    par: 3,
    yardsLength: 135,
    teePosition: { x: 200, y: 460 },
    pinPosition: { x: 200, y: 170 },
    greenBoundary: {
      points: [
        { x: 180, y: 152 }, { x: 220, y: 152 }, { x: 226, y: 170 },
        { x: 222, y: 188 }, { x: 178, y: 188 }, { x: 174, y: 170 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 178, y: 188 }, { x: 222, y: 188 }, { x: 230, y: 260 },
        { x: 235, y: 350 }, { x: 230, y: 430 }, { x: 220, y: 470 },
        { x: 180, y: 470 }, { x: 170, y: 430 }, { x: 165, y: 350 },
        { x: 170, y: 260 },
      ],
    },
    waterHazards: [
      {
        boundary: {
          points: [
            { x: 228, y: 140 }, { x: 290, y: 130 }, { x: 300, y: 175 },
            { x: 290, y: 210 }, { x: 228, y: 200 },
          ],
        },
        dropZone: { x: 222, y: 190 },
      },
      {
        boundary: {
          points: [
            { x: 110, y: 130 }, { x: 172, y: 140 }, { x: 172, y: 200 },
            { x: 110, y: 210 }, { x: 100, y: 175 },
          ],
        },
        dropZone: { x: 178, y: 190 },
      },
    ],
  },

  // Hole 6 — Par 5, gentle dogleg right
  {
    id: 'hole-6-par5',
    par: 5,
    yardsLength: 490,
    teePosition: { x: 140, y: 560 },
    pinPosition: { x: 260, y: 55 },
    greenBoundary: {
      points: [
        { x: 242, y: 38 }, { x: 278, y: 38 }, { x: 284, y: 55 },
        { x: 280, y: 72 }, { x: 240, y: 72 }, { x: 236, y: 55 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 240, y: 72 }, { x: 280, y: 72 }, { x: 270, y: 140 },
        { x: 245, y: 230 }, { x: 210, y: 320 }, { x: 175, y: 400 },
        { x: 155, y: 480 }, { x: 155, y: 540 }, { x: 155, y: 570 },
        { x: 125, y: 570 }, { x: 120, y: 540 }, { x: 125, y: 460 },
        { x: 150, y: 370 }, { x: 185, y: 280 }, { x: 220, y: 190 },
        { x: 245, y: 120 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 275, y: 150 }, { x: 330, y: 165 }, { x: 335, y: 210 },
          { x: 315, y: 245 }, { x: 270, y: 230 }, { x: 265, y: 190 },
        ],
      },
      dropZone: { x: 255, y: 180 },
    }],
  },

  // Hole 7 — Par 4, short and tight
  {
    id: 'hole-7-par4',
    par: 4,
    yardsLength: 310,
    teePosition: { x: 200, y: 540 },
    pinPosition: { x: 210, y: 80 },
    greenBoundary: {
      points: [
        { x: 192, y: 62 }, { x: 228, y: 62 }, { x: 234, y: 80 },
        { x: 230, y: 98 }, { x: 190, y: 98 }, { x: 186, y: 80 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 190, y: 98 }, { x: 230, y: 98 }, { x: 238, y: 180 },
        { x: 240, y: 290 }, { x: 235, y: 410 }, { x: 225, y: 510 },
        { x: 220, y: 550 }, { x: 180, y: 550 }, { x: 175, y: 510 },
        { x: 165, y: 410 }, { x: 160, y: 290 }, { x: 162, y: 180 },
      ],
    },
    waterHazards: [],
  },
];
