// src/components/selfie/DeliveryOptions.jsx
// Upload progress + 4 delivery options: QR, WhatsApp, Email, Download.
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'qrcode'
import { uploadSelfie } from '../../utils/cloudinaryUpload'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export default function DeliveryOptions({ blob, playerEmail = '', playerName = '' }) {
  const isOnline = useOnlineStatus()

  // 'uploading' | 'success' | 'offline' | 'error'
  const [uploadStatus, setUploadStatus] = useState('uploading')
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null)
  const [qrDataUrl, setQrDataUrl] = useState(null)
  const [progress, setProgress] = useState(0)
  const downloadRef = useRef(null)

  // Animate upload progress bar (visual feedback — actual upload is binary)
  useEffect(() => {
    if (uploadStatus !== 'uploading') return
    const start = Date.now()
    const target = 3200 // ms to reach 90%
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min((elapsed / target) * 90, 90))
    }, 80)
    return () => clearInterval(id)
  }, [uploadStatus])

  // Start upload when blob is ready
  useEffect(() => {
    if (!blob) return
    if (!isOnline) { setUploadStatus('offline'); setProgress(100); return }

    uploadSelfie(blob)
      .then(url => {
        setCloudinaryUrl(url)
        setProgress(100)
        setUploadStatus('success')
      })
      .catch(() => {
        setProgress(100)
        setUploadStatus('offline')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blob])

  // Generate QR once we have the Cloudinary URL
  useEffect(() => {
    if (!cloudinaryUrl) return
    QRCode.toDataURL(cloudinaryUrl, {
      width: 160, margin: 1,
      color: { dark: '#E8EDF5', light: '#07101C' },
    }).then(setQrDataUrl).catch(() => { })
  }, [cloudinaryUrl])

  const blobUrl = blob ? URL.createObjectURL(blob) : null

  const whatsappText = encodeURIComponent(
    cloudinaryUrl
      ? `Here's my Safety IQ Summit Card! ${cloudinaryUrl}`
      : "I just completed the Signal & Noise Safety IQ Challenge at the Sutherland booth!"
  )
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappText}`
  const mailtoSubject = encodeURIComponent('Your Safety IQ Summit Card')
  const mailtoBody = encodeURIComponent(
    cloudinaryUrl
      ? `View your Summit Card here:\n${cloudinaryUrl}`
      : `Download your Summit Card from the link above.\n\n- Signal & Noise · Sutherland`
  )
  const mailtoUrl = `mailto:${playerEmail}?subject=${mailtoSubject}&body=${mailtoBody}`

  const BTN = {
    base: {
      fontSize: '10px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      padding: '13px',
      border: '1px solid #CBD5E1',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
      background: 'transparent',
      color: '#0F172A',
      display: 'block',
      textAlign: 'center',
      textDecoration: 'none',
    },
    primary: {
      background: '#E11D48',
      color: '#07101C',
      fontWeight: 700,
      border: 'none',
    },
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full" style={{ maxWidth: '320px', margin: '0 auto' }}>

      {/* Upload status + progress bar */}
      <div className="w-full">
        <p className="font-mono text-text-muted text-center mb-2" style={{ fontSize: '9px', letterSpacing: '2px' }}>
          {uploadStatus === 'uploading' && 'Creating your Summit Card…'}
          {uploadStatus === 'success' && 'Summit Card ready'}
          {uploadStatus === 'offline' && 'Ready for download'}
          {uploadStatus === 'error' && 'Ready for download'}
        </p>
        <div
          style={{
            height: '3px',
            background: '#E2E8F0',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
            style={{ height: '100%', background: '#E11D48', borderRadius: '2px' }}
          />
        </div>
      </div>

      {/* QR code — success + online only */}
      <AnimatePresence>
        {uploadStatus === 'success' && qrDataUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="flex flex-col items-center gap-2"
          >
            <img
              src={qrDataUrl}
              alt="QR to your Summit Card"
              style={{ width: '140px', height: '140px', borderRadius: '4px' }}
            />
            <p className="font-mono text-text-muted" style={{ fontSize: '9px' }}>
              Scan to save your card
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp — online + cloudinary success */}
      {isOnline && uploadStatus === 'success' && (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-mono" style={{ ...BTN.base, ...BTN.primary }}>
          Share via WhatsApp →
        </a>
      )}

      {/* Email */}
      {playerEmail && (
        <a href={mailtoUrl} className="font-mono" style={{ ...BTN.base }}>
          Send to {playerEmail}
        </a>
      )}

      {/* Download — always available */}
      {blobUrl && (
        <a
          ref={downloadRef}
          href={blobUrl}
          download={`safety-iq-${playerName.replace(/\s+/g, '-').toLowerCase() || 'card'}.png`}
          className="font-mono"
          style={{ ...BTN.base }}
        >
          Download PNG
        </a>
      )}
    </div>
  )
}
