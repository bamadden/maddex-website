import { COMPARISON_ROWS } from '../../data/pricing'

function ComparisonCell({ value }) {
  if (value === true) return <span className="font-bold" style={{ color: '#2D8A50' }}>✓</span>
  if (value === false) return <span style={{ color: '#4A6080' }}>✗</span>
  return <span className="font-mono text-[11px]" style={{ color: '#FFFFFF' }}>{value}</span>
}

export default function PricingComparisonTable() {
  return (
    <div
      className="overflow-x-auto rounded"
      style={{ background: '#0B1628', border: '1px solid rgba(201,168,76,0.15)' }}
    >
      <table className="w-full min-w-[640px] border-collapse" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr style={{ background: '#060D1A', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
            <th className="text-left py-3 px-4" style={{ width: '35%' }} />
            <th className="font-mono text-[13px] text-center py-3 px-3" style={{ color: '#8BA3C4', width: '21%' }}>
              CORE
            </th>
            <th
              className="font-mono text-[13px] text-center py-3 px-3"
              style={{ color: '#C9A84C', width: '22%', borderLeft: '1px solid rgba(201,168,76,0.15)', borderRight: '1px solid rgba(201,168,76,0.15)' }}
            >
              <div>PRIME</div>
              <span className="inline-block mt-1 bg-gold text-bg-primary font-mono text-[8px] font-bold px-2 py-0.5 rounded-full">
                MOST POPULAR
              </span>
            </th>
            <th className="font-mono text-[13px] text-center py-3 px-3" style={{ color: '#FFFFFF', width: '22%' }}>
              APEX
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map(([label, core, prime, apex], i) => (
            <tr
              key={label}
              className="transition-colors duration-150 hover:bg-[rgba(201,168,76,0.04)]"
              style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(15,30,54,0.4)', borderBottom: '1px solid rgba(201,168,76,0.15)', height: 48 }}
            >
              <td className="font-sans text-[13px] py-[10px] px-4" style={{ color: '#8BA3C4', width: '35%' }}>{label}</td>
              <td className="text-center py-[10px] px-3" style={{ width: '21%' }}><ComparisonCell value={core} /></td>
              <td className="text-center py-[10px] px-3" style={{ width: '22%', background: prime === true ? 'rgba(45,138,80,0.06)' : 'rgba(201,168,76,0.02)', borderLeft: '1px solid rgba(201,168,76,0.15)', borderRight: '1px solid rgba(201,168,76,0.15)' }}>
                <ComparisonCell value={prime} />
              </td>
              <td className="text-center py-[10px] px-3" style={{ width: '22%' }}><ComparisonCell value={apex} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
