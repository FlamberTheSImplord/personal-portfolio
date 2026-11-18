import type {CSSProperties} from 'react'

export default function Globynk({accent}: {accent: boolean}) {
  return <div className={`pd-site pd-gl${accent ? ' is-accent' : ''}`}>
    <svg className="pd-gl-art" viewBox="0 0 1220 912" aria-hidden="true">
      <defs>
        <radialGradient id="pd-gl-core" cx=".52" cy=".55" r=".55"><stop offset="0" stopColor="#b4ffe6" stopOpacity=".65"/><stop offset=".55" stopColor="#6cf0d4" stopOpacity=".22"/><stop offset="1" stopColor="#5fe6d6" stopOpacity="0"/></radialGradient>
        <linearGradient id="pd-gl-skin-l" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2f6f7c"/><stop offset=".45" stopColor="#163c4c"/><stop offset="1" stopColor="#0a1f2c"/></linearGradient>
        <linearGradient id="pd-gl-skin-r" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#2f6f7c"/><stop offset=".4" stopColor="#173a4a"/><stop offset="1" stopColor="#0c2130"/></linearGradient>
      </defs>
      <circle cx={globe.cx} cy={globe.cy} r={globe.r + 26} fill="url(#pd-gl-core)"/>
      <path d={globe.back} className="pd-gl-mesh back"/>
      <path d={globe.front} className="pd-gl-mesh"/>
      <path d={globe.dots} className="pd-gl-dots"/>
      <g className="pd-gl-hand">
        <path d={leftHand} fill="url(#pd-gl-skin-l)"/><path d={leftHand} className="rim"/>
        <path d={rightHand} fill="url(#pd-gl-skin-r)"/><path d={rightHand} className="rim"/>
      </g>
      <g className="pd-gl-routes">
        {routes.map(r => <path key={r} d={r} className="glow"/>)}
        {routes.map(r => <path key={r} d={r}/>)}
      </g>
      <g className="pd-gl-nodes">
        {globe.bright.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="8" className="glow"/>)}
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
      <span className="pd-gl-cta">Start Hiring Today</span>
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
  pts.forEach((p, i) => {
    const best: [number, number][] = [[-1, Infinity], [-1, Infinity], [-1, Infinity]]
    for (let j = 0; j < count; j++) {
      if (j === i) continue
      const q = pts[j], dist = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2
      if (dist < best[2][1]) { best[2] = [j, dist]; best.sort((a, b) => a[1] - b[1]) }
    }
    best.forEach(([j]) => pairs.add(i < j ? `${i}-${j}` : `${j}-${i}`))
  })
  let front = '', back = '', dots = ''
  pairs.forEach(key => {
    const [a, b] = key.split('-').map(Number), seg = `M${project(pts[a])}L${project(pts[b])}`
    if (pts[a][2] + pts[b][2] > 0) front += seg; else back += seg
  })
  pts.forEach(p => { if (p[2] > -.2) { const [x, y] = project(p).split(' '); dots += `M${x} ${y}m-1.3 0a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0-2.6 0` } })
  const bright = pts.filter((p, i) => p[2] > .1 && i % 31 === 0).map(p => project(p).split(' ').map(Number))
  return {cx, cy, r, front, back, dots, bright}
})()
