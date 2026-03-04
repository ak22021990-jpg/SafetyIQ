// src/screens/RedTeamRoulette.jsx
import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import TimerRing from '../components/ui/TimerRing'
import OutputCard from '../components/game/OutputCard'
import { RED_TEAM_OUTPUTS } from '../data/gameContent'
import { useSession } from '../context/SessionContext'
import { useSound } from '../hooks/useSound'
import { getLeaderboard } from '../utils/storageEngine'
import { SCREENS } from '../App'

const ACCENT        = '#00C896'
const TIMER_SECONDS = 90
const CORRECT_PTS   = 10
const PENALTY_PTS   = 5

// Build session card set: both video cards + 4 random non-video cards
function buildCardSet() {
  const videos   = RED_TEAM_OUTPUTS.filter(c => c.type === 'video')
  const nonVideo = RED_TEAM_OUTPUTS.filter(c => c.type !== 'video')
  const shuffled = [...nonVideo].sort(() => Math.random() - 0.5)
  return [...shuffled.slice(0, 4), ...videos].sort(() => Math.random() - 0.5)
}

// Compact collapsible live leaderboard panel — top 5
function LiveLeaderboardPanel({ sessionId }) {
  const [board, setBoard] = useState([])
  const [open,  setOpen]  = useState(false)

  useEffect(() => {
    const load = () => setBoard(getLeaderboard().slice(0, 5))
    load()
    const handler = () => load()
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  if (board.length === 0) return null

  const rankColors = { 1: '#E8C84A', 2: '#A8B8C8', 3: '#B87A4A' }

  return (
    <div style={{ marginBottom: '12px' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between font-mono uppercase"
        style={{
          fontSize: '9px', letterSpacing: '2px', padding: '8px 12px',
          background: 'rgba(0,200,150,0.05)', border: '1px solid rgba(0,200,150,0.15)',
          borderRadius: open ? '4px 4px 0 0' : '4px', color: ACCENT, cursor: 'pointer',
        }}
      >
        <span>Live Standings</span>
        <span style={{ opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                background: 'rgba(0,200,150,0.03)',
                border: '1px solid rgba(0,200,150,0.15)',
                borderTop: 'none',
                borderRadius: '0 0 4px 4px',
                padding: '8px',
              }}
            >
              {board.map((entry, idx) => (
                <div
                  key={entry.sessionId || idx}
                  className="flex items-center gap-2"
                  style={{
                    padding: '5px 6px', borderRadius: '2px',
                    marginBottom: idx < board.length - 1 ? '2px' : 0,
                    background:   entry.sessionId === sessionId ? 'rgba(201,169,110,0.08)' : 'transparent',
                    borderLeft:   entry.sessionId === sessionId ? '2px solid #C9A96E' : '2px solid transparent',
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      width: '18px', fontSize: '13px', fontWeight: 600,
                      color: rankColors[idx + 1] || 'rgba(255,255,255,0.25)',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className="font-heading font-bold uppercase text-text-primary"
                    style={{ flex: 1, fontSize: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {entry.name || 'Anonymous'}
                  </span>
                  <span className="font-display font-semibold text-gold" style={{ fontSize: '14px' }}>
                    {entry.totalScore || 0}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function RedTeamRoulette({ navigate }) {
  const { updateScore, sessionId } = useSession()
  const shouldReduce               = useReducedMotion()
  const playSound                  = useSound()

  const cards = useMemo(() => buildCardSet(), [])

  const [flags,         setFlags]         = useState({})
  const [phase,         setPhase]         = useState('playing')
  const [timeLeft,      setTimeLeft]      = useState(TIMER_SECONDS)
  const [revealedCount, setRevealedCount] = useState(0)
  const timerRef = useRef(null)

  // ── Timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          triggerReveal()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Tick when ≤ 10s
  useEffect(() => {
    if (timeLeft > 0 && timeLeft <= 10 && phase === 'playing') playSound('tick')
  }, [timeLeft])

  const toggleFlag = (cardId) => {
    if (phase !== 'playing') return
    playSound('pop')
    setFlags(prev => ({ ...prev, [cardId]: !prev[cardId] }))
  }

  const triggerReveal = () => {
    clearInterval(timerRef.current)
    setPhase('revealed')
    setRevealedCount(0)
  }

  // Stagger card reveals: one every 100ms
  useEffect(() => {
    if (phase !== 'revealed' || revealedCount >= cards.length) return
    const t = setTimeout(() => setRevealedCount(prev => prev + 1), shouldReduce ? 0 : 100)
    return () => clearTimeout(t)
  }, [phase, revealedCount, cards.length, shouldReduce])

  // ── Score ─────────────────────────────────────────────────────────
  const computeScore = () => {
    let correctFlags = 0, missed = 0, falsePositives = 0
    cards.forEach(card => {
      const flagged = flags[card.id] || false
      if (card.isViolation && flagged)  correctFlags++
      if (card.isViolation && !flagged) missed++
      if (!card.isViolation && flagged) falsePositives++
    })
    return {
      score: Math.max(0, correctFlags * CORRECT_PTS - missed * PENALTY_PTS - falsePositives * PENALTY_PTS),
      correctFlags,
      missed,
      falsePositives,
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { score: liveScore, correctFlags: liveCorrect, missed: liveMissed, falsePositives: liveFP } =
    useMemo(computeScore, [flags, cards])

  const handleContinue = () => {
    const data = computeScore()
    updateScore('redTeam', { ...data, total: cards.length })
    playSound('complete')
    navigate(SCREENS.GAME_END, 'redTeam')
  }

  const flaggedCount = Object.values(flags).filter(Boolean).length

  return (
    <ScreenWrapper>
      <Topbar
        gameName="Red Team Roulette"
        accentColor={ACCENT}
        timerSlot={
          phase === 'playing'
            ? <TimerRing seconds={timeLeft} total={TIMER_SECONDS} accentColor={ACCENT} onExpire={triggerReveal} />
            : null
        }
      />
      <SafeZoneWrapper hasTopbar>
        <div className="w-full h-full overflow-y-auto" style={{ padding: '20px 16px 40px' }}>
          <AnimatePresence mode="wait">

            {/* ── PLAYING PHASE — all 6 cards visible, scroll to review ── */}
            {phase === 'playing' && (
              <motion.div
                key="playing"
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Live leaderboard panel (right side intent: collapsible strip on mobile) */}
                <LiveLeaderboardPanel sessionId={sessionId} />

                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono uppercase text-text-muted mb-0.5" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                      6 AI Outputs — Flag violations
                    </p>
                    <p
                      className="font-mono"
                      style={{ fontSize: '10px', color: flaggedCount > 0 ? ACCENT : 'rgba(255,255,255,0.25)' }}
                    >
                      {flaggedCount > 0 ? `${flaggedCount} flagged` : 'None flagged yet'}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="font-mono text-text-muted" style={{ fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Live Score
                    </p>
                    <p className="font-display font-semibold text-gold" style={{ fontSize: '22px', lineHeight: 1 }}>
                      {liveScore}
                    </p>
                  </div>
                </div>

                {/* 6-card grid (vertical scroll list) */}
                <div className="flex flex-col gap-4 mb-6">
                  {cards.map((card, idx) => (
                    <motion.div
                      key={card.id}
                      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: shouldReduce ? 0 : idx * 0.06, duration: 0.25 }}
                    >
                      <OutputCard
                        cardData={card}
                        flagged={flags[card.id] || false}
                        onToggleFlag={() => toggleFlag(card.id)}
                        isRevealed={false}
                        cardNumber={idx + 1}
                        totalCards={cards.length}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Submit CTA */}
                <button
                  onClick={triggerReveal}
                  className="w-full font-mono uppercase tracking-widest transition-colors"
                  style={{
                    fontSize: '11px', letterSpacing: '2px', padding: '14px',
                    background: ACCENT, color: '#07101C', fontWeight: 700,
                    border: 'none', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  Submit for Review
                </button>
              </motion.div>
            )}

            {/* ── REVEALED PHASE — staggered card verdicts ─────────────── */}
            {phase === 'revealed' && (
              <motion.div
                key="revealed"
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Score summary */}
                <div className="text-center mb-6">
                  <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                    Red Team Review Complete
                  </p>
                  <p className="font-display font-semibold text-gold" style={{ fontSize: '64px', lineHeight: '0.9' }}>
                    {liveScore}
                  </p>
                  <div className="flex gap-3 justify-center mt-2 flex-wrap">
                    <span className="font-mono" style={{ fontSize: '10px', color: ACCENT }}>
                      ✓ {liveCorrect} correct
                    </span>
                    {liveMissed > 0 && (
                      <span className="font-mono" style={{ fontSize: '10px', color: '#E8192C' }}>
                        ✗ {liveMissed} missed
                      </span>
                    )}
                    {liveFP > 0 && (
                      <span className="font-mono" style={{ fontSize: '10px', color: '#E8A830' }}>
                        ⚑ {liveFP} false {liveFP === 1 ? 'positive' : 'positives'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Staggered card reveals — 100ms per card */}
                <div className="flex flex-col gap-4 mb-6">
                  {cards.map((card, idx) =>
                    idx < revealedCount ? (
                      <motion.div
                        key={card.id}
                        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        <OutputCard
                          cardData={card}
                          flagged={flags[card.id] || false}
                          onToggleFlag={() => {}}
                          isRevealed={true}
                          cardNumber={0}
                          totalCards={0}
                        />
                      </motion.div>
                    ) : (
                      <div
                        key={card.id}
                        style={{
                          height: '80px',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          borderRadius: '10px',
                        }}
                      />
                    )
                  )}
                </div>

                {/* Continue — appears after all cards revealed */}
                {revealedCount >= cards.length && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleContinue}
                    className="w-full font-mono uppercase tracking-widest transition-colors"
                    style={{
                      fontSize: '11px', letterSpacing: '2px', padding: '14px',
                      background: ACCENT, color: '#07101C', fontWeight: 700,
                      border: 'none', borderRadius: '4px', cursor: 'pointer',
                    }}
                  >
                    Continue
                  </motion.button>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
