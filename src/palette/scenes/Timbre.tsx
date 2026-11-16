import type {CSSProperties} from 'react'
import '../palette-charles.css'

// Timbre: a refined interpretation of charles.unemployed's third palette, not a recreation.
// The reel's painted portrait is replaced by a halftone "voice" sphere with a live waveform through it.

const e = (s: number) => ({'--e': `${s}s`}) as CSSProperties
const SX = 930, SY = 410, R = 236

// One path of halftone dots, lit from the upper left like a printed engraving.
const halftone = (() => {
  let d = ''
  for (let y = -R; y <= R; y += 11) for (let x = -R; x <= R; x += 11) {
    const ox = x + (Math.round(y / 11) % 2 ? 5.5 : 0), rr = ox * ox + y * y
    if (rr > R * R || Math.abs(y) < 58) continue
    const nx = ox / R, ny = y / R, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))
    const light = Math.max(0, Math.min(1, .18 + .82 * (-.52 * nx - .58 * ny + .63 * nz)))
    const r = .5 + 4.1 * light
    if (r < .8) continue
    const cx = (SX + ox).toFixed(1), cy = (SY + y).toFixed(1)
    d += `M${cx} ${cy}m-${r.toFixed(2)} 0a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(2 * r).toFixed(2)} 0a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 -${(2 * r).toFixed(2)} 0`
  }
  return d
})()
const bars = Array.from({length: 38}, (_, i) => {
  const x = SX - 222 + i * 12, edge = 1 - Math.abs(i - 18.5) / 19.5
  return {x, h: 18 + 78 * edge ** .7 * (.55 + .45 * Math.abs(Math.sin(i * 1.7))), delay: -((i * 37) % 11) / 10}
})
const languages = [['Español', 1188, 236, 0], ['हिन्दी', 690, 646, 1.4], ['日本語', 1150, 612, .7]] as const

export default function Timbre({accent}: {accent: boolean}) {
  return <div className={`pd-site pc-tb${accent ? ' is-accent' : ''}`}>
    <svg className="pc-tb-art" viewBox="0 0 1280 800" aria-hidden="true">
      <defs>
        <pattern id="pc-tb-damask" width="180" height="220" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#5e1a20" strokeWidth="2">
            <path d="M90 40c-26 18-34 52-18 80 8 14 18 22 18 40 0-18 10-26 18-40 16-28 8-62-18-80Z"/>
            <path d="M90 66c-10 10-12 30-2 44M90 66c10 10 12 30 2 44"/>
            <path d="M54 120c-26-4-42 12-40 34 16-14 30-18 40-34ZM126 120c26-4 42 12 40 34-16-14-30-18-40-34Z"/>
            <path d="M90 160v40M74 196c10-8 22-8 32 0"/>
            <path d="M0 10c20 10 20 30 0 40M180 10c-20 10-20 30 0 40M0 180c20-10 40-6 50 10M180 180c-20-10-40-6-50 10"/>
          </g>
        </pattern>
        <radialGradient id="pc-tb-vignette" r=".75"><stop offset=".55" stopColor="#4A0F14" stopOpacity="0"/><stop offset="1" stopColor="#2a0609" stopOpacity=".85"/></radialGradient>
        <radialGradient id="pc-tb-glow"><stop offset="0" stopColor="#19D3FF" stopOpacity=".5"/><stop offset=".45" stopColor="#19D3FF" stopOpacity=".16"/><stop offset="1" stopColor="#19D3FF" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1280" height="800" fill="url(#pc-tb-damask)" className="pd-fade" style={e(0)}/>
      <rect width="1280" height="800" fill="url(#pc-tb-vignette)"/>
      <circle className="pc-tb-glow" cx={SX} cy={SY} r="330" fill="url(#pc-tb-glow)"/>
      <g className="pd-fade" style={e(.15)}><path className="pc-tb-dots" d={halftone}/></g>
      <g className="pc-tb-bars">{bars.map(b => <rect key={b.x} x={b.x} y={SY - b.h / 2} width="5" height={b.h} rx="2.5" style={{animationDelay: `${b.delay}s`}}/>)}</g>
    </svg>
    {languages.map(([name, x, y, delay]) => <span key={name} className="pc-tb-chip pd-rise" style={{left: x, top: y, ...e(.4 + delay / 4), '--f': `${delay}s`} as CSSProperties}><i/>{name}</span>)}
    <nav className="pc-tb-nav pd-fade"><span className="pc-tb-logo"><i/>timbre</span><span>Listen</span><span>Pricing</span></nav>
    <div className="pc-tb-title pd-rise" style={e(.1)}><span className="lead">Accent</span><em>included.</em></div>
    <p className="pc-tb-copy pd-rise" style={e(.2)}>Speak once and post in Spanish,<br/>Hindi and Japanese, still in your voice.</p>
    <span className="pc-tb-cta pd-rise" style={e(.28)}>Dub a video</span>
  </div>
}
