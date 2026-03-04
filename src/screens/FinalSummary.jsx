// src/screens/FinalSummary.jsx
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import StatsInfomercial from '../components/game/StatsInfomercial'
import BadgeGrid from '../components/ui/BadgeGrid'
import { useSession } from '../context/SessionContext'
import { getLeaderboard } from '../utils/storageEngine'
import useCountUp from '../hooks/useCountUp'
import { SCREENS } from '../App'

const GAME_LABELS = {
  grayRoom: 'The Gray Room',
  drawLine: 'Draw the Line',
  threat:   'Threat Surface',
  redTeam:  'Red Team Roulette',
}

export default function FinalSummary({ navigate }) {
  const { player, scores, badges, totalScore, gamesCompleted, sessionId } = useSession()
  const shouldReduce = useReducedMotion()
  const [showStats,     setShowStats]     = useState(false)
  const [statsComplete, setStatsComplete] = useState(false)

  const displayScore = useCountUp(totalScore, 2200, 300)

  const board  = getLeaderboard()
  const rank   = board.findIndex(e => e.sessionId === sessionId) + 1

  const QR_PLACEHOLDER = import.meta.env.VITE_LANDING_PAGE_URL || '#'

  return (
    <ScreenWrapper>
      <Topbar gameName="Safety IQ" accentColor="#C9A96E" />
      <SafeZoneWrapper hasTopbar>
        <div className="w-full h-full overflow-y-auto" style={{ padding: '24px 20px' }}>

          {!showStats ? (
            <motion.div
              className="flex flex-col items-center text-center"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                Safety IQ · Final Score
              </p>

              {player?.name && (
                <h2 className="font-heading font-extrabold text-text-primary mb-3" style={{ fontSize: '20px' }}>
                  {player.name}
                </h2>
              )}

              {/* Total score */}
              <p className="font-display font-semibold text-gold" style={{ fontSize: '80px', lineHeight: '0.85' }}>
                {displayScore}
              </p>
              <p className="font-mono text-text-muted mb-2" style={{ fontSize: '10px' }}>
                total across {gamesCompleted} game{gamesCompleted !== 1 ? 's' : ''}
              </p>

              {/* Rank chip */}
              {rank > 0 && (
                <div
                  style={{
                    padding: '8px 20px', marginBottom: '20px',
                    background: 'rgba(201,169,110,0.10)',
                    border: '1px solid rgba(201,169,110,0.25)',
                    borderRadius: '4px',
                  }}
                >
                  <p className="font-mono uppercase text-text-muted" style={{ fontSize: '8px', letterSpacing: '2px' }}>
                    Leaderboard Rank
                  </p>
                  <p className="font-display font-semibold text-gold" style={{ fontSize: '28px', lineHeight: 1 }}>
                    #{rank}
                  </p>
                </div>
              )}

              {/* Per-game scores */}
              <div className="w-full mb-5" style={{ maxWidth: '360px' }}>
                <p className="font-mono uppercase text-text-muted mb-3" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                  Game Scores
                </p>
                <div className="flex flex-col gap-2">
                  {Object.entries(scores).map(([game, data]) => {
                    if (!data) return null
                    return (
                      <div
                        key={game}
                        className="flex items-center justify-between font-mono"
                        style={{
                          fontSize: '11px',
                          padding: '8px 12px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '4px',
                        }}
                      >
                        <span className="text-text-secondary">{GAME_LABELS[game] || game}</span>
                        <span className="text-gold font-bold">{data.score || 0}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Badges */}
              {badges.length > 0 && (
                <div className="w-full mb-6" style={{ maxWidth: '360px' }}>
                  <p className="font-mono uppercase text-text-muted mb-3" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                    Badges Earned · {badges.length}
                  </p>
                  <BadgeGrid earnedIds={badges} size={40} showLabels={false} animate={true} />
                </div>
              )}

              {/* QR code placeholder */}
              <div
                style={{
                  width: '100px', height: '100px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '6px',
                }}
              >
                <span className="font-mono text-text-muted" style={{ fontSize: '9px', textAlign: 'center', padding: '8px' }}>
                  ⚠️ QR<br/>REPLACE<br/>BEFORE<br/>SUMMIT
                </span>
              </div>
              <p className="font-mono text-text-muted mb-8" style={{ fontSize: '9px' }}>
                Scan to learn more about Sutherland
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 w-full" style={{ maxWidth: '320px' }}>
                <button
                  onClick={() => setShowStats(true)}
                  className="w-full font-mono uppercase tracking-widest"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '12px',
                    background: 'transparent', color: '#C9A96E',
                    border: '1px solid #C9A96E', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  Sutherland Stats →
                </button>
                <button
                  onClick={() => navigate(SCREENS.REGISTER)}
                  className="w-full font-mono uppercase tracking-widest"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '12px',
                    background: '#C9A96E', color: '#07101C',
                    fontWeight: 700, border: 'none', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  Play Again →
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-mono uppercase text-text-muted mb-6" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                Sutherland Trust &amp; Safety · By the Numbers
              </p>
              <StatsInfomercial onComplete={() => setStatsComplete(true)} />
              {statsComplete && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => navigate(SCREENS.REGISTER)}
                  className="font-mono uppercase tracking-widest mt-8"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '12px 32px',
                    background: '#C9A96E', color: '#07101C',
                    fontWeight: 700, border: 'none', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  Play Again →
                </motion.button>
              )}
            </motion.div>
          )}

        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
