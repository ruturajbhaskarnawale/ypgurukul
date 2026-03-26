const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.error('PAGE_ERROR:', msg.text());
    } else {
      console.log('PAGE_LOG:', msg.text());
    }
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    // wait a bit for deferred imports
    await page.waitForTimeout(2000);
  } catch (e) {
    console.error('NAV_ERROR', e);
  }

  console.log('Collected errors:', errors.length);
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();