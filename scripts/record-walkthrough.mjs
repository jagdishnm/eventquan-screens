// Records the six-screen walkthrough as JPEG frames via CDP screencast.
// Usage: node record.mjs <appUrl> <outDir>
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const [base, out] = process.argv.slice(2)
fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(out, { recursive: true })

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--force-device-scale-factor=2'],
})
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

// Warm fonts and images before capture starts.
for (const r of ['/welcome', '/welcome/campus', '/', '/events', '/places/kyle-field', '/gameday', '/quick-event']) {
  await page.goto(base + r, { waitUntil: 'networkidle' })
}
await page.goto(base + '/welcome', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

const cdp = await ctx.newCDPSession(page)
const frames = []
cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
  const f = path.join(out, `f${String(frames.length).padStart(5, '0')}.jpg`)
  fs.writeFileSync(f, Buffer.from(data, 'base64'))
  frames.push({ file: path.basename(f), t: metadata.timestamp })
  await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
})
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 786, maxHeight: 1704, everyNthFrame: 1 })

const wait = (ms) => page.waitForTimeout(ms)
const smoothScroll = (sel, top) =>
  page.evaluate(
    ([s, t]) => document.querySelector(s)?.scrollBy({ top: t, behavior: 'smooth' }),
    [sel, top],
  )

// 1 · Sign in: type the school email, watch it get recognised, continue.
await wait(900)
const email = page.locator('input')
await email.fill('')
await wait(300)
await email.pressSequentially('jcarter@tamu.edu', { delay: 70 })
await wait(900)
await page.getByRole('button', { name: /Find my campus/ }).click()
await wait(2600)

// 2 · Skin applied → Home.
await page.getByRole('link', { name: /Sign in with NetID/ }).click()
await wait(1800)
await page.evaluate(() => {
  const row = [...document.querySelectorAll('div')].find((d) => d.className.includes('snap-x'))
  row?.scrollBy({ left: 226, behavior: 'smooth' })
})
await wait(1300)
await page.evaluate(() => {
  const row = [...document.querySelectorAll('div')].find((d) => d.className.includes('snap-x'))
  row?.scrollBy({ left: -226, behavior: 'smooth' })
})
await wait(900)

// 3 · EventFinder.
await page.getByRole('navigation').getByRole('link', { name: 'Events', exact: true }).click()
await wait(1700)
await smoothScroll('.overflow-y-auto', 320)
await wait(1300)
await smoothScroll('.overflow-y-auto', -320)
await wait(900)

// 4 · Kyle Field node.
await page.getByRole('link', { name: /View on map/ }).click()
await wait(2200)
await smoothScroll('.overflow-y-auto', 300)
await wait(1500)
await smoothScroll('.overflow-y-auto', -300)
await wait(700)

// 5 · Game day.
await page.locator('a[href="/gameday"]').first().click()
await wait(2600)
await smoothScroll('.overflow-y-auto', 260)
await wait(1400)

// 6 · Quick Event: type it like a text and watch it become an event.
await page.getByRole('navigation').getByRole('link', { name: 'Home', exact: true }).click()
await wait(900)
await page.locator('a[href="/quick-event"]').first().click()
await wait(900)
const box = page.locator('textarea')
await box.click()
await page.keyboard.press('Meta+A')
await page.keyboard.press('Backspace')
await wait(500)
await box.pressSequentially('Post-game bowling at Grand Station tonight 9:30. Loser buys Whataburger', { delay: 55 })
await wait(2400)

await cdp.send('Page.stopScreencast')
fs.writeFileSync(path.join(out, 'frames.json'), JSON.stringify(frames))
console.log(`${frames.length} frames, ${(frames.at(-1).t - frames[0].t).toFixed(1)}s`)
await browser.close()
