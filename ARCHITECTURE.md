# Cabinet Builder - Architecture Document

## Executive Summary

This document outlines the architecture for a Next.js-based parametric cabinet design application. The system enables DIY users to design custom cabinets with 3D visualization, export/import capabilities, and automated cut list optimization.

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (Next.js)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   UI/Forms   │  │  3D Viewer   │  │  Cut List    │      │
│  │  (React)     │  │ (R3F/Three)  │  │  Optimizer   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Parametric Model Engine (OpenSCAD/JS)        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              State Management (Zustand)               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Local       │  │  Export/     │  │  Cut List    │      │
│  │  Storage     │  │  Import      │  │  Generator   │      │
│  │  (IndexedDB) │  │  (JSON)      │  │  (Algorithm) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Framework
- **Next.js 14+** (App Router)
  - Server-side rendering for initial load
  - API routes for data processing
  - Static generation for documentation

### 3D Visualization
- **React Three Fiber (R3F)**
  - React wrapper for Three.js
  - Declarative 3D scene management
  - Built-in hooks for interactions

- **Three.js**
  - Core 3D rendering engine
  - Geometry generation
  - Material and lighting

- **@react-three/drei**
  - Helpful utilities for R3F
  - OrbitControls, TransformControls
  - Performance optimizations

### Parametric Modeling
- **Custom JavaScript Engine**
  - Pure JS implementation for browser compatibility
  - Parametric geometry generation
  - Real-time model updates

- **Alternative: OpenSCAD.js** (if available)
  - WebAssembly compilation of OpenSCAD
  - Full OpenSCAD syntax support

### State Management
- **Zustand**
  - Lightweight state management
  - TypeScript support
  - DevTools integration

### Data Persistence
- **IndexedDB** (via idb or Dexie.js)
  - Client-side storage for projects
  - Offline capability
  - Large data support

### Cut List Optimization
- **Custom Algorithm**
  - Bin packing algorithm (2D)
  - Genetic algorithm or simulated annealing
  - Optimization for 4' x 8' sheets

### UI/UX Libraries
- **Tailwind CSS**
  - Utility-first styling
  - Responsive design

- **shadcn/ui** or **Radix UI**
  - Accessible component library
  - Form components

- **React Hook Form**
  - Form validation and management
  - TypeScript integration

### Unit Conversion
- **Custom utility library**
  - Inches, feet, fractions
  - Decimal to fraction conversion
  - Precision handling

## Core Components Architecture

### 1. Parametric Model Engine

**Purpose**: Generate 3D geometry based on user parameters

**Key Classes/Modules**:
```typescript
// Core parametric model
class CabinetModel {
  // Dimensions
  width: number;      // inches
  height: number;    // inches
  depth: number;     // inches
  
  // Material properties
  materialThickness: number;  // inches
  materialType: MaterialType;
  
  // Configuration
  configuration: CabinetConfiguration;
  
  // Generate geometry
  generateGeometry(): THREE.BufferGeometry[];
  
  // Generate cut list
  generateCutList(): CutPiece[];
}
```

**Configuration Types**:
- Cabinet with shelves
- Drawer configuration (number of drawers)
- Mixed (cabinets + drawers)

### 2. 3D Visualization System

**Component Structure**:
```
<Canvas>
  <Scene>
    <CabinetModel3D />
    <GridHelper />
    <AxesHelper />
    <OrbitControls />
    <TransformControls /> (optional)
    <Lights />
  </Scene>
</Canvas>
```

**Features**:
- Real-time model updates
- Interactive rotation/zoom
- Measurement display
- Exploded view option
- Section view option

### 3. State Management

**Store Structure** (Zustand):
```typescript
interface AppState {
  // Current project
  project: Project;
  
  // UI state
  ui: {
    selectedView: 'design' | 'cutlist' | 'export';
    showMeasurements: boolean;
    showGrid: boolean;
  };
  
  // Actions
  updateProject: (project: Partial<Project>) => void;
  loadProject: (projectId: string) => void;
  exportProject: () => void;
  importProject: (data: string) => void;
}
```

### 4. Cut List Optimizer

**Algorithm Approach**:
1. **Input**: List of required pieces with dimensions
2. **Process**: 
   - Sort pieces by area (largest first)
   - Apply 2D bin packing algorithm
   - Optimize for minimal waste
   - Consider grain direction (if applicable)
3. **Output**: Optimized layout on 4' x 8' sheets

