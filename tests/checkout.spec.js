const { test, expect } = require('@playwright/test');

test.describe('Checkout Tests', () => {
  test('Add items to cart and checkout', async ({ page }) => {
    await page.goto('file:///path/to/index.html');
    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-button');

    await page.click('.add-to-cart'); // Add Laptop
    await page.click('.add-to-cart-typo'); // Add Smartphone
    await page.click('#checkout-button');

    await expect(page.locator('.success-screen')).toBeVisible();
  });

  test('Attempt checkout with empty cart', async ({ page }) => {
    await page.goto('file:///path/to/index.html');
    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-button');

    await page.click('#checkout-button');

    await expect(page.locator('.alert-dialog')).toHaveText('Your cart is empty!');
  });
});