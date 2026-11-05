import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ArrowUpRight, BarChart3, Bell, Briefcase, Building2, Check, CircleDollarSign, Clock, FileText, Headphones, Home, Infinity as InfinityIcon, Megaphone, Palette, Plug, Search, Server, ShieldCheck, SlidersHorizontal, Sparkles, Users, type LucideIcon } from 'lucide-react'
import './admin-dashboard.css'
import { BrowserFrame } from '../BrowserFrame'
import { LayerContext, ease } from './parts'
import { announcements, listings, payouts, type Screen } from './data'
import Overview from './Overview'
import Finance from './Finance'
import Moderation from './Moderation'
import Announcements from './Announcements'

const screens: { id: Screen; name: string }[] = [{ id: 'overview', name: 'Overview' }, { id: 'finance', name: 'Finance' }, { id: 'moderation', name: 'Moderation' }, { id: 'announcements', name: 'Announcements' }]
type NavItem = { name: string; icon: LucideIcon; screen?: Screen; badge?: number }

function Sidebar({ screen, go, badges }: { screen: Screen; go: (s: Screen) => void; badges: { moderation: number; finance: number } }) {
  const groups: [string, NavItem[]][] = [
    ['Dashboard', [{ name: 'Overview', icon: Home, screen: 'overview' }, { name: 'Reports', icon: BarChart3 }, { name: 'Tasks', icon: Check, badge: 1 }]],
    ['People', [{ name: 'Team', icon: Users }, { name: 'Roles & access', icon: ShieldCheck }, { name: 'Clients', icon: Briefcase, badge: 1 }, { name: 'Support', icon: Headphones, badge: 4 }, { name: 'Announcements', icon: Megaphone, screen: 'announcements' }]],
    ['Business', [{ name: 'Moderation', icon: Building2, screen: 'moderation', badge: badges.moderation }, { name: 'Finance', icon: CircleDollarSign, screen: 'finance', badge: badges.finance }, { name: 'Billing', icon: FileText }]],
    ['System', [{ name: 'Activity log', icon: Clock }, { name: 'Integrations', icon: Plug }, { name: 'System', icon: Server }, { name: 'Settings', icon: SlidersHorizontal }]],
  ]
  return <motion.aside className="ad-sidebar" initial={{ opacity: 0, x: -14, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ duration: .7, ease }}>
    <div className="ad-brand"><span><InfinityIcon size={17} /></span><div><b>Code XR Admin</b><small>Control center</small></div></div>
    <nav aria-label="Admin navigation">{groups.map(([label, items]) => <div key={label} className="ad-nav-group"><span className="ad-nav-label">{label}</span>
      {items.map(({ name, icon: Icon, screen: target, badge }) => {
        const content = <>{target === screen && <motion.span className="ad-nav-active" layoutId="ad-nav-active" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}<Icon size={14} /><span>{name}</span>{!!badge && <i>{badge}</i>}</>
        return target ? <button key={name} className="ad-nav-item" aria-current={target === screen ? 'page' : undefined} onClick={() => go(target)}>{content}</button>
          : <span key={name} className="ad-nav-item inert" title="Not shown in the reference">{content}</span>
      })}</div>)}</nav>
    <div className="ad-plan"><div><b>Business plan</b><small>13 of 20 seats</small></div><span><motion.i initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.1, delay: .5, ease }} /></span></div>
  </motion.aside>
}

function Topbar() {
  return <motion.header className="ad-topbar" initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .7, delay: .1, ease }}>
    <label className="ad-search"><Search size={14} /><span className="ad-sr-only">Search</span><input placeholder="Search people, clients, listings, requests..." /><kbd>⌘K</kbd></label>
    <div className="ad-top-tools"><button className="ad-round dark" aria-label="Theme colours"><Palette size={14} /></button><button className="ad-round rainbow" aria-label="Assistant"><Sparkles size={14} /></button>
      <button className="ad-round light" aria-label="Notifications"><Bell size={14} /><i /></button><span className="ad-user"><span className="ad-avatar big">AM</span><span><b>Andriy Melnyk</b><small>Owner</small></span></span></div>
  </motion.header>
}

