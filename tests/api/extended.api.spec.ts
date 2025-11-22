import { test, expect } from '@playwright/test';
import { ApiUtils } from '../../utils/ApiUtils';

test.describe('Weather.com API Extended Tests @api', () => {
  test('should return weather data for a valid zip code', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherDataByZip('94040,us');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Mountain View');
  });

  test('should return 404 for an invalid zip code', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherDataByZip('00000,us');

    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('city not found');
  });

  test('should return weather data in metric units (Celsius)', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherDataWithUnits('London', 'metric');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    // Temperature in Celsius should be less than temperature in Kelvin (default)
    expect(responseBody.main.temp).toBeLessThan(273);
  });

  test('should return weather data in imperial units (Fahrenheit)', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherDataWithUnits('London', 'imperial');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    // Temperature in Fahrenheit for London should be less than 100
    expect(responseBody.main.temp).toBeLessThan(100);
  });

  test('should return weather data with Spanish language translation', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherDataWithLang('Madrid', 'es');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.weather[0].description).toBe('algo de nubes');
  });

  test('should check for rate limit headers in the response', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherData('London');

    expect(response.status()).toBe(200);
    // Check for the presence of rate limit headers
    expect(response.headers()['x-ratelimit-limit']).toBeDefined();
    expect(response.headers()['x-ratelimit-remaining']).toBeDefined();
    expect(response.headers()['x-ratelimit-reset']).toBeDefined();
  });

  test('should contain essential weather fields for a valid city', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherData('Tokyo');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('coord');
    expect(responseBody).toHaveProperty('weather');
    expect(responseBody).toHaveProperty('main');
    expect(responseBody).toHaveProperty('wind');
    expect(responseBody).toHaveProperty('clouds');
    expect(responseBody).toHaveProperty('sys');
  });

  test('should have correct data types for key fields', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherData('Berlin');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(typeof responseBody.cod).toBe('number');
    expect(typeof responseBody.name).toBe('string');
    expect(typeof response.json()).toBe('object');
    expect(Array.isArray(responseBody.weather)).toBe(true);
  });

  test('should return weather data for valid coordinates (Sydney)', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    // Coordinates for Sydney
    const response = await apiUtils.getWeatherDataByCoords(-33.8688, 151.2093);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Sydney');
  });

  test('should return air pollution data for a given set of coordinates', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    // Coordinates for London
    const response = await apiUtils.getAirPollutionData(51.5074, -0.1278);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('coord');
    expect(responseBody).toHaveProperty('list');
    expect(responseBody.list[0]).toHaveProperty('main');
    expect(responseBody.list[0]).toHaveProperty('components');
  });
});
