import useInView from '../../hooks/useInView'

// Section-level scroll reveal. Deliberately plain CSS transition (not
// framer-motion) — this wraps whole sections including ones whose children
// already run their own whileInView animations, and stacking two motion
// systems on the same subtree gets fiddly. Fast (0.4s): a reveal, not a
// production.
export default function FadeInSection({ children, className = '', style = {}, id }) {
  const [ref, inView] = useInView(0.1)
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(16px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {children}
    </section>
  )
}
