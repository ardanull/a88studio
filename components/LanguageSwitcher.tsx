'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('a88studio-theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      setResolvedTheme(stored)
      document.documentElement.dataset.theme = stored
    } else {
      setTheme('system')
      document.documentElement.removeAttribute('data-theme')
      setResolvedTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const update = (e: MediaQueryListEvent) => setResolvedTheme(e.matches ? 'dark' : 'light')
    setResolvedTheme(media.matches ? 'dark' : 'light')
    if (media.addEventListener) {
      media.addEventListener('change', update)
      return () => media.removeEventListener('change', update)
    }
    media.addListener(update)
    return () => media.removeListener(update)
  }, [theme])

  const applyTheme = (next: 'light' | 'dark') => {
    setTheme(next)
    setResolvedTheme(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('a88studio-theme', next)
      document.documentElement.dataset.theme = next
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="rounded-2xl border border-border bg-background/80 p-3 text-[11px] font-medium shadow-lg backdrop-blur">
        <div className="grid gap-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {language === 'tr' ? 'Dil' : 'Language'}
          </div>
          <div className="flex rounded-full border border-border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex-1 rounded-full px-3 py-1 transition-colors ${
                language === 'en' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('tr')}
              className={`flex-1 rounded-full px-3 py-1 transition-colors ${
                language === 'tr' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              TR
            </button>
          </div>
        </div>
        <div className="mt-3 grid gap-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {language === 'tr' ? 'Tema' : 'Theme'}
          </div>
          <div className="flex rounded-full border border-border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => applyTheme('light')}
              className={`flex-1 rounded-full px-3 py-1 transition-colors ${
                resolvedTheme === 'light' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {language === 'tr' ? 'Açık' : 'Light'}
            </button>
            <button
              type="button"
              onClick={() => applyTheme('dark')}
              className={`flex-1 rounded-full px-3 py-1 transition-colors ${
                resolvedTheme === 'dark' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {language === 'tr' ? 'Koyu' : 'Dark'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
