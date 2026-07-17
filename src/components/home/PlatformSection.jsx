import { useEffect, useState } from 'react'
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

function StripDivider() {
  return <div className="h-px bg-[rgba(30,70,140,0.3)]" />
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
    { label: 'IT', full: 'Information Technology', change: '+1.8%', positive: true },
    { label: 'FIN', full: 'Financials', change: '+0.3%', positive: true },
    { label: 'HLTH', full: 'Health Care', change: '+1.1%', positive: true },
    { label: 'CDI', full: 'Consumer Discretionary', change: '-0.2%', positive: false },
    { label: 'COM', full: 'Communication Services', change: '+0.7%', positive: true },
    { label: 'IND', full: 'Industrials', change: '+0.5%', positive: true },
    { label: 'STA', full: 'Consumer Staples', change: '-0.1%', positive: false },
    { label: 'ENRG', full: 'Energy', change: '-0.4%', positive: false },
  ]
  return (
    <div className="flex flex-col h-full">
      <div className="bg-bg-primary border-b border-gold/12 px-4 py-3 flex flex-wrap justify-between gap-2 font-mono text-[10px]">
        <span className="text-text-muted">
          MARKETS &nbsp;·&nbsp; ASX 200 <span className="text-gain">&nbsp;●&nbsp; OPEN</span> &nbsp;09:42 AEST
        </span>
        <span className="text-gold">MaddenAI Sentiment 72/100 NEUTRAL-BULLISH</span>
      </div>
      <div className="px-4 py-1.5">
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
            {i < indices.length - 1 && <StripDivider />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1 px-4 pb-2">
        {sectors.map((s) => (
          <div
            key={s.label}
            className="group relative px-2 py-1.5 rounded-sm font-mono text-[9px] cursor-default transition-transform duration-150 hover:scale-[1.04]"
            style={{
              background: s.positive ? 'rgba(45,138,80,0.12)' : 'rgba(168,50,50,0.12)',
              border: `1px solid ${s.positive ? 'rgba(45,138,80,0.2)' : 'rgba(168,50,50,0.2)'}`,
              color: s.positive ? '#2D8A50' : '#A83232',
            }}
          >
            {s.label} {s.change}
            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap bg-bg-surface border border-gold/30 text-text-primary text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
              {s.full}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-col">
        <div className="border-t border-[rgba(30,70,140,0.3)] px-4 py-1.5 font-mono text-[9px] text-text-muted">
          <span className="text-gold">TOP MOVERS</span>
          &nbsp; ASX LEADERS: <span className="text-text-primary">CSL.AX</span> <span className="text-gain">▲+2.4%</span> &nbsp;
          <span className="text-text-primary">BHP.AX</span> <span className="text-gain">▲+1.2%</span> &nbsp;
          <span className="text-text-primary">WBC.AX</span> <span className="text-gain">▲+0.8%</span>
          &nbsp;|&nbsp; LAGGARDS: <span className="text-text-primary">STO.AX</span> <span className="text-loss">▼-1.2%</span> &nbsp;
          <span className="text-text-primary">ORG.AX</span> <span className="text-loss">▼-0.8%</span>
        </div>
        <div className="bg-gold/5 border-t border-gold/12 px-4 py-1.5 font-mono text-[10px] text-gold">
          MADDENAI MARKET SENTIMENT &nbsp;72/100&nbsp; NEUTRAL-BULLISH &nbsp;─────●────
        </div>
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
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-2">
        <div className="p-3 border-r border-b border-[rgba(30,70,140,0.3)]">
          <div className="font-mono text-[9px] text-gold">MADDENAI</div>
          <div className="font-mono text-[28px] font-bold text-gold leading-none mt-1">68</div>
          <div className="font-sans text-[11px] text-text-primary">/100 BULLISH</div>
        </div>
        <div className="p-3 border-b border-[rgba(30,70,140,0.3)]">
          <div className="font-mono text-[9px] text-gold">FEAR &amp; GREED</div>
          <div className="font-mono text-[28px] font-bold text-[#C9A84C] leading-none mt-1">42</div>
          <div className="font-sans text-[11px] text-text-primary">FEAR</div>
        </div>
        <div className="p-3 border-r border-[rgba(30,70,140,0.3)]">
          <div className="font-mono text-[9px] text-gold">MARKET CAP</div>
          <div className="font-mono text-[20px] font-bold text-text-primary mt-1">A$2.4T</div>
          <div className="font-mono text-[11px] text-gain">▲ +1.2% 24h</div>
        </div>
        <div className="p-3">
          <div className="font-mono text-[9px] text-gold">BTC DOMINANCE</div>
          <div className="font-mono text-[20px] font-bold text-text-primary mt-1">58.2%</div>
          <div className="w-full h-1 bg-[rgba(30,70,140,0.3)] rounded-full mt-2">
            <div className="h-1 bg-gold rounded-full" style={{ width: '58.2%' }} />
          </div>
        </div>
      </div>
      <div className="px-4 py-1.5">
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
      <div className="mt-auto border-t border-[rgba(30,70,140,0.3)] px-4 py-1.5 font-mono text-[9px] text-text-muted">
        <span className="text-gold">TRENDING</span> &nbsp;🔥 <span className="text-text-primary">PEPE</span> <span className="text-gain">▲+12.4%</span> &nbsp;
        <span className="text-text-primary">WIF</span> <span className="text-gain">▲+8.2%</span> &nbsp;
        <span className="text-text-primary">BONK</span> <span className="text-gain">▲+6.1%</span> &nbsp;
        <span className="text-text-primary">DOGE</span> <span className="text-gain">▲+4.8%</span>
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
    { bank: 'FED', rate: '4.25%', status: 'HOLD' },
    { bank: 'ECB', rate: '2.50%', status: 'CUT' },
    { bank: 'BOE', rate: '4.50%', status: 'HOLD' },
    { bank: 'BOJ', rate: '0.50%', status: 'HOLD' },
  ]
  const tenors = ['3M', '6M', '1Y', '2Y', '3Y', '5Y', '10Y']
  const yields = [20, 24, 26, 30, 34, 40, 48]
  const points = yields.map((y, i) => `${(i / (yields.length - 1)) * 260 + 10},${70 - y}`).join(' ')

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="p-3 border-r border-[rgba(30,70,140,0.3)]">
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
        <div className="p-3">
          <div className="font-mono text-[9px] text-gold mb-2">AU GOVERNMENT BOND YIELD CURVE</div>
          <svg viewBox="0 0 280 90" className="w-full h-[100px]">
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
      <div className="mt-auto border-t border-[rgba(30,70,140,0.3)] px-4 py-2">
        <div className="font-mono text-[9px] text-gold mb-1.5">CENTRAL BANKS</div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {banks.map((b) => (
            <span key={b.bank} className="font-mono text-[10px] text-text-muted">
              <span className="text-gold font-semibold">{b.bank}</span> {b.rate} <span className="text-text-faint">{b.status}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CountdownTimer() {
  const target = new Date('2026-08-05T00:00:00+10:00').getTime()
  const [remaining, setRemaining] = useState(target - Date.now())

  useEffect(() => {
    const id = setInterval(() => setRemaining(target - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])

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
    <div className="p-4 flex flex-col h-full justify-between">
      <div className="text-center py-5 border-b border-[rgba(30,70,140,0.3)]">
        <div className="font-mono text-[44px] font-bold text-gold leading-none">4.35%</div>
        <div className="font-mono text-[12px] text-text-primary mt-2">CASH RATE — HELD</div>
        <div className="font-mono text-[11px] text-text-muted mt-2">
          NEXT MEETING: 5 AUG 2026 &nbsp;·&nbsp; <CountdownTimer />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {indicators.map((ind) => (
          <div key={ind.label} className="bg-bg-primary rounded p-3 text-center">
            <div className="font-mono text-[8px] text-text-muted">{ind.label}</div>
            <div className="font-mono text-[14px] text-text-primary font-bold mt-1.5">{ind.value}</div>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-[rgba(30,70,140,0.3)] font-mono text-[9px] text-text-muted">
        <span className="text-gold">NEXT EVENTS</span> &nbsp; AU EMPLOYMENT <span className="text-text-primary">17 JUL</span> &nbsp;
        US CPI <span className="text-text-primary">15 JUL</span> &nbsp;
        FOMC <span className="text-text-primary">29-30 JUL</span> &nbsp;
        RBA <span className="text-text-primary">5 AUG</span>
      </div>
    </div>
  )
}

function NewsPanel() {
  const articles = [
    { source: 'AFR', time: '2m ago', sentiment: 'BULLISH', headline: 'RBA holds rates at 4.35%, signals possible cut Q4 2026' },
    { source: 'REUTERS', time: '8m ago', sentiment: 'BEARISH', headline: 'Iron ore slides as China construction data disappoints' },
    { source: 'COINTELEGRAPH', time: '14m ago', sentiment: 'BULLISH', headline: 'Bitcoin consolidates above A$160,000 resistance level' },
    { source: 'BLOOMBERG', time: '22m ago', sentiment: 'BULLISH', headline: 'ASX financials rally as bond yields ease across the curve' },
    { source: 'THE AUSTRALIAN', time: '31m ago', sentiment: 'BULLISH', headline: 'Consumer confidence ticks up on softer rate-cut expectations' },
  ]
  const badgeColor = { BULLISH: '#2D8A50', BEARISH: '#A83232' }
  const themes = [
    'Iron ore stability above US$95/t supports ASX Materials',
    'Fed pause reduces AUD pressure — bullish offshore earners',
    'Crypto breadth improving as BTC dominance eases from 60%',
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] h-full overflow-hidden">
      <div className="relative p-3 flex flex-col gap-2 overflow-hidden">
        {articles.map((a) => (
          <div key={a.headline} className="bg-bg-primary rounded p-2.5 shrink-0">
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
            <div className="font-mono text-[12px] text-text-primary mt-1.5 leading-snug">{a.headline}</div>
          </div>
        ))}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #060D1A)' }}
        />
      </div>
      <div className="p-3 border-t md:border-t-0 md:border-l border-[rgba(30,70,140,0.3)]">
        <div className="font-mono text-[9px] text-gold mb-3">MADDENAI TODAY'S THEMES</div>
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
    <div className="p-4 flex flex-col h-full">
      <input
        type="text"
        placeholder="ADD TICKER..."
        className="w-full font-mono text-[11px] text-text-muted bg-bg-primary border border-gold/30 rounded-sm px-3 py-2 outline-none focus:border-gold/60 transition-colors"
      />
      <div className="mt-3">
        {rows.map((row) => (
          <div key={row.symbol} className="flex items-center gap-3 py-2 border-b border-[rgba(30,70,140,0.2)]">
            <span className="font-mono text-[11px] text-text-primary w-24">{row.symbol}</span>
            <span className="font-mono text-[11px] text-text-primary w-28 text-right">{row.price}</span>
            <span className={`font-mono text-[11px] w-20 text-right ${row.positive ? 'text-gain' : 'text-loss'}`}>{row.change}</span>
            <div className="flex-1 h-1 bg-[rgba(30,70,140,0.3)] rounded-full ml-4 relative">
              <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold" style={{ left: `${row.range}%` }} />
            </div>
          </div>
        ))}
        <button type="button" className="flex items-center gap-2 py-2 font-mono text-[11px] text-gold w-full">
          <span>+</span> ADD SYMBOL
        </button>
      </div>
      <div className="mt-auto pt-3 border-t border-[rgba(30,70,140,0.3)] font-mono text-[10px]">
        <span className="text-gold">PORTFOLIO SUMMARY</span> &nbsp;
        <span className="text-text-muted">Total Value:</span> <span className="text-text-primary">A$284,521</span> &nbsp;
        <span className="text-text-muted">Day P&amp;L:</span> <span className="text-gain">▲ +A$4,218 (+1.5%)</span> &nbsp;
        <span className="text-text-muted">Holdings:</span> <span className="text-text-primary">7</span>
      </div>
    </div>
  )
}

function GlobalPanel() {
  const cities = [
    { name: 'SYDNEY', code: 'ASX', x: 80, y: 58, open: true, ly: 4 },
    { name: 'TOKYO', code: 'TSE', x: 88, y: 24, open: true, ly: -3 },
    { name: 'SHANGHAI', code: 'SSE', x: 76, y: 30, open: true, ly: -3 },
    { name: 'SINGAPORE', code: 'SGX', x: 68, y: 52, open: true, ly: 5 },
    { name: 'LONDON', code: 'LSE', x: 42, y: 16, open: false, ly: -3 },
    { name: 'FRANKFURT', code: 'XETRA', x: 48, y: 36, open: false, ly: 5 },
    { name: 'NEW YORK', code: 'NYSE', x: 16, y: 32, open: false, ly: 5 },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-[60%_40%] h-full overflow-hidden">
      <div className="relative p-3 border-r border-[rgba(30,70,140,0.3)]">
        <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <path d="M10,24 Q16,18 24,22 L30,30 Q24,36 16,34 Z" fill="rgba(30,70,140,0.3)" />
          <path d="M38,10 Q48,8 54,16 L50,30 Q40,28 38,18 Z" fill="rgba(30,70,140,0.3)" />
          <path d="M42,38 Q54,36 56,48 L48,62 Q40,54 42,38 Z" fill="rgba(30,70,140,0.3)" />
          <path d="M62,16 Q78,14 86,24 L80,38 Q68,32 62,16 Z" fill="rgba(30,70,140,0.3)" />
          <path d="M70,48 Q82,50 80,62 L70,58 Z" fill="rgba(30,70,140,0.3)" />

          <line x1="80" y1="58" x2="76" y2="30" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="1,1" />
          <text x="73" y="48" fontSize="2.1" fill="#C9A84C" textAnchor="middle" fontFamily="IBM Plex Mono">IRON ORE</text>
          <line x1="80" y1="58" x2="88" y2="24" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="1,1" />
          <text x="92" y="44" fontSize="2.1" fill="#C9A84C" textAnchor="middle" fontFamily="IBM Plex Mono">LNG</text>

          {cities.map((c) => (
            <g key={c.name}>
              <circle cx={c.x} cy={c.y} r="1.1" fill={c.open ? '#C9A84C' : '#A83232'} opacity={c.open ? 1 : 0.5}>
                {c.open && <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />}
                {c.open && <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />}
              </circle>
              <text x={c.x} y={c.y + c.ly} fontSize="2.1" fill="#637899" textAnchor="middle" fontFamily="IBM Plex Mono">
                {c.code} ● {c.open ? 'OPEN' : 'CLOSED'}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="p-3 flex flex-col gap-2.5 overflow-hidden font-mono text-[9px]">
        <div>
          <div className="text-gold tracking-[0.1em] mb-1">GLOBAL STATUS</div>
          <div className="h-px bg-gold/20 mb-1.5" />
          <div className="flex justify-between text-text-muted"><span>OPEN NOW</span><span className="text-gain">18/50</span></div>
          <div className="flex justify-between text-text-muted"><span>CLOSING &lt; 1H</span><span className="text-text-primary">3</span></div>
          <div className="flex justify-between text-text-muted"><span>CLOSED</span><span className="text-text-faint">29</span></div>
        </div>
        <div>
          <div className="text-gold tracking-[0.1em] mb-1">ACTIVE LAYERS</div>
          <div className="h-px bg-gold/20 mb-1.5" />
          <div className="grid grid-cols-2 gap-1">
            <span className="border border-gold/40 text-gold rounded-sm px-1.5 py-0.5">● MARKETS</span>
            <span className="border border-[rgba(30,70,140,0.4)] text-text-faint rounded-sm px-1.5 py-0.5">MARITIME</span>
            <span className="border border-[rgba(30,70,140,0.4)] text-text-faint rounded-sm px-1.5 py-0.5">AIR</span>
            <span className="border border-[rgba(30,70,140,0.4)] text-text-faint rounded-sm px-1.5 py-0.5">GEO RISK</span>
          </div>
        </div>
        <div>
          <div className="text-gold tracking-[0.1em] mb-1">RISK PULSE</div>
          <div className="h-px bg-gold/20 mb-1.5" />
          <div className="text-text-muted mb-1">GLOBAL RISK: <span className="text-loss">ELEVATED</span> ████░░░░</div>
          <div className="text-text-muted">🔴 Middle East — <span className="text-loss">CRITICAL</span></div>
          <div className="text-text-muted">🟡 East Europe — <span className="text-gold">HIGH</span></div>
          <div className="text-text-muted">🟡 Asia Pacific — <span className="text-gold">MEDIUM</span></div>
        </div>
        <div>
          <div className="text-gold tracking-[0.1em] mb-1">TRADE FLOWS</div>
          <div className="h-px bg-gold/20 mb-1.5" />
          <div className="flex justify-between text-text-muted"><span>SUEZ CANAL</span><span className="text-gold">⚠ MONITORED</span></div>
          <div className="flex justify-between text-text-muted"><span>HORMUZ</span><span className="text-gold">⚠ MONITORED</span></div>
          <div className="flex justify-between text-text-muted"><span>PANAMA</span><span className="text-gain">✓ OPEN</span></div>
          <div className="flex justify-between text-text-muted"><span>MALACCA</span><span className="text-gain">✓ OPEN</span></div>
        </div>
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
    <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionLabel center>THE TERMINAL</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto">
          Seven modules. One platform. Everything you need to know.
        </h2>
        <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75]">Click any module to explore.</p>

        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative font-mono text-[11px] tracking-[0.05em] px-5 py-2 rounded-full transition-colors duration-150 opacity-100 ${
                activeTab === tab
                  ? 'text-bg-primary font-bold'
                  : 'border border-[rgba(201,168,76,0.35)] text-gold bg-[rgba(201,168,76,0.08)] hover:bg-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.5)]'
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="platform-tab-pill"
                  className="absolute inset-0 bg-gold rounded-full"
                  style={{ zIndex: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        <div className="relative bg-bg-surface border border-gold/20 rounded mt-10 min-h-[500px] text-left overflow-hidden flex flex-col">
          <span className="absolute -top-3 right-4 z-30 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.1em] text-gold bg-bg-surface border border-gold/30 px-2.5 py-1 rounded-full pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
            LIVE
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <ActivePanel />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="font-mono text-[14px] text-text-muted text-center mt-4 max-w-[600px] mx-auto">{DESCRIPTIONS[activeTab]}</p>
      </div>
    </section>
  )
}
