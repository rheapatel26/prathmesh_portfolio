import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://antonyraphy.com/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1000);
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 13106); });
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/dial-shots/dial-1.png' });

await page.evaluate(() => window.scrollTo(0, 13106 + 900));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/dial-shots/dial-2.png' });

await page.evaluate(() => window.scrollTo(0, 13106 + 1600));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/dial-shots/dial-3.png' });

console.log('doc height', await page.evaluate(() => document.body.scrollHeight));
await browser.close();
