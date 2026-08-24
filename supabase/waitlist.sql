-- Run this in the Supabase SQL editor (Supabase dashboard → SQL Editor)
-- against the same project referenced by VITE_SUPABASE_URL.
-- Not run automatically — nothing in this repo executes SQL against
-- your database, this file is a reference for you to paste in by hand.

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
