import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

const BACKGROUND = [
  'Master of Business (Applied Finance) — QUT',
  'Bachelor of Business (International Business) — QUT',
  'Finance Graduate, Queensland Government',
  'Based in Brisbane, Australia',
]

const BELIEFS = [
  {
    title: 'Real data, real analysis.',
    body: 'Professional-grade market intelligence should not require a Bloomberg subscription. Every Australian investor deserves access to institutional-quality data.',
  },
  {
    title: 'General information, not advice.',
    body: 'MaddenAI provides analysis and context — never personal financial advice. We believe informed investors make better decisions.',
  },
  {
    title: 'Built to last.',
    body: 'Maddex is built as a long-term business, not a growth-hack. We grow when our subscribers succeed.',
  },
]

const PRODUCTS = [
  { name: 'Maddex', desc: 'Financial intelligence terminal', status: 'LIVE', live: true },
  { name: 'Madden Capital', desc: 'Investment fund', status: 'FUTURE', live: false },
  { name: 'Madden Philanthropy', desc: 'Not-for-profit', status: 'FUTURE', live: false },
]

export default function About() {
  useEffect(() => {
    document.title = 'Maddex — About'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      {/* HERO */}
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
        <p className="font-sans text-[17px] text-text-muted max-w-2xl mx-auto mt-4 leading-[1.7]">
          Maddex exists because the tools Australian retail investors deserve have always been locked behind institutional paywalls.
        </p>
      </section>

      {/* THE STORY */}
      <section className="bg-bg-surface py-14 px-6 md:px-10">
        <div className="max-w-[720px] mx-auto">
          <SectionLabel center>THE STORY</SectionLabel>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            <p className="font-sans text-[22px] md:text-[26px] font-bold text-text-primary leading-[1.4]">
              I built Maddex because I was frustrated.
            </p>
            <p className="font-sans text-[16px] text-text-muted leading-[1.8]">
              As a finance graduate working in the Queensland Government and building my own investment portfolio, I kept running into the same wall — the analysis tools that actually matter are either $2,000-a-month Bloomberg terminals or watered-down retail apps that treat you like you can't handle real data.
            </p>
            <p className="font-sans text-[16px] text-text-muted leading-[1.8]">
              Australian retail investors are sophisticated. They follow the RBA, they track iron ore prices, they understand sector rotation. They deserve tools that match that sophistication — at a price that makes sense.
            </p>
            <p className="font-sans text-[22px] md:text-[26px] font-bold text-gold leading-[1.4]">
              So I built one.
            </p>
            <p className="font-sans text-[14px] text-text-muted italic text-right">— Ben Madden, Founder</p>
          </motion.div>
        </div>
      </section>

      {/* FOUNDER CARD */}
      <section className="bg-bg-primary py-14 px-6 md:px-10">
        <div className="max-w-[720px] mx-auto bg-bg-surface border border-gold/20 rounded p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-7 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="mx-auto sm:mx-0 shrink-0"
          >
            <div className="relative w-[120px] h-[120px]">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, #C9A84C 45%, transparent 70%)',
                  animation: 'border-spin 4s linear infinite',
                }}
              />
              <div className="absolute inset-[6px] rounded-full bg-bg-primary border border-gold/10 flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }}
                />
                <span className="relative font-mono text-[34px] font-bold text-gold">BM</span>
              </div>
            </div>
          </motion.div>
          <div className="text-center sm:text-left">
            <h2 className="font-sans text-[22px] font-bold text-text-primary">Ben Madden</h2>
            <div className="font-mono text-[10px] tracking-[0.15em] text-gold mt-1.5">FOUNDER &amp; CEO, MADDEN GROUP HOLDINGS</div>
            <div className="flex flex-col gap-1.5 mt-4">
              {BACKGROUND.map((line) => (
                <div key={line} className="font-sans text-[13px] text-text-muted flex gap-2 justify-center sm:justify-start">
                  <span className="text-gold shrink-0">◆</span>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="bg-bg-surface py-14 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>WHAT WE BELIEVE</SectionLabel>
          <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
            Three things we won't compromise on.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-9 text-left">
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                whileHover={{ y: -4 }}
                className="bg-bg-primary border-l-[3px] border-gold rounded-r p-6"
              >
                <h3 className="font-sans text-[17px] font-bold text-text-primary">"{b.title}"</h3>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7]">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE COMPANY */}
      <section className="bg-bg-primary py-14 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionLabel center>THE COMPANY</SectionLabel>
          <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
            Madden Group Holdings
          </h2>
          <p className="font-sans text-[15px] text-text-muted max-w-[560px] mx-auto mt-3 leading-[1.7]">
            Madden Group Holdings Pty Ltd is the parent company behind Maddex. Founded in Brisbane, Australia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-9">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className={`relative rounded p-6 text-left border ${
                  p.live ? 'border-gold/40 bg-bg-surface' : 'border-[rgba(201,168,76,0.15)] bg-bg-surface opacity-80'
                }`}
              >
                <span
                  className={`font-mono text-[8px] font-bold tracking-[0.1em] px-2 py-0.5 rounded-full ${
                    p.live ? 'bg-gold/15 text-gold' : 'bg-[rgba(30,70,140,0.25)] text-text-faint'
                  }`}
                >
                  {p.status}
                </span>
                <div className="font-sans text-[17px] font-bold text-text-primary mt-3">{p.name}</div>
                <p className="font-sans text-[13px] text-text-muted mt-1.5">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-bg-surface py-14 px-6 md:px-10 text-center">
        <SectionLabel center>CONTACT</SectionLabel>
        <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-text-primary max-w-2xl mx-auto leading-[1.15]">
          Have a question? I read every email.
        </h2>
        <p className="font-sans text-[15px] text-text-muted max-w-[560px] mx-auto mt-4 leading-[1.7]">
          Whether you're a potential subscriber, a journalist, a potential partner, or just someone with feedback — reach out. This is a human business.
        </p>
        <div className="font-mono text-[12px] text-gold mt-5">ben@maddex.com.au</div>
        <div className="font-mono text-[10px] text-text-faint mt-1 tracking-wide">USUALLY WITHIN 24 HOURS</div>
        <div className="mt-6">
          <GoldButton href="mailto:ben@maddex.com.au">CONTACT BEN →</GoldButton>
        </div>
      </section>

      <Footer />
    </>
  )
}
