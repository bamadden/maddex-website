const KEYWORDS = [
  'AUSTRALIAN FINANCIAL INTELLIGENCE',
  'MADDENAI POWERED',
  'ASX 200 COVERAGE',
  'REAL-TIME MARKET DATA',
  'RBA MONETARY POLICY',
  'GLOBAL INTELLIGENCE MAP',
  '200+ COUNTRIES TRACKED',
  '28+ NEWS SOURCES',
  'IRON ORE & COMMODITIES',
  'AUD CURRENCY INTELLIGENCE',
  'CRYPTO MARKETS LIVE',
  'SECTOR ROTATION ANALYSIS',
  'GEOPOLITICAL RISK MONITORING',
  'SHIPPING CHOKEPOINTS',
  'BLOOMBERG ALTERNATIVE',
  'FROM A$19/MONTH',
  '7-DAY FREE TRIAL',
  'NO CREDIT CARD REQUIRED',
  'PROFESSIONAL GRADE',
  'AUSTRALIAN INVESTOR FOCUS',
  'MADDENAI SENTIMENT SCORING',
  'YIELD CURVE ANALYSIS',
  'CENTRAL BANK INTELLIGENCE',
  'EQUITY SCREENER',
  'PORTFOLIO ANALYTICS',
]

function TickerItem({ text }) {
  return (
    <div className="flex items-center gap-4 px-4 h-7 hover:bg-gold/[0.06] transition-colors duration-150 shrink-0">
      <span className="font-mono text-[10px] text-text-muted whitespace-nowrap">{text}</span>
      <span className="text-[10px] text-gold shrink-0">◆</span>
    </div>
  )
}

export default function TickerTape() {
  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-bg-primary border-b border-gold/10 overflow-hidden z-[1001]">
      <div className="flex ticker-track-keywords w-max h-full items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {KEYWORDS.map((text, idx) => (
              <TickerItem key={`${copy}-${idx}`} text={text} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
