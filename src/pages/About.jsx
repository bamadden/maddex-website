import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'
import GoldButton from '../components/shared/GoldButton'

const VALUES = [
  ['RIGOUR', '◆', 'Every module is built to add signal, not another number that means nothing without context.'],
  ['ACCESSIBILITY', '◈', "Institutional-grade intelligence shouldn't require an institutional budget — built for Australian investors, priced for individuals."],
  ['TRANSPARENCY', '◉', 'MaddenAI shows its factor weightings and methodology. No black-box scores.'],
]

const ROADMAP = [
  ['Q3 2026', 'Commercial Launch', 'Maddex opens to the public — Core, Pro, and Apex tiers live.'],
  ['Q4 2026', 'Mobile App', 'Native iOS and Android apps for Pro and Apex subscribers, with push alerts.'],
  ['Q1 2027', '500 Subscribers', 'Growing the individual investor base across all three tiers.'],
  ['Q2 2027', 'API Launch', 'Programmatic access to MaddenAI scores and market data for Apex subscribers.'],
  ['Q3 2027', 'Adviser Tier', 'Multi-client dashboards and white-label reporting for financial advisers.'],
  ['2028', 'International Expansion', 'Extending MaddenAI intelligence beyond the ASX to global markets.'],
]

const CREDENTIALS = [
  ['MASTER OF BUSINESS (APPLIED FINANCE)', 'Queensland University of Technology', "Dean's Honour List 2021–22"],
  ['BACHELOR OF BUSINESS (INTERNATIONAL BUSINESS)', 'Queensland University of Technology', 'Distinction'],
  ['FINANCE GRADUATE', 'Queensland Government — Dept. of Housing and Public Works', 'Competitive rotational graduate program'],
  ['OP2 · DUX · VICE-CAPTAIN · EAGLE AWARD', "Moreton Bay Boys' College", ''],
]

const ENTITIES = [
  ['MADDEN GROUP HOLDINGS PTY LTD', 'Parent company'],
  ['MADDEX PTY LTD', 'Operating subsidiary — the terminal'],
  ['MADDEN GROUP CAPITAL PTY LTD', 'Dormant — reserved for Phase 4'],
]

