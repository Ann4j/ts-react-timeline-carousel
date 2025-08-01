import * as styles from './TimelineControls.module.scss'

export interface TimelineControlsProps {
  onRotate: (direction: 'clockwise' | 'counterclockwise') => void
}

export function TimelineControls({ onRotate }: TimelineControlsProps) {
  return (
    <div className={styles.controls}>
      <button onClick={() => onRotate('counterclockwise')} className={styles.controls__button} />
      <button onClick={() => onRotate('clockwise')} className={styles.controls__button} />
    </div>
  )
}
