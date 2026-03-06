// src/screens/FinalSummary.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import QRCode from 'qrcode'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import StatsInfomercial from '../components/game/StatsInfomercial'
import BadgeGrid from '../components/ui/BadgeGrid'
import { useSession } from '../context/SessionContext'
import { getLeaderboard } from '../utils/storageEngine'
import { getJudgementStyle } from '../utils/judgementStyle'
import useCountUp from '../hooks/useCountUp'
import { SCREENS } from '../constants/screens'

const GAME_LABELS = {
  grayRoom: 'The Gray Room',
  drawLine: 'Draw the Line',
  threat:   'Threat Surface',
  redTeam:  'Red Team Roulette',
}

const GLOBAL_CENTRES = ['🇵🇭', '🇪🇬', '🇧🇬', '🇨🇴']

function QRBlock({ url }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !url || url === '#') return
    QRCode.toCanvas(canvasRef.current, url, {
      width:  100,
      margin: 1,
      color:  { dark: '#E8EDF5', light: '#07101C' },
    }).catch(() => {})
  }, [url])

  if (!url || url === '#') {
    return (
      <div
        style={{
          width: '100px', height: '100px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span className="font-mono text-text-muted" style={{ fontSize: '8px', textAlign: 'center', padding: '8px' }}>
          ⚠️ Set<br />VITE_LANDING<br />_PAGE_URL
        </span>
      </div>
    )
  }

  return <canvas ref={canvasRef} style={{ borderRadius: '4px' }} />
}

export default function FinalSummary({ navigate }) {
  const { player, scores, badges, totalScore, gamesCompleted, sessionId } = useSession()
  const shouldReduce = useReducedMotion()
  const [showStats,     setShowStats]     = useState(false)
  const [statsComplete, setStatsComplete] = useState(false)

  const displayScore = useCountUp(totalScore, 1500, 300)

  const [board, setBoard] = useState(() => getLeaderboard())
  const rank = board.findIndex(e => e.sessionId === sessionId) + 1

  useEffect(() => {
    const load = () => setBoard(getLeaderboard())
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  // Percentile: how many players does this player beat?
  const percentile = board.length > 1
    ? Math.round(((board.length - rank) / (board.length - 1)) * 100)
    : null

  const judgement = getJudgementStyle(scores, totalScore)
  const QR_URL    = import.meta.env.VITE_LANDING_PAGE_URL || '#'

  return (
    <ScreenWrapper>
      <Topbar gameName="Safety IQ" accentColor="#E11D48" />
      <SafeZoneWrapper hasTopbar>
        <div className="w-full h-full overflow-y-auto" style={{ padding: '24px 20px' }}>

          {/* Back to Home */}
          <button
            onClick={() => navigate(SCREENS.HOME)}
            className="font-mono uppercase text-text-muted hover:text-text-primary transition-colors"
            style={{
              fontSize: '9px', letterSpacing: '2px', background: 'none',
              border: '1px solid #E2E8F0', borderRadius: '8px',
              padding: '7px 12px', cursor: 'pointer', marginBottom: '20px',
              display: 'block',
            }}
          >
            ← Back to Home
          </button>

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

              {/* Total score — 120px per spec */}
              <p className="font-display font-semibold text-gold" style={{ fontSize: '120px', lineHeight: '0.85' }}>
                {displayScore}
              </p>
              <p className="font-mono text-text-muted mb-2" style={{ fontSize: '10px' }}>
                total across {gamesCompleted} game{gamesCompleted !== 1 ? 's' : ''}
              </p>

              {/* Percentile line */}
              {percentile !== null && percentile > 0 && (
                <p className="font-mono text-text-secondary mb-4" style={{ fontSize: '11px' }}>
                  You scored higher than{' '}
                  <span className="text-gold font-bold">{percentile}%</span>{' '}
                  of players at this summit
                </p>
              )}

              {/* Judgement Style */}
              <div
                style={{
                  padding: '10px 20px', marginBottom: '16px',
                  background: 'rgba(225,29,72,0.06)',
                  border: '1px solid rgba(225,29,72,0.18)',
                  borderRadius: '4px',
                }}
              >
                <p className="font-mono uppercase text-text-muted" style={{ fontSize: '8px', letterSpacing: '2px', marginBottom: '4px' }}>
                  Judgement Style
                </p>
                <p className="font-heading font-bold text-gold" style={{ fontSize: '16px' }}>
                  {judgement.label}
                </p>
                <p className="font-mono text-text-muted" style={{ fontSize: '9px', marginTop: '2px' }}>
                  {judgement.desc}
                </p>
              </div>

              {/* Rank chip */}
              {rank > 0 && (
                <div
                  style={{
                    padding: '8px 20px', marginBottom: '20px',
                    background: 'rgba(225,29,72,0.10)',
                    border: '1px solid rgba(225,29,72,0.25)',
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

              {/* Compact leaderboard */}
              {board.length > 0 && (
                <div className="w-full mb-5" style={{ maxWidth: '360px' }}>
                  <p className="font-mono uppercase text-text-muted mb-3" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                    Leaderboard
                  </p>
                  <div className="flex flex-col">
                    {board.slice(0, 8).map((entry, i) => {
                      const isMe = entry.sessionId === sessionId
                      return (
                        <div key={entry.sessionId}>
                          <div
                            className="flex items-center justify-between py-2 font-mono"
                            style={{
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                              background:   isMe ? 'rgba(225,29,72,0.06)' : 'transparent',
                              outline:      isMe ? '1px solid rgba(225,29,72,0.20)' : 'none',
                              padding:      isMe ? '8px 8px' : '8px 0',
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                style={{
                                  fontSize: '11px', width: '18px', textAlign: 'center', fontWeight: 700,
                                  color: i === 0 ? '#E8C84A' : i === 1 ? '#A8B8C8' : i === 2 ? '#B87A4A' : '#566478',
                                }}
                              >
                                {i + 1}
                              </span>
                              <div>
                                <p className="font-heading font-bold text-text-primary" style={{ fontSize: '11px' }}>
                                  {entry.name}
                                  {isMe && <span className="text-gold ml-2 font-mono" style={{ fontSize: '8px' }}>YOU</span>}
                                </p>
                                <p className="text-text-muted" style={{ fontSize: '9px' }}>{entry.company}</p>
                              </div>
                            </div>
                            <span className="font-display font-semibold text-gold" style={{ fontSize: '13px' }}>
                              {entry.totalScore}
                            </span>
                          </div>
                          {i === 2 && board.length > 3 && (
                            <div style={{ height: '1px', background: 'rgba(225,29,72,0.25)', margin: '2px 0' }} />
                          )}
                        </div>
                      )
                    })}
                  </div>
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

              {/* Badges with names + framing lines */}
              {badges.length > 0 && (
                <div className="w-full mb-6" style={{ maxWidth: '360px' }}>
                  <p className="font-mono uppercase text-text-muted mb-3" style={{ fontSize: '9px', letterSpacing: '2px' }}>
                    Badges Earned · {badges.length}
                  </p>
                  <BadgeGrid earnedIds={badges} size={48} showLabels={true} animate={true} />
                </div>
              )}

              {/* Global centres */}
              <div className="flex flex-col items-center gap-1 mb-6">
                <p className="font-mono uppercase text-text-muted" style={{ fontSize: '8px', letterSpacing: '2px' }}>
                  Global Trust &amp; Safety Centres
                </p>
                <div className="flex gap-3" style={{ fontSize: '22px' }}>
                  {GLOBAL_CENTRES.map(flag => (
                    <span key={flag}>{flag}</span>
                  ))}
                </div>
              </div>

              {/* QR code */}
              <QRBlock url={QR_URL} />
              <p className="font-mono text-text-muted mb-8 mt-2" style={{ fontSize: '9px' }}>
                Scan to learn more about Sutherland
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 w-full" style={{ maxWidth: '320px' }}>
                <button
                  onClick={() => navigate(SCREENS.SELFIE)}
                  className="w-full font-mono uppercase tracking-widest"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '13px',
                    background: '#E11D48', color: '#07101C',
                    fontWeight: 700, border: 'none', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  Take your Summit Card →
                </button>
                <button
                  onClick={() => setShowStats(true)}
                  className="w-full font-mono uppercase tracking-widest"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '11px',
                    background: 'transparent', color: '#E11D48',
                    border: '1px solid #E11D48', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  Sutherland Stats →
                </button>
                <button
                  onClick={() => navigate(SCREENS.REGISTER)}
                  className="w-full font-mono uppercase tracking-widest"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '11px',
                    background: 'transparent', color: 'rgba(255,255,255,0.35)',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  Play Again
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-3 w-full mt-8"
                  style={{ maxWidth: '320px' }}
                >
                  <button
                    onClick={() => navigate(SCREENS.SELFIE)}
                    className="w-full font-mono uppercase tracking-widest"
                    style={{
                      fontSize: '10px', letterSpacing: '2px', padding: '13px',
                      background: '#E11D48', color: '#07101C',
                      fontWeight: 700, border: 'none', borderRadius: '4px', cursor: 'pointer',
                    }}
                  >
                    Take your Summit Card →
                  </button>
                  <button
                    onClick={() => navigate(SCREENS.REGISTER)}
                    className="w-full font-mono uppercase tracking-widest"
                    style={{
                      fontSize: '10px', letterSpacing: '2px', padding: '11px',
                      background: 'transparent', color: 'rgba(255,255,255,0.35)',
                      border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', cursor: 'pointer',
                    }}
                  >
                    Play Again
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
