// src/components/ui/FlagButton.jsx
import { useReducedMotion } from 'framer-motion'

export default function FlagButton({ flagged, onToggle, disabled = false }) {
  const shouldReduce = useReducedMotion()

  return (
    <button
      onClick={() => !disabled && onToggle?.()}
      disabled={disabled}
      aria-pressed={flagged}
      aria-label={flagged ? 'Remove flag' : 'Flag as violation'}
      style={{
        display:      'flex',
        alignItems:   'center',
        gap:          '8px',
        padding:      '12px 20px',
        background:   flagged ? 'rgba(232,25,44,0.08)' : '#F8FAFC',
        border:       `1px solid ${flagged ? 'rgba(232,25,44,0.40)' : '#E2E8F0'}`,
        borderRadius: '6px',
        cursor:       disabled ? 'not-allowed' : 'pointer',
        opacity:      disabled ? 0.5 : 1,
        transition:   shouldReduce ? 'none' : 'background 150ms, border-color 150ms',
      }}
    >
      <span style={{ fontSize: '18px' }}>{flagged ? '⚑' : '⚐'}</span>
      <span
        className="font-mono uppercase font-bold"
        style={{
          fontSize:      '12px',
          letterSpacing: '1.5px',
          color:          flagged ? '#E8192C' : '#475569',
        }}
      >
        {flagged ? 'Flagged' : 'Flag violation'}
      </span>
    </button>
  )
}
