import React from 'react'
import { Link } from 'react-router-dom'
import { useAnalytics } from '../../hooks/useAnalytics'

function Particles() {
  const particles = React.useMemo(
    () =>
      Array(12)
        .fill(0)
        .map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: 15 + Math.random() * 20,
          delay: Math.random() * -20,
          size: Math.random() > 0.5 ? 1.5 : 2.5,
        })),
    []
  )

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.3)',
            animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

function LiveClock() {
  const [time, setTime] = React.useState('')

  React.useEffect(() => {
    const update = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-AU', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      })
      const city = Intl.DateTimeFormat().resolvedOptions().timeZone
        .split('/').pop().replace('_', ' ').toUpperCase()
      setTime(`${timeStr} ${city}`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '10px',
      letterSpacing: '0.25em',
      color: '#4A6080',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    }}>
      <span style={{
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: '#C9A84C',
        animation: 'pulse 2s ease-in-out infinite',
      }} />
      {time || '--:--:-- --'}
    </div>
  )
}

export default function Hero() {
  const { trackCTA } = useAnalytics()
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '140px 24px 80px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.04) 0%, transparent 60%), #060D1A',
    }}>

      {/* Background grid lines — subtle */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <Particles />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

        <LiveClock />

        <h1 style={{
          fontSize: 'clamp(3.5rem, 7vw, 6rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: '#FFFFFF',
          fontFamily: "'Inter', sans-serif",
          marginTop: '28px',
        }}>
          Institutional intelligence.<br />
          Everyday pricing.
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: '#8BA3C4',
          lineHeight: 1.6,
          maxWidth: '480px',
          margin: '24px auto 0',
          fontFamily: "'Inter', sans-serif",
        }}>
          The terminal for investors who take markets seriously.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '36px',
          flexWrap: 'wrap',
        }}>
          <Link
            to="/pricing"
            onClick={() => trackCTA('start_trial', 'hero')}
            style={{
              background: '#C9A84C',
              color: '#060D1A',
              padding: '14px 32px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              display: 'inline-block',
              borderRadius: 0,
              transition: 'opacity 0.15s',
            }}>
            Start Free Trial
          </Link>
          <Link to="/pricing" style={{
            background: 'transparent',
            color: '#C9A84C',
            padding: '14px 32px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: 0,
            display: 'inline-block',
            transition: 'opacity 0.15s',
          }}>
            View Pricing
          </Link>
        </div>

        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '9px',
          color: '#4A6080',
          letterSpacing: '0.1em',
          marginTop: '20px',
        }}>
          7-day free trial · No credit card · General information only
        </div>

        {/* Terminal simulator — product demo, full width below the fold */}
        <div style={{
          maxWidth: '1100px',
          width: '100%',
          margin: '72px auto 0',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: '4px',
          overflow: 'hidden',
          textAlign: 'left',
          boxShadow: `
            0 0 0 1px rgba(201,168,76,0.05),
            0 24px 80px rgba(0,0,0,0.6),
            0 0 120px rgba(201,168,76,0.04)
          `,
          fontFamily: "'IBM Plex Mono', monospace",
        }}>

          {/* Window Chrome */}
          <div style={{
            background: '#060D1A',
            borderBottom: '1px solid rgba(201,168,76,0.15)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '0',
          }}>
            <div style={{ display: 'flex', gap: '6px', marginRight: 'auto' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41' }} />
            </div>
            <span style={{ fontSize: '10px', color: '#4A6080', letterSpacing: '0.2em' }}>
              MADDEX TERMINAL
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#2D8A50',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '8px', color: '#2D8A50', letterSpacing: '0.1em' }}>LIVE</span>
            </div>
          </div>

          {/* Ticker Tape */}
          <div style={{
            background: 'rgba(0,0,0,0.5)',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
            padding: '6px 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}>
            <div style={{
              display: 'inline-flex',
              animation: 'ticker 35s linear infinite',
              fontSize: '9px',
              color: '#8BA3C4',
            }}>
              {/* Duplicate for seamless loop — each item carries its own trailing
                  margin (rather than a flex `gap`) so the two copies are each a
                  self-contained, identically-sized block. That's required for the
                  -50% translateX loop to land exactly on the seam with no jump. */}
              {[...Array(2)].map((_, i) => (
                <span key={i} style={{ display: 'inline-flex' }}>
                  <span style={{ marginRight: 32 }}>ASX 200 <span style={{ color: '#2D8A50' }}>▲ 0.42%</span> 8,247</span>
                  <span style={{ marginRight: 32 }}>BHP <span style={{ color: '#2D8A50' }}>▲ 1.27%</span> A$43.21</span>
                  <span style={{ marginRight: 32 }}>CBA <span style={{ color: '#A83232' }}>▼ 0.72%</span> A$168.45</span>
                  <span style={{ marginRight: 32 }}>S&P 500 <span style={{ color: '#2D8A50' }}>▲ 0.32%</span> 5,842</span>
                  <span style={{ marginRight: 32 }}>NVDA <span style={{ color: '#2D8A50' }}>▲ 2.85%</span> US$138.42</span>
                  <span style={{ marginRight: 32 }}>XRP <span style={{ color: '#2D8A50' }}>▲ 0.90%</span> A$1.57</span>
                  <span style={{ marginRight: 32 }}>BTC <span style={{ color: '#2D8A50' }}>▲ 0.52%</span> A$92,285</span>
                  <span style={{ marginRight: 32 }}>Gold <span style={{ color: '#2D8A50' }}>▲ 0.8%</span> US$2,487</span>
                </span>
              ))}
            </div>
          </div>

          {/* Main Dashboard — 3 columns */}
          <div className="hero-sim-grid" style={{
            background: '#060D1A',
            minHeight: '500px',
          }}>

            {/* Column 1 — Markets */}
            <div className="hero-sim-col" style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                fontSize: '9px', color: '#C9A84C',
                letterSpacing: '0.2em', marginBottom: '14px',
              }}>MARKETS</div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {[
                { name: 'ASX 200', val: '8,247.3', chg: '+0.42%', up: true },
                { name: 'S&P 500', val: '5,842.3', chg: '+0.32%', up: true },
                { name: 'BTC/AUD', val: 'A$92,285', chg: '+0.52%', up: true },
              ].map((item) => (
                <div key={item.name} style={{
                  background: 'rgba(201,168,76,0.03)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '3px',
                  padding: '12px 14px',
                  marginBottom: '8px',
                }}>
                  <div style={{ fontSize: '9px', color: '#8BA3C4', marginBottom: '3px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '19px', color: '#FFFFFF', fontWeight: 600 }}>
                    {item.val}
                  </div>
                  <div style={{ fontSize: '10px', color: item.up ? '#2D8A50' : '#A83232' }}>
                    {item.up ? '▲' : '▼'} {item.chg}
                  </div>
                </div>
              ))}

              <div style={{
                fontSize: '9px', color: '#C9A84C',
                letterSpacing: '0.2em', margin: '16px 0 8px',
              }}>SECTORS</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '3px',
              }}>
                {[
                  ['Materials', '+1.8%', true],
                  ['Financials', '+0.4%', true],
                  ['Tech', '-0.6%', false],
                  ['Energy', '+2.1%', true],
                  ['Health', '+0.2%', true],
                  ['Consumer', '-1.1%', false],
                  ['Real Est.', '-0.3%', false],
                  ['Industrl.', '+0.9%', true],
                ].map(([name, pct, up]) => (
                  <div key={name} style={{
                    background: up
                      ? `rgba(45,138,80,${Math.abs(parseFloat(pct)) / 3})`
                      : `rgba(168,50,50,${Math.abs(parseFloat(pct)) / 3})`,
                    padding: '6px 8px',
                    borderRadius: '2px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '9px', color: '#8BA3C4' }}>{name}</div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: up ? '#2D8A50' : '#A83232' }}>
                      {pct}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* Column 2 — MaddenAI */}
            <div className="hero-sim-col" style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                fontSize: '9px', color: '#C9A84C',
                letterSpacing: '0.2em', marginBottom: '14px',
                borderBottom: '1px solid rgba(201,168,76,0.15)',
                paddingBottom: '10px',
              }}>MADDENAI ANALYST</div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* User message */}
              <div style={{
                alignSelf: 'flex-end',
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '3px 3px 0 3px',
                padding: '9px 12px',
                fontSize: '10px',
                color: '#FFFFFF',
                maxWidth: '90%',
                marginBottom: '12px',
              }}>
                What's driving BHP today?
              </div>

              {/* AI Response */}
              <div style={{
                fontSize: '10px',
                color: '#8BA3C4',
                lineHeight: 1.65,
              }}>
                BHP +1.27% on strong iron ore data. Spot price at US$98/t, up 2.3% on China stimulus hopes. Volume 1.4x average. Key support A$41.80, resistance A$44.50. Bias: BULLISH near-term.
              </div>

              {/* Quick Analysis */}
              <div style={{ marginTop: '14px' }}>
                <div style={{
                  fontSize: '8px', color: '#4A6080',
                  letterSpacing: '0.15em', marginBottom: '8px',
                }}>QUICK ANALYSIS</div>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {[['BIAS', 'BULLISH'], ['CONF', '78%'], ['HORIZON', '1-5D']].map(([k, v]) => (
                    <div key={k} style={{
                      border: '1px solid rgba(201,168,76,0.15)',
                      borderRadius: '10px',
                      padding: '4px 8px',
                      fontSize: '8px',
                      color: '#C9A84C',
                    }}>
                      {k}: {v}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider + Quick Actions */}
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', marginTop: '14px', paddingTop: '10px' }}>
                <div style={{
                  fontSize: '8px', color: '#4A6080',
                  letterSpacing: '0.15em', marginBottom: '8px',
                }}>QUICK ACTIONS</div>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {['+ WATCHLIST', 'RESEARCH NOTE'].map((label) => (
                    <div key={label} style={{
                      border: '1px solid rgba(201,168,76,0.15)',
                      borderRadius: '10px',
                      padding: '4px 8px',
                      fontSize: '8px',
                      color: '#8BA3C4',
                    }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>

            {/* Column 3 — Intelligence */}
            <div className="hero-sim-col" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '9px', color: '#C9A84C',
                letterSpacing: '0.2em', marginBottom: '14px',
              }}>INTELLIGENCE</div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* AUD/USD card */}
              <div style={{
                background: 'rgba(201,168,76,0.03)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '3px',
                padding: '12px 14px',
                marginBottom: '8px',
              }}>
                <div style={{ fontSize: '9px', color: '#8BA3C4', marginBottom: '3px' }}>AUD/USD</div>
                <div style={{ fontSize: '19px', color: '#FFFFFF', fontWeight: 600 }}>0.6520</div>
                <div style={{ fontSize: '10px', color: '#2D8A50' }}>▲ +0.18%</div>
              </div>

              {/* RBA card */}
              <div style={{
                background: 'rgba(201,168,76,0.03)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '3px',
                padding: '12px 14px',
                marginBottom: '14px',
              }}>
                <div style={{ fontSize: '9px', color: '#8BA3C4', marginBottom: '3px' }}>RBA CASH RATE</div>
                <div style={{ fontSize: '19px', color: '#FFFFFF', fontWeight: 600 }}>4.35%</div>
                <div style={{ fontSize: '10px', color: '#C9A84C' }}>HOLD · Next: 16 Sep</div>
              </div>

              {/* Macro alerts */}
              <div style={{
                background: 'rgba(45,138,80,0.08)',
                borderLeft: '2px solid #2D8A50',
                padding: '9px 12px',
                marginBottom: '6px',
                borderRadius: '0 2px 2px 0',
              }}>
                <div style={{ fontSize: '9px', color: '#2D8A50', letterSpacing: '0.15em', marginBottom: '3px' }}>
                  AI SUPERCYCLE
                </div>
                <div style={{ fontSize: '10px', color: '#8BA3C4' }}>NVDA +18% earnings beat</div>
              </div>

              <div style={{
                background: 'rgba(168,50,50,0.08)',
                borderLeft: '2px solid #A83232',
                padding: '9px 12px',
                borderRadius: '0 2px 2px 0',
              }}>
                <div style={{ fontSize: '9px', color: '#A83232', letterSpacing: '0.15em', marginBottom: '3px' }}>
                  GEOPOLITICAL
                </div>
                <div style={{ fontSize: '10px', color: '#8BA3C4' }}>Middle East easing</div>
              </div>

              {/* Upcoming */}
              <div style={{ marginTop: '14px' }}>
                <div style={{
                  fontSize: '8px', color: '#C9A84C',
                  letterSpacing: '0.15em', marginBottom: '8px',
                }}>UPCOMING EVENTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {[
                    ['16 Sep', 'RBA Decision', 'HOLD expected'],
                    ['17 Sep', 'FOMC Decision', '65% Hold'],
                  ].map(([date, title, desc]) => (
                    <div key={date} style={{ fontSize: '8px', lineHeight: 1.5 }}>
                      <span style={{ color: '#C9A84C' }}>{date}</span>
                      <span style={{ color: '#8BA3C4' }}> · {title} · {desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            borderTop: '1px solid rgba(201,168,76,0.15)',
            padding: '9px 16px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
            {[
              ['GOLD', 'US$2,487', '▲'],
              ['OIL', 'US$78.42', '▼'],
              ['AU 10Y', '4.42%', '▲'],
              ['VIX', '18.4', '▼'],
            ].map(([label, val, arrow]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: '#8BA3C4', marginRight: '6px' }}>{label}</span>
                <span style={{ fontSize: '11px', color: '#FFFFFF' }}>{val}</span>
                <span style={{
                  fontSize: '9px', marginLeft: '3px',
                  color: arrow === '▲' ? '#2D8A50' : '#A83232',
                }}>{arrow}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          marginTop: '48px',
          flexWrap: 'wrap',
        }}>
          {[
            { n: '70+', l: 'Markets' },
            { n: '8', l: 'Modules' },
            { n: 'A$29', l: 'Per month' },
            { n: '7 days', l: 'Free trial' },
          ].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#C9A84C',
                lineHeight: 1,
              }}>{n}</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '9px',
                color: '#8BA3C4',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '6px',
              }}>{l}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
