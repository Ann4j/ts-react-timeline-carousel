import { TimelineCircle } from '../TimelineCircle'
import * as styles from './TimelineCarousel.module.scss'

export function TimelineCarousel() {
  return (
    <div className={styles.timeline}>
      <div className={styles.timeline__container}>
        <div className={styles.timeline__background}>
          <TimelineCircle />
          <div className={styles.timeline__content}>
            <h1 className={styles.timeline__title}>
              <span>Исторические</span>
              <span>даты</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
