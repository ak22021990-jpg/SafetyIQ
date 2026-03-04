// src/screens/GameEnd.jsx
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import StatsInfomercial from '../components/game/StatsInfomercial'
import { useSession } from '../context/SessionContext'
import { SUTHERLAND_VOICE_STATEMENTS } from '../data/gameContent'
import useCountUp from '../hooks/useCountUp'
import { springBadge } from '../utils/motionVariants'
import { SCREENS } from '../App'

const GAME_META = {
  grayRoom: { name: 'The Gray Room',       accent: '#C9A96E', maxScore: 160 },
  drawLine: { name: 'Draw the Line',       accent: '#4A7FA5', maxScore: 50  },
  threat:   { name: 'Threat Surface',      accent: '#E8A830', maxScore: 48  },
  redTeam:  { name: 'Red Team Roulette',   accent: '#00C896', maxScore: 60  },
}

// Performance tier based on score %
function getTier(score, maxScore) {
  const pct = maxScore > 0 ? (score / maxScore) : 0
  if (pct >= 0.85) return { label: 'Elite',    color: '#C9A96E', icon: '⬡', description: 'Top-tier performance. You see what most miss.' }
  if (pct >= 0.60) return { label: 'Strong',   color: '#4A7FA5', icon: '◈', description: 'Solid instincts. A few edge cases slipped through.' }
  return               { label: 'Learning',  color: '#E8A830', icon: '◇', description: 'Every review builds sharper judgment.' }
}

// Score breakdown per game
function ScoreBreakdown({ game, scoreData }) {
  if (!scoreData) return null
  const { score } = scoreData

  const items = []

  if (game === 'grayRoom') {
    items.push({ label: 'Correct decisions (+15 each)', value: `+${scoreData.correctCount * 15 || '—'}` })
    if (scoreData.speedBonuses) items.push({ label: 'Speed bonuses (<30s)', value: `+${scoreData.speedBonuses * 5}` })
    if (scoreData.criticalPenalties) items.push({ label: 'Critical wrong answers', value: `-${scoreData.criticalPenalties * 5}`, negative: true })
  }
  if (game === 'drawLine') {
    items.push({ label: `Tests passed (${scoreData.passed}/${scoreData.total})`, value: `+${scoreData.passed * 10}` })
    if (scoreData.hintsUsed) items.push({ label: `Hints used (${scoreData.hintsUsed})`, value: `-${scoreData.hintsUsed * 5}`, negative: true })
  }
  if (game === 'threat') {
    items.push({ label: `Threats blocked (${scoreData.blocked}/${scoreData.total})`, value: `+${scoreData.blocked * 8}` })
  }
  if (game === 'redTeam') {
    items.push({ label: `Correct flags (${scoreData.correctFlags})`, value: `+${scoreData.correctFlags * 10}` })
    if (scoreData.missed)        items.push({ label: `Missed violations (${scoreData.missed})`, value: `-${scoreData.missed * 5}`, negative: true })
    if (scoreData.falsePositives) items.push({ label: `False positives (${scoreData.falsePositives})`, value: `-${scoreData.falsePositives * 5}`, negative: true })
  }

  if (items.length === 0) return null

  return (
    <div
      style={{
        background:   'rgba(255,255,255,0.03)',
        border:       '1px solid rgba(255,255,255,0.07)',
        borderRadius: '6px',
        padding:      '14px',
        marginBottom: '20px',
        width:        '100%',
        maxWidth:     '320px',
      }}
    >
      <p className="font-mono uppercase text-text-muted mb-3" style={{ fontSize: '9px', letterSpacing: '2px' }}>
        Score Breakdown
      </p>
      <div className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between font-mono" style={{ fontSize: '11px' }}>
            <span className="text-text-secondary">{item.label}</span>
            <span style={{ color: item.negative ? '#E8192C' : '#E8EDF5' }}>{item.value}</span>
          </div>
        ))}
        <div
          className="flex justify-between font-mono font-bold"
          style={{
            fontSize: '13px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '8px',
            marginTop: '4px',
          }}
        >
          <span className="text-text-primary">Total</span>
          <span style={{ color: GAME_META[game]?.accent || '#C9A96E' }}>{score}</span>
        </div>
      </div>
    </div>
  )
}

