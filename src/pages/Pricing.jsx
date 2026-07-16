import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

const PLANS = [
  {
    name: 'CORE',
    monthly: 19,
    annual: 190,
    features: ['Markets + Crypto modules', 'Watchlist — 50 stocks', 'MaddenAI Chat — 100/day', '5 Price Alerts'],
  },
  {
    name: 'PRO',
    monthly: 49,
    annual: 490,
    popular: true,
    badge: 'BEST FOR PROS',
    features: ['Everything in Core', 'All 7 modules + Command Bar', 'Unlimited MaddenAI Chat', '50 Price Alerts · 5 Research Notes/mo'],
  },
  {
    name: 'APEX',
    monthly: 149,
    annual: 1490,
    note: 'THIS PRICE IS CORRECT',
    features: ['Everything in Pro', 'Unlimited Price Alerts + Research Notes', 'API Access — 10,000 calls/mo', 'Mobile App (Q4 2026)'],
  },
  {
    name: 'ADVISER',
    monthly: 299,
    noAnnual: true,
    note: '5 SEATS INCLUDED',
    features: ['Everything in Apex', '5 team seats included', 'Multi-client dashboards', 'Dedicated account manager'],
  },
]

const COMPARISON_ROWS = [
  ['Markets Module', true, true, true, true],
  ['Crypto Module', true, true, true, true],
  ['Rates Module', false, true, true, true],
  ['Macro Module', false, true, true, true],
  ['News Module', false, true, true, true],
  ['Watchlist size', '50 stocks', 'Unlimited', 'Unlimited', 'Unlimited'],
  ['Global Intelligence', false, false, true, true],
  ['Command Bar', false, true, true, true],
  ['MaddenAI Sentiment Score', true, true, true, true],
  ['Asset Analysis on demand', false, true, true, true],
  ['MaddenAI Chat', '100/day', 'Unlimited', 'Unlimited', 'Unlimited'],
  ['Price Alerts', '5', '50', 'Unlimited', 'Unlimited'],
  ['Research Notes included / mo', '0', '5', 'Unlimited', 'Unlimited'],
  ['API Access', false, false, '10,000 calls/mo', '10,000 calls/mo'],
  ['Mobile App (Q4 2026)', false, true, true, true],
  ['Multi-client dashboards', false, false, false, true],
  ['Priority support', false, false, true, true],
  ['Dedicated account manager', false, false, false, true],
]

const RESEARCH_ROWS = [
  ['Single Note', 'A$4.99'],
  ['5-Pack', 'A$19.99'],
  ['10-Pack', 'A$34.99'],
  ['Pro Tier', '5 / month included'],
  ['Apex Tier', 'Unlimited'],
]

const FIRM_TIER = {
  name: 'FIRM',
  price: 'A$999/mo',
  seats: '20 seats included',
  desc: 'For advisory firms and small institutions managing multiple client teams.',
  features: ['20 team seats included', 'Everything in Adviser', 'Custom onboarding', 'Priority SLA support'],
}

const FAQS = [
  ['Can I cancel anytime?', 'Yes. All plans are month-to-month with no lock-in contract, and you can cancel from your account settings at any time.'],
  ['Is there really no credit card required for the trial?', 'Correct. The 7-day free trial gives you full Pro-tier access with no card required upfront.'],
  ['What happens to my data if I downgrade?', 'Your watchlist, alerts, and saved research remain intact — downgrading only changes which modules and features are active.'],
  ['Do Research Notes expire?', 'No. Once purchased, a Research Note is yours to access indefinitely from your account.'],
  ['Is Maddex regulated financial advice?', 'No. Maddex provides general financial information only and does not constitute financial product advice. Always consult a licensed adviser for personal advice.'],
]

