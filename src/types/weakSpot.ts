export interface WeakSpotEvent {
  type: 'translate' | 'ai_help'
  at: string
}

export interface WeakSpotEntry {
  storySlug: string
  chunkIndex: number
  it: string
  en: string
  pt: string
  firstSeenAt: string
  recentEvents: WeakSpotEvent[]
}

export interface ScoredWeakSpotEntry extends WeakSpotEntry {
  score: number
  translateCount: number
  aiHelpCount: number
  lastSeenAt: string
}
