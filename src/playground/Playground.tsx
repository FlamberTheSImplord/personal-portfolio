import {useEffect, useMemo, useState, type CSSProperties} from 'react'
import {ArrowUpRight, Check, Link2, RotateCw, Shuffle} from 'lucide-react'
import {BrowserFrame} from '../web-designs/BrowserFrame'
import {books, comboById, comboName, combos, type BookId} from '../palette/combos'
import {resourceById} from '../ui-library/resources'
import {byKind, coverage, groups, noMotion, presetById, unsampled, type Kind, type Preset} from './presets'
import {SampleSite, siteColours, type Mode, type Template} from './SampleSite'
import './playground.css'

// Mix a palette, a style, a motion and an icon set from the UI Library onto one sample site.
// State lives in the URL so any mix can be shared: /playground/?p=&s=&m=&i=&l=&v=&t=&mode=

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

function readState() {
  const q = new URLSearchParams(location.search)
  return {
    p: comboById(q.get('p'))?.id ?? combos[0].id,
    s: presetById('style', q.get('s'))?.id ?? byKind('style')[0].id,
    m: q.get('m') === 'none' ? 'none' : presetById('motion', q.get('m'))?.id ?? byKind('motion')[0].id,
    i: presetById('icons', q.get('i'))?.id ?? byKind('icons')[0].id,
    l: presetById('loader', q.get('l'))?.id ?? byKind('loader')[0].id,
    v: presetById('visual', q.get('v'))?.id ?? 'none',
    t: presetById('toggle', q.get('t'))?.id ?? 'none',
    mode: (q.get('mode') === 'dark' ? 'dark' : 'light') as Mode,
    tpl: (q.get('tpl') === 'dashboard' ? 'dashboard' : 'landing') as Template,
  }
}

type Section = 'look' | 'motion' | 'extras'
const sections: [Section, string][] = [['look', 'Look'], ['motion', 'Motion'], ['extras', 'Extras']]

