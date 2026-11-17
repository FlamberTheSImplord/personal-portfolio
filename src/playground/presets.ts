// Playground presets, one registry for every library. Add a batch by appending entries: the controls,
// grouping, coverage count and credits all read from here. Every preset links back to its UI Library entry.
//
// origin 'inspired': my own look-alike of something the library is known for (no code copied).
// origin 'ported': adapted from the library's open-source code, credited to it.
import {resources, type CategoryId} from '../ui-library/resources'

export type Kind = 'style' | 'motion' | 'icons' | 'loader' | 'visual' | 'toggle'
type Base = {id: string, name: string, library: string, origin: 'inspired' | 'ported'}

export type Effect = 'spotlight' | 'beam' | 'shine' | 'grid' | 'dots' | 'texture' | 'push' | 'neu' | 'gradient' | 'shimmer-text' | 'gborder' | 'ripple' | 'grain'
export type StylePreset = Base & {kind: 'style', radius: number, button: number, border: 'none' | 'hairline' | 'bold', shadow: 'none' | 'soft' | 'hard', surface: 'tint' | 'plain' | 'outline', effects: Effect[], weight: 500 | 600 | 700, font?: 'serif' | 'mono', layout?: 'bento'}

/** Starting state of an entrance; everything animates to rest. clip reveals from the bottom edge up ('left': from the left).
 *  alternate flips x on every other element, so blocks arrive from both sides. */
type Enter = {opacity?: number, x?: number, y?: number, scale?: number, blur?: number, rotate?: number, rotateX?: number, clip?: boolean | 'left', alternate?: boolean}
export type MotionPreset = Base & {kind: 'motion', enter: Enter, spring?: {stiffness: number, damping: number}, duration?: number, stagger: number, text?: 'letters' | 'words', hover: 'lift' | 'tilt' | 'scale' | 'press' | 'magnet' | 'none'}

export type IconSet = 'lucide' | 'tabler' | 'phosphor' | 'fontawesome' | 'devigner'
export type IconPreset = Base & {kind: 'icons', set: IconSet, stroke?: number, weight?: 'regular' | 'bold' | 'duotone' | 'thin', variant?: 'Outline' | 'TwoTone' | 'Broken'}

export type LoaderVariant = 'ring' | 'arcs' | 'orbit' | 'dots' | 'bars' | 'pulse'
export type LoaderPreset = Base & {kind: 'loader', variant: LoaderVariant}

/** Art beside the hero: charts, maps, players, 3D and AI visuals from the specialty and 3D libraries. */
export type VisualVariant = 'chart' | 'map' | 'player' | 'audio' | 'orb' | 'iso' | 'shader' | 'particles' | 'globe' | 'device' | 'demo' | 'chat' | 'product' | 'stats' | 'showcase'
export type VisualPreset = Base & {kind: 'visual', variant: VisualVariant}

/** Theme toggle in the sample site's nav; it flips the page between the palette's light and dark. */
export type ToggleVariant = 'sun-moon' | 'eclipse' | 'expand' | 'switch'
export type TogglePreset = Base & {kind: 'toggle', variant: ToggleVariant}

export type Preset = StylePreset | MotionPreset | IconPreset | LoaderPreset | VisualPreset | TogglePreset

const style = (p: Omit<StylePreset, 'kind' | 'origin'>): StylePreset => ({kind: 'style', origin: 'inspired', ...p})
const motion = (p: Omit<MotionPreset, 'kind' | 'origin'>): MotionPreset => ({kind: 'motion', origin: 'inspired', ...p})
const icons = (p: Omit<IconPreset, 'kind' | 'origin'>): IconPreset => ({kind: 'icons', origin: 'ported', ...p})
const loader = (p: Omit<LoaderPreset, 'kind' | 'origin'>): LoaderPreset => ({kind: 'loader', origin: 'inspired', ...p})
const visual = (p: Omit<VisualPreset, 'kind' | 'origin'>): VisualPreset => ({kind: 'visual', origin: 'inspired', ...p})
const toggle = (p: Omit<TogglePreset, 'kind' | 'origin'>): TogglePreset => ({kind: 'toggle', origin: 'inspired', ...p})

