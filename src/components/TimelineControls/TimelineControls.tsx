import * as styles from './TimelineControls.module.scss'

export interface TimelineControlsProps {
  onRotate: (direction: 'clockwise' | 'counterclockwise') => void
  onIndexChange: (index: number) => void
  currentIndex: number
  totalPeriods: number
}

export function TimelineControls({
  onRotate,
  onIndexChange,
  currentIndex,
  totalPeriods
}: TimelineControlsProps) {
  const isFirstIndex = currentIndex === 0
  const isLastIndex = currentIndex === totalPeriods - 1

  const handleClockwiseClick = () => {
    if (!isFirstIndex) {
      onRotate('clockwise')
    }
  }

  const handleCounterclockwiseClick = () => {
    if (!isLastIndex) {
      onRotate('counterclockwise')
    }
  }

  const handlePaginationClick = (index: number) => {
    if (index === currentIndex) return
    onIndexChange(index)
  }

  return (
    <div className={styles.controls}>
      <div className={styles.controls__content}>
        <p className={styles.controls__counter}>{`0${currentIndex + 1}/0${totalPeriods}`}</p>
        <div className={styles.controls__wrapper}>
          <button
            onClick={handleClockwiseClick}
            className={`${styles.controls__button} ${isFirstIndex ? styles.controls__buttonDisabled : ''}`}
            disabled={isFirstIndex}
          />
          <button
            onClick={handleCounterclockwiseClick}
            className={`${styles.controls__button} ${isLastIndex ? styles.controls__buttonDisabled : ''}`}
            disabled={isLastIndex}
          />
        </div>
      </div>
      <div className={styles.controls__pagination}>
        {Array.from({ length: totalPeriods }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePaginationClick(index)}
            className={`${styles.controls__paginationDot} ${index === currentIndex ? styles.controls__paginationDotActive : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
