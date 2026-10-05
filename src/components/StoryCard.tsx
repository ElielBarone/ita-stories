import { Link } from 'react-router-dom'
import type { Story } from '@/types/story'
import styles from './StoryCard.module.css'

interface StoryCardProps {
  story: Story
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link className={styles.card} to={`/story/${story.slug}`}>
      <span className={styles.level}>{story.level}</span>
      <h2 className={styles.title}>{story.title}</h2>
      <p className={styles.blurb}>{story.blurb}</p>
      {(story.youtubeId || story.videoSrc) && <div className={styles.badge}>▶ Includes video</div>}
    </Link>
  )
}
