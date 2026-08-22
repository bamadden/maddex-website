import { motion, AnimatePresence } from 'framer-motion'

export default function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-[rgba(30,70,140,0.3)]">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex justify-between items-center py-5 text-left"
      >
        <span className="font-sans text-[15px] font-medium text-text-primary">{question}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-gold text-[18px]">+</motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[13px] text-text-muted pb-5 leading-[1.7] max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
