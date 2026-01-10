# Cabinet Builder - Product Requirements Document

## 1. Product Overview

### 1.1 Purpose
Cabinet Builder is a web-based parametric design tool that enables DIY enthusiasts to design custom cabinets and built-ins for their spaces. The application provides 3D visualization, automated cut list generation, and optimization for standard plywood sheets.

### 1.2 Target Users
- DIY homeowners
- Woodworking hobbyists
- Small contractors
- Makers and builders

### 1.3 Key Value Propositions
- **Ease of Use**: Intuitive interface for non-professionals
- **Visualization**: See designs in 3D before building
- **Optimization**: Minimize material waste with automated cut lists
- **Flexibility**: Export and modify designs later
- **Cost Savings**: Optimize material usage

## 2. Functional Requirements

### 2.1 Core Features

#### FR-1: Project Management
**Priority**: P0 (Critical)

**Description**: Users must be able to create, save, load, and manage cabinet design projects.

**Requirements**:
- Create new project with name
- Save project to local storage
- Load existing project
- Delete project
- List all saved projects
- Auto-save functionality (optional)

**Acceptance Criteria**:
- Projects persist across browser sessions
- Projects can be uniquely identified
- Project list displays name and last modified date

**Status**: ✅ Implemented

---

#### FR-2: Parametric Cabinet Design
**Priority**: P0 (Critical)

**Description**: Users can configure cabinet dimensions and properties through a form interface.

**Input Parameters**:
- **Overall Dimensions**:
  - Width (inches, with fraction support)
  - Height (inches, with fraction support)
  - Depth (inches, with fraction support)

