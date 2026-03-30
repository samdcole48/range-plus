/**
 * Backward-compatible re-export of combined hole pool.
 * The canonical source of The Starter holes is src/data/courses/the-starter.ts.
 * All course definitions are in src/data/courses/index.ts.
 */
export { ALL_HOLES as PRESET_HOLES } from './courses';
export type { HoleDefinition } from '../domain/types';
