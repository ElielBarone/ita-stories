import type { DisplayLang } from '@/types/story'

const LOCALE_BY_LANG: Record<DisplayLang, string> = {
  it: 'it-IT',
  en: 'en-US',
  pt: 'pt-BR',
}

export function speak(text: string, lang: DisplayLang): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = LOCALE_BY_LANG[lang]
  window.speechSynthesis.speak(utterance)
}
