import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { colors, type PaletteFamily } from './palettes'
import './palette-scenes.css'

// Each scene is drawn on a fixed design canvas and scaled as a whole, so the reel's proportions survive any preview width.
// Canvas sizes are the website crops measured in the reel (≈612×380 and ≈610×456 video pixels), doubled.
const canvases = {
  electric: {width: 1224, height: 760, label: 'Recreation of the Editeaze creative-app landing page from the reel'},
  aqua: {width: 1220, height: 912, label: 'Recreation of the Globynk global-talent landing page from the reel'},
}

const vars = {'--pd-charcoal': colors.charcoal[1], '--pd-royal': colors.royal[1], '--pd-tangerine': colors.tangerine[1], '--pd-aqua': colors.aqua[1], '--pd-midnight': colors.midnight[1], '--pd-pink': colors.pink[1]} as CSSProperties

export function PaletteScene({family, accent}: {family: PaletteFamily, accent: boolean}) {
  const {width, height, label} = canvases[family]
  return <ScaledCanvas width={width} height={height} label={`${label}${accent ? ', accent version' : ''}`}>
    {family === 'electric' ? <Editeaze accent={accent}/> : <Globynk accent={accent}/>}
  </ScaledCanvas>
}

function ScaledCanvas({width, height, label, children}: {width: number, height: number, label: string, children: ReactNode}) {
  const frame = useRef<HTMLDivElement>(null), [scale, setScale] = useState(0)
  useLayoutEffect(() => {
    const el = frame.current!, update = () => setScale(el.clientWidth / width)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])
  return <div ref={frame} className="pd-frame" role="img" aria-label={label} style={{aspectRatio: `${width} / ${height}`}}>
    <div className="pd-canvas" style={{...vars, width, height, transform: `scale(${scale})`}}>{children}</div>
  </div>
}

/* ───────────── Composition A: Editeaze ───────────── */

// Bell-shaped vector path traced from the reel: off the top-left corner, flat trough, peak right of centre, exits the right edge.
const curve = 'M-6 6 C30 420 110 674 290 674 C540 674 640 124 856 124 C1020 124 1110 340 1240 540'
// The reel's glow hugs only the outer side of the left branch and the crest, not the whole line.
const glowLeft = 'M-6 6 C15.6 254.4 51.4 445.2 115.6 558', glowCrest = 'M680 250 C735 176 794 124 856 124 C1020 124 1110 340 1240 540'

