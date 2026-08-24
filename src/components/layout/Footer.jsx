import { Link } from 'react-router-dom'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.25 8.75h3.4V21h-3.4V8.75Zm6.35 0h3.26v1.68h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.08 2.27 4.08 5.22V21h-3.4v-5.55c0-1.32-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93V21h-3.4V8.75Z" />
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M18.9 2.5h3.1l-6.77 7.74L23.2 21.5h-6.23l-4.88-6.39-5.58 6.39H3.4l7.24-8.28L2.8 2.5h6.39l4.41 5.84 5.3-5.84Zm-1.09 17.16h1.72L7.34 4.25H5.49l12.32 15.41Z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A9.99 9.99 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
]

const PRE_FOOTER_ITEMS = [
  { symbol: 'ASX 200', price: '8,412.40', change: '+0.42%', positive: true },
  { symbol: 'BTC/AUD', price: 'A$162,400', change: '+1.80%', positive: true },
  { symbol: 'AUD/USD', price: '0.6452', change: '-0.12%', positive: false },
  { symbol: 'GOLD', price: 'A$4,821', change: '+0.30%', positive: true },
]

function tickerItems(copy) {
  return [
    <span key={`${copy}-live`} className="font-mono text-[9px] text-gold flex items-center gap-1.5 shrink-0 pr-8">
      <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
      LIVE
    </span>,
    ...PRE_FOOTER_ITEMS.map((item) => (
      <span key={`${copy}-${item.symbol}`} className="font-mono text-[10px] text-text-muted flex items-center gap-1.5 shrink-0 pr-8">
        <span className="text-gold font-semibold">{item.symbol}</span>
        <span className="text-text-primary">{item.price}</span>
        <span className={item.positive ? 'text-gain' : 'text-loss'}>
          {item.positive ? '▲' : '▼'} {item.change}
        </span>
      </span>
    )),
    <span key={`${copy}-score`} className="font-mono text-[10px] text-gold shrink-0 pr-8">MaddenAI 72/100</span>,
  ]
}

export default function Footer() {
  return (
    <footer>
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)' }}
      />
      <div className="h-9 bg-bg-elevated border-t border-b border-gold/20 overflow-hidden relative pl-6">
        <div className="flex ticker-track h-full items-center" style={{ width: 'max-content' }}>
          {tickerItems(0)}
          {tickerItems(1)}
        </div>
      </div>

      <div
        className="px-6 md:px-10 py-8"
        style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.03), transparent 40px), #030912' }}
      >
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="font-mono text-[15px] font-bold text-gold">MADDEX</div>
          <p className="font-sans text-[13px] text-text-muted mt-3 max-w-[440px] mx-auto leading-[1.6]">
            Maddex is a financial intelligence terminal built for everyday Australian investors.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-9">
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-gold mb-4">PRODUCT</div>
            <div className="flex flex-col gap-3">
              {[
                ['Terminal', '/product'],
                ['MaddenAI', '/maddenai'],
                ['Pricing', '/pricing'],
                ['Research Notes (Coming Soon)', '/pricing#research-notes'],
                ['Newsletter (Coming Soon)', '/research'],
              ].map(([label, to]) => (
                <Link key={label} to={to} className="font-sans text-[12px] text-text-muted hover:text-gold transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-gold mb-4">COMPANY</div>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="font-sans text-[12px] text-text-muted hover:text-gold transition-colors">
                About
              </Link>
              <a href="mailto:ben@maddex.com.au" className="font-sans text-[12px] text-text-muted hover:text-gold transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-gold mb-4">LEGAL</div>
            <div className="flex flex-col gap-3">
              {[
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
                ['Disclaimer', '/disclaimer'],
              ].map(([label, to]) => (
                <Link key={label} to={to} className="font-sans text-[12px] text-text-muted hover:text-gold transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-gold mb-4">QUICK START</div>
            <div className="flex flex-col gap-3">
              <Link to="/pricing" className="font-sans text-[12px] text-text-muted hover:text-gold transition-colors">
                Start free trial
              </Link>
              <Link to="/pricing" className="font-sans text-[12px] text-text-muted hover:text-gold transition-colors">
                View pricing
              </Link>
              <Link to="/product" className="font-sans text-[12px] text-text-muted hover:text-gold transition-colors">
                Read the docs
              </Link>
              <a href="mailto:ben@maddex.com.au" className="font-sans text-[12px] text-text-muted hover:text-gold transition-colors">
                Contact Ben
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto flex justify-center items-center gap-5 mt-9">
          {SOCIAL_LINKS.map(({ label, icon }) => (
            <a
              key={label}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-gold transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>

        <div className="max-w-[1200px] mx-auto border-t border-[rgba(30,70,140,0.3)] mt-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-center text-center md:text-left">
          <p className="font-mono text-[9px] text-text-faint">© 2026 Madden Group Holdings Pty Ltd</p>
          <p className="font-mono text-[9px] text-text-faint md:text-center">General information only · Not financial advice</p>
          <p className="font-mono text-[9px] text-text-faint md:text-right">ABN — Pending registration</p>
        </div>
      </div>
    </footer>
  )
}
