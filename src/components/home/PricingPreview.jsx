import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from '../shared/SectionLabel'
import GoldButton from '../shared/GoldButton'

const PLANS = [
  { name: 'CORE', monthly: 19, annual: 189, popular: false, features: ['Markets + Watchlist', 'MaddenAI Sentiment Score', 'Daily market brief', 'Email support'] },
  { name: 'PRO', monthly: 49, annual: 489, popular: true, badge: 'BEST FOR PROS', features: ['Everything in Core', 'All 7 modules', 'Asset Analysis on demand', '5 Research Notes / mo'] },
  { name: 'APEX', monthly: 149, annual: 1489, popular: false, note: 'THIS PRICE IS CORRECT', features: ['Everything in Pro', 'Unlimited Research Notes', 'Global Intelligence Map', 'Priority support'] },
  { name: 'ADVISER', monthly: 299, annual: 2989, popular: false, note: 'THIS PRICE IS CORRECT', features: ['Everything in Apex', 'Multi-client dashboards', 'White-label reports', 'Dedicated account manager'] },
]

const RESEARCH_ROWS = [
  ['Single Note', 'A$4.99'],
  ['5-Pack', 'A$19.99'],
  ['10-Pack', 'A$34.99'],
  ['Pro Tier', '5 / month included'],
  ['Apex Tier', 'Unlimited'],
]

export default function PricingPreview() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="bg-bg-primary py-20 md:py-[140px] px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto text-center">
        <SectionLabel center>PRICING</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto">
          Bloomberg costs A$42,000 a year. Maddex starts at A$19 a month.
        </h2>

        <div className="relative inline-flex items-center gap-1 bg-bg-surface border border-gold/20 rounded-full p-1 mt-8">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`relative font-mono text-[11px] px-4 py-2 rounded-full transition-colors ${!annual ? 'text-bg-primary font-bold' : 'text-text-muted'}`}
          >
            {!annual && <motion.span layoutId="home-toggle-pill" className="absolute inset-0 bg-gold rounded-full" style={{ zIndex: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            MONTHLY
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`relative font-mono text-[11px] px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${annual ? 'text-bg-primary font-bold' : 'text-text-muted'}`}
          >
            {annual && <motion.span layoutId="home-toggle-pill" className="absolute inset-0 bg-gold rounded-full" style={{ zIndex: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            ANNUAL
            <span className="bg-gold/20 text-gold text-[9px] px-1.5 py-0.5 rounded-full">SAVE 17%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 text-left">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: plan.popular ? 1.02 : 1.01 }}
              className={`group relative bg-bg-surface rounded p-6 border overflow-hidden transition-colors duration-200 ${
                plan.popular ? 'border-gold scale-[1.02]' : 'border-gold/20 hover:border-gold/40'
              }`}
            >
              <div
                className="card-shimmer-el absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(100deg, transparent 40%, rgba(201,168,76,0.12) 50%, transparent 60%)' }}
              />
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg-primary font-mono text-[9px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.badge || 'MOST POPULAR'}
                </span>
              )}
              <div className="font-mono text-[9px] text-text-faint">
                <span className="line-through decoration-loss/60">Bloomberg: A$42,000/yr</span>
                <span className="text-gold"> → {plan.name}: A${plan.annual}/yr</span>
              </div>
              <div className="font-mono text-[12px] tracking-wide text-gold mt-2">{plan.name}</div>
              <div className="mt-3">
                {annual ? (
                  <>
                    <span className="font-sans text-[13px] text-text-faint line-through mr-2">
                      A${plan.monthly}
                    </span>
                    <span className="font-sans text-[28px] font-bold text-text-primary">A${(plan.annual / 12).toFixed(0)}</span>
                    <span className="font-sans text-[13px] text-text-muted">/mo</span>
                  </>
                ) : (
                  <>
                    <span className="font-sans text-[28px] font-bold text-text-primary">A${plan.monthly}</span>
                    <span className="font-sans text-[13px] text-text-muted">/mo</span>
                  </>
                )}
              </div>
              {plan.note && <div className="font-mono text-[9px] text-text-faint mt-1">{plan.note}</div>}
              <div className="flex flex-col gap-2.5 mt-5">
                {plan.features.map((f) => (
                  <div key={f} className="font-sans text-[12px] text-text-muted flex gap-2">
                    <span className="text-gold">◆</span>
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <GoldButton to="/pricing" variant={plan.popular ? 'solid' : 'ghost'} className="w-full">
                  GET STARTED
                </GoldButton>
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/pricing" className="inline-block font-mono text-[12px] text-gold mt-8 hover:opacity-70 transition-opacity">
          COMPARE ALL FEATURES →
        </Link>

        <div className="max-w-[600px] mx-auto mt-16 bg-bg-surface border border-gold/20 rounded p-6 text-left">
          <div className="font-mono text-[12px] text-gold tracking-wide text-center mb-4">
            MADDENAI RESEARCH NOTES — From A$4.99
          </div>
          {RESEARCH_ROWS.map(([label, price], i) => (
            <div
              key={label}
              className={`flex justify-between py-2.5 font-mono text-[12px] ${i > 0 ? 'border-t border-[rgba(30,70,140,0.3)]' : ''}`}
            >
              <span className="text-text-muted">{label}</span>
              <span className="text-text-primary">{price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