function Editeaze({accent}: {accent: boolean}) {
  return <div className={`pd-site pd-ed${accent ? ' is-accent' : ''}`}>
    <svg className="pd-ed-art" viewBox="0 0 1224 760" aria-hidden="true">
      <defs>
        <clipPath id="pd-ed-outside"><path d={`${curve} L1260 -40 L-40 -40 Z`}/></clipPath>
        <filter id="pd-ed-haze" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="26"/></filter>
        <linearGradient id="pd-ed-fade-left" gradientUnits="userSpaceOnUse" x1="0" y1="330" x2="0" y2="560"><stop offset="0" className="on"/><stop offset="1" className="off"/></linearGradient>
        <linearGradient id="pd-ed-fade-crest" gradientUnits="userSpaceOnUse" x1="680" y1="0" x2="800" y2="0"><stop offset="0" className="off"/><stop offset="1" className="on"/></linearGradient>
        <filter id="pd-ed-soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="4"/></filter>
      </defs>
      <g clipPath="url(#pd-ed-outside)"><path d={glowLeft} className="pd-ed-haze" stroke="url(#pd-ed-fade-left)" filter="url(#pd-ed-haze)"/><path d={glowCrest} className="pd-ed-haze crest" stroke="url(#pd-ed-fade-crest)" filter="url(#pd-ed-haze)"/></g>
      <path d={curve} className="pd-ed-halo" filter="url(#pd-ed-soft)"/>
      <path d={curve} className="pd-ed-line"/>
      <g className="pd-ed-handles">
        <line x1="0" x2="1224" y1="674" y2="674" className="dash"/>
        <line x1="64" x2="456" y1="674" y2="674"/>
        <line x1="1170" x2="1224" y1="674" y2="674"/>
        <rect x="58" y="668" width="12" height="12"/><rect x="450" y="668" width="12" height="12"/><rect x="1164" y="668" width="12" height="12"/>
        <circle cx="234" cy="674" r="5"/><circle cx="320" cy="674" r="5"/>
      </g>
    </svg>
    <nav className="pd-ed-nav">
      <span className="pd-ed-logo"><svg viewBox="0 0 18 20"><defs><linearGradient id="pd-ed-mark" x2="1" y2="1"><stop offset="0" className="a"/><stop offset="1" className="b"/></linearGradient></defs><path d="M2 1.5 16 10 2 18.5Z" fill="url(#pd-ed-mark)"/><path d="M2 1.5 9 10 2 18.5Z" fill="#fff" opacity=".28"/></svg>editease</span>
      <span className="pd-ed-link" style={{left: 490}}>Home</span><span className="pd-ed-link" style={{left: 560}}>Features</span><span className="pd-ed-link" style={{left: 644}}>Pricing</span><span className="pd-ed-link" style={{left: 722}}>Support</span>
      <span className="pd-ed-link" style={{left: 1046}}>Log in</span>
      <span className="pd-ed-cta">Get started</span>
    </nav>
    <div className="pd-ed-title pd-ed-left"><span>Transform</span><span className="indent">your</span><span className="indent">content</span></div>
    <p className="pd-ed-copy">Elevate your creations with ease. Download now and unleash your artistic vision with stunning content!</p>
    <div className="pd-ed-stores">
      <span><svg viewBox="0 0 14 16"><path d="M10.2 8.6c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2.1-1.3-2.5-1.4-1.1-.1-2.1.6-2.6.6s-1.4-.6-2.3-.6C3.1 4.7 2 5.4 1.4 6.5c-1.3 2.2-.3 5.5 1 7.3.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6s1.4.6 2.4.6 1.6-.9 2.2-1.8c.7-1 1-2 1-2.1 0 0-1.9-.7-1.9-3.1ZM8.4 3.4c.5-.6.9-1.5.8-2.4-.8 0-1.7.5-2.3 1.1-.5.6-.9 1.4-.8 2.3.9.1 1.7-.4 2.3-1Z"/></svg><small>Download on the</small>App Store</span>
      <span><svg viewBox="0 0 14 16"><path d="M1.5 1 12.5 8 1.5 15Z"/></svg><small>Get it on</small>Google Play</span>
    </div>
    {accent && <EditorPhone/>}
    <div className="pd-ed-title pd-ed-right">
      <span>With</span>
      <span className="pd-ed-selected">Editeaze<i className="tl"/><i className="tr"/><i className="bl"/><i className="br"/></span>
      <span className="end">App</span>
    </div>
  </div>
}

