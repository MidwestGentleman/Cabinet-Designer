# Agent Instructions for Cabinet Builder

This document contains essential information for AI agents (Ralph/Amp) working on this project. **Amp automatically reads this file**, so keep it updated with discovered patterns, gotchas, and conventions.

## Overview

Cabinet Builder is a Next.js 16+ application using:
- **Framework**: Next.js App Router with TypeScript
- **State Management**: Zustand with localStorage persistence
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **3D Rendering**: React Three Fiber + Three.js (planned)
- **Testing**: Vitest (unit/integration), Playwright (E2E), Storybook (components)
- **CI/CD**: GitHub Actions with automated test runs

## Product Knowledge

### Application Purpose

Cabinet Builder is a **web-based parametric design tool** that enables DIY enthusiasts, woodworking hobbyists, and small contractors to design custom cabinets and built-ins for their spaces. The application provides:

1. **3D Visualization** - See designs in 3D before building
2. **Automated Cut Lists** - Generate lists of all parts needed to build the cabinet
3. **Material Optimization** - Optimize cut layouts for standard 4' x 8' (48" x 96") plywood sheets to minimize waste
4. **Export/Import** - Save and share designs for later editing

### Target Users

- **DIY homeowners** - People building cabinets for their homes
- **Woodworking hobbyists** - Enthusiasts who enjoy building furniture
- **Small contractors** - Professionals who need quick design tools
- **Makers and builders** - Anyone creating custom cabinetry

### Key Value Propositions

- **Ease of Use**: Intuitive interface for non-professionals (no CAD experience required)
- **Visualization**: See 3D models before cutting any wood
- **Optimization**: Minimize material waste with automated cut list optimization
- **Flexibility**: Export and modify designs later
- **Cost Savings**: Optimize material usage to reduce costs

### Core Features & User Workflows

#### 1. Project Management
Users create, save, and manage multiple cabinet design projects. Each project:
- Has a unique name and ID
- Persists in localStorage (client-side only, no backend)
- Contains one or more cabinet/drawer units
- Has global material settings (thickness, type)

**User Flow**: Home page → Create/Select project → Project workspace

#### 2. Parametric Cabinet Design
Users configure cabinet dimensions through forms:
- **Dimensions**: Width, Height, Depth (all in inches, supports fractions)
- **Unit Type**: Cabinet (with shelves) or Drawer Stack (with drawers)
- **Configuration**:
  - Cabinets: Number of shelves (0-10), shelf spacing
  - Drawers: Number of drawers (1-10), drawer heights

**Key Constraint**: All measurements are in **US Imperial units (inches)** with 1/16" precision.

#### 3. 3D Visualization (Planned)
Interactive 3D view showing:
- Real-time model updates as parameters change
- Camera controls (orbit, pan, zoom)
- Measurement display on hover/select
- Grid and axis helpers

**Performance Target**: Model updates within 500ms, 60fps camera interactions.

#### 4. Cut List Generation
Automatically generates a list of all parts needed:
- Part names (e.g., "Top Panel", "Left Side", "Shelf 1")
- Dimensions for each part
- Quantities
- Material type and thickness

**Output**: Table format, sortable, filterable, printable.

#### 5. Cut List Optimization
Optimizes piece placement on standard 4' x 8' plywood sheets:
- Minimizes waste percentage
- Minimizes number of sheets required
- Shows visual layout of pieces on each sheet
- Handles piece rotation (90° only)

**Algorithm**: 2D bin packing optimized for 48" x 96" sheets.

#### 6. Export/Import
- Export projects as JSON files (`.cabinet` or `.json`)
- Import previously exported projects
- Preserves all design parameters and settings

### Domain Knowledge

#### Measurement System
- **Primary Unit**: US Imperial (inches, feet)
- **Input Format**: Decimal (24.5) or Fraction (24 1/2)
- **Display Format**: Fraction preferred (24 1/2")
- **Precision**: 1/16" (0.0625") - standard woodworking precision
- **Common Fractions**: 1/16, 1/8, 1/4, 3/8, 1/2, 5/8, 3/4, 7/8, 15/16

#### Material Standards
- **Standard Sheet Size**: 4' x 8' (48" x 96")
- **Common Thicknesses**: 1/4", 1/2", 5/8", 3/4"
- **Default Thickness**: 3/4" (0.75") plywood
- **Material Types**: Plywood, MDF, Hardwood, Other (for reference only)

#### Design Constraints
- **Minimum Dimensions**: 12" width, 12" height, 12" depth
- **Maximum Dimensions**: 96" width, 96" height, 24" depth
- **Maximum Drawers**: 10 per unit
- **Maximum Shelves**: 10 per cabinet

