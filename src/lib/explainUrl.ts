import type { Language } from '@/types/story'

const NATIVE_LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  pt: 'Portuguese (Brazil)',
}

export function buildExplainUrl(original: string, translation: string, nativeLang: Language): string {
  const prompt = `Explain '${original}' (${translation} in Italian). Give 2 examples in different contexts. Respond in ${NATIVE_LANGUAGE_NAMES[nativeLang]}.`
  return `https://chat.openai.com/?model=gpt-4&q=${encodeURIComponent(prompt)}`
}
