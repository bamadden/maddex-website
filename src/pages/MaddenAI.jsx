import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import TerminalCard from '../components/shared/TerminalCard'

function FactorBar({ label, weight, color = '#C9A84C' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="font-mono text-[11px] text-text-muted w-40 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-[rgba(30,70,140,0.3)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${weight}%` : 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="font-mono text-[11px] text-gold w-10 text-right shrink-0">{weight}%</span>
    </div>
  )
}

function ScoreDial({ value, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const circumference = 2 * Math.PI * 42
  return (
    <div ref={ref} className="relative w-[110px] h-[110px] shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(30,70,140,0.3)" strokeWidth="6" />
        <motion.circle
          cx="50" cy="50" r="42" fill="none" stroke="#C9A84C" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? circumference * (1 - value / 100) : circumference }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[24px] font-bold text-gold leading-none">{value}</span>
        <span className="font-mono text-[8px] text-text-muted mt-1">{label}</span>
      </div>
    </div>
  )
}

const SENTIMENT_FACTORS = [
  ['ASX Breadth', 18], ['Global Momentum', 16], ['Volatility (VIX)', 14], ['Commodities', 12],
  ['Bond Yields', 12], ['Currency Strength', 10], ['Sector Rotation', 10], ['News Sentiment', 8],
]
const MOMENTUM_FACTORS = [
  ['Price Momentum', 28], ['Volume Trend', 24], ['Dominance Shift', 20], ['Fear & Greed', 16], ['Derivatives Positioning', 12],
]

