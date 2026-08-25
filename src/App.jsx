import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import ScrollProgress from './components/shared/ScrollProgress'
import BackToTop from './components/shared/BackToTop'
import { CookieConsent } from './components/CookieConsent'
import { CheckoutProvider } from './context/CheckoutContext'
import { useAnalytics } from './hooks/useAnalytics'

// Route-level code splitting — each page's JS only downloads when a visitor
// navigates to it, instead of one ~800KB bundle shipping every page upfront.
const Home = lazy(() => import('./pages/Home'))
const Product = lazy(() => import('./pages/Product'))
const MaddenAIPage = lazy(() => import('./pages/MaddenAI'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Research = lazy(() => import('./pages/Research'))
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Disclaimer = lazy(() => import('./pages/Disclaimer'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageViewTracker() {
  const location = useLocation()
  const { trackPageView } = useAnalytics()
  useEffect(() => {
    trackPageView(location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  return null
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function RouteFallback() {
  return <div style={{ minHeight: '100vh', background: '#060D1A' }} />
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<RouteFallback />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/product" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/maddenai" element={<PageTransition><MaddenAIPage /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/research" element={<PageTransition><Research /></PageTransition>} />
        <Route path="/newsletter" element={<Navigate to="/research" replace />} />
        <Route path="/settings" element={<PageTransition><ProfileSettings /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/disclaimer" element={<PageTransition><Disclaimer /></PageTransition>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <CheckoutProvider>
          <ScrollToTop />
          <PageViewTracker />
          <ScrollProgress />
          <AnimatedRoutes />
          <BackToTop />
          <CookieConsent />
        </CheckoutProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
