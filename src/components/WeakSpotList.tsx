import type { ScoredWeakSpotEntry } from '@/types/weakSpot'
import styles from './WeakSpotList.module.css'

interface WeakSpotListProps {
  entries: ScoredWeakSpotEntry[]
}

export function WeakSpotList({ entries }: WeakSpotListProps) {
  if (entries.length === 0) {
    return (
      <p className={styles.empty}>
        No weak spots yet — phrases you translate or ask AI to explain will show up here.
      </p>
    )
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Italian</th>
          <th>English</th>
          <th>Português</th>
          <th>Translated</th>
          <th>AI help</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={`${entry.storySlug}#${entry.chunkIndex}`}>
            <td>{entry.it}</td>
            <td>{entry.en}</td>
            <td>{entry.pt}</td>
            <td>{entry.translateCount}</td>
            <td>{entry.aiHelpCount}</td>
            <td>{entry.score.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
