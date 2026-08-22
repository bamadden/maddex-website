import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import TypewriterText from '../shared/TypewriterText'

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
    <div className="bg-bg-surface border border-gold/20 rounded overflow-hidden">
      <div className="bg-bg-primary border-b border-gold/12 px-4 py-2.5 font-mono text-[10px] text-text-muted flex justify-between">
        <span>MARKETS · ASX 200</span>
        <span className="text-gain">● OPEN</span>
      </div>
      <div className="p-4 flex flex-col gap-2.5">
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
      <div className="px-4 pb-2 font-mono text-[9px] tracking-[0.1em] text-gold">SECTOR HEATMAP</div>
      <div className="grid grid-cols-4 gap-1.5 px-4 pb-4">
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
      <div className="border-t border-[rgba(30,70,140,0.25)] px-4 py-2.5 font-mono text-[9px] text-text-muted flex justify-between">
        <span>BHP.AX <span className="text-text-primary">A$43.21</span></span>
        <span className="text-text-faint">P/E 11.2</span>
        <span>US$ <span className="text-text-primary">28.10</span></span>
      </div>
    </div>
  )
}

function MaddenAIVisual() {
  return (
    <div className="bg-bg-surface border border-gold/20 rounded overflow-hidden">
      <div className="bg-bg-primary border-b border-gold/12 px-4 py-2.5 font-mono text-[10px] text-gold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
        MADDENAI CHAT
      </div>
      <div className="p-4 flex flex-col gap-4 min-h-[220px]">
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
          <TypewriterText strings={['Iron ore strength and steady Chinese demand data are lifting the miners this session.']} />
          <span className="blink-cursor">▍</span>
        </div>
      </div>
    </div>
  )
}

function GlobalVisual() {
  const points = [
    [80, 58], [88, 24], [76, 30], [68, 52], [42, 16], [48, 36], [16, 32],
  ]
  return (
    <div className="bg-bg-surface border border-gold/20 rounded overflow-hidden">
      <div className="bg-bg-primary border-b border-gold/12 px-4 py-2.5 font-mono text-[10px] text-text-muted flex justify-between">
        <span>GLOBAL INTELLIGENCE</span>
        <span className="text-gold">18/50 OPEN</span>
      </div>
      <div className="p-4">
        <svg viewBox="0 0 100 80" className="w-full h-[260px]">
          <path d="M10,24 Q16,18 24,22 L30,30 Q24,36 16,34 Z" fill="rgba(30,70,140,0.35)" />
          <path d="M38,10 Q48,8 54,16 L50,30 Q40,28 38,18 Z" fill="rgba(30,70,140,0.35)" />
          <path d="M42,38 Q54,36 56,48 L48,62 Q40,54 42,38 Z" fill="rgba(30,70,140,0.35)" />
          <path d="M62,16 Q78,14 86,24 L80,38 Q68,32 62,16 Z" fill="rgba(30,70,140,0.35)" />
          <path d="M70,48 Q82,50 80,62 L70,58 Z" fill="rgba(30,70,140,0.35)" />
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.3" fill="#C9A84C">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <line x1="80" y1="58" x2="76" y2="30" stroke="#C9A84C" strokeWidth="0.25" strokeDasharray="1,1" />
          <line x1="80" y1="58" x2="16" y2="32" stroke="#C9A84C" strokeWidth="0.25" strokeDasharray="1,1" />
        </svg>
      </div>
      <div className="border-t border-[rgba(30,70,140,0.25)] px-4 py-2.5 font-mono text-[9px] text-text-muted flex justify-between">
        <span>SUEZ <span className="text-gold">⚠ MONITORED</span></span>
        <span>PANAMA <span className="text-gain">✓ OPEN</span></span>
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
    <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionLabel center>WHAT'S INSIDE</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto">
          Everything a serious investor needs. One terminal.
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mt-10">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12 text-left items-center max-w-[1000px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`list-${activeTab}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
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
            >
              <ActiveVisual />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 text-left">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-bg-surface border border-gold/15 hover:border-gold/40 rounded p-6 transition-colors duration-200"
            >
              <span className="text-gold">{card.icon}</span>
              <h3 className="font-sans text-[16px] font-bold text-text-primary mt-4">{card.name}</h3>
              <p className="font-sans text-[13px] text-text-muted mt-2 leading-[1.6]">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
