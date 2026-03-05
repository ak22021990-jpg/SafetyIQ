// src/App.jsx
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from './context/SessionContext'
import { GameProvider } from './context/GameContext'
import { useLongPress } from './hooks/useLongPress'
import { useSheetsSync } from './hooks/useSheetsSync'
import { useIdleTimer } from './hooks/useIdleTimer'

// Screens
import Registration    from './screens/Registration'
import IdleAttractor  from './screens/IdleAttractor'
import HomeScreen     from './screens/HomeScreen'
import GrayRoom       from './screens/GrayRoom'
import DrawTheLine    from './screens/DrawTheLine'
import ThreatSurface  from './screens/ThreatSurface'
import RedTeamRoulette from './screens/RedTeamRoulette'
import GameEnd        from './screens/GameEnd'
import Leaderboard   from './screens/Leaderboard'
import FinalSummary   from './screens/FinalSummary'
import SelfieScreen   from './screens/SelfieScreen'
import StaffPanel     from './screens/StaffPanel'
import TickerBanner   from './components/layout/TickerBanner'

export const SCREENS = {
  IDLE:        'idle',
  REGISTER:    'register',
  HOME:        'home',
  GRAY_ROOM:   'gray_room',
  DRAW_LINE:   'draw_line',
  THREAT:      'threat_surface',
  RED_TEAM:    'red_team',
  GAME_END:    'game_end',
  LEADERBOARD: 'leaderboard',
  SUMMARY:     'final_summary',
  SELFIE:      'selfie',
  STAFF:       'staff_panel',
}

// Inner component so hooks can access navigate
function AppInner() {
  const [screen,     setScreen]     = useState(SCREENS.REGISTER)
  const [activeGame, setActiveGame] = useState(null)

  const navigate = (to, game = null) => {
    setActiveGame(game)
    setScreen(to)
  }

  // Sheets sync — runs in background, provides forceSync + syncStatus for StaffPanel
  const { syncStatus, forceSync } = useSheetsSync()

  // Long-press on Sutherland logo area (top-left 200×64px) → open staff panel
  const logoLongPress = useLongPress(() => navigate(SCREENS.STAFF), 3000)

  // Idle reset — navigate to IDLE after 60s of inactivity (except on IDLE + STAFF screens)
  useIdleTimer(() => {
    if (screen !== SCREENS.IDLE && screen !== SCREENS.STAFF) navigate(SCREENS.IDLE)
  }, 60_000)

  return (
    <div className="w-screen h-screen overflow-hidden bg-abyss relative">

      <AnimatePresence mode="wait">
        {screen === SCREENS.REGISTER    && <Registration    key="reg"         navigate={navigate} />}
        {screen === SCREENS.IDLE        && <IdleAttractor   key="idle"        navigate={navigate} />}
        {screen === SCREENS.HOME        && <HomeScreen      key="home"        navigate={navigate} />}
        {screen === SCREENS.GRAY_ROOM   && <GrayRoom        key="gray"        navigate={navigate} />}
        {screen === SCREENS.DRAW_LINE   && <DrawTheLine     key="draw"        navigate={navigate} />}
        {screen === SCREENS.THREAT      && <ThreatSurface   key="threat"      navigate={navigate} />}
        {screen === SCREENS.RED_TEAM    && <RedTeamRoulette key="red"         navigate={navigate} />}
        {screen === SCREENS.GAME_END    && <GameEnd         key="end"         navigate={navigate} game={activeGame} />}
        {screen === SCREENS.LEADERBOARD && <Leaderboard     key="leaderboard" navigate={navigate} />}
        {screen === SCREENS.SUMMARY     && <FinalSummary    key="summary"     navigate={navigate} />}
        {screen === SCREENS.SELFIE      && <SelfieScreen    key="selfie"      navigate={navigate} />}
        {screen === SCREENS.STAFF       && (
          <StaffPanel key="staff" navigate={navigate} forceSync={forceSync} syncStatus={syncStatus} />
        )}
      </AnimatePresence>

      {/* Invisible long-press zone over the topbar logo area — works on every screen */}
      {screen !== SCREENS.STAFF && (
        <div
          {...logoLongPress}
          aria-hidden="true"
          style={{
            position: 'fixed', top: 0, left: 0,
            width: '200px', height: '64px',
            zIndex: 60,          // above content, below ticker (z-50) override not needed
            cursor:  'default',
            WebkitUserSelect: 'none', userSelect: 'none',
          }}
        />
      )}

      <TickerBanner />

    </div>
  )
}

export default function App() {
  return (
    <SessionProvider>
      <GameProvider>
        <AppInner />
      </GameProvider>
    </SessionProvider>
  )
}
