export const useAnalytics = () => {
  const trackEvent = (eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params)
    }
  }

  const trackPageView = (path) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
      })
    }
  }

  const trackSignup = (method) => {
    trackEvent('sign_up', { method })
  }

  const trackPricing = (plan) => {
    trackEvent('select_item', {
      item_id: plan,
      item_name: `Maddex ${plan} Plan`,
    })
  }

  const trackCTA = (ctaName, location) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      location,
    })
  }

  return { trackEvent, trackPageView, trackSignup, trackPricing, trackCTA }
}
