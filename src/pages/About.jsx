import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import FinalCTA from '../components/home/FinalCTA'
import FadeInSection from '../components/shared/FadeInSection'

const COMPARISON_ROWS = [
  { label: 'Bloomberg Terminal', price: 'A$42,000/yr' },
  { label: 'Institutional desk', price: 'A$5,000/yr' },
  { label: 'Retail broker app', sub: '(limited data)', price: 'Free' },
  { label: 'Maddex', price: 'A$29/month', highlight: true },
]

const FOUNDER_DETAILS = [
  { icon: '📍', text: 'Brisbane, Australia' },
  { icon: '🎓', text: 'Master of Business (Applied Finance) — QUT' },
  { icon: '🎓', text: 'Bachelor of Business (International Business) — QUT' },
  { icon: '💼', text: 'Finance Graduate, Queensland Government' },
]

const FOUNDER_STORY = [
  'I built Maddex out of frustration.',
  "Working in finance and managing my own portfolio, I kept hitting the same wall. The tools that actually give you an edge — real macro context, AI-powered analysis, institutional-quality data — were either locked behind a Bloomberg subscription or simply didn't exist for retail investors.",
  "Retail apps show you a price. Maybe a chart. That's not enough to make informed decisions.",
  'So I built what I wanted to use. A terminal that treats retail investors like the sophisticated market participants they are. Professional tools at a price that makes sense.',
  'Maddex is still early. But the direction is clear: institutional intelligence, everyday pricing, built by someone who uses it every day.',
]

