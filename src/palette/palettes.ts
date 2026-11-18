// Palette studies. Each website starts with two colours and then gains one accent, so both stages live in one entry.
// HEX values are as printed on the swatch cards in each reel (read from the video frames).

import {sources, type ReferenceId} from './sources'

export type {ReferenceId}
export type Swatch = {name: string, hex: string}
export type Stage = 'two' | 'three'

export const references = Object.fromEntries(Object.entries(sources).filter(([, s]) => 'note' in s)) as unknown as {[K in ReferenceId]: typeof sources[K]}

type StudyData = {
  id: string
  reference: ReferenceId
  site: string
  host: string
  title: string
  /** base (≈60%), support (≈30%), accent (≈10%) */
  colors: readonly [Swatch, Swatch, Swatch]
  canvas: {width: number, height: number}
  label: string
  /** Replaces the standard line about HEX values when a reel prints no swatch cards. */
  colorNote?: string
}

// A new study is one entry here plus src/palette/scenes/<Id>.tsx.
const data = [
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
  {
    id: 'altaval', reference: 'charles2', site: 'Altaval', host: 'altaval.ski', title: 'Fresh snow overnight',
    colors: [{name: 'Glacier Blue', hex: '#62A7EA'}, {name: 'Navy', hex: '#0C1B48'}, {name: 'Lemon', hex: '#F2EA1E'}],
    canvas: {width: 1280, height: 853}, label: 'Recreation of the Altaval ski resort hero',
  },
  {
    id: 'kiln', reference: 'charles2', site: 'Kiln Coffee', host: 'kilncoffee.co.uk', title: 'Roasted to the core',
    colors: [{name: 'Deep Teal', hex: '#013230'}, {name: 'Cream', hex: '#F3EBDD'}, {name: 'Orange', hex: '#FF6A1F'}],
    canvas: {width: 1280, height: 853}, label: 'Recreation of the Kiln Coffee hero',
  },
  {
    id: 'merrow', reference: 'charles2', site: 'Merrow', host: 'merrowgarden.org', title: 'Ten thousand orchids',
    colors: [{name: 'Cream', hex: '#ECE6DC'}, {name: 'Ink', hex: '#050505'}, {name: 'Orchid Pink', hex: '#E65BC4'}],
    canvas: {width: 1280, height: 853}, label: 'Recreation of the Merrow Botanic Garden hero',
  },
  {
    id: 'halden', reference: 'charles3', site: 'Halden Dance Theatre', host: 'haldendance.org', title: 'Spring season',
    colors: [{name: 'Bottle Green', hex: '#0F372B'}, {name: 'Bone', hex: '#EFE7DA'}, {name: 'Vermilion', hex: '#E8392B'}],
    canvas: {width: 1280, height: 853}, label: 'Recreation of the Halden Dance Theatre hero',
  },
  {
    id: 'bagni', reference: 'charles3', site: 'Bagni Ortensia', host: 'bagniortensia.it', title: 'Sunbeds by the sea',
    colors: [{name: 'Sand', hex: '#DFBFA0'}, {name: 'Terracotta', hex: '#7A3E28'}, {name: 'Cobalt', hex: '#0C45B0'}],
    canvas: {width: 1280, height: 853}, label: 'Recreation of the Bagni Ortensia hero',
  },
  {
    id: 'naosu', reference: 'charles3', site: 'Naosu', host: 'naosu.jp', title: 'Mended in gold',
    colors: [{name: 'Indigo', hex: '#0B1325'}, {name: 'Celadon', hex: '#A9CDBE'}, {name: 'Gold', hex: '#F2B53A'}],
    canvas: {width: 1280, height: 853}, label: 'Recreation of the Naosu hero',
  },
  {
    id: 'feel', reference: 'anthony', site: 'Feel Every Moment', host: 'feelaudio.co', title: 'Acid lime sound',
    colors: [{name: 'Midnight Black', hex: '#06080C'}, {name: 'Electric Cobalt Blue', hex: '#003BBF'}, {name: 'Acid Lime', hex: '#CDF31B'}],
    canvas: {width: 1280, height: 853}, label: 'Recreation of the Feel Every Moment hero', colorNote: 'HEX sampled from the reel because its swatch values are too small to read.',
  },
  {
    id: 'veyra', reference: 'anthony', site: 'Veyra', host: 'veyra.io', title: 'The future of work',
    colors: [{name: 'Concrete', hex: '#C9BEB4'}, {name: 'Ink', hex: '#111214'}, {name: 'Lime', hex: '#A7C81A'}],
    canvas: {width: 1280, height: 722}, label: 'Recreation of the Veyra headset hero', colorNote: 'HEX sampled from the reel, which shows no swatch values for this design.',
  },
  {
    id: 'club', reference: 'anthony', site: 'Base Club', host: 'baseclub.xyz', title: 'SocialFi people',
    colors: [{name: 'Red Orange', hex: '#F32102'}, {name: 'Snowy White', hex: '#FAF7FC'}, {name: 'Yellow Punk', hex: '#C1F701'}],
    canvas: {width: 1280, height: 891}, label: 'Recreation of the Base Club SocialFi hero', colorNote: 'HEX sampled from the reel because its swatch values are too small to read.',
  },
  {
    id: 'tennis', reference: 'anthony', site: 'Tennis Academy', host: 'tennisacademy.co', title: 'Play strong',
    colors: [{name: 'Sky Blue', hex: '#298BD0'}, {name: 'Cloud White', hex: '#F4F6FA'}, {name: 'Scarlet Red', hex: '#E5282F'}],
    canvas: {width: 1280, height: 908}, label: 'Recreation of the Tennis Academy hero', colorNote: 'HEX sampled from the reel because its swatch values are too small to read.',
  },
] as const satisfies readonly StudyData[]

export type SceneId = typeof data[number]['id']
export type PaletteStudy = Omit<StudyData, 'id'> & {id: SceneId}
export const studies: readonly PaletteStudy[] = data

export const shares: Record<Stage, readonly [number, number, number]> = {two: [64, 36, 0], three: [60, 30, 10]}
