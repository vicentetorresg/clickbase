'use client'

import { createContext, useContext } from 'react'
import { fbq } from '@/lib/fbq'

const WA_LINK = 'https://wa.me/56955350255?text=Hola%2C%20quiero%20cotizar%20la%20p%C3%A1gina%20web%20%2B%20campa%C3%B1a%20%2B%20tracking.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F'

const WAModalContext = createContext<() => void>(() => {})

export function useOpenWAModal() {
  return useContext(WAModalContext)
}

export function WAModalProvider({ children }: { children: React.ReactNode }) {
  function handleWAClick() {
    fbq('track', 'Lead')
    const trackPayload = {
      source: window.location.pathname || '/',
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    }
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackPayload),
    }).catch(() => {})
    fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'wa_click', ...trackPayload }),
    }).catch(() => {})
    window.open(WA_LINK, '_blank')
  }

  return (
    <WAModalContext.Provider value={handleWAClick}>
      {children}
    </WAModalContext.Provider>
  )
}
