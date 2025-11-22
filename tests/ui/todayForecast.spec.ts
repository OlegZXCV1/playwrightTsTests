import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe("Weather.com Today's Forecast @ui", () => {
  test('should display Today\'s forecast for a searched city', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchForLocation('Paris');

    // Click on the Today's forecast link
    await page.getByRole('link', { name: 'Today' }).click();

    // Verify that the Today's forecast is displayed
    const forecastTitle = page.locator('h1');
    await expect(forecastTitle).toBeVisible();
    await expect(forecastTitle).toContainText("Today's Weather Forecast");
  });
});
