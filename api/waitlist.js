import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, product = 'newsletter', source } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, product, source })

  if (error) {
    if (error.code === '23505') {
      return res.status(200).json({
        success: true,
        message: 'Already on the list!',
      })
    }
    console.error('Waitlist insert error:', error)
    return res.status(500).json({ error: 'Failed to join waitlist' })
  }

  return res.status(200).json({
    success: true,
    message: "You're on the list!",
  })
}
