import { useEffect, useState } from 'react'

const TICKER_ITEMS = [
  { label: 'ASX 200', pct: '▲0.42%', value: '8,247', positive: true },
  { label: 'BHP', pct: '▲1.27%', value: 'A$43.21', positive: true },
  { label: 'CBA', pct: '▼0.72%', value: 'A$168.45', positive: false },
  { label: 'S&P 500', pct: '▲0.32%', value: '5,842', positive: true },
  { label: 'NVDA', pct: '▲2.85%', value: 'US$138.42', positive: true },
  { label: 'XRP', pct: '▲0.90%', value: 'A$1.57', positive: true },
  { label: 'BTC', pct: '▲0.52%', value: 'A$92,285', positive: true },
  { label: 'Gold', pct: '▲0.8%', value: 'US$2,487', positive: true },
]

const INDEX_CARDS = [
  { label: 'ASX 200', value: '8,247.3', change: '▲ +0.42%', positive: true },
  { label: 'S&P 500', value: '5,842.3', change: '▲ +0.32%', positive: true },
  { label: 'BTC/AUD', value: 'A$92,285', change: '▲ +0.52%', positive: true },
]

const SECTORS = [
  { label: 'Materials', change: '+1.8%', positive: true },
  { label: 'Financials', change: '+0.4%', positive: true },
  { label: 'Tech', change: '-0.6%', positive: false },
  { label: 'Energy', change: '+2.1%', positive: true },
  { label: 'Health', change: '+0.2%', positive: true },
  { label: 'Consumer', change: '-1.1%', positive: false },
  { label: 'Real Est', change: '-0.3%', positive: false },
  { label: 'Industrl', change: '+0.9%', positive: true },
]

const BOTTOM_STATS = [
  { label: 'GOLD', value: 'US$2,487', positive: true },
  { label: 'OIL', value: 'US$78.42', positive: false },
  { label: 'AU 10Y', value: '4.42%', positive: true },
  { label: 'VIX', value: '18.4', positive: false },
]

const RESPONSE_TEXT =
  'BHP +1.27% on strong iron ore data. Spot price at US$98/t, up 2.3% on China stimulus hopes. Key support at A$41.80...'

function useTypewriter(text, typeSpeed = 40, pauseMs = 3000) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) {
      const timeout = setTimeout(() => {
        setIndex(0)
        setPaused(false)
      }, pauseMs)
      return () => clearTimeout(timeout)
    }

    const interval = setInterval(() => {
      setIndex((i) => {
        if (i >= text.length) {
          clearInterval(interval)
          setPaused(true)
          return i
        }
        return i + 1
      })
    }, typeSpeed)

    return () => clearInterval(interval)
  }, [paused, text, typeSpeed, pauseMs])

  return { display: text.slice(0, index), isTyping: !paused && index < text.length }
}

function WindowBar() {
  return (
    <div className="h-10 bg-[#040C18] border-b border-white/[0.06] flex items-center justify-between px-3 relative shrink-0">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28ca41' }} />
      </div>
      <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.15em] text-[#4A6080]">
        MADDEX TERMINAL
      </span>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-gold blink-dot" />
        <span className="font-mono text-[9px] tracking-[0.1em] text-gold">LIVE</span>
      </div>
    </div>
  )
}

