import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import LogosBar from '../components/home/LogosBar'
import ProblemSection from '../components/home/ProblemSection'
import PlatformSection from '../components/home/PlatformSection'
import MaddenAISection from '../components/home/MaddenAISection'
import LivePulseSection from '../components/home/LivePulseSection'
import PricingPreview from '../components/home/PricingPreview'
import NewsletterSection from '../components/home/NewsletterSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import FinalCTA from '../components/home/FinalCTA'

export default function Home() {
  return (
    <>
      <TickerTape />
      <Navigation />
      <Hero />
      <LogosBar />
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
