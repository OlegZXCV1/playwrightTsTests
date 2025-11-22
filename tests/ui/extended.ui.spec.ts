import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Weather.com UI Extended Tests @ui', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display weather for a searched zip code', async ({ page }) => {
    await homePage.searchForLocation('90210');
    
    const cityName = page.locator('h1');
    await expect(cityName).toBeVisible();
    await expect(cityName).toContainText('Beverly Hills, CA');
  });

  test('should show "No results found" for an invalid location', async ({ page }) => {
    await homePage.searchForLocation('InvalidLocation');
    
    const noResults = page.getByText('No results found');
    await expect(noResults).toBeVisible();
  });

  test('should display the 10-day forecast for a searched city', async ({ page }) => {
    await homePage.searchForLocation('London');
    await homePage.clickTenDayForecast();

    const forecastTitle = page.locator('h1');
    await expect(forecastTitle).toBeVisible();
    await expect(forecastTitle).toContainText('10 Day Weather Forecast');
  });

  test('should display the weekend forecast for a searched city', async ({ page }) => {
    await homePage.searchForLocation('Tokyo');
    await homePage.clickWeekendForecast();

    const forecastTitle = page.locator('h1');
    await expect(forecastTitle).toBeVisible();
    await expect(forecastTitle).toContainText('Weekend Weather Forecast');
  });

  test('should display the hourly forecast for a searched city', async ({ page }) => {
    await homePage.searchForLocation('Sydney');
    await homePage.clickHourlyForecast();

    const forecastTitle = page.locator('h1');
    await expect(forecastTitle).toBeVisible();
    await expect(forecastTitle).toContainText('Hourly Weather Forecast');
  });

  test('should navigate to the Radar page', async ({ page }) => {
    await homePage.searchForLocation('Berlin');
    await homePage.clickRadar();

    const pageTitle = page.locator('h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('Weather Radar');
  });

  test('should navigate to the Video page', async ({ page }) => {
    await homePage.searchForLocation('Moscow');
    await homePage.clickVideo();
    
    const videoTitle = page.locator('h1');
    await expect(videoTitle).toBeVisible();
  });

  test('should change temperature unit to Celsius', async ({ page }) => {
    await homePage.searchForLocation('Cairo');
    await homePage.changeTemperatureUnitToCelsius();

    const temperature = page.locator('span[data-testid="TemperatureValue"]');
    await expect(temperature.first()).toContainText('°');
  });

  test('should navigate to the Maps page', async ({ page }) => {
    await homePage.clickMaps();
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('Weather Maps');
  });

  test('should navigate to the Privacy Policy page', async ({ page }) => {
    await homePage.clickPrivacyPolicy();

    const pageTitle = page.locator('h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('Privacy Policy');
  });
});
