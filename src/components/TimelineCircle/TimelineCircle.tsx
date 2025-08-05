import { useEffect, RefObject } from 'react'
import type { TimelinePeriod } from '../../data/timelineData'
import * as styles from './TimelineCircle.module.scss'

export function TimelineCircle({
  totalDots,
  activeIndex,
  categoryRef,
  circleRef,
  dotContainersRef,
  initializeTimeline,
  handleDotClick,
  period
}: {
  totalDots: number
  activeIndex: number
  categoryRef?: RefObject<HTMLDivElement | null>
  circleRef: RefObject<HTMLDivElement | null>
  dotContainersRef: RefObject<HTMLDivElement[]>
  initializeTimeline: (refs: {
    circle: HTMLDivElement | null
    dots: HTMLDivElement[]
  }) => (() => void) | undefined
  handleDotClick: (index: number) => void
  period: TimelinePeriod
}) {
  useEffect(() => {
    return initializeTimeline({
      circle: circleRef.current,
      dots: dotContainersRef.current
    })
  }, [totalDots, circleRef, dotContainersRef])

  return (
    <div ref={circleRef} className={styles.circle}>
      {Array.from({ length: totalDots }, (_, index) => (
        <div
          key={index}
          className={`${styles.circle__wrapper} `}
          ref={(el) => {
            if (el) dotContainersRef.current[index] = el
          }}
        >
          <div
            className={`${styles.circle__dot} ${index === activeIndex ? styles.circle__dotActive : ''}`}
            onClick={() => handleDotClick(index)}
          >
            {index + 1}
          </div>
          {index === activeIndex && (
            <p ref={categoryRef} className={styles.circle__category}>
              {period.category}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
