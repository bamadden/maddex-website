import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { supabase, supabaseConfigured } from '../../lib/supabase'

// Sign-in only — account creation happens via the terminal's own onboarding
// flow (src/components/auth/AuthModal.jsx + OnboardingFlow.jsx over there),
// which also bootstraps the profiles row correctly. This modal just lets an
// existing user authenticate; once supabase.auth fires its state-change
// event, useProfile's listener picks up the session automatically and
// Navigation swaps the LOG IN button for ProfileNavItem.
export default function AuthModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sentReset, setSentReset] = useState(false)

  async function handleSignIn(e) {
    e.preventDefault()
    if (!email || !password) {
      setError('Enter your email and password.')
      return
    }
    setError(null)
    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (signInError) {
      setError(signInError.message)
      return
    }
    onClose()
  }

  async function handleForgotPassword() {
    if (!email) {
      setError('Enter your email above first.')
      return
    }
    setLoading(true)
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin })
    setLoading(false)
    setSentReset(true)
  }

  // Rendered via a portal to document.body — Navigation's <nav> uses
  // backdropFilter for its frosted-glass effect, and backdrop-filter (like
  // transform/filter) creates a new containing block for position:fixed
  // descendants. Without the portal this modal would be pinned to nav's own
  // 84px-tall box instead of the actual viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/70 px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-bg-surface border border-gold/25 rounded-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[13px] text-gold tracking-[0.15em]">SIGN IN</span>
          <button
            type="button"
            onClick={onClose}
            className="text-text-muted hover:text-text-primary text-[18px] leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {!supabaseConfigured && (
          <p className="font-mono text-[12px] text-loss">
            Sign-in isn't configured on this environment yet.
          </p>
        )}

        {supabaseConfigured && (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div>
              <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-2">EMAIL</label>
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-primary border border-[rgba(30,70,140,0.4)] rounded-sm px-3 py-2 text-[13px] font-mono text-text-primary focus:border-gold focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-primary border border-[rgba(30,70,140,0.4)] rounded-sm px-3 py-2 text-[13px] font-mono text-text-primary focus:border-gold focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="font-mono text-[11px] text-loss">{error}</div>}
            {sentReset && (
              <div className="font-mono text-[11px] text-gain">Password reset email sent — check your inbox.</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gold text-bg-primary font-mono font-bold text-[13px] rounded-sm hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="font-mono text-[11px] text-text-muted hover:text-gold transition-colors text-center"
            >
              Forgot password?
            </button>

            <div className="pt-4 border-t border-[rgba(30,70,140,0.3)] text-center">
              <span className="font-mono text-[11px] text-text-muted">New to Maddex? </span>
              <Link
                to="/pricing"
                onClick={onClose}
                className="font-mono text-[11px] text-gold hover:opacity-70 transition-opacity"
              >
                Start your free trial →
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}
