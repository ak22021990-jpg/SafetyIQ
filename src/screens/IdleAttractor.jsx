// src/screens/IdleAttractor.jsx
// Shown after 60s inactivity. Tap anywhere → Registration (new player).
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import { getLeaderboard } from '../utils/storageEngine'
import { SCREENS } from '../constants/screens'

// Teaser questions from PRD §5 — gold word indicated by ** markers in text
const TEASER_QUESTIONS = [
  { text: "A 14-year-old's bio says 'struggling lately.' Do you **remove** it?",       highlight: 'remove'   },
  { text: "An AI wrote 200 five-star reviews overnight. They all **passed** your filter. Now what?", highlight: 'passed' },
  { text: "The post is technically **true**. But it's designed to destroy someone. Your call.", highlight: 'true' },
  { text: "Your fraud budget ran out. The next attack hits in **4 hours**.",            highlight: '4 hours'  },
  { text: "The AI output looks clean. It **isn't**. Would you catch it?",              highlight: "isn't"    },
  { text: "Same image. Four countries. Four completely different **meanings**. One policy. How?", highlight: 'meanings' },
  { text: "A crisis counsellor just got **permanently banned** by your own rule. What went wrong?", highlight: 'permanently banned' },
  { text: "How do you enforce policy consistently across **20 languages** and 5 time zones?", highlight: '20 languages' },
  { text: "What happens when your moderation rule **silences** the community it was meant to protect?", highlight: 'silences' },
  { text: "At **14,000 reports** per day, instinct isn't enough. What is?",            highlight: '14,000 reports' },
]

function HighlightedText({ text, highlight }) {
  if (!highlight) return <>{text}</>
  const parts = text.split(new RegExp(`(\\*\\*${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*\\*)`, 'i'))
  return (
    <>
      {parts.map((part, i) => {
        if (part === `**${highlight}**`) {
          return <span key={i} style={{ color: '#C9A96E' }}>{highlight}</span>
        }
        // Strip remaining ** markers
        return <span key={i}>{part.replace(/\*\*/g, '')}</span>
      })}
    </>
  )
}

function TeaserPanel({ question }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center px-16 max-w-4xl mx-auto"
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
    >
      <p
        className="font-display italic text-text-primary leading-tight"
        style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
      >
        <HighlightedText text={question.text} highlight={question.highlight} />
      </p>
    </motion.div>
  )
}

function LeaderboardPanel() {
  const [board, setBoard] = useState(() => getLeaderboard().slice(0, 5))

  useEffect(() => {
    const load = () => setBoard(getLeaderboard().slice(0, 5))
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  if (board.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-16">
        <p className="font-mono text-body-s text-text-muted">
          Be the first to claim the top spot.
        </p>
        {/* Ghost shimmer rows */}
        {[1,2,3].map(i => (
          <div
            key={i}
            className="w-64 h-8 mt-3 rounded-none"
            style={{ background: 'rgba(255,255,255,0.04)', opacity: 1 - i * 0.2 }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center px-16 w-full max-w-lg mx-auto">
      <p className="font-mono uppercase tracking-widest text-gold mb-6"
         style={{ fontSize: '9px', letterSpacing: '3px' }}>
        Top Players
      </p>
      {board.map((entry, i) => (
        <div
          key={entry.sessionId}
          className="w-full flex items-center justify-between py-2"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <span
              className="font-display font-semibold w-6 text-center"
              style={{ color: i === 0 ? '#E8C84A' : i === 1 ? '#A8B8C8' : i === 2 ? '#B87A4A' : '#566478' }}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-heading font-bold text-text-primary text-body-s">{entry.name}</p>
              <p className="font-mono text-micro text-text-muted">{entry.company}</p>
            </div>
          </div>
          <span className="font-display font-semibold text-gold text-body-m">{entry.totalScore}</span>
        </div>
      ))}
    </div>
  )
}

const PANELS = ['teaser', 'stats', 'leaderboard']

export default function IdleAttractor({ navigate }) {
  const [panelIndex, setPanelIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(
    () => Math.floor(Math.random() * TEASER_QUESTIONS.length)
  )
  const [showPanel, setShowPanel] = useState(true)

  // Rotate panels every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setShowPanel(false)
      setTimeout(() => {
        setPanelIndex(i => {
          const next = (i + 1) % PANELS.length
          if (next === 0) {
            setQuestionIndex(qi => (qi + 1) % TEASER_QUESTIONS.length)
          }
          return next
        })
        setShowPanel(true)
      }, 600)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <ScreenWrapper>
      <div
        className="w-full h-full flex flex-col items-center justify-center cursor-pointer select-none"
        onClick={() => navigate(SCREENS.REGISTER)}
        role="button"
        tabIndex={0}
        aria-label="Tap to start playing Signal and Noise"
        onKeyDown={(e) => e.key === 'Enter' && navigate(SCREENS.REGISTER)}
      >
        {/* Panel content */}
        <div className="flex-1 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {showPanel && (
              <div key={`${PANELS[panelIndex]}-${questionIndex}`} className="w-full">
                {PANELS[panelIndex] === 'teaser' && (
                  <TeaserPanel question={TEASER_QUESTIONS[questionIndex]} />
                )}
                {PANELS[panelIndex] === 'stats' && (
                  <motion.div
                    className="flex flex-col items-center justify-center text-center px-16"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* ⚠️ REPLACE BEFORE SUMMIT: Add verified Sutherland stats */}
                    <p className="font-display text-display-m text-gold font-semibold">100M+</p>
                    <p className="font-mono text-body-s text-text-secondary mt-2">
                      content pieces reviewed annually
                    </p>
                  </motion.div>
                )}
                {PANELS[panelIndex] === 'leaderboard' && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full"
                  >
                    <LeaderboardPanel />
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Pulsing CTA */}
        <motion.p
          className="font-mono uppercase tracking-widest text-gold mb-16"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Tap anywhere to play →
        </motion.p>
      </div>
    </ScreenWrapper>
  )
}
