export function matchesSearch(query: string, ...values: unknown[]): boolean {
 const text = values.flat(Infinity).join(' ').toLocaleLowerCase()
 return query.toLocaleLowerCase().trim().split(/\s+/).every(word => text.includes(word.replace(/^#/, '')))
}
export function TipTags({tags,onSelect}:{tags:string[];onSelect?:(tag:string)=>void}) {
 return <div className="ut-tags">{tags.map(tag=>onSelect?<button key={tag} type="button" onClick={()=>onSelect(tag)} aria-label={`Filter by ${tag}`}>#{tag}</button>:<span key={tag}>#{tag}</span>)}</div>
}
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
