import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import SectionHeading from '../shared/SectionHeading'
import SectionSubheading from '../shared/SectionSubheading'
import GoldButton from '../shared/GoldButton'

const TIERS = [
  {
    name: 'FREE',
    price: 'A$0',
    features: ['Weekly market brief', 'MaddenAI sentiment score', 'No credit card required'],
  },
  {
    name: 'WEEKLY',
    price: 'A$19',
    suffix: '/mo',
    features: ["Ben's personal market view", 'Key themes for the week ahead', 'Weekly deep-dive (Sunday evening)'],
  },
  {
    name: 'DAILY + WEEKLY',
    price: 'A$39',
    suffix: '/mo',
    features: ['Daily 3-minute brief (Mon–Fri)', '7am AEST delivery', 'Everything in Weekly'],
  },
]

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  return (
    <section className="bg-bg-primary py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-4">
          PHASE 3 · COMING SOON
        </span>
        <SectionLabel center>MADDENAI NEWSLETTER</SectionLabel>
        <SectionHeading center>
          A standalone market brief, delivered to your inbox.
        </SectionHeading>
        <SectionSubheading center className="mt-3">
          Separate from the Terminal. Launches roughly 6–12 months after the Terminal.
        </SectionSubheading>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-left max-w-[900px] mx-auto items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className="bg-bg-surface border border-[rgba(201,168,76,0.2)] rounded p-5 flex flex-col h-full"
            >
              <div className="font-mono text-[11px] font-bold tracking-wide text-gold">{tier.name}</div>
              <div className="mt-2">
                <span className="font-sans text-[28px] font-bold text-text-primary">{tier.price}</span>
                {tier.suffix && <span className="font-sans text-[12px] text-text-muted">{tier.suffix}</span>}
              </div>
              <div className="flex flex-col gap-1.5 mt-4 flex-1">
                {tier.features.map((f) => (
                  <div key={f} className="font-sans text-[12px] text-text-muted flex gap-2">
                    <span className="text-gold shrink-0">◆</span>{f}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-0">
                <GoldButton to="/research" variant="ghost" className="w-full">NOTIFY ME</GoldButton>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-[440px] mx-auto mt-9">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 font-mono text-[12px] text-text-primary bg-bg-surface border border-gold/30 rounded px-4 py-3 outline-none focus:border-gold/60 transition-colors placeholder:text-text-faint"
            />
            <GoldButton>NOTIFY ME</GoldButton>
          </div>
          <div className="font-mono text-[10px] text-text-faint mt-3">
            Pricing shown is indicative and may change before launch.
          </div>
        </div>
      </div>
    </section>
  )
}
