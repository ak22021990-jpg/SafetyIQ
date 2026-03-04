// src/utils/soundEngine.js
// Web Audio API — no external library. Single global instance.

class SoundEngine {
  constructor() {
    this.ctx   = null
    this.muted = false
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    }
    // Resume if browser suspended the context (autoplay policy)
    if (this.ctx.state === 'suspended') this.ctx.resume()
  }

  setMuted(muted) { this.muted = muted }

  play(type) {
    if (this.muted || !this.ctx) return
    const configs = {
      correct:  { freq: 523,  dur: 0.15, wave: 'sine',   gain: 0.3  },
      wrong:    { freq: 220,  dur: 0.2,  wave: 'sine',   gain: 0.2  },
      tick:     { freq: 800,  dur: 0.05, wave: 'square', gain: 0.15 },
      expired:  { freq: 180,  dur: 0.4,  wave: 'sine',   gain: 0.25 },
      badge:    { freq: 784,  dur: 0.3,  wave: 'sine',   gain: 0.4  },
      complete: { freq: 659,  dur: 0.5,  wave: 'sine',   gain: 0.4  },
      pop:      { freq: 440,  dur: 0.08, wave: 'sine',   gain: 0.2  },
    }
    const c = configs[type]
    if (!c) return
    try {
      const osc  = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.type            = c.wave
      osc.frequency.value = c.freq
      gain.gain.setValueAtTime(c.gain, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + c.dur)
      osc.start()
      osc.stop(this.ctx.currentTime + c.dur)
    } catch { /* ignore audio errors */ }
  }

  // Two-tone chime for badge earned
  playBadge() {
    this.play('badge')
    setTimeout(() => {
      if (!this.ctx || this.muted) return
      try {
        const osc  = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.frequency.value = 1047
        gain.gain.setValueAtTime(0.35, this.ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4)
        osc.start()
        osc.stop(this.ctx.currentTime + 0.4)
      } catch { /* ignore */ }
    }, 150)
  }
}

export const soundEngine = new SoundEngine()
