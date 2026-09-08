import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://antonyraphy.com/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  const all = [...document.querySelectorAll('*')];
  const match = all.find(el => (el.textContent || '').includes('DIAL') && (el.textContent || '').includes('MAKE CONTACT') && el.children.length < 3);
  if (!match) return null;
  const r = match.getBoundingClientRect();
  return { top: r.top + window.scrollY, text: match.textContent };
});
console.log('dial section position:', JSON.stringify(info));
console.log('doc height', await page.evaluate(() => document.body.scrollHeight));
await browser.close();
