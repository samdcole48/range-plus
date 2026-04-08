import { useState } from 'react';
import type { HoleDefinition, Point, Polygon, WaterHazard, TreeCluster, Bush, Rock, Boulder, Bunker } from '../domain/types';
import { createGameState, calculateDistanceYards, getScoreLabel, getScoreCssClass } from '../domain/game';
import { useHoleInteraction } from './useHoleInteraction';
import {
  TREE_CANOPY_HIGHLIGHT_SCALE,
  WATER_RIPPLE_Y_OFFSET,
} from '../domain/constants';

interface HoleViewProps {
  hole: HoleDefinition;
}

function polygonToSvgPoints(points: Point[]): string {
  return points.map((p) => `${p.x},${p.y}`).join(' ');
}

/** Deterministic pseudo-random based on seed for consistent tree rendering */
import { seededRandom } from '../domain/utils';

// ─── SVG Defs ────────────────────────────────────────────────────────────────

function CourseDefs() {
  return (
    <defs>
      <radialGradient id="roughGrad" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#3a6b24" />
        <stop offset="100%" stopColor="#2a5218" />
      </radialGradient>
      <radialGradient id="desertRoughGrad" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#c2a060" />
        <stop offset="100%" stopColor="#a08040" />
      </radialGradient>
      <radialGradient id="rockGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#a07850" />
        <stop offset="100%" stopColor="#6b4f30" />
      </radialGradient>
      <linearGradient id="boulderGrad" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#8B5a2a" />
        <stop offset="60%" stopColor="#6b3c1a" />
        <stop offset="100%" stopColor="#4a2a10" />
      </linearGradient>
      <linearGradient id="fairwayGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a9e35" />
        <stop offset="25%" stopColor="#62a83d" />
        <stop offset="50%" stopColor="#5a9e35" />
        <stop offset="75%" stopColor="#62a83d" />
        <stop offset="100%" stopColor="#5a9e35" />
      </linearGradient>
      <pattern id="fairwayStripes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#5a9e35" />
        <rect width="10" height="20" fill="#62a83d" />
      </pattern>
      <radialGradient id="greenGrad" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#7dd87d" />
        <stop offset="60%" stopColor="#5cc55c" />
        <stop offset="100%" stopColor="#4aad4a" />
      </radialGradient>
      <radialGradient id="waterGrad" cx="40%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#5bb8e8" />
        <stop offset="50%" stopColor="#3498db" />
        <stop offset="100%" stopColor="#1a6fa0" />
      </radialGradient>
      <radialGradient id="sandGrad" cx="45%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#f5e6b8" />
        <stop offset="60%" stopColor="#e8d598" />
        <stop offset="100%" stopColor="#d4be7a" />
      </radialGradient>
      <radialGradient id="treeGrad" cx="40%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#4a8c3a" />
        <stop offset="100%" stopColor="#2d5a1e" />
      </radialGradient>
      <radialGradient id="treeDarkGrad" cx="40%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#3d7530" />
        <stop offset="100%" stopColor="#1e4412" />
      </radialGradient>
      <filter id="treeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
      </filter>
      <filter id="greenShadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.15)" />
      </filter>
      <filter id="waterShimmer" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(52,152,219,0.4)" />
      </filter>
      <radialGradient id="bushGrad" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#8bc34a" />
        <stop offset="100%" stopColor="#558b2f" />
      </radialGradient>
    </defs>
  );
}

// ─── Course Layers ────────────────────────────────────────────────────────────

function RoughLayer({ theme }: { theme?: HoleDefinition['courseTheme'] }) {
  if (theme === 'desert') {
    return (
      <>
        <rect data-testid="desert-rough" width="400" height="600" fill="url(#desertRoughGrad)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <circle
            key={`desert-patch-${i}`}
            cx={seededRandom(i * 7 + 1) * 400}
            cy={seededRandom(i * 7 + 2) * 600}
            r={30 + seededRandom(i * 7 + 3) * 40}
            fill="rgba(90,60,10,0.12)"
          />
        ))}
      </>
    );
  }
  return (
    <>
      <rect width="400" height="600" fill="url(#roughGrad)" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <circle
          key={`rough-${i}`}
          cx={seededRandom(i * 7 + 1) * 400}
          cy={seededRandom(i * 7 + 2) * 600}
          r={30 + seededRandom(i * 7 + 3) * 40}
          fill="rgba(30,60,15,0.15)"
        />
      ))}
    </>
  );
}

