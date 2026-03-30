import type { HoleDefinition } from '../domain/types';
import { PRESET_HOLES } from './holes';

export function getRandomHole(
  exclude?: HoleDefinition,
  pool: readonly HoleDefinition[] = PRESET_HOLES
): HoleDefinition {
  const candidates = exclude ? pool.filter((h) => h !== exclude) : pool;
  const source = candidates.length > 0 ? candidates : pool;
  return source[Math.floor(Math.random() * source.length)];
}
