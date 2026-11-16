import type {CSSProperties} from 'react'
import '../palette-charles.css'

// Pocket, recreated from charles.unemployed's reel: chalk paper, an ink-black record and a top-down drum kit.
// The sticks keep a swung groove; acid green lights rims, the kick, the waves and the headline as the accent.

const CX = 976, CY = 400
const e = (s: number) => ({'--e': `${s}s`}) as CSSProperties
const drums = [
  {id: 'tom1', x: 890, y: 285, r: 45, e: .32},
  {id: 'tom2', x: 1007, y: 338, r: 54, e: .38},
  {id: 'snare', x: 776, y: 437, r: 60, e: .26, hit: 'a'},
  {id: 'floor', x: 1034, y: 537, r: 81, e: .44},
]
const cymbals = [
  {id: 'crash', x: 774, y: 141, r: 99, e: .2, arc: [.62, .3]},
  {id: 'hat', x: 678, y: 383, r: 63, e: .3, arc: [.4, .55], hit: 'b'},
  {id: 'ride', x: 1152, y: 392, r: 108, e: .5, arc: [.55, .05]},
]
// Halftone sound waves: dotted arcs opening to the left of the snare.
const waves = Array.from({length: 7}, (_, ring) => {
  const r = 92 + ring * 22, dots: [number, number][] = []
  for (let a = 2.05; a < 4.35; a += 7.5 / r) dots.push([826 + r * Math.cos(a), 410 + r * Math.sin(a)])
  return {ring, dots}
})
const sparkle = Array.from({length: 46}, (_, i) => [CX - 330 + (i * 97 % 520), CY - 230 + (i * 61 % 420)])

