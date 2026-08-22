import { useState } from 'react'
import SectionLabel from '../shared/SectionLabel'
import FAQItem from '../shared/FAQItem'

const FAQS = [
  ['Is this financial advice?', 'No. Maddex provides general financial information only and does not constitute financial product advice or a recommendation. Always consider seeking independent financial advice before making investment decisions.'],
  ['What markets are covered?', 'ASX 200 as the primary market, alongside global indices, top cryptocurrencies, AUD currency pairs, and central bank and macro data — all in one terminal.'],
  ['Can I cancel anytime?', 'Yes. All Maddex Terminal plans are month-to-month with no lock-in contract, and you can cancel from your account settings at any time.'],
  ['What is MaddenAI?', 'MaddenAI is the intelligence engine behind Maddex — a structured scoring and analysis layer that reads markets, sentiment, and macro data simultaneously and hands you a synthesis, not just numbers.'],
  ['Is my data secure?', 'Yes. Your account and portfolio data are stored securely via Supabase with industry-standard encryption, and are never sold to third parties.'],
]

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section className="bg-bg-primary py-20 md:py-[100px] px-6 md:px-10">
      <div className="max-w-[720px] mx-auto">
        <SectionLabel center>FAQ</SectionLabel>
        <h2 className="font-sans text-[32px] md:text-[56px] font-bold text-text-primary text-center leading-tight mb-8">
          Questions, answered.
        </h2>
        {FAQS.map((faq, i) => (
          <FAQItem
            key={faq[0]}
            question={faq[0]}
            answer={faq[1]}
            isOpen={openFaq === i}
            onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}
