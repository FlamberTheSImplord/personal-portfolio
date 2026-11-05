import { useSyncExternalStore } from 'react'

type ClockState = { elapsed: number; reduced: boolean }
let state: ClockState = { elapsed: 0, reduced: false }
const listeners = new Set<() => void>()
let frame = 0
let previous = 0
let published = 0
let elapsed = 0
let preference: MediaQueryList | undefined

const notify = () => listeners.forEach(listener => listener())
const snapshot = () => state
function stop() {
  cancelAnimationFrame(frame)
  frame = 0
  previous = 0
}
function tick(now: number) {
  if (previous) elapsed += Math.min(now - previous, 100)
  previous = now
  // One shared clock updates the metric components at 30fps; charts outside
  // those components do not need to render on every animation frame.
  if (now - published >= 1000 / 30) {
    published = now
    state = { elapsed, reduced: false }
    notify()
  }
  frame = requestAnimationFrame(tick)
}
function syncPlayback() {
  stop()
  state = { elapsed, reduced: preference?.matches ?? false }
  notify()
  if (!state.reduced && !document.hidden && listeners.size) {
    frame = requestAnimationFrame(tick)
  }
}
function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    preference.addEventListener('change', syncPlayback)
    document.addEventListener('visibilitychange', syncPlayback)
    syncPlayback()
  }
  return () => {
    listeners.delete(listener)
    if (!listeners.size) {
      stop()
      preference?.removeEventListener('change', syncPlayback)
      document.removeEventListener('visibilitychange', syncPlayback)
      elapsed = 0
      published = 0
      state = { elapsed: 0, reduced: preference?.matches ?? false }
    }
  }
}

export function useLiveValue(base: number, amplitude: number, phase = 0, min = 0, max = Infinity) {
  const clock = useSyncExternalStore(subscribe, snapshot, snapshot)
  if (clock.reduced) return base
  const entrance = 1 - Math.pow(1 - Math.min(clock.elapsed / 1100, 1), 3)
  const seconds = Math.max(0, clock.elapsed - 1100) / 1000
  // Differing phases keep the counters from moving in lockstep. Subtracting
  // the initial phase keeps the entrance and continuous loop connected.
  const movement = (Math.sin(seconds * 0.95 + phase) - Math.sin(phase)) * amplitude * 0.5
    + Math.sin(seconds * 1.7) * amplitude * 0.18
  return Math.round(Math.max(min, Math.min(max, (base + movement) * entrance)))
}

const integer = new Intl.NumberFormat('en-US')
export function LiveMetric({ value, range, phase = 0, suffix = '' }: {
  value: number; range: number; phase?: number; suffix?: string
}) {
  const live = useLiveValue(value, range, phase)
  return <span className="wd-live-metric" aria-label={`${integer.format(value)}${suffix}; animated demo value`}>
    <span aria-hidden="true">{integer.format(live)}{suffix}</span>
  </span>
}
