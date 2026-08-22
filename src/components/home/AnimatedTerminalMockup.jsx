import TypewriterText from '../shared/TypewriterText'

const TICKER_ITEMS = [
  { label: 'ASX 200', change: '▲0.42%', positive: true },
  { label: 'BHP', change: '▲1.27% A$43.21', positive: true },
  { label: 'CBA', change: '▼0.72% A$168.45', positive: false },
  { label: 'XRP', change: '▲0.90% A$1.57', positive: true },
  { label: 'NVDA', change: '▲2.85% US$138.42', positive: true },
]

const HEATMAP = [
  { label: 'IT', change: '+1.8%', positive: true },
  { label: 'FIN', change: '+0.3%', positive: true },
  { label: 'HLTH', change: '+1.1%', positive: true },
  { label: 'CDI', change: '-0.2%', positive: false },
  { label: 'ENRG', change: '-0.4%', positive: false },
  { label: 'MAT', change: '+0.9%', positive: true },
  { label: 'IND', change: '+0.5%', positive: true },
  { label: 'STA', change: '-0.1%', positive: false },
]

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

function Heatmap() {
  return (
    <div className="grid grid-cols-4 gap-1.5 p-3">
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
          <div className="opacity-80">{tile.change}</div>
        </div>
      ))}
    </div>
  )
}

function ChatPanel() {
  return (
    <div className="flex flex-col gap-2.5 p-3 flex-1">
      <div className="font-mono text-[9px] text-text-muted">
        <span className="text-gold">USER</span> · What's driving BHP today?
      </div>
      <div className="font-mono text-[10px] text-text-primary leading-[1.6] min-h-[54px]">
        <span className="text-gold">MADDENAI</span> ·{' '}
        <TypewriterText
          strings={["BHP is up 1.27% on the session, supported by iron ore strength and steady Chinese demand data."]}
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

        <div className="px-3 pt-3">
          <div className="font-mono text-[9px] tracking-[0.15em] text-gold">SECTOR HEATMAP</div>
        </div>
        <Heatmap />

        <div className="mx-3 h-px bg-[rgba(30,70,140,0.25)]" />

        <div className="px-3 pt-3">
          <div className="font-mono text-[9px] tracking-[0.15em] text-gold">MADDENAI CHAT</div>
        </div>
        <ChatPanel />
      </div>
    </div>
  )
}
