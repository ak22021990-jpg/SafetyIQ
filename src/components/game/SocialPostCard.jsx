// src/components/game/SocialPostCard.jsx
// White card on dark background — image-first layout with 2×2 decision grid
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ZoomIn, X } from 'lucide-react'

export default function SocialPostCard({
  caseData,
  selectedId,
  revealedCorrectId,
  state,
  onChoiceSelect,
  caseImage,
}) {
  const [imageZoomed, setImageZoomed] = useState(false)
  const {
    avatar, username, handle, timeAgo, content,
    videoSrc, videoTitle, videoDuration,
    reportReason, reportCount, region,
    accountNote, contextNote,
    choices,
  } = caseData

  const BASE_URL = import.meta.env.BASE_URL
  const shouldReduce = useReducedMotion()
  const isRevealed = state === 'revealed'
  const isLocked = state === 'locked' || isRevealed

  return (
    <>
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        }}
      >
        {/* ── Scenario image ─────────────────────────────────── */}
        {caseImage ? (
          <div style={{ position: 'relative', background: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
            <img
              src={caseImage}
              alt="Case scenario"
              style={{ width: '100%', maxHeight: '260px', objectFit: 'contain', display: 'block', cursor: 'zoom-in' }}
              onClick={() => setImageZoomed(true)}
            />
            <button
              onClick={() => setImageZoomed(true)}
              aria-label="Expand image"
              style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(15,23,42,0.75)', color: '#fff', borderRadius: '6px', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', cursor: 'pointer', minHeight: 'auto', minWidth: 'auto', border: 'none', fontFamily: 'monospace', letterSpacing: '0.3px' }}
            >
              <ZoomIn size={13} /> Expand
            </button>
          </div>
        ) : (
          /* Fallback: show post text when no image is available */
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px', background: '#F8FAFC' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div aria-hidden="true" style={{ width: '36px', height: '36px', background: '#4A6FA5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'monospace', fontWeight: 700, color: '#fff', fontSize: '12px' }}>
                {avatar}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '13px', color: '#0F172A' }}>{username}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#64748B' }}>{handle} · {timeAgo} · {region}</span>
                </div>
                {accountNote && <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>{accountNote}</p>}
              </div>
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.65', color: '#1E293B', margin: 0 }}>{content}</p>
            {videoSrc && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
                <video src={`${BASE_URL}${videoSrc}`} controls muted playsInline style={{ width: '100%', maxHeight: '180px', display: 'block' }} />
                {videoTitle && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(0,0,0,0.6)', fontFamily: 'monospace', fontSize: '11px' }}>
                    <span style={{ color: '#94A3B8' }}>{videoTitle}</span>
                    {videoDuration && <span style={{ color: '#64748B' }}>{videoDuration}</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Context / report strip ─────────────────────────── */}
        {(contextNote || reportReason) && (
          <div style={{ padding: '10px 18px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', background: '#FAFAFA' }}>
            {contextNote && (
              <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#475569', lineHeight: '1.5', flex: 1 }}>
                <span style={{ color: '#B45309', fontWeight: 700 }}>Context: </span>{contextNote}
              </div>
            )}
            {reportReason && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'monospace', fontSize: '11px', color: '#64748B', flexShrink: 0 }}>
                <span style={{ color: '#DC2626' }}>⚑</span>
                <span style={{ color: '#475569', fontWeight: 600 }}>{reportReason}</span>
                <span>· {reportCount?.toLocaleString()} reports</span>
              </div>
            )}
          </div>
        )}

        {/* ── Decision section ───────────────────────────────── */}
        <div style={{ padding: '16px 18px', background: '#F8FAFC' }}>
          {/* Question */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '3px', fontWeight: 600 }}>
              Your Decision
            </p>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0F172A', lineHeight: '1.3', margin: 0 }}>
              What is your decision on the reported scenario?
            </p>
          </div>

          {/* 2×2 choice grid */}
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}
            initial={shouldReduce ? false : 'hidden'}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            role="group"
            aria-label="Select your moderation decision"
          >
            {choices.map((choice) => {
              const isSelected = selectedId === choice.id
              const isCorrect = isRevealed && choice.id === revealedCorrectId
              const isWrong = isRevealed && isSelected && choice.id !== revealedCorrectId
              const isFaded = isRevealed && !isSelected && choice.id !== revealedCorrectId

              // Split text into action title + reasoning description
              const parts = choice.text.split(' — ')
              const title = parts[0]
              const description = parts.slice(1).join(' — ')

              let bg = '#0F172A'
              let borderColor = '#1E293B'
              let titleColor = '#F8FAFC'
              let descColor = '#94A3B8'

              if (!isRevealed && isSelected) {
                bg = '#7F1D2E'
                borderColor = '#E11D48'
                titleColor = '#FFFFFF'
                descColor = '#FDA4AF'
              }
              if (isCorrect) {
                bg = '#064E3B'
                borderColor = '#00C896'
                titleColor = '#6EE7B7'
                descColor = '#A7F3D0'
              }
              if (isWrong) {
                bg = '#450A0A'
                borderColor = '#E8192C'
                titleColor = '#FCA5A5'
                descColor = '#FCA5A5'
              }

              return (
                <motion.button
                  key={choice.id}
                  variants={shouldReduce ? undefined : {
                    hidden: { opacity: 0, y: 6 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } },
                  }}
                  onClick={() => !isLocked && onChoiceSelect?.(choice.id)}
                  disabled={isLocked}
                  style={{
                    padding: '12px 14px',
                    background: bg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    textAlign: 'left',
                    opacity: isFaded ? 0.3 : 1,
                    cursor: isLocked ? 'default' : 'pointer',
                    transition: 'all 0.15s',
                    minHeight: 'auto',
                    minWidth: 'auto',
                  }}
                  aria-pressed={isSelected}
                  aria-label={choice.text}
                >
                  {/* Action title */}
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '13px',
                      fontWeight: 700,
                      lineHeight: '1.3',
                      color: titleColor,
                      marginBottom: description ? '4px' : 0,
                    }}
                  >
                    {title}
                    {isCorrect && <span style={{ marginLeft: '6px', color: '#00C896' }}>✓</span>}
                    {isWrong && <span style={{ marginLeft: '6px', color: '#E8192C' }}>✗</span>}
                  </span>
                  {/* Description */}
                  {description && (
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'monospace',
                        fontSize: '10px',
                        lineHeight: '1.5',
                        color: descColor,
                      }}
                    >
                      {description}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Image zoom overlay — position:fixed escapes overflow:hidden */}
      {imageZoomed && caseImage && (
        <div
          onClick={() => setImageZoomed(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.90)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setImageZoomed(false) }}
            aria-label="Close expanded image"
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: 'auto', minWidth: 'auto', border: 'none' }}
          >
            <X size={20} />
          </button>
          <img
            src={caseImage}
            alt="Case scenario — expanded"
            style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '10px', objectFit: 'contain', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
            onClick={(e) => e.stopPropagation()}
          />
          <p style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
            Click anywhere to close
          </p>
        </div>
      )}
    </>
  )
}