#### Cabinet Structure
A cabinet consists of:
- **Box Structure**: Top, Bottom, Left Side, Right Side, Back panels
- **Shelves** (for cabinets): Horizontal dividers, quantity configurable
- **Drawers** (for drawer stacks): Individual drawer boxes with fronts, quantity configurable

**Material Thickness**: All panels use the same thickness (from project settings). This affects:
- Internal dimensions (width/height reduced by 2× thickness)
- Cut list calculations
- 3D geometry generation

### Business Logic

#### Project Structure
```
Project
├── Settings (global)
│   ├── Material Thickness (inches)
│   ├── Material Type (plywood, mdf, etc.)
│   └── Unit System (imperial)
└── Units (array)
    ├── Cabinet Unit
    │   ├── Dimensions (width, height, depth)
    │   ├── Number of Shelves
    │   └── Position (x, y, z) for multi-unit layouts
    └── Drawer Unit
        ├── Dimensions (width, height, depth)
        ├── Number of Drawers
        └── Position (x, y, z)
```

#### State Management Flow
1. User creates/loads project → Stored in Zustand store
2. User adds/edits units → Updates project.units array
3. Changes auto-save → Zustand persist middleware saves to localStorage
4. Cut list generation → Reads from currentProject.units
5. Export → Serializes entire project to JSON

#### Validation Rules
- Dimensions must be positive numbers
- Dimensions must be within min/max constraints
- Cabinet shelves: 0-10
- Drawer count: 1-10
- Material thickness: Common values (1/4", 1/2", 5/8", 3/4")
- Measurements rounded to nearest 1/16"

### User Experience Priorities

1. **Simplicity**: Non-technical users should be able to use it without training
2. **Visual Feedback**: Changes should be immediately visible (3D model updates)
3. **Accuracy**: Cut lists must be accurate to 1/16" - mistakes waste material
4. **Performance**: Fast calculations and smooth interactions
5. **Offline Capability**: All data stored locally, no internet required

### Future Enhancements

- Multi-unit design (multiple cabinets in one project)
- Cost estimation
- Backend/server infrastructure
- Advanced joinery options
- Hardware integration
- User accounts/authentication
- Material ordering
- Cloud sync
- Sharing and collaboration

## Commands

### Development
```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
```

### Quality Checks (Run in this order)
```bash
npm run typecheck      # TypeScript type checking
npm run lint           # ESLint code quality
npm run test:unit      # Unit tests (Vitest)
npm run test:integration  # Integration tests
npm run test:e2e:smoke # E2E smoke tests (requires dev server)
npm run test:all       # Run all checks in CI order
```

### Testing
```bash
npm run test           # Vitest watch mode
npm run test:ui        # Vitest UI
npm run test:coverage   # Coverage report
npm run test:e2e       # All E2E tests
npm run test:e2e:ui    # Playwright UI mode
npm run storybook      # Storybook dev server (port 6006)
```

## Key Files

### Core Application
- `app/page.tsx` - Home page (project list)
- `app/project/[id]/page.tsx` - Project workspace page
- `app/globals.css` - Global styles (must be imported in Storybook preview)
- `store/useAppStore.ts` - Zustand store with persistence
- `types/index.ts` - All TypeScript type definitions
- `lib/measurements.ts` - Measurement conversion utilities (imperial units)

### Components
- `components/ui/` - shadcn/ui components (Button, Card, Input, Label, Select)
- Each component has a corresponding `.stories.tsx` file for Storybook

### Testing
- `tests/unit/` - Unit tests (Vitest)
- `tests/integration/` - Integration tests
- `tests/e2e/` - E2E tests (Playwright)
- `tests/setup.ts` - Global test setup (mocks Next.js router, etc.)
- `tests/fixtures/` - Test data fixtures
- `playwright.config.ts` - Playwright configuration
- `vitest.config.ts` - Vitest configuration

### Configuration
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `.github/workflows/` - CI/CD workflows

## Running Locally

### Prerequisites
- Node.js 20.x
- npm (comes with Node.js)

### Setup
```bash
npm install              # Install dependencies
npm run dev              # Start dev server
```

### For E2E Tests
E2E tests require the dev server to be running:
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run test:e2e:smoke
```

The Playwright config automatically starts the dev server if not running, but it's better to run it manually for debugging.

## Code Patterns & Conventions

### State Management (Zustand)

**Pattern**: All state lives in `store/useAppStore.ts`. Use Zustand's `persist` middleware for localStorage.

```typescript
// ✅ Correct: Use store actions
const { createProject, addUnit } = useAppStore();

