import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import styles from './TranslationPanel.module.css'

interface TranslationPanelProps {
  original: string
  translation: string
  explainUrl: string
  onClose: () => void
  onExplain: () => void
}

export function TranslationPanel({
  original,
  translation,
  explainUrl,
  onClose,
  onExplain,
}: TranslationPanelProps) {
  return (
    <div className={styles.panel}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close translation">
        <CloseOutlinedIcon fontSize="inherit" />
      </button>
      <div className={styles.original}>{original}</div>
      <div className={styles.translation}>{translation}</div>
      <a className={styles.explain} href={explainUrl} target="_blank" rel="noopener noreferrer" onClick={onExplain}>
        <AutoAwesomeOutlinedIcon fontSize="inherit" />
        Explain with AI
      </a>
      <div className={styles.hint}>Tap another phrase to continue.</div>
    </div>
  )
}
