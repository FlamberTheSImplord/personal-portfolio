import {LayerHero} from '../scene-kit/LayerHero'
import manifest from '../scene-kit/layers/naosu.json'
import './naosu.css'

// Naosu, recreated from charles.unemployed's reel. The broken bowl, stone and gold seams are rendered in Blender.
// Gold draws outward through the cracks when the accent arrives, and through the headline.

const veins = ['M58 306 112 286 140 312 196 278 226 318 288 292 332 322 392 280 438 310 494 284 548 322 610 292 655 318', 'M58 468 118 442 166 482 224 450 278 494 338 456 396 492 452 448 512 486 574 454 654 490', 'M214 246 202 298 232 360', 'M430 246 448 300 424 366', 'M304 410 322 462 296 530', 'M520 410 502 474 532 530']

export default function Naosu({accent}: {accent: boolean}) {
  return <LayerHero scene="naosu" prefix="ns" accent={accent} manifest={manifest}>
    <svg className="ns-type sk-rise" viewBox="0 0 1280 853" aria-hidden="true">
      <defs><clipPath id="ns-letters"><text className="ns-word" x="57" y="367" textLength="597" lengthAdjust="spacingAndGlyphs">MENDED</text><text className="ns-word" x="57" y="529" textLength="600" lengthAdjust="spacingAndGlyphs">IN GOLD</text></clipPath></defs>
      <text className="ns-word" x="57" y="367" textLength="597" lengthAdjust="spacingAndGlyphs">MENDED</text>
      <text className="ns-word" x="57" y="529" textLength="600" lengthAdjust="spacingAndGlyphs">IN GOLD</text>
      <g className="ns-veins" clipPath="url(#ns-letters)">{veins.map(d => <path key={d} d={d} pathLength={1}/>)}</g>
    </svg>
    <header className="ns-nav sk-rise"><b>Naosu</b>{([['Repairs', 583], ['Gallery', 729], ['Visit', 878]] as const).map(([label, left]) => <span key={label} style={{left}}>{label}</span>)}<i>Send us your break <em>→</em></i></header>
    <p className="ns-foot sk-rise">Urushi lacquer · 24K gold · 6 to 8 weeks</p>
  </LayerHero>
}
