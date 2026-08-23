import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import SectionHeading from '../shared/SectionHeading'
import SectionSubheading from '../shared/SectionSubheading'

const TABS = ['MARKETS', 'MADDENAI', 'GLOBAL']

const TAB_CONTENT = {
  MARKETS: [
    'Real-time ASX 200 + All Ords',
    'S&P 500, NASDAQ, Dow, FTSE, Nikkei, DAX',
    'Sector heatmap with breadth analysis',
    'Top movers with market cap + P/E',
    'Dual currency (AUD + USD) display',
  ],
  MADDENAI: [
    'Ask anything about any stock or market',
    'Australian investor lens by default',
    'Professional analysis, not generic responses',
    'Click any asset → instant AI analysis',
    'General information only — not advice',
  ],
  GLOBAL: [
    'Interactive 3D globe with live data',
    'Shipping routes + trade disruptions',
    'Country intelligence panels',
    'Crypto adoption layers',
    'Exchange open/close status globally',
  ],
}

const HEATMAP = [
  { label: 'IT', change: '+1.8%', positive: true },
  { label: 'FIN', change: '+0.3%', positive: true },
  { label: 'HLTH', change: '+1.1%', positive: true },
  { label: 'ENRG', change: '-0.4%', positive: false },
]

function MarketsVisual() {
  return (
    <div className="bg-bg-surface border border-gold/20 rounded overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="bg-bg-primary border-b border-gold/12 px-4 py-2.5 font-mono text-[10px] text-text-muted flex justify-between shrink-0">
        <span>MARKETS · ASX 200</span>
        <span className="text-gain">● OPEN</span>
      </div>
      <div className="p-4 flex flex-col gap-2.5 flex-1 justify-center">
        {[
          ['ASX 200', '8,412.40', '+0.42%', true],
          ['S&P 500', '5,847.23', '+0.40%', true],
          ['NASDAQ', '18,921.56', '+0.50%', true],
        ].map(([sym, aud, chg, pos]) => (
          <div key={sym} className="flex justify-between font-mono text-[12px]">
            <span className="text-text-muted">{sym}</span>
            <span className="text-text-primary">{aud}</span>
            <span className={pos ? 'text-gain' : 'text-loss'}>{pos ? '▲' : '▼'} {chg}</span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-2 font-mono text-[9px] tracking-[0.1em] text-gold shrink-0">SECTOR HEATMAP</div>
      <div className="grid grid-cols-4 gap-1.5 px-4 pb-4 shrink-0">
        {HEATMAP.map((tile) => (
          <div
            key={tile.label}
            className="rounded-sm py-2 text-center font-mono text-[9px] font-bold"
            style={{
              background: tile.positive ? 'rgba(45,138,80,0.14)' : 'rgba(168,50,50,0.14)',
              border: `1px solid ${tile.positive ? 'rgba(45,138,80,0.3)' : 'rgba(168,50,50,0.3)'}`,
              color: tile.positive ? '#2D8A50' : '#A83232',
            }}
          >
            {tile.label}
          </div>
        ))}
      </div>
      <div className="border-t border-[rgba(30,70,140,0.25)] px-4 py-2.5 font-mono text-[9px] text-text-muted flex justify-between shrink-0">
        <span>BHP.AX <span className="text-text-primary">A$43.21</span></span>
        <span className="text-text-faint">P/E 11.2</span>
        <span>US$ <span className="text-text-primary">28.10</span></span>
      </div>
    </div>
  )
}

function MaddenAIVisual() {
  return (
    <div className="bg-bg-surface border border-gold/20 rounded overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="bg-bg-primary border-b border-gold/12 px-4 py-2.5 font-mono text-[10px] text-gold flex items-center gap-1.5 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
        MADDENAI CHAT
      </div>
      <div className="p-4 flex flex-col gap-4 flex-1 justify-center">
        <div className="font-mono text-[11px] text-text-muted">
          <span className="text-gold">USER</span> · Should I be worried about CBA's valuation?
        </div>
        <div className="font-mono text-[11px] text-text-primary leading-[1.7]">
          <span className="text-gold">MADDENAI</span> · CBA trades at a premium to peers, supported by
          deposit franchise strength — but rate repricing is the key risk to watch.
        </div>
        <div className="font-mono text-[11px] text-text-muted mt-2">
          <span className="text-gold">USER</span> · What's driving BHP today?
        </div>
        <div className="font-mono text-[11px] text-text-primary leading-[1.7] min-h-[40px]">
          <span className="text-gold">MADDENAI</span> ·{' '}
          Iron ore strength and steady Chinese demand data are lifting the miners this session.
        </div>
      </div>
    </div>
  )
}

// Equirectangular projection: x = (lon+180)/360 * 800, y = (90-lat)/180 * 400
const WORLD_CITIES = [
  { name: 'SYDNEY', lat: -33.87, lon: 151.21, dx: 0, dy: 18, anchor: 'middle' },
  { name: 'TOKYO', lat: 35.68, lon: 139.69, dx: 8, dy: -8, anchor: 'start' },
  { name: 'SINGAPORE', lat: 1.35, lon: 103.82, dx: 0, dy: 18, anchor: 'middle' },
  { name: 'LONDON', lat: 51.51, lon: -0.13, dx: -8, dy: -6, anchor: 'end' },
  { name: 'NEW YORK', lat: 40.71, lon: -74.01, dx: 0, dy: -10, anchor: 'middle' },
  { name: 'FRANKFURT', lat: 50.11, lon: 8.68, dx: 8, dy: 16, anchor: 'start' },
  { name: 'DUBAI', lat: 25.20, lon: 55.27, dx: 0, dy: -10, anchor: 'middle' },
  { name: 'HONG KONG', lat: 22.32, lon: 114.17, dx: 8, dy: -8, anchor: 'start' },
].map((c) => ({
  ...c,
  x: ((c.lon + 180) / 360) * 800,
  y: ((90 - c.lat) / 180) * 400,
}))

const cityByName = (name) => WORLD_CITIES.find((c) => c.name === name)

const WORLD_ROUTES = [
  ['NEW YORK', 'LONDON'],
  ['LONDON', 'FRANKFURT'],
  ['FRANKFURT', 'DUBAI'],
  ['DUBAI', 'HONG KONG'],
  ['HONG KONG', 'SINGAPORE'],
  ['HONG KONG', 'TOKYO'],
  ['HONG KONG', 'SYDNEY'],
  ['SINGAPORE', 'SYDNEY'],
]

const CONTINENTS = [
  // North America
  'M60,50 L110,35 L180,40 L230,55 L262,72 L270,100 L250,132 L210,152 L160,155 L120,140 L88,110 L68,80 Z',
  // South America
  'M235,180 L270,175 L292,202 L296,242 L282,292 L260,317 L246,300 L235,258 L230,218 Z',
  // Europe
  'M375,55 L410,40 L448,48 L458,70 L448,98 L412,106 L384,92 L376,70 Z',
  // Africa
  'M398,135 L442,130 L468,148 L476,188 L466,230 L448,266 L420,278 L402,252 L392,205 L390,168 Z',
  // Asia
  'M498,50 L570,32 L655,38 L725,58 L745,98 L725,140 L685,160 L622,170 L562,164 L505,138 L490,95 Z',
  // Australia
  'M660,240 L710,229 L742,246 L746,272 L720,292 L680,286 L654,265 Z',
]

const GLOBAL_STATS = [
  { value: '70+', label: 'Global Markets' },
  { value: '24/7', label: 'Coverage' },
  { value: 'Live', label: 'Real-time Intelligence' },
]

function GlobalVisual() {
  return (
    <div className="bg-bg-surface border border-gold/20 rounded overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="bg-bg-primary border-b border-gold/12 px-4 py-2.5 font-mono text-[10px] text-text-muted flex justify-between shrink-0">
        <span>GLOBAL INTELLIGENCE</span>
        <span className="text-gold">18/50 OPEN</span>
      </div>
      <div className="flex-1 flex items-center justify-center p-3">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {CONTINENTS.map((d, i) => (
            <path key={i} d={d} fill="rgba(30,70,140,0.28)" stroke="rgba(30,70,140,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
          ))}

          {WORLD_ROUTES.map(([a, b], i) => {
            const ca = cityByName(a)
            const cb = cityByName(b)
            return (
              <line
                key={i}
                x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y}
                stroke="rgba(201,168,76,0.25)"
                strokeWidth="1"
              />
            )
          })}

          {WORLD_CITIES.map((c, i) => (
            <g key={c.name}>
              <circle
                cx={c.x} cy={c.y} r="4" fill="none" stroke="#C9A84C" strokeWidth="1.5"
                className="global-dot-ripple"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <circle cx={c.x} cy={c.y} r="3" fill="#C9A84C" />
              <text
                x={c.x + c.dx} y={c.y + c.dy} fill="#8A9BB5" textAnchor={c.anchor}
                fontSize="15" fontFamily="IBM Plex Mono, monospace"
              >
                {c.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="border-t border-[rgba(30,70,140,0.25)] grid grid-cols-3 divide-x divide-[rgba(30,70,140,0.25)] shrink-0">
        {GLOBAL_STATS.map((s) => (
          <div key={s.label} className="px-3 py-3 text-center">
            <div className="font-mono text-[16px] font-bold text-gold">{s.value}</div>
            <div className="font-mono text-[8px] tracking-[0.08em] text-text-muted mt-1">{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const VISUALS = {
  MARKETS: MarketsVisual,
  MADDENAI: MaddenAIVisual,
  GLOBAL: GlobalVisual,
}

const CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Real-Time Markets',
    desc: 'Live prices across ASX and global exchanges.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="7" y="7" width="10" height="10" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" strokeLinecap="round" />
      </svg>
    ),
    name: 'MaddenAI Analyst',
    desc: 'Professional AI analysis with an Australian lens.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Global Intelligence',
    desc: '3D globe with trade routes and geopolitical risk.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 15.5c0-1.4 1.1-2 2.5-2s2.5-.7 2.5-2-1.1-2-2.5-2-2.5.6-2.5 2M12 7v1.5M12 15.5V17" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Crypto Coverage',
    desc: '20+ coins with Fear & Greed index.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 13a8 8 0 0 1 16 0" strokeLinecap="round" />
        <path d="M12 13l3.5-4M4 13h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Rates & Macro',
    desc: 'RBA tracker, yield curves, FX rates.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="8" width="18" height="12" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Portfolio & Watchlist',
    desc: 'Track your holdings with live P&L.',
  },
]

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('MARKETS')
  const ActiveVisual = VISUALS[activeTab]

  return (
    <section className="bg-bg-primary py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionLabel center>WHAT'S INSIDE</SectionLabel>
        <SectionHeading center>
          Built for investors
          <br />
          who take it seriously.
        </SectionHeading>
        <SectionSubheading center className="mt-4">
          Everything a serious investor needs. One terminal.
        </SectionSubheading>

        <div className="grid grid-cols-3 gap-2 max-w-[480px] mx-auto mt-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative font-mono text-[12px] tracking-[0.05em] px-6 py-2.5 rounded-full transition-colors duration-150 ${
                activeTab === tab
                  ? 'text-bg-primary font-bold'
                  : 'border border-[rgba(201,168,76,0.4)] text-gold bg-[rgba(201,168,76,0.1)] hover:bg-[rgba(201,168,76,0.18)] hover:border-[rgba(201,168,76,0.6)]'
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="features-tab-pill"
                  className="absolute inset-0 bg-gold rounded-full"
                  style={{ zIndex: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-9 text-left max-w-[1000px] mx-auto items-stretch">
          <AnimatePresence mode="wait">
            <motion.div
              key={`list-${activeTab}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col justify-center gap-4 min-h-[400px]"
            >
              {TAB_CONTENT[activeTab].map((f) => (
                <div key={f} className="flex gap-3 items-start">
                  <span className="text-gain text-[15px] shrink-0 mt-0.5">✓</span>
                  <span className="font-sans text-[15px] text-text-muted leading-snug">{f}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`visual-${activeTab}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="min-h-[400px]"
            >
              <ActiveVisual />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14 text-left">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-bg-surface border border-gold/15 hover:border-gold/40 rounded p-6 transition-colors duration-200"
            >
              <span className="text-gold">{card.icon}</span>
              <h3 className="font-sans text-[1.125rem] font-semibold text-white mt-4">{card.name}</h3>
              <p className="font-sans text-[0.875rem] text-[#8BA3C4] mt-2 leading-[1.6]">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