export default function Playground() {
  const [state, setState] = useState(readState), [replay, setReplay] = useState(0), [query, setQuery] = useState(''), [copied, setCopied] = useState(false)
  const [mood, setMood] = useState<BookId | 'all'>('all'), [section, setSection] = useState<Section>('look')
  const set = (patch: Partial<typeof state>) => { setState(s => ({...s, ...patch})); setReplay(n => n + 1) }

  useEffect(() => {
    const q = new URLSearchParams({p: state.p, s: state.s, m: state.m, i: state.i, l: state.l, v: state.v, t: state.t, mode: state.mode, tpl: state.tpl})
    history.replaceState(null, '', `/playground/?${q}`)
  }, [state])

  const combo = comboById(state.p)!, look = presetById('style', state.s)!, move = state.m === 'none' ? noMotion : presetById('motion', state.m)!, icon = presetById('icons', state.i)!, spin = presetById('loader', state.l)!, art = presetById('visual', state.v), toggle = presetById('toggle', state.t)
  const shown = useMemo(() => { const w = query.trim().toLowerCase(); return combos.filter(c => (!w || c.search.includes(w)) && (mood === 'all' || c.moods.includes(mood))) }, [query, mood])

  const shuffle = () => set({p: pick(combos).id, s: pick(byKind('style')).id, m: pick(byKind('motion')).id, i: pick(byKind('icons')).id, l: pick(byKind('loader')).id, v: pick([...byKind('visual').map(p => p.id), 'none']), t: pick([...byKind('toggle').map(p => p.id), 'none']), mode: pick(['light', 'dark'] as Mode[])})
  const share = () => { navigator.clipboard?.writeText(location.href).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1400) }

  return <div className="page pg">
    <div className="page-title"><div><span className="eyebrow">Library / Playground</span><h1>Playground.</h1></div></div>
    <div className="pg-layout">
      <aside className="pg-panel" aria-label="Playground controls">
        <div className="pg-seg" role="group" aria-label="Template">{([['landing', 'Landing page'], ['dashboard', 'Dashboard']] as [Template, string][]).map(([id, name]) => <button key={id} aria-pressed={state.tpl === id} onClick={() => set({tpl: id})}>{name}</button>)}</div>
        <div className="pg-field">
          <span>Palette</span>
          <div className="pg-palettes">
            <input type="search" placeholder="Name or HEX" aria-label="Search palettes" value={query} onChange={e => setQuery(e.target.value)}/>
            <div className="pg-moods" role="group" aria-label="Filter palettes by mood">{[{id: 'all' as const, name: 'All'}, ...books.filter(b => combos.some(c => c.moods.includes(b.id)))].map(b =>
              <button key={b.id} aria-pressed={mood === b.id} onClick={() => setMood(b.id)}>{b.name}</button>)}</div>
            {shown.map(c => <button key={c.id} className="pg-pal" aria-pressed={c.id === state.p} onClick={() => set({p: c.id})}>
              <span className="pg-chips">{c.colors.map(s => <i key={s.hex} style={{background: s.hex}}/>)}</span><span>{comboName(c)}</span>
            </button>)}
          </div>
          <div className="pg-seg" role="group" aria-label="Page colour">{(['light', 'dark'] as Mode[]).map(m => <button key={m} aria-pressed={state.mode === m} onClick={() => set({mode: m})}>{m === 'light' ? 'Light' : 'Dark'}</button>)}</div>
        </div>
        <div className="pg-seg pg-sections" role="tablist" aria-label="Control groups">{sections.map(([id, name]) => <button key={id} role="tab" aria-selected={section === id} aria-pressed={section === id} onClick={() => setSection(id)}>{name}</button>)}</div>
        <div className="pg-section" key={section}>
          {section === 'look' && <><Choice kind="style" label="Style" value={state.s} onChange={v => set({s: v})}/>{state.tpl === 'landing' && <Choice kind="icons" label="Icons" value={state.i} onChange={v => set({i: v})}/>}</>}
          {section === 'motion' && <><Choice kind="motion" label="Motion" value={state.m} onChange={v => set({m: v})} allowNone/><Choice kind="loader" label="Loader" value={state.l} onChange={v => set({l: v})}/></>}
          {section === 'extras' && <>{state.tpl === 'landing' && <Choice kind="visual" label="Hero visual" value={state.v} onChange={v => set({v})} allowNone/>}<Choice kind="toggle" label="Theme toggle" value={state.t} onChange={v => set({t: v})} allowNone/></>}
        </div>
        <div className="pg-row">
          <button className="pg-act dark" onClick={shuffle}><Shuffle size={14}/>Shuffle</button>
          <button className="pg-act" onClick={share}>{copied ? <Check size={14}/> : <Link2 size={14}/>}{copied ? 'Copied' : 'Copy link'}</button>
          <button className="pg-act" style={{flex: 'none', width: 36}} onClick={() => setReplay(n => n + 1)} aria-label="Replay motion" title="Replay motion"><RotateCw size={14}/></button>
        </div>
        <div className="pg-cover" title={Object.values(unsampled).map(r => `Not sampled: ${r}`).join('\n') || undefined}><b>{coverage.covered}</b> of {coverage.total} libraries sampled<i style={{'--pct': `${coverage.covered / coverage.total * 100}%`} as CSSProperties}/></div>
      </aside>

      <div className="pg-frame" style={{'--site-bg': siteColours(combo, state.mode).bg} as CSSProperties}>
        <BrowserFrame tabs={[{id: 'site', title: state.tpl === 'dashboard' ? 'fintrack · Overview' : 'Fieldwork', favicon: <span className="pp-fav" style={{display: 'block', width: 12, height: 12, borderRadius: 6, background: siteColours(combo, state.mode).acc}}/>}]} active="site" url={state.tpl === 'dashboard' ? 'fintrack.app/finance/overview' : 'fieldwork.example/'} onReload={() => setReplay(n => n + 1)}>
          <SampleSite combo={combo} mode={state.mode} look={look} move={move} icon={icon} spin={spin} art={art} toggle={toggle} onMode={mode => setState(s => ({...s, mode}))} replay={replay} template={state.tpl}/>
        </BrowserFrame>
      </div>
    </div>
  </div>
}

function Choice({kind, label, value, onChange, allowNone}: {kind: Kind, label: string, value: string, onChange: (id: string) => void, allowNone?: boolean}) {
  const current = (byKind(kind) as Preset[]).find(p => p.id === value), lib = current && resourceById(current.library)
  return <label className="pg-field">
    <span>{label}</span>
    <select value={value} onChange={e => onChange(e.target.value)}>
      {allowNone && <option value="none">None</option>}
      {groups(kind).map(g => <optgroup key={g.library} label={g.name}>{g.items.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</optgroup>)}
    </select>
    {lib && <span className="pg-from">{current.origin === 'ported' ? 'Real set' : 'Look-alike'} · <a href={`/ui-library/?q=${encodeURIComponent(lib.name)}`}>{lib.name}<ArrowUpRight size={11}/></a><em>{lib.price}</em></span>}
  </label>
}
