import { useState, useRef } from 'react'
import { TimelineCircle } from '../TimelineCircle'
import { TimelineControls } from '../TimelineControls'
import { TimelineSlider } from '../TImelineSlider'
import { timelineData, getCurrentPeriod, getTotalPeriods } from '../../data/timelineData'
import * as styles from './TimelineCarousel.module.scss'
import { TimelinePeriods } from '../TimelinePeriods/TimelinePeriods'
import { useContentAnimation } from '../../hooks/useTimelineAnimation'

export function TimelineCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentPeriod = getCurrentPeriod(activeIndex)
  const totalPeriods = getTotalPeriods()
  const sliderRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLParagraphElement>(null)

  useContentAnimation(activeIndex, 0.6, categoryRef, sliderRef)

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
            activeIndex={activeIndex}
            onActiveIndexChange={handleActiveIndexChange}
            onRotate={handleRotateCallback}
            categoryRef={categoryRef}
          />
          <TimelinePeriods startYear={currentPeriod.startYear} endYear={currentPeriod.endYear} />
          <div className={styles.timeline__content}>
            <h1 className={styles.timeline__title}>
              <span>Исторические</span>
              <span>даты</span>
            </h1>
            <div className={styles.timeline__wrapper}>
              <TimelineControls
                onRotate={handleRotate}
                onIndexChange={handleActiveIndexChange}
                currentIndex={activeIndex}
                totalPeriods={totalPeriods}
              />
              <div ref={sliderRef}>
                <div className={styles.timeline__category}>
                  <p>{currentPeriod.category}</p>
                </div>
                <TimelineSlider
                  events={currentPeriod.events}
                  slidesPerView={'auto'}
                  spaceBetween={80}
                  navigation={true}
                  loop={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
