import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FinalCTA from '../components/home/FinalCTA'
import SectionLabel from '../components/shared/SectionLabel'
import TerminalCard from '../components/shared/TerminalCard'
import TypewriterText from '../components/shared/TypewriterText'
import GoldButton from '../components/shared/GoldButton'

function MiniHeader({ label, right }) {
  return (
    <div className="bg-bg-surface border-b border-gold/12 px-4 py-2 flex justify-between items-center font-mono text-[10px]">
      <span className="text-text-muted">{label}</span>
      {right && <span className="text-gold">{right}</span>}
    </div>
  )
}

const MODULES = [
  {
    key: 'markets',
    stats: '9 Indices · 200+ ASX Stocks · 11 GICS Sectors · 60s Refresh',
    title: 'Markets Module',
    body: 'Every major global index, sector breakdown, and top mover — refreshed continuously and scored by MaddenAI for context, not just numbers.',
    features: ['9 global indices tracked live', 'Full ASX 200 constituent list', '11 GICS sector heatmap', 'MaddenAI sentiment overlay'],
    visual: (
      <TerminalCard>
        <MiniHeader label="MARKETS · ASX 200" right="72/100" />
        <div className="p-4 flex flex-col gap-2">
          {[
            ['ASX 200', '8,412.40', '+0.42%', true],
            ['S&P 500', '5,847.23', '+0.40%', true],
            ['NASDAQ', '18,921.56', '+0.50%', true],
            ['FTSE 100', '8,204.10', '-0.10%', false],
          ].map(([sym, price, chg, pos]) => (
            <div key={sym} className="flex justify-between font-mono text-[11px]">
              <span className="text-text-muted">{sym}</span>
              <span className="text-text-primary">{price}</span>
              <span className={pos ? 'text-gain' : 'text-loss'}>{pos ? '▲' : '▼'} {chg}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1 px-4 pb-4">
          {[['IT', true], ['MAT', true], ['ENRG', false], ['FIN', true]].map(([l, pos]) => (
            <div key={l} className="font-mono text-[9px] text-center py-1.5 rounded-sm" style={{ background: pos ? 'rgba(45,138,80,0.12)' : 'rgba(168,50,50,0.12)', color: pos ? '#2D8A50' : '#A83232' }}>{l}</div>
          ))}
        </div>
      </TerminalCard>
    ),
  },
  {
    key: 'crypto',
    stats: 'Top 20 AUD · 5-Factor Score · Live CoinGecko · 30s Refresh',
    title: 'Crypto Module',
    body: 'Top 20 assets by market cap in AUD, MaddenAI Momentum Index, and Fear & Greed tracking — built for investors who treat crypto as a real allocation.',
    features: ['Top 20 by AUD market cap', 'MaddenAI Momentum Index', 'Fear & Greed reading', 'BTC dominance tracking'],
    visual: (
      <TerminalCard>
        <MiniHeader label="CRYPTO · TOP 20" right="68 BULLISH" />
        <div className="grid grid-cols-2 gap-3 p-4">
          <div>
            <div className="font-mono text-[9px] text-gold">MADDENAI</div>
            <div className="font-mono text-[26px] font-bold text-gold">68</div>
          </div>
          <div>
            <div className="font-mono text-[9px] text-gold">FEAR &amp; GREED</div>
            <div className="font-mono text-[26px] font-bold text-text-primary">42</div>
          </div>
        </div>
        <div className="px-4 pb-4 flex flex-col gap-2">
          {[['BTC', 'A$162,400', '+1.80%'], ['ETH', 'A$6,124', '+2.10%']].map(([n, p, c]) => (
            <div key={n} className="flex justify-between font-mono text-[11px]">
              <span className="text-text-primary">{n}</span>
              <span className="text-text-primary">{p}</span>
              <span className="text-gain">{c}</span>
            </div>
          ))}
        </div>
      </TerminalCard>
    ),
  },
  {
    key: 'rates',
    stats: '10 AUD Pairs · 8 Bond Tenors · 10+ Central Banks · 5min Refresh',
    title: 'Rates Module',
    body: 'FX pairs, government bond yield curves, and central bank rates across every major economy — the macro plumbing most retail platforms skip entirely.',
    features: ['10 AUD currency pairs', 'AU Government Bond yield curve', '10+ central bank policy rates', 'Rate decision countdowns'],
    visual: (
      <TerminalCard>
        <MiniHeader label="RATES · FX & YIELDS" />
        <div className="p-4 flex flex-col gap-2">
          {[['AUD/USD', '0.6452', '-0.12%', false], ['AUD/EUR', '0.5981', '+0.08%', true], ['AUD/JPY', '96.42', '+0.22%', true]].map(([p, r, c, pos]) => (
            <div key={p} className="flex justify-between font-mono text-[11px]">
              <span className="text-text-muted">{p}</span>
              <span className="text-text-primary">{r}</span>
              <span className={pos ? 'text-gain' : 'text-loss'}>{c}</span>
            </div>
          ))}
          <div className="flex justify-between font-mono text-[10px] mt-2 pt-2 border-t border-[rgba(30,70,140,0.3)]">
            <span className="text-gold">RBA</span><span className="text-text-primary">4.35%</span><span className="text-text-faint">HOLD</span>
          </div>
        </div>
      </TerminalCard>
    ),
  },
  {
    key: 'macro',
    stats: '8 AU Indicators · RBA Primary · China Watch · Economic Calendar',
    title: 'Macro Module',
    body: 'A live RBA dashboard with cash rate, next meeting countdown, and the eight Australian macro indicators that actually move markets.',
    features: ['RBA cash rate + next meeting countdown', '8 Australian macro indicators', 'China Watch commodity linkage', '30-day economic calendar'],
    visual: (
      <TerminalCard>
        <MiniHeader label="MACRO · RBA DASHBOARD" />
        <div className="text-center py-6">
          <div className="font-mono text-[36px] font-bold text-gold">4.35%</div>
          <div className="font-mono text-[10px] text-text-muted mt-1">CASH RATE — HELD</div>
        </div>
        <div className="grid grid-cols-3 gap-2 px-4 pb-4">
          {[['CPI', '3.6%'], ['UE', '4.1%'], ['GDP', '1.5%']].map(([l, v]) => (
            <div key={l} className="bg-bg-surface rounded p-2 text-center">
              <div className="font-mono text-[8px] text-text-muted">{l}</div>
              <div className="font-mono text-[13px] text-text-primary font-bold">{v}</div>
            </div>
          ))}
        </div>
      </TerminalCard>
    ),
  },
  {
    key: 'news',
    stats: '28+ Sources · 9 Categories · 3min Refresh · AI Sentiment',
    title: 'News Module',
    body: '28+ sources filtered for financial relevance across 9 categories, with MaddenAI surfacing the themes that matter before they hit the front page.',
    features: ['28+ curated sources', 'Financial relevance filter', '9 news categories', 'MaddenAI Key Themes daily'],
    visual: (
      <TerminalCard>
        <MiniHeader label="NEWS · LIVE FEED" />
        <div className="p-4 flex flex-col gap-3">
          {[['AFR', '2m ago', 'BULLISH', 'RBA holds rates at 4.35%'], ['REUTERS', '8m ago', 'BEARISH', 'Iron ore slides on China data']].map(([s, t, sent, h]) => (
            <div key={h} className="font-mono text-[10px]">
              <div className="text-text-muted"><span className="text-gold">{s}</span> · {t} · <span className={sent === 'BULLISH' ? 'text-gain' : 'text-loss'}>{sent}</span></div>
              <div className="text-text-primary mt-1">{h}</div>
            </div>
          ))}
        </div>
      </TerminalCard>
    ),
  },
  {
    key: 'watchlist',
    stats: 'Unlimited Stocks · Live Prices · Supabase Sync · CSV Export',
    title: 'Watchlist',
    body: 'Add any ASX or US stock and track it live with full fundamental data, synced automatically across every device you use.',
    features: ['ASX + US ticker support', 'Live price tracking', 'Full fundamental data', 'Synced across all devices'],
    visual: (
      <TerminalCard>
        <MiniHeader label="WATCHLIST" />
        <div className="p-4 flex flex-col gap-2">
          {[['BHP.AX', 'A$43.82', '+0.85%'], ['CBA.AX', 'A$164.20', '+0.31%']].map(([s, p, c]) => (
            <div key={s} className="flex justify-between font-mono text-[11px]">
              <span className="text-text-primary">{s}</span>
              <span className="text-text-primary">{p}</span>
              <span className="text-gain">{c}</span>
            </div>
          ))}
          <div className="font-mono text-[11px] text-gold mt-1">+ ADD SYMBOL</div>
        </div>
      </TerminalCard>
    ),
  },
  {
    key: 'global',
    stats: '50+ Exchanges · 200+ Countries · 5 Layers · Live Chokepoints',
    title: 'Global Intelligence',
    body: 'A live 3D globe covering 50+ exchanges, shipping chokepoints, and a 200+ country database — see geopolitical risk before it shows up in your portfolio.',
    features: ['Live 3D global exchange map', '50+ exchanges tracked', 'Shipping chokepoint monitoring', '200+ country risk database'],
    visual: (
      <TerminalCard>
        <MiniHeader label="GLOBAL INTELLIGENCE" right="RISK: MODERATE" />
        <div className="p-4">
          <svg viewBox="0 0 100 60" className="w-full h-[160px]">
            <path d="M15,15 Q22,10 30,14 L36,22 Q28,28 20,25 Z" fill="rgba(30,70,140,0.4)" />
            <path d="M50,10 Q62,8 70,18 L64,30 Q52,26 50,15 Z" fill="rgba(30,70,140,0.4)" />
            <path d="M70,15 Q82,14 88,24 L80,34 Q70,30 70,15 Z" fill="rgba(30,70,140,0.4)" />
            {[[75,40],[58,20],[28,18]].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="1.4" fill="#C9A84C">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
        </div>
      </TerminalCard>
    ),
  },
]

export default function Product() {
  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[140px] pb-20 px-6 md:px-10 text-center">
        <SectionLabel center>THE TERMINAL</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-text-primary max-w-4xl mx-auto"
        >
          Seven modules. Zero compromises.
        </motion.h1>
        <p className="font-sans text-[18px] text-text-muted max-w-2xl mx-auto mt-5 leading-[1.75]">
          Every screen in Maddex is built around one idea: give Australian investors the depth of a professional terminal without the professional price tag.
        </p>
      </section>

      <div className="bg-bg-surface">
        {MODULES.map((mod, i) => (
          <section key={mod.key} className="py-16 md:py-[140px] px-6 md:px-10 border-b border-[rgba(30,70,140,0.2)] last:border-b-0">
            <div
              className={`max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-mono text-[9px] tracking-[0.25em] text-gold">MODULE {String(i + 1).padStart(2, '0')}</span>
                <h2 className="font-sans text-[30px] md:text-[42px] font-bold text-text-primary mt-3 leading-tight">{mod.title}</h2>
                <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75] max-w-[440px]">{mod.body}</p>
                <div className="flex flex-col gap-2.5 mt-6">
                  {mod.features.map((f) => (
                    <div key={f} className="font-sans text-[13px] text-text-muted flex gap-2">
                      <span className="text-gold">◆</span>
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {mod.visual}
              </motion.div>
            </div>

            <div className="max-w-[1280px] mx-auto mt-8 pt-6 border-t border-[rgba(30,70,140,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="font-mono text-[10px] tracking-[0.1em] text-text-muted text-center sm:text-left">
                <span className="text-gold">KEY STATS —</span> {mod.stats}
              </div>
              <Link to="/pricing" className="font-mono text-[11px] text-gold hover:opacity-70 transition-opacity whitespace-nowrap">
                TRY THIS MODULE FREE →
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-bg-primary py-20 md:py-[140px] px-6 md:px-10 text-center">
        <SectionLabel center>COMMAND BAR</SectionLabel>
        <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary max-w-2xl mx-auto leading-tight">
          Bloomberg-style command interface. Built for speed.
        </h2>
        <p className="font-sans text-[18px] text-text-muted max-w-xl mx-auto mt-4 leading-[1.75]">
          Type a ticker, a module name, or a plain-English question. The command bar routes it instantly.
        </p>
        <div className="max-w-[600px] mx-auto mt-10">
          <TerminalCard>
            <div className="px-4 py-3 flex items-center gap-2">
              <span className="font-mono text-[13px] font-bold text-gold">CMD&gt;</span>
              <span className="font-mono text-[13px] text-text-primary">
                <TypewriterText strings={['BHP.AX', 'MACRO', 'What is the RBA outlook?', 'CRYPTO']} />
                <span className="blink-cursor">▍</span>
              </span>
            </div>
          </TerminalCard>
        </div>
      </section>

      <section className="bg-bg-surface py-20 md:py-[140px] px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionLabel>MOBILE</SectionLabel>
            <h2 className="font-sans text-[34px] md:text-[56px] font-bold text-text-primary leading-tight">
              The full terminal. In your pocket.
            </h2>
            <p className="font-sans text-[18px] text-text-muted mt-4 leading-[1.75] max-w-[440px]">
              Every module, every score, every watchlist entry — synced in real time between desktop and mobile, so the terminal is with you between meetings, not just at your desk.
            </p>
            <div className="mt-8">
              <GoldButton to="/pricing">START FREE TRIAL</GoldButton>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[220px] h-[440px] bg-bg-primary border-4 border-bg-elevated rounded-[32px] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="w-full h-full bg-bg-surface rounded-[20px] border border-gold/15 overflow-hidden">
                <div className="bg-bg-primary border-b border-gold/12 px-3 py-2 font-mono text-[9px] text-gold">MADDEX</div>
                <div className="p-3 flex flex-col gap-2">
                  {[['ASX 200', '+0.42%'], ['BTC/AUD', '+1.80%'], ['AUD/USD', '-0.12%']].map(([s, c]) => (
                    <div key={s} className="flex justify-between font-mono text-[9px]">
                      <span className="text-text-muted">{s}</span>
                      <span className={c.startsWith('+') ? 'text-gain' : 'text-loss'}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </>
  )
}
