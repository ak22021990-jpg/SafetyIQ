// src/screens/StaffPanel.jsx
// Hidden staff panel — accessed via 3s long-press on the Sutherland logo.
// Password gated. 5 actions: Export CSV, Force Sync, Reset Leaderboard,
// View Raw Data, Clear All Data.
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllSessions, exportCSV, resetLeaderboard } from '../utils/storageEngine'
import { SCREENS } from '../constants/screens'

const DEFAULT_PASSWORD = 'sutherland2025'
const STAFF_PASSWORD   = import.meta.env.VITE_STAFF_PASSWORD || DEFAULT_PASSWORD
const MAX_ATTEMPTS     = 3
const LOCKOUT_MS       = 60_000

// ── Small reusable button ────────────────────────────────────────────────────
function StaffBtn({ onClick, children, variant = 'ghost', disabled = false }) {
  const styles = {
    ghost:   { background: 'transparent',             color: '#E8EDF5', border: '1px solid rgba(255,255,255,0.12)' },
    gold:    { background: 'transparent',             color: '#C9A96E', border: '1px solid #C9A96E' },
    danger:  { background: 'transparent',             color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.4)' },
    primary: { background: '#C9A96E', color: '#07101C', border: 'none', fontWeight: 700 },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        width: '100%', padding: '12px', borderRadius: '4px', cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  )
}

// ── Confirm modal ────────────────────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel, requireTyped }) {
  const [typed, setTyped] = useState('')
  const ready = requireTyped ? typed === requireTyped : true

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(7,16,28,0.92)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#111F32', border: '1px solid rgba(255,107,107,0.3)',
          borderRadius: '6px', padding: '28px', width: '100%', maxWidth: '340px',
        }}
      >
        <p className="font-heading font-bold text-text-primary mb-3" style={{ fontSize: '16px' }}>{message}</p>
        {requireTyped && (
          <div className="mb-4">
            <p className="font-mono text-text-muted mb-2" style={{ fontSize: '10px' }}>
              Type <span className="text-red-400">{requireTyped}</span> to confirm
            </p>
            <input
              value={typed}
              onChange={e => setTyped(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '4px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#E8EDF5', fontFamily: 'DM Mono, monospace', fontSize: '13px',
              }}
              autoFocus
            />
          </div>
        )}
        <div className="flex gap-3">
          <StaffBtn onClick={onCancel} variant="ghost">Cancel</StaffBtn>
          <StaffBtn onClick={onConfirm} variant="danger" disabled={!ready}>Confirm</StaffBtn>
        </div>
      </motion.div>
    </div>
  )
}

