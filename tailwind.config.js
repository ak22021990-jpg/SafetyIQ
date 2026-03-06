/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Background layers — dark studio palette
        studio:  '#020617',
        canvas:  '#0F172A',
        surface: { DEFAULT: '#1E293B', raised: '#334155', border: '#475569' },

        // Legacy aliases kept for backwards compatibility
        abyss:   '#020617',
        navy:    { DEFAULT: '#0F172A', panel: '#1E293B', elevated: '#334155' },

        // Primary brand — Midnight Blue
        midnight: '#0F172A',

        // Human Red — CTAs and urgent elements
        humanRed: { DEFAULT: '#E11D48', dim: 'rgba(225,29,72,0.08)', border: 'rgba(225,29,72,0.25)' },

        // Gold accent — remapped to Human Red
        gold: {
          DEFAULT: '#E11D48',
          signal:  '#E8C84A',
          dim:     'rgba(225,29,72,0.12)',
          ghost:   'rgba(225,29,72,0.05)',
          border:  'rgba(225,29,72,0.30)',
          strong:  'rgba(225,29,72,0.60)',
        },

        // Functional — game states only
        red:    { signal: '#E8192C', dim: 'rgba(232,25,44,0.10)' },
        green:  { signal: '#00C896', dim: 'rgba(0,200,150,0.10)' },
        amber:  { warm:   '#E8A830', dim: 'rgba(232,168,48,0.10)' },

        // Text — light on dark
        text: {
          primary:   '#F8FAFC',
          secondary: '#CBD5E1',
          muted:     '#94A3B8',
          inverse:   '#0F172A',
        },

        // Badge categories
        badge: {
          gold:    '#E11D48',
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
        display:        ['Playfair Display', 'Georgia', 'serif'],
        heading:        ['Inter', 'system-ui', 'sans-serif'],
        'heading-tight': ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        mono:           ['JetBrains Mono', 'DM Mono', 'Courier New', 'monospace'],
        pulse:          ['Syne', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-xl': ['120px', { lineHeight: '0.90', letterSpacing: '-3px' }],
        'display-l':  ['80px',  { lineHeight: '0.92', letterSpacing: '-2px' }],
        'display-m':  ['56px',  { lineHeight: '0.95', letterSpacing: '-1.5px' }],
        'display-s':  ['40px',  { lineHeight: '1.00', letterSpacing: '-1px' }],
        'display-xs': ['32px',  { lineHeight: '1.10', letterSpacing: '0px' }],
        'h1': ['44px', { lineHeight: '1.05', letterSpacing: '-0.5px' }],
        'h2': ['28px', { lineHeight: '1.10', letterSpacing: '-0.02em' }],
        'h3': ['20px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h4': ['14px', { lineHeight: '1.00', letterSpacing: '0px' }],
        'body-l': ['16px', { lineHeight: '1.75', letterSpacing: '0.1px' }],
        'body-m': ['14px', { lineHeight: '1.70', letterSpacing: '0.1px' }],
        'body-s': ['12px', { lineHeight: '1.60', letterSpacing: '0.1px' }],
        'label':  ['11px', { lineHeight: '1.00', letterSpacing: '1px' }],
        'micro':  ['10px', { lineHeight: '1.00', letterSpacing: '1.5px' }],
      },

      spacing: {
        '1':  '4px',  '2':  '8px',  '3':  '12px', '4':  '16px',
        '5':  '20px', '6':  '24px', '8':  '32px',  '10': '40px',
        '12': '48px', '16': '64px', '20': '80px',
      },

      borderRadius: {
        card:  '12px',
        badge: '4px',
        input: '8px',
        pill:  '100px',
      },

      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        medium: '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.04)',
        deep:   '0 25px 50px -12px rgba(0,0,0,0.12)',
        glow:   '0 0 20px rgba(225,29,72,0.15)',
        card:   '0 10px 15px -3px rgba(0,0,0,0.05)',
      },

      // Per-game topbar accent colours
      borderColor: {
        'game-gray':   '#E11D48',
        'game-policy': '#4A7FA5',
        'game-threat': '#E8A830',
        'game-red':    '#00C896',
      },
    },
  },
  plugins: [],
}
