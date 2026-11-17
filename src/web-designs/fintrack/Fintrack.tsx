import {useEffect, useMemo, useRef, useState, type CSSProperties, type DragEvent, type PointerEvent, type ReactNode} from 'react'
import {AnimatePresence, LayoutGroup, motion as m, MotionConfig, useMotionValueEvent, useReducedMotion, useSpring} from 'motion/react'
import {
  ArrowUp, ArrowUpRight, Banknote, BarChart3, Calendar, ChevronDown, ChevronsLeft, CircleHelp, ClipboardList, CreditCard, FileText, Filter,
  Fuel, Gauge, Home, Hourglass, Landmark, LayoutGrid, Lightbulb, LineChart, Menu, MoreHorizontal, PiggyBank, Plane, Plus, Receipt, RefreshCw,
  Search, Settings, Share2, Shield, ShoppingBag, ShoppingCart, Sprout, Target, Upload, Wallet, X, type LucideIcon,
} from 'lucide-react'
import {Enter} from '../../playground/SampleSite'
import {Loader} from '../../playground/SampleSite'
import {presetById, type LoaderVariant, type MotionPreset, type TogglePreset} from '../../playground/presets'
import {ThemeToggle} from '../../playground/Visuals'
import type {Mode} from '../../playground/SampleSite'
import {categories, columns, kpis, money, money2, seed, settled, tone, type ColumnId, type Entry} from './data'
import '../../playground/loaders.css'
import './fintrack.css'

// Fintrack: a working budget dashboard recreated from yasrinoori's "After" shot. Every control changes local
// sample data. Colours, radius and fonts come from CSS variables, so the Playground can restyle it.
// Motion defaults to snappy presets sampled from the UI Library: Kinetics "Snappy spring" for entrances,
// Microkit-style press on buttons, and Motion layout springs when cards move.

type Tab = 'summary' | 'board' | 'transactions' | 'goals'
type Slice = 'all' | 'income' | 'expenses' | 'pending'
type Look = 'open' | 'overdue' | 'settled'
const tabs: {id: Tab, name: string, icon: LucideIcon}[] = [
  {id: 'summary', name: 'Summary', icon: FileText}, {id: 'board', name: 'Budget Board', icon: Sprout},
  {id: 'transactions', name: 'Transactions', icon: Receipt}, {id: 'goals', name: 'Goals', icon: Target},
]
const columnIcon: Record<ColumnId, LucideIcon> = {bills: Receipt, daily: ShoppingCart, savings: PiggyBank, income: LineChart}
const categoryIcon: Record<string, LucideIcon> = {
  Housing: Home, Utilities: Lightbulb, Insurance: Shield, Subscriptions: RefreshCw, Groceries: ShoppingBag, Transport: Fuel, Dining: ShoppingBag,
  Safety: Shield, Travel: Plane, Purchase: ShoppingBag, Salary: Banknote, Freelance: Wallet, Invoice: FileText,
}
const snappy = presetById('motion', 'kinetics-snappy')!
const layoutSpring = {type: 'spring', stiffness: 700, damping: 42, mass: .7} as const
const press = {scale: .96}
const STORE = 'fintrack-demo-v1'

const load = (persist: boolean): Entry[] => {
  if (!persist) return seed
  try { const raw = localStorage.getItem(STORE); return raw ? JSON.parse(raw) as Entry[] : seed } catch { return seed }
}

/** Page wrapper used on Web designs: reset + replay above a browser window. */
export default function FintrackDemo({frame}: {frame: (child: ReactNode, replay: () => void) => ReactNode}) {
  const [run, setRun] = useState(0), [reset, setReset] = useState(0)
  return <>
    <div className="ft-toolbar">
      <span>Drag cards between columns, click a status to change it, or add your own.</span>
      <div><m.button whileTap={press} onClick={() => { try { localStorage.removeItem(STORE) } catch {} setReset(n => n + 1) }}>Reset data</m.button>
        <m.button whileTap={press} onClick={() => setRun(n => n + 1)}>Replay entrance <ArrowUpRight size={13}/></m.button></div>
    </div>
    {frame(<FintrackApp key={`${run}-${reset}`} persist/>, () => setRun(n => n + 1))}
  </>
}

