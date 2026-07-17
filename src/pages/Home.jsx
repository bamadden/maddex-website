import { useEffect } from 'react'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import ProblemSection from '../components/home/ProblemSection'
import PlatformSection from '../components/home/PlatformSection'
import MaddenAISection from '../components/home/MaddenAISection'
import LivePulseSection from '../components/home/LivePulseSection'
import PricingPreview from '../components/home/PricingPreview'
import NewsletterSection from '../components/home/NewsletterSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import FinalCTA from '../components/home/FinalCTA'

export default function Home() {
  useEffect(() => {
    document.title = 'Maddex — Financial Intelligence for Australian Investors'
  }, [])

  return (
    <>
      <TickerTape />
      <Navigation />
      <Hero />
      <ProblemSection />
      <PlatformSection />
      <MaddenAISection />
      <LivePulseSection />
      <PricingPreview />
      <NewsletterSection />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </>
  )
}
