import type { HoleDefinition, CourseDefinition } from '../../domain/types';

/**
 * Black Jack's Crossing — 18-hole desert course.
 * Par 72 (4× par-3, 10× par-4, 4× par-5), ~6,170 yards.
 * courseTheme: 'desert' — rocks + boulders instead of trees/bushes.
 * Coordinate system: 400×600 SVG viewBox, Y increases downward.
 *
 * Standard layout: tee at bottom (y≈545), green at top (y≈65-80).
 * Exceptions: Hole 10 (reversed), Hole 16 (diagonal), Hole 18 (reversed).
 *
 * Per CHG-COURSE-010 through CHG-COURSE-020.
 */
const BJC_HOLES: HoleDefinition[] = [
  // ─── Hole 1 — "The Outpost" — Par 4, 385y ────────────────────────────────
  {
    id: 'bjc-hole-1-par4',
    name: 'The Outpost',
    par: 4,
    yardsLength: 385,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 180, y: 51 },
    pinPositions: [
      { x: 180, y: 51 },
      { x: 190, y: 79 },
      { x: 203, y: 62 },
      { x: 167, y: 69 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (185,65)
      points: [
        { x: 213, y: 65 }, { x: 209, y: 77 }, { x: 199, y: 85 },
        { x: 185, y: 88 }, { x: 171, y: 85 }, { x: 161, y: 77 },
        { x: 157, y: 65 }, { x: 161, y: 53 }, { x: 171, y: 45 },
        { x: 185, y: 42 }, { x: 199, y: 45 }, { x: 209, y: 53 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 137, y: 27 }, { x: 233, y: 27 },
        { x: 233, y: 103 },
        { x: 240, y: 215 }, { x: 240, y: 365 }, { x: 240, y: 515 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 130, y: 515 }, { x: 130, y: 365 }, { x: 130, y: 215 },
        { x: 137, y: 103 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 150, y: 38 }, { x: 158, y: 34 }, { x: 163, y: 42 },
        { x: 161, y: 52 }, { x: 153, y: 54 }, { x: 148, y: 46 },
      ] } },
      { boundary: { points: [
        { x: 210, y: 46 }, { x: 218, y: 42 }, { x: 223, y: 50 },
        { x: 221, y: 60 }, { x: 213, y: 62 }, { x: 208, y: 54 },
      ] } },
      { boundary: { points: [
        { x: 245, y: 280 }, { x: 255, y: 275 }, { x: 260, y: 285 },
        { x: 258, y: 298 }, { x: 250, y: 302 }, { x: 244, y: 292 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 35, y: 80 }, radius: 7 },
      { position: { x: 60, y: 155 }, radius: 5 },
      { position: { x: 82, y: 242 }, radius: 8 },
      { position: { x: 48, y: 330 }, radius: 6 },
      { position: { x: 72, y: 418 }, radius: 4 },
      { position: { x: 42, y: 505 }, radius: 9 },
      { position: { x: 362, y: 92 }, radius: 6 },
      { position: { x: 340, y: 173 }, radius: 8 },
      { position: { x: 368, y: 262 }, radius: 5 },
      { position: { x: 344, y: 352 }, radius: 7 },
      { position: { x: 362, y: 442 }, radius: 4 },
      { position: { x: 374, y: 522 }, radius: 6 },
      { position: { x: 350, y: 578 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 92, y: 198 }, { x: 107, y: 191 }, { x: 115, y: 202 },
        { x: 112, y: 218 }, { x: 100, y: 226 }, { x: 87, y: 215 },
      ] } },
      { boundary: { points: [
        { x: 292, y: 348 }, { x: 307, y: 341 }, { x: 317, y: 352 },
        { x: 315, y: 368 }, { x: 303, y: 375 }, { x: 288, y: 364 }, { x: 285, y: 354 },
      ] } },
    ],
  },

  // ─── Hole 2 — "Canyon Shot" — Par 3, 175y ────────────────────────────────
  {
    id: 'bjc-hole-2-par3',
    name: 'Canyon Shot',
    par: 3,
    yardsLength: 175,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 201, y: 59 },
    pinPositions: [
      { x: 201, y: 59 },
      { x: 209, y: 81 },
      { x: 219, y: 68 },
    ],
    greenBoundary: {
      // Par-3 oval 44×36px, centre (205,70)
      points: [
        { x: 227, y: 70 }, { x: 224, y: 79 }, { x: 216, y: 86 },
        { x: 205, y: 88 }, { x: 194, y: 86 }, { x: 186, y: 79 },
        { x: 183, y: 70 }, { x: 186, y: 61 }, { x: 194, y: 54 },
        { x: 205, y: 52 }, { x: 216, y: 54 }, { x: 224, y: 61 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 163, y: 37 }, { x: 247, y: 37 },
        { x: 247, y: 103 },
        { x: 253, y: 220 }, { x: 253, y: 370 }, { x: 253, y: 520 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 157, y: 520 }, { x: 157, y: 370 }, { x: 157, y: 220 },
        { x: 163, y: 103 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 178, y: 42 }, { x: 186, y: 38 }, { x: 191, y: 46 },
        { x: 188, y: 55 }, { x: 180, y: 57 }, { x: 175, y: 49 },
      ] } },
      { boundary: { points: [
        { x: 221, y: 52 }, { x: 229, y: 48 }, { x: 234, y: 56 },
        { x: 232, y: 66 }, { x: 224, y: 68 }, { x: 219, y: 60 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 38, y: 85 }, radius: 6 },
      { position: { x: 62, y: 160 }, radius: 4 },
      { position: { x: 85, y: 248 }, radius: 7 },
      { position: { x: 50, y: 335 }, radius: 5 },
      { position: { x: 74, y: 425 }, radius: 8 },
      { position: { x: 44, y: 510 }, radius: 6 },
      { position: { x: 358, y: 96 }, radius: 7 },
      { position: { x: 342, y: 178 }, radius: 5 },
      { position: { x: 365, y: 265 }, radius: 8 },
      { position: { x: 347, y: 356 }, radius: 6 },
      { position: { x: 360, y: 445 }, radius: 4 },
      { position: { x: 376, y: 526 }, radius: 7 },
      { position: { x: 352, y: 580 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 95, y: 310 }, { x: 110, y: 303 }, { x: 118, y: 314 },
        { x: 115, y: 330 }, { x: 103, y: 337 }, { x: 89, y: 326 },
      ] } },
      { boundary: { points: [
        { x: 288, y: 412 }, { x: 303, y: 405 }, { x: 313, y: 415 },
        { x: 311, y: 431 }, { x: 299, y: 439 }, { x: 284, y: 428 }, { x: 281, y: 418 },
      ] } },
    ],
  },

  // ─── Hole 3 — "Mesa Bend" — Par 4, 330y ──────────────────────────────────
  {
    id: 'bjc-hole-3-par4',
    name: 'Mesa Bend',
    par: 4,
    yardsLength: 330,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 190, y: 51 },
    pinPositions: [
      { x: 190, y: 51 },
      { x: 200, y: 79 },
      { x: 213, y: 62 },
      { x: 177, y: 69 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (195,65)
      points: [
        { x: 223, y: 65 }, { x: 219, y: 77 }, { x: 209, y: 85 },
        { x: 195, y: 88 }, { x: 181, y: 85 }, { x: 171, y: 77 },
        { x: 167, y: 65 }, { x: 171, y: 53 }, { x: 181, y: 45 },
        { x: 195, y: 42 }, { x: 209, y: 45 }, { x: 219, y: 53 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 147, y: 27 }, { x: 243, y: 27 },
        { x: 243, y: 103 },
        { x: 250, y: 215 }, { x: 250, y: 365 }, { x: 250, y: 515 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 140, y: 515 }, { x: 140, y: 365 }, { x: 140, y: 215 },
        { x: 147, y: 103 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 160, y: 38 }, { x: 168, y: 34 }, { x: 173, y: 42 },
        { x: 171, y: 52 }, { x: 163, y: 54 }, { x: 158, y: 46 },
      ] } },
      { boundary: { points: [
        { x: 218, y: 46 }, { x: 226, y: 42 }, { x: 231, y: 50 },
        { x: 229, y: 60 }, { x: 221, y: 62 }, { x: 216, y: 54 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 32, y: 90 }, radius: 8 },
      { position: { x: 58, y: 162 }, radius: 5 },
      { position: { x: 80, y: 252 }, radius: 7 },
      { position: { x: 44, y: 340 }, radius: 6 },
      { position: { x: 68, y: 428 }, radius: 9 },
      { position: { x: 38, y: 512 }, radius: 5 },
      { position: { x: 364, y: 88 }, radius: 7 },
      { position: { x: 348, y: 182 }, radius: 6 },
      { position: { x: 370, y: 268 }, radius: 4 },
      { position: { x: 346, y: 358 }, radius: 8 },
      { position: { x: 364, y: 448 }, radius: 5 },
      { position: { x: 372, y: 528 }, radius: 7 },
      { position: { x: 356, y: 575 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 88, y: 148 }, { x: 103, y: 141 }, { x: 111, y: 152 },
        { x: 108, y: 168 }, { x: 96, y: 175 }, { x: 82, y: 164 },
      ] } },
      { boundary: { points: [
        { x: 296, y: 295 }, { x: 311, y: 288 }, { x: 321, y: 299 },
        { x: 319, y: 315 }, { x: 307, y: 322 }, { x: 292, y: 311 }, { x: 289, y: 301 },
      ] } },
    ],
  },

  // ─── Hole 4 — "Rio Grande" — Par 5, 510y ─────────────────────────────────
  {
    id: 'bjc-hole-4-par5',
    name: 'Rio Grande',
    par: 5,
    yardsLength: 510,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 194, y: 57 },
    pinPositions: [
      { x: 194, y: 57 },
      { x: 206, y: 93 },
      { x: 222, y: 71 },
      { x: 178, y: 80 },
    ],
    greenBoundary: {
      // Par-5 oval 68×56px, centre (200,75)
      points: [
        { x: 234, y: 75 }, { x: 229, y: 89 }, { x: 217, y: 99 },
        { x: 200, y: 103 }, { x: 183, y: 99 }, { x: 171, y: 89 },
        { x: 166, y: 75 }, { x: 171, y: 61 }, { x: 183, y: 51 },
        { x: 200, y: 47 }, { x: 217, y: 51 }, { x: 229, y: 61 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 146, y: 32 }, { x: 254, y: 32 },
        { x: 254, y: 118 },
        { x: 262, y: 225 }, { x: 262, y: 355 }, { x: 262, y: 505 },
        { x: 240, y: 570 },
        { x: 160, y: 570 },
        { x: 138, y: 505 }, { x: 138, y: 355 }, { x: 138, y: 225 },
        { x: 146, y: 118 },
      ],
    },
    waterHazards: [{
      boundary: { points: [
        { x: 155, y: 155 }, { x: 245, y: 155 }, { x: 250, y: 185 },
        { x: 248, y: 220 }, { x: 245, y: 240 }, { x: 155, y: 240 },
        { x: 152, y: 215 }, { x: 150, y: 185 },
      ] },
      dropZone: { x: 200, y: 130 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 156, y: 50 }, { x: 164, y: 46 }, { x: 169, y: 54 },
        { x: 167, y: 64 }, { x: 159, y: 66 }, { x: 154, y: 58 },
      ] } },
      { boundary: { points: [
        { x: 233, y: 60 }, { x: 241, y: 56 }, { x: 246, y: 64 },
        { x: 244, y: 74 }, { x: 236, y: 76 }, { x: 231, y: 68 },
      ] } },
      { boundary: { points: [
        { x: 270, y: 390 }, { x: 280, y: 385 }, { x: 285, y: 395 },
        { x: 282, y: 408 }, { x: 274, y: 412 }, { x: 269, y: 402 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 30, y: 88 }, radius: 7 },
      { position: { x: 55, y: 165 }, radius: 5 },
      { position: { x: 78, y: 255 }, radius: 9 },
      { position: { x: 42, y: 342 }, radius: 6 },
      { position: { x: 66, y: 432 }, radius: 4 },
      { position: { x: 36, y: 515 }, radius: 8 },
      { position: { x: 366, y: 94 }, radius: 6 },
      { position: { x: 344, y: 176 }, radius: 9 },
      { position: { x: 370, y: 272 }, radius: 5 },
      { position: { x: 348, y: 358 }, radius: 7 },
      { position: { x: 366, y: 448 }, radius: 4 },
      { position: { x: 376, y: 528 }, radius: 6 },
      { position: { x: 354, y: 578 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 86, y: 265 }, { x: 101, y: 258 }, { x: 109, y: 269 },
        { x: 106, y: 285 }, { x: 94, y: 292 }, { x: 80, y: 281 },
      ] } },
      { boundary: { points: [
        { x: 295, y: 445 }, { x: 310, y: 438 }, { x: 320, y: 449 },
        { x: 318, y: 465 }, { x: 306, y: 472 }, { x: 291, y: 461 }, { x: 288, y: 451 },
      ] } },
    ],
  },

  // ─── Hole 5 — "Desert Wash" — Par 3, 140y ────────────────────────────────
  {
    id: 'bjc-hole-5-par3',
    name: 'Desert Wash',
    par: 3,
    yardsLength: 140,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 206, y: 59 },
    pinPositions: [
      { x: 206, y: 59 },
      { x: 214, y: 81 },
      { x: 224, y: 68 },
    ],
    greenBoundary: {
      // Par-3 oval 44×36px, centre (210,70)
      points: [
        { x: 232, y: 70 }, { x: 229, y: 79 }, { x: 221, y: 86 },
        { x: 210, y: 88 }, { x: 199, y: 86 }, { x: 191, y: 79 },
        { x: 188, y: 70 }, { x: 191, y: 61 }, { x: 199, y: 54 },
        { x: 210, y: 52 }, { x: 221, y: 54 }, { x: 229, y: 61 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 168, y: 37 }, { x: 252, y: 37 },
        { x: 252, y: 103 },
        { x: 258, y: 220 }, { x: 258, y: 370 }, { x: 258, y: 520 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 162, y: 520 }, { x: 162, y: 370 }, { x: 162, y: 220 },
        { x: 168, y: 103 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 183, y: 44 }, { x: 191, y: 40 }, { x: 196, y: 48 },
        { x: 194, y: 57 }, { x: 186, y: 59 }, { x: 181, y: 51 },
      ] } },
      { boundary: { points: [
        { x: 226, y: 52 }, { x: 234, y: 48 }, { x: 239, y: 56 },
        { x: 237, y: 65 }, { x: 229, y: 67 }, { x: 224, y: 59 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 40, y: 82 }, radius: 6 },
      { position: { x: 64, y: 158 }, radius: 8 },
      { position: { x: 86, y: 245 }, radius: 5 },
      { position: { x: 52, y: 334 }, radius: 7 },
      { position: { x: 76, y: 422 }, radius: 4 },
      { position: { x: 46, y: 508 }, radius: 9 },
      { position: { x: 356, y: 98 }, radius: 7 },
      { position: { x: 338, y: 185 }, radius: 5 },
      { position: { x: 362, y: 272 }, radius: 8 },
      { position: { x: 342, y: 362 }, radius: 6 },
      { position: { x: 358, y: 452 }, radius: 4 },
      { position: { x: 370, y: 530 }, radius: 7 },
      { position: { x: 348, y: 582 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 90, y: 402 }, { x: 105, y: 395 }, { x: 113, y: 406 },
        { x: 110, y: 422 }, { x: 98, y: 429 }, { x: 84, y: 418 },
      ] } },
      { boundary: { points: [
        { x: 284, y: 188 }, { x: 299, y: 181 }, { x: 309, y: 192 },
        { x: 307, y: 208 }, { x: 295, y: 215 }, { x: 280, y: 204 }, { x: 277, y: 194 },
      ] } },
    ],
  },

  // ─── Hole 6 — "Boulder Alley" — Par 4, 365y ──────────────────────────────
  {
    id: 'bjc-hole-6-par4',
    name: 'Boulder Alley',
    par: 4,
    yardsLength: 365,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 185, y: 51 },
    pinPositions: [
      { x: 185, y: 51 },
      { x: 195, y: 79 },
      { x: 208, y: 62 },
      { x: 172, y: 69 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (190,65)
      points: [
        { x: 218, y: 65 }, { x: 214, y: 77 }, { x: 204, y: 85 },
        { x: 190, y: 88 }, { x: 176, y: 85 }, { x: 166, y: 77 },
        { x: 162, y: 65 }, { x: 166, y: 53 }, { x: 176, y: 45 },
        { x: 190, y: 42 }, { x: 204, y: 45 }, { x: 214, y: 53 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 142, y: 27 }, { x: 238, y: 27 },
        { x: 238, y: 103 },
        { x: 245, y: 215 }, { x: 245, y: 365 }, { x: 245, y: 515 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 135, y: 515 }, { x: 135, y: 365 }, { x: 135, y: 215 },
        { x: 142, y: 103 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 155, y: 38 }, { x: 163, y: 34 }, { x: 168, y: 42 },
        { x: 166, y: 52 }, { x: 158, y: 54 }, { x: 153, y: 46 },
      ] } },
      { boundary: { points: [
        { x: 213, y: 48 }, { x: 221, y: 44 }, { x: 226, y: 52 },
        { x: 224, y: 62 }, { x: 216, y: 64 }, { x: 211, y: 56 },
      ] } },
      { boundary: { points: [
        { x: 120, y: 232 }, { x: 130, y: 227 }, { x: 135, y: 237 },
        { x: 132, y: 250 }, { x: 124, y: 254 }, { x: 119, y: 244 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 36, y: 86 }, radius: 7 },
      { position: { x: 60, y: 168 }, radius: 5 },
      { position: { x: 84, y: 252 }, radius: 8 },
      { position: { x: 48, y: 338 }, radius: 6 },
      { position: { x: 72, y: 428 }, radius: 4 },
      { position: { x: 40, y: 512 }, radius: 9 },
      { position: { x: 360, y: 96 }, radius: 6 },
      { position: { x: 336, y: 188 }, radius: 8 },
      { position: { x: 362, y: 278 }, radius: 5 },
      { position: { x: 340, y: 365 }, radius: 7 },
      { position: { x: 358, y: 455 }, radius: 4 },
      { position: { x: 372, y: 532 }, radius: 6 },
      { position: { x: 352, y: 578 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 94, y: 172 }, { x: 109, y: 165 }, { x: 117, y: 176 },
        { x: 114, y: 192 }, { x: 102, y: 199 }, { x: 88, y: 188 },
      ] } },
      { boundary: { points: [
        { x: 290, y: 388 }, { x: 305, y: 381 }, { x: 315, y: 392 },
        { x: 313, y: 408 }, { x: 301, y: 415 }, { x: 286, y: 404 }, { x: 283, y: 394 },
      ] } },
      { boundary: { points: [
        { x: 282, y: 148 }, { x: 297, y: 141 }, { x: 307, y: 152 },
        { x: 304, y: 168 }, { x: 292, y: 175 }, { x: 278, y: 162 },
      ] } },
    ],
  },

  // ─── Hole 7 — "The Valley" — Par 4, 370y ─────────────────────────────────
  {
    id: 'bjc-hole-7-par4',
    name: 'The Valley',
    par: 4,
    yardsLength: 370,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 195, y: 51 },
    pinPositions: [
      { x: 195, y: 51 },
      { x: 205, y: 79 },
      { x: 218, y: 62 },
      { x: 182, y: 69 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (200,65)
      points: [
        { x: 228, y: 65 }, { x: 224, y: 77 }, { x: 214, y: 85 },
        { x: 200, y: 88 }, { x: 186, y: 85 }, { x: 176, y: 77 },
        { x: 172, y: 65 }, { x: 176, y: 53 }, { x: 186, y: 45 },
        { x: 200, y: 42 }, { x: 214, y: 45 }, { x: 224, y: 53 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 152, y: 27 }, { x: 248, y: 27 },
        { x: 248, y: 103 },
        { x: 255, y: 215 }, { x: 255, y: 365 }, { x: 255, y: 515 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 145, y: 515 }, { x: 145, y: 365 }, { x: 145, y: 215 },
        { x: 152, y: 103 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 165, y: 38 }, { x: 173, y: 34 }, { x: 178, y: 42 },
        { x: 176, y: 52 }, { x: 168, y: 54 }, { x: 163, y: 46 },
      ] } },
      { boundary: { points: [
        { x: 222, y: 46 }, { x: 230, y: 42 }, { x: 235, y: 50 },
        { x: 233, y: 60 }, { x: 225, y: 62 }, { x: 220, y: 54 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 34, y: 92 }, radius: 8 },
      { position: { x: 58, y: 172 }, radius: 5 },
      { position: { x: 82, y: 258 }, radius: 7 },
      { position: { x: 46, y: 344 }, radius: 6 },
      { position: { x: 70, y: 432 }, radius: 4 },
      { position: { x: 38, y: 516 }, radius: 9 },
      { position: { x: 364, y: 100 }, radius: 6 },
      { position: { x: 342, y: 192 }, radius: 8 },
      { position: { x: 366, y: 280 }, radius: 5 },
      { position: { x: 346, y: 368 }, radius: 7 },
      { position: { x: 362, y: 458 }, radius: 4 },
      { position: { x: 374, y: 534 }, radius: 6 },
      { position: { x: 350, y: 579 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 96, y: 225 }, { x: 111, y: 218 }, { x: 119, y: 229 },
        { x: 116, y: 245 }, { x: 104, y: 252 }, { x: 90, y: 241 },
      ] } },
      { boundary: { points: [
        { x: 285, y: 468 }, { x: 300, y: 461 }, { x: 310, y: 472 },
        { x: 308, y: 488 }, { x: 296, y: 495 }, { x: 281, y: 484 }, { x: 278, y: 474 },
      ] } },
    ],
  },

  // ─── Hole 8 — "Big Bend" — Par 5, 540y ───────────────────────────────────
  {
    id: 'bjc-hole-8-par5',
    name: 'Big Bend',
    par: 5,
    yardsLength: 540,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 193, y: 57 },
    pinPositions: [
      { x: 193, y: 57 },
      { x: 207, y: 93 },
      { x: 222, y: 72 },
      { x: 177, y: 79 },
    ],
    greenBoundary: {
      // Par-5 oval 68×56px, centre (200,75)
      points: [
        { x: 234, y: 75 }, { x: 229, y: 89 }, { x: 217, y: 99 },
        { x: 200, y: 103 }, { x: 183, y: 99 }, { x: 171, y: 89 },
        { x: 166, y: 75 }, { x: 171, y: 61 }, { x: 183, y: 51 },
        { x: 200, y: 47 }, { x: 217, y: 51 }, { x: 229, y: 61 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 146, y: 32 }, { x: 254, y: 32 },
        { x: 254, y: 118 },
        { x: 262, y: 225 }, { x: 262, y: 355 }, { x: 262, y: 505 },
        { x: 240, y: 570 },
        { x: 160, y: 570 },
        { x: 138, y: 505 }, { x: 138, y: 355 }, { x: 138, y: 225 },
        { x: 146, y: 118 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 158, y: 52 }, { x: 166, y: 48 }, { x: 171, y: 56 },
        { x: 169, y: 66 }, { x: 161, y: 68 }, { x: 156, y: 60 },
      ] } },
      { boundary: { points: [
        { x: 231, y: 60 }, { x: 239, y: 56 }, { x: 244, y: 64 },
        { x: 242, y: 74 }, { x: 234, y: 76 }, { x: 229, y: 68 },
      ] } },
      { boundary: { points: [
        { x: 126, y: 420 }, { x: 136, y: 415 }, { x: 141, y: 425 },
        { x: 138, y: 438 }, { x: 130, y: 442 }, { x: 125, y: 432 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 28, y: 96 }, radius: 7 },
      { position: { x: 52, y: 178 }, radius: 5 },
      { position: { x: 76, y: 265 }, radius: 9 },
      { position: { x: 40, y: 352 }, radius: 6 },
      { position: { x: 64, y: 438 }, radius: 4 },
      { position: { x: 34, y: 520 }, radius: 8 },
      { position: { x: 368, y: 104 }, radius: 6 },
      { position: { x: 346, y: 196 }, radius: 9 },
      { position: { x: 372, y: 285 }, radius: 5 },
      { position: { x: 350, y: 372 }, radius: 7 },
      { position: { x: 368, y: 462 }, radius: 4 },
      { position: { x: 378, y: 540 }, radius: 6 },
      { position: { x: 356, y: 579 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 84, y: 322 }, { x: 99, y: 315 }, { x: 107, y: 326 },
        { x: 104, y: 342 }, { x: 92, y: 349 }, { x: 78, y: 338 },
      ] } },
      { boundary: { points: [
        { x: 294, y: 232 }, { x: 309, y: 225 }, { x: 319, y: 236 },
        { x: 317, y: 252 }, { x: 305, y: 259 }, { x: 290, y: 248 }, { x: 287, y: 238 },
      ] } },
    ],
  },

  // ─── Hole 9 — "The Ascent" — Par 4, 350y ─────────────────────────────────
  {
    id: 'bjc-hole-9-par4',
    name: 'The Ascent',
    par: 4,
    yardsLength: 350,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 193, y: 51 },
    pinPositions: [
      { x: 193, y: 51 },
      { x: 203, y: 79 },
      { x: 216, y: 62 },
      { x: 180, y: 69 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (198,65)
      points: [
        { x: 226, y: 65 }, { x: 222, y: 77 }, { x: 212, y: 85 },
        { x: 198, y: 88 }, { x: 184, y: 85 }, { x: 174, y: 77 },
        { x: 170, y: 65 }, { x: 174, y: 53 }, { x: 184, y: 45 },
        { x: 198, y: 42 }, { x: 212, y: 45 }, { x: 222, y: 53 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 150, y: 27 }, { x: 246, y: 27 },
        { x: 246, y: 103 },
        { x: 253, y: 215 }, { x: 253, y: 365 }, { x: 253, y: 515 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 143, y: 515 }, { x: 143, y: 365 }, { x: 143, y: 215 },
        { x: 150, y: 103 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 163, y: 38 }, { x: 171, y: 34 }, { x: 176, y: 42 },
        { x: 174, y: 52 }, { x: 166, y: 54 }, { x: 161, y: 46 },
      ] } },
      { boundary: { points: [
        { x: 220, y: 46 }, { x: 228, y: 42 }, { x: 233, y: 50 },
        { x: 231, y: 60 }, { x: 223, y: 62 }, { x: 218, y: 54 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 42, y: 88 }, radius: 8 },
      { position: { x: 66, y: 165 }, radius: 5 },
      { position: { x: 88, y: 255 }, radius: 7 },
      { position: { x: 54, y: 342 }, radius: 6 },
      { position: { x: 78, y: 430 }, radius: 4 },
      { position: { x: 48, y: 515 }, radius: 9 },
      { position: { x: 354, y: 102 }, radius: 6 },
      { position: { x: 332, y: 195 }, radius: 8 },
      { position: { x: 358, y: 285 }, radius: 5 },
      { position: { x: 336, y: 372 }, radius: 7 },
      { position: { x: 354, y: 462 }, radius: 4 },
      { position: { x: 366, y: 540 }, radius: 6 },
      { position: { x: 344, y: 578 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 98, y: 145 }, { x: 113, y: 138 }, { x: 121, y: 149 },
        { x: 118, y: 165 }, { x: 106, y: 172 }, { x: 92, y: 161 },
      ] } },
      { boundary: { points: [
        { x: 286, y: 498 }, { x: 301, y: 491 }, { x: 311, y: 502 },
        { x: 309, y: 518 }, { x: 297, y: 525 }, { x: 282, y: 514 }, { x: 279, y: 504 },
      ] } },
    ],
  },

  // ─── Hole 10 — "Mesa Top" — Par 4, 365y — REVERSED (tee top, green bottom) ─
  {
    id: 'bjc-hole-10-par4',
    name: 'Mesa Top',
    par: 4,
    yardsLength: 365,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 40 },
    pinPosition: { x: 195, y: 501 },
    pinPositions: [
      { x: 195, y: 501 },
      { x: 205, y: 529 },
      { x: 218, y: 512 },
      { x: 182, y: 518 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (200,515)
      points: [
        { x: 228, y: 515 }, { x: 224, y: 527 }, { x: 214, y: 535 },
        { x: 200, y: 538 }, { x: 186, y: 535 }, { x: 176, y: 527 },
        { x: 172, y: 515 }, { x: 176, y: 503 }, { x: 186, y: 495 },
        { x: 200, y: 492 }, { x: 214, y: 495 }, { x: 224, y: 503 },
      ],
    },
    fairwayBoundary: {
      // Goes from tee at top down to green at bottom
      points: [
        { x: 165, y: 20 }, { x: 235, y: 20 },
        { x: 245, y: 100 }, { x: 250, y: 250 }, { x: 252, y: 400 },
        { x: 252, y: 492 }, { x: 248, y: 550 },
        { x: 152, y: 550 }, { x: 148, y: 492 },
        { x: 148, y: 400 }, { x: 150, y: 250 }, { x: 155, y: 100 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 164, y: 500 }, { x: 172, y: 496 }, { x: 177, y: 504 },
        { x: 175, y: 514 }, { x: 167, y: 516 }, { x: 162, y: 508 },
      ] } },
      { boundary: { points: [
        { x: 225, y: 508 }, { x: 233, y: 504 }, { x: 238, y: 512 },
        { x: 236, y: 522 }, { x: 228, y: 524 }, { x: 223, y: 516 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 44, y: 68 }, radius: 7 },
      { position: { x: 68, y: 152 }, radius: 5 },
      { position: { x: 90, y: 238 }, radius: 8 },
      { position: { x: 56, y: 322 }, radius: 6 },
      { position: { x: 80, y: 408 }, radius: 4 },
      { position: { x: 50, y: 492 }, radius: 9 },
      { position: { x: 356, y: 75 }, radius: 6 },
      { position: { x: 334, y: 168 }, radius: 8 },
      { position: { x: 360, y: 255 }, radius: 5 },
      { position: { x: 338, y: 342 }, radius: 7 },
      { position: { x: 356, y: 428 }, radius: 4 },
      { position: { x: 368, y: 508 }, radius: 6 },
      { position: { x: 346, y: 560 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 100, y: 288 }, { x: 115, y: 281 }, { x: 123, y: 292 },
        { x: 120, y: 308 }, { x: 108, y: 315 }, { x: 94, y: 304 },
      ] } },
      { boundary: { points: [
        { x: 288, y: 358 }, { x: 303, y: 351 }, { x: 313, y: 362 },
        { x: 311, y: 378 }, { x: 299, y: 385 }, { x: 284, y: 374 }, { x: 281, y: 364 },
      ] } },
    ],
  },

  // ─── Hole 11 — "The Corridor" — Par 4, 365y ──────────────────────────────
  {
    id: 'bjc-hole-11-par4',
    name: 'The Corridor',
    par: 4,
    yardsLength: 365,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 197, y: 52 },
    pinPositions: [
      { x: 197, y: 52 },
      { x: 207, y: 80 },
      { x: 220, y: 63 },
      { x: 184, y: 70 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (202,66)
      points: [
        { x: 230, y: 66 }, { x: 226, y: 78 }, { x: 216, y: 86 },
        { x: 202, y: 89 }, { x: 188, y: 86 }, { x: 178, y: 78 },
        { x: 174, y: 66 }, { x: 178, y: 54 }, { x: 188, y: 46 },
        { x: 202, y: 43 }, { x: 216, y: 46 }, { x: 226, y: 54 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 154, y: 28 }, { x: 250, y: 28 },
        { x: 250, y: 104 },
        { x: 257, y: 216 }, { x: 257, y: 366 }, { x: 257, y: 516 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 147, y: 516 }, { x: 147, y: 366 }, { x: 147, y: 216 },
        { x: 154, y: 104 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 167, y: 38 }, { x: 175, y: 34 }, { x: 180, y: 42 },
        { x: 178, y: 52 }, { x: 170, y: 54 }, { x: 165, y: 46 },
      ] } },
      { boundary: { points: [
        { x: 224, y: 46 }, { x: 232, y: 42 }, { x: 237, y: 50 },
        { x: 235, y: 60 }, { x: 227, y: 62 }, { x: 222, y: 54 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 30, y: 94 }, radius: 7 },
      { position: { x: 54, y: 178 }, radius: 5 },
      { position: { x: 78, y: 265 }, radius: 8 },
      { position: { x: 42, y: 352 }, radius: 6 },
      { position: { x: 66, y: 438 }, radius: 4 },
      { position: { x: 36, y: 518 }, radius: 9 },
      { position: { x: 370, y: 106 }, radius: 6 },
      { position: { x: 348, y: 198 }, radius: 8 },
      { position: { x: 374, y: 288 }, radius: 5 },
      { position: { x: 352, y: 375 }, radius: 7 },
      { position: { x: 370, y: 462 }, radius: 4 },
      { position: { x: 380, y: 538 }, radius: 6 },
      { position: { x: 358, y: 578 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 86, y: 388 }, { x: 101, y: 381 }, { x: 109, y: 392 },
        { x: 106, y: 408 }, { x: 94, y: 415 }, { x: 80, y: 404 },
      ] } },
      { boundary: { points: [
        { x: 292, y: 275 }, { x: 307, y: 268 }, { x: 317, y: 279 },
        { x: 315, y: 295 }, { x: 303, y: 302 }, { x: 288, y: 291 }, { x: 285, y: 281 },
      ] } },
    ],
  },

  // ─── Hole 12 — "Shortcut" — Par 4, 300y ──────────────────────────────────
  {
    id: 'bjc-hole-12-par4',
    name: 'Shortcut',
    par: 4,
    yardsLength: 300,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 200, y: 54 },
    pinPositions: [
      { x: 200, y: 54 },
      { x: 210, y: 82 },
      { x: 223, y: 65 },
      { x: 187, y: 72 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (205,68)
      points: [
        { x: 233, y: 68 }, { x: 229, y: 80 }, { x: 219, y: 88 },
        { x: 205, y: 91 }, { x: 191, y: 88 }, { x: 181, y: 80 },
        { x: 177, y: 68 }, { x: 181, y: 56 }, { x: 191, y: 48 },
        { x: 205, y: 45 }, { x: 219, y: 48 }, { x: 229, y: 56 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 157, y: 30 }, { x: 253, y: 30 },
        { x: 253, y: 106 },
        { x: 260, y: 218 }, { x: 260, y: 368 }, { x: 260, y: 518 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 150, y: 518 }, { x: 150, y: 368 }, { x: 150, y: 218 },
        { x: 157, y: 106 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 170, y: 40 }, { x: 178, y: 36 }, { x: 183, y: 44 },
        { x: 181, y: 54 }, { x: 173, y: 56 }, { x: 168, y: 48 },
      ] } },
      { boundary: { points: [
        { x: 226, y: 50 }, { x: 234, y: 46 }, { x: 239, y: 54 },
        { x: 237, y: 64 }, { x: 229, y: 66 }, { x: 224, y: 58 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 46, y: 90 }, radius: 7 },
      { position: { x: 70, y: 168 }, radius: 5 },
      { position: { x: 92, y: 252 }, radius: 8 },
      { position: { x: 58, y: 338 }, radius: 6 },
      { position: { x: 82, y: 425 }, radius: 4 },
      { position: { x: 52, y: 508 }, radius: 9 },
      { position: { x: 352, y: 98 }, radius: 6 },
      { position: { x: 330, y: 190 }, radius: 8 },
      { position: { x: 356, y: 278 }, radius: 5 },
      { position: { x: 334, y: 365 }, radius: 7 },
      { position: { x: 352, y: 452 }, radius: 4 },
      { position: { x: 364, y: 528 }, radius: 6 },
      { position: { x: 342, y: 576 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 102, y: 208 }, { x: 117, y: 201 }, { x: 125, y: 212 },
        { x: 122, y: 228 }, { x: 110, y: 235 }, { x: 96, y: 224 },
      ] } },
      { boundary: { points: [
        { x: 280, y: 458 }, { x: 295, y: 451 }, { x: 305, y: 462 },
        { x: 303, y: 478 }, { x: 291, y: 485 }, { x: 276, y: 474 }, { x: 273, y: 464 },
      ] } },
    ],
  },

  // ─── Hole 13 — "The Wash" — Par 3, 140y ──────────────────────────────────
  {
    id: 'bjc-hole-13-par3',
    name: 'The Wash',
    par: 3,
    yardsLength: 140,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 191, y: 57 },
    pinPositions: [
      { x: 191, y: 57 },
      { x: 199, y: 79 },
      { x: 209, y: 66 },
    ],
    greenBoundary: {
      // Par-3 oval 44×36px, centre (195,68)
      points: [
        { x: 217, y: 68 }, { x: 214, y: 77 }, { x: 206, y: 84 },
        { x: 195, y: 86 }, { x: 184, y: 84 }, { x: 176, y: 77 },
        { x: 173, y: 68 }, { x: 176, y: 59 }, { x: 184, y: 52 },
        { x: 195, y: 50 }, { x: 206, y: 52 }, { x: 214, y: 59 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 153, y: 35 }, { x: 237, y: 35 },
        { x: 237, y: 101 },
        { x: 243, y: 218 }, { x: 243, y: 368 }, { x: 243, y: 518 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 147, y: 518 }, { x: 147, y: 368 }, { x: 147, y: 218 },
        { x: 153, y: 101 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 168, y: 42 }, { x: 176, y: 38 }, { x: 181, y: 46 },
        { x: 179, y: 55 }, { x: 171, y: 57 }, { x: 166, y: 49 },
      ] } },
      { boundary: { points: [
        { x: 210, y: 50 }, { x: 218, y: 46 }, { x: 223, y: 54 },
        { x: 221, y: 63 }, { x: 213, y: 65 }, { x: 208, y: 57 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 48, y: 94 }, radius: 6 },
      { position: { x: 72, y: 172 }, radius: 8 },
      { position: { x: 94, y: 258 }, radius: 5 },
      { position: { x: 60, y: 342 }, radius: 7 },
      { position: { x: 84, y: 428 }, radius: 4 },
      { position: { x: 54, y: 512 }, radius: 9 },
      { position: { x: 348, y: 102 }, radius: 6 },
      { position: { x: 326, y: 195 }, radius: 8 },
      { position: { x: 352, y: 282 }, radius: 5 },
      { position: { x: 330, y: 368 }, radius: 7 },
      { position: { x: 348, y: 455 }, radius: 4 },
      { position: { x: 360, y: 530 }, radius: 6 },
      { position: { x: 338, y: 577 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 104, y: 352 }, { x: 119, y: 345 }, { x: 127, y: 356 },
        { x: 124, y: 372 }, { x: 112, y: 379 }, { x: 98, y: 368 },
      ] } },
      { boundary: { points: [
        { x: 276, y: 222 }, { x: 291, y: 215 }, { x: 301, y: 226 },
        { x: 299, y: 242 }, { x: 287, y: 249 }, { x: 272, y: 238 }, { x: 269, y: 228 },
      ] } },
    ],
  },

  // ─── Hole 14 — "Cliff Turn" — Par 4, 340y ────────────────────────────────
  {
    id: 'bjc-hole-14-par4',
    name: 'Cliff Turn',
    par: 4,
    yardsLength: 340,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 187, y: 52 },
    pinPositions: [
      { x: 187, y: 52 },
      { x: 197, y: 80 },
      { x: 210, y: 63 },
      { x: 174, y: 70 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (192,66)
      points: [
        { x: 220, y: 66 }, { x: 216, y: 78 }, { x: 206, y: 86 },
        { x: 192, y: 89 }, { x: 178, y: 86 }, { x: 168, y: 78 },
        { x: 164, y: 66 }, { x: 168, y: 54 }, { x: 178, y: 46 },
        { x: 192, y: 43 }, { x: 206, y: 46 }, { x: 216, y: 54 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 144, y: 28 }, { x: 240, y: 28 },
        { x: 240, y: 104 },
        { x: 247, y: 216 }, { x: 247, y: 366 }, { x: 247, y: 516 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 137, y: 516 }, { x: 137, y: 366 }, { x: 137, y: 216 },
        { x: 144, y: 104 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 157, y: 38 }, { x: 165, y: 34 }, { x: 170, y: 42 },
        { x: 168, y: 52 }, { x: 160, y: 54 }, { x: 155, y: 46 },
      ] } },
      { boundary: { points: [
        { x: 215, y: 46 }, { x: 223, y: 42 }, { x: 228, y: 50 },
        { x: 226, y: 60 }, { x: 218, y: 62 }, { x: 213, y: 54 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 32, y: 100 }, radius: 7 },
      { position: { x: 56, y: 185 }, radius: 5 },
      { position: { x: 80, y: 272 }, radius: 8 },
      { position: { x: 44, y: 358 }, radius: 6 },
      { position: { x: 68, y: 445 }, radius: 4 },
      { position: { x: 38, y: 525 }, radius: 9 },
      { position: { x: 362, y: 108 }, radius: 6 },
      { position: { x: 340, y: 202 }, radius: 8 },
      { position: { x: 366, y: 292 }, radius: 5 },
      { position: { x: 344, y: 378 }, radius: 7 },
      { position: { x: 362, y: 465 }, radius: 4 },
      { position: { x: 374, y: 542 }, radius: 6 },
      { position: { x: 352, y: 578 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 90, y: 488 }, { x: 105, y: 481 }, { x: 113, y: 492 },
        { x: 110, y: 508 }, { x: 98, y: 515 }, { x: 84, y: 504 },
      ] } },
      { boundary: { points: [
        { x: 284, y: 328 }, { x: 299, y: 321 }, { x: 309, y: 332 },
        { x: 307, y: 348 }, { x: 295, y: 355 }, { x: 280, y: 344 }, { x: 277, y: 334 },
      ] } },
    ],
  },

  // ─── Hole 15 — "Long Haul" — Par 4, 410y ─────────────────────────────────
  {
    id: 'bjc-hole-15-par4',
    name: 'Long Haul',
    par: 4,
    yardsLength: 410,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 195, y: 50 },
    pinPositions: [
      { x: 195, y: 50 },
      { x: 205, y: 78 },
      { x: 218, y: 61 },
      { x: 182, y: 68 },
    ],
    greenBoundary: {
      // Par-4 oval 56×46px, centre (200,64)
      points: [
        { x: 228, y: 64 }, { x: 224, y: 76 }, { x: 214, y: 84 },
        { x: 200, y: 87 }, { x: 186, y: 84 }, { x: 176, y: 76 },
        { x: 172, y: 64 }, { x: 176, y: 52 }, { x: 186, y: 44 },
        { x: 200, y: 41 }, { x: 214, y: 44 }, { x: 224, y: 52 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 152, y: 26 }, { x: 248, y: 26 },
        { x: 248, y: 102 },
        { x: 255, y: 214 }, { x: 255, y: 364 }, { x: 255, y: 514 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 145, y: 514 }, { x: 145, y: 364 }, { x: 145, y: 214 },
        { x: 152, y: 102 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 165, y: 36 }, { x: 173, y: 32 }, { x: 178, y: 40 },
        { x: 176, y: 50 }, { x: 168, y: 52 }, { x: 163, y: 44 },
      ] } },
      { boundary: { points: [
        { x: 222, y: 44 }, { x: 230, y: 40 }, { x: 235, y: 48 },
        { x: 233, y: 58 }, { x: 225, y: 60 }, { x: 220, y: 52 },
      ] } },
      { boundary: { points: [
        { x: 140, y: 300 }, { x: 150, y: 295 }, { x: 155, y: 305 },
        { x: 152, y: 318 }, { x: 144, y: 322 }, { x: 139, y: 312 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 38, y: 96 }, radius: 8 },
      { position: { x: 62, y: 182 }, radius: 5 },
      { position: { x: 86, y: 268 }, radius: 7 },
      { position: { x: 50, y: 355 }, radius: 6 },
      { position: { x: 74, y: 442 }, radius: 4 },
      { position: { x: 44, y: 522 }, radius: 9 },
      { position: { x: 358, y: 110 }, radius: 6 },
      { position: { x: 336, y: 205 }, radius: 8 },
      { position: { x: 362, y: 295 }, radius: 5 },
      { position: { x: 340, y: 382 }, radius: 7 },
      { position: { x: 358, y: 468 }, radius: 4 },
      { position: { x: 370, y: 545 }, radius: 6 },
      { position: { x: 348, y: 579 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 92, y: 128 }, { x: 107, y: 121 }, { x: 115, y: 132 },
        { x: 112, y: 148 }, { x: 100, y: 155 }, { x: 86, y: 144 },
      ] } },
      { boundary: { points: [
        { x: 290, y: 415 }, { x: 305, y: 408 }, { x: 315, y: 419 },
        { x: 313, y: 435 }, { x: 301, y: 442 }, { x: 286, y: 431 }, { x: 283, y: 421 },
      ] } },
    ],
  },

  // ─── Hole 16 — "Three Canyons" — Par 5, 480y — DIAGONAL ──────────────────
  {
    id: 'bjc-hole-16-par5',
    name: 'Three Canyons',
    par: 5,
    yardsLength: 480,
    courseTheme: 'desert' as const,
    teePosition: { x: 60, y: 80 },
    pinPosition: { x: 329, y: 502 },
    pinPositions: [
      { x: 329, y: 502 },
      { x: 341, y: 538 },
      { x: 357, y: 516 },
      { x: 313, y: 524 },
    ],
    greenBoundary: {
      // Par-5 oval 68×56px, centre (335,520)
      points: [
        { x: 369, y: 520 }, { x: 364, y: 534 }, { x: 352, y: 544 },
        { x: 335, y: 548 }, { x: 318, y: 544 }, { x: 306, y: 534 },
        { x: 301, y: 520 }, { x: 306, y: 506 }, { x: 318, y: 496 },
        { x: 335, y: 492 }, { x: 352, y: 496 }, { x: 364, y: 506 },
      ],
    },
    fairwayBoundary: {
      // Diagonal corridor from top-left to bottom-right
      points: [
        { x: 20, y: 50 }, { x: 100, y: 50 },
        { x: 110, y: 130 }, { x: 160, y: 200 },
        { x: 210, y: 280 }, { x: 270, y: 360 },
        { x: 320, y: 430 }, { x: 380, y: 500 },
        { x: 390, y: 570 },
        { x: 280, y: 570 },
        { x: 260, y: 500 }, { x: 210, y: 440 },
        { x: 160, y: 360 }, { x: 110, y: 280 },
        { x: 70, y: 200 }, { x: 30, y: 130 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 296, y: 496 }, { x: 304, y: 492 }, { x: 309, y: 500 },
        { x: 307, y: 510 }, { x: 299, y: 512 }, { x: 294, y: 504 },
      ] } },
      { boundary: { points: [
        { x: 358, y: 504 }, { x: 366, y: 500 }, { x: 371, y: 508 },
        { x: 369, y: 518 }, { x: 361, y: 520 }, { x: 356, y: 512 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 14, y: 52 }, radius: 7 },
      { position: { x: 18, y: 120 }, radius: 5 },
      { position: { x: 22, y: 198 }, radius: 8 },
      { position: { x: 18, y: 278 }, radius: 6 },
      { position: { x: 16, y: 358 }, radius: 4 },
      { position: { x: 20, y: 438 }, radius: 9 },
      { position: { x: 385, y: 62 }, radius: 6 },
      { position: { x: 388, y: 142 }, radius: 8 },
      { position: { x: 385, y: 222 }, radius: 5 },
      { position: { x: 388, y: 302 }, radius: 7 },
      { position: { x: 385, y: 382 }, radius: 4 },
      { position: { x: 388, y: 462 }, radius: 6 },
      { position: { x: 385, y: 542 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 38, y: 165 }, { x: 53, y: 158 }, { x: 61, y: 169 },
        { x: 58, y: 185 }, { x: 46, y: 192 }, { x: 32, y: 181 },
      ] } },
      { boundary: { points: [
        { x: 232, y: 398 }, { x: 247, y: 391 }, { x: 257, y: 402 },
        { x: 255, y: 418 }, { x: 243, y: 425 }, { x: 228, y: 414 }, { x: 225, y: 404 },
      ] } },
    ],
  },

  // ─── Hole 17 — "The Crossing" — Par 3, 155y ──────────────────────────────
  {
    id: 'bjc-hole-17-par3',
    name: 'The Crossing',
    par: 3,
    yardsLength: 155,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 196, y: 57 },
    pinPositions: [
      { x: 196, y: 57 },
      { x: 204, y: 79 },
      { x: 214, y: 66 },
    ],
    greenBoundary: {
      // Par-3 oval 44×36px, centre (200,68)
      points: [
        { x: 222, y: 68 }, { x: 219, y: 77 }, { x: 211, y: 84 },
        { x: 200, y: 86 }, { x: 189, y: 84 }, { x: 181, y: 77 },
        { x: 178, y: 68 }, { x: 181, y: 59 }, { x: 189, y: 52 },
        { x: 200, y: 50 }, { x: 211, y: 52 }, { x: 219, y: 59 },
      ],
    },
    fairwayBoundary: {
      points: [
        { x: 158, y: 35 }, { x: 242, y: 35 },
        { x: 242, y: 101 },
        { x: 248, y: 218 }, { x: 248, y: 368 }, { x: 248, y: 518 },
        { x: 235, y: 570 },
        { x: 165, y: 570 },
        { x: 152, y: 518 }, { x: 152, y: 368 }, { x: 152, y: 218 },
        { x: 158, y: 101 },
      ],
    },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [
        { x: 173, y: 40 }, { x: 181, y: 36 }, { x: 186, y: 44 },
        { x: 184, y: 53 }, { x: 176, y: 55 }, { x: 171, y: 47 },
      ] } },
      { boundary: { points: [
        { x: 216, y: 50 }, { x: 224, y: 46 }, { x: 229, y: 54 },
        { x: 227, y: 63 }, { x: 219, y: 65 }, { x: 214, y: 57 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 50, y: 98 }, radius: 7 },
      { position: { x: 74, y: 178 }, radius: 5 },
      { position: { x: 96, y: 262 }, radius: 8 },
      { position: { x: 62, y: 348 }, radius: 6 },
      { position: { x: 86, y: 435 }, radius: 4 },
      { position: { x: 56, y: 518 }, radius: 9 },
      { position: { x: 346, y: 112 }, radius: 6 },
      { position: { x: 324, y: 208 }, radius: 8 },
      { position: { x: 350, y: 298 }, radius: 5 },
      { position: { x: 328, y: 385 }, radius: 7 },
      { position: { x: 346, y: 472 }, radius: 4 },
      { position: { x: 358, y: 548 }, radius: 6 },
      { position: { x: 336, y: 578 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 106, y: 448 }, { x: 121, y: 441 }, { x: 129, y: 452 },
        { x: 126, y: 468 }, { x: 114, y: 475 }, { x: 100, y: 464 },
      ] } },
      { boundary: { points: [
        { x: 278, y: 308 }, { x: 293, y: 301 }, { x: 303, y: 312 },
        { x: 301, y: 328 }, { x: 289, y: 335 }, { x: 274, y: 324 }, { x: 271, y: 314 },
      ] } },
    ],
  },

  // ─── Hole 18 — "Sunset Finish" — Par 5, 450y — REVERSED (tee top, water) ─
  {
    id: 'bjc-hole-18-par5',
    name: 'Sunset Finish',
    par: 5,
    yardsLength: 450,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 80 },
    pinPosition: { x: 194, y: 492 },
    pinPositions: [
      { x: 194, y: 492 },
      { x: 206, y: 528 },
      { x: 222, y: 506 },
      { x: 178, y: 514 },
    ],
    greenBoundary: {
      // Par-5 oval 68×56px, centre (200,510)
      points: [
        { x: 234, y: 510 }, { x: 229, y: 524 }, { x: 217, y: 534 },
        { x: 200, y: 538 }, { x: 183, y: 534 }, { x: 171, y: 524 },
        { x: 166, y: 510 }, { x: 171, y: 496 }, { x: 183, y: 486 },
        { x: 200, y: 482 }, { x: 217, y: 486 }, { x: 229, y: 496 },
      ],
    },
    fairwayBoundary: {
      // Goes from tee at top down to green at bottom; water occupies left side
      points: [
        { x: 165, y: 60 }, { x: 235, y: 60 },
        { x: 245, y: 140 }, { x: 250, y: 280 }, { x: 252, y: 420 },
        { x: 250, y: 466 }, { x: 248, y: 550 },
        { x: 160, y: 550 }, { x: 158, y: 466 },
        { x: 155, y: 420 }, { x: 152, y: 280 }, { x: 155, y: 140 },
      ],
    },
    waterHazards: [{
      boundary: { points: [
        { x: 80, y: 450 }, { x: 155, y: 450 }, { x: 160, y: 485 },
        { x: 158, y: 520 }, { x: 155, y: 540 }, { x: 80, y: 540 },
        { x: 75, y: 515 }, { x: 72, y: 480 },
      ] },
      dropZone: { x: 180, y: 490 },
    }],
    bunkers: [
      { boundary: { points: [
        { x: 233, y: 482 }, { x: 241, y: 478 }, { x: 246, y: 486 },
        { x: 244, y: 496 }, { x: 236, y: 498 }, { x: 231, y: 490 },
      ] } },
      { boundary: { points: [
        { x: 165, y: 488 }, { x: 173, y: 484 }, { x: 178, y: 492 },
        { x: 176, y: 502 }, { x: 168, y: 504 }, { x: 163, y: 496 },
      ] } },
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 54, y: 100 }, radius: 7 },
      { position: { x: 78, y: 185 }, radius: 5 },
      { position: { x: 100, y: 272 }, radius: 9 },
      { position: { x: 66, y: 358 }, radius: 6 },
      { position: { x: 90, y: 445 }, radius: 4 },
      { position: { x: 60, y: 530 }, radius: 8 },
      { position: { x: 342, y: 118 }, radius: 6 },
      { position: { x: 320, y: 212 }, radius: 9 },
      { position: { x: 346, y: 302 }, radius: 5 },
      { position: { x: 324, y: 388 }, radius: 7 },
      { position: { x: 342, y: 475 }, radius: 4 },
      { position: { x: 354, y: 552 }, radius: 6 },
      { position: { x: 332, y: 580 }, radius: 3 },
    ],
    boulders: [
      { boundary: { points: [
        { x: 108, y: 158 }, { x: 123, y: 151 }, { x: 131, y: 162 },
        { x: 128, y: 178 }, { x: 116, y: 185 }, { x: 102, y: 174 },
      ] } },
      { boundary: { points: [
        { x: 272, y: 395 }, { x: 287, y: 388 }, { x: 297, y: 399 },
        { x: 295, y: 415 }, { x: 283, y: 422 }, { x: 268, y: 411 }, { x: 265, y: 401 },
      ] } },
    ],
  },
];

export const BLACK_JACKS_CROSSING: CourseDefinition = {
  id: 'black-jacks-crossing',
  name: "Black Jack's Crossing",
  theme: 'desert',
  holes: BJC_HOLES,
};
