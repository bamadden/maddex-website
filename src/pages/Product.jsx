import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import TerminalCard from '../components/shared/TerminalCard'

function MiniHeader({ label, right, accent }) {
  return (
    <div className="bg-bg-surface border-b border-gold/12 px-3 py-2 flex justify-between items-center font-mono text-[9px] shrink-0">
      <span className="text-text-muted tracking-[0.05em]">{label}</span>
      {right && <span className={accent === 'gain' ? 'text-gain' : 'text-gold'}>{right}</span>}
    </div>
  )
}

function MiniShell({ children, maxHeight = 240 }) {
  return (
    <div
      className="bg-bg-primary border border-gold/20 rounded overflow-hidden flex flex-col w-full"
      style={{ maxHeight }}
    >
      {children}
    </div>
  )
}

function MarketsMiniVisual() {
  const indices = [
    ['ASX 200', '8,412.40', '+0.42%', true],
    ['S&P 500', '5,847.23', '+0.40%', true],
    ['BTC/AUD', 'A$162,400', '+1.80%', true],
  ]
  const sectors = [
    ['IT', true], ['FIN', true], ['MAT', true], ['ENRG', false],
    ['HLTH', true], ['CDI', false], ['UTL', false], ['REI', true],
  ]
  return (
    <MiniShell>
      <MiniHeader label="MARKETS · ASX 200" right="72/100" />
      <div className="grid grid-cols-3 gap-1.5 p-3">
        {indices.map(([n, v, c, pos]) => (
          <div key={n} className="bg-bg-surface rounded-sm px-2 py-1.5 text-center">
            <div className="font-mono text-[7px] text-text-muted truncate">{n}</div>
            <div className="font-mono text-[10px] text-text-primary font-bold mt-0.5">{v}</div>
            <div className={`font-mono text-[8px] ${pos ? 'text-gain' : 'text-loss'}`}>{c}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1 px-3 pb-3">
        {sectors.map(([l, pos]) => (
          <div
            key={l}
            className="rounded-sm text-center py-1.5 font-mono text-[8px] font-bold"
            style={{
              background: pos ? 'rgba(45,138,80,0.14)' : 'rgba(168,50,50,0.14)',
              color: pos ? '#2D8A50' : '#A83232',
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </MiniShell>
  )
}

function FearGreedGauge({ value }) {
  const r = 16
  const cx = 18
  const cy = 18
  const angle = (value / 100) * 180
  const rad = (Math.PI / 180) * (180 - angle)
  const x = cx + r * Math.cos(rad)
  const y = cy - r * Math.sin(rad)
  const large = angle > 180 ? 1 : 0
  return (
    <svg width="36" height="20" viewBox="0 0 36 20">
      <path d="M2,18 A16,16 0 0 1 34,18" fill="none" stroke="rgba(30,70,140,0.3)" strokeWidth="3.5" strokeLinecap="round" />
      <path d={`M2,18 A16,16 0 ${large} 1 ${x},${y}`} fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

function CryptoMiniVisual() {
  const coins = [
    ['₿', 'BTC', 'A$162,400', '+1.80%', true],
    ['Ξ', 'ETH', 'A$6,124', '+2.10%', true],
    ['✕', 'XRP', 'A$2.31', '+0.90%', true],
  ]
  return (
    <MiniShell>
      <MiniHeader label="CRYPTO · TOP 20" right="68 BULLISH" accent="gain" />
      <div className="flex flex-col gap-1.5 p-3">
        {coins.map(([logo, sym, price, chg, pos]) => (
          <div key={sym} className="flex items-center gap-2 bg-bg-surface rounded-sm px-2 py-1.5">
            <span className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center font-mono text-[10px] font-bold shrink-0">{logo}</span>
            <span className="font-mono text-[10px] text-text-primary flex-1">{sym}</span>
            <span className="font-mono text-[10px] text-text-primary">{price}</span>
            <span className={`font-mono text-[9px] w-11 text-right shrink-0 ${pos ? 'text-gain' : 'text-loss'}`}>{chg}</span>
          </div>
        ))}
      </div>
      <div className="px-3 pb-3 flex items-center gap-3">
        <FearGreedGauge value={42} />
        <div>
          <div className="font-mono text-[7px] text-text-muted tracking-[0.08em]">FEAR &amp; GREED</div>
          <div className="font-mono text-[13px] text-text-primary font-bold leading-none mt-0.5">42</div>
        </div>
      </div>
    </MiniShell>
  )
}

function RbaStepChart() {
  const w = 200
  const h = 56
  const pts = [
    { year: '2022', rate: 3.10 },
    { year: '2023', rate: 4.35 },
    { year: '2025', rate: 3.60 },
    { year: '2026', rate: 4.35 },
  ]
  const xs = pts.map((_, i) => 8 + i * ((w - 16) / (pts.length - 1)))
  const min = 2.8
  const max = 4.6
  const y = (r) => h - 14 - ((r - min) / (max - min)) * (h - 24)
  let path = `M${xs[0]},${y(pts[0].rate)}`
  for (let i = 1; i < pts.length; i++) {
    path += ` L${xs[i]},${y(pts[i - 1].rate)} L${xs[i]},${y(pts[i].rate)}`
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={path} fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={p.year}>
          <circle cx={xs[i]} cy={y(p.rate)} r="2.5" fill="#C9A84C" />
          <text x={xs[i]} y={h - 2} fill="#4A6080" fontSize="7" fontFamily="IBM Plex Mono, monospace" textAnchor="middle">{p.year}</text>
        </g>
      ))}
    </svg>
  )
}

function RatesMiniVisual() {
  return (
    <MiniShell>
      <MiniHeader label="RATES · RBA CASH RATE" />
      <div className="flex-1 flex items-center justify-center py-3">
        <RbaStepChart />
      </div>
      <div className="px-3 pb-3">
        <div className="bg-bg-surface rounded-sm text-center py-2">
          <div className="font-mono text-[18px] font-bold text-gold leading-none">4.35%</div>
          <div className="font-mono text-[7px] text-text-muted mt-1 tracking-[0.08em]">CURRENT RATE</div>
        </div>
      </div>
      <div className="font-mono text-[8px] text-gold px-3 py-2 truncate" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
        NEXT DECISION {rbaDateLabel} · {rbaDaysRemaining}D
      </div>
    </MiniShell>
  )
}

function MacroMiniVisual() {
  return (
    <MiniShell>
      <MiniHeader label="MACRO · RBA DASHBOARD" />
      <div className="text-center py-4">
        <div className="font-mono text-[26px] font-bold text-gold leading-none">4.35%</div>
        <div className="font-mono text-[8px] text-text-muted mt-1.5 tracking-[0.05em]">CASH RATE — HELD</div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-3 pb-3">
        {[['CPI', '3.6%'], ['UE', '4.1%'], ['GDP', '1.5%']].map(([l, v]) => (
          <div key={l} className="bg-bg-surface rounded-sm py-2 text-center">
            <div className="font-mono text-[7px] text-text-muted">{l}</div>
            <div className="font-mono text-[11px] text-text-primary font-bold mt-0.5">{v}</div>
          </div>
        ))}
      </div>
      <div className="font-mono text-[8px] text-gold px-3 py-2" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
        CHINA PMI 50.4 ▲ · IRON ORE 102Mt
      </div>
    </MiniShell>
  )
}

function NewsMiniVisual() {
  const rows = [
    ['ASX', 'BHP rises on iron ore data', '2m ago', '#2D8A50'],
    ['MACRO', 'RBA holds at 4.35%', '1h ago', '#C9A84C'],
    ['CRYPTO', 'XRP up 0.9% — CLARITY Act', '3h ago', '#2D8A50'],
  ]
  return (
    <MiniShell>
      <MiniHeader label="NEWS · LIVE FEED" />
      <div className="flex flex-col gap-2.5 p-3">
        {rows.map(([tag, text, time, color]) => (
          <div key={text} className="flex items-start gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[7px] text-gold mr-1">[{tag}]</span>
              <span className="font-sans text-[10px] text-text-primary">{text}</span>
              <div className="font-mono text-[7px] text-text-faint mt-0.5">{time}</div>
            </div>
          </div>
        ))}
      </div>
    </MiniShell>
  )
}

function WatchlistMiniVisual() {
  return (
    <MiniShell>
      <MiniHeader label="MADDENAI · YOUR WATCHLIST" />
      <div className="p-3 flex flex-col gap-2">
        <div className="self-end bg-gold/10 border border-gold/25 rounded px-2.5 py-1.5 font-mono text-[9px] text-text-primary max-w-[80%]">
          BHP analysis?
        </div>
        <div className="font-mono text-[9px] text-text-muted leading-[1.6]">
          <span className="text-gold">AI · </span>BHP +1.27% on iron ore strength. Volume 1.4x average, holding above the 50-day MA.
        </div>
        <div className="flex gap-1.5 mt-1">
          {[['BIAS', 'BULLISH'], ['CONF', '78%']].map(([k, v]) => (
            <span key={k} className="font-mono text-[7px] text-gold border border-gold/30 rounded-full px-2 py-0.5">{k}: {v}</span>
          ))}
        </div>
      </div>
    </MiniShell>
  )
}

// Equirectangular projection: x = (lon+180)/360 * 800, y = (90-lat)/180 * 400
const GLOBAL_CONTINENTS = [
  'M60,50 L110,35 L180,40 L230,55 L262,72 L270,100 L250,132 L210,152 L160,155 L120,140 L88,110 L68,80 Z',
  'M235,180 L270,175 L292,202 L296,242 L282,292 L260,317 L246,300 L235,258 L230,218 Z',
  'M375,55 L410,40 L448,48 L458,70 L448,98 L412,106 L384,92 L376,70 Z',
  'M398,135 L442,130 L468,148 L476,188 L466,230 L448,266 L420,278 L402,252 L392,205 L390,168 Z',
  'M498,50 L570,32 L655,38 L725,58 L745,98 L725,140 L685,160 L622,170 L562,164 L505,138 L490,95 Z',
  'M660,240 L710,229 L742,246 L746,272 L720,292 L680,286 L654,265 Z',
]
const GLOBAL_CITIES = [
  { name: 'SYDNEY', lat: -33.87, lon: 151.21 },
  { name: 'TOKYO', lat: 35.68, lon: 139.69 },
  { name: 'SINGAPORE', lat: 1.35, lon: 103.82 },
  { name: 'LONDON', lat: 51.51, lon: -0.13 },
  { name: 'NEW YORK', lat: 40.71, lon: -74.01 },
  { name: 'FRANKFURT', lat: 50.11, lon: 8.68 },
  { name: 'DUBAI', lat: 25.20, lon: 55.27 },
  { name: 'HONG KONG', lat: 22.32, lon: 114.17 },
].map((c) => ({ ...c, x: ((c.lon + 180) / 360) * 800, y: ((90 - c.lat) / 180) * 400 }))
const GLOBAL_ROUTES = [
  ['NEW YORK', 'LONDON'], ['LONDON', 'FRANKFURT'], ['FRANKFURT', 'DUBAI'],
  ['DUBAI', 'HONG KONG'], ['HONG KONG', 'SINGAPORE'], ['HONG KONG', 'TOKYO'],
  ['HONG KONG', 'SYDNEY'], ['SINGAPORE', 'SYDNEY'],
]
const globalCityByName = (name) => GLOBAL_CITIES.find((c) => c.name === name)

function GlobalMap() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-full">
      {GLOBAL_CONTINENTS.map((d, i) => (
        <path key={i} d={d} fill="rgba(30,70,140,0.28)" stroke="rgba(30,70,140,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
      ))}
      {GLOBAL_ROUTES.map(([a, b], i) => {
        const ca = globalCityByName(a)
        const cb = globalCityByName(b)
        return <line key={i} x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y} stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
      })}
      {GLOBAL_CITIES.map((c, i) => (
        <g key={c.name}>
          <circle cx={c.x} cy={c.y} r="4" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="global-dot-ripple" style={{ animationDelay: `${i * 0.25}s` }} />
          <circle cx={c.x} cy={c.y} r="3" fill="#C9A84C" />
        </g>
      ))}
    </svg>
  )
}

function GlobalMiniVisual() {
  return (
    <MiniShell>
      <MiniHeader label="GLOBAL INTELLIGENCE" right="18/50 OPEN" />
      <div className="flex-1 flex items-center justify-center p-2" style={{ minHeight: 110 }}>
        <GlobalMap />
      </div>
      <div className="grid grid-cols-3 divide-x divide-[rgba(30,70,140,0.25)] border-t border-[rgba(30,70,140,0.25)]">
        {[['70+', 'MARKETS'], ['24/7', 'COVERAGE'], ['LIVE', 'INTEL']].map(([v, l]) => (
          <div key={l} className="text-center py-2">
            <div className="font-mono text-[11px] font-bold text-gold">{v}</div>
            <div className="font-mono text-[7px] text-text-muted mt-0.5">{l}</div>
          </div>
        ))}
      </div>
    </MiniShell>
  )
}

function KeyStats({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {stats.map((s) => (
        <div
          key={s}
          className="text-center font-mono text-[10px] font-semibold text-gold rounded transition-colors"
          style={{
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.25)',
            padding: '8px 16px',
            borderRadius: 4,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)' }}
        >
          {s}
        </div>
      ))}
    </div>
  )
}

// RBA meets on published dates — computed from today rather than a fixed
// date + "days remaining" that both go wrong the moment the meeting passes.
const RBA_MEETINGS_2026 = ['2026-09-16', '2026-11-04', '2026-12-09']
const nextRbaMeeting = RBA_MEETINGS_2026
  .map((d) => new Date(`${d}T00:00:00`))
  .find((d) => d.getTime() > Date.now())
const rbaDaysRemaining = nextRbaMeeting ? Math.ceil((nextRbaMeeting - Date.now()) / 86400000) : null
const rbaDateLabel = nextRbaMeeting
  ? nextRbaMeeting.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
  : ''

const MODULES = [
  {
    key: 'markets',
    stats: ['9 INDICES', '200+ STOCKS', '11 SECTORS', '60s REFRESH'],
    title: 'Markets Module',
    icon: '🏛',
    body: 'ASX 200 as the primary index, alongside 9 global indices and full 11-sector GICS breakdown — refreshed continuously and scored by MaddenAI sentiment for context, not just numbers.',
    features: ['9 global indices tracked live', 'Full ASX 200 constituent list', '11 GICS sector heatmap', 'MaddenAI sentiment overlay'],
    visual: <MarketsMiniVisual />,
  },
  {
    key: 'crypto',
    stats: ['TOP 20 AUD', '5-FACTOR SCORE', 'LIVE COINGECKO', '30s REFRESH'],
    title: 'Crypto Module',
    icon: '₿',
    body: 'Top 20 assets by market cap in AUD, sourced live from CoinGecko, with the MaddenAI Crypto Momentum Index and Fear & Greed tracking — built for investors who treat crypto as a real allocation.',
    features: ['Top 20 by AUD market cap', 'MaddenAI Momentum Index', 'Fear & Greed reading', 'BTC dominance tracking'],
    visual: <CryptoMiniVisual />,
  },
  {
    key: 'rates',
    stats: ['10 AUD PAIRS', '8 BOND TENORS', '10+ CENTRAL BANKS', '5min REFRESH'],
    title: 'Rates Module',
    icon: '📊',
    body: 'FX pairs sourced via the Frankfurter API, government bond yield curves, and central bank rates with the RBA as the primary reference rate — the macro plumbing most retail platforms skip entirely.',
    features: ['10 AUD currency pairs', 'AU Government Bond yield curve', '10+ central bank policy rates', 'Rate decision countdowns'],
    visual: <RatesMiniVisual />,
  },
  {
    key: 'macro',
    stats: ['8 AU INDICATORS', 'RBA PRIMARY', 'CHINA WATCH', '30-DAY CALENDAR'],
    title: 'Macro Module',
    icon: '🌏',
    body: 'A live RBA dashboard with cash rate, next meeting countdown, the eight Australian macro indicators that actually move markets, and a dedicated China Watch panel for commodity-linked demand signals.',
    features: ['RBA cash rate + next meeting countdown', '8 Australian macro indicators', 'China Watch commodity linkage', '30-day economic calendar'],
    visual: <MacroMiniVisual />,
  },
  {
    key: 'news',
    stats: ['28+ SOURCES', '9 CATEGORIES', '3min REFRESH', 'AI SENTIMENT'],
    title: 'News Module',
    icon: '📰',
    body: '28+ sources filtered for financial relevance across 9 categories, refreshed every 3 minutes, with MaddenAI surfacing the themes that matter before they hit the front page.',
    features: ['28+ curated sources', 'Financial relevance filter', '9 news categories', 'MaddenAI Key Themes daily'],
    visual: <NewsMiniVisual />,
  },
  {
    key: 'watchlist',
    stats: ['UP TO 100 STOCKS', 'LIVE PRICES', 'SUPABASE SYNC', 'CSV EXPORT'],
    title: 'Watchlist',
    icon: '📋',
    body: 'Add any ASX or US stock, priced live via Yahoo Finance and Twelve Data, with full fundamental data synced through Supabase across every device you use.',
    features: ['ASX + US ticker support', 'Live price tracking', 'Full fundamental data', 'Synced across all devices'],
    visual: <WatchlistMiniVisual />,
  },
  {
    key: 'global',
    stats: ['50+ EXCHANGES', '200+ COUNTRIES', '5 LAYERS', 'LIVE CHOKEPOINTS'],
    title: 'Global Intelligence',
    icon: '🌐',
    body: 'A live 3D globe across 5 data layers covering 50+ exchanges, shipping chokepoints, and a 200+ country database — see geopolitical risk before it shows up in your portfolio.',
    features: ['Live 3D global exchange map', '50+ exchanges tracked', 'Shipping chokepoint monitoring', '200+ country risk database'],
    visual: <GlobalMiniVisual />,
  },
]

export default function Product() {
  useEffect(() => {
    document.title = 'Maddex — The Terminal'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[84px] pb-14 px-6 md:px-10 text-center">
        <SectionLabel center>THE TERMINAL</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-4xl mx-auto"
        >
          Seven modules. Zero compromises.
        </motion.h1>
        <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          Every screen in Maddex is built around one idea: give Australian investors the depth of a professional terminal without the professional price tag.
        </p>
      </section>

      <div className="bg-bg-surface">
        {MODULES.map((mod, i) => (
          <section key={mod.key} className="relative py-12 md:py-14 px-6 md:px-10 border-b border-[rgba(30,70,140,0.2)] last:border-b-0">
            <span
              className="absolute top-6 right-6 font-mono select-none pointer-events-none"
              style={{ fontSize: 9, color: '#3D5070' }}
            >
              MODULE {String(i + 1).padStart(2, '0')}
            </span>
            <div
              className={`max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-center"
              >
                <span className="font-mono text-[9px] tracking-[0.25em] text-gold">MODULE {String(i + 1).padStart(2, '0')}</span>
                <h2 className="font-sans text-[30px] md:text-[48px] font-bold text-text-primary mt-3 leading-tight">
                  <span className="mr-2">{mod.icon}</span>{mod.title}
                </h2>
                <p className="font-sans text-[17px] text-text-muted mt-4 leading-[1.75] max-w-[440px]">{mod.body}</p>
                <div className="flex flex-col gap-2.5 mt-6">
                  {mod.features.map((f) => (
                    <div key={f} className="font-sans text-[13px] text-text-muted flex gap-2">
                      <span className="text-gold">◆</span>
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center justify-center"
              >
                {mod.visual}
              </motion.div>
            </div>

            <div className="max-w-[1200px] mx-auto mt-6 pt-4 border-t border-[rgba(30,70,140,0.2)]">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold mb-3">KEY STATS</div>
              <KeyStats stats={mod.stats} />
              <div className="flex justify-center sm:justify-end mt-4">
                <Link to="/pricing" className="font-mono text-[11px] text-gold hover:opacity-70 transition-opacity whitespace-nowrap">
                  TRY THIS MODULE FREE →
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-bg-primary py-14 md:py-16 px-6 md:px-10 text-center">
        <SectionLabel center>COMMAND BAR</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary max-w-3xl mx-auto leading-tight">
          <span className="block md:whitespace-nowrap">Keyboard-driven command interface.</span>
          <span className="block">Built for speed.</span>
        </h2>
        <p className="font-sans text-[17px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
          Type a ticker, a module name, or a plain-English question. The command bar routes it instantly.
        </p>
        <div className="max-w-[600px] mx-auto mt-10">
          <TerminalCard>
            <div className="px-4 py-3 flex items-center gap-2">
              <span className="font-mono text-[13px] font-bold text-gold">CMD&gt;</span>
              <span className="font-mono text-[13px] text-text-primary">
                BHP.AX
                <span className="text-gold">▍</span>
              </span>
            </div>
          </TerminalCard>
        </div>
      </section>

      <section className="bg-bg-surface py-14 md:py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-4">
              iOS &amp; ANDROID · COMING 2027
            </span>
            <SectionLabel>COMPANION APP</SectionLabel>
            <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary leading-tight">
              Maddex Companion App
            </h2>
            <p className="font-mono text-[12px] text-gold mt-2 tracking-wide">
              Coming soon — stay informed on the go
            </p>
            <p className="font-sans text-[17px] text-text-muted mt-4 leading-[1.75] max-w-[440px]">
              The Maddex companion app keeps you connected to your portfolio and the markets when you're away from the terminal. Receive price alerts, breaking news, and daily market briefs directly to your phone. For deep analysis and research, return to the terminal — that's where the real work happens.
            </p>
            <div className="flex flex-col gap-2 mt-6">
              {[
                'Price alerts for your watchlist',
                'Push notifications for breaking news',
                'Daily market brief at 7am AEST',
                'Portfolio P&L at a glance',
                'MaddenAI daily summary',
                'Seamless sync with your terminal',
              ].map((f) => (
                <div key={f} className="font-sans text-[13px] text-text-muted flex gap-2">
                  <span className="text-gain">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div style={{
              width: 220,
              height: 440,
              borderRadius: 28,
              border: '2px solid rgba(201,168,76,0.3)',
              background: '#060D1A',
              padding: 8,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
              {/* Notch */}
              <div style={{
                position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                width: 64, height: 16, borderRadius: 8, background: '#000', zIndex: 2,
              }} />
              <div
                className="w-full h-full bg-bg-surface rounded-[20px] border border-gold/15 overflow-hidden flex flex-col"
                style={{ paddingTop: 22 }}
              >
                <div className="bg-bg-primary border-b border-gold/12 px-3 py-2 font-mono text-[9px] text-gold flex items-center justify-between">
                  <span>MADDEX</span>
                  <span className="text-text-faint">9:42 AM</span>
                </div>
                <div className="p-2.5 flex flex-col gap-2 flex-1">
                  {[
                    ['PRICE ALERT', 'BHP.AX up 2.1% — above your A$44 alert'],
                    ['BREAKING NEWS', 'RBA holds cash rate at 4.35%'],
                    ['DAILY BRIEF', "Today's 3-minute market brief is ready"],
                    ['MADDENAI SUMMARY', 'Sentiment 72/100 — neutral-bullish'],
                  ].map(([tag, msg]) => (
                    <div key={tag} className="bg-bg-primary border border-gold/15 rounded-sm px-2.5 py-2">
                      <div className="font-mono text-[7px] text-gold tracking-wide">{tag}</div>
                      <div className="font-sans text-[9px] text-text-primary mt-1 leading-snug">{msg}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gold/12 px-3 py-2 font-mono text-[8px] text-text-faint text-center">
                  Full analysis in the Maddex Terminal
                </div>
              </div>
              {/* Home indicator */}
              <div style={{
                position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
                width: 64, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.6)',
              }} />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </>
  )
}
