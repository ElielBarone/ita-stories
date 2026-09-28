import type { WeakSpotEntry } from '@/types/weakSpot'

function sanitize(text: string): string {
  return text.replace(/;/g, ',')
}

export function buildElephantCsv(entries: WeakSpotEntry[], targetLang: 'en' | 'pt'): string {
  return entries.map((entry) => `${sanitize(entry.it)};${sanitize(entry[targetLang])}`).join('\n')
}
