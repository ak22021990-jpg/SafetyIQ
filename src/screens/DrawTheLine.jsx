// src/screens/DrawTheLine.jsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Lottie from 'lottie-react'
import shieldBlocked from '../assets/lottie/shield-blocked.json'
import breachExplosion from '../assets/lottie/breach-explosion.json'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import TimerRing from '../components/ui/TimerRing'
import Slider from '../components/ui/Slider'
import HintBox from '../components/ui/HintBox'
import { DRAW_THE_LINE_POLICIES } from '../data/gameContent'
import { useSession } from '../context/SessionContext'
import { useSound } from '../hooks/useSound'
import { SCREENS } from '../constants/screens'

const ACCENT = '#4A7FA5'
const TIMER_SECONDS = 120
const MAX_HINTS = 2
const HINT_PENALTY = 5
const STRESS_POINTS = 10

// Hints per policy (index matches policy array index)
const POLICY_HINTS = [
  // dtl-01 Self-Harm
  [
    'Think about the tension between removing harmful content and preserving crisis support resources. Survivors discussing their experience are different from instructional content.',
    'Consider geographic variation — some jurisdictions legally require safe messaging guidelines. Appeals are essential to recover wrongly removed crisis content.',
  ],
  // dtl-02 Election Integrity
  [
    'Voter suppression messaging often looks like legitimate civic information. Scope matters — images and video can spread misinformation faster than text.',
    'Counter-speech campaigns against misinformation need to show the misinformation to refute it. Zero tolerance without appeals removes fact-checkers.',
  ],
  // dtl-03 Child Safety
  [
    'Child safety research and grooming awareness education requires describing harmful tactics. Platform-wide prohibition without appeals removes child protection organisations.',
    'Grooming networks rarely violate policy on individual posts — they exploit gaps between single-post review and network behaviour. Full scope is essential.',
  ],
  // dtl-04 Financial Fraud
  [
    'Romance scams operate in private messages, not public posts. Text-only scope completely misses private channel fraud.',
    'Unregistered financial products disclosed as paid partnerships sit in a grey zone. Your policy needs to cover the financial product, not just the disclosure.',
  ],
  // dtl-05 Violent Extremism
  [
    'Academic researchers and journalists documenting extremism need to show the content to counter it. Zero tolerance without appeals removes counter-radicalisation voices.',
    'Former extremist deradicalisation accounts are among the most effective counter-radicalisation resources. High strictness without appeals eliminates their credibility.',
  ],
  // dtl-06 Adult Content
  [
    'Legal adult content in properly age-gated sections is protected in most jurisdictions. Platform-wide prohibition removes legitimate legal commerce.',
    'Grooming networks exploit the gap between single-post review and network behaviour. Maximum scope plus high strictness plus network analysis is required.',
  ],
]

// ── Phase state machine ────────────────────────────────────────────────────
// phases: 'configure' → 'stress_test' → 'complete'

