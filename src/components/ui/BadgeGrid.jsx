// src/components/ui/BadgeGrid.jsx
import { motion, useReducedMotion } from 'framer-motion'
import Badge from './Badge'
import { getBadgesByIds } from '../../utils/badgeEngine'
import { staggerContainer, staggerItem } from '../../utils/motionVariants'

export default function BadgeGrid({ earnedIds = [], size = 48, showLabels = false, animate = true }) {
  const shouldReduce = useReducedMotion()
  const badges = getBadgesByIds(earnedIds)

  if (badges.length === 0) {
    return (
      <p className="font-mono text-text-muted text-center" style={{ fontSize: '11px' }}>
        No badges earned yet.
      </p>
    )
  }

  return (
    <motion.div
      variants={animate && !shouldReduce ? staggerContainer : undefined}
      initial={animate && !shouldReduce ? 'hidden' : undefined}
      animate={animate && !shouldReduce ? 'visible' : undefined}
      style={{
        display:             'flex',
        flexWrap:            'wrap',
        gap:                 showLabels ? '16px' : '10px',
        justifyContent:      'center',
      }}
    >
      {badges.map(badge => (
        <motion.div
          key={badge.id}
          variants={animate && !shouldReduce ? staggerItem : undefined}
        >
          <Badge badge={badge} size={size} animate={false} showLabel={showLabels} />
        </motion.div>
      ))}
    </motion.div>
  )
}
