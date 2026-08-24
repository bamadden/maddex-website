import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import FAQItem from '../components/shared/FAQItem'
import PricingComparisonTable from '../components/shared/PricingComparisonTable'
import FadeInSection from '../components/shared/FadeInSection'
import { TERMINAL_PLANS, NEWSLETTER_PLANS, RESEARCH_NOTES_PRICING, BUNDLES } from '../data/pricing'

const FAQS = [
  ['Is this financial advice?', 'No. Maddex provides general financial information only and does not constitute financial product advice or a personal recommendation. Always consider seeking independent financial advice before making investment decisions.'],
  ['What markets are covered?', 'ASX 200 as the primary market alongside global indices and top cryptocurrencies, with the Rates and Macro modules covering AUD currency pairs, central bank rates, and RBA policy on Prime and above.'],
  ['Can I cancel anytime?', 'Yes. All Terminal plans are month-to-month with no lock-in contract, and you can cancel from your account settings at any time.'],
  ['What is MaddenAI?', 'MaddenAI is the intelligence layer behind the terminal — it reads markets, sentiment, and macro data simultaneously and gives you a structured synthesis instead of raw numbers.'],
  ['Is my data secure?', 'Yes. Account and portfolio data are stored via Supabase with industry-standard encryption and are never sold to third parties.'],
  ['When do Research Notes and the Newsletter launch?', 'Research Notes are planned for Phase 2, roughly 3–6 months after Terminal launch. The MaddenAI Newsletter follows in Phase 3, roughly 6–12 months out. Pricing shown for both is indicative and may change before launch.'],
]

