import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import FadeInSection from '../components/shared/FadeInSection'
import { useAnalytics } from '../hooks/useAnalytics'
import { useCheckout } from '../context/CheckoutContext'

function FactorTableHeader() {
  return (
    <div
      className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.05em] text-gold px-4 py-2 rounded-t"
      style={{ background: 'rgba(201,168,76,0.06)' }}
    >
      <span>Factor</span>
      <span>Weight</span>
    </div>
  )
}

function FactorBar({ label, weight }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const fillColor = weight >= 15 ? '#C9A84C' : 'rgba(201,168,76,0.4)'
  return (
    <div
      ref={ref}
      className="flex items-center justify-end gap-3 py-[10px] px-4 transition-colors hover:bg-[rgba(201,168,76,0.03)]"
      style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}
    >
      <span className="font-mono text-[11px] text-text-muted w-40 shrink-0 text-left mr-auto">{label}</span>
      <div className="w-[80px] max-w-[80px] h-[6px] rounded-full bg-[rgba(201,168,76,0.15)] overflow-hidden shrink-0">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${weight}%` : 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: fillColor }}
        />
      </div>
      <span className="font-mono text-[11px] font-bold text-gold w-10 text-right shrink-0">{weight}%</span>
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
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="6" />
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
    <div className="mt-5 pt-5 border-t border-[rgba(201,168,76,0.15)]">
      <div className="font-mono text-[9px] text-gold tracking-[0.05em] mb-3">EXAMPLE: TODAY'S READING</div>
      <div className="flex flex-col gap-2.5">
        {examples.map(([label, value]) => {
          const color = value >= 66 ? '#C9A84C' : value >= 33 ? '#E8C96A' : '#A83232'
          return (
            <div key={label} className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-text-muted w-32 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-[rgba(201,168,76,0.15)] overflow-hidden">
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
    <div className="mt-5 pt-5 border-t border-[rgba(201,168,76,0.15)]">
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

function SparklineIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <polyline points="4,34 14,28 22,30 30,16 40,8" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CandlestickIcon() {
  const candles = [
    { x: 10, bodyTop: 26, bodyBot: 34, wickTop: 20, wickBot: 38 },
    { x: 22, bodyTop: 18, bodyBot: 28, wickTop: 12, wickBot: 32 },
    { x: 34, bodyTop: 8, bodyBot: 20, wickTop: 4, wickBot: 24 },
  ]
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      {candles.map((c, i) => (
        <g key={i}>
          <line x1={c.x} y1={c.wickTop} x2={c.x} y2={c.wickBot} stroke="#2D8A50" strokeWidth="1.5" />
          <rect x={c.x - 3} y={c.bodyTop} width="6" height={c.bodyBot - c.bodyTop} fill="#2D8A50" rx="1" />
        </g>
      ))}
    </svg>
  )
}

function BarsIcon() {
  const bars = [{ x: 6, h: 12 }, { x: 18, h: 22 }, { x: 30, h: 32 }]
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={38 - b.h} width="8" height={b.h} fill="#C9A84C" rx="1" />
      ))}
    </svg>
  )
}

function WavyLineIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <defs>
        <linearGradient id="wavyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8BA3C4" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>
      <path d="M4,26 Q10,32 16,24 T28,20 Q34,16 40,8" fill="none" stroke="url(#wavyGrad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const ASSET_EXAMPLES = [
  {
    category: 'EQUITY',
    name: 'BHP Group',
    ticker: 'BHP.AX',
    price: 'A$43.21',
    change: '+1.27%',
    up: true,
    text: 'Strong iron ore data lifting the majors — spot price up 2.3% on renewed China stimulus hopes. Volume running 1.4x the 30-day average, with the stock holding above its 50-day moving average.',
    tags: ['ASX', 'Materials', 'Bullish'],
    icon: <SparklineIcon />,
  },
  {
    category: 'CRYPTO',
    name: 'Bitcoin',
    ticker: 'BTC',
    price: 'A$162,400',
    change: '+1.80%',
    up: true,
    text: 'Consolidating above key support with ETF inflows steady and funding rates neutral — no sign of excess leverage building. Fear & Greed reads 42, still short of euphoric territory.',
    tags: ['Crypto', 'L1', 'Neutral'],
    icon: <CandlestickIcon />,
  },
  {
    category: 'COMMODITY',
    name: 'Iron Ore',
    ticker: 'Spot, 62% Fe',
    price: 'US$98.40/t',
    change: '+2.3%',
    up: true,
    text: 'China steel margins improving into the northern construction season, with port inventories drawing down for a third straight week. Demand signal is constructive but remains policy-sensitive.',
    tags: ['Commodity', 'China', 'Bullish'],
    icon: <BarsIcon />,
  },
  {
    category: 'MACRO',
    name: 'AUD/USD',
    ticker: 'FX',
    price: '0.6520',
    change: '+0.18%',
    up: true,
    text: 'Firming on rate-differential support as the RBA holds at 4.35% while the Fed signals a slower cutting path. Range-bound 0.645–0.660 into the next data print.',
    tags: ['FX', 'Macro', 'Mildly Bullish'],
    icon: <WavyLineIcon />,
  },
]

function AssetExampleCard({ ex }) {
  return (
    <div
      className="bg-bg-primary border border-gold/15 rounded overflow-hidden flex flex-col"
      style={{ borderTop: '2px solid #C9A84C' }}
    >
      <div className="bg-bg-surface border-b border-gold/15 px-4 py-2 font-mono text-[9px] text-gold tracking-[0.15em]">
        {ex.category}
      </div>
      <div className="p-4 flex gap-3 items-start flex-1">
        <div className="shrink-0 mt-0.5">{ex.icon}</div>
        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <span className="font-sans text-[15px] font-bold tracking-[-0.02em] text-text-primary">{ex.name}</span>
            <span className="font-mono text-[10px] text-text-muted">{ex.ticker}</span>
          </div>
          <div className="font-mono text-[12px]">
            <span className="text-text-primary font-bold">{ex.price}</span>
            <span className={`ml-2 ${ex.up ? 'text-gain' : 'text-loss'}`}>{ex.up ? '▲' : '▼'} {ex.change}</span>
          </div>
          <p className="font-sans text-[12px] text-text-muted leading-[1.7]">{ex.text}</p>
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {ex.tags.map((t) => (
              <span key={t} className="font-mono text-[9px] text-gold border border-gold/15 rounded-full px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const RESEARCH_NOTE_EXAMPLES = [
  {
    category: 'EQUITY',
    title: 'BHP Group Limited',
    noteType: 'Equity Research Note',
    pages: '8 pages · PDF',
    sections: ['Executive Summary', 'Price Analysis', 'Fundamental Analysis', 'Risk Factors', 'Outlook'],
    tags: ['ASX', 'Materials', 'BUY'],
    date: 'Aug 2026',
  },
  {
    category: 'CRYPTO',
    title: 'Bitcoin (BTC/AUD)',
    noteType: 'Crypto Intelligence Note',
    pages: '6 pages · PDF',
    sections: ['Market Structure', 'On-Chain Analysis', 'Macro Context', 'Price Targets', 'Risk Assessment'],
    tags: ['Crypto', 'L1', 'NEUTRAL'],
    date: 'Aug 2026',
  },
  {
    category: 'MACRO',
    title: 'RBA Policy Outlook Q3 2026',
    noteType: 'Macro Research Note',
    pages: '5 pages · PDF',
    sections: ['Rate Decision Analysis', 'CPI Review', 'Labour Market', 'Forward Guidance', 'Implications'],
    tags: ['RBA', 'Macro', 'HOLD'],
    date: 'Aug 2026',
  },
]

function ResearchNoteCard({ note }) {
  return (
    <div className="bg-bg-surface border border-gold/15 rounded-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gold/15">
        <div className="font-mono text-[9px] tracking-[0.15em] text-gold">{note.noteType.toUpperCase()}</div>
        <div className="font-sans text-[16px] font-bold tracking-[-0.02em] text-text-primary mt-2 leading-snug">{note.title}</div>
        <div className="font-mono text-[10px] text-text-muted mt-2">{note.pages} &nbsp;|&nbsp; {note.date}</div>
      </div>
      <div className="px-5 py-4 flex-1">
        <div className="font-mono text-[9px] text-gold tracking-[0.1em] mb-2">CONTENTS</div>
        <div className="flex flex-col gap-1.5">
          {note.sections.map((s) => (
            <div key={s} className="font-sans text-[11px] text-text-muted flex gap-2">
              <span className="text-gold shrink-0">◆</span>{s}
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-3 border-t border-[rgba(201,168,76,0.15)] flex flex-wrap gap-1.5">
        {note.tags.map((t) => (
          <span key={t} className="font-mono text-[9px] text-gold border border-gold/15 rounded-full px-2 py-0.5">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

const DEMO_SENTIMENT = [
  ['Overall', 78],
  ['Momentum', 84],
  ['Volume', 71],
  ['Macro', 62],
  ['Risk', 76],
]

function DemoBar({ label, value }) {
  const color = value >= 75 ? '#2D8A50' : value >= 50 ? '#C9A84C' : '#A83232'
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[11px] text-text-muted w-20 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-[rgba(201,168,76,0.15)] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="font-mono text-[11px] w-14 text-right shrink-0" style={{ color }}>{value}/100</span>
    </div>
  )
}

function DemoSection({ label, children, last }) {
  return (
    <div className={`px-5 py-4 ${last ? '' : 'border-b border-[rgba(201,168,76,0.15)]'}`}>
      <div className="font-mono text-[10px] text-gold tracking-[0.15em] mb-2.5">{label}</div>
      {children}
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
  const { trackCTA } = useAnalytics()
  const { openCheckout } = useCheckout()
  useEffect(() => {
    document.title = 'MaddenAI — The Intelligence Engine'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[140px] pb-16 px-6 md:px-10 text-center">
        <SectionLabel center>MADDENAI ANALYST</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[30px] md:text-[46px] font-extrabold leading-tight tracking-[-0.03em] text-text-primary max-w-5xl mx-auto"
        >
          You used to need a Bloomberg terminal
          <br />
          and a research desk to get this.
        </motion.h1>
        <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          MaddenAI gives every retail investor access to structured, professional-grade analysis — on any stock, crypto, FX pair, or index — in seconds. General information only.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[900px] mx-auto mt-9 text-left"
        >
          <div className="bg-bg-surface border border-gold/15 rounded-t px-4 py-3 flex items-center gap-2">
            <span className="font-mono text-[13px] font-bold text-gold">CMD&gt;</span>
            <span className="font-mono text-[13px] text-text-primary">
              BHP.AX<span className="text-gold blink-cursor">▍</span>
            </span>
          </div>

          <div className="bg-bg-surface border-x border-b border-gold/15 rounded-b overflow-hidden">
            <div className="bg-bg-primary border-b border-gold/15 px-5 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="font-mono text-[11px] text-gold tracking-[0.05em]">MADDENAI · BHP GROUP (BHP.AX) · ASX</span>
              <span className="font-mono text-[11px] text-text-muted">
                A$43.21 <span className="text-gain">▲ +1.27%</span> · Vol: 8.24M · 22 Aug 2026
              </span>
            </div>

            <DemoSection label="ASSESSMENT">
              <p className="font-mono text-[12px] text-text-muted leading-[1.8]">
                Bullish bias supported by iron ore strength. Spot at US$98/t, up 2.3% on China stimulus.
              </p>
            </DemoSection>

            <DemoSection label="SENTIMENT">
              <div className="flex flex-col gap-2">
                {DEMO_SENTIMENT.map(([label, value]) => (
                  <DemoBar key={label} label={label} value={value} />
                ))}
              </div>
            </DemoSection>

            <DemoSection label="LEVELS">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[12px]">
                <div><span className="text-text-faint">Support: </span><span className="text-text-primary">A$41.80 · A$39.20</span></div>
                <div><span className="text-text-faint">Resistance: </span><span className="text-text-primary">A$44.50 · A$46.80</span></div>
              </div>
            </DemoSection>

            <DemoSection label="OUTLOOK">
              <div className="font-mono text-[12px] leading-[1.8]">
                <div className="text-gain font-bold">BULLISH near-term (1–5 days)</div>
                <div className="text-text-muted mt-0.5">Target range: A$44.50 – A$46.80</div>
                <div className="text-text-muted mt-0.5">Catalyst: China PMI data (Mon 25 Aug)</div>
              </div>
            </DemoSection>

            <DemoSection label="RISK" last>
              <p className="font-mono text-[12px] text-text-muted leading-[1.8]">
                Invalidated if iron ore drops below US$92/t or China stimulus disappoints expectations.
              </p>
            </DemoSection>

            <div className="px-5 py-3 bg-bg-primary border-t border-[rgba(201,168,76,0.15)] font-mono text-[10px] text-text-faint flex items-center gap-1.5">
              <span>⚠</span> General information only. Not financial advice.
            </div>
          </div>
        </motion.div>

        <p className="font-sans text-[15px] text-text-muted mt-8">
          This is what MaddenAI produces for every asset. Every time. In under 10 seconds.
        </p>
        <div className="mt-5">
          <GoldButton onClick={() => { trackCTA('start_trial', 'maddenai_page'); openCheckout('core') }}>START FREE TRIAL →</GoldButton>
        </div>
      </section>

      <FadeInSection className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[720px] mx-auto">
            <SectionLabel center>ASSET ANALYSIS</SectionLabel>
            <h2 className="font-sans text-[34px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary leading-tight">
              Type any ticker. Get a full structured read in seconds.
            </h2>
            <p className="font-sans text-[17px] text-text-muted mt-4 leading-[1.75]">
              Stock, crypto, FX pair, or index — every time, the same five-part structure.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mt-8"
            style={{
              gap: '1px',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            {[
              { num: '01', title: 'ASSESSMENT', desc: 'A one-line read on current conditions' },
              { num: '02', title: 'SENTIMENT', desc: 'Overall, Momentum, Volume, Macro, Risk scores' },
              { num: '03', title: 'LEVELS', desc: 'Support and resistance, calculated live' },
              { num: '04', title: 'OUTLOOK', desc: 'Near-term directional view with a range' },
              { num: '05', title: 'RISK', desc: 'The scenario that would invalidate it' },
            ].map(({ num, title, desc }) => (
              <div key={num} style={{ background: '#0B1628', padding: '24px 20px' }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: 'rgba(201,168,76,0.4)', marginBottom: '8px' }}>
                  {num}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  {title}
                </div>
                <div style={{ fontSize: '12px', color: '#8BA3C4', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10 items-stretch">
            {ASSET_EXAMPLES.map((ex) => (
              <AssetExampleCard key={ex.ticker} ex={ex} />
            ))}
          </div>
        </div>
      </FadeInSection>

      <section className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>HOW IT WORKS</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-tight">
            A two-layer intelligence system.
          </h2>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.2 }}
              whileHover={{ boxShadow: '0 0 20px rgba(201,168,76,0.1)' }}
              className="rounded p-6 min-h-[180px] transition-shadow"
              style={{ background: 'var(--bg)', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <span className="font-mono text-[9px] tracking-[0.25em] text-gold">QUANTITATIVE LAYER</span>
              <h3 className="font-sans text-[24px] font-bold tracking-[-0.02em] text-text-primary mt-3">Data Ingestion</h3>
              <p className="font-sans text-[14px] text-text-muted mt-3 leading-[1.7]">
                Market Sentiment Score · Crypto Momentum Index · Sector Strength Radar · Real-time data processing · Zero API cost
              </p>
            </motion.div>

            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-10">
              <svg width="80" height="28" viewBox="0 0 80 28" overflow="visible">
                <line x1="2" y1="14" x2="64" y2="14" stroke="#C9A84C" strokeWidth="2" />
                <polygon points="64,7 78,14 64,21" fill="#C9A84C" />
                <circle r="4" fill="#C9A84C" style={{ filter: 'drop-shadow(0 0 8px #C9A84C)' }}>
                  <animateMotion dur="1.4s" repeatCount="indefinite" path="M2,14 L64,14" />
                </circle>
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ boxShadow: '0 0 20px rgba(201,168,76,0.1)' }}
              className="rounded p-6 min-h-[180px] transition-shadow"
              style={{ background: 'var(--bg)', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <span className="font-mono text-[9px] tracking-[0.25em] text-gold">AI LAYER</span>
              <h3 className="font-sans text-[24px] font-bold tracking-[-0.02em] text-text-primary mt-3">Weighted Synthesis</h3>
              <p className="font-sans text-[14px] text-text-muted mt-3 leading-[1.7]">
                Anthropic Claude Sonnet 4.6 · Real-time data injection · Structured response format · Experience personalisation · Research Note generation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel center>SCORING MODELS</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary text-center max-w-3xl mx-auto leading-tight">
            <span className="block md:whitespace-nowrap">Three composite models.</span>
            <span className="block">Fully transparent.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.2 }}
              className="bg-bg-surface border border-gold/15 rounded p-6 flex flex-col"
            >
              <h3 className="font-sans text-[17px] font-bold tracking-[-0.02em] text-text-primary">Market Sentiment Score</h3>
              <p className="font-sans text-[12px] text-text-muted mt-2 leading-[1.7]">8-factor weighted composite. Updated every 60 seconds.</p>
              <div className="flex justify-center my-6"><ScoreDial value={72} label="/100" /></div>
              <div className="flex flex-col rounded overflow-hidden">
                <FactorTableHeader />
                {SENTIMENT_FACTORS.map(([label, weight]) => (
                  <FactorBar key={label} label={label} weight={weight} />
                ))}
              </div>
              <div className="flex justify-between font-mono text-[11px] font-bold text-gold mt-3 pt-3" style={{ borderTop: '2px solid rgba(201,168,76,0.3)' }}>
                <span>TOTAL</span>
                <span className="text-gold">100%</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <ExampleReading examples={[['ASX Breadth Today', 78], ['Volatility Today', 45], ['News Sentiment Today', 25]]} />
                <ClassificationBands />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-bg-surface border border-gold/15 rounded p-6 flex flex-col"
            >
              <h3 className="font-sans text-[17px] font-bold tracking-[-0.02em] text-text-primary">Crypto Momentum Index</h3>
              <p className="font-sans text-[12px] text-text-muted mt-2 leading-[1.7]">5-factor composite across price, volume, and positioning.</p>
              <div className="flex justify-center my-6"><ScoreDial value={68} label="/100" /></div>
              <div className="flex flex-col rounded overflow-hidden">
                <FactorTableHeader />
                {MOMENTUM_FACTORS.map(([label, weight]) => (
                  <FactorBar key={label} label={label} weight={weight} />
                ))}
              </div>
              <div className="flex justify-between font-mono text-[11px] font-bold text-gold mt-3 pt-3" style={{ borderTop: '2px solid rgba(201,168,76,0.3)' }}>
                <span>TOTAL</span>
                <span className="text-gold">100%</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <ExampleReading examples={[['24H Momentum Today', 85], ['Volume Conviction Today', 52]]} />
                <ClassificationBands />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-bg-surface border border-gold/15 rounded p-6 flex flex-col"
            >
              <h3 className="font-sans text-[17px] font-bold tracking-[-0.02em] text-text-primary">Sector Strength Radar</h3>
              <p className="font-sans text-[12px] text-text-muted mt-2 leading-[1.7]">All 11 GICS sectors scored simultaneously, every session.</p>
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
              <div className="flex flex-col rounded overflow-hidden mt-5 pt-5 border-t border-[rgba(201,168,76,0.15)]">
                <FactorTableHeader />
                {SECTOR_FACTORS.map(([label, weight]) => (
                  <FactorBar key={label} label={label} weight={weight} />
                ))}
              </div>
              <div className="flex justify-between font-mono text-[11px] font-bold text-gold mt-3 pt-3" style={{ borderTop: '2px solid rgba(201,168,76,0.3)' }}>
                <span>TOTAL</span>
                <span className="text-gold">100%</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <ExampleReading examples={[['Day Change Today', 72], ['Volume Conviction Today', 48]]} />
                <ClassificationBands />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-24 px-6 md:px-10 text-center">
        <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/15 rounded-full px-3 py-1 mb-5">
          PHASE 2 · COMING SOON
        </span>
        <SectionLabel center>RESEARCH NOTES</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-tight">
          Institutional-quality PDF research, generated on demand.
        </h2>
        <p className="font-sans text-[17px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
          Any ASX or US ticker. From A$9.99 a note — or 1 included every month on the Apex tier.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 max-w-[1000px] mx-auto text-left items-stretch">
          {RESEARCH_NOTE_EXAMPLES.map((note, i) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.2 }}
            >
              <ResearchNoteCard note={note} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <GoldButton to="/pricing#research-notes">SEE PLANNED PRICING →</GoldButton>
        </div>
      </section>

      <FadeInSection className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>PERSONALISATION</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-tight">
            MaddenAI speaks your language — whatever your experience level.
          </h2>
          <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-4 leading-[1.75]">
            The same underlying analysis, adapted in tone and depth to how you actually think about markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 text-left">
            {[
              ['BEGINNER', 'BHP is a mining company — when iron ore prices rise, BHP usually does well.'],
              ['INTERMEDIATE', 'BHP is trading above its 50-day moving average with positive momentum.'],
              ['ADVANCED', 'BHP showing bullish MACD crossover with volume confirmation above 52W mean.'],
              ['PROFESSIONAL', 'BHP: Constructive near-term. Fe ore basis risk contained. EBITDA sensitivity to spot pricing remains key variable.'],
            ].map(([level, quote]) => (
              <div key={level} className="bg-bg-primary border border-gold/15 rounded p-6 min-h-[220px] flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.15em] text-gold">{level}</span>
                <p className="font-sans text-[13px] text-text-muted mt-4 leading-[1.7] italic">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FinalCTA />
      <Footer />
    </>
  )
}
