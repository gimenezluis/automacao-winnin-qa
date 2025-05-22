const { Before, After } = require('@cucumber/cucumber');
const { startBrowser, closeBrowser } = require('../../utils/browserManager');
const GePage = require('../../pages/GePage');

Before(async function () {
  const browserObj = await startBrowser(false); // false = navegador visível
  this.browser = browserObj.browser;
  this.page = browserObj.page;
  this.gePage = new GePage(this.page);
});

After(async function () {
  if (this.browser) {
    await closeBrowser();
  }
});
