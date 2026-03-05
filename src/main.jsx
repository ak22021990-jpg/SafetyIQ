// src/main.jsx
import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import './styles/globals.css'
import App from './App.jsx'

// Catch runtime errors so the app shows a message instead of a blank screen
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(err) { return { error: err } }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#07101C', color: '#E8EDF5', fontFamily: 'monospace',
          padding: '40px', gap: '16px',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#C9A96E', textTransform: 'uppercase' }}>
            App Error — check browser console
          </p>
          <pre style={{ fontSize: '12px', color: '#E8192C', whiteSpace: 'pre-wrap', maxWidth: '600px' }}>
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

// Note: StrictMode removed — React 19 StrictMode causes framer-motion AnimatePresence
// to double-invoke, leaving screens permanently at opacity:0 (blank screen).
createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