function ComparisonCell({ value }) {
  if (value === true) return <span className="text-gold">✓</span>
  if (value === false) return <span className="text-text-faint">—</span>
  return <span className="text-text-primary">{value}</span>
}

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-[rgba(30,70,140,0.3)]">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex justify-between items-center py-5 text-left"
      >
        <span className="font-sans text-[15px] font-medium text-text-primary">{question}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-gold text-[18px]">+</motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[13px] text-text-muted pb-5 leading-relaxed max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[140px] pb-16 px-6 md:px-10 text-center">
        <SectionLabel center>PRICING</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-4xl mx-auto"
        >
          Institutional intelligence. Retail pricing.
        </motion.h1>
        <p className="font-sans text-[18px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          No lock-in contracts. Cancel anytime. Full Pro access for 7 days, free.
        </p>

        <div className="relative inline-flex items-center gap-1 bg-bg-surface border border-gold/20 rounded-full p-1 mt-8">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`relative font-mono text-[11px] px-4 py-2 rounded-full transition-colors ${!annual ? 'text-bg-primary font-bold' : 'text-text-muted'}`}
          >
            {!annual && <motion.span layoutId="pricing-toggle-pill" className="absolute inset-0 bg-gold rounded-full" style={{ zIndex: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            MONTHLY
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`relative font-mono text-[11px] px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${annual ? 'text-bg-primary font-bold' : 'text-text-muted'}`}
          >
            {annual && <motion.span layoutId="pricing-toggle-pill" className="absolute inset-0 bg-gold rounded-full" style={{ zIndex: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            ANNUAL
            <span className="bg-gold/20 text-gold text-[9px] px-1.5 py-0.5 rounded-full">SAVE 17%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 text-left max-w-[1280px] mx-auto">
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
                <span className="text-gold"> → {plan.name}: A${plan.noAnnual ? plan.monthly * 12 : plan.annual}/yr</span>
              </div>
              <div className="font-mono text-[12px] tracking-wide text-gold mt-2">{plan.name}</div>
              <div className="mt-3">
                {annual && !plan.noAnnual ? (
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
                <GoldButton variant={plan.popular ? 'solid' : 'ghost'} className="w-full">GET STARTED</GoldButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[140px] px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <SectionLabel center>FULL COMPARISON</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary text-center leading-tight">
            Every feature, side by side.
          </h2>
          <div className="overflow-x-auto mt-10">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left font-mono text-[11px] text-text-muted py-3 pr-4">FEATURE</th>
                  {PLANS.map((p) => (
                    <th key={p.name} className="font-mono text-[11px] text-gold py-3 px-3 text-center">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(([label, ...values], i) => (
                  <tr key={label} className={i % 2 === 0 ? 'bg-bg-primary/40' : ''}>
                    <td className="font-sans text-[13px] text-text-muted py-3 pr-4">{label}</td>
                    {values.map((v, j) => (
                      <td key={j} className="font-mono text-[13px] text-center py-3 px-3"><ComparisonCell value={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[140px] px-6 md:px-10 text-center">
        <div className="max-w-[600px] mx-auto bg-bg-surface border border-gold/20 rounded p-6 text-left">
          <div className="font-mono text-[12px] text-gold tracking-wide text-center mb-4">
            MADDENAI RESEARCH NOTES — From A$4.99
          </div>
          {RESEARCH_ROWS.map(([label, price], i) => (
            <div key={label} className={`flex justify-between py-2.5 font-mono text-[12px] ${i > 0 ? 'border-t border-[rgba(30,70,140,0.3)]' : ''}`}>
              <span className="text-text-muted">{label}</span>
              <span className="text-text-primary">{price}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[140px] px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <SectionLabel center>BUSINESS PLANS</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            Built for advisers and firms.
          </h2>
          <p className="font-sans text-[18px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
            Already covered above: the Adviser plan at A$299/month for 5 seats. For larger teams, Firm scales that up.
          </p>
          <div className="max-w-[420px] mx-auto mt-10 text-left">
            <div className="bg-bg-primary border border-gold/30 rounded p-7">
              <div className="font-mono text-[12px] tracking-wide text-gold">{FIRM_TIER.name}</div>
              <div className="font-sans text-[28px] font-bold text-text-primary mt-2">{FIRM_TIER.price}</div>
              <div className="font-mono text-[9px] text-text-faint mt-1">{FIRM_TIER.seats}</div>
              <p className="font-sans text-[13px] text-text-muted mt-3 leading-relaxed">{FIRM_TIER.desc}</p>
              <div className="flex flex-col gap-2 mt-5">
                {FIRM_TIER.features.map((f) => (
                  <div key={f} className="font-sans text-[12px] text-text-muted flex gap-2">
                    <span className="text-gold">◆</span>{f}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <GoldButton variant="ghost" className="w-full">CONTACT SALES</GoldButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[140px] px-6 md:px-10">
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