export default function GameEnd({ navigate, game }) {
  const { scores }      = useSession()
  const shouldReduce    = useReducedMotion()
  const [showStats, setShowStats] = useState(false)
  const [statsComplete, setStatsComplete] = useState(false)

  const scoreData  = scores[game]
  const score      = scoreData?.score ?? 0
  const meta       = GAME_META[game] || { name: 'Game', accent: '#C9A96E', maxScore: 100 }
  const tier       = getTier(score, meta.maxScore)
  const displayScore = useCountUp(score, 2000, 400)
  const suthLine   = SUTHERLAND_VOICE_STATEMENTS[game] || ''

  return (
    <ScreenWrapper>
      <SafeZoneWrapper>
        <div
          className="w-full h-full overflow-y-auto flex flex-col items-center"
          style={{ padding: '32px 20px', textAlign: 'center' }}
        >

          {!showStats ? (
            <motion.div
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center w-full"
            >
              {/* Game label */}
              <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                Game Complete
              </p>
              <h1
                className="font-heading font-extrabold text-text-primary mb-4"
                style={{ fontSize: '28px', lineHeight: '1.1' }}
              >
                {meta.name}
              </h1>

              {/* Score */}
              <p
                className="font-display font-semibold"
                style={{ fontSize: '80px', lineHeight: '0.85', color: meta.accent, marginBottom: '4px' }}
              >
                {displayScore}
              </p>
              <p className="font-mono text-text-muted mb-6" style={{ fontSize: '10px' }}>
                of {meta.maxScore} possible
              </p>

              {/* Tier badge */}
              <motion.div
                variants={springBadge}
                initial="hidden"
                animate="visible"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  padding:        '10px 20px',
                  background:     `${tier.color}14`,
                  border:         `1px solid ${tier.color}50`,
                  borderRadius:   '4px',
                  marginBottom:   '6px',
                }}
              >
                <span style={{ fontSize: '18px', color: tier.color }}>{tier.icon}</span>
                <span className="font-mono font-bold uppercase" style={{ fontSize: '12px', letterSpacing: '2px', color: tier.color }}>
                  {tier.label}
                </span>
              </motion.div>
              <p className="font-mono text-text-secondary mb-6" style={{ fontSize: '11px' }}>
                {tier.description}
              </p>

              {/* Score breakdown */}
              <ScoreBreakdown game={game} scoreData={scoreData} />

              {/* Sutherland insight */}
              {suthLine && (
                <div
                  style={{
                    padding:      '14px 16px',
                    background:   'rgba(201,169,110,0.06)',
                    border:       '1px solid rgba(201,169,110,0.18)',
                    borderRadius: '6px',
                    marginBottom: '24px',
                    maxWidth:     '380px',
                    width:        '100%',
                  }}
                >
                  <p className="font-mono text-text-secondary" style={{ fontSize: '10px', lineHeight: '1.65', fontStyle: 'italic' }}>
                    {suthLine}
                  </p>
                  <p className="font-mono text-text-muted mt-2" style={{ fontSize: '8px', letterSpacing: '2px' }}>
                    — SUTHERLAND GLOBAL SERVICES
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3 w-full" style={{ maxWidth: '320px' }}>
                <button
                  onClick={() => setShowStats(true)}
                  className="w-full font-mono uppercase tracking-widest transition-colors"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '12px',
                    background: 'transparent', color: meta.accent,
                    border: `1px solid ${meta.accent}`, borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Sutherland Stats →
                </button>
                <button
                  onClick={() => navigate(SCREENS.HOME)}
                  className="w-full font-mono uppercase tracking-widest transition-colors"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '12px',
                    background: meta.accent, color: '#07101C',
                    fontWeight: 700, border: 'none', borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Return to Hub →
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-mono uppercase text-text-muted mb-6" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                Sutherland Trust &amp; Safety · By the Numbers
              </p>

              <StatsInfomercial onComplete={() => setStatsComplete(true)} />

              {statsComplete && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => navigate(SCREENS.HOME)}
                  className="font-mono uppercase tracking-widest transition-colors mt-8"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '12px 32px',
                    background: meta.accent, color: '#07101C',
                    fontWeight: 700, border: 'none', borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Return to Hub →
                </motion.button>
              )}
            </motion.div>
          )}

        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
