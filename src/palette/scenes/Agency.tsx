import {ArrowUpRight, Asterisk} from 'lucide-react'
import {LayerHero} from '../scene-kit/LayerHero'
import './agency.css'

// A creative branding agency hero, after the design in pierredelcourr's reel. The portrait is a free Pexels photo
// by Norma Mortenson. Neon Yellow arrives on the call to action and the asterisk mark.

const empty = {layers: []}

export default function Agency({accent}: {accent: boolean}) {
  return <LayerHero scene="agency" prefix="agy" accent={accent} manifest={empty}>
    <i className="agy-glow"/>
    <img className="agy-portrait" src="/palettes/agency/portrait.webp" alt="" decoding="sync" draggable={false}/>
    <header className="agy-nav sk-rise"><b><i/>Bold Ideas</b>{([['Work', 760], ['Services', 846], ['Studio', 952]] as const).map(([label, left]) => <span key={label} style={{left}}>{label}</span>)}<em>Let’s talk</em></header>
    <p className="agy-side sk-rise">Source<br/>of bold<br/>ideas.</p>
    <Asterisk className="agy-mark" size={46} strokeWidth={2.6} aria-hidden="true"/>
    <h3 className="agy-title sk-rise">Creative<br/>branding<br/>agency</h3>
    <p className="agy-copy sk-rise">We build brands that move culture, through identity, strategy and digital experiences.</p>
    <p className="agy-cta sk-rise">Start a project <ArrowUpRight size={18}/></p>
    <article className="agy-card sk-rise"><span><Asterisk size={22} strokeWidth={2.4}/></span><b>Brand<br/>identities</b><small>40+ launches</small></article>
  </LayerHero>
}
