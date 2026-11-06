import { createContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { TrendingDown, TrendingUp } from 'lucide-react'

export const ease = [0.22, 1, 0.36, 1] as const
// Canvas-level layer for dialogs, so they cover the whole dashboard rather than the scrolling panel.
export const LayerContext = createContext<HTMLElement | null>(null)

// Counts up from zero on entrance, glides to a new target when it changes,
// then (with drift) wanders slightly around the target like live data.
export function useCount(target: number, { delay = 0, duration = 1300, drift = 0 }: { delay?: number; duration?: number; drift?: number } = {}) {
  const reduced = useReducedMotion()
  const current = useRef(reduced ? target : 0)
  const first = useRef(true)
  const [value, setValue] = useState(current.current)
  useEffect(() => {
    if (reduced) { current.current = target; setValue(target); return }
    let frame = 0, timer = 0
    const tween = (to: number, ms: number, wait: number, done?: () => void) => {
      timer = window.setTimeout(() => {
        const from = current.current, start = performance.now()
        const step = (now: number) => {
          const t = Math.min((now - start) / ms, 1)
          current.current = from + (to - from) * (1 - Math.pow(1 - t, 3))
          setValue(current.current)
          if (t < 1) frame = requestAnimationFrame(step); else done?.()
        }
        frame = requestAnimationFrame(step)
      }, wait)
    }
    const wander = () => { if (drift) tween(target + (Math.random() - .5) * 2 * drift, 900, 1700 + Math.random() * 1800, wander) }
    tween(target, first.current ? duration : 650, first.current ? delay * 1000 : 0, wander)
    first.current = false
    return () => { cancelAnimationFrame(frame); clearTimeout(timer) }
  }, [target, reduced, drift])
  return value
}

const formats = {
  int: (v: number) => Math.round(v).toLocaleString('en-US'),
  usd: (v: number) => `$${Math.round(v).toLocaleString('en-US')}`,
  pct0: (v: number) => `${Math.round(v)}%`,
  pct1: (v: number) => `${v.toFixed(1)}%`,
  pct2: (v: number) => `${v.toFixed(2)}%`,
  k: (v: number) => `$${(v / 1000).toFixed(1)}K`,
}
export type Format = keyof typeof formats
export const format = (v: number, kind: Format) => formats[kind](v)

export function Count({ value, kind = 'int', delay = 0, drift = 0, min = -Infinity, max = Infinity }: { value: number; kind?: Format; delay?: number; drift?: number; min?: number; max?: number }) {
  const live = useCount(value, { delay, drift })
  return <span className="ad-count" aria-label={format(value, kind)}><span aria-hidden="true">{format(Math.min(max, Math.max(min, live)), kind)}</span></span>
}

// Fade and slide only: filters inside the scaled canvas can hide painted layers.
export function Glass({ i = 0, hover = true, className = '', children, ...rest }: { i?: number; hover?: boolean; className?: string; children: ReactNode } & HTMLMotionProps<'section'>) {
  return <motion.section className={`ad-glass ${className}`} initial={{ opacity: 0, y: 18, scale: .985 }}
    animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: .65, delay: .12 + i * .07, ease } }}
    whileHover={hover ? { y: -5, transition: { duration: .25, ease } } : undefined} {...rest}>{children}</motion.section>
}

export function Rise({ i = 0, className = '', children }: { i?: number; className?: string; children: ReactNode }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: i * .06, ease }}>{children}</motion.div>
}

export type Option<T extends string> = { id: T; label: string; count?: number }
// The active pill is placed from offsetLeft/offsetWidth rather than a layout animation:
// layout animations measure on-screen pixels, which are wrong inside the scaled canvas.
export function Segmented<T extends string>({ options, value, onChange, className = '' }: { options: Option<T>[]; value: T; onChange: (value: T) => void; className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState<{ x: number; width: number } | null>(null)
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => { const tab = el.querySelector<HTMLElement>('[aria-selected="true"]'); if (tab) setPill({ x: tab.offsetLeft, width: tab.offsetWidth }) }
    measure()
    const observer = new ResizeObserver(measure)
    el.querySelectorAll('button').forEach(button => observer.observe(button))
    return () => observer.disconnect()
  }, [value, options.length])
  return <div ref={box} className={`ad-segmented ${className}`} role="tablist">
    {pill && <motion.span className="ad-segmented-pill" aria-hidden="true" initial={false} animate={pill} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
    {options.map(o => <button key={o.id} role="tab" aria-selected={value === o.id} onClick={() => onChange(o.id)}>
    <span className="ad-segmented-label">{o.label}{o.count !== undefined && <i><Count value={o.count} /></i>}</span>
  </button>)}</div>
}

