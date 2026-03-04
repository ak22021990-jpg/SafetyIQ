// src/components/ui/StatusLabel.jsx
// Always colour + icon + label — never colour alone

const STATUS_CONFIG = {
  correct: {
    label: 'Nice catch',
    icon:  '✓',
    color: 'text-green-signal',
    bg:    'bg-green-dim',
    border: 'border-green-signal/30',
  },
  missed: {
    label: 'Slipped through',
    icon:  '✗',
    color: 'text-red-signal',
    bg:    'bg-red-dim',
    border: 'border-red-signal/30',
  },
  blocked: {
    label: 'Blocked.',
    icon:  '🛡',
    color: 'text-green-signal',
    bg:    'bg-green-dim',
    border: 'border-green-signal/30',
  },
  breached: {
    label: 'Got through.',
    icon:  '⚠',
    color: 'text-red-signal',
    bg:    'bg-red-dim',
    border: 'border-red-signal/30',
  },
  pending: {
    label: 'Pending',
    icon:  '●',
    color: 'text-amber-warm',
    bg:    'bg-amber-dim',
    border: 'border-amber-warm/30',
  },
}

export default function StatusLabel({ status, className = '' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-mono text-micro uppercase tracking-widest
        border px-2 py-1
        ${config.color} ${config.bg} ${config.border}
        ${className}
      `}
      role="status"
      aria-label={config.label}
    >
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  )
}
