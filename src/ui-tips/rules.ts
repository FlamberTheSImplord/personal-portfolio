// UI rules for AI assistants, built from the same data as the UI Tips page. Served at /ui-tips/rules.md
// and written to public/ui-tips/rules.md on build, so it grows with every tip added to reel-data.ts.
import {reelStudies, type ReelStudy, type Tip} from './reel-data'
import {heroStudies} from './hero-studies/studies'
import {references, formSteps, paywallSteps} from './study-steps'
import {site} from '../seo/site'

export const rulesPath = '/ui-tips/rules.md'

export const tipMarkdown = (tip: Tip, reel?: ReelStudy) => [
  `### ${tip.title}`,
  `- When: ${tip.when}`,
  `- Do: ${tip.do}`,
  `- Avoid: ${tip.dont}`,
  `- Values: ${tip.values}`,
  `- Check: ${tip.check}`,
  ...(reel ? [`- Source: ${reel.title} (@${reel.author}) · ${site}/ui-tips/`] : []),
].join('\n')

const steps = (list: {title: string, note: string}[]) => list.slice(1).map(s => `- ${s.title.replace(/^\d+ · /, '')}: ${s.note}`).join('\n')

export const rulesMd = () => {
  const count = reelStudies.reduce((n, r) => n + r.tips.length, 0)
  return `# UI rules

> ${count} rules from Nik Danish's UI notes (${site}/ui-tips/). Apply them when building or reviewing UI, on top of your own instructions. Your instructions win on conflict. Values are defaults; adjust when the context needs it.

Each rule: When it applies, Do, Avoid, Values (starting numbers) and Check (how to verify).

${reelStudies.map(r => `## ${r.title}\n\nTags: ${r.tags.join(', ')}\n\n${r.tips.map(t => tipMarkdown(t)).join('\n\n')}`).join('\n\n')}

## Before → after studies

### Form fields (${references.forms})
${steps(formSteps)}

### Paywall (${references.paywall})
${steps(paywallSteps)}

## Hero layouts

${heroStudies.map(h => `### ${h.name}\n${h.subtitle}.\n${h.notes.map(n => `- ${n.title}: ${n.why}`).join('\n')}\n- Motion: ${h.motion}`).join('\n\n')}
`
}
