// src/App.jsx
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from './context/SessionContext'
import { GameProvider } from './context/GameContext'

// Screens — uncomment as they are built in each phase
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
// import SelfieScreen   from './screens/SelfieScreen'
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

export default function App() {
  // Registration is the launch screen (first screen users see)
  const [screen, setScreen] = useState(SCREENS.REGISTER)
  const [activeGame, setActiveGame] = useState(null)

  const navigate = (to, game = null) => {
    setActiveGame(game)
    setScreen(to)
  }

  return (
    <SessionProvider>
      <GameProvider>
        <div className="w-screen h-screen overflow-hidden bg-abyss relative">

          <AnimatePresence mode="wait">
            {screen === SCREENS.REGISTER  && <Registration    key="reg"     navigate={navigate} />}
            {screen === SCREENS.IDLE      && <IdleAttractor   key="idle"    navigate={navigate} />}
            {screen === SCREENS.HOME      && <HomeScreen      key="home"    navigate={navigate} />}
            {screen === SCREENS.GRAY_ROOM && <GrayRoom        key="gray"    navigate={navigate} />}
            {screen === SCREENS.DRAW_LINE && <DrawTheLine     key="draw"    navigate={navigate} />}
            {screen === SCREENS.THREAT    && <ThreatSurface   key="threat"  navigate={navigate} />}
            {screen === SCREENS.RED_TEAM  && <RedTeamRoulette key="red"     navigate={navigate} />}
            {screen === SCREENS.GAME_END    && <GameEnd        key="end"         navigate={navigate} game={activeGame} />}
            {screen === SCREENS.LEADERBOARD && <Leaderboard    key="leaderboard" navigate={navigate} />}
            {screen === SCREENS.SUMMARY   && <FinalSummary    key="summary" navigate={navigate} />}
            {/* {screen === SCREENS.SELFIE    && <SelfieScreen    key="selfie"  navigate={navigate} />} */}
          </AnimatePresence>

          <TickerBanner />

        </div>
      </GameProvider>
    </SessionProvider>
  )
}
