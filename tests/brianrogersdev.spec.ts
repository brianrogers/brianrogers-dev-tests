import { test, expect } from '@playwright/test';

const url = "http://0.0.0.0:4000";

test('has title', async ({ page }) => {
  await page.goto(url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Brian Rogers Developer Site/);
});

test('home link', async ({ page }) => {
    await page.goto(url);
    // Click the site title link.
    await page.getByRole('link', { name: 'BrianRogers.dev', exact: true }).click();
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*/);
    // Click the home link.
    await page.locator('#navigation').getByRole('link', { name: 'Home' }).click();
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*/);
});

test('content link', async ({ page }) => {
    await page.goto(url);
    // Click the home link.
    await page.locator('#navigation').getByRole('link', { name: 'Contact' }).click();
    // Expects the URL to contain contact.html.
    await expect(page).toHaveURL(/.*contact.html/);
});

test('youtube section', async ({ page }) => {
    await page.goto(url);
    // Confirm the YouTube banner section is on the home page
    await page.locator('div').filter({ hasText: 'Learn more on my YouTube channel Check out my YouTube channel for more software ' }).nth(3)
});

test('youtube link button', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('link', { name: 'Visit Here' }).click()
    // Expects the URL to contain YouTube channel ID.
    await expect(page).toHaveURL(/.*UCWKG2qqENk_HAyKv6hdIvpQ/);
});

test('blog article list - more than zero', async ({ page }) => {
    await page.goto(url);
    // Make sure there's at least one blog article showing
    expect(await page.locator('article').count()).toBeGreaterThan(0)
});
