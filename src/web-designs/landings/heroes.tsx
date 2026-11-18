import type {CSSProperties, ReactNode} from 'react'
import {ArrowRight} from 'lucide-react'
import {Nav, seeded, useGo} from './core'
import './hero.css'

// The three hero screens from charles.unemployed's reel, rebuilt from free stock photos cut out in layers.
// Each takes `accent`, so the Colour palette page can show the two-colour and three-colour stages.

type HeroProps = {accent?: boolean, bare?: boolean}
const vars = (o: Record<string, string | number>) => o as CSSProperties
const heroClass = (site: string, accent: boolean) => `lh lh-${site}${accent ? ' is-accent' : ''}`
export const photo = (path: string) => `/landings/${path}.webp`

/** A cut-out placed in the hero's 1200 × 800 design space. `par` is its parallax strength on the landing page. */
function Layer({src, x, y, w, par, className = '', style}: {src: string, x: number, y: number, w: number, par?: number, className?: string, style?: CSSProperties}) {
  return <img className={`lh-img ${className}`} src={photo(src)} alt="" aria-hidden="true" decoding="sync" draggable={false} data-par={par}
    style={{left: `${x / 12}%`, top: `${y / 8}%`, width: `${w / 12}%`, ...style}}/>
}

/* ── Altaval ── */

export const AltavalNav = () => <Nav brand="ALTAVAL" links={[['Lifts', 'al-lifts'], ['Ski school', 'al-school'], ['Stay', 'al-stay'], ['Snow report', 'al-snow']]}/>

const swoosh = 'M636 322C700 245 800 140 1000 116V70C1060 50 1120 20 1170 0H1200V382C1120 400 1040 395 975 410C905 430 850 500 796 530C775 470 740 400 636 322Z'
const flakes = (() => { const r = seeded(19); return Array.from({length: 46}, () => [40 + r() * 1120, 340 + r() * 430, 1 + r() * 2.6] as const) })()

export function AltavalHero({accent = true, bare}: HeroProps) {
  const go = useGo()
  return <section className={heroClass('al', accent)} aria-label="Altaval home">
    <div className="lh-in">
      <h3 className="lp-sr">Powder. Altaval ski resort, 64 pistes up to 3200 metres.</h3>
      <div className="lh-stage">
        <svg className="lh-art" viewBox="0 0 1200 800" aria-hidden="true">
          <defs>
            <linearGradient id="al-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#72b2ee"/><stop offset=".55" stopColor="#62A7EA"/><stop offset="1" stopColor="#4f94da"/></linearGradient>
            <clipPath id="al-swoosh"><path d={swoosh}/></clipPath>
          </defs>
          <rect width="1200" height="800" fill="url(#al-sky)"/>
          <path d={swoosh} fill="#fff" className="lh-fade"/>
          <g className="lh-rise">
            <text className="lh-d al-word" x="30" y="385" textLength="1148" lengthAdjust="spacingAndGlyphs">POWDER</text>
            <text className="lh-d al-word navy" x="30" y="385" textLength="1148" lengthAdjust="spacingAndGlyphs" clipPath="url(#al-swoosh)">POWDER</text>
          </g>
          <path d="M361 0 1200 280" stroke="#2c2f36" strokeWidth="4.5"/>
        </svg>
        <Layer src="al/powder" x={-50} y={500} w={640} par={.05} className="lh-fade"/>
        <Layer src="al/cabin-far" x={886} y={159} w={95} className="al-far lh-tone"/>
        <Layer src="al/cabin" x={271} y={-118} w={590} par={-.05} className="al-cab lh-tone"/>
        {[0, 1].map(layer => <svg key={layer} className={`lh-art al-fall f${layer}`} viewBox="0 0 1200 800" aria-hidden="true" fill="#fff">{flakes.filter((_, i) => i % 2 === layer).map(([x, y, r]) => <circle key={x} cx={x} cy={y} r={r}/>)}</svg>)}
      </div>
      {!bare && <AltavalNav/>}
      <p className="al-m al-a lh-up">Fresh snow<br/>overnight</p>
      <p className="al-m al-b lh-up">Open 1 Dec<br/>to 20 Apr</p>
      <p className="al-m al-c lh-up">64 pistes<br/>up to 3200 M</p>
      <button className="al-pass" onClick={() => go('al-passes')}><span>Ski passes</span></button>
    </div>
  </section>
}

