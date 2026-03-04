// src/screens/ThreatSurface.jsx
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import BudgetAllocator from '../components/game/BudgetAllocator'
import AttackWave from '../components/game/AttackWave'
import DamageReport from '../components/game/DamageReport'
import { THREAT_VECTORS } from '../data/gameContent'
import { useSession } from '../context/SessionContext'
import { SCREENS } from '../App'

const ACCENT       = '#E8A830'
const POINTS_PER_BLOCK = 8

export default function ThreatSurface({ navigate }) {
  const { updateScore } = useSession()
  const shouldReduce    = useReducedMotion()

  // phase: 'allocate' | 'attack' | 'report'
  const [phase, setPhase] = useState('allocate')

  // Allocations: vectorId → dollar amount (start all at 0)
  const [allocations, setAllocations] = useState(
    Object.fromEntries(THREAT_VECTORS.map(v => [v.id, 0]))
  )

  const handleAllocate = (vectorId, val) => {
    setAllocations(prev => ({ ...prev, [vectorId]: val }))
  }

  const handleLaunchAttack = () => setPhase('attack')

  const handleAttackComplete = () => setPhase('report')

  const results      = THREAT_VECTORS.map(v => ({
    ...v,
    blocked: (allocations[v.id] || 0) >= v.breachThreshold,
  }))
  const blockedCount = results.filter(r => r.blocked).length
  const score        = blockedCount * POINTS_PER_BLOCK

  const handleFinish = () => {
    updateScore('threat', {
      score,
      blocked: blockedCount,
      total:   THREAT_VECTORS.length,
    })
    navigate(SCREENS.GAME_END, 'threat')
  }

  const totalSpent = Object.values(allocations).reduce((a, b) => a + b, 0)

  return (
    <ScreenWrapper>
      <Topbar gameName="Threat Surface" accentColor={ACCENT} />
      <SafeZoneWrapper hasTopbar>
        <div className="w-full h-full overflow-y-auto" style={{ padding: '24px 20px' }}>

          <AnimatePresence mode="wait">

            {/* ── ALLOCATE PHASE ──────────────────────────────────────── */}
            {phase === 'allocate' && (
              <motion.div
                key="allocate"
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-5">
                  <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                    Budget Allocation
                  </p>
                  <h2 className="font-heading font-extrabold text-text-primary mb-2" style={{ fontSize: '22px' }}>
                    Defend the Platform
                  </h2>
                  <p className="font-mono text-text-secondary" style={{ fontSize: '11px', lineHeight: '1.6' }}>
                    You have <strong style={{ color: ACCENT }}>$10M</strong> in trust & safety budget. Allocate it across
                    6 threat vectors. Each vector has a minimum threshold to block the attack — underfund it and it
                    breaks through.
                  </p>
                </div>

                <BudgetAllocator
                  vectors={THREAT_VECTORS}
                  allocations={allocations}
                  onAllocate={handleAllocate}
                  disabled={false}
                />

                <div style={{ marginTop: '24px' }}>
                  <button
                    onClick={handleLaunchAttack}
                    disabled={totalSpent === 0}
                    className="w-full font-mono uppercase tracking-widest transition-colors"
                    style={{
                      fontSize:   '11px',
                      letterSpacing: '2px',
                      padding:    '16px',
                      background: totalSpent === 0 ? 'rgba(232,168,48,0.20)' : ACCENT,
                      color:      totalSpent === 0 ? 'rgba(7,16,28,0.5)' : '#07101C',
                      fontWeight: 700,
                      border:     'none',
                      borderRadius: '4px',
                      cursor:     totalSpent === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Launch Attack Simulation →
                  </button>
                  {totalSpent === 0 && (
                    <p className="font-mono text-text-muted text-center mt-2" style={{ fontSize: '10px' }}>
                      Allocate at least some budget to continue
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── ATTACK PHASE ────────────────────────────────────────── */}
            {phase === 'attack' && (
              <motion.div
                key="attack"
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-5">
                  <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                    Attack Wave Incoming
                  </p>
                  <h2 className="font-heading font-extrabold text-text-primary" style={{ fontSize: '22px' }}>
                    Defences Activating...
                  </h2>
                </div>

                <AttackWave
                  vectors={THREAT_VECTORS}
                  allocations={allocations}
                  onComplete={handleAttackComplete}
                />
              </motion.div>
            )}

            {/* ── REPORT PHASE ────────────────────────────────────────── */}
            {phase === 'report' && (
              <motion.div
                key="report"
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DamageReport
                  vectors={THREAT_VECTORS}
                  allocations={allocations}
                  score={score}
                />

                <button
                  onClick={handleFinish}
                  className="w-full font-mono uppercase tracking-widest transition-colors mt-6"
                  style={{
                    fontSize:   '11px',
                    letterSpacing: '2px',
                    padding:    '14px',
                    background: ACCENT,
                    color:      '#07101C',
                    fontWeight: 700,
                    border:     'none',
                    borderRadius: '4px',
                    cursor:     'pointer',
                  }}
                >
                  Continue →
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
