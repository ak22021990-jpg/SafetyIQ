// src/components/game/ScoreReveal.jsx
// Score count-up → "Well played." → badge showcase → onComplete
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import useCountUp from '../../hooks/useCountUp'
import Badge from '../ui/Badge'
import { getBadgesByIds } from '../../utils/badgeEngine'

export default function ScoreReveal({ score, maxScore, game, accentColor, earnedBadgeIds = [], onComplete }) {
  const shouldReduce = useReducedMotion()
  const displayScore = useCountUp(score, 1500, 300)

  const [showLine,   setShowLine]   = useState(false)
  const [showBadges, setShowBadges] = useState(false)

  const badges = getBadgesByIds(earnedBadgeIds)

  useEffect(() => {
    // count finishes at ~1.8s → show "Well played." → badges → onComplete
    const t1 = setTimeout(() => setShowLine(true),   1900)
    const t2 = setTimeout(() => setShowBadges(true), 2300)
    const t3 = setTimeout(() => onComplete?.(),       shouldReduce ? 1000 : 4500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete, shouldReduce])

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center w-full"
      style={{ padding: '40px 24px' }}
    >
      {/* Game label */}
      <p
        className="font-mono uppercase mb-2"
        style={{ fontSize: '9px', letterSpacing: '3px', color: accentColor }}
      >
        Game Complete
      </p>

      {/* Score count-up */}
      <p
        className="font-display font-semibold"
        style={{ fontSize: '100px', lineHeight: '0.85', color: accentColor, marginBottom: '8px' }}
      >
        {displayScore}
      </p>
      <p className="font-mono text-text-muted mb-6" style={{ fontSize: '10px' }}>
        of {maxScore} possible
      </p>

      {/* "Well played." */}
      <AnimatePresence>
        {showLine && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display font-semibold text-text-primary"
            style={{ fontSize: '28px', marginBottom: '28px' }}
          >
            Well played.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Earned badges — spring in at 80ms stagger */}
      <AnimatePresence>
        {showBadges && badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <p
              className="font-mono uppercase text-text-muted"
              style={{ fontSize: '8px', letterSpacing: '2px' }}
            >
              Badge{badges.length !== 1 ? 's' : ''} Earned
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              {badges.map((badge, idx) => (
                <motion.div
                  key={badge.id}
                  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring', stiffness: 400, damping: 20,
                    delay: shouldReduce ? 0 : idx * 0.08,
                  }}
                >
                  <Badge badge={badge} size={48} animate={false} showLabel />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
