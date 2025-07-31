export const calculateDotPosition = (
  index: number,
  totalDots: number,
  radius: number,
  angleOffset: number
) => {
  const angle = (index / totalDots) * Math.PI * 2 + angleOffset
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  }
}

export const createTimelineUtils = (totalDots: number) => {
  const itemStep = 1 / totalDots

  const wrapProgress = (progress: number) => {
    while (progress < 0) progress += 1
    while (progress >= 1) progress -= 1
    return progress
  }

  const snap = (progress: number) => {
    return Math.round(progress / itemStep) * itemStep
  }

  const wrapTracker = (item: number) => {
    while (item < 0) item += totalDots
    while (item >= totalDots) item -= totalDots
    return item
  }

  return { itemStep, wrapProgress, snap, wrapTracker }
}
