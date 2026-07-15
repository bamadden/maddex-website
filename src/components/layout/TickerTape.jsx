const TICKER_DATA = [
  { symbol: 'ASX 200', price: '8,412.40', change: '+0.42%', positive: true },
  { symbol: 'BTC/AUD', price: 'A$162,400', change: '+1.80%', positive: true },
  { symbol: 'AUD/USD', price: '0.6452', change: '-0.12%', positive: false },
  { symbol: 'GOLD', price: 'A$4,821', change: '+0.30%', positive: true },
  { symbol: 'S&P 500', price: '5,847.23', change: '+0.40%', positive: true },
  { symbol: 'IRON ORE', price: 'US$98.20', change: '-0.80%', positive: false },
  { symbol: 'ETH/AUD', price: 'A$6,124', change: '+2.10%', positive: true },
  { symbol: 'NASDAQ', price: '18,921.56', change: '+0.50%', positive: true },
  { symbol: 'RBA RATE', price: '4.35%', change: 'HOLD', positive: true },
  { symbol: 'VIX', price: '14.20', change: '-2.10%', positive: false },
  { symbol: 'WTI OIL', price: 'US$78.40', change: '+0.60%', positive: true },
  { symbol: 'SILVER', price: 'A$38.20', change: '+0.45%', positive: true },
]

function TickerItem({ item, idx }) {
  return (
    <div
      key={idx}
      className="flex items-center gap-1.5 px-4 h-8 hover:bg-gold/[0.06] transition-colors duration-150 shrink-0"
    >
      <span className="font-mono text-[10px] font-semibold text-gold">{item.symbol}</span>
      <span className="font-mono text-[10px] text-text-primary">{item.price}</span>
      <span
        className={`font-mono text-[10px] ${item.positive ? 'text-gain' : 'text-loss'}`}
      >
        {item.change === 'HOLD' ? '' : item.positive ? '▲ ' : '▼ '}
        {item.change}
      </span>
      <span className="text-[8px] text-gold/30 ml-2">◆</span>
    </div>
  )
}

export default function TickerTape() {
  return (
    <div className="h-8 bg-bg-primary border-b border-gold/15 overflow-hidden relative">
      <div className="flex ticker-track w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex">
            {TICKER_DATA.map((item, idx) => (
              <TickerItem key={`${copy}-${idx}`} item={item} idx={idx} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export { TICKER_DATA }
