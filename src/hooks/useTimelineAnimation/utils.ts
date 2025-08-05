export function calculateDotPosition({
  index,
  totalDots,
  radius
}: {
  index: number
  totalDots: number
  radius: number
}) {
  const angle = (index / totalDots) * Math.PI * 2 + -(Math.PI * 2) / totalDots
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  }
}

export const createTimelineUtils = (totalDots: number) => {
  const itemStep = 1 / totalDots

  const wrapProgress = (progress: number) => {
    return ((progress % 1) + 1) % 1
  }

  const snap = (progress: number) => {
    return Math.round(progress / itemStep) * itemStep
  }

  const wrapTracker = (item: number) => {
    return ((item % totalDots) + totalDots) % totalDots
  }

  return { itemStep, wrapProgress, snap, wrapTracker }
}
