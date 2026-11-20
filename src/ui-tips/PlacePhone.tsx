import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {ChevronLeft, X} from 'lucide-react'
import './place-phone.css'

/** A small shop on a phone. Each tip practises one action (`focus`): open a card, go back, or open the menu.
 *  "carry" animates that action; "cut" swaps screens instantly. The other actions stay instant or off. */
type Product = {name: string, material: string, line: string, dark?: boolean}
const products: Product[] = [
  {name: 'Orb', material: 'Glass', line: 'Smoked glass, hand blown.'},
  {name: 'Halo', material: 'Steel', line: 'A ring of soft light.', dark: true},
  {name: 'Column', material: 'Stone', line: 'Turned from one block.'},
  {name: 'Arc', material: 'Oak', line: 'A bent oak arch.'},
]
function Art({name}: {name: string}) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="50" cy="84" rx="24" ry="3.5" fill="#0002"/>
    {name === 'Orb' && <><defs><radialGradient id="sop-orb" cx=".35" cy=".3"><stop offset="0" stopColor="#8a8c90"/><stop offset=".55" stopColor="#3a3b3f"/><stop offset="1" stopColor="#131416"/></radialGradient></defs><circle cx="50" cy="56" r="26" fill="url(#sop-orb)"/></>}
    {name === 'Halo' && <><circle cx="50" cy="44" r="25" fill="none" stroke="#d9dadc" strokeWidth="8"/><rect x="47" y="69" width="6" height="12" fill="#bfc1c4"/><rect x="36" y="80" width="28" height="4" rx="2" fill="#d9dadc"/></>}
    {name === 'Column' && <><rect x="37" y="30" width="26" height="52" fill="#1d1e21"/><ellipse cx="50" cy="30" rx="13" ry="4" fill="#3b3c40"/><ellipse cx="50" cy="82" rx="13" ry="4" fill="#1d1e21"/></>}
    {name === 'Arc' && <path d="M30 84V52a20 20 0 0 1 40 0v32H59V53a9 9 0 0 0-18 0v31z" fill="#1d1e21"/>}
  </svg>
}
type Box = {top: number, left: number, width: number, height: number}
export type PhoneStart = 'grid' | 'page' | 'menu'

