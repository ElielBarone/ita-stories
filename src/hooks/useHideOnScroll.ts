import { useEffect, useRef, useState } from 'react'

export function useHideOnScroll(threshold = 8) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    function handleScroll() {
      const y = window.scrollY
      const diff = y - lastY.current
      if (Math.abs(diff) < threshold) return

      setHidden(diff > 0 && y > 80)
      lastY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return hidden
}
