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
  image,         // illustration URL for right-side panel
  onPlay,
}) {
  const [hovered, setHovered] = useState(false)
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{
        background: '#FFFFFF',
        border: hovered && !shouldReduce
          ? `2px solid ${accentColor}`
          : `2px solid ${accentColor}55`,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: hovered && !shouldReduce
          ? `0 20px 40px -8px rgba(15, 23, 42, 0.14), 0 8px 16px -4px rgba(15, 23, 42, 0.08), 0 0 0 4px ${accentColor}22`
          : `0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.04), 0 0 0 0px ${accentColor}00`,
        transition: 'box-shadow 0.28s ease, border-color 0.28s ease',
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
      {/* Accent top bar */}
      <div
        aria-hidden="true"
        style={{
          height: '4px',
          background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}55 100%)`,
          position: 'relative',
          zIndex: 2,
        }}
      />

      {/* Image panel — starts at 30% from left, fades in with white overlay */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '30%',
              top: 0,
              right: '2%',
              bottom: 0,
              width: '68%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'right bottom',
              zIndex: 0,
            }}
          />
          {/* White gradient fade — covers leftmost 10% of the image */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '30%',
              top: 0,
              bottom: 0,
              width: '7%',   // 10% of the 70% image area
              background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)',
              zIndex: 1,
            }}
          />
        </>
      )}

      {/* Domain emoji fallback when no image */}
      {!image && domain && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            fontSize: '44px',
            lineHeight: 1,
            mixBlendMode: 'overlay',
            opacity: 0.85,
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          {domain}
        </div>
      )}

      {/* Body — content constrained to left ~58% so it stays clear of the image */}
      <div style={{ padding: '16px 24px 20px', position: 'relative', zIndex: 2, maxWidth: image ? '62%' : '100%' }}>

        {/* Completed badge */}
        {completed && (
          <div style={{ marginBottom: '8px' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: accentColor,
              }}
            >
              ✓ Done
            </span>
          </div>
        )}

        {/* Title — Inter Tight, 800, -0.04em tracking */}
        <h3
          className="font-heading-tight"
          style={{
            fontSize: '26px',
            fontWeight: 800,
            lineHeight: '1.05',
            letterSpacing: '-0.04em',
            color: '#0F172A',
            margin: '0 0 8px 0',
          }}
        >
          {title}
        </h3>

        {/* Description — Inter body */}
        <p
          className="font-heading"
          style={{
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '1.5',
            color: '#475569',
            margin: '0 0 12px 0',
          }}
        >
          {description}
        </p>

        {/* Meta pill tags */}
        {metaPills?.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '16px',
            }}
          >
            {metaPills.map((pill, i) => (
              <span
                key={i}
                className="font-mono"
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: accentColor,
                  background: accentColor + '14',
                  border: `1px solid ${accentColor}30`,
                  padding: '3px 9px',
                  borderRadius: '4px',
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
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '16px',
              padding: '8px 12px',
              background: accentColor + '0E',
              border: `1px solid ${accentColor}24`,
              borderRadius: '8px',
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: '38px',
                fontWeight: 900,
                fontStyle: 'italic',
                color: accentColor,
                lineHeight: 1,
              }}
            >
              {score}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '2px',
                color: '#94A3B8',
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
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              minHeight: '44px',
              minWidth: 'unset',
              backgroundColor: hovered ? '#E11D48' : '#0F172A',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
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
