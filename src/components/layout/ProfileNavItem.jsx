import { Link } from 'react-router-dom'
import { useProfileContext } from '../../context/ProfileContext'

const TIER_COLOURS = {
  trial: 'text-text-muted',
  core: 'text-text-muted',
  prime: 'text-gold',
  apex: 'text-gain',
}

const CURRENCY_FLAGS = {
  AUD: '🇦🇺', USD: '🇺🇸', GBP: '🇬🇧', EUR: '🇪🇺',
  SGD: '🇸🇬', NZD: '🇳🇿', JPY: '🇯🇵', CAD: '🇨🇦',
}

// Renders nothing until a signed-in profile is loaded — Navigation falls
// back to the plain LOG IN button in that case.
export default function ProfileNavItem() {
  const { profile, loading } = useProfileContext()

  if (loading || !profile) return null

  const tierColour = TIER_COLOURS[profile.subscription_tier] || 'text-text-muted'
  const flag = CURRENCY_FLAGS[profile.preferred_currency] || '💱'
  const name = profile.display_name || profile.full_name || profile.email?.split('@')[0]

  return (
    <Link
      to="/settings"
      className="group flex items-center gap-2.5 px-3 py-1.5 border border-[rgba(30,70,140,0.4)] rounded-sm hover:border-gold transition-colors"
    >
      <span className="text-[14px]">{flag}</span>
      <div className="hidden md:block">
        <div className="font-mono text-[11px] text-text-primary leading-none">{name}</div>
        <div className={`font-mono text-[9px] leading-none mt-0.5 ${tierColour}`}>
          {profile.subscription_tier.toUpperCase()}
        </div>
      </div>
      <svg
        className="w-3.5 h-3.5 text-text-muted group-hover:text-gold transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </Link>
  )
}
