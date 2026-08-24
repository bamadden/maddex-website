import { motion } from 'framer-motion'

export default function SectionHeading({ children, center = false, className = '' }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.2 }}
      className={`section-heading ${
        center ? 'text-center mx-auto' : ''
      } ${className}`}
    >
      {children}
    </motion.h2>
  )
}
