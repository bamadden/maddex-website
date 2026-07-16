import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from '../shared/SectionLabel'
import GoldButton from '../shared/GoldButton'

const PLANS = [
  {
    name: 'CORE',
    monthly: 19,
    annual: 190,
    popular: false,
    features: ['All 7 intelligence modules', 'MaddenAI chat — 50 messages/day', 'Watchlist — 50 stocks', 'Full MaddenAI Sentiment, Crypto & Sector scores', 'Data export — full JSON'],
  },
  {
    name: 'PRO',
    monthly: 49,
    annual: 490,
    popular: true,
    badge: 'MOST POPULAR',
    features: ['Everything in Core, plus real-time prices', 'MaddenAI chat — 200 messages/day', 'AI analysis on every article & stock', 'Watchlist — 100 stocks, full fundamentals', '3 Research Notes/month included'],
  },
  {
    name: 'APEX',
    monthly: 149,
    annual: 1490,
    popular: false,
    note: 'THIS PRICE IS CORRECT',
    features: ['Everything in Pro, plus', 'MaddenAI chat — 500 messages/day', 'Unlimited price alerts & Research Notes', 'Personalised MaddenAI scoring', 'Priority support — 24hr guaranteed'],
  },
]

const RESEARCH_ROWS = [
  ['Single Note', 'A$4.99'],
  ['5-Pack', 'A$19.99'],
  ['10-Pack', 'A$34.99'],
  ['Pro Tier', '3 / month included'],
  ['Apex Tier', 'Unlimited'],
]

export default function PricingPreview() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
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
            {!annual && <motion.span layoutId="home-toggle-pill" className="absolute inset-0 bg-gold rounded-full" style={{ zIndex: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative z-10">MONTHLY</span>
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`relative font-mono text-[11px] px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${annual ? 'text-bg-primary font-bold' : 'text-text-muted'}`}
          >
            {annual && <motion.span layoutId="home-toggle-pill" className="absolute inset-0 bg-gold rounded-full" style={{ zIndex: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative z-10">ANNUAL</span>
            <span className="relative z-10 bg-gold/20 text-gold text-[9px] px-1.5 py-0.5 rounded-full">SAVE 17%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 text-left max-w-[1000px] mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: plan.popular ? 1.02 : 1.01 }}
              className={`relative bg-bg-surface rounded p-6 border transition-colors duration-200 ${
                plan.popular ? 'border-[rgba(201,168,76,0.5)] scale-[1.02]' : 'border-[rgba(201,168,76,0.2)] hover:border-gold/40'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg-primary font-mono text-[9px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
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

        <div>
          <Link to="/pricing#enterprise" className="inline-block font-mono text-[11px] text-text-muted hover:text-gold transition-colors mt-3">
            For adviser practices, firms, and institutions → View enterprise plans
          </Link>
        </div>

        <div className="max-w-[600px] mx-auto mt-10 bg-bg-surface border border-gold/20 rounded p-6 text-left">
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