export const presets: Preset[] = [
  // ── Batch 1 (2026-11-17): the UI Library picks plus Uiverse and shadcn.io Icons ──
  style({id: 'shadcn-default', name: 'Default', library: 'shadcn', radius: 10, button: 8, border: 'hairline', shadow: 'none', surface: 'plain', effects: [], weight: 600}),
  style({id: 'shadcn-rounded', name: 'Rounded', library: 'shadcn', radius: 18, button: 12, border: 'hairline', shadow: 'soft', surface: 'plain', effects: [], weight: 600}),
  style({id: 'magic-card', name: 'Magic card', library: 'magicui', radius: 14, button: 10, border: 'hairline', shadow: 'none', surface: 'tint', effects: ['spotlight'], weight: 600}),
  style({id: 'magic-beam', name: 'Border beam', library: 'magicui', radius: 14, button: 10, border: 'hairline', shadow: 'none', surface: 'tint', effects: ['beam'], weight: 600}),
  style({id: 'magic-shine', name: 'Shimmer button', library: 'magicui', radius: 14, button: 999, border: 'hairline', shadow: 'none', surface: 'tint', effects: ['shine'], weight: 600}),
  style({id: 'ace-grid', name: 'Grid and spotlight', library: 'aceternity', radius: 12, button: 8, border: 'hairline', shadow: 'none', surface: 'tint', effects: ['grid', 'spotlight'], weight: 700}),
  style({id: 'cult-texture', name: 'Texture card', library: 'cult-ui', radius: 16, button: 12, border: 'hairline', shadow: 'soft', surface: 'plain', effects: ['texture'], weight: 600}),
  style({id: 'rb-dots', name: 'Dot grid', library: 'reactbits', radius: 12, button: 999, border: 'none', shadow: 'none', surface: 'tint', effects: ['dots'], weight: 700}),
  style({id: 'uiverse-push', name: '3D push buttons', library: 'uiverse', radius: 12, button: 12, border: 'bold', shadow: 'hard', surface: 'plain', effects: ['push'], weight: 700}),
  style({id: 'uiverse-neu', name: 'Soft neumorphic', library: 'uiverse', radius: 20, button: 999, border: 'none', shadow: 'none', surface: 'plain', effects: ['neu'], weight: 600}),

  motion({id: 'magic-blur-fade', name: 'Blur fade', library: 'magicui', enter: {opacity: 0, y: 8, blur: 6}, duration: .45, stagger: .06, hover: 'lift'}),
  motion({id: 'rb-split', name: 'Split text', library: 'reactbits', enter: {opacity: 0, y: 26}, spring: {stiffness: 320, damping: 24}, stagger: .025, text: 'letters', hover: 'lift'}),
  motion({id: 'rb-blur-text', name: 'Blur text', library: 'reactbits', enter: {opacity: 0, blur: 10, y: -6}, duration: .5, stagger: .07, text: 'words', hover: 'scale'}),
  motion({id: 'ace-generate', name: 'Text generate', library: 'aceternity', enter: {opacity: 0, blur: 4}, duration: .35, stagger: .1, text: 'words', hover: 'lift'}),
  motion({id: 'ace-3d', name: '3D card tilt', library: 'aceternity', enter: {opacity: 0, scale: .96}, duration: .5, stagger: .08, hover: 'tilt'}),
  motion({id: 'motion-spring', name: 'Spring rise', library: 'motion', enter: {opacity: 0, y: 28}, spring: {stiffness: 260, damping: 22}, stagger: .07, hover: 'lift'}),
  motion({id: 'motion-scale', name: 'Stagger scale', library: 'motion', enter: {opacity: 0, scale: .88}, spring: {stiffness: 380, damping: 26}, stagger: .05, hover: 'scale'}),
  motion({id: 'cult-pop', name: 'Pop in', library: 'cult-ui', enter: {opacity: 0, scale: .6}, spring: {stiffness: 420, damping: 16}, stagger: .06, hover: 'scale'}),
  motion({id: 'uiverse-press', name: 'Press and lift', library: 'uiverse', enter: {opacity: 0}, duration: .3, stagger: .03, hover: 'press'}),

  icons({id: 'lucide', name: 'Lucide', library: 'shadcnio-icons', set: 'lucide', stroke: 2}),
  icons({id: 'lucide-thin', name: 'Lucide thin', library: 'shadcnio-icons', set: 'lucide', stroke: 1.25}),
  icons({id: 'tabler', name: 'Tabler', library: 'shadcnio-icons', set: 'tabler', stroke: 1.75}),
  icons({id: 'phosphor-duotone', name: 'Phosphor duotone', library: 'shadcnio-icons', set: 'phosphor', weight: 'duotone'}),
  icons({id: 'phosphor-bold', name: 'Phosphor bold', library: 'shadcnio-icons', set: 'phosphor', weight: 'bold'}),

  // ── Batch 2 (2026-11-17): Animate UI, Motion Primitives, SmoothUI, Animata, Kinetics, Neobrutalism, Gradient Buttons, Font Awesome ──
  style({id: 'neo-default', name: 'Neobrutalist', library: 'neobrutalism', radius: 6, button: 6, border: 'bold', shadow: 'hard', surface: 'plain', effects: [], weight: 700}),
  style({id: 'neo-pill', name: 'Neobrutalist pill', library: 'neobrutalism', radius: 18, button: 999, border: 'bold', shadow: 'hard', surface: 'tint', effects: [], weight: 700}),
  style({id: 'gradient-buttons', name: 'Gradient buttons', library: 'gradientbuttons', radius: 14, button: 12, border: 'hairline', shadow: 'none', surface: 'tint', effects: ['gradient'], weight: 600}),
  style({id: 'smooth-soft', name: 'Soft surface', library: 'smoothui', radius: 22, button: 999, border: 'none', shadow: 'soft', surface: 'plain', effects: [], weight: 600}),
  style({id: 'mp-shimmer', name: 'Text shimmer', library: 'motion-primitives', radius: 12, button: 10, border: 'hairline', shadow: 'none', surface: 'tint', effects: ['shimmer-text'], weight: 700}),

  motion({id: 'animate-fade-up', name: 'Fade up', library: 'animate', enter: {opacity: 0, y: 16}, duration: .5, stagger: .06, hover: 'lift'}),
  motion({id: 'animate-flip', name: 'Flip in', library: 'animate', enter: {opacity: 0, rotateX: 70, y: 10}, spring: {stiffness: 220, damping: 20}, stagger: .07, hover: 'tilt'}),
  motion({id: 'animate-slide', name: 'Slide in', library: 'animate', enter: {opacity: 0, x: -28}, duration: .5, stagger: .06, hover: 'lift'}),
  motion({id: 'mp-text-fade', name: 'Text effect: fade', library: 'motion-primitives', enter: {opacity: 0}, duration: .35, stagger: .05, text: 'words', hover: 'scale'}),
  motion({id: 'mp-text-slide', name: 'Text effect: slide', library: 'motion-primitives', enter: {opacity: 0, y: 12}, duration: .3, stagger: .018, text: 'letters', hover: 'lift'}),
  motion({id: 'smooth-settle', name: 'Soft settle', library: 'smoothui', enter: {opacity: 0, y: 14, scale: .98}, duration: .9, stagger: .09, hover: 'lift'}),
  motion({id: 'animata-wave', name: 'Wave reveal', library: 'animata', enter: {clip: true, y: 8}, duration: .6, stagger: .08, hover: 'lift'}),
  motion({id: 'animata-rotate', name: 'Rotate in', library: 'animata', enter: {opacity: 0, rotate: -6, y: 22}, spring: {stiffness: 260, damping: 18}, stagger: .07, hover: 'scale'}),
  motion({id: 'kinetics-bouncy', name: 'Bouncy spring', library: 'kinetics', enter: {opacity: 0, y: 30}, spring: {stiffness: 500, damping: 11}, stagger: .06, hover: 'scale'}),
  motion({id: 'kinetics-snappy', name: 'Snappy spring', library: 'kinetics', enter: {opacity: 0, y: 12}, spring: {stiffness: 700, damping: 35}, stagger: .04, hover: 'press'}),
  motion({id: 'kinetics-gentle', name: 'Gentle spring', library: 'kinetics', enter: {opacity: 0, y: 22}, spring: {stiffness: 120, damping: 20}, stagger: .1, hover: 'lift'}),

  icons({id: 'fontawesome-solid', name: 'Font Awesome solid', library: 'fontawesome', set: 'fontawesome'}),

  // ── Batch 3 (2026-11-17): Fancy Components, Microkit, Reverse UI, BoardUI, Kokonut UI, Eldora UI, Circle Loaders, loading.dev ──
  style({id: 'boardui-default', name: 'BoardUI', library: 'boardui', radius: 10, button: 8, border: 'hairline', shadow: 'none', surface: 'plain', effects: [], weight: 600}),
  style({id: 'boardui-raised', name: 'BoardUI raised', library: 'boardui', radius: 12, button: 8, border: 'hairline', shadow: 'soft', surface: 'tint', effects: [], weight: 600}),
  style({id: 'kokonut-gborder', name: 'Gradient border', library: 'kokonut', radius: 18, button: 10, border: 'hairline', shadow: 'none', surface: 'plain', effects: ['gborder'], weight: 600}),
  style({id: 'kokonut-ai', name: 'AI card', library: 'kokonut', radius: 16, button: 999, border: 'hairline', shadow: 'soft', surface: 'tint', effects: ['gborder', 'shine'], weight: 600}),
  style({id: 'eldora-ripple', name: 'Ripple backdrop', library: 'eldora', radius: 14, button: 10, border: 'hairline', shadow: 'none', surface: 'outline', effects: ['ripple'], weight: 700}),

  motion({id: 'fancy-cut', name: 'Vertical cut reveal', library: 'fancy', enter: {clip: true, y: 14}, duration: .45, stagger: .02, text: 'letters', hover: 'lift'}),
  motion({id: 'fancy-gravity', name: 'Gravity drop', library: 'fancy', enter: {opacity: 0, y: -60}, spring: {stiffness: 300, damping: 9}, stagger: .08, hover: 'scale'}),
  motion({id: 'fancy-float', name: 'Float in', library: 'fancy', enter: {opacity: 0, y: 40, rotate: 3}, spring: {stiffness: 90, damping: 14}, stagger: .1, hover: 'lift'}),
  motion({id: 'microkit-press', name: 'Micro press', library: 'microkit', enter: {opacity: 0, scale: .97}, duration: .25, stagger: .03, hover: 'press'}),
  motion({id: 'microkit-pop', name: 'Micro pop', library: 'microkit', enter: {opacity: 0, scale: .9}, duration: .2, stagger: .025, hover: 'scale'}),
  motion({id: 'reverse-letter-rise', name: 'Letter rise', library: 'reverseui', enter: {opacity: 0, y: 18, blur: 4}, duration: .4, stagger: .02, text: 'letters', hover: 'lift'}),
  motion({id: 'reverse-slide-blur', name: 'Slide blur', library: 'reverseui', enter: {opacity: 0, x: 20, blur: 8}, duration: .55, stagger: .07, hover: 'tilt'}),

  loader({id: 'circle-ring', name: 'Ring', library: 'circleloaders', variant: 'ring'}),
  loader({id: 'circle-arcs', name: 'Twin arcs', library: 'circleloaders', variant: 'arcs'}),
  loader({id: 'circle-orbit', name: 'Orbit', library: 'circleloaders', variant: 'orbit'}),
  loader({id: 'loading-dots', name: 'Dots', library: 'loadingdev', variant: 'dots'}),
  loader({id: 'loading-bars', name: 'Wave bars', library: 'loadingdev', variant: 'bars'}),
  loader({id: 'loading-pulse', name: 'Pulse', library: 'loadingdev', variant: 'pulse'}),

  // ── Batch 4 (2026-11-17): the remaining libraries. IconMCP is left out: iconmcp.com states no icon licence. ──
  // Animated components
  motion({id: 'vengeance-magnet', name: 'Magnetic hover', library: 'vengeance', enter: {opacity: 0, y: 10}, duration: .4, stagger: .05, hover: 'magnet'}),
  motion({id: 'vengeance-tooltip', name: 'Tooltip pop', library: 'vengeance', enter: {opacity: 0, y: 6, scale: .9}, spring: {stiffness: 500, damping: 22}, stagger: .05, hover: 'scale'}),
  motion({id: 'uilora-slide', name: 'Slide up', library: 'uilora', enter: {opacity: 0, y: 40}, duration: .6, stagger: .06, hover: 'lift'}),
  motion({id: 'uilora-cascade', name: 'Cascade', library: 'uilora', enter: {opacity: 0, y: 20}, duration: .5, stagger: .12, hover: 'lift'}),
  motion({id: 'spell-blur-words', name: 'Blur in words', library: 'spell', enter: {opacity: 0, blur: 12, scale: 1.08}, duration: .6, stagger: .08, text: 'words', hover: 'scale'}),
  motion({id: 'rare-flip-down', name: 'Flip down', library: 'rareui', enter: {opacity: 0, rotateX: -80, y: -10}, spring: {stiffness: 200, damping: 18}, stagger: .07, hover: 'tilt'}),
  motion({id: 'devigner-calm', name: 'Calm fade', library: 'devigner-ui', enter: {opacity: 0}, duration: .6, stagger: .05, hover: 'none'}),
  motion({id: 'bencho-snap', name: 'Snap', library: 'bencho', enter: {opacity: 0, scale: .95}, spring: {stiffness: 900, damping: 40}, stagger: .03, hover: 'press'}),
  motion({id: 'spy-zoom', name: 'Zoom settle', library: 'spyui', enter: {opacity: 0, scale: 1.08}, duration: .7, stagger: .06, hover: 'scale'}),
  motion({id: 'uselayouts-alternate', name: 'Alternate slide', library: 'uselayouts', enter: {opacity: 0, x: 40, alternate: true}, spring: {stiffness: 220, damping: 24}, stagger: .07, hover: 'lift'}),
  motion({id: 'details-fade-through', name: 'Fade through', library: 'details', enter: {opacity: 0, scale: .98, y: 4}, duration: .3, stagger: .04, hover: 'lift'}),
  visual({id: 'originkit-globe', name: 'Dotted globe', library: 'originkit', variant: 'globe'}),
  visual({id: 'coded-stats', name: 'Marketing stats', library: 'codedvisuals', variant: 'stats'}),
  visual({id: 'libraries-orb', name: 'Thinking orb', library: 'librariesdev', variant: 'orb'}),

  // Component kits
  style({id: '21st-mono', name: 'Mono minimal', library: '21st', radius: 12, button: 8, border: 'hairline', shadow: 'none', surface: 'plain', effects: [], weight: 600, font: 'mono'}),
  style({id: 'forge-saas', name: 'SaaS block', library: 'forge', radius: 16, button: 10, border: 'hairline', shadow: 'soft', surface: 'tint', effects: ['dots'], weight: 700}),
  visual({id: 'forge-device', name: 'Dashboard mockup', library: 'forge', variant: 'device'}),
  style({id: 'uilayouts-round', name: 'Big radius', library: 'ui-layouts', radius: 26, button: 999, border: 'none', shadow: 'none', surface: 'tint', effects: [], weight: 600}),
  style({id: 'uiable-bento', name: 'Bento grid', library: 'uiable', radius: 18, button: 10, border: 'hairline', shadow: 'none', surface: 'tint', effects: [], weight: 700, layout: 'bento'}),
  style({id: 'uiarc-compact', name: 'Compact', library: 'uiarc', radius: 8, button: 6, border: 'hairline', shadow: 'none', surface: 'outline', effects: [], weight: 600}),
  style({id: 'kobra-sharp', name: 'Sharp', library: 'kobra', radius: 4, button: 4, border: 'hairline', shadow: 'none', surface: 'plain', effects: [], weight: 700}),
  style({id: 'nexvyn-engineered', name: 'Engineered', library: 'nexvyn', radius: 10, button: 8, border: 'hairline', shadow: 'none', surface: 'plain', effects: ['texture'], weight: 600, font: 'mono'}),
  style({id: 'beautiful-ai', name: 'AI primitives', library: 'beautifului', radius: 14, button: 10, border: 'hairline', shadow: 'none', surface: 'plain', effects: [], weight: 600}),
  visual({id: 'beautiful-chat', name: 'AI chat', library: 'beautifului', variant: 'chat'}),
  style({id: 'oversight-editorial', name: 'Editorial serif', library: 'oversight', radius: 0, button: 0, border: 'hairline', shadow: 'none', surface: 'outline', effects: [], weight: 500, font: 'serif'}),
  style({id: 'horizonx-grain', name: 'Grain texture', library: 'horizonx', radius: 20, button: 999, border: 'none', shadow: 'none', surface: 'tint', effects: ['grain'], weight: 600}),
  style({id: 'ui8-premium', name: 'Premium kit', library: 'ui8', radius: 24, button: 14, border: 'none', shadow: 'soft', surface: 'plain', effects: [], weight: 700}),

  // 3D & motion demos
  visual({id: 'threeui-shader', name: 'Shader gradient', library: 'threeui', variant: 'shader'}),
  visual({id: 'stageshow-demo', name: 'Scripted demo', library: 'stageshow', variant: 'demo'}),
  visual({id: 'canvasui-particles', name: 'Particles', library: 'canvasui', variant: 'particles'}),
  visual({id: 'motionin-product', name: 'Product showcase', library: 'motionin', variant: 'product'}),
  visual({id: 'isoglow-iso', name: 'Isometric glow', library: 'isoglow', variant: 'iso'}),

  // Specialty
  icons({id: 'devigner-outline', name: 'Devigner outline', library: 'devigner-icons', set: 'devigner', variant: 'Outline'}),
  icons({id: 'devigner-twotone', name: 'Devigner two-tone', library: 'devigner-icons', set: 'devigner', variant: 'TwoTone'}),
  icons({id: 'devigner-broken', name: 'Devigner broken', library: 'devigner-icons', set: 'devigner', variant: 'Broken'}),
  visual({id: 'evil-area', name: 'Glowing area chart', library: 'evilcharts', variant: 'chart'}),
  visual({id: 'mapcn-route', name: 'Map with route', library: 'mapcn', variant: 'map'}),
  visual({id: 'player-video', name: 'Video player', library: 'player-style', variant: 'player'}),
  visual({id: 'player-audio', name: 'Audio player', library: 'player-style', variant: 'audio'}),
  toggle({id: 'toggles-sun-moon', name: 'Sun and moon', library: 'toggles', variant: 'sun-moon'}),
  toggle({id: 'toggles-eclipse', name: 'Eclipse', library: 'toggles', variant: 'eclipse'}),
  toggle({id: 'toggles-expand', name: 'Expand', library: 'toggles', variant: 'expand'}),
  toggle({id: 'toggles-switch', name: 'Classic switch', library: 'toggles', variant: 'switch'}),
  motion({id: 'transitions-curtain', name: 'Curtain wipe', library: 'transitions', enter: {clip: 'left'}, duration: .7, stagger: .08, hover: 'lift'}),
  motion({id: 'transitions-slide-over', name: 'Slide over', library: 'transitions', enter: {opacity: 0, x: 60}, duration: .55, stagger: .05, hover: 'lift'}),
  visual({id: 'animos-showcase', name: 'Floating shots', library: 'animos', variant: 'showcase'}),
]

