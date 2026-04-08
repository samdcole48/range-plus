import type { CourseDefinition, HoleDefinition } from '../../domain/types';
import { THE_STARTER } from './the-starter';

export { THE_STARTER } from './the-starter';

export const ALL_COURSES: CourseDefinition[] = [THE_STARTER];

export const ALL_HOLES: HoleDefinition[] = ALL_COURSES.flatMap((c) => c.holes);
