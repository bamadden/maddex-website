import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import FinalCTA from '../components/home/FinalCTA'
import FadeInSection from '../components/shared/FadeInSection'
import { ContactForm } from '../components/ContactForm'

const FOUNDER_DETAILS = [
  { icon: '📍', text: 'Brisbane, Australia' },
  { icon: '🎓', text: 'Master of Business (Applied Finance), QUT' },
  { icon: '🎓', text: 'Bachelor of Business (Intl Business), QUT' },
  { icon: '💼', text: 'Finance Graduate, Queensland Government' },
]

const STORY_PARAGRAPHS = [
  "From early on, I was drawn to understanding how things work — economies, markets, the flow of capital across borders. That curiosity led me through a finance degree, into government work, and eventually to managing my own portfolio.",
  "What I found was a gap. The information and tools that serious investors rely on — macro context, AI-powered analysis, institutional-grade data — were locked away. Retail investors were left with prices and charts, when what they needed was intelligence.",
  'Maddex is built on the belief that access to quality financial information changes outcomes. One terminal. One source of truth. Everything an informed investor needs to make better decisions — at a price that makes sense.',
]

const GAP_CARDS = [
  {
    color: 'var(--red)',
    label: 'THE PROBLEM',
    heading: 'A$30,000/year',
    body: 'Bloomberg Terminal — the gold standard for institutional investors. Out of reach for everyone else.',
  },
  {
    color: 'rgba(201,168,76,0.3)',
    label: 'THE GAP',
    heading: 'Nothing in between',
    body: 'Retail broker apps offer basic prices and simple charts. No macro intelligence, no AI analysis, no global context.',
  },
  {
    color: 'var(--green)',
    label: 'THE SOLUTION',
    heading: 'A$29/month',
    body: 'Maddex. Institutional-grade data, AI-powered analysis, global intelligence. For everyday investors.',
  },
]

const VENTURES = [
  {
    name: 'Maddex',
    status: '● LIVE NOW',
    live: true,
    topBorder: '#C9A84C',
    subtitle: 'FINANCIAL INTELLIGENCE TERMINAL',
    desc: 'Real-time ASX and global market data, AI-powered analysis via MaddenAI, and global intelligence — in one professional terminal. Built for everyday Australian investors.',
    stats: [
      ['A$29/mo', 'CORE PLAN'],
      ['8', 'MODULES'],
      ['70+', 'MARKETS'],
    ],
    footer: 'maddex.com.au',
    footerLink: true,
  },
  {
    name: 'Madden Capital',
    status: '◐ IN DEVELOPMENT',
    live: false,
    topBorder: 'rgba(201,168,76,0.4)',
    subtitle: 'PRIVATE INVESTMENT',
    desc: 'A private investment fund focused on long-term value creation across public markets, private credit, and emerging asset classes.',
    pills: ['Public Markets', 'Private Credit', 'Alternatives'],
    footer: 'Est. future',
    footerLink: false,
  },
  {
    name: 'Madden Philanthropy',
    status: '◐ IN DEVELOPMENT',
    live: false,
    topBorder: 'rgba(201,168,76,0.4)',
    subtitle: 'PROFIT FOR PURPOSE',
    desc: 'A philanthropic arm built on the belief that business success creates an obligation to give back. Focused on high-impact initiatives across social welfare, environmental action, and economic opportunity — with full transparency on where every dollar goes.',
    pills: ['Social Welfare', 'Environment', 'Economic Access'],
    mission: "Business success means nothing if it doesn't lift others.",
    footer: 'Est. future',
    footerLink: false,
  },
]

