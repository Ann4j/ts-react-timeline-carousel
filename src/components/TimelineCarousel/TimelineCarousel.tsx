import { useState, useRef, useCallback, useEffect } from 'react'
import { TimelineCircle } from '../TimelineCircle'
import { TimelineControls } from '../TimelineControls'
import { TimelineSlider } from '../TImelineSlider'
import { timelineData } from '../../data/timelineData'
import * as styles from './TimelineCarousel.module.scss'
import { TimelinePeriods } from '../TimelinePeriods/TimelinePeriods'
import { useContentAnimation, useCircleAnimation } from '../../hooks/useTimelineAnimation'

export function TimelineCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentPeriod = timelineData[activeIndex] ?? timelineData[0]
  const totalPeriods = timelineData.length
  const sliderRef = useRef(null)
  const categoryRef = useRef(null)
  const circleRef = useRef(null)
  const dotContainersRef = useRef([])

  const animateContent = useContentAnimation({
    animationDuration: 0.6,
    categoryRef,
    sliderRef
  })

  useEffect(() => {
    if (activeIndex > 0) {
      animateContent()
    }
  }, [activeIndex, animateContent])

  const handleActiveIndexChange = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const { initializeTimeline, handleDotClick, handleRotate } = useCircleAnimation({
    totalDots: timelineData.length,
    radius: 265,
    duration: 3,
    activeIndex,
    onActiveIndexChange: handleActiveIndexChange
  })

  return (
    <div className={styles.timeline}>
      <div className={styles.timeline__container}>
        <div className={styles.timeline__background}>
          <TimelineCircle
            totalDots={timelineData.length}
            activeIndex={activeIndex}
            categoryRef={categoryRef}
            circleRef={circleRef}
            dotContainersRef={dotContainersRef}
            handleDotClick={handleDotClick}
            period={currentPeriod}
            initializeTimeline={initializeTimeline}
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
                <TimelineSlider events={currentPeriod.events} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
