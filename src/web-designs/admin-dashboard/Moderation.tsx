import { useContext, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Check, CircleCheck, Eye, FileText, Image, MapPin, Search, TriangleAlert, X } from 'lucide-react'
import { Avatar, Glass, LayerContext, Rise, Segmented, ease } from './parts'
import { SceneArt } from './Scenes'
import { moderationRules, type Listing } from './data'

type Status = Listing['status']
const reviewChecks = [['Photos uploaded', 'photo'], ['Address matches record', 'address'], ['Description length', 'description'], ['Documents attached', 'document']]
const statusName = { review: 'In review', approved: 'Approved', rejected: 'Rejected' }

function Checks({ listing }: { listing: Listing }) {
  return <div className="adminv2-checks">{listing.checks.map(c => <span key={c.label} className={c.ok ? 'ok' : 'warn'}>{c.ok ? <Check size={9} /> : <TriangleAlert size={9} />}{c.label}</span>)}</div>
}

function ReviewSheet({ listing, onClose, onDecide }: { listing: Listing; onClose: () => void; onDecide: (status: Status) => void }) {
  const close = useRef<HTMLButtonElement>(null), latestClose = useRef(onClose)
  latestClose.current = onClose
  useEffect(() => { close.current?.focus(); const onKey = (e: KeyboardEvent) => e.key === 'Escape' && latestClose.current(); addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey) }, [])
  return <motion.div className="adminv2-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.div className="adminv2-sheet" role="dialog" aria-modal="true" aria-label={`Review ${listing.title}`} onClick={e => e.stopPropagation()}
      initial={{ opacity: 0, y: 30, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .97 }} transition={{ duration: .4, ease }}>
      <div className="adminv2-sheet-art"><SceneArt scene={listing.scene} title={listing.title} /><span className="adminv2-chip-dark"><Image size={10} />{listing.photos} photos</span></div>
      <div className="adminv2-sheet-body">
        <button ref={close} className="adminv2-icon-btn adminv2-sheet-close" onClick={onClose} aria-label="Close review"><X size={14} /></button>
        <span className="adminv2-sheet-code">{listing.id} · {listing.type}</span>
        <h2>{listing.price}</h2><h3>{listing.title}</h3><p className="adminv2-address"><MapPin size={11} />{listing.address}</p>
        <div className="adminv2-agent"><Avatar initials={listing.initials} size={30} /><div><b>{listing.agent}</b><small>{listing.code}</small></div></div>
        <h4>Automatic checks</h4>
        <ul className="adminv2-check-list">{reviewChecks.map(([label, key]) => {
          const issue = listing.checks.find(c => !c.ok && c.label.toLowerCase().includes(key))
          return <li key={label} className={issue ? 'warn' : 'ok'}>{issue ? <TriangleAlert size={12} /> : <CircleCheck size={12} />}{label}{issue && <small>{issue.label}</small>}</li>
        })}</ul>
        {listing.status === 'review' ? <div className="adminv2-sheet-actions"><button className="adminv2-btn" onClick={() => onDecide('rejected')}><X size={13} />Send back</button><button className="adminv2-btn dark" onClick={() => onDecide('approved')}><Check size={13} />Approve</button></div>
          : <p className="adminv2-sheet-state">This listing is {statusName[listing.status].toLowerCase()}.</p>}
      </div>
    </motion.div>
  </motion.div>
}