/* ── Kiln Coffee ── */

export const KilnNav = ({extra}: {extra?: ReactNode}) => {
  const go = useGo()
  return <Nav brand="KILN COFFEE" links={[['Coffee', 'kn-coffee'], ['Subscriptions', 'kn-subs'], ['Roastery', 'kn-roastery']]} extra={extra ?? <button className="kn-shop" onClick={() => go('kn-coffee')}>Shop beans <ArrowRight size={14}/></button>}/>
}

export function KilnHero({accent = true, bare}: HeroProps) {
  return <section className={heroClass('kn', accent)} aria-label="Kiln Coffee home">
    <div className="lh-in">
      <h3 className="lp-sr">Roasted to the core. Kiln Coffee, small-batch roasters in Bristol.</h3>
      <div className="lh-stage">
        <svg className="lh-art" viewBox="0 0 1200 800" aria-hidden="true">
          <defs>
            <linearGradient id="kn-band" x1="0" y1="1" x2="1" y2="0"><stop offset="0" className="s-acc"/><stop offset=".42" className="s-band"/><stop offset=".72" className="s-band"/><stop offset="1" className="s-acc"/></linearGradient>
            <linearGradient id="kn-table" x1="0" y1="0" x2="0" y2="1"><stop offset="0" className="s-acc"/><stop offset="1" className="s-deep"/></linearGradient>
            <linearGradient id="kn-core" x1="0" y1="0" x2="1" y2="0"><stop offset="0" className="s-acc"/><stop offset="1" className="s-hot"/></linearGradient>
            <radialGradient id="kn-shade"><stop offset="0" stopColor="#1b0a04" stopOpacity=".72"/><stop offset="1" stopColor="#1b0a04" stopOpacity="0"/></radialGradient>
            <pattern id="kn-pin" width="11" height="10" patternUnits="userSpaceOnUse"><rect width="1.6" height="10" fill="#0d5a55" opacity=".5"/><rect x="5" width="1" height="10" fill="#001f1d" opacity=".55"/></pattern>
          </defs>
          <rect width="1200" height="800" fill="#013230"/><rect width="1200" height="800" fill="url(#kn-pin)"/>
          <path className="lh-fade" d="M95 548 590 365 1170 0H1200V135L820 440 1200 590V612L650 800H0V600Z" fill="url(#kn-band)"/>
          <path className="lh-fade" d="M95 548 820 440 1200 590V612L650 800H0V600Z" fill="url(#kn-table)" opacity=".62"/>
          <g className="lh-rise">
            <text className="lh-d kn-word" x="44" y="296" textLength="568" lengthAdjust="spacingAndGlyphs">ROASTED</text>
            <text className="lh-d kn-word core" x="716" y="320" textLength="404" lengthAdjust="spacingAndGlyphs">CORE</text>
            <text className="kn-to" x="638" y="146">to</text><text className="kn-to" x="630" y="200">the</text>
          </g>
          <ellipse cx="590" cy="665" rx="520" ry="95" fill="url(#kn-shade)"/>
        </svg>
        <Layer src="kn/pile" x={130} y={330} w={930} par={.03} className="lh-up"/>
        <Layer src="kn/bean-blur" x={-45} y={500} w={270} par={-.09} className="kn-float" style={vars({'--d': '-2s'})}/>
        <Layer src="kn/bean-a" x={165} y={300} w={125} par={-.06} className="kn-float"/>
        <Layer src="kn/bean-b" x={990} y={392} w={150} par={-.07} className="kn-float" style={vars({'--d': '-3.4s'})}/>
      </div>
      {!bare && <KilnNav/>}
      <p className="kn-kick lh-up">Small batch · Single origin</p>
      <p className="kn-v kn-left">Roasted Mondays</p>
      <div className="kn-index"><i>01</i><span/><p className="kn-v">Shipped Tuesdays</p></div>
      <p className="kn-sig lh-up">Small-batch roasters · Bristol</p>
    </div>
  </section>
}

