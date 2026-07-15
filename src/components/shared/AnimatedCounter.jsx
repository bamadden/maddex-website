import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ to, prefix = '', suffix = '', label, decimals = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const start = performance.now()

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(to * eased)
      if (progress < 1) requestAnimationFrame(tick)
      else setValue(to)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, to])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-AU')

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-mono text-[36px] font-bold text-gold leading-none">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="font-sans text-[12px] text-text-muted mt-2">{label}</span>
    </div>
  )
}
