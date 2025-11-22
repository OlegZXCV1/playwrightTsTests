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

  async getWeatherDataByZip(zip: string, apiKey: string = this.apiKey) {
    return await this.request.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
  }

  async getWeatherDataWithUnits(city: string, units: string, apiKey: string = this.apiKey) {
    return await this.request.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
  }

  async getWeatherDataWithLang(city: string, lang: string, apiKey: string = this.apiKey) {
    return await this.request.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${apiKey}`);
  }

  async getAirPollutionData(lat: number, lon: number, apiKey: string = this.apiKey) {
    return await this.request.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  }
}
