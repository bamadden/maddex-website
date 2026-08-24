import { createContext, useContext, useState } from 'react'
import { CheckoutModal } from '../components/checkout/CheckoutModal'

const CheckoutContext = createContext(null)

export function CheckoutProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('core')

  const openCheckout = (plan = 'core') => {
    setSelectedPlan(plan)
    setIsOpen(true)
  }

  const closeCheckout = () => setIsOpen(false)

  return (
    <CheckoutContext.Provider value={{ openCheckout, closeCheckout }}>
      {children}
      {isOpen && (
        <CheckoutModal plan={selectedPlan} onClose={closeCheckout} />
      )}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used inside CheckoutProvider')
  return ctx
}
