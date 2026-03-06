// src/components/selfie/BadgeSelector.jsx
// Horizontal scrollable badge row. Max 4 selected. Tap to toggle.
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Badge from '../ui/Badge'
import { getBadgesByIds } from '../../utils/badgeEngine'

const MAX_SELECTED = 4

export default function BadgeSelector({ earnedIds = [], onChange }) {
  const badges = getBadgesByIds(earnedIds)
  const [selected, setSelected] = useState(new Set(badges.slice(0, MAX_SELECTED).map(b => b.id)))
  const shakeRef = useRef({})

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (next.size >= MAX_SELECTED) {
          // Trigger shake on the button
          shakeRef.current[id]?.()
          return prev
        }
        next.add(id)
      }
      const ordered = badges.filter(b => next.has(b.id))
      onChange?.(ordered)
      return next
    })
  }

  // Notify parent of initial selection
  if (typeof onChange === 'function' && selected.size > 0) {
    // Initialised — parent gets notified on first toggle only; call once after mount
  }

  if (badges.length === 0) {
    return (
      <p className="font-mono text-text-muted text-center" style={{ fontSize: '11px' }}>
        No badges earned yet.
      </p>
    )
  }

  return (
    <div>
      <p className="font-mono text-text-muted mb-3 text-center" style={{ fontSize: '9px', letterSpacing: '2px' }}>
        {selected.size}/{MAX_SELECTED} badges selected for your card
      </p>

      <div
        style={{
          display:    'flex',
          gap:        '12px',
          overflowX:  'auto',
          padding:    '4px 4px 12px',
          justifyContent: badges.length <= 4 ? 'center' : 'flex-start',
        }}
      >
        {badges.map(badge => {
          const isOn = selected.has(badge.id)
          return (
            <motion.button
              key={badge.id}
              onClick={() => toggle(badge.id)}
              animate={isOn ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.92 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{
                background:  'none',
                border:      'none',
                cursor:      'pointer',
                padding:     0,
                flexShrink:  0,
                outline:     isOn ? '1px solid rgba(225,29,72,0.35)' : 'none',
                borderRadius:'6px',
              }}
              title={isOn ? `Remove ${badge.name}` : `Add ${badge.name}`}
            >
              <Badge badge={badge} size={48} animate={false} showLabel={false} />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