export const noMotion = motion({id: 'none', name: 'None', library: '', enter: {}, duration: 0, stagger: 0, hover: 'none'})

export const byKind = <K extends Kind>(kind: K) => presets.filter((p): p is Extract<Preset, {kind: K}> => p.kind === kind)
export const presetById = <K extends Kind>(kind: K, id: string | null) => byKind(kind).find(p => p.id === id)

/** Presets of one kind grouped by library, in the order libraries first appear. */
export function groups<K extends Kind>(kind: K) {
  const out = new Map<string, Extract<Preset, {kind: K}>[]>()
  for (const p of byKind(kind)) out.set(p.library, [...(out.get(p.library) ?? []), p])
  return [...out].map(([library, items]) => ({library, name: resources.find(r => r.id === library)?.name ?? library, items}))
}

// Libraries that ship UI or motion to sample. Inspiration, colour tools and Beyond UI have nothing to sample.
const sampleable: CategoryId[] = ['animated', 'kits', 'css', '3d', 'specialty']
/** Sampleable libraries left out on purpose, with the reason shown in the coverage tooltip. */
export const unsampled: Record<string, string> = {iconmcp: 'IconMCP: no icon licence stated on iconmcp.com'}
export const coverage = {
  covered: new Set(presets.map(p => p.library)).size,
  total: resources.filter(r => sampleable.includes(r.category)).length,
}
