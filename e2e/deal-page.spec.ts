import { test, expect } from '@playwright/test';

test.describe('Deal Page', () => {
  test('deal page displays all required sections', async ({ page }) => {
    await page.goto('/deals/varsity-pizza-15-off');

    // Header with discount
    await expect(page.getByText(/15%/)).toBeVisible();
    await expect(page.getByText(/Varsity Pizza/i).first()).toBeVisible();

    // About section
    await expect(page.getByRole('heading', { name: /About This Deal/i })).toBeVisible();

    // How to redeem section
    await expect(page.getByRole('heading', { name: /How to Redeem/i })).toBeVisible();

    // Business information
    await expect(page.getByRole('heading', { name: /Business Information/i })).toBeVisible();

    // Verification badge
    await expect(page.getByText(/Verified/i)).toBeVisible();
  });

  test('breadcrumb navigation works', async ({ page }) => {
    await page.goto('/deals/varsity-pizza-15-off');

    // Click Home in breadcrumb
    await page.getByRole('navigation').getByRole('link', { name: /Home/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('category link in breadcrumb works', async ({ page }) => {
    await page.goto('/deals/varsity-pizza-15-off');

    // Click category in breadcrumb
    await page.getByRole('navigation').getByRole('link', { name: /Food/i }).click();
    await expect(page).toHaveURL(/\/categories\/food/);
  });

  test('share buttons are present', async ({ page }) => {
    await page.goto('/deals/varsity-pizza-15-off');

    // Check share section
    await expect(page.getByText(/Share this deal/i)).toBeVisible();

    // Check copy link button
    await expect(page.getByRole('button', { name: /Copy/i })).toBeVisible();
  });

  test('report issue button is present', async ({ page }) => {
    await page.goto('/deals/varsity-pizza-15-off');

    // Check report button exists
    await expect(page.getByRole('button', { name: /Report/i })).toBeVisible();
  });

  test('back to category link works', async ({ page }) => {
    await page.goto('/deals/varsity-pizza-15-off');

    // Click "Browse more" link at bottom
    await page.getByRole('link', { name: /Browse more/i }).click();
    await expect(page).toHaveURL(/\/categories\//);
  });
});
