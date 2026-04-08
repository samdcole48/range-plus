import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HoleView } from './HoleView';
import { PRESET_HOLES } from '../data/holes';
import { calculateDistanceYards } from '../domain/game';

const hole = PRESET_HOLES[0];

function tapToPlace(svg: Element, clientX: number, clientY: number) {
  fireEvent.click(svg, { clientX, clientY });
  fireEvent.click(screen.getByText('Confirm'));
}

describe('HoleView', () => {
  it('renders the pin at one of the hole pinPositions coordinates', () => {
    render(<HoleView hole={hole} />);
    const pin = document.querySelector('[data-testid="pin"]');
    expect(pin).toBeInTheDocument();
    const cx = Number(pin?.getAttribute('cx'));
    const cy = Number(pin?.getAttribute('cy'));
    const matchesAPin = hole.pinPositions.some(p => p.x === cx && p.y === cy);
    expect(matchesAPin).toBe(true);
  });

  it('renders the SVG course canvas', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('displays the par for the hole', () => {
    render(<HoleView hole={hole} />);
    expect(screen.getByText('Par')).toBeInTheDocument();
    expect(screen.getByText(String(hole.par))).toBeInTheDocument();
  });

  it('displays distance to green from tee on load', () => {
    render(<HoleView hole={hole} />);
    // Distance shown reflects tee → activePinPosition (randomly selected from pinPositions)
    const validDistances = hole.pinPositions.map(p =>
      calculateDistanceYards(hole.teePosition, p, hole)
    );
    const pattern = new RegExp(`(${validDistances.join('|')})\\s*yds`, 'i');
    expect(screen.getByText(pattern)).toBeInTheDocument();
  });

  it('shows the ball marker on the tee initially', () => {
    render(<HoleView hole={hole} />);
    const ball = document.querySelector('[data-testid="ball"]');
    expect(ball).toBeInTheDocument();
    expect(ball?.getAttribute('cx')).toBe(String(hole.teePosition.x));
    expect(ball?.getAttribute('cy')).toBe(String(hole.teePosition.y));
  });

  it('moves the ball when the course is tapped', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;

    const svgRect = { left: 0, top: 0, width: 400, height: 600 };
    svg.getBoundingClientRect = () => svgRect as DOMRect;

    tapToPlace(svg, 200, 300);

    const ball = document.querySelector('[data-testid="ball"]');
    expect(ball?.getAttribute('cx')).toBe('200');
    expect(ball?.getAttribute('cy')).toBe('300');
  });

  it('updates yardage after a shot is placed', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;

    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    tapToPlace(svg, 200, 300);

    // Should no longer show 355 yds (tee distance)
    expect(screen.queryByText(/355\s*yds/i)).not.toBeInTheDocument();
    // Should show updated distance
    expect(screen.getByText(/yds/i)).toBeInTheDocument();
  });

  it('displays stroke count as 0 on initial load', () => {
    render(<HoleView hole={hole} />);
    expect(screen.getByTestId('stroke-count')).toHaveTextContent('0');
  });

  it('displays stroke count as 1 after first shot', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    tapToPlace(svg, 200, 300);

    expect(screen.getByTestId('stroke-count')).toHaveTextContent('1');
  });

  it('increments stroke count on each subsequent shot', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    tapToPlace(svg, 200, 400);
    tapToPlace(svg, 200, 300);
    tapToPlace(svg, 200, 200);

    expect(screen.getByTestId('stroke-count')).toHaveTextContent('3');
  });

  it('displays a stroke label alongside the count', () => {
    render(<HoleView hole={hole} />);
    expect(screen.getByText(/Strokes/i)).toBeInTheDocument();
  });

  it('does not render a one-putt radius circle around the pin', () => {
    render(<HoleView hole={hole} />);
    // Per REMOVE-1PUTT-02: one-putt radius visual is removed
    expect(document.querySelector('[data-testid="one-putt-radius"]')).not.toBeInTheDocument();
  });

  it('shows shot preview with distance on first tap', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    fireEvent.click(svg, { clientX: 200, clientY: 300 });

    const preview = document.querySelector('[data-testid="shot-preview"]');
    expect(preview).toBeInTheDocument();
    expect(preview?.textContent).toMatch(/\d+/);
    // Ball should NOT have moved yet
    const ball = document.querySelector('[data-testid="ball"]');
    expect(ball?.getAttribute('cx')).toBe(String(hole.teePosition.x));
    expect(ball?.getAttribute('cy')).toBe(String(hole.teePosition.y));
  });

  it('moves preview when tapping elsewhere on the course', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    fireEvent.click(svg, { clientX: 200, clientY: 300 });
    fireEvent.click(svg, { clientX: 100, clientY: 400 });
    expect(document.querySelector('[data-testid="shot-preview"]')).toBeInTheDocument();
    expect(screen.getByTestId('stroke-count')).toHaveTextContent('0');
  });

  it('draws shot tracer lines after hole is complete', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Take a shot to fairway, then to green
    tapToPlace(svg, 200, 300);
    tapToPlace(svg, 200, 70);

    const tracerLines = document.querySelectorAll('[data-testid="shot-tracer-line"]');
    expect(tracerLines.length).toBeGreaterThan(0);
  });

  it('highlights the green landing zone after completion', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Land on green
    tapToPlace(svg, 200, 70);

    const highlight = document.querySelector('[data-testid="green-landing-zone"]');
    expect(highlight).toBeInTheDocument();
  });

  it('landing zone highlight is always a polygon (never a circle)', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Land on green close to pin — previously showed a circle, now always a polygon
    tapToPlace(svg, 200, 60);

    const highlight = document.querySelector('[data-testid="green-landing-zone"]');
    // Per REMOVE-1PUTT-05: always a polygon element, not a circle
    expect(highlight?.tagName.toLowerCase()).toBe('polygon');
  });

  it('does not show shot tracer before hole is complete', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    tapToPlace(svg, 200, 300);

    const tracerLines = document.querySelectorAll('[data-testid="shot-tracer-line"]');
    expect(tracerLines.length).toBe(0);
  });

  it('shows score in HUD when ball lands on the green', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // First shot to fairway
    tapToPlace(svg, 200, 300);
    // Second shot lands on the green far from pin (200,70 is inside green boundary)
    tapToPlace(svg, 200, 70);

    expect(screen.getByTestId('hud-complete')).toBeInTheDocument();
  });

  it('displays the score label in the HUD on completion', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Shot to fairway, then to green far from pin
    tapToPlace(svg, 200, 300);
    tapToPlace(svg, 200, 70);

    expect(screen.getByTestId('score-label')).toBeInTheDocument();
  });

  it('displays final stroke total in the HUD on completion', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    tapToPlace(svg, 200, 300);
    tapToPlace(svg, 200, 70);

    expect(screen.getByTestId('final-strokes')).toBeInTheDocument();
  });

  it('prevents further shots after hole is complete', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Land on green right at the pin → complete
    tapToPlace(svg, 200, 60);
    const strokesText = screen.getByTestId('final-strokes').textContent;

    // Try clicking again (should be ignored even as first tap)
    fireEvent.click(svg, { clientX: 200, clientY: 300 });
    expect(screen.getByTestId('final-strokes').textContent).toBe(strokesText);
  });

  // CHG-BTN-007: First tap still shows preview crosshair with distance label (BASE-TAP-001 regression)
  it('shows preview crosshair and distance label on first tap', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    fireEvent.click(svg, { clientX: 200, clientY: 300 });

    const preview = document.querySelector('[data-testid="shot-preview"]');
    expect(preview).toBeInTheDocument();
    expect(preview?.textContent).toMatch(/\d+y/);
  });

  // CHG-BTN-006: "Tap to hit" hint no longer rendered in SVG
  it('does not show "Tap to hit" hint text when preview is active', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    fireEvent.click(svg, { clientX: 200, clientY: 300 });

    expect(screen.queryByText(/tap to hit/i)).not.toBeInTheDocument();
  });

  // CHG-BTN-004: Confirm button hidden when no preview active
  it('does not show Confirm button before any tap', () => {
    render(<HoleView hole={hole} />);
    expect(document.querySelector('[data-testid="confirm-button"]')).not.toBeInTheDocument();
  });

  // CHG-BTN-005: Confirm button hidden when hole is complete
  it('does not show Confirm button when hole is complete', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Land on green to complete the hole
    tapToPlace(svg, 200, 70);

    expect(document.querySelector('[data-testid="confirm-button"]')).not.toBeInTheDocument();
  });

  // CHG-BTN-003: Tapping near existing preview repositions (no 30px confirm threshold)
  it('repositions preview when tapping within 30px of current preview', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    fireEvent.click(svg, { clientX: 200, clientY: 300 });
    // Tap within 30px (same point) — under old code this would confirm; under new code it repositions
    fireEvent.click(svg, { clientX: 205, clientY: 305 });

    expect(screen.getByTestId('stroke-count')).toHaveTextContent('0');
    expect(document.querySelector('[data-testid="shot-preview"]')).toBeInTheDocument();
  });

  // CHG-BTN-002: Clicking confirm button places the shot
  it('places shot and clears preview when Confirm is clicked', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    fireEvent.click(svg, { clientX: 200, clientY: 300 });
    expect(screen.getByText('Confirm')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Confirm'));

    expect(screen.getByTestId('stroke-count')).toHaveTextContent('1');
    expect(document.querySelector('[data-testid="shot-preview"]')).not.toBeInTheDocument();
    expect(document.querySelector('[data-testid="confirm-button"]')).not.toBeInTheDocument();
  });

  // CHG-BTN-001: Confirm button appears when preview is active
  it('shows Confirm button when a preview is active', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    fireEvent.click(svg, { clientX: 200, clientY: 300 });

    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('renders water hazards on the course', () => {
    render(<HoleView hole={hole} />);
    const water = document.querySelectorAll('[data-testid="water-hazard"]');
    expect(water.length).toBe(hole.waterHazards.length);
  });

  it('adds penalty and moves ball to drop zone when tapping water', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Tap inside the water hazard (center ≈ 280, 220)
    tapToPlace(svg, 280, 220);

    // 1 shot + 1 penalty = 2 strokes
    expect(screen.getByTestId('stroke-count')).toHaveTextContent('2');

    // Ball should be at drop zone
    const ball = document.querySelector('[data-testid="ball"]');
    expect(ball?.getAttribute('cx')).toBe(String(hole.waterHazards[0].dropZone.x));
    expect(ball?.getAttribute('cy')).toBe(String(hole.waterHazards[0].dropZone.y));
  });

  it('shows score in HUD when hole is complete', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    tapToPlace(svg, 200, 300);
    tapToPlace(svg, 200, 70);

    expect(screen.getByTestId('hud-complete')).toBeInTheDocument();
    expect(screen.getByTestId('score-label')).toBeInTheDocument();
    // Normal HUD items should NOT be rendered
    expect(screen.queryByText('To Pin')).not.toBeInTheDocument();
  });

  it('always shows 2 Putts in HUD when landing on green', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Land very close to pin — previously showed "1 Putt 🎯", now always "2 Putts"
    tapToPlace(svg, 200, 60);

    expect(screen.getByTestId('putt-count')).toHaveTextContent('2 Putts');
  });

  it('always shows 2 Putts in HUD when landing outside one-putt zone', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Land on green far from pin
    tapToPlace(svg, 200, 300);
    tapToPlace(svg, 200, 70);

    const puttEl = screen.getByTestId('putt-count');
    expect(puttEl).toHaveTextContent('2 Putts');
    // Per REMOVE-1PUTT-03: the "1 Putt 🎯" text must never appear
    expect(puttEl).not.toHaveTextContent('1 Putt');
  });

  it('does not show score-card element on completion', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    tapToPlace(svg, 200, 300);
    tapToPlace(svg, 200, 70);

    expect(screen.queryByTestId('score-card')).not.toBeInTheDocument();
  });

  it('shows normal HUD items during play', () => {
    render(<HoleView hole={hole} />);

    expect(screen.getByText('Par')).toBeInTheDocument();
    expect(screen.getByText('Strokes')).toBeInTheDocument();
    expect(screen.getByText('To Pin')).toBeInTheDocument();
    expect(screen.queryByTestId('hud-complete')).not.toBeInTheDocument();
  });

  it('shows stroke count in HUD on completion', () => {
    render(<HoleView hole={hole} />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    tapToPlace(svg, 200, 300);
    tapToPlace(svg, 200, 70);

    expect(screen.getByTestId('final-strokes')).toHaveTextContent(/\d+ Strokes/);
  });
});

