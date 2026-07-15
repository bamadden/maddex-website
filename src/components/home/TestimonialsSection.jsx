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
    <section className="bg-bg-primary py-20 md:py-[140px] px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <SectionLabel center>WHAT BETA USERS SAY</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-bg-surface border-l-[3px] border-gold rounded-r p-6"
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