export function FintrackApp({persist = false, move = snappy, spin = 'ring', toggle, mode, onMode}: {persist?: boolean, move?: MotionPreset, spin?: LoaderVariant, toggle?: TogglePreset, mode?: Mode, onMode?: (m: Mode) => void}) {
  const [entries, setEntries] = useState<Entry[]>(() => load(persist))
  const [tab, setTab] = useState<Tab>('board'), [slice, setSlice] = useState<Slice>('all'), [looks, setLooks] = useState<Look[]>([])
  const [query, setQuery] = useState(''), [adding, setAdding] = useState<ColumnId | null>(null), [collapsed, setCollapsed] = useState(false)
  const [drawer, setDrawer] = useState(false), [toast, setToast] = useState<string | null>(null), [busy, setBusy] = useState(false)
  const root = useRef<HTMLDivElement>(null), search = useRef<HTMLInputElement>(null)

  useEffect(() => { if (persist) try { localStorage.setItem(STORE, JSON.stringify(entries)) } catch {} }, [entries, persist])
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 1800); return () => clearTimeout(id) }, [toast])
  // ⌘K / Ctrl+K focuses search while the dashboard is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return
      const b = root.current?.getBoundingClientRect()
      if (!b || b.bottom < 0 || b.top > innerHeight) return
      e.preventDefault(); search.current?.focus()
    }
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey)
  }, [])

  const k = kpis(entries)
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return entries.filter(e => (!q || `${e.title} ${e.category} ${e.note} ${e.status}`.toLowerCase().includes(q))
      && (!looks.length || looks.some(l => l === 'overdue' ? e.status === 'Overdue' : l === 'settled' ? settled.has(e.status) : !settled.has(e.status) && e.status !== 'Overdue')))
  }, [entries, query, looks])

  const update = (id: string, patch: Partial<Entry>) => setEntries(list => list.map(e => e.id === id ? {...e, ...patch} : e))
  const remove = (id: string) => { setEntries(list => list.filter(e => e.id !== id)); setToast('Removed') }
  const moveTo = (id: string, column: ColumnId) => setEntries(list => {
    const e = list.find(x => x.id === id)
    if (!e || e.column === column) return list
    const statuses = columns.find(c => c.id === column)!.statuses
    const next: Entry = {...e, column, status: statuses.includes(e.status) ? e.status : statuses[0], category: categories[column].includes(e.category) ? e.category : categories[column][0],
      ...(column === 'savings' ? {target: e.target ?? Math.max(e.amount * 2, 100), deadline: e.deadline ?? "Dec '26"} : {})}
    return [...list.filter(x => x.id !== id), next]
  })
  const add = (column: ColumnId, title: string, amount: number, category: string) => {
    // New bills start Due and new goals In Progress; expenses and income count as settled straight away.
    const status = columns.find(c => c.id === column)!.statuses[column === 'savings' || column === 'bills' ? 1 : 0]
    setEntries(list => [...list, {id: `n${Date.now()}`, column, category, title, amount, status, date: column === 'savings' ? '' : 'Today', note: 'Added just now',
      ...(column === 'savings' ? {target: amount * 4, deadline: "Dec '26"} : {})}])
    setAdding(null); setToast(`${title} added`)
  }
  const quickAdd = () => { if (busy) return; setBusy(true); setTimeout(() => { setBusy(false); setTab('board'); setAdding('daily') }, 380) }
  const openSlice = (s: Slice) => { setSlice(s); setTab('transactions'); setDrawer(false) }
  const share = () => { navigator.clipboard?.writeText(location.href).catch(() => {}); setToast('Link copied') }

  let n = 0
  return <MotionConfig reducedMotion="user" transition={layoutSpring}>
    <div className={`ft${collapsed ? ' is-collapsed' : ''}${drawer ? ' has-drawer' : ''}`} ref={root}>
      <Sidebar counts={k.counts} tab={tab} slice={slice} onTab={t => { setTab(t); setDrawer(false) }} onSlice={openSlice} collapsed={collapsed} onCollapse={() => setCollapsed(c => !c)}/>
      {drawer && <button className="ft-scrim" aria-label="Close menu" onClick={() => setDrawer(false)}/>}
      <div className="ft-main">
        <header className="ft-top">
          <button className="ft-icon-btn ft-menu" aria-label="Open menu" onClick={() => setDrawer(true)}><Menu size={16}/></button>
          <span className="ft-crumbs"><LayoutGrid size={14}/>Finance<ChevronDown size={12} style={{rotate: '-90deg'}}/><b><Gauge size={14}/>Overview</b></span>
          <label className="ft-search"><Search size={14}/><input ref={search} type="search" placeholder="Search transactions…" aria-label="Search transactions" value={query} onChange={e => setQuery(e.target.value)}/><kbd>⌘K</kbd></label>
          <div className="ft-top-actions">
            {toggle && mode && onMode && <ThemeToggle variant={toggle.variant} mode={mode} onChange={onMode}/>}
            <m.button whileTap={press} className="ft-text-btn" onClick={() => setToast('Sample data only: nothing to export')}><Upload size={14}/><span>Export</span></m.button>
            <m.button whileTap={press} className="ft-text-btn" onClick={share}><Share2 size={14}/><span>Share</span></m.button>
            <m.button whileTap={press} className={`ft-primary${busy ? ' is-busy' : ''}`} onClick={quickAdd} aria-busy={busy}><span className="ft-primary-label"><Plus size={14}/>Add Transaction</span>{busy && <span className="ft-primary-loader"><Loader variant={spin}/></span>}</m.button>
          </div>
        </header>

        <section className="ft-body">
          <Enter move={move} index={n++} className="ft-head"><div><h1>Financial overview</h1><p>April 2026 income, expenses, savings and goals</p></div>
            <span className="ft-people" aria-label="Shared with 5 people">{['AK', 'JM', 'RS'].map((x, i) => <i key={x} style={{'--h': i * 70 + 200} as CSSProperties}>{x}</i>)}<b>+2</b></span></Enter>

          <div className="ft-kpis">
            <Enter move={move} index={n++}><Kpi icon={Wallet} label="Balance overview" chip={<span className="ft-up"><ArrowUp size={11}/>8.2%</span>} value={k.balance} sub="Total Balance" art={<Dots/>}/></Enter>
            <Enter move={move} index={n++}><Kpi icon={Calendar} label="Monthly income" chip={<MoreHorizontal size={16} className="ft-muted"/>} value={k.income} sub={<><b className="ft-pos">+3.1%</b> vs last month</>} art={<Bars/>}/></Enter>
            <Enter move={move} index={n++}><Kpi icon={CreditCard} label="Spending" chip={<span className="ft-round"><ArrowUpRight size={12}/></span>} value={k.spent} sub={<><b>{k.share}%</b> of income spent</>} art={<Meter value={k.share}/>}/></Enter>
          </div>

          <Enter move={move} index={n++} className="ft-tabs-row">
            <div className="ft-tabs" role="tablist" aria-label="My Finances">
              <h2>My Finances</h2>
              {tabs.map(t => <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
                {tab === t.id && <m.span layoutId="ft-tab" className="ft-tab-pill" transition={{type: 'spring', stiffness: 650, damping: 40}}/>}<t.icon size={15}/>{t.name}</button>)}
            </div>
            <div className="ft-tools"><FilterMenu looks={looks} onChange={setLooks}/><span className="ft-chip-btn"><Calendar size={15}/>2026</span></div>
          </Enter>

          <AnimatePresence mode="wait" initial={false}>
            <m.div key={tab} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -4}} transition={{duration: .16, ease: [.2, .8, .2, 1]}}>
              {tab === 'board' && <Board entries={visible} move={move} start={n} adding={adding} setAdding={setAdding} add={add} update={update} remove={remove} moveTo={moveTo}/>}
              {tab === 'transactions' && <Transactions entries={visible} slice={slice} setSlice={setSlice} update={update}/>}
              {tab === 'goals' && <Goals entries={visible} update={update} onAdd={() => { setTab('board'); setAdding('savings') }}/>}
              {tab === 'summary' && <Summary entries={entries} k={k}/>}
            </m.div>
          </AnimatePresence>
        </section>
        <AnimatePresence>{toast && <m.div className="ft-toast" role="status" initial={{opacity: 0, y: 12, scale: .96}} animate={{opacity: 1, y: 0, scale: 1}} exit={{opacity: 0, y: 8}} transition={{type: 'spring', stiffness: 600, damping: 34}}>{toast}</m.div>}</AnimatePresence>
      </div>
    </div>
  </MotionConfig>
}

