import { useEffect, useState } from 'react'

export default function TypewriterText({ strings, className = '' }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let cancelled = false
    let stringIndex = 0

    async function loop() {
      while (!cancelled) {
        const target = strings[stringIndex % strings.length]

        for (let i = 0; i <= target.length; i++) {
          if (cancelled) return
          setDisplay(target.slice(0, i))
          await wait(80 + Math.random() * 30)
        }

        await wait(2000 + Math.random() * 1000)

        for (let i = target.length; i >= 0; i--) {
          if (cancelled) return
          setDisplay(target.slice(0, i))
          await wait(40)
        }

        stringIndex++
      }
    }

    function wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }

    loop()
    return () => {
      cancelled = true
    }
  }, [strings])

  return <span className={className}>{display}</span>
}
