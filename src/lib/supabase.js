import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The marketing site must keep working standalone (no signed-in features)
// when Supabase env vars aren't set yet — e.g. local dev, preview deploys
// before secrets are configured. createClient() throws synchronously on a
// missing/invalid URL, so guard it rather than letting it take the whole
// app down.
export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!supabaseConfigured) {
  console.warn(
    'Supabase env vars are missing — profile/auth features are disabled. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (see .env.example).'
  )
}

// storageKey must match exactly across the marketing site and the terminal
// app so a signed-in session on one is recognised on the other.
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storageKey: 'maddex-auth',
        storage: window.localStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null
