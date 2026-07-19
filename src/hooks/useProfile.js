import { useState, useEffect, useCallback } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabase'

// preferred_currency values must match the check constraint on public.profiles
export const CURRENCY_SYMBOLS = {
  AUD: 'A$', USD: 'US$', GBP: '£', EUR: '€',
  SGD: 'S$', NZD: 'NZ$', JPY: '¥', CAD: 'C$',
}

export function useProfile() {
  const [profile, setProfile] = useState(null)
  const [fxRates, setFxRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfile = useCallback(async () => {
    if (!supabaseConfigured) {
      setProfile(null)
      setFxRates({})
      setLoading(false)
      return
    }
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setProfile(null)
        setFxRates({})
        setLoading(false)
        return
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError
      setProfile(profileData)

      // Fetch FX rates relative to the user's preferred currency.
      // rates[quote] = how many `quote` units per 1 unit of preferred_currency.
      const preferredCurrency = profileData.preferred_currency || 'AUD'
      const { data: ratesData, error: ratesError } = await supabase
        .from('fx_rates')
        .select('quote, rate')
        .eq('base', preferredCurrency)

      if (ratesError) throw ratesError

      const rates = {}
      ratesData?.forEach((r) => { rates[r.quote] = r.rate })
      rates[preferredCurrency] = 1
      setFxRates(rates)

      await supabase
        .from('profiles')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('id', user.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
    if (!supabaseConfigured) return

    // Keeps this app in sync when the session changes in another tab/app
    // sharing the same storageKey (see src/lib/supabase.js).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchProfile()
    })
    return () => subscription.unsubscribe()
  }, [fetchProfile])

  const updateProfile = useCallback(async (updates) => {
    if (!supabaseConfigured) throw new Error('Not authenticated')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error: updateError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (updateError) throw updateError
    setProfile((prev) => (prev ? { ...prev, ...updates } : null))

    if (updates.preferred_currency) {
      fetchProfile()
    }
  }, [fetchProfile])

  // Converts `amount` (in fromCurrency) into the user's preferred currency.
  // Returns null when no conversion is needed/possible (e.g. same currency,
  // no signed-in profile, or the rate hasn't loaded yet).
  const convertAmount = useCallback((amount, fromCurrency) => {
    if (!profile) return null
    const preferred = profile.preferred_currency
    if (fromCurrency === preferred) return null

    const rate = fxRates[fromCurrency]
    if (!rate) return null

    const converted = amount / rate
    const symbol = CURRENCY_SYMBOLS[preferred] || preferred

    return {
      converted,
      display: `${symbol}${converted.toLocaleString('en-AU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: fromCurrency === 'JPY' ? 0 : 2,
      })}`,
      symbol,
    }
  }, [profile, fxRates])

  const isTrialExpired = profile?.subscription_tier === 'trial' && profile?.trial_ends_at
    ? new Date(profile.trial_ends_at) < new Date()
    : false

  const daysLeftInTrial = profile?.trial_ends_at
    ? Math.max(0, Math.ceil(
        (new Date(profile.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      ))
    : 0

  return {
    profile,
    fxRates,
    loading,
    error,
    updateProfile,
    convertAmount,
    isTrialExpired,
    daysLeftInTrial,
  }
}
