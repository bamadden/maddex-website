export default function TerminalCard({ children, className = '' }) {
  return (
    <div
      className={`bg-bg-primary border border-gold/20 rounded overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}
