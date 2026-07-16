import { motion } from 'framer-motion'
import GoldButton from '../shared/GoldButton'

export default function FinalCTA() {
  return (
    <section className="relative min-h-[60vh] bg-bg-primary overflow-hidden flex items-center">
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

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 text-center py-20 md:py-[100px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[48px] md:text-[64px] lg:text-[80px] font-bold tracking-[0.08em] text-gold"
          style={{ textShadow: '0 0 40px rgba(201,168,76,0.3)' }}
        >
          MADDEX
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-[38px] md:text-[58px] lg:text-[70px] font-bold leading-tight tracking-tight text-text-primary mt-4"
        >
          Start your 7-day free trial today.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-[18px] text-text-muted mt-5 leading-[1.75]"
        >
          No credit card. Core level access for 7 days. First month 50% off when you subscribe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-9"
        >
          <GoldButton to="/pricing">START FREE TRIAL</GoldButton>
          <GoldButton to="/about" variant="ghost">REQUEST A DEMO</GoldButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-sans text-[13px] text-text-faint mt-8"
        >
          🔒 Secure &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Core level access for 7 days
        </motion.div>
      </div>
    </section>
  )
}
