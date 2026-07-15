import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

const VALUES = [
  ['Depth over noise', 'Every module is built to add signal, not another number that means nothing without context.'],
  ['Australian-first', 'Built for the ASX, the RBA, and AUD-denominated portfolios — not a US product with a currency toggle.'],
  ['Radical transparency', 'MaddenAI shows its factor weightings and methodology. No black-box scores.'],
  ['Priced for individuals', 'Institutional-grade intelligence shouldn\'t require an institutional budget.'],
]

const ROADMAP = [
  ['Q3 2026', 'Options flow module', 'ASX and US options positioning data, integrated into MaddenAI sentiment.'],
  ['Q4 2026', 'Portfolio import + tax reporting', 'Connect your broker account for live portfolio-aware MaddenAI scoring.'],
  ['Q1 2027', 'Mobile app (iOS + Android)', 'Native apps with push alerts tuned to your watchlist.'],
  ['Q2 2027', 'API access for Apex + Institutional', 'Programmatic access to MaddenAI scores and market data.'],
]

export default function About() {
  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[140px] pb-16 px-6 md:px-10 text-center">
        <SectionLabel center>ABOUT MADDEX</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto"
        >
          Built by an investor, for investors.
        </motion.h1>
        <p className="font-sans text-[18px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          Maddex exists because the gap between "free broker app" and "A$42,000-a-year terminal" was never supposed to be this wide.
        </p>
      </section>

      <section className="bg-bg-surface py-20 md:py-[140px] px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-[240px] h-[240px] mx-auto md:mx-0 shrink-0"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, #C9A84C 30%, transparent 60%)',
                animation: 'border-spin 8s linear infinite',
              }}
            />
            <div className="absolute inset-[6px] rounded-full bg-bg-primary border border-gold/10 flex items-center justify-center">
              <span className="font-mono text-[64px] font-bold text-gold">BM</span>
            </div>
          </motion.div>
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-gold">FOUNDER</span>
            <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-text-primary mt-2">Ben Madden</h2>
            <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75]">
              I started building what became Maddex out of frustration — watching friends and colleagues either overpay for terminals they didn't need, or make decisions off a free app that told them a price moved without ever explaining why.
            </p>
            <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75]">
              Maddex is the product I wanted to exist: real data depth, an AI layer that actually explains its reasoning, and a price that makes sense for an individual investor rather than a trading desk.
            </p>
            <div className="inline-flex items-center gap-2 mt-5 font-mono text-[10px] tracking-[0.1em] text-text-muted border border-gold/20 rounded-full px-3 py-1.5">
              <span className="relative w-1.5 h-1.5">
                <span className="pulse-ring absolute inset-0" />
                <span className="absolute inset-0 rounded-full bg-gold" />
              </span>
              BUILT IN BRISBANE, AUSTRALIA
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[140px] px-6 md:px-10 text-center">
        <SectionLabel center>MISSION</SectionLabel>
        <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-3xl mx-auto leading-tight">
          Give every Australian investor the intelligence that used to be reserved for trading floors.
        </h2>
      </section>

      <section className="bg-bg-surface py-20 md:py-[140px] px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <SectionLabel center>HOW MADDEX IS STRUCTURED</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            One data engine. Three surfaces.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {[
              ['DATA LAYER', 'Live market, macro, and news ingestion across 200+ countries and 50+ exchanges.'],
              ['MADDENAI ENGINE', 'Weighted scoring models turning raw data into structured, 0-100 intelligence.'],
              ['TERMINAL + RESEARCH', 'The interface: seven modules, on-demand asset analysis, and weekly research.'],
            ].map(([title, desc], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="bg-bg-primary border border-gold/20 rounded p-6 text-left"
              >
                <span className="font-mono text-[9px] tracking-[0.25em] text-gold">{title}</span>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[140px] px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <SectionLabel center>VALUES</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            What we won't compromise on.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12 text-left">
            {VALUES.map(([title, desc], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.35)' }}
                className="bg-bg-surface border-l-[3px] border-gold rounded-r p-6 cursor-default"
              >
                <h3 className="font-sans text-[16px] font-bold text-text-primary">{title}</h3>
                <p className="font-sans text-[13px] text-text-muted mt-2 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[140px] px-6 md:px-10">
        <div className="max-w-[800px] mx-auto">
          <SectionLabel center>ROADMAP</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary text-center leading-tight mb-12">
            What's coming, and when.
          </h2>
          <div className="flex flex-col">
            {ROADMAP.map(([quarter, title, desc], i) => (
              <motion.div
                key={quarter}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex gap-6 pb-10 relative"
              >
                <div className="flex flex-col items-center shrink-0">
                  <span className="w-3 h-3 rounded-full bg-gold shrink-0" />
                  {i < ROADMAP.length - 1 && <span className="w-px flex-1 bg-gold/20 mt-1" />}
                </div>
                <div>
                  <span className="font-mono text-[11px] text-gold">{quarter}</span>
                  <h3 className="font-sans text-[17px] font-bold text-text-primary mt-1">{title}</h3>
                  <p className="font-sans text-[13px] text-text-muted mt-1 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[140px] px-6 md:px-10 text-center">
        <SectionLabel center>CONTACT</SectionLabel>
        <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
          Get in touch with Ben directly.
        </h2>
        <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75]">
          Questions, feedback, or a partnership idea — every message reaches the founder, not a support queue.
        </p>
        <div className="mt-8">
          <GoldButton href="mailto:ben@maddex.com.au">EMAIL BEN →</GoldButton>
        </div>
      </section>

      <Footer />
    </>
  )
}
