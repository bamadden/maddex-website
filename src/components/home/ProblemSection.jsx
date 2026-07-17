import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

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
    border: '#3D5070',
    label: 'RETAIL PLATFORMS',
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
    price: 'FROM A$19 / MONTH',
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
    <section className="bg-bg-surface py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        <div>
          <SectionLabel>THE INFORMATION GAP</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="font-sans text-[34px] md:text-[48px] lg:text-[58px] font-bold leading-[1.05] tracking-tight text-text-primary"
          >
            Bloomberg: A$42,000/yr.
            <br />
            Your broker app: free.
            <br />
            Neither serves you.
          </motion.h2>

          <div className="font-sans text-[18px] text-text-muted leading-[1.75] mt-8 flex flex-col gap-4">
            <p>
              Bloomberg Terminal was built for trading desks, not individual investors — and priced accordingly. Most Australians will never see one, let alone afford it.
            </p>
            <p>
              Meanwhile, free broker apps give you a share price and not much else. No macro context, no sentiment scoring, no synthesis — just numbers with nowhere to go.
            </p>
          </div>

          <div className="font-mono text-[11px] text-text-muted bg-gold/5 border-l-2 border-gold px-4 py-2.5 mt-8">
            Bloomberg Terminal annual price increase (2024): +8.6% ▲
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-12 lg:mt-0">
          {CARDS.map((card, i) => (
            <motion.div key={card.label}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
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
                    <div className="font-mono text-[32px] font-bold text-gold">A$228</div>
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
