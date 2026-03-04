// src/components/game/OutputCard.jsx
// Renders social_post, chat, forum, or video card types for Red Team Roulette
import FlagButton from '../ui/FlagButton'

const ACCENT_RED = '#E8192C'

function CardHeader({ cardData }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,200,150,0.06)' }}
    >
      <div className="flex items-center gap-2">
        <span className="font-heading font-bold text-body-s" style={{ color: '#00C896' }}>Pulse</span>
        <span className="font-mono text-text-muted" style={{ fontSize: '9px', letterSpacing: '1px' }}>
          AI Output Review
        </span>
      </div>
      <span className="font-mono text-text-muted" style={{ fontSize: '9px' }}>
        {cardData.type === 'chat' ? 'Direct Message' : cardData.type === 'forum' ? 'Forum Post' : cardData.type === 'video' ? 'Video Ad' : 'Social Post'}
      </span>
    </div>
  )
}

function AuthorRow({ cardData }) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <div
        className="flex items-center justify-center shrink-0 font-mono font-bold text-text-primary rounded-full"
        style={{ width: '36px', height: '36px', background: '#00C896', fontSize: '12px', color: '#07101C' }}
        aria-hidden="true"
      >
        {cardData.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-mono font-medium text-text-primary" style={{ fontSize: '13px' }}>
            {cardData.username}
          </span>
          <span className="font-mono text-text-secondary" style={{ fontSize: '11px' }}>
            {cardData.handle} · {cardData.timeAgo}
          </span>
        </div>
      </div>
    </div>
  )
}

function EngagementBar({ cardData }) {
  if (!cardData.engagementLikes && !cardData.upvotes) return null
  if (cardData.upvotes) {
    return (
      <div className="flex items-center gap-3 font-mono text-text-muted pb-3 mb-3"
           style={{ fontSize: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
           aria-hidden="true">
        <span>▲ {cardData.upvotes}</span>
        {cardData.forumTopic && <span style={{ color: '#00C896' }}>{cardData.forumTopic}</span>}
      </div>
    )
  }
  return (
    <div className="flex items-center gap-4 font-mono text-text-muted pb-3 mb-3"
         style={{ fontSize: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
         aria-hidden="true">
      <span>👍 {cardData.engagementLikes}</span>
      <span>💬 {cardData.engagementComments}</span>
      <span>↗ {cardData.engagementShares}</span>
    </div>
  )
}

export default function OutputCard({ cardData, flagged, onToggleFlag, isRevealed, cardNumber, totalCards }) {
  const isViolation  = cardData.isViolation
  const isFalsePos   = isRevealed && flagged && !isViolation
  const isMissed     = isRevealed && !flagged && isViolation
  const isCorrect    = isRevealed && ((flagged && isViolation) || (!flagged && !isViolation))

  return (
    <div
      style={{
        background:   '#1A2535',
        border:       `1px solid ${isRevealed
          ? isCorrect ? 'rgba(0,200,150,0.30)' : 'rgba(232,25,44,0.30)'
          : 'rgba(255,255,255,0.09)'}`,
        borderRadius: '10px',
        overflow:     'hidden',
      }}
    >
      <CardHeader cardData={cardData} />

      <div className="p-4">
        <AuthorRow cardData={cardData} />

        {/* Video card */}
        {cardData.type === 'video' && (
          <div
            style={{
              height:       '110px',
              background:   'rgba(0,200,150,0.06)',
              border:       '1px solid rgba(0,200,150,0.15)',
              borderRadius: '6px',
              display:      'flex',
              flexDirection:'column',
              alignItems:   'center',
              justifyContent:'center',
              marginBottom: '12px',
            }}
          >
            <span style={{ fontSize: '28px', marginBottom: '6px' }}>▶</span>
            <p className="font-mono font-medium text-text-primary" style={{ fontSize: '12px' }}>
              {cardData.videoTitle}
            </p>
            <p className="font-mono text-text-muted" style={{ fontSize: '10px', marginTop: '2px' }}>
              {cardData.videoDuration} · ⚠️ No video file — review based on title & description
            </p>
          </div>
        )}

        {/* Chat context */}
        {cardData.type === 'chat' && cardData.context && (
          <div
            className="mb-3 font-mono text-text-muted p-2"
            style={{
              fontSize: '10px', lineHeight: '1.5',
              background: 'rgba(232,168,48,0.08)',
              border: '1px solid rgba(232,168,48,0.20)',
              borderRadius: '4px',
            }}
          >
            <span style={{ color: '#E8A830' }}>⚑ Context: </span>{cardData.context}
          </div>
        )}

        {/* Content text */}
        <p className="font-mono text-text-primary mb-3" style={{ fontSize: '13px', lineHeight: '1.7' }}>
          {cardData.content}
        </p>

        {/* Image placeholder */}
        {cardData.hasImage && cardData.imageDescription && (
          <div
            className="mb-3 flex items-center justify-center font-mono text-text-muted"
            style={{
              height: '70px', background: 'rgba(0,200,150,0.06)',
              border: '1px solid rgba(0,200,150,0.15)', borderRadius: '4px',
              fontSize: '10px', padding: '8px', lineHeight: '1.5',
            }}
          >
            <span style={{ textAlign: 'center' }}>📷 {cardData.imageDescription}</span>
          </div>
        )}

        <EngagementBar cardData={cardData} />

        {/* Flag action */}
        {!isRevealed && (
          <FlagButton flagged={flagged} onToggle={onToggleFlag} />
        )}

        {/* Revealed state */}
        {isRevealed && (
          <div>
            {/* Outcome badge */}
            <div
              style={{
                padding:      '10px 14px',
                background:   isCorrect ? 'rgba(0,200,150,0.08)' : 'rgba(232,25,44,0.08)',
                border:       `1px solid ${isCorrect ? 'rgba(0,200,150,0.30)' : 'rgba(232,25,44,0.30)'}`,
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              <p className="font-mono font-bold uppercase" style={{
                fontSize: '10px', letterSpacing: '1.5px',
                color: isCorrect ? '#00C896' : ACCENT_RED,
              }}>
                {isFalsePos && '✗ False Positive — Not a violation'}
                {isMissed   && '✗ Missed — This was a violation'}
                {isCorrect && flagged   && '✓ Correct — Violation flagged'}
                {isCorrect && !flagged  && '✓ Correct — Not a violation'}
              </p>
            </div>

            {/* Violation reason */}
            {isViolation && cardData.violationReason && (
              <p className="font-mono text-text-muted mb-2" style={{ fontSize: '10px', lineHeight: '1.5' }}>
                <span style={{ color: ACCENT_RED }}>Violation: </span>{cardData.violationReason}
              </p>
            )}

            {/* Insight */}
            <div
              style={{
                borderLeft: '2px solid #00C896',
                paddingLeft: '10px',
                paddingTop: '6px',
                paddingBottom: '6px',
              }}
            >
              <p className="font-mono text-text-secondary" style={{ fontSize: '10px', lineHeight: '1.55' }}>
                {cardData.insight}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
