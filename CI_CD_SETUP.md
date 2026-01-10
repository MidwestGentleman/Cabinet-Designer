# CI/CD Setup Guide

## Overview

This project uses GitHub Actions for continuous integration and deployment. The CI/CD pipeline runs automatically on pushes and pull requests to ensure code quality and automated testing.

## Workflows

### 1. Main CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main`, `master`, or `develop` branches
- Pull requests to `main`, `master`, or `develop` branches

**Jobs:**

#### Test Suite
Runs all tests in the correct order (fast → slow):
1. ✅ TypeScript type checking
2. ✅ ESLint code quality checks
3. ✅ Unit tests (Vitest)
4. ⚠️ Integration tests (if any exist)
5. ✅ E2E smoke tests (Playwright)

**Artifacts:**
- Playwright test reports
- Playwright traces (for debugging failed tests)

#### Build
Runs after tests pass:
- ✅ Next.js production build
- ✅ Storybook build (optional, won't fail if it errors)

**Timeout:** 15 minutes per job

### 2. PR Checks Workflow (`.github/workflows/pr-checks.yml`)

**Triggers:**
- Pull requests (opened, updated, reopened)

**Features:**
- Runs the same test suite as main CI
- Posts a comment on the PR with test results
- Validates that PRs don't break existing functionality

### 3. Nightly Tests (`.github/workflows/nightly.yml`)

**Triggers:**
- Daily at 2 AM UTC (scheduled)
- Manual trigger via GitHub Actions UI

**Jobs:**

#### Full Test Suite
- Runs all E2E tests (not just smoke tests)
- Tests across multiple browsers:
  - Chromium
  - Firefox
  - WebKit (Safari)

#### Coverage
- Generates test coverage reports
- Uploads to Codecov (if configured)

**Purpose:** Catch issues that might not appear in smoke tests and ensure cross-browser compatibility.

## Test Execution Order

The CI follows the same order as `npm run test:all`:

```bash
1. typecheck    # Fast validation
2. lint         # Code quality
3. test:unit    # Fast, isolated tests
4. test:integration  # Component interactions
5. test:e2e:smoke    # Critical user flows
```

This order ensures fast feedback - if typecheck fails, we don't waste time running tests.

## Status Badges

Add these badges to your README.md:

```markdown
![CI](https://github.com/yourusername/cabinet-builder/workflows/CI/badge.svg)
![PR Checks](https://github.com/yourusername/cabinet-builder/workflows/PR%20Checks/badge.svg)
```

Replace `yourusername/cabinet-builder` with your actual GitHub repository path.

## Local Testing

Before pushing, you can run the same checks locally:

```bash
# Run all checks (same as CI)
npm run test:all

# Or run individually
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e:smoke
```

## CI Environment

- **OS:** Ubuntu Latest
- **Node.js:** 20.x
- **Package Manager:** npm (with caching enabled)
- **Playwright:** Chromium (with dependencies)

## Caching

The workflows use:
- **npm cache:** Cached between runs for faster installs
- **Node.js setup cache:** Speeds up Node.js installation

## Artifacts

When tests fail, you can download:
- **Playwright reports:** HTML reports with screenshots and traces
- **Playwright traces:** Interactive traces for debugging
- **Coverage reports:** Code coverage data

Artifacts are retained for:
- Test reports: 30 days
- Traces: 7 days

## Debugging Failed Tests

### View Playwright Traces

1. Go to the failed workflow run
2. Download the `playwright-traces` artifact
3. Extract the zip file
4. Run: `npx playwright show-trace path/to/trace.zip`

### View Test Reports

1. Download the `playwright-report` artifact
2. Open `index.html` in a browser
3. View screenshots, videos, and test details

## Customization

### Adding New Test Types

1. Add the test script to `package.json`
2. Add a step to `.github/workflows/ci.yml`:

```yaml
- name: Run new tests
  run: npm run test:new-type
```

### Changing Test Matrix

Edit the `strategy.matrix` section in workflows to test multiple Node.js versions:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]
```

### Adding Coverage Service

To use Codecov or similar:

1. Sign up at [codecov.io](https://codecov.io)
2. Add your repository
3. The nightly workflow already includes Codecov upload
4. Add the Codecov token as a GitHub secret: `CODECOV_TOKEN`

## Troubleshooting

### Tests Pass Locally but Fail in CI

1. **Check Node.js version:** CI uses Node 20.x
2. **Check environment variables:** Some tests might need env vars
3. **Check Playwright browsers:** CI installs browsers with `--with-deps`
4. **Check timing:** Add `waitForTimeout` if tests are flaky

### CI is Too Slow

1. **Enable caching:** Already enabled for npm
2. **Run tests in parallel:** Use matrix strategy
3. **Skip unnecessary steps:** Use `continue-on-error: true` for optional steps
4. **Optimize test suite:** Move slow tests to nightly workflow

### Playwright Timeout Issues

Increase timeout in `playwright.config.ts`:

```typescript
use: {
  actionTimeout: 30000, // 30 seconds
}
```

Or in the workflow:

```yaml
- name: Run E2E tests
  run: npm run test:e2e:smoke
  timeout-minutes: 10
```

## Best Practices

1. **Keep tests fast:** Smoke tests should complete in < 5 minutes
2. **Fail fast:** Run fastest checks first (typecheck → lint → unit → e2e)
3. **Use artifacts:** Always upload test results for debugging
4. **Monitor nightly tests:** Check daily for cross-browser issues
5. **Update dependencies:** Keep GitHub Actions versions updated

## Security

- **Secrets:** Never commit API keys or tokens
- **Dependencies:** Use `npm ci` (not `npm install`) for reproducible builds
- **Permissions:** Workflows use minimal required permissions

## Next Steps

1. ✅ CI/CD is set up and ready
2. 🔄 Push to GitHub to trigger first run
3. 📊 Monitor workflow runs in the Actions tab
4. 🎯 Add more tests as the project grows
5. 📈 Set up coverage reporting (Codecov, etc.)

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Vitest CI Guide](https://vitest.dev/guide/ci.html)
