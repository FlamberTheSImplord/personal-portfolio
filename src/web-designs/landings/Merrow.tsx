import {useState, type CSSProperties} from 'react'
import {Check, Plus} from 'lucide-react'
import {Footer, LandingRoot, Photo, useGo} from './core'
import {Cta, Seg, Stepper} from './controls'
import {MerrowHero, MerrowNav, photo} from './heroes'
import './pages.css'

// Merrow Botanic Garden: a full one-page garden site grown from the reel's hero. Dates and prices are sample data.

const delay = (i: number) => ({'--d': `${i * .055}s`}) as CSSProperties
const intro = 'For six weeks the glasshouses turn pink. Walk through ten thousand orchids, grown by hand and gathered from thirty countries.'.split(' ')
const events = [
  {date: '9 Feb', title: 'Opening night', tag: 'Evening', text: 'First look at the show, with music in the Palm House and the growers on hand.'},
  {date: '16 Feb', title: 'Orchid care clinic', tag: 'Workshop', text: 'Bring a tired plant. Our team will repot it and show you how to keep it flowering.'},
  {date: 'Fridays', title: 'Late at the glasshouses', tag: 'Late opening', text: 'Open until ten, with the houses lit low and a bar under the palms.'},
  {date: '2 Mar', title: 'Drawing from life', tag: 'Class', text: 'A slow morning of botanical drawing. Paper and pencils are provided.'},
]
const species = [
  {name: 'Moth orchid', latin: 'Phalaenopsis hybrid', origin: 'Southeast Asia', bloom: '12 weeks', image: 'mr/moth', alt: 'Bright pink moth orchid in bloom'},
  {name: 'Tiger moth', latin: 'Phalaenopsis hybrid', origin: 'Glasshouse bred', bloom: '10 weeks', image: 'mr/tiger', alt: 'Pink moth orchid with dark striped petals'},
  {name: 'Corsage orchid', latin: 'Cattleya', origin: 'South America', bloom: '4 weeks', image: 'mr/cattleya', alt: 'Pale orchid with a frilled lip on black'},
  {name: 'Reed orchid', latin: 'Epidendrum', origin: 'Central America', bloom: '8 weeks', image: 'mr/reed', alt: 'Round cluster of small pink orchids'},
]
const gardens = [
  {name: 'Orchid House', note: 'Warm, wet, in full bloom', image: 'mr/house-orchid', alt: 'Green plants under a curved glass roof'},
  {name: 'Palm House', note: 'Twenty metres of canopy', image: 'mr/house-palm', alt: 'Palms beneath a white iron glass dome'},
  {name: 'Desert House', note: 'Cacti, stone and dry heat', image: 'mr/house-desert', alt: 'Desert plants along a glasshouse path'},
  {name: 'Fern Dome', note: 'Shade, moss and still air', image: 'mr/house-fern', alt: 'Dense ferns under a glass dome'},
]
const slots = [['week', 'Weekday'], ['end', 'Weekend'], ['late', 'Late Friday']] as const
const slotPrice = {week: 14, end: 18, late: 22} as const

function Species() {
  const [pick, setPick] = useState(0), s = species[pick]
  return <section className="mr-species">
    <div className="lp-r"><span className="lp-kick">In bloom</span><h3 key={s.name} className="lp-pop">{s.name}</h3><em>{s.latin}</em>
      <dl><div><dt>Origin</dt><dd>{s.origin}</dd></div><div><dt>In flower</dt><dd>{s.bloom}</dd></div></dl>
      <div className="mr-pick" role="group" aria-label="Choose an orchid">{species.map((o, i) => <button key={o.name} aria-pressed={i === pick} onClick={() => setPick(i)}><img src={photo(o.image)} alt="" loading="lazy" decoding="async"/><span>{o.name}</span></button>)}</div>
    </div>
    <div className="lp-r mr-bloom" style={delay(2)}><img key={s.name} src={photo(s.image)} alt={s.alt} decoding="async"/></div>
  </section>
}

