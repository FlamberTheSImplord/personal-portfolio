import {useEffect, useMemo, useState, type ReactNode} from 'react'
import {ArrowUpRight, Check, Copy} from 'lucide-react'
import './ai-brief.css'

/** Shows /library.md exactly as an AI assistant gets it: rendered for reading, or raw. */
// The line in the global AI instructions that sends assistants here (local folder path left out).
const pointer = 'Design library: before building or reviewing UI, or when the user says "go look portfolio", read the library brief and use it on top of these rules (these win on conflict). Apply its UI rules, pick colours from its palettes that fit the brief, and check its UI Library for a resource that fits before building a component from scratch.'
type Section = {id: string, title: string, count: string | null, md: string}

function split(md: string): {intro: string, sections: Section[]} {
  const parts = md.split(/^## /m)
  const sections = parts.slice(1).map(p => {
    const nl = p.indexOf('\n'), head = p.slice(0, nl).trim(), m = head.match(/^(.*?)\s*\((\d+)\)$/)
    const title = m ? m[1] : head
    return {id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), title, count: m ? m[2] : null, md: `## ${p}`.trim()}
  })
  return {intro: parts[0], sections}
}

// Inline Markdown: `code` (HEX values get a colour chip), [links](url) and plain text.
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|(#[0-9A-Fa-f]{6})\b/g
  let last = 0, m: RegExpExecArray | null, k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) out.push(<code key={k++}>{m[1]}</code>)
    else if (m[2]) out.push(<a key={k++} href={m[3]} target="_blank" rel="noreferrer">{m[2]}</a>)
    else out.push(<span key={k++} className="aib-hex"><i style={{background: m[4]}}/>{m[4]}</span>)
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function Markdown({md}: {md: string}) {
  const blocks: ReactNode[] = []
  let list: {ordered: boolean, items: string[]} | null = null
  const flush = () => { if (!list) return; const L = list.ordered ? 'ol' : 'ul'; blocks.push(<L key={blocks.length}>{list.items.map((t, i) => <li key={i}>{inline(t)}</li>)}</L>); list = null }
  for (const line of md.split('\n')) {
    const h = line.match(/^(#{2,4}) (.*)/), li = line.match(/^(- |\d+\. )(.*)/)
    if (li) { const ordered = li[1] !== '- '; if (list && list.ordered !== ordered) flush(); list ??= {ordered, items: []}; list.items.push(li[2]); continue }
    flush()
    if (h) { const H = (['h2', 'h3', 'h4'] as const)[h[1].length - 2]; blocks.push(<H key={blocks.length}>{inline(h[2])}</H>) }
    else if (line.startsWith('> ')) blocks.push(<blockquote key={blocks.length}>{inline(line.slice(2))}</blockquote>)
    else if (line.trim()) blocks.push(<p key={blocks.length}>{inline(line)}</p>)
  }
  flush()
  return <>{blocks}</>
}

function CopyButton({text, label = 'Copy'}: {text: string, label?: string}) {
  const [done, setDone] = useState(false)
  useEffect(() => { if (!done) return; const t = setTimeout(() => setDone(false), 1600); return () => clearTimeout(t) }, [done])
  return <button className="aib-copy" onClick={() => navigator.clipboard?.writeText(text).then(() => setDone(true), () => {})}>{done ? <Check size={13}/> : <Copy size={13}/>}{done ? 'Copied' : label}</button>
}

export default function AiBrief() {
  const [md, setMd] = useState<string | null>(null), [failed, setFailed] = useState(false)
  const [raw, setRaw] = useState(() => new URLSearchParams(location.search).get('view') === 'raw')
  useEffect(() => { fetch('/library.md').then(r => r.ok ? r.text() : Promise.reject()).then(setMd, () => setFailed(true)) }, [])
  useEffect(() => { const p = new URLSearchParams(location.search); if (raw) p.set('view', 'raw'); else p.delete('view'); history.replaceState(null, '', location.pathname + (p.toString() ? `?${p}` : '') + location.hash) }, [raw])
  const {intro, sections} = useMemo(() => md ? split(md) : {intro: '', sections: []}, [md])
  const tokens = md ? Math.round(md.length / 4 / 100) / 10 : 0
  return <div className="page aib-page">
    <div className="page-title"><div><span className="eyebrow">Library / AI brief</span><h1>What the AI reads.</h1><p>Built from this site. Grows with every addition.</p></div></div>
    <div className="aib-bar">
      <div className="aib-view" role="group" aria-label="View"><button aria-pressed={!raw} onClick={() => setRaw(false)}>Rendered</button><button aria-pressed={raw} onClick={() => setRaw(true)}>Raw</button></div>
      {md && <span className="aib-size">≈ {tokens}k tokens</span>}
      <a className="aib-file" href="/library.md" target="_blank" rel="noreferrer">library.md <ArrowUpRight size={13}/></a>
    </div>
    {failed && <p className="aib-error">The brief didn’t load. <a href="/library.md">Open library.md</a></p>}
    {!md && !failed && <div className="aib-loading" aria-hidden="true"><i/><i/><i/></div>}
    {md && raw && <div className="aib-raw"><CopyButton text={md} label="Copy all"/><pre>{md}</pre></div>}
    {md && !raw && <div className="aib-layout">
      <nav className="aib-rail" aria-label="Sections">{sections.map(s => <a key={s.id} href={`#${s.id}`}>{s.title}{s.count && <small>{s.count}</small>}</a>)}</nav>
      <div className="aib-doc">
        <div className="aib-intro"><Markdown md={intro.replace(/^# .*\n/, '')}/></div>
        <div className="aib-pointer"><span>Global instructions point here</span><code>{pointer}</code></div>
        {sections.map(s => <section key={s.id} id={s.id} className="aib-section"><CopyButton text={s.md}/><Markdown md={s.md}/></section>)}
      </div>
    </div>}
  </div>
}
