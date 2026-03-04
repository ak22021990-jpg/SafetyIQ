// src/screens/Leaderboard.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import LeaderboardRow from '../components/leaderboard/LeaderboardRow'
import { useSession } from '../context/SessionContext'
import { getLeaderboard } from '../utils/storageEngine'
import { staggerContainer } from '../utils/motionVariants'
import { SCREENS } from '../App'

export default function Leaderboard({ navigate }) {
  const { sessionId } = useSession()
  const shouldReduce  = useReducedMotion()
  const [board, setBoard] = useState([])

  useEffect(() => {
    const load = () => setBoard(getLeaderboard())
    load()
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  const currentRank = board.findIndex(e => e.sessionId === sessionId) + 1

  return (
    <ScreenWrapper>
      <Topbar gameName="Leaderboard" accentColor="#C9A96E" />
      <SafeZoneWrapper hasTopbar>
        <div className="w-full h-full overflow-y-auto" style={{ padding: '24px 16px' }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                Live Standings
              </p>
              <h2 className="font-heading font-extrabold text-text-primary" style={{ fontSize: '24px' }}>
                Leaderboard
              </h2>
            </div>
            {currentRank > 0 && (
              <div
                style={{
                  padding:    '8px 14px',
                  background: 'rgba(201,169,110,0.10)',
                  border:     '1px solid rgba(201,169,110,0.25)',
                  borderRadius:'4px',
                }}
              >
                <p className="font-mono uppercase text-text-muted" style={{ fontSize: '8px', letterSpacing: '2px' }}>Your Rank</p>
                <p className="font-display font-semibold text-gold text-center" style={{ fontSize: '24px', lineHeight: 1 }}>
                  #{currentRank}
                </p>
              </div>
            )}
          </div>

          {/* Board */}
          {board.length === 0 ? (
            <div>
              {/* Ghost rows */}
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  style={{
                    height:       '52px',
                    background:   'rgba(255,255,255,0.025)',
                    border:       '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    marginBottom: '4px',
                    position:     'relative',
                    overflow:     'hidden',
                  }}
                >
                  <div
                    style={{
                      position:   'absolute',
                      inset:       0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                      animation:  'shimmer 1.8s infinite',
                    }}
                  />
                </div>
              ))}
              <p className="font-mono text-text-muted text-center mt-4" style={{ fontSize: '11px' }}>
                Be the first to claim the top spot.
              </p>
            </div>
          ) : (
            <motion.div
              variants={!shouldReduce ? staggerContainer : undefined}
              initial={!shouldReduce ? 'hidden' : undefined}
              animate={!shouldReduce ? 'visible' : undefined}
              role="list"
            >
              {board.map((entry, idx) => (
                <div key={entry.sessionId || idx}>
                  <LeaderboardRow
                    entry={entry}
                    rank={idx + 1}
                    isCurrentPlayer={entry.sessionId === sessionId}
                    index={idx}
                  />
                  {idx === 2 && board.length > 3 && (
                    <div style={{ height: '1px', background: 'rgba(201,169,110,0.25)', margin: '4px 0' }} />
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Back to hub */}
          <button
            onClick={() => navigate(SCREENS.HOME)}
            className="w-full font-mono uppercase tracking-widest transition-colors mt-6"
            style={{
              fontSize: '10px', letterSpacing: '2px', padding: '12px',
              background: 'transparent', color: '#C9A96E',
              border: '1px solid #C9A96E', borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ← Return to Hub
          </button>

        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
