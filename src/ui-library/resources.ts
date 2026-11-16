// UI Library directory: every resource as data, so the page, search and /ui-library.json share one source.
import type {LibraryId} from './catalog'

export type CategoryId = 'animated' | 'kits' | 'css' | '3d' | 'inspiration'
export type SourceId = 'reel' | 'boardui' | 'refilkae' | 'mengto' | 'benji'

export const categories: {id: CategoryId, name: string, line: string}[] = [
  {id: 'animated', name: 'Animated components', line: 'Copy-paste React effects.'},
  {id: 'kits', name: 'Component kits', line: 'Everyday app UI to build with.'},
  {id: 'css', name: 'CSS snippets', line: 'Plain HTML and CSS, no framework.'},
  {id: '3d', name: '3D & motion demos', line: 'Three.js scenes and scripted demos.'},
  {id: 'inspiration', name: 'Inspiration', line: 'Real designs to study, not code.'},
]

export const sources: Record<SourceId, {label: string, url: string}> = {
  reel: {label: 'UI libraries reel', url: 'https://www.instagram.com/reels/DfNBVUroUTO/'},
  boardui: {label: 'BoardUI reel', url: 'https://www.instagram.com/reels/DfQoEk3DosD/'},
  refilkae: {label: 'refilkae', url: 'https://www.threads.com/@refilkae/post/DfdHdMSDPNw'},
  mengto: {label: 'mengto', url: 'https://www.threads.com/@mengto/post/DfyE9k7v2I3'},
  benji: {label: 'benjitaylor/skills', url: 'https://github.com/benjitaylor/skills'},
}

export type Resource = {
  id: string
  name: string
  url: string
  repo?: string
  category: CategoryId
  summary: string
  inside: string[]
  use: string
  price: 'Free' | 'Free + Pro' | 'Paid'
  via: SourceId
  study?: LibraryId
  /** No video loop (site blocks headless capture); shows a still instead. */
  still?: boolean
}

export const resources: Resource[] = [
  {id: 'reactbits', name: 'React Bits', url: 'https://reactbits.dev/', repo: 'https://github.com/DavidHDev/react-bits', category: 'animated', summary: 'Animated components and backgrounds for React.', inside: ['text effects', 'backgrounds', 'animations', 'components'], use: 'shadcn CLI · copy-paste', price: 'Free + Pro', via: 'refilkae'},
  {id: 'magicui', name: 'Magic UI', url: 'https://magicui.design/', repo: 'https://github.com/magicuidesign/magicui', category: 'animated', summary: 'Animated components and templates for landing pages.', inside: ['components', 'templates', 'effects'], use: 'shadcn CLI', price: 'Free + Pro', via: 'refilkae'},
  {id: 'animate', name: 'Animate UI', url: 'https://animate-ui.com/', repo: 'https://github.com/imskyleen/animate-ui', category: 'animated', summary: 'Animated primitives for Radix, Base UI and React Aria.', inside: ['primitives', 'icons', 'components'], use: 'shadcn CLI', price: 'Free', via: 'reel', study: 'animate'},
  {id: 'smoothui', name: 'SmoothUI', url: 'https://smoothui.dev/', repo: 'https://github.com/educlopez/smoothui', category: 'animated', summary: 'Animated shadcn/ui components and blocks.', inside: ['primitives', 'components', 'blocks', 'templates'], use: 'shadcn CLI · copy-paste', price: 'Free', via: 'reel'},
  {id: 'vengeance', name: 'Vengeance UI', url: 'https://www.vengenceui.com/', repo: 'https://github.com/Ashutoshx7/VengeanceUI', category: 'animated', summary: 'Hover effects, tooltips and scroll-driven layouts.', inside: ['hover effects', 'tooltips', 'scroll', 'templates'], use: 'copy-paste', price: 'Free', via: 'reel', study: 'vengeance'},
  {id: 'uilora', name: 'Uilora', url: 'https://www.uilora.com/', category: 'animated', summary: '700+ animated components for React and React Native.', inside: ['components', 'react native', 'animations'], use: 'copy-paste', price: 'Free + Pro', via: 'reel', study: 'uilora'},
  {id: 'boardui', name: 'BoardUI', url: 'https://www.boardui.com/', repo: 'https://github.com/BoardUI/boardui', category: 'kits', summary: 'React design system for dashboards and data apps.', inside: ['dashboards', 'charts', 'data tables', 'forms'], use: 'copy-paste · npm', price: 'Free + Pro', via: 'boardui', study: 'boardui'},
  {id: 'forge', name: 'Forge UI', url: 'https://forgeui.in/', repo: 'https://github.com/AmanShakya0018/forgeui', category: 'kits', summary: 'shadcn/ui components, SaaS blocks and illustrations.', inside: ['blocks', 'components', 'illustrations', 'templates'], use: 'shadcn CLI', price: 'Free + Pro', via: 'reel'},
  {id: '21st', name: '21st.dev', url: 'https://21st.dev/', category: 'kits', summary: '12,000+ React components, templates and themes.', inside: ['components', 'templates', 'themes', 'shaders'], use: 'shadcn CLI', price: 'Free + Pro', via: 'refilkae'},
  {id: 'uiverse', name: 'Uiverse', url: 'https://uiverse.io/', repo: 'https://github.com/uiverse-io/galaxy', category: 'css', summary: 'Community HTML and CSS elements.', inside: ['buttons', 'loaders', 'toggles', 'inputs', 'cards'], use: 'copy-paste', price: 'Free', via: 'reel', study: 'uiverse', still: true},
  {id: 'threeui', name: 'ThreeUI', url: 'https://threeui.com/', category: '3d', summary: 'Three.js scenes, shaders and landing pages.', inside: ['three.js', 'shaders', 'heroes', 'backgrounds', '3D assets'], use: 'copy-paste', price: 'Free + Pro', via: 'mengto'},
  {id: 'stageshow', name: 'Stageshow', url: '/vendor/stageshow/playground/index.html', repo: 'https://github.com/benjitaylor/skills', category: '3d', summary: 'Scripted product-demo animations, 72 examples.', inside: ['product demos', 'scenes', 'motion'], use: 'local playground', price: 'Free', via: 'benji'},
  {id: 'mesh3d', name: 'mesh3d.gallery', url: 'https://mesh3d.gallery/', category: 'inspiration', summary: 'Curated gallery of Three.js and WebGL websites.', inside: ['3D sites', 'webgl'], use: 'browse', price: 'Free', via: 'mengto'},
  {id: 'mobbin', name: 'Mobbin', url: 'https://mobbin.com/', category: 'inspiration', summary: '600,000+ screens from real mobile and web apps.', inside: ['app screens', 'web', 'flows'], use: 'browse', price: 'Free + Pro', via: 'mengto'},
  {id: 'collectui', name: 'Collect UI', url: 'https://collectui.com/', category: 'inspiration', summary: 'Interface shots sorted by component.', inside: ['app screens', 'components'], use: 'browse', price: 'Free', via: 'mengto'},
  {id: 'awwwards', name: 'Awwwards', url: 'https://www.awwwards.com/', category: 'inspiration', summary: 'Jury-picked best websites, daily.', inside: ['websites', 'awards'], use: 'browse', price: 'Free', via: 'mengto'},
  {id: 'recent', name: 'recent.design', url: 'https://recent.design/', category: 'inspiration', summary: 'Daily picks of design, sites and tools.', inside: ['websites', 'tools'], use: 'browse', price: 'Free', via: 'mengto'},
]