export type PhoneFocus = 'open' | 'back' | 'menu'
export default function PlacePhone({mode, focus = 'open', start = 'grid', live = true, hint: hintText}: {mode: 'cut' | 'carry', focus?: PhoneFocus, start?: PhoneStart, live?: boolean, hint?: string}) {
  const screen = useRef<HTMLDivElement>(null), cards = useRef<(HTMLButtonElement | null)[]>([]), menuButton = useRef<HTMLButtonElement>(null), backButton = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState<number | null>(start === 'page' ? 1 : null)
  // The page's box: the card's box while opening or closing, null once it fills the screen.
  const [box, setBox] = useState<Box | null>(null)
  const [closing, setClosing] = useState(false)
  const [menu, setMenu] = useState(start === 'menu'), [menuShown, setMenuShown] = useState(start === 'menu')
  const [tap, setTap] = useState<{x: number, y: number, id: number} | null>(null)
  const [hint, setHint] = useState(live && !!hintText)
  const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const carry = mode === 'carry' && live, tab = live ? undefined : -1
  const anim = (action: PhoneFocus) => carry && focus === action
  const opened = useRef(false)

  const boxOf = (el: Element | null | undefined): Box | null => {
    const s = screen.current?.getBoundingClientRect(), r = el?.getBoundingClientRect()
    return s && r ? {top: r.top - s.top, left: r.left - s.left, width: r.width, height: r.height} : null
  }
  function ripple(e: React.MouseEvent) {
    const s = screen.current?.getBoundingClientRect(); if (!s) return
    setTap({x: e.clientX - s.left, y: e.clientY - s.top, id: Date.now()})
  }
  function openCard(i: number, e: React.MouseEvent) {
    ripple(e); setHint(false); opened.current = true
    if (anim('open') && !reduced) setBox(boxOf(cards.current[i]))
    setOpen(i)
  }
  function back(e: React.MouseEvent) {
    ripple(e); setHint(false)
    if (!anim('back')) { const i = open; setOpen(null); requestAnimationFrame(() => cards.current[i ?? 0]?.focus({preventScroll: true})); return }
    setClosing(true)
    if (!reduced) setBox(boxOf(cards.current[open ?? 0]))
  }
  function finishClose() {
    if (!closing) return
    const i = open; setClosing(false); setOpen(null); setBox(null)
    requestAnimationFrame(() => cards.current[i ?? 0]?.focus({preventScroll: true}))
  }
  // Opening: paint once at the card's box, then let the transition grow it to the full screen.
  useLayoutEffect(() => {
    if (open === null || closing || !box) return
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setBox(null)))
    return () => cancelAnimationFrame(frame)
  }, [open, box, closing])
  useEffect(() => { if (open !== null && !closing && opened.current) backButton.current?.focus({preventScroll: true}) }, [open, closing, live, start])
  // Finish the close even if transitionend never fires (reduced motion has no box change; hidden tabs skip frames).
  useEffect(() => { if (!closing) return; const t = setTimeout(finishClose, reduced ? 160 : 450); return () => clearTimeout(t) }, [closing, reduced])
  function toggleMenu(e: React.MouseEvent) {
    ripple(e); setHint(false)
    if (menu) { setMenu(false); if (!anim('menu')) setMenuShown(false); menuButton.current?.focus({preventScroll: true}) }
    else if (!anim('menu')) { setMenuShown(true); setMenu(true) }
    else { setMenuShown(true); requestAnimationFrame(() => requestAnimationFrame(() => setMenu(true))) }
  }
  useEffect(() => { if (!tap) return; const t = setTimeout(() => setTap(null), 450); return () => clearTimeout(t) }, [tap])

  const product = open === null ? null : products[open]
  // A pulsing ring marks the one thing to tap, until the first tap.
  const target = (action: PhoneFocus) => hint && focus === action ? 'sop-target' : ''
  const pageStyle = box ? {top: box.top, left: box.left, width: box.width, height: box.height, borderRadius: 8} : undefined
  return <div className={`sop-phone sop-${carry ? 'carry' : 'cut'} ${reduced ? 'sop-reduced' : ''}`} aria-hidden={!live || undefined}>
    <div className="sop-island"/>
    <div className="sop-screen" ref={screen}>
      <header className="sop-bar"><span className="sop-logo"><i/>Shop</span><button tabIndex={tab} ref={menuButton} className={`sop-menu-button ${target('menu')}`} disabled={live && focus !== 'menu'} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={toggleMenu}><i/><i/></button></header>
      <div className="sop-grid">{products.map((p, i) => <button tabIndex={tab} key={p.name} ref={el => { cards.current[i] = el }} className={`sop-card ${i === 1 ? target('open') : ''}`} disabled={live && focus === 'menu'} style={open === i ? {visibility: 'hidden'} : undefined} onClick={e => openCard(i, e)} aria-label={`Open ${p.name}`}><span className={`sop-card-art ${p.dark ? 'sop-dark' : ''}`}><Art name={p.name}/></span><b>{p.name}</b><small>{p.material}</small></button>)}</div>
      {product && <section className={`sop-page ${box ? 'sop-page-small' : ''} ${closing && reduced ? 'sop-page-fading' : ''}`} style={pageStyle} onTransitionEnd={e => { if (e.target === e.currentTarget && e.propertyName === 'width') finishClose() }} aria-label={product.name}>
        <div className={`sop-page-art ${product.dark ? 'sop-dark' : ''}`}><Art name={product.name}/><button tabIndex={tab} ref={backButton} className={`sop-back ${target('back')}`} aria-label="Back to shop" onClick={back}><ChevronLeft size={14}/></button></div>
        <div className="sop-page-info"><b>{product.name}</b><small>{product.material}</small><span className="sop-bag">Add to bag</span><p>{product.line}<br/>Made to order.</p>
          <div className="sop-related">{products.filter(p => p !== product).slice(0, 2).map(p => <span key={p.name} className={p.dark ? 'sop-dark' : ''}><Art name={p.name}/></span>)}</div></div>
      </section>}
      {menuShown && <nav className={`sop-menu ${menu ? 'sop-menu-open' : ''}`} onTransitionEnd={e => { if (e.target === e.currentTarget && !menu) setMenuShown(false) }} aria-label="Shop menu">
        <button tabIndex={tab} className="sop-menu-close" aria-label="Close menu" onClick={toggleMenu}><X size={12}/></button>
        {['Shop', 'New in', 'Journal', 'About'].map((t, i) => <button tabIndex={tab} key={t} onClick={toggleMenu}>{t}{!i && <i/>}</button>)}
      </nav>}
      {tap && <span key={tap.id} className="sop-tap" style={{left: tap.x, top: tap.y}}/>}
    </div>
    {hint && <span className="sop-hint">{hintText}</span>}
  </div>
}
