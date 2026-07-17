import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

const FLIP_CARDS = [
  { front: 'MADDENAI SENTIMENT', back: 'A weekly 0-100 sentiment score with a full factor breakdown — not just a number.' },
  { front: 'THREE KEY THEMES', back: 'The three macro or market themes actually worth your attention that week, explained plainly.' },
  { front: 'ASX WATCH LIST', back: 'A curated list of ASX names in focus, with the reasoning behind each inclusion.' },
  { front: 'RBA CALENDAR', back: 'Every upcoming rate decision and data release that could move your portfolio.' },
]

const PAST_ISSUES = [
  ['Issue #023', '7 July 2026', 'Iron ore holds, tech leads a quiet week for the ASX 200.'],
  ['Issue #022', '30 June 2026', 'FY26 close: what the reporting season means for dividend investors.'],
  ['Issue #021', '23 June 2026', 'Crypto breadth improves as BTC dominance eases below 60%.'],
]

function FlipCard({ front, back, index }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="h-[180px] cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0 bg-bg-surface border border-gold/20 rounded p-5 flex items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="font-mono text-[13px] tracking-wide text-gold">{front}</span>
        </div>
        <div
          className="absolute inset-0 bg-bg-primary border border-gold/30 rounded p-5 flex items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="font-sans text-[13px] text-text-muted leading-[1.7]">{back}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Research() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    document.title = 'Madden Research — Weekly Market Brief'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[84px] pb-16 px-6 md:px-10 text-center">
        <SectionLabel center>MADDEN RESEARCH</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto"
        >
          The weekly brief serious Australian investors read first.
        </motion.h1>
        <p className="font-sans text-[18px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          Every Monday at 7:00am AEST. MaddenAI-powered market intelligence. Free to subscribe.
        </p>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>WHAT'S INSIDE</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            Four sections. Every Monday. Hover to preview.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {FLIP_CARDS.map((card, i) => (
              <FlipCard key={card.front} front={card.front} back={card.back} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <SectionLabel center>SAMPLE ISSUE</SectionLabel>
          <div className="relative bg-bg-surface border border-gold/20 rounded overflow-hidden mt-6" style={{ minHeight: 640 }}>
            <div className="bg-gold px-6 py-4">
              <div className="font-mono text-[14px] font-bold text-bg-primary tracking-[0.1em]">MADDEN RESEARCH</div>
              <div className="font-mono text-[10px] text-bg-primary/70 mt-0.5">ISSUE #024 &nbsp;·&nbsp; MONDAY 14 JULY 2026 &nbsp;·&nbsp; 7 MIN READ</div>
            </div>
            <div className="p-6 font-mono text-[11px] relative">
              <div className="text-gold text-[9px] tracking-[0.1em]">MADDENAI WEEKLY SENTIMENT</div>
              <div className="text-text-primary text-[22px] font-bold mt-1.5">68/100 NEUTRAL-BULLISH</div>
              <div className="w-full h-2 rounded-full mt-3" style={{ background: 'linear-gradient(to right, #A83232, #C9A84C, #2D8A50)' }} />

              <div className="text-gold text-[9px] tracking-[0.1em] mt-7">THIS WEEK'S THREE THEMES</div>
              <div className="flex flex-col gap-2 mt-2 text-text-muted">
                <div>◆ Iron ore stability above US$95/t supports ASX materials sector</div>
                <div>◆ Fed pause reduces AUD pressure — bullish for offshore earners</div>
                <div>◆ Crypto breadth improving as BTC dominance eases from 60%</div>
              </div>

              <div className="text-gold text-[9px] tracking-[0.1em] mt-7">MARKETS IN FOCUS</div>
              <div className="mt-2 text-text-primary font-bold text-[13px]">BHP.AX holds above A$63 as iron ore stabilises</div>
              <p className="mt-2 text-text-muted leading-[1.7]">
                BHP traded in a tight range this week as iron ore prices found support above US$95/t. Chinese steel mill margins improved
                marginally on restocking demand ahead of the northern hemisphere construction season, while port inventories drew down for
                a third consecutive week.
              </p>
              <p className="mt-3 text-text-muted leading-[1.7]">
                MaddenAI's Sector Strength Radar has Materials at 68/100, up four points week-on-week, with Energy the standout laggard
                as WTI slipped below US$79/barrel on softening demand forecasts.
              </p>

              <div className="text-gold text-[9px] tracking-[0.1em] mt-7">ASX WATCH LIST</div>
              <div className="text-text-primary font-bold mt-2">CSL.AX · BHP.AX · WBC.AX · RIO.AX · WOW.AX</div>

              <div className="text-gold text-[9px] tracking-[0.1em] mt-7">RBA CALENDAR</div>
              <div className="text-text-muted mt-2">Next meeting: 5 AUG 2026 · Cash rate held at 4.35% since May</div>

              <div
                className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-8"
                style={{ height: '35%', background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, #0B1628 100%)' }}
              >
                <GoldButton>SUBSCRIBE TO READ MORE</GoldButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[900px] mx-auto text-center">
          <SectionLabel center>SUBSCRIBE</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            Free brief, or full paid access.
          </h2>

          <div
            className="text-left font-mono text-[11px] text-text-muted leading-[1.7] mt-10 mb-8"
            style={{ background: 'rgba(201,168,76,0.04)', borderLeft: '2px solid #C9A84C', padding: '16px 20px' }}
          >
            <div className="text-gold tracking-[0.1em] mb-2">HOW MADDEN RESEARCH WORKS</div>
            <p>
              Madden Research is a standalone newsletter — it is not part of your Maddex terminal subscription. You can subscribe to Madden Research independently, whether or not you have a Maddex terminal subscription.
            </p>
            <p className="mt-3">
              <span className="text-gold">FREE NEWSLETTER</span> — available to everyone, no Maddex subscription required
              <br />
              <span className="text-gold">PAID NEWSLETTER</span> — A$29/month standalone, no Maddex subscription required
            </p>
            <p className="mt-3">
              Maddex terminal subscribers receive the free newsletter tier automatically with their account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            <div className="border border-gold/20 rounded p-6 bg-bg-primary">
              <div className="font-mono text-[13px] font-bold text-gold">FREE</div>
              <div className="flex flex-col gap-2 mt-4 font-sans text-[12px] text-text-muted">
                <div>◆ Weekly Monday brief</div>
                <div>◆ MaddenAI sentiment score</div>
                <div>◆ Three market themes</div>
                <div>◆ RBA calendar</div>
              </div>
            </div>
            <div>
              <div className="border border-gold rounded p-6 bg-bg-primary">
                <div className="font-mono text-[13px] font-bold text-gold">PAID A$29/MO</div>
                <div className="flex flex-col gap-2 mt-4 font-sans text-[12px] text-text-muted">
                  <div>◆ Everything in Free</div>
                  <div>◆ Mid-week update</div>
                  <div>◆ Full ASX watch list</div>
                  <div>◆ Archive access</div>
                </div>
              </div>
              <p className="font-sans text-[11px] text-text-faint mt-2">
                A$29/month · Billed monthly · Cancel anytime · Independent of Maddex terminal subscription
              </p>
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em] text-gold mt-10">
            JOIN 2,000+ AUSTRALIAN INVESTORS
          </div>
          <div className="max-w-[440px] mx-auto mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full font-mono text-[12px] text-text-primary bg-bg-primary border border-gold/30 rounded px-4 py-3 outline-none focus:border-gold/60 transition-colors placeholder:text-text-faint"
            />
            <div className="mt-4">
              <GoldButton className="w-full">SUBSCRIBE FREE</GoldButton>
            </div>
            <p className="font-sans text-[11px] text-text-faint mt-4">
              Madden Research is independent of your Maddex terminal subscription. Subscribe separately or as a complement to your terminal access.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>PAST ISSUES</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            Catch up on what you missed.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 text-left">
            {PAST_ISSUES.map(([issue, date, summary], i) => (
              <motion.div
                key={issue}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-bg-surface border border-gold/20 rounded p-6 hover:border-gold/40 transition-colors cursor-pointer"
              >
                <div className="font-mono text-[11px] text-gold">{issue}</div>
                <div className="font-mono text-[10px] text-text-faint mt-1">{date}</div>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7]">{summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </>
  )
}
