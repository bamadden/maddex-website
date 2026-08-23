export default function SectionSubheading({ children, center = false, className = '' }) {
  return (
    <p
      className={`font-sans text-base text-[#8BA3C4] leading-[1.6] max-w-[600px] ${
        center ? 'text-center mx-auto' : ''
      } ${className}`}
    >
      {children}
    </p>
  )
}
