import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://antonyraphy.com/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1000);
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });

// find the white section (framer-17szo44 from earlier research) and its bounds
const info = await page.evaluate(() => {
  const el = document.querySelector('.framer-17szo44');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: r.height };
});
console.log('white section', JSON.stringify(info));

const end = info.top + info.height;
for (const dy of [-600, -400, -200, -100, -50, 0, 50, 100, 200, 400]) {
  await page.evaluate((yy) => window.scrollTo(0, yy), end + dy);
  await page.waitForTimeout(150);
  const styles = await page.evaluate(() => {
    const el = document.querySelector('.framer-17szo44');
    const main = document.querySelector('main');
    const cs = getComputedStyle(el);
    const csMain = getComputedStyle(main);
    return {
      whiteOpacity: cs.opacity,
      whiteBg: cs.backgroundColor,
      whiteTransform: cs.transform,
      whiteFilter: cs.filter,
      mainBg: csMain.backgroundColor,
      bodyBg: getComputedStyle(document.body).backgroundColor,
    };
  });
  console.log('dy', dy, JSON.stringify(styles));
}
await browser.close();
