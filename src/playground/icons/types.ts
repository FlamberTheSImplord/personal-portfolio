import type {ReactNode} from 'react'

export type IconName = 'bolt' | 'palette' | 'shield' | 'arrow' | 'check' | 'sparkle' | 'menu'
export type IconVariant = 'Outline' | 'TwoTone' | 'Bold' | 'Bulk' | 'Broken'
export type IconRender = (name: IconName, opts: {size: number, stroke?: number, weight?: 'regular' | 'bold' | 'duotone' | 'thin', variant?: IconVariant}) => ReactNode
