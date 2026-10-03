const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`PAGE LOG [${msg.type()}]:`, msg.text());
  });
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  try {
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0', timeout: 5000 });
  } catch(e) {
    console.log('Navigation ended with:', e.message);
  }

  await browser.close();
})();
