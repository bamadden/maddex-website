import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import ScrollProgress from './components/shared/ScrollProgress'
import BackToTop from './components/shared/BackToTop'
import { useAnalytics } from './hooks/useAnalytics'
import Home from './pages/Home'
import Product from './pages/Product'
import MaddenAIPage from './pages/MaddenAI'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Research from './pages/Research'
import ProfileSettings from './pages/ProfileSettings'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Disclaimer from './pages/Disclaimer'

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

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
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
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <PageViewTracker />
        <ScrollProgress />
        <AnimatedRoutes />
        <BackToTop />
      </BrowserRouter>
    </MotionConfig>
  )
}
