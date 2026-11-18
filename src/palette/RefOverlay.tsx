import {useEffect, useState} from 'react'
import './ref-overlay.css'

// Development only: lays a private reel frame from .claude/palette-refs over a scene. It is not part of the production build.
export default function RefOverlay({id, accent}: {id: string, accent: boolean}) {
  const src = `/__palette-ref/${id}-${accent ? 'full' : 'compact'}.jpg`, [found, setFound] = useState(false), [opacity, setOpacity] = useState(0)
  useEffect(() => { setFound(false); fetch(src, {method: 'HEAD'}).then(r => setFound(r.ok)).catch(() => {}) }, [src])
  if (!found) return null
  return <>
    <img className="pp-ref-frame" src={src} alt="" style={{opacity}}/>
    <label className="pp-ref-tool">Reel<input type="range" min="0" max="1" step=".05" value={opacity} onChange={e => setOpacity(Number(e.target.value))} aria-label="Reel frame opacity"/></label>
  </>
}
