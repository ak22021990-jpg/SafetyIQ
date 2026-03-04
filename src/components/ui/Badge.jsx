// src/components/ui/Badge.jsx
// Hexagon badge — loads PNG from public/badges/{imageFile}, falls back to emoji icon
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { springBadge } from '../../utils/motionVariants'

// CSS clip-path hexagon
const HEX_CLIP = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'

export default function Badge({ badge, size = 48, animate = false, showLabel = false }) {
  const shouldReduce  = useReducedMotion()
  const [imgFailed, setImgFailed] = useState(false)

  if (!badge) return null

  // PNG path: served from public/badges/ — works locally and on GitHub Pages
  const imgSrc  = badge.imageFile
    ? `${import.meta.env.BASE_URL}badges/${badge.imageFile}`
    : null
  const showImg = imgSrc && !imgFailed

  const inner = showImg ? (
    <img
      src={imgSrc}
      alt={badge.name}
      onError={() => setImgFailed(true)}
      style={{
        width:     '70%',
        height:    '70%',
        objectFit: 'contain',
        display:   'block',
      }}
    />
  ) : (
    <span style={{ fontSize: size * 0.4, lineHeight: 1 }}>{badge.icon}</span>
  )

  const hexEl = (
    <div
      title={badge.name}
      style={{
        width:          size,
        height:         size,
        clipPath:       HEX_CLIP,
        background:     badge.color,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        userSelect:     'none',
        flexShrink:     0,
      }}
      aria-label={`${badge.name} badge`}
    >
      {inner}
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-1">
      {animate && !shouldReduce ? (
        <motion.div variants={springBadge} initial="hidden" animate="visible">
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
