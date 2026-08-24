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
  const styles = variant === 'solid' ? 'btn-primary' : 'btn-secondary'

  // The inner span can be told to go full-width via a `w-full` class, but an
  // `inline-block` wrapper shrinks to fit its content regardless — a
  // percentage width on an indefinitely-sized box resolves to auto. So the
  // wrapper has to switch to a block box whenever full width is requested.
  const isFullWidth = className.includes('w-full')
  const wrapperClass = isFullWidth ? 'block w-full text-center' : 'inline-block'

  const content = (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className={`${styles} inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  )

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={wrapperClass}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} onClick={onClick} className={wrapperClass}>
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
