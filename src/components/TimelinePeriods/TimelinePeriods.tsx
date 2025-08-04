import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import * as styles from './TimelinePeriods.module.scss'

export interface TimelinePeriodsProps {
  startYear: number
  endYear: number
}

export function TimelinePeriods({ startYear, endYear }: TimelinePeriodsProps) {
  const startYearRef = useRef<HTMLHeadingElement>(null)
  const endYearRef = useRef<HTMLHeadingElement>(null)
  const prevStartYear = useRef(startYear)
  const prevEndYear = useRef(endYear)

  const animateYearChange = (
    elementRef: React.RefObject<HTMLHeadingElement | null>,
    newYear: number,
    prevYearRef: React.MutableRefObject<number>
  ) => {
    if (elementRef.current && newYear !== prevYearRef.current) {
      gsap.fromTo(
        elementRef.current,
        { innerText: prevYearRef.current },
        {
          innerText: newYear,
          duration: 1,
          ease: 'power2.out',
          snap: { innerText: 1 }
        }
      )
      prevYearRef.current = newYear
    }
  }

  useEffect(() => {
    animateYearChange(startYearRef, startYear, prevStartYear)
  }, [startYear])

  useEffect(() => {
    animateYearChange(endYearRef, endYear, prevEndYear)
  }, [endYear])

  return (
    <div className={styles.periods}>
      <h2 ref={startYearRef} className={`${styles.periods__year} ${styles.periods__yearStart}`}>
        {startYear}
      </h2>
      <h2 ref={endYearRef} className={`${styles.periods__year} ${styles.periods__yearEnd}`}>
        {endYear}
      </h2>
    </div>
  )
}
