// src/components/ui/Modal.jsx
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function Modal({ open, onClose, children, maxWidth = '560px' }) {
  const shouldReduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(7,16,28,0.85)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              style={{
                width:      '100%',
                maxWidth,
                background: '#172540',
                border:     '1px solid rgba(201,169,110,0.20)',
                padding:    '40px',
              }}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
