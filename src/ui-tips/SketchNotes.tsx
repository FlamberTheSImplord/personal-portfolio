import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import './sketch-notes.css'

type Study = 'forms' | 'paywall'
type Note = { target: string; title: string; before: string; after: string; why: string }
const notes: Record<Study, Note[][]> = {
 forms: [
  [
   {target:'.ut-select-field',title:'Context lives outside the control',before:'Labels and values sit in separate blocks.',after:'Bring the label and value into one compact field.',why:'The relationship remains clear while scanning or entering information.'},
   {target:'.ut-bank-input:has(input[aria-label="First name"])',title:'An empty field needs an example',before:'A field label alone does not demonstrate the expected text.',after:'Keep “First name” and show “e.g. Nik” on focus.',why:'A label explains what belongs here; an example shows how to enter it.'},
   {target:'.ut-bank-continue',title:'A separate action style',before:'The sharp rectangular button feels disconnected from the controls.',after:'Use a full-width, rounded action with clear contrast.',why:'One consistent visual language makes the next step easier to recognise.'},
  ],
  [{target:'.ut-bank-fields',title:'Give the fields a consistent rhythm',before:'The original packs labels and inputs into a dense stack.',after:'Increase the repeated gap between fields at this step.',why:'Predictable spacing separates one question from the next without adding more borders.'}],
  [
   {target:'.ut-select-field',title:'Preserve the question after entry',before:'A placeholder disappears as soon as a value is entered.',after:'Keep the country label visible alongside the selected country.',why:'People can review what a value means without deleting it or remembering the previous state.'},
   {target:'.ut-bank-input:has(input[aria-label="Sort code"])',title:'Label and example have different jobs',before:'Repeating “Sort code” does not explain its format.',after:'Use the label “Sort code” and the hint “e.g. 12-34-56”.',why:'The expected six-digit pattern is explicit, and the typed value is formatted automatically.'},
  ],
  [
   {target:'.ut-bank-input:has(input[aria-label="Account number"])',title:'A shared control shape',before:'Outlined rectangles create many hard boundaries.',after:'Give the fields a consistent rounded silhouette.',why:'The controls read as one related group, rather than a collection of unrelated boxes.'},
   {target:'.ut-bank-continue',title:'Carry the shape into the action',before:'The button uses a different corner treatment.',after:'Round the primary action and keep it full width.',why:'The eye can follow the same shape language from the fields to the final action.'},
  ],
  [
   {target:'.ut-bank-input:has(input[aria-label="Account number"])',title:'Match entry to the information',before:'Numeric bank fields can look like ordinary text fields.',after:'Focus this field to reveal an eight-digit example and the number pad.',why:'The example and available keys reduce guessing about what kind of information to enter.'},
   {target:'.ut-bank-input:has(input[aria-label="Sort code"])',title:'Format the value, not a hash mask',before:'A mask such as ##-##-## explains shape without showing a realistic example.',after:'Show e.g. 12-34-56; insert the separators while typing.',why:'A real example is easier to understand. The next-field arrow moves from account number to sort code.'},
  ],
  [
   {target:'.ut-bank-head',title:'Name the task clearly',before:'The original heading says “Send money”.',after:'The final screen says “Bank account details”.',why:'The title describes the information being requested at this point in the flow.'},
   {target:'.ut-account-types',title:'Make the account context visible',before:'There is no visible choice of recipient account type.',after:'Group Business and Individual in a compact segmented control.',why:'The selected account type remains easy to find and change.'},
   {target:'.ut-bank-input:has(input[aria-label="Sort code"])',title:'Keep context and format together',before:'Repeated placeholder instructions compete with the values.',after:'Use a persistent label and a realistic format example on focus.',why:'The field remains understandable before, during and after typing. Try it to pause the animation.'},
   {target:'.ut-bank-continue',title:'One unmistakable next step',before:'Several outlines compete with the primary action.',after:'Use a high-contrast rounded Continue button on the dark surface.',why:'The final action stands apart while matching the rest of the controls.'},
  ],
 ],
 paywall: [
  [
   {target:'.ut-paywall-hero',title:'Sell the outcome, not the tier',before:'“Unlock Premium” names a subscription level.',after:'“Build habits that actually stick” describes the benefit.',why:'People can connect the offer to something they want to achieve.'},
   {target:'.ut-checklist',title:'Reduce the reading burden',before:'Four checklist lines must be read one by one.',after:'Use three icons with concise benefit labels.',why:'The benefits become easier to scan at a glance.'},
   {target:'.ut-plans',title:'Make the choice and price clearer',before:'Three similar cards compete for attention.',after:'Recommend yearly while keeping monthly available.',why:'Billing details and the trade-off become easier to compare.'},
  ],
  [{target:'.ut-paywall-hero h3',title:'Lead with the result',before:'“Unlock Premium” explains what the tier is called.',after:'“Build habits that actually stick” explains what users get.',why:'The shorter headline carries the value proposition, so the filler sentence can go.'}],
  [{target:'.ut-habit-visual',title:'Show the promise of the product',before:'A sparkle icon is decorative and generic.',after:'Use a grid of habit days, from four months ago to today.',why:'The visual makes long-term consistency tangible, rather than asking users to imagine it.'}],
  [{target:'.ut-benefit-icons',title:'Three quick visual entry points',before:'A long checklist requires line-by-line reading.',after:'Pair icons with Unlimited habits, Streak insights and Smart reminders.',why:'Short labels and recognisable symbols help users understand the offer faster.'}],
  [
   {target:'.ut-plans',title:'Recommend one option transparently',before:'Weekly, yearly and monthly plans have similar visual weight.',after:'Preselect yearly, show Save 58%, and keep monthly available.',why:'The recommendation is visible, while people still retain a clear alternative.'},
   {target:'.ut-trial-terms',title:'Say what happens after the trial',before:'The trial CTA hides the later price in generic terms.',after:'State seven free days and the selected plan’s actual billing price.',why:'People can understand the commitment before selecting the trial.'},
  ],
  [
   {target:'.ut-paywall-hero',title:'One clear visual direction',before:'Several purple gradients compete with the content.',after:'Use one deep-green hero, an outcome headline and the habit grid.',why:'The visual identity supports the product story instead of competing with it.'},
   {target:'.ut-benefit-icons',title:'Create room to scan',before:'Benefits appear as a dense checklist.',after:'Give the three icon-led benefits their own calm cream section.',why:'Grouping and whitespace make the hierarchy easier to read.'},
   {target:'.ut-plans',title:'A clear recommended plan',before:'Three similarly weighted plans demand more comparison.',after:'Two plans, yearly selected, a saving label and monthly equivalent.',why:'The key difference can be understood without mental arithmetic.'},
   {target:'.ut-trial',title:'Connect action to honest terms',before:'The gradient button says only “Start Free Trial”.',after:'“Start my free week” sits directly above the post-trial billing details.',why:'The CTA and its consequence stay together at the decision point.'},
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
 return <section className={`ut-sketch-breakdown ${stage===0?'ut-sketch-before':'ut-sketch-after'}`} aria-label="Annotated changes"><div className="ut-sketch-heading"><span>✎</span><h4>{stage===0?'What needs attention':'Follow the numbered marks'}</h4></div>{getSketchNotes(study,stage).map((note,index)=><article className="ut-change-note" key={note.title}><span className="ut-change-number">{index+1}</span><div><h5>{note.title}</h5><p className="ut-change-before"><b>Before</b>{note.before}</p><p className="ut-change-after"><b>After</b>{note.after}</p><p className="ut-change-why"><b>Why it helps</b>{note.why}</p></div></article>)}</section>
}
