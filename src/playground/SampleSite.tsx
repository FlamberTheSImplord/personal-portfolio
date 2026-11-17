import {useEffect, useState, type CSSProperties, type PointerEvent, type ReactNode} from 'react'
import {motion as m, useMotionValue, useReducedMotion, useSpring, type Transition} from 'motion/react'
import type {ShelfCombo} from '../palette/combos'
import {contrast, inkOn, luminance} from '../palette/color'
import {oklch} from '../palette/oklch'
import type {IconPreset, LoaderPreset, LoaderVariant, MotionPreset, StylePreset, TogglePreset, VisualPreset} from './presets'
import {ThemeToggle, Visual} from './Visuals'
import './visuals.css'
import type {IconName, IconRender} from './icons/types'

// A small, original landing page that takes any palette, style, motion and icon set from the playground.
// Real DOM, not a scaled canvas, so it reflows with the window (container queries in playground.css).

const iconSets: Record<IconPreset['set'], () => Promise<{default: IconRender}>> = {
  lucide: () => import('./icons/lucide'), tabler: () => import('./icons/tabler'), phosphor: () => import('./icons/phosphor'), fontawesome: () => import('./icons/fontawesome'), devigner: () => import('./icons/devigner'),
}

export type Mode = 'light' | 'dark'

/** Page, text and action colours for a combo, keeping text at 4.5:1 and actions at 3:1 against the page. */
export function siteColours(combo: ShelfCombo, mode: Mode) {
  const hexes = combo.colors.map(s => s.hex), byL = [...hexes].sort((a, b) => luminance(a) - luminance(b))
  const bg = mode === 'light' ? byL.at(-1)! : byL[0], far = mode === 'light' ? byL[0] : byL.at(-1)!
  const ink = contrast(far, bg) >= 4.5 ? far : inkOn(bg)
  const pops = hexes.filter(h => h !== bg && contrast(h, bg) >= 3).sort((a, b) => oklch(b).c - oklch(a).c)
  const acc = pops[0] ?? ink
  // Second action colour for two-tone effects (gradient buttons): the next colour that still reads, else a shade of the first.
  const acc2 = pops[1] ?? hexes.find(h => h !== bg && h !== acc) ?? acc
  return {bg, ink, acc, acc2, accInk: inkOn(acc)}
}

