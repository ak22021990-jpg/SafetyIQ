// src/components/game/DamageReport.jsx
import { motion, useReducedMotion } from 'framer-motion'
import useCountUp from '../../hooks/useCountUp'

export default function DamageReport({ vectors, allocations, score }) {
  const shouldReduce = useReducedMotion()

  const results  = vectors.map(v => ({
    ...v,
    allocation: allocations[v.id] || 0,
    blocked:    (allocations[v.id] || 0) >= v.breachThreshold,
  }))

  const blockedCount  = results.filter(r => r.blocked).length
  const breachedCount = results.filter(r => !r.blocked).length
  const displayScore  = useCountUp(score, 1500, 200)

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Score header */}
      <div className="text-center mb-6">
        <p className="font-mono uppercase font-bold text-text-secondary mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>
          Threat Surface Score
        </p>
        <p className="font-display font-bold text-gold" style={{ fontSize: '72px', lineHeight: '0.9' }}>
          {displayScore}
        </p>
        <p className="font-mono text-text-muted mt-2" style={{ fontSize: '13px' }}>
          {blockedCount} of {vectors.length} threats blocked
        </p>
      </div>

      {/* Summary chips */}
      <div className="flex gap-3 justify-center mb-6">
        <div
          style={{
            padding: '10px 18px',
            background: 'rgba(0,200,150,0.08)',
            border: '1px solid rgba(0,200,150,0.25)',
            borderRadius: '6px',
          }}
        >
          <p className="font-mono font-bold text-center" style={{ fontSize: '13px', color: '#00C896' }}>
            🛡 {blockedCount} Blocked
          </p>
        </div>
        {breachedCount > 0 && (
          <div
            style={{
              padding: '10px 18px',
              background: 'rgba(232,25,44,0.07)',
              border: '1px solid rgba(232,25,44,0.25)',
              borderRadius: '6px',
            }}
          >
            <p className="font-mono font-bold text-center" style={{ fontSize: '13px', color: '#E8192C' }}>
              ⚠ {breachedCount} Breached
            </p>
          </div>
        )}
      </div>

      {/* Detailed breakdown */}
      <div className="flex flex-col gap-2">
        {results.map(r => (
          <div
            key={r.id}
            style={{
              display:    'flex',
              alignItems: 'flex-start',
              gap:        '12px',
              padding:    '12px 14px',
              background: r.blocked ? 'rgba(0,200,150,0.04)' : 'rgba(232,25,44,0.04)',
              border:     `1px solid ${r.blocked ? 'rgba(0,200,150,0.18)' : 'rgba(232,25,44,0.18)'}`,
              borderRadius: '8px',
            }}
          >
            <span style={{ fontSize: '18px', marginTop: '2px' }}>{r.icon}</span>
            <div style={{ flex: 1 }}>
              <div className="flex items-center justify-between">
                <p className="font-mono font-semibold text-text-primary" style={{ fontSize: '13px' }}>
                  {r.name}
                </p>
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: '13px', color: r.blocked ? '#00C896' : '#E8192C' }}
                >
                  {r.blocked ? '+8 pts' : '0 pts'}
                </span>
              </div>
              {!r.blocked && (
                <p className="font-mono text-text-muted mt-1" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  {r.damageAmount} · {r.damageBusinessImpact.split(' · ')[0]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
