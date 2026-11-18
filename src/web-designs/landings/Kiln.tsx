import {useState, type CSSProperties} from 'react'
import {ArrowRight, Check, ShoppingBag} from 'lucide-react'
import {Slider} from '../../../vendor/boardui/components/base/slider/slider'
import {Switch} from '../../../vendor/boardui/components/base/switch/switch'
import {FlipButton, FlipButtonBack, FlipButtonFront} from '../../ui-library/vendor/animate/Flip'
import {FlipText} from '../../ui-library/vendor/vengeance/FlipText'
import '../../ui-library/vendor/vengeance/flip.css'
import {Footer, LandingRoot, Photo, useGo} from './core'
import {Seg, Stepper} from './controls'
import {KilnHero, KilnNav, photo} from './heroes'
import './pages.css'

// Kiln Coffee: a full one-page roaster site grown from the reel's hero. Prices and the basket are sample data.

const delay = (i: number) => ({'--d': `${i * .08}s`}) as CSSProperties
const coffees = [
  {id: 'guji', name: 'Guji Highlands', from: 'Ethiopia', notes: 'Peach, jasmine, bergamot', roast: 1, price: 13.5, ink: '#013230'},
  {id: 'huila', name: 'Huila Reserve', from: 'Colombia', notes: 'Red apple, caramel, cocoa', roast: 2, price: 12, ink: '#1d0d05'},
  {id: 'furnace', name: 'Furnace', from: 'Espresso blend', notes: 'Dark cherry, molasses', roast: 4, price: 11.5, ink: '#F3EBDD'},
  {id: 'night', name: 'Night Shift', from: 'Decaf, Peru', notes: 'Toffee, orange peel', roast: 3, price: 12.5, ink: '#FF6A1F'},
]
const roasts = [
  {name: 'Cinnamon', temp: 196, look: 'brightness(1.32) saturate(1.05)', notes: 'Bright, floral, tea-like'},
  {name: 'City', temp: 205, look: 'brightness(1.08)', notes: 'Citrus, stone fruit, honey'},
  {name: 'Full city', temp: 219, look: 'brightness(.82)', notes: 'Caramel, cocoa, round body'},
  {name: 'Vienna', temp: 228, look: 'brightness(.58) saturate(.92)', notes: 'Dark chocolate, spice'},
  {name: 'French', temp: 240, look: 'brightness(.36) saturate(.8)', notes: 'Smoke, treacle, heavy body'},
]
const plans = [['1', 'Weekly'], ['2', 'Fortnightly'], ['4', 'Monthly']] as const
const planOff = {1: .15, 2: .12, 4: .08} as const
const stages = [['Charge', '0:00', 40, 60], ['Drying', '4:30', 211, 174], ['First crack', '8:40', 356, 78], ['Drop', '11:20', 480, 44]] as const
const gbp = (n: number) => `£${n.toFixed(2)}`

function Shop({onAdd}: {onAdd: (name: string) => void}) {
  return <section id="kn-coffee" className="lp-sec kn-shopgrid">
    <div className="lp-head lp-r"><span className="lp-kick">The coffee</span><h3>This week’s <em>roast</em></h3></div>
    <div className="kn-bags">{coffees.map((c, i) => <article key={c.name} className="lp-r" style={delay(i)}>
      <div className="kn-bag"><img src={photo(`kn/bag-${c.id}`)} alt={`${c.name} coffee bag`} loading="lazy" decoding="async"/>
        <span style={{color: c.ink}} aria-hidden="true"><b>KILN</b><i>{c.from}</i><u>{[0, 1, 2, 3, 4].map(n => <s key={n} style={{opacity: n < c.roast ? 1 : .22}}/>)}</u></span>
      </div>
      <div><h4>{c.name}</h4><p>{c.notes}</p></div>
      <FlipButton className="kn-flip" onClick={() => onAdd(c.name)} aria-label={`Add ${c.name} to bag`}><FlipButtonFront className="kn-face">{gbp(c.price)}</FlipButtonFront><FlipButtonBack className="kn-face back">Add to bag</FlipButtonBack></FlipButton>
    </article>)}</div>
  </section>
}

function Dial() {
  const [level, setLevel] = useState(2), r = roasts[level]
  return <section className="kn-dial">
    <div className="lp-r kn-dial-bean"><img src={photo('kn/bean-dial')} alt={`Coffee bean at ${r.name} roast`} loading="lazy" decoding="async" style={{filter: r.look}}/></div>
    <div className="lp-r" style={delay(1)}><span className="lp-kick">Roast dial</span><h3 key={r.name} className="lp-pop">{r.name}</h3><p>{r.notes}<b>{r.temp} °C</b></p>
      <div className="bui-kit lp-bui"><Slider aria-label="Roast level" thumbLabel="Roast level" showTooltip={false} minValue={0} maxValue={4} step={1} value={level} onChange={v => setLevel(v as number)}/></div>
      <div className="kn-scale" aria-hidden="true"><span>Light</span><span>Dark</span></div>
    </div>
  </section>
}

