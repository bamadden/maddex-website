import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from '../shared/SectionLabel'
import SectionHeading from '../shared/SectionHeading'
import SectionSubheading from '../shared/SectionSubheading'
import GoldButton from '../shared/GoldButton'
import PricingComparisonTable from '../shared/PricingComparisonTable'
import { TERMINAL_PLANS } from '../../data/pricing'
import { useAnalytics } from '../../hooks/useAnalytics'

// Approximate indicative FX rates off AUD — not live, just enough to show
// international visitors roughly what they'd pay in their own currency.
const FX_RATES = { usd: 0.653, gbp: 0.518, eur: 0.604 }

function convertAud(aud) {
  return {
    usd: Math.round(aud * FX_RATES.usd),
    gbp: Math.round(aud * FX_RATES.gbp),
    eur: Math.round(aud * FX_RATES.eur),
  }
}

export default function PricingPreview() {
  const [annual, setAnnual] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState(null)
  const { trackPricing } = useAnalytics()

  return (
    <section className="bg-bg-surface py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionLabel center>PRICING</SectionLabel>
        <SectionHeading center>
          Simple pricing.
          <br />
          No surprises.
        </SectionHeading>
        <SectionSubheading center className="mt-3">
          Bloomberg costs A$42,000 a year. Maddex starts at A$29 a month.
        </SectionSubheading>

        <div className="relative inline-flex items-center gap-1 bg-bg-primary border border-gold/15 rounded-full p-1 mt-8">
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

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 text-left max-w-[1000px] mx-auto"
          onMouseLeave={() => setHoveredPlan(null)}
        >
          {TERMINAL_PLANS.map((plan, i) => {
            const isHovered = hoveredPlan === plan.name
            const isDimmed = hoveredPlan !== null && !isHovered
            return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              className={`relative bg-bg-primary rounded p-6 border flex flex-col h-full ${
                plan.popular && !isHovered ? 'border-[rgba(201,168,76,0.6)]' : ''
              }`}
              style={{
                ...(plan.popular ? { backgroundImage: 'linear-gradient(rgba(201,168,76,0.03), rgba(201,168,76,0.03))' } : {}),
                borderColor: isHovered ? 'rgba(201,168,76,0.8)' : plan.popular ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.15)',
                transform: isHovered
                  ? 'translateY(-8px) scale(1.03)'
                  : isDimmed
                  ? 'scale(0.97)'
                  : plan.popular
                  ? 'scale(1.03)'
                  : 'none',
                boxShadow: isHovered ? '0 24px 48px rgba(0,0,0,0.5)' : 'none',
                opacity: isDimmed ? 0.55 : 1,
                filter: isDimmed ? 'brightness(0.7)' : 'none',
                transition: 'all 0.2s ease',
                zIndex: isHovered ? 1 : 0,
              }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg-primary font-mono text-[9px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              {!plan.popular && plan.badge && (
                <span className="absolute -top-3 right-4 border border-gold/40 bg-bg-primary text-gold font-mono text-[8px] font-bold px-2 py-1 rounded-full whitespace-nowrap tracking-[0.05em]">
                  {plan.badge}
                </span>
              )}
              <div className="font-mono text-[12px] tracking-wide text-gold">{plan.name}</div>
              <div style={{ minHeight: 54 }}>
                <p className="font-sans text-[12px] text-text-muted mt-1 leading-snug">{plan.tagline}</p>
              </div>
              <div className="mt-3" style={{ minHeight: 72 }}>
                {(() => {
                  const displayedAud = annual ? Math.round(plan.annual / 12) : plan.monthly
                  const fx = convertAud(displayedAud)
                  return (
                    <>
                      {annual && (
                        <span className="font-sans text-[13px] text-text-faint line-through mr-2">
                          A${plan.monthly}
                        </span>
                      )}
                      <span className="font-sans text-[44px] font-bold tracking-[-0.02em] text-text-primary">A${displayedAud}</span>
                      <span className="font-sans text-[13px] text-text-muted">/mo</span>
                      <div className="font-mono text-[10px] text-text-faint mt-1">
                        USD ~${fx.usd} · GBP ~£{fx.gbp} · EUR ~€{fx.eur}
                      </div>
                    </>
                  )
                })()}
              </div>
              <div className="flex flex-col mt-5 flex-1">
                {plan.features.slice(0, 6).map((f, fi) => (
                  <div
                    key={f}
                    className={`font-sans text-[12px] text-text-muted flex gap-2 py-2.5 ${
                      fi > 0 ? 'border-t border-[rgba(201,168,76,0.15)]' : ''
                    }`}
                  >
                    <span className="text-gain">✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <GoldButton
                  to="/pricing"
                  variant={plan.popular ? 'solid' : 'ghost'}
                  onClick={() => trackPricing(plan.name.toLowerCase())}
                  className="w-full"
                >
                  START 7-DAY FREE TRIAL
                </GoldButton>
              </div>
            </motion.div>
            )
          })}
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

        <p className="font-mono text-[10px] text-text-faint mx-auto mt-6 whitespace-nowrap">
          Research Notes (Phase 2) and Newsletter (Phase 3) — coming soon.
        </p>
      </div>
    </section>
  )
}
