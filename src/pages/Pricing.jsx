import { Fragment, useEffect, useState } from 'react'
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
    tagline: 'Professional intelligence at an accessible price.',
    highlights: [
      'All 7 intelligence modules',
      'MaddenAI chat — 50 messages/day',
      'Watchlist — 50 stocks',
      'Full MaddenAI Sentiment, Crypto & Sector scores',
      'Data export — full JSON',
    ],
    included: [
      'All 7 intelligence modules — visible and accessible',
      'All 9 global indices displayed',
      'Full sector heatmap — day performance',
      'Top 20 cryptocurrencies — price and 24h change',
      'All 10 AUD currency pairs — live rates',
      'Full central bank rates panel',
      'Full RBA dashboard — cash rate, next meeting, countdown',
      'All 8 AU macro indicators',
      'China Watch — overview',
      'All 28+ news sources — all 9 categories',
      'Watchlist — 50 stocks',
      'Portfolio — unlimited holdings, live P&L',
      'Global Intelligence Map — globe and exchange indicators',
      'MaddenAI Market Sentiment Score — full score and all components',
      'MaddenAI Crypto Momentum Index — full',
      'MaddenAI Sector Strength Radar — full',
      'MaddenAI chat — 50 messages per day',
      'Data export — full JSON',
    ],
    upgrades: [
      'Equity prices: 15-minute delay (Pro: real-time)',
      'MaddenAI chat: 50/day (Pro: 200/day)',
      'MaddenAI analysis on article click (Pro only)',
      'MaddenAI analysis on stock click (Pro only)',
      "MaddenAI Today's Key Themes in News (Pro only)",
      'News sentiment badges (Pro only)',
      'Watchlist fundamental data — P/E, market cap, 52W range (Pro only)',
      'Portfolio analytics — Sharpe, beta, drawdown (Pro only)',
      'Global country detail panels (Pro only)',
      'Global intelligence layers — maritime, air, commodities, geopolitical (Pro only)',
      'Multi-country yield curve comparison (Pro only)',
      'Economic calendar: 7 days only (Pro: 30 days)',
      'Price alerts (Pro only)',
      'Mobile companion app (Pro only)',
      'Stock screener (Pro only)',
      'Technical analysis overlays (Pro only)',
      'Research Notes not included — purchasable at A$4.99',
    ],
  },
  {
    name: 'PRO',
    monthly: 49,
    annual: 490,
    popular: true,
    badge: 'MOST POPULAR',
    tagline: 'The full product. Real-time. Complete.',
    highlights: [
      'Everything in Core, plus real-time prices',
      'MaddenAI chat — 200 messages/day',
      'AI analysis on every article & stock',
      'Watchlist — 100 stocks, full fundamentals',
      '3 Research Notes/month included',
    ],
    plus: [
      'Real-time equity prices — Twelve Data',
      'MaddenAI chat — 200 messages per day',
      'MaddenAI analysis on every article — ASK AI button',
      'MaddenAI analysis on every stock click — full structured output',
      "MaddenAI Today's Key Themes — generated every 15 minutes",
      'News sentiment badges — BULLISH/BEARISH/NEUTRAL on every article',
      'Watchlist — 100 stocks with full fundamental data (P/E, market cap, 52W range, volume, dividend yield)',
      'Portfolio analytics — Sharpe ratio, beta, max drawdown, benchmark comparison vs ASX 200 and S&P 500',
      'Global country detail panels — full 200+ country database on click',
      'Global intelligence layers — all 5 (markets, maritime, air, commodities, geopolitical)',
      'Multi-country yield curve comparison — AU, US, UK, JP, DE',
      'Economic calendar — 30 days forward',
      'Sector heatmap — day/week/month/YTD toggle',
      'Price alerts — 20 active, in-app and email',
      'Maddex Mobile companion app — iOS and Android',
      'Stock screener — unlimited saved screens',
      'Technical analysis overlays — 50MA, 200MA, RSI, MACD, Bollinger Bands',
      'Dividend tracker — ex-dividend dates, franking credits, projected income',
      'MaddenAI Research Notes — 3 per month included',
    ],
  },
  {
    name: 'APEX',
    monthly: 149,
    annual: 1490,
    note: 'THIS PRICE IS CORRECT',
    tagline: 'Maximum intelligence. No limits.',
    highlights: [
      'Everything in Pro, plus',
      'MaddenAI chat — 500 messages/day',
      'Unlimited price alerts & Research Notes',
      'Personalised MaddenAI scoring',
      'Priority support — 24hr guaranteed',
    ],
    plus: [
      'MaddenAI chat — 500 messages per day',
      'Price alerts — unlimited',
      'MaddenAI Research Notes — unlimited',
      'Maddex API — 1,000 calls per month (personal automation)',
      'Personalised MaddenAI scoring — adjust factor weights to match your investment style',
      'Early feature access — 30 days before Pro and Core',
      'Priority support — guaranteed 24-hour response',
      'Usage analytics dashboard — query history, most viewed assets, activity patterns',
    ],
  },
]

