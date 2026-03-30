import type { CourseDefinition } from '../../domain/types';
import { PRESET_HOLES } from '../holes';

export const THE_STARTER: CourseDefinition = {
  id: 'the-starter',
  name: 'The Starter',
  theme: 'classic',
  holes: PRESET_HOLES,
};
