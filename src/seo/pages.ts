// Static HTML for every page, built from the same data the app renders. Injected into each route's
// index.html at build time so crawlers and AI tools that don't run JavaScript can read the site.
import {categories, resources, sources, purposes, stacks, prices, installs} from '../ui-library/resources'
import {libraries} from '../ui-library/catalog'
import {references, studies as palettes} from '../palette/palettes'
import {addedOn} from '../palette/dates'
import {combos, comboName} from '../palette/combos'
import {reelStudies} from '../ui-tips/reel-data'
import {presets as playPresets} from '../playground/presets'
import {heroStudies} from '../ui-tips/hero-studies/studies'

export const site = 'https://personal-portfolio-library.vercel.app'
export type PageDoc = {path: string, name: string, title: string, description: string, body: string}

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]!)
const link = (href: string, text: string) => `<a href="${esc(href)}">${esc(text)}</a>`
const list = (items: string[]) => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`

const docs: Omit<PageDoc, 'body'>[] = [
  {path: '/', name: 'Portfolio', title: 'Nik Danish — Design Library', description: "Nik Danish's portfolio and personal collection of colour, motion and interface studies."},
  {path: '/palettes/', name: 'Colour palette', title: 'Colour palettes — Nik Danish', description: `A shelf of ${combos.length} colour combos sorted by mood, plus ${palettes.length} website palette studies.`},
  {path: '/playground/', name: 'Playground', title: 'Playground — Nik Danish', description: 'Mix a colour palette, a style, a motion and an icon set from the UI Library on one sample site.'},
  {path: '/alignment/', name: 'Text alignment', title: 'Text alignment — Nik Danish', description: 'A product-card study in alignment, grouping and a clearer reading path.'},
  {path: '/web-designs/', name: 'Web designs', title: 'Web designs — Nik Danish', description: 'Dashboard and website recreations from design reels, shown in browser windows, including a working budget dashboard and three full landing pages.'},
  {path: '/ui-tips/', name: 'UI Designs and Tips', title: 'UI design notes — Nik Danish', description: 'Searchable UI tips, UX laws, hero layout studies and before/after form and paywall studies.'},
  {path: '/ui-library/', name: 'UI Library', title: 'UI Library — Nik Danish', description: `${resources.length} UI resources in ${categories.length} categories: animated components, component kits, CSS snippets, 3D, specialty tools, inspiration, colour tools and design beyond UI.`},
]

const bodies: Record<string, () => string> = {
  '/': () => `<p>Portfolio and personal design library: colour palettes, web design recreations, UI tips and a directory of UI resources.</p>`,
  '/palettes/': () => `<h2>Colour shelf</h2>${list(combos.map(c => `${esc(comboName(c))}: ${c.colors.map(x => x.hex).join(', ')} (${c.moods.join(', ')}; contrast ${c.ratio.toFixed(1)}:1)`))}` + palettes.map(p => `<h2>${esc(p.site)} · ${esc(p.title)}</h2><p>Added ${addedOn[p.reference]}. Reference: ${link(references[p.reference].url, references[p.reference].creator)}</p>${list(p.colors.map((c, i) => `${['Base', 'Support', 'Accent'][i]}: ${esc(c.name)} ${c.hex}`))}`).join(''),
  '/playground/': () => `<p>Pick a palette, then a style, motion and icon set sampled from UI Library entries. Look-alikes are labelled and link to their library.</p>`
    + list(playPresets.map(p => `${esc(p.name)} (${p.kind}, from ${esc(resources.find(r => r.id === p.library)?.name ?? p.library)})`)),
  '/alignment/': () => `<p>Switch between centered and left-aligned product-card compositions to compare how the eye reads them.</p>`,
  '/web-designs/': () => list(['Fluento · Dashboard V15 and Word library', 'Ember · Projects dashboard', 'Code XR · Admin Dashboard V2 (overview, finance, moderation, announcements)', 'Fintrack · working budget dashboard (drag-and-drop budget board, transactions, goals, summary), after yasrinoori', 'Altaval · ski resort landing page (snow report, piste map, ski school, stays, pass builder), hero after charles.unemployed', 'Kiln Coffee · roaster landing page (shop, roast dial, subscription builder, roast curve), hero after charles.unemployed', 'Merrow Botanic Garden · orchid show landing page (events, species, glasshouses, tickets, membership), hero after charles.unemployed'].map(esc)),
  '/ui-tips/': () => reelStudies.map(r => `<h2>${esc(r.title)}</h2><p>Reference: ${link(r.url, r.author)}</p>${list(r.tips.map(t => `${esc(t.title)}: ${esc(t.do)}`))}`).join('')
    + `<h2>Hero studies</h2>${list(heroStudies.map(h => `${esc(h.name)}: ${esc(h.subtitle)}`))}`,
  '/ui-library/': () => categories.map(c => `<h2>${esc(c.name)}</h2><p>${esc(c.line)}</p>${list(resources.filter(r => r.category === c.id).map(r =>
    `${link(r.url.startsWith('/') ? site + r.url : r.url, r.name)}${r.pick ? ' (pick)' : ''}: ${esc(r.summary)} Inside: ${esc(r.inside.join(', '))}. Tags: ${esc(r.purpose.join(', '))}.${r.stack.length ? ` Stack: ${esc(r.stack.join(', '))}.` : ''} Use: ${esc(r.use)}. Price: ${r.price}.${r.similar?.length ? ` Similar to: ${esc(r.similar.map(id => resources.find(x => x.id === id)!.name).join(', '))}.` : ''} Link checked: ${r.checked}. Source: ${sources[r.via].url ? link(sources[r.via].url!, sources[r.via].label) : esc(sources[r.via].label)}.`))}`).join('')
    + `<h2>Studies</h2>${list(libraries.filter(l => l.ready).map(l => `${link(`${site}/ui-library/?showcase=${l.id}`, l.concept)}: website concept built with ${esc(l.name)}.`))}`
    + `<p>Machine-readable: ${link('/ui-library.json', 'ui-library.json')}</p>`,
}

const nav = `<nav>${docs.map(d => link(d.path, d.name)).join(' · ')}</nav>`
export const pages: PageDoc[] = docs.map(d => ({...d, body: `<div style="max-width:760px;margin:40px auto;padding:0 20px;font:15px/1.6 system-ui,sans-serif;color:#20242d">${nav}<h1>${esc(d.title.split(' — ')[0])}</h1><p>${esc(d.description)}</p>${bodies[d.path]()}</div>`}))

export const llmsTxt = () => `# Nik Danish — Design Library

> Portfolio and personal UI library: colour palettes, web design recreations, UI tips and a directory of UI resources.

## Pages
${pages.map(p => `- [${p.name}](${site}${p.path}): ${p.description}`).join('\n')}

## Data
- [UI Library directory](${site}/ui-library.json): all ${resources.length} resources with category, summary, tags, stack, how to use it, price, pick, similar resources, link-check date and source.

## UI Library filters
Links can be filtered: ${site}/ui-library/?tag=charts&stack=React&price=Free&picks=1 (also install=<method>, cat=<category id> and q=<search>). Stack shadcn means built on shadcn/ui; installing with the shadcn CLI is an install method, not a stack.
- Categories: ${categories.map(c => c.id).join(', ')}
- Tags: ${purposes.join(', ')}
- Stacks: ${stacks.join(', ')}
- Install (install=): ${installs.join(', ')}
- Prices: ${prices.join(', ')}
- Picks: ${resources.filter(r => r.pick).map(r => r.name).join(', ')}
`

export const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `<url><loc>${site}${p.path}</loc></url>`).join('')}</urlset>
`
