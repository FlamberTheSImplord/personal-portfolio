// Devigner Icons (MIT code, CC BY 4.0 drawings): credited through the playground's "Real set" link.
import {IconArrowRight} from '@devigner-ui/icons/ArrowRight'
import {IconBolt} from '@devigner-ui/icons/Bolt'
import {IconCheck} from '@devigner-ui/icons/Check'
import {IconHamburgerMenu} from '@devigner-ui/icons/HamburgerMenu'
import {IconMagicStickSparkles} from '@devigner-ui/icons/MagicStickSparkles'
import {IconPalette} from '@devigner-ui/icons/Palette'
import {IconShieldCheck} from '@devigner-ui/icons/ShieldCheck'
import type {IconRender} from './types'

const map = {bolt: IconBolt, palette: IconPalette, shield: IconShieldCheck, arrow: IconArrowRight, check: IconCheck, sparkle: IconMagicStickSparkles, menu: IconHamburgerMenu}
const render: IconRender = (name, {size, stroke, variant}) => { const I = map[name]; return <I width={size} height={size} variant={variant ?? 'Outline'} strokeWidth={stroke} aria-hidden="true"/> }
export default render
