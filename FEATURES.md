# Cabinet Builder - Feature Breakdown & Delivery Plan

## Overview

This document breaks down the development work into deliverable features organized by priority and dependency. Each feature includes implementation details, acceptance criteria, and estimated complexity.

## Feature Categories

### Phase 1: Foundation (Weeks 1-2)
Core infrastructure and basic functionality

### Phase 2: Design System (Weeks 3-4)
UI components and design tools

### Phase 3: 3D Visualization (Weeks 5-6)
3D rendering and interaction

### Phase 4: Cut List & Optimization (Weeks 7-8)
Cut list generation and sheet optimization

### Phase 5: Polish & Enhancement (Weeks 9-10)
Export/import, refinements, testing

---

## Phase 1: Foundation

### F1.1: Project Setup & Configuration
**Priority**: P0 | **Complexity**: Low | **Estimated Time**: 4 hours

**Tasks**:
- Initialize Next.js 14 project with TypeScript
- Configure Tailwind CSS
- Set up ESLint and Prettier
- Create project structure
- Configure path aliases

**Deliverables**:
- Working Next.js app
- Development environment setup
- Code quality tools configured

**Acceptance Criteria**:
- App runs without errors
- Hot reload works
- TypeScript compilation successful

---

### F1.2: Unit Conversion System
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 8 hours

**Tasks**:
- Create utility functions for inch/fraction conversion
- Implement decimal to fraction conversion
- Implement fraction to decimal conversion
- Create input components for measurements
- Add validation for measurements

**Key Functions**:
```typescript
// Convert decimal to fraction string
decimalToFraction(decimal: number): string

// Convert fraction string to decimal
fractionToDecimal(fraction: string): number

// Format display (always show as fraction)
formatMeasurement(inches: number): string

// Parse user input (accepts both)
parseMeasurement(input: string): number
```

**Deliverables**:
- `utils/measurements.ts` module
- Measurement input component
- Unit tests for conversions

**Acceptance Criteria**:
- Accurate conversion between formats
- Handles common fractions (1/16, 1/8, 1/4, 1/2, 3/4)
- Input validation works correctly

---

### F1.3: Data Models & Types
**Priority**: P0 | **Complexity**: Low | **Estimated Time**: 4 hours

**Tasks**:
- Define TypeScript interfaces for all data models
- Create type definitions for:
  - Project
  - CabinetUnit
  - CutPiece
  - SheetLayout
  - AppState

**Deliverables**:
- `types/index.ts` with all type definitions
- Type-safe data structures

**Acceptance Criteria**:
- All types properly defined
- TypeScript compilation passes
- Types exported for use across app

---

### F1.4: State Management Setup
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 6 hours

**Tasks**:
- Install and configure Zustand
- Create main app store
- Implement project state management
- Add actions for project CRUD
- Set up persistence middleware

**Store Structure**:
```typescript
interface AppStore {
  // State
  projects: Project[]
  currentProject: Project | null
  
  // Actions
  createProject: (name: string) => void
  loadProject: (id: string) => void
  updateProject: (updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  saveProject: () => void
}
```

**Deliverables**:
- Zustand store implementation
- State persistence to IndexedDB
- Store hooks for components

**Acceptance Criteria**:
- State persists across sessions
- All CRUD operations work
- No state loss on refresh

---

## Phase 2: Design System

### F2.1: UI Component Library
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 12 hours

**Tasks**:
- Set up shadcn/ui or similar component library
- Create custom components:
  - MeasurementInput
  - NumberInput
  - Select/Dropdown
  - Button variants
  - Card/Container
  - Modal/Dialog
  - Table

**Deliverables**:
- Reusable UI component library
- Consistent styling
- Accessible components

**Acceptance Criteria**:
- All components accessible
- Consistent design system
- Responsive layouts

---

### F2.2: Project Management UI
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 8 hours

**Tasks**:
- Create project list view
- Create project creation dialog
- Create project settings page
- Implement project navigation
- Add project deletion with confirmation

**Deliverables**:
- Project list page
- New project dialog
- Project settings page
- Navigation between projects

**Acceptance Criteria**:
- Users can create projects
- Users can see all projects
- Users can delete projects
- Navigation works smoothly

---

### F2.3: Cabinet Configuration Form
**Priority**: P0 | **Complexity**: High | **Estimated Time**: 16 hours