function Subscribe({onAdd}: {onAdd: (name: string) => void}) {
  const [every, setEvery] = useState<(typeof plans)[number][0]>('2'), [bags, setBags] = useState(2), [ground, setGround] = useState(false), [done, setDone] = useState(false)
  const off = planOff[every], price = bags * 12.5 * (1 - off)
  return <section id="kn-subs" className="kn-subs">
    <div className="lp-r"><span className="lp-kick">Subscriptions</span><h3>Never run<br/><em>out</em> again.</h3><p>Roasted on Monday, through your door by Wednesday. Pause or cancel whenever you like.</p><Photo src="kn/cup" alt="Roasted beans spilling from a white cup" className="kn-cup"/></div>
    <div className="lp-r kn-plan" style={delay(1)}>
      <Seg label="Delivery" value={every} options={plans} onChange={v => { setEvery(v); setDone(false) }}/>
      <Stepper label="Bags" note="250 g each" value={bags} min={1} max={6} onChange={v => { setBags(v); setDone(false) }}/>
      <div className="bui-kit lp-bui kn-switch"><Switch isSelected={ground} onChange={setGround}>{ground ? 'Ground for filter' : 'Whole bean'}</Switch></div>
      <p className="kn-total"><span>{Math.round(off * 100)}% off</span><b key={price} className="lp-pop">{gbp(price)}</b></p>
      <button className="kn-go" onClick={() => { setDone(true); onAdd('Subscription') }}>{done ? <><Check size={16}/> Added · sample only</> : <>Start subscription <ArrowRight size={16}/></>}</button>
    </div>
  </section>
}

function Roastery() {
  return <section id="kn-roastery" className="lp-sec kn-roast">
    <div className="lp-head lp-r"><span className="lp-kick">The roastery</span><h3>Eleven minutes <em>of</em> fire</h3></div>
    <div className="kn-roast-grid">
      <Photo src="kn/drum" alt="Coffee beans turning in a roasting drum" className="lp-r kn-drum"/>
      <svg className="lp-r kn-curve" style={delay(1)} viewBox="0 0 520 260" role="img" aria-label="Roast curve from charge to drop over eleven minutes">
        {[60, 120, 180, 240].map(y => <path key={y} d={`M0 ${y}H520`} stroke="#F3EBDD" strokeOpacity=".14"/>)}
        <path className="draw" pathLength={1} d="M40 60C58 200 90 232 120 226C190 205 280 110 356 78C410 60 450 50 480 44" fill="none" stroke="#FF6A1F" strokeWidth="4" strokeLinecap="round"/>
        {stages.map(([name, time, x, y], i) => <g key={name} className="kn-pt" style={delay(i * 3 + 4)}><circle cx={x} cy={y} r="6" fill="#013230" stroke="#F3EBDD" strokeWidth="2"/><text x={i === 0 ? x + 12 : x} y={i === 0 ? y + 4 : y - 13} textAnchor={i === 0 ? 'start' : 'middle'} fill="#F3EBDD">{name} · {time}</text></g>)}
      </svg>
    </div>
    <dl className="lp-r kn-facts">{[['Batch', '12 kg'], ['Drum', '1962'], ['Origin farms', '14'], ['Visits', 'Sat 9 to 2']].map(([k, v]) => <div key={k}><dd>{v}</dd><dt>{k}</dt></div>)}</dl>
  </section>
}

export default function Kiln() {
  const [count, setCount] = useState(0), [last, setLast] = useState('')
  const add = (name: string) => { setCount(n => n + 1); setLast(name) }
  return <LandingRoot site="kn" nav={<KilnNav extra={<BagButton count={count}/>}/>}>
    <KilnHero bare/>
    <div className="kn-strip lp-live ul-vengeance" aria-label="Roasted Mondays, shipped Tuesdays"><FlipText duration={3.4}>ROASTED MONDAYS</FlipText><i>✦</i><FlipText duration={3.4} delay={.5}>SHIPPED TUESDAYS</FlipText></div>
    <Shop onAdd={add}/>
    <Dial/>
    <Subscribe onAdd={add}/>
    <Roastery/>
    <section className="kn-quote"><Photo src="kn/dark" alt="Close view of dark roasted coffee beans"/><p className="lp-r">Good coffee,<br/><em>burnt on purpose.</em></p></section>
    <Footer mark="KILN COFFEE" links={[['Coffee', 'kn-coffee'], ['Subscriptions', 'kn-subs'], ['Roastery', 'kn-roastery']]} photos={[4109752, 12039675, 894695, 11988869, 13737042]}><address>Unit 4, Foundry Yard, Bristol<br/>Open Sat 9 to 2</address></Footer>
    <span className="lp-sr" role="status">{last && `${last} added to bag`}</span>
  </LandingRoot>
}

function BagButton({count}: {count: number}) {
  const go = useGo()
  return <button className="kn-shop" onClick={() => go('kn-coffee')}><ShoppingBag size={14}/>{count ? <span key={count} className="lp-pop">Bag ({count})</span> : <>Shop beans <ArrowRight size={14}/></>}</button>
}
