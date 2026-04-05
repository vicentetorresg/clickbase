'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem('cb_session')
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem('cb_session', id)
    }
    return id
  } catch {
    return 'unknown'
  }
}

function trackEvent(type: string, source: string, extra?: Record<string, unknown>) {
  fetch('/api/track-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      source,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
      session_id: getSessionId(),
      ...extra,
    }),
  }).catch(() => {})
}

export function AnalyticsTracker() {
  const pathname = usePathname()
  const firedScrollRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    trackEvent('visit', pathname)

    const milestones = [25, 50, 75, 100]

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (total <= window.innerHeight) return
      const pct = Math.round((scrolled / total) * 100)

      for (const m of milestones) {
        const key = `${m}_${pathname}`
        if (pct >= m && !firedScrollRef.current.has(key)) {
          firedScrollRef.current.add(key)
          trackEvent('scroll', pathname, { scroll_depth: m })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return null
}
