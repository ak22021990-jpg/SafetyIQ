// src/components/game/AttackWave.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const ATTACK_DELAY = 900 // ms between each vector animation

export default function AttackWave({ vectors, allocations, onComplete }) {
  const shouldReduce   = useReducedMotion()
  const [revealed, setRevealed] = useState([]) // indices revealed so far

  useEffect(() => {
    let i = 0
    const tick = () => {
      if (i >= vectors.length) {
        setTimeout(() => onComplete?.(), 600)
        return
      }
      setRevealed(prev => [...prev, i])
      i++
      setTimeout(tick, ATTACK_DELAY)
    }
    const t = setTimeout(tick, 300)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-3">
      {vectors.map((vector, idx) => {
        const isRevealed = revealed.includes(idx)
        const allocation = allocations[vector.id] || 0
        const isBlocked  = allocation >= vector.breachThreshold

        return (
          <div key={vector.id} style={{ minHeight: '72px' }}>
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    display:      'flex',
                    alignItems:   'center',
                    gap:          '12px',
                    padding:      '12px 14px',
                    background:   isBlocked ? 'rgba(0,200,150,0.06)' : 'rgba(232,25,44,0.06)',
                    border:       `1px solid ${isBlocked ? 'rgba(0,200,150,0.25)' : 'rgba(232,25,44,0.25)'}`,
                    borderLeft:   `3px solid ${isBlocked ? '#00C896' : '#E8192C'}`,
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{vector.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-mono font-medium text-text-primary" style={{ fontSize: '12px' }}>
                        {vector.name}
                      </p>
                      <span
                        className="font-mono font-bold uppercase"
                        style={{
                          fontSize: '10px',
                          letterSpacing: '1.5px',
                          color: isBlocked ? '#00C896' : '#E8192C',
                        }}
                      >
                        {isBlocked ? '🛡 BLOCKED' : '⚠ BREACHED'}
                      </span>
                    </div>
                    <p className="font-mono text-text-muted" style={{ fontSize: '10px', lineHeight: '1.4' }}>
                      {isBlocked
                        ? `Budget: $${(allocation / 1_000_000).toFixed(1)}M — Threshold met`
                        : vector.damageIfBreached}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Placeholder before reveal */}
            {!isRevealed && (
              <div
                style={{
                  height: '72px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '6px',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
