import {useEffect,useRef,useState} from 'react'
import {ArrowLeft,ArrowRight,ArrowUpRight,Check,Copy,Search,X} from 'lucide-react'
import {reelStudies,type ReelStudy,type Tip} from './reel-data'
import {matchesSearch,TipTags,hasAnyTag} from './tip-search'
import TipSketch,{phoneKinds} from './TipSketch'
import {tipMarkdown} from './rules'

function tipMatches(tip:Tip,query:string){return matchesSearch(query,tip.title,tip.tags,tip.dont,tip.do)}
/** A reel's tags plus every tag on its tips, so filtering by #pricing finds the reel that has a pricing tip. */
export const reelTags=(reel:ReelStudy)=>[...new Set([...reel.tags,...reel.tips.flatMap(t=>t.tags)])]
export const reelVisible=(reel:ReelStudy,query:string,tags:string[])=>reelMatches(reel,query)&&hasAnyTag(reelTags(reel),tags)
export function reelMatches(reel:ReelStudy,query:string){return matchesSearch(query,reel.title,reel.author,reel.tags,reel.tips.flatMap(t=>[t.title,...t.tags,t.dont,t.do]))}
/** The rule behind the sketches: when it applies, the starting values and how to check it. Copies as Markdown for an AI. */
function TipSpec({tip,reel}:{tip:Tip;reel:ReelStudy}){
 const [copied,setCopied]=useState(false)
 useEffect(()=>{setCopied(false)},[tip])
 function copy(){navigator.clipboard?.writeText(tipMarkdown(tip,reel)).then(()=>setCopied(true),()=>{})}
 return <div className="rs-spec"><dl>{([['When',tip.when],['Values',tip.values],['Check',tip.check]] as const).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><button onClick={copy} aria-live="polite">{copied?<Check size={13}/>:<Copy size={13}/>}{copied?'Copied':'Copy rule'}</button></div>
}
function ReelDetail({reel,initialQuery,startTip=0}:{reel:ReelStudy;initialQuery:string;startTip?:number}){
 const [query,setQuery]=useState(initialQuery)
 // A collection tag can match the reel even when it isn't repeated on each tip.
 const hasSpecific=reel.tips.some(tip=>tipMatches(tip,query))
 const matched=reel.tips.map((tip,index)=>({tip,index})).filter(({tip})=>tipMatches(tip,query)||(!hasSpecific&&matchesSearch(query,reel.title,reel.author,reel.tags)))
 const [selected,setSelected]=useState(()=>matched.find(m=>m.index===startTip)?.index??matched[0]?.index??0)
 const active=matched.find(({index})=>index===selected)??matched[0]
 const position=matched.findIndex(item=>item.index===active?.index)
 const detail=useRef<HTMLElement>(null)
 function select(index:number){setSelected(index);detail.current?.scrollTo({top:0})}
 return <><div className="rs-toolbar"><label className="ut-search"><Search size={16}/><input type="search" aria-label="Search within reel" placeholder="Find a tip or #tag" value={query} onChange={e=>setQuery(e.target.value)}/></label><span role="status">{matched.length} / {reel.tips.length} tips</span>{query&&<button onClick={()=>setQuery('')}>Clear</button>}</div><div className="rs-detail-layout"><nav className="rs-tip-list" aria-label="Reel tips">{matched.map(({tip,index})=><button key={tip.title} aria-pressed={active?.index===index} onClick={()=>select(index)}><span>{String(index+1).padStart(2,'0')}</span><span>{tip.title}</span><ArrowUpRight size={13}/></button>)}{!matched.length&&<p className="rs-no-results">No matching tips.</p>}</nav><section className="rs-tip-detail" ref={detail}>{active?<><div className="rs-tip-heading"><span className="eyebrow">{String(active.index+1).padStart(2,'0')} / {reel.tips.length}</span><h3>{active.tip.title}</h3><TipTags tags={active.tip.tags} onSelect={setQuery}/></div><div className={`rs-comparison ${phoneKinds.includes(active.tip.sketch)?'rs-comparison-phone':''}`}><figure><figcaption><span>×</span> Don’t</figcaption><TipSketch key={active.tip.title} tip={active.tip}/><p>{active.tip.dont}</p></figure><span className="rs-pair-arrow" aria-hidden="true">↝</span><figure><figcaption><span>✓</span> Do instead</figcaption><TipSketch key={active.tip.title} tip={active.tip} good/><p>{active.tip.do}</p></figure></div><TipSpec tip={active.tip} reel={reel}/><div className="rs-tip-nav"><button disabled={position<=0} onClick={()=>select(matched[position-1].index)}><ArrowLeft size={14}/>Previous</button><span>{position+1} / {matched.length}</span><button disabled={position>=matched.length-1} onClick={()=>select(matched[position+1].index)}>Next<ArrowRight size={14}/></button></div><p className="rs-source-note">{reel.note}</p></>:<div className="rs-empty"><Search size={24}/><h3>No matches.</h3><button onClick={()=>setQuery('')}>Show all tips</button></div>}</section></div></>
}
/** A tip is pinned when it matches the search (its own words or its reel's) and any selected tag. */
export const tipVisible=(reel:ReelStudy,tip:Tip,query:string,tags:string[])=>matchesSearch(query,tip.title,tip.tags,tip.dont,tip.do,reel.title,reel.author)&&hasAnyTag([...tip.tags,...reel.tags],tags)
/** Pinboard tiles, one per tip, showing its "do" sketch. Opens the reel at that tip. Rendered inside the page's board grid. */
export default function ReelTiles({query,tags=[],reels}:{query:string;tags?:string[];reels:ReelStudy[]}){
 const [selected,setSelected]=useState<{reel:ReelStudy;tip:number}|null>(null)
 const modal=useRef<HTMLDialogElement>(null),opener=useRef<HTMLButtonElement|null>(null)
 useEffect(()=>{if(!selected)return;const dialog=modal.current;if(!dialog)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();return()=>{document.body.style.overflow=previous;if(dialog.open)dialog.close();opener.current?.focus({preventScroll:true})}},[selected])
 return <>{reels.flatMap(reel=>reel.tips.map((tip,index)=>tipVisible(reel,tip,query,tags)&&<article key={reel.id+index} className={`pb-tile pb-from-${reel.id}`}><div className="pb-paper" aria-hidden="true"><div className="pb-sketch"><TipSketch tip={tip} good cover/></div></div><h3 className="pb-title">{tip.title}</h3><button className="pb-open" aria-haspopup="dialog" aria-label={`Open ${tip.title}`} onClick={e=>{opener.current=e.currentTarget;setSelected({reel,tip:index})}}/></article>))}{selected&&<dialog ref={modal} className="ut-dialog rs-dialog" aria-labelledby="rs-dialog-title" onCancel={e=>{e.preventDefault();setSelected(null)}} onClose={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}}><div className="rs-dialog-inner"><header className="ut-dialog-header"><div><a href={selected.reel.url} target="_blank" rel="noreferrer" className="rs-source">@{selected.reel.author}<ArrowUpRight size={12}/></a><h2 id="rs-dialog-title">{selected.reel.title}</h2></div><button autoFocus onClick={()=>setSelected(null)} aria-label="Close reel study"><X size={21}/></button></header><ReelDetail reel={selected.reel} initialQuery="" startTip={selected.tip}/></div></dialog>}</>
}
