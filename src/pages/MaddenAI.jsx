import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

// Computed at module load rather than hardcoded — a "TODAY'S READINGS" label
// with a fixed date reads as broken the moment the page is viewed on any
// other day, which is most days.
const TODAY_LABEL = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()

function ScorePositionBar({ score }) {
  return (
    <div className="relative w-full h-1 rounded-full mt-3" style={{ background: 'rgba(30,70,140,0.3)' }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: 'linear-gradient(to right, #A83232 0%, #A83232 33%, #C9A84C 33%, #C9A84C 66%, #2D8A50 66%, #2D8A50 100%)' }}
      />
      <motion.div
        className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-white -translate-y-1/2 -translate-x-1/2"
        style={{ boxShadow: '0 0 4px rgba(255,255,255,0.8)' }}
        initial={{ left: '0%' }}
        animate={{ left: `${score}%` }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </div>
  )
}

function LiveAESTClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      const formatted = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Sydney',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date())
      setTime(`${formatted} AEST`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] text-text-faint mt-3">
      <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
      {time}
    </div>
  )
}

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
      style={{ borderBottom: '1px solid rgba(30,70,140,0.2)' }}
    >
      <span className="font-mono text-[11px] text-text-muted w-40 shrink-0 text-left mr-auto">{label}</span>
      <div className="w-[80px] max-w-[80px] h-[6px] rounded-full bg-[rgba(30,70,140,0.3)] overflow-hidden shrink-0">
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
          <stop offset="0%" stopColor="#1A7FE8" />
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
      <div className="bg-bg-surface border-b border-gold/12 px-4 py-2 font-mono text-[9px] text-gold tracking-[0.15em]">
        {ex.category}
      </div>
      <div className="p-4 flex gap-3 items-start flex-1">
        <div className="shrink-0 mt-0.5">{ex.icon}</div>
        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <span className="font-sans text-[15px] font-bold text-text-primary">{ex.name}</span>
            <span className="font-mono text-[10px] text-text-muted">{ex.ticker}</span>
          </div>
          <div className="font-mono text-[12px]">
            <span className="text-text-primary font-bold">{ex.price}</span>
            <span className={`ml-2 ${ex.up ? 'text-gain' : 'text-loss'}`}>{ex.up ? '▲' : '▼'} {ex.change}</span>
          </div>
          <p className="font-sans text-[12px] text-text-muted leading-[1.7]">{ex.text}</p>
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {ex.tags.map((t) => (
              <span key={t} className="font-mono text-[9px] text-gold border border-gold/25 rounded-full px-2 py-0.5">
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
    <div className="bg-bg-surface border border-gold/20 rounded-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gold/15">
        <div className="font-mono text-[9px] tracking-[0.15em] text-gold">{note.noteType.toUpperCase()}</div>
        <div className="font-sans text-[16px] font-bold text-text-primary mt-2 leading-snug">{note.title}</div>
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
      <div className="px-5 py-3 border-t border-[rgba(30,70,140,0.25)] flex flex-wrap gap-1.5">
        {note.tags.map((t) => (
          <span key={t} className="font-mono text-[9px] text-gold border border-gold/25 rounded-full px-2 py-0.5">
            {t}
          </span>
        ))}
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
  useEffect(() => {
    document.title = 'MaddenAI — The Intelligence Engine'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[84px] pb-14 px-6 md:px-10 text-center">
        <SectionLabel center>MADDENAI</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-4xl mx-auto"
        >
          Ask anything. Get a professional read back.
        </motion.h1>
        <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          Type any ticker or question and MaddenAI reads markets, sentiment, and macro data simultaneously — then hands you a structured answer, not a wall of numbers.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[1200px] mx-auto mt-9 bg-bg-surface border border-gold/25 rounded overflow-hidden text-left"
        >
          <div className="bg-bg-primary border-b border-gold/12 px-4 py-2.5 font-mono text-[10px] text-gold flex items-center gap-1.5 flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
            TODAY'S MADDENAI READINGS &nbsp;·&nbsp; {TODAY_LABEL} &nbsp;·&nbsp; 09:42 AEST
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(30,70,140,0.3)]">
            <div className="p-6 text-center min-h-[160px] flex flex-col justify-center">
              <div className="font-mono text-[9px] text-text-muted tracking-[0.1em]">MARKET SENTIMENT</div>
              <div className="font-mono text-[72px] font-bold text-gold mt-2 leading-none">
                <span className="score-pulse">72</span><span className="text-[20px] text-text-primary">/100</span>
              </div>
              <div className="font-mono text-[11px] text-text-primary mt-2">NEUTRAL-BULLISH</div>
              <ScorePositionBar score={72} />
              <LiveAESTClock />
            </div>
            <div className="p-6 text-center min-h-[160px] flex flex-col justify-center">
              <div className="font-mono text-[9px] text-text-muted tracking-[0.1em]">CRYPTO MOMENTUM</div>
              <div className="font-mono text-[72px] font-bold text-gold mt-2 leading-none">
                <span className="score-pulse">68</span><span className="text-[20px] text-text-primary">/100</span>
              </div>
              <div className="font-mono text-[11px] text-gain mt-2">BULLISH</div>
              <ScorePositionBar score={68} />
              <LiveAESTClock />
            </div>
            <div className="p-6 text-center min-h-[160px] flex flex-col justify-center">
              <div className="font-mono text-[9px] text-text-muted tracking-[0.1em]">BEST PERFORMING SECTOR</div>
              <div className="font-mono text-[22px] font-bold text-gold mt-2">INFORMATION TECHNOLOGY</div>
              <div className="font-mono text-[11px] text-gain mt-2">81/100 STRONG</div>
              <ScorePositionBar score={81} />
              <LiveAESTClock />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-bg-surface py-14 md:py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-left max-w-[720px]">
            <SectionLabel>ASSET ANALYSIS</SectionLabel>
            <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary leading-tight">
              Type any ticker. Get a full structured read in seconds.
            </h2>
            <p className="font-sans text-[17px] text-text-muted mt-4 leading-[1.75] max-w-[440px]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10 items-stretch">
            {ASSET_EXAMPLES.map((ex) => (
              <AssetExampleCard key={ex.ticker} ex={ex} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-surface py-14 md:py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>HOW IT WORKS</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
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
              style={{ background: 'var(--bg-primary)', border: '1px solid rgba(201,168,76,0.25)' }}
            >
              <span className="font-mono text-[9px] tracking-[0.25em] text-gold">QUANTITATIVE LAYER</span>
              <h3 className="font-sans text-[24px] font-bold text-text-primary mt-3">Data Ingestion</h3>
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
              style={{ background: 'var(--bg-primary)', border: '1px solid rgba(201,168,76,0.25)' }}
            >
              <span className="font-mono text-[9px] tracking-[0.25em] text-gold">AI LAYER</span>
              <h3 className="font-sans text-[24px] font-bold text-text-primary mt-3">Weighted Synthesis</h3>
              <p className="font-sans text-[14px] text-text-muted mt-3 leading-[1.7]">
                Anthropic Claude Sonnet 4.6 · Real-time data injection · Structured response format · Experience personalisation · Research Note generation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-14 md:py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel center>SCORING MODELS</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary text-center max-w-3xl mx-auto leading-tight">
            <span className="block md:whitespace-nowrap">Three composite models.</span>
            <span className="block">Fully transparent.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.2 }}
              className="bg-bg-surface border border-gold/20 rounded p-6 flex flex-col"
            >
              <h3 className="font-sans text-[17px] font-bold text-text-primary">Market Sentiment Score</h3>
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
              className="bg-bg-surface border border-gold/20 rounded p-6 flex flex-col"
            >
              <h3 className="font-sans text-[17px] font-bold text-text-primary">Crypto Momentum Index</h3>
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
              className="bg-bg-surface border border-gold/20 rounded p-6 flex flex-col"
            >
              <h3 className="font-sans text-[17px] font-bold text-text-primary">Sector Strength Radar</h3>
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
              <div className="flex flex-col rounded overflow-hidden mt-5 pt-5 border-t border-[rgba(30,70,140,0.3)]">
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

      <section className="bg-bg-primary py-14 md:py-16 px-6 md:px-10 text-center">
        <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-5">
          PHASE 2 · COMING SOON
        </span>
        <SectionLabel center>RESEARCH NOTES</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
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

      <section className="bg-bg-surface py-14 md:py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>PERSONALISATION</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
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
              <div key={level} className="bg-bg-primary border border-gold/20 rounded p-6 min-h-[220px] flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.15em] text-gold">{level}</span>
                <p className="font-sans text-[13px] text-text-muted mt-4 leading-[1.7] italic">"{quote}"</p>
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
