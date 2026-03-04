// src/utils/motionVariants.js

export const fadeUp = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0 },
  transition: { duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }
}

export const scaleIn = {
  initial:  { opacity: 0, scale: 0.95 },
  animate:  { opacity: 1, scale: 1.00 },
  exit:     { opacity: 0, scale: 0.95 },
  transition: { type: 'spring', stiffness: 200, damping: 25 }
}

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 }
  }
}

export const staggerItem = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 30 }
}

export const springBadge = {
  initial:  { opacity: 0, scale: 0 },
  animate:  { opacity: 1, scale: 1 },
  transition: { type: 'spring', stiffness: 400, damping: 20, delay: 0.4 }
}

export const leaderboardItem = {
  layout: true,
  transition: {
    type: 'spring', stiffness: 300, damping: 35
  }
}
