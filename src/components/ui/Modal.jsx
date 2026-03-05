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
            style={{ background: 'rgba(15,23,42,0.50)', backdropFilter: 'blur(8px)' }}
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
                width:        '100%',
                maxWidth,
                background:   '#FFFFFF',
                border:       '1px solid #E2E8F0',
                borderRadius: '16px',
                padding:      '40px',
                boxShadow:    '0 25px 50px -12px rgba(0,0,0,0.18)',
              }}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
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
