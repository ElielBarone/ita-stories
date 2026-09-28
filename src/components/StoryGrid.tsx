import type { Story } from '@/types/story'
import { StoryCard } from './StoryCard'
import styles from './StoryGrid.module.css'

interface StoryGridProps {
  stories: Story[]
}

export function StoryGrid({ stories }: StoryGridProps) {
  return (
    <div className={styles.grid}>
      {stories.map((story) => (
        <StoryCard key={story.slug} story={story} />
      ))}
    </div>
  )
}