/* ── Sidebar ── */
function Sidebar({counts, tab, slice, onTab, onSlice, collapsed, onCollapse}: {counts: {income: number, expenses: number, pending: number}, tab: Tab, slice: Slice, onTab: (t: Tab) => void, onSlice: (s: Slice) => void, collapsed: boolean, onCollapse: () => void}) {
  const [open, setOpen] = useState({tx: true, acc: true, plan: true})
  const item = (key: string, Icon: LucideIcon, label: string, on: boolean, act?: () => void, extra?: ReactNode, tile?: string) =>
    <button key={key} className={`ft-nav${on ? ' is-on' : ''}${act ? '' : ' is-inert'}`} onClick={act} title={collapsed ? label : undefined} aria-current={on ? 'page' : undefined}>
      {on && <m.span layoutId="ft-nav" className="ft-nav-pill" transition={{type: 'spring', stiffness: 650, damping: 42}}/>}
      <span className={tile ? `ft-tile ft-tile-${tile}` : 'ft-nav-icon'}><Icon size={tile ? 13 : 16}/></span><span className="ft-nav-label">{label}</span>{extra}</button>
  const group = (key: keyof typeof open, label: string, children: ReactNode) => <div className="ft-group">
    <button className="ft-group-head" onClick={() => setOpen(o => ({...o, [key]: !o[key]}))} aria-expanded={open[key]}><span>{label}</span><ChevronDown size={13} style={{rotate: open[key] ? '0deg' : '-90deg', transition: 'rotate .18s'}}/></button>
    <AnimatePresence initial={false}>{open[key] && <m.div className="ft-group-body" initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}} exit={{height: 0, opacity: 0}} transition={{duration: .18, ease: [.2, .8, .2, 1]}}>{children}</m.div>}</AnimatePresence>
  </div>
  const count = (v: number) => <m.i key={v} className="ft-count" initial={{y: -6, opacity: 0}} animate={{y: 0, opacity: 1}}>{v}</m.i>
  const txOn = tab === 'transactions'
  return <aside className="ft-side" aria-label="Fintrack navigation">
    <div className="ft-brand"><span className="ft-logo" aria-hidden="true">{Array.from({length: 8}, (_, i) => <i key={i} style={{rotate: `${i * 45}deg`}}/>)}</span><b>fintrack</b>
      <m.button whileTap={press} className="ft-icon-btn ft-collapse" onClick={onCollapse} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}><ChevronsLeft size={14} style={{rotate: collapsed ? '180deg' : '0deg', transition: 'rotate .2s'}}/></m.button></div>
    <nav>
      {item('dash', LayoutGrid, 'Dashboard', tab === 'board' || tab === 'summary', () => onTab('board'))}
      {item('analytics', BarChart3, 'Analytics', false, () => onTab('summary'))}
      {group('tx', 'Transactions', <>
        {item('all', ClipboardList, 'All Transactions', txOn && slice === 'all', () => onSlice('all'))}
        <div className="ft-sub">
          {item('inc', Landmark, 'Income', txOn && slice === 'income', () => onSlice('income'), count(counts.income))}
          {item('exp', Upload, 'Expenses', txOn && slice === 'expenses', () => onSlice('expenses'), count(counts.expenses))}
          {item('pen', Hourglass, 'Pending', txOn && slice === 'pending', () => onSlice('pending'), count(counts.pending))}
        </div>
        {item('rec', Calendar, 'Recurring Bills', false)}
      </>)}
      {group('acc', 'Accounts', <>
        {item('cards', CreditCard, 'Cards & Bank', false, undefined, <i className="ft-dot" aria-label="New activity"/>, 'ink')}
        {item('sav', PiggyBank, 'Savings', false, undefined, undefined, 'blue')}
        {item('inv', LineChart, 'Investments', false, undefined, undefined, 'orange')}
        {item('goals', Target, 'Goals', tab === 'goals', () => onTab('goals'), undefined, 'green')}
      </>)}
      {group('plan', 'Planning', <>
        {item('sg', Target, 'Savings Goals', false, () => onTab('goals'))}
        {item('bl', Hourglass, 'Budget Limits', false)}
      </>)}
    </nav>
    <div className="ft-side-foot">
      {item('help', CircleHelp, 'Help Center', false)}
      {item('set', Settings, 'Settings', false)}
      <div className="ft-user"><span>SL</span><div><b>Sam Lee</b><small>sam@fintrack.example</small></div></div>
    </div>
  </aside>
}

