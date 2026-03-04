// src/utils/judgementStyle.js
// Derives a Judgement Style label from overall session performance.
// Based on score ratios across games — used in Final Summary and leaderboard rows.

const MAX_SCORES = { grayRoom: 160, drawLine: 50, threat: 48, redTeam: 60 }
const MAX_TOTAL  = 318

const STYLES = [
  {
    label: 'The Sentinel',
    desc:  'Near-perfect across every domain. Rare company.',
    match: ({ ratio }) => ratio >= 0.85,
  },
  {
    label: 'The Investigator',
    desc:  "AI-generated violations don't fool you. Pattern locked.",
    match: ({ ratio, best }) => best === 'redTeam' && ratio >= 0.60,
  },
  {
    label: 'The Strategist',
    desc:  'Risk allocation under pressure. Budget well spent.',
    match: ({ ratio, best }) => best === 'threat' && ratio >= 0.55,
  },
  {
    label: 'The Architect',
    desc:  'Policy precision. You configure for edge cases others ignore.',
    match: ({ ratio, best }) => best === 'drawLine' && ratio >= 0.55,
  },
  {
    label: 'The Analyst',
    desc:  'Every case. Every nuance. Nothing missed.',
    match: ({ ratio, best }) => best === 'grayRoom' && ratio >= 0.55,
  },
  {
    label: 'The Practitioner',
    desc:  'Solid operational instincts across every domain.',
    match: ({ ratio }) => ratio >= 0.65,
  },
  {
    label: 'The Navigator',
    desc:  'You find a path through the grey. Every time.',
    match: ({ ratio }) => ratio >= 0.45,
  },
  {
    label: 'The Diplomat',
    desc:  'Firm on policy. Considered in delivery.',
    match: ({ ratio }) => ratio >= 0.30,
  },
  {
    label: 'The Observer',
    desc:  "You're learning faster than you think.",
    match: () => true,
  },
]

/**
 * Returns { label, desc } for the player's session.
 * @param {Object} scores  — SessionContext scores map
 * @param {number} totalScore
 */
export function getJudgementStyle(scores = {}, totalScore = 0) {
  const ratio = Math.min(totalScore / MAX_TOTAL, 1)

  // Find the game with the highest % score
  const gameRatios = Object.entries(scores)
    .filter(([, d]) => d?.score != null)
    .map(([game, d]) => ({ game, pct: d.score / (MAX_SCORES[game] || 100) }))
  gameRatios.sort((a, b) => b.pct - a.pct)
  const best = gameRatios[0]?.game || null

  return STYLES.find(s => s.match({ ratio, best })) || STYLES[STYLES.length - 1]
}
