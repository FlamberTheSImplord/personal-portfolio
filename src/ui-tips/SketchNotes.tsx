import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import './sketch-notes.css'
import { TipTags, studyTags } from './tip-search'

type Study = 'forms' | 'paywall'
type Note = { target: string; title: string; before: string; after: string }
const notes: Record<Study, Note[][]> = {
 forms: [
  [
   {target:'.ut-select-field',title:'Keep context together',before:'Labels detached from values.',after:'Keep label and value together.'},
   {target:'.ut-bank-input:has(input[aria-label="First name"])',title:'Show an example',before:'A label without a format hint.',after:'Show “e.g. Nik” on focus.'},
   {target:'.ut-bank-continue',title:'Match the controls',before:'An unrelated button shape.',after:'Match the fields. Keep contrast.'},
  ],
  [{target:'.ut-bank-fields',title:'Space the fields',before:'A dense stack.',after:'Use a consistent gap.'}],
  [
   {target:'.ut-select-field',title:'Keep labels visible',before:'Placeholders vanish on entry.',after:'Keep the label after typing.'},
   {target:'.ut-bank-input:has(input[aria-label="Sort code"])',title:'Show the format',before:'“Sort code” as its own hint.',after:'Show “e.g. 12-34-56”.'},
  ],
  [
   {target:'.ut-bank-input:has(input[aria-label="Account number"])',title:'One field shape',before:'Competing hard outlines.',after:'Use one rounded field shape.'},
   {target:'.ut-bank-continue',title:'Match the action',before:'Different corners on the button.',after:'Match the fields’ radius.'},
  ],
  [
   {target:'.ut-bank-input:has(input[aria-label="Account number"])',title:'Use numeric entry',before:'A text keyboard for numbers.',after:'Open the number pad.'},
   {target:'.ut-bank-input:has(input[aria-label="Sort code"])',title:'Format as you type',before:'An abstract ##-##-## mask.',after:'Show a real example. Add separators.'},
  ],
  [
   {target:'.ut-bank-head',title:'Name the task',before:'“Send money”.',after:'“Bank account details”.'},
   {target:'.ut-account-types',title:'Show account type',before:'No visible account choice.',after:'Business / Individual.'},
   {target:'.ut-bank-input:has(input[aria-label="Sort code"])',title:'Keep the format clear',before:'Repeated placeholder labels.',after:'Persistent label. Example on focus.'},
   {target:'.ut-bank-continue',title:'One next step',before:'Competing outlines.',after:'A clear Continue button.'},
  ],
 ],
 paywall: [
  [
   {target:'.ut-paywall-hero',title:'Lead with the outcome',before:'“Unlock Premium”.',after:'“Build habits that actually stick”.'},
   {target:'.ut-checklist',title:'Less to read',before:'A long checklist.',after:'Three short benefit labels.'},
   {target:'.ut-plans',title:'Make plans clear',before:'Three similar options.',after:'Yearly recommended. Monthly available.'},
  ],
  [{target:'.ut-paywall-hero h3',title:'Say what users get',before:'A subscription-tier headline.',after:'A clear outcome. Drop the filler.'}],
  [{target:'.ut-habit-visual',title:'Show the product',before:'A decorative sparkle.',after:'Show the habit grid.'}],
  [{target:'.ut-benefit-icons',title:'Make benefits scannable',before:'A dense checklist.',after:'Three icons. Three short labels.'}],
  [
   {target:'.ut-plans',title:'Recommend transparently',before:'Three equal-weight plans.',after:'Yearly selected. Savings visible.'},
   {target:'.ut-trial-terms',title:'Show the later price',before:'Trial terms hide the cost.',after:'State the price after seven days.'},
  ],
  [
   {target:'.ut-paywall-hero',title:'One colour direction',before:'Competing purple gradients.',after:'Deep green. Cream. One accent.'},
   {target:'.ut-benefit-icons',title:'Give benefits room',before:'A dense checklist.',after:'Space and group three benefits.'},
   {target:'.ut-plans',title:'Compare the plans',before:'Three competing plans.',after:'Two plans. Clear billing periods.'},
   {target:'.ut-trial',title:'Keep terms by the action',before:'“Start Free Trial” alone.',after:'Put the post-trial price below it.'},
  ],
 ],
}