export default function MaddenAI() {
  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[140px] pb-20 px-6 md:px-10 text-center">
        <SectionLabel center>MADDENAI</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[36px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary max-w-4xl mx-auto"
        >
          The intelligence layer behind every module.
        </motion.h1>
        <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-5 leading-relaxed">
          MaddenAI isn't a chatbot bolted onto a data feed. It's a structured scoring engine that reads markets, sentiment, and macro simultaneously — then hands you the synthesis.
        </p>
      </section>

      <section className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <SectionLabel center>HOW IT WORKS</SectionLabel>
          <h2 className="font-sans text-[30px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            A two-layer intelligence system.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="bg-bg-primary border border-gold/20 rounded p-7"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold">LAYER ONE</span>
              <h3 className="font-sans text-[22px] font-bold text-text-primary mt-3">Data Ingestion</h3>
              <p className="font-sans text-[14px] text-text-muted mt-3 leading-relaxed">
                Prices, volumes, macro releases, central bank statements, and 28+ news sources are pulled continuously and normalised into a single structured dataset — refreshed as fast as the underlying markets move.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-bg-primary border border-gold/20 rounded p-7"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold">LAYER TWO</span>
              <h3 className="font-sans text-[22px] font-bold text-text-primary mt-3">Weighted Synthesis</h3>
              <p className="font-sans text-[14px] text-text-muted mt-3 leading-relaxed">
                That dataset is run through weighted scoring models — Sentiment, Momentum, and Sector Strength — producing a 0-100 reading with a structured breakdown of exactly what's driving it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-24 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel center>SCORING MODELS</SectionLabel>
          <h2 className="font-sans text-[30px] md:text-[42px] font-bold text-text-primary text-center max-w-2xl mx-auto leading-tight">
            Three composite models. Fully transparent.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="bg-bg-surface border border-gold/20 rounded p-6"
            >
              <h3 className="font-sans text-[17px] font-bold text-text-primary">Market Sentiment Score</h3>
              <p className="font-sans text-[12px] text-text-muted mt-2 leading-relaxed">8-factor weighted composite. Updated every 60 seconds.</p>
              <div className="flex justify-center my-6"><ScoreDial value={72} label="/100" /></div>
              <div className="flex flex-col gap-2.5">
                {SENTIMENT_FACTORS.map(([label, weight]) => (
                  <FactorBar key={label} label={label} weight={weight} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-bg-surface border border-gold/20 rounded p-6"
            >
              <h3 className="font-sans text-[17px] font-bold text-text-primary">Crypto Momentum Index</h3>
              <p className="font-sans text-[12px] text-text-muted mt-2 leading-relaxed">5-factor composite across price, volume, and positioning.</p>
              <div className="flex justify-center my-6"><ScoreDial value={68} label="/100" /></div>
              <div className="flex flex-col gap-2.5">
                {MOMENTUM_FACTORS.map(([label, weight]) => (
                  <FactorBar key={label} label={label} weight={weight} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-bg-surface border border-gold/20 rounded p-6"
            >
              <h3 className="font-sans text-[17px] font-bold text-text-primary">Sector Strength Radar</h3>
              <p className="font-sans text-[12px] text-text-muted mt-2 leading-relaxed">All 11 GICS sectors scored simultaneously, every session.</p>
              <div className="grid grid-cols-3 gap-1.5 mt-6">
                {[
                  ['IT', 82, true], ['FIN', 58, true], ['HLTH', 71, true],
                  ['CDI', 44, false], ['COM', 63, true], ['IND', 60, true],
                  ['STA', 48, false], ['ENRG', 41, false], ['MAT', 68, true],
                  ['REI', 55, true], ['UTL', 46, false], ['—', null, null],
                ].map(([label, val, pos], i) => (
                  val === null ? <div key={i} /> : (
                    <div key={label} className="rounded-sm p-2 text-center" style={{ background: pos ? 'rgba(45,138,80,0.12)' : 'rgba(168,50,50,0.12)' }}>
                      <div className="font-mono text-[9px] text-text-muted">{label}</div>
                      <div className="font-mono text-[13px] font-bold" style={{ color: pos ? '#2D8A50' : '#A83232' }}>{val}</div>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionLabel>ASSET ANALYSIS</SectionLabel>
            <h2 className="font-sans text-[30px] md:text-[42px] font-bold text-text-primary leading-tight">
              Type any ticker. Get a full structured read in seconds.
            </h2>
            <p className="font-sans text-[16px] text-text-muted mt-4 leading-relaxed max-w-[440px]">
              Stock, crypto, FX pair, or index — MaddenAI returns the same five-part structure every time, so you always know where to look.
            </p>
            <div className="flex flex-col gap-3 mt-7">
              {[
                ['ASSESSMENT', 'A one-line read on current conditions'],
                ['SENTIMENT', 'Overall, Momentum, Volume, Macro, Risk scores'],
                ['LEVELS', 'Support and resistance, calculated live'],
                ['OUTLOOK', 'A near-term directional view with a range'],
                ['RISK', 'The specific scenario that would invalidate it'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <span className="font-mono text-[11px] text-gold w-24 shrink-0 pt-0.5">{title}</span>
                  <span className="font-sans text-[13px] text-text-muted">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <TerminalCard>
            <div className="bg-bg-surface border-b border-gold/12 px-4 py-2 font-mono text-[10px] text-gold">
              MADDENAI · CBA.AX ANALYSIS
            </div>
            <div className="p-5 font-mono text-[12px] flex flex-col gap-3">
              <div className="font-bold text-[15px] text-text-primary">CBA.AX &nbsp;A$164.20 &nbsp;<span className="text-gain">▲ +0.31%</span></div>
              <div><span className="text-gold text-[10px]">ASSESSMENT: </span><span className="text-text-muted">Steady institutional accumulation into result season.</span></div>
              <div><span className="text-gold text-[10px]">OUTLOOK: </span><span className="text-text-primary">Range-bound A$158–170 into FY results.</span></div>
              <div><span className="text-gold text-[10px]">RISK: </span><span className="text-text-muted">Valuation multiple compression on rate repricing.</span></div>
            </div>
          </TerminalCard>
        </div>
      </section>

      <section className="bg-bg-primary py-24 px-6 md:px-10 text-center">
        <SectionLabel center>RESEARCH NOTES</SectionLabel>
        <h2 className="font-sans text-[30px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
          Institutional-quality PDF research, generated on demand.
        </h2>
        <p className="font-sans text-[16px] text-text-muted max-w-xl mx-auto mt-4">
          Any ASX or US ticker. From A$4.99 a note — or unlimited on the Apex tier.
        </p>
        <div className="mt-8">
          <GoldButton to="/research">EXPLORE RESEARCH NOTES →</GoldButton>
        </div>
      </section>

      <section className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <SectionLabel center>PERSONALISATION</SectionLabel>
          <h2 className="font-sans text-[30px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            MaddenAI adapts to what you actually hold.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 text-left">
            {[
              ['Portfolio-Aware Scoring', 'Sentiment and risk reads are weighted toward the sectors and assets in your watchlist.'],
              ['Tuned Alerts', 'Get notified when MaddenAI scores shift materially on something you actually hold.'],
              ['Risk Calibration', 'Set your risk tolerance once — MaddenAI outlook language adjusts to match.'],
            ].map(([title, body]) => (
              <div key={title} className="bg-bg-primary border border-gold/20 rounded p-6">
                <h3 className="font-sans text-[16px] font-bold text-text-primary">{title}</h3>
                <p className="font-sans text-[13px] text-text-muted mt-2 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </>
  )
}
