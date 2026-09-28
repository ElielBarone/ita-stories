import type { Story } from '@/types/story'
import styles from './WeakSpotScopeSelect.module.css'

interface WeakSpotScopeSelectProps {
  value: string
  stories: Story[]
  onChange: (value: string) => void
}

export const ALL_STORIES_SCOPE = 'all'

export function WeakSpotScopeSelect({ value, stories, onChange }: WeakSpotScopeSelectProps) {
  return (
    <select className={styles.select} value={value} onChange={(event) => onChange(event.target.value)}>
      <option value={ALL_STORIES_SCOPE}>All stories</option>
      {stories.map((story) => (
        <option key={story.slug} value={story.slug}>
          {story.title}
        </option>
      ))}
    </select>
  )
}
