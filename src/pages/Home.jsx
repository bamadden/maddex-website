import { useEffect } from 'react'
import TickerTape from '../components/layout/TickerTape'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import ProblemSection from '../components/home/ProblemSection'
import FeaturesSection from '../components/home/FeaturesSection'
import LivePulseSection from '../components/home/LivePulseSection'
import ProductsOverviewSection from '../components/home/ProductsOverviewSection'
import PricingPreview from '../components/home/PricingPreview'
import NewsletterSection from '../components/home/NewsletterSection'
import QuoteSection from '../components/home/QuoteSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import FAQSection from '../components/home/FAQSection'
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
      <FeaturesSection />
      <LivePulseSection />
      <ProductsOverviewSection />
      <PricingPreview />
      <NewsletterSection />
      <QuoteSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </>
  )
}
