import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Weather.com UI Tests @ui', () => {
  test('should display weather for a searched city', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchForLocation('New York');
    
    const cityName = page.locator('h1');
    await expect(cityName).toBeVisible();
    await expect(cityName).toHaveText('New York, NY');
  });
});