const VENTURES = [
  {
    name: 'Maddex',
    status: '● LIVE',
    live: true,
    desc: 'Financial intelligence terminal for everyday Australian investors. Real-time markets, AI analysis, global intelligence.',
    footer: 'maddex.com.au',
  },
  {
    name: 'Madden Capital',
    status: '◐ IN DEVELOPMENT',
    live: false,
    desc: 'A private investment fund focused on long-term value creation across public markets and private opportunities.',
    footer: 'In development',
  },
  {
    name: 'Madden Philanthropy',
    status: '◐ IN DEVELOPMENT',
    live: false,
    desc: 'A not-for-profit arm dedicated to financial literacy and access to quality financial education for all Australians.',
    footer: 'In development',
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

      {/* 1. STATEMENT */}
      <section className="bg-bg-primary pt-[84px] pb-20 px-6 md:px-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans font-extrabold text-text-primary max-w-[800px] mx-auto"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
        >
          The tools that actually matter have always been locked behind institutional paywalls.
          <br />
          That changes now.
        </motion.h1>
        <p className="font-sans text-[15px] text-text-muted mt-6">
          Maddex is built to change that.
        </p>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
          >
            <SectionLabel>THE PROBLEM</SectionLabel>
            <h2 className="font-sans text-[28px] md:text-[40px] font-bold tracking-[-0.02em] text-text-primary mt-3 leading-[1.15]" style={{ letterSpacing: '-0.02em' }}>
              Bloomberg costs A$42,000 a year.
            </h2>
            <div className="flex flex-col gap-4 mt-6">
              <p className="font-sans text-[16px] text-text-muted leading-[1.6]">
                The data professional investors rely on — real-time markets, macro intelligence, AI analysis — has always required institutional budgets.
              </p>
              <p className="font-sans text-[16px] text-text-muted leading-[1.6]">
                Retail brokers offer basic prices. Research desks charge thousands for access. The everyday investor is left behind.
              </p>
              <p className="font-sans text-[16px] text-text-muted leading-[1.6]">
                We think that&apos;s wrong.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
            className="bg-bg-primary p-8"
            style={{ border: '1px solid rgba(201,168,76,0.15)', borderRadius: 4 }}
          >
            {COMPARISON_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-baseline justify-between py-4 ${i > 0 ? 'border-t' : ''}`}
                style={{
                  borderColor: 'rgba(201,168,76,0.15)',
                  background: row.highlight ? 'rgba(201,168,76,0.06)' : 'transparent',
                  margin: row.highlight ? '0 -32px' : '0',
                  padding: row.highlight ? '16px 32px' : '16px 0',
                }}
              >
                <div className="font-sans text-[14px]" style={{ color: row.highlight ? '#C9A84C' : '#8BA3C4' }}>
                  {row.highlight && <span className="mr-1.5">★</span>}
                  {row.label}
                  {row.sub && <div className="font-sans text-[11px] text-text-muted mt-0.5">{row.sub}</div>}
                </div>
                <div className={`font-mono text-[15px] font-bold ${row.highlight ? 'text-gold' : 'text-text-primary'}`}>
                  {row.price}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. THE FOUNDER */}
      <section className="bg-bg-primary py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
            className="bg-bg-surface p-8 h-fit"
            style={{ border: '1px solid rgba(201,168,76,0.3)', borderRadius: 4 }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <span className="font-mono text-[26px] font-bold text-gold">BM</span>
            </div>
            <h3 className="font-sans text-[24px] font-bold tracking-[-0.02em] text-text-primary mt-5">Ben Madden</h3>
            <div className="font-mono text-[10px] tracking-[0.15em] text-gold mt-2">FOUNDER &amp; CEO</div>
            <div className="font-sans text-[11px] text-text-muted mt-1">Madden Group Holdings</div>

            <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="flex flex-col gap-3">
                {FOUNDER_DETAILS.map((d) => (
                  <div key={d.text} className="flex items-start gap-2.5 font-sans text-[13px] text-text-muted leading-[1.5]">
                    <span className="shrink-0">{d.icon}</span>
                    <span>{d.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <GoldButton href="mailto:ben@maddex.com.au" variant="ghost">EMAIL BEN →</GoldButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <SectionLabel>FROM THE FOUNDER</SectionLabel>
            <div className="flex flex-col gap-5 mt-5">
              {FOUNDER_STORY.map((para, i) => (
                <p
                  key={i}
                  className={`font-sans text-text-muted leading-[1.7] ${i === 0 ? 'text-[20px] font-semibold text-text-primary' : 'text-[16px]'}`}
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. MADDEN GROUP */}
      <FadeInSection className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>THE COMPANY</SectionLabel>
          <h2 className="font-sans text-[28px] md:text-[40px] font-bold tracking-[-0.02em] text-text-primary mt-3 leading-[1.15]" style={{ letterSpacing: '-0.02em' }}>
            Madden Group Holdings Pty Ltd
          </h2>
          <p className="font-sans text-[15px] text-text-muted max-w-[520px] mx-auto mt-3 leading-[1.6]">
            A private holding company built around financial intelligence and long-term value creation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left items-stretch">
            {VENTURES.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
                className="bg-bg-primary flex flex-col h-full"
                style={{ border: '1px solid rgba(201,168,76,0.15)', borderRadius: 4 }}
              >
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.1em] w-fit"
                    style={{ color: v.live ? '#2D8A50' : '#C9A84C' }}
                  >
                    {v.status}
                  </span>
                  <h3 className="font-sans text-[19px] font-bold tracking-[-0.02em] text-text-primary mt-4">{v.name}</h3>
                  <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7] flex-1">{v.desc}</p>
                  <div className="font-mono text-[10px] text-text-faint mt-5 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                    {v.footer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* 5. CONTACT */}
      <FadeInSection className="bg-bg-primary py-24 px-6 md:px-10 text-center">
        <h2 className="font-sans text-[24px] md:text-[32px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-[1.15]">
          Questions, feedback, partnerships.
        </h2>
        <a
          href="mailto:ben@maddex.com.au"
          className="inline-block font-mono text-[22px] md:text-[28px] font-bold text-gold mt-5 hover:opacity-90 transition-opacity"
        >
          ben@maddex.com.au
        </a>
        <p className="font-sans text-[13px] text-text-muted mt-3">
          I read every email. Usually reply within 24 hours.
        </p>
        <div className="mt-6">
          <GoldButton href="mailto:ben@maddex.com.au" variant="ghost">SEND AN EMAIL →</GoldButton>
        </div>
      </FadeInSection>

      <FinalCTA />
      <Footer />
    </>
  )
}