**Algorithm Options**:
- **First Fit Decreasing (FFD)**: Simple, fast
- **Bottom-Left Fill**: Better space utilization
- **Genetic Algorithm**: Optimal but slower
- **Simulated Annealing**: Good balance

**Recommended**: Hybrid approach
- FFD for initial layout
- Local optimization for waste reduction

### 5. Data Models

**Project Schema**:
```typescript
interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Global settings
  settings: {
    materialThickness: number;
    materialType: string;
    unitSystem: 'imperial';
  };
  
  // Cabinet units
  units: CabinetUnit[];
}

interface CabinetUnit {
  id: string;
  type: 'cabinet' | 'drawer';
  width: number;
  height: number;
  depth: number;
  
  // Cabinet-specific
  numShelves?: number;
  shelfSpacing?: number;
  
  // Drawer-specific
  numDrawers?: number;
  drawerHeights?: number[];
  
  // Position (for multi-unit designs)
  position: { x: number; y: number; z: number };
}
```

**Cut List Schema**:
```typescript
interface CutList {
  pieces: CutPiece[];
  sheets: SheetLayout[];
  wastePercentage: number;
  totalSheets: number;
}

interface CutPiece {
  id: string;
  name: string;  // e.g., "Top Panel", "Side Panel"
  width: number;
  height: number;
  quantity: number;
  material: string;
  grainDirection?: 'horizontal' | 'vertical';
}

interface SheetLayout {
  sheetId: number;
  pieces: PlacedPiece[];
  wasteArea: number;
  utilization: number;  // percentage
}

interface PlacedPiece extends CutPiece {
  x: number;  // position on sheet
  y: number;
  rotation: 0 | 90;  // degrees
}
```

## Data Flow

### Design Flow
```
User Input → Form Validation → State Update → 
Parametric Model Update → Geometry Generation → 
3D Scene Update → Visual Feedback
```

### Export Flow
```
Project State → Serialization → JSON/File → 
Download/Storage
```

### Import Flow
```
File Upload → Deserialization → Validation → 
State Update → Model Regeneration → 3D Update
```

### Cut List Flow
```
Project State → Piece Extraction → 
Cut List Generation → Optimization Algorithm → 
Layout Calculation → Visualization
```

## Performance Considerations

### 3D Rendering
- Use `useMemo` for geometry calculations
- Implement level-of-detail (LOD) for complex models
- Use instancing for repeated parts
- Debounce parameter updates

### Cut List Optimization
- Run optimization in Web Worker
- Show progress indicator
- Cache results for same inputs
- Allow user to stop/restart

### State Management
- Selective updates to prevent unnecessary re-renders
- Use Zustand's shallow comparison
- Memoize expensive computations

## Security Considerations

### Client-Side Only
- No server-side processing required
- All data stored locally
- Export/import via JSON (no external validation needed)

### File Handling
- Validate JSON structure on import
- Sanitize file names
- Size limits for imported files

## Scalability

### Current Scope
- Single-user, client-side application
- No backend required initially

### Future Enhancements
- Cloud storage integration
- Sharing capabilities
- Template library
- Community designs

## Browser Compatibility

### Minimum Requirements
- Modern browsers with WebGL 2.0 support
- ES2020+ JavaScript support
- IndexedDB support

### Recommended
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Development Environment

### Required Tools
- Node.js 18+
- npm/yarn/pnpm
- TypeScript 5+
- Git

### Development Dependencies
- ESLint
- Prettier
- TypeScript
- Vitest (testing)

## Deployment Strategy

### Build Process
- Next.js static export (if no SSR needed)
- Or standard Next.js deployment

### Hosting Options
- Vercel (recommended for Next.js)
- Netlify
- GitHub Pages (with static export)

### Bundle Size Optimization
- Code splitting
- Dynamic imports for 3D components
- Tree shaking
- Compression

## Monitoring & Analytics

### Optional Integrations
- Error tracking (Sentry)
- Analytics (Plausible, privacy-focused)
- Performance monitoring

## Accessibility

### Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators

## Testing Strategy

### Unit Tests
- Parametric model calculations
- Cut list optimization
- Unit conversions
- Data serialization

### Integration Tests
- State management flows
- Export/import cycles
- Cut list generation

### E2E Tests
- Critical user flows
- Form submissions
- 3D interactions

## Documentation Requirements

### User Documentation
- Getting started guide
- Parameter explanations
- Cut list interpretation
- Export/import instructions

### Developer Documentation
- Architecture overview
- Component API
- Algorithm documentation
- Contribution guidelines

