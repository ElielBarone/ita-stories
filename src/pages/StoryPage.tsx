import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontSizeControl } from '@/components/FontSizeControl'
import { LanguageMenu } from '@/components/LanguageMenu'
import { PageHeader } from '@/components/PageHeader'
import { PageMain } from '@/components/PageMain'
import { SoundToggle } from '@/components/SoundToggle'
import { StoryText } from '@/components/StoryText'
import { TranslationPanel } from '@/components/TranslationPanel'
import { VideoEmbed } from '@/components/VideoEmbed'
import { getStoryBySlug } from '@/data/stories'
import { buildExplainUrl } from '@/lib/explainUrl'
import { speakItalian } from '@/lib/tts'
import { recordAiHelp, recordTranslate } from '@/lib/weakSpots/store'
import type { Language } from '@/types/story'

const LANG_STORAGE_KEY = 'ita-stories-lang'
const SPEAK_STORAGE_KEY = 'ita-stories-speak'
const MIN_FONT_SIZE = 15
const MAX_FONT_SIZE = 27
const DEFAULT_FONT_SIZE = 18

function loadStoredLanguage(): Language {
  const stored = localStorage.getItem(LANG_STORAGE_KEY)
  return stored === 'pt' ? 'pt' : 'en'
}

function loadStoredSpeakEnabled(): boolean {
  const stored = localStorage.getItem(SPEAK_STORAGE_KEY)
  return stored !== 'off'
}

export function StoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const story = getStoryBySlug(slug)

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)
  const [lang, setLang] = useState<Language>(loadStoredLanguage)
  const [speakEnabled, setSpeakEnabled] = useState(loadStoredSpeakEnabled)

  if (!story) {
    return (
      <>
        <PageHeader title="Story not found" subtitle="" />
        <PageMain>
          <p>We couldn't find that story.</p>
        </PageMain>
      </>
    )
  }

  const selectedSentence = selectedIndex !== null ? story.sentences[selectedIndex] : null

  function handleSelect(index: number) {
    setSelectedIndex(index)
    if (speakEnabled) speakItalian(story!.sentences[index].it)
    recordTranslate(story!.slug, index, story!.sentences[index])
  }

  function handleExplain() {
    if (selectedIndex === null) return
    recordAiHelp(story!.slug, selectedIndex, story!.sentences[selectedIndex])
  }

  function handleLangChange(next: Language) {
    setLang(next)
    localStorage.setItem(LANG_STORAGE_KEY, next)
  }

  function handleToggleSpeak() {
    const next = !speakEnabled
    setSpeakEnabled(next)
    localStorage.setItem(SPEAK_STORAGE_KEY, next ? 'on' : 'off')
  }

  return (
    <>
      <PageHeader
        title={story.title}
        subtitle={`Italian story · ${story.level} · Tap a sentence or phrase to see its meaning.`}
      >
        <FontSizeControl
          onIncrease={() => setFontSize((size) => Math.min(MAX_FONT_SIZE, size + 1))}
          onDecrease={() => setFontSize((size) => Math.max(MIN_FONT_SIZE, size - 1))}
        />
        <LanguageMenu lang={lang} onChange={handleLangChange} />
        <SoundToggle enabled={speakEnabled} onToggle={handleToggleSpeak} />
      </PageHeader>
      <PageMain>
        {story.youtubeId && <VideoEmbed youtubeId={story.youtubeId} title={`${story.title} — YouTube video`} />}
        <StoryText
          sentences={story.sentences}
          selectedIndex={selectedIndex}
          fontSize={fontSize}
          onSelect={handleSelect}
        />
      </PageMain>
      {selectedSentence && (
        <TranslationPanel
          original={selectedSentence.it}
          translation={selectedSentence[lang]}
          explainUrl={buildExplainUrl(selectedSentence.it, selectedSentence[lang], lang)}
          onClose={() => setSelectedIndex(null)}
          onExplain={handleExplain}
        />
      )}
    </>
  )
}