export function getSketchNotes(study: Study, stage: number) { return notes[study][stage] }

type Mark = { x: number; y: number; width: number; height: number; number: number }
export function AnnotatedPreview({ study, stage, children }: { study: Study; stage: number; children: ReactNode }) {
 const root = useRef<HTMLDivElement>(null)
 const [marks, setMarks] = useState<Mark[]>([])
 useLayoutEffect(() => {
  const element = root.current
  if (!element) return
  let frame = 0
  const measure = () => {
   const bounds = element.getBoundingClientRect()
   const scale = bounds.width / element.offsetWidth || 1
   const next = getSketchNotes(study, stage).flatMap((note,index) => {
    const target = element.querySelector<HTMLElement>(note.target)
    if (!target) return []
    const box = target.getBoundingClientRect()
    return [{x:(box.left-bounds.left)/scale-4,y:(box.top-bounds.top)/scale-4,width:box.width/scale+8,height:box.height/scale+8,number:index+1}]
   })
   setMarks(next)
  }
  const queue = () => {cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)}
  const observer = new ResizeObserver(queue)
  observer.observe(element)
  getSketchNotes(study,stage).forEach(note=>{const target=element.querySelector(note.target);if(target)observer.observe(target)})
  element.addEventListener('focusin',queue)
  element.addEventListener('focusout',queue)
  measure()
  return () => {observer.disconnect();cancelAnimationFrame(frame);element.removeEventListener('focusin',queue);element.removeEventListener('focusout',queue)}
 }, [study,stage])
 return <div className={`ut-annotated-preview ${stage===0?'ut-sketch-before':'ut-sketch-after'}`} ref={root}>{children}<svg className="ut-sketch-layer" aria-hidden="true" width="300" height="100%">{marks.map(mark=>{
  const {x,y,width:w,height:h,number}=mark
  const right=number%2===0, badgeX=right?312:-12, badgeY=y+Math.min(h/2,30)
  const targetX=right?x+w:x, targetY=y+Math.min(h/2,30)
  const outline=`M ${x+10} ${y+1} Q ${x+w*.5} ${y-2} ${x+w-7} ${y+2} Q ${x+w+2} ${y+5} ${x+w} ${y+13} L ${x+w-1} ${y+h-9} Q ${x+w} ${y+h+2} ${x+w-12} ${y+h} Q ${x+w*.45} ${y+h+3} ${x+7} ${y+h-1} Q ${x-2} ${y+h} ${x} ${y+h-12} L ${x+1} ${y+12} Q ${x-2} ${y+1} ${x+10} ${y+1}`
  return <g key={number} className="ut-sketch-mark" style={{animationDelay:`${number*65}ms`}}><path className="ut-sketch-wash" d={outline}/><path d={outline}/><path className="ut-sketch-echo" d={outline} transform="translate(1.8 -1.3) rotate(.35 150 300)"/><path d={`M ${badgeX+(right?-10:10)} ${badgeY} Q ${(badgeX+targetX)/2} ${badgeY-6} ${targetX} ${targetY}`}/><path d={`M ${targetX+(right?5:-5)} ${targetY-4} L ${targetX} ${targetY} L ${targetX+(right?5:-5)} ${targetY+4}`}/><circle cx={badgeX} cy={badgeY} r="10"/><text x={badgeX} y={badgeY+3.5}>{number}</text></g>
 })}</svg></div>
}

export function SketchBreakdown({study,stage}:{study:Study;stage:number}) {
 return <section className={`ut-sketch-breakdown ${stage===0?'ut-sketch-before':'ut-sketch-after'}`} aria-label="Annotated changes"><div className="ut-sketch-heading"><span>✎</span><h4>{'Sketch notes'}</h4></div>{getSketchNotes(study,stage).map((note,index)=><article className="ut-change-note" key={note.title}><span className="ut-change-number">{index+1}</span><div><h5>{note.title}</h5><TipTags tags={studyTags[study]}/><p className="ut-change-before"><b>Don’t</b>{note.before}</p><p className="ut-change-after"><b>Do</b>{note.after}</p></div></article>)}</section>
}
