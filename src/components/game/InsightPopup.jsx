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
    color:       '#E8C84A',
    description: 'You\'re in the top 10% of reviewers on this type of case.',
  },
  strong: {
    label:       'Strong Call',
    color:       '#C9A96E',
    description: 'You\'re in the top 40% of reviewers on this type of case.',
  },
  learning: {
    label:       'Learning Opportunity',
    color:       '#8899AA',
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
            className="font-mono uppercase"
            style={{ fontSize: '9px', letterSpacing: '3px', color: config.color }}
          >
            {config.label}
          </div>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Percentile context */}
        <p className="font-mono text-body-s" style={{ color: config.color }}>
          {config.description}
        </p>

        {/* Outcome indicator */}
        <div
          className="flex items-center gap-3 p-3"
          style={{
            background:  wasCorrect ? 'rgba(0,200,150,0.08)' : 'rgba(232,25,44,0.08)',
            border:      `1px solid ${wasCorrect ? 'rgba(0,200,150,0.30)' : 'rgba(232,25,44,0.30)'}`,
          }}
        >
          <span style={{ fontSize: '20px' }}>{wasCorrect ? '✓' : '✗'}</span>
          <div>
            <p
              className="font-heading font-bold text-body-s"
              style={{ color: wasCorrect ? '#00C896' : '#E8192C' }}
            >
              {wasCorrect ? 'Correct call.' : 'Not the recommended action.'}
            </p>
            {timeTaken <= 30 && wasCorrect && (
              <p className="font-mono text-text-muted" style={{ fontSize: '10px' }}>
                +5 speed bonus — decision in {timeTaken}s
              </p>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div>
          <p className="font-mono text-micro uppercase tracking-widest text-text-muted mb-2">
            What experienced reviewers know
          </p>
          <p className="font-mono text-body-s text-text-secondary" style={{ lineHeight: '1.7' }}>
            {caseData.insight.explanation}
          </p>
        </div>

        {/* Sutherland context line */}
        <div
          className="p-3"
          style={{
            background: 'rgba(201,169,110,0.06)',
            border:     '1px solid rgba(201,169,110,0.20)',
          }}
        >
          <p className="font-mono text-micro uppercase tracking-widest text-gold mb-1">
            Sutherland Perspective
          </p>
          <p className="font-mono text-body-s text-text-secondary italic" style={{ lineHeight: '1.7' }}>
            {caseData.insight.sutherlandLine}
          </p>
        </div>

        {/* Continue CTA */}
        <div className="flex justify-end mt-2">
          <Button variant="primary" showArrow onClick={onContinue}>
            Continue
          </Button>
        </div>

      </div>
    </Modal>
  )
}
