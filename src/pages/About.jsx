import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

const BELIEFS = [
  {
    title: 'Data over noise.',
    body: 'Every reading in Maddex is backed by a live number, not a hot take. If it can’t be measured, it doesn’t go in the terminal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'General information, not advice.',
    body: 'MaddenAI gives you analysis and context — never a personal recommendation. Informed investors make their own decisions, better.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8h.01M11 11h1v5h1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Built to last.',
    body: 'Maddex is built as a long-term business, not a growth-hack. We grow only when our subscribers actually succeed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 3v3M12 21v-4M5 8l2 2M17 8l-2 2M3 12h4M17 12h4" strokeLinecap="round" />
        <circle cx="12" cy="14" r="4" />
      </svg>
    ),
  },
]

const PRODUCTS = [
  { name: 'Maddex', status: 'LIVE', live: true },
  { name: 'Madden Capital', status: 'FUTURE', live: false },
  { name: 'Madden Philanthropy', status: 'FUTURE', live: false },
]

export default function About() {
  useEffect(() => {
    document.title = 'Maddex — About'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      {/* 1. OPENING STATEMENT */}
      <section className="bg-bg-primary pt-[84px] pb-16 px-6 md:px-10 text-center">
        <SectionLabel center>ABOUT MADDEX</SectionLabel>
        <motion.blockquote
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[30px] md:text-[52px] font-bold leading-[1.15] tracking-tight text-text-primary max-w-4xl mx-auto"
        >
          "I built Maddex because Australian investors deserve better tools."
        </motion.blockquote>
        <p className="font-sans text-[16px] md:text-[17px] text-text-muted max-w-2xl mx-auto mt-6 leading-[1.7]">
          A finance graduate frustrated by the gap between $2,000-a-month Bloomberg terminals and watered-down retail apps — so I built the terminal that should have existed already.
        </p>
      </section>

      {/* 2. TWO-COLUMN — story + founder card */}
      <section className="bg-bg-surface py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-gold mb-2">THE PROBLEM</div>
              <p className="font-sans text-[16px] text-text-muted leading-[1.8]">
                Professional-grade market data has always been locked behind institutional paywalls. Retail investors are left with a share price and not much else — no macro context, no sentiment scoring, no synthesis.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-gold mb-2">THE SOLUTION</div>
              <p className="font-sans text-[16px] text-text-muted leading-[1.8]">
                Maddex pairs real-time market data with MaddenAI, an intelligence layer that reads sentiment and macro data alongside the numbers — at a price that actually makes sense for an individual investor.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-gold mb-2">WHERE IT'S GOING</div>
              <p className="font-sans text-[16px] text-text-muted leading-[1.8]">
                The Terminal is live today. Research Notes and the MaddenAI Newsletter follow as standalone products, with a companion app to keep you connected between sessions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
            className="bg-bg-primary border border-gold/25 rounded p-8 flex flex-col items-center text-center justify-center"
          >
            <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center">
              <span className="font-mono text-[26px] font-bold text-gold">BM</span>
            </div>
            <h2 className="font-sans text-[24px] font-bold text-white mt-5">Ben Madden</h2>
            <div className="font-mono text-[11px] tracking-[0.15em] text-gold mt-2">FOUNDER &amp; CEO</div>
            <div className="font-mono text-[10px] tracking-[0.1em] text-text-muted mt-1">MADDEN GROUP HOLDINGS</div>
            <div className="w-10 h-px bg-gold/25 my-4" />
            <div className="font-sans text-[12px] text-text-muted leading-[1.7]">
              Master of Business (Applied Finance) — QUT
              <br />
              Bachelor of Business (International Business) — QUT
            </div>
            <div className="font-mono text-[10px] text-text-faint mt-3 tracking-wide">BRISBANE, AUSTRALIA</div>
          </motion.div>
        </div>
      </section>

      {/* 3. BELIEFS */}
      <section className="bg-bg-primary py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>WHAT WE BELIEVE</SectionLabel>
          <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
            Three things we won't compromise on.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 text-left items-stretch">
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
                whileHover={{ y: -4 }}
                className="bg-bg-surface border border-gold/20 rounded p-6 flex flex-col h-full"
              >
                <span className="text-gold shrink-0">{b.icon}</span>
                <h3 className="font-sans text-[17px] font-bold text-text-primary mt-4 shrink-0">{b.title}</h3>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7] flex-1">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPANY STRUCTURE */}
      <section className="bg-bg-surface py-16 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionLabel center>THE COMPANY</SectionLabel>
          <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
            Madden Group Holdings Pty Ltd
          </h2>
          <p className="font-mono text-[11px] text-gold tracking-[0.1em] mt-3">
            THE PARENT COMPANY BEHIND MADDEX
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {PRODUCTS.map((p) => (
              <span
                key={p.name}
                className="inline-flex items-center gap-2 font-mono text-[12px] rounded-full px-4 py-2 border"
                style={{
                  borderColor: p.live ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.18)',
                  background: p.live ? 'rgba(201,168,76,0.08)' : 'transparent',
                  color: p.live ? '#C9A84C' : '#8A9BB5',
                }}
              >
                {p.name}
                <span className="opacity-60">—</span>
                <span className={p.live ? 'text-gain' : 'text-text-faint'}>{p.status === 'LIVE' ? 'Live' : 'Future'}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT */}
      <section className="bg-bg-primary py-16 px-6 md:px-10 text-center">
        <SectionLabel center>CONTACT</SectionLabel>
        <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
          Have a question? I read every email.
        </h2>
        <a
          href="mailto:ben@maddex.com.au"
          className="inline-block font-mono text-[22px] md:text-[28px] font-bold text-gold mt-6 hover:opacity-75 transition-opacity"
        >
          ben@maddex.com.au
        </a>
        <div className="font-mono text-[10px] text-text-faint mt-2 tracking-wide">USUALLY WITHIN 24 HOURS</div>
        <div className="mt-6">
          <GoldButton href="mailto:ben@maddex.com.au">EMAIL BEN →</GoldButton>
        </div>
      </section>

      <Footer />
    </>
  )
}
