# Maddex Setup Guide

## Supabase Setup

Run this SQL in the Supabase SQL editor:

```sql
-- Waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  product TEXT DEFAULT 'newsletter',
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist FOR INSERT
  WITH CHECK (true);
```

(This is the same SQL as `supabase/waitlist.sql` in this repo — paste either into the Supabase SQL editor.)

## Environment Variables (Vercel)

Add these in Vercel → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| VITE_SUPABASE_URL | Your Supabase project URL | Same project the terminal app uses |
| VITE_SUPABASE_ANON_KEY | Your Supabase anon key | Client-safe, already public in the bundle |
| VITE_GA_MEASUREMENT_ID | G-XXXXXXXXXX | From Google Analytics → Admin → Data Streams |
| VITE_TERMINAL_URL | https://app.maddex.com.au | Where the terminal app is deployed |
| VITE_SITE_URL | https://maddex.com.au | This marketing site's own canonical URL |
| RESEND_API_KEY | re_XXXXXXXXXX | From resend.com → API Keys. Server-only, used by `api/contact.js` |
| SUPABASE_SERVICE_KEY | Your service_role key | Supabase → Settings → API. **Not** the anon key — this bypasses Row Level Security, so keep it server-only |

## Resend Setup

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Verify the `maddex.com.au` sending domain (Resend → Domains) — until this is verified, emails sent `from: contact@maddex.com.au` in `api/contact.js` will fail
3. Create an API key and add it to Vercel as `RESEND_API_KEY`

## DNS Setup (for maddex.com.au)

In your domain registrar (Squarespace/GoDaddy/etc):
- Add CNAME record: `www` → `cname.vercel-dns.com`
- Add A record: `@` → `76.76.21.21`

Then in Vercel → Project → Settings → Domains:
- Add: `maddex.com.au`

## What's already done vs what needs you

Everything in the codebase (site content, API routes, tracking, checkout UI) is built and pushed. What's left is entirely account/credential setup that only Ben can do:

- [ ] Run the SQL above in Supabase
- [ ] Add all env vars above to Vercel
- [ ] Sign up for Resend and verify the sending domain
- [ ] Point DNS at Vercel and add the custom domain
