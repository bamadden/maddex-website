import TypewriterText from '../shared/TypewriterText'

const TICKER_ITEMS = [
  { label: 'ASX 200', change: '▲0.42% 8,247', positive: true },
  { label: 'BHP', change: '▲1.27% A$43.21', positive: true },
  { label: 'CBA', change: '▼0.72% A$168.45', positive: false },
  { label: 'NVDA', change: '▲2.85% US$138.42', positive: true },
  { label: 'XRP', change: '▲0.90% A$1.57', positive: true },
  { label: 'WTC', change: '▼1.13% A$36.80', positive: false },
  { label: 'RIO', change: '▲1.02% A$118.40', positive: true },
  { label: 'S&P 500', change: '▲0.32% 5,842', positive: true },
  { label: 'BTC', change: '▲0.52% A$92,285', positive: true },
  { label: 'ETH', change: '▲1.43% A$2,679', positive: true },
]

const HEATMAP = [
  { label: 'MAT', change: '+1.8%', tone: 'strong-pos' },
  { label: 'FIN', change: '+0.4%', tone: 'pos' },
  { label: 'TECH', change: '-0.6%', tone: 'neg' },
  { label: 'ENRG', change: '+2.1%', tone: 'strong-pos' },
  { label: 'HLTH', change: '+0.2%', tone: 'flat' },
  { label: 'CONS', change: '-1.1%', tone: 'strong-neg' },
  { label: 'UTIL', change: '+0.8%', tone: 'pos' },
  { label: 'RE', change: '-0.3%', tone: 'neg' },
  { label: 'IND', change: '+0.9%', tone: 'pos' },
]

const TONE_COLORS = {
  'strong-pos': { bg: 'rgba(45,138,80,0.28)', border: 'rgba(45,138,80,0.5)', text: '#4ADE80' },
  pos: { bg: 'rgba(45,138,80,0.14)', border: 'rgba(45,138,80,0.3)', text: '#2D8A50' },
  flat: { bg: 'rgba(201,168,76,0.1)', border: 'rgba(201,168,76,0.25)', text: '#C9A84C' },
  neg: { bg: 'rgba(168,50,50,0.14)', border: 'rgba(168,50,50,0.3)', text: '#A83232' },
  'strong-neg': { bg: 'rgba(168,50,50,0.28)', border: 'rgba(168,50,50,0.5)', text: '#F87171' },
}

const TOP_MOVERS = [
  { symbol: 'FMG', change: '+3.42%', price: 'A$18.92', positive: true },
  { symbol: 'NXT', change: '+4.46%', price: 'A$13.36', positive: true },
  { symbol: 'ALU', change: '-2.18%', price: 'A$0.90', positive: false },
]

const BOTTOM_STATS = [
  { label: 'AUD/USD', value: '0.6520', positive: true },
  { label: 'BTC', value: 'A$92.3K', positive: true },
  { label: 'VIX', value: '18.4', positive: false },
  { label: 'AU 10Y', value: '4.42%', positive: true },
]

// Fixed (not random) 30D series so the chart, the printed price, and the
// +34.2 / +0.42% readout below it always agree with each other.
const ASX_SERIES = [
  8110, 8125, 8095, 8140, 8160, 8130, 8180, 8155, 8200, 8175,
  8210, 8190, 8230, 8205, 8250, 8220, 8195, 8240, 8260, 8225,
  8270, 8245, 8280, 8255, 8290, 8265, 8230, 8260, 8213, 8247.3,
]