export default function DrawTheLine({ navigate }) {
  const { player, updateScore } = useSession()
  const shouldReduce = useReducedMotion()
  const playSound    = useSound()

  // Pick policy based on session (rotate through 6)
  const policyIndex = useRef(
    (() => {
      try {
        const sessions = JSON.parse(localStorage.getItem('sn_sessions') || '[]')
        return sessions.length % 6
      } catch { return 0 }
    })()
  )
  const policy = DRAW_THE_LINE_POLICIES[policyIndex.current]
  const hints  = POLICY_HINTS[policyIndex.current]

  // Slider state — start at midpoint (50)
  const [config, setConfig] = useState({ strictness: 50, scope: 50, appeals: 50 })
  const setSlider = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  // Hint state
  const [hintsUsed,    setHintsUsed]    = useState(0)
  const [activeHint,   setActiveHint]   = useState(null) // 0 or 1 (hint index shown)
  const [hintPenalty,  setHintPenalty]  = useState(0)

  // Timer
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const timerRef = useRef(null)

  // Phase
  const [phase, setPhase] = useState('configure') // 'configure' | 'stress_test' | 'complete'

  // Stress test progress
  const [stressIndex,   setStressIndex]   = useState(0)
  const [stressResults, setStressResults] = useState([]) // { passed: bool }[]
  const [showingResult, setShowingResult] = useState(false) // true while showing PASS/FAIL for current test

  // Final score ref
  const scoreRef = useRef(0)

  // ── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'configure') return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleLockConfig()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Tick when ≤ 10s during configure phase
  useEffect(() => {
    if (timeLeft > 0 && timeLeft <= 10 && phase === 'configure') playSound('tick')
  }, [timeLeft])

  // ── Lock configuration & run stress tests ────────────────────────────────
  const handleLockConfig = () => {
    clearInterval(timerRef.current)
    setPhase('stress_test')
    setStressIndex(0)
    setShowingResult(false)
  }

  // Advance through stress tests
  useEffect(() => {
    if (phase !== 'stress_test') return

    const test = policy.stressTests[stressIndex]
    if (!test) {
      // All done — compute final score
      const passed = stressResults.filter(r => r.passed).length
      const raw    = passed * STRESS_POINTS - hintPenalty
      const final  = Math.max(0, raw)
      scoreRef.current = final
      setPhase('complete')
      return
    }
  }, [phase, stressIndex, policy, stressResults, hintPenalty])

  // Evaluate current stress test
  const evaluateCurrentTest = () => {
    const test   = policy.stressTests[stressIndex]
    const passed = test.passCondition(config)
    const newResults = [...stressResults, { passed, insight: test.insight, title: test.title, region: test.region }]
    setStressResults(newResults)
    setShowingResult(true)
  }

  const advanceStressTest = () => {
    setShowingResult(false)
    setStressIndex(prev => prev + 1)
  }

  // ── Hint handler ─────────────────────────────────────────────────────────
  const requestHint = (idx) => {
    if (hintsUsed >= MAX_HINTS) return
    if (activeHint === idx) { setActiveHint(null); return }
    setActiveHint(idx)
    if (!stressResults.some((_, i) => i === idx)) {
      // First time viewing this hint
      const newUsed = hintsUsed + 1
      setHintsUsed(newUsed)
      setHintPenalty(newUsed * HINT_PENALTY)
    }
  }

  // ── Complete → GameEnd ───────────────────────────────────────────────────
  const handleComplete = () => {
    const passed      = stressResults.filter(r => r.passed).length
    const total       = policy.stressTests.length
    updateScore('drawLine', {
      score:      scoreRef.current,
      passed,
      total,
      hintsUsed,
      policyId:   policy.id,
    })
    playSound('complete')
    navigate(SCREENS.GAME_END, 'drawLine')
  }

  // ── Render helpers ───────────────────────────────────────────────────────
  const currentTest    = phase === 'stress_test' ? policy.stressTests[stressIndex] : null
  const passedCount    = stressResults.filter(r => r.passed).length
  const lastResult     = stressResults[stressResults.length - 1]

  return (
    <ScreenWrapper>
      <Topbar
        gameName="Draw the Line"
        accentColor={ACCENT}
        timerSlot={
          phase === 'configure'
            ? <TimerRing seconds={timeLeft} total={TIMER_SECONDS} accentColor={ACCENT} onExpire={handleLockConfig} />
            : null
        }
      />
      <SafeZoneWrapper hasTopbar>
        <div className="w-full h-full overflow-y-auto" style={{ padding: '24px 20px' }}>

          {/* ── CONFIGURE PHASE ─────────────────────────────────────────── */}
          {phase === 'configure' && (
            <motion.div
              key="configure"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Policy header */}
              <div className="mb-6">
                <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                  Policy Configuration
                </p>
                <h2 className="font-heading font-extrabold text-text-primary mb-2" style={{ fontSize: '22px', lineHeight: '1.2' }}>
                  {policy.title}
                </h2>
                <p className="font-mono text-text-secondary mb-3" style={{ fontSize: '11px', lineHeight: '1.6' }}>
                  {policy.description}
                </p>
                <div
                  className="font-mono text-text-muted p-3"
                  style={{
                    fontSize: '10px', lineHeight: '1.5',
                    background: 'rgba(74,127,165,0.08)',
                    border: '1px solid rgba(74,127,165,0.20)',
                    borderRadius: '4px',
                  }}
                >
                  <span style={{ color: ACCENT }}>Context: </span>{policy.platformContext}
                </div>
              </div>

              {/* Sliders */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px',
                }}
              >
                <p className="font-mono uppercase text-text-muted mb-5" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                  Set Your Policy Parameters
                </p>
                <div className="flex flex-col gap-8">
                  <Slider
                    label="Strictness"
                    value={config.strictness}
                    onChange={v => setSlider('strictness', v)}
                    leftLabel={policy.sliderLabels.strictness.left}
                    rightLabel={policy.sliderLabels.strictness.right}
                    accentColor={ACCENT}
                  />
                  <Slider
                    label="Scope"
                    value={config.scope}
                    onChange={v => setSlider('scope', v)}
                    leftLabel={policy.sliderLabels.scope.left}
                    rightLabel={policy.sliderLabels.scope.right}
                    accentColor={ACCENT}
                  />
                  <Slider
                    label="Appeals Process"
                    value={config.appeals}
                    onChange={v => setSlider('appeals', v)}
                    leftLabel={policy.sliderLabels.appeals.left}
                    rightLabel={policy.sliderLabels.appeals.right}
                    accentColor={ACCENT}
                  />
                </div>
              </div>

              {/* Hints */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono uppercase text-text-muted" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                    Policy Hints
                  </p>
                  <span className="font-mono text-text-muted" style={{ fontSize: '9px' }}>
                    {hintsUsed}/{MAX_HINTS} used · −{HINT_PENALTY}pts each
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {hints.map((hint, idx) => {
                    const used = idx < hintsUsed || activeHint === idx
                    return (
                      <div key={idx}>
                        <button
                          onClick={() => requestHint(idx)}
                          disabled={hintsUsed >= MAX_HINTS && activeHint !== idx}
                          className="w-full text-left font-mono transition-colors"
                          style={{
                            fontSize: '10px',
                            padding: '8px 12px',
                            background: used ? 'rgba(232,168,48,0.08)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${used ? 'rgba(232,168,48,0.30)' : 'rgba(255,255,255,0.07)'}`,
                            borderRadius: '4px',
                            color: hintsUsed >= MAX_HINTS && activeHint !== idx ? 'rgba(255,255,255,0.25)' : '#E8A830',
                            cursor: hintsUsed >= MAX_HINTS && activeHint !== idx ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {activeHint === idx ? '▲ Hide hint' : `▼ Hint ${idx + 1}${used ? ' (used)' : ` (−${HINT_PENALTY}pts)`}`}
                        </button>
                        <HintBox hint={hint} visible={activeHint === idx} />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Lock CTA */}
              <button
                onClick={handleLockConfig}
                className="w-full font-mono uppercase tracking-widest transition-colors"
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  padding: '16px',
                  background: ACCENT,
                  color: '#07101C',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Lock Configuration →
              </button>
            </motion.div>
          )}

          {/* ── STRESS TEST PHASE ───────────────────────────────────────── */}
          {phase === 'stress_test' && (
            <motion.div
              key="stress"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-6">
                {policy.stressTests.map((_, i) => {
                  const result = stressResults[i]
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '100px',
                        background: result
                          ? result.passed ? '#00C896' : '#E8192C'
                          : i === stressIndex ? ACCENT : 'rgba(255,255,255,0.12)',
                        transition: shouldReduce ? 'none' : 'background 300ms',
                      }}
                    />
                  )
                })}
              </div>

              <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                Stress Test {stressIndex + 1} of {policy.stressTests.length}
              </p>

              <AnimatePresence mode="wait">
                {!showingResult && currentTest && (
                  <motion.div
                    key={`test-${stressIndex}`}
                    initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-baseline gap-2 mb-3">
                      <h3 className="font-heading font-bold text-text-primary" style={{ fontSize: '20px' }}>
                        {currentTest.title}
                      </h3>
                      <span className="font-mono text-text-muted" style={{ fontSize: '12px' }}>{currentTest.region}</span>
                    </div>

                    <div
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '20px',
                      }}
                    >
                      <p className="font-mono text-text-secondary" style={{ fontSize: '12px', lineHeight: '1.7' }}>
                        {currentTest.scenario}
                      </p>
                    </div>

                    {/* Config summary */}
                    <div className="flex gap-3 mb-6 flex-wrap">
                      {[
                        { label: 'Strictness', val: config.strictness },
                        { label: 'Scope',      val: config.scope },
                        { label: 'Appeals',    val: config.appeals },
                      ].map(({ label, val }) => (
                        <div
                          key={label}
                          className="font-mono"
                          style={{
                            fontSize: '10px',
                            padding: '6px 12px',
                            background: 'rgba(74,127,165,0.10)',
                            border: '1px solid rgba(74,127,165,0.25)',
                            borderRadius: '4px',
                            color: ACCENT,
                          }}
                        >
                          {label}: <strong>{val}</strong>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={evaluateCurrentTest}
                      className="w-full font-mono uppercase tracking-widest transition-colors"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        padding: '14px',
                        background: ACCENT,
                        color: '#07101C',
                        fontWeight: 700,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Apply Policy →
                    </button>
                  </motion.div>
                )}

                {showingResult && lastResult && (
                  <motion.div
                    key={`result-${stressIndex}`}
                    initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* PASS / FAIL */}
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '24px 20px 28px',
                        marginBottom: '20px',
                        background: lastResult.passed ? 'rgba(0,200,150,0.06)' : 'rgba(232,25,44,0.06)',
                        border: `1px solid ${lastResult.passed ? 'rgba(0,200,150,0.30)' : 'rgba(232,25,44,0.30)'}`,
                        borderRadius: '8px',
                      }}
                    >
                      {!shouldReduce && (
                        <Lottie
                          animationData={lastResult.passed ? shieldBlocked : breachExplosion}
                          loop={false}
                          style={{ width: 80, height: 80, margin: '0 auto 8px' }}
                        />
                      )}
                      <p
                        className="font-heading font-extrabold mb-1"
                        style={{
                          fontSize: '42px',
                          color: lastResult.passed ? '#00C896' : '#E8192C',
                          lineHeight: 1,
                        }}
                      >
                        {lastResult.passed ? 'PASS' : 'FAIL'}
                      </p>
                      <p className="font-mono text-text-muted" style={{ fontSize: '10px' }}>
                        {lastResult.title} · {lastResult.region}
                      </p>
                    </div>

                    {/* Insight */}
                    <div
                      className="mb-6"
                      style={{
                        borderLeft: '3px solid #4A7FA5',
                        paddingLeft: '14px',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                      }}
                    >
                      <p className="font-mono uppercase text-text-muted mb-2" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                        Policy Analysis
                      </p>
                      <p className="font-mono text-text-secondary" style={{ fontSize: '11px', lineHeight: '1.65' }}>
                        {lastResult.insight}
                      </p>
                    </div>

                    <button
                      onClick={advanceStressTest}
                      className="w-full font-mono uppercase tracking-widest transition-colors"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        padding: '14px',
                        background: 'transparent',
                        color: ACCENT,
                        fontWeight: 700,
                        border: `1px solid ${ACCENT}`,
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      {stressIndex + 1 < policy.stressTests.length ? 'Next Test →' : 'View Results →'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── COMPLETE PHASE ──────────────────────────────────────────── */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center"
              style={{ paddingTop: '20px' }}
            >
              <p className="font-mono uppercase text-text-muted mb-2" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                Policy Review Complete
              </p>

              {/* 0/5 special outcome */}
              {passedCount === 0 ? (
                <>
                  <h2 className="font-heading font-extrabold text-text-primary mb-4" style={{ fontSize: '28px', lineHeight: '1.2' }}>
                    Every Line Broke.
                  </h2>
                  <div
                    style={{
                      background: 'rgba(232,25,44,0.06)',
                      border: '1px solid rgba(232,25,44,0.25)',
                      borderRadius: '8px',
                      padding: '20px',
                      marginBottom: '24px',
                      maxWidth: '400px',
                    }}
                  >
                    <p className="font-mono text-text-secondary" style={{ fontSize: '11px', lineHeight: '1.7' }}>
                      Every single line broke. That&apos;s not failure — that&apos;s the reality of global policy at
                      scale. No configuration satisfies every edge case. The goal isn&apos;t perfection. It&apos;s knowing
                      which trade-offs you&apos;re choosing — and owning them.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p
                    className="font-display font-semibold text-gold mb-2"
                    style={{ fontSize: '72px', lineHeight: '0.9' }}
                  >
                    {passedCount}/{policy.stressTests.length}
                  </p>
                  <p className="font-mono text-text-muted mb-4" style={{ fontSize: '11px' }}>
                    stress tests passed
                  </p>
                </>
              )}

              {/* Score */}
              <div
                style={{
                  background: 'rgba(74,127,165,0.08)',
                  border: '1px solid rgba(74,127,165,0.20)',
                  borderRadius: '8px',
                  padding: '16px 24px',
                  marginBottom: '24px',
                  width: '100%',
                  maxWidth: '320px',
                }}
              >
                <p className="font-mono uppercase text-text-muted mb-2" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                  Score Breakdown
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono" style={{ fontSize: '11px' }}>
                    <span className="text-text-secondary">Tests passed</span>
                    <span className="text-text-primary">+{passedCount * STRESS_POINTS}</span>
                  </div>
                  {hintsUsed > 0 && (
                    <div className="flex justify-between font-mono" style={{ fontSize: '11px' }}>
                      <span className="text-text-secondary">Hints used ({hintsUsed})</span>
                      <span style={{ color: '#E8192C' }}>−{hintPenalty}</span>
                    </div>
                  )}
                  <div
                    className="flex justify-between font-mono font-bold"
                    style={{ fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '4px' }}
                  >
                    <span className="text-text-primary">Total</span>
                    <span style={{ color: ACCENT }}>{scoreRef.current}</span>
                  </div>
                </div>
              </div>

              {/* Test result dots */}
              <div className="flex gap-2 mb-8">
                {stressResults.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      width: '12px', height: '12px',
                      borderRadius: '50%',
                      background: r.passed ? '#00C896' : '#E8192C',
                    }}
                    title={r.passed ? `Test ${i + 1}: Pass` : `Test ${i + 1}: Fail`}
                  />
                ))}
              </div>

              <button
                onClick={handleComplete}
                className="font-mono uppercase tracking-widest transition-colors"
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  padding: '14px 32px',
                  background: ACCENT,
                  color: '#07101C',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
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
