// src/screens/GameEnd.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import ScoreReveal from '../components/game/ScoreReveal'
import StatsInfomercial from '../components/game/StatsInfomercial'
import { useSession } from '../context/SessionContext'
import { evaluateBadges } from '../utils/badgeEngine'
import { SCREENS } from '../constants/screens'

const GAME_META = {
  grayRoom: { name: 'The Gray Room',     accent: '#fd7183', maxScore: 100 },
  drawLine: { name: 'Draw the Line',     accent: '#4A7FA5', maxScore: 100 },
  threat:   { name: 'Threat Surface',    accent: '#c7468d', maxScore: 100 },
  redTeam:  { name: 'Red Team Roulette', accent: '#00C896', maxScore: 100 },
}

const GAME_SCREEN = {
  grayRoom: SCREENS.GRAY_ROOM,
  drawLine: SCREENS.DRAW_LINE,
  threat:   SCREENS.THREAT,
  redTeam:  SCREENS.RED_TEAM,
}

export default function GameEnd({ navigate, game }) {
  const { scores, player, badges: existingBadges, totalScore, gamesCompleted, sessionId, addBadge } = useSession()
  const shouldReduce = useReducedMotion()

  // phase: 'reveal' | 'stats'
  const [phase,         setPhase]         = useState('reveal')
  const [statsComplete, setStatsComplete] = useState(false)

  const meta      = GAME_META[game] || { name: 'Game', accent: '#E11D48', maxScore: 100 }
  const scoreData = scores[game]
  const score     = scoreData?.score ?? 0

  // Evaluate new badges once on mount (score already saved by game screen before navigate)
  const [newBadgeIds] = useState(() => {
    const sessionData = { player, scores, badges: existingBadges, totalScore, gamesCompleted, sessionId }
    const earned = evaluateBadges(sessionData)
    return earned.filter(id => !existingBadges.includes(id))
  })

  // Save new badges to session
  useEffect(() => {
    newBadgeIds.forEach(id => addBadge(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRevealComplete = () => setPhase('stats')

  const handleContinue = () => {
    if (gamesCompleted >= 4) navigate(SCREENS.SUMMARY)
    else navigate(SCREENS.HOME)
  }

  const handleReplay = () => navigate(GAME_SCREEN[game] || SCREENS.HOME)

  return (
    <ScreenWrapper>
      <SafeZoneWrapper>
        <div
          className="w-full h-full overflow-y-auto flex flex-col items-center"
          style={{ padding: '32px 20px 40px', textAlign: 'center' }}
        >
          <AnimatePresence mode="wait">

            {/* ── REVEAL PHASE — score count-up + badges ─────────────── */}
            {phase === 'reveal' && (
              <motion.div
                key="reveal"
                className="w-full flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1
                  className="font-heading font-extrabold text-text-primary mb-2"
                  style={{ fontSize: '22px', lineHeight: '1.1' }}
                >
                  {meta.name}
                </h1>

                <ScoreReveal
                  score={score}
                  maxScore={meta.maxScore}
                  game={game}
                  accentColor={meta.accent}
                  earnedBadgeIds={newBadgeIds}
                  onComplete={handleRevealComplete}
                />

                {/* Manual controls (visible immediately so user isn't stuck) */}
                <div
                  className="flex gap-3 w-full"
                  style={{ maxWidth: '320px', marginTop: '8px' }}
                >
                  <button
                    onClick={handleReplay}
                    className="flex-1 font-mono uppercase tracking-widest transition-colors"
                    style={{
                      fontSize: '10px', letterSpacing: '2px', padding: '11px',
                      background: 'transparent', color: meta.accent,
                      border: `1px solid ${meta.accent}`, borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    Play Again
                  </button>
                  <button
                    onClick={handleRevealComplete}
                    className="flex-1 font-mono uppercase tracking-widest transition-colors"
                    style={{
                      fontSize: '10px', letterSpacing: '2px', padding: '11px',
                      background: meta.accent, color: '#FFFFFF',
                      fontWeight: 700, border: 'none', borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    See Stats →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STATS PHASE — infomercial + continue ──────────────── */}
            {phase === 'stats' && (
              <motion.div
                key="stats"
                className="w-full flex flex-col items-center"
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p
                  className="font-mono uppercase text-text-muted mb-6"
                  style={{ fontSize: '9px', letterSpacing: '3px' }}
                >
                  Sutherland Trust &amp; Safety · By the Numbers
                </p>

                <StatsInfomercial
                  game={game}
                  onComplete={() => setStatsComplete(true)}
                />

                {/* Continue — appears after all stats counted */}
                <AnimatePresence>
                  {statsComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center gap-3 w-full mt-8"
                      style={{ maxWidth: '320px' }}
                    >
                      <button
                        onClick={handleContinue}
                        className="w-full font-mono uppercase tracking-widest transition-colors"
                        style={{
                          fontSize: '10px', letterSpacing: '2px', padding: '13px',
                          background: meta.accent, color: '#FFFFFF',
                          fontWeight: 700, border: 'none', borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        {gamesCompleted >= 4 ? 'See Final Summary →' : 'Return to Hub →'}
                      </button>
                      <button
                        onClick={() => navigate(SCREENS.SELFIE)}
                        className="w-full font-mono uppercase tracking-widest transition-colors"
                        style={{
                          fontSize: '10px', letterSpacing: '2px', padding: '11px',
                          background: 'transparent', color: meta.accent,
                          border: `1px solid ${meta.accent}`, borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        📸 Take Selfie
                      </button>
                      <button
                        onClick={handleReplay}
                        className="w-full font-mono uppercase tracking-widest transition-colors"
                        style={{
                          fontSize: '10px', letterSpacing: '2px', padding: '11px',
                          background: 'transparent', color: '#475569',
                          border: '1px solid #E2E8F0', borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        Play Again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
