// Captures UI Library thumbnails from each resource's real website with headless Brave/Chrome over CDP.
// Usage: node scripts/capture-ui-thumbs.mjs [id ...]   (needs ffmpeg + ImageMagick; dev server running for Stageshow)
// Stills render best in software mode; motion loops need the GPU for real frame rates:
//   ONLY=still node scripts/capture-ui-thumbs.mjs && GPU=1 ONLY=video node scripts/capture-ui-thumbs.mjs
// Output: public/ui-library/directory/<id>.mp4 + <id>-poster.webp (the site's own hero motion, a cursor pass, then a scroll),
// and <id>.webp (tall still, fallback for sites that block headless browsers).
import {spawn, execFileSync} from 'node:child_process'
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

const browser = process.env.BROWSER || '/opt/brave.com/brave/brave'
const out = 'public/ui-library/directory', notes = join(tmpdir(), 'ui-thumb-notes')
const sites = {
  smoothui: 'https://smoothui.dev/', boardui: 'https://www.boardui.com/', vengeance: 'https://www.vengenceui.com/',
  animate: 'https://animate-ui.com/', uiverse: 'https://uiverse.io/', forge: 'https://forgeui.in/', uilora: 'https://www.uilora.com/',
  '21st': 'https://21st.dev/', reactbits: 'https://reactbits.dev/', magicui: 'https://magicui.design/', threeui: 'https://threeui.com/',
  mobbin: 'https://mobbin.com/', mesh3d: 'https://mesh3d.gallery/', recent: 'https://recent.design/', collectui: 'https://collectui.com/',
  awwwards: 'https://www.awwwards.com/', stageshow: 'http://localhost:5173/vendor/stageshow/playground/index.html?example=hero-demo',
}
// uiverse.io blocks headless browsers (Cloudflare), so it keeps a still from a normal browser session.
const motion = new Set(Object.keys(sites).filter(id => id !== 'uiverse'))
const W = 1440, H = 900, SLICES = 4

const sleep = ms => new Promise(r => setTimeout(r, ms))
mkdirSync(out, {recursive: true}); mkdirSync(notes, {recursive: true})
const profile = mkdtempSync(join(tmpdir(), 'ui-thumb-profile-'))
const proc = spawn(browser, ['--headless=new', '--remote-debugging-port=9333', `--user-data-dir=${profile}`, '--hide-scrollbars', '--mute-audio', `--window-size=${W},${H}`,
  ...(process.env.GPU ? ['--enable-gpu', '--use-angle=vulkan', '--enable-features=Vulkan'] : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']), '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
  '--disable-backgrounding-occluded-windows', '--no-first-run', '--no-default-browser-check', 'about:blank'], {stdio: 'ignore'})

let ws, seq = 0
const pending = new Map(), listeners = new Set()
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
  const id = ++seq; pending.set(id, {resolve, reject}); ws.send(JSON.stringify({id, method, params, sessionId}))
})
async function connect() {
  for (let i = 0; i < 40; i++) {
    try { const {webSocketDebuggerUrl} = await (await fetch('http://127.0.0.1:9333/json/version')).json(); ws = new WebSocket(webSocketDebuggerUrl); break } catch { await sleep(250) }
  }
  await new Promise(r => ws.addEventListener('open', r, {once: true}))
  ws.addEventListener('message', ({data}) => {
    const msg = JSON.parse(data)
    if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result) }
    else listeners.forEach(fn => fn(msg))
  })
}

const hideOverlays = `for (const el of document.querySelectorAll('[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],[aria-label*=cookie i],[id*=onetrust i]')) el.style.setProperty('display','none','important')`
const hideFixed = `for (const el of document.querySelectorAll('body *')) { const p = getComputedStyle(el).position; if (p === 'fixed' || p === 'sticky') el.style.setProperty('visibility','hidden','important') }`

