// src/screens/HomeScreen.jsx
import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Trophy, X } from 'lucide-react'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import GameCard from '../components/game/GameCard'
import Button from '../components/ui/Button'
import { useSession } from '../context/SessionContext'
import { useGame } from '../context/GameContext'
import { getLeaderboard } from '../utils/storageEngine'
import { SCREENS } from '../constants/screens'

// Drop generated game illustrations into src/assets/images/games/ and import them here.
// e.g. import grayRoomImg from '../assets/images/games/gray-room.png'
import grayRoomImg   from '../assets/images/games/gray-room.png'
import drawLineImg   from '../assets/images/games/draw-line.png'
import threatImg     from '../assets/images/games/threat-surface.png'
import redTeamImg    from '../assets/images/games/red-team-roulette.png'

const GAMES = [
  {
    id: 'grayRoom',
    gameNumber: 1,
    title: 'The Gray Room',
    domain: '⚖️',
    description: "You're Head of Trust & Safety for a global platform. 5 real cases. 90 seconds each. No case is ever simple — and every call has consequences.",
    metaPills: ['5 Cases', '90 Sec Each', 'Content Moderation'],
    accentColor: '#fd7183',
    image: grayRoomImg,
    screen: SCREENS.GRAY_ROOM,
  },
  {
    id: 'drawLine',
    gameNumber: 2,
    title: 'Draw the Line',
    domain: '📐',
    description: "We give you a platform policy. You tune it. Then we throw 5 adversarial real-world scenarios at it. No configuration survives everything.",
    metaPills: ['5 Stress Tests', 'Policy Tuning', 'Trade-offs'],
    accentColor: '#00C896',
    image: redTeamImg,
    screen: SCREENS.DRAW_LINE,
  },
  {
    id: 'threat',
    gameNumber: 3,
    title: 'Threat Surface',
    domain: '🛡',
    description: "You have $10M to defend your platform against 5 simultaneous threat vectors. Allocate. Then watch the attack wave hit.",
    metaPills: ['$10M Budget', '5 Threat Vectors', 'Risk Allocation'],
    accentColor: '#c7468d',
    image: threatImg,
    screen: SCREENS.THREAT,
  },
  {
    id: 'redTeam',
    gameNumber: 4,
    title: 'Red Team Roulette',
    domain: '🎯',
    description: "5 AI-generated outputs. Some violated policy. Some didn't. Flag the violations before 90 seconds runs out.",
    metaPills: ['5 Outputs', '90 Sec Timer', 'AI Detection'],
    accentColor: '#4A7FA5',
    image: drawLineImg,
    screen: SCREENS.RED_TEAM,
  },
]

