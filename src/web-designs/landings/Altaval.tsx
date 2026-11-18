import {useMemo, useState, type CSSProperties} from 'react'
import {Baby, Backpack, Check, RefreshCw, User, type LucideIcon} from 'lucide-react'
import {Footer, LandingRoot, Photo, seeded, useGo} from './core'
import {Cta, Seg} from './controls'
import {AltavalHero, AltavalNav, photo} from './heroes'
import './pages.css'

// Altaval: a full one-page ski resort site grown from the reel's hero. All figures are sample data.

const delay = (i: number) => ({'--d': `${i * .08}s`}) as CSSProperties

const zones = {
  village: {name: 'Village', height: 1450, fresh: 12, base: 64, temp: -3, wind: 8, y: 82},
  mid: {name: 'Mid', height: 2300, fresh: 31, base: 142, temp: -8, wind: 19, y: 54},
  summit: {name: 'Summit', height: 3200, fresh: 48, base: 236, temp: -14, wind: 37, y: 20},
} as const
type Zone = keyof typeof zones

const levels = {
  easy: {name: 'Easy', mark: '●', dash: ''},
  mid: {name: 'Intermediate', mark: '■', dash: '18 7'},
  hard: {name: 'Advanced', mark: '◆', dash: '6 7'},
  expert: {name: 'Expert', mark: '◆◆', dash: '1 9'},
} as const
type Level = keyof typeof levels
const runs: {name: string, level: Level, d: string}[] = [
  {name: 'Long Meadow', level: 'easy', d: 'M60 120C110 220 130 330 190 470'},
  {name: 'Sunny Bowl', level: 'easy', d: 'M690 150C650 240 610 300 560 400'},
  {name: 'Larch Line', level: 'mid', d: 'M150 90C190 200 220 300 300 430'},
  {name: 'Gondola Run', level: 'mid', d: 'M500 50C480 160 510 280 480 440'},
  {name: 'Cornice', level: 'mid', d: 'M700 170C760 260 720 360 640 440'},
  {name: 'Blue Ice', level: 'hard', d: 'M470 60C400 110 360 170 330 250'},
  {name: 'The Chute', level: 'hard', d: 'M520 60C580 120 600 170 640 230'},
  {name: 'Wall of Glass', level: 'expert', d: 'M495 40C500 100 470 150 490 210'},
  {name: 'North Couloir', level: 'expert', d: 'M440 50C340 60 230 70 120 95'},
]
const lifts = ['M478 450 492 46', 'M205 470 130 100', 'M640 445 690 165']

const lessons = [
  {tag: 'First turns', title: 'Beginners', image: 'al/school-beginners', alt: 'Skier on a groomed slope under a blue sky', text: 'Small groups on the village slope, with boots and skis included.', price: 'From €68', points: ['Five to a group', 'Half or full days']},
  {tag: 'Ages 4 to 12', title: 'Snow Kids', image: 'al/school-kids', alt: 'Instructor skiing with two children', text: 'Morning lessons, a hot lunch and an afternoon in the snow garden.', price: 'From €74', points: ['Lunch included', 'Daily progress card']},
  {tag: 'Guided', title: 'Off piste', image: 'al/school-guided', alt: 'Skier crossing a steep untouched slope', text: 'Fresh lines above the treeline with a mountain guide and full safety kit.', price: 'From €145', points: ['Avalanche kit', 'Maximum four riders']},
]
const stays = [
  {name: 'Hotel Cima', kind: 'Ski-in hotel', price: 240, image: 'al/stay-cima', alt: 'Hotels beside a snowy ski slope'},
  {name: 'Larch Lodge', kind: 'Family chalets', price: 185, image: 'al/stay-larch', alt: 'Wooden chalet among snowy pines'},
  {name: 'Refugio 2300', kind: 'Mountain hut', price: 96, image: 'al/stay-refugio', alt: 'Wooden hut alone on a snowfield'},
  {name: 'Casa Valle', kind: 'Village rooms', price: 128, image: 'al/stay-valle', alt: 'Village chalets in fresh snow'},
]

