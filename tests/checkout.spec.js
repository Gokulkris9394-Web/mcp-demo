const { test, expect } = require('@playwright/test');

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file:///c:/Users/user/Desktop/QATD2/index.html');
    // Login first
    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');
    await expect(page.locator('#products-section')).toBeVisible();
  });

  test('Add Laptop and Smartphone to cart, then checkout should show success', async ({ page }) => {
    // Add Laptop
    await page.click('.add-to-cart');
    // Add Smartphone
    await page.click('.add-to-cart-typo');
    // View cart
    await page.click('#view-cart-btn');
    await expect(page.locator('#cart-section')).toBeVisible();
    // Checkout
    await page.click('#checkout-btn');
    await expect(page.locator('#success-section')).toBeVisible();
  });

  test('Attempt checkout with empty cart should show alert', async ({ page }) => {
    // Go to cart (empty)
    await page.click('#view-cart-btn');
    await expect(page.locator('#cart-section')).toBeVisible();
    // Listen for dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Your cart is empty!');
      await dialog.accept();
    });
    // Checkout
    await page.click('#checkout-btn');
    // Alert should have been handled
  });
});