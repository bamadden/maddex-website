import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import SectionHeading from '../shared/SectionHeading'

const CARDS = [
  {
    border: '#A83232',
    label: 'BLOOMBERG TERMINAL',
    price: 'A$42,000 / YEAR',
    priceColor: 'text-text-primary',
    bg: 'rgba(168,50,50,0.05)',
    features: [
      { name: 'Real-time global data', value: '✓', color: '#2D8A50' },
      { name: 'Built for retail investors', value: '✗', color: '#A83232' },
      { name: 'AI-powered analysis', value: '✗', color: '#A83232' },
      { name: 'Australian market focus', value: '✗', color: '#A83232' },
    ],
  },
  {
    border: '#4A6080',
    label: 'RETAIL APPS',
    price: 'FREE',
    priceColor: 'text-text-primary',
    features: [
      { name: 'Real-time global data', value: '✗', color: '#A83232' },
      { name: 'Institutional-grade depth', value: '✗', color: '#A83232' },
      { name: 'AI-powered analysis', value: '✗', color: '#A83232' },
      { name: 'Global intelligence', value: '✗', color: '#A83232' },
    ],
  },
  {
    border: '#C9A84C',
    label: 'MADDEX',
    price: 'FROM A$29 / MONTH',
    priceColor: 'text-gold',
    highlight: true,
    bg: 'rgba(201,168,76,0.03)',
    features: [
      { name: 'Real-time global data', value: '✓', color: '#C9A84C' },
      { name: 'Built for Australian investors', value: '✓', color: '#C9A84C' },
      { name: 'MaddenAI-powered analysis', value: '✓', color: '#C9A84C' },
      { name: 'Global market intelligence', value: '✓', color: '#C9A84C' },
    ],
  },
]

export default function ProblemSection() {
  return (
    <section className="bg-bg-surface py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
        <div className="flex flex-col">
          <SectionLabel>THE INFORMATION GAP</SectionLabel>
          <SectionHeading>
            Bloomberg: A$42,000/yr.
            <br />
            Your broker app: free.
            <br />
            Neither serves you.
          </SectionHeading>

          <div className="font-sans text-[17px] text-text-muted leading-[1.75] mt-8 flex flex-col gap-4">
            <p>
              Bloomberg Terminal was built for trading desks, not individual investors — and priced accordingly. Most Australians will never see one, let alone afford it.
            </p>
            <p>
              Meanwhile, free broker apps give you a share price and not much else. No macro context, no sentiment scoring, no synthesis — just numbers with nowhere to go.
            </p>
          </div>

          <div className="font-mono text-[11px] text-text-muted bg-gold/5 border-l-2 border-gold px-4 py-2.5 mt-8">
            Less than a Bloomberg in a single day.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3" style={{
            gap: '1px',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '4px',
            margin: '32px 0',
            overflow: 'hidden',
          }}>
            {[
              { icon: '🔒', label: 'SECURED BY SUPABASE', sub: 'Enterprise-grade auth' },
              { icon: '🇦🇺', label: 'BUILT IN AUSTRALIA', sub: 'Brisbane, Queensland' },
              { icon: '⚡', label: 'ALWAYS ON', sub: 'Real-time data pipeline' },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{
                background: '#0B1628',
                padding: '10px 20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '15px', marginBottom: '4px', lineHeight: 1 }}>{icon}</div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  color: '#C9A84C',
                  marginBottom: '2px',
                  lineHeight: 1.2,
                }}>{label}</div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '9px',
                  color: '#8BA3C4',
                  lineHeight: 1.2,
                }}>{sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              ['70+', 'Markets covered'],
              ['8', 'Modules included'],
              ['A$29', 'Starting price'],
            ].map(([n, l]) => (
              <div key={l} className="border-t border-[rgba(201,168,76,0.15)] pt-4">
                <div className="font-mono text-[22px] font-bold text-gold">{n}</div>
                <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.08em] mt-1.5">{l}</div>
              </div>
            ))}
          </div>

          <div
            className="flex-1 flex flex-col mt-8"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--card-radius)', padding: 'var(--space-7, 28px)', height: '100%' }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'var(--gold)',
              marginBottom: '4px',
            }}>MARKET PULSE</div>

            <div className="flex-1 flex flex-col justify-center">
              {[
                { label: 'ASX 200', value: '8,247.3', change: '+0.42%', up: true },
                { label: 'BHP.AX', value: 'A$43.21', change: '+1.27%', up: true },
                { label: 'AUD/USD', value: '0.6520', change: '+0.18%', up: true },
                { label: 'BTC', value: 'A$92,285', change: '+0.52%', up: true },
                { label: 'Gold', value: 'US$2,487', change: '+0.8%', up: true },
                { label: 'Iron Ore', value: 'US$98/t', change: '+2.3%', up: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                  style={{ padding: '10px 0', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
                >
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#8BA3C4' }}>
                    {item.label}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#FFFFFF', marginRight: '8px' }}>
                      {item.value}
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: item.up ? '#2D8A50' : '#A83232' }}>
                      {item.up ? '▲' : '▼'} {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(201,168,76,0.1)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '9px',
              color: '#4A6080',
              letterSpacing: '0.1em',
            }}>
              DEMO DATA · LIVE ON SUBSCRIPTION
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-9 lg:mt-0 justify-center">
          {CARDS.map((card, i) => (
            <motion.div key={card.label}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.055, duration: 0.5 }}
                className={`rounded p-7 min-h-[220px] flex flex-col justify-center ${
                  card.highlight
                    ? 'scale-[1.02] shadow-[0_0_30px_rgba(201,168,76,0.1)]'
                    : ''
                }`}
                style={{
                  borderLeft: `3px solid ${card.border}`,
                  backgroundColor: '#060D1A',
                  backgroundImage: card.bg ? `linear-gradient(${card.bg}, ${card.bg})` : 'none',
                }}
              >
                <div className="font-mono text-[9px] tracking-[0.15em] text-gold">{card.label}</div>
                <div className={`font-sans text-[26px] font-bold mt-2 ${card.priceColor}`}>{card.price}</div>
                {card.features.map((f) => (
                  <div key={f.name} className="flex justify-between font-sans text-[13px] mt-3.5">
                    <span className="text-text-muted">{f.name}</span>
                    <span style={{ color: f.color }}>{f.value}</span>
                  </div>
                ))}
              </motion.div>

              {i === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center justify-center gap-4 py-6"
                >
                  <div className="text-center">
                    <div className="font-mono text-[32px] font-bold text-loss line-through decoration-2">A$42,000</div>
                  </div>
                  <div className="font-mono text-[12px] text-text-faint">vs</div>
                  <div className="text-center">
                    <div className="font-mono text-[32px] font-bold text-gold">A$348</div>
                  </div>
                  <div className="hidden sm:block font-mono text-[10px] text-text-muted max-w-[120px] leading-snug ml-2">
                    Per year · Bloomberg vs Maddex Core
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
