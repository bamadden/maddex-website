import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

function Sparkline({ points, color = '#C9A84C' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const coords = points
    .map((p, i) => `${(i / (points.length - 1)) * 80},${30 - ((p - min) / range) * 28 - 1}`)
    .join(' ')
  return (
    <svg ref={ref} width="80" height="30" viewBox="0 0 80 30">
      <motion.polyline
        points={coords}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </svg>
  )
}

function genSpark(trendUp = true) {
  let val = 50
  return Array.from({ length: 10 }, () => {
    val += trendUp ? Math.random() * 8 - 2 : Math.random() * 8 - 6
    return val
  })
}

function FadeNumber({ value, className }) {
  return (
    <span className={`relative inline-grid ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="[grid-area:1/1]"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function LivePulseSection() {
  const [asx, setAsx] = useState(8412.4)
  const [btc, setBtc] = useState(162400)
  const [aud, setAud] = useState(0.6452)
  const [gold, setGoldPrice] = useState(4821)
  const [secondsAgo, setSecondsAgo] = useState(0)
  const [sparks] = useState({
    asx: genSpark(true),
    btc: genSpark(true),
    aud: genSpark(false),
    gold: genSpark(true),
  })

  useEffect(() => {
    const id = setInterval(() => {
      setAsx((v) => v + (Math.random() * 4 - 2))
      setBtc((v) => v + (Math.random() * 200 - 100))
      setAud((v) => v + (Math.random() * 0.001 - 0.0005))
      setGoldPrice((v) => v + (Math.random() * 6 - 3))
      setSecondsAgo(0)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSecondsAgo((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const dots = Array.from({ length: 22 }, (_, i) => i < 18)

  return (
    <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionLabel center>LIVE MARKET PULSE</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary">
          Markets don't sleep. Neither does Maddex.
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="relative w-2 h-2">
            <span className="pulse-ring absolute inset-0" />
            <span className="absolute inset-0 rounded-full bg-gold" />
          </span>
          <p className="font-sans text-[18px] text-text-muted leading-[1.75]">
            Data updates every 60 seconds. Powered by MaddenAI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[1000px] mx-auto mt-14 text-left">
          <div className="bg-bg-primary border border-gold/15 rounded p-6">
            <div className="font-mono text-[9px] text-gold">MADDENAI SENTIMENT</div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-mono text-[48px] font-bold text-gold leading-none">72</span>
              <span className="font-sans text-[18px] text-text-primary">/100</span>
            </div>
            <div className="font-sans text-[11px] text-text-primary mt-1">NEUTRAL-BULLISH</div>
            <div className="w-full h-1.5 rounded-full mt-4" style={{ background: 'linear-gradient(to right, #A83232, #C9A84C, #2D8A50)' }} />
          </div>

          <div className="bg-bg-primary border border-gold/15 rounded p-6">
            <div className="font-mono text-[9px] text-gold">ASX 200</div>
            <FadeNumber value={asx.toFixed(2)} className="font-mono text-[28px] font-bold text-text-primary mt-2" />
            <div className="font-mono text-[14px] text-gain mt-1">▲ +0.42%</div>
            <div className="mt-3"><Sparkline points={sparks.asx} /></div>
          </div>

          <div className="bg-bg-primary border border-gold/15 rounded p-6">
            <div className="font-mono text-[9px] text-gold">BTC/AUD</div>
            <FadeNumber value={`A$${btc.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`} className="font-mono text-[28px] font-bold text-text-primary mt-2" />
            <div className="font-mono text-[14px] text-gain mt-1">▲ +1.80%</div>
            <div className="mt-3"><Sparkline points={sparks.btc} /></div>
          </div>

          <div className="bg-bg-primary border border-gold/15 rounded p-6">
            <div className="font-mono text-[9px] text-gold">AUD/USD</div>
            <FadeNumber value={aud.toFixed(4)} className="font-mono text-[28px] font-bold text-text-primary mt-2" />
            <div className="font-mono text-[14px] text-loss mt-1">▼ -0.12%</div>
            <div className="mt-3"><Sparkline points={sparks.aud} color="#A83232" /></div>
          </div>

          <div className="bg-bg-primary border border-gold/15 rounded p-6">
            <div className="font-mono text-[9px] text-gold">GOLD AUD</div>
            <FadeNumber value={`A$${gold.toFixed(0)}`} className="font-mono text-[28px] font-bold text-text-primary mt-2" />
            <div className="font-mono text-[14px] text-gain mt-1">▲ +0.30%</div>
            <div className="mt-3"><Sparkline points={sparks.gold} /></div>
          </div>

          <div className="bg-bg-primary border border-gold/15 rounded p-6">
            <div className="font-mono text-[9px] text-gold">GLOBAL MARKETS</div>
            <div className="font-mono text-[28px] font-bold text-text-primary mt-2">18/22 OPEN</div>
            <div className="grid grid-cols-11 gap-1 mt-3">
              {dots.map((open, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-gold' : 'bg-gold/15'}`} />
              ))}
            </div>
            <div className="font-sans text-[10px] text-text-muted mt-2">MARKETS ACTIVE</div>
          </div>
        </div>

        <div className="font-mono text-[10px] text-text-faint mt-6">
          LAST UPDATED {secondsAgo === 0 ? 'JUST NOW' : `${secondsAgo}S AGO`}
        </div>
      </div>
    </section>
  )
}
