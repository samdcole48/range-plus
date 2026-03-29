import { useState, useCallback } from 'react';
import type { HoleDefinition, Point } from '../domain/types';
import { createGameState, placeShot, calculateDistanceYards, getScoreLabel, ONE_PUTT_THRESHOLD_FEET } from '../domain/game';

const FEET_PER_YARD = 3;

interface HoleViewProps {
  hole: HoleDefinition;
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

/** Deterministic pseudo-random based on seed for consistent tree rendering */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function HoleView({ hole }: HoleViewProps) {
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

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (gameState.isComplete) return;

      const target = svgCoordsFromEvent(e);
      if (!target) return;

      setPreviewPoint(target);
    },
    [gameState.isComplete, svgCoordsFromEvent]
  );


  return (
    <div className="course-wrap">
      {/* HUD */}
      <div className="hud">
        {gameState.isComplete ? (
          <div className="hud-complete" data-testid="hud-complete">
            <div
              data-testid="score-label"
              className={`score-label ${getScoreCssClass(gameState.strokeCount, hole.par)}`}
            >
              {getScoreLabel(gameState.strokeCount, hole.par)}
            </div>
            <div className="hud-complete-details">
              <div data-testid="final-strokes" className="score-detail">
                {gameState.strokeCount} Strokes
              </div>
              <div data-testid="putt-count" className="putt-info">
                {gameState.puttCount === 1 ? '1 Putt 🎯' : '2 Putts'}
              </div>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Course SVG */}
      <svg
        viewBox="0 0 400 600"
        className="course-svg"
        onClick={handleClick}
      >
        <defs>
          {/* Rough background gradient */}
          <radialGradient id="roughGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#3a6b24" />
            <stop offset="100%" stopColor="#2a5218" />
          </radialGradient>

          {/* Fairway gradient — lighter striped look */}
          <linearGradient id="fairwayGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5a9e35" />
            <stop offset="25%" stopColor="#62a83d" />
            <stop offset="50%" stopColor="#5a9e35" />
            <stop offset="75%" stopColor="#62a83d" />
            <stop offset="100%" stopColor="#5a9e35" />
          </linearGradient>

          {/* Fairway mowing stripe pattern */}
          <pattern id="fairwayStripes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#5a9e35" />
            <rect width="10" height="20" fill="#62a83d" />
          </pattern>

          {/* Green gradient — lush radial */}
          <radialGradient id="greenGrad" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#7dd87d" />
            <stop offset="60%" stopColor="#5cc55c" />
            <stop offset="100%" stopColor="#4aad4a" />
          </radialGradient>

          {/* Water gradient */}
          <radialGradient id="waterGrad" cx="40%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#5bb8e8" />
            <stop offset="50%" stopColor="#3498db" />
            <stop offset="100%" stopColor="#1a6fa0" />
          </radialGradient>

          {/* Sand bunker gradient */}
          <radialGradient id="sandGrad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f5e6b8" />
            <stop offset="60%" stopColor="#e8d598" />
            <stop offset="100%" stopColor="#d4be7a" />
          </radialGradient>

          {/* Tree canopy gradient */}
          <radialGradient id="treeGrad" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#4a8c3a" />
            <stop offset="100%" stopColor="#2d5a1e" />
          </radialGradient>

          {/* Dark tree variant */}
          <radialGradient id="treeDarkGrad" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#3d7530" />
            <stop offset="100%" stopColor="#1e4412" />
          </radialGradient>

          {/* Tree shadow filter */}
          <filter id="treeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>

          {/* Subtle shadow for green */}
          <filter id="greenShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.15)" />
          </filter>

          {/* Water shimmer filter */}
          <filter id="waterShimmer" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(52,152,219,0.4)" />
          </filter>
        </defs>

        {/* === LAYER 1: Rough background === */}
        <rect width="400" height="600" fill="url(#roughGrad)" />

        {/* Rough texture — subtle darker patches */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <circle
            key={`rough-${i}`}
            cx={seededRandom(i * 7 + 1) * 400}
            cy={seededRandom(i * 7 + 2) * 600}
            r={30 + seededRandom(i * 7 + 3) * 40}
            fill="rgba(30,60,15,0.15)"
          />
        ))}

        {/* === LAYER 2: Fairway with stripe pattern === */}
        <polygon
          points={polygonToSvgPoints(hole.fairwayBoundary.points)}
          fill="url(#fairwayStripes)"
          stroke="#4a8c2a"
          strokeWidth="1.5"
        />
        {/* Fairway fringe (slightly wider, darker border) */}
        <polygon
          points={polygonToSvgPoints(hole.fairwayBoundary.points)}
          fill="none"
          stroke="#4a8c2a"
          strokeWidth="3"
          opacity={0.4}
        />

        {/* === LAYER 3: Sand bunkers === */}
        {(hole.bunkers ?? []).map((bunker, i) => (
          <polygon
            key={`bunker-${i}`}
            points={polygonToSvgPoints(bunker.boundary.points)}
            fill="url(#sandGrad)"
            stroke="#c4a85a"
            strokeWidth="1"
          />
        ))}

        {/* === LAYER 4: Water hazards === */}
        {hole.waterHazards.map((hazard, i) => (
          <g key={`water-${i}`}>
            <polygon
              data-testid="water-hazard"
              points={polygonToSvgPoints(hazard.boundary.points)}
              fill="url(#waterGrad)"
              stroke="#1a6fa0"
              strokeWidth="1.5"
              filter="url(#waterShimmer)"
            />
            {/* Water highlight ripple */}
            <ellipse
              cx={(hazard.boundary.points.reduce((s, p) => s + p.x, 0) / hazard.boundary.points.length)}
              cy={(hazard.boundary.points.reduce((s, p) => s + p.y, 0) / hazard.boundary.points.length) - 5}
              rx={15}
              ry={6}
              fill="rgba(255,255,255,0.15)"
            />
          </g>
        ))}

        {/* === LAYER 5: Green with shadow === */}
        <polygon
          points={polygonToSvgPoints(hole.greenBoundary.points)}
          fill="url(#greenGrad)"
          stroke="#3d8c3d"
          strokeWidth="2"
          filter="url(#greenShadow)"
        />
        {/* Green collar (fringe ring) */}
        <polygon
          points={polygonToSvgPoints(hole.greenBoundary.points)}
          fill="none"
          stroke="rgba(80,160,80,0.5)"
          strokeWidth="4"
        />

        {/* === LAYER 6: Trees === */}
        {(hole.trees ?? []).map((tree, i) => {
          const isDark = i % 3 === 0;
          const grad = isDark ? 'url(#treeDarkGrad)' : 'url(#treeGrad)';
          return (
            <g key={`tree-${i}`} filter="url(#treeShadow)">
              <circle
                cx={tree.position.x}
                cy={tree.position.y}
                r={tree.radius}
                fill={grad}
              />
              {/* Canopy highlight */}
              <circle
                cx={tree.position.x - tree.radius * 0.2}
                cy={tree.position.y - tree.radius * 0.2}
                r={tree.radius * 0.4}
                fill="rgba(120,200,80,0.2)"
              />
            </g>
          );
        })}

        {/* === LAYER 7: Tee box === */}
        <g>
          {/* Tee box platform */}
          <rect
            x={hole.teePosition.x - 18}
            y={hole.teePosition.y - 8}
            width={36}
            height={16}
            fill="#6a8c4a"
            stroke="#5a7a3a"
            strokeWidth="1"
            rx={3}
          />
          {/* Tee markers */}
          <circle
            cx={hole.teePosition.x - 10}
            cy={hole.teePosition.y}
            r={3}
            fill="#e8e0d0"
            stroke="#c0b090"
            strokeWidth="0.5"
          />
          <circle
            cx={hole.teePosition.x + 10}
            cy={hole.teePosition.y}
            r={3}
            fill="#e8e0d0"
            stroke="#c0b090"
            strokeWidth="0.5"
          />
        </g>

        {/* === LAYER 8: Pin flag (detailed) === */}
        <g>
          {/* Pin hole (cup) */}
          <circle
            cx={hole.pinPosition.x}
            cy={hole.pinPosition.y}
            r={3}
            fill="#333"
          />
          {/* Flagstick */}
          <line
            x1={hole.pinPosition.x}
            y1={hole.pinPosition.y - 2}
            x2={hole.pinPosition.x}
            y2={hole.pinPosition.y - 24}
            stroke="#ddd"
            strokeWidth="1.5"
          />
          {/* Flag */}
          <polygon
            points={`${hole.pinPosition.x},${hole.pinPosition.y - 24} ${hole.pinPosition.x + 14},${hole.pinPosition.y - 18} ${hole.pinPosition.x},${hole.pinPosition.y - 12}`}
            fill="#e63946"
            stroke="#c0313e"
            strokeWidth="0.5"
          />
        </g>

        {/* === LAYER 9: 1-putt radius indicator === */}
        <circle
          data-testid="one-putt-radius"
          cx={hole.pinPosition.x}
          cy={hole.pinPosition.y}
          r={onePuttRadiusPx}
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* === LAYER 10: Shot preview indicator === */}
        {previewPoint && previewDistanceYards !== null && !gameState.isComplete && (
          <g data-testid="shot-preview">
            <line
              x1={gameState.ballPosition.x}
              y1={gameState.ballPosition.y}
              x2={previewPoint.x}
              y2={previewPoint.y}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            {/* Target ring */}
            <circle
              cx={previewPoint.x}
              cy={previewPoint.y}
              r={12}
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
            />
            {/* Crosshair */}
            <line
              x1={previewPoint.x - 16} y1={previewPoint.y}
              x2={previewPoint.x - 5} y2={previewPoint.y}
              stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
            />
            <line
              x1={previewPoint.x + 5} y1={previewPoint.y}
              x2={previewPoint.x + 16} y2={previewPoint.y}
              stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
            />
            <line
              x1={previewPoint.x} y1={previewPoint.y - 16}
              x2={previewPoint.x} y2={previewPoint.y - 5}
              stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
            />
            <line
              x1={previewPoint.x} y1={previewPoint.y + 5}
              x2={previewPoint.x} y2={previewPoint.y + 16}
              stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
            />
            {/* Distance label */}
            <rect
              x={previewPoint.x + 18}
              y={previewPoint.y - 26}
              width={58}
              height={24}
              rx={6}
              fill="rgba(0,0,0,0.8)"
            />
            <text
              x={previewPoint.x + 22}
              y={previewPoint.y - 9}
              fill="white"
              fontSize="13"
              fontWeight="700"
            >
              {previewDistanceYards}y
            </text>
            {/* "Tap to hit" hint */}
            <text
              x={previewPoint.x}
              y={previewPoint.y + 28}
              fill="rgba(255,255,255,0.6)"
              fontSize="9"
              textAnchor="middle"
              fontWeight="600"
            >
              Tap to hit
            </text>
          </g>
        )}

        {/* === LAYER 11: Shot tracer (after completion) === */}
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
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Shot dots */}
            {gameState.shotHistory.map((pt, i) => (
              <circle
                key={`dot-${i}`}
                cx={pt.x} cy={pt.y}
                r={i === 0 ? 5 : 4}
                fill={i === 0 ? '#8B7355' : i === gameState.shotHistory.length - 1 ? '#e94560' : 'white'}
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* === LAYER 12: Ball === */}
        <g>
          <circle
            data-testid="ball"
            cx={gameState.ballPosition.x}
            cy={gameState.ballPosition.y}
            r={5}
            fill="white"
            stroke="#555"
            strokeWidth="1"
          />
          {/* Ball shine */}
          <circle
            cx={gameState.ballPosition.x - 1.5}
            cy={gameState.ballPosition.y - 1.5}
            r={1.5}
            fill="rgba(255,255,255,0.6)"
          />
        </g>

        {/* === LAYER 13: Confirm button === */}
        {previewPoint && !gameState.isComplete && (
          <g
            data-testid="confirm-button"
            onClick={(e) => {
              e.stopPropagation();
              setGameState((prev) => placeShot(prev, previewPoint));
              setPreviewPoint(null);
            }}
            style={{ cursor: 'pointer' }}
          >
            <rect x={298} y={548} width={92} height={44} rx={8} fill="rgba(20,20,20,0.85)" />
            <text
              x={344}
              y={575}
              fill="white"
              fontSize="16"
              fontWeight="700"
              textAnchor="middle"
            >
              Confirm
            </text>
          </g>
        )}

        {/* === Hole info label === */}
        <text
          x={10}
          y={592}
          fill="rgba(255,255,255,0.4)"
          fontSize="10"
          fontFamily="monospace"
        >
          {hole.name} · PAR {hole.par} · {hole.yardsLength}
        </text>
      </svg>
    </div>
  );
}
