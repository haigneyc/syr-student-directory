import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Experience', () => {
  test.use({ ...devices['iPhone 13'] });

  test('homepage is responsive on mobile', async ({ page }) => {
    await page.goto('/');

    // Check hero section is visible
    await expect(page.getByRole('heading', { name: /Syracuse Student Discounts/i })).toBeVisible();

    // Search bar should be visible
    await expect(page.getByPlaceholder(/search/i)).toBeVisible();

    // Categories should be visible
    await expect(page.getByText(/Food/i).first()).toBeVisible();
  });

  test('mobile header has hamburger menu or compact nav', async ({ page }) => {
    await page.goto('/');

    // The header should be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Logo should still be visible
    await expect(page.getByText(/Cuse/i).first()).toBeVisible();
  });

  test('deal cards are mobile-friendly', async ({ page }) => {
    await page.goto('/categories/food');

    // Deal cards should be visible and take full width on mobile
    const dealCard = page.locator('a[href*="/deals/"]').first();
    await expect(dealCard).toBeVisible();

    // Check deal card contains expected content
    await expect(dealCard.getByText(/%|Off|\$/i).first()).toBeVisible();
  });

  test('deal page is readable on mobile', async ({ page }) => {
    await page.goto('/deals/varsity-pizza-15-off');

    // Key sections should be visible
    await expect(page.getByText(/15%/)).toBeVisible();
    await expect(page.getByRole('heading', { name: /About This Deal/i })).toBeVisible();

    // Business info should be visible
    await expect(page.getByRole('heading', { name: /Business Information/i })).toBeVisible();
  });

  test('search page works on mobile', async ({ page }) => {
    await page.goto('/search');

    // Filters sidebar should be accessible
    await expect(page.getByText(/Filters/i)).toBeVisible();

    // Search input should be usable
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('pizza');

    // Results should show
    await expect(page.getByText(/deal.*found/i)).toBeVisible();
  });

  test('footer is accessible on mobile', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Footer links should be visible
    await expect(page.getByRole('link', { name: /Privacy/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Terms/i })).toBeVisible();
  });
});