// ─── Rendering tests for decorative elements (CHG-VIS-010) ──

describe('Decorative rendering — CHG-VIS-010 (bushes)', () => {
  it('renders bush elements when hole has bushes', () => {
    // PRESET_HOLES[0] (The Welcome) has bushes
    const holeWithBushes = PRESET_HOLES[0];
    expect((holeWithBushes.bushes ?? []).length).toBeGreaterThan(0);
    render(<HoleView hole={holeWithBushes} />);
    const bushes = document.querySelectorAll('[data-testid="bush"]');
    expect(bushes.length).toBeGreaterThan(0);
    expect(bushes.length).toBe((holeWithBushes.bushes ?? []).length);
  });
});

// ─── Task 24 — CHG-COURSE-024: Desert rough background ────────────────────────

// Minimal mock desert-theme hole for testing desert rendering without BJC dependency
const desertHole = {
  id: 'mock-desert-1',
  name: 'Mock Desert Hole',
  par: 4 as const,
  yardsLength: 350,
  courseTheme: 'desert' as const,
  teePosition: { x: 200, y: 560 },
  pinPosition: { x: 200, y: 80 },
  pinPositions: [{ x: 200, y: 80 }, { x: 185, y: 70 }, { x: 215, y: 70 }],
  greenBoundary: {
    points: [
      { x: 220, y: 62 }, { x: 217, y: 73 }, { x: 208, y: 90 },
      { x: 200, y: 93 }, { x: 188, y: 90 }, { x: 178, y: 73 },
      { x: 175, y: 62 }, { x: 178, y: 52 }, { x: 188, y: 44 },
      { x: 200, y: 41 }, { x: 213, y: 44 }, { x: 217, y: 52 },
    ],
  },
  fairwayBoundary: {
    points: [
      { x: 170, y: 30 }, { x: 230, y: 30 },
      { x: 235, y: 100 }, { x: 240, y: 200 },
      { x: 240, y: 400 }, { x: 230, y: 540 },
      { x: 225, y: 575 }, { x: 175, y: 575 },
      { x: 170, y: 540 }, { x: 160, y: 400 },
      { x: 160, y: 200 }, { x: 165, y: 100 },
    ],
  },
  waterHazards: [],
  rocks: [
    { position: { x: 150, y: 200 }, radius: 6 },
    { position: { x: 260, y: 300 }, radius: 5 },
    { position: { x: 140, y: 400 }, radius: 7 },
  ],
  boulders: [
    { boundary: { points: [
      { x: 80, y: 150 }, { x: 95, y: 140 }, { x: 105, y: 150 },
      { x: 100, y: 165 }, { x: 85, y: 168 },
    ] } },
    { boundary: { points: [
      { x: 310, y: 250 }, { x: 325, y: 242 }, { x: 335, y: 252 },
      { x: 330, y: 265 }, { x: 315, y: 268 },
    ] } },
  ],
};

