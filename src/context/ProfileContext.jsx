import { createContext, useContext } from 'react'
import { useProfile } from '../hooks/useProfile'

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const value = useProfile()
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

// Prefer this over calling useProfile() directly in child components —
// it shares one fetch/subscription across the whole app instead of each
// component re-fetching the profile and FX rates independently.
export function useProfileContext() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfileContext must be used inside ProfileProvider')
  return ctx
}
