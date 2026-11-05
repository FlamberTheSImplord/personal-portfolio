import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, ChevronRight, Infinity as InfinityIcon, Lightbulb, Signal, Sparkles, Trophy, Pause, Play, X } from 'lucide-react'
import './ui-tips.css'
import { AnnotatedPreview, SketchBreakdown } from './SketchNotes'

type Study = 'forms' | 'paywall'
const references = {
 forms: 'https://www.instagram.com/reels/Db8J5z5Oy8-/',
 paywall: 'https://www.instagram.com/p/DfPJktslgBZ/?img_index=8',
}
const paywallSteps = [
 { title:'The original', note:'A generic premium headline, a sparkle icon, a long checklist, and three competing plan cards.' },
 { title:'01 · The headline', note:'Describe the outcome: “Build habits that actually stick.” Remove the filler sentence below it.' },
 { title:'02 · The hero', note:'Replace the sparkle with a habit grid. Show the consistency someone can build over time.' },
 { title:'03 · The benefits', note:'Use three scannable icons and short labels: unlimited habits, streak insights, smart reminders.' },
 { title:'04 · The plans', note:'Reduce the choices, preselect yearly, show the saving and monthly equivalent, and explain the price after the trial.' },
 { title:'05 · The colours', note:'Use one deep-green brand colour, a calm cream surface, and more breathing room between sections.' },
]
const formSteps = [
 { title:'The original', note:'Separate labels, repeated placeholder instructions, and many competing boundaries make the form feel longer.' },
 { title:'01 · Spacing', note:'Group the fields into a consistent vertical rhythm. Make the reading path and next action easier to follow.' },
 { title:'02 · Persistent labels', note:'Keep the field’s meaning visible after typing. Country and currency keep their context as values change.' },
 { title:'03 · Control shape', note:'Use consistent rounded fields and a full-width action, following the reel’s compact form revision.' },
 { title:'04 · Focused entry', note:'The bank-details example pairs numeric fields with a number pad and a direct next-field action. Click Account number or Sort code to try it.' },
 { title:'05 · The result', note:'The final dark bank-details screen brings the title, account type, persistent labels, rounded fields, and action together.' },
]

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
 return <><div className="ut-detail-controls"><div className="ut-before-after" aria-label="Comparison"><button aria-pressed={stage===0} onClick={()=>chooseStage(0)}>Before</button><button aria-pressed={stage===5} onClick={()=>chooseStage(5)}>After</button></div><button className="ut-playback" aria-label={playing?'Pause animation':'Play animation'} aria-pressed={playing} disabled={reduced} onClick={()=>setPlaying(p=>!p)}>{playing?<Pause size={13}/>:<Play size={13}/>}<span>{reduced?'Reduced motion':playing?'Auto-playing':'Play changes'}</span></button><a href={references[study]} target="_blank" rel="noreferrer">View reference <ArrowUpRight size={13}/></a></div><div className={`ut-detail-layout ${isForm?'ut-form-study':'ut-paywall-study'}`}><div className="ut-demo-stage"><div className="ut-auto-progress" aria-hidden="true"><i key={`${stage}-${playing}-${hidden}`} style={{animationDuration:`${duration}ms`,animationPlayState:playing&&!hidden&&!reduced?'running':'paused'}}/></div><span className="ut-demo-label">{stage===0?'Before':stage===5?'After':`Improvement ${stage} of 5`}</span><div className="ut-phone-stage ut-stage-jump" key={stage} onFocusCapture={()=>setPlaying(false)} onPointerDownCapture={()=>setPlaying(false)}><AnnotatedPreview study={study} stage={stage}>{isForm?<FormPreview key={`form-${stage}`} stage={stage}/>:<PaywallPreview key={`paywall-${stage}`} stage={stage}/>}</AnnotatedPreview></div></div><aside className="ut-explanation"><span className="eyebrow">The breakdown</span><h3>{isForm?'Make forms feel effortless.':'Make the value obvious.'}</h3><div className="ut-step-buttons" aria-label="Improvement stages">{steps.map((step,index)=><button key={step.title} aria-pressed={stage===index} onClick={()=>chooseStage(index)}><span>{index===0?'–':String(index).padStart(2,'0')}</span>{step.title.replace(/^\d+ · /,'')}<ChevronRight size={14}/></button>)}</div><div className="ut-step-note" aria-live={playing?'off':'polite'}><Lightbulb size={19}/><div><h4>{steps[stage].title}</h4><p>{steps[stage].note}</p></div></div><SketchBreakdown study={study} stage={stage}/><div className="ut-step-navigation"><button onClick={()=>chooseStage(Math.max(0,stage-1))} disabled={stage===0}><ArrowLeft size={14}/>Previous</button><button onClick={()=>chooseStage(Math.min(5,stage+1))} disabled={stage===5}>Next<ArrowRight size={14}/></button></div><p className="ut-demo-note">Interactive study with sample data. No payment or bank details are sent anywhere. Layout and teaching points follow the references; exact fonts and fine visual details are approximations.</p></aside></div></>
}
export default function UiTips(){
 const [selected,setSelected]=useState<Study|null>(null)
 const dialog=useRef<HTMLDialogElement>(null)
 const opener=useRef<HTMLButtonElement|null>(null)
 useEffect(()=>{if(!selected)return;const modal=dialog.current;if(!modal)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';modal.showModal();return()=>{document.body.style.overflow=previous;if(modal.open)modal.close();opener.current?.focus({preventScroll:true})}},[selected])
 function open(study:Study,event:React.MouseEvent<HTMLButtonElement>){opener.current=event.currentTarget;setSelected(study)}
 function close(){dialog.current?.close();setSelected(null)}
 return <div className="page ut-page"><div className="page-title"><div><span className="eyebrow">Library / UI Designs and Tips</span><h1>Small changes. Better interfaces.</h1><p>Two before-and-after studies. Open a card to explore the design and the decisions behind it.</p></div></div><div className="ut-study-grid">{(['forms','paywall'] as const).map((study,index)=><article className={`ut-study-card ut-card-${study}`} key={study}><div className="ut-square"><div className="ut-card-badges"><span>0{index+1} / UI study</span><span>Before → After</span></div><div className="ut-card-phones" aria-hidden="true" ref={node=>node?.setAttribute('inert','')}>{study==='forms'?<><div className="ut-card-before"><FormPreview stage={0} miniature/></div><div className="ut-card-after"><FormPreview miniature/></div></>:<><div className="ut-card-before"><PaywallPreview stage={0} miniature/></div><div className="ut-card-after"><PaywallPreview miniature/></div></>}</div><span className="ut-expand-icon"><ArrowUpRight size={20}/></span></div><div className="ut-card-caption"><div><h2>{study==='forms'?'Better forms':'Better paywalls'}</h2><p>{study==='forms'?'Labels, spacing & focused input':'Five fixes for a habit-app paywall'}</p></div><ArrowUpRight size={20}/></div><button className="ut-card-open" onClick={e=>open(study,e)} aria-haspopup="dialog" aria-label={study==='forms'?'Open Better forms':'Open Better paywalls'}/></article>)}</div><p className="reference-note">Studies based on zanderwhitehurst’s form breakdown and ux.amish’s paywall redesign. Click a square to view the full recreation and each improvement.</p>{selected&&<dialog className="ut-dialog" ref={dialog} aria-labelledby="ut-dialog-title" onCancel={e=>{e.preventDefault();close()}} onClose={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)close()}}><div className="ut-dialog-inner"><header className="ut-dialog-header"><div><span className="eyebrow">UI Designs and Tips / {selected==='forms'?'01':'02'}</span><h2 id="ut-dialog-title">{selected==='forms'?'Better forms':'Better paywalls'}</h2></div><button autoFocus onClick={close} aria-label="Close study"><X size={21}/></button></header><StudyDetail study={selected}/></div></dialog>}</div>
}
