import { useEffect, useRef, useState } from 'react'

// Fires once — a section that has already animated in stays in place on
// scroll-back rather than re-triggering, which reads as flicker.
export default function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
