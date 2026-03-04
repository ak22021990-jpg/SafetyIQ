// src/hooks/useCountUp.js
import { useState, useEffect, useRef } from 'react'

export function useCountUp(target, duration = 2000, startDelay = 0) {
  const [value, setValue] = useState(0)
  const startTime = useRef(null)

  useEffect(() => {
    startTime.current = null
    setValue(0)
    const timer = setTimeout(() => {
      const animate = (timestamp) => {
        if (!startTime.current) startTime.current = timestamp
        const elapsed = timestamp - startTime.current
        const progress = Math.min(elapsed / duration, 1)

        // Ease-out: dramatic slowdown in last 20%
        const eased = progress < 0.8
          ? progress / 0.8 * 0.7
          : 0.7 + (progress - 0.8) / 0.2 * 0.3

        setValue(Math.floor(eased * target))

        if (progress < 1) requestAnimationFrame(animate)
        else setValue(target)
      }
      requestAnimationFrame(animate)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [target, duration, startDelay])

  return value
}

export default useCountUp
