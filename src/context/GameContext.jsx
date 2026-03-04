// src/context/GameContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem('sn_muted') === 'true' } catch { return false }
  })
  const [currentGame, setCurrentGame] = useState(null)

  // Persist mute preference across sessions
  useEffect(() => {
    try { localStorage.setItem('sn_muted', muted) } catch {}
  }, [muted])

  return (
    <GameContext.Provider value={{
      muted, setMuted,
      currentGame, setCurrentGame
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
