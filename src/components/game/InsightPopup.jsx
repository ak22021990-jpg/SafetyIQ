// src/components/game/InsightPopup.jsx
import Modal from '../ui/Modal'
import Button from '../ui/Button'

// Percentile thresholds: Elite = top 10%, Strong = top 40%
function getTier(timeTaken, wasCorrect) {
  if (!wasCorrect) return 'learning'
  if (timeTaken <= 30) return 'elite'
  if (timeTaken <= 60) return 'strong'
  return 'learning'
}

const TIER_CONFIG = {
  elite: {
    label:       'Elite Decision',
    color:       '#E11D48',
    bg:          'rgba(225,29,72,0.08)',
    border:      'rgba(225,29,72,0.25)',
    description: 'You\'re in the top 10% of reviewers on this type of case.',
  },
  strong: {
    label:       'Strong Call',
    color:       '#4A7FA5',
    bg:          'rgba(74,127,165,0.08)',
    border:      'rgba(74,127,165,0.25)',
    description: 'You\'re in the top 40% of reviewers on this type of case.',
  },
  learning: {
    label:       'Learning Opportunity',
    color:       '#94A3B8',
    bg:          'rgba(148,163,184,0.08)',
    border:      'rgba(148,163,184,0.20)',
    description: 'Most experienced reviewers approach this differently.',
  },
}

export default function InsightPopup({ open, caseData, wasCorrect, timeTaken, onContinue }) {
  if (!caseData) return null

  const tier   = getTier(timeTaken, wasCorrect)
  const config = TIER_CONFIG[tier]

  return (
    <Modal open={open} maxWidth="560px">
      <div className="flex flex-col gap-5">

        {/* Tier badge */}
        <div className="flex items-center gap-3">
          <div
            className="font-mono uppercase font-bold"
            style={{
              fontSize: '11px',
              letterSpacing: '2px',
              color: config.color,
              padding: '4px 10px',
              background: config.bg,
              border: `1px solid ${config.border}`,
              borderRadius: '4px',
            }}
          >
            {config.label}
          </div>
          <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
        </div>

        {/* Percentile context */}
        <p className="font-mono font-bold" style={{ fontSize: '14px', color: config.color }}>
          {config.description}
        </p>

        {/* Outcome indicator */}
        <div
          className="flex items-center gap-3 p-4"
          style={{
            background:   wasCorrect ? 'rgba(0,200,150,0.06)' : 'rgba(232,25,44,0.06)',
            border:       `1px solid ${wasCorrect ? 'rgba(0,200,150,0.30)' : 'rgba(232,25,44,0.30)'}`,
            borderRadius: '8px',
          }}
        >
          <span style={{ fontSize: '24px' }}>{wasCorrect ? '✓' : '✗'}</span>
          <div>
            <p
              className="font-heading font-bold"
              style={{ fontSize: '16px', color: wasCorrect ? '#00C896' : '#E8192C' }}
            >
              {wasCorrect ? 'Correct call.' : 'Not the recommended action.'}
            </p>
            {timeTaken <= 30 && wasCorrect && (
              <p className="font-mono mt-1" style={{ fontSize: '12px', color: '#475569' }}>
                +5 speed bonus — decision in {timeTaken}s
              </p>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div>
          <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: '10px', color: '#64748B' }}>
            What experienced reviewers know
          </p>
          <p className="font-mono" style={{ fontSize: '14px', lineHeight: '1.7', color: '#1E293B' }}>
            {caseData.insight.explanation}
          </p>
        </div>

        {/* Sutherland context line */}
        <div
          className="p-4"
          style={{
            background:   'rgba(225,29,72,0.06)',
            border:       '1px solid rgba(225,29,72,0.20)',
            borderRadius: '8px',
          }}
        >
          <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: '10px', color: '#E11D48' }}>
            Sutherland Perspective
          </p>
          <p className="font-mono italic" style={{ fontSize: '14px', lineHeight: '1.7', color: '#1E293B' }}>
            {caseData.insight.sutherlandLine}
          </p>
        </div>

        {/* Continue CTA */}
        <div className="flex justify-end mt-1">
          <Button variant="primary" showArrow onClick={onContinue}>
            Continue
          </Button>
        </div>

      </div>
    </Modal>
  )
}