function Tickets() {
  const [slot, setSlot] = useState<(typeof slots)[number][0]>('end'), [adults, setAdults] = useState(2), [kids, setKids] = useState(0), [saver, setSaver] = useState(0), [done, setDone] = useState(false)
  const base = slotPrice[slot], total = base * adults + base * .5 * kids + base * .8 * saver, count = adults + kids + saver
  const change = (fn: (n: number) => void) => (n: number) => { fn(n); setDone(false) }
  return <section id="mr-visit" className="lp-sec mr-visit">
    <div className="lp-r"><span className="lp-kick">Visit</span><h3>Book your<br/>morning in the warm.</h3>
      <dl className="mr-hours">{[['Daily', '10:00 to 17:30'], ['Fridays', '10:00 to 22:00'], ['Find us', 'Merrow Gate, by the river']].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <Photo src="mr/exterior" alt="Palm tree beside a glasshouse under blue sky" className="mr-outside"/>
    </div>
    <div className="lp-r mr-book-card" style={delay(2)}>
      <Seg label="Session" value={slot} options={slots} onChange={v => { setSlot(v); setDone(false) }}/>
      <Stepper label="Adults" note={`£${base}`} value={adults} onChange={change(setAdults)}/>
      <Stepper label="Children" note={`£${(base * .5).toFixed(0)}`} value={kids} onChange={change(setKids)}/>
      <Stepper label="Concession" note={`£${(base * .8).toFixed(2)}`} value={saver} onChange={change(setSaver)}/>
      <p className="mr-total"><span>{count} {count === 1 ? 'ticket' : 'tickets'}</span><b key={total} className="lp-pop">£{total.toFixed(2)}</b></p>
      {count === 0 ? <small role="alert">Add a ticket first</small> : done ? <span className="lp-done" role="status"><Check size={15}/>Held for you · sample only</span> : <Cta onClick={() => setDone(true)}>Book tickets</Cta>}
    </div>
  </section>
}

export default function Merrow() {
  const go = useGo(), [open, setOpen] = useState(0)
  return <LandingRoot site="mr" nav={<MerrowNav/>}>
    <MerrowHero bare/>
    <section className="mr-intro"><p aria-label={intro.join(' ')}>{intro.map((w, i) => <span key={i} aria-hidden="true" className="lp-r" style={delay(i)}>{w} </span>)}</p></section>
    <Photo src="mr/macro" alt="Close view of magenta orchid petals" className="mr-macro"/>
    <section id="mr-on" className="lp-sec mr-on">
      <div className="lp-head lp-r"><span className="lp-kick">What’s on</span><h3>Six weeks in flower.</h3></div>
      <div className="mr-rows">{events.map((e, i) => <article key={e.title} className="lp-r" data-open={open === i} style={delay(i)}>
        <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><time>{e.date}</time><h4>{e.title}</h4><span>{e.tag}</span><Plus size={18}/></button>
        <div><p>{e.text}</p></div>
      </article>)}</div>
    </section>
    <Species/>
    <section id="mr-gardens" className="lp-sec mr-gardens">
      <div className="lp-head lp-r"><span className="lp-kick">Gardens</span><h3>Four climates under glass.</h3></div>
      <div className="mr-houses">{gardens.map((g, i) => <article key={g.name} className="lp-r" style={delay(i * 2)}><Photo src={g.image} alt={g.alt}/><h4>{g.name}</h4><p>{g.note}</p></article>)}</div>
    </section>
    <Tickets/>
    <section id="mr-members" className="mr-members"><div className="lp-r"><span className="lp-kick">Members</span><h3>Come back when<br/>everything changes.</h3></div><div className="lp-r" style={delay(2)}><p>Free entry all year, early booking and a guest on every visit.</p><b>£58 a year</b><Cta onClick={() => go('mr-visit')}>Join us</Cta></div></section>
    <Footer mark="Merrow" links={[['Visit', 'mr-visit'], ['What’s on', 'mr-on'], ['Gardens', 'mr-gardens'], ['Members', 'mr-members']]} photos={[66181, 12701202, 31514320, 1130081, 386023, 13617457, 29659164, 18408543, 905419, 4788262, 18333619]}><address>Merrow Gate, by the river<br/>Open daily but 25 December</address></Footer>
  </LandingRoot>
}
