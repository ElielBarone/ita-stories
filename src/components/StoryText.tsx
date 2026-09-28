import type { Sentence } from '@/types/story'
import styles from './StoryText.module.css'

interface StoryTextProps {
  sentences: Sentence[]
  selectedIndex: number | null
  fontSize: number
  onSelect: (index: number) => void
}

export function StoryText({ sentences, selectedIndex, fontSize, onSelect }: StoryTextProps) {
  return (
    <article className={styles.story} style={{ fontSize }}>
      {sentences.map((sentence, index) => (
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
          {sentence.it}
        </span>
      ))}
    </article>
  )
}
