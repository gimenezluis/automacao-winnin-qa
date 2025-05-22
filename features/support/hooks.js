const { Before, After } = require('@cucumber/cucumber');
const { startBrowser, closeBrowser } = require('../../utils/browserManager');
const GePage = require('../../pages/GePage');

Before(async function () {
  const isCI = process.env.CI === 'true';
  const browserObj = await startBrowser(isCI);
  this.browser = browserObj.browser;
  this.page = browserObj.page;
  this.gePage = new GePage(this.page);
});

After(async function () {
  if (this.browser) {
    await closeBrowser();
  }
});