function FairwayLayer({ fairwayBoundary }: { fairwayBoundary: Polygon }) {
  return (
    <>
      <polygon
        points={polygonToSvgPoints(fairwayBoundary.points)}
        fill="url(#fairwayStripes)"
        stroke="#4a8c2a"
        strokeWidth="1.5"
      />
      <polygon
        points={polygonToSvgPoints(fairwayBoundary.points)}
        fill="none"
        stroke="#4a8c2a"
        strokeWidth="3"
        opacity={0.4}
      />
    </>
  );
}

function HazardsLayer({
  bunkers = [],
  waterHazards,
  bushes = [],
}: {
  bunkers?: Bunker[];
  waterHazards: WaterHazard[];
  bushes?: Bush[];
}) {
  return (
    <>
      {bunkers.map((bunker, i) => (
        <polygon key={`bunker-${i}`} points={polygonToSvgPoints(bunker.boundary.points)} fill="url(#sandGrad)" stroke="#c4a85a" strokeWidth="1" />
      ))}
      {waterHazards.map((hazard, i) => {
        const cx = hazard.boundary.points.reduce((s, p) => s + p.x, 0) / hazard.boundary.points.length;
        const cy = hazard.boundary.points.reduce((s, p) => s + p.y, 0) / hazard.boundary.points.length;
        return (
          <g key={`water-${i}`}>
            <polygon data-testid="water-hazard" points={polygonToSvgPoints(hazard.boundary.points)} fill="url(#waterGrad)" stroke="#1a6fa0" strokeWidth="1.5" filter="url(#waterShimmer)" />
            <ellipse cx={cx} cy={cy - WATER_RIPPLE_Y_OFFSET} rx={15} ry={6} fill="rgba(255,255,255,0.15)" />
          </g>
        );
      })}
      {bushes.map((bush, i) => (
        <circle key={`bush-${i}`} data-testid="bush" cx={bush.position.x} cy={bush.position.y} r={bush.radius} fill="url(#bushGrad)" stroke="#4a7a2a" strokeWidth="0.5" />
      ))}
    </>
  );
}

function GreenLayer({ greenBoundary }: { greenBoundary: Polygon }) {
  return (
    <>
      <polygon points={polygonToSvgPoints(greenBoundary.points)} fill="url(#greenGrad)" stroke="#3d8c3d" strokeWidth="2" filter="url(#greenShadow)" />
      <polygon points={polygonToSvgPoints(greenBoundary.points)} fill="none" stroke="rgba(80,160,80,0.5)" strokeWidth="4" />
    </>
  );
}

function FeaturesLayer({
  trees = [],
  rocks = [],
  boulders = [],
}: {
  trees?: TreeCluster[];
  rocks?: Rock[];
  boulders?: Boulder[];
}) {
  return (
    <>
      {trees.map((tree, i) => {
        const grad = i % 3 === 0 ? 'url(#treeDarkGrad)' : 'url(#treeGrad)';
        return (
          <g key={`tree-${i}`} filter="url(#treeShadow)">
            <circle cx={tree.position.x} cy={tree.position.y} r={tree.radius} fill={grad} />
            <circle cx={tree.position.x - tree.radius * TREE_CANOPY_HIGHLIGHT_SCALE} cy={tree.position.y - tree.radius * TREE_CANOPY_HIGHLIGHT_SCALE} r={tree.radius * 0.4} fill="rgba(120,200,80,0.2)" />
          </g>
        );
      })}
      {rocks.map((rock, i) => (
        <circle key={`rock-${i}`} data-testid="rock" cx={rock.position.x} cy={rock.position.y} r={rock.radius} fill="url(#rockGrad)" stroke="#5a3a1a" strokeWidth="0.5" opacity={0.9} />
      ))}
      {boulders.map((boulder, i) => (
        <polygon key={`boulder-${i}`} data-testid="boulder" points={polygonToSvgPoints(boulder.boundary.points)} fill="url(#boulderGrad)" stroke="#3a1a08" strokeWidth="1.5" opacity={0.95} />
      ))}
    </>
  );
}

