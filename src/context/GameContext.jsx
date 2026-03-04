// src/context/GameContext.jsx
import { createContext, useContext, useState } from 'react'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [muted, setMuted] = useState(false)
  const [currentGame, setCurrentGame] = useState(null)

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
