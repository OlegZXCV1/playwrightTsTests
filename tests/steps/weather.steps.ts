import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

Given('I am on the weather website', async function (this: ICustomWorld) {
  await this.page!.goto('https://www.weather.com/');
});

When('I search for {string}', async function (this: ICustomWorld, city: string) {
  await this.page!.locator('#LocationSearch_input').fill(city);
});

Then('I should see the weather forecast for {string}', async function (this: ICustomWorld, city: string) {
  const title = await this.page!.title();
  expect(title).toContain(city);
});
