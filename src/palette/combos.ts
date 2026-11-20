// Colour combos for the shelf. Add combos here only: moods (which books a combo sits in) are worked out
// from the HEX values, so the shelf stays sorted at any size.
import {studies, type SceneId, type Swatch} from './palettes'
import {sources, type SourceId} from './sources'
import {contrast, grade} from './color'
import {hueGap, oklch, type Oklch} from './oklch'
import {addedOn} from './dates'

export const comboSources = sources
export type ComboSource = SourceId

export type Combo = {id: string, colors: Swatch[], source: ComboSource, study?: SceneId}

const pair = (a: string, ah: string, b: string, bh: string): Combo => ({
  id: `${a}-${b}`.toLowerCase().replace(/\s+/g, '-'), source: '346eur', colors: [{name: a, hex: ah}, {name: b, hex: bh}],
})

// HEX as printed on the 346eur swatch cards.
const raw: Combo[] = [
  pair('Morning Butter', '#F3D98F', 'Blue Grey', '#7298C7'),
  pair('Petal Frost', '#FEDDE8', 'Berry Blush', '#974472'),
  pair('Cool Blue', '#D8EFFD', 'Plum Noir', '#341F28'),
  pair('Lime Cream', '#DDEA78', 'Vintage Grape', '#433455'),
  pair('Sand Dune', '#DDD6B9', 'Hunter Green', '#3E5F44'),
  pair('Cherry Blossom', '#EFA8AC', 'Phthalo Green', '#00382E'),
  pair('Cream', '#FFFEC5', 'Dark Coffee', '#39241F'),
  ...studies.map(s => ({id: s.id, source: s.reference, study: s.id, colors: [...s.colors]})),
  // pierredelcourr's colourways for the Base Club and Tennis designs. Raspberry Pink and Azure Navy are sampled:
  // their printed labels don't match the colour shown. The accents are sampled too (labels too small to read).
  {id: 'club-raspberry', source: 'pierre', colors: [{name: 'Raspberry Pink', hex: '#CD096B'}, {name: 'Mellow White', hex: '#FEFDFE'}, {name: 'Pastel Turquoise', hex: '#62FAC7'}]},
  {id: 'tennis-azure', source: 'pierre', colors: [{name: 'Azure Navy', hex: '#044A88'}, {name: 'Snowy White', hex: '#FEFDFE'}, {name: 'Coral Red', hex: '#FE5F4C'}]},
]

export const books = [
  {id: 'dark', name: 'Dark'},
  {id: 'light', name: 'Light'},
  {id: 'pastel', name: 'Pastel'},
  {id: 'vivid', name: 'Vivid'},
  {id: 'earthy', name: 'Earthy'},
  {id: 'muted', name: 'Muted'},
  {id: 'mono', name: 'Mono'},
  {id: 'gradient', name: 'Gradient'},
] as const
export type BookId = typeof books[number]['id']

/** A two-colour gradient reads smooth when the hues aren't opposite (no grey middle) and lightness doesn't jump. */
function blendsCleanly(a: Oklch, b: Oklch) {
  if (hueGap(a.h, b.h) > 150 && a.c > .05 && b.c > .05) return false // opposite hues pass through grey
  return Math.abs(a.l - b.l) < .45
}

function moodsOf(o: Oklch[]): BookId[] {
  const dark = Math.min(...o.map(x => x.l)), light = Math.max(...o.map(x => x.l)), maxC = Math.max(...o.map(x => x.c))
  const avgC = o.reduce((s, x) => s + x.c, 0) / o.length, chromatic = o.filter(x => x.c > .03)
  const m: BookId[] = []
  if (o[0].l < .32 || (dark < .4 && o.filter(x => x.l < .45).length >= o.length / 2)) m.push('dark')
  if (o[0].l > .9) m.push('light')
  if (o.some(x => x.l > .84 && x.c > .03 && x.c < .13)) m.push('pastel')
  if (maxC > .145) m.push('vivid')
  if (o.some(x => x.c > .015 && x.c < .13 && ((x.h > 15 && x.h < 115) || (x.h >= 115 && x.h < 165 && x.l < .55)))) m.push('earthy')
  if (avgC < .085 && maxC < .15 && light - dark > .2) m.push('muted')
  if (maxC < .2 && (chromatic.length === 0 || chromatic.every(x => hueGap(x.h, chromatic[0].h) < 25))) m.push('mono')
  if (o.slice(1).some((x, i) => blendsCleanly(o[i], x))) m.push('gradient')
  return m
}

export type ShelfCombo = Combo & {added: string, moods: BookId[], hues: number[], ratio: number, grade: string, search: string}

export const combos: ShelfCombo[] = raw.map(c => {
  const o = c.colors.map(s => oklch(s.hex))
  let ratio = 1
  for (const a of c.colors) for (const b of c.colors) ratio = Math.max(ratio, contrast(a.hex, b.hex))
  return {...c, added: addedOn[c.source], moods: moodsOf(o), hues: o.filter(x => x.c > .04).map(x => x.h), ratio, grade: grade(ratio),
    search: [...c.colors.flatMap(s => [s.name, s.hex]), comboSources[c.source].creator].join(' ').toLowerCase()}
})

export const comboById = (id: string | null) => combos.find(c => c.id === id)
export const comboName = (c: Combo) => c.colors.map(s => s.name).join(' · ')

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const asCss = (c: Combo) => `:root {\n${c.colors.map(s => `  --${slug(s.name)}: ${s.hex};`).join('\n')}\n}`
export const asTailwind = (c: Combo) => `@theme {\n${c.colors.map(s => `  --color-${slug(s.name)}: ${s.hex};`).join('\n')}\n}`
