// Dates read from sources.ts: sorting, labels and the sidebar "New" marker follow automatically.
import {sources, type SourceId} from './sources'

export const addedOn = Object.fromEntries(Object.entries(sources).map(([id, s]) => [id, s.added])) as Record<SourceId, string>

export type PaletteOrder = 'new' | 'old'

const dates = Object.values(addedOn) as string[]
export const newestDate = dates.reduce((a, b) => a > b ? a : b)
export const oldestDate = dates.reduce((a, b) => a < b ? a : b)
export const paletteAge = (iso: string) => iso === newestDate ? 'Newest' : iso === oldestDate ? 'Oldest' : null
export const showDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})
export const byDate = (order: PaletteOrder) => (a: string, b: string) => order === 'new' ? b.localeCompare(a) : a.localeCompare(b)

/** True for 7 days after the newest palette was added. */
export const palettesRecentlyUpdated = (now = Date.now()) => now - new Date(`${newestDate}T00:00:00`).getTime() < 7 * 864e5
