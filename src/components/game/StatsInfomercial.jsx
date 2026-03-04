// src/components/game/StatsInfomercial.jsx
// 8-stat animated sequence: stat fades in → number counts up → context line reveals → 0.5s hold → next stat
// Total sequence ~40s (8 stats × ~5s each)
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SUTHERLAND_STATS, SUTHERLAND_VOICE_STATEMENTS } from '../../data/gameContent'
import useCountUp from '../../hooks/useCountUp'

const STAT_HOLD_MS    = 4500  // time on each stat before advancing
const COUNT_UP_MS     = 1800
const REVEAL_DELAY_MS = 400   // context line appears after number starts

// Single stat slide
function StatSlide({ stat, active, game }) {
  const shouldReduce = useReducedMotion()

  // Parse numeric value from stat
  const numericVal = parseFloat(stat.value.replace(/[^0-9.]/g, '')) || 0
  const hasNumber  = !isNaN(numericVal) && numericVal > 0 && !stat.value.includes('[X]')
  const displayVal = useCountUp(active && hasNumber ? numericVal : 0, COUNT_UP_MS, 200)

  const [showContext, setShowContext] = useState(false)
  useEffect(() => {
    if (!active) { setShowContext(false); return }
    const t = setTimeout(() => setShowContext(true), REVEAL_DELAY_MS + 400)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div className="flex flex-col items-center text-center" style={{ padding: '0 24px' }}>
      {/* Number */}
      <p
        className="font-display font-semibold text-gold"
        style={{ fontSize: stat.isHero ? '80px' : '60px', lineHeight: '0.9', marginBottom: '8px' }}
      >
        {stat.value.includes('[X]')
          ? stat.value
          : hasNumber
            ? `${displayVal}${stat.suffix}`
            : `${stat.value}${stat.suffix}`
        }
      </p>

      {/* Label */}
      <p
        className="font-mono uppercase text-text-muted"
        style={{ fontSize: '10px', letterSpacing: '3px', marginBottom: '16px' }}
      >
        {stat.label}
      </p>

      {/* Context line */}
      <AnimatePresence>
        {showContext && (
          <motion.p
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-text-secondary"
            style={{ fontSize: '11px', lineHeight: '1.65', maxWidth: '280px' }}
          >
            {SUTHERLAND_VOICE_STATEMENTS[game] || SUTHERLAND_VOICE_STATEMENTS.summary}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function StatsInfomercial({ onComplete, game }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shouldReduce = useReducedMotion()
  const timerRef     = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (currentIndex + 1 >= SUTHERLAND_STATS.length) {
        onComplete?.()
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, shouldReduce ? 1200 : STAT_HOLD_MS)
    return () => clearTimeout(timerRef.current)
  }, [currentIndex, onComplete, shouldReduce])

  const stat = SUTHERLAND_STATS[currentIndex]

  return (
    <div style={{ width: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Progress dots */}
      <div className="flex gap-1.5 mb-8">
        {SUTHERLAND_STATS.map((_, i) => (
          <div
            key={i}
            style={{
              width:  i === currentIndex ? '20px' : '8px',
              height: '3px',
              borderRadius: '100px',
              background: i < currentIndex ? 'rgba(201,169,110,0.50)' : i === currentIndex ? '#C9A96E' : 'rgba(255,255,255,0.12)',
              transition: shouldReduce ? 'none' : 'width 200ms ease, background 200ms',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35 }}
        >
          <StatSlide stat={stat} active={true} game={game} />
        </motion.div>
      </AnimatePresence>

      {/* Sutherland attribution */}
      <p
        className="font-mono uppercase text-text-muted mt-8"
        style={{ fontSize: '8px', letterSpacing: '3px' }}
      >
        Sutherland Global Services · Trust &amp; Safety Practice
      </p>
    </div>
  )
}
