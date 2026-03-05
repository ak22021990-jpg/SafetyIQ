// src/components/game/SocialPostCard.jsx
// Pulse platform social post card — fictional platform, not resembling any real platform
import { motion, useReducedMotion } from 'framer-motion'

export default function SocialPostCard({
  caseData,
  selectedId,
  revealedCorrectId,
  state,            // 'active' | 'locked' | 'revealed'
  onChoiceSelect,
}) {
  const {
    avatar, username, handle, timeAgo, content,
    hasImage, imageDescription, videoSrc, videoTitle, videoDuration, engagementLikes, engagementComments, engagementShares,
    reportReason, reportCount, region, regionLabel,
    accountAge, accountNote, contextNote,
    choices,
  } = caseData

  const BASE_URL = import.meta.env.BASE_URL

  const shouldReduce = useReducedMotion()
  const isRevealed   = state === 'revealed'
  const isLocked     = state === 'locked' || isRevealed

  return (
    <div
      style={{
        background:   '#FFFFFF',
        border:       '1px solid #E2E8F0',
        borderRadius: '12px',
        overflow:     'hidden',
        boxShadow:    '0 4px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Pulse platform header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}
      >
        <div className="flex items-center gap-2">
          <span className="font-pulse font-bold" style={{ fontSize: '15px', color: '#4A6FA5', letterSpacing: '-0.3px' }}>Pulse</span>
          <span className="font-mono text-text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
            Share what matters.
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-text-muted" style={{ fontSize: '11px' }}>Content Review Queue</span>
        </div>
      </div>

      {/* Post content */}
      <div className="p-4">
        {/* Author */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="flex items-center justify-center shrink-0 font-mono font-bold text-white rounded-full"
            style={{ width: '40px', height: '40px', background: '#4A6FA5', fontSize: '14px' }}
            aria-hidden="true"
          >
            {avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono font-semibold text-text-primary" style={{ fontSize: '14px' }}>
                {username}
              </span>
              <span className="font-mono text-text-secondary" style={{ fontSize: '12px' }}>
                {handle} · {timeAgo}
              </span>
              <span className="font-mono text-text-muted" style={{ fontSize: '12px' }}>
                {region}
              </span>
            </div>
            {accountNote && (
              <p className="font-mono text-text-muted mt-0.5" style={{ fontSize: '11px' }}>
                {accountNote}
              </p>
            )}
          </div>
        </div>

        {/* Post text */}
        <p className="font-mono text-text-primary mb-3" style={{ fontSize: '15px', lineHeight: '1.7' }}>
          {content}
        </p>

        {/* Image placeholder */}
        {hasImage && (
          <div
            className="mb-3 flex items-center justify-center font-mono text-text-muted"
            style={{
              height:       '80px',
              background:   'rgba(74,111,165,0.06)',
              border:       '1px solid rgba(74,111,165,0.18)',
              borderRadius: '6px',
              fontSize:     '12px',
              padding:      '8px',
              lineHeight:   '1.5',
            }}
          >
            <span style={{ textAlign: 'center' }}>📷 {imageDescription}</span>
          </div>
        )}

        {/* Video */}
        {videoSrc && (
          <div className="mb-3" style={{ borderRadius: '6px', overflow: 'hidden', background: '#000' }}>
            <video
              src={`${BASE_URL}${videoSrc}`}
              controls
              muted
              playsInline
              style={{ width: '100%', maxHeight: '200px', display: 'block' }}
            />
            {videoTitle && (
              <div
                className="flex items-center justify-between font-mono px-2 py-1.5"
                style={{ background: 'rgba(0,0,0,0.6)', fontSize: '11px' }}
              >
                <span className="text-text-secondary">{videoTitle}</span>
                {videoDuration && <span className="text-text-muted">{videoDuration}</span>}
              </div>
            )}
          </div>
        )}

        {/* Context note */}
        {contextNote && (
          <div
            className="mb-3 font-mono text-text-secondary p-3"
            style={{
              fontSize:     '12px',
              lineHeight:   '1.6',
              background:   'rgba(232,168,48,0.07)',
              border:       '1px solid rgba(232,168,48,0.20)',
              borderRadius: '6px',
            }}
          >
            <span style={{ color: '#E8A830', fontWeight: 700 }}>Context: </span>{contextNote}
          </div>
        )}

        {/* Engagement bar */}
        <div
          className="flex items-center gap-4 font-mono text-text-muted pb-3 mb-3"
          style={{ fontSize: '12px', borderBottom: '1px solid #F1F5F9' }}
          aria-hidden="true"
        >
          <span>👍 {engagementLikes || '—'}</span>
          <span>💬 {engagementComments || '—'}</span>
          <span>↗ {engagementShares || '—'}</span>
        </div>

        {/* Report strip */}
        <div className="flex items-center justify-between font-mono" style={{ fontSize: '12px' }}>
          <div className="flex items-center gap-2">
            <span className="text-red-signal">⚑</span>
            <span className="text-text-secondary font-medium">{reportReason}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-text-muted">{reportCount.toLocaleString()} reports</span>
            {regionLabel && <span className="text-text-muted">{region} {regionLabel}</span>}
          </div>
        </div>
      </div>

      {/* Choice options */}
      <div
        style={{ borderTop: '1px solid #E2E8F0', padding: '16px', background: '#FAFAFA' }}
        role="group"
        aria-label="Select your moderation decision"
      >
        <p
          className="font-mono uppercase font-bold text-text-secondary mb-3"
          style={{ fontSize: '11px', letterSpacing: '1.5px' }}
        >
          Your Decision
        </p>
        <motion.div
          className="flex flex-col gap-2"
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {choices.map((choice) => {
            const isSelected = selectedId === choice.id
            const isCorrect  = isRevealed && choice.id === revealedCorrectId
            const isWrong    = isRevealed && isSelected && choice.id !== revealedCorrectId
            const isFaded    = isRevealed && !isSelected && choice.id !== revealedCorrectId

            let borderColor = '#E2E8F0'
            let bg          = '#FFFFFF'
            let leftBorder  = 'none'

            if (!isRevealed && isSelected) {
              bg          = 'rgba(201,169,110,0.08)'
              borderColor = 'rgba(201,169,110,0.50)'
            }
            if (isCorrect) {
              leftBorder = '3px solid #00C896'
              bg         = 'rgba(0,200,150,0.06)'
            }
            if (isWrong) {
              leftBorder = '3px solid #E8192C'
              bg         = 'rgba(232,25,44,0.06)'
            }

            return (
              <motion.button
                key={choice.id}
                variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } } }}
                onClick={() => !isLocked && onChoiceSelect?.(choice.id)}
                disabled={isLocked}
                className="w-full text-left transition-all duration-150 font-mono"
                style={{
                  padding:    '12px 14px',
                  background:  bg,
                  border:      `1px solid ${borderColor}`,
                  borderLeft:  leftBorder || `1px solid ${borderColor}`,
                  borderRadius: '6px',
                  opacity:     isFaded ? 0.35 : 1,
                  cursor:      isLocked ? 'default' : 'pointer',
                  fontSize:    '13px',
                  lineHeight:  '1.6',
                  color:       isCorrect ? '#00C896' : isWrong ? '#E8192C' : '#0F172A',
                }}
                aria-pressed={isSelected}
                aria-label={`Option ${choice.id.toUpperCase()}: ${choice.text}`}
              >
                <span
                  className="font-bold mr-2"
                  style={{ color: isCorrect ? '#00C896' : isWrong ? '#E8192C' : '#C9A96E' }}
                >
                  {choice.id.toUpperCase()}.
                </span>
                {choice.text}
                {isCorrect && <span className="ml-2" style={{ color: '#00C896' }}>✓</span>}
                {isWrong   && <span className="ml-2" style={{ color: '#E8192C' }}>✗</span>}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
