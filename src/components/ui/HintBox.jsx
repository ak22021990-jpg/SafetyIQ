// src/components/ui/HintBox.jsx
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function HintBox({ hint, visible }) {
  const shouldReduce = useReducedMotion()

  return (
    <AnimatePresence>
      {visible && hint && (
        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, height: 0, marginTop: 0 }}
          animate={shouldReduce ? { opacity: 1 } : { opacity: 1, height: 'auto', marginTop: 12 }}
          exit={shouldReduce ? { opacity: 0 } : { opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div
            style={{
              borderLeft:   '2px solid #E8A830',
              paddingLeft:  '12px',
              paddingTop:   '8px',
              paddingBottom:'8px',
              paddingRight: '12px',
              background:   'rgba(232,168,48,0.06)',
              borderRadius: '0 4px 4px 0',
            }}
          >
            <p
              className="font-mono italic text-text-secondary"
              style={{ fontSize: '12px', lineHeight: '1.6', color: '#E8A830' }}
            >
              💡 {hint}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
