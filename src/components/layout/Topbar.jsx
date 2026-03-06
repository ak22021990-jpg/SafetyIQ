// src/components/layout/Topbar.jsx
// Fixed 64px topbar with per-game accent border

const BASE_URL = import.meta.env.BASE_URL

export default function Topbar({
  gameName    = '',
  accentColor = '#E11D48',
  score       = null,
  gamesCompleted = 0,
  timerSlot   = null,        // inject <TimerRing /> here
  onLogoTap   = null,        // 5-tap to open staff panel (Phase 15)
  onHomePress = null,        // show home button when provided
}) {
  // Logo tap counter for staff panel (Phase 15)
  let tapCount = 0
  let tapTimer = null

  const handleLogoTap = () => {
    tapCount++
    if (tapTimer) clearTimeout(tapTimer)
    tapTimer = setTimeout(() => { tapCount = 0 }, 2000)
    if (tapCount >= 5) {
      tapCount = 0
      onLogoTap?.()
    }
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
      style={{
        height:          '64px',
        background:      '#0F172A',
        backdropFilter:  'blur(12px)',
        borderTop:       `3px solid ${accentColor}`,
        borderBottom:    '1px solid rgba(255,255,255,0.08)',
      }}
      aria-label="Game navigation bar"
    >
      {/* Left: Logo */}
      <button
        onClick={handleLogoTap}
        className="flex items-center gap-3 focus:outline-none"
        aria-label="Sutherland logo"
        tabIndex={-1}
      >
        <div className="flex items-center gap-2">
          <img
            src={`${BASE_URL}images/sutherland-logo.png`}
            alt="Sutherland"
            style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'block'
            }}
          />
          {/* Fallback text — hidden when logo loads */}
          <div
            className="font-heading font-bold text-body-s tracking-widest text-text-primary uppercase"
            style={{ letterSpacing: '3px', display: 'none' }}
          >
            SUTHERLAND
          </div>
          <span className="text-text-muted text-micro">|</span>
          <div className="font-mono text-micro text-text-muted uppercase tracking-widest">
            Signal &amp; Noise
          </div>
        </div>
      </button>

      {/* Centre: Game name + progress dots */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        {gameName && (
          <span className="font-mono text-micro uppercase tracking-widest text-text-secondary">
            {gameName}
          </span>
        )}
        {/* Progress dots — 4 games */}
        <div className="flex items-center gap-1.5" aria-label="Game progress">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                width:        i < gamesCompleted ? '16px' : '6px',
                height:       '6px',
                borderRadius: '100px',
                background:   i < gamesCompleted
                  ? 'rgba(225,29,72,0.6)'
                  : 'rgba(255,255,255,0.15)',
              }}
              aria-label={i < gamesCompleted ? `Game ${i + 1} complete` : `Game ${i + 1} pending`}
            />
          ))}
        </div>
      </div>

      {/* Right: Score + timer + home */}
      <div className="flex items-center gap-4">
        {score !== null && (
          <div className="flex flex-col items-end">
            <span className="font-mono text-micro uppercase tracking-widest text-text-muted">
              Score
            </span>
            <span className="font-display font-semibold text-body-m text-gold">
              {score}
            </span>
          </div>
        )}
        {timerSlot && (
          <div aria-live="polite" aria-atomic="true">
            {timerSlot}
          </div>
        )}
        {onHomePress && (
          <button
            onClick={onHomePress}
            aria-label="Go to home screen"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'monospace',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            ⌂ Home
          </button>
        )}
      </div>
    </div>
  )
}
