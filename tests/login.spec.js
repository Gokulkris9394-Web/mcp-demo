const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test('Valid login with username and password', async ({ page }) => {
    await page.goto('file:///path/to/index.html');
    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-button');

    await expect(page.locator('.products')).toBeVisible();
  });

  test('Invalid login with wrong credentials', async ({ page }) => {
    await page.goto('file:///path/to/index.html');
    await page.fill('#username', 'wrong_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('Admin login with any password (intentional bug)', async ({ page }) => {
    await page.goto('file:///path/to/index.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'any_password');
    await page.click('#login-button');

    await expect(page.locator('.products')).toBeVisible();
  });
});