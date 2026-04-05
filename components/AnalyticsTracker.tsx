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

function getSessionStart(): number {
  try {
    let t = sessionStorage.getItem('cb_session_start')
    if (!t) {
      t = Date.now().toString()
      sessionStorage.setItem('cb_session_start', t)
    }
    return parseInt(t)
  } catch {
    return Date.now()
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
  const pagesVisitedRef = useRef<string[]>([])
  const maxScrollRef = useRef<Record<string, number>>({})
  const summaryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const summarySentRef = useRef(false)
  const entryReferrerRef = useRef<string>('')

  // Initialize session on first mount
  useEffect(() => {
    getSessionStart()
    entryReferrerRef.current = document.referrer || ''
  }, [])

  // Track page visits and scroll per pathname
  useEffect(() => {
    if (!pagesVisitedRef.current.includes(pathname)) {
      pagesVisitedRef.current.push(pathname)
    }
    trackEvent('visit', pathname)

    const milestones = [25, 50, 75, 100]

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (total <= window.innerHeight) return
      const pct = Math.round((scrolled / total) * 100)

      if (!maxScrollRef.current[pathname] || pct > maxScrollRef.current[pathname]) {
        maxScrollRef.current[pathname] = pct
      }

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

  // Session exit detection
  useEffect(() => {
    function sendSummary() {
      if (summarySentRef.current) return
      summarySentRef.current = true

      const durationSec = Math.round((Date.now() - getSessionStart()) / 1000)
      const data = {
        session_id: getSessionId(),
        referrer: entryReferrerRef.current || null,
        entry_page: pagesVisitedRef.current[0] || window.location.pathname,
        pages_visited: pagesVisitedRef.current,
        max_scroll: maxScrollRef.current,
        duration_sec: durationSec,
        user_agent: navigator.userAgent || null,
      }

      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
      navigator.sendBeacon('/api/session-end', blob)
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        summaryTimerRef.current = setTimeout(sendSummary, 30000)
      } else {
        if (summaryTimerRef.current) {
          clearTimeout(summaryTimerRef.current)
          summaryTimerRef.current = null
        }
      }
    }

    function handleBeforeUnload() {
      if (summaryTimerRef.current) {
        clearTimeout(summaryTimerRef.current)
        summaryTimerRef.current = null
      }
      sendSummary()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return null
}
