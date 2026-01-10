import { Project } from '@/types';

export const mockProject: Project = {
  id: 'test-project-1',
  name: 'Test Project',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  settings: {
    materialThickness: 0.75,
    materialType: 'plywood',
    unitSystem: 'imperial',
  },
  units: [],
};

export const mockProjectWithUnits: Project = {
  ...mockProject,
  id: 'test-project-2',
  name: 'Test Project with Units',
  units: [
    {
      id: 'unit-1',
      type: 'cabinet',
      width: 24,
      height: 36,
      depth: 12,
      numShelves: 2,
      shelfSpacing: 12,
      position: { x: 0, y: 0, z: 0 },
    },
  ],
};
