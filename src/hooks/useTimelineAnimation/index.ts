import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { TimelineRefs, TimelineAnimationConfig } from './types'
import { calculateDotPosition, createTimelineUtils } from './utils'

gsap.registerPlugin(MotionPathPlugin)

export const useContentAnimation = (
  activeIndex: number,
  animationDuration: number,
  categoryRef: React.RefObject<HTMLParagraphElement | null>,
  sliderRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (activeIndex === 0 && !categoryRef.current && !sliderRef.current) {
      return
    }

    const elements = []
    if (categoryRef.current) elements.push(categoryRef.current)
    if (sliderRef.current) elements.push(sliderRef.current)

    if (elements.length > 0) {
      gsap.set(elements, { opacity: 0 })

      gsap.to(elements, {
        opacity: 1,
        duration: animationDuration,
        delay: 0.8,
        ease: 'power2.out'
      })
    }
  }, [activeIndex, animationDuration, categoryRef, sliderRef])
}

export const useTimelineAnimation = ({
  totalDots,
  radius,
  duration,
  angleOffset,
  activeIndex,
  onActiveIndexChange
}: TimelineAnimationConfig & {
  activeIndex: number
  onActiveIndexChange: (index: number) => void
}) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const trackerRef = useRef<{ item: number }>({ item: 0 })

  const { itemStep, wrapProgress, snap, wrapTracker } = createTimelineUtils(totalDots)

  const initializeTimeline = (refs: TimelineRefs) => {
    const { circle, dots } = refs

    if (!circle) return

    dots.forEach((dot, index) => {
      const { x, y } = calculateDotPosition(index, totalDots, radius, angleOffset)
      gsap.set(dot, {
        x,
        y,
        xPercent: -50,
        yPercent: -50
      })
    })

    const tl = gsap.timeline({ paused: true })

    tl.to(circle, {
      rotation: 360,
      transformOrigin: 'center',
      duration,
      ease: 'none'
    })

    tl.to(
      dots,
      {
        rotation: '-=360',
        transformOrigin: 'center center',
        duration,
        ease: 'none'
      },
      0
    )

    tl.to(
      trackerRef.current,
      {
        item: totalDots,
        duration,
        ease: 'none',
        modifiers: {
          item: (value) => wrapTracker(totalDots - Math.round(value))
        }
      },
      0
    )

    timelineRef.current = tl

    return () => {
      tl.kill()
    }
  }

  const moveWheel = (amount: number) => {
    if (!timelineRef.current) return

    const tl = timelineRef.current
    const progress = tl.progress()
    tl.progress(wrapProgress(snap(tl.progress() + amount)))
    const next = trackerRef.current.item
    tl.progress(progress)

    onActiveIndexChange(next)

    gsap.to(tl, {
      progress: snap(tl.progress() + amount),
      duration: duration * Math.abs(amount),
      modifiers: {
        progress: wrapProgress
      }
    })
  }

  const handleDotClick = (index: number) => {
    const current = activeIndex
    const diff = index - current
    const shortestPath =
      Math.abs(diff) <= totalDots / 2 ? diff : diff > 0 ? diff - totalDots : diff + totalDots
    moveWheel(-shortestPath / totalDots)
  }

  const handleRotate = (direction: 'clockwise' | 'counterclockwise') => {
    moveWheel(direction === 'clockwise' ? itemStep : -itemStep)
  }

  return {
    initializeTimeline,
    handleDotClick,
    handleRotate
  }
}

export * from './types'
