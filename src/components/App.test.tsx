import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

function tapToPlace(svg: Element, clientX: number, clientY: number) {
  fireEvent.click(svg, { clientX, clientY });
  fireEvent.click(svg, { clientX, clientY });
}

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText(/Range\+/)).toBeInTheDocument();
  });

  it('shows a "New Hole" button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /new hole/i })).toBeInTheDocument();
  });

  it('displays a hole on initial load', () => {
    render(<App />);
    expect(screen.getByText('Par')).toBeInTheDocument();
    expect(screen.getByText(/yds/i)).toBeInTheDocument();
  });

  it('loads a new hole when "New Hole" is clicked', () => {
    render(<App />);
    const svg = document.querySelector('svg')!;
    svg.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    // Take a shot so state changes (y=450 avoids all water hazards)
    tapToPlace(svg, 200, 450);
    expect(screen.getByTestId('stroke-count')).toHaveTextContent('1');

    // Click New Hole
    fireEvent.click(screen.getByRole('button', { name: /new hole/i }));

    // Stroke count should reset
    expect(screen.getByTestId('stroke-count')).toHaveTextContent('0');
  });
});
