import {LayerHero} from '../scene-kit/LayerHero'
import manifest from '../scene-kit/layers/bagni.json'
import './bagni.css'

// Bagni Ortensia, recreated from charles.unemployed's reel. Sand is generated and the parasol is rendered in Blender.
// The parasol's shadow creeps slowly, as it would through an afternoon.

export default function Bagni({accent}: {accent: boolean}) {
  return <LayerHero scene="bagni" prefix="bg" accent={accent} manifest={manifest}>
    <svg className="bg-type sk-rise" viewBox="0 0 1280 853" aria-hidden="true">
      <text className="bg-s" x="142" y="650" textLength="104" lengthAdjust="spacingAndGlyphs">S</text>
      <text className="bg-h" x="245" y="652" textLength="662" lengthAdjust="spacingAndGlyphs">unbeds by the</text>
      <text className="bg-h bg-sea" x="933" y="652" textLength="176" lengthAdjust="spacingAndGlyphs">Sea</text>
    </svg>
    <header className="bg-nav sk-rise"><b>Bagni Ortensia</b>{([['Sunbeds', 789], ['Restaurant', 896], ['Events', 1024], ['Getting here', 1120]] as const).map(([label, left]) => <span key={label} style={{left}}>{label}</span>)}</header>
    <p className="bg-book sk-rise">Book a sunbed</p>
    {([['Open daily 9 to 7', 106], ['From €35 a day', 551], ['June to September', 967]] as const).map(([label, left]) => <p key={label} className="bg-fact sk-rise" style={{left}}>{label}</p>)}
  </LayerHero>
}
