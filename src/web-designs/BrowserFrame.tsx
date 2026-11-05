import { useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, EllipsisVertical, Minus, Plus, Puzzle, RotateCw, SlidersHorizontal, Square, Star, X } from 'lucide-react'
import './browser-frame.css'

export type BrowserTab = { id: string; title: string; favicon: ReactNode }

// A Chrome-style window around each website so the recreations read as separate sites.
// Tabs switch sites, the address bar follows the current screen and reload replays the entrance.
export function BrowserFrame({ tabs, active, onTab, url, onReload, children }: { tabs: BrowserTab[]; active: string; onTab?: (id: string) => void; url: string; onReload: () => void; children: ReactNode }) {
  const [spins, setSpins] = useState(0)
  const slash = url.indexOf('/')
  const host = slash < 0 ? url : url.slice(0, slash), path = slash < 0 ? '' : url.slice(slash)
  return <div className="bf-window">
    <div className="bf-strip">
      <div className="bf-tabs" role="tablist" aria-label="Browser tabs">
        {tabs.map(tab => <button key={tab.id} role="tab" className="bf-tab" aria-selected={tab.id === active} onClick={() => onTab?.(tab.id)}>
          <span className="bf-favicon" aria-hidden="true">{tab.favicon}</span><span className="bf-tab-title">{tab.title}</span><X size={11} className="bf-tab-close" aria-hidden="true" />
        </button>)}
        <span className="bf-new" aria-hidden="true"><Plus size={14} /></span>
      </div>
      <div className="bf-controls" aria-hidden="true"><Minus size={13} /><Square size={10} /><X size={14} /></div>
    </div>
    <div className="bf-toolbar">
      <span className="bf-icon" aria-hidden="true"><ArrowLeft size={15} /></span><span className="bf-icon muted" aria-hidden="true"><ArrowRight size={15} /></span>
      <button className="bf-icon" aria-label="Reload and replay the entrance" onClick={() => { setSpins(n => n + 1); onReload() }}><RotateCw key={spins} size={14} className={spins ? 'bf-spin' : ''} /></button>
      <div className="bf-omnibox"><SlidersHorizontal size={12} aria-hidden="true" /><span><b>{host}</b>{path}</span><Star size={13} aria-hidden="true" /></div>
      <span className="bf-icon" aria-hidden="true"><Puzzle size={14} /></span><span className="bf-profile" aria-hidden="true">ND</span><span className="bf-icon" aria-hidden="true"><EllipsisVertical size={15} /></span>
    </div>
    <div className="bf-viewport">{children}</div>
  </div>
}
