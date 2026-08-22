import { useEffect, useState } from 'react'

const TICKER_ITEMS = [
  { label: 'ASX 200', value: '8,247.3', positive: true },
  { label: 'BHP', value: 'A$43.21', positive: true },
  { label: 'CBA', value: 'A$168.45', positive: false },
  { label: 'S&P 500', value: '5,842.3', positive: true },
  { label: 'NVDA', value: 'US$138.42', positive: true },
  { label: 'XRP', value: 'A$1.57', positive: true },
  { label: 'BTC', value: 'A$92,285', positive: true },
  { label: 'Gold', value: 'US$2,487', positive: true },
]

const STAT_BOXES = [
  { label: 'ASX 200', value: '8,247.3', change: '▲ +34.2  +0.42%', positive: true },
  { label: 'BHP · ASX', value: 'A$43.21', change: '▲ +0.54  +1.27%', positive: true },
  { label: 'Bitcoin · Crypto', value: 'A$92,285', change: '▲ +0.52%', positive: true },
]

const SECTORS = [
  { label: 'Materials', change: '+1.8%', bg: 'rgba(45,138,80,0.5)' },
  { label: 'Financials', change: '+0.4%', bg: 'rgba(45,138,80,0.25)' },
  { label: 'Tech', change: '-0.6%', bg: 'rgba(168,50,50,0.3)' },
  { label: 'Energy', change: '+2.1%', bg: 'rgba(45,138,80,0.7)' },
  { label: 'Health', change: '+0.2%', bg: 'rgba(45,138,80,0.15)' },
  { label: 'Consumer', change: '-1.1%', bg: 'rgba(168,50,50,0.4)' },
  { label: 'Real Est.', change: '-0.3%', bg: 'rgba(168,50,50,0.2)' },
  { label: 'Industrl.', change: '+0.9%', bg: 'rgba(45,138,80,0.35)' },
]

const BOTTOM_STATS = [
  { label: 'AUD/USD', value: '0.6520', positive: true },
  { label: 'Gold', value: 'US$2,487', positive: true },
  { label: 'Oil', value: 'US$78.42', positive: false },
  { label: 'AU 10Y', value: '4.42%', positive: true },
]

const RESPONSE_TEXT =
  "BHP +1.27% on iron ore strength. Spot at US$98/t, up 2.3% on China stimulus hopes..."

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

function TickerBar() {
  return (
    <div className="h-8 bg-black/30 border-b border-[rgba(201,168,76,0.08)] overflow-hidden shrink-0">
      <div className="flex ticker-track-hero w-max h-full items-center gap-6 font-mono text-[9px]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-6 pl-6">
            {TICKER_ITEMS.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-1.5 shrink-0 text-text-muted">
                <span>{item.label}</span>
                <span className={item.positive ? 'text-gain' : 'text-loss'}>{item.positive ? '▲' : '▼'}</span>
                <span className="text-text-primary">{item.value}</span>
                <span className="text-gold ml-4">··</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function StatBoxes() {
  return (
    <div className="flex flex-col gap-2">
      {STAT_BOXES.map((box) => (
        <div key={box.label} className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-2">
          <div className="font-mono text-[8px] text-text-muted">{box.label}</div>
          <div className="font-mono text-[16px] font-semibold text-white mt-0.5">{box.value}</div>
          <div className={`font-mono text-[9px] mt-0.5 ${box.positive ? 'text-gain' : 'text-loss'}`}>{box.change}</div>
        </div>
      ))}
    </div>
  )
}

function SectorGrid() {
  return (
    <div className="grid grid-cols-4 gap-1 mt-2">
      {SECTORS.map((s) => (
        <div key={s.label} className="h-5 flex flex-col items-center justify-center rounded-sm" style={{ background: s.bg }}>
          <span className="font-mono text-[7px] text-white/90 leading-none">{s.label}</span>
          <span className="font-mono text-[7px] text-white/90 leading-none mt-0.5">{s.change}</span>
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
          className="w-1 h-1 rounded-full bg-gold inline-block typing-dot-fade"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  )
}

function ChatPreview() {
  const { display, isTyping } = useTypewriter(RESPONSE_TEXT)

  return (
    <div className="p-2 border-l border-white/[0.06] flex flex-col">
      <div className="font-mono text-[9px] text-gold mb-2 pb-1 border-b border-[rgba(201,168,76,0.1)] flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-[7px] font-bold">M</span>
        MADDENAI
      </div>

      <div className="mb-2 clear-both">
        <div className="float-right max-w-[90%] bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] rounded-sm p-2">
          <span className="font-mono text-[9px] text-white">What's driving BHP today?</span>
        </div>
      </div>

      <div className="clear-both font-mono text-[9px] text-[#B8C8D8] leading-[1.5]">
        {display}
        {isTyping && <TypingDots />}
      </div>
    </div>
  )
}

export default function AnimatedTerminalMockup() {
  return (
    <div
      className="max-w-[640px] w-full bg-bg-surface overflow-hidden"
      style={{
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: 6,
        boxShadow: '0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(201,168,76,0.04)',
      }}
    >
      <div className="h-9 bg-bg-primary border-b border-[rgba(201,168,76,0.1)] flex items-center relative shrink-0">
        <div className="flex items-center gap-2 ml-3">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28ca41' }} />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-text-muted">
          MADDEX TERMINAL
        </span>
      </div>

      <TickerBar />

      <div className="grid grid-cols-2">
        <div className="p-3">
          <StatBoxes />
          <SectorGrid />
        </div>
        <ChatPreview />
      </div>

      <div className="h-7 bg-black/30 border-t border-[rgba(201,168,76,0.08)] flex items-center justify-around shrink-0">
        {BOTTOM_STATS.map((s) => (
          <span key={s.label} className="font-mono text-[8px]">
            <span className="text-text-muted">{s.label} </span>
            <span className="text-white">{s.value}</span>{' '}
            <span className={s.positive ? 'text-gain' : 'text-loss'}>{s.positive ? '▲' : '▼'}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
