import {useEffect, useRef, type CSSProperties} from 'react'
import '../palette-charles.css'

// Murmur, recreated from charles.unemployed's reel: dusk sky, a starling murmuration and a Rome skyline.
// The flock is a live canvas; the sunset accent warms its tail, the headline, the dome windows and the water.

const navy = [13, 26, 51], warm = [255, 106, 43]
let seed = 7
const random = () => (seed = seed * 16807 % 2147483647) / 2147483647

export default function Murmur({accent}: {accent: boolean}) {
  return <div className={`pd-site pc-mm${accent ? ' is-accent' : ''}`}>
    <div className="pc-mm-sky"/>
    <div className="pc-mm-sun"/>
    <Flock accent={accent}/>
    <Skyline/>
    <nav className="pc-mm-nav pd-fade">
      <span className="pc-mm-logo"><svg viewBox="0 0 22 10" aria-hidden="true"><path d="M1 8c3-6 6-6 9-2s6 3 11-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>murmur</span>
      <span>How it works</span><span>Pricing</span>
    </nav>
    <div className="pc-mm-title pd-rise" style={{'--e': '.08s'} as CSSProperties}>
      <span>Done by</span><span>morning.</span>
      <span className="warm" aria-hidden="true"><span>Done by</span><span>morning.</span></span>
    </div>
    <p className="pc-mm-copy pd-rise" style={{'--e': '.2s'} as CSSProperties}>Give Murmur your backlog tonight.<br/>A thousand agents split it up and finish it together.</p>
    <span className="pc-mm-cta pd-rise" style={{'--e': '.28s'} as CSSProperties}>Hand it off</span>
  </div>
}

/* ── Flock ── */

type Bird = {u: number, v: number, f1: number, f2: number, p1: number, p2: number, s: number}
const birds: Bird[] = (() => {
  seed = 7
  return Array.from({length: 10500}, () => {
    const v = (random() + random() - 1) * .92 + (random() - .5) * .16
    return {u: random() ** 1.05, v, f1: .5 + random(), f2: .5 + random(), p1: random() * 6.28, p2: random() * 6.28, s: random() < .7 ? 2.5 : 3.3}
  })
})()
// Warmth: the sunlit tail and the lower edge of the flock catch the light first.
const BINS = 8
const binned: Bird[][] = Array.from({length: BINS}, () => [])
birds.forEach(b => {
  const tail = Math.min(1, Math.max(0, (b.u - .52) / .3)), belly = Math.max(0, b.v) * .4
  const w = Math.min(1, (tail * (.2 + random() * .65) + belly * tail) * .9)
  binned[Math.min(BINS - 1, Math.floor(w * BINS))].push(b)
})
const CW = 740, CH = 340

function Flock({accent}: {accent: boolean}) {
  const canvas = useRef<HTMLCanvasElement>(null), target = useRef(accent ? 1 : 0), paint = useRef<(t: number, level: number) => void>()
  target.current = accent ? 1 : 0
  useEffect(() => {
    const el = canvas.current!, ctx = el.getContext('2d')!, k = Math.min(2, devicePixelRatio || 1)
    el.width = CW * k; el.height = CH * k; ctx.scale(k, k)
    const draw = paint.current = (t: number, level: number) => {
      ctx.clearRect(0, 0, CW, CH)
      const breathe = 1 + .07 * Math.sin(t * .55)
      for (let bin = 0; bin < BINS; bin++) {
        const m = (bin + .5) / BINS * level
        ctx.fillStyle = `rgb(${navy.map((c, i) => Math.round(c + (warm[i] - c) * m)).join(',')})`
        for (const b of binned[bin]) {
          const u = b.u, half = (u < .3 ? 150 * Math.sqrt(Math.max(0, 1 - ((u - .3) / .3) ** 2)) : 150 * (1 - (u - .3) / .7) ** .85) * (breathe + .06 * Math.sin(t * .8 + u * 4))
          const x = 22 + u * 668 + 9 * Math.sin(t * .35 + u * 2) + 3.2 * Math.sin(t * b.f1 + b.p1)
          const y = 168 - 48 * u * u + 10 * Math.sin(2.4 * u + t * .6) + b.v * half + 3.2 * Math.cos(t * b.f2 + b.p2)
          ctx.fillRect(x, y, b.s, b.s)
        }
      }
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { draw(2, target.current); return }
    let level = target.current, frame = 0, visible = true
    const start = performance.now()
    const loop = (now: number) => {
      level += (target.current - level) * .055
      if (visible && !document.hidden) draw((now - start) / 1000, level)
      frame = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    frame = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frame); io.disconnect() }
  }, [])
  // Reduced motion has no loop, so repaint once per stage change.
  useEffect(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) paint.current?.(2, accent ? 1 : 0) }, [accent])
  return <canvas ref={canvas} className="pc-mm-flock pd-fade" style={{'--e': '.15s'} as CSSProperties} aria-hidden="true"/>
}

/* ── Skyline ── */