export function SampleSite({combo, mode, look, move, icon, spin, art, toggle, onMode, replay}: {combo: ShelfCombo, mode: Mode, look: StylePreset, move: MotionPreset, icon: IconPreset, spin: LoaderPreset, art?: VisualPreset, toggle?: TogglePreset, onMode: (m: Mode) => void, replay: number}) {
  const [render, setRender] = useState<IconRender | null>(null)
  useEffect(() => { let live = true; iconSets[icon.set]().then(mod => { if (live) setRender(() => mod.default) }); return () => { live = false } }, [icon.set])
  const I = (name: IconName, size = 18) => render ? render(name, {size, stroke: icon.stroke, weight: icon.weight, variant: icon.variant}) : <span style={{width: size, height: size, display: 'inline-block'}}/>

  const c = siteColours(combo, mode)
  const vars = {'--bg': c.bg, '--ink': c.ink, '--acc': c.acc, '--acc-ink': c.accInk, '--acc2': c.acc2, '--r': `${look.radius}px`, '--rb': `${look.button}px`, '--fw': look.weight} as CSSProperties
  const cls = ['pgs', `pgs-border-${look.border}`, `pgs-shadow-${look.shadow}`, `pgs-surface-${look.surface}`, ...look.effects.map(e => `pgx-${e}`), look.font ? `pgs-font-${look.font}` : '', look.layout ? `pgs-layout-${look.layout}` : ''].join(' ')

  let n = 0 // entrance order, top to bottom

  return <div className={cls} style={vars} key={replay}>
    <nav className="pgs-nav">
      <span className="pgs-logo">{I('sparkle', 16)}Fieldwork</span>
      <span className="pgs-links"><span>Work</span><span>Pricing</span><span>About</span></span>
      {toggle && <ThemeToggle variant={toggle.variant} mode={mode} onChange={onMode}/>}
      <button className="pgs-btn pgs-ghost pgs-sm">Sign in</button>
      <span className="pgs-menu">{I('menu', 18)}</span>
    </nav>

    <header className={`pgs-hero${art ? ' has-visual' : ''}`}>
      <div className="pgs-hero-copy">
      <Enter move={move} index={n++}><span className="pgs-pill">{I('sparkle', 13)}New: shared palettes</span></Enter>
      <h1><Headline text="Make the brief feel finished." move={move} start={n++}/></h1>
      <Enter move={move} index={n++}><p>Plan, design and hand off in one calm workspace.</p></Enter>
      <div className="pgs-ctas">
        <Enter move={move} index={n++} inline><Hover move={move}><Busy className="pgs-btn pgs-primary" loader={spin.variant} demo>Start free{I('arrow', 15)}</Busy></Hover></Enter>
        <Enter move={move} index={n++} inline><Hover move={move}><button className="pgs-btn pgs-ghost">See work</button></Hover></Enter>
      </div>
      </div>
      {art && <Enter move={move} index={n++} className="pgs-visual"><Visual variant={art.variant}/></Enter>}
    </header>

    <section className="pgs-features">
      {([['bolt', 'Fast handoff', 'Specs export as you design.'], ['palette', 'On brand', 'Tokens follow every file.'], ['shield', 'Private', 'Projects stay yours.']] as const).map(([icn, t, d]) =>
        <Enter key={t} move={move} index={n++}><Hover move={move}><Card><span className="pgs-icon">{I(icn, 20)}</span><b>{t}</b><span>{d}</span></Card></Hover></Enter>)}
    </section>

    <section className="pgs-pricing">
      {([['Solo', '$12', false], ['Team', '$36', true]] as const).map(([plan, price, hot]) =>
        <Enter key={plan} move={move} index={n++}><Hover move={move}><Card hot={hot}>
          <b>{plan}</b><span className="pgs-price">{price}<small>/mo</small></span>
          <ul>{['Unlimited files', 'Palette sync', hot ? 'Shared reviews' : 'Exports'].map(f => <li key={f}>{I('check', 15)}{f}</li>)}</ul>
          <Busy className={`pgs-btn ${hot ? 'pgs-primary' : 'pgs-ghost'}`} loader={spin.variant}>Choose {plan}</Busy>
        </Card></Hover></Enter>)}
    </section>
    <footer className="pgs-foot">Fieldwork · sample site</footer>
  </div>
}

function transitionOf(move: MotionPreset, index: number): Transition {
  const delay = .08 + index * move.stagger
  return move.spring ? {type: 'spring', ...move.spring, delay} : {duration: move.duration ?? .4, ease: [.2, .8, .2, 1], delay}
}
const reveal = (clip: MotionPreset['enter']['clip']) => clip === 'left' ? {clipPath: 'inset(0% 100% 0% 0%)'} : clip ? {clipPath: 'inset(0% 0% 100% 0%)'} : {}
const hidden = ({enter: e}: MotionPreset, index = 0) => ({opacity: e.opacity ?? 1, x: (e.x ?? 0) * (e.alternate && index % 2 ? -1 : 1), y: e.y ?? 0, scale: e.scale ?? 1, rotate: e.rotate ?? 0, rotateX: e.rotateX ?? 0, filter: `blur(${e.blur ?? 0}px)`, ...reveal(e.clip)})
// Rest state; a clip reveal opens past the edges so card shadows aren't cut off.
const shown = ({enter: e}: MotionPreset) => ({opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0, filter: 'blur(0px)', ...(e.clip ? {clipPath: 'inset(-20% -20% -20% -20%)'} : {})})

function Enter({move, index, className, inline, children}: {move: MotionPreset, index: number, className?: string, inline?: boolean, children: ReactNode}) {
  const still = useReducedMotion() || move.id === 'none'
  const Tag = inline ? m.span : m.div
  return <Tag className={className} style={{...(inline ? {display: 'inline-block'} : {}), ...(move.enter.rotateX ? {transformPerspective: 800} : {})}} initial={still ? false : hidden(move, index)} animate={shown(move)} transition={transitionOf(move, index)}>{children}</Tag>
}

