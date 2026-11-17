// Directory search: ranked, with synonyms, and it reports which fields matched.
// Install methods (shadcn CLI, npm…) are left out on purpose: they have their own filter, and matching them
// made "shadcn" return every library that merely installs with the shadcn CLI.
import {categories, type Resource} from './resources'

// Words people type → words the data uses.
const synonyms: Record<string, string[]> = {
  icon: ['icons'], chart: ['charts'], graph: ['charts'], graphs: ['charts'],
  framer: ['motion'], 'framer-motion': ['motion'], shad: ['shadcn'], 'shadcn/ui': ['shadcn'],
  '3d': ['three.js'], three: ['three.js'], threejs: ['three.js'], webgl: ['3d', 'three.js'],
  font: ['fonts'], typography: ['fonts'], typeface: ['fonts'], brand: ['branding'], logo: ['branding', 'logos'],
  deck: ['decks'], slides: ['decks'], pitch: ['decks'], presentation: ['decks'],
  loader: ['loaders'], spinner: ['loaders'], spinners: ['loaders'], toggle: ['toggles'], switch: ['toggles'],
  button: ['buttons'], map: ['maps'], transition: ['transitions'], animation: ['motion'], animations: ['motion'],
  video: ['media players'], audio: ['media players'], player: ['media players'],
  agent: ['mcp'], agents: ['mcp'], ai: ['ai ui', 'ai tools'], chatbot: ['ai ui'],
  form: ['forms'], input: ['forms'], inputs: ['forms'], nav: ['navigation'], menu: ['navigation'], menus: ['navigation'],
  card: ['cards'], dashboard: ['dashboards'], template: ['templates'], block: ['blocks'], section: ['sections'],
  microinteractions: ['micro-interactions'], microinteraction: ['micro-interactions'], hover: ['micro-interactions'],
  paid: ['pro'],
}

/** Words the search understands, each mapped to what it searches for. Used for "Try…" suggestions. */
export const knownWords = (): [string, string][] => Object.entries(synonyms).map(([w, to]) => [w, to[0]])

const variants = (word: string, withSynonyms: boolean) => {
  const w = word.replace(/^#/, '')
  const out = new Set([w, ...(withSynonyms ? synonyms[w] ?? [] : [])])
  // Plural and singular, but leave words like "css" alone.
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) out.add(w.slice(0, -1))
  else if (w.length > 2) out.add(`${w}s`)
  return [...out]
}

// Synonyms apply to structured fields only; free text (summary, category) matches the typed word, or "framer" would
// match every summary that says "motion".
type Field = {label: string, weight: number, values: (r: Resource) => string[], show?: boolean, literal?: boolean}
const fields: Field[] = [
  {label: 'name', weight: 6, values: r => [r.name]},
  {label: 'tag', weight: 4, values: r => r.purpose, show: true},
  {label: 'stack', weight: 4, values: r => r.stack, show: true},
  {label: 'category', weight: 2, values: r => [categories.find(c => c.id === r.category)!.name], literal: true},
  {label: 'detail', weight: 2, values: r => r.inside, show: true},
  {label: 'summary', weight: 1, values: r => [r.summary], literal: true},
  {label: 'price', weight: 1, values: r => [r.price], literal: true},
]

/**
 * marks: words to highlight in the name and summary. tags: matched tags (their chips light up).
 * via: matches in fields the card doesn't show (stack, details, category), so the card can say why it's here.
 */
export type Hit = {score: number, marks: string[], tags: string[], via: {label: string, values: string[]}[]}

/** Every word must match some field. Name hits outrank tags and stack, which outrank the summary. */
export function searchResource(query: string, r: Resource): Hit | null {
  const q = query.toLocaleLowerCase().trim()
  if (!q) return {score: 0, marks: [], tags: [], via: []}
  const words = q.split(/\s+/)
  let score = 0
  const marks = new Set<string>(), tags = new Set<string>(), via = new Map<string, Set<string>>()
  for (const word of words) {
    let best = 0
    for (const f of fields) {
      const alts = variants(word, !f.literal)
      const hits = f.values(r).filter(v => alts.some(a => v.toLocaleLowerCase().includes(a)))
      if (!hits.length) continue
      best = Math.max(best, f.weight)
      if (f.label === 'name' || f.label === 'summary') alts.filter(a => hits.some(h => h.toLocaleLowerCase().includes(a))).forEach(a => marks.add(a))
      else if (f.label === 'tag') hits.forEach(h => tags.add(h))
      else if (f.label !== 'price') { const set = via.get(f.label) ?? new Set(); hits.forEach(h => set.add(h)); via.set(f.label, set) }
    }
    if (!best) return null
    score += best
  }
  const name = r.name.toLocaleLowerCase()
  if (name === q) score += 20
  else if (name.startsWith(q)) score += 6
  return {score, marks: [...marks], tags: [...tags], via: [...via].map(([label, set]) => ({label, values: [...set].slice(0, 3)}))}
}
