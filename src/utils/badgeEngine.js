// src/utils/badgeEngine.js
// evaluateBadges(sessionData) → array of earned badge IDs

const MAX_TOTAL = 318  // Gray 160 + Draw 50 + Threat 48 + Red 60

// ── Badge definitions ─────────────────────────────────────────────────────
export const BADGE_DEFINITIONS = [
  // ── Performance Tier — #E11D48 ──────────────────────────────────────────
  {
    id: 'sentinel', category: 'performance', color: '#E11D48',
    name: 'Sentinel', framing: 'Fewer than 1% reach this. You see what others miss.',
    icon: '👁', imageFile: 'performance/sentinel.png',
  },
  {
    id: 'analyst', category: 'performance', color: '#E11D48',
    name: 'Analyst', framing: 'Top 12%. Sharp instincts, sharper under pressure.',
    icon: '🔍', imageFile: 'performance/analyst.png',
  },
  {
    id: 'practitioner', category: 'performance', color: '#E11D48',
    name: 'Practitioner', framing: 'Solid across the board.',
    icon: '📋', imageFile: 'performance/practitioner.png',
  },
  {
    id: 'investigator', category: 'performance', color: '#E11D48',
    name: 'Investigator', framing: 'You engaged complexity most never face.',
    icon: '🧩', imageFile: 'performance/investigator.png',
  },

  // ── Speed & Precision — #4A7FA5 ─────────────────────────────────────────
  {
    id: 'speed_demon', category: 'speed', color: '#4A7FA5',
    name: 'Speed Demon', framing: 'Decisive under pressure.',
    icon: '⚡', imageFile: 'speed/speed-demon.png',
  },
  {
    id: 'hawk_eye', category: 'speed', color: '#4A7FA5',
    name: 'Hawk Eye', framing: 'Precision over aggression.',
    icon: '🎯', imageFile: 'speed/hawk-eye.png',
  },
  {
    id: 'iron_nerve', category: 'speed', color: '#4A7FA5',
    name: 'Iron Nerve', framing: 'Cool under countdown.',
    icon: '🧊', imageFile: 'speed/iron-nerve.png',
  },
  {
    id: 'first_responder', category: 'speed', color: '#4A7FA5',
    name: 'First Responder', framing: 'When it matters, you move fast.',
    icon: '🏃', imageFile: 'speed/first-responder.png',
  },
  {
    id: 'the_closer', category: 'speed', color: '#4A7FA5',
    name: 'The Closer', framing: 'Pressure is where you sharpen.',
    icon: '✅', imageFile: 'speed/the-closer.png',
  },
  {
    id: 'quiet_storm', category: 'speed', color: '#4A7FA5',
    name: 'Quiet Storm', framing: 'Methodical beats reactive.',
    icon: '🌊', imageFile: 'speed/quiet-storm.png',
  },

  // ── Domain Mastery — #3A8B7A ─────────────────────────────────────────────
  {
    id: 'policy_architect', category: 'mastery', color: '#3A8B7A',
    name: 'Policy Architect', framing: 'Your rules survive the real world.',
    icon: '⚖️', imageFile: 'mastery/policy-architect.png',
  },
  {
    id: 'threat_hunter', category: 'mastery', color: '#3A8B7A',
    name: 'Threat Hunter', framing: 'You see the attack before it lands.',
    icon: '🛡', imageFile: 'mastery/threat-hunter.png',
  },
  {
    id: 'gray_zone_master', category: 'mastery', color: '#3A8B7A',
    name: 'Gray Zone Master', framing: 'You live comfortably in ambiguity.',
    icon: '🔘', imageFile: 'mastery/gray-zone-master.png',
  },
  {
    id: 'cultural_navigator', category: 'mastery', color: '#3A8B7A',
    name: 'Cultural Navigator', framing: 'Context is your superpower.',
    icon: '🌍', imageFile: 'mastery/cultural-navigator.png',
  },
  {
    id: 'budget_oracle', category: 'mastery', color: '#3A8B7A',
    name: 'Budget Oracle', framing: 'Efficiency is its own defence.',
    icon: '💡', imageFile: 'mastery/budget-oracle.png',
  },
  {
    id: 'boundary_setter', category: 'mastery', color: '#3A8B7A',
    name: 'Boundary Setter', framing: 'Your policy held. Rare.',
    icon: '📐', imageFile: 'mastery/boundary-setter.png',
  },
  {
    id: 'escalation_expert', category: 'mastery', color: '#3A8B7A',
    name: 'Escalation Expert', framing: 'You know when to hold, when to hand off.',
    icon: '↗️', imageFile: 'mastery/escalation-expert.png',
  },
  {
    id: 'zero_tolerance', category: 'mastery', color: '#3A8B7A',
    name: 'Zero Tolerance', framing: 'No grey. No mercy.',
    icon: '⛔', imageFile: 'mastery/zero-tolerance.png',
  },
  {
    id: 'signal_reader', category: 'mastery', color: '#3A8B7A',
    name: 'Signal Reader', framing: 'You see the signal in the noise.',
    icon: '📡', imageFile: 'mastery/signal-reader.png',
  },
  {
    id: 'multilingual_mind', category: 'mastery', color: '#3A8B7A',
    name: 'Multilingual Mind', framing: 'You think in more than one culture.',
    icon: '🌐', imageFile: 'mastery/multilingual-mind.png',
  },

  // ── Behaviour & Pattern — #8B6B8A ────────────────────────────────────────
  {
    id: 'contrarian', category: 'behaviour', color: '#8B6B8A',
    name: 'Contrarian', framing: 'You think where others assume.',
    icon: '↙️', imageFile: 'behaviour/contrarian.png',
  },
  {
    id: 'the_diplomat', category: 'behaviour', color: '#8B6B8A',
    name: 'The Diplomat', framing: 'Firm policy. Human delivery.',
    icon: '🤝', imageFile: 'behaviour/the-diplomat.png',
  },
  {
    id: 'pattern_breaker', category: 'behaviour', color: '#8B6B8A',
    name: 'Pattern Breaker', framing: 'You learn faster than you think.',
    icon: '📈', imageFile: 'behaviour/pattern-breaker.png',
  },
  {
    id: 'the_outlier', category: 'behaviour', color: '#8B6B8A',
    name: 'The Outlier', framing: "You don't follow consensus. Good.",
    icon: '✦', imageFile: 'behaviour/the-outlier.png',
  },
  {
    id: 'human_override', category: 'behaviour', color: '#8B6B8A',
    name: 'Human Override', framing: 'Machine suggested. You decided better.',
    icon: '🧠', imageFile: 'behaviour/human-override.png',
  },

  // ── Achievement — #E8C84A ────────────────────────────────────────────────
  {
    id: 'clean_sweep', category: 'achievement', color: '#E8C84A',
    name: 'Clean Sweep', framing: 'The full picture. Rare company.',
    icon: '✨', imageFile: 'achievement/clean-sweep.png',
  },
  {
    id: 'deep_diver', category: 'achievement', color: '#E8C84A',
    name: 'Deep Diver', framing: "Once wasn't enough.",
    icon: '🔄', imageFile: 'achievement/deep-diver.png',
  },
  {
    id: 'summit_elite', category: 'achievement', color: '#E8C84A',
    name: 'Summit Elite', framing: 'Best in the room. Literally.',
    icon: '🏆', imageFile: 'achievement/summit-elite.png',
  },
  {
    id: 'apex_predator', category: 'achievement', color: '#E8C84A',
    name: 'Apex Predator', framing: 'One person holds this. You earned it.',
    icon: '👑', imageFile: 'achievement/apex-predator.png',
  },
  {
    id: 'the_veteran', category: 'achievement', color: '#E8C84A',
    name: 'The Veteran', framing: 'You came back. That says everything.',
    icon: '⭐', imageFile: 'achievement/the-veteran.png',
  },
]