type Toast = { id: number; message: string; undo?: () => void }
function AdminApp({ liveGreeting, screen, go }: { liveGreeting: boolean; screen: Screen; go: (s: Screen) => void }) {
  const [listingState, setListings] = useState(listings)
  const [payoutState, setPayouts] = useState(payouts)
  const [announcementState, setAnnouncements] = useState(announcements)
  const [toast, setToast] = useState<Toast | null>(null)
  const [layer, setLayer] = useState<HTMLDivElement | null>(null)
  const panel = useRef<HTMLDivElement>(null)
  const notify = useCallback((message: string, undo?: () => void) => setToast({ id: Date.now(), message, undo }), [])
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(null), 3600); return () => clearTimeout(timer) }, [toast])
  useEffect(() => { panel.current?.scrollTo({ top: 0 }) }, [screen])
  const inReview = listingState.filter(l => l.status === 'review').length, overdue = payoutState.filter(p => p.status === 'overdue').length
  return <LayerContext.Provider value={layer}>
    <div className="ad-backdrop" aria-hidden="true"><i /><i /><i /></div>
    <Sidebar screen={screen} go={go} badges={{ moderation: inReview, finance: overdue }} />
    <Topbar />
    <motion.main className="ad-panel" ref={panel} initial={{ opacity: 0, scale: .985, filter: 'blur(12px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: .8, delay: .15, ease }}>
      <AnimatePresence mode="wait">
        <motion.div key={screen} className="ad-screen" exit={{ opacity: 0, y: -6, filter: 'blur(12px)', transition: { duration: .28, ease } }}>
          {screen === 'overview' ? <Overview liveGreeting={liveGreeting} inReview={inReview} overdue={overdue} notify={notify} />
            : screen === 'finance' ? <Finance payouts={payoutState} setPayouts={setPayouts} notify={notify} />
              : screen === 'moderation' ? <Moderation listings={listingState} setListings={setListings} notify={notify} />
                : <Announcements items={announcementState} setItems={setAnnouncements} notify={notify} />}
        </motion.div>
      </AnimatePresence>
    </motion.main>
    <div className="ad-toast-region" role="status" aria-live="polite">
      <AnimatePresence>{toast && <motion.div key={toast.id} className="ad-toast" initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: 10 }} transition={{ duration: .3, ease }}>
        {toast.message}{toast.undo && <button onClick={() => { toast.undo?.(); setToast(null) }}>Undo</button>}</motion.div>}</AnimatePresence>
    </div>
    <div className="ad-layer" ref={setLayer} />
  </LayerContext.Provider>
}

export default function AdminDashboard() {
  const [screen, setScreen] = useState<Screen>('overview')
  const [replay, setReplay] = useState(0)
  const [liveGreeting, setLiveGreeting] = useState(false)
  const [scale, setScale] = useState(1)
  const stage = useRef<HTMLDivElement>(null)
  useEffect(() => { const el = stage.current; if (!el) return; const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1440)); observer.observe(el); return () => observer.disconnect() }, [])
  return <>
    <div className="ad-toolbar">
      <div className="ad-toolbar-tabs" aria-label="Choose screen">{screens.map(s => <button key={s.id} aria-pressed={screen === s.id} onClick={() => setScreen(s.id)}>{s.name}</button>)}</div>
      <div className="ad-toolbar-right">
        <button className="ad-switch" role="switch" aria-checked={liveGreeting} onClick={() => setLiveGreeting(!liveGreeting)}><span><i /></span>Live greeting</button>
        <button className="ad-replay" onClick={() => setReplay(n => n + 1)}>Replay entrance <ArrowUpRight size={13} /></button>
      </div>
    </div>
    <BrowserFrame tabs={[{ id: 'admin', title: 'Code XR Admin · Control center', favicon: <span className="fav-codexr"><InfinityIcon size={10} /></span> }]} active="admin" url={`codexr-admin.app/#/${screen}`} onReload={() => setReplay(n => n + 1)}>
      <div className="ad-stage" ref={stage}>
        <div className="ad-canvas" style={{ '--ad-scale': scale } as CSSProperties}>
          <MotionConfig reducedMotion="user"><AdminApp key={replay} liveGreeting={liveGreeting} screen={screen} go={setScreen} /></MotionConfig>
        </div>
      </div>
    </BrowserFrame>
  </>
}
