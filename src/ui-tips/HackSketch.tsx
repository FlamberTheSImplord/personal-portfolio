import {Check, Copy, Settings} from 'lucide-react'
import './hacks.css'

/** Live CSS demos for the "10 niche design hacks" tips: the "do" side uses the real technique, the "don't" side the usual default. */
export const hackKinds = ['nested', 'alpha', 'oklch', 'okgrad', 'stroke', 'fade', 'swap', 'darkdepth', 'dvh', 'multiply']

const hues = [95, 150, 250, 310]
const Lamp = () => <svg viewBox="0 0 60 70" aria-hidden="true"><rect width="60" height="70" fill="#fff"/><path d="M18 30h24L36 12H24z" fill="#2c3a2e"/><rect x="28.5" y="30" width="3" height="26" fill="#2c3a2e"/><rect x="18" y="56" width="24" height="4" rx="2" fill="#2c3a2e"/></svg>

export default function HackSketch({kind, good}: {kind: string, good: boolean}) {
  switch (kind) {
    case 'nested': return <div className="hk hk-nested"><div className="hk-outer"><div className="hk-inner" style={{borderRadius: good ? 14 : 24}}/></div><small>{good ? '24 − 10 = 14' : '24 / 24'}</small></div>
    case 'alpha': return <div className="hk hk-alpha">{['#f4efe6', '#3d5a80'].map(bg => <div key={bg} style={{background: bg}}><span style={{border: `1.5px solid ${good ? (bg === '#3d5a80' ? 'rgb(255 255 255 / .18)' : 'rgb(0 0 0 / .12)') : '#cfcfcf'}`}}>Card</span></div>)}</div>
    case 'oklch': return <div className="hk hk-swatches">{hues.map(h => <i key={h} style={{background: good ? `oklch(72% .15 ${h})` : `hsl(${[60, 120, 220, 280][hues.indexOf(h)]} 85% 50%)`}}/>)}<small>{good ? 'oklch(72% .15 h)' : 'hsl(h 85% 50%)'}</small></div>
    case 'okgrad': return <div className="hk hk-grad"><i style={{background: good ? 'linear-gradient(90deg in oklch, #1b4dff, #ff8a00)' : 'linear-gradient(90deg, #1b4dff, #ff8a00)'}}/><small>{good ? 'in oklch' : 'default (sRGB)'}</small></div>
    case 'stroke': return <div className="hk hk-stroke"><span><Settings size={26} strokeWidth={good ? 2.5 : 1}/><b>Settings</b></span><span><Settings size={22} strokeWidth={good ? 1.5 : 1}/>Account</span></div>
    case 'fade': return <div className={`hk hk-fade ${good ? 'hk-faded' : ''}`}><div>{[0, 1, 2, 3, 4].map(i => <i key={i}/>)}</div></div>
    case 'swap': return <div className={`hk hk-swap ${good ? 'hk-swap-blur' : ''}`}><span className="hk-icons"><Copy className="hk-a" size={30}/><Check className="hk-b" size={30}/></span><small>{good ? 'blur + fade' : 'instant'}</small></div>
    case 'darkdepth': return <div className={`hk hk-dark ${good ? 'hk-dark-good' : ''}`}><div><div><div/></div></div></div>
    case 'dvh': return <div className={`hk hk-dvh ${good ? 'hk-dvh-good' : ''}`}><div className="hk-phone"><i className="hk-hero"><b>Book now</b></i><i className="hk-bar"/></div><small>{good ? '100dvh' : '100vh'}</small></div>
    case 'multiply': return <div className={`hk hk-multiply ${good ? 'hk-blend' : ''}`}><Lamp/><span>Desk lamp<br/><b>$89</b></span></div>
  }
  return null
}
