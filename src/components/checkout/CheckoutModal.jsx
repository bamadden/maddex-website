import { Fragment, useState } from 'react'

const PLANS = {
  core: { name: 'Core', price: 29, currency: 'AUD' },
  prime: { name: 'Prime', price: 79, currency: 'AUD' },
  apex: { name: 'Apex', price: 149, currency: 'AUD' },
}

const STEPS = ['account', 'payment', 'success']

export function CheckoutModal({ plan, onClose }) {
  const [step, setStep] = useState('account')

  const selectedPlan = PLANS[plan] || PLANS.core

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0B1628',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '4px',
          width: '100%',
          maxWidth: '480px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          background: '#060D1A',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              color: '#C9A84C',
              letterSpacing: '0.2em',
              marginBottom: '4px',
            }}>MADDEX {selectedPlan.name.toUpperCase()}</div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '20px',
              color: '#FFFFFF',
              fontWeight: 700,
            }}>A${selectedPlan.price}/mo</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none', border: 'none',
              color: '#637899', cursor: 'pointer',
              fontSize: '18px',
            }}
          >✕</button>
        </div>

        {/* Steps indicator */}
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid rgba(201,168,76,0.06)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          {['Create account', 'Payment', 'Done'].map((s, i) => (
            <Fragment key={s}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.1em',
                color: i === STEPS.indexOf(step) ? '#C9A84C' : '#4A6080',
              }}>{s.toUpperCase()}</span>
              {i < 2 && <span style={{ color: '#4A6080' }}>→</span>}
            </Fragment>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {step === 'account' && (
            <AccountStep onNext={() => setStep('payment')} />
          )}
          {step === 'payment' && (
            <PaymentStep onNext={() => setStep('success')} />
          )}
          {step === 'success' && (
            <SuccessStep />
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid rgba(201,168,76,0.06)',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '9px',
          color: '#4A6080',
          textAlign: 'center',
        }}>
          7-day free trial · Cancel anytime · Secured by Stripe
        </div>
      </div>
    </div>
  )
}

function AccountStep({ onNext }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputStyle = {
    background: '#060D1A',
    border: '1px solid rgba(201,168,76,0.15)',
    borderRadius: '2px',
    padding: '10px 14px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    color: '#E8EDF5',
    outline: 'none',
  }

  return (
    <div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        color: '#8BA3C4',
        marginTop: 0,
        marginBottom: '20px',
      }}>
        Create your account to start your 7-day free trial.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={onNext}
          style={{
            background: '#C9A84C',
            border: 'none',
            borderRadius: '2px',
            padding: '12px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: '#060D1A',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  )
}

function PaymentStep({ onNext }) {
  return (
    <div>
      <div style={{
        background: 'rgba(201,168,76,0.05)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '4px',
        padding: '16px',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          color: '#C9A84C',
          letterSpacing: '0.1em',
          margin: '0 0 8px',
        }}>PAYMENT COMING SOON</p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: '#8BA3C4',
          margin: 0,
          lineHeight: 1.5,
        }}>
          We're finalising our payment system. Enter your email to be
          first notified when subscriptions open.
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        style={{
          width: '100%',
          background: '#C9A84C',
          border: 'none',
          borderRadius: '2px',
          padding: '12px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: '#060D1A',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        JOIN WAITLIST →
      </button>
    </div>
  )
}

function SuccessStep() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '50%',
        background: 'rgba(45,138,80,0.15)',
        border: '1px solid rgba(45,138,80,0.4)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        fontSize: '20px',
      }}>✓</div>
      <p style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '12px',
        color: '#2D8A50',
        letterSpacing: '0.15em',
        marginBottom: '8px',
      }}>YOU'RE ON THE LIST</p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        color: '#8BA3C4',
        lineHeight: 1.5,
        marginBottom: '20px',
      }}>
        We'll email you as soon as subscriptions open. In the
        meantime, explore the terminal.
      </p>

      <a
        href="https://maddex-bqz544ywk-the-madden-group.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: '#C9A84C',
          color: '#060D1A',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.1em',
          padding: '10px 24px',
          borderRadius: '2px',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        EXPLORE TERMINAL →
      </a>
    </div>
  )
}
