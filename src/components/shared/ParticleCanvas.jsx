import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function initParticles() {
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(201,168,76,0.2)'
      for (const p of particles) {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2)
        ctx.fill()
      }
      animationId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(201,168,76,0.03) 0, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(to bottom, rgba(201,168,76,0.03) 0, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 60px)',
        }}
      />
      <div
        className="orb-1 absolute rounded-full"
        style={{
          width: 850,
          height: 850,
          top: '-18%',
          left: '-12%',
          background: 'rgba(201,168,76,0.07)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="orb-2 absolute rounded-full"
        style={{
          width: 800,
          height: 800,
          bottom: '-22%',
          right: '-12%',
          background: 'rgba(26,127,232,0.05)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="orb-3 absolute rounded-full"
        style={{
          width: 750,
          height: 750,
          top: '20%',
          left: '35%',
          background: 'rgba(15,30,54,0.8)',
          filter: 'blur(80px)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6,13,26,0.6) 100%)',
        }}
      />
    </div>
  )
}
