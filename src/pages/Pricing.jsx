import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import FAQItem from '../components/shared/FAQItem'
import { TERMINAL_PLANS, NEWSLETTER_PLANS, RESEARCH_NOTES_PRICING, BUNDLES } from '../data/pricing'

const COMPARISON_ROWS = [
  ['MaddenAI chat', 'Basic', 'Unlimited', 'Unlimited'],
  ['Watchlist', 'Up to 20 assets', 'Unlimited', 'Unlimited'],
  ['Portfolio tracker', true, true, true],
  ['News feed', true, true, true],
  ['Global intelligence globe', true, true, true],
  ['Sector heatmaps + analysis', false, true, true],
  ['Advanced charting', false, true, true],
  ['Rates + Macro intelligence modules', false, true, true],
  ['Priority data refresh', false, true, true],
  ['MaddenAI Research Notes', 'Buy à la carte (Phase 2)', 'Buy à la carte (Phase 2)', '1/month included'],
  ['Real-time WebSocket streaming', false, false, true],
  ['API access', false, false, 'Coming soon'],
  ['White glove onboarding', false, false, true],
  ['Priority support', false, false, true],
]

const FAQS = [
  ['Is this financial advice?', 'No. Maddex provides general financial information only and does not constitute financial product advice or a personal recommendation. Always consider seeking independent financial advice before making investment decisions.'],
  ['What markets are covered?', 'ASX 200 as the primary market alongside global indices and top cryptocurrencies, with the Rates and Macro modules covering AUD currency pairs, central bank rates, and RBA policy on Prime and above.'],
  ['Can I cancel anytime?', 'Yes. All Terminal plans are month-to-month with no lock-in contract, and you can cancel from your account settings at any time.'],
  ['What is MaddenAI?', 'MaddenAI is the intelligence layer behind the terminal — it reads markets, sentiment, and macro data simultaneously and gives you a structured synthesis instead of raw numbers.'],
  ['Is my data secure?', 'Yes. Account and portfolio data are stored via Supabase with industry-standard encryption and are never sold to third parties.'],
  ['When do Research Notes and the Newsletter launch?', 'Research Notes are planned for Phase 2, roughly 3–6 months after Terminal launch. The MaddenAI Newsletter follows in Phase 3, roughly 6–12 months out. Pricing shown for both is indicative and may change before launch.'],
]

function ComparisonCell({ value }) {
  if (value === true) return <span className="font-bold" style={{ color: '#2D8A50' }}>✓</span>
  if (value === false) return <span style={{ color: '#3D5070' }}>✗</span>
  return <span className="font-mono text-[11px]" style={{ color: '#E8EDF5' }}>{value}</span>
}