export default function About() {
  useEffect(() => {
    document.title = 'Maddex — About'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      {/* 1. MISSION STATEMENT */}
      <section className="bg-bg-primary pt-[140px] pb-20 px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SectionLabel center>ABOUT MADDEX</SectionLabel>
          <h1
            className="font-sans text-text-primary max-w-[760px] mx-auto mt-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Professional financial intelligence shouldn't cost A$30,000 a year.
          </h1>
          <p className="font-sans text-[15px] text-text-muted max-w-[500px] mx-auto mt-6 leading-[1.6]">
            Maddex was built to close the gap between what institutional investors access and what everyday investors can afford.
          </p>
        </motion.div>
      </section>

      {/* 2. THE BUILD */}
      <section className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
          >
            <SectionLabel>THE STORY</SectionLabel>
            <h2 className="font-sans text-[28px] md:text-[40px] font-bold tracking-[-0.02em] text-text-primary mt-3 leading-[1.15]">
              Built from a desire to know more.
            </h2>
            <div className="flex flex-col gap-5 mt-6">
              {STORY_PARAGRAPHS.map((para, i) => (
                <p key={i} className="font-sans text-[16px] text-text-secondary leading-[1.65]">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="bg-bg-primary"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--card-radius)', padding: 'var(--space-8)' }}
          >
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
              style={{ border: '2px solid rgba(201,168,76,0.4)', background: 'var(--surface-2)' }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, color: '#C9A84C' }}>BM</span>
            </div>
            <h3 className="font-sans text-[18px] font-bold text-text-primary mt-4">Ben Madden</h3>
            <div className="font-mono text-[10px] tracking-[0.15em] text-gold mt-2">FOUNDER &amp; CEO</div>
            <div className="font-sans text-[12px] text-text-muted mt-1">Madden Group Holdings</div>

            <div className="mt-4 mb-4" style={{ height: 1, background: 'var(--border)' }} />

            <div className="flex flex-col gap-3">
              {FOUNDER_DETAILS.map((d) => (
                <div key={d.text} className="flex items-start gap-2.5 font-sans text-[13px] text-text-muted leading-[1.5]">
                  <span className="shrink-0">{d.icon}</span>
                  <span>{d.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <GoldButton href="mailto:ben@maddex.com.au" variant="ghost" className="!w-full">EMAIL BEN →</GoldButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE GAP WE'RE CLOSING */}
      <FadeInSection className="bg-bg-primary py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {GAP_CARDS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
                className="flex flex-col h-full"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderTop: `3px solid ${c.color}`,
                  borderRadius: 'var(--card-radius)',
                  padding: 'var(--space-8)',
                }}
              >
                <div className="font-mono text-[9px] tracking-[0.15em] text-gold">{c.label}</div>
                <div className="font-sans text-[24px] font-bold tracking-[-0.02em] text-text-primary mt-3">{c.heading}</div>
                <p className="font-sans text-[14px] text-text-muted mt-4 leading-[1.7]">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* 4. MADDEN GROUP */}
      <FadeInSection className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>THE COMPANY</SectionLabel>
          <h2 className="font-sans text-[28px] md:text-[40px] font-bold tracking-[-0.02em] text-text-primary mt-3 leading-[1.15]">
            Madden Group Holdings Pty Ltd
          </h2>
          <p className="font-sans text-[15px] text-text-muted max-w-[560px] mx-auto mt-3 leading-[1.6]">
            A Brisbane-based holding company focused on financial intelligence and long-term value creation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left items-stretch">
            {VENTURES.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
                className="flex flex-col h-full"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderTop: `3px solid ${v.topBorder}`,
                  borderRadius: 'var(--card-radius)',
                  padding: 'var(--space-8)',
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.1em] w-fit"
                  style={{ color: v.live ? '#2D8A50' : '#C9A84C' }}
                >
                  {v.status}
                </span>
                <h3 className="font-sans text-[20px] font-bold tracking-[-0.02em] text-text-primary mt-4">{v.name}</h3>
                <div className="font-mono text-[11px] tracking-[0.1em] text-gold mt-1.5">{v.subtitle}</div>
                <div className="mt-4 mb-4" style={{ height: 1, background: 'var(--border)' }} />
                <p className="font-sans text-[13px] text-text-muted leading-[1.7]">{v.desc}</p>

                {v.stats && (
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {v.stats.map(([value, label]) => (
                      <div key={label}>
                        <div className="font-mono text-[15px] font-bold text-gold">{value}</div>
                        <div className="font-mono text-[8px] text-text-muted tracking-[0.08em] mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {v.pills && (
                  <div className="flex flex-wrap gap-1.5 mt-6">
                    {v.pills.map((p) => (
                      <span key={p} className="font-mono text-[10px] text-gold border border-gold/30 rounded-full px-2.5 py-1">
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {v.mission && (
                  <p className="font-sans text-[13px] text-text-muted italic mt-6">
                    "{v.mission}"
                  </p>
                )}

                <div className="mt-auto pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  {v.footerLink ? (
                    <a href="https://maddex.com.au" className="font-mono text-[11px] text-gold hover:opacity-70 transition-opacity">→ {v.footer}</a>
                  ) : (
                    <span className="font-mono text-[11px] text-text-muted">{v.footer}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* 5. CONTACT */}
      <FadeInSection className="bg-bg-primary py-24 px-6 md:px-10 text-center">
        <a
          href="mailto:ben@maddex.com.au"
          className="inline-block font-mono text-[20px] font-bold text-gold hover:opacity-90 transition-opacity"
        >
          ben@maddex.com.au
        </a>
        <p className="font-sans text-[13px] text-text-muted mt-4 max-w-md mx-auto leading-[1.6]">
          Questions, feedback, or partnerships. I read every email.
        </p>
        <p className="font-mono text-[11px] text-text-faint mt-2">
          Usually within 24 hours.
        </p>
        <p className="font-mono text-[10px] text-text-faint mt-6 tracking-[0.1em]">
          OR USE THE FORM BELOW
        </p>
        <div className="max-w-[480px] mx-auto mt-6 text-left">
          <ContactForm />
        </div>
      </FadeInSection>

      <FinalCTA />
      <Footer />
    </>
  )
}