// ── Badge evaluation ─────────────────────────────────────────────────────────
/**
 * evaluateBadges(sessionData) — returns array of earned badge IDs
 * sessionData shape:
 *   { player, scores: { grayRoom, drawLine, threat, redTeam }, badges, totalScore, gamesCompleted }
 */
export function evaluateBadges(sessionData) {
  const { scores = {}, totalScore = 0, gamesCompleted = 0 } = sessionData
  const gray  = scores.grayRoom || {}
  const draw  = scores.drawLine || {}
  const ts    = scores.threat   || {}
  const red   = scores.redTeam  || {}
  const earned = []

  // ── Performance Tier ─────────────────────────────────────────────────────
  const pct = MAX_TOTAL > 0 ? (totalScore / MAX_TOTAL) * 100 : 0
  if (gamesCompleted >= 4) {
    if      (pct >= 95) earned.push('sentinel')
    else if (pct >= 80) earned.push('analyst')
    else if (pct >= 65) earned.push('practitioner')
    else                earned.push('investigator')
  }

  // ── Speed & Precision ────────────────────────────────────────────────────
  // Hawk Eye: zero false positives in Red Team
  if (red.falsePositives === 0 && red.total > 0) earned.push('hawk_eye')

  // Iron Nerve: 5+ answers with under 15s left (tracked in gray room)
  if ((gray.ironNerveCount || 0) >= 5) earned.push('iron_nerve')

  // First Responder: first game completed quickly (proxy: speedBonuses > 2 in gray room)
  if ((gray.speedBonuses || 0) >= 3) earned.push('first_responder')

  // The Closer: perfect on final Gray Room case
  if (gray.lastCaseCorrect === true) earned.push('the_closer')

  // Quiet Storm: high gray room score with zero speed bonuses
  if ((gray.score || 0) >= 90 && (gray.speedBonuses || 0) === 0) earned.push('quiet_storm')

  // Speed Demon: 3+ speed bonuses in gray room
  if ((gray.speedBonuses || 0) >= 3) earned.push('speed_demon')

  // ── Domain Mastery ───────────────────────────────────────────────────────
  // Policy Architect: 4+/5 Draw the Line passes
  if ((draw.passed || 0) >= 4) earned.push('policy_architect')

  // Boundary Setter: 5/5 Draw the Line
  if (draw.passed === 5 && draw.total === 5) earned.push('boundary_setter')

  // Threat Hunter: 5+ threats blocked
  if ((ts.blocked || 0) >= 5) earned.push('threat_hunter')

  // Budget Oracle: 6/6 threats blocked (no waste)
  if (ts.blocked === 6) earned.push('budget_oracle')

  // Gray Zone Master: all 8 Gray Room correct
  if ((gray.correctCount || 0) === 8) earned.push('gray_zone_master')

  // Escalation Expert: escalation choices correct (proxy: 2+ escalations chosen correctly)
  if ((gray.escalationCorrect || 0) >= 2) earned.push('escalation_expert')

  // Zero Tolerance: every violation flagged in Red Team (no missed)
  if (red.missed === 0 && (red.total || 0) > 0) earned.push('zero_tolerance')

  // Signal Reader: caught subtle cases (proxy: correctCount >= 6 in gray room)
  if ((gray.correctCount || 0) >= 6) earned.push('signal_reader')

  // Cultural Navigator: cross-cultural cases correct (proxy: gray score >= 80)
  if ((gray.score || 0) >= 80) earned.push('cultural_navigator')

  // Multilingual Mind: cross-regional cases (proxy: gray correctCount >= 7)
  if ((gray.correctCount || 0) >= 7) earned.push('multilingual_mind')

  // ── Behaviour & Pattern ───────────────────────────────────────────────────
  // Contrarian: minority answer 3+ times (proxy: at least 2 non-standard correct answers)
  if ((gray.contrарianCount || gray.contrarianCount || 0) >= 3) earned.push('contrarian')

  // The Diplomat: nuanced over punitive 5+ times (proxy: escalation choices ≥ 3)
  if ((gray.diplomatChoices || 0) >= 3) earned.push('the_diplomat')

  // Pattern Breaker: improving score trend
  if (gray.improvingTrend === true) earned.push('pattern_breaker')

  // ── Achievement ──────────────────────────────────────────────────────────
  // Clean Sweep: all 4 games completed
  if (gamesCompleted >= 4) earned.push('clean_sweep')

  // Deep Diver: check if this player has played before (multiple sessions)
  try {
    const sessions = JSON.parse(localStorage.getItem('sn_sessions') || '[]')
    const playerSessions = sessions.filter(s => s.player?.email === sessionData.player?.email)
    if (playerSessions.length > 1) earned.push('deep_diver')
    if (playerSessions.length > 2) earned.push('the_veteran')
  } catch { /* ignore */ }

  // Summit Elite: top 3 leaderboard position
  try {
    const lb = JSON.parse(localStorage.getItem('sn_leaderboard') || '[]')
    const rank = lb.findIndex(e => e.sessionId === sessionData.sessionId)
    if (rank >= 0 && rank < 3) earned.push('summit_elite')
    if (rank === 0) earned.push('apex_predator')
  } catch { /* ignore */ }

  return [...new Set(earned)]  // deduplicate
}

export function getBadgeById(id) {
  return BADGE_DEFINITIONS.find(b => b.id === id) || null
}

export function getBadgesByIds(ids = []) {
  return ids.map(id => getBadgeById(id)).filter(Boolean)
}