// Only present in the tangerine state: the reel drops this phone editor and its floating panels onto the same layout.
function EditorPhone() {
  return <>
    <div className="pd-phone">
      <div className="pd-phone-status"><b>9:41</b><i className="island"/><span className="signal"><i/><i/><i/><i/></span><span className="battery"/></div>
      <div className="pd-phone-media">
        <div className="pd-media-head"><span className="back">‹</span><div><b>Presentation of new Feature</b><small>1080p • 29.93 FPS</small></div><span className="icon cube"/><span className="icon down">⤓</span></div>
        <svg className="pd-media-people" viewBox="22 18 200 132">
          <path d="M36 150c2-34 16-58 46-64l26 4c22 10 30 32 34 60Z" fill="#ff8a1c"/>
          <path d="M120 150c6-30 18-46 38-50l22 2c22 8 34 26 40 48Z" fill="#ff6fae"/><path d="M196 150c0-18-8-30-16-40l12-4c16 8 24 24 26 44Z" fill="#ff9a2c"/>
          <ellipse cx="96" cy="58" rx="20" ry="24" fill="#5a3324"/><path d="M76 50c0-20 14-30 26-28 12 2 18 10 16 22-6-8-16-10-26-8-8 2-12 8-16 14Z" fill="#b6e34a"/>
          <ellipse cx="146" cy="72" rx="18" ry="22" fill="#4a2a1f"/><path d="M128 66c-2-18 10-28 22-26 12 2 16 10 14 20-6-8-14-8-22-6-6 2-10 6-14 12Z" fill="#ff8fc8"/>
          <path d="M62 150c10-20 40-26 70-20l40 6c-10 8-30 14-50 14Z" fill="#f27d1f" opacity=".9"/>
        </svg>
        <div className="pd-media-input"/>
      </div>
      <div className="pd-phone-controls"><span className="play"/><b>00:31</b><small>/02:56</small><span className="ctl">↶</span><span className="ctl">↷</span><span className="ctl">⤢</span></div>
      <div className="pd-tracks">
        {[0, 1, 2, 3].map(row => <i key={row} className={`row-icon r${row}`}/>)}
        <span className="clip text" style={{left: 42, width: 80}}>Some text...<small>7s</small></span><span className="clip text" style={{left: 164, width: 92}}>Some text some...</span>
        <span className="clip mod orange" style={{left: 60, width: 44}}>Modify<small>8s</small></span><span className="clip mod red" style={{left: 126, width: 90}}>Modify<small>19s</small></span>
        <svg className="clip wave" viewBox="0 0 212 32" preserveAspectRatio="none"><path d={waveform}/></svg>
        <span className="clip film">{Array.from({length: 7}, (_, i) => <i key={i}/>)}</span>
        <span className="playhead"/>
      </div>
      <div className="pd-ruler">{['10s', '20s', '30s', '40s', '50s'].map(t => <span key={t}>{t}</span>)}</div>
      <div className="pd-phone-tools"><span>✂</span><span className="half"/><span>⟋</span><span className="cc">CC</span><span className="layers"/><span className="wheel"/></div>
      <i className="pd-phone-home"/>
    </div>
    <div className="pd-float pd-subtitles"><i className="dot"/><div><small>CC/Subtitles</small>I am very pleased with our...</div><i className="square"/></div>
    <div className="pd-float pd-strip">
      <Portrait flip={false}/><Portrait flip/>
      <span className="pin"/>
    </div>
    <div className="pd-float pd-add"><i>+</i>Add new</div>
    <div className="pd-float pd-swatches">{['#7c4dff', '#2f6bff', '#22c7f0', '#22c55e', '#ff3d6e', '#ff7a1a', '#ffd23f', '#d9d9de'].map(c => <i key={c} style={{background: c}}/>)}</div>
  </>
}

const waveform = 'M0 32' + Array.from({length: 53}, (_, i) => ` L${i * 4} ${16 - Math.abs(Math.sin(i * 1.7) * 9 + Math.sin(i * .45) * 5)}`).join('') + ' L212 32Z'

function Portrait({flip}: {flip: boolean}) {
  return <svg className="portrait" viewBox="0 0 120 103" style={flip ? {transform: 'scaleX(-1)'} : undefined}>
    <path d="M10 103c4-30 18-44 40-48h22c24 6 36 22 40 48Z" fill="#f3efe8"/>
    <path d="M30 103c4-18 14-28 30-30 16 2 28 12 32 30Z" fill="#1f5d4d"/>
    <path d="M32 46c-2-30 16-42 32-40 18 2 30 16 26 40l-6 26H40Z" fill="#7a4a2c"/>
    <ellipse cx="60" cy="48" rx="21" ry="25" fill="#e9b493"/>
    <circle cx="51" cy="46" r="8" fill="#ff3a4c" opacity=".85"/><circle cx="70" cy="46" r="8" fill="#ff3a4c" opacity=".85"/>
    <path d="M38 30c6-14 30-18 44-4-10-4-26-6-44 4Z" fill="#5a331e"/>
  </svg>
}

/* ───────────── Composition B: Globynk ───────────── */

