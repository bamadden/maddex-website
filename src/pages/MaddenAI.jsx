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
    <div ref={ref} className="relative w-[112px] h-[112px] shrink-0">
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

function ExampleReading({ examples }) {
  return (
    <div className="mt-5 pt-5 border-t border-[rgba(30,70,140,0.3)]">
      <div className="font-mono text-[9px] text-gold tracking-[0.05em] mb-3">EXAMPLE: TODAY'S READING</div>
      <div className="flex flex-col gap-2.5">
        {examples.map(([label, value]) => {
          const color = value >= 66 ? '#C9A84C' : value >= 33 ? '#D4922B' : '#A83232'
          return (
            <div key={label} className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-text-muted w-32 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-[rgba(30,70,140,0.3)] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
              </div>
              <span className="font-mono text-[10px] w-8 text-right shrink-0" style={{ color }}>{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ClassificationBands() {
  return (
    <div className="mt-5 pt-5 border-t border-[rgba(30,70,140,0.3)]">
      <div className="flex justify-between font-mono text-[8px] text-text-faint mb-1.5">
        <span>0</span><span>33</span><span>66</span><span>100</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #A83232, #C9A84C, #2D8A50)' }} />
      <div className="flex justify-between font-mono text-[9px] text-text-muted mt-2">
        <span>BEARISH</span><span>NEUTRAL</span><span>BULLISH</span>
      </div>
    </div>
  )
}

const SENTIMENT_FACTORS = [
  ['ASX Market Breadth', 20], ['US Market Breadth', 15], ['Crypto Fear & Greed', 15], ['Crypto Breadth', 10],
  ['Global Index Momentum', 15], ['Volatility (VIX)', 10], ['Commodity Momentum', 10], ['News Sentiment', 5],
]
const MOMENTUM_FACTORS = [
  ['24H Price Momentum', 30], ['7D Price Momentum', 20], ['Market Breadth', 20], ['Fear & Greed Alignment', 15], ['Volume Conviction', 15],
]
const SECTOR_FACTORS = [
  ['Day Change %', 40], ['Volume Conviction', 30], ['52W Range Position', 30],
]

export default function MaddenAI() {
  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[84px] pb-20 px-6 md:px-10 text-center">
        <SectionLabel center>MADDENAI</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-4xl mx-auto"
        >
          The intelligence layer behind every module.
        </motion.h1>
        <p className="font-sans text-[18px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          MaddenAI isn't a chatbot bolted onto a data feed. It's a structured scoring engine that reads markets, sentiment, and macro simultaneously — then hands you the synthesis.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[900px] mx-auto mt-12 bg-bg-surface border border-gold/25 rounded overflow-hidden text-left"
        >
          <div className="bg-bg-primary border-b border-gold/12 px-4 py-2.5 font-mono text-[10px] text-gold flex items-center gap-1.5 flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
            TODAY'S MADDENAI READINGS &nbsp;·&nbsp; 15 JULY 2026 &nbsp;·&nbsp; 09:42 AEST
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(30,70,140,0.3)]">
            <div className="p-6 text-center min-h-[160px] flex flex-col justify-center">
              <div className="font-mono text-[9px] text-text-muted tracking-[0.1em]">MARKET SENTIMENT</div>
              <div className="font-mono text-[64px] font-bold text-gold mt-2 leading-none">
                <span className="score-pulse">72</span><span className="text-[20px] text-text-primary">/100</span>
              </div>
              <div className="font-mono text-[11px] text-text-primary mt-2">NEUTRAL-BULLISH</div>
              <div className="font-mono text-[9px] text-text-faint mt-3">LAST CALCULATED: 09:42:18 AEST</div>
            </div>
            <div className="p-6 text-center min-h-[160px] flex flex-col justify-center">
              <div className="font-mono text-[9px] text-text-muted tracking-[0.1em]">CRYPTO MOMENTUM</div>
              <div className="font-mono text-[64px] font-bold text-gold mt-2 leading-none">
                <span className="score-pulse">68</span><span className="text-[20px] text-text-primary">/100</span>
              </div>
              <div className="font-mono text-[11px] text-gain mt-2">BULLISH</div>
              <div className="font-mono text-[9px] text-text-faint mt-3">LAST CALCULATED: 09:42:18 AEST</div>
            </div>
            <div className="p-6 text-center min-h-[160px] flex flex-col justify-center">
              <div className="font-mono text-[9px] text-text-muted tracking-[0.1em]">BEST PERFORMING SECTOR</div>
              <div className="font-mono text-[22px] font-bold text-gold mt-2">INFORMATION TECHNOLOGY</div>
              <div className="font-mono text-[11px] text-gain mt-2">81/100 STRONG</div>
              <div className="font-mono text-[9px] text-text-faint mt-3">LAST CALCULATED: 09:42:18 AEST</div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>HOW IT WORKS</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            A two-layer intelligence system.
          </h2>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mt-14 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="bg-bg-primary border border-gold/20 rounded p-10"
            >
              <span className="font-mono text-[9px] tracking-[0.25em] text-gold">LAYER ONE</span>
              <h3 className="font-sans text-[24px] font-bold text-text-primary mt-3">Data Ingestion</h3>
              <p className="font-sans text-[14px] text-text-muted mt-3 leading-relaxed">
                Prices, volumes, macro releases, central bank statements, and 28+ news sources are pulled continuously and normalised into a single structured dataset — refreshed as fast as the underlying markets move.
              </p>
            </motion.div>

            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
              <svg width="80" height="28" viewBox="0 0 80 28" overflow="visible">
                <line x1="2" y1="14" x2="64" y2="14" stroke="#C9A84C" strokeWidth="2" />
                <polygon points="64,7 78,14 64,21" fill="#C9A84C" />
                <circle r="3.5" fill="#C9A84C">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M2,14 L64,14" />
                </circle>
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-bg-primary border border-gold/20 rounded p-10"
            >
              <span className="font-mono text-[9px] tracking-[0.25em] text-gold">LAYER TWO</span>
              <h3 className="font-sans text-[24px] font-bold text-text-primary mt-3">Weighted Synthesis</h3>
              <p className="font-sans text-[14px] text-text-muted mt-3 leading-relaxed">
                That dataset is run through weighted scoring models — Sentiment, Momentum, and Sector Strength — producing a 0-100 reading with a structured breakdown of exactly what's driving it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel center>SCORING MODELS</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary text-center max-w-2xl mx-auto leading-tight">
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
              <div className="flex justify-between font-mono text-[10px] text-text-faint mt-3 pt-3 border-t border-[rgba(30,70,140,0.3)]">
                <span>TOTAL</span>
                <span className="text-gold">100%</span>
              </div>
              <ExampleReading examples={[['ASX Breadth Today', 78], ['Volatility Today', 45], ['News Sentiment Today', 25]]} />
              <ClassificationBands />
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
              <div className="flex justify-between font-mono text-[10px] text-text-faint mt-3 pt-3 border-t border-[rgba(30,70,140,0.3)]">
                <span>TOTAL</span>
                <span className="text-gold">100%</span>
              </div>
              <ExampleReading examples={[['24H Momentum Today', 85], ['Volume Conviction Today', 52]]} />
              <ClassificationBands />
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
              <div className="flex flex-col gap-2.5 mt-5 pt-5 border-t border-[rgba(30,70,140,0.3)]">
                {SECTOR_FACTORS.map(([label, weight]) => (
                  <FactorBar key={label} label={label} weight={weight} />
                ))}
              </div>
              <div className="flex justify-between font-mono text-[10px] text-text-faint mt-3 pt-3 border-t border-[rgba(30,70,140,0.3)]">
                <span>TOTAL</span>
                <span className="text-gold">100%</span>
              </div>
              <ExampleReading examples={[['Day Change Today', 72], ['Volume Conviction Today', 48]]} />
              <ClassificationBands />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionLabel>ASSET ANALYSIS</SectionLabel>
            <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary leading-tight">
              Type any ticker. Get a full structured read in seconds.
            </h2>
            <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75] max-w-[440px]">
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

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10 text-center">
        <SectionLabel center>RESEARCH NOTES</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
          Institutional-quality PDF research, generated on demand.
        </h2>
        <p className="font-sans text-[18px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
          Any ASX or US ticker. From A$4.99 a note — or unlimited on the Apex tier.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative max-w-[520px] mx-auto mt-10 text-left"
        >
          <div className="relative bg-bg-surface border border-gold/25 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gold/20">
              <div className="font-mono text-[10px] tracking-[0.15em] text-gold">MADDENAI RESEARCH NOTE</div>
              <div className="font-sans text-[20px] font-bold text-text-primary mt-2">BHP GROUP LIMITED (BHP.AX)</div>
              <div className="font-mono text-[11px] text-text-muted mt-2">
                Current price: <span className="text-text-primary">A$63.42</span> &nbsp;|&nbsp; Rating: <span className="text-gain">BULLISH</span> &nbsp;|&nbsp; Date: <span className="text-text-primary">14 July 2026</span>
              </div>
              <div className="text-gold text-[15px] mt-2">★★★★☆</div>
            </div>
            <div className="px-6 py-4 border-b border-[rgba(30,70,140,0.3)]">
              <p className="font-sans text-[12px] text-text-muted leading-relaxed">
                BHP continues to trade constructively as iron ore holds above US$95/t, with Chinese steel margins improving modestly into the northern hemisphere construction season. Balance sheet strength and disciplined capital allocation support the current valuation. Near-term risk sits with a sharp deterioration in China demand data.
              </p>
            </div>
            <div className="px-6 py-4 border-b border-[rgba(30,70,140,0.3)]">
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] text-text-muted">
                {['PRICE ACTION', 'FUNDAMENTALS', 'SECTOR CONTEXT', 'MACRO', 'OUTLOOK', 'RISK'].map((s) => (
                  <span key={s}>◆ {s}</span>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <span className="font-mono text-[9px] text-text-faint tracking-[0.1em]">MADDEN GROUP HOLDINGS</span>
              <span className="font-mono text-[13px] font-bold text-gold">71/100 BULLISH</span>
            </div>
          </div>
          <div
            className="absolute bottom-0 right-0 w-5 h-5"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, #060D1A 50%)',
              boxShadow: '-3px -3px 8px rgba(0,0,0,0.4)',
            }}
          />
        </motion.div>

        <div className="mt-10">
          <GoldButton to="/research">EXPLORE RESEARCH NOTES →</GoldButton>
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>PERSONALISATION</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            MaddenAI speaks your language — whatever your experience level.
          </h2>
          <p className="font-sans text-[18px] text-text-muted max-w-2xl mx-auto mt-4 leading-[1.75]">
            The same underlying analysis, adapted in tone and depth to how you actually think about markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 text-left">
            {[
              ['BEGINNER', 'BHP is a mining company — when iron ore prices rise, BHP usually does well.'],
              ['INTERMEDIATE', 'BHP is trading above its 50-day moving average with positive momentum.'],
              ['ADVANCED', 'BHP showing bullish MACD crossover with volume confirmation above 52W mean.'],
              ['PROFESSIONAL', 'BHP: Constructive near-term. Fe ore basis risk contained. EBITDA sensitivity to spot pricing remains key variable.'],
            ].map(([level, quote]) => (
              <div key={level} className="bg-bg-primary border border-gold/20 rounded p-6 min-h-[220px] flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.15em] text-gold">{level}</span>
                <p className="font-sans text-[13px] text-text-muted mt-4 leading-relaxed italic">"{quote}"</p>
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
