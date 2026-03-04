// src/hooks/useBadgeUnlock.js
import { useEffect } from 'react'
import { useSession } from '../context/SessionContext'
import { evaluateBadges } from '../utils/badgeEngine'

/**
 * useBadgeUnlock(game)
 * Call this inside a game-complete handler.
 * Evaluates all badge conditions and adds newly earned ones to session.
 */
export function useBadgeUnlock() {
  const { player, scores, badges, sessionId, totalScore, gamesCompleted, addBadge } = useSession()

  const unlock = () => {
    const sessionData = { player, scores, badges, sessionId, totalScore, gamesCompleted }
    const earned = evaluateBadges(sessionData)
    earned.forEach(badgeId => {
      if (!badges.includes(badgeId)) {
        addBadge(badgeId)
      }
    })
    return earned
  }

  return { unlock }
}