/** Headline split into letters or words when the motion preset asks for it. */
function Headline({text, move, start}: {text: string, move: MotionPreset, start: number}) {
  const still = useReducedMotion() || move.id === 'none'
  if (still || !move.text) return <Enter move={move} index={start}>{text}</Enter>
  const words = text.split(' ')
  let k = 0
  return <span aria-label={text}>{words.map((w, wi) => <span key={wi} aria-hidden="true" style={{display: 'inline-block', whiteSpace: 'nowrap'}}>
    {(move.text === 'letters' ? [...w] : [w]).map((part, pi) => <m.span key={pi} style={{display: 'inline-block'}} initial={hidden(move)} animate={shown(move)} transition={transitionOf(move, start + k++ * .6)}>{part}</m.span>)}
    {wi < words.length - 1 && ' '}
  </span>)}</span>
}

function Hover({move, children}: {move: MotionPreset, children: ReactNode}) {
  const rx = useSpring(useMotionValue(0), {stiffness: 200, damping: 18}), ry = useSpring(useMotionValue(0), {stiffness: 200, damping: 18})
  if (move.hover === 'tilt') {
    const onMove = (e: PointerEvent<HTMLDivElement>) => { const b = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - b.left) / b.width - .5) * 14); rx.set(((e.clientY - b.top) / b.height - .5) * -14) }
    return <m.div className="pgs-hover" style={{rotateX: rx, rotateY: ry, transformPerspective: 700}} onPointerMove={onMove} onPointerLeave={() => { rx.set(0); ry.set(0) }}>{children}</m.div>
  }
  if (move.hover === 'magnet') {
    const onMove = (e: PointerEvent<HTMLDivElement>) => { const b = e.currentTarget.getBoundingClientRect(); ry.set((e.clientX - b.left - b.width / 2) * .12); rx.set((e.clientY - b.top - b.height / 2) * .12) }
    return <m.div className="pgs-hover" style={{x: ry, y: rx}} onPointerMove={onMove} onPointerLeave={() => { rx.set(0); ry.set(0) }}>{children}</m.div>
  }
  const hover = move.hover === 'lift' ? {y: -4} : move.hover === 'scale' ? {scale: 1.03} : move.hover === 'press' ? {y: -2} : undefined
  return <m.div className="pgs-hover" whileHover={hover} whileTap={move.hover === 'press' ? {scale: .96, y: 1} : undefined} transition={{type: 'spring', stiffness: 400, damping: 24}}>{children}</m.div>
}

/** Card surface; tracks the pointer for the spotlight effect. */
function Card({hot, children}: {hot?: boolean, children: ReactNode}) {
  const track = (e: PointerEvent<HTMLDivElement>) => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - b.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - b.top}px`) }
  return <div className={`pgs-card${hot ? ' is-hot' : ''}`} onPointerMove={track}>{children}</div>
}

/** Button that shows the chosen loader while "working". The hero button plays it once on load so the loader is visible. */
function Busy({className, loader, demo, children}: {className: string, loader: LoaderVariant, demo?: boolean, children: ReactNode}) {
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    if (!demo) return
    const a = setTimeout(() => setBusy(true), 1400), b = setTimeout(() => setBusy(false), 3200)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [demo, loader])
  const run = () => { if (busy) return; setBusy(true); setTimeout(() => setBusy(false), 1600) }
  return <button className={`${className}${busy ? ' is-busy' : ''}`} onClick={run} aria-busy={busy}>
    <span className="pgs-btn-label">{children}</span>
    {busy && <span className="pgs-btn-loader"><Loader variant={loader}/></span>}
  </button>
}

export function Loader({variant}: {variant: LoaderVariant}) {
  return <span className={`pgl pgl-${variant}`} role="status" aria-label="Loading">
    {variant === 'ring' && <svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>}
    {variant === 'arcs' && <svg viewBox="0 0 20 20"><circle className="a" cx="10" cy="10" r="8"/><circle className="b" cx="10" cy="10" r="4.5"/></svg>}
    {variant === 'orbit' && <i/>}
    {(variant === 'dots' || variant === 'bars') && [0, 1, 2, 3].slice(variant === 'dots' ? 1 : 0).map(k => <i key={k} style={{animationDelay: `${k * .12}s`}}/>)}
    {variant === 'pulse' && <><i/><i/></>}
  </span>
}
