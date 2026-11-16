import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowLeft, X, Github, ExternalLink, Search } from 'lucide-react'
import { libraries, reel, type Library } from './catalog'
import { categories, resources, sources, type CategoryId, type Resource, type SourceId } from './resources'
import { matchesSearch, TipTags } from '../ui-tips/tip-search'
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
const readQuery = () => new URLSearchParams(location.search)

export default function UiLibrary(){
 const standalone=libraries.find(lib=>lib.id===new URLSearchParams(location.search).get('showcase'))
 const [selected,setSelected]=useState<Library|null>(null)
 const [view,setView]=useState<View>(()=>readQuery().get('view')==='studies'?'studies':'directory')
 const [cat,setCat]=useState<Filter>(()=>{const c=readQuery().get('cat');return categories.some(x=>x.id===c)?c as CategoryId:'all'})
 const [query,setQuery]=useState(()=>readQuery().get('q')||'')
 // Follow links into the library while it is open (e.g. the Stageshow redirect, back/forward).
 useEffect(()=>{const on=()=>{if(!location.pathname.startsWith('/ui-library'))return;const p=readQuery(),c=p.get('cat');setView(p.get('view')==='studies'?'studies':'directory');setCat(categories.some(x=>x.id===c)?c as CategoryId:'all');setQuery(p.get('q')||'')};addEventListener('routechange',on);return()=>removeEventListener('routechange',on)},[])
 // Keep the filter in the link so it can be shared or opened directly (/ui-library/?cat=kits&q=icons).
 useEffect(()=>{if(standalone)return;const p=new URLSearchParams();if(view==='studies')p.set('view','studies');if(cat!=='all')p.set('cat',cat);if(query)p.set('q',query);history.replaceState(null,'',`/ui-library/${p.size?`?${p}`:''}`)},[view,cat,query,standalone])
 if(standalone)return <Standalone library={standalone}/>
 return <div className="page ul-page">
  <div className="page-title"><div><span className="eyebrow">Library / Resources</span><h1>UI Library.</h1></div></div>
  <div className="ul-bar">
   <div className="bui-kit"><SegmentedControl aria-label="Library view" selectedKeys={[view]} onSelectionChange={k=>{const v=[...k][0];if(v)setView(v as View)}}><SegmentedControlItem id="directory">Directory</SegmentedControlItem><SegmentedControlItem id="studies">Studies</SegmentedControlItem></SegmentedControl></div>
   {view==='directory'&&<label className="ut-search ul-search"><Search size={15} aria-hidden="true"/><input type="search" aria-label="Search resources" placeholder="Search by name or tag" value={query} onChange={e=>setQuery(e.target.value)}/></label>}
  </div>
  {view==='directory'?<Directory cat={cat} query={query} onCat={setCat} onTag={setQuery}/>:<Studies onOpen={setSelected}/>}
  <p className="reference-note ul-credits">Sources: {(Object.keys(sources) as SourceId[]).map((id,i)=><span key={id}>{i?' · ':''}<a href={sources[id].url} target="_blank" rel="noopener noreferrer">{sources[id].label}</a></span>)}. Thumbnails captured from each official site.</p>
  {selected&&<Viewer key={selected.id} library={selected} onClose={()=>setSelected(null)}/>}
 </div>
}

function Directory({cat,query,onCat,onTag}:{cat:Filter,query:string,onCat:(c:Filter)=>void,onTag:(q:string)=>void}){
 const label=(r:Resource)=>categories.find(c=>c.id===r.category)!.name
 const found=resources.filter(r=>matchesSearch(query,r.name,r.summary,r.inside,r.use,r.price,label(r)))
 const groups=categories.filter(c=>cat==='all'||c.id===cat).map(c=>({...c,items:found.filter(r=>r.category===c.id)})).filter(g=>g.items.length)
 return <>
  <div className="bui-kit ul-tabs"><Tabs selectedKey={cat} onSelectionChange={k=>onCat(k as Filter)}><TabList aria-label="Categories"><Tab id="all" count={found.length}>All</Tab>{categories.map(c=><Tab key={c.id} id={c.id} count={found.filter(r=>r.category===c.id).length}>{c.name}</Tab>)}</TabList></Tabs></div>
  {groups.map(g=><section key={g.id} className="ul-group" aria-labelledby={`ul-${g.id}`}>
   <header><h2 id={`ul-${g.id}`}>{g.name}</h2><p>{g.line}</p></header>
   <div className="ul-dir-grid">{g.items.map(r=><ResourceCard key={r.id} r={r} onTag={onTag}/>)}</div>
  </section>)}
  {!groups.length&&<p className="ul-empty">Nothing matches “{query}”. <button onClick={()=>onTag('')}>Clear search</button></p>}
 </>
}

function ResourceCard({r,onTag}:{r:Resource,onTag:(q:string)=>void}){
 const local=r.url.startsWith('/')
 return <article className="ul-res" data-category={r.category}>
  <a className="ul-res-thumb" href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${r.name}`} tabIndex={-1}><Thumb r={r}/></a>
  <div className="ul-res-head"><h3>{r.name}</h3><span className={`ul-price${r.price==='Free'?'':' paid'}`}>{r.price}</span></div>
  <p>{r.summary}</p>
  <TipTags tags={r.inside.slice(0,3)} onSelect={tag=>onTag(tag)}/>
  <div className="ul-res-foot">
   <span className="ul-use">{r.use}</span>
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
