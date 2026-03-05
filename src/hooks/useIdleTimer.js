// src/hooks/useIdleTimer.js
// Fires `onIdle` after `ms` ms of no pointer/touch/keyboard activity.
// Resets on any interaction. Clean on unmount.
import { useEffect, useRef } from 'react'

const EVENTS = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'scroll']

export function useIdleTimer(onIdle, ms = 60_000) {
  const timerRef   = useRef(null)
  const onIdleRef  = useRef(onIdle)
  onIdleRef.current = onIdle

  useEffect(() => {
    const reset = () => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => onIdleRef.current?.(), ms)
    }

    reset()
    EVENTS.forEach(ev => window.addEventListener(ev, reset, { passive: true }))

    return () => {
      clearTimeout(timerRef.current)
      EVENTS.forEach(ev => window.removeEventListener(ev, reset))
    }
  }, [ms])
}
