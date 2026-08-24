function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Name, email, and message are required',
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Maddex Contact <contact@maddex.com.au>',
        to: ['ben@maddex.com.au'],
        reply_to: email,
        subject: `Maddex Contact: ${subject || 'New message'}`,
        html: `
          <div style="font-family: monospace; background: #060D1A;
            color: #E8EDF5; padding: 24px; border-radius: 4px;">
            <h2 style="color: #C9A84C; margin-top: 0;">
              New Contact Form Submission
            </h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject) || 'Not specified'}</p>
            <hr style="border-color: rgba(201,168,76,0.2);" />
            <p><strong>Message:</strong></p>
            <p style="color: #8BA3C4; white-space: pre-wrap;">${escapeHtml(message)}</p>
            <hr style="border-color: rgba(201,168,76,0.2);" />
            <p style="color: #4A6080; font-size: 12px;">
              Sent from maddex.com.au contact form
            </p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return res.status(500).json({
      error: 'Failed to send message. Please email ben@maddex.com.au directly.',
    })
  }
}
