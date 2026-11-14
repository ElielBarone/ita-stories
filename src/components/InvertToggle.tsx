import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined'
import styles from './InvertToggle.module.css'

interface InvertToggleProps {
  inverted: boolean
  onToggle: () => void
}

export function InvertToggle({ inverted, onToggle }: InvertToggleProps) {
  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={onToggle}
      aria-label={inverted ? 'Show Italian as the main text' : 'Show translation as the main text'}
      aria-pressed={inverted}
    >
      <SwapHorizOutlinedIcon fontSize="small" />
    </button>
  )
}
