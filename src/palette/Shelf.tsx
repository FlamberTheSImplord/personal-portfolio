import {useMemo, useRef, useState, type CSSProperties} from 'react'
import {ArrowUpRight, Braces, Check, FlaskConical, PanelTop, Search, Wind, X} from 'lucide-react'
import {SlashHint, useSlashFocus} from '../filters/Filters'
import {asCss, asTailwind, books, comboName, combos, comboSources, type BookId, type ShelfCombo} from './combos'
import {inkOn} from './color'
import {hueGap, oklch} from './oklch'
import type {SceneId} from './palettes'
import './shelf.css'

// Colour shelf: one book per mood. Opening a book shows its combos; search and the hue wheel filter every book at once.
// Built to hold hundreds of combos: books show a page at a time, and moods come from the HEX values (combos.ts).

type ShelfId = BookId | 'all'
const shelfBooks: {id: ShelfId, name: string}[] = [{id: 'all', name: 'All'}, ...books]
const PAGE = 24, SECTORS = 12

export function Shelf({onStudy}: {onStudy: (id: SceneId) => void}) {
  const [open, setOpen] = useState<ShelfId>('all'), [query, setQuery] = useState(''), [hue, setHue] = useState<number | null>(null)
  const [shown, setShown] = useState(PAGE), [copied, setCopied] = useState<string | null>(null)
  const search = useRef<HTMLInputElement>(null)
  useSlashFocus(search)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    return combos.filter(c => q.every(w => c.search.includes(w)) && (hue === null || c.hues.some(h => hueGap(h, hue * 30 + 15) <= 20)))
  }, [query, hue])
  const shelf = useMemo(() => shelfBooks.map(b => {
    const id = b.id, items = id === 'all' ? matches : matches.filter(c => c.moods.includes(id))
    return {...b, items, cover: spineColour(b.id, items)}
  }), [matches])
  const book = shelf.find(b => b.id === open)!, list = book.items

  const choose = (id: ShelfId) => { setOpen(id); setShown(PAGE) }
  const copy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(key); setTimeout(() => setCopied(c => c === key ? null : c), 1400)
  }

  return <section className="sh" aria-label="Colour shelf">
    <div className="sh-tools">
      <label className="ut-search sh-search"><Search size={15} aria-hidden="true"/><input ref={search} type="search" aria-label="Search colours by name or HEX" placeholder="Name or HEX" value={query} onChange={e => { setQuery(e.target.value); setShown(PAGE) }}/><SlashHint/></label>
      <HueWheel value={hue} onChange={h => { setHue(h); setShown(PAGE) }}/>
    </div>

    <div className="sh-shelf" role="tablist" aria-label="Books by mood">
      {shelf.map(({items, cover, ...b}, i) => {
        const first = items[0]?.colors ?? []
        const lead = b.id === 'gradient' && first.length > 1 ? `linear-gradient(in oklch 180deg, ${first[0].hex}, ${first[1].hex})` : cover
        return <button key={b.id} role="tab" aria-selected={open === b.id} disabled={!items.length} className="sh-spine" onClick={() => choose(b.id)}
          style={{'--spine': lead, '--spine-ink': inkOn(b.id === 'gradient' && first[0] ? first[0].hex : cover), height: 132 + (i * 29) % 46, '--d': `${i * 40}ms`} as CSSProperties}
          aria-label={`${b.name}, ${items.length} combos`}>
          <span className="sh-title">{b.name}</span>
          <span className="sh-bands" aria-hidden="true">{items.slice(0, 4).map(c => <i key={c.id} style={{background: c.colors.map(s => s.hex).find(h => h !== cover) ?? c.colors[0].hex}}/>)}</span>
          <span className="sh-count">{items.length}</span>
        </button>
      })}
    </div>

    <div className="sh-book" key={`${open}-${query}-${hue}`}>
      <header><b>{book.name}</b><span>{list.length}</span>{(query || hue !== null) && <button className="sh-clear" onClick={() => { setQuery(''); setHue(null) }}><X size={12}/>Clear</button>}</header>
      {list.length ? <div className="sh-grid">{list.slice(0, shown).map((c, i) => <Card key={c.id} combo={c} index={i} gradient={open === 'gradient'} copied={copied} onCopy={copy} onStudy={onStudy}/>)}</div>
        : <p className="sh-empty">No combos match.</p>}
      {list.length > shown && <button className="sh-more" onClick={() => setShown(n => n + PAGE)}>Show {Math.min(PAGE, list.length - shown)} more</button>}
    </div>

    <p className="reference-note sh-credit">Pairs from <a href={comboSources['346eur'].url} target="_blank" rel="noreferrer">346eur<ArrowUpRight size={11}/></a>. Moods are sorted from the HEX values.</p>
  </section>
}

