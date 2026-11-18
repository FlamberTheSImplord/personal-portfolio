import {LayerHero} from '../scene-kit/LayerHero'
import manifest from '../scene-kit/layers/halden.json'
import './halden.css'

// Halden Dance Theatre, recreated from charles.unemployed's reel. The dancer is a free Pexels photo; the silk is rendered in Blender.
// Every cloth layer exists in Bone and Vermilion. The silk drifts on slow, separate loops.

export default function Halden({accent}: {accent: boolean}) {
  return <LayerHero scene="halden" prefix="hd" accent={accent} manifest={manifest}>
    <svg className="hd-type" viewBox="0 0 1280 853" aria-hidden="true">
      <text className="hd-spring" x="90" y="318" textLength="516" lengthAdjust="spacingAndGlyphs">SPRING</text>
      <text className="hd-season" x="757" y="606" textLength="500" lengthAdjust="spacingAndGlyphs">SEASON</text>
    </svg>
    <header className="hd-nav"><b>Halden Dance Theatre</b>{([['Season', 885], ['Classes', 985], ['Company', 1093], ['Visit', 1208]] as const).map(([label, left]) => <span key={label} style={{left}}>{label}</span>)}</header>
    <p className="hd-m hd-dates">14 March<br/>to 26 April</p>
    <p className="hd-book"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></i>Book tickets</p>
    <p className="hd-m hd-works">Six<br/>new<br/>works<u/></p>
    <p className="hd-m hd-from">Tickets<br/>from £18</p>
  </LayerHero>
}
