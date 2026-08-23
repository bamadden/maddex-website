import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

const VENTURES = [
  {
    name: 'Maddex',
    status: 'LIVE',
    live: true,
    desc: 'Financial intelligence terminal for everyday investors. ASX and global markets, AI analysis, institutional-grade tools.',
    footer: 'maddex.com.au',
  },
  {
    name: 'Madden Capital',
    status: 'FUTURE',
    live: false,
    desc: 'A private investment fund focused on long-term value creation across public markets and private opportunities.',
    footer: 'In development',
  },
  {
    name: 'Madden Philanthropy',
    status: 'FUTURE',
    live: false,
    desc: 'A not-for-profit arm focused on financial literacy and access to quality financial education for all Australians.',
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

      {/* 1. HERO */}
      <section className="bg-bg-primary pt-[84px] pb-16 px-6 md:px-10 text-center">
        <SectionLabel center>OUR STORY</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[38px] md:text-[60px] font-bold leading-[1.1] tracking-tight text-text-primary max-w-3xl mx-auto"
        >
          Built by an investor,
          <br />
          for investors.
        </motion.h1>
        <p className="font-sans text-[16px] md:text-[17px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.7]">
          Maddex exists because institutional tools shouldn't cost institutional prices.
        </p>
      </section>

      {/* 2. STORY + FOUNDER */}
      <section className="bg-bg-surface py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-center gap-6"
          >
            <p className="font-sans text-[16px] text-text-muted leading-[1.8]">
              Professional-grade market data has always been locked behind institutional paywalls. Retail investors are left with a share price and not much else — no macro context, no sentiment scoring, no synthesis.
            </p>
            <p className="font-sans text-[16px] text-text-muted leading-[1.8]">
              Maddex pairs real-time market data with MaddenAI, an intelligence layer that reads sentiment and macro data alongside the numbers — at a price that actually makes sense for an individual investor.
            </p>
            <p className="font-sans text-[16px] text-text-muted leading-[1.8]">
              The Terminal is live today. Research Notes and the MaddenAI Newsletter follow as standalone products, with a companion app to keep you connected between sessions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
            className="bg-bg-primary border border-gold/25 rounded p-8 flex flex-col items-center text-center justify-center"
          >
            <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center">
              <span className="font-mono text-[20px] font-bold text-gold">BM</span>
            </div>
            <h2 className="font-sans text-[22px] font-bold text-white mt-5">Ben Madden</h2>
            <div className="font-mono text-[11px] tracking-[0.15em] text-gold mt-2">FOUNDER &amp; CEO</div>
            <div className="font-mono text-[10px] tracking-[0.1em] text-text-muted mt-2">QUT APPLIED FINANCE · BRISBANE</div>
            <div className="mt-6">
              <GoldButton href="mailto:ben@maddex.com.au" variant="ghost">EMAIL BEN →</GoldButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. MADDEN GROUP HOLDINGS */}
      <section className="bg-bg-primary py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
            Madden Group Holdings Pty Ltd
          </h2>
          <p className="font-sans text-[15px] text-text-muted max-w-[520px] mx-auto mt-3 leading-[1.7]">
            The parent company behind Maddex and future ventures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 text-left items-stretch">
            {VENTURES.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
                className="bg-bg-surface rounded overflow-hidden flex flex-col h-full border border-[rgba(201,168,76,0.15)]"
                style={{ borderTop: '2px solid #C9A84C' }}
              >
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.1em] w-fit"
                    style={{ color: v.live ? '#2D8A50' : '#C9A84C' }}
                  >
                    {v.live ? '●' : '◐'} {v.status}
                  </span>
                  <h3 className="font-sans text-[19px] font-bold text-text-primary mt-4">{v.name}</h3>
                  <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7] flex-1">{v.desc}</p>
                  <div className="font-mono text-[10px] text-text-faint mt-5 pt-4 border-t border-[rgba(30,70,140,0.25)]">
                    {v.footer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACT */}
      <section className="bg-bg-surface py-16 px-6 md:px-10 text-center">
        <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
          Have a question? I read every email.
        </h2>
        <a
          href="mailto:ben@maddex.com.au"
          className="inline-block font-mono text-[22px] md:text-[28px] font-bold text-gold mt-5 hover:opacity-75 transition-opacity"
        >
          ben@maddex.com.au
        </a>
        <div className="font-mono text-[10px] text-text-faint mt-2 tracking-wide">USUALLY WITHIN 24 HOURS</div>
      </section>

      <Footer />
    </>
  )
}