export function Trend({ value, up }: { value: string; up: boolean }) {
  return <span className={`ad-trend ${up ? 'up' : 'down'}`}>{up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{value}</span>
}

export function StatCard({ i, icon: Icon, value, kind = 'int', label, detail, trend, drift = 0 }: { i: number; icon: LucideIcon; value: number; kind?: Format; label: string; detail: string; trend?: { value: string; up: boolean }; drift?: number }) {
  return <Glass i={i} className="ad-stat">
    <div className="ad-stat-top"><span className="ad-icon-circle"><Icon size={14} /></span>{trend && <Trend {...trend} />}</div>
    <strong><Count value={value} kind={kind} delay={.2 + i * .07} drift={drift} min={0} /></strong>
    <h4>{label}</h4><p>{detail}</p>
  </Glass>
}

const axis = ['$60K', '$40K', '$20K', '0']
export function BarChart({ data, max = 60000, delay = .3, labelLatest = true }: { data: { label: string; value: number; note?: string }[]; max?: number; delay?: number; labelLatest?: boolean }) {
  const [hover, setHover] = useState<number | null>(null)
  const shown = hover ?? (labelLatest ? data.length - 1 : -1)
  return <div className="ad-bars" onMouseLeave={() => setHover(null)}>
    <div className="ad-axis" aria-hidden="true">{axis.map(a => <span key={a}>{a}</span>)}</div>
    <div className="ad-plot" role="img" aria-label={data.map(d => `${d.label} ${format(d.value, 'usd')}`).join(', ')}>
      {data.map((d, i) => <motion.div key={d.label} className={`ad-bar-col ${i === data.length - 1 ? 'latest' : ''} ${i === shown ? 'shown' : ''}`} onMouseEnter={() => setHover(i)}>
        <div className="ad-bar-track">
          <motion.div className="ad-bar" initial={{ height: 0 }} animate={{ height: `${d.value / max * 100}%` }} transition={{ duration: .9, delay: delay + i * .07, ease }}>
            {i === shown && <motion.span className="ad-bar-label" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: hover === null ? delay + data.length * .07 + .5 : 0 }}>
              {format(d.value, 'usd')}{hover !== null && d.note && <small>{d.note}</small>}
            </motion.span>}
          </motion.div>
        </div>
        <span className="ad-bar-month">{d.label}</span>
      </motion.div>)}
    </div>
  </div>
}

export function Donut({ items, selected, onSelect }: { items: { name: string; value: number; color: string }[]; selected: string | null; onSelect: (name: string | null) => void }) {
  const total = items.reduce((sum, item) => sum + item.value, 0)
  const active = items.find(item => item.name === selected)
  let start = 0
  return <div className="ad-donut">
    <svg viewBox="0 0 140 140" role="img" aria-label={`Commission by office, total ${format(total, 'k')}`}>
      {items.map((item, i) => {
        const fraction = item.value / total, rotate = start * 360 - 90
        start += fraction
        return <motion.circle key={item.name} cx="70" cy="70" r="50" fill="none" stroke={item.color} strokeWidth={selected === item.name ? 19 : 16}
          transform={`rotate(${rotate + 1.4} 70 70)`} initial={{ pathLength: 0 }} animate={{ pathLength: fraction - .012, opacity: selected && selected !== item.name ? .25 : 1 }}
          transition={{ pathLength: { duration: .9, delay: .45 + i * .14, ease }, opacity: { duration: .3 }, strokeWidth: { duration: .3 } }}
          onClick={() => onSelect(selected === item.name ? null : item.name)} style={{ cursor: 'pointer' }} />
      })}
    </svg>
    <div className="ad-donut-center"><strong><Count value={active?.value ?? total} kind="k" delay={.45} /></strong><span>{active ? active.name : 'commission'}</span></div>
  </div>
}

export function Ring({ value, label }: { value: number; label: string }) {
  return <div className="ad-ring">
    <svg viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="52" className="ad-ring-track" />
      <motion.circle cx="70" cy="70" r="52" className="ad-ring-arc" transform="rotate(-90 70 70)" initial={{ pathLength: 0 }} animate={{ pathLength: value / 100 }} transition={{ duration: 1.4, delay: .5, ease }} />
    </svg>
    <div><strong><Count value={value} kind="pct0" delay={.5} /></strong><span>{label}</span></div>
  </div>
}

export function Avatar({ initials, size = 26 }: { initials: string; size?: number }) {
  return <span className="ad-avatar" style={{ width: size, height: size, fontSize: size * .36 }} aria-hidden="true">{initials}</span>
}
