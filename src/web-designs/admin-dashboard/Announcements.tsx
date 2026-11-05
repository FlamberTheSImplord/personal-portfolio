import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarClock, MapPin, Plus, Send, Trash2, X } from 'lucide-react'
import { Count, Glass, Rise, Segmented, ease } from './parts'
import { audienceSize, type Announcement, type Audience } from './data'

type Tab = 'all' | 'sent' | 'scheduled' | 'pinned'
const matches = (a: Announcement, tab: Tab) => tab === 'all' || (tab === 'pinned' ? a.pinned : !a.pinned && a.status === tab)

function Composer({ onCancel, onCreate }: { onCancel: () => void; onCreate: (a: Pick<Announcement, 'title' | 'body' | 'audience' | 'status'>) => void }) {
  const [title, setTitle] = useState(''), [body, setBody] = useState(''), [audience, setAudience] = useState<Audience>('Everyone')
  const create = (status: Announcement['status']) => title.trim() && onCreate({ title: title.trim(), body: body.trim() || 'No message added.', audience, status })
  return <motion.form className="ad-glass ad-composer" onSubmit={e => { e.preventDefault(); create('sent') }}
    initial={{ opacity: 0, height: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }} exit={{ opacity: 0, height: 0, filter: 'blur(8px)' }} transition={{ duration: .4, ease }}>
    <div className="ad-composer-inner">
      <input autoFocus aria-label="Announcement title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea aria-label="Announcement message" placeholder="Write a short message for the team…" rows={2} value={body} onChange={e => setBody(e.target.value)} />
      <div className="ad-composer-foot">
        <Segmented id="ad-audience" value={audience} onChange={setAudience} options={(['Everyone', 'Agents', 'Managers'] as Audience[]).map(a => ({ id: a, label: a }))} />
        <span className="ad-composer-note">Demo only. Nothing is sent to Telegram.</span>
        <button type="button" className="ad-btn" onClick={onCancel}>Cancel</button>
        <button type="button" className="ad-btn" disabled={!title.trim()} onClick={() => create('scheduled')}><CalendarClock size={13} />Schedule for tomorrow</button>
        <button type="submit" className="ad-btn dark" disabled={!title.trim()}><Send size={13} />Send now</button>
      </div>
    </div>
  </motion.form>
}

export default function Announcements({ items, setItems, notify }: { items: Announcement[]; setItems: Dispatch<SetStateAction<Announcement[]>>; notify: (message: string, undo?: () => void) => void }) {
  const [tab, setTab] = useState<Tab>('all')
  const [composing, setComposing] = useState(false)
  const [fresh, setFresh] = useState<string[]>([])
  // Newly sent announcements collect reads while the page is open, as in a live feed.
  useEffect(() => {
    if (!fresh.length) return
    const timer = setInterval(() => setItems(list => list.map(a => fresh.includes(a.id) && a.read < Math.ceil(a.total * .7) ? { ...a, read: a.read + 1 } : a)), 1500)
    return () => clearInterval(timer)
  }, [fresh, setItems])
  const update = (id: string, change: Partial<Announcement>) => setItems(list => list.map(a => a.id === id ? { ...a, ...change } : a))
  const remove = (a: Announcement) => {
    const index = items.indexOf(a)
    setItems(list => list.filter(x => x.id !== a.id))
    notify(`“${a.title}” deleted.`, () => setItems(list => [...list.slice(0, index), a, ...list.slice(index)]))
  }
  const send = (id: string) => { update(id, { status: 'sent', date: 'Just now', read: 0 }); setFresh(f => [...f, id]) }
  const shown = [...items].sort((a, b) => Number(b.pinned) - Number(a.pinned)).filter(a => matches(a, tab))
  const tabs = (['all', 'sent', 'scheduled', 'pinned'] as Tab[]).map(t => ({ id: t, label: t[0].toUpperCase() + t.slice(1), count: items.filter(a => matches(a, t)).length }))
  return <>
    <header className="ad-head">
      <Rise><h1>Announcements</h1><p>Message the team in the app and on Telegram</p></Rise>
      <Rise i={1} className="ad-actions"><button className="ad-btn dark" aria-expanded={composing} onClick={() => setComposing(!composing)}>{composing ? <X size={13} /> : <Plus size={13} />}{composing ? 'Close' : 'New announcement'}</button></Rise>
    </header>
    <Rise i={2}><Segmented id="ad-ann-tab" className="ad-wide-tabs" value={tab} onChange={setTab} options={tabs} /></Rise>
    <AnimatePresence>{composing && <Composer onCancel={() => setComposing(false)} onCreate={a => {
      const id = `a${Date.now()}`
      setItems(list => [{ ...a, id, date: a.status === 'sent' ? 'Just now' : 'Tomorrow, 9:00 AM', read: 0, total: audienceSize[a.audience], pinned: false }, ...list])
      if (a.status === 'sent') setFresh(f => [...f, id])
      setComposing(false); setTab('all'); notify(a.status === 'sent' ? 'Announcement sent to the team (demo).' : 'Announcement scheduled for tomorrow, 9:00 AM (demo).')
    }} />}</AnimatePresence>
    <div className="ad-ann-list">
      <AnimatePresence mode="popLayout">
        {shown.map((a, i) => <Glass key={a.id} i={3 + i} layout className="ad-ann" exit={{ opacity: 0, x: -30, filter: 'blur(8px)', transition: { duration: .3 } }}>
          <div className="ad-ann-top"><h3>{a.pinned && <MapPin size={13} className="ad-pin" />}{a.title}</h3><em className={`ad-pill ${a.status}`}><i />{a.status}</em></div>
          <p>{a.body}</p>
          <div className="ad-ann-foot">
            <span className="ad-chip">{a.audience}</span><span className="ad-date">{a.date}</span>
            {a.status === 'sent' && <span className="ad-read"><span className="ad-read-track"><motion.i initial={{ width: 0 }} animate={{ width: `${a.read / a.total * 100}%` }} transition={{ duration: .9, delay: .4 + i * .07, ease }} /></span><Count value={a.read} /> of {a.total} read</span>}
            <span className="ad-ann-actions">
              {a.status === 'scheduled' && <button className="ad-btn" onClick={() => { send(a.id); notify(`“${a.title}” sent now (demo).`) }}><Send size={12} />Send now</button>}
              <button className="ad-btn" onClick={() => update(a.id, { pinned: !a.pinned })}><MapPin size={12} />{a.pinned ? 'Unpin' : 'Pin to the top'}</button>
              <button className="ad-icon-btn" aria-label={`Delete “${a.title}”`} onClick={() => remove(a)}><Trash2 size={12} /></button>
            </span>
          </div>
        </Glass>)}
      </AnimatePresence>
      {!shown.length && <p className="ad-empty">No announcements here yet.</p>}
    </div>
  </>
}
