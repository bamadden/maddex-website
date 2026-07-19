import { useProfileContext } from '../../context/ProfileContext'
import { CURRENCY_SYMBOLS } from '../../hooks/useProfile'

const SIZE_CLASSES = {
  sm: { primary: 'text-[13px] font-mono', secondary: 'text-[9px] font-mono' },
  md: { primary: 'text-[16px] font-mono', secondary: 'text-[10px] font-mono' },
  lg: { primary: 'text-[20px] font-mono', secondary: 'text-[12px] font-mono' },
  xl: { primary: 'text-[36px] font-mono', secondary: 'text-[14px] font-mono' },
}

// amount/currency are the native (source) value — e.g. a US-listed stock is
// { amount: 333.74, currency: 'USD' }. The secondary line (if shown) is that
// value converted into the signed-in user's preferred_currency.
export default function DualCurrencyValue({
  amount,
  currency,
  size = 'md',
  showSecondary,
  className = '',
  positiveColour = false,
  negativeColour = false,
}) {
  const { profile, convertAmount } = useProfileContext()

  const symbol = CURRENCY_SYMBOLS[currency] || currency
  const sizes = SIZE_CLASSES[size]

  const primaryColour = positiveColour
    ? 'text-gain'
    : negativeColour
    ? 'text-loss'
    : 'text-text-primary'

  const formatted = amount.toLocaleString('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  })

  const secondary = profile?.show_secondary_currency !== false && showSecondary !== false
    ? convertAmount(amount, currency)
    : null

  return (
    <span className={`inline-flex flex-col leading-tight ${className}`}>
      <span className={`${sizes.primary} ${primaryColour}`}>
        {symbol}{formatted}
      </span>
      {secondary && (
        <span className={`${sizes.secondary} text-text-muted mt-0.5`}>
          {secondary.display}
        </span>
      )}
    </span>
  )
}

// Convenience wrapper for table cells that also carry a % change.
export function PriceCell({ amount, currency, change }) {
  return (
    <DualCurrencyValue
      amount={amount}
      currency={currency}
      size="sm"
      positiveColour={change !== undefined && change > 0}
      negativeColour={change !== undefined && change < 0}
    />
  )
}