**Tasks**:
- Create form for cabinet dimensions
- Add material thickness selector
- Implement cabinet/drawer mode toggle
- Add shelf configuration (for cabinets)
- Add drawer configuration (for drawers)
- Form validation
- Real-time preview updates

**Form Fields**:
- Width, Height, Depth (measurement inputs)
- Material Thickness (dropdown)
- Unit Type (cabinet/drawer toggle)
- Number of Shelves (if cabinet)
- Number of Drawers (if drawer)
- Auto/Manual spacing options

**Deliverables**:
- Complete configuration form
- Validation logic
- Form state management

**Acceptance Criteria**:
- All fields functional
- Validation prevents invalid inputs
- Form updates state correctly
- Clear error messages

---

## Phase 3: 3D Visualization

### F3.1: Three.js Scene Setup
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 8 hours

**Tasks**:
- Install React Three Fiber and dependencies
- Create basic Canvas component
- Set up camera and controls
- Add lighting (ambient, directional)
- Add grid and axis helpers
- Configure scene settings

**Deliverables**:
- Working 3D scene
- Camera controls (orbit, zoom, pan)
- Proper lighting
- Helper elements

**Acceptance Criteria**:
- Scene renders correctly
- Controls are responsive
- 60fps performance
- Clear visualization

---

### F3.2: Parametric Geometry Engine
**Priority**: P0 | **Complexity**: High | **Estimated Time**: 20 hours

**Tasks**:
- Create geometry generation functions
- Implement cabinet box generation
- Implement shelf generation
- Implement drawer generation
- Handle material thickness in geometry
- Create part labeling system

**Key Functions**:
```typescript
// Generate cabinet box
generateCabinetBox(
  width: number,
  height: number,
  depth: number,
  thickness: number
): THREE.BufferGeometry[]

// Generate shelves
generateShelves(
  width: number,
  depth: number,
  positions: number[],
  thickness: number
): THREE.BufferGeometry[]

// Generate drawers
generateDrawers(
  width: number,
  depth: number,
  heights: number[],
  thickness: number
): THREE.BufferGeometry[]
```

**Deliverables**:
- Geometry generation module
- All cabinet parts generated correctly
- Proper material thickness handling

**Acceptance Criteria**:
- All parts render correctly
- Dimensions match input
- Material thickness accurate
- No geometry errors

---

### F3.3: 3D Model Rendering
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 12 hours

**Tasks**:
- Create CabinetModel3D component
- Render all parts with materials
- Add part selection/highlighting
- Implement measurement display
- Add part labels
- Optimize rendering performance

**Features**:
- Visual distinction between parts
- Hover effects
- Selection highlighting
- Dimension display on hover

**Deliverables**:
- Complete 3D cabinet visualization
- Interactive parts
- Measurement display

**Acceptance Criteria**:
- Model updates in real-time
- All parts visible and distinct
- Measurements accurate
- Smooth interactions

---

### F3.4: 3D View Controls & Options
**Priority**: P1 | **Complexity**: Low | **Estimated Time**: 6 hours

**Tasks**:
- Add view controls UI
- Toggle grid visibility
- Toggle axis visibility
- Reset camera button
- Fit to view button
- Measurement display toggle

**Deliverables**:
- View control panel
- All toggle options working

**Acceptance Criteria**:
- All controls functional
- UI is intuitive
- Settings persist

---

## Phase 4: Cut List & Optimization

### F4.1: Cut List Generation
**Priority**: P0 | **Complexity**: High | **Estimated Time**: 16 hours

**Tasks**:
- Extract all parts from cabinet model
- Calculate dimensions for each part
- Generate part names
- Calculate quantities
- Organize by part type
- Create cut list data structure

**Part Types**:
- Top/Bottom panels
- Left/Right sides
- Back panel
- Shelves
- Drawer fronts
- Drawer sides
- Drawer bottoms
- Drawer backs

**Deliverables**:
- Cut list generation algorithm
- Complete part list with dimensions
- Accurate quantities

**Acceptance Criteria**:
- All parts included
- Dimensions accurate
- Quantities correct
- No missing parts

---

### F4.2: Cut List Display
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 8 hours

**Tasks**:
- Create cut list table component
- Display part name, dimensions, quantity
- Add sorting functionality
- Add filtering by part type
- Format measurements (fractions)
- Add print styling

