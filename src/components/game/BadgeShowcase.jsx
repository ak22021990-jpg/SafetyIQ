// src/components/game/BadgeShowcase.jsx
// Staggered row of earned badges — 80ms spring stagger between each
// Lottie slot: badge-earned.json plays when showcase mounts (Phase 16)
import { motion, useReducedMotion } from 'framer-motion'
import Badge from '../ui/Badge'
import { getBadgesByIds } from '../../utils/badgeEngine'

export default function BadgeShowcase({ earnedIds = [], size = 48, showLabels = false }) {
  const shouldReduce = useReducedMotion()
  const badges       = getBadgesByIds(earnedIds)

  if (badges.length === 0) return null

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Lottie slot — Phase 16: replace null with <Lottie animationData={badgeEarned} loop={false} style={{ width: 80 }} /> */}
      {null}

      <div className="flex flex-wrap gap-3 justify-center">
        {badges.map((badge, idx) => (
          <motion.div
            key={badge.id}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type:      'spring',
              stiffness: 400,
              damping:   20,
              delay:     shouldReduce ? 0 : idx * 0.08,
            }}
          >
            <Badge badge={badge} size={size} animate={false} showLabel={showLabels} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