function TeeBoxLayer({ teePosition }: { teePosition: Point }) {
  return (
    <g>
      <rect x={teePosition.x - 18} y={teePosition.y - 8} width={36} height={16} fill="#6a8c4a" stroke="#5a7a3a" strokeWidth="1" rx={3} />
      <circle cx={teePosition.x - 10} cy={teePosition.y} r={3} fill="#e8e0d0" stroke="#c0b090" strokeWidth="0.5" />
      <circle cx={teePosition.x + 10} cy={teePosition.y} r={3} fill="#e8e0d0" stroke="#c0b090" strokeWidth="0.5" />
    </g>
  );
}

function PinLayer({ pinPosition }: { pinPosition: Point }) {
  return (
    <g>
      <circle data-testid="pin" cx={pinPosition.x} cy={pinPosition.y} r={3} fill="#333" />
      <line x1={pinPosition.x} y1={pinPosition.y - 2} x2={pinPosition.x} y2={pinPosition.y - 24} stroke="#ddd" strokeWidth="1.5" />
      <polygon
        points={`${pinPosition.x},${pinPosition.y - 24} ${pinPosition.x + 14},${pinPosition.y - 18} ${pinPosition.x},${pinPosition.y - 12}`}
        fill="#e63946"
        stroke="#c0313e"
        strokeWidth="0.5"
      />
    </g>
  );
}

function ShotPreviewLayer({
  previewPoint,
  previewDistanceYards,
  ballPosition,
  isComplete,
}: {
  previewPoint: Point | null;
  previewDistanceYards: number | null;
  ballPosition: Point;
  isComplete: boolean;
}) {
  if (!previewPoint || previewDistanceYards === null || isComplete) return null;
  return (
    <g data-testid="shot-preview">
      <line x1={ballPosition.x} y1={ballPosition.y} x2={previewPoint.x} y2={previewPoint.y} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx={previewPoint.x} cy={previewPoint.y} r={12} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <line x1={previewPoint.x - 16} y1={previewPoint.y} x2={previewPoint.x - 5} y2={previewPoint.y} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <line x1={previewPoint.x + 5} y1={previewPoint.y} x2={previewPoint.x + 16} y2={previewPoint.y} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <line x1={previewPoint.x} y1={previewPoint.y - 16} x2={previewPoint.x} y2={previewPoint.y - 5} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <line x1={previewPoint.x} y1={previewPoint.y + 5} x2={previewPoint.x} y2={previewPoint.y + 16} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x={previewPoint.x + 18} y={previewPoint.y - 26} width={58} height={24} rx={6} fill="rgba(0,0,0,0.8)" />
      <text x={previewPoint.x + 22} y={previewPoint.y - 9} fill="white" fontSize="13" fontWeight="700">{previewDistanceYards}y</text>
    </g>
  );
}

