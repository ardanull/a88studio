'use client'

import { useLanguage } from '@/components/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed left-4 top-1/2 z-40 -translate-y-1/2 sm:left-5">
      <div className="inline-flex flex-col items-stretch rounded-full border border-border bg-background/90 px-1 py-1 text-[11px] font-medium shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2 py-1 rounded-full text-left transition-colors ${
            language === 'en' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage('tr')}
          className={`mt-0.5 px-2 py-1 rounded-full text-left transition-colors ${
            language === 'tr' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          TR
        </button>
      </div>
    </div>
  )
}

