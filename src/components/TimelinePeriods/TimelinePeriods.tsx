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

  useEffect(() => {
    if (startYearRef.current && startYear !== prevStartYear.current) {
      gsap.fromTo(
        startYearRef.current,
        { innerText: prevStartYear.current },
        {
          innerText: startYear,
          duration: 1,
          ease: 'power2.out',
          snap: { innerText: 1 }
        }
      )
      prevStartYear.current = startYear
    }
  }, [startYear])

  useEffect(() => {
    if (endYearRef.current && endYear !== prevEndYear.current) {
      gsap.fromTo(
        endYearRef.current,
        { innerText: prevEndYear.current },
        {
          innerText: endYear,
          duration: 1,
          ease: 'power2.out',
          snap: { innerText: 1 }
        }
      )
      prevEndYear.current = endYear
    }
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
