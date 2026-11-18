import type {ReactNode} from 'react'
import {Minus, Plus} from 'lucide-react'
import {SegmentedControl, SegmentedControlItem} from '../../../vendor/boardui/components/base/segmented-control/segmented-control'
import {InteractiveHoverButton} from '../../ui-library/vendor/vengeance/InteractiveHoverButton'
import '../../ui-library/boardui/components.css'

// UI Library pieces used by the landing pages, themed through each site's colour tokens:
// BoardUI SegmentedControl and Vengeance UI InteractiveHoverButton.

export function Seg<T extends string>({label, value, options, onChange}: {label: string, value: T, options: readonly (readonly [T, string])[], onChange: (next: T) => void}) {
  return <div className="bui-kit lp-bui"><SegmentedControl aria-label={label} selectedKeys={[value]} onSelectionChange={keys => { const next = [...keys][0]; if (next) onChange(next as T) }}>
    {options.map(([id, name]) => <SegmentedControlItem key={id} id={id}>{name}</SegmentedControlItem>)}
  </SegmentedControl></div>
}

export const Cta = ({children, onClick}: {children: string, onClick?: () => void}) => <InteractiveHoverButton className="lp-cta" onClick={onClick}>{children}</InteractiveHoverButton>

export function Stepper({label, note, value, min = 0, max = 9, onChange}: {label: string, note?: ReactNode, value: number, min?: number, max?: number, onChange: (next: number) => void}) {
  return <div className="lp-step">
    <span><b>{label}</b>{note && <small>{note}</small>}</span>
    <div>
      <button aria-label={`Fewer: ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}><Minus size={15}/></button>
      <output key={value} className="lp-pop">{value}</output>
      <button aria-label={`More: ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}><Plus size={15}/></button>
    </div>
  </div>
}
