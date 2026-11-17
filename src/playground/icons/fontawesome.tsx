// Font Awesome Free solid icons (icons CC BY 4.0, code MIT): credited through the playground's "Real set" link.
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight, faBars, faBolt, faCheck, faPalette, faShieldHalved, faWandMagicSparkles} from '@fortawesome/free-solid-svg-icons'
import type {IconRender} from './types'

const map = {bolt: faBolt, palette: faPalette, shield: faShieldHalved, arrow: faArrowRight, check: faCheck, sparkle: faWandMagicSparkles, menu: faBars}
const render: IconRender = (name, {size}) => <FontAwesomeIcon icon={map[name]} style={{width: size, height: size}} aria-hidden="true"/>
export default render
