const { chromium } = require('playwright');

let browser, context, page;

async function startBrowser(headless = process.env.CI === 'true') {
  browser = await chromium.launch({ headless });
  context = await browser.newContext();
  page = await context.newPage();
  return { browser, context, page };
}

async function closeBrowser() {
  if (browser) await browser.close();
}

module.exports = {
  startBrowser,
  closeBrowser
};
