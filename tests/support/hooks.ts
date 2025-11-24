import { Before, After, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { ICustomWorld } from './custom-world';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function (this: ICustomWorld) {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
});

After(async function (this: ICustomWorld) {
  await this.page!.close();
  await context.close();
  await browser.close();
});