function LeaderboardSidebar({ currentSessionId, navigate }) {
  const [board, setBoard] = useState(() => getLeaderboard().slice(0, 8))

  useEffect(() => {
    const load = () => setBoard(getLeaderboard().slice(0, 8))
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      }}
    >
      <p
        className="font-heading font-bold uppercase text-gold mb-4"
        style={{ fontSize: '11px', letterSpacing: '2px' }}
      >
        Leaderboard
      </p>

      {board.length === 0 ? (
        <div className="flex-1 flex flex-col gap-3">
          <p className="font-mono text-slate-500" style={{ fontSize: '13px' }}>
            Be the first to claim the top spot.
          </p>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="h-10 rounded"
              style={{ background: '#F8FAFC', opacity: 1 - i * 0.2 }}
            />
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-auto flex flex-col gap-0">
          {board.map((entry, i) => {
            const isMe = entry.sessionId === currentSessionId
            return (
              <div
                key={entry.sessionId}
                className="flex items-center justify-between"
                style={{
                  borderBottom: '1px solid #F1F5F9',
                  background: isMe ? 'rgba(225,29,72,0.07)' : 'transparent',
                  outline: isMe ? '1px solid rgba(225,29,72,0.30)' : 'none',
                  padding: isMe ? '10px 8px' : '10px 0',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-display font-bold w-5 text-center"
                    style={{
                      fontSize: '14px',
                      color: i === 0 ? '#E8C84A' : i === 1 ? '#A8B8C8' : i === 2 ? '#B87A4A' : '#94A3B8',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-heading font-bold text-midnight" style={{ fontSize: '12px' }}>
                      {entry.name}
                      {isMe && (
                        <span className="text-gold ml-2 font-mono" style={{ fontSize: '9px' }}>YOU</span>
                      )}
                    </p>
                    <p className="font-mono text-slate-500" style={{ fontSize: '11px' }}>
                      {entry.company}
                    </p>
                  </div>
                </div>
                <span className="font-display font-bold text-gold" style={{ fontSize: '15px' }}>
                  {entry.totalScore}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Full leaderboard link */}
      <button
        onClick={() => navigate(SCREENS.LEADERBOARD)}
        className="font-mono uppercase text-slate-500 hover:text-midnight transition-colors mt-4"
        style={{ fontSize: '10px', letterSpacing: '1.5px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        View full leaderboard →
      </button>
    </div>
  )
}

export default function HomeScreen({ navigate }) {
  const { player, scores, gamesCompleted, totalScore, sessionId } = useSession()
  const { muted, setMuted } = useGame()
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)

  const allComplete = gamesCompleted === 4
  const firstName = player?.name?.split(' ')[0] || 'Player'

  const handlePlay = (game) => {
    navigate(game.screen)
  }

  return (
    <ScreenWrapper>
      <Topbar
        gameName=""
        gamesCompleted={gamesCompleted}
        score={totalScore > 0 ? totalScore : null}
      />

      <SafeZoneWrapper>
        <div className="w-full h-full flex overflow-hidden relative">

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-auto px-8 py-6">

            {/* Welcome header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p
                  className="font-mono uppercase text-text-muted mb-1"
                  style={{ fontSize: '11px', letterSpacing: '2px' }}
                >
                  Safety IQ Challenge
                </p>
                <h1
                  className="font-heading font-extrabold text-text-primary"
                  style={{ fontSize: '40px', lineHeight: '1.05' }}
                >
                  Welcome, {firstName}.
                </h1>
                <p className="font-mono text-text-secondary mt-2" style={{ fontSize: '14px' }}>
                  The truth is in the data. If you know how to read it.
                </p>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLeaderboardOpen(true)}
                  className="flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary transition-colors hover:bg-slate-100"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    flexShrink: 0,
                  }}
                  aria-label="Open leaderboard"
                >
                  <Trophy size={18} />
                </button>
                <button
                  onClick={() => setMuted(m => !m)}
                  className="flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary transition-colors hover:bg-slate-100"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    flexShrink: 0,
                  }}
                  aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>

            {/* 2×2 Game cards grid */}
            <div className="grid grid-cols-2 gap-4">
              {GAMES.map(game => (
                <GameCard
                  key={game.id}
                  gameNumber={game.gameNumber}
                  title={game.title}
                  domain={game.domain}
                  description={game.description}
                  metaPills={game.metaPills}
                  accentColor={game.accentColor}
                  image={game.image}
                  completed={!!scores[game.id]}
                  score={scores[game.id]?.score}
                  onPlay={() => handlePlay(game)}
                />
              ))}
            </div>

            {/* All games complete CTA */}
            {allComplete && (
              <div className="mt-6 flex justify-center">
                <Button
                  variant="primary"
                  showArrow
                  onClick={() => navigate(SCREENS.SUMMARY)}
                >
                  View Full Summary
                </Button>
              </div>
            )}
          </div>

          {/* Backdrop */}
          {isLeaderboardOpen && (
            <div
              className="absolute inset-0 bg-slate-900/20 z-40 transition-opacity"
              onClick={() => setIsLeaderboardOpen(false)}
            />
          )}

          {/* Leaderboard Sidebar Overlay */}
          <div
            className={`absolute top-0 right-0 h-full w-[300px] sm:w-[340px] p-4 transition-transform duration-300 z-50 flex flex-col ${isLeaderboardOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex-1 relative shadow-2xl rounded-xl">
              <button
                onClick={() => setIsLeaderboardOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 z-10 p-1 bg-white/80 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close leaderboard"
              >
                <X size={20} />
              </button>
              <LeaderboardSidebar currentSessionId={sessionId} navigate={navigate} />
            </div>
          </div>

        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
