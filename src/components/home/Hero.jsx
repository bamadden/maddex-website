import ParticleCanvas from '../shared/ParticleCanvas'
import GoldButton from '../shared/GoldButton'
import AnimatedTerminalMockup from './AnimatedTerminalMockup'

const HERO_STATS = [
  { value: '70+', label: 'Global markets' },
  { value: '8', label: 'Modules' },
  { value: 'MaddenAI', label: 'Powered' },
  { value: 'A$29/mo', label: 'From' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-bg-primary overflow-hidden flex items-center">
      <ParticleCanvas />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 w-full pt-24 pb-16 text-center">
        <div className="hero-eyebrow font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-6">
          Financial Intelligence Terminal
        </div>

        <h1
          className="hero-headline font-sans mx-auto"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: 'white',
            textAlign: 'center',
            maxWidth: 800,
            marginBottom: 24,
          }}
        >
          The terminal built for
          <br />
          the everyday investor.
        </h1>

        <p
          className="hero-sub font-sans mx-auto"
          style={{
            fontSize: '1.125rem',
            color: '#8BA3C4',
            textAlign: 'center',
            maxWidth: 500,
            marginBottom: 40,
            lineHeight: 1.6,
          }}
        >
          ASX and global markets. AI-powered analysis. No Bloomberg price tag.
        </p>

        <div className="hero-cta flex items-center justify-center gap-3 mb-12 flex-wrap">
          <GoldButton to="/pricing">Start Free Trial</GoldButton>
          <GoldButton to="/pricing" variant="ghost">
            View Pricing
          </GoldButton>
        </div>

        <div className="hero-terminal text-left">
          <AnimatedTerminalMockup />
        </div>

        <div className="hero-stats flex items-center justify-center divide-x divide-[rgba(30,70,140,0.3)] flex-wrap gap-y-4 mt-12">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col px-6">
              <span className="font-mono text-2xl font-bold text-gold leading-none">{stat.value}</span>
              <span className="font-mono text-[11px] text-text-muted mt-1 whitespace-nowrap uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="hero-trust font-mono text-xs text-text-muted text-center mt-6">
          General information only · Not financial advice · Built in Australia
        </div>
      </div>
    </section>
  )
}
