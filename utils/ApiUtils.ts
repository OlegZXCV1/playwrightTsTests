import { APIRequestContext } from '@playwright/test';

export class ApiUtils {
  readonly request: APIRequestContext;
  readonly apiKey: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiKey = process.env.API_KEY || '';
  }

  async getWeatherData(city: string) {
    return await this.request.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`);
  }
}
