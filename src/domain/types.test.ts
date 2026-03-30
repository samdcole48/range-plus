import { describe, it, expect } from 'vitest';
import type { Rock, Boulder, HoleDefinition, CourseDefinition } from './types';

describe('CHG-COURSE-001 — Rock type', () => {
  it('Rock can be constructed with position and radius', () => {
    const rock: Rock = { position: { x: 50, y: 100 }, radius: 5 };
    expect(rock.position.x).toBe(50);
    expect(rock.position.y).toBe(100);
    expect(rock.radius).toBe(5);
  });
});

describe('CHG-COURSE-002 — Boulder type', () => {
  it('Boulder can be constructed with a polygon boundary', () => {
    const boulder: Boulder = {
      boundary: { points: [{ x: 10, y: 10 }, { x: 30, y: 10 }, { x: 20, y: 30 }] },
    };
    expect(boulder.boundary.points).toHaveLength(3);
    expect(boulder.boundary.points[0]).toEqual({ x: 10, y: 10 });
  });
});

describe('CHG-COURSE-003 — HoleDefinition desert fields', () => {
  it('HoleDefinition accepts optional courseTheme, rocks, and boulders fields', () => {
    const partial: Pick<HoleDefinition, 'courseTheme' | 'rocks' | 'boulders'> = {
      courseTheme: 'desert',
      rocks: [{ position: { x: 10, y: 20 }, radius: 4 }],
      boulders: [{ boundary: { points: [{ x: 5, y: 5 }, { x: 20, y: 5 }, { x: 12, y: 20 }] } }],
    };
    expect(partial.courseTheme).toBe('desert');
    expect(partial.rocks).toHaveLength(1);
    expect(partial.boulders).toHaveLength(1);
  });
});

describe('CHG-COURSE-004 — CourseDefinition type', () => {
  it('CourseDefinition can be constructed with id, name, theme and holes', () => {
    const course: CourseDefinition = {
      id: 'test-course',
      name: 'Test Course',
      theme: 'classic',
      holes: [],
    };
    expect(course.id).toBe('test-course');
    expect(course.name).toBe('Test Course');
    expect(course.theme).toBe('classic');
    expect(course.holes).toHaveLength(0);
  });
});
