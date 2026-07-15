import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

const TABS = ['MARKETS', 'CRYPTO', 'RATES', 'MACRO', 'NEWS', 'WATCHLIST', 'GLOBAL']

const DESCRIPTIONS = {
  MARKETS: 'ASX 200 primary. 9 global indices. Full constituent lists. MaddenAI sector scoring.',
  CRYPTO: 'Top 20 by market cap in AUD. MaddenAI Momentum Index. Fear & Greed. Dominance tracking.',
  RATES: '10 AUD currency pairs. AU Government Bond yield curve. 10+ central bank rates.',
  MACRO: 'RBA Dashboard. 8 Australian macro indicators. China Watch. 30-day economic calendar.',
  NEWS: '28+ sources. Financial relevance filter. 9 categories. MaddenAI Today’s Key Themes.',
  WATCHLIST: 'Add any ASX or US stock. Live prices. Full fundamental data. Synced across all devices.',
  GLOBAL: 'Live 3D globe. 50+ exchanges. Shipping chokepoints. 200+ country database.',
}

function Row({ cols, className = '' }) {
  return <div className={`flex items-center py-2.5 font-mono text-[11px] ${className}`}>{cols}</div>
}

function MarketsPanel() {
  const indices = [
    { symbol: 'ASX 200', price: '8,412.40', change: '+0.42%', positive: true },
    { symbol: 'S&P 500', price: '5,847.23', change: '+0.40%', positive: true },
    { symbol: 'NASDAQ', price: '18,921.56', change: '+0.50%', positive: true },
    { symbol: 'FTSE 100', price: '8,204.10', change: '-0.10%', positive: false },
    { symbol: 'NIKKEI 225', price: '39,842.00', change: '+0.85%', positive: true },
  ]
  const sectors = [
    { label: 'IT', change: '+1.8%', positive: true },
    { label: 'FIN', change: '+0.3%', positive: true },
    { label: 'HLTH', change: '+1.1%', positive: true },
    { label: 'CDI', change: '-0.2%', positive: false },
    { label: 'COM', change: '+0.7%', positive: true },
    { label: 'IND', change: '+0.5%', positive: true },
    { label: 'STA', change: '-0.1%', positive: false },
    { label: 'ENRG', change: '-0.4%', positive: false },
    { label: 'MAT', change: '+0.9%', positive: true },
    { label: 'REI', change: '+0.3%', positive: true },
    { label: 'UTL', change: '-0.2%', positive: false },
  ]
  return (
    <div className="flex flex-col">
      <div className="bg-bg-surface border-b border-gold/12 px-4 py-2 flex flex-wrap justify-between gap-2 font-mono text-[10px]">
        <span className="text-text-muted">
          MARKETS &nbsp;·&nbsp; ASX 200 <span className="text-gain">&nbsp;●&nbsp; OPEN</span> &nbsp;09:42 AEST
        </span>
        <span className="text-gold">MaddenAI Sentiment 72/100 NEUTRAL-BULLISH</span>
      </div>
      <div className="px-4 py-2">
        {indices.map((row, i) => (
          <div key={row.symbol}>
            <Row
              className="hover:bg-gold/[0.04] transition-colors"
              cols={
                <>
                  <span className="flex-[2] text-text-muted">{row.symbol}</span>
                  <span className="flex-[1.5] text-right text-text-primary">{row.price}</span>
                  <span className={`flex-1 text-right ${row.positive ? 'text-gain' : 'text-loss'}`}>
                    {row.positive ? '▲' : '▼'} {row.change}
                  </span>
                  <span className="flex-[0.8] text-right text-gain">● OPEN</span>
                </>
              }
            />
            {i < indices.length - 1 && <div className="h-px bg-[rgba(30,70,140,0.3)]" />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 px-4 pb-4">
        {sectors.map((s) => (
          <div
            key={s.label}
            className="px-2 py-2 rounded-sm font-mono text-[9px]"
            style={{
              background: s.positive ? 'rgba(45,138,80,0.12)' : 'rgba(168,50,50,0.12)',
              border: `1px solid ${s.positive ? 'rgba(45,138,80,0.2)' : 'rgba(168,50,50,0.2)'}`,
              color: s.positive ? '#2D8A50' : '#A83232',
            }}
          >
            {s.label} {s.change}
          </div>
        ))}
      </div>
      <div className="mt-auto bg-gold/5 border-t border-gold/12 px-4 py-2 font-mono text-[10px] text-gold">
        MADDENAI MARKET SENTIMENT &nbsp;72/100&nbsp; NEUTRAL-BULLISH &nbsp;─────●────
      </div>
    </div>
  )
}

function CryptoPanel() {
  const coins = [
    { rank: 1, name: 'BTC', price: 'A$162,400', change: '+1.80%', sentiment: 'BULLISH' },
    { rank: 2, name: 'ETH', price: 'A$6,124', change: '+2.10%', sentiment: 'BULLISH' },
    { rank: 3, name: 'SOL', price: 'A$298.40', change: '-0.60%', sentiment: 'NEUTRAL' },
    { rank: 4, name: 'BNB', price: 'A$920.10', change: '+0.90%', sentiment: 'NEUTRAL' },
    { rank: 5, name: 'XRP', price: 'A$1.24', change: '-1.40%', sentiment: 'BEARISH' },
  ]
  const badgeColor = { BULLISH: '#2D8A50', NEUTRAL: '#C9A84C', BEARISH: '#A83232' }
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="p-4 border-r border-b border-[rgba(30,70,140,0.3)]">
          <div className="font-mono text-[9px] text-gold">MADDENAI</div>
          <div className="font-mono text-[32px] font-bold text-gold leading-none mt-1">68</div>
          <div className="font-sans text-[11px] text-text-primary">/100 BULLISH</div>
        </div>
        <div className="p-4 border-b border-[rgba(30,70,140,0.3)]">
          <div className="font-mono text-[9px] text-gold">FEAR &amp; GREED</div>
          <div className="font-mono text-[32px] font-bold text-[#C9A84C] leading-none mt-1">42</div>
          <div className="font-sans text-[11px] text-text-primary">FEAR</div>
        </div>
        <div className="p-4 border-r border-[rgba(30,70,140,0.3)]">
          <div className="font-mono text-[9px] text-gold">MARKET CAP</div>
          <div className="font-mono text-[22px] font-bold text-text-primary mt-1">A$2.4T</div>
          <div className="font-mono text-[11px] text-gain">▲ +1.2% 24h</div>
        </div>
        <div className="p-4">
          <div className="font-mono text-[9px] text-gold">BTC DOMINANCE</div>
          <div className="font-mono text-[22px] font-bold text-text-primary mt-1">58.2%</div>
          <div className="w-full h-1 bg-[rgba(30,70,140,0.3)] rounded-full mt-2">
            <div className="h-1 bg-gold rounded-full" style={{ width: '58.2%' }} />
          </div>
        </div>
      </div>
      <div className="px-4 py-2">
        {coins.map((c) => (
          <Row
            key={c.name}
            className="hover:bg-gold/[0.04] transition-colors justify-between"
            cols={
              <>
                <span className="w-8 text-text-faint">{c.rank}</span>
                <span className="flex-1 text-text-primary">{c.name}</span>
                <span className="flex-1 text-right text-text-primary">{c.price}</span>
                <span className={`flex-1 text-right ${c.change.startsWith('+') ? 'text-gain' : 'text-loss'}`}>{c.change}</span>
                <span
                  className="w-20 text-center ml-2 rounded-full px-2 py-0.5 text-[9px]"
                  style={{ background: `${badgeColor[c.sentiment]}22`, color: badgeColor[c.sentiment] }}
                >
                  {c.sentiment}
                </span>
              </>
            }
          />
        ))}
      </div>
    </div>
  )
}

function RatesPanel() {
  const fx = [
    { pair: 'AUD/USD', rate: '0.6452', change: '-0.12%', positive: false },
    { pair: 'AUD/EUR', rate: '0.5981', change: '+0.08%', positive: true },
    { pair: 'AUD/GBP', rate: '0.5102', change: '+0.04%', positive: true },
    { pair: 'AUD/JPY', rate: '96.42', change: '+0.22%', positive: true },
    { pair: 'AUD/CNY', rate: '4.681', change: '-0.05%', positive: false },
    { pair: 'AUD/NZD', rate: '1.0842', change: '+0.10%', positive: true },
  ]
  const banks = [
    { bank: 'RBA', rate: '4.35%', status: 'HOLD' },
    { bank: 'FED', rate: '4.75%', status: 'HOLD' },
    { bank: 'ECB', rate: '3.15%', status: 'CUT' },
    { bank: 'BOE', rate: '4.50%', status: 'HOLD' },
    { bank: 'BOJ', rate: '0.50%', status: 'HIKE' },
  ]
  const tenors = ['3M', '6M', '1Y', '2Y', '3Y', '5Y', '10Y']
  const yields = [20, 24, 26, 30, 34, 40, 48]
  const points = yields.map((y, i) => `${(i / (yields.length - 1)) * 260 + 10},${70 - y}`).join(' ')

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="p-4 border-r border-[rgba(30,70,140,0.3)]">
          {fx.map((row) => (
            <Row
              key={row.pair}
              className="justify-between hover:bg-gold/[0.04] transition-colors"
              cols={
                <>
                  <span className="text-text-muted">{row.pair}</span>
                  <span className="text-text-primary">{row.rate}</span>
                  <span className={row.positive ? 'text-gain' : 'text-loss'}>{row.change}</span>
                </>
              }
            />
          ))}
        </div>
        <div className="p-4">
          <div className="font-mono text-[9px] text-gold mb-2">AU GOVERNMENT BOND YIELD CURVE</div>
          <svg viewBox="0 0 280 90" className="w-full h-[110px]">
            <line x1="10" y1="80" x2="270" y2="80" stroke="rgba(30,70,140,0.4)" strokeWidth="1" />
            <line x1="10" y1="10" x2="10" y2="80" stroke="rgba(30,70,140,0.4)" strokeWidth="1" />
            <polyline points={points} fill="none" stroke="#C9A84C" strokeWidth="1.5" />
            {tenors.map((t, i) => (
              <text
                key={t}
                x={(i / (tenors.length - 1)) * 260 + 10}
                y={89}
                fontSize="7"
                fill="#637899"
                textAnchor="middle"
                fontFamily="IBM Plex Mono"
              >
                {t}
              </text>
            ))}
          </svg>
        </div>
      </div>
      <div className="border-t border-[rgba(30,70,140,0.3)] px-4 py-3 flex flex-wrap gap-4 justify-between">
        {banks.map((b) => (
          <span key={b.bank} className="font-mono text-[10px] text-text-muted">
            <span className="text-gold font-semibold">{b.bank}</span> {b.rate} <span className="text-text-faint">{b.status}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function CountdownTimer() {
  const target = new Date('2026-08-05T00:00:00+10:00').getTime()
  const [remaining, setRemaining] = useState(target - Date.now())

  useState(() => {
    const id = setInterval(() => setRemaining(target - Date.now()), 1000)
    return () => clearInterval(id)
  })

  const days = Math.max(0, Math.floor(remaining / (1000 * 60 * 60 * 24)))
  const hours = Math.max(0, Math.floor((remaining / (1000 * 60 * 60)) % 24))
  const mins = Math.max(0, Math.floor((remaining / (1000 * 60)) % 60))
  const secs = Math.max(0, Math.floor((remaining / 1000) % 60))

  return (
    <span className="font-mono text-[11px] text-gold">
      {days}d {String(hours).padStart(2, '0')}h {String(mins).padStart(2, '0')}m {String(secs).padStart(2, '0')}s
    </span>
  )
}

function MacroPanel() {
  const indicators = [
    { label: 'CPI', value: '3.6%' },
    { label: 'UE', value: '4.1%' },
    { label: 'GDP', value: '1.5%' },
    { label: 'TRADE', value: '+A$5.2B' },
    { label: 'RETAIL', value: '+0.4%' },
    { label: 'SENTIMENT', value: '82.4' },
    { label: 'BIZ CONF', value: '4.2' },
    { label: 'IRON ORE', value: 'US$98.20' },
  ]
  return (
    <div className="p-6">
      <div className="text-center py-6 border-b border-[rgba(30,70,140,0.3)]">
        <div className="font-mono text-[48px] font-bold text-gold leading-none">4.35%</div>
        <div className="font-mono text-[12px] text-text-primary mt-2">CASH RATE — HELD</div>
        <div className="font-mono text-[11px] text-text-muted mt-3">
          NEXT MEETING: 5 AUG 2026 &nbsp;·&nbsp; <CountdownTimer />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {indicators.map((ind) => (
          <div key={ind.label} className="bg-bg-surface rounded p-3">
            <div className="font-mono text-[9px] text-text-muted">{ind.label}</div>
            <div className="font-mono text-[15px] text-text-primary font-bold mt-1">{ind.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NewsPanel() {
  const articles = [
    { source: 'AFR', time: '2m ago', sentiment: 'BULLISH', headline: 'RBA holds rates at 4.35%, signals possible cut Q4 2026' },
    { source: 'REUTERS', time: '8m ago', sentiment: 'BEARISH', headline: 'Iron ore slides as China construction data disappoints' },
    { source: 'COINTELEGRAPH', time: '14m ago', sentiment: 'BULLISH', headline: 'Bitcoin consolidates above A$160,000 resistance level' },
  ]
  const badgeColor = { BULLISH: '#2D8A50', BEARISH: '#A83232' }
  const themes = [
    'Iron ore stability above US$95/t supports ASX materials sector',
    'Fed pause reduces AUD pressure — bullish for offshore earners',
    'Crypto breadth improving as BTC dominance eases from 60%',
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-0">
      <div className="p-4 flex flex-col gap-3">
        {articles.map((a) => (
          <div key={a.headline} className="bg-bg-surface rounded p-3">
            <div className="font-mono text-[9px] text-text-muted flex items-center gap-2">
              <span className="text-gold">{a.source}</span>
              <span>· {a.time} ·</span>
              <span
                className="rounded-full px-2 py-0.5"
                style={{ background: `${badgeColor[a.sentiment]}22`, color: badgeColor[a.sentiment] }}
              >
                {a.sentiment}
              </span>
            </div>
            <div className="font-mono text-[12px] text-text-primary mt-2 leading-snug">{a.headline}</div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t md:border-t-0 md:border-l border-[rgba(30,70,140,0.3)]">
        <div className="font-mono text-[9px] text-gold mb-3">MADDENAI KEY THEMES</div>
        <div className="flex flex-col gap-3">
          {themes.map((t) => (
            <div key={t} className="font-mono text-[11px] text-text-muted leading-snug flex gap-2">
              <span className="text-gold shrink-0">◆</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WatchlistPanel() {
  const rows = [
    { symbol: 'BHP.AX', price: 'A$43.82', change: '+0.85%', positive: true, range: 62 },
    { symbol: 'CBA.AX', price: 'A$164.20', change: '+0.31%', positive: true, range: 78 },
    { symbol: 'AAPL', price: 'US$231.40', change: '-0.22%', positive: false, range: 55 },
    { symbol: 'BTC/AUD', price: 'A$162,400', change: '+1.80%', positive: true, range: 84 },
  ]
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="ADD TICKER..."
        className="w-full font-mono text-[11px] text-text-muted bg-bg-surface border border-gold/30 rounded-sm px-3 py-2 outline-none focus:border-gold/60 transition-colors"
      />
      <div className="mt-3">
        {rows.map((row) => (
          <div key={row.symbol} className="flex items-center gap-3 py-2.5 border-b border-[rgba(30,70,140,0.2)]">
            <span className="font-mono text-[11px] text-text-primary w-24">{row.symbol}</span>
            <span className="font-mono text-[11px] text-text-primary w-28 text-right">{row.price}</span>
            <span className={`font-mono text-[11px] w-20 text-right ${row.positive ? 'text-gain' : 'text-loss'}`}>{row.change}</span>
            <div className="flex-1 h-1 bg-[rgba(30,70,140,0.3)] rounded-full ml-4 relative">
              <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold" style={{ left: `${row.range}%` }} />
            </div>
          </div>
        ))}
        <button type="button" className="flex items-center gap-2 py-3 font-mono text-[11px] text-gold w-full">
          <span>+</span> ADD SYMBOL
        </button>
      </div>
    </div>
  )
}

function GlobalPanel() {
  const cities = [
    { name: 'SYDNEY', x: 82, y: 62 },
    { name: 'LONDON', x: 47, y: 24 },
    { name: 'NEW YORK', x: 25, y: 28 },
    { name: 'TOKYO', x: 87, y: 32 },
    { name: 'SHANGHAI', x: 80, y: 34 },
  ]
  return (
    <div className="p-4">
      <div className="flex gap-2 mb-3 flex-wrap">
        {['Exchanges', 'Routes', 'Risk'].map((l) => (
          <span key={l} className="font-mono text-[9px] text-gold border border-gold/30 rounded-full px-3 py-1">
            {l}
          </span>
        ))}
      </div>
      <div className="relative bg-bg-surface rounded" style={{ height: 220 }}>
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <path d="M15,20 Q20,15 28,18 L35,25 Q30,32 22,30 Z" fill="rgba(30,70,140,0.4)" />
          <path d="M40,15 Q48,12 55,18 L52,28 Q44,26 40,20 Z" fill="rgba(30,70,140,0.4)" />
          <path d="M45,32 Q55,30 58,42 L50,55 Q42,48 45,32 Z" fill="rgba(30,70,140,0.4)" />
          <path d="M65,20 Q78,18 85,28 L80,40 Q68,35 65,20 Z" fill="rgba(30,70,140,0.4)" />
          <path d="M75,45 Q85,48 82,58 L74,56 Z" fill="rgba(30,70,140,0.4)" />
          <line x1="82" y1="62" x2="80" y2="34" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="1,1" />
          <line x1="82" y1="62" x2="87" y2="32" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="1,1" />
          {cities.map((c) => (
            <g key={c.name}>
              <circle cx={c.x} cy={c.y} r="1.2" fill="#C9A84C">
                <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x={c.x} y={c.y - 2.5} fontSize="2.4" fill="#637899" textAnchor="middle" fontFamily="IBM Plex Mono">
                {c.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex justify-between mt-3 font-mono text-[10px] text-text-muted flex-wrap gap-2">
        <span>50+ EXCHANGES</span>
        <span className="text-gain">18 OPEN</span>
        <span>RISK: <span className="text-gold">MODERATE</span></span>
      </div>
    </div>
  )
}

const PANELS = {
  MARKETS: MarketsPanel,
  CRYPTO: CryptoPanel,
  RATES: RatesPanel,
  MACRO: MacroPanel,
  NEWS: NewsPanel,
  WATCHLIST: WatchlistPanel,
  GLOBAL: GlobalPanel,
}

export default function PlatformSection() {
  const [activeTab, setActiveTab] = useState('MARKETS')
  const ActivePanel = PANELS[activeTab]

  return (
    <section className="bg-bg-surface py-24 md:py-[120px] px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto text-center">
        <SectionLabel center>THE TERMINAL</SectionLabel>
        <h2 className="font-sans text-[32px] md:text-[44px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto">
          Seven modules. One platform. Everything you need to know.
        </h2>
        <p className="font-sans text-[17px] text-text-muted mt-4">Click any module to explore.</p>

        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`font-mono text-[11px] tracking-[0.05em] px-5 py-2 rounded-full transition-all duration-150 ${
                activeTab === tab
                  ? 'bg-gold text-bg-primary font-bold'
                  : 'border border-gold/30 text-gold hover:bg-gold/[0.08]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-bg-primary border border-gold/20 rounded mt-10 min-h-[500px] text-left overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <ActivePanel />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="font-mono text-[11px] text-text-muted text-center mt-4">{DESCRIPTIONS[activeTab]}</p>
      </div>
    </section>
  )
}
