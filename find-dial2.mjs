import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://antonyraphy.com/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  const all = [...document.querySelectorAll('*')];
  const matches = all.filter(el => {
    const txt = (el.textContent || '').trim();
    return txt.includes('MAKE CONTACT') && txt.length < 60;
  });
  return matches.map(el => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, cls: el.className.toString().slice(0,40), top: r.top + window.scrollY, text: el.textContent.trim() };
  });
});
console.log(JSON.stringify(info, null, 2));
console.log('doc height', await page.evaluate(() => document.body.scrollHeight));
await browser.close();
