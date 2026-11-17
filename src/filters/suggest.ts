// "Did you mean": the closest known words to a query that found nothing.
function distance(a: string, b: string) {
  const row = Array.from({length: b.length + 1}, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]; row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = cur
    }
  }
  return row[b.length]
}

/** Up to `max` vocabulary words close to any word of the query (typos, partial words, shared start). */
export function suggest(query: string, vocab: string[], max = 3): string[] {
  const words = query.toLocaleLowerCase().replace(/#/g, '').split(/\s+/).filter(w => w.length > 1)
  if (!words.length) return []
  const scored = [...new Set(vocab)].map(v => {
    const target = v.toLocaleLowerCase()
    const best = Math.min(...words.map(w => {
      if (target.startsWith(w) || w.startsWith(target)) return 0
      // Compare against the start of the target too, so "typogr" is close to "typography".
      return Math.min(distance(w, target), distance(w, target.slice(0, w.length)) + 1)
    }))
    return {v, best}
  })
  // Two edits for short words ("colr" → colour), more for long ones.
  const limit = (w: string) => Math.max(2, Math.floor(w.length / 3))
  // Ties go to the word sharing the longest start with what was typed ("colr" → colour before copy).
  const shared = (v: string) => Math.max(...words.map(w => { let i = 0; while (i < w.length && w[i] === v.toLocaleLowerCase()[i]) i++; return i }))
  return scored.filter(s => s.best <= limit(words[0])).sort((a, b) => a.best - b.best || shared(b.v) - shared(a.v) || a.v.length - b.v.length).slice(0, max).map(s => s.v)
}