// ❌ Wrong: Don't mutate state directly
// state.projects.push(newProject);
```

**Gotcha**: When updating projects, always use `updateProject()` which automatically sets `updatedAt`. The store persists `projects` and `currentProject` to localStorage, but NOT `ui` state.

**Pattern**: Unit IDs are generated with `crypto.randomUUID()`. Project IDs use the same method.

### Type Definitions

**Pattern**: All types are centralized in `types/index.ts`. Import from there:
```typescript
import type { Project, CabinetUnit, MaterialType } from "@/types";
```

**Gotcha**: `MaterialType` is lowercase: `"plywood"` not `"Plywood"`. `UnitType` is `"cabinet" | "drawer"`.

**Pattern**: Dates are `Date` objects, not strings. When creating projects, use `new Date()` for `createdAt` and `updatedAt`.

### Measurements (Imperial Units)

**Pattern**: All measurements are in **inches** (decimal). Use `lib/measurements.ts` utilities:
- `decimalToFraction()` - Convert 24.5 → "24 1/2"
- `fractionToDecimal()` - Convert "24 1/2" → 24.5
- `formatMeasurement()` - Format with quotes: 24.5 → "24 1/2\""
- `parseMeasurement()` - Parse user input (handles both decimal and fraction)
- `roundToNearest16th()` - Round to 1/16" precision
- `validateMeasurement()` - Validate range (default: 0.5" to 96")

**Gotcha**: The measurement utilities use a tolerance of 0.001 for floating-point comparisons. Fractions are rounded to nearest 16th.

**Pattern**: Default material thickness is **0.75"** (3/4" plywood). This is set in `createProject()`.

### UI Components (shadcn/ui)

**Pattern**: All UI components are in `components/ui/`. They use:
- `class-variance-authority` for variants
- `cn()` utility from `lib/utils` for className merging
- `forwardRef` for ref forwarding
- TypeScript interfaces extending HTML element props

**Pattern**: Components use Tailwind CSS classes. The `cn()` utility handles conditional classes:
```typescript
className={cn("base-classes", condition && "conditional-class", className)}
```

**Gotcha**: When adding new shadcn/ui components, use `npx shadcn@latest add [component]` to maintain consistency. Manual components should follow the same pattern as existing ones.

### Next.js App Router

**Pattern**: All pages are in `app/` directory. Use `"use client"` directive for client components that use hooks or interactivity.

**Gotcha**: The project page uses dynamic routing: `app/project/[id]/page.tsx`. Access params with `useParams()` from `next/navigation`.

**Pattern**: Use `Link` from `next/link` for navigation, not `<a>` tags.

### Testing Patterns

**Pattern**: Use `data-testid` attributes for E2E test selectors. Don't rely on CSS classes or text content.

```typescript
// ✅ Correct
<Button data-testid="create-project-button">Create</Button>

// ❌ Wrong
<Button className="create-btn">Create</Button>  // Don't test by class
```

**Pattern**: Unit tests go in `tests/unit/`, E2E tests in `tests/e2e/`. Use Vitest for unit/integration, Playwright for E2E.

**Gotcha**: E2E tests require the dev server running on port 3000. The Playwright config sets `baseURL: http://localhost:3000`.

**Pattern**: Storybook stories use `@storybook/nextjs-vite` imports, not `@storybook/react`. The preview imports `app/globals.css` for Tailwind styles.

### File Organization

**Pattern**: 
- `app/` - Next.js pages and routes
- `components/` - React components
- `lib/` - Utility functions (pure functions, no React)
- `store/` - Zustand state management
- `types/` - TypeScript type definitions
- `tests/` - All test files
- `public/` - Static assets

**Gotcha**: Path aliases use `@/*` pointing to project root. Use `@/components`, `@/lib`, etc. in imports.

## Gotchas & Non-Obvious Requirements

### State Persistence
- **Gotcha**: Zustand persist middleware only saves `projects` and `currentProject` to localStorage. UI state (`ui` object) is NOT persisted and resets on page reload.
- **Gotcha**: When updating a project, `updateProject()` automatically sets `updatedAt`. Don't manually set it.

### Measurements
- **Gotcha**: All dimensions are in inches. When displaying, use `formatMeasurement()` to show fractions (e.g., "24 1/2\"").
- **Gotcha**: Material thickness defaults to 0.75" (3/4"). This is hardcoded in `createProject()`.

### Type Safety
- **Gotcha**: `MaterialType` values are lowercase strings. Use `"plywood"` not `"Plywood"`.
- **Gotcha**: `Project.createdAt` and `updatedAt` are `Date` objects, not ISO strings. When creating, use `new Date()`.

### Testing
- **Gotcha**: E2E tests require `npm run dev` to be running OR Playwright will start it automatically (but manual is better for debugging).
- **Gotcha**: Storybook preview must import `app/globals.css` or components won't have Tailwind styles.
- **Gotcha**: Test setup mocks `next/navigation` router. Don't test actual navigation in unit tests.

