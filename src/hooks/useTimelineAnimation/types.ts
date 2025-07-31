export interface TimelineRefs {
  circle: HTMLDivElement | null
  dots: HTMLDivElement[]
}

export interface TimelineState {
  activeIndex: number
  item: number
}

export interface TimelineAnimationConfig {
  totalDots: number
  radius: number
  duration: number
  angleOffset: number
}
