import ParticleCanvas from '../shared/ParticleCanvas'
import GoldButton from '../shared/GoldButton'
import AnimatedTerminalMockup from './AnimatedTerminalMockup'

const HERO_STATS = [
  { value: '70+', label: 'Markets' },
  { value: '8', label: 'Modules' },
  { value: 'A$29', label: '/mo' },
  { value: '7-day', label: 'Trial' },
]

export default function Hero() {
  return (
    <section className="relative bg-bg-primary overflow-hidden">
      <ParticleCanvas />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 pt-[84px]">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{ gap: 48, minHeight: '80vh' }}
        >
          <div>
            <div className="hero-eyebrow font-mono text-[10px] tracking-[0.2em] text-gold uppercase mb-4">
              Financial Intelligence Terminal
            </div>

            <h1
              className="hero-headline font-sans"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'white',
                maxWidth: 500,
              }}
            >
              The terminal built for
              <br />
              the everyday investor.
            </h1>

            <p
              className="hero-sub font-sans"
              style={{
                fontSize: '1rem',
                color: '#8BA3C4',
                maxWidth: 380,
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              ASX and global markets. AI-powered analysis. No Bloomberg price tag.
            </p>

            <div className="hero-stats grid grid-cols-4 mt-8 mb-8 max-w-[420px]">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-mono text-xl font-bold text-gold leading-none">{stat.value}</span>
                  <span className="font-mono text-[10px] text-text-muted mt-1.5 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="hero-cta flex items-center flex-wrap" style={{ gap: 12 }}>
              <GoldButton to="/pricing">Start Free Trial</GoldButton>
              <GoldButton to="/pricing" variant="ghost">
                View Pricing
              </GoldButton>
            </div>

            <div className="hero-trust font-mono text-[10px] text-text-muted mt-6">
              General information only · Not financial advice
            </div>
          </div>

          <div className="hero-terminal self-stretch text-left">
            <AnimatedTerminalMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
