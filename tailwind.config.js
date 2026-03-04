/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Background layers
        abyss:   '#07101C',
        navy:    { DEFAULT: '#0D1828', panel: '#111F32', elevated: '#172540' },

        // Brand accent
        gold: {
          DEFAULT: '#C9A96E',
          signal:  '#E8C84A',
          dim:     'rgba(201,169,110,0.15)',
          ghost:   'rgba(201,169,110,0.06)',
          border:  'rgba(201,169,110,0.30)',
          strong:  'rgba(201,169,110,0.60)',
        },

        // Functional — game states only
        red:    { signal: '#E8192C', dim: 'rgba(232,25,44,0.12)' },
        green:  { signal: '#00C896', dim: 'rgba(0,200,150,0.12)' },
        amber:  { warm:   '#E8A830', dim: 'rgba(232,168,48,0.12)' },

        // Text
        text: {
          primary:   '#E8EDF5',
          secondary: '#8899AA',
          muted:     '#566478',
          inverse:   '#07101C',
        },

        // Badge categories
        badge: {
          gold:    '#C9A96E',
          blue:    '#4A7FA5',
          teal:    '#3A8B7A',
          mauve:   '#8B6B8A',
          signal:  '#E8C84A',
        },

        // Rank colours
        rank: {
          gold:   '#E8C84A',
          silver: '#A8B8C8',
          bronze: '#B87A4A',
        },

        // Fake platform
        pulse: '#4A6FA5',
      },

      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        heading:  ['Syne', 'system-ui', 'sans-serif'],
        mono:     ['DM Mono', 'Courier New', 'monospace'],
      },

      fontSize: {
        'display-xl': ['120px', { lineHeight: '0.90', letterSpacing: '-3px' }],
        'display-l':  ['80px',  { lineHeight: '0.92', letterSpacing: '-2px' }],
        'display-m':  ['56px',  { lineHeight: '0.95', letterSpacing: '-1.5px' }],
        'display-s':  ['40px',  { lineHeight: '1.00', letterSpacing: '-1px' }],
        'display-xs': ['32px',  { lineHeight: '1.10', letterSpacing: '0px' }],
        'h1': ['44px', { lineHeight: '1.05', letterSpacing: '-0.5px' }],
        'h2': ['28px', { lineHeight: '1.10', letterSpacing: '0px' }],
        'h3': ['20px', { lineHeight: '1.15', letterSpacing: '0px' }],
        'h4': ['14px', { lineHeight: '1.00', letterSpacing: '3px' }],
        'body-l': ['16px', { lineHeight: '1.75', letterSpacing: '0.2px' }],
        'body-m': ['13px', { lineHeight: '1.70', letterSpacing: '0.2px' }],
        'body-s': ['11px', { lineHeight: '1.60', letterSpacing: '0.3px' }],
        'label':  ['10px', { lineHeight: '1.00', letterSpacing: '2px' }],
        'micro':  ['9px',  { lineHeight: '1.00', letterSpacing: '3px' }],
      },

      spacing: {
        '1':  '4px',  '2':  '8px',  '3':  '12px', '4':  '16px',
        '5':  '20px', '6':  '24px', '8':  '32px',  '10': '40px',
        '12': '48px', '16': '64px', '20': '80px',
      },

      borderRadius: {
        card:  '0px',
        badge: '2px',
        input: '0px',
        pill:  '100px',
      },

      boxShadow: {
        subtle: '0 2px 8px rgba(0,0,0,0.30)',
        medium: '0 8px 24px rgba(0,0,0,0.50)',
        deep:   '0 24px 60px rgba(0,0,0,0.70)',
        glow:   '0 0 20px rgba(201,169,110,0.06)',
      },

      // Per-game topbar accent colours
      borderColor: {
        'game-gray':   '#C9A96E',
        'game-policy': '#4A7FA5',
        'game-threat': '#E8A830',
        'game-red':    '#00C896',
      },
    },
  },
  plugins: [],
}
