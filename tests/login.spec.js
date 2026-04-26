const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000/index.html');
  });

  test('Valid login with test_user and password123 should show products', async ({ page }) => {
    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');
    await expect(page.locator('#products-section')).toBeVisible();
    await expect(page.locator('#login-section')).toBeHidden();
  });

  test('Invalid login should show error message', async ({ page }) => {
    await page.fill('#username', 'wrong');
    await page.fill('#password', 'wrong');
    await page.click('#login-btn');
    await expect(page.locator('#login-error')).toBeVisible();
    await expect(page.locator('#products-section')).toBeHidden();
  });

  test('Admin login with any password should show products', async ({ page }) => {
    await page.fill('#username', 'admin');
    await page.fill('#password', 'any_password');
    await page.click('#login-btn');
    await expect(page.locator('#products-section')).toBeVisible();
    await expect(page.locator('#login-section')).toBeHidden();
  });
});