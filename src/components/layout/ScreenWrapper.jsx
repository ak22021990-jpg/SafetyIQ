// src/components/layout/ScreenWrapper.jsx
// Screens are always visible — opacity never starts at 0.
// framer-motion 12 + React 19: opacity:0 initial can get stuck via WAAPI.
// Fix: use translateY only for enter, CSS opacity transition for exit.
import { useReducedMotion, motion } from 'framer-motion'

export default function ScreenWrapper({ children, className = '' }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 1, y: shouldReduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
      transition={{ duration: shouldReduce ? 0.1 : 0.28, ease: [0.0, 0.0, 0.2, 1.0] }}
    >
      {children}
    </motion.div>
  )
}
