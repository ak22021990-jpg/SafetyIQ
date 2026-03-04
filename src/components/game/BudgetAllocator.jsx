// src/components/game/BudgetAllocator.jsx
import { useState, useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

const ACCENT = '#E8A830'
const TOTAL_BUDGET = 10_000_000

function formatM(val) {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`
  if (val >= 1_000)     return `$${(val / 1_000).toFixed(0)}K`
  return `$${val}`
}

function VectorSlider({ vector, value, onChange, disabled }) {
  const trackRef       = useRef(null)
  const [hovered, setHovered] = useState(false)
  const shouldReduce   = useReducedMotion()
  const maxVal         = TOTAL_BUDGET

  const getVal = useCallback((clientX) => {
    if (!trackRef.current) return value
    const rect = trackRef.current.getBoundingClientRect()
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    // Snap to $100K increments
    return Math.round((pct * maxVal) / 100_000) * 100_000
  }, [value, maxVal])

  const handleMouseDown = (e) => {
    if (disabled) return
    onChange(getVal(e.clientX))
    const onMove = (ev) => onChange(getVal(ev.clientX))
    const onUp   = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const handleTouchStart = (e) => {
    if (disabled) return
    const touch = e.touches[0]
    onChange(getVal(touch.clientX))
    const onMove = (ev) => onChange(getVal(ev.touches[0].clientX))
    const onEnd  = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
  }

  const handleKeyDown = (e) => {
    if (disabled) return
    const step = 100_000
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp')   onChange(Math.min(maxVal, value + step))
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown') onChange(Math.max(0,      value - step))
  }

  const pct              = (value / maxVal) * 100
  const thresholdPct     = (vector.breachThreshold / maxVal) * 100
  const isBlocked        = value >= vector.breachThreshold
  const thumbActive      = hovered

  return (
    <div style={{ opacity: disabled ? 0.6 : 1 }}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '16px' }}>{vector.icon}</span>
          <div>
            <p className="font-mono font-medium text-text-primary" style={{ fontSize: '12px' }}>
              {vector.name}
            </p>
            <p className="font-mono" style={{ fontSize: '9px', color: vector.riskColor }}>
              {vector.riskLevel} Risk
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono font-bold" style={{ fontSize: '13px', color: isBlocked ? '#00C896' : ACCENT }}>
            {formatM(value)}
          </p>
          <p className="font-mono text-text-muted" style={{ fontSize: '9px' }}>
            min {formatM(vector.breachThreshold)}
          </p>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={maxVal}
        aria-valuenow={value}
        aria-label={`${vector.name} budget allocation`}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:   'relative',
          height:     '24px',
          display:    'flex',
          alignItems: 'center',
          cursor:     disabled ? 'not-allowed' : 'pointer',
          outline:    'none',
          userSelect: 'none',
          marginBottom: '12px',
        }}
      >
        {/* Track bg */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: '4px', borderRadius: '100px', background: 'rgba(255,255,255,0.10)' }} />
        {/* Fill */}
        <div style={{
          position: 'absolute', left: 0, width: pct + '%', height: '4px', borderRadius: '100px',
          background: isBlocked ? '#00C896' : ACCENT,
          transition: shouldReduce ? 'none' : 'width 30ms linear, background 200ms',
        }} />
        {/* Breach threshold marker */}
        <div style={{
          position:  'absolute',
          left:       thresholdPct + '%',
          width:     '2px',
          height:    '12px',
          background: 'rgba(255,255,255,0.35)',
          borderRadius: '1px',
          transform: 'translateX(-50%)',
        }} title={`Minimum: ${formatM(vector.breachThreshold)}`} />
        {/* Thumb */}
        <div style={{
          position:    'absolute',
          left:        `calc(${pct}% - ${thumbActive ? 11 : 9}px)`,
          width:        thumbActive ? '22px' : '18px',
          height:       thumbActive ? '22px' : '18px',
          borderRadius: '50%',
          background:   isBlocked ? '#00C896' : ACCENT,
          boxShadow:    thumbActive ? '0 0 0 4px rgba(232,168,48,0.20), 0 2px 8px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.4)',
          transition:   shouldReduce ? 'none' : 'width 120ms ease, height 120ms ease, left 30ms linear, background 200ms',
          pointerEvents:'none',
        }} />
      </div>

      {/* Description */}
      <p className="font-mono text-text-muted" style={{ fontSize: '10px', lineHeight: '1.5' }}>
        {vector.description.slice(0, 100)}…
      </p>
    </div>
  )
}

export default function BudgetAllocator({ vectors, allocations, onAllocate, disabled = false }) {
  const spent     = Object.values(allocations).reduce((a, b) => a + b, 0)
  const remaining = TOTAL_BUDGET - spent
  const isOver    = remaining < 0

  const handleChange = (vectorId, newVal) => {
    // Constrain: don't exceed total
    const otherSpend = spent - (allocations[vectorId] || 0)
    const clamped    = Math.min(newVal, TOTAL_BUDGET - otherSpend)
    onAllocate(vectorId, Math.max(0, clamped))
  }

  return (
    <div>
      {/* Budget header */}
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '12px 16px',
          background:     isOver ? 'rgba(232,25,44,0.08)' : 'rgba(232,168,48,0.08)',
          border:         `1px solid ${isOver ? 'rgba(232,25,44,0.30)' : 'rgba(232,168,48,0.20)'}`,
          borderRadius:   '6px',
          marginBottom:   '20px',
        }}
      >
        <div>
          <p className="font-mono uppercase text-text-muted" style={{ fontSize: '9px', letterSpacing: '2px' }}>
            Total Budget
          </p>
          <p className="font-mono font-bold text-text-primary" style={{ fontSize: '18px' }}>
            $10.0M
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono uppercase text-text-muted" style={{ fontSize: '9px', letterSpacing: '2px' }}>
            Remaining
          </p>
          <p className="font-mono font-bold" style={{ fontSize: '18px', color: isOver ? '#E8192C' : '#00C896' }}>
            {remaining >= 0 ? formatM(remaining) : `-${formatM(Math.abs(remaining))}`}
          </p>
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-5">
        {vectors.map(v => (
          <VectorSlider
            key={v.id}
            vector={v}
            value={allocations[v.id] || 0}
            onChange={(val) => handleChange(v.id, val)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}
