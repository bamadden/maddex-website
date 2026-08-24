import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import FinalCTA from '../components/home/FinalCTA'
import FadeInSection from '../components/shared/FadeInSection'

const FOUNDER_DETAILS = [
  { icon: '📍', text: 'Brisbane, Australia' },
  { icon: '🎓', text: 'Master of Business (Applied Finance), QUT' },
  { icon: '🎓', text: 'Bachelor of Business (Intl Business), QUT' },
  { icon: '💼', text: 'Finance Graduate, Queensland Government' },
]

const STORY_PARAGRAPHS = [
  "I was managing my own portfolio while working in finance, and kept hitting the same wall — the data and tools that actually give you an edge were either locked behind a Bloomberg terminal or simply didn't exist for retail investors.",
  "Retail apps show you a price and a chart. That's not enough to make informed decisions. So I built what I wanted to use: a terminal that treats everyday investors like the sophisticated market participants they are.",
  'Maddex is still early. But the direction is clear: institutional intelligence, everyday pricing, built by someone who uses it every day.',
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
    name: 'MADDEX',
    status: '● LIVE NOW',
    live: true,
    desc: 'Financial intelligence terminal for everyday Australian investors.',
    footer: 'maddex.com.au',
    footerLink: true,
  },
  {
    name: 'MADDEN CAPITAL',
    status: '◐ IN DEVELOPMENT',
    live: false,
    desc: 'A private investment fund focused on long-term value creation across public markets and private opportunities.',
    footer: 'Est. future',
    footerLink: false,
  },
  {
    name: 'MADDEN PHILANTHROPY',
    status: '◐ IN DEVELOPMENT',
    live: false,
    desc: 'A not-for-profit arm dedicated to financial literacy and access to quality financial education for all Australians.',
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
      <section className="bg-bg-primary pt-[84px] pb-20 px-6 md:px-10 text-center">
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
              Built out of frustration.
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
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--card-radius)', padding: 'var(--space-8)' }}
              >
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.1em] w-fit"
                  style={{ color: v.live ? '#2D8A50' : '#C9A84C' }}
                >
                  {v.status}
                </span>
                <div className="mt-4 mb-4" style={{ height: 1, background: 'var(--border)' }} />
                <h3 className="font-sans text-[17px] font-bold tracking-[-0.02em] text-text-primary">{v.name}</h3>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7] flex-1">{v.desc}</p>
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  {v.footerLink ? (
                    <a href="https://maddex.com.au" className="font-mono text-[11px] text-gold hover:opacity-70 transition-opacity">{v.footer}</a>
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
        <div className="mt-6">
          <GoldButton href="mailto:ben@maddex.com.au">SEND AN EMAIL →</GoldButton>
        </div>
      </FadeInSection>

      <FinalCTA />
      <Footer />
    </>
  )
}
