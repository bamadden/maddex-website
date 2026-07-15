import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[150] w-11 h-11 rounded-full bg-gold text-bg-primary flex items-center justify-center shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:brightness-110 transition-[filter] duration-150"
          style={{ willChange: 'transform' }}
        >
          <span className="text-[16px] leading-none">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
