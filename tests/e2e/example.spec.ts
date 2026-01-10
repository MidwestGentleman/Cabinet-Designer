import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('app loads successfully @smoke', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Cabinet Builder/i);
  });

  test('project list is visible @smoke', async ({ page }) => {
    await page.goto('/');
    // Look for project list or create button
    const newProjectButton = page.getByTestId('new-project-button');
    await expect(newProjectButton).toBeVisible();
  });

  test('can create a new project @smoke', async ({ page }) => {
    await page.goto('/');
    
    // Click new project button
    await page.getByTestId('new-project-button').click();
    
    // Fill in project name
    const input = page.getByTestId('project-name-input');
    await expect(input).toBeVisible();
    await input.fill('Test Project');
    
    // Click create button
    await page.getByTestId('create-project-button').click();
    
    // Verify project appears in list
    await expect(page.getByText('Test Project')).toBeVisible();
  });
});
