export type Language = 'en' | 'pt'

export interface Sentence {
  it: string
  en: string
  pt: string
  speaker?: string
}

export interface Story {
  slug: string
  title: string
  level: string
  blurb: string
  youtubeId?: string
  videoSrc?: string
  sentences: Sentence[]
}
