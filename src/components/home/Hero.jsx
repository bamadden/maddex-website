import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ParticleCanvas from '../shared/ParticleCanvas'
import TerminalCard from '../shared/TerminalCard'
import AnimatedCounter from '../shared/AnimatedCounter'
import GoldButton from '../shared/GoldButton'
import TypewriterText from '../shared/TypewriterText'

function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Sydney',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
      setTime(`${formatted} AEST`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
      <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
      {time}
    </div>
  )
}

function TerminalDataRow({ symbol, price, change, positive, status, flashed }) {
  return (
    <div
      className="grid items-center py-1 px-1 rounded-sm transition-colors duration-300"
      style={{
        gridTemplateColumns: '80px 90px 80px 1fr',
        background: flashed ? 'rgba(201,168,76,0.08)' : 'transparent',
      }}
    >
      <span className="font-mono text-[11px] text-text-muted">{symbol}</span>
      <span className="font-mono text-[11px] text-text-primary text-right">{price}</span>
      <span className={`font-mono text-[11px] text-right ${positive ? 'text-gain' : 'text-loss'}`}>
        {positive ? '▲' : '▼'} {change}
      </span>
      <span
        className={`font-mono text-[9px] text-right ${
          status === 'LIVE' ? 'text-gold blink-dot' : 'text-text-muted'
        }`}
      >
        {status}
      </span>
    </div>
  )
}

const INITIAL_ROWS = [
  { symbol: 'ASX 200', price: 8412.4, change: '+0.42%', positive: true, status: 'LIVE' },
  { symbol: 'BHP.AX', price: 43.82, change: '+0.85%', positive: true, status: 'LIVE' },
  { symbol: 'BTC/AUD', price: 162400, change: '+1.80%', positive: true, status: '09:42' },
  { symbol: 'AUD/USD', price: 0.6452, change: '-0.12%', positive: false, status: '09:42' },
  { symbol: 'CBA.AX', price: 164.2, change: '+0.31%', positive: true, status: 'LIVE' },
]

const SECTOR_TILES = [
  { label: 'IT', change: '+1.8%', positive: true },
  { label: 'MAT', change: '+0.9%', positive: true },
  { label: 'ENRG', change: '-0.4%', positive: false },
  { label: 'FIN', change: '+0.3%', positive: true },
]

