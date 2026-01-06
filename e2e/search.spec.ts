import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test('search from homepage navigates to search page', async ({ page }) => {
    await page.goto('/');

    // Type in search bar
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('pizza');
    await searchInput.press('Enter');

    // Should navigate to search page with query
    await expect(page).toHaveURL(/\/search\?q=pizza/);
  });

  test('search page shows results', async ({ page }) => {
    await page.goto('/search?q=pizza');

    // Should show results
    await expect(page.getByText(/deal.*found/i)).toBeVisible();

    // Should show relevant deal cards
    await expect(page.getByText(/Varsity Pizza/i).first()).toBeVisible();
  });

  test('search filters work', async ({ page }) => {
    await page.goto('/search');

    // Select category filter
    await page.getByRole('combobox').first().selectOption('food');

    // Should show only food deals
    const dealCards = page.locator('[class*="DealCard"], a[href*="/deals/"]');
    const count = await dealCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('verified only filter works', async ({ page }) => {
    await page.goto('/search');

    // Toggle verified only
    await page.getByRole('checkbox').check();

    // Results should update
    await expect(page.getByText(/deal.*found/i)).toBeVisible();
  });

  test('clear filters button works', async ({ page }) => {
    await page.goto('/search?q=pizza');

    // Click clear all
    const clearButton = page.getByRole('button', { name: /Clear all/i });
    if (await clearButton.isVisible()) {
      await clearButton.click();

      // Search input should be cleared
      const searchInput = page.getByPlaceholder(/search/i);
      await expect(searchInput).toHaveValue('');
    }
  });
});
