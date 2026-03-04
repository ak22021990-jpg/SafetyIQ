// src/components/ui/Badge.jsx
// Hexagon badge — uses emoji icon + category colour (PNG images optional)
import { motion, useReducedMotion } from 'framer-motion'
import { springBadge } from '../../utils/motionVariants'

// CSS clip-path hexagon
const HEX_CLIP = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'

export default function Badge({ badge, size = 48, animate = false, showLabel = false }) {
  const shouldReduce = useReducedMotion()

  if (!badge) return null

  const hexEl = (
    <div
      title={badge.name}
      style={{
        width:      size,
        height:     size,
        clipPath:   HEX_CLIP,
        background: badge.color,
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:   size * 0.4,
        userSelect: 'none',
        flexShrink: 0,
      }}
      aria-label={`${badge.name} badge`}
    >
      {badge.icon}
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-1">
      {animate && !shouldReduce ? (
        <motion.div
          variants={springBadge}
          initial="hidden"
          animate="visible"
        >
          {hexEl}
        </motion.div>
      ) : hexEl}

      {showLabel && (
        <div className="text-center">
          <p className="font-mono font-bold text-text-primary" style={{ fontSize: '9px', letterSpacing: '1px' }}>
            {badge.name}
          </p>
          <p className="font-mono text-text-muted" style={{ fontSize: '8px', lineHeight: '1.4', maxWidth: '72px' }}>
            {badge.framing}
          </p>
        </div>
      )}
    </div>
  )
}