export default function Hero() {
  const [rows, setRows] = useState(INITIAL_ROWS)
  const [flashIdx, setFlashIdx] = useState(null)

  useEffect(() => {
    const id = setInterval(() => {
      const idx = Math.floor(Math.random() * INITIAL_ROWS.length)
      setFlashIdx(idx)
      setRows((prev) =>
        prev.map((row, i) => {
          if (i !== idx) return row
          const delta = row.price * (Math.random() * 0.004 - 0.002)
          return { ...row, price: row.price + delta }
        })
      )
      setTimeout(() => setFlashIdx(null), 400)
    }, 8000)
    return () => clearInterval(id)
  }, [])

  function formatPrice(row) {
    if (row.symbol === 'BTC/AUD') return `A$${row.price.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`
    if (row.symbol === 'AUD/USD') return row.price.toFixed(4)
    return row.price.toFixed(2)
  }

  return (
    <section className="relative min-h-screen bg-bg-primary overflow-hidden">
      <ParticleCanvas />

      <div
        className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center"
        style={{ minHeight: 'calc(100vh - 88px)', paddingTop: 88 }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 120 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="h-px bg-gold/50 mb-5"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="font-mono text-[9px] tracking-[0.25em] text-gold mb-6"
          >
            AUSTRALIAN FINANCIAL INTELLIGENCE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-sans text-[44px] sm:text-[60px] lg:text-[80px] font-bold leading-[0.95] tracking-[-0.03em] text-text-primary"
          >
            The terminal
            <br />
            serious investors
            <br />
            have been waiting for.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="font-sans text-[18px] text-text-muted leading-[1.75] max-w-[460px] mt-6"
          >
            Maddex delivers institutional-grade financial intelligence to Australian investors at a fraction of Bloomberg's cost. Real-time data. MaddenAI analysis. Global intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex items-center gap-4 mt-9 flex-wrap"
          >
            <GoldButton to="/pricing">START FREE TRIAL</GoldButton>
            <GoldButton to="/product" variant="ghost" className="!border-0 !bg-transparent !px-0 text-gold opacity-70 hover:opacity-100">
              SEE THE TERMINAL →
            </GoldButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="font-mono text-[10px] text-text-faint mt-6 tracking-wide"
          >
            7-DAY FREE TRIAL · NO CREDIT CARD REQUIRED · FULL PRO ACCESS
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex items-center mt-12 divide-x divide-[rgba(30,70,140,0.3)]"
          >
            <div className="pr-8">
              <AnimatedCounter to={19} prefix="A$" suffix="/mo" label="Starting price" />
            </div>
            <div className="px-8">
              <AnimatedCounter to={7} label="Intelligence modules" />
            </div>
            <div className="pl-8">
              <AnimatedCounter to={200} suffix="+" label="Countries covered" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="hidden lg:block relative"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ opacity: { delay: 1.5, duration: 0.5 }, y: { delay: 1.5, duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute -top-6 -left-10 z-20 bg-bg-primary border border-gold/30 rounded px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            style={{ willChange: 'transform' }}
          >
            <div className="font-mono text-[8px] tracking-[0.15em] text-gold">MADDENAI</div>
            <div className="font-mono text-[12px] font-bold text-text-primary mt-0.5">72/100 <span className="text-gold">BULLISH</span></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ opacity: { delay: 1.65, duration: 0.5 }, y: { delay: 1.65, duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute -bottom-9 -left-14 z-20 bg-bg-primary border border-gold/30 rounded px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            style={{ willChange: 'transform' }}
          >
            <div className="font-mono text-[8px] tracking-[0.15em] text-text-muted">ASX 200</div>
            <div className="font-mono text-[12px] font-bold text-gain mt-0.5">▲ +0.42%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -7, 0] }}
            transition={{ opacity: { delay: 1.8, duration: 0.5 }, y: { delay: 1.8, duration: 5.5, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute -top-6 -right-8 z-20 bg-bg-primary border border-gold/30 rounded px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            style={{ willChange: 'transform' }}
          >
            <div className="font-mono text-[8px] tracking-[0.15em] text-text-muted">BTC/AUD</div>
            <div className="font-mono text-[12px] font-bold text-gain mt-0.5">A$162,400 ▲</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TerminalCard className="shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_80px_rgba(201,168,76,0.08),0_0_160px_rgba(201,168,76,0.04)]">
              <div className="flex items-center justify-between h-8 bg-bg-primary border-b border-gold/12 px-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-[11px] font-bold text-gold">MADDEX</span>
                  <span className="font-mono text-[11px] text-text-faint">FINANCIAL INTELLIGENCE</span>
                </div>
                <LiveClock />
              </div>

              <div className="bg-gold/5 border-b border-gold/12 px-3 py-1.5 flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-wide text-text-muted">MADDENAI SENTIMENT</span>
                <span className="font-mono text-[14px] font-bold text-gold">72/100</span>
                <span className="font-mono text-[10px] text-text-primary">NEUTRAL-BULLISH</span>
                <div className="ml-auto relative w-[100px] h-1 rounded-full" style={{ background: 'linear-gradient(to right, #A83232, #C9A84C, #2D8A50)' }}>
                  <div className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-white" style={{ left: '72%' }} />
                </div>
              </div>

              <div className="p-3 flex flex-col gap-1.5">
                {rows.map((row, i) => (
                  <TerminalDataRow
                    key={row.symbol}
                    symbol={row.symbol}
                    price={formatPrice(row)}
                    change={row.change}
                    positive={row.positive}
                    status={row.status}
                    flashed={flashIdx === i}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1 px-3 pb-3">
                {SECTOR_TILES.map((tile) => (
                  <div
                    key={tile.label}
                    className="px-2 py-1.5 rounded-sm font-mono text-[10px] font-bold"
                    style={{
                      background: tile.positive ? 'rgba(45,138,80,0.12)' : 'rgba(168,50,50,0.12)',
                      border: `1px solid ${tile.positive ? 'rgba(45,138,80,0.25)' : 'rgba(168,50,50,0.25)'}`,
                      color: tile.positive ? '#2D8A50' : '#A83232',
                    }}
                  >
                    {tile.label} {tile.change}
                  </div>
                ))}
              </div>

              <div className="border-t border-gold/12 bg-bg-primary px-3 py-2 flex items-center gap-2">
                <span className="font-mono text-[12px] font-bold text-gold">CMD&gt;</span>
                <span className="font-mono text-[12px] text-text-primary">
                  <TypewriterText strings={['BHP.AX', 'MACRO', 'What is the RBA outlook?']} />
                  <span className="blink-cursor">▍</span>
                </span>
              </div>
            </TerminalCard>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 2, delay: 3 }}
        className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center hidden md:flex"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] text-text-faint mb-2">SCROLL</span>
        <div className="w-px h-10 bg-gold/30 mb-2" />
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="font-mono text-[12px] text-gold"
        >
          ▼
        </motion.span>
      </motion.div>
    </section>
  )
}
