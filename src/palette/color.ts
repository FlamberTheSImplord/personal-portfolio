// Small colour helpers for the palette page: WCAG contrast and picking readable ink.

const channel = (v: number) => { const c = v / 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4 }

export function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return .2126 * channel(n >> 16 & 255) + .7152 * channel(n >> 8 & 255) + .0722 * channel(n & 255)
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + .05) / (lo + .05)
}

export function grade(ratio: number) {
  return ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : 'Decorative'
}

/** Whichever of near-black or white reads better on the given colour. */
export function inkOn(hex: string) {
  return contrast(hex, '#ffffff') >= contrast(hex, '#111318') ? '#ffffff' : '#111318'
}
