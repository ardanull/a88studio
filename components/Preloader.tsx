'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Sadece ilk ziyaret için göster
    const alreadySeen = window.sessionStorage.getItem('a88studio-preloaded')
    if (alreadySeen === '1') {
      setVisible(false)
      return
    }

    const timeout = window.setTimeout(() => {
      setVisible(false)
      window.sessionStorage.setItem('a88studio-preloaded', '1')
    }, 1200)

    return () => window.clearTimeout(timeout)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-border border-t-primary animate-spin" />
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          a88digital. ®
        </div>
      </div>
    </div>
  )
}

