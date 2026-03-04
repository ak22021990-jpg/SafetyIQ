// src/components/layout/Topbar.jsx
// Fixed 64px topbar with per-game accent border

export default function Topbar({
  gameName    = '',
  accentColor = '#C9A96E',
  score       = null,
  gamesCompleted = 0,
  timerSlot   = null,        // inject <TimerRing /> here
  onLogoTap   = null,        // 5-tap to open staff panel (Phase 15)
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
        background:      'rgba(7,16,28,0.95)',
        backdropFilter:  'blur(12px)',
        borderTop:       `2px solid ${accentColor}`,
        borderBottom:    '1px solid rgba(255,255,255,0.06)',
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
        {/* ⚠️ REPLACE BEFORE SUMMIT: Add real sutherland-logo.png to public/ */}
        <div className="flex items-center gap-2">
          <div
            className="font-heading font-bold text-body-s tracking-widest text-text-primary uppercase"
            style={{ letterSpacing: '3px' }}
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
                  ? 'rgba(201,169,110,0.6)'
                  : 'rgba(255,255,255,0.15)',
              }}
              aria-label={i < gamesCompleted ? `Game ${i + 1} complete` : `Game ${i + 1} pending`}
            />
          ))}
        </div>
      </div>

      {/* Right: Score + timer */}
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
      </div>
    </div>
  )
}
