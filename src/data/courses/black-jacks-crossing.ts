import type { HoleDefinition, CourseDefinition } from '../../domain/types';

/**
 * Black Jack's Crossing — 18-hole desert course (par 72).
 * Inspired by the real Black Jack's Crossing at Lajitas Golf Resort, Lajitas TX.
 * Designed by Lanny Wadkins. Set in the Chihuahuan Desert above the Rio Grande.
 *
 * Par distribution: 4 par-3s, 10 par-4s, 4 par-5s = Par 72.
 * Total yardage: 6,170 yards.
 *
 * Desert theme: sandy rough, rocks, boulders/cliffs. Fairways and greens
 * remain green (irrigated desert course aesthetic).
 */
const BLACK_JACKS_CROSSING_HOLES: HoleDefinition[] = [
  // ─── The Outpost — Par 4, 385y ────────────────────────────────
  {
    id: 'bjc-hole-1-par4',
    name: 'The Outpost',
    par: 4,
    yardsLength: 385,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 555 },
    pinPosition: { x: 200, y: 68 },
    pinPositions: [{ x: 200, y: 68 }, { x: 221, y: 79 }, { x: 183, y: 83 }],
    greenBoundary: {
          points: [
            { x: 200, y: 51 },
          { x: 218, y: 56 },
          { x: 229, y: 68 },
          { x: 229, y: 84 },
          { x: 218, y: 96 },
          { x: 200, y: 101 },
          { x: 182, y: 96 },
          { x: 171, y: 84 },
          { x: 171, y: 68 },
          { x: 182, y: 56 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 148, y: 578 },
          { x: 252, y: 578 },
          { x: 255, y: 42 },
          { x: 145, y: 42 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 180, y: 49 }, { x: 190, y: 52 }, { x: 194, y: 58 }, { x: 190, y: 64 }, { x: 180, y: 67 }, { x: 170, y: 64 }, { x: 166, y: 58 }, { x: 170, y: 52 }] } },
      { boundary: { points: [{ x: 222, y: 53 }, { x: 232, y: 56 }, { x: 236, y: 62 }, { x: 232, y: 68 }, { x: 222, y: 71 }, { x: 212, y: 68 }, { x: 208, y: 62 }, { x: 212, y: 56 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 60, y: 150 }, radius: 5 },
      { position: { x: 45, y: 220 }, radius: 7 },
      { position: { x: 80, y: 310 }, radius: 4 },
      { position: { x: 55, y: 380 }, radius: 6 },
      { position: { x: 90, y: 450 }, radius: 5 },
      { position: { x: 40, y: 500 }, radius: 8 },
      { position: { x: 70, y: 530 }, radius: 4 },
      { position: { x: 30, y: 480 }, radius: 6 },
      { position: { x: 320, y: 180 }, radius: 5 },
      { position: { x: 360, y: 250 }, radius: 7 },
      { position: { x: 340, y: 340 }, radius: 4 },
      { position: { x: 380, y: 420 }, radius: 6 },
      { position: { x: 355, y: 490 }, radius: 5 },
      { position: { x: 330, y: 540 }, radius: 7 },
      { position: { x: 310, y: 490 }, radius: 4 },
      { position: { x: 375, y: 380 }, radius: 8 },
      { position: { x: 345, y: 560 }, radius: 5 },
      { position: { x: 60, y: 100 }, radius: 6 }
    ],
    boulders: [
      { boundary: { points: [{ x: 305, y: 283 }, { x: 323, y: 290 }, { x: 333, y: 305 }, { x: 323, y: 323 }, { x: 305, y: 330 }, { x: 290, y: 323 }, { x: 283, y: 305 }, { x: 290, y: 287 }] } },
      { boundary: { points: [{ x: 330, y: 367 }, { x: 344, y: 373 }, { x: 352, y: 385 }, { x: 344, y: 399 }, { x: 330, y: 405 }, { x: 316, y: 399 }, { x: 310, y: 385 }, { x: 316, y: 373 }] } },
      { boundary: { points: [{ x: 360, y: 170 }, { x: 382, y: 180 }, { x: 398, y: 200 }, { x: 385, y: 222 }, { x: 360, y: 235 }, { x: 338, y: 222 }, { x: 325, y: 200 }, { x: 338, y: 180 }] } },
      { boundary: { points: [{ x: 345, y: 436 }, { x: 357, y: 440 }, { x: 363, y: 450 }, { x: 357, y: 462 }, { x: 345, y: 468 }, { x: 333, y: 462 }, { x: 327, y: 450 }, { x: 333, y: 440 }] } },
      { boundary: { points: [{ x: 370, y: 254 }, { x: 383, y: 259 }, { x: 390, y: 270 }, { x: 383, y: 283 }, { x: 370, y: 290 }, { x: 357, y: 283 }, { x: 350, y: 270 }, { x: 357, y: 259 }] } }
    ],
  },
  // ─── Canyon Shot — Par 3, 175y ────────────────────────────────
  {
    id: 'bjc-hole-2-par3',
    name: 'Canyon Shot',
    par: 3,
    yardsLength: 175,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 555 },
    pinPosition: { x: 200, y: 74 },
    pinPositions: [{ x: 200, y: 74 }, { x: 214, y: 85 }, { x: 187, y: 88 }],
    greenBoundary: {
          points: [
            { x: 200, y: 62 },
          { x: 214, y: 66 },
          { x: 222, y: 76 },
          { x: 222, y: 88 },
          { x: 214, y: 98 },
          { x: 200, y: 102 },
          { x: 186, y: 98 },
          { x: 178, y: 88 },
          { x: 178, y: 76 },
          { x: 186, y: 66 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 165, y: 575 },
          { x: 235, y: 575 },
          { x: 238, y: 48 },
          { x: 162, y: 48 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 180, y: 86 }, { x: 188, y: 88 }, { x: 192, y: 94 }, { x: 188, y: 100 }, { x: 180, y: 102 }, { x: 172, y: 100 }, { x: 168, y: 94 }, { x: 172, y: 88 }] } },
      { boundary: { points: [{ x: 222, y: 87 }, { x: 231, y: 89 }, { x: 235, y: 95 }, { x: 231, y: 101 }, { x: 222, y: 103 }, { x: 213, y: 101 }, { x: 209, y: 95 }, { x: 213, y: 89 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 50, y: 200 }, radius: 5 },
      { position: { x: 35, y: 270 }, radius: 7 },
      { position: { x: 70, y: 350 }, radius: 4 },
      { position: { x: 45, y: 430 }, radius: 6 },
      { position: { x: 55, y: 310 }, radius: 5 },
      { position: { x: 40, y: 480 }, radius: 4 },
      { position: { x: 75, y: 510 }, radius: 6 },
      { position: { x: 30, y: 380 }, radius: 8 },
      { position: { x: 350, y: 210 }, radius: 6 },
      { position: { x: 365, y: 280 }, radius: 4 },
      { position: { x: 340, y: 360 }, radius: 7 },
      { position: { x: 360, y: 440 }, radius: 5 },
      { position: { x: 350, y: 500 }, radius: 6 },
      { position: { x: 380, y: 330 }, radius: 4 },
      { position: { x: 320, y: 480 }, radius: 5 },
      { position: { x: 345, y: 550 }, radius: 7 },
      { position: { x: 130, y: 280 }, radius: 4 },
      { position: { x: 275, y: 260 }, radius: 5 }
    ],
    boulders: [
      { boundary: { points: [{ x: 85, y: 202 }, { x: 105, y: 212 }, { x: 115, y: 230 }, { x: 105, y: 255 }, { x: 85, y: 265 }, { x: 65, y: 255 }, { x: 55, y: 230 }, { x: 65, y: 212 }] } },
      { boundary: { points: [{ x: 65, y: 306 }, { x: 83, y: 314 }, { x: 91, y: 330 }, { x: 83, y: 350 }, { x: 65, y: 358 }, { x: 47, y: 350 }, { x: 39, y: 330 }, { x: 47, y: 314 }] } },
      { boundary: { points: [{ x: 100, y: 400 }, { x: 115, y: 407 }, { x: 122, y: 420 }, { x: 115, y: 437 }, { x: 100, y: 444 }, { x: 85, y: 437 }, { x: 78, y: 420 }, { x: 85, y: 407 }] } },
      { boundary: { points: [{ x: 315, y: 212 }, { x: 335, y: 222 }, { x: 345, y: 240 }, { x: 335, y: 265 }, { x: 315, y: 275 }, { x: 295, y: 265 }, { x: 285, y: 240 }, { x: 295, y: 222 }] } },
      { boundary: { points: [{ x: 335, y: 316 }, { x: 353, y: 324 }, { x: 361, y: 340 }, { x: 353, y: 360 }, { x: 335, y: 368 }, { x: 317, y: 360 }, { x: 309, y: 340 }, { x: 317, y: 324 }] } },
      { boundary: { points: [{ x: 305, y: 410 }, { x: 320, y: 417 }, { x: 327, y: 430 }, { x: 320, y: 447 }, { x: 305, y: 454 }, { x: 290, y: 447 }, { x: 283, y: 430 }, { x: 290, y: 417 }] } },
      { boundary: { points: [{ x: 200, y: 8 }, { x: 240, y: 20 }, { x: 260, y: 35 }, { x: 240, y: 48 }, { x: 200, y: 52 }, { x: 160, y: 48 }, { x: 140, y: 35 }, { x: 160, y: 20 }] } }
    ],
  },
  // ─── Mesa Bend — Par 4, 330y ────────────────────────────────
  {
    id: 'bjc-hole-3-par4',
    name: 'Mesa Bend',
    par: 4,
    yardsLength: 330,
    courseTheme: 'desert' as const,
    teePosition: { x: 280, y: 552 },
    pinPosition: { x: 122, y: 70 },
    pinPositions: [{ x: 122, y: 70 }, { x: 140, y: 82 }, { x: 103, y: 86 }],
    greenBoundary: {
          points: [
            { x: 122, y: 55 },
          { x: 140, y: 60 },
          { x: 151, y: 72 },
          { x: 151, y: 88 },
          { x: 140, y: 100 },
          { x: 122, y: 105 },
          { x: 104, y: 100 },
          { x: 93, y: 88 },
          { x: 93, y: 72 },
          { x: 104, y: 60 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 240, y: 575 },
          { x: 328, y: 548 },
          { x: 232, y: 295 },
          { x: 168, y: 42 },
          { x: 78, y: 42 },
          { x: 108, y: 295 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 102, y: 81 }, { x: 111, y: 84 }, { x: 115, y: 90 }, { x: 111, y: 96 }, { x: 102, y: 99 }, { x: 93, y: 96 }, { x: 89, y: 90 }, { x: 93, y: 84 }] } },
      { boundary: { points: [{ x: 143, y: 78 }, { x: 152, y: 81 }, { x: 156, y: 87 }, { x: 152, y: 93 }, { x: 143, y: 96 }, { x: 134, y: 93 }, { x: 130, y: 87 }, { x: 134, y: 81 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 40, y: 120 }, radius: 5 },
      { position: { x: 55, y: 170 }, radius: 7 },
      { position: { x: 35, y: 230 }, radius: 4 },
      { position: { x: 300, y: 200 }, radius: 6 },
      { position: { x: 345, y: 290 }, radius: 5 },
      { position: { x: 370, y: 380 }, radius: 7 },
      { position: { x: 320, y: 450 }, radius: 4 },
      { position: { x: 355, y: 500 }, radius: 6 },
      { position: { x: 300, y: 510 }, radius: 8 },
      { position: { x: 335, y: 550 }, radius: 5 },
      { position: { x: 50, y: 310 }, radius: 6 },
      { position: { x: 365, y: 340 }, radius: 4 },
      { position: { x: 40, y: 370 }, radius: 7 },
      { position: { x: 310, y: 420 }, radius: 5 },
      { position: { x: 350, y: 460 }, radius: 6 },
      { position: { x: 380, y: 520 }, radius: 4 },
      { position: { x: 355, y: 550 }, radius: 7 }
    ],
    boulders: [
      { boundary: { points: [{ x: 60, y: 245 }, { x: 85, y: 255 }, { x: 98, y: 280 }, { x: 90, y: 305 }, { x: 65, y: 327 }, { x: 35, y: 323 }, { x: 20, y: 300 }, { x: 25, y: 265 }] } },
      { boundary: { points: [{ x: 45, y: 175 }, { x: 63, y: 182 }, { x: 73, y: 200 }, { x: 63, y: 222 }, { x: 45, y: 230 }, { x: 27, y: 222 }, { x: 17, y: 200 }, { x: 27, y: 182 }] } },
      { boundary: { points: [{ x: 330, y: 462 }, { x: 344, y: 468 }, { x: 350, y: 480 }, { x: 344, y: 494 }, { x: 330, y: 500 }, { x: 316, y: 494 }, { x: 310, y: 480 }, { x: 316, y: 468 }] } },
      { boundary: { points: [{ x: 355, y: 365 }, { x: 367, y: 370 }, { x: 373, y: 380 }, { x: 367, y: 392 }, { x: 355, y: 398 }, { x: 343, y: 392 }, { x: 337, y: 380 }, { x: 343, y: 370 }] } }
    ],
  },
  // ─── Rio Grande — Par 5, 510y ────────────────────────────────
  {
    id: 'bjc-hole-4-par5',
    name: 'Rio Grande',
    par: 5,
    yardsLength: 510,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 200, y: 60 },
    pinPositions: [{ x: 200, y: 60 }, { x: 224, y: 74 }, { x: 178, y: 78 }, { x: 200, y: 82 }],
    greenBoundary: {
          points: [
            { x: 200, y: 42 },
          { x: 221, y: 47 },
          { x: 233, y: 61 },
          { x: 233, y: 79 },
          { x: 221, y: 93 },
          { x: 200, y: 98 },
          { x: 179, y: 93 },
          { x: 167, y: 79 },
          { x: 167, y: 61 },
          { x: 179, y: 47 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 148, y: 582 },
          { x: 252, y: 582 },
          { x: 255, y: 36 },
          { x: 145, y: 36 }
          ]
        },
    waterHazards: [
      { boundary: { points: [{ x: 148, y: 140 }, { x: 252, y: 140 }, { x: 255, y: 175 }, { x: 148, y: 175 }] }, dropZone: { x: 200, y: 195 } }
    ],
    bunkers: [
      { boundary: { points: [{ x: 176, y: 49 }, { x: 186, y: 52 }, { x: 190, y: 58 }, { x: 186, y: 64 }, { x: 176, y: 67 }, { x: 166, y: 64 }, { x: 162, y: 58 }, { x: 166, y: 52 }] } },
      { boundary: { points: [{ x: 226, y: 51 }, { x: 236, y: 54 }, { x: 240, y: 60 }, { x: 236, y: 66 }, { x: 226, y: 69 }, { x: 216, y: 66 }, { x: 212, y: 60 }, { x: 216, y: 54 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 40, y: 450 }, radius: 6 },
      { position: { x: 30, y: 370 }, radius: 8 },
      { position: { x: 50, y: 300 }, radius: 5 },
      { position: { x: 35, y: 230 }, radius: 7 },
      { position: { x: 45, y: 160 }, radius: 5 },
      { position: { x: 55, y: 100 }, radius: 6 },
      { position: { x: 30, y: 500 }, radius: 4 },
      { position: { x: 60, y: 540 }, radius: 8 },
      { position: { x: 340, y: 420 }, radius: 5 },
      { position: { x: 360, y: 340 }, radius: 7 },
      { position: { x: 370, y: 260 }, radius: 6 },
      { position: { x: 345, y: 180 }, radius: 4 },
      { position: { x: 330, y: 110 }, radius: 7 },
      { position: { x: 380, y: 470 }, radius: 5 },
      { position: { x: 355, y: 510 }, radius: 6 },
      { position: { x: 370, y: 540 }, radius: 4 },
      { position: { x: 335, y: 560 }, radius: 5 },
      { position: { x: 370, y: 490 }, radius: 8 }
    ],
    boulders: [
      { boundary: { points: [{ x: 70, y: 458 }, { x: 86, y: 465 }, { x: 94, y: 480 }, { x: 86, y: 498 }, { x: 70, y: 505 }, { x: 54, y: 498 }, { x: 46, y: 480 }, { x: 54, y: 465 }] } },
      { boundary: { points: [{ x: 60, y: 364 }, { x: 80, y: 372 }, { x: 90, y: 390 }, { x: 80, y: 412 }, { x: 60, y: 420 }, { x: 40, y: 412 }, { x: 30, y: 390 }, { x: 40, y: 372 }] } },
      { boundary: { points: [{ x: 55, y: 272 }, { x: 77, y: 280 }, { x: 89, y: 300 }, { x: 77, y: 324 }, { x: 55, y: 332 }, { x: 33, y: 324 }, { x: 21, y: 300 }, { x: 33, y: 280 }] } },
      { boundary: { points: [{ x: 65, y: 196 }, { x: 83, y: 204 }, { x: 91, y: 220 }, { x: 83, y: 240 }, { x: 65, y: 248 }, { x: 47, y: 240 }, { x: 39, y: 220 }, { x: 47, y: 204 }] } },
      { boundary: { points: [{ x: 45, y: 120 }, { x: 60, y: 127 }, { x: 67, y: 140 }, { x: 60, y: 157 }, { x: 45, y: 164 }, { x: 30, y: 157 }, { x: 23, y: 140 }, { x: 30, y: 127 }] } },
      { boundary: { points: [{ x: 320, y: 330 }, { x: 336, y: 337 }, { x: 342, y: 350 }, { x: 336, y: 367 }, { x: 320, y: 374 }, { x: 304, y: 367 }, { x: 298, y: 350 }, { x: 304, y: 337 }] } },
      { boundary: { points: [{ x: 345, y: 262 }, { x: 359, y: 268 }, { x: 365, y: 280 }, { x: 359, y: 294 }, { x: 345, y: 300 }, { x: 331, y: 294 }, { x: 325, y: 280 }, { x: 331, y: 268 }] } }
    ],
  },
  // ─── Desert Wash — Par 3, 140y ────────────────────────────────
  {
    id: 'bjc-hole-5-par3',
    name: 'Desert Wash',
    par: 3,
    yardsLength: 140,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 545 },
    pinPosition: { x: 200, y: 77 },
    pinPositions: [{ x: 200, y: 77 }, { x: 215, y: 88 }, { x: 186, y: 91 }],
    greenBoundary: {
          points: [
            { x: 200, y: 65 },
          { x: 214, y: 69 },
          { x: 222, y: 79 },
          { x: 222, y: 91 },
          { x: 214, y: 101 },
          { x: 200, y: 105 },
          { x: 186, y: 101 },
          { x: 178, y: 91 },
          { x: 178, y: 79 },
          { x: 186, y: 69 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 162, y: 565 },
          { x: 238, y: 565 },
          { x: 240, y: 52 },
          { x: 160, y: 52 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 224, y: 87 }, { x: 234, y: 90 }, { x: 238, y: 96 }, { x: 234, y: 102 }, { x: 224, y: 105 }, { x: 214, y: 102 }, { x: 210, y: 96 }, { x: 214, y: 90 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 70, y: 200 }, radius: 5 },
      { position: { x: 50, y: 280 }, radius: 7 },
      { position: { x: 90, y: 360 }, radius: 4 },
      { position: { x: 55, y: 440 }, radius: 6 },
      { position: { x: 80, y: 490 }, radius: 5 },
      { position: { x: 40, y: 530 }, radius: 8 },
      { position: { x: 100, y: 550 }, radius: 4 },
      { position: { x: 30, y: 390 }, radius: 6 },
      { position: { x: 320, y: 200 }, radius: 6 },
      { position: { x: 345, y: 290 }, radius: 5 },
      { position: { x: 360, y: 380 }, radius: 7 },
      { position: { x: 330, y: 450 }, radius: 4 },
      { position: { x: 350, y: 510 }, radius: 6 },
      { position: { x: 370, y: 200 }, radius: 4 }
    ],
    boulders: [
      { boundary: { points: [{ x: 130, y: 62 }, { x: 144, y: 68 }, { x: 150, y: 80 }, { x: 144, y: 94 }, { x: 130, y: 100 }, { x: 116, y: 94 }, { x: 110, y: 80 }, { x: 116, y: 68 }] } },
      { boundary: { points: [{ x: 272, y: 60 }, { x: 286, y: 66 }, { x: 292, y: 78 }, { x: 286, y: 92 }, { x: 272, y: 98 }, { x: 258, y: 92 }, { x: 252, y: 78 }, { x: 258, y: 66 }] } },
      { boundary: { points: [{ x: 115, y: 358 }, { x: 131, y: 365 }, { x: 139, y: 380 }, { x: 131, y: 398 }, { x: 115, y: 405 }, { x: 99, y: 398 }, { x: 91, y: 380 }, { x: 99, y: 365 }] } },
      { boundary: { points: [{ x: 295, y: 300 }, { x: 310, y: 307 }, { x: 317, y: 320 }, { x: 310, y: 337 }, { x: 295, y: 344 }, { x: 280, y: 337 }, { x: 273, y: 320 }, { x: 280, y: 307 }] } }
    ],
  },
  // ─── Boulder Alley — Par 4, 365y ────────────────────────────────
  {
    id: 'bjc-hole-6-par4',
    name: 'Boulder Alley',
    par: 4,
    yardsLength: 365,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 558 },
    pinPosition: { x: 200, y: 67 },
    pinPositions: [{ x: 200, y: 67 }, { x: 218, y: 78 }, { x: 183, y: 82 }],
    greenBoundary: {
          points: [
            { x: 200, y: 51 },
          { x: 218, y: 56 },
          { x: 229, y: 68 },
          { x: 229, y: 84 },
          { x: 218, y: 96 },
          { x: 200, y: 101 },
          { x: 182, y: 96 },
          { x: 171, y: 84 },
          { x: 171, y: 68 },
          { x: 182, y: 56 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 166, y: 578 },
          { x: 234, y: 578 },
          { x: 236, y: 42 },
          { x: 164, y: 42 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 180, y: 49 }, { x: 189, y: 52 }, { x: 193, y: 58 }, { x: 189, y: 64 }, { x: 180, y: 67 }, { x: 171, y: 64 }, { x: 167, y: 58 }, { x: 171, y: 52 }] } },
      { boundary: { points: [{ x: 222, y: 51 }, { x: 231, y: 54 }, { x: 235, y: 60 }, { x: 231, y: 66 }, { x: 222, y: 69 }, { x: 213, y: 66 }, { x: 209, y: 60 }, { x: 213, y: 54 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 50, y: 120 }, radius: 5 },
      { position: { x: 40, y: 190 }, radius: 7 },
      { position: { x: 60, y: 260 }, radius: 4 },
      { position: { x: 45, y: 340 }, radius: 6 },
      { position: { x: 55, y: 415 }, radius: 5 },
      { position: { x: 35, y: 480 }, radius: 8 },
      { position: { x: 70, y: 535 }, radius: 4 },
      { position: { x: 30, y: 440 }, radius: 6 },
      { position: { x: 350, y: 130 }, radius: 6 },
      { position: { x: 360, y: 200 }, radius: 5 },
      { position: { x: 345, y: 280 }, radius: 7 },
      { position: { x: 355, y: 360 }, radius: 4 },
      { position: { x: 340, y: 440 }, radius: 6 },
      { position: { x: 365, y: 510 }, radius: 5 },
      { position: { x: 330, y: 550 }, radius: 7 },
      { position: { x: 375, y: 390 }, radius: 4 },
      { position: { x: 40, y: 550 }, radius: 5 },
      { position: { x: 345, y: 550 }, radius: 8 }
    ],
    boulders: [
      { boundary: { points: [{ x: 100, y: 450 }, { x: 122, y: 460 }, { x: 132, y: 480 }, { x: 122, y: 506 }, { x: 100, y: 515 }, { x: 78, y: 506 }, { x: 68, y: 480 }, { x: 78, y: 460 }] } },
      { boundary: { points: [{ x: 88, y: 305 }, { x: 114, y: 316 }, { x: 126, y: 340 }, { x: 114, y: 368 }, { x: 88, y: 380 }, { x: 62, y: 368 }, { x: 50, y: 340 }, { x: 62, y: 316 }] } },
      { boundary: { points: [{ x: 95, y: 170 }, { x: 117, y: 180 }, { x: 127, y: 200 }, { x: 117, y: 226 }, { x: 95, y: 235 }, { x: 73, y: 226 }, { x: 63, y: 200 }, { x: 73, y: 180 }] } },
      { boundary: { points: [{ x: 300, y: 440 }, { x: 322, y: 450 }, { x: 332, y: 470 }, { x: 322, y: 496 }, { x: 300, y: 505 }, { x: 278, y: 496 }, { x: 268, y: 470 }, { x: 278, y: 450 }] } },
      { boundary: { points: [{ x: 312, y: 295 }, { x: 338, y: 306 }, { x: 350, y: 330 }, { x: 338, y: 358 }, { x: 312, y: 370 }, { x: 286, y: 358 }, { x: 274, y: 330 }, { x: 286, y: 306 }] } },
      { boundary: { points: [{ x: 305, y: 165 }, { x: 327, y: 175 }, { x: 337, y: 195 }, { x: 327, y: 221 }, { x: 305, y: 230 }, { x: 283, y: 221 }, { x: 273, y: 195 }, { x: 283, y: 175 }] } },
      { boundary: { points: [{ x: 115, y: 47 }, { x: 128, y: 53 }, { x: 133, y: 65 }, { x: 128, y: 79 }, { x: 115, y: 85 }, { x: 102, y: 79 }, { x: 97, y: 65 }, { x: 102, y: 53 }] } },
      { boundary: { points: [{ x: 287, y: 45 }, { x: 300, y: 51 }, { x: 305, y: 63 }, { x: 300, y: 77 }, { x: 287, y: 83 }, { x: 274, y: 77 }, { x: 269, y: 63 }, { x: 274, y: 51 }] } }
    ],
  },
  // ─── The Valley — Par 4, 370y ────────────────────────────────
  {
    id: 'bjc-hole-7-par4',
    name: 'The Valley',
    par: 4,
    yardsLength: 370,
    courseTheme: 'desert' as const,
    teePosition: { x: 197, y: 558 },
    pinPosition: { x: 210, y: 64 },
    pinPositions: [{ x: 210, y: 64 }, { x: 228, y: 76 }, { x: 192, y: 80 }],
    greenBoundary: {
          points: [
            { x: 210, y: 49 },
          { x: 228, y: 54 },
          { x: 239, y: 66 },
          { x: 239, y: 82 },
          { x: 228, y: 94 },
          { x: 210, y: 99 },
          { x: 192, y: 94 },
          { x: 181, y: 82 },
          { x: 181, y: 66 },
          { x: 192, y: 54 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 152, y: 578 },
          { x: 242, y: 578 },
          { x: 260, y: 42 },
          { x: 160, y: 42 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 190, y: 49 }, { x: 199, y: 52 }, { x: 203, y: 58 }, { x: 199, y: 64 }, { x: 190, y: 67 }, { x: 181, y: 64 }, { x: 177, y: 58 }, { x: 181, y: 52 }] } },
      { boundary: { points: [{ x: 230, y: 51 }, { x: 239, y: 54 }, { x: 243, y: 60 }, { x: 239, y: 66 }, { x: 230, y: 69 }, { x: 221, y: 66 }, { x: 217, y: 60 }, { x: 221, y: 54 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 55, y: 180 }, radius: 5 },
      { position: { x: 40, y: 250 }, radius: 7 },
      { position: { x: 75, y: 330 }, radius: 4 },
      { position: { x: 50, y: 420 }, radius: 6 },
      { position: { x: 80, y: 490 }, radius: 5 },
      { position: { x: 35, y: 540 }, radius: 8 },
      { position: { x: 95, y: 555 }, radius: 4 },
      { position: { x: 30, y: 460 }, radius: 6 },
      { position: { x: 320, y: 200 }, radius: 6 },
      { position: { x: 345, y: 290 }, radius: 5 },
      { position: { x: 360, y: 380 }, radius: 7 },
      { position: { x: 340, y: 460 }, radius: 4 },
      { position: { x: 370, y: 510 }, radius: 6 },
      { position: { x: 380, y: 420 }, radius: 4 },
      { position: { x: 355, y: 540 }, radius: 5 },
      { position: { x: 330, y: 560 }, radius: 7 },
      { position: { x: 60, y: 140 }, radius: 5 },
      { position: { x: 375, y: 240 }, radius: 8 }
    ],
    boulders: [
      { boundary: { points: [{ x: 210, y: 8 }, { x: 260, y: 22 }, { x: 280, y: 40 }, { x: 260, y: 54 }, { x: 210, y: 60 }, { x: 160, y: 54 }, { x: 140, y: 40 }, { x: 160, y: 22 }] } },
      { boundary: { points: [{ x: 330, y: 268 }, { x: 346, y: 275 }, { x: 354, y: 290 }, { x: 346, y: 308 }, { x: 330, y: 315 }, { x: 314, y: 308 }, { x: 306, y: 290 }, { x: 314, y: 275 }] } },
      { boundary: { points: [{ x: 355, y: 382 }, { x: 369, y: 388 }, { x: 375, y: 400 }, { x: 369, y: 414 }, { x: 355, y: 418 }, { x: 341, y: 414 }, { x: 335, y: 400 }, { x: 341, y: 388 }] } },
      { boundary: { points: [{ x: 90, y: 344 }, { x: 102, y: 350 }, { x: 108, y: 360 }, { x: 102, y: 372 }, { x: 90, y: 378 }, { x: 78, y: 372 }, { x: 72, y: 360 }, { x: 78, y: 350 }] } }
    ],
  },
  // ─── Big Bend — Par 5, 540y ────────────────────────────────
  {
    id: 'bjc-hole-8-par5',
    name: 'Big Bend',
    par: 5,
    yardsLength: 540,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 562 },
    pinPosition: { x: 200, y: 56 },
    pinPositions: [{ x: 200, y: 56 }, { x: 224, y: 68 }, { x: 178, y: 74 }, { x: 200, y: 78 }],
    greenBoundary: {
          points: [
            { x: 200, y: 38 },
          { x: 221, y: 43 },
          { x: 233, y: 57 },
          { x: 233, y: 75 },
          { x: 221, y: 89 },
          { x: 200, y: 94 },
          { x: 179, y: 89 },
          { x: 167, y: 75 },
          { x: 167, y: 57 },
          { x: 179, y: 43 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 145, y: 582 },
          { x: 255, y: 582 },
          { x: 258, y: 32 },
          { x: 142, y: 32 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 178, y: 45 }, { x: 188, y: 48 }, { x: 192, y: 54 }, { x: 188, y: 60 }, { x: 178, y: 63 }, { x: 168, y: 60 }, { x: 164, y: 54 }, { x: 168, y: 48 }] } },
      { boundary: { points: [{ x: 224, y: 47 }, { x: 234, y: 50 }, { x: 238, y: 56 }, { x: 234, y: 62 }, { x: 224, y: 65 }, { x: 214, y: 62 }, { x: 210, y: 56 }, { x: 214, y: 50 }] } },
      { boundary: { points: [{ x: 200, y: 293 }, { x: 232, y: 297 }, { x: 245, y: 305 }, { x: 232, y: 313 }, { x: 200, y: 317 }, { x: 168, y: 313 }, { x: 155, y: 305 }, { x: 168, y: 297 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 35, y: 440 }, radius: 6 },
      { position: { x: 40, y: 360 }, radius: 8 },
      { position: { x: 30, y: 280 }, radius: 5 },
      { position: { x: 50, y: 200 }, radius: 7 },
      { position: { x: 45, y: 130 }, radius: 5 },
      { position: { x: 35, y: 80 }, radius: 6 },
      { position: { x: 55, y: 530 }, radius: 4 },
      { position: { x: 30, y: 490 }, radius: 8 },
      { position: { x: 340, y: 430 }, radius: 5 },
      { position: { x: 360, y: 360 }, radius: 7 },
      { position: { x: 370, y: 270 }, radius: 6 },
      { position: { x: 345, y: 190 }, radius: 4 },
      { position: { x: 330, y: 120 }, radius: 7 },
      { position: { x: 380, y: 470 }, radius: 5 },
      { position: { x: 355, y: 510 }, radius: 6 },
      { position: { x: 370, y: 545 }, radius: 4 },
      { position: { x: 335, y: 565 }, radius: 5 },
      { position: { x: 370, y: 480 }, radius: 8 }
    ],
    boulders: [
      { boundary: { points: [{ x: 72, y: 468 }, { x: 88, y: 475 }, { x: 96, y: 490 }, { x: 88, y: 508 }, { x: 72, y: 515 }, { x: 56, y: 508 }, { x: 48, y: 490 }, { x: 56, y: 475 }] } },
      { boundary: { points: [{ x: 58, y: 372 }, { x: 78, y: 382 }, { x: 88, y: 400 }, { x: 78, y: 424 }, { x: 58, y: 432 }, { x: 38, y: 424 }, { x: 28, y: 400 }, { x: 38, y: 382 }] } },
      { boundary: { points: [{ x: 50, y: 280 }, { x: 72, y: 290 }, { x: 82, y: 310 }, { x: 72, y: 336 }, { x: 50, y: 345 }, { x: 28, y: 336 }, { x: 18, y: 310 }, { x: 28, y: 290 }] } },
      { boundary: { points: [{ x: 60, y: 192 }, { x: 80, y: 202 }, { x: 90, y: 220 }, { x: 80, y: 244 }, { x: 60, y: 252 }, { x: 40, y: 244 }, { x: 30, y: 220 }, { x: 40, y: 202 }] } },
      { boundary: { points: [{ x: 70, y: 116 }, { x: 88, y: 124 }, { x: 96, y: 140 }, { x: 88, y: 160 }, { x: 70, y: 168 }, { x: 52, y: 160 }, { x: 44, y: 140 }, { x: 52, y: 124 }] } },
      { boundary: { points: [{ x: 330, y: 430 }, { x: 345, y: 437 }, { x: 352, y: 450 }, { x: 345, y: 467 }, { x: 330, y: 474 }, { x: 315, y: 467 }, { x: 308, y: 450 }, { x: 315, y: 437 }] } },
      { boundary: { points: [{ x: 350, y: 328 }, { x: 366, y: 335 }, { x: 374, y: 350 }, { x: 366, y: 368 }, { x: 350, y: 375 }, { x: 334, y: 368 }, { x: 326, y: 350 }, { x: 334, y: 335 }] } }
    ],
  },
  // ─── The Ascent — Par 4, 350y ────────────────────────────────
  {
    id: 'bjc-hole-9-par4',
    name: 'The Ascent',
    par: 4,
    yardsLength: 350,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 558 },
    pinPosition: { x: 200, y: 64 },
    pinPositions: [{ x: 200, y: 64 }, { x: 220, y: 76 }, { x: 182, y: 80 }],
    greenBoundary: {
          points: [
            { x: 200, y: 49 },
          { x: 218, y: 54 },
          { x: 229, y: 66 },
          { x: 229, y: 82 },
          { x: 218, y: 94 },
          { x: 200, y: 99 },
          { x: 182, y: 94 },
          { x: 171, y: 82 },
          { x: 171, y: 66 },
          { x: 182, y: 54 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 152, y: 578 },
          { x: 248, y: 578 },
          { x: 252, y: 42 },
          { x: 148, y: 42 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 180, y: 49 }, { x: 189, y: 52 }, { x: 193, y: 58 }, { x: 189, y: 64 }, { x: 180, y: 67 }, { x: 171, y: 64 }, { x: 167, y: 58 }, { x: 171, y: 52 }] } },
      { boundary: { points: [{ x: 222, y: 51 }, { x: 231, y: 54 }, { x: 235, y: 60 }, { x: 231, y: 66 }, { x: 222, y: 69 }, { x: 213, y: 66 }, { x: 209, y: 60 }, { x: 213, y: 54 }] } },
      { boundary: { points: [{ x: 200, y: 461 }, { x: 235, y: 465 }, { x: 250, y: 475 }, { x: 235, y: 485 }, { x: 200, y: 489 }, { x: 165, y: 485 }, { x: 150, y: 475 }, { x: 165, y: 465 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 65, y: 200 }, radius: 5 },
      { position: { x: 45, y: 290 }, radius: 7 },
      { position: { x: 80, y: 370 }, radius: 4 },
      { position: { x: 55, y: 440 }, radius: 6 },
      { position: { x: 40, y: 540 }, radius: 5 },
      { position: { x: 90, y: 545 }, radius: 8 },
      { position: { x: 30, y: 490 }, radius: 4 },
      { position: { x: 70, y: 510 }, radius: 6 },
      { position: { x: 320, y: 200 }, radius: 6 },
      { position: { x: 345, y: 290 }, radius: 5 },
      { position: { x: 360, y: 370 }, radius: 7 },
      { position: { x: 340, y: 440 }, radius: 4 },
      { position: { x: 370, y: 510 }, radius: 6 },
      { position: { x: 380, y: 370 }, radius: 4 },
      { position: { x: 355, y: 540 }, radius: 5 },
      { position: { x: 330, y: 560 }, radius: 7 },
      { position: { x: 45, y: 540 }, radius: 6 }
    ],
    boulders: [
      { boundary: { points: [{ x: 120, y: 46 }, { x: 135, y: 53 }, { x: 142, y: 66 }, { x: 135, y: 83 }, { x: 120, y: 90 }, { x: 105, y: 83 }, { x: 98, y: 66 }, { x: 105, y: 53 }] } },
      { boundary: { points: [{ x: 282, y: 44 }, { x: 297, y: 51 }, { x: 304, y: 64 }, { x: 297, y: 81 }, { x: 282, y: 88 }, { x: 267, y: 81 }, { x: 260, y: 64 }, { x: 267, y: 51 }] } },
      { boundary: { points: [{ x: 318, y: 272 }, { x: 332, y: 278 }, { x: 338, y: 290 }, { x: 332, y: 304 }, { x: 318, y: 310 }, { x: 304, y: 304 }, { x: 298, y: 290 }, { x: 304, y: 278 }] } }
    ],
  },
  // ─── Mesa Top — Par 4, 365y ────────────────────────────────
  {
    id: 'bjc-hole-10-par4',
    name: 'Mesa Top',
    par: 4,
    yardsLength: 365,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 550 },
    pinPosition: { x: 200, y: 97 },
    pinPositions: [{ x: 200, y: 97 }, { x: 220, y: 110 }, { x: 182, y: 114 }],
    greenBoundary: {
          points: [
            { x: 200, y: 130 },
          { x: 218, y: 125 },
          { x: 229, y: 113 },
          { x: 229, y: 97 },
          { x: 218, y: 85 },
          { x: 200, y: 80 },
          { x: 182, y: 85 },
          { x: 171, y: 97 },
          { x: 171, y: 113 },
          { x: 182, y: 125 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 148, y: 572 },
          { x: 252, y: 572 },
          { x: 255, y: 72 },
          { x: 145, y: 72 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 168, y: 104 }, { x: 178, y: 101 }, { x: 182, y: 95 }, { x: 178, y: 89 }, { x: 168, y: 86 }, { x: 158, y: 89 }, { x: 154, y: 95 }, { x: 158, y: 101 }] } },
      { boundary: { points: [{ x: 230, y: 107 }, { x: 239, y: 104 }, { x: 243, y: 98 }, { x: 239, y: 92 }, { x: 230, y: 89 }, { x: 221, y: 92 }, { x: 217, y: 98 }, { x: 221, y: 104 }] } },
      { boundary: { points: [{ x: 155, y: 250 }, { x: 168, y: 247 }, { x: 173, y: 240 }, { x: 168, y: 233 }, { x: 155, y: 230 }, { x: 142, y: 233 }, { x: 137, y: 240 }, { x: 142, y: 247 }] } },
      { boundary: { points: [{ x: 245, y: 240 }, { x: 256, y: 237 }, { x: 261, y: 230 }, { x: 256, y: 223 }, { x: 245, y: 220 }, { x: 234, y: 223 }, { x: 229, y: 230 }, { x: 234, y: 237 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 48, y: 440 }, radius: 5 },
      { position: { x: 35, y: 360 }, radius: 7 },
      { position: { x: 70, y: 280 }, radius: 4 },
      { position: { x: 50, y: 200 }, radius: 6 },
      { position: { x: 90, y: 140 }, radius: 5 },
      { position: { x: 30, y: 90 }, radius: 8 },
      { position: { x: 100, y: 70 }, radius: 4 },
      { position: { x: 40, y: 120 }, radius: 6 },
      { position: { x: 320, y: 440 }, radius: 6 },
      { position: { x: 350, y: 360 }, radius: 5 },
      { position: { x: 365, y: 270 }, radius: 7 },
      { position: { x: 340, y: 190 }, radius: 4 },
      { position: { x: 355, y: 120 }, radius: 6 },
      { position: { x: 375, y: 360 }, radius: 4 },
      { position: { x: 348, y: 50 }, radius: 5 },
      { position: { x: 375, y: 120 }, radius: 7 },
      { position: { x: 60, y: 70 }, radius: 5 }
    ],
    boulders: [
      { boundary: { points: [{ x: 88, y: 572 }, { x: 123, y: 557 }, { x: 138, y: 537 }, { x: 123, y: 517 }, { x: 88, y: 507 }, { x: 53, y: 517 }, { x: 38, y: 537 }, { x: 53, y: 557 }] } },
      { boundary: { points: [{ x: 60, y: 500 }, { x: 75, y: 493 }, { x: 82, y: 480 }, { x: 75, y: 463 }, { x: 60, y: 456 }, { x: 45, y: 463 }, { x: 38, y: 480 }, { x: 45, y: 493 }] } },
      { boundary: { points: [{ x: 330, y: 332 }, { x: 346, y: 325 }, { x: 354, y: 310 }, { x: 346, y: 292 }, { x: 330, y: 285 }, { x: 314, y: 292 }, { x: 306, y: 310 }, { x: 314, y: 325 }] } }
    ],
  },
  // ─── The Corridor — Par 4, 365y ────────────────────────────────
  {
    id: 'bjc-hole-11-par4',
    name: 'The Corridor',
    par: 4,
    yardsLength: 365,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 558 },
    pinPosition: { x: 200, y: 68 },
    pinPositions: [{ x: 200, y: 68 }, { x: 218, y: 80 }, { x: 184, y: 83 }],
    greenBoundary: {
          points: [
            { x: 200, y: 53 },
          { x: 218, y: 58 },
          { x: 229, y: 70 },
          { x: 229, y: 86 },
          { x: 218, y: 98 },
          { x: 200, y: 103 },
          { x: 182, y: 98 },
          { x: 171, y: 86 },
          { x: 171, y: 70 },
          { x: 182, y: 58 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 158, y: 578 },
          { x: 242, y: 578 },
          { x: 244, y: 44 },
          { x: 156, y: 44 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 182, y: 51 }, { x: 191, y: 54 }, { x: 195, y: 60 }, { x: 191, y: 66 }, { x: 182, y: 69 }, { x: 173, y: 66 }, { x: 169, y: 60 }, { x: 173, y: 54 }] } },
      { boundary: { points: [{ x: 220, y: 53 }, { x: 229, y: 56 }, { x: 233, y: 62 }, { x: 229, y: 68 }, { x: 220, y: 71 }, { x: 211, y: 68 }, { x: 207, y: 62 }, { x: 211, y: 56 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 48, y: 150 }, radius: 5 },
      { position: { x: 38, y: 230 }, radius: 7 },
      { position: { x: 65, y: 320 }, radius: 4 },
      { position: { x: 42, y: 410 }, radius: 6 },
      { position: { x: 75, y: 480 }, radius: 5 },
      { position: { x: 30, y: 530 }, radius: 8 },
      { position: { x: 85, y: 550 }, radius: 4 },
      { position: { x: 45, y: 470 }, radius: 6 },
      { position: { x: 340, y: 160 }, radius: 6 },
      { position: { x: 355, y: 250 }, radius: 5 },
      { position: { x: 345, y: 340 }, radius: 7 },
      { position: { x: 360, y: 430 }, radius: 4 },
      { position: { x: 335, y: 500 }, radius: 6 },
      { position: { x: 370, y: 310 }, radius: 4 },
      { position: { x: 355, y: 540 }, radius: 5 },
      { position: { x: 330, y: 560 }, radius: 7 },
      { position: { x: 52, y: 560 }, radius: 5 },
      { position: { x: 365, y: 560 }, radius: 7 }
    ],
    boulders: [
      { boundary: { points: [{ x: 92, y: 422 }, { x: 112, y: 432 }, { x: 122, y: 450 }, { x: 112, y: 474 }, { x: 92, y: 482 }, { x: 72, y: 474 }, { x: 62, y: 450 }, { x: 72, y: 432 }] } },
      { boundary: { points: [{ x: 80, y: 248 }, { x: 104, y: 258 }, { x: 116, y: 280 }, { x: 104, y: 306 }, { x: 80, y: 316 }, { x: 56, y: 306 }, { x: 44, y: 280 }, { x: 56, y: 258 }] } },
      { boundary: { points: [{ x: 308, y: 432 }, { x: 328, y: 442 }, { x: 338, y: 460 }, { x: 328, y: 484 }, { x: 308, y: 492 }, { x: 288, y: 484 }, { x: 278, y: 460 }, { x: 288, y: 442 }] } },
      { boundary: { points: [{ x: 320, y: 238 }, { x: 344, y: 248 }, { x: 356, y: 270 }, { x: 344, y: 296 }, { x: 320, y: 306 }, { x: 296, y: 296 }, { x: 284, y: 270 }, { x: 296, y: 248 }] } }
    ],
  },
  // ─── Shortcut — Par 4, 300y ────────────────────────────────
  {
    id: 'bjc-hole-12-par4',
    name: 'Shortcut',
    par: 4,
    yardsLength: 300,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 548 },
    pinPosition: { x: 200, y: 64 },
    pinPositions: [{ x: 200, y: 64 }, { x: 225, y: 78 }, { x: 178, y: 82 }],
    greenBoundary: {
          points: [
            { x: 200, y: 48 },
          { x: 220, y: 53 },
          { x: 232, y: 67 },
          { x: 232, y: 85 },
          { x: 220, y: 99 },
          { x: 200, y: 104 },
          { x: 180, y: 99 },
          { x: 168, y: 85 },
          { x: 168, y: 67 },
          { x: 180, y: 53 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 148, y: 568 },
          { x: 252, y: 568 },
          { x: 255, y: 42 },
          { x: 145, y: 42 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 174, y: 46 }, { x: 185, y: 49 }, { x: 189, y: 56 }, { x: 185, y: 63 }, { x: 174, y: 66 }, { x: 163, y: 63 }, { x: 159, y: 56 }, { x: 163, y: 49 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 60, y: 200 }, radius: 5 },
      { position: { x: 45, y: 290 }, radius: 7 },
      { position: { x: 80, y: 380 }, radius: 4 },
      { position: { x: 55, y: 450 }, radius: 6 },
      { position: { x: 90, y: 510 }, radius: 5 },
      { position: { x: 35, y: 540 }, radius: 8 },
      { position: { x: 70, y: 555 }, radius: 4 },
      { position: { x: 30, y: 480 }, radius: 6 },
      { position: { x: 320, y: 450 }, radius: 6 },
      { position: { x: 350, y: 510 }, radius: 5 },
      { position: { x: 365, y: 540 }, radius: 7 },
      { position: { x: 330, y: 560 }, radius: 4 },
      { position: { x: 355, y: 480 }, radius: 6 },
      { position: { x: 380, y: 430 }, radius: 4 },
      { position: { x: 348, y: 380 }, radius: 5 },
      { position: { x: 370, y: 280 }, radius: 7 },
      { position: { x: 50, y: 540 }, radius: 5 }
    ],
    boulders: [
      { boundary: { points: [{ x: 268, y: 245 }, { x: 298, y: 258 }, { x: 316, y: 285 }, { x: 303, y: 318 }, { x: 273, y: 338 }, { x: 240, y: 332 }, { x: 222, y: 300 }, { x: 236, y: 265 }] } },
      { boundary: { points: [{ x: 295, y: 192 }, { x: 309, y: 198 }, { x: 315, y: 210 }, { x: 309, y: 224 }, { x: 295, y: 230 }, { x: 281, y: 224 }, { x: 275, y: 210 }, { x: 281, y: 198 }] } },
      { boundary: { points: [{ x: 310, y: 354 }, { x: 322, y: 360 }, { x: 328, y: 370 }, { x: 322, y: 382 }, { x: 310, y: 388 }, { x: 298, y: 382 }, { x: 292, y: 370 }, { x: 298, y: 360 }] } }
    ],
  },
  // ─── The Wash — Par 3, 140y ────────────────────────────────
  {
    id: 'bjc-hole-13-par3',
    name: 'The Wash',
    par: 3,
    yardsLength: 140,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 548 },
    pinPosition: { x: 200, y: 78 },
    pinPositions: [{ x: 200, y: 78 }, { x: 215, y: 90 }, { x: 186, y: 93 }],
    greenBoundary: {
          points: [
            { x: 200, y: 66 },
          { x: 215, y: 70 },
          { x: 224, y: 81 },
          { x: 224, y: 93 },
          { x: 215, y: 104 },
          { x: 200, y: 108 },
          { x: 185, y: 104 },
          { x: 176, y: 93 },
          { x: 176, y: 81 },
          { x: 185, y: 70 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 163, y: 568 },
          { x: 237, y: 568 },
          { x: 240, y: 54 },
          { x: 160, y: 54 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 180, y: 88 }, { x: 189, y: 90 }, { x: 193, y: 96 }, { x: 189, y: 102 }, { x: 180, y: 104 }, { x: 171, y: 102 }, { x: 167, y: 96 }, { x: 171, y: 90 }] } },
      { boundary: { points: [{ x: 220, y: 90 }, { x: 229, y: 92 }, { x: 233, y: 98 }, { x: 229, y: 104 }, { x: 220, y: 106 }, { x: 211, y: 104 }, { x: 207, y: 98 }, { x: 211, y: 92 }] } },
      { boundary: { points: [{ x: 200, y: 352 }, { x: 239, y: 357 }, { x: 255, y: 370 }, { x: 239, y: 383 }, { x: 200, y: 388 }, { x: 161, y: 383 }, { x: 145, y: 370 }, { x: 161, y: 357 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 60, y: 280 }, radius: 5 },
      { position: { x: 45, y: 350 }, radius: 7 },
      { position: { x: 70, y: 420 }, radius: 4 },
      { position: { x: 55, y: 480 }, radius: 6 },
      { position: { x: 40, y: 530 }, radius: 5 },
      { position: { x: 80, y: 545 }, radius: 8 },
      { position: { x: 30, y: 470 }, radius: 4 },
      { position: { x: 75, y: 300 }, radius: 6 },
      { position: { x: 330, y: 280 }, radius: 6 },
      { position: { x: 345, y: 360 }, radius: 5 },
      { position: { x: 360, y: 430 }, radius: 7 },
      { position: { x: 340, y: 490 }, radius: 4 },
      { position: { x: 355, y: 540 }, radius: 6 },
      { position: { x: 370, y: 310 }, radius: 4 },
      { position: { x: 320, y: 510 }, radius: 5 },
      { position: { x: 365, y: 550 }, radius: 7 },
      { position: { x: 50, y: 560 }, radius: 5 },
      { position: { x: 350, y: 560 }, radius: 8 }
    ],
    boulders: [
      { boundary: { points: [{ x: 95, y: 350 }, { x: 110, y: 357 }, { x: 117, y: 370 }, { x: 110, y: 387 }, { x: 95, y: 394 }, { x: 80, y: 387 }, { x: 73, y: 370 }, { x: 80, y: 357 }] } },
      { boundary: { points: [{ x: 100, y: 422 }, { x: 114, y: 428 }, { x: 120, y: 440 }, { x: 114, y: 454 }, { x: 100, y: 460 }, { x: 86, y: 454 }, { x: 80, y: 440 }, { x: 86, y: 428 }] } },
      { boundary: { points: [{ x: 305, y: 345 }, { x: 320, y: 352 }, { x: 327, y: 365 }, { x: 320, y: 382 }, { x: 305, y: 389 }, { x: 290, y: 382 }, { x: 283, y: 365 }, { x: 290, y: 352 }] } },
      { boundary: { points: [{ x: 300, y: 422 }, { x: 314, y: 428 }, { x: 320, y: 440 }, { x: 314, y: 454 }, { x: 300, y: 460 }, { x: 286, y: 454 }, { x: 280, y: 440 }, { x: 286, y: 428 }] } },
      { boundary: { points: [{ x: 200, y: 22 }, { x: 238, y: 34 }, { x: 255, y: 48 }, { x: 238, y: 60 }, { x: 200, y: 66 }, { x: 162, y: 60 }, { x: 145, y: 48 }, { x: 162, y: 34 }] } }
    ],
  },
  // ─── Cliff Turn — Par 4, 340y ────────────────────────────────
  {
    id: 'bjc-hole-14-par4',
    name: 'Cliff Turn',
    par: 4,
    yardsLength: 340,
    courseTheme: 'desert' as const,
    teePosition: { x: 120, y: 548 },
    pinPosition: { x: 285, y: 70 },
    pinPositions: [{ x: 285, y: 70 }, { x: 302, y: 82 }, { x: 268, y: 85 }],
    greenBoundary: {
          points: [
            { x: 285, y: 55 },
          { x: 303, y: 60 },
          { x: 314, y: 72 },
          { x: 314, y: 88 },
          { x: 303, y: 100 },
          { x: 285, y: 105 },
          { x: 267, y: 100 },
          { x: 256, y: 88 },
          { x: 256, y: 72 },
          { x: 267, y: 60 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 75, y: 548 },
          { x: 165, y: 572 },
          { x: 295, y: 295 },
          { x: 335, y: 42 },
          { x: 245, y: 42 },
          { x: 170, y: 295 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 265, y: 81 }, { x: 274, y: 84 }, { x: 278, y: 90 }, { x: 274, y: 96 }, { x: 265, y: 99 }, { x: 256, y: 96 }, { x: 252, y: 90 }, { x: 256, y: 84 }] } },
      { boundary: { points: [{ x: 305, y: 79 }, { x: 314, y: 82 }, { x: 318, y: 88 }, { x: 314, y: 94 }, { x: 305, y: 97 }, { x: 296, y: 94 }, { x: 292, y: 88 }, { x: 296, y: 82 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 35, y: 200 }, radius: 5 },
      { position: { x: 50, y: 280 }, radius: 7 },
      { position: { x: 40, y: 360 }, radius: 4 },
      { position: { x: 70, y: 440 }, radius: 6 },
      { position: { x: 45, y: 500 }, radius: 5 },
      { position: { x: 30, y: 540 }, radius: 8 },
      { position: { x: 60, y: 555 }, radius: 4 },
      { position: { x: 80, y: 510 }, radius: 6 },
      { position: { x: 355, y: 430 }, radius: 6 },
      { position: { x: 370, y: 510 }, radius: 5 },
      { position: { x: 340, y: 545 }, radius: 7 },
      { position: { x: 380, y: 350 }, radius: 4 },
      { position: { x: 360, y: 270 }, radius: 6 },
      { position: { x: 375, y: 370 }, radius: 5 },
      { position: { x: 345, y: 540 }, radius: 5 },
      { position: { x: 375, y: 480 }, radius: 7 },
      { position: { x: 50, y: 560 }, radius: 5 }
    ],
    boulders: [
      { boundary: { points: [{ x: 355, y: 245 }, { x: 380, y: 255 }, { x: 393, y: 280 }, { x: 385, y: 305 }, { x: 360, y: 327 }, { x: 330, y: 323 }, { x: 315, y: 300 }, { x: 320, y: 265 }] } },
      { boundary: { points: [{ x: 370, y: 175 }, { x: 388, y: 182 }, { x: 398, y: 200 }, { x: 388, y: 222 }, { x: 370, y: 230 }, { x: 352, y: 222 }, { x: 342, y: 200 }, { x: 352, y: 182 }] } },
      { boundary: { points: [{ x: 72, y: 467 }, { x: 86, y: 473 }, { x: 92, y: 485 }, { x: 86, y: 499 }, { x: 72, y: 505 }, { x: 58, y: 499 }, { x: 52, y: 485 }, { x: 58, y: 473 }] } },
      { boundary: { points: [{ x: 48, y: 375 }, { x: 60, y: 380 }, { x: 66, y: 390 }, { x: 60, y: 402 }, { x: 48, y: 408 }, { x: 36, y: 402 }, { x: 30, y: 390 }, { x: 36, y: 380 }] } }
    ],
  },
  // ─── Long Haul — Par 4, 410y ────────────────────────────────
  {
    id: 'bjc-hole-15-par4',
    name: 'Long Haul',
    par: 4,
    yardsLength: 410,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 560 },
    pinPosition: { x: 200, y: 64 },
    pinPositions: [{ x: 200, y: 64 }, { x: 220, y: 76 }, { x: 182, y: 80 }],
    greenBoundary: {
          points: [
            { x: 200, y: 49 },
          { x: 218, y: 54 },
          { x: 229, y: 66 },
          { x: 229, y: 82 },
          { x: 218, y: 94 },
          { x: 200, y: 99 },
          { x: 182, y: 94 },
          { x: 171, y: 82 },
          { x: 171, y: 66 },
          { x: 182, y: 54 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 163, y: 580 },
          { x: 237, y: 580 },
          { x: 240, y: 40 },
          { x: 160, y: 40 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 176, y: 47 }, { x: 186, y: 50 }, { x: 190, y: 56 }, { x: 186, y: 62 }, { x: 176, y: 65 }, { x: 166, y: 62 }, { x: 162, y: 56 }, { x: 166, y: 50 }] } },
      { boundary: { points: [{ x: 224, y: 49 }, { x: 234, y: 52 }, { x: 238, y: 58 }, { x: 234, y: 64 }, { x: 224, y: 67 }, { x: 214, y: 64 }, { x: 210, y: 58 }, { x: 214, y: 52 }] } },
      { boundary: { points: [{ x: 162, y: 300 }, { x: 173, y: 303 }, { x: 178, y: 310 }, { x: 173, y: 317 }, { x: 162, y: 320 }, { x: 151, y: 317 }, { x: 146, y: 310 }, { x: 151, y: 303 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 55, y: 160 }, radius: 5 },
      { position: { x: 40, y: 250 }, radius: 7 },
      { position: { x: 75, y: 380 }, radius: 4 },
      { position: { x: 50, y: 460 }, radius: 6 },
      { position: { x: 85, y: 520 }, radius: 5 },
      { position: { x: 30, y: 540 }, radius: 8 },
      { position: { x: 95, y: 555 }, radius: 4 },
      { position: { x: 35, y: 490 }, radius: 6 },
      { position: { x: 325, y: 170 }, radius: 6 },
      { position: { x: 350, y: 260 }, radius: 5 },
      { position: { x: 360, y: 390 }, radius: 7 },
      { position: { x: 340, y: 460 }, radius: 4 },
      { position: { x: 365, y: 520 }, radius: 6 },
      { position: { x: 380, y: 390 }, radius: 4 },
      { position: { x: 355, y: 545 }, radius: 5 },
      { position: { x: 330, y: 560 }, radius: 7 },
      { position: { x: 50, y: 560 }, radius: 5 },
      { position: { x: 375, y: 480 }, radius: 8 }
    ],
    boulders: [
      { boundary: { points: [{ x: 95, y: 268 }, { x: 119, y: 278 }, { x: 131, y: 300 }, { x: 119, y: 326 }, { x: 95, y: 336 }, { x: 71, y: 326 }, { x: 59, y: 300 }, { x: 71, y: 278 }] } },
      { boundary: { points: [{ x: 305, y: 268 }, { x: 329, y: 278 }, { x: 341, y: 300 }, { x: 329, y: 326 }, { x: 305, y: 336 }, { x: 281, y: 326 }, { x: 269, y: 300 }, { x: 281, y: 278 }] } },
      { boundary: { points: [{ x: 80, y: 160 }, { x: 95, y: 167 }, { x: 102, y: 180 }, { x: 95, y: 197 }, { x: 80, y: 204 }, { x: 65, y: 197 }, { x: 58, y: 180 }, { x: 65, y: 167 }] } }
    ],
  },
  // ─── Three Canyons — Par 5, 480y ────────────────────────────────
  {
    id: 'bjc-hole-16-par5',
    name: 'Three Canyons',
    par: 5,
    yardsLength: 480,
    courseTheme: 'desert' as const,
    teePosition: { x: 80, y: 550 },
    pinPosition: { x: 310, y: 95 },
    pinPositions: [{ x: 310, y: 95 }, { x: 335, y: 82 }, { x: 285, y: 78 }, { x: 310, y: 72 }],
    greenBoundary: {
          points: [
            { x: 310, y: 113 },
          { x: 331, y: 108 },
          { x: 343, y: 94 },
          { x: 343, y: 76 },
          { x: 331, y: 62 },
          { x: 310, y: 57 },
          { x: 289, y: 62 },
          { x: 277, y: 76 },
          { x: 277, y: 94 },
          { x: 289, y: 108 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 25, y: 570 },
          { x: 155, y: 570 },
          { x: 385, y: 12 },
          { x: 255, y: 12 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 290, y: 104 }, { x: 300, y: 101 }, { x: 304, y: 95 }, { x: 300, y: 89 }, { x: 290, y: 86 }, { x: 280, y: 89 }, { x: 276, y: 95 }, { x: 280, y: 101 }] } },
      { boundary: { points: [{ x: 332, y: 101 }, { x: 343, y: 98 }, { x: 347, y: 92 }, { x: 343, y: 86 }, { x: 332, y: 83 }, { x: 321, y: 86 }, { x: 317, y: 92 }, { x: 321, y: 98 }] } },
      { boundary: { points: [{ x: 192, y: 299 }, { x: 222, y: 295 }, { x: 234, y: 285 }, { x: 222, y: 275 }, { x: 192, y: 271 }, { x: 162, y: 275 }, { x: 150, y: 285 }, { x: 162, y: 295 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 40, y: 490 }, radius: 5 },
      { position: { x: 55, y: 420 }, radius: 7 },
      { position: { x: 35, y: 340 }, radius: 4 },
      { position: { x: 65, y: 435 }, radius: 6 },
      { position: { x: 45, y: 220 }, radius: 5 },
      { position: { x: 80, y: 155 }, radius: 8 },
      { position: { x: 50, y: 90 }, radius: 4 },
      { position: { x: 90, y: 60 }, radius: 6 },
      { position: { x: 225, y: 450 }, radius: 6 },
      { position: { x: 195, y: 380 }, radius: 5 },
      { position: { x: 205, y: 310 }, radius: 7 },
      { position: { x: 215, y: 240 }, radius: 4 },
      { position: { x: 235, y: 120 }, radius: 6 },
      { position: { x: 275, y: 110 }, radius: 5 },
      { position: { x: 330, y: 40 }, radius: 7 },
      { position: { x: 360, y: 60 }, radius: 4 },
      { position: { x: 355, y: 20 }, radius: 5 },
      { position: { x: 380, y: 90 }, radius: 8 }
    ],
    boulders: [
      { boundary: { points: [{ x: 125, y: 433 }, { x: 145, y: 423 }, { x: 155, y: 405 }, { x: 145, y: 381 }, { x: 125, y: 373 }, { x: 105, y: 381 }, { x: 95, y: 405 }, { x: 105, y: 423 }] } },
      { boundary: { points: [{ x: 155, y: 397 }, { x: 171, y: 390 }, { x: 179, y: 375 }, { x: 171, y: 357 }, { x: 155, y: 350 }, { x: 139, y: 357 }, { x: 131, y: 375 }, { x: 139, y: 390 }] } },
      { boundary: { points: [{ x: 238, y: 218 }, { x: 258, y: 208 }, { x: 268, y: 190 }, { x: 258, y: 166 }, { x: 238, y: 158 }, { x: 218, y: 166 }, { x: 208, y: 190 }, { x: 218, y: 208 }] } },
      { boundary: { points: [{ x: 265, y: 182 }, { x: 281, y: 175 }, { x: 289, y: 160 }, { x: 281, y: 142 }, { x: 265, y: 135 }, { x: 249, y: 142 }, { x: 241, y: 160 }, { x: 249, y: 175 }] } },
      { boundary: { points: [{ x: 365, y: 110 }, { x: 387, y: 100 }, { x: 397, y: 80 }, { x: 387, y: 54 }, { x: 365, y: 45 }, { x: 343, y: 54 }, { x: 333, y: 80 }, { x: 343, y: 100 }] } }
    ],
  },
  // ─── The Crossing — Par 3, 155y ────────────────────────────────
  {
    id: 'bjc-hole-17-par3',
    name: 'The Crossing',
    par: 3,
    yardsLength: 155,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 558 },
    pinPosition: { x: 200, y: 74 },
    pinPositions: [{ x: 200, y: 74 }, { x: 215, y: 85 }, { x: 187, y: 88 }],
    greenBoundary: {
          points: [
            { x: 200, y: 62 },
          { x: 214, y: 66 },
          { x: 222, y: 76 },
          { x: 222, y: 88 },
          { x: 214, y: 98 },
          { x: 200, y: 102 },
          { x: 186, y: 98 },
          { x: 178, y: 88 },
          { x: 178, y: 76 },
          { x: 186, y: 66 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 171, y: 578 },
          { x: 229, y: 578 },
          { x: 232, y: 48 },
          { x: 168, y: 48 }
          ]
        },
    waterHazards: [],
    bunkers: [
      { boundary: { points: [{ x: 200, y: 87 }, { x: 211, y: 90 }, { x: 215, y: 96 }, { x: 211, y: 102 }, { x: 200, y: 105 }, { x: 189, y: 102 }, { x: 185, y: 96 }, { x: 189, y: 90 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 38, y: 240 }, radius: 6 },
      { position: { x: 50, y: 310 }, radius: 8 },
      { position: { x: 35, y: 380 }, radius: 5 },
      { position: { x: 55, y: 450 }, radius: 7 },
      { position: { x: 40, y: 510 }, radius: 5 },
      { position: { x: 70, y: 540 }, radius: 8 },
      { position: { x: 30, y: 480 }, radius: 4 },
      { position: { x: 85, y: 510 }, radius: 6 },
      { position: { x: 345, y: 250 }, radius: 6 },
      { position: { x: 360, y: 330 }, radius: 8 },
      { position: { x: 350, y: 400 }, radius: 5 },
      { position: { x: 340, y: 475 }, radius: 7 },
      { position: { x: 365, y: 520 }, radius: 5 },
      { position: { x: 380, y: 460 }, radius: 8 },
      { position: { x: 355, y: 545 }, radius: 4 },
      { position: { x: 330, y: 560 }, radius: 6 },
      { position: { x: 52, y: 558 }, radius: 5 },
      { position: { x: 350, y: 558 }, radius: 7 }
    ],
    boulders: [
      { boundary: { points: [{ x: 80, y: 235 }, { x: 112, y: 248 }, { x: 130, y: 275 }, { x: 118, y: 308 }, { x: 85, y: 328 }, { x: 50, y: 322 }, { x: 32, y: 292 }, { x: 45, y: 258 }] } },
      { boundary: { points: [{ x: 65, y: 382 }, { x: 93, y: 394 }, { x: 107, y: 420 }, { x: 93, y: 452 }, { x: 65, y: 464 }, { x: 37, y: 452 }, { x: 23, y: 420 }, { x: 37, y: 394 }] } },
      { boundary: { points: [{ x: 320, y: 230 }, { x: 352, y: 243 }, { x: 370, y: 270 }, { x: 358, y: 303 }, { x: 325, y: 323 }, { x: 290, y: 317 }, { x: 272, y: 287 }, { x: 285, y: 253 }] } },
      { boundary: { points: [{ x: 335, y: 387 }, { x: 363, y: 399 }, { x: 377, y: 425 }, { x: 363, y: 457 }, { x: 335, y: 469 }, { x: 307, y: 457 }, { x: 293, y: 425 }, { x: 307, y: 399 }] } },
      { boundary: { points: [{ x: 128, y: 53 }, { x: 144, y: 60 }, { x: 150, y: 75 }, { x: 144, y: 93 }, { x: 128, y: 100 }, { x: 112, y: 93 }, { x: 106, y: 75 }, { x: 112, y: 60 }] } },
      { boundary: { points: [{ x: 272, y: 51 }, { x: 288, y: 58 }, { x: 294, y: 73 }, { x: 288, y: 91 }, { x: 272, y: 98 }, { x: 256, y: 91 }, { x: 250, y: 73 }, { x: 256, y: 58 }] } },
      { boundary: { points: [{ x: 200, y: 304 }, { x: 235, y: 314 }, { x: 250, y: 325 }, { x: 235, y: 336 }, { x: 200, y: 340 }, { x: 165, y: 336 }, { x: 150, y: 325 }, { x: 165, y: 314 }] } }
    ],
  },
  // ─── Sunset Finish — Par 5, 450y ────────────────────────────────
  {
    id: 'bjc-hole-18-par5',
    name: 'Sunset Finish',
    par: 5,
    yardsLength: 450,
    courseTheme: 'desert' as const,
    teePosition: { x: 200, y: 550 },
    pinPosition: { x: 185, y: 102 },
    pinPositions: [{ x: 185, y: 102 }, { x: 210, y: 88 }, { x: 162, y: 84 }, { x: 185, y: 78 }],
    greenBoundary: {
          points: [
            { x: 185, y: 120 },
          { x: 206, y: 115 },
          { x: 218, y: 101 },
          { x: 218, y: 83 },
          { x: 206, y: 69 },
          { x: 185, y: 64 },
          { x: 164, y: 69 },
          { x: 152, y: 83 },
          { x: 152, y: 101 },
          { x: 164, y: 115 }
          ]
        },
    fairwayBoundary: {
          points: [
            { x: 138, y: 572 },
          { x: 262, y: 572 },
          { x: 248, y: 12 },
          { x: 122, y: 12 }
          ]
        },
    waterHazards: [
      { boundary: { points: [{ x: 115, y: 122 }, { x: 165, y: 122 }, { x: 165, y: 70 }, { x: 115, y: 70 }] }, dropZone: { x: 190, y: 160 } }
    ],
    bunkers: [
      { boundary: { points: [{ x: 245, y: 102 }, { x: 256, y: 99 }, { x: 260, y: 92 }, { x: 256, y: 85 }, { x: 245, y: 82 }, { x: 234, y: 85 }, { x: 230, y: 92 }, { x: 234, y: 99 }] } },
      { boundary: { points: [{ x: 262, y: 87 }, { x: 272, y: 84 }, { x: 276, y: 78 }, { x: 272, y: 72 }, { x: 262, y: 69 }, { x: 252, y: 72 }, { x: 248, y: 78 }, { x: 252, y: 84 }] } }
    ],
    trees: [],
    bushes: [],
    rocks: [
      { position: { x: 45, y: 440 }, radius: 5 },
      { position: { x: 35, y: 360 }, radius: 7 },
      { position: { x: 70, y: 270 }, radius: 4 },
      { position: { x: 50, y: 180 }, radius: 6 },
      { position: { x: 80, y: 110 }, radius: 5 },
      { position: { x: 30, y: 60 }, radius: 8 },
      { position: { x: 95, y: 45 }, radius: 4 },
      { position: { x: 40, y: 120 }, radius: 6 },
      { position: { x: 330, y: 440 }, radius: 6 },
      { position: { x: 350, y: 360 }, radius: 5 },
      { position: { x: 365, y: 260 }, radius: 7 },
      { position: { x: 340, y: 180 }, radius: 4 },
      { position: { x: 360, y: 110 }, radius: 6 },
      { position: { x: 375, y: 270 }, radius: 4 },
      { position: { x: 355, y: 55 }, radius: 5 },
      { position: { x: 330, y: 40 }, radius: 7 },
      { position: { x: 55, y: 40 }, radius: 5 }
    ],
    boulders: [
      { boundary: { points: [{ x: 60, y: 430 }, { x: 82, y: 420 }, { x: 92, y: 400 }, { x: 82, y: 374 }, { x: 60, y: 365 }, { x: 38, y: 374 }, { x: 28, y: 400 }, { x: 38, y: 420 }] } },
      { boundary: { points: [{ x: 45, y: 276 }, { x: 65, y: 268 }, { x: 73, y: 250 }, { x: 65, y: 228 }, { x: 45, y: 220 }, { x: 25, y: 228 }, { x: 17, y: 250 }, { x: 25, y: 268 }] } },
      { boundary: { points: [{ x: 340, y: 450 }, { x: 362, y: 440 }, { x: 372, y: 420 }, { x: 362, y: 394 }, { x: 340, y: 385 }, { x: 318, y: 394 }, { x: 308, y: 420 }, { x: 318, y: 440 }] } },
      { boundary: { points: [{ x: 355, y: 296 }, { x: 375, y: 288 }, { x: 383, y: 270 }, { x: 375, y: 248 }, { x: 355, y: 240 }, { x: 335, y: 248 }, { x: 327, y: 270 }, { x: 335, y: 288 }] } },
      { boundary: { points: [{ x: 85, y: 150 }, { x: 100, y: 143 }, { x: 107, y: 130 }, { x: 100, y: 113 }, { x: 85, y: 106 }, { x: 70, y: 113 }, { x: 63, y: 130 }, { x: 70, y: 143 }] } }
    ],
  },
];

export const BLACK_JACKS_CROSSING: CourseDefinition = {
  id: 'black-jacks-crossing',
  name: "Black Jack's Crossing",
  theme: 'desert',
  holes: BLACK_JACKS_CROSSING_HOLES,
};
