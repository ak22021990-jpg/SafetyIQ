// src/utils/selfieCompositor.js
// Composites camera feed + overlay frame + player data into a 1080×1920 PNG blob.
import selfieFrameUrl from '../assets/selfie-overlay-frame.png'

const BASE_URL = import.meta.env.BASE_URL

// ── New frame layout constants (1080×1920) ───────────────────────────────────
// Trust & Safety Summit frame: dark header / transparent white window / dark footer
const FRAME_HEADER_H = 158   // dark top band (logo + diamonds)
const FRAME_FOOTER_H = 250   // dark bottom band (Sutherland / Building Safer Communities)
const FRAME_SIDE_PAD = 40    // horizontal margin from canvas edge to white window

// Derived white-window bounds
const WIN_X = FRAME_SIDE_PAD
const WIN_Y = FRAME_HEADER_H
// WIN_W and WIN_H are computed at call time from canvas width/height

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

  // Computed white-window dimensions
  const winW   = width  - FRAME_SIDE_PAD * 2       // ~1000
  const winBot = height - FRAME_FOOTER_H            // ~1632
  const winH   = winBot - WIN_Y                     // ~1474

  // ── 1. Background ──────────────────────────────────────────────
  ctx.fillStyle = '#07101C'
  ctx.fillRect(0, 0, width, height)

  // ── 2. Camera feed or avatar — clipped to white window ─────────
  ctx.save()
  ctx.beginPath()
  ctx.rect(WIN_X, WIN_Y, winW, winH)
  ctx.clip()

  if (cameraBitmap) {
    console.log('Compositing camera bitmap:', cameraBitmap.width, 'x', cameraBitmap.height)
    const scale = Math.max(winW / cameraBitmap.width, winH / cameraBitmap.height)
    const dx    = WIN_X + (winW - cameraBitmap.width  * scale) / 2
    const dy    = WIN_Y + (winH - cameraBitmap.height * scale) / 2
    ctx.drawImage(cameraBitmap, dx, dy, cameraBitmap.width * scale, cameraBitmap.height * scale)
  } else if (avatarInitials) {
    // White background fill inside window
    ctx.fillStyle = '#F1F5F9'
    ctx.fillRect(WIN_X, WIN_Y, winW, winH)
    // Initials avatar circle
    const cx = WIN_X + winW / 2
    const cy = WIN_Y + winH * 0.40
    const r  = 200
    ctx.fillStyle = '#4A6FA5'
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.font         = '800 160px Syne, sans-serif'
    ctx.fillStyle    = '#FFFFFF'
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(avatarInitials.slice(0, 2).toUpperCase(), cx, cy)
    ctx.textAlign    = 'left'
    ctx.textBaseline = 'alphabetic'
  }

  ctx.restore()

  // ── 3. Frame overlay PNG (on top of camera) ────────────────────
  try {
    const frameImg = await loadImage(selfieFrameUrl)
    ctx.drawImage(frameImg, 0, 0, width, height)
  } catch {
    // Frame unavailable — continue without it
  }

  // ── 4–7. Info panel + text + badges — clipped to white window ──
  ctx.save()
  ctx.beginPath()
  ctx.rect(WIN_X, WIN_Y, winW, winH)
  ctx.clip()

  // Gradient info panel — bottom of white window
  const PANEL_H  = 260
  const panelTop = winBot - PANEL_H

  const grad = ctx.createLinearGradient(0, panelTop, 0, winBot)
  grad.addColorStop(0,    'rgba(7,16,28,0)')
  grad.addColorStop(0.35, 'rgba(7,16,28,0.65)')
  grad.addColorStop(1,    'rgba(7,16,28,0.90)')
  ctx.fillStyle = grad
  ctx.fillRect(WIN_X, panelTop, winW, PANEL_H)

  // Centered layout — name, title, badges
  const centerX = WIN_X + winW / 2   // horizontal centre of white window

  // Player name
  const nameY = panelTop + 62

  ctx.font         = '800 54px Syne, sans-serif'
  ctx.fillStyle    = '#FFFFFF'
  ctx.textAlign    = 'center'
  ctx.fillText((playerData.name || '').toUpperCase(), centerX, nameY)

  // Title · Company
  ctx.font      = '400 26px DM Mono, monospace'
  ctx.fillStyle = '#AABBCC'
  const sub = [playerData.title, playerData.company].filter(Boolean).join(' · ')
  ctx.fillText(sub, centerX, nameY + 46)

  // Badges — centred row of up to 4
  const badgeSize  = 72
  const badgeGap   = 24
  const badgeCount = Math.min(selectedBadges.length, 4)
  const rowWidth   = badgeCount * badgeSize + (badgeCount - 1) * badgeGap
  const badgeStartX = centerX - rowWidth / 2
  const badgeTopY   = nameY + 46 + 28    // below title

  for (let i = 0; i < badgeCount; i++) {
    const img = await loadBadgeImage(selectedBadges[i])
    const bx  = badgeStartX + i * (badgeSize + badgeGap)
    if (img) {
      ctx.drawImage(img, bx, badgeTopY, badgeSize, badgeSize)
    } else if (selectedBadges[i]?.icon) {
      ctx.font      = '54px serif'
      ctx.textAlign = 'center'
      ctx.fillText(selectedBadges[i].icon, bx + badgeSize / 2, badgeTopY + badgeSize * 0.78)
    }
  }
  ctx.textAlign = 'left'

  ctx.restore()

  // Return as PNG blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')), 'image/png', 0.95)
  })
}
