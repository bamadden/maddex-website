import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import GoldButton from '../shared/GoldButton'
import AuthModal from './AuthModal'
import { useProfileContext } from '../../context/ProfileContext'
import { supabase } from '../../lib/supabase'

const NAV_LINKS = [
  { label: 'Terminal', to: '/product' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'MaddenAI', to: '/maddenai' },
]

// profiles.first_name/last_name/country come from the same Supabase row the
// terminal reads/writes via useAuthStore — display_name is used as a fallback
// for users who only ever set that field (e.g. via the marketing site).
function profileDisplayName(profile) {
  const fromParts = profile.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : null
  return fromParts || profile.display_name || profile.email?.split('@')[0] || ''
}

function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const { profile } = useProfileContext()

  async function handleSignOut() {
    await supabase.auth.signOut()
    setOpen(false)
  }

  return (
    <div
      className="relative py-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="font-sans text-[13px] text-text-muted hover:text-gold transition-colors duration-150"
      >
        PROFILE
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 pt-3 z-50"
          >
            <div className="bg-bg-surface border border-gold/15 border-t-2 border-t-gold rounded p-1 min-w-[220px]">
              <div className="px-4 py-3 border-b border-[rgba(201,168,76,0.15)]">
                <div className="font-sans text-[13px] font-medium text-text-primary">
                  {profileDisplayName(profile)}
                </div>
                <div className="font-sans text-[11px] text-text-muted mt-0.5 truncate">{profile.email}</div>
                {profile.country && (
                  <div className="font-mono text-[9px] text-text-faint mt-1 tracking-wide">
                    {profile.country}
                    {profile.preferred_currency ? ` · ${profile.preferred_currency}` : ''}
                  </div>
                )}
              </div>
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-sm text-[13px] font-sans text-text-primary hover:bg-gold/[0.06] transition-colors"
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2.5 rounded-sm text-[13px] font-sans text-loss hover:bg-loss/10 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AuthButtons({ onOpenAuth }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onOpenAuth}
        className="font-sans text-[13px] text-text-muted hover:text-gold transition-colors duration-150"
      >
        Sign In
      </button>
      <GoldButton to="/pricing" className="!px-4 !py-2 !text-[11px]">
        START FREE TRIAL
      </GoldButton>
    </div>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const location = useLocation()
  const { profile } = useProfileContext()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setAuthModalOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <nav
      className="fixed top-7 left-0 right-0 h-14 z-[1000] transition-all duration-200"
      style={{
        background: scrolled ? 'rgba(6,13,26,0.98)' : 'rgba(6,13,26,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto h-full px-6 md:px-10 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-[13px] font-bold tracking-[0.3em] text-gold shrink-0"
        >
          MADDEX
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group relative py-2 font-sans text-[13px] transition-colors duration-150 ${
                  isActive ? 'text-gold' : 'text-text-muted hover:text-gold'
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-gold"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                ) : (
                  <span
                    className="absolute left-0 -bottom-0.5 h-px bg-gold w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden lg:flex items-center">
          {profile ? <ProfileMenu /> : <AuthButtons onOpenAuth={() => setAuthModalOpen(true)} />}
        </div>

        <button
          type="button"
          className="lg:hidden text-gold text-2xl"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-[110]"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed top-0 right-0 bottom-0 w-[280px] bg-bg-surface border-l border-gold/15 z-[120] p-6 flex flex-col gap-6"
              >
                <button
                  type="button"
                  className="self-end text-gold text-xl"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-[15px] text-text-primary"
                  >
                    {item.label}
                  </Link>
                ))}

                {profile ? (
                  <Link
                    to="/settings"
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-[15px] text-text-primary"
                  >
                    Settings
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setAuthModalOpen(true); setMobileOpen(false) }}
                    className="font-mono text-[12px] font-bold tracking-[0.05em] text-gold border border-[rgba(201,168,76,0.4)] rounded-sm px-4 py-2.5 text-left"
                  >
                    SIGN IN
                  </button>
                )}

                <GoldButton to="/pricing" onClick={() => setMobileOpen(false)} className="w-full">
                  START FREE TRIAL
                </GoldButton>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </nav>
  )
}
