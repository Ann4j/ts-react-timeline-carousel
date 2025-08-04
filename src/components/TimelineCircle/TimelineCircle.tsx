import { useEffect, useRef } from 'react'
import { useTimelineAnimation } from '../../hooks/useTimelineAnimation'
import { getCurrentPeriod } from '../../data/timelineData'
import * as styles from './TimelineCircle.module.scss'

export interface TimelineCircleProps {
  totalDots?: number
  onActiveIndexChange?: (index: number) => void
  onRotate?: (handleRotate: (direction: 'clockwise' | 'counterclockwise') => void) => void
  categoryRef?: React.RefObject<HTMLParagraphElement | null>
}

export function TimelineCircle({
  totalDots = 6,
  onActiveIndexChange,
  onRotate,
  categoryRef
}: TimelineCircleProps) {
  const circleRef = useRef<HTMLDivElement>(null)
  const dotContainersRef = useRef<HTMLDivElement[]>([])
  const internalCategoryRef = useRef<HTMLParagraphElement>(null)
  const finalCategoryRef = categoryRef || internalCategoryRef
  const angleOffset = -(Math.PI * 2) / totalDots

  const { activeIndex, initializeTimeline, handleDotClick, handleRotate } = useTimelineAnimation({
    totalDots,
    radius: 265,
    duration: 3,
    angleOffset: angleOffset
  })

  const currentPeriod = getCurrentPeriod(activeIndex)

  useEffect(() => {
    return initializeTimeline({
      circle: circleRef.current,
      dots: dotContainersRef.current
    })
  }, [totalDots])

  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(activeIndex)
    }
  }, [activeIndex, onActiveIndexChange])

  useEffect(() => {
    if (onRotate) {
      onRotate(handleRotate)
    }
  }, [onRotate, handleRotate])

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
            <p ref={finalCategoryRef} className={styles.circle__category}>
              {currentPeriod.category}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
