// src/utils/selfieCompositor.js
// Composites camera feed + overlay frame + player data into a 1080×1920 PNG blob.

const BASE_URL = import.meta.env.BASE_URL

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload  = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function loadBadgeImage(badge) {
  if (!badge?.imageFile) return null
  try {
    return await loadImage(`${BASE_URL}badges/${badge.imageFile}`)
  } catch {
    return null
  }
}

/**
 * Compose the selfie card.
 *
 * @param {object} params
 * @param {ImageBitmap|null} params.cameraBitmap  — null for no-camera (initials avatar)
 * @param {string}           params.avatarInitials — used when cameraBitmap is null
 * @param {object[]}         params.selectedBadges — badge objects (up to 4)
 * @param {object}           params.playerData     — { name, title, company, score }
 * @returns {Promise<Blob>}
 */
export async function composeSelfieCard({
  cameraBitmap   = null,
  avatarInitials = '',
  selectedBadges = [],
  playerData     = {},
  width          = 1080,
  height         = 1920,
}) {
  const canvas  = document.createElement('canvas')
  canvas.width  = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // ── 1. Background ──────────────────────────────────────────────
  ctx.fillStyle = '#07101C'
  ctx.fillRect(0, 0, width, height)

  // ── 2. Camera feed or avatar ───────────────────────────────────
  if (cameraBitmap) {
    console.log('Compositing camera bitmap:', cameraBitmap.width, 'x', cameraBitmap.height)
    // Scale camera feed to fill canvas (cover)
    const scale = Math.max(width / cameraBitmap.width, height / cameraBitmap.height)
    const dx    = (width  - cameraBitmap.width  * scale) / 2
    const dy    = (height - cameraBitmap.height * scale) / 2
    ctx.drawImage(cameraBitmap, dx, dy, cameraBitmap.width * scale, cameraBitmap.height * scale)
  } else if (avatarInitials) {
    // Initials avatar circle
    const cx = width / 2
    const cy = height * 0.38
    const r  = 220
    ctx.fillStyle = '#4A6FA5'
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.font      = '800 180px Syne, sans-serif'
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(avatarInitials.slice(0, 2).toUpperCase(), cx, cy)
    ctx.textAlign    = 'left'
    ctx.textBaseline = 'alphabetic'
  }

  // ── 3. Dark bottom info panel + corner accents ─────────────────
  const panelH = 560
  ctx.fillStyle = 'rgba(7,16,28,0.88)'
  ctx.fillRect(0, height - panelH, width, panelH)
  // Corner accents (gold)
  ctx.strokeStyle = '#C9A96E'
  ctx.lineWidth   = 4
  const accentLen = 48
  // top-left
  ctx.beginPath(); ctx.moveTo(30, 30 + accentLen); ctx.lineTo(30, 30); ctx.lineTo(30 + accentLen, 30); ctx.stroke()
  // top-right
  ctx.beginPath(); ctx.moveTo(width - 30 - accentLen, 30); ctx.lineTo(width - 30, 30); ctx.lineTo(width - 30, 30 + accentLen); ctx.stroke()
  // bottom-left
  ctx.beginPath(); ctx.moveTo(30, height - 30 - accentLen); ctx.lineTo(30, height - 30); ctx.lineTo(30 + accentLen, height - 30); ctx.stroke()
  // bottom-right
  ctx.beginPath(); ctx.moveTo(width - 30 - accentLen, height - 30); ctx.lineTo(width - 30, height - 30); ctx.lineTo(width - 30, height - 30 - accentLen); ctx.stroke()

  // ── 4. Player name ─────────────────────────────────────────────
  const baseY = height - 480
  ctx.font         = '800 52px Syne, sans-serif'
  ctx.fillStyle    = '#FFFFFF'
  ctx.textAlign    = 'left'
  ctx.fillText((playerData.name || '').toUpperCase(), 80, baseY)

  // ── 4. Title · Company ─────────────────────────────────────────
  ctx.font      = '400 28px DM Mono, monospace'
  ctx.fillStyle = '#8899AA'
  const sub = [playerData.title, playerData.company].filter(Boolean).join(' · ')
  ctx.fillText(sub, 80, baseY + 50)

  // ── 5. SAFETY IQ label ─────────────────────────────────────────
  ctx.font      = '500 22px DM Mono, monospace'
  ctx.fillStyle = '#C9A96E'
  ctx.fillText('SAFETY IQ', 80, baseY + 110)

  // ── 6. Score ───────────────────────────────────────────────────
  ctx.font      = '600 120px Syne, sans-serif'
  ctx.fillStyle = '#C9A96E'
  ctx.fillText((playerData.score ?? 0).toString(), 80, baseY + 230)

  // ── 7. Badges (up to 4) ────────────────────────────────────────
  const badgeSize = 80
  const badgeGap  = 28
  const badgesX   = 80
  const badgesY   = baseY + 270

  for (let i = 0; i < Math.min(selectedBadges.length, 4); i++) {
    const img = await loadBadgeImage(selectedBadges[i])
    if (img) {
      ctx.drawImage(img, badgesX + i * (badgeSize + badgeGap), badgesY, badgeSize, badgeSize)
    } else if (selectedBadges[i]?.icon) {
      // Emoji fallback
      ctx.font      = '60px serif'
      ctx.textAlign = 'center'
      ctx.fillText(selectedBadges[i].icon, badgesX + i * (badgeSize + badgeGap) + badgeSize / 2, badgesY + badgeSize * 0.75)
      ctx.textAlign = 'left'
    }
  }

  // ── 8. "Signal & Noise · Sutherland" mark ─────────────────────
  ctx.font      = '700 22px Syne, sans-serif'
  ctx.fillStyle = 'rgba(232,237,245,0.5)'
  ctx.textAlign = 'right'
  ctx.fillText('Signal & Noise · Sutherland', width - 80, height - 60)
  ctx.textAlign = 'left'

  // Return as PNG blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')), 'image/png', 0.95)
  })
}
