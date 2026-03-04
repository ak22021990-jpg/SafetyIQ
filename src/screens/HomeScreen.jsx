// src/screens/HomeScreen.jsx
import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SafeZoneWrapper from '../components/layout/SafeZoneWrapper'
import Topbar from '../components/layout/Topbar'
import GameCard from '../components/game/GameCard'
import Button from '../components/ui/Button'
import { useSession } from '../context/SessionContext'
import { useGame } from '../context/GameContext'
import { getLeaderboard } from '../utils/storageEngine'
import { SCREENS } from '../App'

const GAMES = [
  {
    id:          'grayRoom',
    gameNumber:  1,
    title:       'The Gray Room',
    domain:      '⚖️',
    description: "You're Head of Trust & Safety for a global platform. 8 real cases. 90 seconds each. No case is ever simple — and every call has consequences.",
    metaPills:   ['8 Cases', '90 Sec Each', 'Content Moderation'],
    accentColor: '#C9A96E',
    screen:      SCREENS.GRAY_ROOM,
  },
  {
    id:          'drawLine',
    gameNumber:  2,
    title:       'Draw the Line',
    domain:      '📐',
    description: "We give you a platform policy. You tune it. Then we throw 5 adversarial real-world scenarios at it. No configuration survives everything.",
    metaPills:   ['5 Stress Tests', 'Policy Tuning', 'Trade-offs'],
    accentColor: '#4A7FA5',
    screen:      SCREENS.DRAW_LINE,
  },
  {
    id:          'threat',
    gameNumber:  3,
    title:       'Threat Surface',
    domain:      '🛡',
    description: "You have $10M to defend your platform against 6 simultaneous threat vectors. Allocate. Then watch the attack wave hit.",
    metaPills:   ['$10M Budget', '6 Threat Vectors', 'Risk Allocation'],
    accentColor: '#E8A830',
    screen:      SCREENS.THREAT,
  },
  {
    id:          'redTeam',
    gameNumber:  4,
    title:       'Red Team Roulette',
    domain:      '🎯',
    description: "6 AI-generated outputs. Some violated policy. Some didn't. Flag the violations before 90 seconds runs out.",
    metaPills:   ['6 Outputs', '90 Sec Timer', 'AI Detection'],
    accentColor: '#00C896',
    screen:      SCREENS.RED_TEAM,
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
        background: '#111F32',
        border:     '1px solid rgba(255,255,255,0.07)',
        padding:    '24px',
      }}
    >
      <p
        className="font-mono uppercase text-gold mb-4"
        style={{ fontSize: '9px', letterSpacing: '3px' }}
      >
        Leaderboard
      </p>

      {board.length === 0 ? (
        <div className="flex-1 flex flex-col gap-3">
          <p className="font-mono text-body-s text-text-muted">
            Be the first to claim the top spot.
          </p>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="h-10 rounded-none"
              style={{ background: 'rgba(255,255,255,0.03)', opacity: 1 - i * 0.2 }}
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
                className="flex items-center justify-between py-2.5"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background:   isMe ? 'rgba(201,169,110,0.06)' : 'transparent',
                  outline:      isMe ? '1px solid rgba(201,169,110,0.25)' : 'none',
                  padding:      isMe ? '10px 8px' : '10px 0',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-display font-semibold w-5 text-center text-body-s"
                    style={{
                      color: i === 0 ? '#E8C84A' : i === 1 ? '#A8B8C8' : i === 2 ? '#B87A4A' : '#566478',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-heading font-bold text-text-primary" style={{ fontSize: '11px' }}>
                      {entry.name}
                      {isMe && (
                        <span className="text-gold ml-2 font-mono" style={{ fontSize: '8px' }}>YOU</span>
                      )}
                    </p>
                    <p className="font-mono text-text-muted" style={{ fontSize: '9px' }}>
                      {entry.company}
                    </p>
                  </div>
                </div>
                <span className="font-display font-semibold text-gold text-body-s">
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
        className="font-mono uppercase text-text-muted transition-colors mt-4"
        style={{ fontSize: '9px', letterSpacing: '2px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        View full leaderboard →
      </button>
    </div>
  )
}

export default function HomeScreen({ navigate }) {
  const { player, scores, gamesCompleted, totalScore, sessionId } = useSession()
  const { muted, setMuted } = useGame()

  const allComplete = gamesCompleted === 4
  const firstName   = player?.name?.split(' ')[0] || 'Player'

  const handlePlay = (game) => {
    // Navigate to game screen (screens built in Phases 4–7)
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
        <div className="w-full h-full flex overflow-hidden">

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-auto px-8 py-6">

            {/* Welcome header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p
                  className="font-mono uppercase text-text-muted mb-1"
                  style={{ fontSize: '9px', letterSpacing: '3px' }}
                >
                  Safety IQ Challenge
                </p>
                <h1
                  className="font-heading font-extrabold text-text-primary"
                  style={{ fontSize: '32px', lineHeight: '1.1' }}
                >
                  Welcome, {firstName}.
                </h1>
                <p className="font-mono text-body-s text-text-secondary mt-1">
                  The truth is in the data. If you know how to read it.
                </p>
              </div>

              {/* Mute toggle */}
              <button
                onClick={() => setMuted(m => !m)}
                className="flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary transition-colors"
                style={{
                  width:      '40px',
                  height:     '40px',
                  background: 'rgba(255,255,255,0.05)',
                  border:     '1px solid rgba(255,255,255,0.08)',
                  flexShrink: 0,
                }}
                aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* 2×2 Game cards grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {GAMES.map(game => (
                <GameCard
                  key={game.id}
                  gameNumber={game.gameNumber}
                  title={game.title}
                  domain={game.domain}
                  description={game.description}
                  metaPills={game.metaPills}
                  accentColor={game.accentColor}
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

          {/* Leaderboard sidebar */}
          <div className="w-64 shrink-0 overflow-hidden m-4 ml-0">
            <LeaderboardSidebar currentSessionId={sessionId} navigate={navigate} />
          </div>

        </div>
      </SafeZoneWrapper>
    </ScreenWrapper>
  )
}
