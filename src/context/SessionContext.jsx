// src/context/SessionContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { saveSession } from '../utils/storageEngine'

const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  const [player, setPlayer] = useState(null)
  const [scores, setScores] = useState({
    grayRoom: null, drawLine: null,
    threat: null, redTeam: null
  })
  const [badges, setBadges] = useState([])
  const [sessionId] = useState(() => crypto.randomUUID())

  // Persist on every change
  useEffect(() => {
    if (player) saveSession({ sessionId, player, scores, badges })
  }, [player, scores, badges])

  const registerPlayer = (data) => setPlayer(data)

  const updateScore = (game, scoreData) =>
    setScores(prev => ({
      ...prev,
      [game]: prev[game]
        ? { ...prev[game], ...scoreData, score: Math.max(prev[game].score, scoreData.score) }
        : scoreData
    }))

  const addBadge = (badge) =>
    setBadges(prev => prev.includes(badge) ? prev : [...prev, badge])

  const totalScore = Object.values(scores)
    .filter(Boolean)
    .reduce((sum, s) => sum + (s.score || 0), 0)

  const gamesCompleted = Object.values(scores).filter(Boolean).length

  return (
    <SessionContext.Provider value={{
      player, scores, badges, sessionId,
      totalScore, gamesCompleted,
      registerPlayer, updateScore, addBadge
    }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)
