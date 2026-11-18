import {useEffect, useRef, useState, type ComponentType} from 'react'
import {BrowserFrame} from '../BrowserFrame'

// Browser window for a one-page site. The page loads when the window nears the screen, scrolls inside the
// window like a real tab, and its animations pause while the window is off screen.
// The module is fetched before mounting: a Suspense retry would be starved by the live dashboards higher on the page.

const sites = {
  altaval: {title: 'Altaval · Ski resort', url: 'altaval.ski/', base: '#62A7EA', dot: '#F2EA1E', load: () => import('./Altaval')},
  kiln: {title: 'Kiln Coffee · Roasters', url: 'kilncoffee.co.uk/', base: '#013230', dot: '#FF6A1F', load: () => import('./Kiln')},
  merrow: {title: 'Merrow Botanic Garden', url: 'merrowgarden.org/orchid-show', base: '#ECE6DC', dot: '#E65BC4', load: () => import('./Merrow')},
}

export function Landing({site}: {site: keyof typeof sites}) {
  const s = sites[site], box = useRef<HTMLDivElement>(null), scroller = useRef<HTMLDivElement>(null)
  const [Page, setPage] = useState<ComponentType | null>(null), [run, setRun] = useState(0)
  useEffect(() => {
    const el = box.current!
    let live = true
    const load = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      load.disconnect()
      s.load().then(m => { if (live) setPage(() => m.default) })
    }, {rootMargin: '700px 0px'})
    const pause = new IntersectionObserver(([e]) => el.toggleAttribute('data-off', !e.isIntersecting))
    load.observe(el); pause.observe(el)
    return () => { live = false; load.disconnect(); pause.disconnect() }
  }, [s])
  return <div ref={box} className="lp-frame">
    <BrowserFrame tabs={[{id: site, title: s.title, favicon: <span className="lp-fav" style={{background: s.dot, boxShadow: `inset 0 0 0 3px ${s.base}`}}/>}]} active={site} url={s.url}
      onReload={() => { setRun(n => n + 1); scroller.current?.scrollTo({top: 0}) }}>
      <div ref={scroller} className="lp-scroll" style={{background: s.base}} tabIndex={0} aria-label={`${s.title} website preview`}>
        {Page && <Page key={run}/>}
      </div>
    </BrowserFrame>
  </div>
}
