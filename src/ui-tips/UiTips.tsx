import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, ChevronRight, Infinity as InfinityIcon, Lightbulb, Signal, Sparkles, Trophy, Pause, Play, Search, X } from 'lucide-react'
import './ui-tips.css'
import HeroStudies from './hero-studies/HeroStudies'
import { AnnotatedPreview, SketchBreakdown, getSketchNotes } from './SketchNotes'
import { TipTags, matchesSearch, studyTags, heroTags, hasAnyTag } from './tip-search'
import ReelTiles, {reelTags, tipVisible} from './ReelStudies'
import { heroMatches } from './hero-studies/HeroStudies'
import { FacetFilter, ActiveFilters, useSlashFocus, SlashHint, readList } from '../filters/Filters'
import { suggest } from '../filters/suggest'
import '../ui-library/boardui/components.css'
import {reelStudies, type ReelStudy} from './reel-data'
import {heroStudies, heroReference} from './hero-studies/studies'
import './reel-studies.css'
import './pinboard.css'

type Study = 'forms' | 'paywall'
import {references, paywallSteps, formSteps} from './study-steps'

function FormPreview({stage=5, miniature=false}:{stage?:number;miniature?:boolean}) {
 const [details,setDetails]=useState({account:'',sort:'',first:'',last:''})
 const [active,setActive]=useState<'account'|'sort'|'first'|'last'|null>(null)
 const [person,setPerson]=useState('Individual')
 const [complete,setComplete]=useState(false)
 const form=useRef<HTMLFormElement>(null)
 const improved=stage>=4, rounded=stage>=3, labels=stage>=2
 const numericActive=improved&&(active==='account'||active==='sort')?active:null
 return <div className={`ut-bank ${improved?'ut-bank-dark':''} ${rounded?'ut-bank-rounded':''} ${stage===1?'ut-bank-spaced':''} ${miniature?'ut-mini-phone':''}`}>
  <div className="ut-bank-head"><ArrowLeft size={20}/><h3>{improved?'Bank account details':'Send money'}</h3></div>
  {improved&&<div className="ut-account-types">{['Business','Individual'].map(type=><button key={type} type="button" onClick={()=>setPerson(type)} aria-pressed={person===type}>{type}</button>)}</div>}
  <form ref={form} className="ut-bank-fields" onSubmit={e=>{e.preventDefault();setActive(null);setComplete(true)}}>
   <label className="ut-select-field"><span>Recipient’s bank country</span><select aria-label="Recipient’s bank country" defaultValue="United Kingdom"><option>United Kingdom</option><option>Malaysia</option></select><ChevronDown size={15}/></label>
   <label className="ut-select-field"><span>Currency</span><select aria-label="Currency" defaultValue="British Pound"><option>British Pound</option><option>Malaysian Ringgit</option></select><ChevronDown size={15}/></label>
   {(['account','sort','first','last'] as const).map((key,index)=>{const title=['Account number','Sort code','First name','Last name'][index];return <label className={`ut-bank-input ${active===key?'ut-field-active':''}`} key={key}><span>{title}</span><input aria-label={title} placeholder={['e.g. 12345678','e.g. 12-34-56','e.g. Nik','e.g. Danish'][index]} value={key==='sort'?details.sort.replace(/(\d{2})(?=\d)/g,'$1-'):details[key]} inputMode={index<2?'numeric':'text'} onFocus={()=>{setComplete(false);setActive(key)}} onChange={e=>setDetails(d=>({...d,[key]:index<2?e.target.value.replace(/\D/g,'').slice(0,key==='account'?8:6):e.target.value}))} autoComplete="off"/>{active!==key&&!details[key]&&labels&&<i>{title}</i>}</label>})}
   <button className="ut-bank-continue" type="submit">{complete?'Preview complete':'Continue'}</button>
  </form>
  {numericActive&&!miniature&&<div className="ut-number-pad"><button className="ut-keyboard-next" aria-label="Next numeric field" onClick={()=>{if(numericActive==='account'){form.current?.querySelector<HTMLInputElement>('input[aria-label="Sort code"]')?.focus()}else{(document.activeElement as HTMLElement)?.blur();setActive(null)}}}>↓</button>{['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key,index)=>key?<button type="button" key={index} onMouseDown={e=>e.preventDefault()} onClick={()=>setDetails(d=>({...d,[numericActive]:key==='⌫'?d[numericActive].slice(0,-1):(d[numericActive]+key).slice(0,numericActive==='account'?8:6)}))}>{key}</button>:<span key={index}/>)}</div>}
 </div>
}
function HabitGrid(){return <div className="ut-habit-visual"><div className="ut-habit-grid">{Array.from({length:105},(_,i)=><i key={i} style={{opacity:[.12,.22,.36,.58,.8,.98][Math.min(5,Math.floor(Math.abs(Math.sin((i+1)*12.9898)*43758.5453)%1*5)+(i%15>8?1:0))],background:i===88?'#d9ee86':undefined}}/>)}</div><div><span>4 months ago</span><span>Today</span></div></div>}
function PaywallPreview({stage=5,miniature=false}:{stage?:number;miniature?:boolean}) {
 const [plan,setPlan]=useState('Yearly');const [trial,setTrial]=useState(false)
 const headline=stage>=1, hero=stage>=2, benefits=stage>=3, plans=stage>=4, final=stage>=5
 return <div className={`ut-paywall ${final?'ut-paywall-final':''} ${headline?'ut-paywall-headline':''} ${miniature?'ut-mini-phone':''}`}>
  <div className="ut-phone-status"><span>9:41</span><span><Signal size={12}/> ▰</span></div><div className="ut-paywall-top"><span>×</span><small>Restore</small></div>
  <div className="ut-paywall-hero">{!hero&&<span className="ut-sparkle"><Sparkles size={28}/></span>}<h3>{headline?<>Build habits that<br/>actually stick.</>:<>Unlock <em>Premium</em></>}</h3>{!headline&&<p>Get unlimited access to all features and take<br/>your habits to the next level.</p>}{hero&&<HabitGrid/>}</div>
  <div className="ut-paywall-body">{benefits?<div className="ut-benefit-icons">{[[InfinityIcon,'Unlimited','habits'],[BarChart3,'Streak','insights'],[Trophy,'Smart','reminders']].map(([Icon,first,second],i)=>{const BenefitIcon=Icon as typeof InfinityIcon;return <div key={i}><span><BenefitIcon size={18}/></span><strong>{first as string}<br/>{second as string}</strong></div>})}</div>:<ul className="ut-checklist">{['Unlimited habits','Advanced analytics','Custom themes','Priority support'].map(item=><li key={item}><Check size={11}/>{item}</li>)}</ul>}
   <div className="ut-social-proof"><b>★★★★★</b><span>Join 10,000+ happy users</span></div>
   <div className={`ut-plans ${plans?'ut-plans-two':''}`}>{(plans?['Yearly','Monthly']:['Weekly','Yearly','Monthly']).map(name=><button key={name} aria-pressed={plan===name} onClick={()=>setPlan(name)}>{name==='Yearly'&&<span className="ut-best-value">{plans?'Save 58%':'Most Popular'}</span>}<span>{name}</span><strong>{name==='Weekly'?'$4.99':name==='Yearly'?'$39.99':'$7.99'}{plans&&<small>/{name==='Yearly'?'yr':'mo'}</small>}</strong><small>{plans?(name==='Yearly'?'$3.33/mo':'Billed monthly'):(name==='Yearly'?'/year':name==='Weekly'?'/week':'/month')}</small>{plans&&<i>{plan===name&&<Check size={9}/>}</i>}</button>)}</div>
   <button className="ut-trial" onClick={()=>setTrial(true)}>{trial?'Trial preview selected':plans?'Start my free week':'Start Free Trial'}</button><p className="ut-trial-terms">{plans?`Free for 7 days, then ${plan==='Yearly'?'$39.99/year':'$7.99/month'}. Cancel anytime.`:'Cancel anytime. Terms and conditions apply.'}</p>
  </div><div className="ut-home-indicator"/>
 </div>
}
function StudyDetail({study}:{study:Study}) {
 const [stage,setStage]=useState(0)
 const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches)
 const [playing,setPlaying]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
 const [hidden,setHidden]=useState(document.hidden)
 const duration=stage===0||stage===5?10000:6500
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)')
  const motion=()=>{setReduced(preference.matches);if(preference.matches)setPlaying(false)}
  const visibility=()=>setHidden(document.hidden)
  preference.addEventListener('change',motion);document.addEventListener('visibilitychange',visibility)
  return()=>{preference.removeEventListener('change',motion);document.removeEventListener('visibilitychange',visibility)}
 },[])
 useEffect(()=>{
  if(!playing||hidden||reduced)return
  const timer=window.setTimeout(()=>setStage(current=>(current+1)%6),duration)
  return()=>window.clearTimeout(timer)
 },[stage,playing,hidden,reduced,duration])
 function chooseStage(next:number){setPlaying(false);setStage(next)}
 const isForm=study==='forms',steps=isForm?formSteps:paywallSteps
 return <><div className="ut-detail-controls"><div className="ut-before-after" aria-label="Comparison"><button aria-pressed={stage===0} onClick={()=>chooseStage(0)}>Before</button><button aria-pressed={stage===5} onClick={()=>chooseStage(5)}>After</button></div><button className="ut-playback" aria-label={playing?'Pause animation':'Play animation'} aria-pressed={playing} disabled={reduced} onClick={()=>setPlaying(p=>!p)}>{playing?<Pause size={13}/>:<Play size={13}/>}<span>{reduced?'Reduced motion':playing?'Auto-playing':'Play changes'}</span></button><a href={references[study]} target="_blank" rel="noreferrer">View reference <ArrowUpRight size={13}/></a></div><div className={`ut-detail-layout ${isForm?'ut-form-study':'ut-paywall-study'}`}><div className="ut-demo-stage"><div className="ut-auto-progress" aria-hidden="true"><i key={`${stage}-${playing}-${hidden}`} style={{animationDuration:`${duration}ms`,animationPlayState:playing&&!hidden&&!reduced?'running':'paused'}}/></div><span className="ut-demo-label">{stage===0?'Before':stage===5?'After':`Improvement ${stage} of 5`}</span><div className="ut-phone-stage ut-stage-jump" key={stage} onFocusCapture={()=>setPlaying(false)} onPointerDownCapture={()=>setPlaying(false)}><AnnotatedPreview study={study} stage={stage}>{isForm?<FormPreview key={`form-${stage}`} stage={stage}/>:<PaywallPreview key={`paywall-${stage}`} stage={stage}/>}</AnnotatedPreview></div></div><aside className="ut-explanation"><span className="eyebrow">Study notes</span><h3>{isForm?'Better forms.':'Better paywalls.'}</h3><div className="ut-step-buttons" aria-label="Improvement stages">{steps.map((step,index)=><button key={step.title} aria-pressed={stage===index} onClick={()=>chooseStage(index)}><span>{index===0?'–':String(index).padStart(2,'0')}</span>{step.title.replace(/^\d+ · /,'')}<ChevronRight size={14}/></button>)}</div><div className="ut-step-note" aria-live={playing?'off':'polite'}><Lightbulb size={19}/><div><h4>{steps[stage].title}</h4><p>{steps[stage].note}</p></div></div><SketchBreakdown study={study} stage={stage}/><div className="ut-step-navigation"><button onClick={()=>chooseStage(Math.max(0,stage-1))} disabled={stage===0}><ArrowLeft size={14}/>Previous</button><button onClick={()=>chooseStage(Math.min(5,stage+1))} disabled={stage===5}>Next<ArrowRight size={14}/></button></div><p className="ut-demo-note">Sample data. Layouts recreated; fine details approximate.</p></aside></div></>
}
// Board filter: everything, one reel, the before → after studies or the hero layouts. "reels" (old links) = every reel.
type Section='all'|'reels'|'studies'|'heroes'|(typeof reelStudies)[number]['id']
const sectionIds=['all','reels','studies','heroes',...reelStudies.map(r=>r.id)]
const forms=['forms','paywall'] as const
// Every tag used on the page, most used first; the Tag filter and the "Try" suggestions read from this.
const allTags=(()=>{const n=new Map<string,number>();[...reelStudies.flatMap(reelTags),...forms.flatMap(f=>studyTags[f]),...heroStudies.flatMap(h=>heroTags[h.id])].forEach(t=>n.set(t,(n.get(t)??0)+1));return [...n].sort((a,b)=>b[1]-a[1]).map(([t])=>t)})()
const readTips=(p=new URLSearchParams(location.search))=>({query:p.get('q')??'',tags:readList(p,'tag',allTags),section:(sectionIds.includes(p.get('section')??'')?p.get('section'):'all') as Section})

