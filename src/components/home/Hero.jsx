import ParticleCanvas from '../shared/ParticleCanvas'
import GoldButton from '../shared/GoldButton'
import AnimatedTerminalMockup from './AnimatedTerminalMockup'

const HERO_STATS = [
  { value: '70+', label: 'Global markets' },
  { value: '8', label: 'Modules' },
  { value: 'AI', label: 'MaddenAI powered' },
  { value: 'A$29', label: 'Per month' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-bg-primary overflow-hidden flex items-center">
      <ParticleCanvas />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full pt-24 pb-16">
        <div>
          <div className="hero-goldline h-px bg-gold/50 mb-5" />

          <div className="hero-eyebrow font-mono text-[9px] tracking-[0.25em] text-gold mb-5">
            FINANCIAL INTELLIGENCE TERMINAL
          </div>

          <h1
            className="hero-headline font-sans"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'white',
              maxWidth: '600px',
            }}
          >
            The terminal built for
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            the everyday investor.
          </h1>

          <p className="hero-sub font-sans text-base text-text-muted leading-relaxed max-w-sm mt-6">
            ASX and global markets. AI analysis. No Bloomberg price tag.
          </p>

          <div className="hero-cta flex items-center gap-4 mt-9 flex-wrap">
            <GoldButton to="/pricing">Start Free Trial</GoldButton>
            <GoldButton to="/pricing" variant="ghost">
              See Pricing
            </GoldButton>
          </div>

          <div className="hero-stats flex items-center mt-9 divide-x divide-[rgba(30,70,140,0.3)] flex-wrap gap-y-4">
            {HERO_STATS.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col ${i === 0 ? 'pr-6' : 'px-6'}`}>
                <span className="font-mono text-[32px] font-bold text-gold leading-none">{stat.value}</span>
                <span className="font-sans text-[12px] text-text-muted mt-2 whitespace-nowrap">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-trust font-mono text-[10px] text-text-faint mt-8 tracking-wide leading-[1.8]">
            General information only · Not financial advice
          </div>
        </div>

        <div
          className="hero-terminal relative mt-10 lg:mt-0 w-full max-w-[640px] mx-auto lg:mx-0 lg:ml-auto"
          style={{ transform: 'translateY(-8px)' }}
        >
          <AnimatedTerminalMockup />
        </div>
      </div>

      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center hidden md:flex">
        <span className="font-mono text-[9px] tracking-[0.2em] text-text-faint mb-2">SCROLL</span>
        <div className="w-px h-10 bg-gold/30 mb-2" />
        <span className="hero-scroll-bounce font-mono text-[12px] text-gold inline-block">
          ▼
        </span>
      </div>
    </section>
  )
}
