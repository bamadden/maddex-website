import { motion } from 'framer-motion'

export default function SectionLabel({ children, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className={`font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-4 flex items-center gap-2 ${
        center ? 'justify-center text-center' : ''
      }`}
    >
      <span className="inline-block w-6 h-px bg-gold/50" />
      {children}
    </motion.div>
  )
}
