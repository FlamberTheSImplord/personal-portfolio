import type {CSSProperties} from 'react'
import type {Mode} from './SampleSite'
import type {ToggleVariant, VisualVariant} from './presets'

// Hero art and theme toggles for the sample site. All original drawings in SVG/CSS that take the palette
// through CSS variables (--acc, --acc2, --ink, --line); each one is a look-alike of what its library is known for.
// Motion is CSS only (transform/opacity/stroke), and stops under reduced motion (playground.css).

const seeded = (i: number) => { const x = Math.sin(i * 99.13) * 43758.55; return x - Math.floor(x) }
const chartPts = [62, 58, 66, 50, 54, 38, 44, 30, 34, 20, 26, 14]
const chartLine = chartPts.map((y, i) => `${i ? 'L' : 'M'}${i * 26 + 6} ${y + 40}`).join(' ')

export function Visual({variant}: {variant: VisualVariant}) {
  return <div className={`pgv pgv-is-${variant}`} aria-hidden="true">{art[variant]()}</div>
}

const art: Record<VisualVariant, () => JSX.Element> = {
  chart: () => <>
    <div className="pgv-head"><span>Revenue</span><b>+24%</b></div>
    <svg viewBox="0 0 300 120" preserveAspectRatio="none">
      <defs><linearGradient id="pgv-area" x2="0" y2="1"><stop offset="0" style={{stopColor: 'var(--acc)', stopOpacity: .45}}/><stop offset="1" style={{stopColor: 'var(--acc)', stopOpacity: 0}}/></linearGradient></defs>
      {[30, 60, 90].map(y => <line key={y} x1="0" x2="300" y1={y} y2={y} className="pgv-grid"/>)}
      <path d={`${chartLine} L292 120 L6 120Z`} fill="url(#pgv-area)" className="pgv-area"/>
      <path d={chartLine} className="pgv-glow" pathLength={1}/>
      <path d={chartLine} className="pgv-line" pathLength={1}/>
      <circle cx={11 * 26 + 6} cy={54} r="4" className="pgv-dot"/>
    </svg>
  </>,

  map: () => <svg viewBox="0 0 300 200">
    <path className="pgv-land" d="M20 60 C50 30 110 36 130 58 C150 80 120 110 90 112 C60 114 30 96 20 60Z"/>
    <path className="pgv-land" d="M150 40 C190 20 260 30 280 60 C296 90 270 120 236 118 C214 116 200 96 178 92 C150 88 136 62 150 40Z"/>
    <path className="pgv-land" d="M120 140 C150 126 210 132 226 156 C236 176 206 192 170 188 C134 184 106 160 120 140Z"/>
    <path className="pgv-route" d="M70 78 C110 60 160 110 214 74 S 200 160 166 160" pathLength={1}/>
    {[[70, 78], [214, 74], [166, 160]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><circle r="10" className="pgv-ping" style={{animationDelay: `${i * .5}s`}}/><circle r="5" className="pgv-pin"/></g>)}
  </svg>,

  player: () => <div className="pgv-screen">
    <span className="pgv-play"><svg viewBox="0 0 20 20"><path d="M7 5 15 10 7 15Z"/></svg></span>
    <div className="pgv-controls"><svg viewBox="0 0 20 20"><path d="M7 5 15 10 7 15Z"/></svg><i className="pgv-track"><i/></i><small>1:24</small><span className="pgv-vol"><i/><i/><i/></span></div>
  </div>,

  audio: () => <div className="pgv-audio">
    <span className="pgv-cover"/>
    <div><b>Field notes</b><small>Episode 12</small></div>
    <span className="pgv-wave">{Array.from({length: 24}, (_, i) => <i key={i} style={{height: `${20 + seeded(i) * 80}%`, animationDelay: `${-seeded(i + 7) * 1.2}s`}}/>)}</span>
    <i className="pgv-track"><i/></i>
  </div>,

  orb: () => <div className="pgv-orb"><i/><i/><i/><b/></div>,

  iso: () => <svg viewBox="0 0 240 200" className="pgv-iso-art">
    {/* back to front so nearer cubes overlap; the outer g places, the inner g floats (CSS transform would replace the attribute) */}
    {[[120, 62, 3], [80, 86, 1], [160, 86, 2], [120, 110, 0]].map(([x, y, i]) => <g key={i} transform={`translate(${x} ${y})`}><g style={{animationDelay: `${i * .3}s`}} className="pgv-cube">
      <path d="M0 -28 L34 -10 L0 8 L-34 -10Z" className="top"/><path d="M-34 -10 L0 8 L0 46 L-34 28Z" className="left"/><path d="M34 -10 L0 8 L0 46 L34 28Z" className="right"/>
      <path d="M0 -28 L34 -10 L34 28 L0 46 L-34 28 L-34 -10Z" className="edge"/>
    </g></g>)}
  </svg>,

  shader: () => <div className="pgv-shader"/>,

  particles: () => <div className="pgv-field">{Array.from({length: 46}, (_, i) => <i key={i} style={{left: `${seeded(i) * 100}%`, top: `${seeded(i + 50) * 100}%`, '--s': `${2 + seeded(i + 9) * 4}px`, animationDuration: `${6 + seeded(i + 3) * 8}s`, animationDelay: `${-seeded(i + 5) * 10}s`} as CSSProperties}/>)}</div>,

  globe: () => <svg viewBox="0 0 200 200">
    <defs><clipPath id="pgv-globe"><circle cx="100" cy="100" r="80"/></clipPath><radialGradient id="pgv-shade" cx=".35" cy=".3"><stop offset="0" style={{stopColor: 'var(--acc)', stopOpacity: .18}}/><stop offset="1" style={{stopColor: 'var(--ink)', stopOpacity: .08}}/></radialGradient></defs>
    <circle cx="100" cy="100" r="80" fill="url(#pgv-shade)" className="pgv-sphere"/>
    <g clipPath="url(#pgv-globe)"><g className="pgv-spin">{[0, 1].map(k => <g key={k} transform={`translate(${k * 200} 0)`}>
      {Array.from({length: 15}, (_, r) => Array.from({length: 20}, (_, c) => { const y = 26 + r * 10.5, x = c * 10 + (r % 2) * 5, land = seeded(r * 20 + c) > .55; return <circle key={`${r}-${c}`} cx={x} cy={y} r={land ? 2 : 1} className={land ? 'pgv-land-dot' : 'pgv-sea-dot'}/> }))}
    </g>)}</g></g>
    <circle cx="100" cy="100" r="80" className="pgv-rim"/>
  </svg>,

  device: () => <div className="pgv-window">
    <div className="pgv-bar"><i/><i/><i/></div>
    <div className="pgv-dash">
      <aside>{[70, 50, 60, 40].map((w, i) => <i key={i} style={{width: `${w}%`}}/>)}</aside>
      <main>
        <div className="pgv-kpis">{['12.4k', '68%', '3.2s'].map(k => <span key={k}><small/>{k}</span>)}</div>
        <div className="pgv-bars">{[40, 64, 52, 80, 70, 92, 60].map((h, i) => <i key={i} style={{height: `${h}%`, animationDelay: `${i * .08}s`}}/>)}</div>
      </main>
    </div>
  </div>,

  demo: () => <div className="pgv-demo">
    <div className="pgv-demo-card"><b>Share palette</b><span className="pgv-demo-row"><small>Anyone with link</small><i className="pgv-demo-switch"/></span><span className="pgv-demo-btn">Copy link</span></div>
    <svg className="pgv-cursor" viewBox="0 0 16 20"><path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11Z"/></svg>
  </div>,

  chat: () => <div className="pgv-chat">
    <div className="me">Make the hero calmer</div>
    <div className="ai">Softer contrast, one accent, more space.</div>
    <div className="ai typing"><i/><i/><i/></div>
    <div className="pgv-input"><span>Ask anything</span><b><svg viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5"/></svg></b></div>
  </div>,

  product: () => <div className="pgv-stage"><div className="pgv-product"><span/><b>Fieldwork Pro</b><small>Design to handoff</small></div><i className="pgv-floor"/></div>,

  stats: () => <div className="pgv-stats">
    <div className="pgv-stat"><small>Active teams</small><b>12,480</b><span>{[30, 45, 38, 60, 52, 74, 88].map((h, i) => <i key={i} style={{height: `${h}%`}}/>)}</span></div>
    <div className="pgv-quote"><span className="pgv-avatar"/><span>“Handoff went from days to minutes.”</span></div>
  </div>,

  showcase: () => <div className="pgv-shots">{[0, 1, 2].map(i => <div key={i} className={`pgv-shot s${i}`}><i/><i/><i/><span/></div>)}</div>,
}

