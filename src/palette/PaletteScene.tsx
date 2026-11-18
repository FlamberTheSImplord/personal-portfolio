import {lazy, Suspense, type ComponentType, type CSSProperties} from 'react'
import type {SceneId} from './palettes'
import './palette-scenes.css'

// Every scene is drawn on a fixed design canvas (see palettes.ts) and scaled as a whole by the page.
// Both stages show the same layout; only colours change, and they transition (see --pd-pop in palette-scenes.css).
// A study's scene is the file in ./scenes with the same name as its id, so adding one needs no registration here.

type SceneProps = {accent: boolean}
const modules = import.meta.glob<{default: ComponentType<SceneProps>}>('./scenes/*.tsx')
const scenes = Object.fromEntries(Object.entries(modules).map(([path, load]) => [path.slice(9, -4).toLowerCase(), lazy(load)]))

const vars = {'--pd-charcoal': '#21232E', '--pd-royal': '#105BFF', '--pd-tangerine': '#FE8500', '--pd-aqua': '#74FFED', '--pd-midnight': '#171F44', '--pd-pink': '#FE81D1'} as CSSProperties

export function Scene({id, accent}: {id: SceneId, accent: boolean}) {
  const Site = scenes[id]
  return <div className="pd-scene" style={vars}><Suspense fallback={null}><Site accent={accent}/></Suspense></div>
}
