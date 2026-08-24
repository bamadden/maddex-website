import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'
import FadeInSection from '../components/shared/FadeInSection'
import { NEWSLETTER_PLANS } from '../data/pricing'

const FLIP_CARDS = [
  { front: 'MADDENAI SENTIMENT', back: 'A weekly 0-100 sentiment score with a full factor breakdown — not just a number.' },
  { front: 'KEY THEMES', back: 'The macro or market themes actually worth your attention that week, explained plainly.' },
  { front: 'ASX WATCH LIST', back: 'A curated list of ASX names in focus, with the reasoning behind each inclusion.' },
  { front: 'RBA CALENDAR', back: 'Every upcoming rate decision and data release that could move your portfolio.' },
]

function FlipCard({ front, back, index }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="min-h-[180px] cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute inset-0 bg-bg-surface border border-gold/15 rounded p-5 flex flex-col items-center justify-center text-center gap-2"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-gold text-[20px]">◆</span>
          <span className="font-sans text-[16px] font-bold tracking-[-0.02em] text-text-primary">{front}</span>
          <span className="font-mono text-[11px] tracking-wide text-gold">HOVER TO REVEAL</span>
        </div>
        <div
          className="absolute inset-0 bg-bg-primary border border-gold/15 rounded p-5 flex items-center justify-center text-center"
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
    document.title = 'MaddenAI Newsletter — Coming Soon'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[140px] pb-16 px-6 md:px-10 text-center">
        <span className="inline-block font-mono text-[9px] tracking-[0.15em] text-gold bg-gold/10 border border-gold/15 rounded-full px-3 py-1 mb-5">
          PHASE 3 · COMING SOON, 6–12 MONTHS OUT
        </span>
        <SectionLabel center>MADDENAI NEWSLETTER</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[40px] md:text-[64px] font-extrabold leading-tight tracking-[-0.03em] text-text-primary max-w-3xl mx-auto"
        >
          The market brief serious Australian investors will read first.
        </motion.h1>
        <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          A standalone product, separate from the Maddex Terminal — MaddenAI-powered market intelligence, delivered to your inbox. Not yet open for subscriptions.
        </p>
      </section>

      <FadeInSection className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionLabel center>WHAT YOU'RE SIGNING UP FOR</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[48px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-tight">
            Two briefs. One goal — keep you ahead of the market.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-9 text-left items-stretch">
            <div className="bg-bg-primary border border-gold/15 rounded p-6 flex flex-col">
              <span className="font-mono text-[9px] tracking-[0.15em] text-gold">SUNDAY EVENINGS</span>
              <h3 className="font-sans text-[19px] font-bold tracking-[-0.02em] text-text-primary mt-2">Weekly Market Brief</h3>
              <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7]">
                800–1,200 words. Ben's personal read on the week ahead. What mattered this week, and what to watch next — ASX-first, globally informed.
              </p>
              <div className="font-mono text-[9px] text-gold tracking-[0.1em] mt-5 mb-2">SAMPLE TOPICS</div>
              <div className="flex flex-col gap-1.5">
                {['RBA decision analysis', 'Iron ore and commodity outlook', 'Key earnings to watch', 'Global macro risks for AU investors'].map((t) => (
                  <div key={t} className="font-sans text-[12px] text-text-muted flex gap-2">
                    <span className="text-gold shrink-0">◆</span>{t}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-bg-primary border border-gold/15 rounded p-6 flex flex-col">
              <span className="font-mono text-[9px] tracking-[0.15em] text-gold">MON–FRI, 7AM AEST</span>
              <h3 className="font-sans text-[19px] font-bold tracking-[-0.02em] text-text-primary mt-2">Daily Market Brief</h3>
              <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7]">
                3 minutes. What happened overnight, and what it means for your portfolio. Out by 7am every morning.
              </p>
              <div className="font-mono text-[9px] text-gold tracking-[0.1em] mt-5 mb-2">SAMPLE FORMAT</div>
              <div className="flex flex-col gap-1.5">
                {[
                  'Overnight: S&P +0.32%, key movers',
                  'ASX outlook: likely open up',
                  'One thing to watch today',
                  'MaddenAI score: 72/100 CAUTIOUSLY BULLISH',
                ].map((t) => (
                  <div key={t} className="font-sans text-[12px] text-text-muted flex gap-2">
                    <span className="text-gold shrink-0">◆</span>{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="bg-bg-primary py-24 px-6 md:px-10 text-center">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>WHAT'S INSIDE</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-tight">
            Four sections. Every issue. Hover to preview.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-9">
            {FLIP_CARDS.map((card, i) => (
              <FlipCard key={card.front} front={card.front} back={card.back} index={i} />
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="bg-bg-surface py-24 px-6 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <SectionLabel center>SAMPLE ISSUE PREVIEW</SectionLabel>
          <div className="relative bg-bg-primary border border-gold/15 rounded overflow-hidden mt-6" style={{ minHeight: 560 }}>
            <div className="bg-gold px-6 py-4 flex items-center justify-between">
              <div>
                <div className="font-mono text-[14px] font-bold text-bg-primary tracking-[0.1em]">MADDENAI NEWSLETTER</div>
                <div className="font-mono text-[10px] text-bg-primary/70 mt-0.5">PREVIEW · NOT YET PUBLISHED</div>
              </div>
              <span className="font-mono text-[9px] font-bold text-bg-primary bg-bg-primary/15 rounded-full px-2.5 py-1 whitespace-nowrap">
                COMING SOON
              </span>
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

              <div className="text-gold text-[9px] tracking-[0.1em] mt-7">ASX WATCH LIST</div>
              <div className="text-text-primary font-bold mt-2">CSL.AX · BHP.AX · WBC.AX · RIO.AX · WOW.AX</div>

              <div className="text-gold text-[9px] tracking-[0.1em] mt-7">RBA CALENDAR</div>
              <div className="text-text-muted mt-2">Next meeting: 16 SEP 2026 · Cash rate held at 4.35% since May</div>

              <div
                className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-8"
                style={{ height: '35%', background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, #060D1A 100%)' }}
              >
                <span className="font-mono text-[11px] text-gold border border-gold/40 rounded-full px-4 py-2">
                  ILLUSTRATIVE PREVIEW — NOT A PUBLISHED ISSUE
                </span>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="bg-bg-primary py-24 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionLabel center>PLANNED PRICING</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl mx-auto leading-tight">
            Free brief, or paid tiers.
          </h2>

          <div
            className="text-left font-mono text-[11px] text-text-muted leading-[1.7] mt-10 mb-8"
            style={{ background: 'rgba(201,168,76,0.04)', borderLeft: '2px solid #C9A84C', padding: '16px 20px' }}
          >
            <div className="text-gold tracking-[0.1em] mb-2">HOW THE MADDENAI NEWSLETTER WILL WORK</div>
            <p>
              The MaddenAI Newsletter is a standalone product — it is not part of your Maddex Terminal subscription. You'll be able to subscribe independently, whether or not you have a Terminal subscription. Pricing below is indicative and may change before launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {NEWSLETTER_PLANS.map((plan) => (
              <div key={plan.name} className="border border-gold/15 rounded p-5 bg-bg-surface flex flex-col">
                <div className="font-mono text-[12px] font-bold text-gold">{plan.name}</div>
                <div className="font-sans text-[18px] font-bold tracking-[-0.02em] text-text-primary mt-2">
                  {plan.price || `A$${plan.monthly}/mo`}
                </div>
                <div className="flex flex-col gap-2 mt-3 font-sans text-[11px] text-text-muted">
                  {plan.features.map((f) => <div key={f}>◆ {f}</div>)}
                </div>
              </div>
            ))}
          </div>

          <div className="font-mono text-[10px] tracking-[0.1em] text-gold mt-10">
            BE FIRST TO KNOW WHEN IT LAUNCHES
          </div>
          <div className="max-w-[440px] mx-auto mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full font-mono text-[12px] text-text-primary bg-bg-surface border border-gold/15 rounded px-4 py-3 outline-none focus:border-gold/40 transition-colors placeholder:text-text-faint"
            />
            <div className="mt-4">
              <GoldButton className="w-full">NOTIFY ME AT LAUNCH</GoldButton>
            </div>
            <p className="font-sans text-[11px] text-text-faint mt-4">
              No spam — just a heads-up when the MaddenAI Newsletter opens for subscriptions.
            </p>
          </div>
        </div>
      </FadeInSection>

      <FinalCTA />
      <Footer />
    </>
  )
}
