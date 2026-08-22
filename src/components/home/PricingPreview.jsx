import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from '../shared/SectionLabel'
import GoldButton from '../shared/GoldButton'
import PricingComparisonTable from '../shared/PricingComparisonTable'
import { TERMINAL_PLANS } from '../../data/pricing'

export default function PricingPreview() {
  const [annual, setAnnual] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  return (
    <section className="bg-bg-surface py-14 md:py-16 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionLabel center>PRICING</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto">
          Bloomberg costs A$42,000 a year. Maddex starts at A$29 a month.
        </h2>

        <div className="relative inline-flex items-center gap-1 bg-bg-primary border border-gold/20 rounded-full p-1 mt-8">
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
            <span className="relative z-10 bg-gold/20 text-gold text-[9px] px-1.5 py-0.5 rounded-full">SAVE 20%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 text-left max-w-[1000px] mx-auto">
          {TERMINAL_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, scale: plan.popular ? 1.03 : 1.01 }}
              className={`relative bg-bg-primary rounded p-6 border transition-colors duration-200 ${
                plan.popular
                  ? 'border-[rgba(201,168,76,0.6)] scale-[1.03]'
                  : plan.name === 'APEX'
                  ? 'border-[rgba(201,168,76,0.3)] hover:border-gold/50'
                  : 'border-[rgba(201,168,76,0.2)] hover:border-gold/40'
              }`}
              style={plan.popular ? { backgroundImage: 'linear-gradient(rgba(201,168,76,0.03), rgba(201,168,76,0.03))' } : undefined}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg-primary font-mono text-[9px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              {!plan.popular && plan.badge && (
                <span className="absolute -top-3 right-4 border border-gold/50 bg-bg-primary text-gold font-mono text-[8px] font-bold px-2 py-1 rounded-full whitespace-nowrap tracking-[0.05em]">
                  {plan.badge}
                </span>
              )}
              <div className="font-mono text-[12px] tracking-wide text-gold">{plan.name}</div>
              <p className="font-sans text-[12px] text-text-muted mt-1 leading-snug">{plan.tagline}</p>
              <div className="mt-3">
                {annual ? (
                  <>
                    <span className="font-sans text-[13px] text-text-faint line-through mr-2">
                      A${plan.monthly}
                    </span>
                    <span className="font-sans text-[44px] font-bold text-text-primary">A${(plan.annual / 12).toFixed(0)}</span>
                    <span className="font-sans text-[13px] text-text-muted">/mo</span>
                  </>
                ) : (
                  <>
                    <span className="font-sans text-[44px] font-bold text-text-primary">A${plan.monthly}</span>
                    <span className="font-sans text-[13px] text-text-muted">/mo</span>
                  </>
                )}
              </div>
              <div className="flex flex-col mt-5">
                {plan.features.slice(0, 6).map((f, fi) => (
                  <div
                    key={f}
                    className={`font-sans text-[12px] text-text-muted flex gap-2 py-2.5 ${
                      fi > 0 ? 'border-t border-[rgba(30,70,140,0.2)]' : ''
                    }`}
                  >
                    <span className="text-gain">✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <GoldButton to="/pricing" variant={plan.popular ? 'solid' : 'ghost'} className="w-full">
                  START 7-DAY FREE TRIAL
                </GoldButton>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="font-mono text-[11px] text-text-muted max-w-2xl mx-auto mt-8 leading-[1.7]">
          All plans include a 7-day free trial. No credit card required to start.
        </p>

        <button
          type="button"
          onClick={() => setShowComparison((s) => !s)}
          className="inline-flex items-center gap-1.5 font-mono text-[12px] text-gold mt-6 hover:opacity-70 transition-opacity"
        >
          {showComparison ? 'HIDE FULL COMPARISON ▴' : 'SEE FULL COMPARISON ▾'}
        </button>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="max-w-[1000px] mx-auto mt-8 text-left">
                <PricingComparisonTable />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <Link to="/pricing" className="inline-block font-mono text-[12px] text-gold mt-6 hover:opacity-70 transition-opacity">
            VIEW FULL PRICING PAGE →
          </Link>
        </div>

        <p className="font-mono text-[10px] text-text-faint max-w-2xl mx-auto mt-6 leading-[1.7]">
          Research Notes and the MaddenAI Newsletter are separate products, coming in Phase 2 and Phase 3 of the Maddex roadmap.
        </p>
      </div>
    </section>
  )
}
