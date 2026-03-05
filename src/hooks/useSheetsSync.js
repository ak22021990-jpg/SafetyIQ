// src/hooks/useSheetsSync.js
// Background webhook sync to Google Sheets Apps Script endpoint.
// Queues when offline, retries every 30s. Never blocks the UI.
import { useEffect, useRef, useState } from 'react'
import { getAllSessions } from '../utils/storageEngine'

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL
const SYNC_KEY    = 'sn_synced_ids'

// 'idle' | 'syncing' | 'synced' | 'queued' | 'offline'
export function useSheetsSync() {
  const syncingRef = useRef(false)
  const [syncStatus, setSyncStatus] = useState('idle')

  const runSync = async () => {
    if (!WEBHOOK_URL)          { 
      console.warn('VITE_SHEETS_WEBHOOK_URL not configured')
      setSyncStatus('offline')
      return 
    }
    if (!navigator.onLine)     { setSyncStatus('offline'); return }
    if (syncingRef.current)    return

    syncingRef.current = true
    setSyncStatus('syncing')

    try {
      const synced   = JSON.parse(localStorage.getItem(SYNC_KEY) || '[]')
      const sessions = getAllSessions().filter(s => !synced.includes(s.sessionId))

      if (sessions.length === 0) {
        setSyncStatus('synced')
        syncingRef.current = false
        return
      }

      for (const session of sessions) {
        try {
          // Google Apps Script requires no-cors + text/plain to avoid preflight CORS failure.
          // Response is opaque (status 0) — we consider sent = success.
          await fetch(WEBHOOK_URL, {
            method:  'POST',
            mode:    'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
              timestamp:      session.timestamp,
              name:           session.player?.name     || '',
              company:        session.player?.company  || '',
              title:          session.player?.title    || '',
              email:          session.player?.email    || '',
              phone:          session.player?.phone    || '',
              consent:        session.player?.consent  ? 'Yes' : 'No',
              totalScore:     session.totalScore     || 0,
              gamesCompleted: session.gamesCompleted || 0,
              badges:         (session.badges || []).join('; '),
              selfieTaken:    session.selfieTaken ? 'Yes' : 'No',
            }),
          })
          // With no-cors, response is opaque — assume success if no network error thrown
          synced.push(session.sessionId)
          localStorage.setItem(SYNC_KEY, JSON.stringify(synced))
        } catch (err) {
          console.error('Sheets sync error:', err)
          setSyncStatus('queued')
        }
      }

      setSyncStatus('synced')
    } catch {
      setSyncStatus('queued')
    } finally {
      syncingRef.current = false
    }
  }

  useEffect(() => {
    runSync()
    const interval = setInterval(runSync, 30000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { syncStatus, forceSync: runSync }
}
