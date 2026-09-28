import type { ReactNode } from 'react'
import { useHideOnScroll } from '@/hooks/useHideOnScroll'
import { NavDrawer } from './NavDrawer'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  subtitle: string
  children?: ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  const hidden = useHideOnScroll()

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          <NavDrawer />
        </div>
        {children && <div className={styles.controls}>{children}</div>}
      </div>
    </header>
  )
}
