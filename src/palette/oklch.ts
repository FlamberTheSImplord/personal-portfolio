// HEX → OKLCH (L 0–1, C ~0–0.37, H degrees). OKLCH tracks how light and how colourful a colour looks,
// so mood sorting and gradient checks can use plain thresholds.

const lin = (v: number) => { const c = v / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4 }

export type Oklch = {l: number, c: number, h: number}

export function oklch(hex: string): Oklch {
  const n = parseInt(hex.slice(1), 16)
  const r = lin(n >> 16 & 255), g = lin(n >> 8 & 255), b = lin(n & 255)
  const l = Math.cbrt(.4122214708 * r + .5363325363 * g + .0514459929 * b)
  const m = Math.cbrt(.2119034982 * r + .6806995451 * g + .1073969566 * b)
  const s = Math.cbrt(.0883024619 * r + .2817188376 * g + .6299787005 * b)
  const L = .2104542553 * l + .793617785 * m - .0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s
  const B = .0259040371 * l + .7827717662 * m - .808675766 * s
  return {l: L, c: Math.hypot(A, B), h: (Math.atan2(B, A) * 180 / Math.PI + 360) % 360}
}

const gamma = (v: number) => { const c = v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055; return Math.round(Math.min(1, Math.max(0, c)) * 255) }

/** OKLCH → HEX, clamped to sRGB. */
export function toHex({l, c, h}: Oklch) {
  const a = c * Math.cos(h * Math.PI / 180), b = c * Math.sin(h * Math.PI / 180)
  const L = (l + .3963377774 * a + .2158037573 * b) ** 3, M = (l - .1055613458 * a - .0638541728 * b) ** 3, S = (l - .0894841775 * a - 1.291485548 * b) ** 3
  const rgb = [4.0767416621 * L - 3.3077115913 * M + .2309699292 * S, -1.2684380046 * L + 2.6097574011 * M - .3413193965 * S, -.0041960863 * L - .7034186147 * M + 1.707614701 * S]
  return '#' + rgb.map(v => gamma(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

/** Smallest angle between two hues, 0–180. */
export const hueGap = (a: number, b: number) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d }

/** Colour temperature from hue. Near-greys count as neutral. */
export function temperature(hex: string) {
  const {c, h} = oklch(hex)
  return c < .035 ? 'Neutral' : h >= 345 || h < 130 ? 'Warm' : 'Cool'
}
