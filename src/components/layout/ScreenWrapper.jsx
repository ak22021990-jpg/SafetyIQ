// src/components/layout/ScreenWrapper.jsx
import { motion } from 'framer-motion'

export default function ScreenWrapper({ children, className = '' }) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
    >
      {children}
    </motion.div>
  )
}
