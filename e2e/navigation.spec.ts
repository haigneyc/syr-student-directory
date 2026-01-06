import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('homepage loads and displays key elements', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Cuse Student Deals/);

    // Check hero section
    await expect(page.getByRole('heading', { name: /Syracuse Student Discounts/i })).toBeVisible();

    // Check search bar is present
    await expect(page.getByPlaceholder(/search/i)).toBeVisible();

    // Check categories section
    await expect(page.getByRole('heading', { name: /Browse by Category/i })).toBeVisible();

    // Check at least one category card is visible
    await expect(page.getByRole('link', { name: /Food/i }).first()).toBeVisible();
  });

  test('can navigate to category page', async ({ page }) => {
    await page.goto('/');

    // Click on Food category
    await page.getByRole('link', { name: /Food/i }).first().click();

    // Should be on category page
    await expect(page).toHaveURL(/\/categories\/food/);
    await expect(page.getByRole('heading', { name: /Food & Drink/i })).toBeVisible();
  });

  test('can navigate to deal page from category', async ({ page }) => {
    await page.goto('/categories/food');

    // Click on a deal card
    const dealLink = page.getByRole('link').filter({ hasText: /Varsity Pizza|Faegan|King David/i }).first();
    await dealLink.click();

    // Should be on deal page
    await expect(page).toHaveURL(/\/deals\//);

    // Deal page should show key elements
    await expect(page.getByRole('heading', { name: /About This Deal/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /How to Redeem/i })).toBeVisible();
  });

  test('header navigation links work', async ({ page }) => {
    await page.goto('/');

    // Test About link
    await page.getByRole('link', { name: /About/i }).click();
    await expect(page).toHaveURL(/\/about/);

    // Test Submit link
    await page.getByRole('link', { name: /Submit/i }).click();
    await expect(page).toHaveURL(/\/submit/);

    // Test logo/home link
    await page.getByRole('link', { name: /Cuse/i }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('footer links work', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check privacy link
    await page.getByRole('link', { name: /Privacy/i }).click();
    await expect(page).toHaveURL(/\/privacy/);

    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check terms link
    await page.getByRole('link', { name: /Terms/i }).click();
    await expect(page).toHaveURL(/\/terms/);
  });
});