- **Material Properties**:
  - Material thickness (e.g., 3/4", 1/2", 1/4")
  - Material type (Plywood, MDF, etc.) - for reference only

- **Unit Configuration**:
  - Type: Cabinet or Drawer unit
  - For Cabinets:
    - Number of shelves
    - Shelf spacing (auto or manual)
    - Door configuration (optional, future)
  - For Drawers:
    - Number of drawers
    - Drawer heights (auto-distributed or manual)
    - Drawer spacing

**Acceptance Criteria**:
- All dimensions accept decimal and fraction inputs
- Validation prevents invalid dimensions (e.g., negative, too small)
- Real-time updates to 3D model
- Support for multiple units in one project

**Status**: ✅ Partially Implemented (form exists, needs material settings UI)

---

#### FR-3: 3D Visualization
**Priority**: P0 (Critical)

**Description**: Interactive 3D view of the cabinet design.

**Features**:
- Real-time rendering of parametric model
- Interactive camera controls (orbit, pan, zoom)
- Measurement display on hover/select
- Grid and axis helpers
- Material appearance (wood texture, optional)
- Exploded view toggle (optional)
- Section view (optional)

**Acceptance Criteria**:
- Model updates within 500ms of parameter change
- Smooth camera interactions (60fps)
- Clear visualization of all parts
- Responsive on desktop and tablet

**Status**: ❌ Not Implemented

---

#### FR-4: Unit Configuration
**Priority**: P0 (Critical)

**Description**: Users can configure whether a unit is a cabinet or drawer system.

**Cabinet Configuration**:
- Toggle between cabinet and drawer mode
- Set number of shelves (0-10)
- Auto-calculate shelf spacing or manual override
- Display shelf positions

**Drawer Configuration**:
- Set number of drawers (1-10)
- Auto-distribute drawer heights or manual specification
- Display drawer positions
- Show drawer front dimensions

**Acceptance Criteria**:
- Switching between modes updates model immediately
- Validation ensures drawers fit within height
- Clear visual distinction between cabinet and drawer modes

**Status**: ✅ Implemented

---

#### FR-5: Export Functionality
**Priority**: P0 (Critical)

**Description**: Users can export their project to a file for later editing.

**Export Format**: JSON

**Export Contents**:
- Project metadata (name, date, version)
- All design parameters
- Unit configurations
- Settings

**Features**:
- Download as `.cabinet` or `.json` file
- Include version information for compatibility
- Export button in UI

**Acceptance Criteria**:
- Exported file can be imported successfully
- All parameters preserved
- File size reasonable (< 1MB for typical projects)

**Status**: ❌ Not Implemented

---

#### FR-6: Import Functionality
**Priority**: P0 (Critical)

**Description**: Users can import previously exported projects.

**Features**:
- File upload dialog
- JSON validation
- Error handling for invalid files
- Version compatibility check
- Import replaces current project or creates new

**Acceptance Criteria**:
- Successfully imports valid files
- Shows clear error messages for invalid files
- Preserves all design parameters
- Updates 3D model after import

**Status**: ❌ Not Implemented

---

#### FR-7: Cut List Generation
**Priority**: P0 (Critical)

**Description**: Automatically generate a list of all pieces needed to build the cabinet.

**Output**:
- List of all parts with dimensions
- Part names (e.g., "Top Panel", "Left Side", "Shelf 1")
- Quantity for each part
- Material type and thickness

**Display**:
- Table format
- Sortable columns
- Filterable by part type
- Printable format

**Acceptance Criteria**:
- All parts included
- Dimensions accurate to 1/16"
- Quantities correct
- Clear part identification

**Status**: ❌ Not Implemented

---

#### FR-8: Cut List Optimization
**Priority**: P0 (Critical)

**Description**: Optimize cut layout for 4' x 8' (48" x 96") plywood sheets.

**Features**:
- Automatic layout generation
- Visual representation of sheet layouts
- Waste calculation and percentage
- Number of sheets required
- Piece placement with coordinates
- Rotation optimization (90° only)

**Algorithm Requirements**:
- Minimize waste
- Minimize number of sheets
- Show piece positions on each sheet
- Allow manual adjustment (future)

**Acceptance Criteria**:
- Layout fits all pieces
- Waste percentage displayed
- Visual layout is accurate
- Calculation completes in < 10 seconds for typical projects

**Status**: ❌ Not Implemented

---

### 2.2 Secondary Features

#### FR-9: Multi-Unit Design
**Priority**: P1 (High)

**Description**: Support multiple cabinet/drawer units in a single project.

**Features**:
- Add/remove units
- Position units (for visualization)
- Individual unit configuration
- Combined cut list

**Status**: ⚠️ Partially Implemented (can add multiple units, positioning not implemented)

---

#### FR-10: Measurement Display
**Priority**: P1 (High)

**Description**: Show dimensions on 3D model.

**Features**:
- Toggle measurement display
- Hover to see part dimensions
- Select part to see full details
- Dimension lines in 3D view

**Status**: ❌ Not Implemented

---

#### FR-11: Print Views
**Priority**: P2 (Medium)

**Description**: Printable views of design and cut list.

**Features**:
- Print-optimized cut list
- Print-optimized 3D views
- Technical drawings (orthographic views)

**Status**: ❌ Not Implemented

---

#### FR-12: Template Library
**Priority**: P2 (Medium)

**Description**: Pre-configured cabinet templates.

**Features**:
- Common cabinet sizes
- Standard configurations
- Quick start options

**Status**: ❌ Not Implemented

---

### 2.3 Future Enhancements

- Advanced joinery options (dado, rabbet, etc.)
- Hardware integration (hinges, slides)
- Cost estimation
- Material ordering integration
- Mobile app version
- Cloud sync
- Sharing and collaboration

## 3. Non-Functional Requirements

### 3.1 Performance

**NFR-1: Response Time**
- 3D model updates: < 500ms
- Cut list generation: < 2 seconds
- Cut list optimization: < 10 seconds
- Page load: < 3 seconds

**NFR-2: Rendering Performance**
- Maintain 60fps during camera interactions
- Support models with up to 100 parts
- Smooth animations

### 3.2 Usability

**NFR-3: User Interface**
- Intuitive navigation
- Clear labeling
- Helpful tooltips
- Error messages in plain language
- Responsive design (desktop-first, tablet support)

**NFR-4: Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode

### 3.3 Reliability

**NFR-5: Data Persistence**
- Projects saved automatically
- Recovery from browser crashes
- Data validation on load

**NFR-6: Error Handling**
- Graceful error messages
- No data loss on errors
- Validation before operations

### 3.4 Compatibility

**NFR-7: Browser Support**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**NFR-8: Device Support**
- Desktop (primary)
- Tablet (secondary)
- Mobile (view-only, future)

### 3.5 Security & Privacy

**NFR-9: Data Privacy**
- All data stored locally
- No external data transmission
- No tracking (optional analytics)

## 4. User Stories

### Epic 1: Project Setup
- **As a** user, **I want to** create a new project, **so that** I can start designing my cabinet.
- **As a** user, **I want to** name my project, **so that** I can identify it later.
- **As a** user, **I want to** see my saved projects, **so that** I can continue working on them.

**Status**: ✅ Implemented

### Epic 2: Cabinet Design
- **As a** user, **I want to** enter cabinet dimensions, **so that** the cabinet fits my space.
- **As a** user, **I want to** see my cabinet in 3D, **so that** I can visualize the design.
- **As a** user, **I want to** configure shelves, **so that** I can organize the interior.
- **As a** user, **I want to** configure drawers, **so that** I can design drawer systems.

**Status**: ⚠️ Partially Implemented (form exists, 3D visualization missing)

### Epic 3: Material & Cut List
- **As a** user, **I want to** set material thickness, **so that** cut lists are accurate.
- **As a** user, **I want to** see a cut list, **so that** I know what to cut.
- **As a** user, **I want to** see optimized sheet layouts, **so that** I minimize waste.

**Status**: ❌ Not Implemented

### Epic 4: Save & Share
- **As a** user, **I want to** export my project, **so that** I can save it for later.
- **As a** user, **I want to** import a project, **so that** I can continue editing.

**Status**: ❌ Not Implemented

## 5. Technical Constraints

### 5.1 Units
- **Primary**: US Imperial (inches, feet)
- **Input Format**: Decimal (e.g., 24.5) or Fraction (e.g., 24 1/2)
- **Display Format**: Fraction preferred (e.g., 24 1/2")
- **Precision**: 1/16" (0.0625")

### 5.2 Material Standards
- Standard sheet size: 4' x 8' (48" x 96")
- Common thicknesses: 1/4", 1/2", 5/8", 3/4"
- Default: 3/4" plywood

### 5.3 Design Constraints
- Minimum cabinet dimensions: 12" width, 12" height, 12" depth
- Maximum cabinet dimensions: 96" width, 96" height, 24" depth
- Maximum drawers: 10 per unit
- Maximum shelves: 10 per cabinet

## 6. Success Metrics

### 6.1 User Engagement
- Time to first cabinet design: < 5 minutes
- Projects created per user: > 1
- Export usage: > 50% of projects

### 6.2 Functionality
- Cut list accuracy: 100%
- Optimization waste reduction: > 10% vs. manual
- Import/export success rate: > 99%

### 6.3 Performance
- 3D rendering: 60fps maintained
- Cut list generation: < 2 seconds
- User satisfaction: > 4/5 stars

## 7. Out of Scope (v1.0)

- Backend/server infrastructure
- User accounts/authentication
- Cloud storage
- Mobile app
- Advanced joinery details
- Hardware specifications
- Cost estimation
- Material ordering
- Collaboration features
- Advanced rendering (photorealistic)
- Animation/transitions
- Undo/redo (future)

## 8. Dependencies

### 8.1 External Libraries
- Next.js
- React Three Fiber
- Three.js
- Zustand
- React Hook Form
- Tailwind CSS

### 8.2 Browser APIs
- WebGL 2.0
- IndexedDB
- File API
- Canvas API

## 9. Risks & Mitigation

### 9.1 Technical Risks

**Risk**: Cut list optimization performance
- **Mitigation**: Use efficient algorithms, Web Workers, progress indicators

**Risk**: 3D rendering performance on low-end devices
- **Mitigation**: LOD system, performance settings, fallback to 2D

**Risk**: Browser compatibility
- **Mitigation**: Progressive enhancement, feature detection, polyfills

### 9.2 User Experience Risks

**Risk**: Complex interface for non-technical users
- **Mitigation**: User testing, clear labels, tutorials, tooltips

**Risk**: Confusion with measurements
- **Mitigation**: Clear unit display, fraction/decimal conversion, examples

## 10. Timeline & Milestones

See FEATURES.md for detailed feature breakdown and delivery schedule.
