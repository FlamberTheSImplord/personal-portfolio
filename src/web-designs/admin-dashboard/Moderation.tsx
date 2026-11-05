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
  return <div className="ad-checks">{listing.checks.map(c => <span key={c.label} className={c.ok ? 'ok' : 'warn'}>{c.ok ? <Check size={9} /> : <TriangleAlert size={9} />}{c.label}</span>)}</div>
}

function ReviewSheet({ listing, onClose, onDecide }: { listing: Listing; onClose: () => void; onDecide: (status: Status) => void }) {
  const close = useRef<HTMLButtonElement>(null), latestClose = useRef(onClose)
  latestClose.current = onClose
  useEffect(() => { close.current?.focus(); const onKey = (e: KeyboardEvent) => e.key === 'Escape' && latestClose.current(); addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey) }, [])
  return <motion.div className="ad-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.div className="ad-sheet" role="dialog" aria-modal="true" aria-label={`Review ${listing.title}`} onClick={e => e.stopPropagation()}
      initial={{ opacity: 0, y: 30, scale: .96, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, y: 20, scale: .97 }} transition={{ duration: .4, ease }}>
      <div className="ad-sheet-art"><SceneArt scene={listing.scene} title={listing.title} /><span className="ad-chip-dark"><Image size={10} />{listing.photos} photos</span></div>
      <div className="ad-sheet-body">
        <button ref={close} className="ad-icon-btn ad-sheet-close" onClick={onClose} aria-label="Close review"><X size={14} /></button>
        <span className="ad-sheet-code">{listing.id} · {listing.type}</span>
        <h2>{listing.price}</h2><h3>{listing.title}</h3><p className="ad-address"><MapPin size={11} />{listing.address}</p>
        <div className="ad-agent"><Avatar initials={listing.initials} size={30} /><div><b>{listing.agent}</b><small>{listing.code}</small></div></div>
        <h4>Automatic checks</h4>
        <ul className="ad-check-list">{reviewChecks.map(([label, key]) => {
          const issue = listing.checks.find(c => !c.ok && c.label.toLowerCase().includes(key))
          return <li key={label} className={issue ? 'warn' : 'ok'}>{issue ? <TriangleAlert size={12} /> : <CircleCheck size={12} />}{label}{issue && <small>{issue.label}</small>}</li>
        })}</ul>
        {listing.status === 'review' ? <div className="ad-sheet-actions"><button className="ad-btn" onClick={() => onDecide('rejected')}><X size={13} />Send back</button><button className="ad-btn dark" onClick={() => onDecide('approved')}><Check size={13} />Approve</button></div>
          : <p className="ad-sheet-state">This listing is {statusName[listing.status].toLowerCase()}.</p>}
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
    <header className="ad-head">
      <Rise><h1>Moderation</h1><p>Every new listing is checked by an admin before it goes to OLX</p></Rise>
      <Rise i={1} className="ad-actions">
        <div className="ad-popover-anchor"><button className="ad-btn" aria-expanded={rules} onClick={() => setRules(!rules)}><FileText size={13} />Review rules</button>
          <AnimatePresence>{rules && <motion.div className="ad-popover" initial={{ opacity: 0, y: -6, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .22, ease }}>
            <b>Listing rules</b><ol>{moderationRules.map(r => <li key={r}>{r}</li>)}</ol></motion.div>}</AnimatePresence></div>
        <button className="ad-btn dark" disabled={!ready.length} onClick={() => { setListings(list => list.map(l => ready.includes(l) ? { ...l, status: 'approved' } : l)); notify(`${ready.length} listings with all checks passed were approved.`) }}><Check size={13} />Approve ready ones</button>
      </Rise>
    </header>
    <Rise i={2} className="ad-filters">
      <label className="ad-field"><Search size={13} /><span className="ad-sr-only">Search listings</span><input placeholder="Code, title or address..." value={query} onChange={e => setQuery(e.target.value)} /></label>
      <Segmented id="ad-mod-status" value={status} onChange={setStatus} options={(['review', 'approved', 'rejected'] as Status[]).map(s => ({ id: s, label: statusName[s], count: count(s) }))} />
      <Segmented id="ad-mod-type" value={type} onChange={setType} options={[{ id: 'All', label: 'All' }, { id: 'Sale', label: 'Sale' }, { id: 'Rent', label: 'Rent' }]} />
    </Rise>
    <div className="ad-listing-grid">
      <AnimatePresence mode="popLayout">
        {shown.map((l, i) => <Glass key={l.id} i={3 + i} layout className="ad-listing" exit={{ opacity: 0, scale: .9, filter: 'blur(8px)', transition: { duration: .3 } }}>
          <div className="ad-listing-art"><SceneArt scene={l.scene} title={l.title} />
            <span className={`ad-chip-dark status-${l.status}`}><i />{statusName[l.status]}</span><span className="ad-chip-dark ad-photos"><Image size={10} />{l.photos}</span><span className="ad-chip-dark ad-type">{l.type}</span></div>
          <div className="ad-listing-body">
            <strong>{l.price}</strong><h4>{l.title}</h4><p className="ad-address"><MapPin size={10} />{l.address}</p>
            <div className="ad-agent"><Avatar initials={l.initials} /><div><b>{l.agent}</b><small>{l.code}</small></div></div>
            <Checks listing={l} />
            <div className="ad-listing-actions"><button className="ad-btn" onClick={() => setReviewing(l.id)}><Eye size={12} />Review</button>
              {l.status === 'review' ? <button className="ad-btn dark" onClick={() => decide(l.id, 'approved')}><Check size={12} />Approve</button>
                : <button className="ad-btn" onClick={() => { setListings(list => list.map(x => x.id === l.id ? { ...x, status: 'review' } : x)); notify(`${l.id} moved back to review.`) }}>Move to review</button>}</div>
          </div>
        </Glass>)}
      </AnimatePresence>
      {!shown.length && <p className="ad-empty">No listings match. {status === 'review' && 'The review queue is clear.'}</p>}
    </div>
    {layer && createPortal(<AnimatePresence>{current && <ReviewSheet listing={current} onClose={() => setReviewing(null)} onDecide={next => { decide(current.id, next); setReviewing(null) }} />}</AnimatePresence>, layer)}
  </>
}