function PlanCard({ plan, i, annual, isLast }) {
  const [hovered, setHovered] = useState(false)
  const isPrime = plan.popular

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.05, duration: 0.4 }}
      className={`relative flex flex-col border-b lg:border-b-0 lg:border-r ${isLast ? 'border-b-0 lg:border-r-0' : ''}`}
      style={{
        background: isPrime ? 'var(--surface-2)' : hovered ? 'var(--surface-2)' : 'var(--surface)',
        borderColor: 'var(--border)',
        padding: 'var(--space-8)',
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {plan.popular && (
        <span
          className="absolute top-6 right-6 bg-gold text-bg-primary font-mono text-[9px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap tracking-[0.05em]"
        >
          {plan.badge}
        </span>
      )}
      {!plan.popular && plan.badge && (
        <span className="absolute top-6 right-6 border border-gold/40 bg-bg-primary text-gold font-mono text-[9px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap tracking-[0.05em]">
          {plan.badge}
        </span>
      )}

      <div style={{ minHeight: 120 }}>
        <div className="font-mono text-[12px] tracking-wide text-gold">{plan.name}</div>
        <p className="font-sans text-[12px] text-text-muted mt-1 leading-snug" style={{ minHeight: 34 }}>{plan.tagline}</p>
        <div className="mt-4">
          {annual ? (
            <>
              <span className="font-sans text-[13px] text-text-faint line-through mr-2">A${plan.monthly}</span>
              <span className="font-sans text-[28px] font-bold tracking-[-0.02em] text-text-primary">A${(plan.annual / 12).toFixed(0)}</span>
              <span className="font-sans text-[13px] text-text-muted">/mo</span>
            </>
          ) : (
            <>
              <span className="font-sans text-[28px] font-bold tracking-[-0.02em] text-text-primary">A${plan.monthly}</span>
              <span className="font-sans text-[13px] text-text-muted">/mo</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col mt-5 flex-1">
        {plan.features.map((f) => (
          <div key={f} className="font-sans text-[12px] text-text-muted flex gap-2 py-2">
            <span className="text-gain">✓</span>
            {f}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <GoldButton variant={plan.popular ? 'solid' : 'ghost'} className="!w-full">
          START 7-DAY FREE TRIAL
        </GoldButton>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    document.title = 'Maddex — Pricing'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="relative bg-bg-primary pt-[84px] pb-10 px-6 md:px-10 text-center overflow-hidden">
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="hero-eyebrow">
            <span className="inline-block font-mono text-[10px] tracking-[0.1em] text-gold bg-gold/10 border border-gold/15 rounded-full px-3.5 py-1.5 mb-5">
              EVERY PLAN INCLUDES A 7-DAY FREE TRIAL · NO CREDIT CARD REQUIRED
            </span>
          </div>
          <div className="hero-eyebrow"><SectionLabel center>TERMINAL PRICING</SectionLabel></div>
          <h1 className="hero-headline font-sans font-extrabold leading-tight tracking-[-0.03em] max-w-4xl mx-auto">
            <span className="block text-[22px] md:text-[32px] text-text-muted font-bold">Bloomberg costs A$42,000 a year.</span>
            <span className="block text-[32px] md:text-[48px] text-text-primary font-bold mt-1">Maddex starts at A$29 a month.</span>
          </h1>
          <p className="hero-sub font-sans text-[15px] text-text-muted max-w-xl mx-auto mt-3 leading-[1.6]">
            No lock-in. Cancel anytime. Live today — Research Notes and the Newsletter are coming soon.
          </p>
        </div>

        <div className="relative inline-flex items-center gap-1 bg-bg-surface border border-gold/15 rounded-full p-1 mt-6">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`relative font-mono text-[11px] px-4 py-2 rounded-full transition-colors ${!annual ? 'text-bg-primary font-bold' : 'text-text-muted'}`}
          >
            {!annual && <motion.span layoutId="pricing-toggle-pill" className="absolute inset-0 bg-gold rounded-full" style={{ zIndex: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative z-10">MONTHLY</span>
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`relative font-mono text-[11px] px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${annual ? 'text-bg-primary font-bold' : 'text-text-muted'}`}
          >
            {annual && <motion.span layoutId="pricing-toggle-pill" className="absolute inset-0 bg-gold rounded-full" style={{ zIndex: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative z-10">ANNUAL</span>
            <span className="relative z-10 bg-gold/20 text-gold text-[9px] px-1.5 py-0.5 rounded-full">SAVE 20%</span>
          </button>
        </div>

        <div
          className="mt-10 max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-3 text-left"
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--card-radius)',
            overflow: 'hidden',
          }}
        >
          {TERMINAL_PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} i={i} annual={annual} isLast={i === TERMINAL_PLANS.length - 1} />
          ))}
        </div>

        <p className="font-mono text-[11px] text-text-muted max-w-2xl mx-auto mt-8 leading-[1.7]">
          All plans include a 7-day free trial. No credit card required to start.
        </p>
      </section>

      <FadeInSection className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <SectionLabel center>FULL COMPARISON</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary text-center leading-tight">
            Every feature, side by side.
          </h2>
          <div className="mt-10">
            <PricingComparisonTable />
          </div>
        </div>
      </FadeInSection>

      <FadeInSection id="research-notes" className="bg-bg-primary py-24 px-6 md:px-10 scroll-mt-[84px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/15 rounded-full px-3 py-1 mb-4">
            PHASE 2 · COMING SOON
          </span>
          <SectionLabel center>MADDENAI RESEARCH NOTES</SectionLabel>
          <h2 className="font-sans text-[24px] sm:text-[32px] md:text-[44px] font-bold tracking-[-0.02em] text-text-primary max-w-3xl mx-auto leading-tight md:whitespace-nowrap">
            Institutional-quality research. On demand.
          </h2>
          <p className="font-sans text-[17px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
            AI-powered equity and crypto research notes, delivered as professionally designed PDFs. Planned pricing below.
          </p>
          <div className="max-w-[560px] mx-auto mt-10 bg-bg-surface border border-gold/15 rounded p-6 text-left">
            <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-text-faint pb-2 border-b border-[rgba(201,168,76,0.15)]">
              <span>OPTION</span>
              <span className="text-right">PRICE</span>
              <span className="text-right">NOTE</span>
            </div>
            {RESEARCH_NOTES_PRICING.map(({ label, price, note }) => (
              <div key={label} className="grid grid-cols-3 gap-2 py-2.5 font-mono text-[12px] border-b border-[rgba(201,168,76,0.15)] last:border-b-0">
                <span className="text-text-muted">{label}</span>
                <span className="text-text-primary text-right">{price}</span>
                <span className="text-gold text-right">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection id="newsletter" className="bg-bg-surface py-24 px-6 md:px-10 scroll-mt-[84px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/15 rounded-full px-3 py-1 mb-4">
            PHASE 3 · COMING SOON
          </span>
          <SectionLabel center>MADDENAI NEWSLETTER</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-tight">
            A standalone product.
            <br />
            <span className="md:whitespace-nowrap">Own inbox, own subscription.</span>
          </h2>
          <p className="font-sans text-[17px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
            Free weekly brief for everyone, with paid tiers for daily briefings and the full monthly recap.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 text-left max-w-[1000px] mx-auto">
            {NEWSLETTER_PLANS.map((plan) => (
              <div key={plan.name} className="bg-bg-primary border border-[rgba(201,168,76,0.15)] rounded p-5 flex flex-col">
                <div className="font-mono text-[11px] tracking-wide text-gold">{plan.name}</div>
                <div className="font-sans text-[22px] font-bold tracking-[-0.02em] text-text-primary mt-2">
                  {plan.price || `A$${plan.monthly}/mo`}
                </div>
                <p className="font-sans text-[12px] text-text-muted mt-2 leading-snug">{plan.tagline}</p>
                <div className="flex flex-col gap-1.5 mt-4">
                  {plan.features.map((f) => (
                    <div key={f} className="font-sans text-[11px] text-text-muted flex gap-2">
                      <span className="text-gold">◆</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <GoldButton to="/research" variant="ghost" className="mt-8">GET NOTIFIED AT LAUNCH →</GoldButton>
        </div>
      </FadeInSection>

      <FadeInSection id="bundles" className="bg-bg-primary py-24 px-6 md:px-10 scroll-mt-[84px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/15 rounded-full px-3 py-1 mb-4">
            COMING SOON — REQUIRES PHASE 2 &amp; 3
          </span>
          <SectionLabel center>BUNDLES</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-tight">
            Terminal, notes, and newsletter — together.
          </h2>
          <p className="font-sans text-[17px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
            Once Research Notes and the Newsletter are live, bundle pricing will look like this.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-9 text-left">
            {BUNDLES.map((b) => (
              <div key={b.name} className="bg-bg-surface border border-[rgba(201,168,76,0.15)] rounded p-6 flex flex-col">
                <div className="font-mono text-[11px] tracking-wide text-gold">{b.name}</div>
                <div className="font-sans text-[26px] font-bold tracking-[-0.02em] text-text-primary mt-2">A${b.price}<span className="text-[13px] text-text-muted font-sans">/mo</span></div>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[720px] mx-auto">
          <SectionLabel center>FAQ</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary text-center leading-tight mb-8">
            Questions, answered.
          </h2>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq[0]}
              question={faq[0]}
              answer={faq[1]}
              isOpen={openFaq === i}
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
        </div>
      </FadeInSection>

      <FinalCTA />
      <Footer />
    </>
  )
}