/* ── Merrow Botanic Garden ── */

export const MerrowNav = () => <Nav brand={<>Merrow<br/>Botanic<br/>Garden</>} links={[['Visit', 'mr-visit'], ['What’s on', 'mr-on'], ['Gardens', 'mr-gardens'], ['Members', 'mr-members']]}/>

const panes = [140, 275, 405, 540, 670, 800, 930, 1065]

export function MerrowHero({accent = true, bare}: HeroProps) {
  const go = useGo()
  return <section className={heroClass('mr', accent)} aria-label="Merrow Botanic Garden home">
    <div className="lh-in">
      <h3 className="lp-sr">Ten thousand orchids. The Orchid Show at Merrow Botanic Garden.</h3>
      <div className="lh-stage">
        <svg className="lh-art" viewBox="0 0 1200 800" aria-hidden="true">
          <defs><radialGradient id="mr-wash" cx=".5" cy=".42" r=".72"><stop offset="0" stopColor="#f3ece3"/><stop offset="1" stopColor="#e3dbcf"/></radialGradient></defs>
          <rect width="1200" height="800" fill="url(#mr-wash)"/>
        </svg>
        <Layer src="mr/spray" x={405} y={58} w={660} par={-.05} className="lh-sway mr-up lh-tone"/>
        <svg className="lh-art" viewBox="0 0 1200 800" aria-hidden="true">
          <defs><text id="mr-o" className="mr-o" x="578" y="650" textLength="612" lengthAdjust="spacingAndGlyphs">orchids</text></defs>
          <g className="mr-type">
            <text className="mr-o" x="18" y="346" textLength="302" lengthAdjust="spacingAndGlyphs">Ten</text><text className="mr-o" x="152" y="502" textLength="728" lengthAdjust="spacingAndGlyphs">thousand</text>
            <g className="mr-blur pink">{[-64, -58, -52, -46, -40, -34, -28, -22, -16, -10, 10, 16, 22, 28, 34, 40, 46, 52, 58].map(d => <use key={d} href="#mr-o" style={vars({'--x': `${d}px`})}/>)}</g>
            <g className="mr-blur ink">{[-15, -12, -9, -6, -3, 3, 6, 9, 12, 15].map(d => <use key={d} href="#mr-o" style={vars({'--x': `${d}px`})}/>)}</g>
            <use href="#mr-o" className="mr-core"/>
          </g>
        </svg>
        <Layer src="mr/bloom" x={56} y={556} w={520} par={.05} className="lh-sway mr-low lh-tone"/>
        <svg className="lh-art" viewBox="0 0 1200 800" aria-hidden="true">
          <g>{panes.map(x => <g key={x}><rect x={x} width="1.5" height="800" fill="#8d8579" opacity=".38"/><rect x={x + 1.5} width="2" height="800" fill="#fff" opacity=".6"/></g>)}<rect y="62" width="1200" height="1.5" fill="#8d8579" opacity=".38"/></g>
        </svg>
      </div>
      {!bare && <MerrowNav/>}
      <p className="mr-kick lh-up">The Orchid<br/>Show</p>
      <p className="mr-copy lh-up">Rare orchids from 30 countries, all in bloom at once.</p>
      <button className="mr-book lh-up" onClick={() => go('mr-visit')}><i><ArrowRight/></i>Book tickets</button>
      <p className="mr-dates lh-up">9 Feb to 24 Mar<br/>The Glasshouses<br/>Open late Fridays</p>
    </div>
  </section>
}
