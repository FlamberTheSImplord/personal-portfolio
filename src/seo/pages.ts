// Static HTML for every page, built from the same data the app renders. Injected into each route's
// index.html at build time so crawlers and AI tools that don't run JavaScript can read the site.
import {categories, resources, sources} from '../ui-library/resources'
import {libraries} from '../ui-library/catalog'
import {references, studies as palettes} from '../palette/palettes'
import {reelStudies} from '../ui-tips/reel-data'
import {heroStudies} from '../ui-tips/hero-studies/studies'

export const site = 'https://personal-portfolio-library.vercel.app'
export type PageDoc = {path: string, name: string, title: string, description: string, body: string}

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]!)
const link = (href: string, text: string) => `<a href="${esc(href)}">${esc(text)}</a>`
const list = (items: string[]) => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`

const docs: Omit<PageDoc, 'body'>[] = [
  {path: '/', name: 'Portfolio', title: 'Nik Danish — Design Library', description: "Nik Danish's portfolio and personal collection of colour, motion and interface studies."},
  {path: '/palettes/', name: 'Colour palette', title: 'Colour palettes — Nik Danish', description: 'Five website palettes, each shown compact (two colours) and full (with one accent).'},
  {path: '/alignment/', name: 'Text alignment', title: 'Text alignment — Nik Danish', description: 'A product-card study in alignment, grouping and a clearer reading path.'},
  {path: '/web-designs/', name: 'Web designs', title: 'Web designs — Nik Danish', description: 'Dashboard and website recreations from design reels, shown in browser windows.'},
  {path: '/ui-tips/', name: 'UI Designs and Tips', title: 'UI design notes — Nik Danish', description: 'Searchable UI tips, UX laws, hero layout studies and before/after form and paywall studies.'},
  {path: '/ui-library/', name: 'UI Library', title: 'UI Library — Nik Danish', description: `${resources.length} UI resources in ${categories.length} categories: animated components, component kits, CSS snippets, 3D and inspiration.`},
]

const bodies: Record<string, () => string> = {
  '/': () => `<p>Portfolio and personal design library: colour palettes, web design recreations, UI tips and a directory of UI resources.</p>`,
  '/palettes/': () => palettes.map(p => `<h2>${esc(p.site)} · ${esc(p.title)}</h2><p>Reference: ${link(references[p.reference].url, references[p.reference].creator)}</p>${list(p.colors.map((c, i) => `${['Base', 'Support', 'Accent'][i]}: ${esc(c.name)} ${c.hex}`))}`).join(''),
  '/alignment/': () => `<p>Switch between centered and left-aligned product-card compositions to compare how the eye reads them.</p>`,
  '/web-designs/': () => list(['Fluento · Dashboard V15 and Word library', 'Ember · Projects dashboard', 'Code XR · Admin Dashboard V2 (overview, finance, moderation, announcements)'].map(esc)),
  '/ui-tips/': () => reelStudies.map(r => `<h2>${esc(r.title)}</h2><p>Reference: ${link(r.url, r.author)}</p>${list(r.tips.map(t => `${esc(t.title)}: ${esc(t.do)}`))}`).join('')
    + `<h2>Hero studies</h2>${list(heroStudies.map(h => `${esc(h.name)}: ${esc(h.subtitle)}`))}`,
  '/ui-library/': () => categories.map(c => `<h2>${esc(c.name)}</h2><p>${esc(c.line)}</p>${list(resources.filter(r => r.category === c.id).map(r =>
    `${link(r.url.startsWith('/') ? site + r.url : r.url, r.name)}: ${esc(r.summary)} Inside: ${esc(r.inside.join(', '))}. Use: ${esc(r.use)}. Price: ${r.price}. Source: ${link(sources[r.via].url, sources[r.via].label)}.`))}`).join('')
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
- [UI Library directory](${site}/ui-library.json): every resource with category, summary, tags, how to use it, price and source.
`

export const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `<url><loc>${site}${p.path}</loc></url>`).join('')}</urlset>
`