describe('Desert rendering — CHG-COURSE-024 (sandy rough)', () => {
  it('renders desert-rough background element for desert-theme hole', () => {
    render(<HoleView hole={desertHole} />);
    const desertRough = document.querySelector('[data-testid="desert-rough"]');
    expect(desertRough).toBeInTheDocument();
  });

  it('does NOT render desert-rough for classic-theme hole', () => {
    render(<HoleView hole={hole} />);
    const desertRough = document.querySelector('[data-testid="desert-rough"]');
    expect(desertRough).not.toBeInTheDocument();
  });
});

// ─── Task 25 — CHG-COURSE-025: Rocks rendered as SVG circles ─────────────────

describe('Desert rendering — CHG-COURSE-025 (rocks)', () => {
  it('renders rock circle elements for each rock on a desert hole', () => {
    render(<HoleView hole={desertHole} />);
    const rocks = document.querySelectorAll('[data-testid="rock"]');
    expect(rocks.length).toBe((desertHole.rocks ?? []).length);
    expect(rocks.length).toBeGreaterThan(0);
  });

  it('renders no rock elements for a classic hole', () => {
    render(<HoleView hole={hole} />);
    const rocks = document.querySelectorAll('[data-testid="rock"]');
    expect(rocks.length).toBe(0);
  });
});

// ─── Task 26 — CHG-COURSE-026: Boulders rendered as SVG polygons ─────────────

describe('Desert rendering — CHG-COURSE-026 (boulders)', () => {
  it('renders boulder polygon elements for each boulder on a desert hole', () => {
    render(<HoleView hole={desertHole} />);
    const boulders = document.querySelectorAll('[data-testid="boulder"]');
    expect(boulders.length).toBe((desertHole.boulders ?? []).length);
    expect(boulders.length).toBeGreaterThan(0);
  });

  it('renders no boulder elements for a classic hole', () => {
    render(<HoleView hole={hole} />);
    const boulders = document.querySelectorAll('[data-testid="boulder"]');
    expect(boulders.length).toBe(0);
  });
});

// ─── Task 27 — CHG-COURSE-027: Classic holes still render green rough ─────────

describe('Desert rendering — CHG-COURSE-027 (classic regression)', () => {
  it('classic hole renders the standard green rough background', () => {
    render(<HoleView hole={hole} />);
    // Classic rough is a plain rect without the desert-rough testid
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // The classic rough rect should exist (background layer)
    const rects = svg?.querySelectorAll('rect');
    expect(rects && rects.length).toBeGreaterThan(0);
  });
});
