import React from 'react'

function TypewriterText({ text, speed = 40, pauseMs = 3000 }) {
  const [displayed, setDisplayed] = React.useState('')
  const [idx, setIdx] = React.useState(0)
  const [pausing, setPausing] = React.useState(false)

  React.useEffect(() => {
    if (pausing) {
      const t = setTimeout(() => {
        setDisplayed('')
        setIdx(0)
        setPausing(false)
      }, pauseMs)
      return () => clearTimeout(t)
    }
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => prev + text[idx])
        setIdx((i) => i + 1)
      }, speed)
      return () => clearTimeout(t)
    } else {
      setPausing(true)
    }
  }, [idx, pausing, text, speed, pauseMs])

  return (
    <span>
      {displayed}
      <span style={{ opacity: pausing ? 0 : 1, transition: 'opacity 0.3s' }}>|</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '80px 0 60px',
      position: 'relative',
      overflow: 'hidden',
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

      <div className="hero-grid">

        {/* LEFT COLUMN */}
        <div>
          {/* Label */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: '#C9A84C',
            textTransform: 'uppercase',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#C9A84C',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            Financial Intelligence Terminal
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 4.6vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: '20px',
            fontFamily: "'Inter', sans-serif",
          }}>
            The terminal<br />
            built for the<br />
            everyday<br />
            investor.
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '1.05rem',
            color: '#8BA3C4',
            lineHeight: 1.65,
            marginBottom: '36px',
            maxWidth: '420px',
            fontFamily: "'Inter', sans-serif",
          }}>
            ASX and global markets. AI-powered analysis.
            Institutional-grade tools at a price that
            makes sense.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}>
            <a href="/pricing" style={{
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
              transition: 'opacity 0.15s',
            }}>
              Start Free Trial
            </a>
            <a href="/pricing" style={{
              background: 'transparent',
              color: '#C9A84C',
              padding: '14px 32px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              border: '1px solid rgba(201,168,76,0.35)',
              display: 'inline-block',
              transition: 'border-color 0.15s',
            }}>
              View Pricing
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, auto)',
            gap: '32px',
            marginBottom: '32px',
          }}>
            {[
              { n: '70+', l: 'Markets' },
              { n: '8', l: 'Modules' },
              { n: 'A$29', l: 'per month' },
              { n: '7-day', l: 'free trial' },
            ].map(({ n, l }) => (
              <div key={l}>
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
                  color: '#637899',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '9px',
            color: '#4A6080',
            letterSpacing: '0.08em',
          }}>
            General information only · Not financial advice ·
            Built in Australia
          </div>
        </div>

        {/* RIGHT COLUMN — Terminal Simulator */}
        <div className="hero-simulator" style={{
          width: '100%',
          border: '1px solid rgba(201,168,76,0.18)',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: `
            0 0 0 1px rgba(201,168,76,0.05),
            0 24px 80px rgba(0,0,0,0.6),
            0 0 120px rgba(201,168,76,0.04)
          `,
          fontFamily: "'IBM Plex Mono', monospace",
        }}>

          {/* Window Chrome */}
          <div style={{
            background: '#030912',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
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
            <span style={{ fontSize: '10px', color: '#3A5070', letterSpacing: '0.2em' }}>
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
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            padding: '6px 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}>
            <div style={{
              display: 'inline-flex',
              animation: 'ticker 35s linear infinite',
              fontSize: '9px',
              color: '#B8C8D8',
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
            minHeight: '360px',
          }}>

            {/* Column 1 — Markets */}
            <div className="hero-sim-col" style={{
              padding: '14px',
            }}>
              <div style={{
                fontSize: '8px', color: '#C9A84C',
                letterSpacing: '0.2em', marginBottom: '10px',
              }}>MARKETS</div>

              {[
                { name: 'ASX 200', val: '8,247.3', chg: '+0.42%', up: true },
                { name: 'S&P 500', val: '5,842.3', chg: '+0.32%', up: true },
                { name: 'BTC/AUD', val: 'A$92,285', chg: '+0.52%', up: true },
              ].map((item) => (
                <div key={item.name} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '3px',
                  padding: '9px 11px',
                  marginBottom: '6px',
                }}>
                  <div style={{ fontSize: '8px', color: '#637899', marginBottom: '2px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '16px', color: '#E8EDF5', fontWeight: 600 }}>
                    {item.val}
                  </div>
                  <div style={{ fontSize: '9px', color: item.up ? '#2D8A50' : '#A83232' }}>
                    {item.up ? '▲' : '▼'} {item.chg}
                  </div>
                </div>
              ))}

              <div style={{
                fontSize: '8px', color: '#C9A84C',
                letterSpacing: '0.2em', margin: '10px 0 6px',
              }}>SECTORS</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2px',
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
                    padding: '4px 6px',
                    borderRadius: '2px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '8px', color: '#637899' }}>{name}</div>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: up ? '#2D8A50' : '#A83232' }}>
                      {pct}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 — MaddenAI */}
            <div className="hero-sim-col" style={{
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                fontSize: '8px', color: '#C9A84C',
                letterSpacing: '0.2em', marginBottom: '10px',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
                paddingBottom: '8px',
              }}>MADDENAI ANALYST</div>

              {/* User message */}
              <div style={{
                alignSelf: 'flex-end',
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '3px 3px 0 3px',
                padding: '7px 10px',
                fontSize: '9px',
                color: '#E8EDF5',
                maxWidth: '90%',
                marginBottom: '10px',
              }}>
                What's driving BHP today?
              </div>

              {/* AI Response with typewriter */}
              <div style={{
                fontSize: '9px',
                color: '#B8C8D8',
                lineHeight: 1.65,
                flex: 1,
              }}>
                <TypewriterText
                  text="BHP +1.27% on strong iron ore data. Spot price at US$98/t, up 2.3% on China stimulus hopes. Volume 1.4x average. Key support A$41.80, resistance A$44.50. Bias: BULLISH near-term."
                  speed={40}
                  pauseMs={3000}
                />
              </div>

              {/* Typing dots */}
              <div style={{ marginTop: '8px', display: 'flex', gap: '3px' }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: '#C9A84C',
                    animation: `pulse ${1 + i * 0.3}s ease-in-out infinite`,
                    opacity: 0.6,
                  }} />
                ))}
              </div>

              {/* Quick Analysis */}
              <div style={{ marginTop: '10px' }}>
                <div style={{
                  fontSize: '7px', color: '#4A6080',
                  letterSpacing: '0.15em', marginBottom: '6px',
                }}>QUICK ANALYSIS</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {[['BIAS', 'BULLISH'], ['CONF', '78%'], ['HORIZON', '1-5D']].map(([k, v]) => (
                    <div key={k} style={{
                      border: '1px solid rgba(201,168,76,0.35)',
                      borderRadius: '10px',
                      padding: '3px 7px',
                      fontSize: '7px',
                      color: '#C9A84C',
                    }}>
                      {k}: {v}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider + Quick Actions */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '10px', paddingTop: '8px' }}>
                <div style={{
                  fontSize: '7px', color: '#4A6080',
                  letterSpacing: '0.15em', marginBottom: '6px',
                }}>QUICK ACTIONS</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {['+ WATCHLIST', 'RESEARCH NOTE'].map((label) => (
                    <div key={label} style={{
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '10px',
                      padding: '3px 7px',
                      fontSize: '7px',
                      color: '#8BA3C4',
                    }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3 — Intelligence */}
            <div className="hero-sim-col" style={{ padding: '14px' }}>
              <div style={{
                fontSize: '8px', color: '#C9A84C',
                letterSpacing: '0.2em', marginBottom: '10px',
              }}>INTELLIGENCE</div>

              {/* AUD/USD card */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '3px',
                padding: '9px 11px',
                marginBottom: '6px',
              }}>
                <div style={{ fontSize: '8px', color: '#637899', marginBottom: '2px' }}>AUD/USD</div>
                <div style={{ fontSize: '16px', color: '#E8EDF5', fontWeight: 600 }}>0.6520</div>
                <div style={{ fontSize: '9px', color: '#2D8A50' }}>▲ +0.18%</div>
              </div>

              {/* RBA card */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '3px',
                padding: '9px 11px',
                marginBottom: '10px',
              }}>
                <div style={{ fontSize: '8px', color: '#637899', marginBottom: '2px' }}>RBA CASH RATE</div>
                <div style={{ fontSize: '16px', color: '#E8EDF5', fontWeight: 600 }}>4.35%</div>
                <div style={{ fontSize: '9px', color: '#C9A84C' }}>HOLD · Next: 16 Sep</div>
              </div>

              {/* Macro alerts */}
              <div style={{
                background: 'rgba(45,138,80,0.08)',
                borderLeft: '2px solid #2D8A50',
                padding: '7px 10px',
                marginBottom: '5px',
                borderRadius: '0 2px 2px 0',
              }}>
                <div style={{ fontSize: '8px', color: '#2D8A50', letterSpacing: '0.15em', marginBottom: '2px' }}>
                  AI SUPERCYCLE
                </div>
                <div style={{ fontSize: '9px', color: '#8BA3C4' }}>NVDA +18% earnings beat</div>
              </div>

              <div style={{
                background: 'rgba(168,50,50,0.08)',
                borderLeft: '2px solid #A83232',
                padding: '7px 10px',
                borderRadius: '0 2px 2px 0',
              }}>
                <div style={{ fontSize: '8px', color: '#A83232', letterSpacing: '0.15em', marginBottom: '2px' }}>
                  GEOPOLITICAL
                </div>
                <div style={{ fontSize: '9px', color: '#8BA3C4' }}>Middle East easing</div>
              </div>

              {/* Upcoming */}
              <div style={{ marginTop: '10px' }}>
                <div style={{
                  fontSize: '7px', color: '#C9A84C',
                  letterSpacing: '0.15em', marginBottom: '6px',
                }}>UPCOMING EVENTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    ['16 Sep', 'RBA Decision', 'HOLD expected'],
                    ['17 Sep', 'FOMC Decision', '65% Hold'],
                  ].map(([date, title, desc]) => (
                    <div key={date} style={{ fontSize: '7px', lineHeight: 1.5 }}>
                      <span style={{ color: '#C9A84C' }}>📅 {date}</span>
                      <span style={{ color: '#637899' }}> · {title} · {desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            padding: '7px 16px',
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
                <span style={{ fontSize: '8px', color: '#637899', marginRight: '6px' }}>{label}</span>
                <span style={{ fontSize: '10px', color: '#E8EDF5' }}>{val}</span>
                <span style={{
                  fontSize: '8px', marginLeft: '3px',
                  color: arrow === '▲' ? '#2D8A50' : '#A83232',
                }}>{arrow}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
