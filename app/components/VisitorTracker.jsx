'use client'

import { useEffect, useRef } from 'react'

export default function VisitorTracker() {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Only track once per session/page load to avoid duplicate counts in React strict mode
    if (hasTracked.current) return

    const trackVisit = async () => {
      try {
        // If we already have a visitor ID in this session, don't create a new one
        if (sessionStorage.getItem('visitorId')) {
          hasTracked.current = true;
          return;
        }

        const res = await fetch(`/api/visitors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        
        if (data.success && data.id) {
          sessionStorage.setItem('visitorId', data.id);
        }
        hasTracked.current = true
      } catch (error) {
        console.error('Failed to track visitor:', error)
      }
    }

    trackVisit()
  }, []) // empty dependency means it runs once when the app layout mounts

  return null
}
