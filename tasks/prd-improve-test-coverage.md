# PRD: Improve Test Coverage

## Introduction

Improve test coverage for the Cabinet Builder application to achieve 80%+ line coverage. This will focus on critical user paths (Zustand store, form validation, project management) and all UI components, using both unit and integration tests to ensure code quality and enable confident refactoring for future features.

## Goals

- Achieve 80%+ line coverage across the codebase
- Test all Zustand store actions and state management
- Test all UI components (Input, Select, Card, Label)
- Test form validation logic (Zod schemas)
- Create integration tests for critical workflows
- Establish test utilities and fixtures for maintainability
- Enable coverage reporting and tracking

## User Stories

### US-001: Set up test utilities and custom render wrapper
**Description:** As a developer, I need enhanced test utilities so that I can easily test components that depend on Zustand store.

**Acceptance Criteria:**
- [ ] Create custom render function that wraps components with store provider
- [ ] Add helper to create isolated store instances for each test
- [ ] Add helper to set initial store state for tests
- [ ] Export utilities from `tests/utils/test-utils.tsx`
- [ ] Document usage in `tests/README.md`
- [ ] Typecheck passes

### US-002: Create comprehensive test fixtures
**Description:** As a developer, I need reusable test fixtures so that tests have consistent, realistic data.

**Acceptance Criteria:**
- [ ] Enhance `tests/fixtures/projects.ts` with additional fixtures
- [ ] Add fixture for project with multiple units (cabinet and drawer mix)
- [ ] Add fixture for project with edge case dimensions
- [ ] Add fixture for invalid project data (for error testing)
- [ ] Add fixture for form validation test data
- [ ] Export all fixtures with TypeScript types
- [ ] Typecheck passes

### US-003: Test Zustand store - Project management actions
**Description:** As a developer, I need tests for project management actions so that the core business logic is verified.

**Acceptance Criteria:**
- [ ] Create `tests/unit/store/project-actions.test.ts`
- [ ] Test `createProject()` - creates with correct defaults, generates unique ID, sets as current
- [ ] Test `loadProject()` - loads valid project, handles invalid ID gracefully
- [ ] Test `updateProject()` - updates current project and projects array atomically
- [ ] Test `deleteProject()` - removes project, handles deleting current vs non-current project
- [ ] Test `saveProject()` - updates timestamp when current project exists
- [ ] Test edge case: operations when no current project exists
- [ ] Verify localStorage persistence using mock
- [ ] Typecheck passes
- [ ] Tests pass

### US-004: Test Zustand store - Unit management actions
**Description:** As a developer, I need tests for unit management actions so that cabinet/drawer operations are verified.

**Acceptance Criteria:**
- [ ] Create `tests/unit/store/unit-actions.test.ts`
- [ ] Test `addUnit()` - generates unique ID, adds to current project, requires current project
- [ ] Test `updateUnit()` - updates correct unit by ID, handles non-existent unit
- [ ] Test `removeUnit()` - removes unit by ID, handles non-existent unit
- [ ] Test unit addition with both cabinet and drawer types
- [ ] Test position calculation for multiple units
- [ ] Test edge cases: empty units array, duplicate IDs
- [ ] Typecheck passes
- [ ] Tests pass

### US-005: Test Zustand store - UI state actions
**Description:** As a developer, I need tests for UI state management so that view toggles and selections work correctly.

**Acceptance Criteria:**
- [ ] Create `tests/unit/store/ui-actions.test.ts`
- [ ] Test `setView()` - switches between design/cutlist/export views
- [ ] Test `toggleMeasurements()` - toggles boolean state correctly
- [ ] Test `toggleGrid()` - toggles boolean state correctly
- [ ] Test `selectUnit()` - sets selected unit ID, handles null
- [ ] Verify UI state is NOT persisted to localStorage
- [ ] Typecheck passes
- [ ] Tests pass

### US-006: Test project page form validation schemas
**Description:** As a developer, I need tests for Zod validation schemas so that form validation logic is verified independently.

**Acceptance Criteria:**
- [ ] Create `tests/unit/validation/unit-schema.test.ts`
- [ ] Extract Zod schemas from project page to `lib/validation.ts` for testability
- [ ] Test cabinet schema - validates positive dimensions, shelf count range (0-12), requires integer shelves
- [ ] Test drawer schema - validates positive dimensions, drawer count range (1-12), requires at least one drawer
- [ ] Test rejection of negative/zero dimensions
- [ ] Test edge cases: decimal shelf/drawer counts, very large numbers
- [ ] Test error messages are correct and helpful
- [ ] Typecheck passes
- [ ] Tests pass

### US-007: Test Input component
**Description:** As a developer, I need tests for the Input component so that form inputs are reliable.

**Acceptance Criteria:**
- [ ] Create `tests/unit/components/input.test.tsx`
- [ ] Test renders with default props
- [ ] Test handles value changes via onChange
- [ ] Test different input types (text, number, file)
- [ ] Test disabled state prevents interaction
- [ ] Test applies custom className
- [ ] Test placeholder text displays correctly
- [ ] Typecheck passes
- [ ] Tests pass

### US-008: Test Select component
**Description:** As a developer, I need tests for the Select component so that dropdowns work correctly.

**Acceptance Criteria:**
- [ ] Create `tests/unit/components/select.test.tsx`
- [ ] Test renders with options correctly
- [ ] Test handles selection changes via onChange
- [ ] Test displays selected value
- [ ] Test disabled state prevents interaction
- [ ] Test applies custom className
- [ ] Test with different option values and labels
- [ ] Typecheck passes
- [ ] Tests pass

