// src/constants/screens.js
// Screen name constants — kept in their own file to avoid circular imports.
// App.jsx imports all screens; screens must NOT import back from App.jsx.

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