export default function Moderation({ listings, setListings, notify }: { listings: Listing[]; setListings: Dispatch<SetStateAction<Listing[]>>; notify: (message: string) => void }) {
  const [status, setStatus] = useState<Status>('review')
  const [type, setType] = useState<'All' | 'Sale' | 'Rent'>('All')
  const [query, setQuery] = useState('')
  const [reviewing, setReviewing] = useState<string | null>(null)
  const [rules, setRules] = useState(false)
  const count = (s: Status) => listings.filter(l => l.status === s).length
  const q = query.trim().toLowerCase()
  const shown = listings.filter(l => l.status === status && (type === 'All' || l.type === type) && (!q || [l.id, l.title, l.address].some(v => v.toLowerCase().includes(q))))
  const decide = (id: string, next: Status) => { setListings(list => list.map(l => l.id === id ? { ...l, status: next } : l)); notify(`${id} ${next === 'approved' ? 'approved. It will be published to OLX' : 'sent back to the agent'} (demo).`) }
  const ready = listings.filter(l => l.status === 'review' && l.checks.every(c => c.ok))
  const current = listings.find(l => l.id === reviewing)
  const layer = useContext(LayerContext)
  return <>
    <header className="adminv2-head">
      <Rise><h1>Moderation</h1><p>Every new listing is checked by an admin before it goes to OLX</p></Rise>
      <Rise i={1} className="adminv2-actions">
        <div className="adminv2-popover-anchor"><button className="adminv2-btn" aria-expanded={rules} onClick={() => setRules(!rules)}><FileText size={13} />Review rules</button>
          <AnimatePresence>{rules && <motion.div className="adminv2-popover" initial={{ opacity: 0, y: -6, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .22, ease }}>
            <b>Listing rules</b><ol>{moderationRules.map(r => <li key={r}>{r}</li>)}</ol></motion.div>}</AnimatePresence></div>
        <button className="adminv2-btn dark" disabled={!ready.length} onClick={() => { setListings(list => list.map(l => ready.includes(l) ? { ...l, status: 'approved' } : l)); notify(`${ready.length} listings with all checks passed were approved.`) }}><Check size={13} />Approve ready ones</button>
      </Rise>
    </header>
    <Rise i={2} className="adminv2-filters">
      <label className="adminv2-field"><Search size={13} /><span className="adminv2-sr-only">Search listings</span><input placeholder="Code, title or address..." value={query} onChange={e => setQuery(e.target.value)} /></label>
      <Segmented value={status} onChange={setStatus} options={(['review', 'approved', 'rejected'] as Status[]).map(s => ({ id: s, label: statusName[s], count: count(s) }))} />
      <Segmented value={type} onChange={setType} options={[{ id: 'All', label: 'All' }, { id: 'Sale', label: 'Sale' }, { id: 'Rent', label: 'Rent' }]} />
    </Rise>
    <div className="adminv2-listing-grid">
      <AnimatePresence>
        {shown.map((l, i) => <Glass key={l.id} i={3 + i} className="adminv2-listing" exit={{ opacity: 0, scale: .9, transition: { duration: .3 } }}>
          <div className="adminv2-listing-art"><SceneArt scene={l.scene} title={l.title} />
            <span className={`adminv2-chip-dark status-${l.status}`}><i />{statusName[l.status]}</span><span className="adminv2-chip-dark adminv2-photos"><Image size={10} />{l.photos}</span><span className="adminv2-chip-dark adminv2-type">{l.type}</span></div>
          <div className="adminv2-listing-body">
            <strong>{l.price}</strong><h4>{l.title}</h4><p className="adminv2-address"><MapPin size={10} />{l.address}</p>
            <div className="adminv2-agent"><Avatar initials={l.initials} /><div><b>{l.agent}</b><small>{l.code}</small></div></div>
            <Checks listing={l} />
            <div className="adminv2-listing-actions"><button className="adminv2-btn" onClick={() => setReviewing(l.id)}><Eye size={12} />Review</button>
              {l.status === 'review' ? <button className="adminv2-btn dark" onClick={() => decide(l.id, 'approved')}><Check size={12} />Approve</button>
                : <button className="adminv2-btn" onClick={() => { setListings(list => list.map(x => x.id === l.id ? { ...x, status: 'review' } : x)); notify(`${l.id} moved back to review.`) }}>Move to review</button>}</div>
          </div>
        </Glass>)}
      </AnimatePresence>
      {!shown.length && <p className="adminv2-empty">No listings match. {status === 'review' && 'The review queue is clear.'}</p>}
    </div>
    {layer && createPortal(<AnimatePresence>{current && <ReviewSheet listing={current} onClose={() => setReviewing(null)} onDecide={next => { decide(current.id, next); setReviewing(null) }} />}</AnimatePresence>, layer)}
  </>
}
