import { useState } from 'react'
import SectionLabel from '../shared/SectionLabel'
import GoldButton from '../shared/GoldButton'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  return (
    <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative w-full bg-bg-surface border border-gold/20 rounded overflow-hidden shadow-[0_0_40px_rgba(201,168,76,0.05)]">
          <div className="bg-gold px-5 py-4">
            <div className="font-mono text-[18px] font-bold text-bg-primary tracking-[0.1em]">MADDEN RESEARCH</div>
            <div className="font-mono text-[10px] text-bg-primary/70 mt-1">ISSUE #001 &nbsp;·&nbsp; MONDAY 14 JULY 2026</div>
          </div>
          <div className="p-5 font-mono text-[11px] relative" style={{ minHeight: 340 }}>
            <div className="text-gold text-[9px] tracking-[0.1em]">MADDENAI WEEKLY SENTIMENT</div>
            <div className="text-text-primary text-[20px] font-bold mt-1.5">68/100 NEUTRAL-BULLISH</div>
            <div className="w-full h-1.5 rounded-full mt-3" style={{ background: 'linear-gradient(to right, #A83232, #C9A84C, #2D8A50)' }} />

            <div className="text-gold text-[9px] tracking-[0.1em] mt-6">THIS WEEK'S THREE THEMES</div>
            <div className="flex flex-col gap-2 mt-2 text-text-muted">
              <div>◆ Iron ore stability above US$95/t supports ASX materials sector</div>
              <div>◆ Fed pause reduces AUD pressure — bullish for offshore earners</div>
              <div>◆ Crypto breadth improving as BTC dominance eases from 60%</div>
            </div>

            <div className="text-gold text-[9px] tracking-[0.1em] mt-6">ASX WATCH LIST</div>
            <div className="text-text-muted mt-2">CSL.AX · BHP.AX · WBC.AX · RIO.AX · WOW.AX</div>

            <div
              className="absolute bottom-0 left-0 right-0 h-[30%] flex items-end justify-center pb-6"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, #060D1A 100%)' }}
            >
              <GoldButton>SUBSCRIBE TO READ MORE</GoldButton>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>MADDEN RESEARCH</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary">
            The weekly brief serious Australian investors read first.
          </h2>
          <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75]">
            Every Monday at 7:00am AEST. MaddenAI-powered market intelligence. Free to subscribe.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="border border-gold/20 rounded p-5">
              <div className="font-mono text-[13px] font-bold text-gold">FREE</div>
              <div className="flex flex-col gap-2 mt-4 font-sans text-[12px] text-text-muted">
                <div>◆ Weekly Monday brief</div>
                <div>◆ MaddenAI sentiment score</div>
                <div>◆ Three market themes</div>
                <div>◆ RBA calendar</div>
              </div>
            </div>
            <div className="border border-gold rounded p-5">
              <div className="font-mono text-[13px] font-bold text-gold">PAID A$29/MO</div>
              <div className="flex flex-col gap-2 mt-4 font-sans text-[12px] text-text-muted">
                <div>◆ Everything in Free</div>
                <div>◆ Mid-week update</div>
                <div>◆ Full ASX watch list</div>
                <div>◆ Archive access</div>
              </div>
            </div>
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full font-mono text-[12px] text-text-primary bg-bg-surface border border-gold/30 rounded px-4 py-3 mt-8 outline-none focus:border-gold/60 transition-colors placeholder:text-text-faint"
          />
          <div className="mt-4">
            <GoldButton className="w-full sm:w-auto">SUBSCRIBE FREE</GoldButton>
          </div>
          <div className="font-sans text-[12px] text-gold mt-3 hover:opacity-70 transition-opacity cursor-pointer">
            Or subscribe to full access A$29/mo →
          </div>
        </div>
      </div>
    </section>
  )
}