async function capture(id, url) {
  const {targetId} = await send('Target.createTarget', {url: 'about:blank'})
  const {sessionId} = await send('Target.attachToTarget', {targetId, flatten: true})
  const s = (m, p) => send(m, p, sessionId)
  await s('Page.enable'); await s('Runtime.enable'); await s('Page.bringToFront')
  await s('Emulation.setFocusEmulationEnabled', {enabled: true})
  await s('Emulation.setDeviceMetricsOverride', {width: W, height: H, deviceScaleFactor: 1, mobile: false})
  // Match how these sites are usually seen (dark system theme).
  await s('Emulation.setEmulatedMedia', {features: [{name: 'prefers-color-scheme', value: process.env.SCHEME || 'dark'}]})
  await s('Page.navigate', {url}).catch(() => {})
  await sleep(7000)
  const run = async expression => (await s('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true})).result.value
  await run(hideOverlays).catch(() => {})
  const info = await run(`({title: document.title, description: document.querySelector('meta[name=description]')?.content || '', headings: [...document.querySelectorAll('h1,h2,h3')].slice(0, 25).map(h => h.innerText.trim()).filter(Boolean), nav: [...document.querySelectorAll('nav a, header a')].slice(0, 40).map(a => a.innerText.trim()).filter(Boolean)})`).catch(() => ({}))
  writeFileSync(join(notes, `${id}.json`), JSON.stringify(info, null, 1))

  if (motion.has(id) && process.env.ONLY !== 'still') {
    const dir = join(notes, `${id}-frames`); rmSync(dir, {recursive: true, force: true}); mkdirSync(dir)
    const frames = []
    const onFrame = msg => {
      if (msg.sessionId !== sessionId || msg.method !== 'Page.screencastFrame') return
      frames.push({t: msg.params.metadata.timestamp, data: msg.params.data})
      s('Page.screencastFrameAck', {sessionId: msg.params.sessionId}).catch(() => {})
    }
    listeners.add(onFrame)
    await s('Page.startScreencast', {format: 'jpeg', quality: 82, maxWidth: 960, maxHeight: 600})
    // ~9s: the hero's own animation with a cursor drifting across it (hover effects), then a scroll into the page.
    for (let k = 0; k < 40; k++) { await s('Input.dispatchMouseEvent', {type: 'mouseMoved', x: 260 + k * 24, y: 420 + Math.sin(k / 5) * 140}); await sleep(100) }
    for (let k = 0; k < 30; k++) { await s('Input.dispatchMouseEvent', {type: 'mouseWheel', x: W / 2, y: H / 2, deltaX: 0, deltaY: 36}); await sleep(100) }
    await sleep(1400)
    await s('Page.stopScreencast'); listeners.delete(onFrame)
    // Resample by timestamp to a steady 24 fps so uneven frame delivery still plays at real speed.
    let n = 0
    if (frames.length > 1) for (let t = frames[0].t, i = 0; t <= frames.at(-1).t; t += 1 / 24) {
      while (i + 1 < frames.length && frames[i + 1].t <= t) i++
      writeFileSync(join(dir, `${String(n++).padStart(4, '0')}.jpg`), Buffer.from(frames[i].data, 'base64'))
    }
    if (n > 24) {
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '24', '-i', join(dir, '%04d.jpg'), '-vf', 'scale=640:-2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '28', '-movflags', '+faststart', '-an', join(out, `${id}.mp4`)])
      execFileSync('magick', [join(dir, '0000.jpg'), '-resize', '640x', '-quality', '72', join(out, `${id}-poster.webp`)])
    }
    console.log(id, 'video', frames.length, 'frames ->', n)
  }

  if (process.env.ONLY === 'video') { await send('Target.closeTarget', {targetId}); return }
  // Tall still: scroll a viewport at a time so reveal-on-scroll content is visible, then stack the slices.
  const height = await run('Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0)').catch(() => H)
  const slices = []
  for (let i = 0; i < SLICES && i * H < height; i++) {
    // Real wheel input, since smooth-scroll libraries (Lenis etc.) undo programmatic scrollTo.
    if (i) for (let k = 0; k < 6; k++) { await s('Input.dispatchMouseEvent', {type: 'mouseWheel', x: W / 2, y: H / 2, deltaX: 0, deltaY: H / 6}); await sleep(60) }
    await sleep(1200)
    if (i === 1) await run(hideFixed).catch(() => {})
    const y = await run('scrollY')
    if (i && y < i * H - 40) break
    const {data} = await s('Page.captureScreenshot', {format: 'png'})
    const file = join(notes, `${id}-${i}.png`); writeFileSync(file, Buffer.from(data, 'base64')); slices.push(file)
  }
  execFileSync('magick', [...slices, '-append', '-resize', '640x', '-quality', '72', join(out, `${id}.webp`)])
  console.log(id, 'still', slices.length, 'slices')
  await send('Target.closeTarget', {targetId})
}

try {
  await connect()
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(sites).filter(id => process.env.ONLY !== 'video' || motion.has(id))
  for (const id of ids) { try { await capture(id, sites[id]) } catch (e) { console.log(id, 'FAILED', e.message) } }
} finally { try { ws?.close() } catch {} proc.kill(); await sleep(500); rmSync(profile, {recursive: true, force: true}) }
console.log('notes in', notes)
