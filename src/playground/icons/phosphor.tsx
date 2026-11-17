import {ArrowRight, Check, Lightning, List, Palette, ShieldCheck, Sparkle} from '@phosphor-icons/react'
import type {IconRender} from './types'

const map = {bolt: Lightning, palette: Palette, shield: ShieldCheck, arrow: ArrowRight, check: Check, sparkle: Sparkle, menu: List}
const render: IconRender = (name, {size, weight}) => { const I = map[name]; return <I size={size} weight={weight ?? 'regular'} aria-hidden="true"/> }
export default render
