// Palette studies. Each website starts with two colours and then gains one accent, so both stages live in one entry.
// HEX values are as printed on the swatch cards in each reel (read from the video frames).

export type Swatch = {name: string, hex: string}
export type Stage = 'two' | 'three'
export type ReferenceId = 'niki' | 'charles'
export type SceneId = 'editeaze' | 'globynk' | 'murmur' | 'timbre' | 'pocket'

export const references = {
  niki: {creator: 'niki.aroca', url: 'https://www.instagram.com/reels/DfIaULMIRC-/'},
  charles: {creator: 'charles.unemployed', url: 'https://www.instagram.com/reels/DfSbrNrR3Gu/'},
} as const satisfies Record<ReferenceId, {creator: string, url: string}>

export type PaletteStudy = {
  id: SceneId
  reference: ReferenceId
  site: string
  host: string
  title: string
  /** base (≈60%), support (≈30%), accent (≈10%) */
  colors: readonly [Swatch, Swatch, Swatch]
  canvas: {width: number, height: number}
  label: string
}

export const studies: readonly PaletteStudy[] = [
  {
    id: 'editeaze', reference: 'niki', site: 'Editeaze', host: 'editeaze.app', title: 'Electric contrast',
    colors: [{name: 'Charcoal black', hex: '#21232E'}, {name: 'Royal blue', hex: '#105BFF'}, {name: 'Tangerine orange', hex: '#FE8500'}],
    canvas: {width: 1224, height: 760}, label: 'Reinterpretation of the Editeaze video-editor landing page',
  },
  {
    id: 'globynk', reference: 'niki', site: 'Globynk', host: 'globynk.com', title: 'After midnight',
    colors: [{name: 'Midnight abyss', hex: '#171F44'}, {name: 'Aqua jade', hex: '#74FFED'}, {name: 'Baby pink', hex: '#FE81D1'}],
    canvas: {width: 1220, height: 912}, label: 'Recreation of the Globynk global-talent landing page',
  },
  {
    id: 'murmur', reference: 'charles', site: 'Murmur', host: 'murmur.so', title: 'Done by morning',
    colors: [{name: 'Dusk Blue', hex: '#8FB4E3'}, {name: 'Midnight Navy', hex: '#0D1A33'}, {name: 'Sunset Orange', hex: '#FF6A2B'}],
    canvas: {width: 1280, height: 800}, label: 'Recreation of the Murmur landing page',
  },
  {
    id: 'timbre', reference: 'charles', site: 'Timbre', host: 'timbre.audio', title: 'Accent included',
    colors: [{name: 'Oxblood Red', hex: '#4A0F14'}, {name: 'Apricot Glow', hex: '#F6B27A'}, {name: 'Electric Cyan', hex: '#19D3FF'}],
    canvas: {width: 1280, height: 800}, label: 'Refined interpretation of the Timbre landing page',
  },
  {
    id: 'pocket', reference: 'charles', site: 'Pocket', host: 'pocket.fm', title: 'Swings like a person',
    colors: [{name: 'Chalk White', hex: '#F3F2EE'}, {name: 'Ink Black', hex: '#08080C'}, {name: 'Acid Green', hex: '#B6FF2E'}],
    canvas: {width: 1280, height: 800}, label: 'Recreation of the Pocket landing page',
  },
]

export const shares: Record<Stage, readonly [number, number, number]> = {two: [64, 36, 0], three: [60, 30, 10]}
