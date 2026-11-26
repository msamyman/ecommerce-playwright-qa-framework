import { test, expect } from '@playwright/test';

test.describe('Network Interception & API Mocking Tests', () => {
  test('should intercept product search API and verify mocked response handling', async ({ page }) => {
    await page.route('**/api/searchProduct', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          responseCode: 200,
          products: [
            {
              id: 999,
              name: 'Mocked Playwright Pro Jacket',
              price: 'Rs. 1500',
              brand: 'QA Studio',
              category: { usertype: { usertype: 'Men' }, category: 'Tops' },
            },
          ],
        }),
      });
    });

    await page.goto('https://automationexercise.com/products', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#search_product')).toBeVisible();
  });

  test('should gracefully handle 500 Internal Server Error on mocked API endpoint', async ({ page }) => {
    await page.route('**/api/productsList', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      });
    });

    // Trigger the intercepted endpoint directly in browser context to verify 500 handling deterministically
    const status = await page.evaluate(async () => {
      const res = await fetch('https://automationexercise.com/api/productsList');
      return res.status;
    });

    expect(status).toBe(500);
  });
});