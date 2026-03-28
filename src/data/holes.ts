import type { HoleDefinition } from '../domain/types';

/**
 * Preset hole definitions — 18 unique holes (par 72).
 * Coordinate system: 0,0 is top-left. Y increases downward.
 * All holes are designed for a 400×600 SVG viewBox.
 * yardsLength represents the tee-to-pin distance in real yards.
 *
 * Par distribution: 4 par-3s, 10 par-4s, 4 par-5s.
 * Fairways wrap around greens so the green renders on top of contiguous turf.
 */
export const PRESET_HOLES: HoleDefinition[] = [
  // ─── Hole 1 — "The Welcome" — Par 4, 380y ───────────────────────────
  // Gentle dogleg right, wide and friendly. Water on the right side.
  {
    id: 'hole-1-par4',
    name: 'The Welcome',
    par: 4,
    yardsLength: 380,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 200, y: 60 },
    greenBoundary: {
      points: [
        { x: 185, y: 42 }, { x: 197, y: 38 }, { x: 210, y: 40 },
        { x: 220, y: 48 }, { x: 223, y: 60 }, { x: 220, y: 72 },
        { x: 212, y: 80 }, { x: 198, y: 83 }, { x: 185, y: 79 },
        { x: 178, y: 68 }, { x: 177, y: 54 }, { x: 180, y: 45 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Start above the green, wrap around it
        { x: 175, y: 30 }, { x: 230, y: 30 },
        { x: 235, y: 60 }, { x: 232, y: 90 },
        { x: 238, y: 140 }, { x: 248, y: 210 },
        { x: 252, y: 290 }, { x: 250, y: 370 },
        { x: 246, y: 440 }, { x: 240, y: 500 },
        { x: 232, y: 545 }, { x: 225, y: 575 },
        { x: 175, y: 575 }, { x: 168, y: 545 },
        { x: 160, y: 500 }, { x: 155, y: 440 },
        { x: 150, y: 370 }, { x: 148, y: 290 },
        { x: 152, y: 210 }, { x: 162, y: 140 },
        { x: 168, y: 90 }, { x: 165, y: 60 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 258, y: 160 }, { x: 300, y: 165 }, { x: 330, y: 185 },
          { x: 335, y: 220 }, { x: 320, y: 255 }, { x: 295, y: 275 },
          { x: 262, y: 268 }, { x: 250, y: 240 }, { x: 252, y: 195 },
        ],
      },
      dropZone: { x: 235, y: 200 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 165, y: 36 }, { x: 174, y: 32 }, { x: 178, y: 40 },
        { x: 175, y: 50 }, { x: 166, y: 50 }, { x: 162, y: 42 },
      ] } },
      { boundary: { points: [
        { x: 224, y: 48 }, { x: 234, y: 44 }, { x: 238, y: 54 },
        { x: 236, y: 66 }, { x: 226, y: 68 }, { x: 222, y: 56 },
      ] } },
      { boundary: { points: [
        { x: 143, y: 350 }, { x: 155, y: 345 }, { x: 158, y: 355 },
        { x: 155, y: 370 }, { x: 145, y: 372 }, { x: 140, y: 360 },
      ] } },
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
      { position: { x: 150, y: 25 }, radius: 10 },
      { position: { x: 255, y: 25 }, radius: 11 },
      { position: { x: 340, y: 140 }, radius: 15 },
      { position: { x: 345, y: 290 }, radius: 12 },
      { position: { x: 85, y: 330 }, radius: 13 },
      { position: { x: 90, y: 500 }, radius: 10 },
    ],
  },

  // ─── Hole 2 — "Island Green" — Par 3, 155y ─────────────────────────
  // TPC Sawgrass 17th inspired. Green completely surrounded by water.
  {
    id: 'hole-2-par3',
    name: 'Island Green',
    par: 3,
    yardsLength: 155,
    teePosition: { x: 200, y: 500 },
    pinPosition: { x: 200, y: 120 },
    greenBoundary: {
      points: [
        { x: 188, y: 98 }, { x: 202, y: 95 }, { x: 214, y: 100 },
        { x: 220, y: 110 }, { x: 222, y: 122 }, { x: 218, y: 134 },
        { x: 208, y: 142 }, { x: 195, y: 144 }, { x: 183, y: 138 },
        { x: 178, y: 126 }, { x: 179, y: 112 }, { x: 184, y: 102 },
      ],
    },
    fairwayBoundary: {
      // Tiny tee-area fairway only — the island green has no connecting fairway
      points: [
        { x: 175, y: 85 }, { x: 225, y: 85 },
        { x: 228, y: 120 }, { x: 225, y: 150 },
        { x: 222, y: 200 }, { x: 220, y: 280 },
        { x: 222, y: 380 }, { x: 224, y: 450 },
        { x: 220, y: 490 }, { x: 215, y: 515 },
        { x: 185, y: 515 }, { x: 180, y: 490 },
        { x: 178, y: 450 }, { x: 180, y: 380 },
        { x: 178, y: 280 }, { x: 175, y: 200 },
        { x: 172, y: 150 }, { x: 170, y: 120 },
      ],
    },
    waterHazards: [{
      // Large water body surrounding the island green
      boundary: {
        points: [
          { x: 110, y: 60 }, { x: 290, y: 60 }, { x: 310, y: 90 },
          { x: 315, y: 130 }, { x: 305, y: 170 }, { x: 280, y: 195 },
          { x: 225, y: 200 }, { x: 175, y: 200 },
          { x: 120, y: 195 }, { x: 95, y: 170 },
          { x: 88, y: 130 }, { x: 95, y: 90 },
        ],
      },
      dropZone: { x: 200, y: 210 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 215, y: 96 }, { x: 224, y: 94 }, { x: 227, y: 102 },
        { x: 224, y: 110 }, { x: 216, y: 112 }, { x: 213, y: 104 },
      ] } },
    ],
    trees: [
      { position: { x: 60, y: 70 }, radius: 14 },
      { position: { x: 340, y: 75 }, radius: 12 },
      { position: { x: 55, y: 180 }, radius: 10 },
      { position: { x: 345, y: 185 }, radius: 11 },
      { position: { x: 130, y: 260 }, radius: 13 },
      { position: { x: 270, y: 270 }, radius: 12 },
      { position: { x: 120, y: 350 }, radius: 15 },
      { position: { x: 280, y: 360 }, radius: 14 },
      { position: { x: 140, y: 440 }, radius: 11 },
      { position: { x: 260, y: 450 }, radius: 13 },
      { position: { x: 150, y: 510 }, radius: 10 },
      { position: { x: 250, y: 510 }, radius: 12 },
    ],
  },

  // ─── Hole 3 — "Azalea" — Par 5, 530y ─────────────────────────────
  // Augusta 13th inspired. Sharp dogleg left with creek along left / across front of green.
  {
    id: 'hole-3-par5',
    name: 'Azalea',
    par: 5,
    yardsLength: 530,
    teePosition: { x: 280, y: 560 },
    pinPosition: { x: 130, y: 70 },
    greenBoundary: {
      points: [
        { x: 115, y: 48 }, { x: 128, y: 44 }, { x: 142, y: 47 },
        { x: 152, y: 56 }, { x: 155, y: 68 }, { x: 150, y: 82 },
        { x: 140, y: 90 }, { x: 126, y: 93 }, { x: 113, y: 88 },
        { x: 106, y: 76 }, { x: 107, y: 62 }, { x: 110, y: 52 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Wrap above and around the green
        { x: 100, y: 35 }, { x: 160, y: 35 },
        { x: 165, y: 70 }, { x: 162, y: 100 },
        { x: 172, y: 145 }, { x: 190, y: 195 },
        { x: 215, y: 260 }, { x: 240, y: 320 },
        { x: 260, y: 380 }, { x: 275, y: 430 },
        { x: 288, y: 485 }, { x: 295, y: 535 },
        { x: 298, y: 575 }, { x: 262, y: 575 },
        { x: 258, y: 535 }, { x: 248, y: 475 },
        { x: 232, y: 410 }, { x: 210, y: 345 },
        { x: 185, y: 280 }, { x: 158, y: 220 },
        { x: 138, y: 165 }, { x: 110, y: 110 },
        { x: 95, y: 70 },
      ],
    },
    waterHazards: [
      {
        // Creek along the left side and in front of the green
        boundary: {
          points: [
            { x: 55, y: 40 }, { x: 100, y: 50 }, { x: 98, y: 95 },
            { x: 90, y: 130 }, { x: 80, y: 180 }, { x: 70, y: 250 },
            { x: 60, y: 320 }, { x: 45, y: 340 },
            { x: 30, y: 310 }, { x: 40, y: 230 },
            { x: 50, y: 160 }, { x: 55, y: 100 },
          ],
        },
        dropZone: { x: 125, y: 110 },
      },
    ],
    bunkers: [
      { boundary: { points: [
        { x: 95, y: 72 }, { x: 104, y: 68 }, { x: 107, y: 78 },
        { x: 103, y: 90 }, { x: 94, y: 92 }, { x: 90, y: 82 },
      ] } },
      { boundary: { points: [
        { x: 155, y: 55 }, { x: 165, y: 50 }, { x: 170, y: 60 },
        { x: 166, y: 72 }, { x: 156, y: 74 }, { x: 152, y: 64 },
      ] } },
      { boundary: { points: [
        { x: 228, y: 425 }, { x: 240, y: 420 }, { x: 244, y: 432 },
        { x: 240, y: 445 }, { x: 228, y: 448 }, { x: 224, y: 436 },
      ] } },
    ],
    trees: [
      // Dense trees on inside of dogleg (left side)
      { position: { x: 75, y: 140 }, radius: 14 },
      { position: { x: 85, y: 200 }, radius: 12 },
      { position: { x: 95, y: 265 }, radius: 15 },
      { position: { x: 110, y: 330 }, radius: 13 },
      { position: { x: 130, y: 390 }, radius: 11 },
      { position: { x: 155, y: 450 }, radius: 14 },
      { position: { x: 180, y: 510 }, radius: 10 },
      // Right side trees
      { position: { x: 320, y: 120 }, radius: 16 },
      { position: { x: 330, y: 210 }, radius: 13 },
      { position: { x: 340, y: 310 }, radius: 11 },
      { position: { x: 335, y: 400 }, radius: 14 },
      { position: { x: 325, y: 490 }, radius: 12 },
      { position: { x: 60, y: 370 }, radius: 13 },
      { position: { x: 50, y: 430 }, radius: 10 },
      { position: { x: 185, y: 35 }, radius: 11 },
      { position: { x: 70, y: 25 }, radius: 12 },
    ],
  },

  // ─── Hole 4 — "The Cape" — Par 4, 400y ───────────────────────────
  // Diagonal water from lower-left to upper-right. Risk-reward off the tee.
  {
    id: 'hole-4-par4',
    name: 'The Cape',
    par: 4,
    yardsLength: 400,
    teePosition: { x: 140, y: 560 },
    pinPosition: { x: 260, y: 65 },
    greenBoundary: {
      points: [
        { x: 244, y: 44 }, { x: 258, y: 42 }, { x: 272, y: 48 },
        { x: 280, y: 58 }, { x: 279, y: 72 }, { x: 272, y: 82 },
        { x: 258, y: 88 }, { x: 244, y: 86 }, { x: 236, y: 76 },
        { x: 234, y: 64 }, { x: 238, y: 52 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Wrap around the green from above
        { x: 228, y: 32 }, { x: 290, y: 32 },
        { x: 292, y: 65 }, { x: 288, y: 95 },
        { x: 285, y: 140 }, { x: 280, y: 200 },
        { x: 272, y: 270 }, { x: 260, y: 340 },
        { x: 240, y: 400 }, { x: 215, y: 455 },
        { x: 185, y: 510 }, { x: 165, y: 548 },
        { x: 155, y: 575 }, { x: 122, y: 575 },
        { x: 130, y: 540 }, { x: 148, y: 485 },
        { x: 170, y: 420 }, { x: 196, y: 355 },
        { x: 218, y: 290 }, { x: 238, y: 220 },
        { x: 250, y: 155 }, { x: 245, y: 95 },
        { x: 230, y: 65 },
      ],
    },
    waterHazards: [{
      // Diagonal water from lower-left to upper-right
      boundary: {
        points: [
          { x: 60, y: 450 }, { x: 130, y: 400 }, { x: 195, y: 340 },
          { x: 260, y: 270 }, { x: 310, y: 210 }, { x: 330, y: 180 },
          { x: 350, y: 195 }, { x: 335, y: 235 },
          { x: 285, y: 300 }, { x: 220, y: 370 },
          { x: 155, y: 430 }, { x: 85, y: 480 },
          { x: 55, y: 475 },
        ],
      },
      dropZone: { x: 210, y: 310 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 282, y: 62 }, { x: 292, y: 58 }, { x: 296, y: 68 },
        { x: 293, y: 80 }, { x: 283, y: 82 }, { x: 280, y: 72 },
      ] } },
      { boundary: { points: [
        { x: 290, y: 140 }, { x: 302, y: 135 }, { x: 306, y: 148 },
        { x: 302, y: 162 }, { x: 290, y: 165 }, { x: 286, y: 152 },
      ] } },
    ],
    trees: [
      { position: { x: 60, y: 80 }, radius: 14 },
      { position: { x: 50, y: 150 }, radius: 12 },
      { position: { x: 45, y: 230 }, radius: 15 },
      { position: { x: 55, y: 310 }, radius: 11 },
      { position: { x: 70, y: 380 }, radius: 13 },
      { position: { x: 350, y: 100 }, radius: 14 },
      { position: { x: 355, y: 260 }, radius: 10 },
      { position: { x: 340, y: 340 }, radius: 12 },
      { position: { x: 320, y: 420 }, radius: 16 },
      { position: { x: 300, y: 500 }, radius: 13 },
      { position: { x: 80, y: 530 }, radius: 11 },
      { position: { x: 200, y: 35 }, radius: 10 },
      { position: { x: 310, y: 45 }, radius: 12 },
      { position: { x: 100, y: 120 }, radius: 14 },
    ],
  },

  // ─── Hole 5 — "Postage Stamp" — Par 3, 135y ──────────────────────
  // Royal Troon inspired. Tiny green ringed by bunkers, no water.
  {
    id: 'hole-5-par3',
    name: 'Postage Stamp',
    par: 3,
    yardsLength: 135,
    teePosition: { x: 200, y: 480 },
    pinPosition: { x: 200, y: 130 },
    greenBoundary: {
      // Very small, tight green — kidney-shaped
      points: [
        { x: 191, y: 118 }, { x: 200, y: 115 }, { x: 210, y: 118 },
        { x: 215, y: 125 }, { x: 214, y: 134 }, { x: 210, y: 141 },
        { x: 202, y: 145 }, { x: 193, y: 143 }, { x: 187, y: 137 },
        { x: 185, y: 128 }, { x: 187, y: 122 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Wrap around the small green
        { x: 178, y: 105 }, { x: 222, y: 105 },
        { x: 226, y: 130 }, { x: 224, y: 155 },
        { x: 228, y: 200 }, { x: 232, y: 260 },
        { x: 234, y: 325 }, { x: 232, y: 385 },
        { x: 228, y: 435 }, { x: 222, y: 470 },
        { x: 215, y: 495 }, { x: 185, y: 495 },
        { x: 178, y: 470 }, { x: 172, y: 435 },
        { x: 168, y: 385 }, { x: 166, y: 325 },
        { x: 168, y: 260 }, { x: 172, y: 200 },
        { x: 176, y: 155 }, { x: 174, y: 130 },
      ],
    },
    waterHazards: [],
    bunkers: [
      // Ring of 5 bunkers surrounding the green
      { boundary: { points: [
        { x: 172, y: 112 }, { x: 182, y: 108 }, { x: 185, y: 118 },
        { x: 182, y: 126 }, { x: 174, y: 128 }, { x: 170, y: 120 },
      ] } },
      { boundary: { points: [
        { x: 216, y: 110 }, { x: 226, y: 108 }, { x: 230, y: 118 },
        { x: 228, y: 128 }, { x: 218, y: 130 }, { x: 214, y: 120 },
      ] } },
      { boundary: { points: [
        { x: 220, y: 138 }, { x: 230, y: 134 }, { x: 234, y: 144 },
        { x: 230, y: 154 }, { x: 222, y: 156 }, { x: 218, y: 146 },
      ] } },
      { boundary: { points: [
        { x: 170, y: 136 }, { x: 180, y: 132 }, { x: 184, y: 142 },
        { x: 180, y: 152 }, { x: 172, y: 154 }, { x: 168, y: 144 },
      ] } },
      { boundary: { points: [
        { x: 192, y: 148 }, { x: 204, y: 146 }, { x: 208, y: 154 },
        { x: 204, y: 162 }, { x: 194, y: 164 }, { x: 190, y: 156 },
      ] } },
    ],
    trees: [
      // Dense trees framing the hole
      { position: { x: 120, y: 90 }, radius: 16 },
      { position: { x: 105, y: 140 }, radius: 14 },
      { position: { x: 110, y: 200 }, radius: 12 },
      { position: { x: 100, y: 270 }, radius: 15 },
      { position: { x: 115, y: 340 }, radius: 11 },
      { position: { x: 120, y: 410 }, radius: 13 },
      { position: { x: 130, y: 470 }, radius: 10 },
      { position: { x: 280, y: 95 }, radius: 14 },
      { position: { x: 295, y: 145 }, radius: 12 },
      { position: { x: 290, y: 210 }, radius: 16 },
      { position: { x: 300, y: 280 }, radius: 13 },
      { position: { x: 285, y: 350 }, radius: 11 },
      { position: { x: 280, y: 420 }, radius: 14 },
      { position: { x: 270, y: 480 }, radius: 10 },
      { position: { x: 155, y: 65 }, radius: 13 },
      { position: { x: 245, y: 70 }, radius: 12 },
      { position: { x: 85, y: 400 }, radius: 15 },
      { position: { x: 320, y: 390 }, radius: 13 },
    ],
  },

  // ─── Hole 6 — "The Fork" — Par 4, 350y ───────────────────────────
  // Split fairway with two landing areas separated by bunker/rough complex.
  {
    id: 'hole-6-par4',
    name: 'The Fork',
    par: 4,
    yardsLength: 350,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 200, y: 70 },
    greenBoundary: {
      // Wide, undulating green
      points: [
        { x: 183, y: 50 }, { x: 195, y: 46 }, { x: 210, y: 48 },
        { x: 222, y: 55 }, { x: 225, y: 67 }, { x: 221, y: 80 },
        { x: 212, y: 88 }, { x: 197, y: 92 }, { x: 184, y: 88 },
        { x: 176, y: 78 }, { x: 175, y: 65 }, { x: 178, y: 55 },
      ],
    },
    fairwayBoundary: {
      // Two lobes that merge near the green and tee — the split is created by bunkers/trees in middle
      points: [
        // Wrap around the green
        { x: 168, y: 38 }, { x: 232, y: 38 },
        { x: 235, y: 70 }, { x: 232, y: 100 },
        // Right path widens
        { x: 270, y: 170 }, { x: 295, y: 250 },
        { x: 290, y: 340 }, { x: 275, y: 400 },
        { x: 255, y: 460 }, { x: 235, y: 510 },
        { x: 222, y: 560 }, { x: 215, y: 575 },
        { x: 185, y: 575 }, { x: 178, y: 560 },
        // Left path
        { x: 165, y: 510 }, { x: 145, y: 460 },
        { x: 125, y: 400 }, { x: 110, y: 340 },
        { x: 105, y: 250 }, { x: 130, y: 170 },
        { x: 168, y: 100 }, { x: 165, y: 70 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 88, y: 180 }, { x: 110, y: 170 }, { x: 108, y: 220 },
          { x: 100, y: 260 }, { x: 85, y: 275 }, { x: 70, y: 260 },
          { x: 68, y: 220 }, { x: 75, y: 190 },
        ],
      },
      dropZone: { x: 125, y: 220 },
    }],
    bunkers: [
      // Central dividing bunker complex (creates the fork)
      { boundary: { points: [
        { x: 185, y: 290 }, { x: 200, y: 280 }, { x: 215, y: 290 },
        { x: 218, y: 315 }, { x: 200, y: 330 }, { x: 182, y: 315 },
      ] } },
      { boundary: { points: [
        { x: 188, y: 345 }, { x: 205, y: 338 }, { x: 215, y: 348 },
        { x: 212, y: 370 }, { x: 198, y: 378 }, { x: 186, y: 365 },
      ] } },
      // Green-side bunkers
      { boundary: { points: [
        { x: 162, y: 60 }, { x: 172, y: 55 }, { x: 176, y: 64 },
        { x: 173, y: 76 }, { x: 164, y: 78 }, { x: 160, y: 68 },
      ] } },
      { boundary: { points: [
        { x: 226, y: 56 }, { x: 236, y: 52 }, { x: 240, y: 62 },
        { x: 237, y: 74 }, { x: 228, y: 76 }, { x: 224, y: 66 },
      ] } },
    ],
    trees: [
      // Central tree line reinforcing the split
      { position: { x: 195, y: 240 }, radius: 14 },
      { position: { x: 205, y: 260 }, radius: 12 },
      { position: { x: 200, y: 395 }, radius: 13 },
      { position: { x: 198, y: 420 }, radius: 11 },
      // Left edge
      { position: { x: 75, y: 130 }, radius: 15 },
      { position: { x: 65, y: 300 }, radius: 12 },
      { position: { x: 80, y: 430 }, radius: 14 },
      { position: { x: 100, y: 510 }, radius: 10 },
      // Right edge
      { position: { x: 325, y: 140 }, radius: 13 },
      { position: { x: 335, y: 280 }, radius: 16 },
      { position: { x: 320, y: 400 }, radius: 11 },
      { position: { x: 300, y: 500 }, radius: 14 },
      { position: { x: 150, y: 30 }, radius: 10 },
      { position: { x: 250, y: 28 }, radius: 12 },
    ],
  },

  // ─── Hole 7 — "Peninsula" — Par 5, 510y ──────────────────────────
  // Pebble Beach inspired. Green juts into water on three sides.
  {
    id: 'hole-7-par5',
    name: 'Peninsula',
    par: 5,
    yardsLength: 510,
    teePosition: { x: 120, y: 560 },
    pinPosition: { x: 280, y: 80 },
    greenBoundary: {
      // Peninsula green jutting right into water
      points: [
        { x: 265, y: 60 }, { x: 280, y: 56 }, { x: 294, y: 62 },
        { x: 302, y: 74 }, { x: 300, y: 88 }, { x: 292, y: 98 },
        { x: 278, y: 103 }, { x: 264, y: 100 }, { x: 255, y: 90 },
        { x: 252, y: 78 }, { x: 256, y: 66 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Wrap around the green from above
        { x: 245, y: 48 }, { x: 310, y: 48 },
        { x: 312, y: 80 }, { x: 308, y: 110 },
        { x: 295, y: 155 }, { x: 280, y: 210 },
        { x: 265, y: 275 }, { x: 245, y: 340 },
        { x: 220, y: 400 }, { x: 190, y: 455 },
        { x: 160, y: 505 }, { x: 140, y: 545 },
        { x: 135, y: 575 }, { x: 105, y: 575 },
        { x: 108, y: 545 }, { x: 120, y: 495 },
        { x: 145, y: 430 }, { x: 175, y: 365 },
        { x: 205, y: 300 }, { x: 230, y: 235 },
        { x: 248, y: 170 }, { x: 250, y: 115 },
        { x: 245, y: 80 },
      ],
    },
    waterHazards: [{
      // Water surrounding peninsula green on three sides (front, right, behind)
      boundary: {
        points: [
          { x: 260, y: 25 }, { x: 370, y: 30 }, { x: 380, y: 60 },
          { x: 375, y: 110 }, { x: 360, y: 150 }, { x: 330, y: 180 },
          { x: 300, y: 200 }, { x: 270, y: 210 },
          { x: 248, y: 180 }, { x: 242, y: 140 },
          { x: 238, y: 110 }, { x: 240, y: 50 },
        ],
      },
      dropZone: { x: 248, y: 130 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 242, y: 65 }, { x: 252, y: 60 }, { x: 256, y: 70 },
        { x: 252, y: 82 }, { x: 244, y: 84 }, { x: 240, y: 74 },
      ] } },
      { boundary: { points: [
        { x: 235, y: 340 }, { x: 248, y: 335 }, { x: 252, y: 348 },
        { x: 248, y: 362 }, { x: 236, y: 364 }, { x: 232, y: 350 },
      ] } },
    ],
    trees: [
      { position: { x: 60, y: 70 }, radius: 14 },
      { position: { x: 55, y: 150 }, radius: 12 },
      { position: { x: 65, y: 240 }, radius: 15 },
      { position: { x: 75, y: 330 }, radius: 11 },
      { position: { x: 80, y: 410 }, radius: 13 },
      { position: { x: 70, y: 490 }, radius: 14 },
      { position: { x: 345, y: 230 }, radius: 16 },
      { position: { x: 340, y: 320 }, radius: 13 },
      { position: { x: 335, y: 410 }, radius: 10 },
      { position: { x: 320, y: 490 }, radius: 12 },
      { position: { x: 200, y: 40 }, radius: 10 },
      { position: { x: 180, y: 530 }, radius: 11 },
      { position: { x: 280, y: 530 }, radius: 14 },
      { position: { x: 160, y: 260 }, radius: 12 },
    ],
  },

  // ─── Hole 8 — "The Bend" — Par 4, 390y ───────────────────────────
  // Sharp dogleg right. Bold players can carry over trees.
  {
    id: 'hole-8-par4',
    name: 'The Bend',
    par: 4,
    yardsLength: 390,
    teePosition: { x: 120, y: 560 },
    pinPosition: { x: 280, y: 70 },
    greenBoundary: {
      // Elongated green angled toward the dogleg
      points: [
        { x: 266, y: 50 }, { x: 280, y: 46 }, { x: 293, y: 52 },
        { x: 300, y: 64 }, { x: 298, y: 78 }, { x: 290, y: 88 },
        { x: 276, y: 93 }, { x: 264, y: 90 }, { x: 256, y: 80 },
        { x: 254, y: 66 }, { x: 258, y: 55 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Wrap around the green
        { x: 248, y: 38 }, { x: 308, y: 38 },
        { x: 310, y: 70 }, { x: 305, y: 100 },
        { x: 295, y: 150 }, { x: 280, y: 210 },
        // Dogleg bends right here
        { x: 260, y: 280 }, { x: 240, y: 340 },
        // Widens at landing area
        { x: 225, y: 380 }, { x: 210, y: 420 },
        { x: 185, y: 470 }, { x: 158, y: 515 },
        { x: 140, y: 548 }, { x: 135, y: 575 },
        { x: 105, y: 575 }, { x: 108, y: 548 },
        { x: 120, y: 500 }, { x: 140, y: 440 },
        { x: 165, y: 380 }, { x: 195, y: 310 },
        { x: 225, y: 240 }, { x: 245, y: 165 },
        { x: 252, y: 105 }, { x: 248, y: 70 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 310, y: 120 }, { x: 360, y: 130 }, { x: 370, y: 175 },
          { x: 360, y: 225 }, { x: 340, y: 260 }, { x: 305, y: 255 },
          { x: 300, y: 215 }, { x: 305, y: 165 },
        ],
      },
      dropZone: { x: 280, y: 180 },
    }],
    bunkers: [
      // Front-left bunker guarding green
      { boundary: { points: [
        { x: 245, y: 78 }, { x: 255, y: 74 }, { x: 258, y: 84 },
        { x: 254, y: 96 }, { x: 244, y: 98 }, { x: 242, y: 88 },
      ] } },
      { boundary: { points: [
        { x: 305, y: 64 }, { x: 316, y: 60 }, { x: 320, y: 70 },
        { x: 316, y: 82 }, { x: 306, y: 84 }, { x: 302, y: 74 },
      ] } },
      { boundary: { points: [
        { x: 168, y: 455 }, { x: 180, y: 450 }, { x: 184, y: 462 },
        { x: 180, y: 475 }, { x: 170, y: 478 }, { x: 166, y: 465 },
      ] } },
    ],
    trees: [
      // Trees blocking the corner (right side at the bend)
      { position: { x: 275, y: 310 }, radius: 16 },
      { position: { x: 290, y: 340 }, radius: 14 },
      { position: { x: 300, y: 370 }, radius: 12 },
      { position: { x: 310, y: 400 }, radius: 15 },
      { position: { x: 305, y: 440 }, radius: 13 },
      // Left side
      { position: { x: 70, y: 100 }, radius: 14 },
      { position: { x: 65, y: 200 }, radius: 12 },
      { position: { x: 75, y: 310 }, radius: 11 },
      { position: { x: 80, y: 420 }, radius: 13 },
      { position: { x: 70, y: 500 }, radius: 10 },
      // Far right
      { position: { x: 355, y: 310 }, radius: 11 },
      { position: { x: 350, y: 420 }, radius: 14 },
      { position: { x: 340, y: 500 }, radius: 12 },
      { position: { x: 210, y: 35 }, radius: 10 },
      { position: { x: 330, y: 50 }, radius: 13 },
    ],
  },

  // ─── Hole 9 — "The Drive" — Par 4, 315y ──────────────────────────
  // Short, driveable par 4. Risk/reward in purest form.
  {
    id: 'hole-9-par4',
    name: 'The Drive',
    par: 4,
    yardsLength: 315,
    teePosition: { x: 200, y: 530 },
    pinPosition: { x: 200, y: 90 },
    greenBoundary: {
      // Narrow, elongated green front-to-back
      points: [
        { x: 189, y: 68 }, { x: 200, y: 64 }, { x: 211, y: 68 },
        { x: 218, y: 78 }, { x: 219, y: 90 }, { x: 216, y: 102 },
        { x: 208, y: 110 }, { x: 196, y: 113 }, { x: 185, y: 108 },
        { x: 180, y: 96 }, { x: 181, y: 84 }, { x: 184, y: 74 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Wrap around the green
        { x: 174, y: 55 }, { x: 226, y: 55 },
        { x: 228, y: 90 }, { x: 226, y: 120 },
        { x: 230, y: 180 }, { x: 232, y: 250 },
        { x: 230, y: 320 }, { x: 226, y: 385 },
        { x: 220, y: 440 }, { x: 215, y: 490 },
        { x: 212, y: 530 }, { x: 208, y: 545 },
        { x: 192, y: 545 }, { x: 188, y: 530 },
        { x: 185, y: 490 }, { x: 180, y: 440 },
        { x: 174, y: 385 }, { x: 170, y: 320 },
        { x: 168, y: 250 }, { x: 170, y: 180 },
        { x: 174, y: 120 }, { x: 172, y: 90 },
      ],
    },
    waterHazards: [{
      // Water left of green and approach
      boundary: {
        points: [
          { x: 95, y: 60 }, { x: 170, y: 55 }, { x: 168, y: 100 },
          { x: 160, y: 140 }, { x: 145, y: 170 }, { x: 115, y: 180 },
          { x: 88, y: 165 }, { x: 80, y: 130 }, { x: 85, y: 90 },
        ],
      },
      dropZone: { x: 178, y: 130 },
    }],
    bunkers: [
      // Bunkers right of green
      { boundary: { points: [
        { x: 222, y: 72 }, { x: 234, y: 68 }, { x: 238, y: 78 },
        { x: 235, y: 92 }, { x: 224, y: 95 }, { x: 220, y: 84 },
      ] } },
      { boundary: { points: [
        { x: 228, y: 100 }, { x: 240, y: 96 }, { x: 244, y: 108 },
        { x: 240, y: 120 }, { x: 230, y: 122 }, { x: 226, y: 112 },
      ] } },
      // Lay-up bunker
      { boundary: { points: [
        { x: 185, y: 230 }, { x: 198, y: 225 }, { x: 202, y: 238 },
        { x: 198, y: 252 }, { x: 186, y: 254 }, { x: 182, y: 242 },
      ] } },
    ],
    trees: [
      { position: { x: 60, y: 85 }, radius: 14 },
      { position: { x: 55, y: 180 }, radius: 12 },
      { position: { x: 70, y: 280 }, radius: 15 },
      { position: { x: 80, y: 370 }, radius: 11 },
      { position: { x: 90, y: 450 }, radius: 13 },
      { position: { x: 310, y: 80 }, radius: 14 },
      { position: { x: 320, y: 170 }, radius: 12 },
      { position: { x: 305, y: 260 }, radius: 16 },
      { position: { x: 315, y: 350 }, radius: 10 },
      { position: { x: 300, y: 440 }, radius: 13 },
      { position: { x: 290, y: 510 }, radius: 11 },
      { position: { x: 110, y: 510 }, radius: 14 },
      { position: { x: 155, y: 40 }, radius: 10 },
      { position: { x: 245, y: 42 }, radius: 12 },
    ],
  },

  // ─── Hole 10 — "The Long Iron" — Par 3, 190y ─────────────────────
  // Long par 3. Water entire left side, bunkers right.
  {
    id: 'hole-10-par3',
    name: 'The Long Iron',
    par: 3,
    yardsLength: 190,
    teePosition: { x: 220, y: 520 },
    pinPosition: { x: 220, y: 100 },
    greenBoundary: {
      // Large, wide green — shallow but wide
      points: [
        { x: 200, y: 80 }, { x: 214, y: 76 }, { x: 230, y: 78 },
        { x: 242, y: 86 }, { x: 246, y: 98 }, { x: 242, y: 110 },
        { x: 232, y: 118 }, { x: 218, y: 122 }, { x: 204, y: 120 },
        { x: 194, y: 112 }, { x: 192, y: 100 }, { x: 195, y: 88 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Wrap around the large green
        { x: 185, y: 68 }, { x: 255, y: 68 },
        { x: 258, y: 100 }, { x: 255, y: 130 },
        { x: 258, y: 190 }, { x: 260, y: 260 },
        { x: 258, y: 335 }, { x: 255, y: 400 },
        { x: 250, y: 460 }, { x: 242, y: 510 },
        { x: 236, y: 535 }, { x: 204, y: 535 },
        { x: 198, y: 510 }, { x: 192, y: 460 },
        { x: 188, y: 400 }, { x: 186, y: 335 },
        { x: 184, y: 260 }, { x: 186, y: 190 },
        { x: 188, y: 130 }, { x: 185, y: 100 },
      ],
    },
    waterHazards: [{
      // Water along entire left side
      boundary: {
        points: [
          { x: 60, y: 65 }, { x: 185, y: 75 }, { x: 183, y: 130 },
          { x: 178, y: 210 }, { x: 175, y: 310 }, { x: 172, y: 420 },
          { x: 170, y: 500 }, { x: 80, y: 510 },
          { x: 50, y: 460 }, { x: 40, y: 350 },
          { x: 42, y: 240 }, { x: 48, y: 140 },
        ],
      },
      dropZone: { x: 200, y: 200 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 250, y: 82 }, { x: 262, y: 78 }, { x: 266, y: 90 },
        { x: 262, y: 104 }, { x: 252, y: 106 }, { x: 248, y: 94 },
      ] } },
      { boundary: { points: [
        { x: 255, y: 115 }, { x: 268, y: 110 }, { x: 272, y: 124 },
        { x: 268, y: 138 }, { x: 256, y: 140 }, { x: 252, y: 128 },
      ] } },
    ],
    trees: [
      { position: { x: 310, y: 70 }, radius: 14 },
      { position: { x: 320, y: 140 }, radius: 12 },
      { position: { x: 305, y: 220 }, radius: 15 },
      { position: { x: 315, y: 300 }, radius: 11 },
      { position: { x: 300, y: 380 }, radius: 13 },
      { position: { x: 310, y: 460 }, radius: 14 },
      { position: { x: 140, y: 80 }, radius: 12 },
      { position: { x: 120, y: 200 }, radius: 10 },
      { position: { x: 130, y: 340 }, radius: 16 },
      { position: { x: 125, y: 450 }, radius: 13 },
      { position: { x: 280, y: 510 }, radius: 11 },
      { position: { x: 160, y: 530 }, radius: 10 },
      { position: { x: 350, y: 250 }, radius: 14 },
      { position: { x: 345, y: 400 }, radius: 12 },
    ],
  },

  // ─── Hole 11 — "Creek Valley" — Par 5, 500y ──────────────────────
  // S-curve fairway winding through trees. Creek crosses mid-fairway.
  {
    id: 'hole-11-par5',
    name: 'Creek Valley',
    par: 5,
    yardsLength: 500,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 200, y: 65 },
    greenBoundary: {
      // Kidney-shaped green tilted right
      points: [
        { x: 186, y: 46 }, { x: 200, y: 42 }, { x: 215, y: 46 },
        { x: 224, y: 55 }, { x: 225, y: 68 }, { x: 219, y: 80 },
        { x: 208, y: 86 }, { x: 193, y: 85 }, { x: 182, y: 78 },
        { x: 177, y: 66 }, { x: 178, y: 54 },
      ],
    },
    fairwayBoundary: {
      // S-curve: starts center, bends right, bends left, back center at green
      points: [
        // Wrap around the green
        { x: 170, y: 32 }, { x: 235, y: 32 },
        { x: 238, y: 65 }, { x: 235, y: 95 },
        // Bend left toward green
        { x: 228, y: 145 }, { x: 218, y: 195 },
        // S-curve: now bends right
        { x: 240, y: 250 }, { x: 270, y: 310 },
        { x: 280, y: 365 },
        // Bends back left toward tee
        { x: 265, y: 420 }, { x: 240, y: 470 },
        { x: 225, y: 520 }, { x: 218, y: 555 },
        { x: 215, y: 575 }, { x: 185, y: 575 },
        { x: 182, y: 555 }, { x: 175, y: 520 },
        { x: 160, y: 470 }, { x: 135, y: 420 },
        // Mirror S from bottom
        { x: 120, y: 365 }, { x: 130, y: 310 },
        { x: 160, y: 250 }, { x: 182, y: 195 },
        { x: 172, y: 145 }, { x: 165, y: 95 },
      ],
    },
    waterHazards: [{
      // Creek crossing the fairway in the middle
      boundary: {
        points: [
          { x: 80, y: 290 }, { x: 145, y: 285 }, { x: 215, y: 295 },
          { x: 280, y: 305 }, { x: 330, y: 315 },
          { x: 332, y: 340 }, { x: 280, y: 335 },
          { x: 215, y: 325 }, { x: 145, y: 315 },
          { x: 80, y: 320 },
        ],
      },
      dropZone: { x: 200, y: 350 },
    }],
    bunkers: [
      // Front-right of green
      { boundary: { points: [
        { x: 228, y: 70 }, { x: 240, y: 66 }, { x: 244, y: 78 },
        { x: 240, y: 90 }, { x: 230, y: 92 }, { x: 226, y: 82 },
      ] } },
      { boundary: { points: [
        { x: 160, y: 55 }, { x: 172, y: 50 }, { x: 176, y: 60 },
        { x: 172, y: 72 }, { x: 162, y: 74 }, { x: 158, y: 64 },
      ] } },
      { boundary: { points: [
        { x: 270, y: 370 }, { x: 282, y: 365 }, { x: 286, y: 378 },
        { x: 282, y: 390 }, { x: 272, y: 392 }, { x: 268, y: 380 },
      ] } },
    ],
    trees: [
      // Dense trees along the S-curve edges
      { position: { x: 90, y: 100 }, radius: 14 },
      { position: { x: 80, y: 180 }, radius: 12 },
      { position: { x: 100, y: 260 }, radius: 15 },
      { position: { x: 85, y: 360 }, radius: 11 },
      { position: { x: 95, y: 440 }, radius: 13 },
      { position: { x: 110, y: 510 }, radius: 10 },
      { position: { x: 310, y: 110 }, radius: 14 },
      { position: { x: 320, y: 200 }, radius: 16 },
      { position: { x: 305, y: 350 }, radius: 13 },
      { position: { x: 315, y: 430 }, radius: 12 },
      { position: { x: 300, y: 510 }, radius: 11 },
      { position: { x: 145, y: 30 }, radius: 10 },
      { position: { x: 260, y: 25 }, radius: 12 },
      { position: { x: 340, y: 270 }, radius: 14 },
      { position: { x: 60, y: 450 }, radius: 13 },
      { position: { x: 350, y: 480 }, radius: 15 },
    ],
  },

  // ─── Hole 12 — "The Closer" — Par 4, 430y ────────────────────────
  // Long, demanding finisher. Water left side, semi-peninsula green.
  {
    id: 'hole-12-par4',
    name: 'The Closer',
    par: 4,
    yardsLength: 430,
    teePosition: { x: 220, y: 560 },
    pinPosition: { x: 180, y: 70 },
    greenBoundary: {
      // Semi-peninsula green — water wraps left and behind
      points: [
        { x: 165, y: 48 }, { x: 180, y: 44 }, { x: 196, y: 48 },
        { x: 206, y: 58 }, { x: 208, y: 72 }, { x: 203, y: 84 },
        { x: 192, y: 92 }, { x: 178, y: 94 }, { x: 164, y: 90 },
        { x: 156, y: 80 }, { x: 155, y: 66 }, { x: 158, y: 55 },
      ],
    },
    fairwayBoundary: {
      points: [
        // Wrap around the green
        { x: 148, y: 36 }, { x: 215, y: 36 },
        { x: 218, y: 70 }, { x: 215, y: 100 },
        { x: 222, y: 155 }, { x: 232, y: 220 },
        { x: 242, y: 295 }, { x: 248, y: 370 },
        { x: 250, y: 435 }, { x: 246, y: 495 },
        { x: 240, y: 545 }, { x: 235, y: 575 },
        { x: 205, y: 575 }, { x: 200, y: 545 },
        { x: 195, y: 495 }, { x: 192, y: 435 },
        { x: 190, y: 370 }, { x: 185, y: 295 },
        { x: 178, y: 220 }, { x: 168, y: 155 },
        { x: 155, y: 100 }, { x: 148, y: 70 },
      ],
    },
    waterHazards: [{
      // Water runs along left side from drive zone to behind green
      boundary: {
        points: [
          { x: 50, y: 30 }, { x: 148, y: 40 }, { x: 145, y: 95 },
          { x: 138, y: 160 }, { x: 130, y: 240 }, { x: 125, y: 330 },
          { x: 120, y: 420 }, { x: 118, y: 500 },
          { x: 50, y: 510 }, { x: 35, y: 430 },
          { x: 30, y: 330 }, { x: 32, y: 220 },
          { x: 38, y: 120 },
        ],
      },
      dropZone: { x: 175, y: 250 },
    }],
    bunkers: [
      // Bunkers on the right
      { boundary: { points: [
        { x: 212, y: 56 }, { x: 224, y: 52 }, { x: 228, y: 64 },
        { x: 224, y: 78 }, { x: 214, y: 80 }, { x: 210, y: 68 },
      ] } },
      { boundary: { points: [
        { x: 252, y: 280 }, { x: 264, y: 275 }, { x: 268, y: 288 },
        { x: 264, y: 302 }, { x: 252, y: 305 }, { x: 248, y: 292 },
      ] } },
      { boundary: { points: [
        { x: 255, y: 420 }, { x: 268, y: 415 }, { x: 272, y: 428 },
        { x: 268, y: 442 }, { x: 256, y: 444 }, { x: 252, y: 432 },
      ] } },
    ],
    trees: [
      // Dense trees on the right side
      { position: { x: 300, y: 80 }, radius: 14 },
      { position: { x: 310, y: 160 }, radius: 12 },
      { position: { x: 305, y: 250 }, radius: 15 },
      { position: { x: 315, y: 340 }, radius: 11 },
      { position: { x: 300, y: 430 }, radius: 13 },
      { position: { x: 310, y: 510 }, radius: 14 },
      { position: { x: 95, y: 90 }, radius: 12 },
      { position: { x: 85, y: 200 }, radius: 10 },
      { position: { x: 90, y: 330 }, radius: 16 },
      { position: { x: 80, y: 450 }, radius: 13 },
      { position: { x: 350, y: 140 }, radius: 11 },
      { position: { x: 340, y: 280 }, radius: 14 },
      { position: { x: 345, y: 400 }, radius: 10 },
      { position: { x: 330, y: 520 }, radius: 12 },
      { position: { x: 125, y: 30 }, radius: 10 },
      { position: { x: 240, y: 25 }, radius: 13 },
    ],
  },

  // ─── Hole 13 — "The Ridge" — Par 4, 405y ────────────────────────────
  // Elevated tee, fairway narrows at landing zone, bunkers guarding green.
  {
    id: 'hole-13-par4',
    name: 'The Ridge',
    par: 4,
    yardsLength: 405,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 190, y: 65 },
    greenBoundary: {
      points: [
        { x: 175, y: 47 }, { x: 188, y: 43 }, { x: 200, y: 44 },
        { x: 210, y: 50 }, { x: 213, y: 62 }, { x: 210, y: 75 },
        { x: 202, y: 83 }, { x: 188, y: 86 }, { x: 176, y: 80 },
        { x: 170, y: 68 }, { x: 170, y: 55 }, { x: 173, y: 49 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 162, y: 35 }, { x: 220, y: 35 },
        { x: 225, y: 65 }, { x: 222, y: 95 },
        { x: 230, y: 160 }, { x: 240, y: 230 },
        { x: 245, y: 300 }, { x: 238, y: 370 },
        { x: 232, y: 440 }, { x: 228, y: 500 },
        { x: 222, y: 550 }, { x: 218, y: 575 },
        { x: 182, y: 575 }, { x: 178, y: 550 },
        { x: 172, y: 500 }, { x: 168, y: 440 },
        { x: 162, y: 370 }, { x: 155, y: 300 },
        { x: 160, y: 230 }, { x: 170, y: 160 },
        { x: 178, y: 95 }, { x: 175, y: 65 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 160, y: 42 }, { x: 170, y: 38 }, { x: 174, y: 46 },
        { x: 171, y: 56 }, { x: 162, y: 56 }, { x: 158, y: 48 },
      ] } },
      { boundary: { points: [
        { x: 214, y: 52 }, { x: 224, y: 48 }, { x: 228, y: 58 },
        { x: 225, y: 68 }, { x: 216, y: 68 }, { x: 212, y: 58 },
      ] } },
      { boundary: { points: [
        { x: 245, y: 270 }, { x: 258, y: 265 }, { x: 262, y: 278 },
        { x: 258, y: 295 }, { x: 247, y: 298 }, { x: 242, y: 282 },
      ] } },
    ],
    trees: [
      { position: { x: 120, y: 100 }, radius: 14 },
      { position: { x: 110, y: 180 }, radius: 11 },
      { position: { x: 115, y: 270 }, radius: 13 },
      { position: { x: 105, y: 360 }, radius: 12 },
      { position: { x: 118, y: 450 }, radius: 10 },
      { position: { x: 280, y: 120 }, radius: 13 },
      { position: { x: 285, y: 210 }, radius: 11 },
      { position: { x: 290, y: 310 }, radius: 14 },
      { position: { x: 278, y: 400 }, radius: 12 },
      { position: { x: 282, y: 490 }, radius: 10 },
      { position: { x: 150, y: 28 }, radius: 11 },
      { position: { x: 235, y: 28 }, radius: 12 },
    ],
  },

  // ─── Hole 14 — "Cypress Point" — Par 3, 175y ───────────────────────
  // Coastal-inspired par 3 with water left, bunkers right.
  {
    id: 'hole-14-par3',
    name: 'Cypress Point',
    par: 3,
    yardsLength: 175,
    teePosition: { x: 200, y: 500 },
    pinPosition: { x: 210, y: 130 },
    greenBoundary: {
      points: [
        { x: 193, y: 112 }, { x: 206, y: 108 }, { x: 218, y: 110 },
        { x: 228, y: 118 }, { x: 232, y: 130 }, { x: 228, y: 143 },
        { x: 220, y: 152 }, { x: 207, y: 155 }, { x: 194, y: 150 },
        { x: 188, y: 140 }, { x: 187, y: 125 }, { x: 190, y: 115 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 180, y: 100 }, { x: 240, y: 100 },
        { x: 245, y: 130 }, { x: 242, y: 165 },
        { x: 238, y: 220 }, { x: 240, y: 290 },
        { x: 242, y: 360 }, { x: 240, y: 430 },
        { x: 235, y: 480 }, { x: 228, y: 520 },
        { x: 172, y: 520 }, { x: 165, y: 480 },
        { x: 160, y: 430 }, { x: 158, y: 360 },
        { x: 162, y: 290 }, { x: 165, y: 220 },
        { x: 160, y: 165 }, { x: 155, y: 130 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 50, y: 100 }, { x: 148, y: 105 }, { x: 145, y: 150 },
          { x: 140, y: 200 }, { x: 135, y: 260 }, { x: 132, y: 330 },
          { x: 50, y: 330 },
        ],
      },
      dropZone: { x: 175, y: 200 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 233, y: 115 }, { x: 244, y: 112 }, { x: 248, y: 122 },
        { x: 245, y: 135 }, { x: 236, y: 138 }, { x: 231, y: 125 },
      ] } },
      { boundary: { points: [
        { x: 235, y: 145 }, { x: 246, y: 142 }, { x: 250, y: 155 },
        { x: 246, y: 168 }, { x: 237, y: 168 }, { x: 233, y: 156 },
      ] } },
    ],
    trees: [
      { position: { x: 270, y: 90 }, radius: 14 },
      { position: { x: 280, y: 160 }, radius: 12 },
      { position: { x: 275, y: 240 }, radius: 13 },
      { position: { x: 270, y: 340 }, radius: 11 },
      { position: { x: 280, y: 420 }, radius: 14 },
      { position: { x: 268, y: 500 }, radius: 10 },
      { position: { x: 130, y: 380 }, radius: 12 },
      { position: { x: 125, y: 450 }, radius: 13 },
    ],
  },

  // ─── Hole 15 — "Eagle's Reach" — Par 5, 545y ──────────────────────
  // Wide fairway with risk/reward second shot over water to reach green in two.
  {
    id: 'hole-15-par5',
    name: "Eagle's Reach",
    par: 5,
    yardsLength: 545,
    teePosition: { x: 200, y: 565 },
    pinPosition: { x: 185, y: 55 },
    greenBoundary: {
      points: [
        { x: 168, y: 38 }, { x: 182, y: 33 }, { x: 196, y: 35 },
        { x: 206, y: 42 }, { x: 210, y: 55 }, { x: 206, y: 68 },
        { x: 198, y: 76 }, { x: 184, y: 79 }, { x: 170, y: 74 },
        { x: 163, y: 63 }, { x: 162, y: 50 }, { x: 165, y: 40 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 150, y: 25 }, { x: 218, y: 25 },
        { x: 225, y: 55 }, { x: 228, y: 90 },
        { x: 240, y: 150 }, { x: 258, y: 220 },
        { x: 265, y: 290 }, { x: 260, y: 350 },
        { x: 250, y: 400 }, { x: 245, y: 450 },
        { x: 238, y: 510 }, { x: 230, y: 555 },
        { x: 225, y: 580 }, { x: 175, y: 580 },
        { x: 170, y: 555 }, { x: 162, y: 510 },
        { x: 155, y: 450 }, { x: 150, y: 400 },
        { x: 142, y: 350 }, { x: 135, y: 290 },
        { x: 140, y: 220 }, { x: 152, y: 150 },
        { x: 160, y: 90 }, { x: 155, y: 55 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 268, y: 180 }, { x: 320, y: 175 }, { x: 345, y: 200 },
          { x: 350, y: 240 }, { x: 340, y: 280 }, { x: 310, y: 300 },
          { x: 270, y: 295 }, { x: 260, y: 260 }, { x: 265, y: 215 },
        ],
      },
      dropZone: { x: 245, y: 230 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 152, y: 34 }, { x: 162, y: 30 }, { x: 166, y: 38 },
        { x: 163, y: 48 }, { x: 154, y: 48 }, { x: 150, y: 40 },
      ] } },
      { boundary: { points: [
        { x: 208, y: 44 }, { x: 218, y: 40 }, { x: 222, y: 50 },
        { x: 218, y: 62 }, { x: 210, y: 62 }, { x: 206, y: 52 },
      ] } },
      { boundary: { points: [
        { x: 128, y: 370 }, { x: 142, y: 365 }, { x: 146, y: 378 },
        { x: 142, y: 392 }, { x: 130, y: 395 }, { x: 125, y: 380 },
      ] } },
    ],
    trees: [
      { position: { x: 100, y: 80 }, radius: 15 },
      { position: { x: 95, y: 170 }, radius: 12 },
      { position: { x: 90, y: 260 }, radius: 14 },
      { position: { x: 100, y: 350 }, radius: 11 },
      { position: { x: 110, y: 430 }, radius: 13 },
      { position: { x: 105, y: 520 }, radius: 10 },
      { position: { x: 300, y: 100 }, radius: 12 },
      { position: { x: 310, y: 340 }, radius: 14 },
      { position: { x: 295, y: 420 }, radius: 11 },
      { position: { x: 285, y: 500 }, radius: 13 },
      { position: { x: 355, y: 170 }, radius: 10 },
      { position: { x: 360, y: 310 }, radius: 12 },
    ],
  },

  // ─── Hole 16 — "The Narrows" — Par 4, 385y ─────────────────────────
  // Tight fairway lined with trees, premium on accuracy.
  {
    id: 'hole-16-par4',
    name: 'The Narrows',
    par: 4,
    yardsLength: 385,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 205, y: 70 },
    greenBoundary: {
      points: [
        { x: 190, y: 52 }, { x: 202, y: 48 }, { x: 214, y: 50 },
        { x: 222, y: 58 }, { x: 224, y: 70 }, { x: 221, y: 82 },
        { x: 213, y: 90 }, { x: 200, y: 93 }, { x: 188, y: 89 },
        { x: 182, y: 78 }, { x: 182, y: 64 }, { x: 186, y: 54 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 174, y: 40 }, { x: 232, y: 40 },
        { x: 234, y: 70 }, { x: 232, y: 100 },
        { x: 230, y: 160 }, { x: 228, y: 230 },
        { x: 230, y: 300 }, { x: 232, y: 370 },
        { x: 230, y: 440 }, { x: 228, y: 500 },
        { x: 224, y: 548 }, { x: 220, y: 575 },
        { x: 180, y: 575 }, { x: 176, y: 548 },
        { x: 172, y: 500 }, { x: 170, y: 440 },
        { x: 168, y: 370 }, { x: 170, y: 300 },
        { x: 172, y: 230 }, { x: 170, y: 160 },
        { x: 168, y: 100 }, { x: 166, y: 70 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 175, y: 48 }, { x: 185, y: 44 }, { x: 188, y: 52 },
        { x: 185, y: 60 }, { x: 176, y: 60 }, { x: 173, y: 54 },
      ] } },
      { boundary: { points: [
        { x: 225, y: 60 }, { x: 236, y: 56 }, { x: 240, y: 66 },
        { x: 236, y: 78 }, { x: 227, y: 78 }, { x: 223, y: 68 },
      ] } },
    ],
    trees: [
      { position: { x: 135, y: 60 }, radius: 14 },
      { position: { x: 130, y: 130 }, radius: 12 },
      { position: { x: 128, y: 200 }, radius: 15 },
      { position: { x: 132, y: 270 }, radius: 13 },
      { position: { x: 130, y: 340 }, radius: 14 },
      { position: { x: 128, y: 410 }, radius: 12 },
      { position: { x: 135, y: 480 }, radius: 11 },
      { position: { x: 265, y: 60 }, radius: 14 },
      { position: { x: 270, y: 130 }, radius: 12 },
      { position: { x: 272, y: 200 }, radius: 15 },
      { position: { x: 268, y: 270 }, radius: 13 },
      { position: { x: 270, y: 340 }, radius: 14 },
      { position: { x: 272, y: 410 }, radius: 12 },
      { position: { x: 265, y: 480 }, radius: 11 },
      { position: { x: 140, y: 30 }, radius: 10 },
      { position: { x: 260, y: 30 }, radius: 10 },
    ],
  },

  // ─── Hole 17 — "Amen Corner" — Par 4, 425y ─────────────────────────
  // Dogleg left with water hazard along the inside of the turn.
  {
    id: 'hole-17-par4',
    name: 'Amen Corner',
    par: 4,
    yardsLength: 425,
    teePosition: { x: 280, y: 560 },
    pinPosition: { x: 140, y: 65 },
    greenBoundary: {
      points: [
        { x: 124, y: 48 }, { x: 137, y: 43 }, { x: 150, y: 45 },
        { x: 160, y: 52 }, { x: 163, y: 65 }, { x: 159, y: 78 },
        { x: 150, y: 85 }, { x: 137, y: 88 }, { x: 125, y: 83 },
        { x: 118, y: 72 }, { x: 118, y: 58 }, { x: 121, y: 50 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 108, y: 36 }, { x: 170, y: 36 },
        { x: 175, y: 65 }, { x: 178, y: 100 },
        { x: 185, y: 155 }, { x: 200, y: 210 },
        { x: 220, y: 270 }, { x: 245, y: 330 },
        { x: 268, y: 380 }, { x: 285, y: 420 },
        { x: 300, y: 470 }, { x: 310, y: 520 },
        { x: 312, y: 555 }, { x: 308, y: 575 },
        { x: 252, y: 575 }, { x: 248, y: 555 },
        { x: 242, y: 520 }, { x: 232, y: 470 },
        { x: 218, y: 420 }, { x: 200, y: 380 },
        { x: 178, y: 330 }, { x: 158, y: 270 },
        { x: 142, y: 210 }, { x: 130, y: 155 },
        { x: 120, y: 100 }, { x: 115, y: 65 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 80, y: 140 }, { x: 125, y: 145 }, { x: 138, y: 200 },
          { x: 155, y: 260 }, { x: 175, y: 320 }, { x: 195, y: 380 },
          { x: 140, y: 395 }, { x: 118, y: 340 }, { x: 100, y: 275 },
          { x: 85, y: 210 },
        ],
      },
      dropZone: { x: 195, y: 260 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 108, y: 45 }, { x: 118, y: 40 }, { x: 122, y: 48 },
        { x: 119, y: 58 }, { x: 110, y: 58 }, { x: 106, y: 50 },
      ] } },
      { boundary: { points: [
        { x: 162, y: 55 }, { x: 172, y: 50 }, { x: 176, y: 60 },
        { x: 172, y: 72 }, { x: 164, y: 72 }, { x: 160, y: 62 },
      ] } },
    ],
    trees: [
      { position: { x: 80, y: 60 }, radius: 14 },
      { position: { x: 75, y: 110 }, radius: 12 },
      { position: { x: 340, y: 380 }, radius: 13 },
      { position: { x: 345, y: 460 }, radius: 11 },
      { position: { x: 335, y: 540 }, radius: 14 },
      { position: { x: 90, y: 420 }, radius: 10 },
      { position: { x: 100, y: 30 }, radius: 11 },
      { position: { x: 180, y: 28 }, radius: 12 },
    ],
  },

  // ─── Hole 18 — "The Finish Line" — Par 4, 450y ─────────────────────
  // Signature closing hole, long and challenging with bunkers and water.
  {
    id: 'hole-18-par4',
    name: 'The Finish Line',
    par: 4,
    yardsLength: 450,
    teePosition: { x: 200, y: 565 },
    pinPosition: { x: 195, y: 55 },
    greenBoundary: {
      points: [
        { x: 178, y: 38 }, { x: 192, y: 33 }, { x: 206, y: 35 },
        { x: 216, y: 42 }, { x: 220, y: 55 }, { x: 216, y: 68 },
        { x: 208, y: 76 }, { x: 194, y: 80 }, { x: 180, y: 75 },
        { x: 173, y: 64 }, { x: 172, y: 50 }, { x: 175, y: 40 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 162, y: 26 }, { x: 228, y: 26 },
        { x: 235, y: 55 }, { x: 238, y: 90 },
        { x: 248, y: 160 }, { x: 255, y: 230 },
        { x: 258, y: 300 }, { x: 252, y: 370 },
        { x: 245, y: 440 }, { x: 238, y: 500 },
        { x: 230, y: 548 }, { x: 225, y: 580 },
        { x: 175, y: 580 }, { x: 170, y: 548 },
        { x: 162, y: 500 }, { x: 155, y: 440 },
        { x: 148, y: 370 }, { x: 142, y: 300 },
        { x: 145, y: 230 }, { x: 152, y: 160 },
        { x: 162, y: 90 }, { x: 165, y: 55 },
      ],
    },
    waterHazards: [{
      boundary: {
        points: [
          { x: 260, y: 130 }, { x: 310, y: 125 }, { x: 340, y: 150 },
          { x: 348, y: 190 }, { x: 338, y: 230 }, { x: 310, y: 250 },
          { x: 268, y: 245 }, { x: 255, y: 210 }, { x: 258, y: 165 },
        ],
      },
      dropZone: { x: 240, y: 180 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 164, y: 34 }, { x: 174, y: 30 }, { x: 178, y: 38 },
        { x: 175, y: 48 }, { x: 166, y: 48 }, { x: 162, y: 40 },
      ] } },
      { boundary: { points: [
        { x: 218, y: 42 }, { x: 228, y: 38 }, { x: 232, y: 48 },
        { x: 228, y: 60 }, { x: 220, y: 60 }, { x: 216, y: 50 },
      ] } },
      { boundary: { points: [
        { x: 135, y: 340 }, { x: 148, y: 335 }, { x: 152, y: 348 },
        { x: 148, y: 362 }, { x: 137, y: 365 }, { x: 132, y: 350 },
      ] } },
      { boundary: { points: [
        { x: 255, y: 375 }, { x: 268, y: 370 }, { x: 272, y: 383 },
        { x: 268, y: 398 }, { x: 257, y: 400 }, { x: 252, y: 385 },
      ] } },
    ],
    trees: [
      { position: { x: 105, y: 80 }, radius: 14 },
      { position: { x: 100, y: 170 }, radius: 12 },
      { position: { x: 95, y: 260 }, radius: 13 },
      { position: { x: 108, y: 350 }, radius: 11 },
      { position: { x: 115, y: 440 }, radius: 14 },
      { position: { x: 110, y: 530 }, radius: 10 },
      { position: { x: 295, y: 80 }, radius: 12 },
      { position: { x: 300, y: 300 }, radius: 14 },
      { position: { x: 290, y: 430 }, radius: 11 },
      { position: { x: 285, y: 520 }, radius: 13 },
      { position: { x: 350, y: 120 }, radius: 10 },
      { position: { x: 355, y: 260 }, radius: 12 },
      { position: { x: 148, y: 25 }, radius: 10 },
      { position: { x: 242, y: 22 }, radius: 11 },
    ],
  },
];
