import { useEffect, useState } from 'react'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('maddex_cookie_consent')
    if (!consent) setShow(true)
  }, [])

  const acceptAll = () => {
    localStorage.setItem('maddex_cookie_consent', 'all')
    localStorage.setItem('maddex_cookie_date', new Date().toISOString())
    setShow(false)
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const acceptEssential = () => {
    localStorage.setItem('maddex_cookie_consent', 'essential')
    localStorage.setItem('maddex_cookie_date', new Date().toISOString())
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#0B1628',
      borderTop: '1px solid rgba(201,168,76,0.2)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      zIndex: 9999,
      flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: '#8BA3C4',
          margin: 0,
          lineHeight: 1.5,
        }}>
          We use cookies to improve your experience and
          analyse site usage. See our{' '}
          <a href="/privacy" style={{ color: '#C9A84C' }}>
            Privacy Policy
          </a>.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
        <button
          onClick={acceptEssential}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: '#8BA3C4',
            background: 'transparent',
            border: '1px solid rgba(201,168,76,0.2)',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
        >
          ESSENTIAL ONLY
        </button>
        <button
          onClick={acceptAll}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: '#060D1A',
            background: '#C9A84C',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
        >
          ACCEPT ALL
        </button>
      </div>
    </div>
  )
}
