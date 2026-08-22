import TypewriterText from '../shared/TypewriterText'

const TICKER_ITEMS = [
  'ASX 200 ▲0.42% 8,247',
  'BHP ▲1.27% A$43.21',
  'CBA ▼0.72% A$168.45',
  'S&P 500 ▲0.32% 5,842',
  'NVDA ▲2.85% US$138.42',
  'XRP ▲0.90% A$1.57',
  'BTC ▲0.52% A$92,285',
  'Gold ▲0.8% US$2,487',
]

const INDEX_CARDS = [
  { label: 'ASX 200', value: '8,247', change: '+0.42%', positive: true },
  { label: 'S&P 500', value: '5,842', change: '+0.32%', positive: true },
  { label: 'BTC', value: 'A$92.3K', change: '+0.52%', positive: true },
]

const HEATMAP = [
  { label: 'MATERIALS', change: '+1.8%', positive: true, bg: 'rgba(45,138,80,0.4)' },
  { label: 'FINANCIALS', change: '+0.4%', positive: true, bg: 'rgba(45,138,80,0.2)' },
  { label: 'TECH', change: '-0.6%', positive: false, bg: 'rgba(168,50,50,0.2)' },
  { label: 'ENERGY', change: '+2.1%', positive: true, bg: 'rgba(45,138,80,0.6)' },
  { label: 'HEALTHCARE', change: '+0.2%', positive: true, bg: 'rgba(45,138,80,0.1)' },
  { label: 'CONSUMER', change: '-1.1%', positive: false, bg: 'rgba(168,50,50,0.3)' },
  { label: 'REAL EST.', change: '-0.3%', positive: false, bg: 'rgba(168,50,50,0.15)' },
  { label: 'INDUSTRIALS', change: '+0.9%', positive: true, bg: 'rgba(45,138,80,0.25)' },
]

const BOTTOM_STATS = [
  { label: 'AUD/USD', value: '0.6520', positive: true },
  { label: 'GOLD', value: 'US$2,487', positive: true },
  { label: 'OIL', value: 'US$78.42', positive: false },
  { label: 'AU 10Y', value: '4.42%', positive: true },
]

function Ticker() {
  return (
    <div className="h-8 bg-bg-surface border-b border-gold/12 overflow-hidden relative shrink-0">
      <div className="flex ticker-track-fast w-max h-full items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center pl-4">
            {TICKER_ITEMS.map((item, i) => (
              <span key={`${copy}-${i}`} className="font-mono text-[9px] text-text-muted flex items-center shrink-0">
                {item.split(/(▲|▼)/).map((part, pi) =>
                  part === '▲' ? (
                    <span key={pi} className="text-gain">▲</span>
                  ) : part === '▼' ? (
                    <span key={pi} className="text-loss">▼</span>
                  ) : (
                    <span key={pi}>{part}</span>
                  )
                )}
                <span className="text-gold mx-3">··</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function IndexCards() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {INDEX_CARDS.map((c) => (
        <div key={c.label} className="bg-bg-surface border border-[rgba(201,168,76,0.15)] rounded-sm px-2 py-2 text-center">
          <div className="font-mono text-[8px] text-text-muted">{c.label}</div>
          <div className="font-mono text-[14px] font-bold text-text-primary mt-1">{c.value}</div>
          <div className={`font-mono text-[9px] mt-0.5 ${c.positive ? 'text-gain' : 'text-loss'}`}>
            {c.positive ? '▲' : '▼'} {c.change}
          </div>
        </div>
      ))}
    </div>
  )
}

function Heatmap() {
  return (
    <div className="grid grid-cols-2 gap-0.5 mt-1.5">
      {HEATMAP.map((tile) => (
        <div key={tile.label} className="px-2 py-1.5 flex items-center justify-between" style={{ background: tile.bg }}>
          <span className="font-mono text-[8px] text-text-muted">{tile.label}</span>
          <span className={`font-mono text-[11px] font-bold ${tile.positive ? 'text-gain' : 'text-loss'}`}>{tile.change}</span>
        </div>
      ))}
    </div>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-0.5 ml-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-gold inline-block pulse-dot-slow"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  )
}

function ChatPanel() {
  return (
    <div className="bg-bg-surface border border-[rgba(201,168,76,0.15)] rounded-sm h-full flex flex-col">
      <div className="px-3 py-2 border-b border-[rgba(201,168,76,0.15)] font-mono text-[9px] text-gold flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-[7px] font-bold">M</span>
        MADDENAI
      </div>
      <div className="p-3 flex-1 flex flex-col gap-3">
        <div className="flex justify-end">
          <div className="bg-[rgba(201,168,76,0.1)] border border-gold/20 rounded-sm px-2.5 py-1.5 max-w-[85%]">
            <div className="font-mono text-[8px] text-gold mb-0.5 text-right">YOU</div>
            <div className="font-mono text-[10px] text-text-primary text-right">What's driving BHP?</div>
          </div>
        </div>
        <div>
          <div className="font-mono text-[8px] text-gold mb-0.5">MADDENAI</div>
          <div className="font-mono text-[10px] text-text-primary leading-[1.6]">
            <TypewriterText strings={["BHP +1.27% on iron ore strength. Spot at US$98/t, up 2.3% overnight on China stimulus hopes."]} />
            <TypingDots />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnimatedTerminalMockup() {
  return (
    <div
      className="bg-bg-primary border border-[rgba(201,168,76,0.35)] overflow-hidden flex flex-col"
      style={{
        borderRadius: 4,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(201,168,76,0.08)',
      }}
    >
      <div className="h-9 bg-bg-surface border-b border-gold/12 flex items-center px-3 relative shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#A83232' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#C9A84C' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#2D8A50' }} />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.15em] text-text-muted">
          MADDEX TERMINAL
        </span>
      </div>

      <Ticker />

      <div className="grid grid-cols-[55%_45%] gap-2.5 p-2.5 flex-1">
        <div>
          <IndexCards />
          <Heatmap />
        </div>
        <ChatPanel />
      </div>

      <div className="grid grid-cols-4 divide-x divide-[rgba(30,70,140,0.25)] border-t border-gold/12 bg-bg-surface shrink-0" style={{ height: 44 }}>
        {BOTTOM_STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center">
            <span className="font-mono text-[9px] text-text-muted">{s.label}</span>
            <span className={`font-mono text-[9px] font-bold mt-0.5 ${s.positive ? 'text-gain' : 'text-loss'}`}>
              {s.value} {s.positive ? '▲' : '▼'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
