import { motion } from 'framer-motion'

export default function SectionHeading({ children, center = false, className = '' }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.2 }}
      className={`font-sans text-[length:clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white ${
        center ? 'text-center mx-auto' : ''
      } ${className}`}
    >
      {children}
    </motion.h2>
  )
}