### Component Patterns
- **Gotcha**: When adding new UI components, create a corresponding `.stories.tsx` file in the same directory.
- **Gotcha**: shadcn/ui components use `forwardRef`. Always forward refs for proper DOM access.

### CI/CD
- **Gotcha**: CI runs tests in specific order: typecheck → lint → unit → integration → e2e:smoke. If typecheck fails, nothing else runs.
- **Gotcha**: Integration tests directory can be empty (handled gracefully). Don't fail CI if no integration tests exist.

## Dependencies Between Files

### Store → Types
- `store/useAppStore.ts` imports from `types/index.ts`
- When adding new types, export from `types/index.ts` first

### Components → Store
- Components import `useAppStore` from `store/useAppStore.ts`
- Components import types from `types/index.ts`

### Components → Utilities
- Components use `lib/measurements.ts` for measurement formatting
- Components use `lib/utils.ts` for `cn()` utility

### Tests → Everything
- Tests import from source files using `@/` aliases
- Test setup (`tests/setup.ts`) mocks Next.js router globally

### Storybook → Components
- Storybook stories import components from `components/ui/`
- Storybook preview imports `app/globals.css` for styles

## Testing Approaches

### Unit Tests
- Test pure functions in `lib/` (e.g., `measurements.ts`)
- Test component rendering and interactions
- Use `@testing-library/react` for component tests
- Mock Next.js router (already done in `tests/setup.ts`)

### Integration Tests
- Test component interactions with store
- Test form validation flows
- Test data transformations

### E2E Tests
- Use `data-testid` for reliable selectors
- Test critical user flows (create project, add unit, etc.)
- Smoke tests should be fast (< 5 minutes)
- Full E2E suite runs in nightly CI

### Storybook
- Create stories for all component variants
- Test loading, error, empty states
- Use `@storybook/addon-a11y` for accessibility checks
- Stories should demonstrate all props and states

## Configuration & Environment

### Required Environment
- Node.js 20.x
- npm (comes with Node.js)
- No environment variables required (all data is client-side)

### Optional Environment
- `PLAYWRIGHT_BASE_URL` - Override base URL for E2E tests (default: http://localhost:3000)

### Build Requirements
- TypeScript 5+
- Next.js 16+
- All dependencies in `package.json`

## When Modifying...

### Adding a New Component
1. Create component in `components/ui/`
2. Create `.stories.tsx` file in same directory
3. Export from component file
4. Add Storybook story to `.storybook/main.ts` (auto-detected if in `components/**/*.stories.*`)
5. Use `data-testid` if component is interactive

### Adding a New Page
1. Create in `app/` directory following Next.js App Router conventions
2. Use `"use client"` if using hooks or interactivity
3. Import types from `@/types`
4. Use store via `useAppStore()` hook
5. Add E2E test if it's a critical flow

### Modifying Store
1. Update `AppState` interface in `store/useAppStore.ts`
2. Update `persist` `partialize` if adding new persisted state
3. **Gotcha**: Only `projects` and `currentProject` are persisted. UI state is not.
4. Test store changes with integration tests

### Adding New Types
1. Add to `types/index.ts`
2. Export the type
3. Import in files that need it using `@/types`
4. Update related components/store if needed

### Modifying Measurements
1. All measurement logic is in `lib/measurements.ts`
2. Functions are pure (no side effects)
3. Test changes with unit tests in `tests/unit/measurements.test.ts`
4. **Gotcha**: Precision is 1/16" (0.0625"). Tolerance is 0.001 for comparisons.

## Quality Requirements

### Before Committing
1. ✅ `npm run typecheck` passes
2. ✅ `npm run lint` passes (no errors, warnings are OK)
3. ✅ `npm run test:unit` passes
4. ✅ `npm run test:e2e:smoke` passes (if UI changed)
5. ✅ Storybook story added/updated (if component changed)

### CI Requirements
- All checks must pass in CI
- No broken code committed
- Tests must be deterministic (no flaky tests)

## Browser Testing

For UI changes, verify in browser:
1. Start dev server: `npm run dev`
2. Navigate to relevant page
3. Test the feature manually
4. Use Playwright UI mode for automated testing: `npm run test:e2e:ui`

## Additional Resources

- **Architecture**: See `ARCHITECTURE.md` for system design
- **Features**: See `FEATURES.md` for feature breakdown
- **PRD**: See `PRD.md` for product requirements
- **Testing**: See `tests/README.md` for testing guide
- **CI/CD**: See `CI_CD_SETUP.md` for CI/CD documentation

---

**Remember**: Update this file when you discover new patterns, gotchas, or conventions that future agents should know!
