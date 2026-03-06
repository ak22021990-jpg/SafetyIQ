// src/components/selfie/NoCameraFallback.jsx
// Shown when camera permission is denied.
// "Generate card without photo →" creates an initials-based avatar instead.

export default function NoCameraFallback({ playerName = '', onContinue }) {
  const initials = playerName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0] || '')
    .join('')
    .toUpperCase() || '?'

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-6">
      {/* Initials avatar preview */}
      <div
        style={{
          width:          '120px',
          height:         '120px',
          borderRadius:   '50%',
          background:     '#4A6FA5',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        <span className="font-heading font-extrabold text-white" style={{ fontSize: '42px' }}>
          {initials}
        </span>
      </div>

      <div>
        <p className="font-heading font-bold text-text-primary mb-2" style={{ fontSize: '16px' }}>
          Camera access needed for your Summit Card
        </p>
        <p className="font-mono text-text-muted" style={{ fontSize: '11px', lineHeight: '1.5' }}>
          Your card will be created with an initials avatar instead.
        </p>
      </div>

      <button
        onClick={() => onContinue(initials)}
        className="font-mono uppercase tracking-widest"
        style={{
          fontSize: '10px', letterSpacing: '2px', padding: '13px 24px',
          background: '#E11D48', color: '#07101C',
          fontWeight: 700, border: 'none', borderRadius: '4px', cursor: 'pointer',
        }}
      >
        Generate card without photo →
      </button>
    </div>
  )
}
