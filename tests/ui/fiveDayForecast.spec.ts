import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Weather.com 5-Day Forecast @ui', () => {
  test('should display the 5-day forecast for a searched city', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchForLocation('London');

    // Click on the 5-day forecast link
    await page.getByRole('link', { name: '5 Day' }).click();

    // Verify that the 5-day forecast is displayed
    const forecastTitle = page.locator('h1');
    await expect(forecastTitle).toBeVisible();
    await expect(forecastTitle).toContainText('5 Day Weather Forecast');
  });
});