function PlanCard({ plan, i, annual }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.1, duration: 0.4 }}
      whileHover={{ scale: plan.popular ? 1.02 : 1.01 }}
      className={`relative rounded flex flex-col ${plan.popular ? 'scale-[1.02]' : ''}`}
    >
      {plan.popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-bg-primary font-mono text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap z-10">
          {plan.badge}
        </span>
      )}
      <div
        className={`relative overflow-hidden rounded p-8 transition-colors duration-200 flex flex-col flex-1 ${
          plan.popular ? '' : 'card-gradient-live border border-[rgba(201,168,76,0.2)] hover:border-gold/40'
        } ${plan.name === 'APEX' ? 'border border-[rgba(201,168,76,0.3)]' : ''}`}
        style={{ minHeight: 480, ...(plan.popular ? {
                background:
                  'rgba(201,168,76,0.02) padding-box, linear-gradient(135deg, #C9A84C, rgba(201,168,76,0.3)) border-box',
                border: '1px solid transparent',
              } : {}) }}
      >
        {plan.popular && (
          <div
            className="absolute inset-0 pointer-events-none card-shimmer-sweep-6s"
            style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(201,168,76,0.08) 50%, transparent 60%)' }}
          />
        )}
        <div className="font-mono text-[12px] tracking-wide text-gold">{plan.name}</div>
        <p className="font-sans text-[12px] text-text-muted mt-1 leading-snug">{plan.tagline}</p>
        <div className="mt-4">
          {annual ? (
            <>
              <span className="font-sans text-[13px] text-text-faint line-through mr-2">A${plan.monthly}</span>
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
        <div className="flex flex-col mt-5 flex-1">
          {plan.features.map((f) => (
            <div key={f} className="font-sans text-[12px] text-text-muted flex gap-2 py-2">
              <span className="text-gold">◆</span>
              {f}
            </div>
          ))}
        </div>
        <div className="mt-auto pt-6">
          <GoldButton variant={plan.popular ? 'solid' : 'ghost'} className="!w-full">
            START FREE TRIAL
          </GoldButton>
        </div>
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

      <section className="relative bg-bg-primary pt-[84px] pb-16 px-6 md:px-10 text-center overflow-hidden">
        <div
          className="pricing-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-gold pointer-events-none select-none"
          style={{ fontSize: 220, lineHeight: 1, zIndex: 0 }}
          aria-hidden="true"
        >
          A$29
        </div>
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="hero-eyebrow"><SectionLabel center>TERMINAL PRICING</SectionLabel></div>
          <h1 className="hero-headline font-sans font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            <span className="block text-[24px] md:text-[36px] text-text-muted font-bold">Bloomberg costs A$42,000 a year.</span>
            <span className="block text-[36px] md:text-[56px] text-text-primary font-bold mt-2">Maddex starts at A$29 a month.</span>
          </h1>
          <p className="hero-sub font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
            No lock-in contracts. Cancel anytime. The Maddex Terminal is live today — Research Notes and the Newsletter are coming soon.
          </p>
        </div>

        <div className="relative inline-flex items-center gap-1 bg-bg-surface border border-gold/20 rounded-full p-1 mt-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 text-left max-w-[1000px] mx-auto">
          {TERMINAL_PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} i={i} annual={annual} />
          ))}
        </div>

        <p className="font-mono text-[10px] text-text-faint max-w-2xl mx-auto mt-8 leading-[1.7]">
          7-day free trial with Core level access. No credit card required.
        </p>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <SectionLabel center>FULL COMPARISON</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary text-center leading-tight">
            Every feature, side by side.
          </h2>
          <div
            className="mt-10 overflow-auto rounded max-h-[600px]"
            style={{ background: '#0B1628', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <table className="w-full min-w-[640px] border-collapse" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ background: '#060D1A', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                  <th className="sticky text-left py-3 px-4" style={{ top: 0, background: '#060D1A', zIndex: 30, width: '35%' }} />
                  <th className="sticky font-mono text-[13px] text-center py-3 px-3" style={{ top: 0, background: '#060D1A', zIndex: 30, color: '#637899', width: '21%' }}>
                    CORE
                  </th>
                  <th
                    className="sticky font-mono text-[13px] text-center py-3 px-3"
                    style={{ top: 0, background: '#060D1A', zIndex: 30, color: '#C9A84C', width: '22%', borderLeft: '1px solid rgba(201,168,76,0.15)', borderRight: '1px solid rgba(201,168,76,0.15)' }}
                  >
                    <div>PRIME</div>
                    <span className="inline-block mt-1 bg-gold text-bg-primary font-mono text-[8px] font-bold px-2 py-0.5 rounded-full">
                      MOST POPULAR
                    </span>
                  </th>
                  <th className="sticky font-mono text-[13px] text-center py-3 px-3" style={{ top: 0, background: '#060D1A', zIndex: 30, color: '#E8EDF5', width: '22%' }}>
                    APEX
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(([label, core, prime, apex], i) => (
                  <tr
                    key={label}
                    className="transition-colors duration-150 hover:bg-[rgba(201,168,76,0.04)]"
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(15,30,54,0.4)', borderBottom: '1px solid rgba(30,70,140,0.15)', height: 48 }}
                  >
                    <td className="font-sans text-[13px] py-[10px] px-4" style={{ color: '#637899', width: '35%' }}>{label}</td>
                    <td className="text-center py-[10px] px-3" style={{ width: '21%' }}><ComparisonCell value={core} /></td>
                    <td className="text-center py-[10px] px-3" style={{ width: '22%', background: prime === true ? 'rgba(45,138,80,0.06)' : 'rgba(201,168,76,0.02)', borderLeft: '1px solid rgba(201,168,76,0.15)', borderRight: '1px solid rgba(201,168,76,0.15)' }}>
                      <ComparisonCell value={prime} />
                    </td>
                    <td className="text-center py-[10px] px-3" style={{ width: '22%' }}><ComparisonCell value={apex} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="research-notes" className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10 scroll-mt-[84px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-4">
            PHASE 2 · COMING SOON
          </span>
          <SectionLabel center>MADDENAI RESEARCH NOTES</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            Institutional-quality research, à la carte.
          </h2>
          <p className="font-sans text-[17px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
            AI-powered equity and crypto research notes, delivered as professionally designed PDFs. Planned pricing below.
          </p>
          <div className="max-w-[560px] mx-auto mt-10 bg-bg-surface border border-gold/20 rounded p-6 text-left">
            <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-text-faint pb-2 border-b border-[rgba(30,70,140,0.3)]">
              <span>OPTION</span>
              <span className="text-right">PRICE</span>
              <span className="text-right">NOTE</span>
            </div>
            {RESEARCH_NOTES_PRICING.map(({ label, price, note }) => (
              <div key={label} className="grid grid-cols-3 gap-2 py-2.5 font-mono text-[12px] border-b border-[rgba(30,70,140,0.2)] last:border-b-0">
                <span className="text-text-muted">{label}</span>
                <span className="text-text-primary text-right">{price}</span>
                <span className="text-gold text-right">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10 scroll-mt-[84px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-4">
            PHASE 3 · COMING SOON
          </span>
          <SectionLabel center>MADDENAI NEWSLETTER</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            A standalone product. Own inbox, own subscription.
          </h2>
          <p className="font-sans text-[17px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
            Free weekly brief for everyone, with paid tiers for daily briefings and the full monthly recap.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 text-left max-w-[1000px] mx-auto">
            {NEWSLETTER_PLANS.map((plan) => (
              <div key={plan.name} className="bg-bg-primary border border-[rgba(201,168,76,0.2)] rounded p-5 flex flex-col">
                <div className="font-mono text-[11px] tracking-wide text-gold">{plan.name}</div>
                <div className="font-sans text-[22px] font-bold text-text-primary mt-2">
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
      </section>

      <section id="bundles" className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10 scroll-mt-[84px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-4">
            COMING SOON — REQUIRES PHASE 2 &amp; 3
          </span>
          <SectionLabel center>BUNDLES</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            Terminal, notes, and newsletter — together.
          </h2>
          <p className="font-sans text-[17px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
            Once Research Notes and the Newsletter are live, bundle pricing will look like this.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 text-left">
            {BUNDLES.map((b) => (
              <div key={b.name} className="bg-bg-surface border border-[rgba(201,168,76,0.15)] rounded p-6 flex flex-col">
                <div className="font-mono text-[11px] tracking-wide text-gold">{b.name}</div>
                <div className="font-sans text-[26px] font-bold text-text-primary mt-2">A${b.price}<span className="text-[13px] text-text-muted font-sans">/mo</span></div>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[720px] mx-auto">
          <SectionLabel center>FAQ</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary text-center leading-tight mb-8">
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
      </section>

      <FinalCTA />
      <Footer />
    </>
  )
}
