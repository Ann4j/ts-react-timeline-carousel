import * as styles from './TimelineControls.module.scss'

export interface TimelineControlsProps {
  onRotate: (direction: 'clockwise' | 'counterclockwise') => void
  currentIndex: number
  totalPeriods: number
}

export function TimelineControls({ onRotate, currentIndex, totalPeriods }: TimelineControlsProps) {
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

  return (
    <div className={styles.controls}>
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
  )
}
