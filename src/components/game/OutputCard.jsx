// src/components/game/OutputCard.jsx
// Renders social_post, chat, forum, or video card types for Red Team Roulette
import FlagButton from '../ui/FlagButton'
import neuravanceVid from '../../assets/videos/neuravance-ad.mp4'
import yieldvaultVid from '../../assets/videos/yieldvault-ad.mp4'

const VIDEO_SRCS = {
  neuravance: neuravanceVid,
  yieldvault: yieldvaultVid,
}

const ACCENT_RED = '#E8192C'

function CardHeader({ cardData }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5"
      style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}
    >
      <div className="flex items-center gap-2">
        <span className="font-pulse font-bold" style={{ fontSize: '15px', color: '#00C896', letterSpacing: '-0.3px' }}>Pulse</span>
        <span className="font-mono text-slate-500" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
          AI Output Review
        </span>
      </div>
      <span className="font-mono text-slate-500" style={{ fontSize: '11px' }}>
        {cardData.type === 'chat' ? 'Direct Message' : cardData.type === 'forum' ? 'Forum Post' : cardData.type === 'video' ? 'Video Ad' : 'Social Post'}
      </span>
    </div>
  )
}

function AuthorRow({ cardData }) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <div
        className="flex items-center justify-center shrink-0 font-mono font-bold rounded-full"
        style={{ width: '38px', height: '38px', background: '#00C896', fontSize: '13px', color: '#FFFFFF' }}
        aria-hidden="true"
      >
        {cardData.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-mono font-semibold text-midnight" style={{ fontSize: '14px' }}>
            {cardData.username}
          </span>
          <span className="font-mono text-slate-600" style={{ fontSize: '12px' }}>
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
      <div className="flex items-center gap-3 font-mono text-slate-500 pb-3 mb-3"
        style={{ fontSize: '12px', borderBottom: '1px solid #F1F5F9' }}
        aria-hidden="true">
        <span>▲ {cardData.upvotes}</span>
        {cardData.forumTopic && <span style={{ color: '#00C896', fontWeight: 600 }}>{cardData.forumTopic}</span>}
      </div>
    )
  }
  return (
    <div className="flex items-center gap-4 font-mono text-slate-500 pb-3 mb-3"
      style={{ fontSize: '12px', borderBottom: '1px solid #F1F5F9' }}
      aria-hidden="true">
      <span>👍 {cardData.engagementLikes}</span>
      <span>💬 {cardData.engagementComments}</span>
      <span>↗ {cardData.engagementShares}</span>
    </div>
  )
}

export default function OutputCard({ cardData, flagged, onToggleFlag, isRevealed, cardNumber, totalCards }) {
  const isViolation = cardData.isViolation
  const isFalsePos = isRevealed && flagged && !isViolation
  const isMissed = isRevealed && !flagged && isViolation
  const isCorrect = isRevealed && ((flagged && isViolation) || (!flagged && !isViolation))

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: `1px solid ${isRevealed
          ? isCorrect ? 'rgba(0,200,150,0.35)' : 'rgba(232,25,44,0.35)'
          : '#E2E8F0'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <CardHeader cardData={cardData} />

      <div className="p-4">
        <AuthorRow cardData={cardData} />

        {/* Video card */}
        {cardData.type === 'video' && (
          <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '12px', background: '#000' }}>
            {VIDEO_SRCS[cardData.videoId] ? (
              <video
                src={VIDEO_SRCS[cardData.videoId]}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', display: 'block', maxHeight: '360px', objectFit: 'contain', background: '#000' }}
              />
            ) : (
              <div
                style={{
                  height: '100px',
                  background: 'rgba(0,200,150,0.06)',
                  border: '1px solid rgba(0,200,150,0.18)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '28px', marginBottom: '6px' }}>▶</span>
                <p className="font-mono font-semibold text-midnight" style={{ fontSize: '13px' }}>
                  {cardData.videoTitle}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Chat context */}
        {cardData.type === 'chat' && cardData.context && (
          <div
            className="mb-3 font-mono text-slate-600 p-3"
            style={{
              fontSize: '12px', lineHeight: '1.55',
              background: 'rgba(232,168,48,0.07)',
              border: '1px solid rgba(232,168,48,0.20)',
              borderRadius: '6px',
            }}
          >
            <span style={{ color: '#E8A830', fontWeight: 700 }}>Context: </span>{cardData.context}
          </div>
        )}

        {/* Content text */}
        <p className="font-mono text-midnight mb-3" style={{ fontSize: '14px', lineHeight: '1.7' }}>
          {cardData.content}
        </p>

        {/* Image placeholder */}
        {cardData.hasImage && cardData.imageDescription && (
          <div
            className="mb-3 flex items-center justify-center font-mono text-slate-500"
            style={{
              height: '70px', background: 'rgba(0,200,150,0.05)',
              border: '1px solid rgba(0,200,150,0.15)', borderRadius: '6px',
              fontSize: '12px', padding: '8px', lineHeight: '1.5',
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
                padding: '12px 14px',
                background: isCorrect ? 'rgba(0,200,150,0.07)' : 'rgba(232,25,44,0.07)',
                border: `1px solid ${isCorrect ? 'rgba(0,200,150,0.30)' : 'rgba(232,25,44,0.30)'}`,
                borderRadius: '6px',
                marginBottom: '10px',
              }}
            >
              <p className="font-mono font-bold uppercase" style={{
                fontSize: '12px', letterSpacing: '1.5px',
                color: isCorrect ? '#00C896' : ACCENT_RED,
              }}>
                {isFalsePos && '✗ False Positive — Not a violation'}
                {isMissed && '✗ Missed — This was a violation'}
                {isCorrect && flagged && '✓ Correct — Violation flagged'}
                {isCorrect && !flagged && '✓ Correct — Not a violation'}
              </p>
            </div>

            {/* Violation reason */}
            {isViolation && cardData.violationReason && (
              <p className="font-mono text-slate-600 mb-2" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                <span style={{ color: ACCENT_RED, fontWeight: 700 }}>Violation: </span>{cardData.violationReason}
              </p>
            )}

            {/* Insight */}
            <div
              style={{
                borderLeft: '3px solid #00C896',
                paddingLeft: '12px',
                paddingTop: '6px',
                paddingBottom: '6px',
              }}
            >
              <p className="font-mono text-slate-600" style={{ fontSize: '12px', lineHeight: '1.6' }}>
                {cardData.insight}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
