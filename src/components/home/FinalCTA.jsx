import { motion } from 'framer-motion'
import GoldButton from '../shared/GoldButton'

export default function FinalCTA() {
  return (
    <section className="relative min-h-[70vh] bg-bg-surface overflow-hidden flex items-center">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)' }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 text-center py-24 md:py-[140px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25 }}
          className="font-mono text-[56px] md:text-[88px] lg:text-[120px] font-bold tracking-[0.08em] text-gold"
          style={{ textShadow: '0 0 80px rgba(201,168,76,0.5), 0 0 160px rgba(201,168,76,0.25)' }}
        >
          MADDEX
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-[36px] md:text-[52px] lg:text-[68px] font-bold leading-tight tracking-tight text-text-primary mt-8"
        >
          Ready to get your edge?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-[17px] text-text-muted mt-5 leading-[1.75]"
        >
          Join Maddex. Start your free trial today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-9"
        >
          <GoldButton to="/pricing">START FREE TRIAL</GoldButton>
          <GoldButton to="/pricing" variant="ghost">VIEW PRICING</GoldButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-sans text-[13px] text-text-faint mt-8 inline-flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0">
            <rect x="5" y="11" width="14" height="9" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Secure &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Core level access for 7 days
        </motion.div>
      </div>
    </section>
  )
}