**Deliverables**:
- Cut list table UI
- Sorting and filtering
- Print-friendly view

**Acceptance Criteria**:
- Table displays all parts
- Sorting works correctly
- Measurements formatted properly
- Printable layout

---

### F4.3: Sheet Layout Optimization Algorithm
**Priority**: P0 | **Complexity**: Very High | **Estimated Time**: 24 hours

**Tasks**:
- Implement 2D bin packing algorithm
- Handle piece rotation (90°)
- Optimize for minimal waste
- Calculate sheet utilization
- Generate layout coordinates
- Handle multiple sheets

**Algorithm Approach**:
1. Sort pieces by area (largest first)
2. For each piece:
   - Try to place on existing sheets
   - If no fit, create new sheet
   - Try both orientations
3. Optimize placement (bottom-left fill)
4. Calculate waste percentage

**Deliverables**:
- Optimization algorithm
- Layout generation
- Waste calculation

**Acceptance Criteria**:
- All pieces fit on sheets
- Waste minimized
- Layout is valid (no overlaps)
- Completes in reasonable time

---

### F4.4: Sheet Layout Visualization
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 12 hours

**Tasks**:
- Create 2D canvas for sheet layouts
- Draw sheet boundaries (48" x 96")
- Draw pieces with dimensions
- Show piece labels
- Display waste areas
- Show utilization percentage
- Support multiple sheets

**Deliverables**:
- Visual sheet layout
- Piece placement display
- Waste visualization

**Acceptance Criteria**:
- Layouts are accurate
- Pieces clearly labeled
- Waste percentage displayed
- Multiple sheets supported

---

### F4.5: Cut List Optimization UI
**Priority**: P0 | **Complexity**: Low | **Estimated Time**: 6 hours

**Tasks**:
- Create optimization controls
- Add "Generate Layout" button
- Show optimization progress
- Display results (sheets needed, waste %)
- Add export/print options

**Deliverables**:
- Optimization UI
- Progress indicators
- Results display

**Acceptance Criteria**:
- Optimization can be triggered
- Progress is visible
- Results are clear

---

## Phase 5: Polish & Enhancement

### F5.1: Export Functionality
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 8 hours

**Tasks**:
- Implement project serialization
- Create JSON export format
- Add version information
- Create download functionality
- Add export button to UI
- Handle export errors

**Export Format**:
```json
{
  "version": "1.0.0",
  "project": {
    "id": "...",
    "name": "...",
    "createdAt": "...",
    "updatedAt": "...",
    "settings": {...},
    "units": [...]
  }
}
```

**Deliverables**:
- Export functionality
- JSON file generation
- Download mechanism

**Acceptance Criteria**:
- Exports all project data
- File can be imported
- Version included
- Download works

---

### F5.2: Import Functionality
**Priority**: P0 | **Complexity**: Medium | **Estimated Time**: 8 hours

**Tasks**:
- Create file upload component
- Parse JSON file
- Validate file structure
- Check version compatibility
- Load project into state
- Handle import errors
- Show success/error messages

**Deliverables**:
- Import functionality
- File validation
- Error handling

**Acceptance Criteria**:
- Imports valid files
- Shows errors for invalid files
- Preserves all data
- Updates UI after import

---

### F5.3: Multi-Unit Support
**Priority**: P1 | **Complexity**: High | **Estimated Time**: 16 hours

**Tasks**:
- Add unit management UI
- Implement add/remove units
- Update state management
- Update 3D visualization
- Update cut list generation
- Handle unit positioning

**Deliverables**:
- Multi-unit design capability
- Unit management UI
- Combined cut lists

**Acceptance Criteria**:
- Multiple units can be added
- Each unit configurable independently
- Cut list combines all units
- 3D view shows all units

---

### F5.4: Performance Optimization
**Priority**: P1 | **Complexity**: Medium | **Estimated Time**: 12 hours

**Tasks**:
- Optimize 3D rendering (useMemo, LOD)
- Optimize state updates
- Add Web Worker for cut list optimization
- Implement debouncing for inputs
- Add loading states
- Performance profiling

**Deliverables**:
- Optimized rendering
- Faster calculations
- Better UX

**Acceptance Criteria**:
- 60fps maintained
- Fast calculations
- Smooth interactions