/* ── KPI cards ── */
function Count({value}: {value: number}) {
  const spring = useSpring(value, {stiffness: 420, damping: 40}), [shown, setShown] = useState(value), still = useReducedMotion()
  useEffect(() => { still ? setShown(value) : spring.set(value) }, [value, spring, still])
  useMotionValueEvent(spring, 'change', v => setShown(Math.round(v)))
  return <>{money(shown)}</>
}
function Kpi({icon: Icon, label, chip, value, sub, art}: {icon: LucideIcon, label: string, chip: ReactNode, value: number, sub: ReactNode, art: ReactNode}) {
  return <article className="ft-kpi ft-card" onPointerMove={track}><header><span><Icon size={15}/>{label}</span>{chip}</header><strong><Count value={value}/></strong><p>{sub}</p><div className="ft-kpi-art">{art}</div></article>
}
const Dots = () => <svg viewBox="0 0 360 40" className="ft-dots" aria-hidden="true">{Array.from({length: 40}, (_, c) => { const h = Math.round(2 + Math.abs(Math.sin(c * .7) * 3) + (c > 15 && c < 22 ? 2 : 0)); return Array.from({length: h}, (_, r) => <circle key={`${c}-${r}`} cx={c * 9 + 4} cy={36 - r * 7} r="1.8" className={c > 15 && c < 22 ? 'hot' : ''} style={{animationDelay: `${c * 12}ms`}}/>) })}</svg>
const Bars = () => <svg viewBox="0 0 360 44" className="ft-bars" aria-hidden="true">{Array.from({length: 46}, (_, i) => { const peak = i > 26 && i < 42, h = peak ? 10 + Math.abs(Math.sin(i * 1.3) * 28) : 5 + (i % 3); return <rect key={i} x={i * 7.8} y={44 - h} width="2" height={h} rx="1" className={peak ? 'hot' : ''} style={{animationDelay: `${i * 8}ms`}}/> })}</svg>
const Meter = ({value}: {value: number}) => <div className="ft-meter" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label="Share of income spent"><m.i animate={{width: `${Math.min(value, 100)}%`}} initial={{width: 0}} transition={{type: 'spring', stiffness: 260, damping: 30}}/></div>

