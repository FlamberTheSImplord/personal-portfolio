import type {CSSProperties} from 'react'

// A desktop editor instead of the reel's cartoon phone: live footage, karaoke captions and a playhead on one 6s loop.
// The brand's bezier curve draws in behind the window and a light travels along it. Pop colour = --pd-pop.
const edCurve = 'M-20 690 C220 690 300 300 560 250 C760 212 860 520 1060 430 C1150 390 1190 230 1260 150'
const edWords = ['Every', 'cut', 'lands', 'on', 'the', 'beat.']
const edWave = 'M0 18' + Array.from({length: 135}, (_, i) => ` L${i * 4} ${18 - (Math.abs(Math.sin(i * .9) * 8 + Math.sin(i * .23) * 6) + 2) * (i % 27 < 3 ? .3 : 1)}`).join('') + ' L536 18' + Array.from({length: 135}, (_, i) => ` L${536 - i * 4} ${18 + (Math.abs(Math.sin((134 - i) * .9) * 8 + Math.sin((134 - i) * .23) * 6) + 2) * ((134 - i) % 27 < 3 ? .3 : 1)}`).join('') + 'Z'
const edClips = [[0, 92, 'a'], [96, 150, 'b'], [250, 70, 'c'], [324, 118, 'a'], [446, 90, 'b']] as const
const edCaptions = [[18, 70], [110, 54], [196, 96], [330, 62], [420, 88]] as const

export default function Editeaze({accent}: {accent: boolean}) {
  return <div className={`pd-site pd-ed${accent ? ' is-accent' : ''}`}>
    <svg className="pd-ed-art" viewBox="0 0 1224 760" aria-hidden="true">
      <defs><radialGradient id="pd-ed-pool"><stop offset="0" stopColor="#105BFF" stopOpacity=".32"/><stop offset="1" stopColor="#105BFF" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="900" cy="420" rx="520" ry="330" fill="url(#pd-ed-pool)"/>
      <g className="pd-ed-curve">{[26, 12, 2.5].map(w => <path key={w} d={edCurve} pathLength={1} style={{strokeWidth: w}}/>)}</g>
    </svg>
    <i className="pd-ed-spark" aria-hidden="true"/>
    <nav className="pd-ed-nav pd-fade">
      <span className="pd-ed-logo"><svg viewBox="0 0 18 20"><path d="M2 1.5 16 10 2 18.5Z"/></svg>editeaze</span>
      <span className="pd-ed-links"><span>Product</span><span>Templates</span><span>Pricing</span></span>
      <span className="pd-ed-login">Log in</span><span className="pd-ed-cta">Get started</span>
    </nav>
    <div className="pd-ed-head pd-rise" style={{'--e': '.1s'} as CSSProperties}><span>Edit at the</span><span>speed of</span><span className="blue">sound.</span></div>
    <p className="pd-ed-copy pd-rise" style={{'--e': '.2s'} as CSSProperties}>Captions, beat-synced cuts and colour in one pass. Drop in a clip and Editeaze finds the rhythm.</p>
    <div className="pd-ed-actions pd-rise" style={{'--e': '.28s'} as CSSProperties}><span className="pd-ed-primary">Start editing</span><span className="pd-ed-ghost"><i/>Watch the film</span></div>
    <div className="pd-ed-proof pd-rise" style={{'--e': '.34s'} as CSSProperties}><b>4.9</b> from 12,000 creators</div>

    <div className="pd-ed-window pd-rise" style={{'--e': '.18s'} as CSSProperties}>
      <div className="pd-ed-bar"><span className="dots"><i/><i/><i/></span><span className="file">launch-film.edz</span><span className="export">Export</span></div>
      <div className="pd-ed-footage">
        <i className="blob a"/><i className="blob b"/><i className="blob c"/><i className="ridge"/>
        <span className="rec"><i/>REC 00:12:04</span>
        <span className="pd-ed-caption">{edWords.map((w, i) => <span key={w} style={{animationDelay: `${.35 + i * .62}s`}}>{w}</span>)}</span>
      </div>
      <div className="pd-ed-transport"><span className="play"/><b>00:12:04</b><small>/ 00:48:00</small><span className="zoom"><i/></span></div>
      <div className="pd-ed-timeline">
        <div className="ruler">{Array.from({length: 11}, (_, i) => <span key={i} style={{left: i * 54}}>{`0:${String(i * 5).padStart(2, '0')}`}</span>)}</div>
        <div className="track v">{edClips.map(([x, w, t]) => <i key={x} className={t} style={{left: x, width: w}}/>)}</div>
        <svg className="track a" viewBox="0 0 536 36" preserveAspectRatio="none"><path d={edWave}/></svg>
        <div className="track c">{edCaptions.map(([x, w], i) => <i key={x} className={i === 2 ? 'on' : ''} style={{left: x, width: w}}/>)}</div>
        <svg className="track k" viewBox="0 0 536 40" preserveAspectRatio="none"><path d="M0 34 C90 34 120 6 210 6 S330 34 400 22 S500 8 536 8"/><circle cx="210" cy="6" r="4"/><circle cx="400" cy="22" r="4"/></svg>
        <span className="pd-ed-playhead"/>
      </div>
    </div>
    <div className="pd-ed-chip captions pd-rise" style={{'--e': '.45s'} as CSSProperties}><i/><div><b>Auto captions</b><small>EN · ES · JA</small></div></div>
    <div className="pd-ed-chip render pd-rise" style={{'--e': '.55s'} as CSSProperties}><div><b>Exporting 4K</b><span className="track"><i/></span></div></div>
  </div>
}
