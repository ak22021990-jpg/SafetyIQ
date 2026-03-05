// src/components/selfie/SelfieCamera.jsx
// Live camera feed with overlay frame. "Capture →" freezes frame and composites card.
import { useRef, useEffect, useState } from 'react'
import NoCameraFallback from './NoCameraFallback'

const BASE_URL = import.meta.env.BASE_URL

export default function SelfieCamera({ playerName = '', onCapture, onFallback }) {
  const videoRef   = useRef(null)
  const streamRef  = useRef(null)
  const [cameraError, setCameraError] = useState(false)
  const [capturing,   setCapturing]   = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    let active = true
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } } })
      .then(stream => {
        if (!active) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight)
            videoRef.current.play()
              .then(() => {
                console.log('Video playing')
                setVideoReady(true)
              })
              .catch(err => {
                console.error('Video play failed:', err)
                setCameraError(true)
              })
          }
        }
      })
      .catch(err => { 
        console.error('getUserMedia failed:', err)
        if (active) setCameraError(true) 
      })

    return () => {
      active = false
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])

  const handleCapture = async () => {
    if (!videoReady || !videoRef.current || capturing) return
    setCapturing(true)
    try {
      const bitmap = await createImageBitmap(videoRef.current)
      streamRef.current?.getTracks().forEach(t => t.stop())
      onCapture(bitmap)
    } catch {
      setCapturing(false)
    }
  }

  if (cameraError) {
    return (
      <NoCameraFallback
        playerName={playerName}
        onContinue={onFallback}
      />
    )
  }

  return (
    /* Outer: full screen, black letterbox background */
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Portrait viewport — 9:16, height-constrained, centered */}
      <div style={{ position: 'relative', height: '100%', aspectRatio: '9 / 16', overflow: 'hidden' }}>

        {/* Live video */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onError={() => setCameraError(true)}
          style={{
            position:  'absolute',
            inset:      0,
            width:     '100%',
            height:    '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)', // mirror for selfie
            backgroundColor: 'transparent',
          }}
        />

        {/* Frame overlay PNG */}
        {/* <img
          src={`${BASE_URL}selfie-frame.png`}
          alt=""
          aria-hidden
          style={{
            position:  'absolute',
            inset:      0,
            width:     '100%',
            height:    '100%',
            objectFit: 'fill',
            pointerEvents: 'none',
          }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        /> */}

        {/* Capture button */}
        <div
          style={{
            position: 'absolute',
            bottom:   '48px',
            left:      0,
            right:     0,
            display:  'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={handleCapture}
            disabled={capturing}
            className="font-mono uppercase tracking-widest"
            style={{
              fontSize: '11px', letterSpacing: '2px', padding: '14px 36px',
              background: capturing ? 'rgba(201,169,110,0.5)' : '#C9A96E',
              color: '#07101C', fontWeight: 700,
              border: 'none', borderRadius: '4px', cursor: capturing ? 'default' : 'pointer',
            }}
          >
            {capturing ? 'Capturing…' : 'Capture →'}
          </button>
        </div>

      </div>
    </div>
  )
}
