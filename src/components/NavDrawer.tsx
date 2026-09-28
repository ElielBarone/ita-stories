import { useEffect } from 'react'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'
import styles from './NavDrawer.module.css'

export function NavDrawer() {
  const { open, setOpen, ref } = useDismissableMenu<HTMLElement>()

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <MenuOutlinedIcon fontSize="small" />
      </button>
      {open &&
        createPortal(
          <div className={styles.backdrop}>
            <nav className={styles.panel} ref={ref} aria-label="Main menu">
              <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close menu">
                <CloseOutlinedIcon fontSize="small" />
              </button>
              <Link to="/" className={styles.link} onClick={() => setOpen(false)}>
                <AutoStoriesOutlinedIcon fontSize="small" />
                Stories
              </Link>
              <Link to="/weak-spots" className={styles.link} onClick={() => setOpen(false)}>
                <InsightsOutlinedIcon fontSize="small" />
                Weak Spots
              </Link>
            </nav>
          </div>,
          document.body,
        )}
    </>
  )
}
