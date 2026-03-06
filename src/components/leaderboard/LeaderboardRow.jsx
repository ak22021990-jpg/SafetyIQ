// src/components/leaderboard/LeaderboardRow.jsx
import { motion, useReducedMotion } from 'framer-motion'
import { leaderboardItem } from '../../utils/motionVariants'

const RANK_COLORS = {
  1: '#E8C84A',  // Signal Gold
  2: '#A8B8C8',  // Silver
  3: '#B87A4A',  // Bronze
}

export default function LeaderboardRow({ entry, rank, isCurrentPlayer, index }) {
  const shouldReduce = useReducedMotion()

  const rankColor     = RANK_COLORS[rank] || '#E11D48'
  const isTop3        = rank <= 3
  const scoreFontSize = rank === 1 ? '32px' : rank === 2 ? '28px' : rank === 3 ? '24px' : '20px'

  return (
    <motion.div
      variants={!shouldReduce ? leaderboardItem : undefined}
      initial={!shouldReduce ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: !shouldReduce ? index * 0.06 : 0 }}
      layout
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '12px',
        padding:        isTop3 ? '14px 16px' : '10px 14px',
        background:     isCurrentPlayer ? 'rgba(225,29,72,0.08)' : 'transparent',
        border:         `1px solid ${isCurrentPlayer ? 'rgba(225,29,72,0.20)' : 'rgba(255,255,255,0.05)'}`,
        borderLeft:     isCurrentPlayer ? '2px solid #E11D48' : '2px solid transparent',
        borderRadius:   '4px',
        marginBottom:   '4px',
        boxShadow:      isCurrentPlayer ? '0 0 12px rgba(225,29,72,0.06)' : 'none',
        transition:     shouldReduce ? 'none' : 'background 200ms',
      }}
      role="listitem"
      aria-label={`Rank ${rank}: ${entry.player?.name}, score ${entry.totalScore}`}
    >
      {/* Rank */}
      <div
        style={{
          width:      '32px',
          flexShrink: 0,
          textAlign:  'right',
        }}
      >
        <span
          className="font-display"
          style={{
            fontSize:   isTop3 ? '24px' : '16px',
            color:      isTop3 ? rankColor : 'rgba(255,255,255,0.10)',
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {rank}
        </span>
      </div>

      {/* Name + company */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          className="font-heading font-bold text-text-primary uppercase"
          style={{
            fontSize:    isTop3 ? '14px' : '12px',
            whiteSpace:  'nowrap',
            overflow:    'hidden',
            textOverflow:'ellipsis',
          }}
        >
          {entry.name || entry.player?.name || 'Anonymous'}
        </p>
        <p className="font-mono text-text-muted" style={{ fontSize: '10px' }}>
          {entry.company || entry.player?.company || ''} · {entry.gamesCompleted || 0}/4 games
        </p>
      </div>

      {/* Score */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <p
          className="font-display"
          style={{
            fontSize:   scoreFontSize,
            color:      isTop3 ? rankColor : '#E11D48',
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {entry.totalScore || 0}
        </p>
      </div>
    </motion.div>
  )
}
