// src/utils/cloudinaryUpload.js
// Uploads selfie PNG blob to Cloudinary. Falls back silently on failure.

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const FOLDER        = 'ts-summit-selfies'

/**
 * Upload a PNG blob to Cloudinary.
 * Returns the secure_url string on success.
 * Throws if Cloudinary is not configured or upload fails.
 */
export async function uploadSelfie(blob) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary not configured — set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET')
  }

  const formData = new FormData()
  formData.append('file', blob)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', FOLDER)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return data.secure_url
}
