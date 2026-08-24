import { Fragment, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import TerminalCard from '../components/shared/TerminalCard'
import FadeInSection from '../components/shared/FadeInSection'

function MiniHeader({ label, right, accent }) {
  return (
    <div className="bg-bg-surface border-b border-gold/15 px-3 py-2 flex justify-between items-center font-mono text-[9px] shrink-0">
      <span className="text-text-muted tracking-[0.05em]">{label}</span>
      {right && <span className={accent === 'gain' ? 'text-gain' : 'text-gold'}>{right}</span>}
    </div>
  )
}

function MiniShell({ children, maxHeight = 240 }) {
  return (
    <div
      className="bg-bg-primary border border-gold/15 rounded overflow-hidden flex flex-col w-full"
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

function MaddenAIMiniVisual() {
  return (
    <MiniShell>
      <MiniHeader label="MADDENAI ANALYST" />
      <div className="p-3 flex flex-col gap-2.5 flex-1">
        <div className="self-end bg-gold/10 border border-gold/15 rounded px-2.5 py-1.5 font-mono text-[9px] text-text-primary max-w-[85%]">
          BHP outlook for Q4?
        </div>
        <div className="font-mono text-[9px] text-text-muted leading-[1.6]">
          <span className="text-gold">AI · </span>
          Bias BULLISH. Iron ore at US$98/t supports the earnings thesis. Watch A$44.50 resistance...
        </div>
        <div className="flex gap-1.5 mt-auto flex-wrap">
          {[['BIAS', 'BULLISH'], ['CONF', '76%'], ['HORIZON', '1M']].map(([k, v]) => (
            <span key={k} className="font-mono text-[7px] text-gold border border-gold/15 rounded-full px-2 py-0.5">
              {k}: {v}
            </span>
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
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
      {GLOBAL_CONTINENTS.map((d, i) => (
        <path key={i} d={d} fill="rgba(201,168,76,0.28)" stroke="rgba(201,168,76,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
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
      <div className="flex-1 overflow-hidden flex items-center justify-center p-2" style={{ minHeight: 110 }}>
        <GlobalMap />
      </div>
      <div className="grid grid-cols-3 divide-x divide-[rgba(201,168,76,0.15)] border-t border-[rgba(201,168,76,0.15)]">
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

function YieldCurveChart() {
  const w = 200
  const h = 66
  const labels = ['1Y', '2Y', '5Y', '10Y', '30Y']
  const auRates = [3.85, 3.95, 4.15, 4.35, 4.42]
  const usRates = [4.05, 4.15, 4.28, 4.40, 4.45]
  const min = 3.7
  const max = 4.6
  const xs = labels.map((_, i) => 10 + i * ((w - 20) / (labels.length - 1)))
  const y = (r) => h - 16 - ((r - min) / (max - min)) * (h - 24)
  const pathFor = (rates) => rates.map((r, i) => `${i === 0 ? 'M' : 'L'}${xs[i]},${y(r)}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={pathFor(usRates)} fill="none" stroke="#8BA3C4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d={pathFor(auRates)} fill="none" stroke="#C9A84C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {labels.map((l, i) => (
        <text key={l} x={xs[i]} y={h - 3} fill="#4A6080" fontSize="7" fontFamily="IBM Plex Mono, monospace" textAnchor="middle">{l}</text>
      ))}
    </svg>
  )
}

function RatesFxVisual() {
  return (
    <MiniShell>
      <MiniHeader label="RATES · YIELD CURVE" />
      <div className="flex-1 flex items-center justify-center pt-2">
        <YieldCurveChart />
      </div>
      <div className="flex justify-center gap-4 font-mono text-[8px] pb-1.5">
        <span style={{ color: '#C9A84C' }}>● AU 4.42%</span>
        <span style={{ color: '#8BA3C4' }}>● US 4.45%</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 px-3 pb-3">
        {[['AUD/USD', '0.6520'], ['AUD/JPY', '96.84']].map(([pair, val]) => (
          <div key={pair} className="bg-bg-surface rounded-sm text-center py-1.5">
            <div className="font-mono text-[7px] text-text-muted">{pair}</div>
            <div className="font-mono text-[11px] text-text-primary font-bold mt-0.5">{val}</div>
          </div>
        ))}
      </div>
    </MiniShell>
  )
}

function SemiGauge({ value, color }) {
  const r = 21
  const cx = 26
  const cy = 25
  const angle = (value / 100) * 180
  const rad = (Math.PI / 180) * (180 - angle)
  const x = cx + r * Math.cos(rad)
  const y = cy - r * Math.sin(rad)
  const large = angle > 180 ? 1 : 0
  return (
    <svg width="52" height="28" viewBox="0 0 52 28">
      <path d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`} fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="4" strokeLinecap="round" />
      <path d={`M${cx - r},${cy} A${r},${r} 0 ${large} 1 ${x},${y}`} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function MacroGaugesVisual() {
  const gauges = [
    { label: 'GDP GROWTH', value: 40, display: '1.2%', color: '#C9A84C' },
    { label: 'INFLATION', value: 60, display: '3.8%', color: '#A83232' },
    { label: 'UNEMPLOYMENT', value: 35, display: '4.2%', color: '#2D8A50' },
  ]
  return (
    <MiniShell>
      <MiniHeader label="MACRO · KEY INDICATORS" />
      <div className="flex-1 grid grid-cols-3 gap-1 items-end px-2 pt-4">
        {gauges.map((g) => (
          <div key={g.label} className="flex flex-col items-center">
            <SemiGauge value={g.value} color={g.color} />
            <div className="font-mono text-[12px] font-bold mt-1" style={{ color: g.color }}>{g.display}</div>
            <div className="font-mono text-[6.5px] text-text-muted tracking-[0.05em] mt-0.5 text-center">{g.label}</div>
          </div>
        ))}
      </div>
      <div className="font-mono text-[8px] text-gold px-3 py-2 mt-1" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
        REGIME: LATE-CYCLE EXPANSION
      </div>
    </MiniShell>
  )
}

function MiniSparkline({ color, points }) {
  const w = 40
  const h = 16
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const coords = points
    .map((p, i) => `${(i / (points.length - 1)) * w},${h - ((p - min) / range) * h}`)
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={coords} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CryptoMiniVisual() {
  const coins = [
    ['₿', 'BTC', 'A$92,285', '+0.52%', true, [40, 44, 42, 48, 46, 52, 55]],
    ['Ξ', 'ETH', 'A$2,679', '+1.43%', true, [30, 32, 29, 35, 38, 36, 42]],
    ['✕', 'XRP', 'A$1.57', '+0.90%', true, [48, 46, 50, 47, 52, 50, 54]],
  ]
  return (
    <MiniShell>
      <MiniHeader label="CRYPTO · TOP 20" right="68 BULLISH" accent="gain" />
      <div className="flex flex-col gap-1.5 p-3">
        {coins.map(([logo, sym, price, chg, pos, spark]) => (
          <div key={sym} className="flex items-center gap-2 bg-bg-surface rounded-sm px-2 py-1.5">
            <span className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center font-mono text-[10px] font-bold shrink-0">{logo}</span>
            <span className="font-mono text-[10px] text-text-primary flex-1">{sym}</span>
            <span className="font-mono text-[10px] text-text-primary">{price}</span>
            <span className={`font-mono text-[9px] w-11 text-right shrink-0 ${pos ? 'text-gain' : 'text-loss'}`}>{chg}</span>
            <MiniSparkline color={pos ? '#2D8A50' : '#A83232'} points={spark} />
          </div>
        ))}
      </div>
      <div className="px-3 pb-3 flex items-center gap-3">
        <SemiGauge value={42} color="#A83232" />
        <div>
          <div className="font-mono text-[7px] text-text-muted tracking-[0.08em]">FEAR &amp; GREED</div>
          <div className="font-mono text-[13px] text-text-primary font-bold leading-none mt-0.5">
            42 <span className="text-[9px] text-loss font-normal">FEAR</span>
          </div>
        </div>
      </div>
    </MiniShell>
  )
}

function NewsMiniVisual() {
  const rows = [
    ['ASX', 'BHP rises on iron ore surge', '2m ago', '#2D8A50'],
    ['MACRO', 'RBA holds at 4.35%', '1h ago', '#C9A84C'],
    ['CRYPTO', 'XRP rallies on CLARITY Act', '3h ago', '#2D8A50'],
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
      <div className="flex flex-wrap gap-1.5 px-3 pb-3">
        {['#IronOre', '#RBA', '#XRP'].map((tag) => (
          <span key={tag} className="font-mono text-[7px] text-gold border border-gold/15 rounded-full px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </MiniShell>
  )
}

function RangeBar({ pct, color }) {
  return (
    <div className="w-14 h-1.5 rounded-full bg-[rgba(201,168,76,0.15)] overflow-hidden shrink-0">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

function WatchlistMiniVisual() {
  const rows = [
    ['BHP', 'A$43.21', '+1.27%', true, 55],
    ['CBA', 'A$168.45', '-0.72%', false, 80],
    ['XRO', 'A$148.20', '+1.44%', true, 55],
    ['AAPL', 'US$308.74', '+0.71%', true, 90],
  ]
  return (
    <MiniShell>
      <MiniHeader label="WATCHLIST · 4 HOLDINGS" />
      <div className="flex flex-col gap-1.5 p-3">
        {rows.map(([sym, price, chg, pos, pct]) => (
          <div key={sym} className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-text-primary font-bold w-10 shrink-0">{sym}</span>
            <span className="font-mono text-[9px] text-text-muted flex-1">{price}</span>
            <span className={`font-mono text-[9px] w-12 text-right shrink-0 ${pos ? 'text-gain' : 'text-loss'}`}>
              {pos ? '▲' : '▼'}{chg}
            </span>
            <RangeBar pct={pct} color={pos ? '#2D8A50' : '#A83232'} />
          </div>
        ))}
      </div>
      <div className="font-mono text-[7px] text-text-faint px-3 pb-3 tracking-[0.05em]">52-WEEK RANGE POSITION</div>
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
            border: '1px solid rgba(201,168,76,0.15)',
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

function ModuleIcon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-9 h-9 md:w-10 md:h-10 text-gold shrink-0">
      {children}
    </svg>
  )
}

function TierBadge({ tier }) {
  const isCore = tier === 'core'
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.1em] rounded-full px-2.5 py-1 shrink-0"
      style={{
        color: isCore ? '#2D8A50' : '#C9A84C',
        background: isCore ? 'rgba(45,138,80,0.12)' : 'rgba(201,168,76,0.12)',
        border: `1px solid ${isCore ? 'rgba(45,138,80,0.35)' : 'rgba(201,168,76,0.35)'}`,
      }}
    >
      {isCore ? '● AVAILABLE NOW' : '◐ PRIME+'}
    </span>
  )
}

const MODULE_ICONS = {
  markets: (
    <ModuleIcon>
      <path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
    </ModuleIcon>
  ),
  maddenai: (
    <ModuleIcon>
      <rect x="7" y="7" width="10" height="10" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" strokeLinecap="round" />
    </ModuleIcon>
  ),
  global: (
    <ModuleIcon>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9Z" strokeLinecap="round" strokeLinejoin="round" />
    </ModuleIcon>
  ),
  rates: (
    <ModuleIcon>
      <path d="M3 17l5.5-6 4 4L21 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </ModuleIcon>
  ),
  macro: (
    <ModuleIcon>
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M19 5 5 19" strokeLinecap="round" />
    </ModuleIcon>
  ),
  crypto: (
    <ModuleIcon>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 15.5c0-1.4 1.1-2 2.5-2s2.5-.7 2.5-2-1.1-2-2.5-2-2.5.6-2.5 2M12 7v1.5M12 15.5V17" strokeLinecap="round" strokeLinejoin="round" />
    </ModuleIcon>
  ),
  news: (
    <ModuleIcon>
      <rect x="4" y="4" width="16" height="16" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
    </ModuleIcon>
  ),
  watchlist: (
    <ModuleIcon>
      <rect x="3" y="8" width="18" height="12" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" strokeLinecap="round" strokeLinejoin="round" />
    </ModuleIcon>
  ),
}

const MODULES = [
  {
    key: 'markets',
    tier: 'core',
    stats: ['9 INDICES', '200+ STOCKS', '11 SECTORS', '60s REFRESH'],
    title: 'Real-time global markets',
    icon: MODULE_ICONS.markets,
    body: 'ASX 200 as the primary index, alongside nine global benchmarks and a full sector breadth heatmap. Refreshed continuously, so you see the whole market, not just headline numbers.',
    features: [
      'ASX 200, S&P 500, NASDAQ, FTSE, Nikkei + more',
      'Sector heatmap with advance/decline breadth',
      'Top movers with P/E, volume, market cap',
      'Interactive charts with drawing tools',
    ],
    visual: <MarketsMiniVisual />,
  },
  {
    key: 'maddenai',
    tier: 'core',
    stats: ['ANY ASSET', '5-PART READ', 'INSTANT ANALYSIS', 'CLAUDE SONNET 4.6'],
    title: 'Your AI analyst',
    icon: MODULE_ICONS.maddenai,
    body: 'Ask anything about any stock, crypto, or macro question. MaddenAI reads the data and hands back a structured, professional read in seconds — not a wall of numbers.',
    features: [
      'Ask anything about any asset',
      'Five-part structured analysis every time',
      'Click any asset → instant analysis',
      'General information only',
    ],
    visual: <MaddenAIMiniVisual />,
  },
  {
    key: 'global',
    tier: 'core',
    stats: ['50+ EXCHANGES', '200+ COUNTRIES', '5 LAYERS', 'LIVE CHOKEPOINTS'],
    title: 'World-class global intelligence',
    icon: MODULE_ICONS.global,
    body: 'A live 3D globe across five data layers — see shipping routes, flight paths, and geopolitical risk before it shows up in your portfolio.',
    features: [
      'Interactive 3D globe with live data layers',
      'Shipping routes, flight paths, seismic data',
      'Country intelligence panels',
      'Geopolitical risk scoring',
    ],
    visual: <GlobalMiniVisual />,
  },
  {
    key: 'rates',
    tier: 'prime',
    stats: ['10 AUD PAIRS', '8 BOND TENORS', '10+ CENTRAL BANKS', '5min REFRESH'],
    title: 'Interest rates & currency',
    icon: MODULE_ICONS.rates,
    body: 'Compare AU and US yield curves side by side, track ten major FX pairs against the dollar, and never miss an RBA decision.',
    features: [
      'Global central bank rates dashboard',
      'AU and US yield curves compared',
      '10 major FX pairs vs AUD',
      'RBA policy tracker',
    ],
    visual: <RatesFxVisual />,
  },
  {
    key: 'macro',
    tier: 'prime',
    stats: ['12 INDICATORS', 'AI DAILY THEMES', 'AUTO CALENDAR', 'REGIME TRACKING'],
    title: 'Macro intelligence',
    icon: MODULE_ICONS.macro,
    body: 'Twelve economic indicators in one dashboard, with MaddenAI surfacing the themes that actually move markets before they hit the headlines.',
    features: [
      '12 economic indicators dashboard',
      'AI-generated daily macro themes',
      'Economic calendar auto-updating',
      'Macro regime indicator',
    ],
    visual: <MacroGaugesVisual />,
  },
  {
    key: 'crypto',
    tier: 'core',
    stats: ['50+ COINS', 'AUD PRICING', 'FEAR & GREED', 'LIVE COINGECKO'],
    title: 'Crypto intelligence',
    icon: MODULE_ICONS.crypto,
    body: 'Fifty-plus coins priced live in AUD, with the Fear & Greed Index and on-chain context most retail apps leave out.',
    features: [
      '50+ coins with AUD dual pricing',
      'Fear & Greed Index',
      'BTC dominance tracker',
      'On-chain context',
    ],
    visual: <CryptoMiniVisual />,
  },
  {
    key: 'news',
    tier: 'core',
    stats: ['28+ SOURCES', '9 CATEGORIES', '3min REFRESH', 'AI SENTIMENT'],
    title: 'Market intelligence',
    icon: MODULE_ICONS.news,
    body: '28+ sources filtered for relevance and scored for sentiment, with an AI morning briefing so you start the session already informed.',
    features: [
      'Live news with sentiment scoring',
      'AI morning market briefing',
      'Trending topics and market impact',
      'Breaking news alerts',
    ],
    visual: <NewsMiniVisual />,
  },
  {
    key: 'watchlist',
    tier: 'core',
    stats: ['UNLIMITED WATCHLIST', 'LIVE P&L', 'PRICE ALERTS', 'SUPABASE SYNC'],
    title: 'Track what matters',
    icon: MODULE_ICONS.watchlist,
    body: 'Build an unlimited watchlist, track real P&L across your portfolio, and get price alerts the moment something moves — synced everywhere via Supabase.',
    features: [
      'Unlimited watchlist (Prime+)',
      'Portfolio with P&L tracking',
      'Price alerts via companion app',
      'Supabase sync across devices',
    ],
    visual: <WatchlistMiniVisual />,
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
        <SectionLabel center>MADDEX TERMINAL</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[40px] md:text-[64px] font-extrabold leading-tight tracking-[-0.03em] text-text-primary max-w-4xl mx-auto"
        >
          Everything you need.
          <br />
          One terminal.
        </motion.h1>
        <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          Eight professional modules, AI-powered analysis, global intelligence.
        </p>
        <div className="mt-8">
          <GoldButton to="/pricing">START FREE TRIAL</GoldButton>
        </div>
      </section>

      <FadeInSection className="bg-bg-primary py-24 px-6 md:px-10 border-t border-[rgba(201,168,76,0.15)]">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionLabel center>WHY MADDEX</SectionLabel>
          <h2 className="font-sans text-[28px] md:text-[40px] font-bold tracking-[-0.02em] text-text-primary mt-3 leading-tight">
            Institutional data used to cost institutional money.
          </h2>
          <p className="font-sans text-[16px] text-text-muted mt-4 max-w-xl mx-auto leading-[1.75]">
            A Bloomberg Terminal runs about A$42,000 a year. Retail broker apps give you price charts and little else. Maddex gives you the depth without the price tag.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-end">
            <div className="text-left md:text-right">
              <div className="font-mono text-[10px] tracking-[0.15em] text-text-muted uppercase">Bloomberg Terminal</div>
              <div className="font-sans text-[26px] md:text-[32px] font-bold tracking-[-0.02em] text-text-primary mt-1">A$42,000+/yr</div>
              <div className="mt-3 h-2 rounded-full bg-[rgba(201,168,76,0.15)] overflow-hidden md:ml-auto" style={{ maxWidth: 320 }}>
                <div className="h-full rounded-full" style={{ width: '100%', background: 'rgba(201,168,76,0.55)' }} />
              </div>
              <div className="font-sans text-[12px] text-text-faint mt-2">Retail broker apps: basic price data only</div>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="font-mono text-[11px] text-gold tracking-[0.1em] whitespace-nowrap">121× CHEAPER</div>
              <div className="w-px h-16 bg-[rgba(201,168,76,0.15)] mt-3 hidden md:block" />
            </div>

            <div className="text-left">
              <div className="font-mono text-[10px] tracking-[0.15em] text-gold uppercase">Maddex</div>
              <div className="font-sans text-[26px] md:text-[32px] font-bold tracking-[-0.02em] text-text-primary mt-1">A$29/month</div>
              <div className="mt-3 h-2 rounded-full bg-[rgba(201,168,76,0.15)] overflow-hidden" style={{ maxWidth: 320 }}>
                <div className="h-full rounded-full" style={{ width: '3px', minWidth: 3, background: '#C9A84C' }} />
              </div>
              <div className="font-sans text-[12px] text-text-muted mt-2">Institutional-grade markets, AI analysis, global intelligence</div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <div className="bg-bg-surface">
        {MODULES.map((mod, i) => (
          <Fragment key={mod.key}>
          {i > 0 && (
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)', margin: 0 }} />
          )}
          <section className="relative py-24 px-6 md:px-10">
            <span
              className="absolute top-6 right-6 font-mono select-none pointer-events-none"
              style={{ fontSize: 9, color: '#4A6080' }}
            >
              MODULE {String(i + 1).padStart(2, '0')}
            </span>
            <div
              className={`max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                i % 2 === 0 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 1 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-gold">MODULE {String(i + 1).padStart(2, '0')}</span>
                  <TierBadge tier={mod.tier} />
                </div>
                <h2 className="font-sans text-[30px] md:text-[48px] font-bold tracking-[-0.02em] text-text-primary mt-3 leading-tight flex items-center gap-3">
                  {mod.icon}{mod.title}
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
                initial={{ opacity: 0, x: i % 2 === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center justify-center"
              >
                {mod.visual}
              </motion.div>
            </div>

            <div className="max-w-[1200px] mx-auto mt-6 pt-4 border-t border-[rgba(201,168,76,0.15)]">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold mb-3">KEY STATS</div>
              <KeyStats stats={mod.stats} />
              <div className="flex justify-center sm:justify-end mt-4">
                <Link to="/pricing" className="font-mono text-[11px] text-gold hover:opacity-70 transition-opacity whitespace-nowrap">
                  TRY THIS MODULE FREE →
                </Link>
              </div>
            </div>
          </section>
          </Fragment>
        ))}
      </div>

      <section className="bg-bg-primary py-24 px-6 md:px-10 text-center">
        <SectionLabel center>COMMAND BAR</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary max-w-3xl mx-auto leading-tight">
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

      <section className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div>
            <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/15 rounded-full px-3 py-1 mb-4">
              iOS &amp; ANDROID · COMING 2027
            </span>
            <SectionLabel>COMPANION APP</SectionLabel>
            <h2 className="font-sans text-[34px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary leading-tight">
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
                'Synced with your terminal in real time',
              ].map((f) => (
                <div key={f} className="font-sans text-[13px] text-text-muted flex gap-2">
                  <span className="text-gain">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div style={{
              width: 200,
              height: '100%',
              minHeight: 400,
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
                <div className="bg-bg-primary border-b border-gold/15 px-3 py-2 font-mono text-[9px] text-gold flex items-center justify-between">
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
                <div className="border-t border-gold/15 px-3 py-2 font-mono text-[8px] text-text-faint text-center">
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
