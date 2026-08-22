import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

const TESTIMONIALS = [
  {
    quote: 'I have been looking for something between CommSec and Bloomberg for years. Maddex is exactly that. The MaddenAI analysis alone is worth the subscription.',
    name: 'S.M. — Finance Professional, Brisbane',
  },
  {
    quote: 'The Global Intelligence Map changed how I think about commodity exposure. I can see exactly what is happening with iron ore flows and translate that to my BHP and RIO positions.',
    name: 'J.T. — SMSF Trustee, Sydney',
  },
  {
    quote: 'As a financial adviser I have five clients asking about the RBA every month. MaddenAI gives me a structured, data-backed view every time.',
    name: 'A.K. — Financial Adviser, Melbourne',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-bg-surface py-14 md:py-16 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.2 }}
          className="max-w-[720px] mx-auto text-center border-l-[3px] border-gold pl-6 text-left mb-10"
        >
          <p className="font-sans text-[22px] md:text-[28px] font-bold text-text-primary leading-[1.35]">
            "The financial intelligence terminal Australian retail investors have always deserved."
          </p>
          <div className="mt-3">
            <span className="font-sans text-[14px] font-semibold text-gold">Ben Madden</span>
            <span className="font-mono text-[10px] text-text-muted ml-2 tracking-wide">FOUNDER, MADDEX</span>
          </div>
        </motion.div>

        <SectionLabel center>WHAT BETA USERS SAY</SectionLabel>
        <p className="font-mono text-[12px] text-text-muted text-center max-w-xl mx-auto">
          Powered by the same data feeds used by professional traders.
        </p>
        <p className="font-mono text-[9px] text-text-faint text-center mt-2">
          General information only. Not financial advice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.055, duration: 0.5 }}
              className="bg-bg-primary border-l-[3px] border-gold rounded-r p-6"
            >
              <div className="text-gold text-[14px]">★★★★★</div>
              <p className="font-sans text-[18px] text-text-primary leading-[1.75] italic mt-3">
                "{t.quote}"
              </p>
              <p className="font-sans text-[12px] text-text-muted mt-4">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
