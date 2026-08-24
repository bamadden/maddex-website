import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

const TESTIMONIALS = [
  {
    quote: 'I have been looking for something between CommSec and Bloomberg for years. Maddex is exactly that. The MaddenAI analysis alone is worth the subscription.',
    name: 'S.M.',
    title: 'Finance Professional, Brisbane',
  },
  {
    quote: 'The Global Intelligence Map changed how I think about commodity exposure. I can see exactly what is happening with iron ore flows and translate that to my BHP and RIO positions.',
    name: 'J.T.',
    title: 'SMSF Trustee, Sydney',
  },
  {
    quote: 'As a financial adviser I have five clients asking about the RBA every month. MaddenAI gives me a structured, data-backed view every time.',
    name: 'A.K.',
    title: 'Financial Adviser, Melbourne',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-bg-surface py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.2 }}
          className="max-w-[720px] mx-auto text-left border-l-[3px] border-gold pl-6 mb-7"
        >
          <p className="font-sans text-[18px] md:text-[22px] font-bold tracking-[-0.02em] text-text-primary leading-[1.35]">
            "The financial intelligence terminal Australian retail investors have always deserved."
          </p>
          <div className="mt-2">
            <span className="font-sans text-[13px] font-semibold text-gold">Ben Madden</span>
            <span className="font-mono text-[9px] text-text-muted ml-2 tracking-wide">FOUNDER, MADDEX</span>
          </div>
        </motion.div>

        <SectionLabel center>WHAT BETA INVESTORS SAY</SectionLabel>
        <p className="font-mono text-[11px] text-text-muted text-center max-w-xl mx-auto">
          Powered by the same data feeds used by professional traders.
        </p>
        <p className="font-mono text-[9px] text-text-faint text-center mt-1.5">
          General information only. Not financial advice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className="bg-bg-primary border-l-[3px] border-gold rounded-r p-5 flex flex-col"
            >
              <div className="text-gold text-[11px]">★★★★★</div>
              <p className="font-sans text-[13px] text-text-primary leading-[1.6] italic mt-2.5 flex-1">
                "{t.quote}"
              </p>
              <div style={{ marginTop: 'auto', paddingTop: 16 }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#C9A84C', letterSpacing: '0.1em' }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#4A6080', marginTop: 2 }}>
                  {t.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
