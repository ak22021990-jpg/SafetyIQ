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
      className="relative cursor-pointer select-none"
      style={{
        background:   '#FFFFFF',
        border:       'none',
        borderRadius: '16px',
        overflow:     'hidden',
        boxShadow:    hovered && !shouldReduce
          ? '0 20px 40px -8px rgba(15, 23, 42, 0.14), 0 8px 16px -4px rgba(15, 23, 42, 0.08)'
          : '0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
        transition:   'box-shadow 0.28s ease',
      }}
      animate={shouldReduce ? {} : { y: hovered ? -8 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onPlay}
      role="button"
      tabIndex={0}
      aria-label={`${title} — ${completed ? 'Completed, score ' + score + '. Play again' : 'Play now'}`}
      onKeyDown={(e) => e.key === 'Enter' && onPlay?.()}
    >
      {/* Header gradient + art section */}
      <div
        style={{
          position:   'relative',
          background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)',
          padding:    '28px 40px 0 40px',
          minHeight:  '72px',
        }}
      >
        {/* Game tag */}
        <p
          style={{
            fontFamily:    '"JetBrains Mono", "DM Mono", monospace',
            fontSize:      '10px',
            fontWeight:    600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color:         accentColor,
            margin:        0,
          }}
        >
          Game {String(gameNumber).padStart(2, '0')}
        </p>

        {/* Domain art — absolute, top-right, overlay blend */}
        {domain && (
          <div
            aria-hidden="true"
            style={{
              position:  'absolute',
              top:       '16px',
              right:     '28px',
              fontSize:  '52px',
              lineHeight: 1,
              mixBlendMode: 'overlay',
              opacity:   0.85,
              userSelect: 'none',
            }}
          >
            {domain}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '12px 40px 32px' }}>

        {/* Completed badge */}
        {completed && (
          <div style={{ marginBottom: '8px' }}>
            <span
              style={{
                fontFamily:    '"JetBrains Mono", "DM Mono", monospace',
                fontSize:      '10px',
                fontWeight:    600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color:         accentColor,
              }}
            >
              ✓ Done
            </span>
          </div>
        )}

        {/* Title — Inter Tight, 800, -0.04em tracking */}
        <h3
          style={{
            fontFamily:    '"Inter Tight", Inter, system-ui, sans-serif',
            fontSize:      '32px',
            fontWeight:    800,
            lineHeight:    '1.05',
            letterSpacing: '-0.04em',
            color:         '#0F172A',
            margin:        '0 0 10px 0',
          }}
        >
          {title}
        </h3>

        {/* Description — Inter body */}
        <p
          style={{
            fontFamily:   'Inter, system-ui, sans-serif',
            fontSize:     '13px',
            fontWeight:   400,
            lineHeight:   '1.6',
            color:        '#475569',
            margin:       '0 0 18px 0',
          }}
        >
          {description}
        </p>

        {/* Meta pill tags */}
        {metaPills?.length > 0 && (
          <div
            style={{
              display:   'flex',
              flexWrap:  'wrap',
              gap:       '6px',
              marginBottom: '20px',
            }}
          >
            {metaPills.map((pill, i) => (
              <span
                key={i}
                style={{
                  fontFamily:    '"JetBrains Mono", "DM Mono", monospace',
                  fontSize:      '10px',
                  fontWeight:    600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color:         accentColor,
                  background:    accentColor + '14',
                  border:        `1px solid ${accentColor}30`,
                  padding:       '3px 9px',
                  borderRadius:  '4px',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        )}

        {/* Score (if completed) — Playfair Display 900 italic */}
        {completed && score !== undefined && (
          <div
            style={{
              display:      'flex',
              alignItems:   'baseline',
              gap:          '8px',
              marginBottom: '20px',
              padding:      '10px 14px',
              background:   accentColor + '0E',
              border:       `1px solid ${accentColor}24`,
              borderRadius: '8px',
            }}
          >
            <span
              style={{
                fontFamily:  '"Playfair Display", Georgia, serif',
                fontSize:    '38px',
                fontWeight:  900,
                fontStyle:   'italic',
                color:       accentColor,
                lineHeight:  1,
              }}
            >
              {score}
            </span>
            <span
              style={{
                fontFamily:    '"JetBrains Mono", "DM Mono", monospace',
                fontSize:      '10px',
                fontWeight:    600,
                letterSpacing: '2px',
                color:         '#94A3B8',
              }}
            >
              PTS
            </span>
          </div>
        )}

        {/* CTA Button — Midnight Blue bg → Human Red on hover */}
        <div style={{ marginTop: '4px' }}>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onPlay?.() }}
            animate={shouldReduce ? {} : {
              backgroundColor: hovered ? '#E11D48' : '#0F172A',
            }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              padding:       '10px 20px',
              borderRadius:  '8px',
              border:        'none',
              cursor:        'pointer',
              minHeight:     '44px',
              minWidth:      'unset',
              backgroundColor: hovered ? '#E11D48' : '#0F172A',
            }}
          >
            <span
              style={{
                fontFamily:    '"JetBrains Mono", "DM Mono", monospace',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color:         '#FFFFFF',
              }}
            >
              {completed ? 'Play again' : 'Play now'}
            </span>
            <motion.span
              animate={shouldReduce ? {} : { x: hovered ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ fontSize: '16px', lineHeight: 1, color: '#FFFFFF' }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.button>
        </div>

      </div>
    </motion.div>
  )
}
