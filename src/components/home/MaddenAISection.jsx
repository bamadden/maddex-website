import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from '../shared/SectionLabel'
import GoldButton from '../shared/GoldButton'

const CARDS = [
  {
    title: 'Market Sentiment Score',
    body: 'An 8-factor weighted composite producing a 0-100 reading of market conditions. Updated every 60 seconds.',
    footer: 'ASX Breadth · Global Momentum · Volatility · Commodities',
  },
  {
    title: 'Asset Analysis On Demand',
    body: 'Type any ticker. Structured analysis in seconds — scores, levels, drivers, outlook, risk.',
    footer: 'Any stock, crypto, FX pair, or index',
  },
  {
    title: 'MaddenAI Research Notes',
    body: 'Institutional-quality PDF research for any ASX or US stock.',
    footer: 'From A$4.99 · Unlimited in Apex tier',
  },
]

const SCORES = [
  { label: 'Overall', value: 71, tag: 'BULLISH', color: '#C9A84C' },
  { label: 'Momentum', value: 68, tag: '', color: '#C9A84C' },
  { label: 'Volume', value: 74, tag: '', color: '#C9A84C' },
  { label: 'Macro Alignment', value: 69, tag: '', color: '#C9A84C' },
  { label: 'Risk', value: 42, tag: '', color: '#A83232' },
]

function ScoreItem({ value, color }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  const [shimmer, setShimmer] = useState(false)

  useEffect(() => {
    if (!inView) return
    const duration = 900
    const start = performance.now()
    let raf
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(value * progress))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setShimmer(true)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <>
      <span ref={ref} className="text-gold w-16 shrink-0">{display}/100</span>
      <div className="relative w-20 h-[3px] rounded-full bg-[rgba(30,70,140,0.3)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
        {shimmer && (
          <div
            className="absolute inset-0 shimmer-sweep"
            style={{ background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)' }}
          />
        )}
      </div>
    </>
  )
}

export default function MaddenAISection() {
  return (
    <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionLabel center>MADDENAI</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[48px] lg:text-[58px] font-bold leading-tight tracking-tight text-text-primary">
          Intelligence, not just information.
        </h2>
        <p className="font-sans text-[18px] text-text-muted max-w-[600px] mx-auto mt-4 leading-[1.75]">
          MaddenAI reads across markets, macro, and sentiment simultaneously — then hands you a structured, decision-ready view instead of a wall of numbers.
        </p>
        <Link to="/maddenai" className="inline-block font-mono text-[12px] text-gold mt-4 hover:opacity-70 transition-opacity">
          LEARN HOW MADDENAI WORKS →
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 text-left">
          {CARDS.map((card, i) => (
            <div key={card.title} className="group relative rounded overflow-hidden">
              <div
                className="absolute -inset-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 [animation:border-spin_3s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
                style={{ background: 'conic-gradient(from 0deg, transparent 0%, #C9A84C 20%, transparent 40%)' }}
              />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="relative z-10 m-px bg-bg-surface border border-gold/20 border-t-2 border-t-gold rounded p-6 h-[calc(100%-2px)] transition-colors"
              >
                <span className="text-gold text-[20px]">◆</span>
                <h3 className="font-sans text-[16px] font-bold text-text-primary mt-3">{card.title}</h3>
                <p className="font-sans text-[13px] text-text-muted mt-2 leading-relaxed">{card.body}</p>
                <p className="font-mono text-[10px] text-text-faint mt-4">{card.footer}</p>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="max-w-[720px] mx-auto mt-10 bg-bg-surface border border-gold/25 rounded overflow-hidden text-left">
          <div className="bg-bg-primary border-b border-gold/12 px-4 py-2 font-mono text-[10px] text-gold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
            MADDENAI &nbsp;·&nbsp; BHP.AX ANALYSIS &nbsp;·&nbsp; 07:42 AEST
          </div>
          <div className="font-mono text-[12px] p-5 flex flex-col gap-4">
            <div className="font-bold text-[16px] text-text-primary">
              BHP.AX &nbsp;A$63.42 &nbsp;<span className="text-gain">▲ +1.24%</span>
            </div>

            <div>
              <div className="text-gold text-[10px] mb-1">ASSESSMENT:</div>
              <div className="text-text-muted">BHP trading constructively as iron ore holds US$98/t</div>
            </div>

            <div>
              <div className="text-gold text-[10px] mb-2">SENTIMENT:</div>
              <div className="flex flex-col gap-2">
                {SCORES.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 flex-wrap">
                    <span className="text-gold w-4">◆</span>
                    <span className="text-text-muted w-32 shrink-0">{s.label}</span>
                    <span className="text-text-primary w-20 shrink-0">{s.tag}</span>
                    <ScoreItem value={s.value} color={s.color} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-gold text-[10px] mb-1">LEVELS:</div>
              <div className="text-text-muted">◆ Support: &nbsp;A$61.20 / A$58.80</div>
              <div className="text-text-muted">◆ Resistance: &nbsp;A$65.40 / A$68.20</div>
            </div>

            <div>
              <div className="text-gold text-[10px] mb-1">OUTLOOK:</div>
              <div className="text-text-primary">Constructive near-term. Range A$61–67 through Q3.</div>
            </div>

            <div>
              <div className="text-gold text-[10px] mb-1">RISK:</div>
              <div className="text-text-muted">Iron ore break below US$90/t on China disappointment.</div>
            </div>
          </div>
        </div>
        <p className="font-mono text-[10px] text-text-faint text-center mt-4">
          Actual MaddenAI output format · BHP.AX · Analysis generated in real time
        </p>

        <div className="mt-10">
          <GoldButton to="/pricing">TRY MADDENAI FREE FOR 7 DAYS →</GoldButton>
        </div>
      </div>
    </section>
  )
}
