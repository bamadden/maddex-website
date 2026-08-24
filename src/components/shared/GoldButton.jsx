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
      ? 'bg-gold text-bg-primary hover:opacity-90'
      : 'bg-transparent text-gold border border-[rgba(201,168,76,0.4)] hover:opacity-90 hover:border-[rgba(201,168,76,0.7)]'

  // The inner span can be told to go full-width via a `w-full` class, but an
  // `inline-block` wrapper shrinks to fit its content regardless — a
  // percentage width on an indefinitely-sized box resolves to auto. So the
  // wrapper has to switch to a block box whenever full width is requested.
  const isFullWidth = className.includes('w-full')
  const wrapperClass = isFullWidth ? 'block w-full text-center' : 'inline-block'

  const content = (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
      style={{ padding: '14px 28px', borderRadius: 0 }}
      {...props}
    >
      {children}
    </motion.span>
  )

  if (to) {
    return (
      <Link to={to} className={wrapperClass}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={wrapperClass}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={wrapperClass}>
      {content}
    </button>
  )
}
