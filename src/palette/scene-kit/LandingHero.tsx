import type {ReactNode} from 'react'

/** Frame for a hero shared with a Web designs landing page: its links stay inert in the palette preview. */
export function LandingHero({children}: {children: ReactNode}) {
  return <div className="pd-site lp-scene" ref={el => el?.setAttribute('inert', '')}>{children}</div>
}
