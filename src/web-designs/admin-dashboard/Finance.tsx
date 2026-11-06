import { useState, type Dispatch, type SetStateAction } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, CircleDollarSign, Clock, Download, TrendingUp } from 'lucide-react'
import { Avatar, BarChart, Count, Glass, Rise, Ring, Segmented, StatCard, ease } from './parts'
import { financeMonths, type Payout } from './data'

type Tab = 'due' | 'overdue' | 'paid' | 'all'
const statusLabel = { overdue: 'Overdue', due: 'Due', paid: 'Paid' }

function exportCsv(rows: Payout[]) {
  const header = ['Agent', 'Reference', 'Property', 'Client', 'Commission', 'Agent share %', 'To pay', 'Status']
  const lines = [header, ...rows.map(r => [r.agent, r.ref, r.property, r.client, r.commission, r.share, r.pay, statusLabel[r.status]])]
  const csv = lines.map(line => line.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
  const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: 'agent-payouts-sample.csv' })
  link.click()
  setTimeout(() => URL.revokeObjectURL(link.href), 1000)
}

export default function Finance({ payouts, setPayouts, notify }: { payouts: Payout[]; setPayouts: Dispatch<SetStateAction<Payout[]>>; notify: (message: string) => void }) {
  const [tab, setTab] = useState<Tab>('due')
  const unpaid = payouts.filter(p => p.status !== 'paid'), paid = payouts.filter(p => p.status === 'paid')
  const overdue = unpaid.filter(p => p.status === 'overdue').length
  const rows = tab === 'all' ? payouts : tab === 'due' ? unpaid : payouts.filter(p => p.status === tab)
  const pay = (ids: string[]) => setPayouts(list => list.map(p => ids.includes(p.id) ? { ...p, status: 'paid' } : p))
  return <>
    <header className="ad-head">
      <Rise><h1>Finance</h1><p>Agency commission and agent payouts · November 2026</p></Rise>
      <Rise i={1} className="ad-actions"><button className="ad-btn" onClick={() => { exportCsv(payouts); notify('Sample payouts exported as CSV.') }}><Download size={13} />Export CSV</button>
        <button className="ad-btn dark" disabled={!unpaid.length} onClick={() => { pay(unpaid.map(p => p.id)); notify(`${unpaid.length} payouts marked as paid. Demo only, no money moves.`) }}><CircleDollarSign size={13} />Pay all due</button></Rise>
    </header>
    <div className="ad-stat-grid">
      <StatCard i={0} icon={CircleDollarSign} value={42334} kind="usd" drift={140} label="Agency commission" detail="this month vs last month" trend={{ value: '5%', up: false }} />
      <StatCard i={1} icon={Clock} value={unpaid.reduce((s, p) => s + p.pay, 0)} kind="usd" label="Owed to agents" detail={`${overdue} overdue`} />
      <StatCard i={2} icon={Check} value={paid.reduce((s, p) => s + p.pay, 0)} kind="usd" label="Paid out" detail={`${paid.length} payouts this month`} />
      <StatCard i={3} icon={TrendingUp} value={3198} kind="usd" label="Average commission" detail="across 9 closed deals" />
    </div>
    <div className="ad-finance-mid">
      <Glass i={4} hover={false} className="ad-chart-card"><div className="ad-card-head"><div><h3>Commission by month</h3><p>Last 8 months</p></div></div><BarChart data={financeMonths.map(m => ({ label: m.month, value: m.value }))} delay={.45} labelLatest={false} /></Glass>
      <Glass i={5} hover={false} className="ad-keeps-card"><div className="ad-card-head"><div><h3>Who keeps what</h3><p>Commission from this month’s deals</p></div></div>
        <Ring value={52} label="kept by agency" />
        <div className="ad-mini-tiles"><div><strong><Count value={15200} kind="k" delay={.6} /></strong><span>Agency</span></div><div><strong><Count value={13800} kind="k" delay={.65} /></strong><span>Agents</span></div><div><strong><Count value={9} delay={.7} /></strong><span>Deals</span></div></div>
      </Glass>
    </div>
    <Glass i={6} hover={false} className="ad-payouts">
      <div className="ad-card-head"><div><h3>Agent payouts</h3><p>The agent’s share of each closed deal</p></div>
        <Segmented value={tab} onChange={setTab} options={[{ id: 'due', label: 'Due', count: unpaid.length }, { id: 'overdue', label: 'Overdue', count: overdue }, { id: 'paid', label: 'Paid', count: paid.length }, { id: 'all', label: 'All' }]} /></div>
      <div className="ad-table" role="table" aria-label="Agent payouts">
        <div className="ad-row ad-row-head" role="row"><span>Agent</span><span>Property</span><span>Commission</span><span>To pay</span><span>Status</span><span /></div>
        <AnimatePresence initial={false}>
          {rows.map(r => <motion.div key={r.id} className="ad-row" role="row" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: .35, ease }}>
            <span className="ad-person"><Avatar initials={r.initials} size={30} /><span><b>{r.agent}</b><small>{r.ref}</small></span></span>
            <span><b>{r.property}</b><small>{r.client}</small></span>
            <span className="num"><b>${r.commission.toLocaleString('en-US')}</b><small>{r.share}% to agent</small></span>
            <span className="num"><b>${r.pay.toLocaleString('en-US')}</b></span>
            <span><em className={`ad-status ${r.status}`}><i />{statusLabel[r.status]}</em></span>
            <span>{r.status !== 'paid' ? <button className="ad-btn dark small" onClick={() => { pay([r.id]); notify(`${r.agent} marked as paid.`) }}>Pay</button> : <Check size={15} className="ad-paid-check" aria-label="Paid" />}</span>
          </motion.div>)}
        </AnimatePresence>
        {!rows.length && <p className="ad-empty">Nothing here. Every payout is settled.</p>}
      </div>
    </Glass>
  </>
}
