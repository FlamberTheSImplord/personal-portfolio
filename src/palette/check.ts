// Build check for palette data: returns plain messages, so a mistake is caught before it reaches the site.
import {references, studies} from './palettes'

const sceneName = (file: string) => file.replace(/\.tsx$/, '').toLowerCase()

export function paletteProblems(sceneFiles: string[]) {
  const problems: string[] = [], scenes = new Set(sceneFiles.filter(f => f.endsWith('.tsx')).map(sceneName)), ids = new Set<string>()
  for (const s of studies) {
    if (ids.has(s.id)) problems.push(`Palette id "${s.id}" is used twice.`)
    ids.add(s.id)
    if (!scenes.has(s.id)) problems.push(`Palette "${s.id}" has no scene: add src/palette/scenes/${s.id[0].toUpperCase()}${s.id.slice(1)}.tsx.`)
    for (const c of s.colors) if (!/^#[0-9A-F]{6}$/.test(c.hex)) problems.push(`Palette "${s.id}" has an invalid HEX: ${c.hex}.`)
    if (new Set(s.colors.map(c => c.hex)).size < s.colors.length) problems.push(`Palette "${s.id}" repeats a colour.`)
  }
  for (const scene of scenes) if (!ids.has(scene)) problems.push(`Scene "${scene}" has no palette entry in src/palette/palettes.ts.`)
  for (const id of Object.keys(references)) if (!studies.some(s => s.reference === id)) problems.push(`Source "${id}" has a note but no palette study.`)
  return problems
}
