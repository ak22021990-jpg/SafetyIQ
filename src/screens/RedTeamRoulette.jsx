// src/screens/RedTeamRoulette.jsx
import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import TimerRing from '../components/ui/TimerRing'
import ProgressDots from '../components/ui/ProgressDots'
import OutputCard from '../components/game/OutputCard'
import { RED_TEAM_OUTPUTS } from '../data/gameContent'
import { useSession } from '../context/SessionContext'
import { SCREENS } from '../App'

const ACCENT        = '#00C896'
const TIMER_SECONDS = 90
const CORRECT_PTS   = 10
const PENALTY_PTS   = 5

// Build session card set: both videos + 4 random from non-video pool
function buildCardSet() {
  const videos   = RED_TEAM_OUTPUTS.filter(c => c.type === 'video')
  const nonVideo = RED_TEAM_OUTPUTS.filter(c => c.type !== 'video')
  // Shuffle non-video
  const shuffled = [...nonVideo].sort(() => Math.random() - 0.5)
  return [...shuffled.slice(0, 4), ...videos].sort(() => Math.random() - 0.5)
}

export default function RedTeamRoulette({ navigate }) {
  const { updateScore } = useSession()
  const shouldReduce    = useReducedMotion()

  const cards = useMemo(() => buildCardSet(), [])

  // Per-card flag state: cardId → bool
  const [flags,       setFlags]       = useState({})
  // Current card index
  const [cardIndex,   setCardIndex]   = useState(0)
  // phase: 'playing' | 'revealed' | 'complete'
  const [phase,       setPhase]       = useState('playing')
  // Timer
  const [timeLeft,    setTimeLeft]    = useState(TIMER_SECONDS)
  const timerRef      = useRef(null)
  // completed card indices
  const [completed,   setCompleted]   = useState([])

  const currentCard = cards[cardIndex]
  const isFlagged   = flags[currentCard?.id] || false

  // ── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleExpire()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const handleExpire = () => {
    clearInterval(timerRef.current)
    finishGame()
  }

  // ── Flag toggle ───────────────────────────────────────────────────────────
  const toggleFlag = () => {
    if (phase !== 'playing') return
    setFlags(prev => ({ ...prev, [currentCard.id]: !prev[currentCard.id] }))
  }

  // ── Advance card ─────────────────────────────────────────────────────────
  const handleNext = () => {
    setCompleted(prev => [...prev, cardIndex])
    if (cardIndex + 1 >= cards.length) {
      clearInterval(timerRef.current)
      finishGame()
    } else {
      setCardIndex(prev => prev + 1)
    }
  }

  // ── Finish & score ───────────────────────────────────────────────────────
  const finishGame = () => {
    setPhase('complete')
  }

  const computeScore = () => {
    let correctFlags  = 0
    let missed        = 0
    let falsePositives = 0

    cards.forEach(card => {
      const flagged = flags[card.id] || false
      if (card.isViolation && flagged)  correctFlags++
      if (card.isViolation && !flagged) missed++
      if (!card.isViolation && flagged) falsePositives++
    })

    const raw   = correctFlags * CORRECT_PTS - missed * PENALTY_PTS - falsePositives * PENALTY_PTS
    const score = Math.max(0, raw)
    return { score, correctFlags, missed, falsePositives }
  }

  const handleSubmitResults = () => {
    const { score, correctFlags, missed, falsePositives } = computeScore()
    updateScore('redTeam', {
      score,
      correctFlags,
      missed,
      falsePositives,
      total: cards.length,
    })
    navigate(SCREENS.GAME_END, 'redTeam')
  }

  // ── Score preview ─────────────────────────────────────────────────────────
  const { score: previewScore, correctFlags, missed, falsePositives } = useMemo(computeScore, [flags, cards])

  return (
    <ScreenWrapper>
      <Topbar
        gameName="Red Team Roulette"
        accentColor={ACCENT}
        timerSlot={
          phase === 'playing'
            ? <TimerRing seconds={timeLeft} total={TIMER_SECONDS} accentColor={ACCENT} onExpire={handleExpire} />
            : null
        }
      />
      <SafeZoneWrapper hasTopbar>
        <div className="w-full h-full overflow-y-auto" style={{ padding: '24px 20px' }}>

          {/* ── PLAYING PHASE ─────────────────────────────────────── */}
          {phase === 'playing' && currentCard && (
            <motion.div
              key="playing"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                    Output {cardIndex + 1} of {cards.length}
                  </p>
                  <ProgressDots total={cards.length} current={cardIndex} completed={completed} />
                </div>
                <p className="font-mono text-text-muted" style={{ fontSize: '10px' }}>
                  Flag violations before time runs out
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard.id}
                  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                >
                  <OutputCard
                    cardData={currentCard}
                    flagged={isFlagged}
                    onToggleFlag={toggleFlag}
                    isRevealed={false}
                    cardNumber={cardIndex + 1}
                    totalCards={cards.length}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="w-full font-mono uppercase tracking-widest transition-colors mt-4"
                style={{
                  fontSize: '11px', letterSpacing: '2px', padding: '14px',
                  background: ACCENT, color: '#07101C', fontWeight: 700,
                  border: 'none', borderRadius: '4px', cursor: 'pointer',
                }}
              >
                {cardIndex + 1 < cards.length ? 'Next Output →' : 'Submit →'}
              </button>
            </motion.div>
          )}

          {/* ── COMPLETE PHASE ───────────────────────────────────── */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-6">
                <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                  Red Team Review Complete
                </p>
                <p className="font-display font-semibold text-gold" style={{ fontSize: '64px', lineHeight: '0.9' }}>
                  {previewScore}
                </p>
                <p className="font-mono text-text-muted mt-2" style={{ fontSize: '10px' }}>
                  {correctFlags} correct · {missed} missed · {falsePositives} false positives
                </p>
              </div>

              {/* Revealed cards */}
              <div className="flex flex-col gap-4 mb-6">
                {cards.map(card => (
                  <OutputCard
                    key={card.id}
                    cardData={card}
                    flagged={flags[card.id] || false}
                    onToggleFlag={() => {}}
                    isRevealed={true}
                    cardNumber={0}
                    totalCards={0}
                  />
                ))}
              </div>

              <button
                onClick={handleSubmitResults}
                className="w-full font-mono uppercase tracking-widest transition-colors"
                style={{
                  fontSize: '11px', letterSpacing: '2px', padding: '14px',
                  background: ACCENT, color: '#07101C', fontWeight: 700,
                  border: 'none', borderRadius: '4px', cursor: 'pointer',
                }}
              >
                Continue →
              </button>
            </motion.div>
          )}

        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
