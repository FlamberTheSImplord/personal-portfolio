import {Box, Grid2x2, Zap} from 'lucide-react'
import {LayerHero} from '../scene-kit/LayerHero'
import manifest from '../scene-kit/layers/veyra.json'
import './veyra.css'

// Veyra, recreated from the reel shown by anthonyalxnder. The headset and fabric are rendered in Blender.
// Window light drifts over the wall; fabric, headline word and action take the lime accent.

const features = [[Box, 'Spatial OS', 'A more natural interface', 58], [Zap, 'All-day Power', 'Up to 24 hours', 306], [Grid2x2, 'Ultra-Light', 'Just 180 grams', 528]] as const

export default function Veyra({accent}: {accent: boolean}) {
  return <LayerHero scene="veyra" prefix="vy" accent={accent} manifest={manifest} slots={{bg: <i className="vy-light"/>}}>
    <svg className="vy-type sk-rise" viewBox="0 0 1280 722" aria-hidden="true">
      <text className="vy-h" x="51" y="210" textLength="747" lengthAdjust="spacingAndGlyphs">THE FUTURE</text>
      <text className="vy-h" x="51" y="316" textLength="158" lengthAdjust="spacingAndGlyphs">OF</text>
      <text className="vy-h vy-work" x="230" y="316" textLength="386" lengthAdjust="spacingAndGlyphs">WORK</text>
    </svg>
    <header className="vy-nav sk-rise"><b>Veyra<sup>°</sup></b>{([['Product', 497], ['Technology', 598], ['Pricing', 729]] as const).map(([label, left]) => <span key={label} style={{left}}>{label}</span>)}<em>Pre-order →</em></header>
    <p className="vy-copy sk-rise">A next-generation<br/>workspace, reimagined.</p>
    <p className="vy-cta sk-rise">Learn more <i>→</i></p>
    {features.map(([Icon, title, text, left]) => <p key={title} className="vy-feature sk-rise" style={{left}}><Icon size={23} strokeWidth={1.4}/><b>{title}</b><span>{text}</span></p>)}
  </LayerHero>
}
