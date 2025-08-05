export interface TimelineRefs {
  circle: HTMLDivElement | null
  dots: HTMLDivElement[]
}

export interface TimelineState {
  activeIndex: number
  item: number
}

export interface CircleAnimationConfig {
  totalDots: number
  radius: number
  duration: number
  activeIndex: number
  onActiveIndexChange: (index: number) => void
}

export interface ContentAnimationConfig {
  animationDuration: number
  categoryRef: React.RefObject<HTMLDivElement | null>
  sliderRef: React.RefObject<HTMLDivElement | null>
}
