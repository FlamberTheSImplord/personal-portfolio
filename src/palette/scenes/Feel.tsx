import {Menu, Search} from 'lucide-react'
import {LayerHero} from '../scene-kit/LayerHero'
import manifest from '../scene-kit/layers/feel.json'
import './feel.css'

// Feel Every Moment, recreated from the reel shown by anthonyalxnder. Flower and earbuds are rendered in Blender.
// The petals breathe and the product floats while Acid Lime replaces its cobalt finish.

const nav = [['Product', 171], ['Technology', 292], ['About', 452], ['Support', 558]] as const
const stats = [['40H', 'Total playback', 95], ['ANC', 'Adaptive noise cancelling', 240], ['360', 'Spatial audio', 438]] as const

export default function Feel({accent}: {accent: boolean}) {
  return <LayerHero scene="feel" prefix="fm" accent={accent} manifest={manifest}>
    <svg className="fm-type sk-rise" viewBox="0 0 1280 853" aria-hidden="true">
      <text className="fm-feel" x="122" y="327" textLength="366" lengthAdjust="spacingAndGlyphs">Feel</text>
      <text className="fm-every" x="95" y="419" textLength="266" lengthAdjust="spacingAndGlyphs">Every</text>
      <text className="fm-moment" x="95" y="510" textLength="421" lengthAdjust="spacingAndGlyphs">Moment</text>
    </svg>
    <header className="fm-nav sk-rise"><Menu className="fm-menu" size={25} strokeWidth={1.4}/>{nav.map(([label, left]) => <span key={label} style={{left}}>{label}</span>)}<Search className="fm-search" size={22} strokeWidth={1.5}/><b>Buy now</b></header>
    <p className="fm-small fm-tag sk-rise">Sound<br/>that<br/>moves<br/>with you</p>
    <p className="fm-copy sk-rise">Immersive sound. Effortless design.<br/>Made for your everyday rhythm.</p>
    <p className="fm-cta sk-rise">Explore now <i>→</i></p>
    <p className="fm-film sk-rise"><i/>Watch<br/>the film</p>
    {stats.map(([big, small, left]) => <p key={big} className="fm-stat sk-rise" style={{left}}><b>{big}</b>{small}</p>)}
    <p className="fm-small fm-a sk-rise">Crystal<br/>clear<br/>highs</p>
    <p className="fm-small fm-b sk-rise">Lightweight<br/>comfort<br/>all day<br/>wear</p>
  </LayerHero>
}
