// src/utils/storageEngine.js

const KEYS = {
  SESSIONS:     'sn_sessions',
  LEADERBOARD:  'sn_leaderboard',
  TICKER_STATS: 'sn_ticker_stats',
  LAST_SYNC:    'sn_last_sync',
}

export function saveSession(sessionData) {
  try {
    const sessions = getAllSessions()
    const idx = sessions.findIndex(s => s.sessionId === sessionData.sessionId)
    const entry = {
      ...sessionData,
      timestamp: sessionData.timestamp || new Date().toISOString(),
      totalScore: Object.values(sessionData.scores || {})
        .filter(Boolean)
        .reduce((sum, s) => sum + (s.score || 0), 0),
      gamesCompleted: Object.values(sessionData.scores || {}).filter(Boolean).length,
      completed: Object.values(sessionData.scores || {}).filter(Boolean).length === 4,
    }
    if (idx >= 0) sessions[idx] = entry
    else sessions.push(entry)
    localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions))
    updateLeaderboard(entry)
    updateTickerStats(sessions)
  } catch (e) {
    console.error('Storage save failed:', e)
  }
}

export function getAllSessions() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.SESSIONS) || '[]')
  } catch { return [] }
}

export function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.LEADERBOARD) || '[]')
  } catch { return [] }
}

function updateLeaderboard(session) {
  const board = getLeaderboard()
  const idx = board.findIndex(e => e.sessionId === session.sessionId)
  const entry = {
    sessionId:      session.sessionId,
    name:           session.player?.name || 'Unknown',
    company:        session.player?.company || '',
    totalScore:     session.totalScore || 0,
    gamesCompleted: session.gamesCompleted || 0,
    badges:         session.badges || [],
    topBadge:       (session.badges || [])[0] || null,
    completed:      session.completed || false,
    timestamp:      session.timestamp,
  }
  if (idx >= 0) board[idx] = entry
  else board.push(entry)
  board.sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore
    if (b.gamesCompleted !== a.gamesCompleted) return b.gamesCompleted - a.gamesCompleted
    return new Date(a.timestamp) - new Date(b.timestamp)
  })
  localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(board))
}

function updateTickerStats(sessions) {
  const stats = {
    totalPlayers:  sessions.length,
    avgScore:      sessions.length
      ? Math.round(sessions.reduce((s, x) => s + (x.totalScore || 0), 0) / sessions.length)
      : 0,
    completedAll:  sessions.filter(s => s.completed).length,
    updatedAt:     new Date().toISOString(),
  }
  localStorage.setItem(KEYS.TICKER_STATS, JSON.stringify(stats))
}

export function getTickerStats() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.TICKER_STATS) || 'null')
  } catch { return null }
}

export function exportCSV() {
  const sessions = getAllSessions()
  const headers = ['Timestamp','Name','Company','Title','Email','Phone','Consent',
                   'Total Score','Games Completed','Badges','Selfie Taken']
  const rows = sessions.map(s => [
    s.timestamp,
    s.player?.name || '',
    s.player?.company || '',
    s.player?.title || '',
    s.player?.email || '',
    s.player?.phone || '',
    s.player?.consent ? 'Yes' : 'No',
    s.totalScore || 0,
    s.gamesCompleted || 0,
    (s.badges || []).join('; '),
    s.selfieTaken ? 'Yes' : 'No'
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url
  a.download = `signal-and-noise-leads-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function resetLeaderboard() {
  localStorage.removeItem(KEYS.LEADERBOARD)
  localStorage.removeItem(KEYS.SESSIONS)
  localStorage.removeItem(KEYS.TICKER_STATS)
}