/** Theme toggle drawings. Each shows the current mode and animates to the other on click. */
export function ThemeToggle({variant, mode, onChange}: {variant: ToggleVariant, mode: Mode, onChange: (m: Mode) => void}) {
  const dark = mode === 'dark'
  return <button className={`pgt pgt-${variant}${dark ? ' is-dark' : ''}`} onClick={() => onChange(dark ? 'light' : 'dark')} aria-label={dark ? 'Switch to light page' : 'Switch to dark page'} title="Toggle page colour">
    {variant === 'switch' ? <span className="pgt-track"><i/></span>
      : <svg viewBox="0 0 24 24">
        {variant === 'sun-moon' && <><mask id="pgt-moon"><rect width="24" height="24" fill="#fff"/><circle className="pgt-bite" cx="24" cy="4" r="7" fill="#000"/></mask>
          <circle cx="12" cy="12" r="5.5" mask="url(#pgt-moon)" className="pgt-core"/>
          <g className="pgt-rays">{Array.from({length: 8}, (_, i) => <line key={i} x1="12" y1="2" x2="12" y2="4.5" transform={`rotate(${i * 45} 12 12)`}/>)}</g></>}
        {variant === 'eclipse' && <><circle cx="12" cy="12" r="8" className="pgt-ring"/><circle cx="12" cy="12" r="8" className="pgt-cover"/></>}
        {variant === 'expand' && <g className="pgt-half"><circle cx="12" cy="12" r="8" className="pgt-ring"/><path d="M12 4a8 8 0 0 1 0 16Z" className="pgt-fill"/></g>}
      </svg>}
  </button>
}
