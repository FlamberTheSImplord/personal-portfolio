// HEX values as printed on the swatch cards in niki.aroca's reel (read from the video frames).
export const colors = {
  charcoal: ['Charcoal black', '#21232E'],
  royal: ['Royal blue', '#105BFF'],
  tangerine: ['Tangerine orange', '#FE8500'],
  aqua: ['Aqua jade', '#74FFED'],
  midnight: ['Midnight abyss', '#171F44'],
  pink: ['Baby pink', '#FE81D1'],
} as const

export type PaletteFamily = 'electric' | 'aqua'

export const palettes = [
  {id: 'electric', name: 'Electric contrast', description: 'Charcoal black + royal blue', colors: [colors.charcoal, colors.royal], family: 'electric', accent: false},
  {id: 'electric-accent', name: 'A warmer interruption', description: 'Charcoal + royal blue + tangerine', colors: [colors.charcoal, colors.royal, colors.tangerine], family: 'electric', accent: true},
  {id: 'aqua', name: 'After midnight', description: 'Aqua jade + midnight abyss', colors: [colors.aqua, colors.midnight], family: 'aqua', accent: false},
  {id: 'aqua-accent', name: 'A touch of unexpected', description: 'Aqua + midnight + baby pink', colors: [colors.aqua, colors.midnight, colors.pink], family: 'aqua', accent: true},
] as const satisfies readonly {id: string, name: string, description: string, colors: readonly (readonly [string, string])[], family: PaletteFamily, accent: boolean}[]