/** Pointer position for the Playground's spotlight style. */
function track(e: PointerEvent<HTMLElement>) { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - b.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - b.top}px`) }

/* ── Filter ── */
function FilterMenu({looks, onChange}: {looks: Look[], onChange: (l: Look[]) => void}) {
  const [open, setOpen] = useState(false)
  const opts: [Look, string][] = [['overdue', 'Overdue'], ['open', 'Due or pending'], ['settled', 'Paid or cleared']]
  return <div className="ft-filter">
    <m.button whileTap={press} className={`ft-chip-btn${looks.length ? ' is-on' : ''}`} onClick={() => setOpen(o => !o)} aria-expanded={open}><Filter size={15}/>Filter{looks.length ? <i>{looks.length}</i> : null}</m.button>
    <AnimatePresence>{open && <m.div className="ft-pop" initial={{opacity: 0, y: -4, scale: .97}} animate={{opacity: 1, y: 0, scale: 1}} exit={{opacity: 0, y: -4, scale: .97}} transition={{type: 'spring', stiffness: 700, damping: 38}}>
      {opts.map(([id, label]) => <label key={id}><input type="checkbox" checked={looks.includes(id)} onChange={() => onChange(looks.includes(id) ? looks.filter(l => l !== id) : [...looks, id])}/><span className={`ft-tone ft-${id === 'overdue' ? 'red' : id === 'open' ? 'amber' : 'green'}`}/>{label}</label>)}
      {looks.length > 0 && <button onClick={() => onChange([])}>Clear</button>}
    </m.div>}</AnimatePresence>
  </div>
}

/* ── Budget board ── */
function Board({entries, move, start, adding, setAdding, add, update, remove, moveTo}: {entries: Entry[], move: MotionPreset, start: number, adding: ColumnId | null, setAdding: (c: ColumnId | null) => void, add: (c: ColumnId, t: string, a: number, cat: string) => void, update: (id: string, p: Partial<Entry>) => void, remove: (id: string) => void, moveTo: (id: string, c: ColumnId) => void}) {
  const [over, setOver] = useState<ColumnId | null>(null)
  const drop = (e: DragEvent, column: ColumnId) => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id) moveTo(id, column); setOver(null) }
  return <LayoutGroup id="ft-board"><div className="ft-board">
    {columns.map((c, ci) => {
      const list = entries.filter(e => e.column === c.id), Icon = columnIcon[c.id]
      return <Enter key={c.id} move={move} index={start + ci} className={`ft-col${over === c.id ? ' is-over' : ''}`}>
        <section aria-label={c.name} onDragOver={e => { e.preventDefault(); setOver(c.id) }} onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOver(null) }} onDrop={e => drop(e, c.id)}>
          <header><Icon size={16}/><b>{c.name}</b><m.i key={list.length} initial={{scale: .6}} animate={{scale: 1}} className="ft-count">{list.length}</m.i><MoreHorizontal size={16} className="ft-muted"/></header>
          <AnimatePresence initial={false}>
            {list.map(e => <BoardCard key={e.id} entry={e} update={update} remove={remove} moveTo={moveTo}/>)}
          </AnimatePresence>
          <AnimatePresence initial={false}>{adding === c.id
            ? <AddForm key="form" column={c.id} onCancel={() => setAdding(null)} onSave={(t, a, cat) => add(c.id, t, a, cat)}/>
            : <m.button key="add" layout whileTap={press} className="ft-add" onClick={() => setAdding(c.id)}><Plus size={13}/>{c.add}</m.button>}
          </AnimatePresence>
        </section>
      </Enter>
    })}
  </div></LayoutGroup>
}

function StatusChip({entry, update}: {entry: Entry, update: (id: string, p: Partial<Entry>) => void}) {
  const statuses = columns.find(c => c.id === entry.column)!.statuses
  const next = statuses[(statuses.indexOf(entry.status) + 1) % statuses.length]
  return <m.button whileTap={{scale: .9}} className={`ft-status ft-${tone[entry.status] ?? 'amber'}`} onClick={() => update(entry.id, {status: next})} title={`Mark as ${next}`} aria-label={`Status ${entry.status}. Change to ${next}`}>
    <AnimatePresence mode="popLayout" initial={false}><m.span key={entry.status} initial={{y: 8, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -8, opacity: 0}} transition={{type: 'spring', stiffness: 700, damping: 36}}>{entry.status}</m.span></AnimatePresence>
  </m.button>
}

function BoardCard({entry: e, update, remove, moveTo}: {entry: Entry, update: (id: string, p: Partial<Entry>) => void, remove: (id: string) => void, moveTo: (id: string, c: ColumnId) => void}) {
  const [menu, setMenu] = useState(false), [dragging, setDragging] = useState(false)
  const Cat = categoryIcon[e.category] ?? Receipt, pct = e.target ? Math.min(100, e.amount / e.target * 100) : 0
  return <m.article layout layoutId={e.id} className={`ft-item ft-card${dragging ? ' is-dragging' : ''}`} onPointerMove={track}
    initial={{opacity: 0, scale: .94, y: 6}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: .94, transition: {duration: .12}}}
    whileHover={{y: -2}} draggable onDragStartCapture={ev => { ev.dataTransfer.setData('text/plain', e.id); ev.dataTransfer.effectAllowed = 'move'; setDragging(true) }} onDragEndCapture={() => setDragging(false)}>
    <header><span className="ft-cat"><Cat size={13}/>{e.category}</span><StatusChip entry={e} update={update}/></header>
    <h4>{e.title}</h4>
    {e.column === 'savings' && e.target ? <>
      <p className="ft-amount"><Count value={e.amount}/><small> /of {money(e.target)}</small></p>
      <div className={`ft-progress ft-${tone[e.status] ?? 'amber'}`}><m.i animate={{width: `${pct}%`}} initial={false}/></div>
      <footer><span><Calendar size={12}/>Target {e.deadline}</span><span>{money(Math.max(0, e.target - e.amount))} left</span></footer>
    </> : <>
      <p className="ft-amount">{e.column === 'income' ? money2(e.amount, true) : money2(e.amount)}</p>
      <footer><span><Calendar size={12}/>{e.date}</span><span>{e.note}</span></footer>
    </>}
    <button className="ft-more" onClick={() => setMenu(o => !o)} aria-label={`Actions for ${e.title}`} aria-expanded={menu}><MoreHorizontal size={14}/></button>
    <AnimatePresence>{menu && <m.div className="ft-pop ft-card-menu" initial={{opacity: 0, scale: .95, y: -4}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: .95}} transition={{type: 'spring', stiffness: 700, damping: 38}} onMouseLeave={() => setMenu(false)}>
      <small>Move to</small>
      {columns.filter(c => c.id !== e.column).map(c => <button key={c.id} onClick={() => { setMenu(false); moveTo(e.id, c.id) }}>{c.name}</button>)}
      <button className="ft-danger" onClick={() => remove(e.id)}><X size={12}/>Remove</button>
    </m.div>}</AnimatePresence>
  </m.article>
}

function AddForm({column, onSave, onCancel}: {column: ColumnId, onSave: (t: string, a: number, cat: string) => void, onCancel: () => void}) {
  const [title, setTitle] = useState(''), [amount, setAmount] = useState(''), [cat, setCat] = useState(categories[column][0]), [error, setError] = useState('')
  const save = () => {
    const a = Number(amount)
    if (!title.trim()) return setError('Add a name')
    if (!(a > 0)) return setError('Enter an amount above 0')
    onSave(title.trim(), Math.round(a * 100) / 100, cat)
  }
  return <m.form layout className="ft-item ft-card ft-form" initial={{opacity: 0, scale: .96}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: .96, transition: {duration: .1}}}
    onSubmit={e => { e.preventDefault(); save() }} onKeyDown={e => { if (e.key === 'Escape') onCancel() }}>
    <input autoFocus placeholder={column === 'income' ? 'Client payment' : column === 'savings' ? 'New bike' : 'Gym membership'} aria-label="Name" value={title} onChange={e => { setTitle(e.target.value); setError('') }}/>
    <div><input inputMode="decimal" placeholder="0.00" aria-label="Amount" value={amount} onChange={e => { setAmount(e.target.value.replace(/[^\d.]/g, '')); setError('') }}/>
      <select aria-label="Category" value={cat} onChange={e => setCat(e.target.value)}>{categories[column].map(c => <option key={c}>{c}</option>)}</select></div>
    {error && <p className="ft-error" role="alert">{error}</p>}
    <div className="ft-form-actions"><button type="button" onClick={onCancel}>Cancel</button><m.button whileTap={press} type="submit" className="ft-primary">Save</m.button></div>
  </m.form>
}

/* ── Transactions ── */
function Transactions({entries, slice, setSlice, update}: {entries: Entry[], slice: Slice, setSlice: (s: Slice) => void, update: (id: string, p: Partial<Entry>) => void}) {
  const [sort, setSort] = useState<{by: 'title' | 'amount', dir: 1 | -1}>({by: 'amount', dir: -1})
  const rows = entries.filter(e => e.column !== 'savings' && (slice === 'all' || (slice === 'income' ? e.column === 'income' : slice === 'expenses' ? e.column !== 'income' : !settled.has(e.status))))
    .sort((a, b) => (sort.by === 'amount' ? a.amount - b.amount : a.title.localeCompare(b.title)) * sort.dir)
  const head = (by: 'title' | 'amount', label: string) => <button onClick={() => setSort(s => ({by, dir: s.by === by ? (s.dir * -1) as 1 | -1 : -1}))} aria-sort={sort.by === by ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>{label}{sort.by === by && <ArrowUp size={11} style={{rotate: sort.dir === 1 ? '0deg' : '180deg'}}/>}</button>
  return <div className="ft-table-wrap">
    <div className="ft-slices" role="group" aria-label="Show">{(['all', 'income', 'expenses', 'pending'] as Slice[]).map(s => <button key={s} aria-pressed={slice === s} onClick={() => setSlice(s)}>{s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)}</button>)}</div>
    <div className="ft-table" role="table">
      <div className="ft-row ft-row-head" role="row"><span role="columnheader">{head('title', 'Transaction')}</span><span role="columnheader">Category</span><span role="columnheader">Date</span><span role="columnheader">Status</span><span role="columnheader" className="ft-right">{head('amount', 'Amount')}</span></div>
      <AnimatePresence initial={false}>{rows.map(e => <m.div layout key={e.id} className="ft-row" role="row" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <span role="cell"><b>{e.title}</b></span><span role="cell" className="ft-muted">{e.category}</span><span role="cell" className="ft-muted">{e.date}</span>
        <span role="cell"><StatusChip entry={e} update={update}/></span><span role="cell" className={`ft-right ${e.column === 'income' ? 'ft-pos' : ''}`}>{e.column === 'income' ? money2(e.amount, true) : `−${money2(e.amount)}`}</span>
      </m.div>)}</AnimatePresence>
      {!rows.length && <p className="ft-empty">No transactions match.</p>}
    </div>
  </div>
}

/* ── Goals ── */
function Goals({entries, update, onAdd}: {entries: Entry[], update: (id: string, p: Partial<Entry>) => void, onAdd: () => void}) {
  const goals = entries.filter(e => e.column === 'savings')
  const top = (e: Entry, by: number) => { const amount = Math.min(e.target ?? Infinity, e.amount + by); update(e.id, {amount, status: e.target && amount / e.target >= .9 ? 'Almost There' : e.status}) }
  return <div className="ft-goals">
    {goals.map(e => { const pct = e.target ? Math.round(e.amount / e.target * 100) : 0, Cat = categoryIcon[e.category] ?? Target
      return <m.article layout key={e.id} className="ft-goal ft-card" onPointerMove={track}>
        <header><span className="ft-cat"><Cat size={13}/>{e.category}</span><StatusChip entry={e} update={update}/></header>
        <h4>{e.title}</h4>
        <div className="ft-ring" style={{'--p': pct} as CSSProperties}><m.b key={pct} initial={{scale: .85}} animate={{scale: 1}}>{pct}%</m.b></div>
        <p className="ft-amount"><Count value={e.amount}/><small> /of {money(e.target ?? 0)}</small></p>
        <div className="ft-goal-actions">{[100, 500].map(by => <m.button key={by} whileTap={press} onClick={() => top(e, by)} disabled={pct >= 100}>+{money(by)}</m.button>)}</div>
      </m.article> })}
    <m.button whileTap={press} className="ft-add ft-goal-add" onClick={onAdd}><Plus size={14}/>Add goal</m.button>
  </div>
}

/* ── Summary ── */
function Summary({entries, k}: {entries: Entry[], k: ReturnType<typeof kpis>}) {
  const spend = entries.filter(e => (e.column === 'bills' || e.column === 'daily'))
  const byCat = Object.entries(spend.reduce<Record<string, number>>((m, e) => ({...m, [e.category]: (m[e.category] ?? 0) + e.amount}), {})).sort((a, b) => b[1] - a[1])
  const max = byCat[0]?.[1] ?? 1
  const saved = entries.filter(e => e.column === 'savings').reduce((t, e) => t + e.amount, 0), target = entries.filter(e => e.column === 'savings').reduce((t, e) => t + (e.target ?? 0), 0)
  return <div className="ft-summary">
    <article className="ft-card ft-sum-card"><h4>Spending by category</h4>
      {byCat.map(([cat, v], i) => <div key={cat} className="ft-sum-row"><span>{cat}</span><div><m.i initial={{width: 0}} animate={{width: `${v / max * 100}%`}} transition={{type: 'spring', stiffness: 300, damping: 30, delay: i * .04}}/></div><b>{money2(v)}</b></div>)}</article>
    <article className="ft-card ft-sum-card"><h4>This month</h4>
      <dl><div><dt>Income</dt><dd className="ft-pos"><Count value={k.income}/></dd></div><div><dt>Spent</dt><dd><Count value={k.spent}/></dd></div><div><dt>Saved toward goals</dt><dd>{money(saved)} <small>of {money(target)}</small></dd></div></dl>
      <div className="ft-meter"><m.i initial={{width: 0}} animate={{width: `${Math.min(100, k.share)}%`}}/></div><p className="ft-muted">{k.share}% of income spent</p></article>
  </div>
}
