// src/screens/GrayRoom.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import TimerRing from '../components/ui/TimerRing'
import ProgressDots from '../components/ui/ProgressDots'
import SocialPostCard from '../components/game/SocialPostCard'
import InsightPopup from '../components/game/InsightPopup'
import Button from '../components/ui/Button'
import { useSession } from '../context/SessionContext'
import { useSound } from '../hooks/useSound'
import { SCREENS } from '../constants/screens'
import { GRAY_ROOM_CASES } from '../data/gameContent'

const MAX_SECONDS = 90

// ── Scoring constants (adjust here to tune the game) ───────────────
const SCORE_CORRECT        = 15   // points for a correct answer
const SCORE_SPEED_BONUS    = 5    // extra points for answering within the threshold
const SCORE_SPEED_THRESHOLD = 30  // seconds — answers faster than this earn the speed bonus
const SCORE_CRIT_PENALTY   = 5    // points deducted for a critically wrong answer

export default function GrayRoom({ navigate }) {
  const { updateScore } = useSession()
  const playSound = useSound()

  const [caseIndex,    setCaseIndex]    = useState(0)
  const [caseState,    setCaseState]    = useState('active')  // active | locked | revealed | insight
  const [selectedId,   setSelectedId]   = useState(null)
  const [seconds,      setSeconds]      = useState(MAX_SECONDS)
  const [startTime,    setStartTime]    = useState(Date.now())
  const [completedIdx, setCompletedIdx] = useState([])
  const [showInsight,  setShowInsight]  = useState(false)
  const [wasCorrect,   setWasCorrect]   = useState(false)
  const [timeTaken,    setTimeTaken]    = useState(0)

  // Accumulated scores
  const scoreRef = useRef({ total: 0, correct: 0, cases: [] })
  const timerRef = useRef(null)

  const currentCase = GRAY_ROOM_CASES[caseIndex]

  // ── Timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (caseState !== 'active') {
      clearInterval(timerRef.current)
      return
    }
    setSeconds(MAX_SECONDS)
    setStartTime(Date.now())
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timerRef.current)
          handleExpire()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [caseIndex, caseState])

  // ── Tick sound when timer ≤ 10 ────────────────────────────────────
  useEffect(() => {
    if (seconds > 0 && seconds <= 10 && caseState === 'active') playSound('tick')
  }, [seconds])

  // ── Choice selection ───────────────────────────────────────────────
  const handleChoiceSelect = (choiceId) => {
    if (caseState !== 'active') return
    clearInterval(timerRef.current)
    setSelectedId(choiceId)
    setCaseState('locked')

    const elapsed     = Math.round((Date.now() - startTime) / 1000)
    const correct     = choiceId === currentCase.correctChoiceId
    const critWrong   = currentCase.choices.find(c => c.id === choiceId)?.isCriticallyWrong
    let points        = 0
    if (correct)                               points += SCORE_CORRECT
    if (correct && elapsed < SCORE_SPEED_THRESHOLD) points += SCORE_SPEED_BONUS
    if (critWrong)                             points -= SCORE_CRIT_PENALTY

    scoreRef.current.total   += points
    scoreRef.current.correct += correct ? 1 : 0
    scoreRef.current.cases.push({ caseId: currentCase.id, correct, points, elapsed })

    playSound(correct ? 'correct' : 'wrong')
    setWasCorrect(correct)
    setTimeTaken(elapsed)

    // Brief pause then reveal
    setTimeout(() => {
      setCaseState('revealed')
      setTimeout(() => setShowInsight(true), 600)
    }, 400)
  }

  // ── Timer expired ──────────────────────────────────────────────────
  const handleExpire = useCallback(() => {
    if (caseState !== 'active') return
    playSound('expired')
    setSelectedId(null)
    setCaseState('revealed')
    scoreRef.current.cases.push({ caseId: currentCase.id, correct: false, points: 0, elapsed: MAX_SECONDS })
    setWasCorrect(false)
    setTimeTaken(MAX_SECONDS)
    setTimeout(() => setShowInsight(true), 600)
  }, [caseState, currentCase])

  // ── After insight: next case or end ───────────────────────────────
  const handleContinue = () => {
    setShowInsight(false)
    setCompletedIdx(prev => [...prev, caseIndex])

    if (caseIndex < GRAY_ROOM_CASES.length - 1) {
      setCaseIndex(i => i + 1)
      setSelectedId(null)
      setCaseState('active')
    } else {
      // Game complete
      const score = scoreRef.current
      const acc   = score.cases.length > 0
        ? score.correct / score.cases.length
        : 0
      const avgTime = score.cases.length > 0
        ? Math.round(score.cases.reduce((s, c) => s + c.elapsed, 0) / score.cases.length)
        : 0

      updateScore('grayRoom', {
        score:        Math.max(0, score.total),
        accuracy:     acc,
        avgTime,
        casesCorrect: score.cases.filter(c => c.correct).map(c => c.caseId),
      })
      playSound('complete')
      navigate(SCREENS.GAME_END, 'grayRoom')
    }
  }

  const totalCases = GRAY_ROOM_CASES.length

  return (
    <ScreenWrapper>
      <Topbar
        gameName="The Gray Room"
        accentColor="#C9A96E"
        score={Math.max(0, scoreRef.current.total)}
        timerSlot={
          <TimerRing
            seconds={seconds}
            maxSeconds={MAX_SECONDS}
            onExpire={handleExpire}
          />
        }
      />

      <SafeZoneWrapper>
        <div className="w-full h-full flex flex-col overflow-auto px-8 py-4">

          {/* Case header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p
                className="font-mono uppercase text-gold mb-1"
                style={{ fontSize: '9px', letterSpacing: '3px' }}
              >
                Case {caseIndex + 1} of {totalCases}
              </p>
              <p
                className="font-heading font-bold text-text-primary"
                style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}
              >
                {currentCase.domain.replace(/_/g, ' ')}
              </p>
            </div>
            <ProgressDots
              total={totalCases}
              current={caseIndex}
              completed={completedIdx}
            />
          </div>

          {/* Social post card */}
          <div className="flex-1 overflow-auto">
            <SocialPostCard
              caseData={currentCase}
              selectedId={selectedId}
              revealedCorrectId={currentCase.correctChoiceId}
              state={caseState}
              onChoiceSelect={handleChoiceSelect}
            />
          </div>

          {/* State: revealed, waiting for insight click */}
          {caseState === 'revealed' && !showInsight && (
            <div className="text-center py-3">
              <p className="font-mono text-text-muted" style={{ fontSize: '10px' }}>
                Loading insight…
              </p>
            </div>
          )}

        </div>
      </SafeZoneWrapper>

      {/* Insight popup */}
      <InsightPopup
        open={showInsight}
        caseData={currentCase}
        wasCorrect={wasCorrect}
        timeTaken={timeTaken}
        onContinue={handleContinue}
      />
    </ScreenWrapper>
  )
}
