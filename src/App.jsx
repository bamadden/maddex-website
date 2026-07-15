import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Product from './pages/Product'
import MaddenAIPage from './pages/MaddenAI'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Research from './pages/Research'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/maddenai" element={<MaddenAIPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
      </Routes>
    </BrowserRouter>
  )
}
