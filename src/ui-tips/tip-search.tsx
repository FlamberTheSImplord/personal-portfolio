export function matchesSearch(query: string, ...values: unknown[]): boolean {
 const text = values.flat(Infinity).join(' ').toLocaleLowerCase()
 return query.toLocaleLowerCase().trim().split(/\s+/).every(word => text.includes(word.replace(/^#/, '')))
}
/** Tag chips. `active` marks chips that are filtered on (or matched a search); clicking toggles them. */
export function TipTags({tags,onSelect,active=[]}:{tags:string[];onSelect?:(tag:string)=>void;active?:string[]}) {
 return <div className="ut-tags">{tags.map(tag=>onSelect?<button key={tag} type="button" onClick={()=>onSelect(tag)} aria-pressed={active.includes(tag)} aria-label={`${active.includes(tag)?'Remove filter':'Filter by'} ${tag}`}>#{tag}</button>:<span key={tag}>#{tag}</span>)}</div>
}
/** True when no tags are selected, or the item has any of them. */
export const hasAnyTag=(itemTags:readonly string[],selected:readonly string[])=>!selected.length||selected.some(t=>itemTags.includes(t))
export const studyTags = {
 forms:['forms','labels','spacing','input','accessibility'],
 paywall:['pricing','hierarchy','colour','conversion','copy'],
}
export const heroTags: Record<string,string[]> = {
 platform:['hero','layout','hierarchy','motion'],
 prosthetic:['hero','editorial','grid','product'],
 yeezy:['hero','product','colour','motion'],
 minipresso:['hero','product','layout','video'],
 zyro:['hero','typography','glow','motion'],
}
