// src/components/ui/TimerRing.jsx
// SVG stroke-dashoffset timer — CSS animation only (not Framer Motion)
import { useEffect, useRef } from 'react'

const RADIUS       = 20
const STROKE_WIDTH = 3
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function TimerRing({ seconds, maxSeconds, onExpire }) {
  const hasExpiredRef = useRef(false)

  const progress    = Math.max(0, seconds / maxSeconds)
  const dashOffset  = CIRCUMFERENCE * (1 - progress)
  const isUrgent    = seconds <= 10
  const strokeColor = isUrgent ? '#E8192C' : '#C9A96E'
  const size        = RADIUS * 2 + STROKE_WIDTH * 2

  useEffect(() => {
    if (seconds <= 0 && !hasExpiredRef.current) {
      hasExpiredRef.current = true
      onExpire?.()
    }
    if (seconds > 0) {
      hasExpiredRef.current = false
    }
  }, [seconds, onExpire])

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      role="timer"
      aria-label={`${seconds} seconds remaining`}
    >
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={STROKE_WIDTH}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="butt"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }}
        />
      </svg>

      {/* Counter text */}
      <span
        className="absolute font-display font-semibold"
        style={{
          fontSize: '12px',
          color: strokeColor,
          transition: 'color 0.3s ease',
          animation: isUrgent ? 'timerPulse 0.5s ease-in-out infinite alternate' : 'none',
        }}
        aria-hidden="true"
      >
        {seconds}
      </span>

      <style>{`
        @keyframes timerPulse {
          from { transform: scale(1.0); }
          to   { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