function Sparkline() {
  const w = 200
  const h = 64
  const min = Math.min(...ASX_SERIES)
  const max = Math.max(...ASX_SERIES)
  const range = max - min || 1
  const coords = ASX_SERIES.map((v, i) => {
    const x = (i / (ASX_SERIES.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 6) - 3
    return [x, y]
  })
  const linePoints = coords.map(([x, y]) => `${x},${y}`).join(' ')
  const areaPoints = `0,${h} ${linePoints} ${w},${h}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[64px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#sparkFill)" />
      <polyline points={linePoints} fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function MiniTicker() {
  return (
    <div className="h-7 bg-bg-primary border-b border-gold/12 overflow-hidden relative shrink-0">
      <div className="flex ticker-track w-max h-full items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-5 pl-5">
            {TICKER_ITEMS.map((item) => (
              <span key={`${copy}-${item.label}`} className="font-mono text-[10px] flex items-center gap-1.5 shrink-0 pr-5 border-r border-[rgba(30,70,140,0.25)] last:border-r-0">
                <span className="text-gold font-semibold">{item.label}</span>
                <span className={item.positive ? 'text-gain' : 'text-loss'}>{item.change}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function HeatmapPanel() {
  return (
    <div className="p-2.5 flex flex-col h-full">
      <div className="font-mono text-[8px] tracking-[0.1em] text-gold mb-1.5">SECTOR HEATMAP</div>
      <div className="grid grid-cols-3 gap-1">
        {HEATMAP.map((tile) => {
          const c = TONE_COLORS[tile.tone]
          return (
            <div
              key={tile.label}
              className="rounded-sm py-1.5 text-center font-mono text-[7px] font-bold leading-tight"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
            >
              {tile.label}
              <div className="opacity-90">{tile.change}</div>
            </div>
          )
        })}
      </div>
      <div className="font-mono text-[8px] tracking-[0.1em] text-gold mt-2.5 mb-1">TOP MOVERS</div>
      <div className="flex flex-col gap-1">
        {TOP_MOVERS.map((m) => (
          <div key={m.symbol} className="flex items-center justify-between font-mono text-[8px]">
            <span className={m.positive ? 'text-gain' : 'text-loss'}>{m.positive ? '▲' : '▼'} {m.symbol}</span>
            <span className={m.positive ? 'text-gain' : 'text-loss'}>{m.change}</span>
            <span className="text-text-faint">{m.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartPanel() {
  return (
    <div className="p-2.5 flex flex-col h-full justify-center items-center text-center">
      <div className="font-mono text-[8px] tracking-[0.1em] text-gold self-start mb-1">ASX 200 · 30D</div>
      <Sparkline />
      <div className="font-mono text-[13px] font-bold text-text-primary mt-2">8,247.3</div>
      <div className="font-mono text-[9px] text-gain mt-0.5">▲ +34.2 (+0.42%)</div>
    </div>
  )
}

function ChatPanel() {
  return (
    <div className="p-2.5 flex flex-col gap-2 h-full">
      <div className="font-mono text-[8px] tracking-[0.1em] text-gold flex items-center gap-1.5 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
        MADDENAI
      </div>
      <div className="font-mono text-[8px] text-text-muted">
        <span className="text-gold">USER</span> · What's driving BHP today?
      </div>
      <div className="font-mono text-[8px] text-text-primary leading-[1.6] flex-1">
        <span className="text-gold">MADDENAI</span> ·{' '}
        <TypewriterText
          strings={["BHP +1.27% on iron ore strength. Spot price at US$98/t, up 2.3% overnight on China stimulus hopes. Support at A$41.80..."]}
        />
        <span className="blink-cursor">▍</span>
      </div>
    </div>
  )
}

export default function AnimatedTerminalMockup() {
  return (
    <div className="relative">
      <span className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.1em] text-gold bg-bg-primary border border-gold/40 px-2.5 py-1 rounded-full">
        <span className="relative w-1.5 h-1.5">
          <span className="pulse-ring absolute inset-0" />
          <span className="absolute inset-0 rounded-full bg-gold" />
        </span>
        LIVE
      </span>

      <div
        className="bg-bg-primary border border-[rgba(201,168,76,0.4)] rounded overflow-hidden flex flex-col"
        style={{
          minHeight: 520,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(201,168,76,0.08), 0 0 40px rgba(201,168,76,0.05)',
        }}
      >
        <div className="flex items-center justify-between h-8 bg-bg-surface border-b border-gold/12 px-3 shrink-0">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[11px] font-bold text-gold">MADDEX</span>
            <span className="font-mono text-[10px] text-text-faint">TERMINAL</span>
          </div>
          <span className="font-mono text-[9px] text-text-faint">09:42 AEST</span>
        </div>

        <MiniTicker />

        <div className="grid grid-cols-3 divide-x divide-[rgba(30,70,140,0.25)] flex-1">
          <HeatmapPanel />
          <ChartPanel />
          <ChatPanel />
        </div>

        <div className="grid grid-cols-4 divide-x divide-[rgba(30,70,140,0.25)] border-t border-gold/12 bg-bg-surface shrink-0">
          {BOTTOM_STATS.map((s) => (
            <div key={s.label} className="px-2 py-2 text-center">
              <div className="font-mono text-[7px] text-text-faint tracking-wide">{s.label}</div>
              <div className={`font-mono text-[10px] font-bold mt-0.5 ${s.positive ? 'text-gain' : 'text-loss'}`}>
                {s.value} {s.positive ? '▲' : '▼'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
