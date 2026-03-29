import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HoleView } from './HoleView';
import { PRESET_HOLES } from '../data/holes';

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
    expect(screen.getByText(/355\s*yds/i)).toBeInTheDocument();
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
