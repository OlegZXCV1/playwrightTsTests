import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly locationInput: Locator;
  readonly searchButton: Locator;
  readonly tenDayForecastLink: Locator;
  readonly weekendForecastLink: Locator;
  readonly hourlyForecastLink: Locator;
  readonly radarLink: Locator;
  readonly videoLink: Locator;
  readonly settingsButton: Locator;
  readonly celsiusRadioButton: Locator;
  readonly mapsLink: Locator;
  readonly privacyPolicyLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locationInput = page.getByPlaceholder('Search city or zip code');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.tenDayForecastLink = page.getByRole('link', { name: '10 Day' });
    this.weekendForecastLink = page.getByRole('link', { name: 'Weekend' });
    this.hourlyForecastLink = page.getByRole('link', { name: 'Hourly' });
    this.radarLink = page.getByRole('link', { name: 'Radar' });
    this.videoLink = page.getByRole('link', { name: 'Video' });
    this.settingsButton = page.getByLabel('Settings');
    this.celsiusRadioButton = page.getByLabel('°C');
    this.mapsLink = page.getByRole('link', { name: 'Maps' });
    this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' });
  }

  async goto() {
    await this.page.goto('https://weather.com/');
  }

  async searchForLocation(location: string) {
    await this.locationInput.fill(location);
    await this.searchButton.click();
  }

  async clickTenDayForecast() {
    await this.tenDayForecastLink.click();
  }

  async clickWeekendForecast() {
    await this.weekendForecastLink.click();
  }

  async clickHourlyForecast() {
    await this.hourlyForecastLink.click();
  }

  async clickRadar() {
    await this.radarLink.click();
  }

  async clickVideo() {
    await this.videoLink.click();
  }

  async changeTemperatureUnitToCelsius() {
    await this.settingsButton.click();
    await this.celsiusRadioButton.click();
  }

  async clickMaps() {
    await this.mapsLink.click();
  }

  async clickPrivacyPolicy() {
    await this.privacyPolicyLink.click();
  }
}
