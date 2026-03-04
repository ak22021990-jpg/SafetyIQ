// src/utils/tickerEngine.js
// Computes live ticker insight strings from the full sessions array.
// Returns static fallback when fewer than 3 sessions exist.

const MAX_SCORES = { grayRoom: 160, drawLine: 50, threat: 48, redTeam: 60 }

// ⚠️ REPLACE BEFORE SUMMIT: Verify these with real Sutherland stats
export const STATIC_INSIGHTS = [
  'Sutherland reviews over 100M pieces of content per year for trust & safety clients.',
  'The average Trust & Safety team reviews 14,000+ reports every single day.',
  'Response time under 24h reduces platform reputation damage by up to 60%.',
  'Contextual misclassification accounts for 34% of all content moderation errors.',
  'Sutherland operates across 20+ languages and 5 time zones — 24 hours a day.',
  '72% of harmful content is removed before a single user reports it.',
  'False positive rates above 2% erode creator trust within 90 days.',
  'Sutherland\'s Trust & Safety teams serve some of the world\'s largest digital platforms.',
]

/**
 * Derive live insight strings from session data.
 * @param {object[]} sessions — from getAllSessions()
 * @returns {string[]} — array of insight strings (8+), or STATIC_INSIGHTS if below threshold
 */
export function calculateTickerStats(sessions) {
  if (!sessions || sessions.length < 3) return STATIC_INSIGHTS

  const total    = sessions.length
  const avgScore = Math.round(sessions.reduce((s, x) => s + (x.totalScore || 0), 0) / total)
  const completedAll = sessions.filter(s => s.completed).length
  const topScore = Math.max(...sessions.map(s => s.totalScore || 0))

  // Per-game stats
  const gameKeys = ['grayRoom', 'drawLine', 'threat', 'redTeam']
  const gameLabels = { grayRoom: 'The Gray Room', drawLine: 'Draw the Line', threat: 'Threat Surface', redTeam: 'Red Team Roulette' }
  const gamePlayed = {}
  const gameAvg    = {}
  for (const key of gameKeys) {
    const played = sessions.filter(s => s.scores?.[key]?.score != null)
    gamePlayed[key] = played.length
    gameAvg[key] = played.length
      ? Math.round(played.reduce((s, x) => s + (x.scores[key].score || 0), 0) / played.length)
      : 0
  }

  // Most-played game
  const mostPlayed = gameKeys.reduce((a, b) => gamePlayed[a] >= gamePlayed[b] ? a : b)

  // Badge counts
  const allBadges   = sessions.flatMap(s => s.badges || [])
  const totalBadges = allBadges.length
  const badgeCounts = {}
  allBadges.forEach(id => { badgeCounts[id] = (badgeCounts[id] || 0) + 1 })
  const topBadgeId = Object.entries(badgeCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

  // High scorers (above 60% of max total 318)
  const highScorers = sessions.filter(s => (s.totalScore || 0) >= 191).length

  // Completion rate per game
  const grayRoomPct = gamePlayed.grayRoom
    ? Math.round((gamePlayed.grayRoom / total) * 100)
    : 0

  const redTeamPct = gamePlayed.redTeam
    ? Math.round((gamePlayed.redTeam / total) * 100)
    : 0

  const insights = [
    `${total} player${total !== 1 ? 's' : ''} have taken the Signal & Noise challenge today.`,
    `Average score so far: ${avgScore} points.`,
    completedAll > 0
      ? `${completedAll} player${completedAll !== 1 ? 's' : ''} completed all four games — the full picture.`
      : 'Be the first to complete all four games.',
    `Top score of the day: ${topScore} points.`,
    totalBadges > 0
      ? `${totalBadges} badge${totalBadges !== 1 ? 's' : ''} earned across all players today.`
      : 'First badge of the day still unclaimed.',
    gamePlayed[mostPlayed] > 0
      ? `${gameLabels[mostPlayed]} is today\'s most-played game — average score ${gameAvg[mostPlayed]}.`
      : 'Four games. Unlimited bragging rights.',
    grayRoomPct > 0
      ? `${grayRoomPct}% of players have faced The Gray Room.`
      : 'The Gray Room awaits.',
    redTeamPct > 0
      ? `${redTeamPct}% of players have taken on Red Team Roulette.`
      : 'Can you spot the AI-generated violation?',
    highScorers > 0
      ? `${highScorers} player${highScorers !== 1 ? 's' : ''} scored above 191 — top-tier across all games.`
      : 'No one has crossed 191 yet. Can you?',
    gamePlayed.redTeam > 0
      ? `Average Red Team Roulette score: ${gameAvg.redTeam} of ${MAX_SCORES.redTeam}.`
      : 'Red Team Roulette — 6 AI outputs, 90 seconds, no second chances.',
    gamePlayed.threat > 0
      ? `Average Threat Surface score: ${gameAvg.threat} of ${MAX_SCORES.threat}. How\'d you allocate?`
      : 'You have $10M to defend your platform. Where does it go?',
    ...STATIC_INSIGHTS.slice(0, 3),
  ]

  return insights.filter(Boolean)
}
