import type { HoleDefinition } from '../domain/types';
import { PRESET_HOLES } from './holes';

export function getRandomHole(exclude?: HoleDefinition): HoleDefinition {
  const candidates = exclude
    ? PRESET_HOLES.filter((h) => h !== exclude)
    : PRESET_HOLES;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
