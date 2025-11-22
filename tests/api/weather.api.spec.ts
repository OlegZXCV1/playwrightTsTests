import { test, expect } from '@playwright/test';
import { ApiUtils } from '../../utils/ApiUtils';

test.describe('Weather.com API Tests @api', () => {
  test('should return weather data for a city', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.getWeatherData('London');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('London');
    expect(responseBody.weather[0].main).toBeDefined();
  });
});
