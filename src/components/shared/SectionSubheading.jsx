export default function SectionSubheading({ children, center = false, className = '' }) {
  return (
    <p
      className={`section-subheading ${
        center ? 'text-center mx-auto' : ''
      } ${className}`}
    >
      {children}
    </p>
  )
}
