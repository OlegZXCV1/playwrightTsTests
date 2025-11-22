import { APIRequestContext } from '@playwright/test';

export class ApiUtils {
  readonly request: APIRequestContext;
  readonly apiKey: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiKey = process.env.API_KEY || '';
  }

  async getWeatherData(city: string, apiKey: string = this.apiKey) {
    return await this.request.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  }

  async getWeatherDataByCoords(lat: number, lon: number, apiKey: string = this.apiKey) {
    return await this.request.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  }
}
