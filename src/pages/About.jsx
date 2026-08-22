import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

export default function About() {
  useEffect(() => {
    document.title = 'Maddex — About'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[84px] pb-14 px-6 md:px-10 text-center">
        <SectionLabel center>ABOUT MADDEX</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto"
        >
          Built by an investor, for investors.
        </motion.h1>
        <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-4 leading-[1.6]">
          I built Maddex because I needed it and it didn't exist. As a finance professional, I wanted Bloomberg-quality intelligence without the A$42,000-a-year price tag — so I built the middle ground myself.
        </p>
      </section>

      <section className="bg-bg-surface py-14 px-6 md:px-10">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="mx-auto sm:mx-0 shrink-0"
          >
            <div className="relative w-[160px] h-[160px]">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, #C9A84C 45%, transparent 70%)',
                  animation: 'border-spin 4s linear infinite',
                }}
              />
              <div className="absolute inset-[8px] rounded-full bg-bg-primary border border-gold/10 flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }}
                />
                <span className="relative font-mono text-[44px] font-bold text-gold">BM</span>
              </div>
            </div>
          </motion.div>
          <div className="text-center sm:text-left">
            <h2 className="font-sans text-[24px] font-bold text-text-primary">Benjamin Andrew Madden</h2>
            <div className="font-mono text-[11px] tracking-[0.15em] text-gold mt-1.5">FOUNDER &amp; CEO</div>
            <p className="font-sans text-[14px] text-text-muted mt-3 leading-[1.7]">
              A Queensland finance graduate (Master of Business, Applied Finance) with a government finance career, Ben built Maddex from scratch alongside his day job — using modern AI tooling to do as a solo founder what once required a whole trading-floor budget. Based in Brisbane, Australia.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-bg-primary py-14 px-6 md:px-10 text-center overflow-hidden">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 340,
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10">
          <SectionLabel center>MISSION</SectionLabel>
          <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
            Australia first. The world next.
          </h2>
          <p className="font-sans text-[15px] text-text-muted max-w-[600px] mx-auto mt-4 leading-[1.65]">
            Give every Australian investor the intelligence that used to be reserved for trading floors — starting with the ASX, the RBA, and the AUD, then built out for global markets.
          </p>
        </div>
      </section>

      <section className="bg-bg-surface py-14 px-6 md:px-10 text-center">
        <SectionLabel center>CONTACT</SectionLabel>
        <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
          Have a question? Email Ben directly.
        </h2>
        <p className="font-sans text-[14px] text-text-muted mt-3">
          Usually within 24 hours.
        </p>
        <div className="mt-7">
          <GoldButton href="mailto:ben@maddex.com.au">ben@maddex.com.au →</GoldButton>
        </div>
      </section>

      <Footer />
    </>
  )
}