const pines = [[18, 66], [74, 54], [118, 82], [196, 60], [252, 44], [318, 70], [392, 50], [604, 58], [780, 46]]
const blocks = [[0, 588, 1280, 14], [140, 578, 60, 22], [330, 582, 120, 18], [430, 574, 50, 26], [580, 580, 90, 20], [648, 570, 40, 30], [760, 576, 80, 24], [1188, 578, 92, 22], [1236, 568, 30, 32]]
const windows = [
  ...Array.from({length: 9}, (_, i) => [987 + i * 9.5, 486, 4, 14]),
  ...Array.from({length: 12}, (_, i) => [966 + i * 10, 524, 5, 8]),
  ...Array.from({length: 18}, (_, i) => [908 + i * 13.5, 562, 6, 9]),
  [929, 548, 3, 8], [937, 548, 3, 8], [1114, 548, 3, 8], [1122, 548, 3, 8],
  [505, 582, 5, 7], [522, 582, 5, 7], [715, 548, 4, 8], [1200, 588, 5, 6], [1218, 588, 5, 6], [452, 584, 4, 6],
]
// Reflection: short streaks in a column below the dome, narrowing with depth.
const ripples = (() => {
  seed = 31
  const rows: {y: number, d: number, streaks: [number, number][]}[] = []
  for (let y = 628; y < 780; y += 6.5) {
    const depth = (y - 628) / 152, spread = 130 - depth * 70, cx = 1028 + Math.sin(y * .07) * 8
    const streaks: [number, number][] = []
    for (let x = cx - spread; x < cx + spread;) { const w = 6 + random() * 26; if (random() > .25) streaks.push([x, w]); x += w + 3 + random() * 9 }
    rows.push({y, d: 2.4 + random() * 2.2, streaks})
  }
  return rows
})()

function Skyline() {
  return <svg className="pc-mm-city" viewBox="0 0 1280 800" aria-hidden="true">
    <defs>
      <linearGradient id="pc-mm-land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a2b4c"/><stop offset=".25" stopColor="#0D1A33"/><stop offset="1" stopColor="#0a1529"/></linearGradient>
      <radialGradient id="pc-mm-glow"><stop offset="0" stopColor="#FF6A2B" stopOpacity=".55"/><stop offset=".5" stopColor="#FF6A2B" stopOpacity=".16"/><stop offset="1" stopColor="#FF6A2B" stopOpacity="0"/></radialGradient>
    </defs>
    <g className="pc-mm-land pd-rise" style={{'--e': '.05s'} as CSSProperties}>
      <rect x="0" y="598" width="1280" height="202" fill="url(#pc-mm-land)"/>
      {blocks.map(([x, y, w, h]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h}/>)}
      {pines.map(([x, w]) => <g key={x}>
        <rect x={x + w / 2 - 1.5} y={566} width="3" height="34"/>
        <ellipse cx={x + w / 2} cy={562} rx={w / 2} ry={9}/><ellipse cx={x + w * .32} cy={566} rx={w * .3} ry={8}/><ellipse cx={x + w * .7} cy={565} rx={w * .32} ry={8}/>
      </g>)}
      {[[684, 540, 7], [698, 552, 6], [822, 548, 6], [462, 556, 6], [1238, 556, 6]].map(([x, y, w]) => <ellipse key={x} cx={x} cy={y + 24} rx={w} ry={600 - y - 24}/>)}
      <path d="M496 600V568L533 548 570 568V600Z"/><rect x="527" y="538" width="12" height="14"/>
      <path d="M706 600V530H712V518H722V530H728V600Z"/>
      {/* St Peter's: facade, side domes, drum, dome, lantern and cross */}
      <path d="M842 600V578H872V558H1180V578H1214V600Z"/>
      {[935, 1118].map(x => <g key={x}><rect x={x - 16} y={540} width="32" height="18"/><path d={`M${x - 18} 541C${x - 18} 522 ${x - 9} 514 ${x} 513C${x + 9} 514 ${x + 18} 522 ${x + 18} 541Z`}/><rect x={x - 2} y={503} width="4" height="11"/></g>)}
      <rect x="956" y="514" width="138" height="44"/>
      <rect x="976" y="474" width="98" height="42"/>
      <path d="M972 476C972 424 998 398 1025 396C1052 398 1078 424 1078 476Z"/>
      <path d="M1013 398V378H1037V398Z"/><path d="M1016 380C1016 370 1020 365 1025 364C1030 365 1034 370 1034 380Z"/>
      <path d="M1024 364V344H1026V364ZM1019 351H1031V353H1019Z"/>
      {Array.from({length: 7}, (_, i) => <path key={i} className="rib" d={`M${983 + i * 14} 474C${986 + i * 13} 440 ${1002 + i * 7} 410 1025 398`}/>)}
    </g>
    <ellipse className="pc-mm-domeglow" cx="1025" cy="520" rx="150" ry="70" fill="url(#pc-mm-glow)"/>
    <g className="pc-mm-windows">{windows.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} style={{transitionDelay: `${(i % 9) * .04}s`}}/>)}</g>
    <g className="pc-mm-ripples">{ripples.map(row => <g key={row.y} style={{animationDuration: `${row.d}s`}}>{row.streaks.map(([x, w]) => <rect key={x} x={x} y={row.y} width={w} height="2.4" rx="1.2"/>)}</g>)}</g>
  </svg>
}
