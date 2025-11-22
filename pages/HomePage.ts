import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly locationInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locationInput = page.getByPlaceholder('Search city or zip code');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchForLocation(location: string) {
    await this.locationInput.fill(location);
    await this.searchButton.click();
  }
}