function Card({combo: c, index, gradient, copied, onCopy, onStudy}: {combo: ShelfCombo, index: number, gradient: boolean, copied: string | null, onCopy: (key: string, text: string) => void, onStudy: (id: SceneId) => void}) {
  const done = (k: string) => copied === `${c.id}-${k}`
  return <article className="sh-card" style={{'--d': `${Math.min(index, 12) * 35}ms`} as CSSProperties}>
    <div className={`sh-strip${gradient ? ' is-gradient' : ''}`} style={gradient ? {background: `linear-gradient(in oklch 90deg, ${c.colors.map(s => s.hex).join(', ')})`} : undefined}>
      {c.colors.map(s => <button key={s.hex} style={{background: gradient ? 'transparent' : s.hex, color: inkOn(s.hex)}} onClick={() => onCopy(`${c.id}-${s.hex}`, s.hex)} aria-label={`Copy ${s.name} ${s.hex}`} title={s.hex}>
        {done(s.hex) ? <Check size={13}/> : <small>{s.hex}</small>}
      </button>)}
    </div>
    <div className="sh-meta">
      <span className="sh-name" title={comboName(c)}>{comboName(c)}</span>
      <span className={`sh-ratio${c.ratio >= 4.5 ? ' ok' : ''}`} title="Best text contrast in this combo">{c.ratio.toFixed(1)}:1 <em>{c.grade}</em></span>
    </div>
    <div className="sh-actions">
      <button onClick={() => onCopy(`${c.id}-css`, asCss(c))} title="Copy CSS variables" aria-label="Copy CSS variables">{done('css') ? <Check size={14}/> : <Braces size={14}/>}</button>
      <button onClick={() => onCopy(`${c.id}-tw`, asTailwind(c))} title="Copy Tailwind theme" aria-label="Copy Tailwind theme">{done('tw') ? <Check size={14}/> : <Wind size={14}/>}</button>
      {c.study && <button onClick={() => onStudy(c.study!)} title="Open site study" aria-label="Open site study"><PanelTop size={14}/></button>}
      <a href={`/playground/?p=${c.id}`} title="Try in playground" aria-label="Try in playground"><FlaskConical size={14}/></a>
    </div>
  </article>
}

/** The spine wears the colour that best says its mood: darkest for Dark, most colourful for Vivid, and so on. */
function spineColour(book: ShelfId, items: ShelfCombo[]) {
  const all = items.flatMap(c => c.colors.map(s => ({hex: s.hex, ...oklch(s.hex)})))
  if (!all.length) return '#c9ccd2'
  const best = (score: (x: typeof all[number]) => number) => all.reduce((a, b) => score(b) > score(a) ? b : a).hex
  switch (book) {
    case 'dark': return best(x => -x.l)
    case 'light': return best(x => x.l - x.c)
    case 'pastel': return best(x => x.l > .84 ? x.c : -1)
    case 'vivid': return best(x => x.c)
    case 'earthy': return best(x => x.h > 15 && x.h < 115 && x.c < .13 ? x.c + .1 : x.c < .1 && x.l < .55 ? .05 : -1)
    case 'muted': return best(x => x.l > .3 && x.l < .8 ? -x.c : -1)
    default: return items[0].colors[0].hex
  }
}

/** Twelve hue sectors; click one to keep only combos that use that hue. */
function HueWheel({value, onChange}: {value: number | null, onChange: (h: number | null) => void}) {
  const r = 26, r0 = 15, seg = (i: number) => {
    const a0 = (i * 30 - 90) * Math.PI / 180, a1 = ((i + 1) * 30 - 90) * Math.PI / 180, p = (rad: number, a: number) => `${30 + rad * Math.cos(a)} ${30 + rad * Math.sin(a)}`
    return `M${p(r, a0)} A${r} ${r} 0 0 1 ${p(r, a1)} L${p(r0, a1)} A${r0} ${r0} 0 0 0 ${p(r0, a0)}Z`
  }
  return <div className="sh-wheel" role="radiogroup" aria-label="Filter by hue">
    <svg viewBox="0 0 60 60" width="60" height="60">
      {Array.from({length: SECTORS}, (_, i) => <path key={i} d={seg(i)} role="radio" aria-checked={value === i} aria-label={`Hue ${i * 30}°`} tabIndex={0}
        className={value === i ? 'on' : value !== null ? 'dim' : ''} style={{fill: `oklch(.72 .15 ${i * 30 + 15})`}}
        onClick={() => onChange(value === i ? null : i)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(value === i ? null : i) } }}/>)}
    </svg>
    {value !== null && <button className="sh-wheel-x" onClick={() => onChange(null)} aria-label="Clear hue filter"><X size={12}/></button>}
  </div>
}
