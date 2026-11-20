// Where palettes come from. A new reel needs one line here; dates, credits, sorting and notes all read from it.
// `note` marks a source that has website studies. Kept apart from the study data so the sidebar stays light.

export const sources = {
  niki: {creator: 'niki.aroca', url: 'https://www.instagram.com/reels/DfIaULMIRC-/', added: '2026-11-05', note: 'Globynk recreated from the reel; Editeaze reinterpreted.'},
  charles: {creator: 'charles.unemployed', url: 'https://www.instagram.com/reels/DfSbrNrR3Gu/', added: '2026-11-16', note: 'Murmur and Pocket recreated from the reel; Timbre reinterpreted. Fonts are stand-ins.'},
  '346eur': {creator: '346eur', url: 'https://www.threads.com/@346eur/post/DfoeH__Ezj7', added: '2026-11-17'},
  charles2: {creator: 'charles.unemployed', url: 'https://www.instagram.com/reels/DfuhfgpRQxa/', added: '2026-11-18', note: 'Heroes recreated from the reel with free Pexels photos. Fonts are stand-ins.'},
  charles3: {creator: 'charles.unemployed', url: 'https://www.instagram.com/reels/DfzqwB3y0vS/', added: '2026-11-18', note: 'Heroes recreated from the reel with free Pexels photos and Blender renders, so imagery differs. Fonts are stand-ins.'},
  anthony: {creator: 'anthonyalxnder', url: 'https://www.instagram.com/reels/Df2ty9tSdaE/', added: '2026-11-18', note: 'Heroes recreated from designs shown in the reel, using free Pexels photos and Blender renders. Imagery differs and fonts are stand-ins.'},
  pierre: {creator: 'pierredelcourr', url: 'https://www.instagram.com/reels/DfSrkxdzo5m/', added: '2026-11-20', note: 'Agency hero recreated with a free Pexels photo by Norma Mortenson. The Club and Tennis colourways from this reel are on the shelf.'},
} as const satisfies Record<string, {creator: string, url: string, added: string, note?: string}>

export type SourceId = keyof typeof sources
export type ReferenceId = {[K in SourceId]: typeof sources[K] extends {note: string} ? K : never}[SourceId]
