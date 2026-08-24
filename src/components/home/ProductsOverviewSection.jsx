import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import SectionHeading from '../shared/SectionHeading'
import SectionSubheading from '../shared/SectionSubheading'
import GoldButton from '../shared/GoldButton'

const PRODUCTS = [
  {
    tag: 'PRODUCT 01 · LIVE NOW',
    name: 'Maddex Terminal',
    desc: 'A Bloomberg-style financial intelligence terminal for Australian retail investors. Real-time markets, MaddenAI analysis, and global intelligence — in one place.',
    price: 'From A$29/month',
    cta: 'START FREE TRIAL',
    to: '/pricing',
    live: true,
  },
  {
    tag: 'PRODUCT 02 · COMING SOON',
    name: 'MaddenAI Research Notes',
    desc: 'Institutional-quality, AI-powered equity and crypto research notes. Professionally designed PDF reports for any ASX or US ticker.',
    price: 'From A$9.99/note',
    cta: 'LEARN MORE',
    to: '/maddenai',
    live: false,
  },
  {
    tag: 'PRODUCT 03 · COMING SOON',
    name: 'MaddenAI Newsletter',
    desc: 'A standalone daily and weekly market brief — Ben\'s personal read on the markets that matter, delivered straight to your inbox.',
    price: 'Free tier available',
    cta: 'NOTIFY ME',
    to: '/research',
    live: false,
  },
]

export default function ProductsOverviewSection() {
  return (
    <section className="bg-bg-surface py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionLabel center>THE MADDEX ECOSYSTEM</SectionLabel>
        <SectionHeading center>
          One terminal today.
          <br />
          Three products coming soon.
        </SectionHeading>
        <SectionSubheading center className="mt-4">
          Maddex launches with the Terminal. Research Notes and the Newsletter follow as standalone products in the months ahead.
        </SectionSubheading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 text-left items-stretch">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={`relative rounded p-7 flex flex-col min-h-[320px] ${
                p.live
                  ? 'border border-gold/40 bg-bg-primary shadow-[0_0_30px_rgba(201,168,76,0.08)]'
                  : 'border border-[rgba(201,168,76,0.15)] bg-bg-primary opacity-90'
              }`}
            >
              <span className={`font-mono text-[9px] tracking-[0.15em] ${p.live ? 'text-gold' : 'text-text-faint'}`}>
                {p.tag}
              </span>
              <h3 className="font-sans text-[1.125rem] font-semibold text-white mt-3">{p.name}</h3>
              <p className="font-sans text-[0.875rem] text-[#8BA3C4] mt-3 leading-[1.6] flex-1">{p.desc}</p>
              <div className="font-mono text-[13px] text-gold mt-5">{p.price}</div>
              <div className="mt-5">
                {p.live ? (
                  <GoldButton to={p.to} className="w-full">{p.cta}</GoldButton>
                ) : (
                  <GoldButton to={p.to} variant="ghost" className="w-full">{p.cta}</GoldButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-text-faint max-w-2xl mx-auto mt-8 leading-[1.7]">
          Maddex provides general financial information only. Not financial advice.
        </p>
      </div>
    </section>
  )
}
