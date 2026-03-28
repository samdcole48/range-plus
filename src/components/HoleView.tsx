import { useState, useCallback } from 'react';
import type { HoleDefinition, Point } from '../domain/types';
import { createGameState, placeShot, calculateDistanceYards, getScoreLabel, ONE_PUTT_THRESHOLD_FEET } from '../domain/game';

const FEET_PER_YARD = 3;

interface HoleViewProps {
  hole: HoleDefinition;
  onNewHole?: () => void;
}

function polygonToSvgPoints(points: Point[]): string {
  return points.map((p) => `${p.x},${p.y}`).join(' ');
}

function getScoreCssClass(strokes: number, par: number): string {
  if (strokes === 1) return 'birdie';
  const diff = strokes - par;
  if (diff <= -2) return 'eagle';
  if (diff === -1) return 'birdie';
  if (diff === 0) return 'par';
  if (diff === 1) return 'bogey';
  return 'over';
}

export function HoleView({ hole, onNewHole }: HoleViewProps) {
  const [gameState, setGameState] = useState(() => createGameState(hole));

  const distanceToPin = calculateDistanceYards(
    gameState.ballPosition,
    hole.pinPosition,
    hole
  );

  const teeToPin = Math.sqrt(
    (hole.pinPosition.x - hole.teePosition.x) ** 2 +
    (hole.pinPosition.y - hole.teePosition.y) ** 2
  );
  const pixelsPerYard = teeToPin / hole.yardsLength;
  const onePuttRadiusPx = (ONE_PUTT_THRESHOLD_FEET / FEET_PER_YARD) * pixelsPerYard;

  // Shot preview state (tap-to-preview system)
  const [previewPoint, setPreviewPoint] = useState<Point | null>(null);
  const previewDistanceYards = previewPoint
    ? calculateDistanceYards(gameState.ballPosition, previewPoint, hole)
    : null;

  const svgCoordsFromEvent = useCallback(
    (e: React.MouseEvent<SVGSVGElement>): Point | null => {
      const svg = e.currentTarget;
      if (!svg) return null;
      const rect = svg.getBoundingClientRect();
      const scaleX = 400 / rect.width;
      const scaleY = 600 / rect.height;
      return {
        x: Math.round((e.clientX - rect.left) * scaleX),
        y: Math.round((e.clientY - rect.top) * scaleY),
      };
    },
    []
  );

  const CONFIRM_THRESHOLD_PX = 30;

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (gameState.isComplete) return;

      const target = svgCoordsFromEvent(e);
      if (!target) return;

      if (previewPoint) {
        const dx = target.x - previewPoint.x;
        const dy = target.y - previewPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIRM_THRESHOLD_PX) {
          setGameState((prev) => placeShot(prev, previewPoint));
          setPreviewPoint(null);
        } else {
          setPreviewPoint(target);
        }
      } else {
        setPreviewPoint(target);
      }
    },
    [gameState.isComplete, previewPoint, svgCoordsFromEvent]
  );


  return (
    <div className="course-wrap">
      {/* HUD */}
      <div className="hud">
        <div className="hud-item">
          <span className="hud-label">Par</span>
          <span className="hud-value">{hole.par}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Strokes</span>
          <span className="hud-value" data-testid="stroke-count">{gameState.strokeCount}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">To Pin</span>
          <span className="hud-value">{distanceToPin} yds</span>
        </div>
      </div>

      {/* Course SVG */}
      <svg
        viewBox="0 0 400 600"
        className="course-svg"
        onClick={handleClick}
      >
        {/* Rough background */}
        <rect width="400" height="600" fill="#2d5a1b" />

        {/* Fairway */}
        <polygon
          points={polygonToSvgPoints(hole.fairwayBoundary.points)}
          fill="#4a8c2a"
          stroke="#3d7a22"
          strokeWidth="1"
        />

        {/* Green */}
        <polygon
          points={polygonToSvgPoints(hole.greenBoundary.points)}
          fill="#5cb85c"
          stroke="#4a9a4a"
          strokeWidth="1"
        />

        {/* Water hazards */}
        {hole.waterHazards.map((hazard, i) => (
          <g key={`water-${i}`}>
            <polygon
              data-testid="water-hazard"
              points={polygonToSvgPoints(hazard.boundary.points)}
              fill="#2980b9"
              stroke="#1a5276"
              strokeWidth="1.5"
              opacity={0.8}
            />
          </g>
        ))}

        {/* Shot preview indicator (tap-to-preview) */}
        {previewPoint && previewDistanceYards !== null && !gameState.isComplete && (
          <g data-testid="shot-preview">
            <line
              x1={gameState.ballPosition.x}
              y1={gameState.ballPosition.y}
              x2={previewPoint.x}
              y2={previewPoint.y}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <circle
              cx={previewPoint.x}
              cy={previewPoint.y}
              r={10}
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
            />
            <line
              x1={previewPoint.x - 14} y1={previewPoint.y}
              x2={previewPoint.x + 14} y2={previewPoint.y}
              stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"
            />
            <line
              x1={previewPoint.x} y1={previewPoint.y - 14}
              x2={previewPoint.x} y2={previewPoint.y + 14}
              stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"
            />
            <rect
              x={previewPoint.x + 16}
              y={previewPoint.y - 24}
              width={56}
              height={22}
              rx={4}
              fill="rgba(0,0,0,0.75)"
            />
            <text
              x={previewPoint.x + 20}
              y={previewPoint.y - 8}
              fill="white"
              fontSize="13"
              fontWeight="700"
            >
              {previewDistanceYards}y
            </text>
            <text
              x={previewPoint.x}
              y={previewPoint.y + 26}
              fill="rgba(255,255,255,0.5)"
              fontSize="10"
              textAnchor="middle"
            >
              Tap to hit
            </text>
          </g>
        )}

        {/* Pin flag */}
        <line
          x1={hole.pinPosition.x}
          y1={hole.pinPosition.y}
          x2={hole.pinPosition.x}
          y2={hole.pinPosition.y - 20}
          stroke="white"
          strokeWidth="2"
        />
        <polygon
          points={`${hole.pinPosition.x},${hole.pinPosition.y - 20} ${hole.pinPosition.x + 12},${hole.pinPosition.y - 15} ${hole.pinPosition.x},${hole.pinPosition.y - 10}`}
          fill="red"
        />

        {/* 1-putt radius indicator */}
        <circle
          data-testid="one-putt-radius"
          cx={hole.pinPosition.x}
          cy={hole.pinPosition.y}
          r={onePuttRadiusPx}
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Shot tracer (shown after hole completion) */}
        {gameState.isComplete && gameState.shotHistory.length > 1 && (
          <g>
            {/* Green landing zone highlight */}
            {gameState.landedInOnePuttZone ? (
              <circle
                data-testid="green-landing-zone"
                cx={hole.pinPosition.x}
                cy={hole.pinPosition.y}
                r={onePuttRadiusPx}
                fill="rgba(233, 69, 96, 0.3)"
                stroke="#e94560"
                strokeWidth="1.5"
              />
            ) : (
              <polygon
                data-testid="green-landing-zone"
                points={polygonToSvgPoints(hole.greenBoundary.points)}
                fill="rgba(241, 196, 15, 0.25)"
                stroke="rgba(241, 196, 15, 0.6)"
                strokeWidth="1.5"
              />
            )}

            {/* Tracer lines */}
            {gameState.shotHistory.slice(0, -1).map((from, i) => {
              const to = gameState.shotHistory[i + 1];
              return (
                <line
                  key={`tracer-${i}`}
                  data-testid="shot-tracer-line"
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Shot dots */}
            {gameState.shotHistory.map((pt, i) => (
              <circle
                key={`dot-${i}`}
                cx={pt.x} cy={pt.y}
                r={i === 0 ? 4 : 3}
                fill={i === 0 ? '#8B7355' : i === gameState.shotHistory.length - 1 ? '#e94560' : 'white'}
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Tee box */}
        <rect
          x={hole.teePosition.x - 15}
          y={hole.teePosition.y - 5}
          width={30}
          height={10}
          fill="#8B7355"
          rx={2}
        />

        {/* Ball */}
        <circle
          data-testid="ball"
          cx={gameState.ballPosition.x}
          cy={gameState.ballPosition.y}
          r={6}
          fill="white"
          stroke="#333"
          strokeWidth="1.5"
        />
      </svg>

      {/* Score card */}
      {gameState.isComplete && (
        <div data-testid="score-card" className="score-card">
          <div
            data-testid="score-label"
            className={`score-label ${getScoreCssClass(gameState.strokeCount, hole.par)}`}
          >
            {getScoreLabel(gameState.strokeCount, hole.par)}
          </div>
          <div data-testid="final-strokes" className="score-detail">
            {gameState.strokeCount} strokes on a Par {hole.par}
          </div>
          {onNewHole && (
            <button
              className="btn"
              onClick={onNewHole}
              style={{ marginTop: '16px', width: '100%' }}
            >
              Next Hole →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
