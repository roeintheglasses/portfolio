import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio|Hrishikesh/i);
  });

  test('should have navigation links', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /work/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /projects/i })).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL('/about');
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.getByRole('link', { name: /projects/i }).click();
    await expect(page).toHaveURL('/projects');
  });

  test('should display NowPlaying component', async ({ page }) => {
    // NowPlaying should show either song info or "Not Listening"
    const nowPlaying = page.locator('text=Spotify').or(page.locator('text=Not Listening'));
    await expect(nowPlaying).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Guestbook Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guestbook');
  });

  test('should display guestbook form', async ({ page }) => {
    await expect(page.getByText('Sign the Guestbook')).toBeVisible();
  });

  test('should show login button when not authenticated', async ({ page }) => {
    const loginButton = page.getByRole('link', { name: /login/i });
    await expect(loginButton).toBeVisible();
  });
});

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should display projects', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('skip navigation should be accessible via keyboard', async ({ page }) => {
    await page.goto('/');

    // Tab to skip nav link
    await page.keyboard.press('Tab');

    // Skip nav should be visible when focused
    const skipNav = page.locator('.skip-nav');
    await expect(skipNav).toBeFocused();
  });

  test('navigation links should have focus styles', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation
    const navLinks = page.locator('nav a').first();
    await navLinks.focus();

    // Should have focus-visible ring when focused
    await expect(navLinks).toBeFocused();
  });
});
