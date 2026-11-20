// The design library brief: everything an AI assistant should read before building UI, in one Markdown file.
// Built from the same data as the site, so it grows with every tip, palette and resource. Served at /library.md
// and written to public/library.md on build (same file locally, on GitHub and on Vercel). The AI brief page shows it.
import {site} from '../seo/site'
import {webDesignList} from '../seo/pages'
import {reelStudies} from '../ui-tips/reel-data'
import {rulesMd} from '../ui-tips/rules'
import {studies} from '../palette/palettes'
import {combos, comboName} from '../palette/combos'
import {sources} from '../palette/sources'
import {categories, resources} from '../ui-library/resources'

export const briefPath = '/library.md'

const day = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})
const roles = ['base', 'support', 'accent']

/** The newest batch: reel studies and palette sources that share the latest added date. */
function whatsNew() {
  const dates = [...reelStudies.map(r => r.added), ...Object.values(sources).map(s => s.added)]
  const newest = dates.reduce((a, b) => a > b ? a : b)
  const reels = reelStudies.filter(r => r.added === newest).map(r => `UI rules from “${r.title}” (${r.tips.length})`)
  const palettes = combos.filter(c => c.added === newest).map(c => {const s = studies.find(x => x.id === c.study); return s ? `${s.site} palette` : `${comboName(c)} palette`})
  return `Added ${day(newest)}: ${[...reels, ...palettes].join('; ')}.`
}

function rulesSection() {
  const body = rulesMd(), start = body.indexOf('\n## ')
  return body.slice(start + 1).replace(/^(#{2,3}) /gm, '#$1 ').trim()
}

function paletteSection() {
  return combos.map(c => {
    const s = studies.find(x => x.id === c.study)
    const colours = c.colors.map((x, i) => `${roles[i]} ${x.name} ${x.hex}`).join(', ')
    return `- ${s ? `${s.site} · ${s.title}` : comboName(c)}: ${colours}. Moods: ${c.moods.join(', ') || 'none'}. Best contrast ${c.ratio.toFixed(1)}:1.`
  }).join('\n')
}

function librarySection() {
  return categories.map(cat => {
    const items = resources.filter(r => r.category === cat.id).map(r => {
      const url = r.url.startsWith('/') ? site + r.url : r.url
      return `- [${r.name}](${url})${r.pick ? ' (pick)' : ''}: ${r.summary} Use: ${r.use.replace(/\.$/, '')}. Tags: ${r.purpose.join(', ')}.${r.stack.length ? ` Stack: ${r.stack.join(', ')}.` : ''} Price: ${r.price}.`
    })
    return `### ${cat.name}\n${cat.line}\n\n${items.join('\n')}`
  }).join('\n\n')
}

export const briefMd = () => {
  const ruleCount = reelStudies.reduce((n, r) => n + r.tips.length, 0)
  return `# Design library brief

> From Nik Danish's design library (${site}/). Read this before building or reviewing UI. Use it on top of your own instructions; they win on conflict.

## What's new

${whatsNew()}

## How to use

1. UI rules: apply every rule below. Values are starting points; adjust when the context needs it.
2. Colour: pick the palette below whose mood fits the brief. First colour is the base (about 60%), second the support (about 30%), third the accent (about 10%). Keep text contrast at 4.5:1 or more.
3. UI Library: before building a component from scratch, look for a resource below that fits the stack, style and budget. Prefer entries marked (pick).
4. Web designs: borrow layout patterns from the sites listed at the end.

## UI rules (${ruleCount})

${rulesSection()}

## Colour palettes (${combos.length})

${paletteSection()}

## UI Library (${resources.length})

${librarySection()}

## Web designs (${webDesignList.length})

${webDesignList.map(w => `- ${w}`).join('\n')}
`
}
