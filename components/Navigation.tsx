'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'

const navItems = [
  { href: '/#work', key: 'work' },
  { href: '/services', key: 'services' },
  { href: '/#about', key: 'about' },
  { href: '/#contact', key: 'contact' },
] as const

const navLabels: Record<'en' | 'tr', Record<(typeof navItems)[number]['key'], string>> = {
  en: {
    work: 'Work',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
  },
  tr: {
    work: 'Projeler',
    services: 'Hizmetler',
    about: 'Hakkımızda',
    contact: 'İletişim',
  },
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : 'shadow-none'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-sm font-medium tracking-[0.22em] uppercase">
            <span className="text-xs text-muted-foreground">
              a88digital.
              <span className="ml-2 text-[10px] text-muted-foreground/70">Studio</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {navLabels[language][item.key]}
                </Link>
              ))}
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {language === 'tr' ? 'Blog' : 'Blog'}
              </Link>
              <Link
                href="/careers"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {language === 'tr' ? 'Kariyerler' : 'Careers'}
              </Link>
            </div>

            {/* Language toggle */}
            {/* (global switcher now fixed on left side) */}

            {/* Desktop CTA */}
            <Link
              href="#contact"
              className="hidden items-center gap-2 rounded-full border border-border bg-background px-5 py-1.5 text-xs font-medium tracking-[0.16em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background md:inline-flex"
            >
              <span>{language === 'tr' ? 'Proje başlat' : 'Start a project'}</span>
              <span className="text-[11px]">↗</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-xs text-muted-foreground md:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex h-3 w-4 flex-col justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                  isMenuOpen ? 'translate-y-1 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-opacity ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                  isMenuOpen ? '-translate-y-1 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="border-t border-border/70 bg-background/95 py-4">
              <div className="flex flex-col gap-2 text-sm font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {navLabels[language][item.key]}
                  </Link>
                ))}
                <Link
                  href="/blog"
                  onClick={handleNavClick}
                  className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {language === 'tr' ? 'Blog' : 'Blog'}
                </Link>
                <Link
                  href="/careers"
                  onClick={handleNavClick}
                  className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {language === 'tr' ? 'Kariyerler' : 'Careers'}
                </Link>
                {/* mobile dil seçici de sol sabit buton ile yönetiliyor */}
                <Link
                  href="#contact"
                  onClick={handleNavClick}
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-2 text-xs font-medium tracking-[0.16em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  <span>{language === 'tr' ? 'Proje başlat' : 'Start a project'}</span>
                  <span className="ml-1 text-[11px]">↗</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
