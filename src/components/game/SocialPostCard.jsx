// src/components/game/SocialPostCard.jsx
// Pulse platform social post card — fictional platform, not resembling any real platform

export default function SocialPostCard({
  caseData,
  selectedId,
  revealedCorrectId,
  state,            // 'active' | 'locked' | 'revealed'
  onChoiceSelect,
}) {
  const {
    avatar, username, handle, timeAgo, content,
    hasImage, imageDescription, reportReason, reportCount, region, regionLabel,
    accountAge, accountNote, contextNote,
    choices,
  } = caseData

  const isRevealed = state === 'revealed'
  const isLocked   = state === 'locked' || isRevealed

  return (
    <div
      style={{
        background:   '#1A2535',
        border:       '1px solid rgba(255,255,255,0.09)',
        borderRadius: '10px',
        overflow:     'hidden',
      }}
    >
      {/* Pulse platform header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(74,111,165,0.08)' }}
      >
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-body-s" style={{ color: '#4A6FA5' }}>Pulse</span>
          <span className="font-mono text-text-muted" style={{ fontSize: '9px', letterSpacing: '1px' }}>
            Share what matters.
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-text-muted" style={{ fontSize: '9px' }}>Content Review Queue</span>
        </div>
      </div>

      {/* Post content */}
      <div className="p-4">
        {/* Author */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="flex items-center justify-center shrink-0 font-mono font-bold text-text-primary rounded-full"
            style={{ width: '36px', height: '36px', background: '#4A6FA5', fontSize: '12px' }}
            aria-hidden="true"
          >
            {avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono font-medium text-text-primary" style={{ fontSize: '13px' }}>
                {username}
              </span>
              <span className="font-mono text-text-secondary" style={{ fontSize: '11px' }}>
                {handle} · {timeAgo}
              </span>
              <span className="font-mono text-text-muted" style={{ fontSize: '11px' }}>
                {region}
              </span>
            </div>
            {accountNote && (
              <p className="font-mono text-text-muted mt-0.5" style={{ fontSize: '10px' }}>
                {accountNote}
              </p>
            )}
          </div>
        </div>

        {/* Post text */}
        <p className="font-mono text-text-primary mb-3" style={{ fontSize: '14px', lineHeight: '1.7' }}>
          {content}
        </p>

        {/* Image placeholder */}
        {hasImage && (
          <div
            className="mb-3 flex items-center justify-center font-mono text-text-muted"
            style={{
              height:     '80px',
              background: 'rgba(74,111,165,0.08)',
              border:     '1px solid rgba(74,111,165,0.20)',
              borderRadius: '4px',
              fontSize:   '10px',
              padding:    '8px',
              lineHeight: '1.5',
            }}
          >
            <span style={{ textAlign: 'center' }}>📷 {imageDescription}</span>
          </div>
        )}

        {/* Context note */}
        {contextNote && (
          <div
            className="mb-3 font-mono text-text-muted p-2"
            style={{
              fontSize:    '10px',
              lineHeight:  '1.5',
              background:  'rgba(232,168,48,0.08)',
              border:      '1px solid rgba(232,168,48,0.20)',
              borderRadius: '4px',
            }}
          >
            <span style={{ color: '#E8A830' }}>⚑ Context: </span>{contextNote}
          </div>
        )}

        {/* Engagement bar */}
        <div
          className="flex items-center gap-4 font-mono text-text-muted pb-3 mb-3"
          style={{ fontSize: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          aria-hidden="true"
        >
          <span>👍 —</span>
          <span>💬 —</span>
          <span>↗ —</span>
        </div>

        {/* Report strip */}
        <div className="flex items-center justify-between font-mono" style={{ fontSize: '10px' }}>
          <div className="flex items-center gap-2">
            <span className="text-red-signal">⚑</span>
            <span className="text-text-secondary">{reportReason}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-text-muted">{reportCount.toLocaleString()} reports</span>
            {regionLabel && <span className="text-text-muted">{region} {regionLabel}</span>}
          </div>
        </div>
      </div>

      {/* Choice options */}
      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px' }}
        role="group"
        aria-label="Select your moderation decision"
      >
        <p
          className="font-mono uppercase text-text-muted mb-3"
          style={{ fontSize: '9px', letterSpacing: '2px' }}
        >
          Your Decision
        </p>
        <div className="flex flex-col gap-2">
          {choices.map((choice) => {
            const isSelected = selectedId === choice.id
            const isCorrect  = isRevealed && choice.id === revealedCorrectId
            const isWrong    = isRevealed && isSelected && choice.id !== revealedCorrectId
            const isFaded    = isRevealed && !isSelected && choice.id !== revealedCorrectId

            let borderColor = 'rgba(255,255,255,0.09)'
            let bg          = 'transparent'
            let leftBorder  = 'none'

            if (!isRevealed && isSelected) {
              bg          = 'rgba(201,169,110,0.06)'
              borderColor = 'rgba(201,169,110,0.40)'
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
              <button
                key={choice.id}
                onClick={() => !isLocked && onChoiceSelect?.(choice.id)}
                disabled={isLocked}
                className="w-full text-left transition-all duration-150 font-mono"
                style={{
                  padding:     '10px 14px',
                  background:  bg,
                  border:      `1px solid ${borderColor}`,
                  borderLeft:  leftBorder || `1px solid ${borderColor}`,
                  opacity:     isFaded ? 0.35 : 1,
                  cursor:      isLocked ? 'default' : 'pointer',
                  fontSize:    '11px',
                  lineHeight:  '1.6',
                  color:       isCorrect ? '#00C896' : isWrong ? '#E8192C' : '#E8EDF5',
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
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
