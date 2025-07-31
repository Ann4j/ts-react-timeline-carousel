import { useEffect, useRef } from 'react'
import { useTimelineAnimation } from '../../hooks/useTimelineAnimation'
import * as styles from './TimelineCircle.module.scss'

const circleRadius = 265
const animationDuration = 2

export interface TimelineCircleProps {
  totalDots?: number
}

export function TimelineCircle({ totalDots = 6 }: TimelineCircleProps) {
  const circleRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])
  const angleOffset = -(Math.PI * 2) / totalDots

  const { activeIndex, initializeTimeline, handleDotClick, handleRotate } = useTimelineAnimation({
    totalDots,
    radius: circleRadius,
    duration: animationDuration,
    angleOffset: angleOffset
  })

  useEffect(() => {
    return initializeTimeline({
      circle: circleRef.current,
      dots: dotsRef.current
    })
  }, [totalDots])

  return (
    <div>
      <div className={styles.circle__controls}>
        <button
          onClick={() => handleRotate('counterclockwise')}
          className={styles.circle__rotateButton}
        ></button>
        <button
          onClick={() => handleRotate('clockwise')}
          className={styles.circle__rotateButton}
        ></button>
      </div>
      <div ref={circleRef} className={styles.circle}>
        {Array.from({ length: totalDots }, (_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) dotsRef.current[index] = el
            }}
            className={`${styles.circle__dot} ${index === activeIndex ? styles.circle__dotActive : ''}`}
            onClick={() => handleDotClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
