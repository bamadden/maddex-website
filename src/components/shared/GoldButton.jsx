import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function GoldButton({
  children,
  to,
  href,
  onClick,
  variant = 'solid',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-mono text-[12px] font-bold tracking-[0.08em] transition-all duration-150 whitespace-nowrap'

  const styles =
    variant === 'solid'
      ? 'bg-gold text-bg-primary hover:brightness-110 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]'
      : 'bg-transparent text-gold border border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.7)]'

  const content = (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
      style={{ padding: '14px 28px', borderRadius: 3 }}
      {...props}
    >
      {children}
    </motion.span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className="inline-block">
      {content}
    </button>
  )
}
