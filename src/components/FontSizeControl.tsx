interface FontSizeControlProps {
  onIncrease: () => void
  onDecrease: () => void
}

export function FontSizeControl({ onIncrease, onDecrease }: FontSizeControlProps) {
  return (
    <>
      <button type="button" onClick={onDecrease} aria-label="Decrease text size">
        A−
      </button>
      <button type="button" onClick={onIncrease} aria-label="Increase text size">
        A+
      </button>
    </>
  )
}
