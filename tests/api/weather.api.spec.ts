import { test, expect } from '@playwright/test';
import { ApiUtils } from '../../utils/ApiUtils';

test.describe('Weather.com API Tests @api', () => {
  test('should return weather data for a valid city', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherData('London');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('London');
    expect(responseBody.weather[0].main).toBeDefined();
  });

  test('should return 404 for a city not found', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherData('InvalidCityName');

    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('city not found');
  });

  test('should return 401 for an invalid API key', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherData('London', 'InvalidApiKey');

    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody.message).toContain('Invalid API key');
  });

  test('should return weather data for a valid set of coordinates', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    // Coordinates for London
    const response = await apiUtils.getWeatherDataByCoords(51.5074, -0.1278);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('London');
  });
});