const days = [['1', '1 day'], ['3', '3 days'], ['6', '6 days'], ['season', 'Season']] as const
type Day = typeof days[number][0]
const ages = [['adult', 'Adult'], ['youth', 'Youth'], ['child', 'Child']] as const
type Age = typeof ages[number][0]
const dayStyle: Record<Day, {price: number, title: string, valid: string, pips: number}> = {
  1: {price: 62, title: 'Day', valid: 'Valid 1 day', pips: 1},
  3: {price: 171, title: 'Trip', valid: 'Valid 3 days', pips: 3},
  6: {price: 318, title: 'Week', valid: 'Valid 6 days', pips: 6},
  season: {price: 1140, title: 'Season', valid: '1 Dec to 20 Apr', pips: 0},
}
const ageStyle: Record<Age, {rate: number, name: string, range: string, icon: LucideIcon, code: string}> = {
  adult: {rate: 1, name: 'Adult', range: '18 and over', icon: User, code: 'A'},
  youth: {rate: .8, name: 'Youth', range: 'Ages 12 to 17', icon: Backpack, code: 'Y'},
  child: {rate: .55, name: 'Child', range: 'Ages 4 to 11', icon: Baby, code: 'C'},
}

function Snow() {
  const [zone, setZone] = useState<Zone>('summit'), z = zones[zone]
  return <section id="al-snow" className="lp-sec al-snow">
    <div className="lp-head lp-r"><span className="lp-kick">Snow report</span><h3>Fresh tracks,<br/>updated at dawn.</h3></div>
    <div className="al-snow-grid">
      <div className="lp-r al-depth"><Seg label="Altitude" value={zone} options={[['village', 'Village'], ['mid', 'Mid'], ['summit', 'Summit']]} onChange={setZone}/>
        <p key={zone} className="lp-pop"><b>{z.fresh}</b><span>cm new</span></p>
      </div>
      <dl className="lp-r al-stats" style={delay(1)}>
        {[['Base', `${z.base} cm`], ['Air', `${z.temp} °C`], ['Wind', `${z.wind} km/h`], ['Height', `${z.height} m`]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd key={v} className="lp-pop">{v}</dd></div>)}
      </dl>
      <div className="lp-r al-peak" style={delay(2)}><Photo src="al/peak" alt="Snow-covered mountain peak with a ski lift"/><span className="al-level" style={{top: `${z.y}%`}}><i/>{z.name}</span></div>
    </div>
  </section>
}

function PisteMap() {
  const [level, setLevel] = useState<Level | 'all'>('all'), [run, setRun] = useState<string | null>(null)
  const shown = runs.filter(r => level === 'all' || r.level === level)
  return <section id="al-lifts" className="lp-sec al-map">
    <div className="lp-head lp-r"><span className="lp-kick">Lifts and pistes</span><h3>38 lifts. One big mountain.</h3></div>
    <div className="al-map-grid">
      <div className="lp-r al-filter" role="group" aria-label="Piste difficulty">
        <button aria-pressed={level === 'all'} onClick={() => setLevel('all')}><i>✱</i>All<small>{runs.length}</small></button>
        {(Object.keys(levels) as Level[]).map(id => <button key={id} aria-pressed={level === id} onClick={() => setLevel(id)}><i>{levels[id].mark}</i>{levels[id].name}<small>{runs.filter(r => r.level === id).length}</small></button>)}
        <p aria-live="polite">{run ?? `${shown.length} runs shown`}</p>
      </div>
      <div className="lp-r lp-live al-piste" style={delay(1)}>
        <img src={photo('al/resort')} alt="Aerial view of a ski resort with slopes cut through pine forest" loading="lazy" decoding="async"/>
        <svg viewBox="0 0 900 600" role="img" aria-label="Piste routes drawn over the resort">
          {lifts.map(d => <g key={d}><path d={d} stroke="#0C1B48" strokeWidth="2.5"/><path className="al-chair" d={d} stroke="#F2EA1E" strokeWidth="7" strokeLinecap="round" pathLength={100} strokeDasharray="1.2 15"/></g>)}
          {runs.map(r => { const on = level === 'all' || r.level === level, label = `${levels[r.level].mark} ${r.name}`
            return <g key={r.name} className="al-run" data-on={on} onMouseEnter={() => setRun(label)} onMouseLeave={() => setRun(null)} onClick={() => setRun(label)}>
              <path d={r.d} className="hit"/><path d={r.d} className="case"/><path d={r.d} className="line" strokeDasharray={levels[r.level].dash} data-hot={run === label}/></g> })}
        </svg>
      </div>
    </div>
  </section>
}

