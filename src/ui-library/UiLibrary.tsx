import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowLeft, X, Github, ExternalLink, Search, Star } from 'lucide-react'
import { libraries, reel, type Library } from './catalog'
import { categories, resources, resourceById, sources, purposes, stacks, prices, installs, type CategoryId, type Resource, type SourceId, type Purpose, type Stack, type Price } from './resources'
import { searchResource, knownWords, type Hit } from './search'
import { FacetFilter, ActiveFilters, Highlight, useSlashFocus, SlashHint, readList } from '../filters/Filters'
import { suggest } from '../filters/suggest'
import { TipTags } from '../ui-tips/tip-search'
import { SegmentedControl, SegmentedControlItem } from '../../vendor/boardui/components/base/segmented-control/segmented-control'
import { Tabs, TabList, Tab } from '../../vendor/boardui/components/base/tabs/tabs'
import './boardui/components.css'
import '../ui-tips/reel-studies.css'
import './directory.css'
import './ui-library.css'
import './full-sites.css'
import './site-colours.css'
const Showcase = lazy(() => import('./Showcases'))
export const fullSiteUrl=(id:string)=>`/ui-library/?showcase=${id}`
function Out({href,children}:{href:string,children:React.ReactNode}){return <a href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={14}/></a>}
function AccessBadge({library}:{library:Library}){return <span className={`ul-access-badge ${library.id==='forge'||library.id==='uilora'?'ul-access-paid':''}`}>{library.id==='smoothui'?'FREE · MIT':library.id==='boardui'?'FREE MIT + PRO':library.id==='forge'?'FREE + PRO':library.id==='uilora'?'FREE + PREMIUM':'FREE COMPONENTS'}</span>}
function SourceLinks({library}:{library:Library}){return <div className="ul-links"><Out href={library.site}><ExternalLink size={14}/>Official website</Out>{library.repo&&<Out href={library.repo}><Github size={14}/>GitHub repository</Out>}<Out href={library.id==='smoothui'?'https://github.com/educlopez/smoothui/blob/main/LICENSE':library.id==='boardui'?'https://www.instagram.com/reels/DfQoEk3DosD/':reel}>{library.id==='smoothui'?'MIT license':'Reference link'}</Out></div>}
function Viewer({library,onClose}:{library:Library,onClose:()=>void}){
 const ref=useRef<HTMLDialogElement>(null)
 useEffect(()=>{const focus=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';const modal=ref.current;modal?.showModal();return()=>{if(modal?.open)modal.close();document.body.style.overflow=overflow;focus?.focus({preventScroll:true})}},[])
 return <dialog ref={ref} className="ul-dialog ul-snapshot-dialog" aria-labelledby="ul-view-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose()}}><div className="ul-viewer"><header className="ul-view-bar"><button onClick={onClose}><ArrowLeft size={15}/>Back to collection</button><span>WEBSITE SNAPSHOT</span><button aria-label="Close showcase" onClick={onClose}><X size={20}/></button></header><div className="ul-info"><div><span className="ul-kicker">{library.concept} / Built with {library.name}</span><h2 id="ul-view-title">{library.name} <AccessBadge library={library}/></h2></div><a className="ul-full-link" href={fullSiteUrl(library.id)} target="_blank" rel="noopener noreferrer">Open full website<ArrowUpRight size={16}/></a></div><a className="ul-snapshot-image" href={fullSiteUrl(library.id)} target="_blank" rel="noopener noreferrer" aria-label={`Open the full ${library.concept} website`}><img src={`/ui-library/snapshots/${library.id}.png`} alt={`${library.concept}, our full website concept built with ${library.name}`}/><span>Explore the full interactive website ↗</span></a><section className="ul-provenance"><p>{library.note}</p><SourceLinks library={library}/><small>{library.access}</small>{library.id==='uilora'&&!library.ready&&<p className="ul-access-note">Website layout ready. Real Uilora component integration awaits signed-in source access.</p>}</section></div></dialog>
}
function Standalone({library}:{library:Library}){useEffect(()=>{document.title=library.ready?`${library.concept} — ${library.name} website concept`:`${library.name} — Reference only`;window.scrollTo(0,0)},[library]);return <main className="ul-standalone"><div className="ul-site-toolbar"><a href="/ui-library/?view=studies">← Collection</a><span>{library.ready?library.concept:library.name} <span> / {library.ready?`${library.name} design study`:'Reference only'}</span></span><AccessBadge library={library}/></div>{library.id==='uilora'&&!library.ready&&<div className="ul-access-notice">Layout preview · Uilora source integration pending account access. No embedded catalogue.</div>}<Suspense fallback={<p className="ul-loading" role="status">Opening {library.concept}…</p>}><Showcase library={library}/></Suspense><div className="ul-site-sources"><div><span className="ul-kicker">ABOUT THIS CONCEPT</span><p>{library.note}</p></div><SourceLinks library={library}/></div></main>}
type View = 'directory' | 'studies'
type Filter = CategoryId | 'all'
// Each facet holds several values: any of them may match (OR); different facets must all match (AND).
type Narrow = {tag: Purpose[], stack: Stack[], install: string[], price: Price[], picks: boolean}
type Facet = 'tag' | 'stack' | 'install' | 'price'
const facets: {key: Facet, label: string, options: readonly string[]}[] = [{key: 'tag', label: 'Tag', options: purposes}, {key: 'stack', label: 'Stack', options: stacks}, {key: 'install', label: 'Install', options: installs}, {key: 'price', label: 'Price', options: prices}]
const readQuery = () => new URLSearchParams(location.search)
const readNarrow = (p = readQuery()): Narrow => ({tag: readList(p, 'tag', purposes), stack: readList(p, 'stack', stacks), install: readList(p, 'install', installs), price: readList(p, 'price', prices), picks: p.get('picks') === '1'})

export default function UiLibrary(){
 const standalone=libraries.find(lib=>lib.id===new URLSearchParams(location.search).get('showcase'))
 const [selected,setSelected]=useState<Library|null>(null)
 const [view,setView]=useState<View>(()=>readQuery().get('view')==='studies'?'studies':'directory')
 const [cat,setCat]=useState<Filter>(()=>{const c=readQuery().get('cat');return categories.some(x=>x.id===c)?c as CategoryId:'all'})
 const [query,setQuery]=useState(()=>readQuery().get('q')||'')
 const [narrow,setNarrow]=useState<Narrow>(()=>readNarrow())
 const search=useRef<HTMLInputElement>(null)
 useSlashFocus(search)
 // Follow links into the library while it is open (e.g. the Stageshow redirect, back/forward).
 useEffect(()=>{const on=()=>{if(!location.pathname.startsWith('/ui-library'))return;const p=readQuery(),c=p.get('cat');setView(p.get('view')==='studies'?'studies':'directory');setCat(categories.some(x=>x.id===c)?c as CategoryId:'all');setQuery(p.get('q')||'');setNarrow(readNarrow(p))};addEventListener('routechange',on);return()=>removeEventListener('routechange',on)},[])
 // Keep the filter in the link so it can be shared or opened directly (/ui-library/?cat=kits&tag=charts&stack=React).
 useEffect(()=>{if(standalone)return;const p=new URLSearchParams();if(view==='studies')p.set('view','studies');if(cat!=='all')p.set('cat',cat);if(query)p.set('q',query);for(const f of facets)if(narrow[f.key].length)p.set(f.key,narrow[f.key].join(','));if(narrow.picks)p.set('picks','1');history.replaceState(null,'',`/ui-library/${p.size?`?${p}`:''}`)},[view,cat,query,narrow,standalone])
 if(standalone)return <Standalone library={standalone}/>
 return <div className="page ul-page">
  <div className="page-title"><div><span className="eyebrow">Library / Resources</span><h1>UI Library.</h1></div></div>
  <div className="ul-bar">
   <div className="bui-kit"><SegmentedControl aria-label="Library view" selectedKeys={[view]} onSelectionChange={k=>{const v=[...k][0];if(v)setView(v as View)}}><SegmentedControlItem id="directory">Directory</SegmentedControlItem><SegmentedControlItem id="studies">Studies</SegmentedControlItem></SegmentedControl></div>
   {view==='directory'&&<label className="ut-search ul-search"><Search size={15} aria-hidden="true"/><input ref={search} type="search" aria-label="Search resources" placeholder="Search by name or tag" value={query} onChange={e=>setQuery(e.target.value)}/><SlashHint/></label>}
  </div>
  {view==='directory'?<Directory cat={cat} query={query} narrow={narrow} onCat={setCat} onTag={setQuery} onNarrow={setNarrow}/>:<Studies onOpen={setSelected}/>}
  <p className="reference-note ul-credits">Sources: {(Object.keys(sources) as SourceId[]).map((id,i)=><span key={id}>{i?' · ':''}{sources[id].url?<a href={sources[id].url} target="_blank" rel="noopener noreferrer">{sources[id].label}</a>:sources[id].label}</span>)}. Thumbnails captured from each official site.</p>
  {selected&&<Viewer key={selected.id} library={selected} onClose={()=>setSelected(null)}/>}
 </div>
}

const noNarrow:Narrow={tag:[],stack:[],install:[],price:[],picks:false}
const any=<T,>(have:readonly T[],want:readonly T[])=>!want.length||want.some(w=>have.includes(w))
const passes=(r:Resource,n:Narrow)=>any(r.purpose,n.tag)&&any(r.stack,n.stack)&&any(r.install,n.install)&&any([r.price],n.price)&&(!n.picks||!!r.pick)
const toggle=<T,>(list:T[],v:T)=>list.includes(v)?list.filter(x=>x!==v):[...list,v]

function Directory({cat,query,narrow,onCat,onTag,onNarrow}:{cat:Filter,query:string,narrow:Narrow,onCat:(c:Filter)=>void,onTag:(q:string)=>void,onNarrow:(n:Narrow)=>void}){
 const hits=new Map<string,Hit>();for(const r of resources){const h=searchResource(query,r);if(h)hits.set(r.id,h)}
 const searched=resources.filter(r=>hits.has(r.id))
 const found=searched.filter(r=>passes(r,narrow))
 const searching=!!query.trim()
 // Searching: one list, best match first. Browsing: by category, picks first; otherwise the data order stands.
 const ranked=(items:Resource[])=>[...items].sort((a,b)=>(searching?hits.get(b.id)!.score-hits.get(a.id)!.score:0)||Number(!!b.pick)-Number(!!a.pick))
 const inCat=found.filter(r=>cat==='all'||r.category===cat)
 const groups=searching?(inCat.length?[{id:'results',name:`Results for “${query.trim()}”`,line:`${inCat.length} found, best match first.`,items:ranked(inCat)}]:[]):categories.filter(c=>cat==='all'||c.id===cat).map(c=>({...c,items:ranked(found.filter(r=>r.category===c.id))})).filter(g=>g.items.length)
 // Each option counts what picking only it would show, with the other facets kept.
 const count=(n:Narrow)=>searched.filter(r=>(cat==='all'||r.category===cat)&&passes(r,n)).length
 const active=facets.flatMap(f=>narrow[f.key].map(v=>({facet:f.label,value:v,key:f.key})))
 // Nothing found: offer the closest tags, stacks and names to what was typed.
 const alias=new Map(knownWords())
 const ideas=!inCat.length&&searching?[...new Set(suggest(query,[...purposes,...stacks,...resources.map(r=>r.name),...alias.keys()]).map(w=>alias.get(w)??w))]:[]
 const tryIdea=(idea:string)=>{if((purposes as readonly string[]).includes(idea)){onTag('');onNarrow({...narrow,tag:[idea as Purpose]})}else onTag(idea)}
 return <>
  <div className="bui-kit ul-tabs"><Tabs selectedKey={cat} onSelectionChange={k=>onCat(k as Filter)}><TabList aria-label="Categories"><Tab id="all" count={found.length}>All</Tab>{categories.map(c=><Tab key={c.id} id={c.id} count={found.filter(r=>r.category===c.id).length}>{c.name}</Tab>)}</TabList></Tabs></div>
  <div className="ul-filters" role="group" aria-label="Filters">
   <button type="button" className={`fx-trigger${narrow.picks?' on':''}`} aria-pressed={narrow.picks} onClick={()=>onNarrow({...narrow,picks:!narrow.picks})}><Star size={12} aria-hidden="true"/>Picks</button>
   {facets.map(f=><FacetFilter key={f.key} label={f.label} selected={narrow[f.key]} onChange={v=>onNarrow({...narrow,[f.key]:v})} options={f.options.map(o=>({id:o,count:count({...narrow,[f.key]:[o]})}))}/>)}
   <span className="ul-count" role="status">{inCat.length} of {resources.length}</span>
  </div>
  <ActiveFilters items={[...active.map(a=>({facet:a.facet,value:a.value})),...(narrow.picks?[{facet:'Only',value:'picks'}]:[])]} onRemove={(facet,value)=>{if(facet==='Only')return onNarrow({...narrow,picks:false});const f=facets.find(x=>x.label===facet)!;onNarrow({...narrow,[f.key]:(narrow[f.key] as string[]).filter(v=>v!==value)})}} onClear={()=>onNarrow(noNarrow)}/>
  {groups.map(g=><section key={g.id} className="ul-group" aria-labelledby={`ul-${g.id}`}>
   <header><h2 id={`ul-${g.id}`}>{g.name}</h2><p>{g.line}</p></header>
   <div className="ul-dir-grid">{g.items.map(r=><ResourceCard key={r.id} r={r} hit={searching?hits.get(r.id):undefined} selectedTags={narrow.tag} onTag={t=>onNarrow({...narrow,tag:toggle(narrow.tag,t)})}/>)}</div>
  </section>)}
  {!groups.length&&<div className="ul-empty"><p>Nothing matches{searching?<> “{query.trim()}”</>:''}.</p>{ideas.length>0&&<p>Try {ideas.map((i,n)=><span key={i}>{n?', ':''}<button onClick={()=>tryIdea(i)}>{(purposes as readonly string[]).includes(i)?`#${i}`:i}</button></span>)}</p>}<button onClick={()=>{onTag('');onNarrow(noNarrow)}}>Show all</button></div>}
 </>
}

const checkedLabel=(d:string)=>new Date(`${d}T00:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})

function ResourceCard({r,onTag,hit,selectedTags}:{r:Resource,onTag:(t:Purpose)=>void,hit?:Hit,selectedTags:Purpose[]}){
 const local=r.url.startsWith('/')
 const like=(r.similar??[]).map(id=>resourceById(id)?.name).filter(Boolean)
 const marks=hit?.marks??[]
 // Matched and filtered tags first, so the reason a card is here is always visible.
 const lit=[...(hit?.tags??[]),...selectedTags]
 const chips=[...r.purpose].sort((a,b)=>Number(lit.includes(b))-Number(lit.includes(a))).slice(0,3)
 return <article className="ul-res" data-category={r.category}>
  <a className="ul-res-thumb" href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${r.name}`} tabIndex={-1}><Thumb r={r}/></a>
  <div className="ul-res-head"><h3><Highlight text={r.name} terms={marks}/></h3><span className="ul-badges">{r.pick&&<span className="ul-pick" title="Our pick"><Star size={10} aria-hidden="true"/>Pick</span>}<span className={`ul-price${r.price==='Free'?'':' paid'}`}>{r.price}</span></span></div>
  <p><Highlight text={r.summary} terms={marks}/></p>
  {like.length>0&&<p className="ul-like">Like {like.join(', ')}</p>}
  {hit&&hit.via.length>0&&<p className="ul-via">{hit.via.map(v=><span key={v.label}>{v.label==='detail'?'Includes':v.label==='stack'?'Built with':'In'} <b>{v.values.join(', ')}</b></span>)}</p>}
  {/* Chips are the same tags as the Tag filter; clicking one toggles it. */}
  <TipTags tags={chips} active={lit} onSelect={tag=>onTag(tag as Purpose)}/>
  <div className="ul-res-foot">
   <span className="ul-use">{r.use}<small>Checked {checkedLabel(r.checked)}</small></span>
   <span className="ul-res-links">
    {r.study&&<a href={fullSiteUrl(r.study)} target="_blank" rel="noopener noreferrer">See it in use</a>}
    {r.repo&&<a href={r.repo} target="_blank" rel="noopener noreferrer" aria-label={`${r.name} on GitHub`}><Github size={14}/></a>}
    <a className="v-hover-button ul-visit" href={r.url} target="_blank" rel="noopener noreferrer"><span className="v-hover-front"><span className="v-hover-dot"/><span className="v-hover-label">{local?'Open':'Visit'}</span></span><span className="v-hover-back" aria-hidden="true"><span>{local?'Open':'Visit'}</span><ArrowUpRight/></span></a>
   </span>
  </div>
 </article>
}

// Each card plays a short recording of the site's own hero motion, cursor and scroll, only while on screen.
function Thumb({r}:{r:Resource}){
 const box=useRef<HTMLDivElement>(null),[on,setOn]=useState(false)
 useEffect(()=>{const el=box.current!;const io=new IntersectionObserver(([e])=>setOn(e.isIntersecting),{rootMargin:'120px'});io.observe(el);return()=>io.disconnect()},[])
 useEffect(()=>{const v=box.current?.querySelector('video');if(!v)return;if(on)v.play().catch(()=>{});else v.pause()},[on])
 const src=`/ui-library/directory/${r.id}`
 return <div ref={box} className={`ul-thumb${on?' on':''}`}>
  {r.still?<img src={`${src}.webp`} alt="" loading="lazy" decoding="async"/>:<video src={`${src}.mp4`} poster={`${src}-poster.webp`} muted loop playsInline preload="none" aria-hidden="true"/>}
 </div>
}

function Studies({onOpen}:{onOpen:(l:Library)=>void}){
 const studies=libraries.filter(l=>l.ready)
 return <div className="ul-grid ul-studies">{studies.map((lib,i)=><div key={lib.id} className="ul-card ul-website-card"><button className="ul-card-preview" onClick={()=>onOpen(lib)} aria-label={`Open ${lib.name} snapshot`}><div className={`ul-thumbnail ul-thumb-${lib.id}`}><img src={`/ui-library/snapshots/${lib.id}.png`} alt={`${lib.concept} website concept preview`} loading="lazy"/><span className="ul-thumb-number">0{i+1}</span><span className="ul-open">View snapshot<ArrowUpRight size={15}/></span></div></button><div className="ul-card-copy"><div><span>{lib.concept} · built with {lib.name}</span><h2>{lib.concept}</h2></div></div><div className="ul-card-foot"><button onClick={()=>onOpen(lib)}>Snapshot</button><a href={fullSiteUrl(lib.id)} target="_blank" rel="noopener noreferrer">Full website ↗</a></div></div>)}</div>
}