function TickerTape() {
  return (
    <div className="h-9 bg-black/40 border-b border-white/[0.04] overflow-hidden shrink-0">
      <div className="flex ticker-track-20s w-max h-full items-center font-mono text-[10px]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center pl-6">
            {TICKER_ITEMS.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-1.5 shrink-0 text-text-muted">
                <span>{item.label}</span>
                <span className={item.positive ? 'text-gain' : 'text-loss'}>{item.pct}</span>
                <span className="text-text-primary">{item.value}</span>
                <span className="text-gold mx-4">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function MarketsColumn() {
  return (
    <div className="p-4 border-r border-white/[0.06] flex flex-col overflow-hidden">
      <div className="font-mono text-[8px] tracking-[0.15em] text-gold mb-2">MARKETS</div>

      <div className="flex flex-col gap-1">
        {INDEX_CARDS.map((c) => (
          <div key={c.label} className="bg-white/[0.04] border border-white/[0.08] rounded-[3px] py-1.5 px-3">
            <div className="font-mono text-[9px] leading-tight text-text-muted">{c.label}</div>
            <div className="font-mono text-[18px] leading-none font-semibold text-white mt-1">{c.value}</div>
            <div className={`font-mono text-[10px] leading-tight mt-1 ${c.positive ? 'text-gain' : 'text-loss'}`}>{c.change}</div>
          </div>
        ))}
      </div>

      <div className="font-mono text-[8px] tracking-[0.15em] text-gold mt-2 mb-1.5">SECTORS</div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
        {SECTORS.map((s) => (
          <div key={s.label} className="flex-1 py-0.5 text-center">
            <div className="font-mono text-[7px] text-text-muted leading-tight">{s.label}</div>
            <div className={`font-mono text-[9px] font-bold leading-none mt-0.5 ${s.positive ? 'text-gain' : 'text-loss'}`}>
              {s.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-0.5 ml-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-gold inline-block typing-dot-fade"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  )
}

function MaddenAIColumn() {
  const { display, isTyping } = useTypewriter(RESPONSE_TEXT)

  return (
    <div className="p-4 border-r border-white/[0.06] flex flex-col overflow-hidden">
      <div className="font-mono text-[8px] tracking-[0.15em] text-gold mb-3">MADDENAI</div>

      <div className="flex-1">
        <div className="mb-3 clear-both">
          <div
            className="float-right max-w-[85%] bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] px-2.5 py-2"
            style={{ borderRadius: '3px 3px 0 3px' }}
          >
            <span className="font-mono text-[10px] text-white">What's driving BHP today?</span>
          </div>
        </div>

        <div className="clear-both font-mono text-[10px] text-[#B8C8D8] leading-[1.6] px-2.5 py-2">
          {display}
          {isTyping && <TypingDots />}
        </div>
      </div>
    </div>
  )
}

function IntelligenceColumn() {
  return (
    <div className="p-4 flex flex-col overflow-hidden">
      <div className="font-mono text-[8px] tracking-[0.15em] text-gold mb-3">INTELLIGENCE</div>

      <div className="bg-white/[0.04] border border-white/[0.08] rounded-[3px] py-2.5 px-3 mb-2">
        <div className="font-mono text-[9px] text-text-muted">AUD/USD</div>
        <div className="font-mono text-[18px] font-semibold text-white mt-0.5">0.6520</div>
        <div className="font-mono text-[10px] text-gain mt-0.5">▲ +0.18%</div>
      </div>

      <div className="bg-white/[0.04] border border-white/[0.08] rounded-[3px] py-2.5 px-3 mb-2">
        <div className="font-mono text-[9px] text-text-muted">RBA CASH RATE</div>
        <div className="font-mono text-[18px] font-semibold text-white mt-0.5">4.35%</div>
        <div className="font-mono text-[9px] text-gold mt-0.5">HOLD · Next: 16 Sep</div>
      </div>

      <div className="py-2 px-2.5 mb-2" style={{ background: 'rgba(168,50,50,0.08)', borderLeft: '3px solid #A83232' }}>
        <div className="font-mono text-[7px] tracking-[0.1em]" style={{ color: '#A83232' }}>GLOBAL RISK</div>
        <div className="font-mono text-[9px] text-text-muted mt-0.5">Middle East tensions easing</div>
      </div>

      <div className="py-2 px-2.5" style={{ background: 'rgba(45,138,80,0.08)', borderLeft: '3px solid #2D8A50' }}>
        <div className="font-mono text-[7px] tracking-[0.1em]" style={{ color: '#2D8A50' }}>AI SUPERCYCLE</div>
        <div className="font-mono text-[9px] text-text-muted mt-0.5">NVDA +18% earnings beat</div>
      </div>
    </div>
  )
}

export default function AnimatedTerminalMockup() {
  return (
    <div
      className="w-full max-w-[1000px] mx-auto bg-bg-primary overflow-hidden"
      style={{
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 8,
        boxShadow:
          '0 0 0 1px rgba(201,168,76,0.05), 0 20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(201,168,76,0.03)',
      }}
    >
      <WindowBar />
      <TickerTape />

      <div className="grid grid-cols-3 h-[380px]">
        <MarketsColumn />
        <MaddenAIColumn />
        <IntelligenceColumn />
      </div>

      <div className="h-9 bg-black/30 border-t border-white/[0.04] flex items-center justify-around px-4 shrink-0">
        {BOTTOM_STATS.map((s) => (
          <span key={s.label} className="font-mono text-[8px]">
            <span className="text-text-muted">{s.label} </span>
            <span className="text-white text-[10px]">{s.value}</span>{' '}
            <span className={s.positive ? 'text-gain' : 'text-loss'}>{s.positive ? '▲' : '▼'}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