### US-009: Test Card component and subcomponents
**Description:** As a developer, I need tests for Card components so that layout components are verified.

**Acceptance Criteria:**
- [ ] Create `tests/unit/components/card.test.tsx`
- [ ] Test Card renders children correctly
- [ ] Test CardHeader, CardTitle, CardDescription render and compose correctly
- [ ] Test CardContent renders children
- [ ] Test CardFooter renders children
- [ ] Test all subcomponents can be used together
- [ ] Test custom classNames apply correctly
- [ ] Typecheck passes
- [ ] Tests pass

### US-010: Test Label component
**Description:** As a developer, I need tests for the Label component so that form labels work correctly.

**Acceptance Criteria:**
- [ ] Create `tests/unit/components/label.test.tsx`
- [ ] Test renders with text content
- [ ] Test associates with form control via htmlFor
- [ ] Test applies custom className
- [ ] Test peer-disabled state styling (visual regression or class check)
- [ ] Typecheck passes
- [ ] Tests pass

### US-011: Integration test - Project creation and loading workflow
**Description:** As a developer, I need integration tests for project workflows so that store + UI work together correctly.

**Acceptance Criteria:**
- [ ] Create `tests/integration/project-workflow.test.tsx`
- [ ] Test complete flow: render home page → create project → verify in project list
- [ ] Test project loads into currentProject when selected
- [ ] Test project persists to localStorage and reloads on component remount
- [ ] Test deleting project removes from list and localStorage
- [ ] Test edge case: deleting currently loaded project
- [ ] Verify store state consistency throughout workflow
- [ ] Typecheck passes
- [ ] Tests pass

### US-012: Integration test - Cabinet configuration form
**Description:** As a developer, I need integration tests for the cabinet form so that form validation + store integration is verified.

**Acceptance Criteria:**
- [ ] Create `tests/integration/cabinet-form.test.tsx`
- [ ] Test form renders with default values
- [ ] Test form submission with valid data adds unit to store
- [ ] Test form shows validation errors for invalid dimensions
- [ ] Test form shows validation errors for invalid shelf/drawer counts
- [ ] Test errors clear when field is corrected
- [ ] Test switching between cabinet and drawer type shows correct fields
- [ ] Test reset button restores default values
- [ ] Typecheck passes
- [ ] Tests pass

### US-013: Integration test - Unit addition and management
**Description:** As a developer, I need integration tests for unit management so that adding/removing units works end-to-end.

**Acceptance Criteria:**
- [ ] Create `tests/integration/unit-management.test.tsx`
- [ ] Test adding multiple units to a project
- [ ] Test units display correctly in configured units list
- [ ] Test position calculation for sequentially added units
- [ ] Test adding both cabinet and drawer types to same project
- [ ] Test unit count updates correctly in UI
- [ ] Verify store state matches UI after all operations
- [ ] Typecheck passes
- [ ] Tests pass

### US-014: Configure coverage reporting and verify 80% threshold
**Description:** As a developer, I need coverage reporting configured so that test coverage can be tracked.

**Acceptance Criteria:**
- [ ] Update `vitest.config.ts` with coverage thresholds (80% lines, 75% branches)
- [ ] Configure coverage to exclude: stories, test files, config files, types
- [ ] Add coverage reporter: text, html, json
- [ ] Run `npm run test:coverage` and verify coverage meets thresholds
- [ ] Document coverage commands in `tests/README.md`
- [ ] Add coverage report to `.gitignore`
- [ ] Generate coverage badge or summary for documentation
- [ ] Typecheck passes
- [ ] Tests pass

## Functional Requirements

- FR-1: All Zustand store actions must have unit tests with 100% coverage
- FR-2: All UI components (Button, Input, Select, Card, Label) must have unit tests
- FR-3: Form validation schemas must be tested independently from components
- FR-4: Integration tests must verify store + component interactions for critical workflows
- FR-5: Test utilities must support isolated store instances for each test
- FR-6: Test fixtures must provide realistic data for all test scenarios
- FR-7: Coverage reporting must show line, branch, and function coverage
- FR-8: Overall line coverage must reach 80% or higher
- FR-9: All tests must run successfully in CI environment
- FR-10: Test files must follow consistent naming: `*.test.ts` or `*.test.tsx`

## Non-Goals (Out of Scope)

- E2E test expansion (existing smoke tests are sufficient for now)
- Performance testing or load testing
- Visual regression testing or screenshot comparisons
- Testing Storybook stories (covered by Storybook itself)
- Testing Next.js framework code or third-party libraries
- Mocking external APIs (no external APIs exist yet)
- Testing 3D visualization components (not yet implemented)

## Technical Considerations

- Extract Zod schemas from components to `lib/validation.ts` for independent testing
- Use Vitest's `createStore` or similar to get fresh store instances per test
- Mock localStorage for store persistence tests
- Use `@testing-library/react` for component tests
- Use `@testing-library/user-event` for user interaction simulation
- Configure coverage thresholds in `vitest.config.ts`
- Ensure tests are deterministic (no flaky tests)
- Keep test execution time under 5 seconds for the full suite

## Success Metrics

- Line coverage reaches 80% or higher
- Branch coverage reaches 75% or higher
- All tests pass in CI without failures
- Test suite executes in under 5 seconds
- Zero flaky tests (100% consistent pass rate)
- Test utilities reduce boilerplate code in test files
- Coverage report generates successfully on each test run

## Open Questions

- Should we add mutation testing (e.g., Stryker) to verify test quality?
- Should coverage thresholds be enforced in CI to prevent regressions?
- Do we need property-based testing for measurement conversion functions?
