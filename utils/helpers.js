async function validateMinElements(locator, expectedMin, message) {
  const count = await locator.count();
  if (count < expectedMin) {
    throw new Error(`${message}. Esperado no mínimo ${expectedMin}, mas encontrou ${count}`);
  }
}

async function scrollToLoadMore(page, targetCount, selector, maxScrolls = 10) {
  let currentCount = await page.locator(selector).count();
  let scrolls = 0;

  while (currentCount < targetCount && scrolls < maxScrolls) {
    await page.mouse.wheel(0, 1500); // scroll para baixo
    await page.waitForTimeout(1000); // espera um pouco pra carregar
    currentCount = await page.locator(selector).count();
    scrolls++;
  }

  return currentCount;
}

module.exports = {
  validateMinElements, 
  scrollToLoadMore
};
