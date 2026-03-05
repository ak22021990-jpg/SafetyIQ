// src/components/ui/Slider.jsx
import { useState, useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function Slider({
  label,
  value,
  onChange,
  disabled = false,
  leftLabel = 'Low',
  rightLabel = 'High',
  accentColor = '#C9A96E',
}) {
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef(null)
  const shouldReduce = useReducedMotion()

  const getValueFromEvent = useCallback((clientX) => {
    if (!trackRef.current) return value
    const rect = trackRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return Math.round(pct * 100)
  }, [value])

  const handleMouseDown = (e) => {
    if (disabled) return
    setDragging(true)
    onChange(getValueFromEvent(e.clientX))

    const onMove = (ev) => onChange(getValueFromEvent(ev.clientX))
    const onUp   = () => { setDragging(false); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const handleTouchStart = (e) => {
    if (disabled) return
    const touch = e.touches[0]
    onChange(getValueFromEvent(touch.clientX))

    const onMove = (ev) => onChange(getValueFromEvent(ev.touches[0].clientX))
    const onEnd  = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
  }

  const handleKeyDown = (e) => {
    if (disabled) return
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp')   onChange(Math.min(100, value + 5))
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown') onChange(Math.max(0, value - 5))
    if (e.key === 'Home') onChange(0)
    if (e.key === 'End')  onChange(100)
  }

  const fillPct = value + '%'
  const thumbActive = hovered || dragging

  return (
    <div style={{ opacity: disabled ? 0.45 : 1 }}>
      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono uppercase font-bold text-text-secondary" style={{ fontSize: '11px', letterSpacing: '1.5px' }}>
          {label}
        </span>
        {/* Floating value badge */}
        <span
          className="font-mono font-bold"
          style={{
            fontSize:    '13px',
            color:       accentColor,
            transition:  shouldReduce ? 'none' : 'color 150ms',
          }}
        >
          {value}
        </span>
      </div>

      {/* Track area */}
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label={label}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          height:   '20px',
          display:  'flex',
          alignItems: 'center',
          cursor:   disabled ? 'not-allowed' : 'pointer',
          outline:  'none',
          userSelect: 'none',
        }}
      >
        {/* Track background */}
        <div
          style={{
            position:     'absolute',
            left:          0,
            right:         0,
            height:        '4px',
            borderRadius:  '100px',
            background:    '#E2E8F0',
          }}
        />
        {/* Track fill */}
        <div
          style={{
            position:     'absolute',
            left:          0,
            width:         fillPct,
            height:        '4px',
            borderRadius:  '100px',
            background:    accentColor,
            transition:    shouldReduce ? 'none' : 'width 30ms linear',
          }}
        />
        {/* Thumb */}
        <div
          style={{
            position:     'absolute',
            left:          `calc(${fillPct} - ${thumbActive ? 12 : 10}px)`,
            width:          thumbActive ? '24px' : '20px',
            height:         thumbActive ? '24px' : '20px',
            borderRadius:  '50%',
            background:     accentColor,
            boxShadow:      thumbActive ? `0 0 0 4px rgba(201,169,110,0.20), 0 2px 8px rgba(0,0,0,0.5)` : '0 2px 6px rgba(0,0,0,0.4)',
            transition:     shouldReduce ? 'none' : 'width 120ms ease, height 120ms ease, left 30ms linear, box-shadow 150ms',
            pointerEvents:  'none',
          }}
        />
      </div>

      {/* End labels */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="font-mono text-text-muted" style={{ fontSize: '11px' }}>{leftLabel}</span>
        <span className="font-mono text-text-muted" style={{ fontSize: '11px' }}>{rightLabel}</span>
      </div>
    </div>
  )
}