function Globynk({accent}: {accent: boolean}) {
  return <div className={`pd-site pd-gl${accent ? ' is-accent' : ''}`}>
    <svg className="pd-gl-art" viewBox="0 0 1220 912" aria-hidden="true">
      <defs>
        <radialGradient id="pd-gl-core" cx=".52" cy=".55" r=".55"><stop offset="0" stopColor="#b4ffe6" stopOpacity=".65"/><stop offset=".55" stopColor="#6cf0d4" stopOpacity=".22"/><stop offset="1" stopColor="#5fe6d6" stopOpacity="0"/></radialGradient>
        <linearGradient id="pd-gl-skin-l" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2f6f7c"/><stop offset=".45" stopColor="#163c4c"/><stop offset="1" stopColor="#0a1f2c"/></linearGradient>
        <linearGradient id="pd-gl-skin-r" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#2f6f7c"/><stop offset=".4" stopColor="#173a4a"/><stop offset="1" stopColor="#0c2130"/></linearGradient>
        <filter id="pd-gl-bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
        <filter id="pd-gl-rim" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.5"/></filter>
      </defs>
      <circle cx={globe.cx} cy={globe.cy} r={globe.r + 26} fill="url(#pd-gl-core)"/>
      <path d={globe.back} className="pd-gl-mesh back"/>
      <path d={globe.front} className="pd-gl-mesh"/>
      <path d={globe.dots} className="pd-gl-dots"/>
      <g className="pd-gl-hand">
        <path d={leftHand} fill="url(#pd-gl-skin-l)"/><path d={leftHand} className="rim" filter="url(#pd-gl-rim)"/>
        <path d={rightHand} fill="url(#pd-gl-skin-r)"/><path d={rightHand} className="rim" filter="url(#pd-gl-rim)"/>
      </g>
      <g className="pd-gl-routes">
        {routes.map(d => <path key={d} d={d} className="glow" filter="url(#pd-gl-bloom)"/>)}
        {routes.map(d => <path key={d} d={d}/>)}
      </g>
      <g className="pd-gl-nodes">
        {globe.bright.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="6" className="glow" filter="url(#pd-gl-bloom)"/>)}
        {globe.bright.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.6"/>)}
      </g>
    </svg>
    <nav className="pd-gl-nav">
      <span className="pd-gl-logo"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8.4" fill="none" stroke="#fff" strokeWidth="2.2"/><path d="M10 4.6a5.4 5.4 0 1 0 5.4 5.4H10Z" fill="#fff"/></svg>Globynk</span>
      <span className="pd-gl-menu"><b>Home</b><span>Features</span><span>Global Hiring</span><span>Pricing</span><span>Resources</span></span>
      <span className="pd-gl-demo">Book a Demo</span>
    </nav>
    <div className="pd-gl-hero">
      <div className="pd-gl-title">Hire Top Global Talent<br/>Without Borders</div>
      <p>Build and manage international teams with AI-powered hiring, automated<br/>compliance, and seamless global payroll from a single platform.</p>
      {accent && <span className="pd-gl-cta">Start Hiring Today</span>}
    </div>
    <div className="pd-gl-card" style={{left: 104, top: 514, width: 298}}><b>AI Candidate Matching</b>Discover highly qualified professionals through intelligent matching based on skills and experience worldwide today.</div>
    <div className="pd-gl-card" style={{left: 828, top: 566, width: 290}}><b>Global Talent Access</b>Connect with exceptional talent worldwide while expanding hiring opportunities across multiple markets.</div>
    {countries.map(([name, x, y, flag]) => <span key={name} className="pd-gl-pill" style={{left: x, top: y}}>{name}<Flag kind={flag}/></span>)}
  </div>
}

const countries = [['United Kingdom', 490, 516, 'uk'], ['France', 678, 506, 'fr'], ['United States', 470, 610, 'us'], ['Netherlands', 760, 678, 'nl'], ['Germany', 428, 772, 'de']] as const

function Flag({kind}: {kind: typeof countries[number][3]}) {
  const stripes = {fr: ['#2a49c7', '#fff', '#e8343d'], nl: ['#c8283a', '#fff', '#2b4fa5'], de: ['#111', '#dd1f26', '#ffcc1a']}
  return <svg className="flag" viewBox="0 0 16 16"><defs><clipPath id={`pd-flag-${kind}`}><circle cx="8" cy="8" r="8"/></clipPath></defs><g clipPath={`url(#pd-flag-${kind})`}>
    {kind === 'uk' ? <><rect width="16" height="16" fill="#23408f"/><path d="M0 0 16 16M16 0 0 16" stroke="#fff" strokeWidth="3.2"/><path d="M0 0 16 16M16 0 0 16" stroke="#d6293b" strokeWidth="1.2"/><path d="M8 0v16M0 8h16" stroke="#fff" strokeWidth="4.4"/><path d="M8 0v16M0 8h16" stroke="#d6293b" strokeWidth="2.4"/></>
      : kind === 'us' ? <><rect width="16" height="16" fill="#fff"/>{[0, 2, 4, 6, 8].map(i => <rect key={i} y={i * 3.2} width="16" height="1.6" fill="#d6293b"/>)}<rect width="8" height="8" fill="#2b3f8f"/></>
      : kind === 'fr' ? stripes.fr.map((c, i) => <rect key={c} x={i * 5.34} width="5.34" height="16" fill={c}/>)
      : stripes[kind].map((c, i) => <rect key={c} y={i * 5.34} width="16" height="5.34" fill={c}/>)}
  </g></svg>
}