function ShotTracerLayer({
  isComplete,
  shotHistory,
  greenBoundary,
}: {
  isComplete: boolean;
  shotHistory: Point[];
  greenBoundary: Polygon;
}) {
  if (!isComplete || shotHistory.length <= 1) return null;
  return (
    <g>
      <polygon data-testid="green-landing-zone" points={polygonToSvgPoints(greenBoundary.points)} fill="rgba(241, 196, 15, 0.25)" stroke="rgba(241, 196, 15, 0.6)" strokeWidth="1.5" />
      {shotHistory.slice(0, -1).map((from, i) => (
        <line key={`tracer-${i}`} data-testid="shot-tracer-line" x1={from.x} y1={from.y} x2={shotHistory[i + 1].x} y2={shotHistory[i + 1].y} stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {shotHistory.map((pt, i) => (
        <circle key={`dot-${i}`} cx={pt.x} cy={pt.y} r={i === 0 ? 5 : 4} fill={i === 0 ? '#8B7355' : i === shotHistory.length - 1 ? '#e94560' : 'white'} stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      ))}
    </g>
  );
}

function BallLayer({ ballPosition }: { ballPosition: Point }) {
  return (
    <g>
      <circle data-testid="ball" cx={ballPosition.x} cy={ballPosition.y} r={5} fill="white" stroke="#555" strokeWidth="1" />
      <circle cx={ballPosition.x - 1.5} cy={ballPosition.y - 1.5} r={1.5} fill="rgba(255,255,255,0.6)" />
    </g>
  );
}

function ConfirmButtonLayer({
  previewPoint,
  isComplete,
  onConfirm,
}: {
  previewPoint: Point | null;
  isComplete: boolean;
  onConfirm: (e: React.MouseEvent) => void;
}) {
  if (!previewPoint || isComplete) return null;
  return (
    <g data-testid="confirm-button" onClick={onConfirm} style={{ cursor: 'pointer' }}>
      <rect x={270} y={536} width={120} height={56} rx={10} fill="rgba(20,20,20,0.85)" />
      <text x={330} y={569} fill="white" fontSize="18" fontWeight="700" textAnchor="middle">Confirm</text>
    </g>
  );
}

function HoleInfoLabel({ name, par, yardsLength }: { name: string; par: number; yardsLength: number }) {
  return (
    <text x={10} y={592} fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">
      {name} · PAR {par} · {yardsLength}
    </text>
  );
}

// ─── HUD ─────────────────────────────────────────────────────────────────────

function GameHUD({
  isComplete,
  strokeCount,
  par,
  puttCount,
  distanceToPin,
}: {
  isComplete: boolean;
  strokeCount: number;
  par: number;
  puttCount: number;
  distanceToPin: number;
}) {
  if (isComplete) {
    return (
      <div className="hud-complete" data-testid="hud-complete">
        <div data-testid="score-label" className={`score-label ${getScoreCssClass(strokeCount, par)}`}>
          {getScoreLabel(strokeCount, par)}
        </div>
        <div className="hud-complete-details">
          <div data-testid="final-strokes" className="score-detail">{strokeCount} Strokes</div>
          <div data-testid="putt-count" className="putt-info">{puttCount} Putts</div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="hud-item">
        <span className="hud-label">Par</span>
        <span className="hud-value">{par}</span>
      </div>
      <div className="hud-item">
        <span className="hud-label">Strokes</span>
        <span className="hud-value" data-testid="stroke-count">{strokeCount}</span>
      </div>
      <div className="hud-item">
        <span className="hud-label">To Pin</span>
        <span className="hud-value">{distanceToPin} yds</span>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HoleView({ hole }: HoleViewProps) {
  const [gameState, setGameState] = useState(() => createGameState(hole));
  const [previewPoint, setPreviewPoint] = useState<Point | null>(null);

  const { handleClick, handleConfirmShot } = useHoleInteraction(
    gameState, setGameState, setPreviewPoint,
  );

  const distanceToPin = calculateDistanceYards(gameState.ballPosition, gameState.activePinPosition, hole);
  const previewDistanceYards = previewPoint
    ? calculateDistanceYards(gameState.ballPosition, previewPoint, hole)
    : null;

  return (
    <div className="course-wrap">
      <div className="hud">
        <GameHUD isComplete={gameState.isComplete} strokeCount={gameState.strokeCount} par={hole.par} puttCount={gameState.puttCount} distanceToPin={distanceToPin} />
      </div>
      <svg viewBox="0 0 400 600" className="course-svg" onClick={handleClick}>
        <CourseDefs />
        <RoughLayer theme={hole.courseTheme} />
        <FairwayLayer fairwayBoundary={hole.fairwayBoundary} />
        <HazardsLayer bunkers={hole.bunkers} waterHazards={hole.waterHazards} bushes={hole.bushes} />
        <GreenLayer greenBoundary={hole.greenBoundary} />
        <FeaturesLayer trees={hole.trees} rocks={hole.rocks} boulders={hole.boulders} />
        <TeeBoxLayer teePosition={hole.teePosition} />
        <PinLayer pinPosition={gameState.activePinPosition} />
        <ShotPreviewLayer previewPoint={previewPoint} previewDistanceYards={previewDistanceYards} ballPosition={gameState.ballPosition} isComplete={gameState.isComplete} />
        <ShotTracerLayer isComplete={gameState.isComplete} shotHistory={gameState.shotHistory} greenBoundary={hole.greenBoundary} />
        <BallLayer ballPosition={gameState.ballPosition} />
        <ConfirmButtonLayer previewPoint={previewPoint} isComplete={gameState.isComplete} onConfirm={(e) => handleConfirmShot(e, previewPoint)} />
        <HoleInfoLabel name={hole.name} par={hole.par} yardsLength={hole.yardsLength} />
      </svg>
    </div>
  );
}

