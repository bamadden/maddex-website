import { useEffect, useState } from 'react'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import { useProfileContext } from '../context/ProfileContext'

const CURRENCIES = [
  { code: 'AUD', label: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'USD', label: 'US Dollar', symbol: 'US$', flag: '🇺🇸' },
  { code: 'GBP', label: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'EUR', label: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'SGD', label: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'NZD', label: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'JPY', label: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', label: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
]

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-gain' : 'bg-[rgba(30,70,140,0.4)]'}`}
    >
      <span
        className={`absolute left-0 top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

export default function ProfileSettings() {
  const { profile, updateProfile, loading, daysLeftInTrial, isTrialExpired } = useProfileContext()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    document.title = 'Maddex — Account Settings'
  }, [])

  const current = profile ? { ...profile, ...form } : null

  async function handleSave() {
    setSaving(true)
    try {
      await updateProfile(form)
      setSaved(true)
      setForm({})
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[84px] pb-20 px-6 md:px-10 min-h-screen">
        <div className="max-w-2xl mx-auto">
          {loading && (
            <div className="font-mono text-[13px] text-text-muted py-20 text-center">Loading profile...</div>
          )}

          {!loading && !profile && (
            <div className="font-mono text-[13px] text-text-muted py-20 text-center">
              Please sign in to view your account settings.
            </div>
          )}

          {!loading && profile && current && (
            <div className="flex flex-col gap-8 pt-10">
              <div>
                <h1 className="font-mono text-[20px] text-gold tracking-[0.15em]">ACCOUNT SETTINGS</h1>
                <p className="font-mono text-[13px] text-text-muted mt-2">
                  {profile.email} &middot; {profile.subscription_tier.toUpperCase()}
                  {profile.subscription_tier === 'trial' && (
                    <span className={isTrialExpired ? 'text-loss' : 'text-gold'}>
                      {' '}&middot; {isTrialExpired ? 'Trial expired' : `${daysLeftInTrial} days left in trial`}
                    </span>
                  )}
                </p>
              </div>

              <section className="bg-bg-surface border border-[rgba(30,70,140,0.4)] rounded-sm p-6 flex flex-col gap-4">
                <h2 className="font-mono text-[11px] text-gold tracking-[0.15em] border-b border-[rgba(30,70,140,0.4)] pb-3">
                  PERSONAL DETAILS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-2">FULL NAME</label>
                    <input
                      type="text"
                      value={current.full_name ?? ''}
                      onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                      className="w-full bg-bg-primary border border-[rgba(30,70,140,0.4)] rounded-sm px-3 py-2 text-[13px] font-mono text-text-primary focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-2">DISPLAY NAME</label>
                    <input
                      type="text"
                      value={current.display_name ?? ''}
                      onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
                      placeholder="How you appear in the terminal"
                      className="w-full bg-bg-primary border border-[rgba(30,70,140,0.4)] rounded-sm px-3 py-2 text-[13px] font-mono text-text-primary focus:border-gold focus:outline-none placeholder:text-text-faint"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-bg-surface border border-[rgba(30,70,140,0.4)] rounded-sm p-6 flex flex-col gap-5">
                <h2 className="font-mono text-[11px] text-gold tracking-[0.15em] border-b border-[rgba(30,70,140,0.4)] pb-3">
                  DISPLAY PREFERENCES
                </h2>

                <div>
                  <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-1">
                    PREFERRED DISPLAY CURRENCY
                  </label>
                  <p className="font-mono text-[10px] text-text-faint mb-3">
                    All prices and values are shown in this currency. Foreign assets show the native
                    currency with a secondary conversion below it.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, preferred_currency: c.code }))}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-sm border text-left transition-colors ${
                          current.preferred_currency === c.code
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-[rgba(30,70,140,0.4)] text-text-muted hover:border-text-muted'
                        }`}
                      >
                        <span className="text-[15px]">{c.flag}</span>
                        <div>
                          <div className="font-mono text-[11px] font-semibold">{c.code}</div>
                          <div className="font-mono text-[9px] opacity-70">{c.symbol}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[rgba(30,70,140,0.25)]">
                  <div>
                    <div className="font-mono text-[12px] text-text-primary">Show secondary currency conversion</div>
                    <div className="font-mono text-[10px] text-text-muted mt-0.5">
                      e.g. AAPL shows US$333.74 with A$517.48 below it
                    </div>
                  </div>
                  <Toggle
                    checked={!!current.show_secondary_currency}
                    onChange={() => setForm((f) => ({ ...f, show_secondary_currency: !current.show_secondary_currency }))}
                  />
                </div>

                <div className="pt-2 border-t border-[rgba(30,70,140,0.25)]">
                  <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-2">TIMEZONE</label>
                  <select
                    value={current.timezone ?? 'Australia/Brisbane'}
                    onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
                    className="w-full bg-bg-primary border border-[rgba(30,70,140,0.4)] rounded-sm px-3 py-2 text-[13px] font-mono text-text-primary focus:border-gold focus:outline-none"
                  >
                    <option value="Australia/Brisbane">Brisbane (AEST, no DST)</option>
                    <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                    <option value="Australia/Melbourne">Melbourne (AEST/AEDT)</option>
                    <option value="Australia/Perth">Perth (AWST)</option>
                    <option value="Australia/Adelaide">Adelaide (ACST/ACDT)</option>
                    <option value="America/New_York">New York (ET)</option>
                    <option value="America/Chicago">Chicago (CT)</option>
                    <option value="America/Los_Angeles">Los Angeles (PT)</option>
                    <option value="Europe/London">London (GMT/BST)</option>
                    <option value="Asia/Singapore">Singapore (SGT)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>
              </section>

              <section className="bg-bg-surface border border-[rgba(30,70,140,0.4)] rounded-sm p-6 flex flex-col gap-4">
                <h2 className="font-mono text-[11px] text-gold tracking-[0.15em] border-b border-[rgba(30,70,140,0.4)] pb-3">
                  NOTIFICATIONS
                </h2>
                {[
                  { key: 'email_research_notes', label: 'MaddenAI Research Notes', desc: 'Receive notes you purchase via email' },
                  { key: 'email_market_alerts', label: 'Market Alerts', desc: 'Watchlist price alerts via email' },
                  { key: 'email_product_updates', label: 'Product Updates', desc: 'New features and Maddex announcements' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[12px] text-text-primary">{label}</div>
                      <div className="font-mono text-[10px] text-text-muted">{desc}</div>
                    </div>
                    <Toggle
                      checked={!!current[key]}
                      onChange={() => setForm((f) => ({ ...f, [key]: !current[key] }))}
                    />
                  </div>
                ))}
              </section>

              {Object.keys(form).length > 0 && (
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="px-8 py-2.5 bg-gold text-bg-primary font-mono font-bold text-[13px] rounded-sm hover:brightness-110 disabled:opacity-50 transition-all"
                  >
                    {saving ? 'SAVING...' : 'SAVE CHANGES'}
                  </button>
                  {saved && (
                    <span className="font-mono text-[12px] text-gain">
                      ✓ Saved — changes apply across all Maddex products
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setForm({})}
                    className="px-4 py-2.5 border border-[rgba(30,70,140,0.4)] text-text-muted font-mono text-[13px] rounded-sm hover:border-text-muted transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <section className="bg-bg-surface border border-[rgba(30,70,140,0.4)] rounded-sm p-6">
                <h2 className="font-mono text-[11px] text-gold tracking-[0.15em] border-b border-[rgba(30,70,140,0.4)] pb-3 mb-4">
                  SUBSCRIPTION
                </h2>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="font-mono text-[13px] text-text-primary font-bold">
                      {profile.subscription_tier.toUpperCase()} PLAN
                    </div>
                    {profile.subscription_tier === 'trial' && (
                      <div className={`font-mono text-[11px] mt-1 ${isTrialExpired ? 'text-loss' : 'text-text-muted'}`}>
                        {isTrialExpired
                          ? 'Your 7-day trial has expired'
                          : `${daysLeftInTrial} day${daysLeftInTrial !== 1 ? 's' : ''} remaining in your trial`}
                      </div>
                    )}
                  </div>
                  <a
                    href="/pricing"
                    className="px-5 py-2 border border-gold text-gold font-mono text-[11px] rounded-sm hover:bg-gold/10 transition-colors"
                  >
                    {profile.subscription_tier === 'trial' ? 'UPGRADE NOW' : 'MANAGE PLAN'}
                  </a>
                </div>
              </section>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
