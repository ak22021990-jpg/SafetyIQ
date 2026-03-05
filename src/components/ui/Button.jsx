// src/components/ui/Button.jsx
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export default function Button({
  children,
  onClick,
  variant = 'primary',   // 'primary' | 'secondary' | 'destructive'
  disabled = false,
  showArrow = false,
  className = '',
  type = 'button',
}) {
  const shouldReduce = useReducedMotion()

  const base = 'font-heading text-micro uppercase tracking-widest px-8 py-4 transition-all duration-200 border cursor-pointer inline-flex items-center gap-2 rounded-[8px]'

  const variants = {
    primary:     'bg-midnight border-midnight text-white hover:bg-humanRed hover:border-humanRed',
    secondary:   'bg-white border-surface-border text-text-secondary hover:bg-surface hover:text-text-primary',
    destructive: 'border-red-signal text-red-signal hover:bg-red-dim',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-35 cursor-not-allowed' : ''} ${className}`}
      whileTap={disabled || shouldReduce ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
      {showArrow && <span aria-hidden="true">→</span>}
    </motion.button>
  )
}
