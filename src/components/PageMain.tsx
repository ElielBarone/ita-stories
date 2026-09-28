import type { ReactNode } from 'react'
import styles from './PageMain.module.css'

interface PageMainProps {
  children: ReactNode
}

export function PageMain({ children }: PageMainProps) {
  return <main className={styles.main}>{children}</main>
}