---

### F5.5: Error Handling & Validation
**Priority**: P1 | **Complexity**: Medium | **Estimated Time**: 8 hours

**Tasks**:
- Add comprehensive input validation
- Create error boundary components
- Add error messages throughout app
- Handle edge cases
- Add user-friendly error messages
- Log errors (client-side)

**Deliverables**:
- Robust error handling
- Clear error messages
- Graceful failures

**Acceptance Criteria**:
- No crashes on invalid input
- Clear error messages
- App remains functional

---

### F5.6: Testing & Quality Assurance
**Priority**: P1 | **Complexity**: High | **Estimated Time**: 20 hours

**Tasks**:
- Write unit tests for utilities
- Write unit tests for geometry generation
- Write unit tests for cut list generation
- Write integration tests for state management
- Write E2E tests for critical flows
- Manual testing checklist
- Bug fixes

**Test Coverage Goals**:
- Utilities: 90%+
- Core algorithms: 80%+
- Critical flows: 100%

**Deliverables**:
- Test suite
- Test documentation
- Bug fixes

**Acceptance Criteria**:
- All tests pass
- Coverage goals met
- Critical bugs fixed

---

### F5.7: Documentation & Polish
**Priority**: P2 | **Complexity**: Low | **Estimated Time**: 12 hours

**Tasks**:
- Write user documentation
- Create getting started guide
- Add tooltips and help text
- Create README
- Add code comments
- Polish UI/UX
- Accessibility audit

**Deliverables**:
- User documentation
- Developer documentation
- Polished UI

**Acceptance Criteria**:
- Documentation complete
- UI is polished
- Accessible

---

## Feature Dependencies

```
F1.1 (Setup) 
  → F1.2 (Unit Conversion)
  → F1.3 (Data Models)
  → F1.4 (State Management)

F1.2, F1.3, F1.4
  → F2.1 (UI Components)
  → F2.2 (Project Management)
  → F2.3 (Configuration Form)

F2.3, F1.3
  → F3.1 (Scene Setup)
  → F3.2 (Geometry Engine)
  → F3.3 (Model Rendering)

F3.2, F1.3
  → F4.1 (Cut List Generation)
  → F4.2 (Cut List Display)
  → F4.3 (Optimization)
  → F4.4 (Layout Visualization)

F1.4, F1.3
  → F5.1 (Export)
  → F5.2 (Import)
  → F5.3 (Multi-Unit)

All
  → F5.4 (Performance)
  → F5.5 (Error Handling)
  → F5.6 (Testing)
  → F5.7 (Documentation)
```

## Estimated Timeline

### Phase 1: Foundation (2 weeks)
- Week 1: F1.1, F1.2, F1.3
- Week 2: F1.4

### Phase 2: Design System (2 weeks)
- Week 3: F2.1, F2.2
- Week 4: F2.3

### Phase 3: 3D Visualization (2 weeks)
- Week 5: F3.1, F3.2
- Week 6: F3.3, F3.4

### Phase 4: Cut List & Optimization (2 weeks)
- Week 7: F4.1, F4.2, F4.3
- Week 8: F4.4, F4.5

### Phase 5: Polish & Enhancement (2 weeks)
- Week 9: F5.1, F5.2, F5.3, F5.4
- Week 10: F5.5, F5.6, F5.7

**Total Estimated Time**: 10 weeks (with 1 developer)

## MVP Scope (Minimum Viable Product)

For a faster initial release, focus on:

1. **Core Features** (P0 only):
   - F1.1-F1.4 (Foundation)
   - F2.1-F2.3 (Design System)
   - F3.1-F3.3 (3D Visualization)
   - F4.1-F4.5 (Cut List)
   - F5.1-F5.2 (Export/Import)

2. **Defer to v2**:
   - F3.4 (Advanced 3D controls)
   - F5.3 (Multi-unit)
   - F5.4 (Performance - basic only)
   - F5.7 (Full documentation)

**MVP Timeline**: 6-7 weeks

## Success Criteria

### Technical
- All P0 features implemented
- No critical bugs
- Performance targets met
- Tests passing

### User Experience
- Intuitive interface
- Clear error messages
- Helpful tooltips
- Responsive design

### Functionality
- Accurate calculations
- Reliable export/import
- Optimized cut lists
- Real-time 3D updates

