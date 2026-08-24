import { useState } from 'react'

export function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: '',
  })
  const [status, setStatus] = useState('idle')
  // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        background: 'rgba(45,138,80,0.1)',
        border: '1px solid rgba(45,138,80,0.3)',
        borderRadius: '4px',
        padding: '24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>✓</div>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '12px',
          color: '#2D8A50',
          letterSpacing: '0.1em',
          margin: 0,
        }}>MESSAGE SENT</p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: '#8BA3C4',
          marginTop: '8px',
        }}>
          Thanks — I'll reply within 24 hours.
        </p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    background: '#0B1628',
    border: '1px solid rgba(201,168,76,0.15)',
    borderRadius: '2px',
    padding: '10px 14px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    color: '#E8EDF5',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '9px',
    letterSpacing: '0.15em',
    color: '#C9A84C',
    marginBottom: '6px',
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>NAME</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            style={inputStyle}
            placeholder="Ben Madden"
          />
        </div>
        <div>
          <label style={labelStyle}>EMAIL</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            style={inputStyle}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>SUBJECT</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          style={inputStyle}
          placeholder="Question about Maddex"
        />
      </div>

      <div>
        <label style={labelStyle}>MESSAGE</label>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
          placeholder="Your message..."
        />
      </div>

      {status === 'error' && (
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          color: '#A83232',
          margin: 0,
        }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: '#060D1A',
          background: status === 'sending' ? '#8A6E2A' : '#C9A84C',
          border: 'none',
          padding: '12px 28px',
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          borderRadius: '2px',
          alignSelf: 'flex-start',
          transition: 'background 0.15s',
        }}
      >
        {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE →'}
      </button>
    </form>
  )
}