// Silhouettes reaching in from the lower left and upper right, as in the reel's "creation"-style photograph (drawn, not traced).
const leftHand = 'M150 912 C190 840 260 750 310 712 C335 692 352 670 366 648 C378 630 390 614 398 604 C404 597 414 600 412 610 C408 630 400 652 396 672 C420 676 446 676 468 678 C482 680 482 696 468 700 C452 704 436 706 420 708 C438 716 456 720 470 726 C482 732 478 746 464 746 C448 746 432 744 418 744 C432 754 452 762 474 772 C490 780 490 796 474 800 C456 804 436 804 418 806 C440 830 470 870 500 912 Z'
const rightHand = 'M1230 356 C1150 360 1010 380 946 411 C900 432 860 462 840 496 C828 518 818 536 818 546 C820 556 832 556 838 546 C844 536 850 526 856 518 C860 534 860 560 864 586 C866 600 874 610 882 604 C890 596 888 576 886 556 C890 568 896 586 902 594 C908 602 920 598 920 586 C920 570 918 556 918 544 C926 554 934 568 944 570 C954 570 958 560 954 546 C952 536 952 528 954 522 C980 508 1040 496 1100 492 C1150 489 1190 488 1230 488 Z'

const routes = [
  'M410 608 C500 706 660 706 780 672',
  'M524 624 C580 576 640 600 690 524',
  'M580 530 C540 602 660 662 720 740 C760 800 600 842 468 786',
  'M690 524 C764 560 806 604 780 672',
  'M468 786 C520 720 500 664 524 624',
]

// Plexus globe: seeded points on a tilted sphere, each joined to its nearest neighbours; back hemisphere drawn fainter.
const globe = (() => {
  const cx = 606, cy = 640, r = 234, count = 1100
  let seed = 11
  const random = () => (seed = seed * 16807 % 2147483647) / 2147483647
  const tilt = .42, pts = Array.from({length: count}, (_, i) => {
    const y = 1 - 2 * (i + .5) / count, ring = Math.sqrt(1 - y * y), angle = i * 2.39996 + random() * .9
    const x = ring * Math.cos(angle), z = ring * Math.sin(angle)
    return [x, y * Math.cos(tilt) - z * Math.sin(tilt), y * Math.sin(tilt) + z * Math.cos(tilt)]
  })
  const project = ([x, y]: number[]) => `${(cx + x * r).toFixed(1)} ${(cy - y * r).toFixed(1)}`
  const pairs = new Set<string>()
  pts.forEach((p, i) => pts.map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2]).filter(([j]) => j !== i).sort((a, b) => a[1] - b[1]).slice(0, 3).forEach(([j]) => pairs.add(i < j ? `${i}-${j}` : `${j}-${i}`)))
  let front = '', back = '', dots = ''
  pairs.forEach(key => {
    const [a, b] = key.split('-').map(Number), seg = `M${project(pts[a])}L${project(pts[b])}`
    if (pts[a][2] + pts[b][2] > 0) front += seg; else back += seg
  })
  pts.forEach(p => { if (p[2] > -.2) { const [x, y] = project(p).split(' '); dots += `M${x} ${y}m-1.3 0a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0-2.6 0` } })
  const bright = pts.filter((p, i) => p[2] > .1 && i % 31 === 0).map(p => project(p).split(' ').map(Number))
  return {cx, cy, r, front, back, dots, bright}
})()
