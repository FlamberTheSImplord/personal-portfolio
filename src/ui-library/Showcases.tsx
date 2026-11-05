import { lazy, Suspense } from 'react'
import type { Library } from './catalog'
const pages={boardui:lazy(()=>import('./showcases/BoardUI')),vengeance:lazy(()=>import('./showcases/Vengeance')),animate:lazy(()=>import('./showcases/Animate')),uiverse:lazy(()=>import('./showcases/Uiverse')),forge:lazy(()=>import('./showcases/Forge')),uilora:lazy(()=>import('./showcases/Uilora'))}
export default function Showcases({library}:{library:Library}){if(library.id==='smoothui')return <section className="ul-reference-page"><h1>SmoothUI</h1><p>Official library reference only.</p><a href="https://smoothui.dev/">Explore SmoothUI ↗</a></section>;const Page=pages[library.id];return <Suspense fallback={<div className="ul-loading" role="status">Preparing {library.name}…</div>}><Page/></Suspense>}