export default function Pocket({accent}: {accent: boolean}) {
  return <div className={`pd-site pc-pk${accent ? ' is-accent' : ''}`}>
    <svg className="pc-pk-art" viewBox="0 0 1280 800" aria-hidden="true">
      <defs>
        <radialGradient id="pc-pk-head" cx=".42" cy=".38" r=".7"><stop offset="0" stopColor="#ffffff"/><stop offset=".7" stopColor="#e6e5e1"/><stop offset="1" stopColor="#c9c8c4"/></radialGradient>
        <radialGradient id="pc-pk-cym" r=".5"><stop offset="0" stopColor="#3a3a40"/><stop offset=".25" stopColor="#141418"/><stop offset=".9" stopColor="#202026"/><stop offset="1" stopColor="#4a4a52"/></radialGradient>
        <linearGradient id="pc-pk-wedge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0"/><stop offset=".5" stopColor="#f2f2f4" stopOpacity=".95"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
        <linearGradient id="pc-pk-kick" x1="0" y1="0" x2="0" y2="1"><stop offset="0" className="hi"/><stop offset="1" className="lo"/></linearGradient>
        <linearGradient id="pc-pk-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0"/><stop offset=".5" stopColor="#fff" stopOpacity=".07"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
        <clipPath id="pc-pk-disc"><circle cx={CX} cy={CY} r="470"/></clipPath>
      </defs>
      <g className="pc-pk-paper">{Array.from({length: 30}, (_, i) => <circle key={i} cx={CX} cy={CY} r={500 + i * 34}/>)}</g>
      <g className="pd-fade" style={e(0)}>
        <circle cx={CX} cy={CY} r="470" fill="#0b0b0f"/>
        <g className="pc-pk-grooves">{Array.from({length: 46}, (_, i) => <circle key={i} cx={CX} cy={CY} r={140 + i * 7}/>)}</g>
        <g clipPath="url(#pc-pk-disc)"><g className="pc-pk-spin"><path d={`M${CX} ${CY}L${CX - 520} ${CY - 260}L${CX - 520} ${CY + 40}Z`} fill="url(#pc-pk-sheen)"/><path d={`M${CX} ${CY}L${CX + 520} ${CY + 260}L${CX + 520} ${CY - 40}Z`} fill="url(#pc-pk-sheen)"/></g></g>
      </g>
      <g className="pc-pk-sparkle">{sparkle.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4}/>)}</g>
      <g className="pc-pk-waves">{waves.map(w => <g key={w.ring} style={{animationDelay: `${w.ring * .07}s`}}>{w.dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.1}/>)}</g>)}</g>
      <g className="pc-pk-kit">
        <g className="pc-pk-pop" style={e(.36)}>
          <path className="pc-pk-kick" d="M846 334h40l8-10h82l8 10h40v16l-10 6v40l10 6v18h-40l-8 10h-82l-8-10h-40v-18l10-6v-40l-10-6Z"/>
        </g>
        {cymbals.map(c => <g key={c.id} className={`pc-pk-pop${c.hit ? ` hit-${c.hit}` : ''}`} style={{...e(c.e), transformOrigin: `${c.x}px ${c.y}px`}}>
          <circle cx={c.x} cy={c.y} r={c.r} fill="url(#pc-pk-cym)" stroke="#5a5a62" strokeWidth="1.5"/>
          <path d={`M${c.x} ${c.y}L${c.x - c.r * .55} ${c.y - c.r * .82}A${c.r} ${c.r} 0 0 1 ${c.x - c.r * .1} ${c.y - c.r}Z`} fill="url(#pc-pk-wedge)"/>
          <path d={`M${c.x} ${c.y}L${c.x + c.r * .55} ${c.y + c.r * .82}A${c.r} ${c.r} 0 0 1 ${c.x + c.r * .1} ${c.y + c.r}Z`} fill="url(#pc-pk-wedge)"/>
          <circle cx={c.x} cy={c.y} r={c.r * .16} fill="#2c2c32" stroke="#6a6a72"/><circle cx={c.x} cy={c.y} r="5" fill="#9a9aa2"/>
          <circle className="pc-pk-edge" cx={c.x} cy={c.y} r={c.r - 3} pathLength="100" strokeDasharray={`${c.arc[0] * 100} 100`} strokeDashoffset={-c.arc[1] * 100}/>
        </g>)}
        {drums.map(d => <g key={d.id} className={`pc-pk-pop${d.hit ? ` hit-${d.hit}` : ''}`} style={{...e(d.e), transformOrigin: `${d.x}px ${d.y}px`}}>
          <circle cx={d.x} cy={d.y} r={d.r + 9} fill="#17171c"/>
          <circle className="pc-pk-rim" cx={d.x} cy={d.y} r={d.r + 5}/>
          <circle className="pc-pk-lugs" cx={d.x} cy={d.y} r={d.r + 5} pathLength="100"/>
          <circle cx={d.x} cy={d.y} r={d.r} fill="url(#pc-pk-head)"/>
        </g>)}
        <g className="pc-pk-pop" style={e(.5)}><circle cx="826" cy="655" r="45" fill="#2a2a30"/><circle cx="826" cy="655" r="38" fill="#3a3a42"/><circle cx="826" cy="655" r="31" fill="none" stroke="#9a9aa2" strokeWidth="2" strokeDasharray="2 5"/></g>
        <g className="pc-pk-stick a"><rect x="846.5" y="441" width="7" height="249" rx="3.5" transform="rotate(-15 850 690)"/></g>
        <g className="pc-pk-stick b"><rect x="756.5" y="371" width="7" height="279" rx="3.5" transform="rotate(-17 760 650)"/></g>
      </g>
    </svg>
    <nav className="pc-pk-nav pd-fade">
      <span className="pc-pk-logo"><i/>pocket</span><span>Sounds</span><span>Pricing</span>
    </nav>
    <div className="pc-pk-title pd-rise" style={e(.1)}>Swings li<em>ke</em><br/>a person<em>.</em></div>
    <p className="pc-pk-copy pd-rise" style={e(.2)}>Send it a demo and it plays<br/>the groove you were hearing.</p>
    <span className="pc-pk-cta pd-rise" style={e(.28)}>Start a session</span>
  </div>
}
