import {ArrowUpRight, ChevronLeft, ChevronRight} from 'lucide-react'
import {LayerHero} from '../scene-kit/LayerHero'
import manifest from '../scene-kit/layers/tennis.json'
import './tennis.css'

// Tennis Academy, recreated from the reel shown by anthonyalxnder with free Pexels photos.
// The player passes in front of the headline; Scarlet Red lands on the shoes and the main actions.

const nav = [['Home', 400], ['Training', 507], ['Programs', 638], ['Coaches', 777], ['Membership', 908]] as const

export default function Tennis({accent}: {accent: boolean}) {
  const headline = <svg className="tn-type sk-rise" viewBox="0 0 1280 908" aria-hidden="true"><text x="53" y="443" textLength="1199" lengthAdjust="spacingAndGlyphs">PLAY STRONG.</text></svg>
  return <LayerHero scene="tennis" prefix="tn" accent={accent} manifest={manifest} slots={{clouds: headline}}>
    <header className="tn-nav sk-rise"><b><svg viewBox="0 0 34 30" aria-hidden="true"><path d="M17 1 33 29H24L17 16 10 29H1Z"/></svg><span>TENNIS<br/>ACADEMY</span></b>{nav.map(([label, left]) => <a key={label} style={{left}}>{label}</a>)}<em>Book a lesson</em></header>
    <p className="tn-eyebrow sk-rise">Train with purpose</p>
    <i className="tn-rule sk-rise"/>
    <p className="tn-copy sk-rise">Building champions<br/>on and off the court.</p>
    <p className="tn-cta sk-rise">Explore programs <ArrowUpRight size={18}/></p>
    <p className="tn-arrows sk-rise"><i><ChevronLeft size={20}/></i><i><ChevronRight size={20}/></i></p>
  </LayerHero>
}
