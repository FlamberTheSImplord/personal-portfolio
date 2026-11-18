import {createContext, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode} from 'react'
import {Menu, X} from 'lucide-react'

// Shared frame for the one-page landing sites. Pages live in a scrolling browser viewport, so section links,
// the sticky header, scroll reveals and photo motion all work against that viewport instead of the window.

const Go = createContext<(id: string) => void>(() => {})
export const useGo = () => useContext(Go)
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/** Moves on-screen `data-par` images with the scroll. `data-zoom` photos also ease from 1.16 towards 1.04. */
function scrollMotion(root: HTMLElement, scroller: Element) {
  const images = [...root.querySelectorAll<HTMLElement>('[data-par]')], shown = new Set<HTMLElement>()
  let frame = 0
  const paint = () => {
    frame = 0
    const view = scroller.getBoundingClientRect()
    shown.forEach(image => {
      const box = image.parentElement!.getBoundingClientRect(), centre = box.top + box.height / 2
      const y = (centre - (view.top + view.height / 2)) * Number(image.dataset.par)
      const progress = Math.min(1, Math.max(0, (view.bottom - box.top) / (view.height + box.height)))
      image.style.transform = `translate3d(0,${y.toFixed(1)}px,0)${'zoom' in image.dataset ? ` scale(${(1.16 - progress * .12).toFixed(3)})` : ''}`
    })
  }
  const request = () => { frame ||= requestAnimationFrame(paint) }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => images.filter(i => i.parentElement === e.target).forEach(i => { if (e.isIntersecting) shown.add(i); else shown.delete(i) }))
    request()
  }, {root: scroller, rootMargin: '12% 0px'})
  new Set(images.map(i => i.parentElement!)).forEach(box => io.observe(box))
  scroller.addEventListener('scroll', request, {passive: true})
  return () => { cancelAnimationFrame(frame); io.disconnect(); scroller.removeEventListener('scroll', request) }
}

export function LandingRoot({site, nav, children}: {site: string, nav: ReactNode, children: ReactNode}) {
  const root = useRef<HTMLDivElement>(null)
  const go = useMemo(() => (id: string) => {
    const el = root.current, scroller = el?.closest('.lp-scroll'), target = el?.querySelector(`#${id}`)
    if (!el || !scroller) return
    const top = id === 'top' || !target ? 0 : target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 52
    scroller.scrollTo({top, behavior: calm() ? 'auto' : 'smooth'})
  }, [])
  useEffect(() => {
    const el = root.current!, scroller = el.closest('.lp-scroll')
    if (!scroller) return
    const items = el.querySelectorAll('.lp-r')
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return
      e.target.classList.add('in'); io.unobserve(e.target)
    }), {root: scroller, rootMargin: '0px 0px -8% 0px'})
    items.forEach(item => io.observe(item))
    const live = new IntersectionObserver(entries => entries.forEach(e => e.target.toggleAttribute('data-off', !e.isIntersecting)), {root: scroller})
    el.querySelectorAll('.lh,.lp-live').forEach(item => live.observe(item))
    const stopMotion = calm() ? undefined : scrollMotion(el, scroller)
    const onScroll = () => el.classList.toggle('is-stuck', scroller.scrollTop > 40)
    scroller.addEventListener('scroll', onScroll, {passive: true})
    return () => { io.disconnect(); live.disconnect(); stopMotion?.(); scroller.removeEventListener('scroll', onScroll) }
  }, [])
  return <Go.Provider value={go}><div ref={root} className={`lp lp-${site}`} id="top">
    <div className="lp-sticky">{nav}</div>
    <main>{children}</main>
  </div></Go.Provider>
}

export function Nav({brand, links, extra}: {brand: ReactNode, links: readonly (readonly [string, string])[], extra?: ReactNode}) {
  const go = useGo(), [open, setOpen] = useState(false)
  const jump = (id: string) => { setOpen(false); go(id) }
  return <header className="lp-nav">
    <button className="lp-brand" onClick={() => jump('top')}>{brand}</button>
    <nav aria-label="Site">{links.map(([label, id]) => <button key={id} onClick={() => jump(id)}>{label}</button>)}</nav>
    {extra}
    <button className="lp-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
    {open && <div className="lp-menu">{links.map(([label, id]) => <button key={id} onClick={() => jump(id)}>{label}</button>)}</div>}
  </header>
}

/** Section photo: fills its frame, drifts and slowly settles as the page scrolls. */
export function Photo({src, alt, className = '', style}: {src: string, alt: string, className?: string, style?: CSSProperties}) {
  return <figure className={`lp-ph ${className}`} style={style}><img src={`/landings/${src}.webp`} alt={alt} loading="lazy" decoding="async" data-par=".045" data-zoom=""/></figure>
}

/** One compact footer for all three sites. Each number links to the photo's source page. */
export function Footer({mark, links, children, photos}: {mark: string, links: readonly (readonly [string, string])[], children: ReactNode, photos: readonly number[]}) {
  const go = useGo()
  return <footer className="lp-foot">
    <div className="lp-foot-top">
      <button className="lp-mark" onClick={() => go('top')}>{mark}</button>
      <nav aria-label="Footer">{links.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
      <div className="lp-foot-side">{children}</div>
    </div>
    <small className="lp-legal">Concept site · sample data · Photos from Pexels: {photos.map((id, i) => <a key={id} href={`https://www.pexels.com/photo/${id}/`} target="_blank" rel="noreferrer" aria-label={`Photo source ${i + 1}`}>{i + 1}</a>)}</small>
  </footer>
}

/** Small seeded generator, so generated details stay identical between renders. */
export function seeded(start: number) {
  let seed = start
  return () => (seed = seed * 16807 % 2147483647) / 2147483647
}
