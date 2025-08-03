import { useState, useRef } from 'react'
import { TimelineCircle } from '../TimelineCircle'
import { TimelineControls } from '../TimelineControls'
import { TimelineSlider } from '../TImelineSlider'
import { timelineData, getCurrentPeriod, getTotalPeriods } from '../../data/timelineData'
import * as styles from './TimelineCarousel.module.scss'
import { TimelinePeriods } from '../TimelinePeriods/TimelinePeriods'

export function TimelineCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentPeriod = getCurrentPeriod(activeIndex)
  const totalPeriods = getTotalPeriods()
  const handleRotateRef = useRef<((direction: 'clockwise' | 'counterclockwise') => void) | null>(
    null
  )

  const handleActiveIndexChange = (index: number) => {
    setActiveIndex(index)
  }

  const handleRotateCallback = (
    handleRotate: (direction: 'clockwise' | 'counterclockwise') => void
  ) => {
    handleRotateRef.current = handleRotate
  }

  const handleRotate = (direction: 'clockwise' | 'counterclockwise') => {
    if (handleRotateRef.current) {
      handleRotateRef.current(direction)
    }
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.timeline__container}>
        <div className={styles.timeline__background}>
          <TimelineCircle
            totalDots={timelineData.length}
            onActiveIndexChange={handleActiveIndexChange}
            onRotate={handleRotateCallback}
          />
          <TimelinePeriods startYear={currentPeriod.startYear} endYear={currentPeriod.endYear} />
          <div className={styles.timeline__content}>
            <h1 className={styles.timeline__title}>
              <span>Исторические</span>
              <span>даты</span>
            </h1>
            <div>
              <TimelineControls
                onRotate={handleRotate}
                currentIndex={activeIndex}
                totalPeriods={totalPeriods}
              />
              <TimelineSlider
                events={currentPeriod.events}
                slidesPerView={'auto'}
                spaceBetween={80}
                navigation={true}
                pagination={false}
                scrollbar={false}
                loop={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