export default function UiTips(){
 const [query,setQuery]=useState(()=>readTips().query)
 const [tags,setTags]=useState<string[]>(()=>readTips().tags)
 const [section,setSection]=useState<Section>(()=>readTips().section)
 const [selected,setSelected]=useState<Study|null>(null)
 const search=useRef<HTMLInputElement>(null)
 useSlashFocus(search)
 // Filters live in the link (/ui-tips/?q=hero&tag=colour,motion&section=heroes), so a filtered view can be shared.
 useEffect(()=>{const on=()=>{if(!location.pathname.startsWith('/ui-tips'))return;const t=readTips();setQuery(t.query);setTags(t.tags);setSection(t.section)};addEventListener('routechange',on);return()=>removeEventListener('routechange',on)},[])
 useEffect(()=>{if(!location.pathname.startsWith('/ui-tips'))return;const p=new URLSearchParams();if(query)p.set('q',query);if(tags.length)p.set('tag',tags.join(','));if(section!=='all')p.set('section',section);history.replaceState(null,'',`/ui-tips/${p.size?`?${p}`:''}`)},[query,tags,section])
 const toggleTag=(t:string)=>setTags(list=>list.includes(t)?list.filter(x=>x!==t):[...list,t])
 const formMatches=(study:Study,q=query,t=tags)=>hasAnyTag(studyTags[study],t)&&matchesSearch(q,study,studyTags[study],(study==='forms'?formSteps:paywallSteps).map(step=>[step.title,step.note]),Array.from({length:6},(_,i)=>getSketchNotes(study,i).map(note=>[note.title,note.before,note.after])),study==='forms'?'bank account country currency numeric keyboard':'habit subscription trial benefits')
 // Items on the board: tips per reel, the two before → after studies and the hero layouts.
 const reelCount=(r:ReelStudy,t:string[])=>r.tips.filter(tip=>tipVisible(r,tip,query,t)).length
 const counts=(t:string[])=>({...Object.fromEntries(reelStudies.map(r=>[r.id,reelCount(r,t)])),studies:forms.filter(f=>formMatches(f,query,t)).length,heroes:heroStudies.filter(h=>heroMatches(h,query,t)).length}) as Record<string,number>
 const inView=(c:Record<string,number>,sec:Section)=>sec==='all'?Object.values(c).reduce((a,b)=>a+b,0):sec==='reels'?reelStudies.reduce((n,r)=>n+c[r.id],0):c[sec]
 // Totals ignore the search and tags; stamps show "shown / total" while a filter is on.
 const totals:Record<string,number>={...Object.fromEntries(reelStudies.map(r=>[r.id,r.tips.length])),studies:forms.length,heroes:heroStudies.length}
 const now=counts(tags),inSection=inView(now,section)
 const tally=(id:Section)=>{const a=inView(now,id),b=inView(totals,id);return a===b?`${b}`:`${a} / ${b}`}
 const tagOptions=allTags.map(t=>({id:t,count:inView(counts([t]),section)}))
 const ideas=!inSection?suggest(query,allTags).filter(t=>!tags.includes(t)):[]
 const show=(s:'reels'|'studies'|'heroes')=>section==='all'||section===s||(s==='reels'&&reelStudies.some(r=>r.id===section))
 const boardReels=reelStudies.filter(r=>section==='all'||section==='reels'||section===r.id)
 const stamps:{id:Section,big:string,em:string,cls:string}[]=[...reelStudies.map(r=>({id:r.id,...r.cover,cls:`pb-stamp-${r.id}`})),{id:'studies',big:'Before',em:'→ after.',cls:'pb-stamp-studies'},{id:'heroes',big:'Hero',em:'layouts.',cls:'pb-stamp-heroes'}]
 const dialog=useRef<HTMLDialogElement>(null)
 const opener=useRef<HTMLButtonElement|null>(null)
 useEffect(()=>{if(!selected)return;const modal=dialog.current;if(!modal)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';modal.showModal();return()=>{document.body.style.overflow=previous;if(modal.open)modal.close();opener.current?.focus({preventScroll:true})}},[selected])
 function open(study:Study,event:React.MouseEvent<HTMLButtonElement>){opener.current=event.currentTarget;setSelected(study)}
 function close(){dialog.current?.close();setSelected(null)}
 function reset(){setQuery('');setTags([]);setSection('all')}
 return <div className="page ut-page"><div className="page-title"><div><span className="eyebrow">Library / UI Designs and Tips</span><h1>UI design notes.</h1><p>Tap a note.</p></div></div>
  <div className="ut-search-row"><label className="ut-search"><Search size={17}/><input ref={search} type="search" aria-label="Search UI tips" placeholder="Search tips, e.g. pricing or hero" value={query} onChange={e=>setQuery(e.target.value)}/><SlashHint/></label>{query&&<button type="button" onClick={()=>setQuery('')}>Clear</button>}</div>
  <div className="ut-try">Try <TipTags tags={['forms','colour','hero','pricing']} active={tags} onSelect={toggleTag}/></div>
  <div className="pb-stamps" role="group" aria-label="Show">
   <button className="pb-stamp pb-stamp-all" aria-pressed={section==='all'} onClick={()=>setSection('all')}><span>{tally('all')}</span><strong>All <em>notes.</em></strong></button>
   {stamps.map(st=><button key={st.id} className={`pb-stamp ${st.cls}`} aria-pressed={section===st.id} onClick={()=>setSection(section===st.id?'all':st.id)}><span>{tally(st.id)}</span><strong>{st.big} <em>{st.em}</em></strong></button>)}
  </div>
  <div className="ut-filter-bar"><FacetFilter label="Tag" options={tagOptions} selected={tags} onChange={setTags}/><span role="status" className="ut-count">{inSection} of {inView(totals,section)}</span></div>
  <ActiveFilters items={tags.map(t=>({facet:'Tag',value:t}))} onRemove={(_,v)=>toggleTag(v)} onClear={()=>setTags([])}/>
  {!inSection&&<div className="ut-no-results"><h2>No matches.</h2><p>{ideas.length?<>Try {ideas.map((t,i)=><span key={t}>{i?', ':''}<button className="ut-idea" onClick={()=>{setQuery('');setTags([t])}}>#{t}</button></span>)}.</>:'Try another word or tag.'}</p><button onClick={reset}>Show everything</button></div>}
  <div className="pb-board">
   {show('reels')&&<ReelTiles query={query} tags={tags} reels={boardReels}/>}
   {show('studies')&&forms.filter(f=>formMatches(f)).map(study=><article className="pb-tile pb-study" key={study}><div className="pb-paper" aria-hidden="true" ref={node=>node?.setAttribute('inert','')}><div className="pb-mini">{study==='forms'?<FormPreview miniature/>:<PaywallPreview miniature/>}</div></div><h3 className="pb-title">{study==='forms'?'Better forms':'Better paywalls'}</h3><button className="pb-open" onClick={e=>open(study,e)} aria-haspopup="dialog" aria-label={study==='forms'?'Open Better forms':'Open Better paywalls'}/></article>)}
   {show('heroes')&&<HeroStudies query={query} tags={tags}/>}
  </div>
  {!!inSection&&<p className="reference-note pb-credits">Forms after <a href={references.forms} target="_blank" rel="noreferrer">zanderwhitehurst</a>. Paywall after <a href={references.paywall} target="_blank" rel="noreferrer">ux.amish</a>. Heroes after <a href={heroReference} target="_blank" rel="noreferrer">marcelodesignxh</a>.</p>}
  {selected&&<dialog className="ut-dialog" ref={dialog} aria-labelledby="ut-dialog-title" onCancel={e=>{e.preventDefault();close()}} onClose={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)close()}}><div className="ut-dialog-inner"><header className="ut-dialog-header"><div><span className="eyebrow">UI Designs and Tips / {selected==='forms'?'01':'02'}</span><h2 id="ut-dialog-title">{selected==='forms'?'Better forms':'Better paywalls'}</h2></div><button autoFocus onClick={close} aria-label="Close study"><X size={21}/></button></header><StudyDetail study={selected}/></div></dialog>}
 </div>
}
