// src/components/game/GameCard.jsx
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function GameCard({
  gameNumber,    // 1–4
  title,
  domain,        // emoji
  description,
  metaPills,     // array of strings
  accentColor,   // hex
  completed,
  score,
  onPlay,
}) {
  const [hovered, setHovered] = useState(false)
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className="relative cursor-pointer select-none overflow-hidden"
      style={{
        background:   hovered && !shouldReduce ? '#131E30' : '#111F32',
        border:       '1px solid rgba(255,255,255,0.07)',
        padding:      '28px',
        transition:   'background 0.2s ease',
        boxShadow:    hovered && !shouldReduce
          ? '0 24px 60px rgba(0,0,0,0.70)'
          : '0 8px 24px rgba(0,0,0,0.50)',
      }}
      animate={shouldReduce ? {} : { y: hovered ? -3 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onPlay}
      role="button"
      tabIndex={0}
      aria-label={`${title} — ${completed ? 'Completed, score ' + score + '. Play again' : 'Play now'}`}
      onKeyDown={(e) => e.key === 'Enter' && onPlay?.()}
    >
      {/* Top accent border — sweeps left→right on hover */}
      <div
        className="absolute top-0 left-0 h-[2px]"
        style={{
          background: accentColor,
          width:      hovered ? '100%' : '0%',
          transition: hovered
            ? 'width 350ms ease-out'
            : 'width 200ms ease-in',
        }}
        aria-hidden="true"
      />

      {/* Completed badge — top right */}
      {completed && (
        <div
          className="absolute top-4 right-4 flex items-center gap-1 font-mono uppercase"
          style={{ fontSize: '9px', letterSpacing: '2px', color: accentColor }}
        >
          <span>✓</span>
          <span>Complete</span>
        </div>
      )}

      {/* Game number tag */}
      <p
        className="font-heading font-bold uppercase mb-3"
        style={{ fontSize: '9px', letterSpacing: '3px', color: accentColor }}
      >
        GAME {String(gameNumber).padStart(2, '0')}
      </p>

      {/* Domain emoji */}
      <div className="text-3xl mb-3" aria-hidden="true">{domain}</div>

      {/* Title */}
      <h3
        className="font-heading font-extrabold text-text-primary mb-2"
        style={{ fontSize: '18px', lineHeight: '1.2' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="font-mono text-text-secondary mb-4"
        style={{ fontSize: '11px', lineHeight: '1.7' }}
      >
        {description}
      </p>

      {/* Meta pills */}
      {metaPills?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {metaPills.map((pill, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: accentColor }}
                  aria-hidden="true"
                />
              )}
              <span
                className="font-mono uppercase"
                style={{ fontSize: '9px', letterSpacing: '1px', color: '#566478' }}
              >
                {pill}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Score (if completed) */}
      {completed && score !== undefined && (
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-display font-semibold text-gold" style={{ fontSize: '28px' }}>
            {score}
          </span>
          <span className="font-mono text-text-muted" style={{ fontSize: '9px', letterSpacing: '2px' }}>
            PTS
          </span>
        </div>
      )}

      {/* CTA */}
      <div
        className="flex items-center gap-2 font-mono uppercase transition-colors duration-200"
        style={{
          fontSize:      '9px',
          letterSpacing: '2px',
          color:         hovered ? accentColor : '#566478',
        }}
      >
        <span>{completed ? 'Play again' : 'Play now'}</span>
        <span>→</span>
      </div>
    </motion.div>
  )
}