function SkiPass({day, age}: {day: Day, age: Age}) {
  const [flipped, setFlipped] = useState(false), d = dayStyle[day], a = ageStyle[age], Icon = a.icon
  const total = Math.round(d.price * a.rate), number = `ALT-${a.code}${day === 'season' ? 'S' : day}-${String(total).padStart(4, '0')}`
  const code = useMemo(() => {
    const r = seeded(total * 97 + 11), size = 21, finder = (x: number, y: number) => [[0, 0], [14, 0], [0, 14]].some(([fx, fy]) => { const i = x - fx, j = y - fy; return i >= -1 && i <= 7 && j >= -1 && j <= 7 })
    const cells: [number, number][] = []
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!finder(x, y) && r() > .52) cells.push([x, y])
    return cells
  }, [total])
  return <div className={`al-card-wrap day-${day} age-${age}`}>
    <span className="al-strap" aria-hidden="true"/>
    <div className={`al-card${flipped ? ' is-flipped' : ''}`}>
      <button className="al-face front" onClick={() => setFlipped(true)} aria-label={`${a.name} ${d.title} pass, ${d.valid}. Show the back`} tabIndex={flipped ? -1 : 0}>
        <span className="al-hole"/>
        <span className="al-art" style={{backgroundImage: `url(${photo('al/peak')})`}}/>
        <span className="al-card-top"><small>Altaval ski pass</small><b key={d.title} className="lp-pop">{d.title}</b></span>
        <span className="al-age" key={age}><i className="lp-pop"><Icon size={26}/></i><span><b>{a.name}</b><small>{a.range}</small></span><em aria-hidden="true">{a.code}</em></span>
        <span className="al-rungs" aria-hidden="true">{ages.map(([id]) => <i key={id} data-on={id === age}/>)}</span>
        <span className="al-card-foot"><span className="al-pips" aria-hidden="true">{d.pips ? Array.from({length: d.pips}, (_, i) => <i key={i}/>) : <u>∞</u>}</span><small>{d.valid}</small></span>
      </button>
      <button className="al-face back" onClick={() => setFlipped(false)} aria-label="Show the front of the pass" tabIndex={flipped ? 0 : -1}>
        <span className="al-hole"/>
        <svg viewBox="-1 -1 23 23" aria-hidden="true"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/>{[[0, 0], [14, 0], [0, 14]].map(([x, y]) => <g key={x + y * 2}><rect x={x} y={y} width="7" height="7"/><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff"/><rect x={x + 2} y={y + 2} width="3" height="3"/></g>)}{code.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1"/>)}</svg>
        <small className="al-sample">Sample code · not scannable</small>
        <dl><div><dt>Pass</dt><dd>{number}</dd></div><div><dt>Rider</dt><dd>{a.name}</dd></div><div><dt>Valid</dt><dd>{d.valid}</dd></div><div><dt>Lifts</dt><dd>All 38</dd></div></dl>
      </button>
    </div>
    <button className="al-flip" onClick={() => setFlipped(f => !f)}><RefreshCw size={14}/>Flip pass</button>
  </div>
}

