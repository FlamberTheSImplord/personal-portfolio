import {lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type CSSProperties} from 'react'
import {ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy} from 'lucide-react'
import {SegmentedControl, SegmentedControlItem} from '../../vendor/boardui/components/base/segmented-control/segmented-control'
import {Switch} from '../../vendor/boardui/components/base/switch/switch'
import {BrowserFrame} from '../web-designs/BrowserFrame'
import {Scene} from './PaletteScene'
import {Shelf} from './Shelf'
import {references, shares, studies, type PaletteStudy, type ReferenceId, type Stage, type Swatch} from './palettes'
import {addedOn, byDate, paletteAge, showDate, type PaletteOrder} from './dates'
import type {ShelfCombo} from './combos'
import {contrast, grade, inkOn, luminance} from './color'
import {temperature} from './oklch'
import '../ui-library/boardui/components.css'
import './palette-page.css'

const RefOverlay = import.meta.env.DEV ? lazy(() => import('./RefOverlay')) : null
const pad = (n: number) => String(n).padStart(2, '0')
const roles = ['Base', 'Support', 'Accent'] as const
const stageName: Record<Stage, string> = {two: 'Compact', three: 'Full'}

export default function PalettePage() {
  const [index, setIndex] = useState(0), [stage, setStage] = useState<Stage>('two'), [replay, setReplay] = useState(0), [tryOn, setTryOn] = useState(false), [tried, setTried] = useState<ShelfCombo | null>(null), [order, setOrder] = useState<PaletteOrder>('new')
  const touched = useRef(false), studiesRef = useRef<HTMLDivElement>(null), study = studies[index]
  const touch = () => { touched.current = true }
  const select = (i: number) => { touch(); setTried(null); setIndex((i + studies.length) % studies.length) }
  const toggle = (next: Stage) => { touch(); setStage(next) }

  // First visit: show the compact version, then let the accent arrive on its own.
  useEffect(() => { const id = setTimeout(() => { if (!touched.current) setStage('three') }, 1600); return () => clearTimeout(id) }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const el = event.target instanceof Element ? event.target : null
      if (event.metaKey || event.ctrlKey || event.altKey || el?.closest('input,textarea,select,[contenteditable],.bui-kit,[role=tablist]')) return
      if (event.key === 'ArrowRight') { event.preventDefault(); setIndex(i => (i + 1) % studies.length); touch() }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); setIndex(i => (i - 1 + studies.length) % studies.length); touch() }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  // Try on portfolio follows the last thing picked: a shelf combo, or else the current site study.
  useTryOn(tryOn, tried ? tried.colors : study.colors, tried ? tried.colors.length > 2 : stage === 'three')
  const group = studies.filter(s => s.reference === study.reference)

  return <div className="page pp-page">
    <div className="page-title">
      <div><span className="eyebrow">Library / Colour</span><h1>Colour palettes.</h1></div>
      <div className="pp-sources">{(Object.keys(references) as ReferenceId[]).map(id => <a key={id} className="source" href={references[id].url} target="_blank" rel="noreferrer">Reference · {references[id].creator}<ArrowUpRight size={14}/></a>)}</div>
    </div>

    <Shelf order={order} onOrder={setOrder} tried={tried?.id} onTry={c => { setTried(c); setTryOn(true) }} onStudy={id => { select(studies.findIndex(s => s.id === id)); studiesRef.current?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'}) }}/>

    <div ref={studiesRef} className="pp-anchor"><Picker index={index} stage={stage} order={order} onSelect={select}/></div>

    <div className="pp-toolbar">
      <span className="pp-live"><i/>Live <b>{pad(index + 1)} / {pad(studies.length)}</b>
        <button className="pp-step" onClick={() => select(index - 1)} aria-label="Previous palette" title="Previous (←)"><ChevronLeft size={15}/></button>
        <button className="pp-step" onClick={() => select(index + 1)} aria-label="Next palette" title="Next (→)"><ChevronRight size={15}/></button>
      </span>
      <div className="bui-kit pp-kit">
        <SegmentedControl aria-label="Palette stage" selectedKeys={[stage]} onSelectionChange={keys => { const next = [...keys][0]; if (next) toggle(next as Stage) }}>
          <SegmentedControlItem id="two">{stageName.two}</SegmentedControlItem>
          <SegmentedControlItem id="three">{stageName.three}</SegmentedControlItem>
        </SegmentedControl>
        <Switch isSelected={tryOn} onChange={setTryOn}>Try on portfolio</Switch>
      </div>
    </div>

    <BrowserFrame
      tabs={group.map(s => ({id: s.id, title: `${s.site} · ${s.title}`, favicon: <span className="pp-fav" style={{background: s.colors[1].hex, boxShadow: `inset 0 0 0 3px ${s.colors[0].hex}`}}/>}))}
      active={study.id} onTab={id => select(studies.findIndex(s => s.id === id))} url={`${study.host}/`} onReload={() => setReplay(n => n + 1)}>
      <Preview study={study} accent={stage === 'three'} replay={replay}/>
    </BrowserFrame>

    <Details study={study} stage={stage}/>
    <p className="reference-note pp-note" key={`${study.reference}-${study.colorNote ?? ''}`}>{references[study.reference].note} {study.colorNote ?? 'HEX from the reel’s swatch cards.'}</p>
  </div>
}

/* ── Palette picker: grouped by reference, with one glider that slides to the selected card ── */

function Picker({index, stage, order, onSelect}: {index: number, stage: Stage, order: PaletteOrder, onSelect: (i: number) => void}) {
  const box = useRef<HTMLDivElement>(null), [glide, setGlide] = useState<CSSProperties>({opacity: 0})
  useLayoutEffect(() => {
    const root = box.current!
    const measure = () => {
      const card = root.querySelector<HTMLElement>('[aria-pressed=true]')
      if (!card) return
      const a = card.getBoundingClientRect(), b = root.getBoundingClientRect()
      setGlide({width: a.width, height: a.height, transform: `translate(${a.left - b.left}px, ${a.top - b.top}px)`})
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [index, order])
  const groups = (Object.keys(references) as ReferenceId[]).sort((a, b) => byDate(order)(addedOn[a], addedOn[b]))
  return <div className="pp-picker" ref={box}>
    <span className="pp-glider" style={glide} aria-hidden="true"/>
    {groups.map(ref => { const count = studies.filter(s => s.reference === ref).length, age = paletteAge(addedOn[ref])
      return <section key={ref} className={`pp-group pp-group-${ref}`} style={{'--n': count} as CSSProperties} aria-label={`Palettes from ${references[ref].creator}, added ${showDate(addedOn[ref])}`}>
      <header><span>{references[ref].creator}</span><small>{count} sites</small><time dateTime={addedOn[ref]}>{showDate(addedOn[ref])}</time>{age && <em data-age={age}>{age}</em>}</header>
      <div className="pp-cards">{studies.map((s, i) => s.reference !== ref ? null : <button key={s.id} className="pp-card" aria-pressed={i === index} onClick={() => onSelect(i)}>
        <div className="pp-strip">{s.colors.map((c, j) => <i key={c.hex} style={{background: c.hex, flexGrow: j < 2 ? 1 : stage === 'three' ? .55 : .001}}/>)}</div>
        <span className="pp-card-row"><b>{s.site}</b><small>{pad(i + 1)}</small></span>
        <span className="pp-card-title">{s.title}</span>
      </button>)}</div>
    </section> })}
  </div>
}

/* ── Preview: scaled design canvas, crossfading between sites and easing its height ── */

function Preview({study, accent, replay}: {study: PaletteStudy, accent: boolean, replay: number}) {
  const box = useRef<HTMLDivElement>(null), [width, setWidth] = useState(0)
  const [layers, setLayers] = useState<{study: PaletteStudy, leaving: boolean}[]>([{study, leaving: false}])
  useLayoutEffect(() => {
    const el = box.current!, update = () => setWidth(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    setLayers(current => current[current.length - 1].study.id === study.id ? current : [...current.filter(l => !l.leaving).map(l => ({...l, leaving: true})), {study, leaving: false}])
    const id = setTimeout(() => setLayers(current => current.filter(l => !l.leaving)), 650)
    return () => clearTimeout(id)
  }, [study])
  const {width: cw, height: ch} = study.canvas
  return <div ref={box} className="pp-preview" style={{height: width ? width * ch / cw : undefined, aspectRatio: width ? undefined : `${cw} / ${ch}`, background: study.colors[0].hex}}>
    {width > 0 && layers.map(({study: s, leaving}) => <div key={s.id} className={`pp-layer${leaving ? ' leaving' : ''}`} role="img" aria-label={`${s.label}, ${accent ? 'full palette' : 'compact palette'}`} aria-hidden={leaving || undefined}>
      <div className="pp-canvas" style={{width: s.canvas.width, height: s.canvas.height, transform: `scale(${width / s.canvas.width})`}}>
        <Scene key={`${s.id}-${replay}`} id={s.id} accent={accent}/>
      </div>
    </div>)}
    {RefOverlay && <Suspense fallback={null}><RefOverlay id={study.id} accent={accent}/></Suspense>}
  </div>
}

/* ── Details: copy, roles, swatch cards (click to copy) and contrast ── */

function Details({study, stage}: {study: PaletteStudy, stage: Stage}) {
  const [copied, setCopied] = useState<string | null>(null)
  const [base, support, accent] = study.colors, dark = luminance(base.hex) < luminance(support.hex) ? base : support
  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex).catch(() => {})
    setCopied(hex)
    setTimeout(() => setCopied(c => c === hex ? null : c), 1400)
  }
  const pairs: [string, string, string][] = [[support.name, base.name, contrast(support.hex, base.hex).toFixed(1)], [accent.name, dark.name, contrast(accent.hex, dark.hex).toFixed(1)]]
  return <div className="pp-details">
    <div className="pp-copy" key={`${study.id}-${stage}`}>
      <span className="eyebrow">{study.site} · {stageName[stage]}</span>
      <h2>{study.title}</h2>
      <div className="pp-roles" aria-label="How much of the design each colour covers">
        <div className="pp-role-bar">{study.colors.map((c, i) => <i key={c.hex} style={{background: c.hex, flexGrow: shares[stage][i] || .001}}/>)}</div>
        <div className="pp-role-legend">{study.colors.map((c, i) => <span key={c.hex} className={i === 2 && stage === 'two' ? 'off' : ''}><i style={{background: c.hex}}/>{roles[i]} <b>{shares[stage][i]}%</b></span>)}</div>
      </div>
    </div>
    <div className="pp-side">
      <div className="pp-swatches">{study.colors.map((c, i) => {
        const hidden = i === 2 && stage === 'two'
        return <button key={c.hex} className={`pp-swatch${hidden ? ' off' : ''}`} onClick={() => copy(c.hex)} tabIndex={hidden ? -1 : undefined} aria-hidden={hidden || undefined} aria-label={`Copy ${c.name} ${c.hex}`}>
          <span className="pp-chip" style={{background: c.hex, color: inkOn(c.hex)}}>{copied === c.hex ? <Check size={15}/> : <Copy size={14}/>}</span>
          <span className="pp-label"><b>{c.name}</b><small>{copied === c.hex ? 'Copied' : c.hex}</small></span>
        </button>
      })}</div>
      <div className="pp-contrast">{pairs.map(([fg, bg, ratio], i) => <span key={fg} className={i === 1 && stage === 'two' ? 'off' : ''}><b>{ratio}:1</b> {fg} with {bg}<em>{grade(Number(ratio))}</em></span>)}<span className={`pp-temp${stage === 'two' ? ' off' : ''}`}>{temperature(base.hex)} page, {temperature(accent.hex).toLowerCase()} accent</span></div>
    </div>
  </div>
}

/* ── Try on portfolio: recolours the app shell with the current palette ── */

function useTryOn(on: boolean, colors: readonly Swatch[], full: boolean) {
  useEffect(() => {
    document.body.classList.add('pp-shell')
    return () => { document.body.classList.remove('pp-shell', 'pp-try') }
  }, [])
  useEffect(() => {
    const body = document.body
    if (!on) { body.classList.remove('pp-try'); return }
    const [base, support] = colors, accent = colors[2] ?? support
    const dark = luminance(base.hex) < luminance(support.hex) ? base.hex : support.hex, light = dark === base.hex ? support.hex : base.hex
    const pop = full ? accent.hex : light, ink = inkOn(dark)
    const vars = {'--tp-dark': dark, '--tp-ink': ink, '--tp-pop': pop, '--tp-pop-ink': inkOn(pop), '--tp-pop-text': contrast(pop, dark) >= 3 ? pop : ink, '--tp-pop-page': contrast(pop, '#ffffff') >= 3 ? pop : dark, '--tp-tint': light}
    Object.entries(vars).forEach(([k, v]) => body.style.setProperty(k, v))
    body.classList.add('pp-try')
  }, [on, colors, full])
}
