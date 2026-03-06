// src/components/layout/TickerBanner.jsx
// Fixed bottom ticker — 48px, cross-fade rotation, live stats from tickerEngine.
import { useState, useEffect, useRef } from 'react'
import { getAllSessions } from '../../utils/storageEngine'
import { calculateTickerStats, STATIC_INSIGHTS } from '../../utils/tickerEngine'

function loadInsights() {
  const sessions = getAllSessions()
  return calculateTickerStats(sessions)
}

export default function TickerBanner() {
  const [insights,      setInsights]      = useState(STATIC_INSIGHTS)
  const [currentIndex,  setCurrentIndex]  = useState(0)
  const [visible,       setVisible]       = useState(true)
  const rotateRef = useRef(null)

  // Refresh insights from localStorage (storage event + once on mount)
  useEffect(() => {
    const refresh = () => setInsights(loadInsights())
    refresh()
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  // Reset index when insight list changes (avoid out-of-bounds)
  useEffect(() => {
    setCurrentIndex(0)
  }, [insights])

  // Rotate every 6s with cross-fade
  useEffect(() => {
    rotateRef.current = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex(i => (i + 1) % insights.length)
        setVisible(true)
      }, 500)
    }, 6000)
    return () => clearInterval(rotateRef.current)
  }, [insights])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-6 gap-4"
      style={{
        height:         '48px',
        background:     'rgba(7,16,28,0.96)',
        backdropFilter: 'blur(12px)',
        borderTop:      '1px solid rgba(225,29,72,0.30)',
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
        className="font-mono text-body-s text-text-secondary flex-1 truncate"
        style={{
          opacity:    visible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {insights[currentIndex] ?? insights[0]}
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
