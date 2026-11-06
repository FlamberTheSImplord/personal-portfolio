import { useState } from 'react'
import { Activity, BarChart3, CircleDollarSign, Clock, ClipboardList, Headphones, Kanban, Plus, Server, Users } from 'lucide-react'
import { BarChart, Count, Donut, Glass, Rise, Segmented, StatCard } from './parts'
import { months8, offices, periods, type Period } from './data'

const fixedDate = 'Wednesday, November 4'
function greeting(live: boolean) {
  if (!live) return { hello: 'Good afternoon', date: fixedDate }
  const now = new Date(), hour = now.getHours()
  return { hello: hour < 5 ? 'Good evening' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening', date: now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }
}

export default function Overview({ liveGreeting, inReview, overdue, notify }: { liveGreeting: boolean; inReview: number; overdue: number; notify: (message: string) => void }) {
  const [period, setPeriod] = useState<Period>('6 months')
  const [office, setOffice] = useState<string | null>(null)
  const { hello, date } = greeting(liveGreeting)
  const total = offices.reduce((sum, o) => sum + o.value, 0)
  const share = office ? offices.find(o => o.name === office)!.value / total : 1
  const data = months8.slice(-periods[period]).map(m => ({ label: m.month, value: Math.round(m.value * share / 100) * 100, note: `${Math.max(1, Math.round(m.deals * share))} deals` }))
  const sum = data.reduce((s, d) => s + d.value, 0), deals = months8.slice(-periods[period]).reduce((s, m) => s + Math.max(1, Math.round(m.deals * share)), 0)
  return <>
    <header className="adminv2-head">
      <Rise><h1>{hello}, Andriy</h1><p>{date} · <Count value={inReview + overdue} /> things need your attention</p></Rise>
      <Rise i={1} className="adminv2-actions"><button className="adminv2-btn" onClick={() => notify('The activity log isn’t part of this study.')}><Clock size={13} />Activity log</button><button className="adminv2-btn dark" onClick={() => notify('Invite drafted. Demo only, nothing is sent.')}><Plus size={13} />Invite an agent</button></Rise>
    </header>
    <div className="adminv2-overview-top">
      <Glass i={0} hover={false} className="adminv2-chart-card">
        <div className="adminv2-card-head"><div><h3>Agency commission</h3><p>${sum.toLocaleString('en-US')} from {deals} deals in the last {periods[period]} months{office && ` · ${office}`}</p></div>
          <div className="adminv2-card-tools"><Segmented value={period} onChange={setPeriod} options={(Object.keys(periods) as Period[]).map(p => ({ id: p, label: p }))} /><button className="adminv2-btn dark" onClick={() => notify('Deal form is outside this study. Nothing was recorded.')}><Plus size={13} />Record a deal</button></div></div>
        <BarChart data={data} />
      </Glass>
      <Glass i={1} hover={false} className="adminv2-office-card">
        <div className="adminv2-card-head"><div><h3>Commission by office</h3><p>Last 6 months. Click an office to filter.</p></div></div>
        <Donut items={offices} selected={office} onSelect={setOffice} />
        <div className="adminv2-office-legend">{offices.map(o => <button key={o.name} aria-pressed={office === o.name} className={office && office !== o.name ? 'dim' : ''} onClick={() => setOffice(office === o.name ? null : o.name)}>
          <i style={{ background: o.color }} />{o.name}<b>${(o.value / 1000).toFixed(1).replace(/\.0$/, '')}K</b></button>)}</div>
      </Glass>
    </div>
    <div className="adminv2-stat-grid">
      <StatCard i={2} icon={Users} value={11} label="Active people" detail="5 online right now" />
      <StatCard i={3} icon={ClipboardList} value={inReview} label="Waiting for review" detail="oldest sent 6 h ago" />
      <StatCard i={4} icon={Kanban} value={49} label="Open deals" detail="worth $4.9M" />
      <StatCard i={5} icon={CircleDollarSign} value={42469} kind="usd" drift={140} label="Agency commission" detail="this month vs last month" trend={{ value: '5%', up: false }} />
      <StatCard i={6} icon={Activity} value={109} label="New leads" detail="last 7 days vs the 7 before" trend={{ value: '22%', up: true }} />
      <StatCard i={7} icon={BarChart3} value={2.9} kind="pct1" label="Lead conversion" detail="12 deals from 420 leads in 30 days" />
      <StatCard i={8} icon={Headphones} value={4} label="Open support requests" detail="1 urgent · 1 past response time" />
      <StatCard i={9} icon={Server} value={99.36} kind="pct2" drift={.12} label="System uptime" detail="last 30 days · 1 service degraded" />
    </div>
  </>
}
