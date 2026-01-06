import { test, expect } from '@playwright/test';

test.describe('Submit Deal Form', () => {
  test('submit page loads with form', async ({ page }) => {
    await page.goto('/submit');

    // Check page title
    await expect(page.getByRole('heading', { name: /Submit a Deal/i })).toBeVisible();

    // Check form fields exist
    await expect(page.getByLabel(/Business Name/i)).toBeVisible();
    await expect(page.getByLabel(/Business Address/i)).toBeVisible();
    await expect(page.getByLabel(/Category/i)).toBeVisible();
    await expect(page.getByLabel(/Deal Title/i)).toBeVisible();
    await expect(page.getByLabel(/Description/i)).toBeVisible();
    await expect(page.getByLabel(/Discount Value/i)).toBeVisible();
  });

  test('form validation shows errors for empty fields', async ({ page }) => {
    await page.goto('/submit');

    // Try to submit empty form
    await page.getByRole('button', { name: /Submit Deal/i }).click();

    // Should show validation errors (HTML5 validation)
    const businessName = page.getByLabel(/Business Name/i);
    const isInvalid = await businessName.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });

  test('form accepts valid input', async ({ page }) => {
    await page.goto('/submit');

    // Fill in form
    await page.getByLabel(/Business Name/i).fill('Test Business');
    await page.getByLabel(/Business Address/i).fill('123 Test St, Syracuse, NY');
    await page.getByLabel(/Category/i).selectOption({ index: 1 });
    await page.getByLabel(/Deal Title/i).fill('Test Deal');
    await page.getByLabel(/Description/i).fill('This is a test deal description.');
    await page.getByLabel(/Discount Value/i).fill('10%');

    // Verify fields are filled
    await expect(page.getByLabel(/Business Name/i)).toHaveValue('Test Business');
  });

  test('category dropdown has all options', async ({ page }) => {
    await page.goto('/submit');

    // Check category dropdown options
    const select = page.getByLabel(/Category/i);
    const options = select.locator('option');

    // Should have multiple category options
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(5); // At least 5 categories
  });
});
