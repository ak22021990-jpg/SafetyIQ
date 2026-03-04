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
        display:        'flex',
        alignItems:     'center',
        gap:            '8px',
        padding:        '12px 20px',
        background:     flagged ? 'rgba(232,25,44,0.10)' : 'rgba(255,255,255,0.04)',
        border:         `1px solid ${flagged ? 'rgba(232,25,44,0.50)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius:   '4px',
        cursor:         disabled ? 'not-allowed' : 'pointer',
        opacity:        disabled ? 0.5 : 1,
        transition:     shouldReduce ? 'none' : 'background 150ms, border-color 150ms',
        transform:      'scale(1)',
      }}
    >
      <span style={{ fontSize: '16px' }}>{flagged ? '⚑' : '⚐'}</span>
      <span
        className="font-mono uppercase font-bold"
        style={{
          fontSize:      '10px',
          letterSpacing: '1.5px',
          color:          flagged ? '#E8192C' : 'rgba(232,237,245,0.60)',
        }}
      >
        {flagged ? 'Flagged' : 'Flag violation'}
      </span>
    </button>
  )
}