function Passes() {
  const [day, setDay] = useState<Day>('3'), [age, setAge] = useState<Age>('adult'), [added, setAdded] = useState(0)
  const total = Math.round(dayStyle[day].price * ageStyle[age].rate)
  return <section id="al-passes" className="al-passes">
    <div className="lp-r al-buy">
      <span className="lp-kick">Ski passes</span><h3>Pick your days.</h3>
      <Seg label="Days" value={day} options={days} onChange={setDay}/><Seg label="Age" value={age} options={ages} onChange={setAge}/>
      <p key={total} className="lp-pop"><small>€</small>{total.toLocaleString('en-GB')}</p>
      <Cta onClick={() => setAdded(n => n + 1)}>Add pass</Cta>
      {added > 0 && <span className="lp-done" role="status"><Check size={15}/>{added} in basket · sample only</span>}
    </div>
    <div className="lp-r" style={delay(1)}><SkiPass day={day} age={age}/></div>
  </section>
}

function AlertForm() {
  const [mail, setMail] = useState(''), [sent, setSent] = useState(false), [error, setError] = useState(false)
  return <form noValidate onSubmit={e => { e.preventDefault(); const ok = /.+@.+\..+/.test(mail); setError(!ok); setSent(ok) }}>
    <label className="lp-sr" htmlFor="al-mail">Powder alerts email</label>
    <div><input id="al-mail" type="email" placeholder="Powder alerts: your email" value={mail} aria-invalid={error} onChange={e => { setMail(e.target.value); setError(false); setSent(false) }}/><button>{sent ? <Check size={16}/> : 'Join'}</button></div>
    {error && <small role="alert">Enter a valid email</small>}
  </form>
}

export default function Altaval() {
  const go = useGo()
  return <LandingRoot site="al" nav={<AltavalNav/>}>
    <AltavalHero bare/>
    <div className="lp-tape lp-live" aria-hidden="true"><div>{[0, 1].map(k => <span key={k}>{['Powder day', '64 pistes', '38 lifts', '3200 m', '142 days of snow'].map(t => <b key={t}>{t}<i>✱</i></b>)}</span>)}</div></div>
    <Snow/>
    <PisteMap/>
    <section id="al-school" className="lp-sec al-school">
      <div className="lp-head lp-r"><span className="lp-kick">Ski school</span><h3>Everyone starts somewhere.</h3></div>
      <div className="al-lessons">{lessons.map((l, i) => <article key={l.title} className="lp-r" style={delay(i)} tabIndex={0}>
        <Photo src={l.image} alt={l.alt}/><div className="al-lesson"><span>{l.tag}</span><h4>{l.title}</h4><p>{l.text}</p><ul>{l.points.map(p => <li key={p}><Check size={14}/>{p}</li>)}</ul><b>{l.price}</b></div>
      </article>)}</div>
    </section>
    <section id="al-stay" className="lp-sec al-stay">
      <div className="lp-head lp-r"><span className="lp-kick">Stay</span><h3>Doors open onto the snow.</h3></div>
      <div className="al-stays" tabIndex={0} aria-label="Places to stay">{stays.map((s, i) => <article key={s.name} className="lp-r" style={delay(i)}><Photo src={s.image} alt={s.alt}/><h4>{s.name}</h4><p>{s.kind}</p><button onClick={() => go('al-passes')}>From €{s.price}</button></article>)}</div>
    </section>
    <Passes/>
    <Footer mark="ALTAVAL" links={[['Lifts', 'al-lifts'], ['Ski school', 'al-school'], ['Stay', 'al-stay'], ['Snow report', 'al-snow'], ['Passes', 'al-passes']]} photos={[937692, 8532484, 15835820, 8412597, 6433383, 9283159, 358046, 8412595, 723177, 235642, 311066]}><AlertForm/></Footer>
  </LandingRoot>
}
