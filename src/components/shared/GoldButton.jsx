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
    'inline-flex items-center justify-center gap-2 font-sans text-[13px] font-bold px-5 py-[9px] rounded transition-all duration-150 whitespace-nowrap'

  const styles =
    variant === 'solid'
      ? 'bg-gold text-bg-primary hover:brightness-110 hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]'
      : 'bg-transparent text-gold border border-gold/40 hover:border-gold hover:bg-gold/10'

  const content = (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
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
