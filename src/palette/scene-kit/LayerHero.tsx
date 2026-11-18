import {Fragment, useEffect, useRef, type CSSProperties, type ReactNode} from 'react'
import './layers.css'

// A hero built from image layers. Layer positions come from the JSON written by the image script.
// Files live in public/palettes/<scene>: <id>-b.webp (compact), <id>-v.webp (accent stage), or <id>.webp when a layer never changes.

export type HeroLayer = {id: string, box: number[], pivot?: number[], accent?: boolean | string}
export type HeroManifest = {bg?: boolean, layers: HeroLayer[]}

function Layer({scene, prefix, layer: {id, box: [x, y, w, h], pivot, accent = true}}: {scene: string, prefix: string, layer: HeroLayer}) {
  const src = (name: string) => `/palettes/${scene}/${name}.webp`, image = (name: string, className?: string) => <img className={className} src={src(name)} alt="" decoding="sync" draggable={false}/>
  const style = {left: x, top: y, width: w, height: h, transformOrigin: pivot ? `${pivot[0] - x}px ${pivot[1] - y}px` : undefined} as CSSProperties
  return <div className={`sk-layer ${prefix}-${id}`} style={style}>{accent === false ? image(id) : accent === 'only' ? image(`${id}-v`, 'sk-accent') : <>{image(`${id}-b`, 'sk-base')}{image(`${id}-v`, 'sk-accent')}</>}</div>
}

export function LayerHero({scene, prefix, accent, manifest, slots, children}: {scene: string, prefix: string, accent: boolean, manifest: HeroManifest, slots?: Record<string, ReactNode>, children?: ReactNode}) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current!
    const observer = new IntersectionObserver(([entry]) => el.classList.toggle('is-off', !entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={root} className={`pd-site sk-hero ${prefix}${accent ? ' is-accent' : ''}`}>
    {manifest.bg && <img className="sk-bg" src={`/palettes/${scene}/bg.webp`} alt="" decoding="sync" draggable={false}/>}
    {slots?.bg}
    {manifest.layers.map(layer => <Fragment key={layer.id}><Layer scene={scene} prefix={prefix} layer={layer}/>{slots?.[layer.id]}</Fragment>)}
    {children}
  </div>
}