export default function About() {
  useEffect(() => {
    document.title = 'Maddex — About'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[84px] pb-16 px-6 md:px-10 text-center">
        <SectionLabel center>ABOUT MADDEX</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto"
        >
          Built by an investor, for investors.
        </motion.h1>
        <p className="font-sans text-[18px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          Maddex exists because the gap between "free broker app" and "A$42,000-a-year terminal" was never supposed to be this wide.
        </p>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto md:mx-0 shrink-0 text-center"
          >
            <div className="relative w-[240px] h-[240px]">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, #C9A84C 45%, transparent 70%)',
                  animation: 'border-spin 4s linear infinite',
                }}
              />
              <div className="absolute inset-[10px] rounded-full bg-bg-primary border border-gold/10 flex items-center justify-center">
                <span className="font-mono text-[64px] font-bold text-gold">BM</span>
              </div>
            </div>
            <div className="font-mono text-[11px] tracking-[0.15em] text-gold mt-5">FOUNDER &amp; CEO</div>
            <div className="font-mono text-[10px] tracking-[0.1em] text-text-muted mt-1.5">BRISBANE, AUSTRALIA</div>
          </motion.div>
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-gold">FOUNDER</span>
            <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-text-primary mt-2">Benjamin Andrew Madden</h2>
            <div className="font-sans text-[16px] text-text-muted mt-4 leading-[1.8] flex flex-col gap-4">
              <p>I built Maddex because I needed it and it didn't exist.</p>
              <p>
                As a finance professional, I wanted institutional-grade intelligence — the kind of analysis that Bloomberg provides — without the A$42,000 per year price tag. I looked at everything available to Australian investors and found a market split between tools that cost more than most people's annual rent, and broker apps that tell you the price but not what it means.
              </p>
              <p>
                So I built the middle. Maddex is the terminal I wanted. Built from scratch, alongside a full-time government finance career, using modern technology that makes this possible for a solo founder in a way it never was before.
              </p>
              <p>This is not a side project. This is the beginning of something serious.</p>
            </div>
            <p className="font-sans text-[22px] text-gold mt-6 italic font-medium border-l-2 border-gold/40 pl-4">— Benjamin Andrew Madden</p>
            <div className="inline-flex items-center gap-2 mt-6 font-mono text-[10px] tracking-[0.1em] text-text-muted border border-gold/20 rounded-full px-3 py-1.5">
              <span className="relative w-1.5 h-1.5">
                <span className="pulse-ring absolute inset-0" />
                <span className="absolute inset-0 rounded-full bg-gold" />
              </span>
              BRISBANE, QUEENSLAND, AUSTRALIA
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionLabel center>CREDENTIALS</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            The work behind the terminal.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 text-left items-stretch">
            {CREDENTIALS.map(([title, institution, detail], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -2, borderLeftColor: '#E8C878' }}
                className="min-h-[110px] flex flex-col justify-center transition-colors"
                style={{ background: '#0B1628', borderLeft: '2px solid #C9A84C', padding: '16px 20px' }}
              >
                <div className="font-mono text-[11px]" style={{ color: '#C9A84C' }}>{title}</div>
                <div className="font-sans text-[14px] font-bold mt-1.5" style={{ color: '#E8EDF5' }}>{institution}</div>
                {detail && <div className="font-sans text-[13px] text-text-muted mt-1">{detail}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-bg-surface py-20 md:py-[100px] px-6 md:px-10 text-center overflow-hidden">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            height: 500,
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10">
          <SectionLabel center>MISSION</SectionLabel>
          <div className="w-20 h-px bg-gold/50 mx-auto mb-6" />
          <h2
            className="font-sans text-[40px] md:text-[64px] font-bold text-text-primary max-w-3xl mx-auto leading-tight"
            style={{ textShadow: '0 0 60px rgba(201,168,76,0.25)' }}
          >
            Australia first. The world next.
          </h2>
          <p className="font-sans text-[20px] text-text-primary max-w-2xl mx-auto mt-6 leading-[1.7]">
            Give every Australian investor the intelligence that used to be reserved for trading floors.
          </p>
          <p className="font-sans text-[16px] text-text-muted max-w-2xl mx-auto mt-6 leading-[1.75]">
            Maddex launches with Australia at its core — the ASX, the RBA, the AUD, and the commodities that drive the Australian economy. But the platform is architected for the world. The same intelligence framework that serves Australian investors today is designed to scale across every major market, every currency, and every exchange globally.
          </p>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>CORPORATE STRUCTURE</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            One mission. Three entities.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {ENTITIES.map(([name, desc], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="bg-bg-surface border border-gold/20 rounded p-6 text-left"
              >
                <span className="font-mono text-[11px] tracking-[0.05em] text-gold leading-snug">{name}</span>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7]">{desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-text-faint max-w-2xl mx-auto mt-8 leading-[1.7]">
            Enterprise packages (Adviser, Firm, Institutional) are planned for Q2-Q3 2027 as Phase 3 of the Maddex roadmap. Individual packages (Core, Pro, Apex) are available at launch in Q3 2026.
          </p>
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>HOW MADDEX IS STRUCTURED</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            One data engine. Three surfaces.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {[
              ['DATA LAYER', 'Live market, macro, and news ingestion across 200+ countries and 50+ exchanges.'],
              ['MADDENAI ENGINE', 'Weighted scoring models turning raw data into structured, 0-100 intelligence.'],
              ['TERMINAL + RESEARCH', 'The interface: seven modules, on-demand asset analysis, and weekly research.'],
            ].map(([title, desc], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="bg-bg-primary border border-gold/20 rounded p-6 text-left"
              >
                <span className="font-mono text-[9px] tracking-[0.25em] text-gold">{title}</span>
                <p className="font-sans text-[13px] text-text-muted mt-3 leading-[1.7]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionLabel center>VALUES</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
            What we won't compromise on.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 text-left">
            {VALUES.map(([title, icon, desc], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.35)' }}
                className="bg-bg-surface border-l-[3px] border-gold rounded-r p-6 cursor-default transition-colors"
              >
                <span className="text-gold text-[24px]">{icon}</span>
                <h3 className="font-sans text-[16px] font-bold text-text-primary mt-3">{title}</h3>
                <p className="font-sans text-[13px] text-text-muted mt-2 leading-[1.7]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel center>ROADMAP</SectionLabel>
          <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary text-center leading-tight mb-16">
            What's coming, and when.
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute top-[46px] left-0 right-0 h-[2px]" style={{ background: 'rgba(201,168,76,0.3)' }} />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {ROADMAP.map(([quarter, title, desc], i) => {
                const isCurrent = i === 0
                return (
                  <motion.div
                    key={quarter}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="h-10 flex items-end justify-center">
                      <h3 className={`font-sans text-[13px] font-bold leading-snug ${isCurrent ? 'text-gold' : 'text-text-primary'}`}>{title}</h3>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full z-10 mt-3 ${isCurrent ? 'bg-gold shadow-[0_0_12px_rgba(201,168,76,0.5)]' : 'bg-bg-elevated border-2 border-gold/30'}`}
                    />
                    {isCurrent && (
                      <span className="font-mono text-[8px] text-gold tracking-[0.1em] mt-2">YOU ARE HERE</span>
                    )}
                    <span className={`font-mono text-[10px] mt-2 ${isCurrent ? 'text-gold' : 'text-text-faint'}`}>{quarter}</span>
                    <p className="font-sans text-[11px] text-text-faint mt-2 leading-snug max-w-[140px]">{desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10 text-center">
        <SectionLabel center>CONTACT</SectionLabel>
        <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
          Get in touch with Ben directly.
        </h2>
        <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75]">
          Questions, feedback, or a partnership idea — every message reaches the founder, not a support queue.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[600px] mx-auto mt-8 text-left">
          <a
            href="mailto:hello@maddex.com.au"
            className="group w-full bg-bg-surface border-l-2 border-gold rounded-r p-5 flex items-center gap-3 hover:bg-gold/[0.04] transition-colors overflow-hidden"
          >
            <span className="text-gold text-[20px]">✉</span>
            <div className="flex-1">
              <div className="font-mono text-[9px] tracking-[0.1em] text-gold">EMAIL</div>
              <div className="font-sans text-[13px] text-text-primary mt-0.5">hello@maddex.com.au</div>
            </div>
            <span className="text-gold text-[16px] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">→</span>
          </a>
          <a
            href="https://linkedin.com/in/benjaminmadden"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full bg-bg-surface border-l-2 border-gold rounded-r p-5 flex items-center gap-3 hover:bg-gold/[0.04] transition-colors overflow-hidden"
          >
            <span className="text-gold text-[20px]">in</span>
            <div className="flex-1">
              <div className="font-mono text-[9px] tracking-[0.1em] text-gold">LINKEDIN</div>
              <div className="font-sans text-[13px] text-text-primary mt-0.5">linkedin.com/in/benjaminmadden</div>
            </div>
            <span className="text-gold text-[16px] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">→</span>
          </a>
        </div>

        <p className="font-sans text-[14px] text-gold mt-6 italic">Ben responds personally to every message.</p>

        <div className="mt-8">
          <GoldButton href="mailto:hello@maddex.com.au">EMAIL BEN →</GoldButton>
        </div>
      </section>

      <Footer />
    </>
  )
}
