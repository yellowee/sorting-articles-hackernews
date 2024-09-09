const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.BASE_URL)
}

(async () => {
  await sortHackerNewsArticles();
})();
