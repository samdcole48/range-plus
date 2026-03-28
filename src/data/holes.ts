import type { HoleDefinition } from '../domain/types';

/**
 * Preset hole definitions.
 * Coordinate system: 0,0 is top-left. Y increases downward.
 * All holes are designed for a 400x600 canvas viewport.
 * yardsLength represents the tee-to-pin distance in real yards.
 *
 * Holes include decorative elements (trees, bunkers) for scorecard-style rendering.
 */
export const PRESET_HOLES: HoleDefinition[] = [
  // Hole 1 — Par 4, gentle dogleg right with water right
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
        { x: 181, y: 76 }, { x: 219, y: 76 },
        { x: 232, y: 130 }, { x: 245, y: 200 },
        { x: 250, y: 280 }, { x: 248, y: 360 },
        { x: 244, y: 430 }, { x: 240, y: 490 },
        { x: 230, y: 540 }, { x: 225, y: 570 },
        { x: 175, y: 570 }, { x: 170, y: 540 },
        { x: 160, y: 490 }, { x: 155, y: 430 },
        { x: 152, y: 360 }, { x: 150, y: 280 },
        { x: 155, y: 200 }, { x: 168, y: 130 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 255, y: 160 }, { x: 320, y: 170 }, { x: 325, y: 210 },
          { x: 318, y: 250 }, { x: 305, y: 275 }, { x: 260, y: 265 },
          { x: 248, y: 230 }, { x: 250, y: 195 },
        ],
      },
      dropZone: { x: 235, y: 200 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 170, y: 40 }, { x: 178, y: 38 }, { x: 180, y: 48 },
        { x: 176, y: 55 }, { x: 168, y: 52 }, { x: 166, y: 44 },
      ]}},
      { boundary: { points: [
        { x: 224, y: 52 }, { x: 234, y: 48 }, { x: 238, y: 56 },
        { x: 236, y: 66 }, { x: 226, y: 68 }, { x: 222, y: 60 },
      ]}},
      { boundary: { points: [
        { x: 145, y: 350 }, { x: 155, y: 345 }, { x: 158, y: 355 },
        { x: 155, y: 370 }, { x: 145, y: 372 }, { x: 142, y: 360 },
      ]}},
    ],
    trees: [
      { position: { x: 125, y: 100 }, radius: 14 },
      { position: { x: 108, y: 140 }, radius: 11 },
      { position: { x: 115, y: 180 }, radius: 13 },
      { position: { x: 100, y: 230 }, radius: 10 },
      { position: { x: 110, y: 290 }, radius: 12 },
      { position: { x: 120, y: 400 }, radius: 14 },
      { position: { x: 130, y: 460 }, radius: 11 },
      { position: { x: 290, y: 340 }, radius: 13 },
      { position: { x: 285, y: 410 }, radius: 10 },
      { position: { x: 275, y: 480 }, radius: 12 },
      { position: { x: 280, y: 530 }, radius: 14 },
      { position: { x: 150, y: 30 }, radius: 10 },
      { position: { x: 255, y: 30 }, radius: 11 },
      { position: { x: 340, y: 140 }, radius: 15 },
      { position: { x: 345, y: 290 }, radius: 12 },
      { position: { x: 85, y: 330 }, radius: 13 },
      { position: { x: 90, y: 500 }, radius: 10 },
    ],
  },

  // Hole 2 — Par 3, short over water, island-ish green
  {
    id: 'hole-2-par3',
    par: 3,
    yardsLength: 155,
    teePosition: { x: 200, y: 480 },
    pinPosition: { x: 200, y: 150 },
    greenBoundary: {
      points: [
        { x: 178, y: 130 }, { x: 222, y: 130 }, { x: 230, y: 145 },
        { x: 226, y: 162 }, { x: 214, y: 172 }, { x: 186, y: 172 },
        { x: 174, y: 162 }, { x: 170, y: 145 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 174, y: 172 }, { x: 226, y: 172 },
        { x: 235, y: 220 }, { x: 240, y: 280 },
        { x: 238, y: 350 }, { x: 235, y: 410 },
        { x: 230, y: 460 }, { x: 225, y: 490 },
        { x: 175, y: 490 }, { x: 170, y: 460 },
        { x: 165, y: 410 }, { x: 162, y: 350 },
        { x: 160, y: 280 }, { x: 165, y: 220 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 100, y: 110 }, { x: 170, y: 115 }, { x: 168, y: 180 },
          { x: 155, y: 195 }, { x: 120, y: 200 }, { x: 95, y: 185 },
          { x: 85, y: 155 }, { x: 90, y: 125 },
        ],
      },
      dropZone: { x: 175, y: 185 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 230, y: 138 }, { x: 240, y: 132 }, { x: 245, y: 142 },
        { x: 243, y: 155 }, { x: 234, y: 158 }, { x: 228, y: 148 },
      ]}},
      { boundary: { points: [
        { x: 186, y: 174 }, { x: 198, y: 178 }, { x: 200, y: 190 },
        { x: 192, y: 195 }, { x: 182, y: 190 }, { x: 180, y: 180 },
      ]}},
    ],
    trees: [
      { position: { x: 280, y: 120 }, radius: 16 },
      { position: { x: 300, y: 155 }, radius: 13 },
      { position: { x: 290, y: 200 }, radius: 11 },
      { position: { x: 310, y: 240 }, radius: 14 },
      { position: { x: 130, y: 240 }, radius: 12 },
      { position: { x: 110, y: 300 }, radius: 15 },
      { position: { x: 120, y: 370 }, radius: 10 },
      { position: { x: 280, y: 340 }, radius: 13 },
      { position: { x: 270, y: 420 }, radius: 11 },
      { position: { x: 140, y: 440 }, radius: 14 },
      { position: { x: 75, y: 100 }, radius: 13 },
      { position: { x: 60, y: 160 }, radius: 10 },
      { position: { x: 330, y: 100 }, radius: 12 },
      { position: { x: 320, y: 300 }, radius: 15 },
    ],
  },

  // Hole 3 — Par 5, sweeping dogleg left
  {
    id: 'hole-3-par5',
    par: 5,
    yardsLength: 520,
    teePosition: { x: 280, y: 560 },
    pinPosition: { x: 130, y: 55 },
    greenBoundary: {
      points: [
        { x: 110, y: 36 }, { x: 150, y: 36 }, { x: 158, y: 50 },
        { x: 154, y: 66 }, { x: 142, y: 74 }, { x: 118, y: 74 },
        { x: 106, y: 66 }, { x: 102, y: 50 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 106, y: 74 }, { x: 154, y: 74 },
        { x: 170, y: 120 }, { x: 185, y: 170 },
        { x: 205, y: 230 }, { x: 230, y: 295 },
        { x: 255, y: 360 }, { x: 272, y: 420 },
        { x: 285, y: 475 }, { x: 292, y: 530 },
        { x: 295, y: 570 }, { x: 265, y: 570 },
        { x: 260, y: 530 }, { x: 248, y: 465 },
        { x: 230, y: 395 }, { x: 205, y: 330 },
        { x: 178, y: 265 }, { x: 155, y: 205 },
        { x: 140, y: 155 }, { x: 115, y: 105 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 90, y: 50 }, { x: 100, y: 45 }, { x: 104, y: 55 },
        { x: 100, y: 68 }, { x: 90, y: 70 }, { x: 86, y: 58 },
      ]}},
      { boundary: { points: [
        { x: 158, y: 60 }, { x: 168, y: 55 }, { x: 172, y: 65 },
        { x: 168, y: 75 }, { x: 158, y: 78 }, { x: 155, y: 68 },
      ]}},
      { boundary: { points: [
        { x: 225, y: 430 }, { x: 238, y: 425 }, { x: 242, y: 438 },
        { x: 238, y: 450 }, { x: 226, y: 452 }, { x: 222, y: 440 },
      ]}},
    ],
    trees: [
      { position: { x: 80, y: 100 }, radius: 14 },
      { position: { x: 70, y: 150 }, radius: 12 },
      { position: { x: 90, y: 200 }, radius: 11 },
      { position: { x: 110, y: 260 }, radius: 15 },
      { position: { x: 140, y: 320 }, radius: 13 },
      { position: { x: 170, y: 380 }, radius: 10 },
      { position: { x: 200, y: 440 }, radius: 14 },
      { position: { x: 220, y: 500 }, radius: 12 },
      { position: { x: 320, y: 120 }, radius: 16 },
      { position: { x: 330, y: 200 }, radius: 13 },
      { position: { x: 340, y: 300 }, radius: 11 },
      { position: { x: 335, y: 400 }, radius: 14 },
      { position: { x: 320, y: 490 }, radius: 10 },
      { position: { x: 55, y: 40 }, radius: 12 },
      { position: { x: 185, y: 40 }, radius: 11 },
      { position: { x: 60, y: 280 }, radius: 13 },
    ],
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
        { x: 165, y: 46 }, { x: 205, y: 46 }, { x: 212, y: 60 },
        { x: 208, y: 76 }, { x: 196, y: 84 }, { x: 174, y: 84 },
        { x: 162, y: 76 }, { x: 158, y: 60 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 162, y: 84 }, { x: 208, y: 84 },
        { x: 220, y: 130 }, { x: 230, y: 190 },
        { x: 238, y: 260 }, { x: 240, y: 290 },
        { x: 240, y: 360 }, { x: 238, y: 400 },
        { x: 235, y: 460 }, { x: 230, y: 510 },
        { x: 225, y: 570 }, { x: 175, y: 570 },
        { x: 170, y: 510 }, { x: 165, y: 460 },
        { x: 162, y: 400 }, { x: 160, y: 360 },
        { x: 160, y: 290 }, { x: 162, y: 260 },
        { x: 170, y: 190 }, { x: 180, y: 130 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 130, y: 305 }, { x: 270, y: 305 }, { x: 275, y: 320 },
          { x: 272, y: 340 }, { x: 265, y: 350 }, { x: 135, y: 350 },
          { x: 128, y: 340 }, { x: 125, y: 320 },
        ],
      },
      dropZone: { x: 200, y: 365 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 150, y: 55 }, { x: 158, y: 50 }, { x: 162, y: 60 },
        { x: 158, y: 72 }, { x: 148, y: 74 }, { x: 145, y: 63 },
      ]}},
      { boundary: { points: [
        { x: 212, y: 68 }, { x: 222, y: 64 }, { x: 226, y: 74 },
        { x: 222, y: 85 }, { x: 212, y: 86 }, { x: 210, y: 76 },
      ]}},
      { boundary: { points: [
        { x: 242, y: 225 }, { x: 254, y: 220 }, { x: 258, y: 232 },
        { x: 254, y: 248 }, { x: 242, y: 250 }, { x: 238, y: 238 },
      ]}},
    ],
    trees: [
      { position: { x: 120, y: 110 }, radius: 14 },
      { position: { x: 110, y: 180 }, radius: 12 },
      { position: { x: 125, y: 250 }, radius: 11 },
      { position: { x: 115, y: 420 }, radius: 15 },
      { position: { x: 130, y: 470 }, radius: 13 },
      { position: { x: 280, y: 150 }, radius: 14 },
      { position: { x: 290, y: 230 }, radius: 10 },
      { position: { x: 275, y: 420 }, radius: 12 },
      { position: { x: 285, y: 490 }, radius: 14 },
      { position: { x: 100, y: 380 }, radius: 11 },
      { position: { x: 310, y: 380 }, radius: 13 },
      { position: { x: 140, y: 30 }, radius: 12 },
      { position: { x: 230, y: 35 }, radius: 10 },
      { position: { x: 80, y: 300 }, radius: 14 },
      { position: { x: 330, y: 320 }, radius: 13 },
    ],
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
        { x: 178, y: 150 }, { x: 222, y: 150 }, { x: 230, y: 165 },
        { x: 226, y: 182 }, { x: 214, y: 192 }, { x: 186, y: 192 },
        { x: 174, y: 182 }, { x: 170, y: 165 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 174, y: 192 }, { x: 226, y: 192 },
        { x: 232, y: 230 }, { x: 236, y: 280 },
        { x: 235, y: 340 }, { x: 232, y: 395 },
        { x: 228, y: 440 }, { x: 222, y: 470 },
        { x: 178, y: 470 }, { x: 172, y: 440 },
        { x: 168, y: 395 }, { x: 165, y: 340 },
        { x: 164, y: 280 }, { x: 168, y: 230 },
      ],
    },
    waterHazards: [
      {
        boundary: {
          points: [
            { x: 232, y: 135 }, { x: 300, y: 125 }, { x: 310, y: 160 },
            { x: 305, y: 195 }, { x: 290, y: 215 }, { x: 238, y: 205 },
            { x: 230, y: 180 },
          ],
        },
        dropZone: { x: 222, y: 195 },
      },
      {
        boundary: {
          points: [
            { x: 100, y: 125 }, { x: 168, y: 135 }, { x: 170, y: 180 },
            { x: 162, y: 205 }, { x: 110, y: 215 }, { x: 95, y: 195 },
            { x: 90, y: 160 },
          ],
        },
        dropZone: { x: 178, y: 195 },
      },
    ],
    bunkers: [
      { boundary: { points: [
        { x: 180, y: 195 }, { x: 195, y: 198 }, { x: 198, y: 210 },
        { x: 190, y: 218 }, { x: 178, y: 214 }, { x: 175, y: 204 },
      ]}},
      { boundary: { points: [
        { x: 222, y: 148 }, { x: 232, y: 144 }, { x: 236, y: 154 },
        { x: 232, y: 164 }, { x: 224, y: 166 }, { x: 220, y: 156 },
      ]}},
    ],
    trees: [
      { position: { x: 60, y: 110 }, radius: 16 },
      { position: { x: 75, y: 160 }, radius: 13 },
      { position: { x: 55, y: 220 }, radius: 11 },
      { position: { x: 330, y: 110 }, radius: 14 },
      { position: { x: 340, y: 170 }, radius: 12 },
      { position: { x: 325, y: 230 }, radius: 15 },
      { position: { x: 130, y: 280 }, radius: 13 },
      { position: { x: 120, y: 350 }, radius: 10 },
      { position: { x: 280, y: 290 }, radius: 12 },
      { position: { x: 270, y: 370 }, radius: 14 },
      { position: { x: 140, y: 430 }, radius: 11 },
      { position: { x: 260, y: 440 }, radius: 13 },
    ],
  },

  // Hole 6 — Par 5, gentle dogleg right with water
  {
    id: 'hole-6-par5',
    par: 5,
    yardsLength: 490,
    teePosition: { x: 140, y: 560 },
    pinPosition: { x: 260, y: 55 },
    greenBoundary: {
      points: [
        { x: 240, y: 36 }, { x: 280, y: 36 }, { x: 288, y: 50 },
        { x: 284, y: 66 }, { x: 272, y: 74 }, { x: 248, y: 74 },
        { x: 236, y: 66 }, { x: 232, y: 50 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 236, y: 74 }, { x: 284, y: 74 },
        { x: 278, y: 120 }, { x: 268, y: 170 },
        { x: 252, y: 230 }, { x: 232, y: 290 },
        { x: 210, y: 350 }, { x: 185, y: 405 },
        { x: 165, y: 455 }, { x: 155, y: 500 },
        { x: 155, y: 545 }, { x: 155, y: 570 },
        { x: 125, y: 570 }, { x: 122, y: 545 },
        { x: 122, y: 490 }, { x: 135, y: 430 },
        { x: 155, y: 370 }, { x: 180, y: 310 },
        { x: 205, y: 250 }, { x: 228, y: 190 },
        { x: 248, y: 140 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 280, y: 140 }, { x: 340, y: 150 }, { x: 345, y: 190 },
          { x: 335, y: 230 }, { x: 320, y: 255 }, { x: 280, y: 245 },
          { x: 272, y: 210 }, { x: 275, y: 170 },
        ],
      },
      dropZone: { x: 255, y: 180 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 225, y: 42 }, { x: 234, y: 38 }, { x: 238, y: 48 },
        { x: 234, y: 60 }, { x: 224, y: 62 }, { x: 222, y: 52 },
      ]}},
      { boundary: { points: [
        { x: 288, y: 55 }, { x: 298, y: 50 }, { x: 302, y: 60 },
        { x: 298, y: 72 }, { x: 288, y: 74 }, { x: 285, y: 64 },
      ]}},
      { boundary: { points: [
        { x: 165, y: 480 }, { x: 178, y: 475 }, { x: 182, y: 488 },
        { x: 178, y: 500 }, { x: 166, y: 502 }, { x: 162, y: 490 },
      ]}},
    ],
    trees: [
      { position: { x: 80, y: 80 }, radius: 15 },
      { position: { x: 100, y: 140 }, radius: 12 },
      { position: { x: 85, y: 210 }, radius: 14 },
      { position: { x: 100, y: 290 }, radius: 11 },
      { position: { x: 90, y: 370 }, radius: 13 },
      { position: { x: 80, y: 450 }, radius: 10 },
      { position: { x: 340, y: 90 }, radius: 14 },
      { position: { x: 355, y: 300 }, radius: 12 },
      { position: { x: 340, y: 400 }, radius: 16 },
      { position: { x: 320, y: 480 }, radius: 11 },
      { position: { x: 200, y: 40 }, radius: 13 },
      { position: { x: 310, y: 55 }, radius: 10 },
      { position: { x: 70, y: 520 }, radius: 14 },
      { position: { x: 300, y: 530 }, radius: 12 },
    ],
  },

  // Hole 7 — Par 4, short and tight with bunkers
  {
    id: 'hole-7-par4',
    par: 4,
    yardsLength: 310,
    teePosition: { x: 200, y: 540 },
    pinPosition: { x: 210, y: 80 },
    greenBoundary: {
      points: [
        { x: 190, y: 60 }, { x: 230, y: 60 }, { x: 238, y: 75 },
        { x: 234, y: 92 }, { x: 222, y: 100 }, { x: 198, y: 100 },
        { x: 186, y: 92 }, { x: 182, y: 75 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 186, y: 100 }, { x: 234, y: 100 },
        { x: 240, y: 150 }, { x: 242, y: 210 },
        { x: 240, y: 280 }, { x: 236, y: 350 },
        { x: 232, y: 420 }, { x: 228, y: 480 },
        { x: 222, y: 520 }, { x: 218, y: 550 },
        { x: 182, y: 550 }, { x: 178, y: 520 },
        { x: 172, y: 480 }, { x: 168, y: 420 },
        { x: 164, y: 350 }, { x: 160, y: 280 },
        { x: 158, y: 210 }, { x: 160, y: 150 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 172, y: 68 }, { x: 182, y: 62 }, { x: 186, y: 72 },
        { x: 184, y: 85 }, { x: 174, y: 88 }, { x: 168, y: 78 },
      ]}},
      { boundary: { points: [
        { x: 238, y: 78 }, { x: 250, y: 72 }, { x: 254, y: 84 },
        { x: 250, y: 96 }, { x: 238, y: 98 }, { x: 235, y: 88 },
      ]}},
      { boundary: { points: [
        { x: 148, y: 270 }, { x: 160, y: 265 }, { x: 164, y: 278 },
        { x: 160, y: 292 }, { x: 148, y: 295 }, { x: 144, y: 282 },
      ]}},
      { boundary: { points: [
        { x: 240, y: 200 }, { x: 252, y: 195 }, { x: 256, y: 208 },
        { x: 252, y: 222 }, { x: 240, y: 224 }, { x: 236, y: 210 },
      ]}},
    ],
    trees: [
      { position: { x: 120, y: 90 }, radius: 14 },
      { position: { x: 110, y: 160 }, radius: 12 },
      { position: { x: 115, y: 230 }, radius: 15 },
      { position: { x: 125, y: 310 }, radius: 11 },
      { position: { x: 130, y: 390 }, radius: 13 },
      { position: { x: 120, y: 460 }, radius: 10 },
      { position: { x: 290, y: 100 }, radius: 14 },
      { position: { x: 285, y: 180 }, radius: 12 },
      { position: { x: 280, y: 260 }, radius: 16 },
      { position: { x: 275, y: 340 }, radius: 13 },
      { position: { x: 280, y: 420 }, radius: 11 },
      { position: { x: 270, y: 500 }, radius: 14 },
      { position: { x: 155, y: 40 }, radius: 12 },
      { position: { x: 265, y: 45 }, radius: 10 },
      { position: { x: 90, y: 400 }, radius: 13 },
      { position: { x: 330, y: 300 }, radius: 15 },
    ],
  },
];