const ENTERPRISE_TIERS = [
  {
    name: 'ADVISER',
    price: 'A$499/mo',
    seats: '5 user seats · A$100 per seat',
    plusLabel: 'Everything in Apex, plus:',
    features: [
      'Client portfolio management',
      'Compliance-ready reporting',
      'Client-facing summary views',
      'White label option',
      'Dedicated onboarding call',
      'API: 5,000 calls per month',
    ],
    button: 'ENQUIRE NOW →',
  },
  {
    name: 'FIRM',
    price: 'A$1,999/mo',
    seats: '20 user seats · A$100 per seat',
    plusLabel: 'Everything in Adviser, plus:',
    features: [
      'Dedicated account manager',
      'SLA guarantee — 99.5% uptime',
      'API: 100,000 calls per month',
      'Custom MaddenAI integration',
      'Team watchlists and portfolios',
      'Annual: A$19,990/year — 2 months free',
    ],
    button: 'ENQUIRE NOW →',
  },
  {
    name: 'INSTITUTIONAL',
    price: 'Custom pricing',
    seats: 'Unlimited seats',
    plusLabel: 'Everything in Firm, plus:',
    features: [
      'Unlimited API access',
      'Custom data feeds',
      'White label with custom domain',
      'Executive account relationship',
      'Custom SLA and compliance requirements',
    ],
    button: 'GET IN TOUCH →',
  },
]

