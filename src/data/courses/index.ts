import type { CourseDefinition, HoleDefinition } from '../../domain/types';
import { THE_STARTER } from './the-starter';
import { BLACK_JACKS_CROSSING } from './black-jacks-crossing';

export { THE_STARTER } from './the-starter';
export { BLACK_JACKS_CROSSING } from './black-jacks-crossing';

export const ALL_COURSES: CourseDefinition[] = [THE_STARTER, BLACK_JACKS_CROSSING];

export const ALL_HOLES: HoleDefinition[] = ALL_COURSES.flatMap((c) => c.holes);
