import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

const CARDS = [
  {
    border: '#A83232',
    label: 'BLOOMBERG TERMINAL',
    price: 'A$42,000 / YEAR',
    priceColor: 'text-text-primary',
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
    <section className="bg-bg-primary py-24 md:py-[120px] px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        <div>
          <SectionLabel>THE INFORMATION GAP</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="font-sans text-[34px] md:text-[44px] lg:text-[52px] font-bold leading-[1.05] tracking-tight text-text-primary"
          >
            Bloomberg: A$42,000/yr.
            <br />
            Your broker app: free.
            <br />
            Neither serves you.
          </motion.h2>

          <div className="font-sans text-[17px] text-text-muted leading-[1.7] mt-8 flex flex-col gap-4">
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

        <div className="flex flex-col gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`bg-bg-surface rounded p-5 ${card.highlight ? 'scale-[1.01] shadow-[0_0_20px_rgba(201,168,76,0.08)]' : ''}`}
              style={{ borderLeft: `3px solid ${card.border}` }}
            >
              <div className="font-mono text-[9px] tracking-[0.1em] text-gold">{card.label}</div>
              <div className={`font-sans text-[24px] font-bold mt-1.5 ${card.priceColor}`}>{card.price}</div>
              {card.features.map((f) => (
                <div key={f.name} className="flex justify-between font-sans text-[12px] mt-3">
                  <span className="text-text-muted">{f.name}</span>
                  <span style={{ color: f.color }}>{f.value}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
