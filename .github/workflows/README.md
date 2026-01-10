# GitHub Actions Workflows

This directory contains CI/CD workflows for the Cabinet Builder project.

## Workflows

- **`ci.yml`** - Main continuous integration workflow
  - Runs on push and pull requests
  - Executes test suite and builds the application
  
- **`pr-checks.yml`** - Pull request validation
  - Runs on PR events
  - Validates code quality and posts results as comments
  
- **`nightly.yml`** - Extended testing suite
  - Runs daily at 2 AM UTC
  - Full E2E test suite across multiple browsers
  - Coverage reporting

## Workflow Status

View workflow status in the GitHub Actions tab or use the badges in the main README.

## Local Testing

Run the same checks locally before pushing:

```bash
npm run test:all
```
