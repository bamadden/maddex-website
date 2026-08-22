import { Link } from 'react-router-dom'

const PRE_FOOTER_ITEMS = [
  { symbol: 'ASX 200', price: '8,412.40', change: '+0.42%', positive: true },
  { symbol: 'BTC/AUD', price: 'A$162,400', change: '+1.80%', positive: true },
  { symbol: 'AUD/USD', price: '0.6452', change: '-0.12%', positive: false },
  { symbol: 'GOLD', price: 'A$4,821', change: '+0.30%', positive: true },
]

export default function Footer() {
  return (
    <footer>
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)' }}
      />
      <div className="h-9 bg-bg-elevated border-t border-b border-gold/20 overflow-hidden relative">
        <div className="flex ticker-track w-max h-full items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-6 pl-6">
              <span className="font-mono text-[9px] text-gold flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
                LIVE
              </span>
              {PRE_FOOTER_ITEMS.map((item) => (
                <span key={item.symbol} className="font-mono text-[10px] text-text-muted flex items-center gap-1.5 shrink-0">
                  <span className="text-gold font-semibold">{item.symbol}</span>
                  <span className="text-text-primary">{item.price}</span>
                  <span className={item.positive ? 'text-gain' : 'text-loss'}>
                    {item.positive ? '▲' : '▼'} {item.change}
                  </span>
                </span>
              ))}
              <span className="font-mono text-[10px] text-gold shrink-0 pr-6">MaddenAI 72/100</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg-primary px-6 md:px-10 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="font-mono text-[15px] font-bold text-gold">MADDEX</div>
          <p className="font-sans text-[12px] text-text-muted mt-2 leading-[1.6] max-w-[420px]">
            Professional financial intelligence for Australian investors.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-7">
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
            <div className="font-mono text-[9px] tracking-[0.2em] text-gold mb-4">CONNECT</div>
            <div className="flex flex-col gap-3">
              {['LinkedIn', 'Twitter/X'].map((s) => (
                <a
                  key={s}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-sans text-[12px] text-text-muted hover:text-gold transition-all inline-flex items-center gap-1"
                >
                  {s}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto border-t border-[rgba(30,70,140,0.3)] mt-8 pt-4 flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
          <p className="font-mono text-[9px] text-text-faint max-w-[560px] leading-[1.6]">
            General information only. Not financial advice — nothing here is a recommendation to buy or sell any financial product.
          </p>
          <p className="font-mono text-[9px] text-text-faint shrink-0">© 2026 Madden Group Holdings Pty Ltd · ABN [pending]</p>
        </div>
      </div>
    </footer>
  )
}
