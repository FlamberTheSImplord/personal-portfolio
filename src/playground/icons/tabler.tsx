import {IconArrowRight, IconBolt, IconCheck, IconMenu2, IconPalette, IconShieldCheck, IconSparkles} from '@tabler/icons-react'
import type {IconRender} from './types'

const map = {bolt: IconBolt, palette: IconPalette, shield: IconShieldCheck, arrow: IconArrowRight, check: IconCheck, sparkle: IconSparkles, menu: IconMenu2}
const render: IconRender = (name, {size, stroke}) => { const I = map[name]; return <I size={size} stroke={stroke ?? 1.75} aria-hidden="true"/> }
export default render
