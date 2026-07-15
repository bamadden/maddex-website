const NAMES = ['QUT', 'QLD GOVERNMENT', 'MACQUARIE GRADUATES', 'ANZ', 'COMMONWEALTH BANK']

export default function LogosBar() {
  return (
    <div className="bg-bg-surface border-t border-b border-[rgba(30,70,140,0.3)] h-auto md:h-12 py-4 md:py-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-10 max-w-[1280px] mx-auto gap-3 md:gap-0">
      <span className="font-mono text-[9px] tracking-[0.1em] text-text-faint shrink-0">
        BETA USERS FROM
      </span>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {NAMES.map((name) => (
          <span key={name} className="font-mono text-[11px] text-text-faint">
            {name}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-mono text-[12px] text-gold">★★★★★</span>
        <span className="font-sans text-[12px] text-text-muted">4.9 / 5.0</span>
      </div>
    </div>
  )
}
