import { useDismissableMenu } from '@/hooks/useDismissableMenu'
import type { Language } from '@/types/story'
import styles from './LanguageMenu.module.css'

interface LanguageMenuProps {
  lang: Language
  onChange: (lang: Language) => void
}

const OPTIONS: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: `${import.meta.env.BASE_URL}flags/enUS.svg` },
  { value: 'pt', label: 'Português (BR)', flag: `${import.meta.env.BASE_URL}flags/ptBR.svg` },
]

export function LanguageMenu({ lang, onChange }: LanguageMenuProps) {
  const { open, setOpen, ref } = useDismissableMenu<HTMLDivElement>()
  const current = OPTIONS.find((option) => option.value === lang) ?? OPTIONS[0]

  return (
    <div className={styles.container} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img className={styles.flag} src={current.flag} alt="" width={20} height={20} />
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === lang}
                className={`${styles.item} ${option.value === lang ? styles.selected : ''}`}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                <img className={styles.flag} src={option.flag} alt="" width={18} height={18} />
                <span>{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
