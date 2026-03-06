// src/components/game/StatsInfomercial.jsx
// 8-stat grid layout: 4 rows × 2 columns — all stats visible at once with count-up animations
import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SUTHERLAND_STATS } from '../../data/gameContent'
import useCountUp from '../../hooks/useCountUp'

const COUNT_UP_MS = 1800

// Single stat card in the grid
function StatCard({ stat, index, shouldReduce }) {
  const numericVal = parseFloat(stat.value.replace(/[^0-9.]/g, '')) || 0
  const hasNumber  = !isNaN(numericVal) && numericVal > 0 && !stat.value.includes('[X]')
  const displayVal = useCountUp(hasNumber ? numericVal : 0, COUNT_UP_MS, index * 80)

  const displayText = stat.value.includes('[X]')
    ? stat.value
    : hasNumber
      ? `${displayVal}${stat.suffix}`
      : `${stat.value}${stat.suffix}`

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{
        background: 'rgba(225,29,72,0.04)',
        border: '1px solid rgba(225,29,72,0.14)',
        borderRadius: '6px',
        padding: '14px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '4px',
      }}
    >
      <p
        className="font-display font-semibold text-gold"
        style={{ fontSize: stat.isHero ? '36px' : '30px', lineHeight: '1', letterSpacing: '-0.5px' }}
      >
        {displayText}
      </p>
      <p
        className="font-mono uppercase text-text-muted"
        style={{ fontSize: '9px', letterSpacing: '1.5px', lineHeight: '1.3' }}
      >
        {stat.label}
      </p>
    </motion.div>
  )
}

export default function StatsInfomercial({ onComplete }) {
  const shouldReduce = useReducedMotion()

  // Signal complete after count-ups finish so parent can show CTA
  useEffect(() => {
    const delay = shouldReduce ? 500 : COUNT_UP_MS + SUTHERLAND_STATS.length * 80 + 400
    const t = setTimeout(() => onComplete?.(), delay)
    return () => clearTimeout(t)
  }, [onComplete, shouldReduce])

  return (
    <div style={{ width: '100%' }}>
      {/* 4-row × 2-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto',
        }}
      >
        {SUTHERLAND_STATS.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} shouldReduce={shouldReduce} />
        ))}
      </div>

      {/* Attribution */}
      <p
        className="font-mono uppercase text-text-muted mt-6 text-center"
        style={{ fontSize: '8px', letterSpacing: '3px' }}
      >
        Sutherland Global Services · Trust &amp; Safety Practice
      </p>
    </div>
  )
}