const COMPARISON_GROUPS = [
  {
    category: 'DATA AND MARKETS',
    rows: [
      ['Global indices', 'All 9', 'All 9', 'All 9'],
      ['Equity prices', '15-min delay', 'Real-time', 'Real-time'],
      ['Crypto refresh', '5-min', '30-sec', '30-sec'],
      ['Sector heatmap', 'Day only', 'Day/Week/Month/YTD', 'Day/Week/Month/YTD'],
      ['Economic calendar', '7 days', '30 days', '30 days'],
      ['Yield curve', 'AU only', 'Multi-country', 'Multi-country'],
    ],
  },
  {
    category: 'WATCHLIST AND PORTFOLIO',
    rows: [
      ['Watchlist size', '50 stocks', '100 stocks', '100 stocks'],
      ['Watchlist data', 'Price + change', 'Full fundamentals', 'Full fundamentals'],
      ['Portfolio holdings', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Portfolio analytics', 'Basic P&L', 'Full analytics', 'Full analytics'],
      ['Benchmark comparison', false, '✓ ASX 200 + S&P 500', '✓ ASX 200 + S&P 500'],
      ['Technical overlays', false, true, true],
      ['Dividend tracker', false, true, true],
    ],
  },
  {
    category: 'MADDENAI',
    rows: [
      ['MaddenAI Sentiment Score', 'Full', 'Full', 'Full'],
      ['MaddenAI Crypto Index', 'Full', 'Full', 'Full'],
      ['MaddenAI Sector Radar', 'Full', 'Full', 'Full'],
      ['MaddenAI chat', '50/day', '200/day', '500/day'],
      ['AI on article click', false, true, true],
      ['AI on stock click', false, true, true],
      ["Today's Key Themes", false, true, true],
      ['Research Notes', 'Buy at A$4.99', '3/month', 'Unlimited'],
      ['Personalised scoring', false, false, true],
    ],
  },
  {
    category: 'NEWS',
    rows: [
      ['Sources', '28+', '28+', '28+'],
      ['Categories', 'All 9', 'All 9', 'All 9'],
      ['Sentiment badges', false, true, true],
      ['Key Themes', false, true, true],
      ['ASK AI on articles', false, true, true],
    ],
  },
  {
    category: 'GLOBAL INTELLIGENCE',
    rows: [
      ['Globe and exchanges', true, true, true],
      ['Country detail panels', false, true, true],
      ['Intelligence layers', false, 'All 5', 'All 5'],
      ['Shipping chokepoints', false, true, true],
    ],
  },
  {
    category: 'ALERTS AND NOTIFICATIONS',
    rows: [
      ['Price alerts', false, '20 active', 'Unlimited'],
      ['Alert delivery', '—', 'In-app + email', 'In-app + email + push'],
      ['Mobile companion app', false, true, true],
      ['Morning Brief', false, true, true],
    ],
  },
  {
    category: 'PLATFORM',
    rows: [
      ['Stock screener', false, true, true],
      ['Data export', true, true, true],
      ['API access', false, false, '1,000 calls/mo'],
      ['Personalised scoring', false, false, true],
      ['Early feature access', false, false, '30 days early'],
      ['Priority support', false, false, '24hr guaranteed'],
      ['Usage analytics', false, false, true],
    ],
  },
  {
    category: 'TRIAL AND BILLING',
    rows: [
      ['Free trial', '7 days Core', '7 days Core', '7 days Core'],
      ['First month offer', '50% off', '50% off', '50% off'],
      ['Annual discount', 'Save 17%', 'Save 17%', 'Save 17%'],
      ['Cancel anytime', true, true, true],
    ],
  },
]

const RESEARCH_ROWS = [
  ['Single note', 'A$4.99', 'A$4.99'],
  ['5-note pack', 'A$19.99', 'A$4.00'],
  ['10-note pack', 'A$34.99', 'A$3.50'],
  ['Pro subscription', 'A$49/mo', '3 notes included'],
  ['Apex subscription', 'A$149/mo', 'Unlimited'],
]

const FAQS = [
  ['Can I cancel anytime?', 'Yes. All plans are month-to-month with no lock-in contract, and you can cancel from your account settings at any time.'],
  ['Is there really no credit card required for the trial?', 'Correct. The 7-day free trial gives you Core level access with no card required upfront.'],
  ['What happens after my trial ends?', 'After your 7-day trial your account is paused. Your watchlist, portfolio, and settings are preserved. Subscribe at any time to continue — your data will be waiting.'],
  ['What happens to my data if I downgrade?', 'Your watchlist, alerts, and saved research remain intact — downgrading only changes which modules and features are active.'],
  ['Do Research Notes expire?', 'No. Once purchased, a Research Note is yours to access indefinitely from your account.'],
  ['Is Maddex regulated financial advice?', 'No. Maddex provides general financial information only and does not constitute financial product advice. Always consult a licensed adviser for personal advice.'],
]

function ComparisonCell({ value }) {
  if (value === true) return <span className="font-bold" style={{ color: '#2D8A50' }}>✓</span>
  if (value === false) return <span style={{ color: '#3D5070' }}>✗</span>
  return <span className="font-mono text-[12px]" style={{ color: '#E8EDF5' }}>{value}</span>
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
            <p className="font-sans text-[13px] text-text-muted pb-5 leading-[1.7] max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PlanCard({ plan, i, annual }) {
  const [expanded, setExpanded] = useState(false)

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
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-bg-primary font-mono text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap z-10">
          {plan.badge}
        </span>
      )}
      <div
        className={`relative overflow-hidden rounded p-8 transition-colors duration-200 flex flex-col flex-1 ${
          plan.popular ? '' : 'card-gradient-live border border-[rgba(201,168,76,0.2)] hover:border-gold/40'
        } ${plan.name === 'APEX' ? 'border border-[rgba(201,168,76,0.3)]' : ''}`}
        style={
          plan.popular
            ? {
                background:
                  'linear-gradient(120deg, #0B1628, #0F1E36, #0B1628) padding-box, linear-gradient(135deg, #C9A84C, rgba(201,168,76,0.3)) border-box',
                backgroundSize: '200% 200%, 100% 100%',
                border: '1px solid transparent',
                animation: 'cardGradientShift 8s ease-in-out infinite',
              }
            : undefined
        }
      >
      {plan.popular && (
        <div
          className="absolute inset-0 pointer-events-none card-shimmer-sweep-6s"
          style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(201,168,76,0.08) 50%, transparent 60%)' }}
        />
      )}
      <div className="font-mono text-[9px] text-text-faint">
        <span className="line-through decoration-loss/60">Bloomberg: A$42,000/yr</span>
        <span className="text-gold"> → {plan.name}: A${plan.annual}/yr</span>
      </div>
      <div className="font-mono text-[12px] tracking-wide text-gold mt-2">{plan.name}</div>
      <p className="font-sans text-[12px] text-text-muted mt-1 leading-snug">{plan.tagline}</p>
      {plan.name === 'CORE' && (
        <div className="font-mono text-[9px] mt-2" style={{ color: '#4A9B6E' }}>GREAT VALUE</div>
      )}
      {plan.name === 'APEX' && (
        <div className="font-mono text-[9px] text-gold mt-2">MAXIMUM INTELLIGENCE</div>
      )}
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
      {plan.note && <div className="font-mono text-[9px] text-text-faint mt-1">{plan.note}</div>}
      <div className="flex flex-col mt-5">
        {plan.highlights.map((f) => (
          <div key={f} className="font-sans text-[12px] text-text-muted flex gap-2 py-2">
            <span className="text-gold">◆</span>
            {f}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="font-mono text-[10px] text-gold mt-4 text-left hover:opacity-70 transition-opacity"
      >
        {expanded ? 'HIDE FULL FEATURE LIST ▴' : 'SEE FULL FEATURE LIST ▾'}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {plan.included && (
              <div className="mt-4 pt-4 border-t border-[rgba(30,70,140,0.3)]">
                <div className="font-mono text-[9px] tracking-[0.1em] text-gold mb-2">WHAT'S INCLUDED — FULL ACCESS</div>
                <div className="flex flex-col gap-1.5">
                  {plan.included.map((f) => (
                    <div key={f} className="font-sans text-[11px] text-text-muted flex gap-2 leading-snug">
                      <span className="text-gain shrink-0">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {plan.upgrades && (
              <div className="mt-4 pt-4 border-t border-[rgba(30,70,140,0.3)]">
                <div className="font-mono text-[9px] tracking-[0.1em] text-gold mb-2">WHAT UPGRADES IN PRO</div>
                <div className="flex flex-col gap-1.5">
                  {plan.upgrades.map((f) => (
                    <div key={f} className="font-sans text-[11px] text-text-muted flex gap-2 leading-snug">
                      <span className="text-loss shrink-0">✗</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {plan.plus && (
              <div className="mt-4 pt-4 border-t border-[rgba(30,70,140,0.3)]">
                <div className="font-mono text-[9px] tracking-[0.1em] text-gold mb-2">
                  EVERYTHING IN {plan.name === 'PRO' ? 'CORE' : 'PRO'}, PLUS
                </div>
                <div className="flex flex-col gap-1.5">
                  {plan.plus.map((f) => (
                    <div key={f} className="font-sans text-[11px] text-text-muted flex gap-2 leading-snug">
                      <span className="text-gold shrink-0">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <GoldButton
          variant={plan.popular ? 'solid' : 'ghost'}
          className="!w-full !font-mono !text-[13px] !tracking-[0.05em] !py-[14px] !px-[14px] !font-bold"
        >
          GET STARTED
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
          className="pricing-watermark absolute left-1/2 top-[140px] -translate-x-1/2 font-mono font-bold text-gold pointer-events-none select-none"
          style={{ fontSize: 200, lineHeight: 1 }}
          aria-hidden="true"
        >
          A$19
        </div>
        <div className="relative z-10">
          <div className="hero-eyebrow"><SectionLabel center>PRICING</SectionLabel></div>
          <h1 className="hero-headline font-sans font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            <span className="block text-[24px] md:text-[36px] text-text-muted font-bold">Bloomberg costs A$42,000 a year.</span>
            <span className="block text-[36px] md:text-[56px] text-text-primary font-bold mt-2">Maddex starts at A$19 a month.</span>
          </h1>
          <p className="hero-sub font-sans text-[18px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
            No lock-in contracts. Cancel anytime. 7-day free trial with Core level access, no credit card required.
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
            <span className="relative z-10 bg-gold/20 text-gold text-[9px] px-1.5 py-0.5 rounded-full">SAVE 17%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 text-left max-w-[1000px] mx-auto">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} i={i} annual={annual} />
          ))}
        </div>

        <p className="font-mono text-[10px] text-text-faint max-w-2xl mx-auto mt-8 leading-[1.7]">
          Daily message limits reset at midnight AEST. Limits are designed to be generous for all legitimate use — 200 messages is more than one query every 4 minutes during market hours.
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
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr style={{ background: '#060D1A', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                  <th
                    className="sticky text-left py-3 px-4"
                    style={{ top: 0, background: '#060D1A', zIndex: 30 }}
                  />
                  <th
                    className="sticky font-mono text-[13px] text-center py-3 px-3"
                    style={{ top: 0, background: '#060D1A', zIndex: 30, color: '#637899' }}
                  >
                    CORE
                  </th>
                  <th
                    className="sticky font-mono text-[13px] text-center py-3 px-3"
                    style={{
                      top: 0,
                      background: '#060D1A',
                      zIndex: 30,
                      color: '#C9A84C',
                      borderLeft: '1px solid rgba(201,168,76,0.15)',
                      borderRight: '1px solid rgba(201,168,76,0.15)',
                    }}
                  >
                    <div>PRO</div>
                    <span className="inline-block mt-1 bg-gold text-bg-primary font-mono text-[8px] font-bold px-2 py-0.5 rounded-full">
                      MOST POPULAR
                    </span>
                  </th>
                  <th
                    className="sticky font-mono text-[13px] text-center py-3 px-3"
                    style={{ top: 0, background: '#060D1A', zIndex: 30, color: '#E8EDF5' }}
                  >
                    APEX
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_GROUPS.map((group) => (
                  <Fragment key={group.category}>
                    <tr>
                      <td
                        colSpan={4}
                        className="font-mono text-[9px] tracking-[0.15em] uppercase py-2 px-4"
                        style={{
                          background: 'rgba(201,168,76,0.05)',
                          borderTop: '1px solid rgba(201,168,76,0.15)',
                          borderBottom: '1px solid rgba(201,168,76,0.1)',
                          color: '#C9A84C',
                        }}
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.rows.map(([label, core, pro, apex], i) => (
                      <tr
                        key={label}
                        className="transition-colors duration-150 hover:bg-[rgba(201,168,76,0.04)]"
                        style={{
                          background: i % 2 === 0 ? '#0B1628' : 'rgba(15,30,54,0.5)',
                          borderBottom: '1px solid rgba(30,70,140,0.15)',
                        }}
                      >
                        <td className="font-sans text-[13px] py-[10px] px-4" style={{ color: '#637899' }}>{label}</td>
                        <td className="text-center py-[10px] px-3"><ComparisonCell value={core} /></td>
                        <td
                          className="text-center py-[10px] px-3"
                          style={{
                            background: 'rgba(201,168,76,0.02)',
                            borderLeft: '1px solid rgba(201,168,76,0.15)',
                            borderRight: '1px solid rgba(201,168,76,0.15)',
                          }}
                        >
                          <ComparisonCell value={pro} />
                        </td>
                        <td className="text-center py-[10px] px-3"><ComparisonCell value={apex} /></td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10 text-center">
        <div className="max-w-[600px] mx-auto bg-bg-surface border border-gold/20 rounded p-6 text-left">
          <div className="font-mono text-[12px] text-gold tracking-wide text-center mb-4">
            MADDENAI RESEARCH NOTES — From A$4.99
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-text-faint pb-2 border-b border-[rgba(30,70,140,0.3)]">
            <span>OPTION</span>
            <span className="text-right">PRICE</span>
            <span className="text-right">PER NOTE</span>
          </div>
          {RESEARCH_ROWS.map(([label, price, perNote]) => (
            <div key={label} className="grid grid-cols-3 gap-2 py-2.5 font-mono text-[12px] border-b border-[rgba(30,70,140,0.2)] last:border-b-0">
              <span className="text-text-muted">{label}</span>
              <span className="text-text-primary text-right">{price}</span>
              <span className="text-text-muted text-right">{perNote}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="enterprise" className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10 scroll-mt-[84px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>ENTERPRISE</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            For adviser practices, firms, and institutions
          </h2>
          <p className="font-sans text-[18px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
            Enterprise packages with multiple seats, dedicated support, and commercial-grade features. Contact us to discuss.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 text-left">
            {ENTERPRISE_TIERS.map((tier) => (
              <div key={tier.name} className="bg-bg-primary border border-[rgba(201,168,76,0.15)] rounded p-6 flex flex-col">
                <div className="font-mono text-[11px] tracking-wide text-gold">{tier.name}</div>
                <div className="font-sans text-[22px] font-bold text-text-primary mt-2">{tier.price}</div>
                <div className="font-mono text-[9px] text-text-faint mt-1">{tier.seats}</div>
                <div className="font-mono text-[9px] text-text-muted mt-4">{tier.plusLabel}</div>
                <div className="flex flex-col gap-2 mt-2">
                  {tier.features.map((f) => (
                    <div key={f} className="font-sans text-[12px] text-text-muted flex gap-2">
                      <span className="text-gold">◆</span>{f}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <GoldButton href="mailto:hello@maddex.com.au" variant="ghost" className="w-full">{tier.button}</GoldButton>
                </div>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] text-text-faint max-w-2xl mx-auto mt-8 leading-[1.7]">
            Enterprise packages are available via direct enquiry. Current enterprise features are being developed for Q2-Q3 2027 release. Individual packages (Core, Pro, Apex) are available immediately via self-serve signup.
          </p>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
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
