// src/components/layout/TickerBanner.jsx
// Fixed bottom ticker — 48px, editorial reveal, reads from localStorage
import { useState, useEffect, useRef } from 'react'
import { getTickerStats, getAllSessions } from '../../utils/storageEngine'

// ⚠️ REPLACE BEFORE SUMMIT: Verify these static insights with real Sutherland stats
const STATIC_INSIGHTS = [
  'Sutherland reviews over 100M pieces of content per year for trust & safety clients.',
  'The average Trust & Safety team reviews 14,000+ reports every single day.',
  'Response time under 24h reduces platform reputation damage by up to 60%.',
  'Contextual misclassification accounts for 34% of all content moderation errors.',
  'Sutherland operates across 20+ languages and 5 time zones — 24 hours a day.',
  '72% of harmful content is removed before a single user reports it.',
  'False positive rates above 2% erode creator trust within 90 days.',
]

function buildLiveInsights(stats, sessions) {
  if (!stats || sessions.length < 3) return null
  const insights = [
    `${stats.totalPlayers} players have taken the Signal & Noise challenge today.`,
    `Average score so far: ${stats.avgScore} points.`,
    `${stats.completedAll} players have completed all four games.`,
  ]
  return insights
}

export default function TickerBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [insights, setInsights] = useState(STATIC_INSIGHTS)
  const timerRef = useRef(null)

  // Load live stats on mount and every 30s
  useEffect(() => {
    const load = () => {
      const stats    = getTickerStats()
      const sessions = getAllSessions()
      const live     = buildLiveInsights(stats, sessions)
      setInsights(live && live.length > 0 ? live : STATIC_INSIGHTS)
    }
    load()
    const interval = setInterval(load, 30000)
    return () => clearInterval(interval)
  }, [])

  // Rotate insights every 6s with cross-fade
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex(i => (i + 1) % insights.length)
        setVisible(true)
      }, 600)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [insights])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-6 gap-4"
      style={{
        height:         '48px',
        background:     'rgba(7,16,28,0.96)',
        backdropFilter: 'blur(12px)',
        borderTop:      '1px solid rgba(201,169,110,0.30)',
      }}
      aria-live="polite"
      aria-label="Live updates ticker"
    >
      {/* LIVE label + pulsing dot */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div
          className="rounded-full bg-gold"
          style={{
            width:     '6px',
            height:    '6px',
            animation: 'tickerPulse 2s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
        <span
          className="font-mono uppercase text-gold"
          style={{ fontSize: '9px', letterSpacing: '3px' }}
        >
          LIVE
        </span>
      </div>

      {/* Separator */}
      <div className="w-px h-4 bg-gold-border shrink-0" aria-hidden="true" />

      {/* Insight text */}
      <p
        className="font-mono text-body-s text-text-secondary flex-1 truncate transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {insights[currentIndex]}
      </p>

      <style>{`
        @keyframes tickerPulse {
          0%, 100% { transform: scale(1.0); opacity: 1; }
          50%       { transform: scale(1.2); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