// ── Raw data modal ───────────────────────────────────────────────────────────
function RawDataModal({ onClose }) {
  const sessions = getAllSessions()
  const raw      = JSON.stringify(sessions, null, 2)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(raw).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(7,16,28,0.96)',
        display: 'flex', flexDirection: 'column', padding: '24px',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono uppercase text-gold" style={{ fontSize: '9px', letterSpacing: '3px' }}>
          Raw Session Data
        </p>
        <div className="flex gap-2">
          <StaffBtn onClick={handleCopy} variant="gold">{copied ? 'Copied ✓' : 'Copy JSON'}</StaffBtn>
          <StaffBtn onClick={onClose} variant="ghost">Close ×</StaffBtn>
        </div>
      </div>
      <pre
        style={{
          flex: 1, overflow: 'auto', background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px',
          padding: '16px', fontFamily: 'DM Mono, monospace', fontSize: '10px',
          color: '#8899AA', lineHeight: '1.6',
        }}
      >
        {raw || 'No sessions recorded yet.'}
      </pre>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function StaffPanel({ navigate, forceSync, syncStatus }) {
  // ── Password gate ────────────────────────────────────────────────────────
  const [authed,       setAuthed]       = useState(false)
  const [pwInput,      setPwInput]      = useState('')
  const [attempts,     setAttempts]     = useState(0)
  const [lockedUntil,  setLockedUntil]  = useState(null)
  const [pwError,      setPwError]      = useState('')

  // ── UI state ─────────────────────────────────────────────────────────────
  const [confirm,      setConfirm]      = useState(null)  // { message, action, requireTyped? }
  const [showRaw,      setShowRaw]      = useState(false)
  const [actionMsg,    setActionMsg]    = useState('')

  const sessions     = getAllSessions()
  const totalPlayers = sessions.length
  const completed    = sessions.filter(s => s.completed).length
  const avgScore     = totalPlayers
    ? Math.round(sessions.reduce((s, x) => s + (x.totalScore || 0), 0) / totalPlayers)
    : 0

  // Lockout countdown
  const [lockRemaining, setLockRemaining] = useState(0)
  useEffect(() => {
    if (!lockedUntil) return
    const tick = setInterval(() => {
      const rem = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000))
      setLockRemaining(rem)
      if (rem === 0) { setLockedUntil(null); setAttempts(0) }
    }, 500)
    return () => clearInterval(tick)
  }, [lockedUntil])

  const isLocked = lockedUntil && Date.now() < lockedUntil

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (isLocked) return
    if (pwInput === STAFF_PASSWORD) {
      setAuthed(true)
      setPwError('')
    } else {
      const next = attempts + 1
      setAttempts(next)
      setPwInput('')
      if (next >= MAX_ATTEMPTS) {
        setLockedUntil(Date.now() + LOCKOUT_MS)
        setPwError(`Locked for 60 seconds.`)
      } else {
        setPwError(`Incorrect. ${MAX_ATTEMPTS - next} attempt${MAX_ATTEMPTS - next !== 1 ? 's' : ''} remaining.`)
      }
    }
  }

  // ── Actions ──────────────────────────────────────────────────────────────
  const flash = (msg) => { setActionMsg(msg); setTimeout(() => setActionMsg(''), 3000) }

  const handleExportCSV = () => {
    exportCSV()
    flash(`Exported ${totalPlayers} session${totalPlayers !== 1 ? 's' : ''} to CSV.`)
  }

  const handleForceSync = async () => {
    flash('Syncing…')
    await forceSync?.()
    flash('Sync complete.')
  }

  const handleResetLeaderboard = () => {
    setConfirm({
      message: 'Reset the leaderboard? This cannot be undone.',
      action: () => {
        resetLeaderboard()
        flash('Leaderboard cleared.')
      },
    })
  }

  const handleClearAll = () => {
    setConfirm({
      message: 'Delete ALL session data, leaderboard, and ticker stats?',
      requireTyped: 'CLEAR',
      action: () => {
        ;['sn_sessions', 'sn_leaderboard', 'sn_ticker_stats', 'sn_synced_ids'].forEach(k =>
          localStorage.removeItem(k)
        )
        flash('All data cleared.')
      },
    })
  }

  const SYNC_ICONS = { idle: '–', syncing: '⟳', synced: '🟢', queued: '🟡', offline: '🔴' }

  // ── Password screen ───────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: 'rgba(7,16,28,0.97)', backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '320px' }}>
          <p className="font-mono uppercase text-gold mb-1 text-center" style={{ fontSize: '9px', letterSpacing: '3px' }}>
            Staff Panel
          </p>
          <h2 className="font-heading font-extrabold text-text-primary text-center mb-8" style={{ fontSize: '22px' }}>
            Enter Password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              value={pwInput}
              onChange={e => setPwInput(e.target.value)}
              disabled={!!isLocked}
              placeholder="Staff password"
              style={{
                padding: '12px 14px', borderRadius: '4px', width: '100%',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#E8EDF5', fontFamily: 'DM Mono, monospace', fontSize: '14px',
              }}
              autoFocus
            />
            {pwError && (
              <p className="font-mono text-red-400 text-center" style={{ fontSize: '10px' }}>
                {isLocked ? `Locked — try again in ${lockRemaining}s` : pwError}
              </p>
            )}
            <StaffBtn variant="primary" disabled={!!isLocked}>Unlock →</StaffBtn>
          </form>
          <button
            onClick={() => navigate(SCREENS.HOME)}
            className="w-full font-mono uppercase text-text-muted mt-4 text-center"
            style={{ fontSize: '9px', letterSpacing: '2px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            ← Back
          </button>
        </div>
      </div>
    )
  }

  // ── Authenticated panel ───────────────────────────────────────────────────
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'rgba(7,16,28,0.97)', backdropFilter: 'blur(12px)',
        overflow: 'auto',
      }}
    >
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono uppercase text-gold mb-1" style={{ fontSize: '9px', letterSpacing: '3px' }}>
              Signal &amp; Noise
            </p>
            <h1 className="font-heading font-extrabold text-text-primary" style={{ fontSize: '22px' }}>
              Staff Panel
            </h1>
          </div>
          <button
            onClick={() => navigate(SCREENS.HOME)}
            className="font-mono text-text-muted"
            style={{
              fontSize: '11px', background: 'none', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', color: '#E8EDF5',
            }}
          >
            Close ×
          </button>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { label: 'Total Players', value: totalPlayers },
            { label: 'Completed All', value: completed },
            { label: 'Avg Score',     value: avgScore },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px', padding: '14px 12px', textAlign: 'center',
              }}
            >
              <p className="font-display font-semibold text-gold" style={{ fontSize: '28px', lineHeight: 1 }}>{value}</p>
              <p className="font-mono text-text-muted mt-1" style={{ fontSize: '9px', letterSpacing: '1px' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Sync status */}
        <div
          className="flex items-center justify-between mb-6"
          style={{
            padding: '10px 14px', background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px',
          }}
        >
          <span className="font-mono text-text-muted" style={{ fontSize: '10px', letterSpacing: '1px' }}>
            Sheets Sync
          </span>
          <span className="font-mono text-text-secondary" style={{ fontSize: '10px' }}>
            {SYNC_ICONS[syncStatus] || '–'} {syncStatus}
          </span>
        </div>

        {/* Action message */}
        <AnimatePresence>
          {actionMsg && (
            <motion.p
              key={actionMsg}
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="font-mono text-gold text-center mb-4"
              style={{ fontSize: '10px' }}
            >
              {actionMsg}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <StaffBtn onClick={handleExportCSV}         variant="gold">Export CSV →</StaffBtn>
          <StaffBtn onClick={handleForceSync}         variant="ghost">Force Sheets Sync</StaffBtn>
          <StaffBtn onClick={() => setShowRaw(true)}  variant="ghost">View Raw Data</StaffBtn>
          <StaffBtn onClick={handleResetLeaderboard}  variant="danger">Reset Leaderboard</StaffBtn>
          <StaffBtn onClick={handleClearAll}          variant="danger">Clear All Data</StaffBtn>
        </div>

        {/* Default password reminder */}
        {STAFF_PASSWORD === DEFAULT_PASSWORD && (
          <p className="font-mono text-yellow-500 text-center mt-6" style={{ fontSize: '9px', letterSpacing: '1px' }}>
            ⚠️ Using default password — set VITE_STAFF_PASSWORD before summit
          </p>
        )}
      </div>

      {/* Modals */}
      {confirm && (
        <ConfirmModal
          message={confirm.message}
          requireTyped={confirm.requireTyped}
          onConfirm={() => { confirm.action(); setConfirm(null) }}
          onCancel={() => setConfirm(null)}
        />
      )}
      {showRaw && <RawDataModal onClose={() => setShowRaw(false)} />}
    </div>
  )
}
