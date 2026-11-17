import {ArrowRight, Check, Menu, Palette, ShieldCheck, Sparkles, Zap} from 'lucide-react'
import type {IconRender} from './types'

const map = {bolt: Zap, palette: Palette, shield: ShieldCheck, arrow: ArrowRight, check: Check, sparkle: Sparkles, menu: Menu}
const render: IconRender = (name, {size, stroke}) => { const I = map[name]; return <I size={size} strokeWidth={stroke ?? 2} aria-hidden="true"/> }
export default render
