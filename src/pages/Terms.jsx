import { useEffect } from 'react'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/shared/SectionLabel'

const SECTIONS = [
  {
    title: '1. Acceptance of terms',
    body: 'By creating an account or using the Maddex website or Maddex Terminal, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service. Maddex is operated by Madden Group Holdings Pty Ltd (ABN [XX XXX XXX XXX]).',
  },
  {
    title: '2. The service',
    body: 'Maddex provides market data, AI-generated analysis (MaddenAI), and related tools for informational purposes. Features and availability may vary by subscription tier and may change as the product evolves. Research Notes and the MaddenAI Newsletter are separate products that are not yet available and may launch on different terms.',
  },
  {
    title: '3. Not financial advice',
    body: 'Maddex provides general financial information only. Nothing on the platform constitutes financial product advice, a recommendation, or an offer to buy or sell any financial product. You should consider seeking independent financial advice tailored to your circumstances before making any investment decision.',
  },
  {
    title: '4. Subscriptions and billing',
    body: 'Terminal subscriptions are billed monthly or annually in advance, in Australian dollars, and renew automatically until cancelled. You may cancel at any time from your account settings; cancellation takes effect at the end of the current billing period. A free trial, where offered, does not require a credit card and converts to a paid subscription only if you choose to subscribe.',
  },
  {
    title: '5. Acceptable use',
    body: 'You agree not to misuse the service — including attempting to circumvent usage limits, reverse-engineer the platform, or use it for any unlawful purpose. We may suspend or terminate accounts that breach these terms.',
  },
  {
    title: '6. Data accuracy',
    body: 'Market data, scores, and AI-generated analysis are provided on a best-effort basis and may contain delays, errors, or omissions. Maddex is not liable for decisions made in reliance on data or analysis provided through the platform.',
  },
  {
    title: '7. Limitation of liability',
    body: 'To the maximum extent permitted by law, Madden Group Holdings Pty Ltd excludes liability for any indirect, incidental, or consequential loss arising from your use of the service, including any financial loss connected to investment decisions.',
  },
  {
    title: '8. Changes to these terms',
    body: 'We may update these Terms of Service from time to time. Continued use of the service after changes take effect constitutes acceptance of the updated terms.',
  },
  {
    title: '9. Contact',
    body: 'Questions about these terms can be sent to hello@maddex.com.au.',
  },
]

export default function Terms() {
  useEffect(() => {
    document.title = 'Maddex — Terms of Service'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />

      <section className="bg-bg-primary pt-[84px] pb-16 px-6 md:px-10 text-center">
        <SectionLabel center>LEGAL</SectionLabel>
        <h1 className="font-sans text-[36px] md:text-[56px] font-bold leading-tight tracking-tight text-text-primary max-w-3xl mx-auto">
          Terms of Service
        </h1>
        <p className="font-mono text-[11px] text-text-faint mt-4">Last updated: August 2026</p>
      </section>

      <section className="bg-bg-surface py-16 px-6 md:px-10">
        <div className="max-w-[760px] mx-auto flex flex-col gap-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-sans text-[19px] font-bold text-gold">{s.title}</h2>
              <p className="font-sans text-[15px] text-text-muted mt-3 leading-[1.8]">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
