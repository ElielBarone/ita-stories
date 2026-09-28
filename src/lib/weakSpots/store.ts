import type { Sentence } from '@/types/story'
import type { ScoredWeakSpotEntry, WeakSpotEntry, WeakSpotEvent } from '@/types/weakSpot'

const STORAGE_KEY = 'ita-stories:weak-spots'
const STORAGE_VERSION = 2
const MAX_RECENT_EVENTS = 20

// Exponential half-life decay, the same model behind Duolingo's Half-Life
// Regression and Anki/FSRS retrievability: each event's contribution halves
// every HALF_LIFE_DAYS. A phrase you struggled with once, long ago, and never
// struggled with again fades out on its own — no explicit "I know this now"
// signal required.
export const HALF_LIFE_DAYS = 10
export const TRANSLATE_WEIGHT = 1
export const AI_HELP_WEIGHT = 3
export const MIN_SCORE = 0.05
export const MAX_WEAK_SPOTS = 20

const HALF_LIFE_MS = HALF_LIFE_DAYS * 24 * 60 * 60 * 1000

interface WeakSpotState {
  version: typeof STORAGE_VERSION
  entries: Record<string, WeakSpotEntry>
}

function chunkId(storySlug: string, chunkIndex: number): string {
  return `${storySlug}#${chunkIndex}`
}

function loadState(): WeakSpotState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return { version: STORAGE_VERSION, entries: {} }

  try {
    const parsed = JSON.parse(raw) as WeakSpotState
    if (parsed.version === STORAGE_VERSION && parsed.entries) return parsed
  } catch {
    // fall through to a fresh state on corrupt data
  }
  return { version: STORAGE_VERSION, entries: {} }
}

function saveState(state: WeakSpotState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function recordEvent(
  storySlug: string,
  chunkIndex: number,
  sentence: Sentence,
  type: WeakSpotEvent['type'],
): void {
  const state = loadState()
  const id = chunkId(storySlug, chunkIndex)
  const now = new Date().toISOString()

  const existing = state.entries[id]
  const entry: WeakSpotEntry = existing ?? {
    storySlug,
    chunkIndex,
    it: sentence.it,
    en: sentence.en,
    pt: sentence.pt,
    firstSeenAt: now,
    recentEvents: [],
  }

  entry.recentEvents = [...entry.recentEvents, { type, at: now }].slice(-MAX_RECENT_EVENTS)

  state.entries[id] = entry
  saveState(state)
}

export function recordTranslate(storySlug: string, chunkIndex: number, sentence: Sentence): void {
  recordEvent(storySlug, chunkIndex, sentence, 'translate')
}

export function recordAiHelp(storySlug: string, chunkIndex: number, sentence: Sentence): void {
  recordEvent(storySlug, chunkIndex, sentence, 'ai_help')
}

export function getAllEntries(): WeakSpotEntry[] {
  return Object.values(loadState().entries)
}

export function getEntriesForStory(storySlug: string): WeakSpotEntry[] {
  return getAllEntries().filter((entry) => entry.storySlug === storySlug)
}

export function clearAll(): void {
  localStorage.removeItem(STORAGE_KEY)
}

const EVENT_WEIGHTS: Record<WeakSpotEvent['type'], number> = {
  translate: TRANSLATE_WEIGHT,
  ai_help: AI_HELP_WEIGHT,
}

export function computeScore(entry: WeakSpotEntry, now: number = Date.now()): number {
  return entry.recentEvents.reduce((total, event) => {
    const elapsedMs = now - new Date(event.at).getTime()
    const decay = Math.pow(0.5, elapsedMs / HALF_LIFE_MS)
    return total + EVENT_WEIGHTS[event.type] * decay
  }, 0)
}

/**
 * Scores every entry, drops anything decayed below MIN_SCORE (effectively
 * "learned"), sorts by score descending, and caps the result at
 * MAX_WEAK_SPOTS so the list only ever surfaces the phrases most worth
 * reviewing right now.
 */
export function scoreAndRank(entries: WeakSpotEntry[], now: number = Date.now()): ScoredWeakSpotEntry[] {
  return entries
    .map((entry) => {
      const lastEvent = entry.recentEvents[entry.recentEvents.length - 1]
      return {
        ...entry,
        score: computeScore(entry, now),
        translateCount: entry.recentEvents.filter((event) => event.type === 'translate').length,
        aiHelpCount: entry.recentEvents.filter((event) => event.type === 'ai_help').length,
        lastSeenAt: lastEvent?.at ?? entry.firstSeenAt,
      }
    })
    .filter((entry) => entry.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_WEAK_SPOTS)
}
