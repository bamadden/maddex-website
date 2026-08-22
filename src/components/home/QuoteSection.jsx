import { motion } from 'framer-motion'

export default function QuoteSection() {
  return (
    <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="max-w-[820px] mx-auto text-left border-l-[3px] border-gold pl-6 md:pl-10"
      >
        <p className="font-sans text-[26px] md:text-[38px] font-bold text-text-primary leading-[1.35]">
          "The financial intelligence terminal Australian retail investors have always deserved."
        </p>
        <div className="mt-6">
          <div className="font-sans text-[15px] font-semibold text-gold">Ben Madden</div>
          <div className="font-mono text-[11px] text-text-muted mt-0.5 tracking-wide">FOUNDER, MADDEX</div>
        </div>
      </motion.div>
    </section>
  )
}
