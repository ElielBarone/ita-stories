import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'
import styles from './SoundToggle.module.css'

interface SoundToggleProps {
  enabled: boolean
  onToggle: () => void
}

export function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={onToggle}
      aria-label={enabled ? 'Mute phrase read-aloud' : 'Unmute phrase read-aloud'}
      aria-pressed={enabled}
    >
      {enabled ? <VolumeUpOutlinedIcon fontSize="small" /> : <VolumeOffOutlinedIcon fontSize="small" />}
    </button>
  )
}
