// Central pricing data for Maddex. Terminal is the live product (Phase 1);
// Research Notes and Newsletter are Phase 2 / Phase 3 — priced but not yet on sale.

export const TERMINAL_PLANS = [
  {
    name: 'CORE',
    monthly: 29,
    annual: Math.round(29 * 12 * 0.8),
    tagline: 'Real-time markets and AI analysis, built for getting started.',
    features: [
      'Real-time ASX + global markets',
      'MaddenAI basic chat',
      'Watchlist — up to 20 assets',
      'Portfolio tracker',
      'News feed',
      'Global intelligence globe',
    ],
  },
  {
    name: 'PRIME',
    monthly: 79,
    annual: Math.round(79 * 12 * 0.8),
    popular: true,
    badge: 'MOST POPULAR',
    tagline: 'The full terminal. Unlimited AI. No caps.',
    features: [
      'Everything in Core',
      'Full MaddenAI analyst — unlimited',
      'Sector heatmaps + analysis',
      'Advanced charting',
      'Watchlist — unlimited',
      'Rates + Macro intelligence modules',
      'Priority data refresh',
    ],
  },
  {
    name: 'APEX',
    monthly: 149,
    annual: Math.round(149 * 12 * 0.8),
    tagline: 'Maximum intelligence. Real-time streaming. White glove.',
    features: [
      'Everything in Prime',
      'MaddenAI Research Notes — 1/month included',
      'Real-time WebSocket price streaming',
      'API access (coming soon)',
      'White glove onboarding',
      'Priority support',
    ],
  },
]

export const NEWSLETTER_PLANS = [
  {
    name: 'FREE',
    price: 'A$0',
    tagline: 'Weekly market brief. Top of funnel.',
    features: ['Weekly market brief'],
  },
  {
    name: 'WEEKLY',
    monthly: 19,
    tagline: "Ben's personal read on the week ahead.",
    features: [
      'Weekly deep-dive (Sunday evening)',
      "Ben's personal market view",
      'Key themes for the week ahead',
    ],
  },
  {
    name: 'DAILY + WEEKLY',
    monthly: 39,
    tagline: 'A 3-minute brief before the market opens.',
    features: [
      'Daily 3-minute market brief (Mon–Fri, 7am AEST)',
      'Weekly deep-dive',
    ],
  },
  {
    name: 'FULL SUITE',
    monthly: 59,
    tagline: 'Daily, weekly, and the monthly recap.',
    features: [
      'Daily + Weekly + Monthly recap',
      'Monthly includes one MaddenAI research note preview',
    ],
  },
]

export const RESEARCH_NOTES_PRICING = [
  { label: 'Single note', price: 'A$9.99', note: '' },
  { label: '5-note bundle', price: 'A$39.99', note: 'Save 20%' },
  { label: '10-note bundle', price: 'A$69.99', note: 'Save 30%' },
  { label: 'Monthly subscription', price: 'A$49/mo', note: '4 notes/month' },
]

export const BUNDLES = [
  {
    name: 'INVESTOR STARTER',
    price: 39,
    desc: 'Core + Weekly newsletter',
  },
  {
    name: 'INVESTOR PRO',
    price: 99,
    desc: 'Prime + Daily+Weekly newsletter',
  },
  {
    name: 'INVESTOR ELITE',
    price: 199,
    desc: 'Apex + Full Suite newsletter + 2 notes/mo',
  },
]

export const LAUNCH_PHASES = [
  { phase: 'PHASE 1', when: 'Now', title: 'Terminal', desc: 'Core, Prime, and Apex are live today.' },
  { phase: 'PHASE 2', when: '3–6 months', title: 'Research Notes', desc: 'À la carte institutional-quality research notes.' },
  { phase: 'PHASE 3', when: '6–12 months', title: 'MaddenAI Newsletter', desc: 'Daily and weekly market intelligence, delivered to your inbox.' },
]
