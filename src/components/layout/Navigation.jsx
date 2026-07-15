import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import GoldButton from '../shared/GoldButton'

const NAV_ITEMS = [
  {
    label: 'PRODUCT',
    to: '/product',
    columns: 2,
    items: [
      { icon: '◆', title: 'Markets Module', desc: 'Global indices, sectors, top movers' },
      { icon: '◆', title: 'Crypto Module', desc: 'Top 20 AUD, momentum index, F&G' },
      { icon: '◆', title: 'Rates Module', desc: 'FX, yield curves, central banks' },
      { icon: '◆', title: 'Macro Module', desc: 'RBA dashboard, AU indicators' },
      { icon: '◆', title: 'News Module', desc: '28 sources, AI analysis, breaking alerts' },
      { icon: '◆', title: 'Watchlist', desc: 'Live tracking, synced across devices' },
      { icon: '◆', title: 'Global Intelligence', desc: '3D globe, geopolitical risk' },
      { icon: '◆', title: 'Command Bar', desc: 'Bloomberg-style terminal interface' },
    ],
  },
  {
    label: 'MADDENAI',
    to: '/maddenai',
    columns: 1,
    items: [
      { icon: '◆', title: 'How It Works', desc: 'Two-layer intelligence system' },
      { icon: '◆', title: 'Market Sentiment Score', desc: '8-factor weighted composite' },
      { icon: '◆', title: 'Crypto Momentum Index', desc: '5-factor composite' },
      { icon: '◆', title: 'Sector Strength Radar', desc: '11 GICS sectors simultaneously' },
      { icon: '◆', title: 'Asset Analysis', desc: 'Any ticker, structured output instantly' },
      { icon: '◆', title: 'Research Notes', desc: 'Institutional PDF reports from A$4.99' },
    ],
  },
  {
    label: 'PRICING',
    to: '/pricing',
    columns: 1,
    items: [
      { icon: '◆', title: 'Individual Plans', desc: 'Core A$19, Pro A$49, Apex A$149' },
      { icon: '◆', title: 'Business Plans', desc: 'Adviser, Firm, Institutional' },
      { icon: '◆', title: 'Research Notes', desc: 'From A$4.99 per note' },
    ],
  },
  {
    label: 'RESEARCH',
    to: '/research',
    columns: 1,
    items: [
      { icon: '◆', title: 'Madden Research', desc: 'Weekly Monday brief, free' },
      { icon: '◆', title: 'Paid Brief', desc: 'Full analysis A$29/mo' },
      { icon: '◆', title: 'MaddenAI Insights', desc: 'AI-generated market themes' },
    ],
  },
  {
    label: 'COMPANY',
    to: '/about',
    columns: 1,
    items: [
      { icon: '◆', title: 'About', desc: 'The story behind Maddex' },
      { icon: '◆', title: 'Roadmap', desc: 'What is coming and when' },
      { icon: '◆', title: 'Contact', desc: 'Get in touch with Ben directly' },
    ],
  },
]

function Dropdown({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
    >
      <div
        className={`bg-bg-surface border border-gold/20 rounded p-3 ${
          item.columns === 2 ? 'grid grid-cols-2 gap-2 min-w-[640px]' : 'min-w-[320px]'
        }`}
      >
        {item.items.map((sub) => (
          <div
            key={sub.title}
            className="flex gap-3 px-3 py-3 rounded-sm hover:bg-gold/[0.06] transition-colors duration-150 cursor-pointer"
          >
            <span className="text-gold text-[16px] leading-none mt-0.5">{sub.icon}</span>
            <div>
              <div className="font-sans text-[13px] font-medium text-text-primary">{sub.title}</div>
              <div className="font-sans text-[11px] text-text-muted mt-0.5">{sub.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <nav
      className="fixed top-8 left-0 right-0 h-14 z-[100] transition-colors duration-200"
      style={{
        background: scrolled ? 'rgba(6,13,26,0.97)' : 'rgba(6,13,26,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid rgba(201,168,76,${scrolled ? 0.2 : 0.12})`,
      }}
    >
      <div className="max-w-[1280px] mx-auto h-full px-6 md:px-10 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-[15px] font-bold tracking-[0.12em] text-gold shrink-0"
        >
          MADDEX
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <div
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.to}
                  className={`relative font-sans text-[13px] transition-colors duration-150 ${
                    isActive ? 'text-gold' : 'text-text-muted hover:text-gold'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute left-0 right-0 -bottom-2 h-px bg-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
                <AnimatePresence>
                  {activeDropdown === item.label && <Dropdown item={item} />}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="hidden md:flex items-center">
          <button
            type="button"
            className="font-sans text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150 mr-5"
          >
            LOG IN
          </button>
          <GoldButton to="/pricing">START FREE TRIAL</GoldButton>
        </div>

        <button
          type="button"
          className="md:hidden text-gold text-2xl"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[110]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-bg-surface border-l border-gold/20 z-[120] p-6 flex flex-col gap-6"
            >
              <button
                type="button"
                className="self-end text-gold text-xl"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-[15px] text-text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <GoldButton to="/pricing" onClick={() => setMobileOpen(false)} className="w-full">
                START FREE TRIAL
              </GoldButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
