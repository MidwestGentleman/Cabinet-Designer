# Testing Framework

This project uses a comprehensive testing strategy designed for AI agent workflows (Ralph/Amp). The testing suite ensures UI changes are properly validated at multiple levels.

## Test Structure

```
tests/
├── unit/              # Unit tests (Vitest)
├── integration/       # Integration tests (Vitest)
├── e2e/              # End-to-end tests (Playwright)
├── fixtures/         # Test data fixtures
├── mocks/            # MSW handlers for API mocking
└── utils/            # Test utilities and helpers
```

## Test Layers

### 1. Unit Tests (Vitest)
Fast, isolated tests for utilities and pure functions.

**Run:**
```bash
npm run test:unit
```

**Example:** `tests/unit/measurements.test.ts`

### 2. Integration Tests (Vitest)
Tests for component interactions, hooks, and state management.

**Run:**
```bash
npm run test:integration
```

### 3. Component Tests (Storybook)
Visual regression and component behavior testing.

**Run:**
```bash
npm run storybook        # Start Storybook
npm run test:storybook   # Run Storybook tests
```

**Example:** `components/ui/button.stories.tsx`

### 4. E2E Tests (Playwright)
End-to-end user flow tests.

**Run:**
```bash
npm run test:e2e         # All E2E tests
npm run test:e2e:smoke   # Smoke tests only (fast, for CI)
npm run test:e2e:ui      # Interactive UI mode
```

**Example:** `tests/e2e/example.spec.ts`

## CI Test Order

Tests run in this order (fast → slow):

1. `npm run typecheck` - TypeScript validation
2. `npm run lint` - Code quality
3. `npm run test:unit` - Unit tests
4. `npm run test:integration` - Integration tests
5. `npm run test:storybook` - Component tests
6. `npm run test:e2e:smoke` - Smoke E2E tests
7. (Nightly) Full E2E + visual regression

**Run all tests:**
```bash
npm run test:all
```

## Stable Selectors

For reliable E2E tests, use `data-testid` attributes on key interactive elements:

```tsx
<Button data-testid="new-project-button">New Project</Button>
```

**Rule:** Don't rely on CSS classes or text content for selectors in E2E tests.

## Writing Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { decimalToFraction } from '@/lib/measurements';

describe('measurements', () => {
  it('converts decimal to fraction', () => {
    expect(decimalToFraction(24.5)).toBe('24 1/2');
  });
});
```

### Component Test Example
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';

test('creates project', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('new-project-button').click();
  await page.getByTestId('project-name-input').fill('Test');
  await page.getByTestId('create-project-button').click();
  await expect(page.getByText('Test')).toBeVisible();
});
```

### Storybook Story Example
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Button' },
};
```

## Coverage

View coverage report:
```bash
npm run test:coverage
```

Coverage goals:
- Utilities: 90%+
- Core algorithms: 80%+
- Critical flows: 100%

## Accessibility Testing

Accessibility checks run automatically in:
- Storybook (via `@storybook/addon-a11y`)
- E2E tests (via Playwright's built-in a11y checks)

## Visual Regression

Visual regression testing is available via:
- **Chromatic** (recommended) - Integrated with Storybook
- **Playwright screenshots** - Baseline comparisons

## For AI Agents (Ralph/Amp)

When making UI changes, agents must:

1. ✅ Add/update at least one Storybook story
2. ✅ Add/update at least one Playwright test if user flow changed
3. ✅ Update visual baselines (Chromatic or Playwright snapshots)
4. ✅ Ensure zero flaky tests

**Definition of Done:**
- All tests pass
- Visual baselines updated
- No new flaky tests
- Coverage maintained

## Debugging

### Vitest UI
```bash
npm run test:ui
```

### Playwright UI
```bash
npm run test:e2e:ui
```

### View Playwright Traces
After a failed test, traces are saved to `test-results/`. Open with:
```bash
npx playwright show-trace test-results/path-to-trace.zip
```

## Resources

- [Vitest Docs](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Playwright Docs](https://playwright.dev/)
- [Storybook Docs](https://storybook.js.org/)
