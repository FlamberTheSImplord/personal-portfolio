import { lazy, Suspense } from 'react'
import type { Library } from './catalog'
const pages={vengeance:lazy(()=>import('./showcases/Vengeance')),animate:lazy(()=>import('./showcases/Animate')),uiverse:lazy(()=>import('./showcases/Uiverse')),forge:lazy(()=>import('./showcases/Forge')),uilora:lazy(()=>import('./showcases/Uilora'))}
export default function Showcases({library}:{library:Library}){const Page=pages[library.id];return <Suspense fallback={<div className="ul-loading" role="status">Preparing {library.name}…</div>}><Page/></Suspense>}
