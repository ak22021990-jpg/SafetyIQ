// src/hooks/useLongPress.js
// Returns event handlers for an element. Fires `callback` after `ms` ms of
// continuous press/hold. Cancels cleanly on pointer-up or pointer-leave.
import { useRef, useCallback } from 'react'

export function useLongPress(callback, ms = 3000) {
  const timerRef = useRef(null)

  const start = useCallback(() => {
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      callback()
    }, ms)
  }, [callback, ms])

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  return {
    onPointerDown:  start,
    onPointerUp:    cancel,
    onPointerLeave: cancel,
    // Prevent context menu on long-press in mobile browsers
    onContextMenu: (e) => e.preventDefault(),
  }
}
