// src/screens/SelfieScreen.jsx
// Phase: camera → badge select → delivery options
// "Back to Summary →" always visible
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import SelfieCamera from '../components/selfie/SelfieCamera'
import BadgeSelector from '../components/selfie/BadgeSelector'
import DeliveryOptions from '../components/selfie/DeliveryOptions'
import { useSession } from '../context/SessionContext'
import { getBadgesByIds } from '../utils/badgeEngine'
import { composeSelfieCard } from '../utils/selfieCompositor'
import { SCREENS } from '../constants/screens'

// phase: 'camera' | 'badgeSelect' | 'compositing' | 'delivery'

export default function SelfieScreen({ navigate }) {
  const { player, badges: earnedIds, totalScore } = useSession()

  const [phase,         setPhase]         = useState('camera')
  const [cameraBitmap,  setCameraBitmap]  = useState(null)  // ImageBitmap from capture
  const [avatarInitials,setAvatarInitials]= useState('')    // when camera denied
  const [selectedBadges,setSelectedBadges]= useState(() => getBadgesByIds(earnedIds).slice(0, 4))
  const [composedBlob,  setComposedBlob]  = useState(null)
  const [composeError,  setComposeError]  = useState(false)

  // When phase reaches badgeSelect, initialise selected badges
  useEffect(() => {
    if (phase === 'badgeSelect') {
      setSelectedBadges(getBadgesByIds(earnedIds).slice(0, 4))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Called by SelfieCamera on successful capture
  const handleCapture = useCallback((bitmap) => {
    setCameraBitmap(bitmap)
    setAvatarInitials('')
    setPhase('badgeSelect')
  }, [])

  // Called by NoCameraFallback — skip camera, use initials
  const handleFallback = useCallback((initials) => {
    setCameraBitmap(null)
    setAvatarInitials(initials)
    setPhase('badgeSelect')
  }, [])

  // When user confirms badge selection → compose card
  const handleCompose = async () => {
    setPhase('compositing')
    setComposeError(false)
    try {
      const blob = await composeSelfieCard({
        cameraBitmap,
        avatarInitials,
        selectedBadges,
        playerData: {
          name:    player?.name    || '',
          title:   player?.title   || '',
          company: player?.company || '',
          score:   totalScore,
        },
      })
      setComposedBlob(blob)
      setPhase('delivery')
    } catch {
      setComposeError(true)
      setPhase('badgeSelect')
    }
  }

  return (
    <ScreenWrapper>
      <div className="w-full h-full flex flex-col relative overflow-hidden">

        {/* Back button — always visible */}
        <button
          onClick={() => navigate(SCREENS.SUMMARY)}
          className="absolute top-4 left-4 font-mono uppercase text-text-muted"
          style={{
            fontSize: '9px', letterSpacing: '2px',
            background: 'rgba(255,255,255,0.9)', border: '1px solid #E2E8F0',
            borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', color: '#0F172A',
            zIndex: 70,
          }}
        >
          ← Back to Summary
        </button>

        <AnimatePresence mode="wait">

          {/* ── CAMERA PHASE ─────────────────────────── */}
          {phase === 'camera' && (
            <motion.div
              key="camera"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SelfieCamera
                playerName={player?.name || ''}
                onCapture={handleCapture}
                onFallback={handleFallback}
              />
            </motion.div>
          )}

          {/* ── BADGE SELECT PHASE ───────────────────── */}
          {phase === 'badgeSelect' && (
            <motion.div
              key="badges"
              className="flex flex-col items-center justify-center h-full px-6 gap-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-center">
                <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                  Summit Card
                </p>
                <h2 className="font-heading font-extrabold text-text-primary" style={{ fontSize: '20px' }}>
                  Choose your badges
                </h2>
                <p className="font-mono text-text-muted mt-1" style={{ fontSize: '10px' }}>
                  Up to 4 will appear on your card
                </p>
              </div>

              {earnedIds.length > 0 ? (
                <BadgeSelector
                  earnedIds={earnedIds}
                  onChange={setSelectedBadges}
                />
              ) : (
                <p className="font-mono text-text-muted" style={{ fontSize: '11px' }}>
                  No badges earned — your card will still look great.
                </p>
              )}

              {composeError && (
                <p className="font-mono text-red-400 text-center" style={{ fontSize: '10px' }}>
                  Card generation failed — please try again.
                </p>
              )}

              <div className="flex flex-col gap-3 w-full" style={{ maxWidth: '320px' }}>
                <button
                  onClick={handleCompose}
                  className="w-full font-mono uppercase tracking-widest"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '13px',
                    background: '#0F172A', color: '#FFFFFF',
                    fontWeight: 700, border: 'none', borderRadius: '8px', cursor: 'pointer',
                  }}
                >
                  Create my Summit Card →
                </button>
                <button
                  onClick={() => setPhase('camera')}
                  className="w-full font-mono uppercase tracking-widest"
                  style={{
                    fontSize: '10px', letterSpacing: '2px', padding: '11px',
                    background: 'transparent', color: '#475569',
                    border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer',
                  }}
                >
                  Retake photo
                </button>
              </div>
            </motion.div>
          )}

          {/* ── COMPOSITING PHASE ───────────────────── */}
          {phase === 'compositing' && (
            <motion.div
              key="compositing"
              className="flex flex-col items-center justify-center h-full gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '40px', height: '40px',
                  border: '3px solid rgba(201,169,110,0.2)',
                  borderTop: '3px solid #C9A96E',
                  borderRadius: '50%',
                }}
              />
              <p className="font-mono uppercase text-text-muted" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                Creating your Summit Card…
              </p>
            </motion.div>
          )}

          {/* ── DELIVERY PHASE ──────────────────────── */}
          {phase === 'delivery' && (
            <motion.div
              key="delivery"
              className="flex flex-col items-center h-full overflow-y-auto"
              style={{ padding: '80px 20px 40px' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-mono uppercase text-text-muted mb-1" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                Summit Card
              </p>
              <h2 className="font-heading font-extrabold text-text-primary mb-6" style={{ fontSize: '20px' }}>
                Your card is ready
              </h2>

              <DeliveryOptions
                blob={composedBlob}
                playerEmail={player?.email || ''}
                playerName={player?.name   || ''}
              />

              <button
                onClick={() => navigate(SCREENS.REGISTER)}
                className="font-mono uppercase tracking-widest mt-8"
                style={{
                  fontSize: '10px', letterSpacing: '2px', padding: '11px 24px',
                  background: 'transparent', color: '#94A3B8',
                  border: '1px solid #E2E8F0', borderRadius: '4px', cursor: 'pointer',
                }}
              >
                Play Again
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </ScreenWrapper>
  )
}
