import type { DisplayLang, Sentence } from '@/types/story'
import styles from './StoryText.module.css'

interface StoryTextProps {
  sentences: Sentence[]
  primaryLang: DisplayLang
  selectedIndex: number | null
  fontSize: number
  onSelect: (index: number) => void
}

export function StoryText({ sentences, primaryLang, selectedIndex, fontSize, onSelect }: StoryTextProps) {
  return (
    <article className={styles.story} style={{ fontSize }}>
      {sentences.map((sentence, index) => {
        const chunk = (
          <span
            key={index}
            tabIndex={0}
            className={`${styles.chunk} ${index === selectedIndex ? styles.selected : ''}`}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(index)
              }
            }}
          >
            {sentence[primaryLang]}
          </span>
        )

        if (!sentence.speaker) {
          return chunk
        }

        return (
          <div key={index} className={styles.line}>
            <span className={styles.speaker}>{sentence.speaker}</span>
            {chunk}
          </div>
        )
      })}
    </article>
  )
}
