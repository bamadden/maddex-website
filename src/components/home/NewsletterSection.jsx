import { useState } from 'react'
import SectionLabel from '../shared/SectionLabel'
import GoldButton from '../shared/GoldButton'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  return (
    <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative w-full bg-bg-surface border border-gold/20 rounded overflow-hidden shadow-[0_0_40px_rgba(201,168,76,0.05)] flex flex-col" style={{ minHeight: 420 }}>
          <div className="bg-gold px-5 py-5 flex items-center justify-between">
            <div>
              <div className="font-mono text-[16px] font-bold text-bg-primary tracking-[0.1em]">MADDENAI NEWSLETTER</div>
              <div className="font-mono text-[10px] text-bg-primary/70 mt-1">PREVIEW ISSUE</div>
            </div>
            <span className="font-mono text-[9px] font-bold text-bg-primary bg-bg-primary/15 rounded-full px-2.5 py-1 whitespace-nowrap">
              PHASE 3
            </span>
          </div>
          <div className="p-5 font-mono text-[11px] relative flex-1">
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
              <span className="font-mono text-[10px] text-gold bg-bg-primary border border-gold/30 rounded-full px-4 py-2">
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>MADDENAI NEWSLETTER</SectionLabel>
          <h2 className="font-sans text-[34px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary">
            A standalone market brief. Coming in Phase 3.
          </h2>
          <p className="font-sans text-[17px] text-text-muted mt-4 leading-[1.75]">
            The MaddenAI Newsletter is a separate product from the Terminal — a daily and weekly market brief, delivered to your inbox. It launches roughly 6–12 months after the Terminal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="border border-[rgba(30,70,140,0.35)] rounded p-5">
              <div className="font-mono text-[13px] font-bold text-text-muted">FREE</div>
              <div className="flex flex-col gap-2 mt-4 font-sans text-[12px] text-text-muted">
                <div>◆ Weekly market brief</div>
              </div>
            </div>
            <div className="relative border border-gold rounded p-5" style={{ background: 'rgba(201,168,76,0.04)' }}>
              <span className="absolute -top-2.5 right-4 bg-gold text-bg-primary font-mono text-[8px] font-bold px-2 py-0.5 rounded-full tracking-[0.05em]">
                FROM A$19/MO
              </span>
              <div className="font-mono text-[13px] font-bold text-gold">WEEKLY · DAILY+WEEKLY · FULL SUITE</div>
              <div className="flex flex-col gap-2 mt-4 font-sans text-[12px] text-text-muted">
                <div>◆ Weekly deep-dive with Ben's market view</div>
                <div>◆ Daily 3-minute brief, Mon–Fri 7am AEST</div>
                <div>◆ Full Suite adds monthly recap + note preview</div>
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
            <GoldButton className="w-full sm:w-auto">NOTIFY ME AT LAUNCH</GoldButton>
          </div>
          <div className="font-mono text-[10px] text-text-faint mt-3">
            Pricing shown is indicative and may change before launch.
          </div>
        </div>
      </div>
    </section>
  )
}
