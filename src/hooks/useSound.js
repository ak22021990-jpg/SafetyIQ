// src/hooks/useSound.js
// Wraps soundEngine. Respects muted state from GameContext.
// init() is called on every playSound to satisfy browser autoplay policy.
import { useEffect, useCallback } from 'react'
import { useGame } from '../context/GameContext'
import { soundEngine } from '../utils/soundEngine'

export function useSound() {
  const { muted } = useGame()

  // Keep engine in sync with GameContext mute state
  useEffect(() => {
    soundEngine.setMuted(muted)
  }, [muted])

  const playSound = useCallback((type) => {
    soundEngine.init()
    if (type === 'badge') soundEngine.playBadge()
    else soundEngine.play(type)
  }, [])

  return playSound
}
