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
    primary: 'bg-humanRed border-humanRed text-white hover:opacity-90',
    secondary: 'bg-surface border-surface-border text-slate-300 hover:bg-slate-700 hover:text-white',
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
