'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Home, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'

export default function NotFound() {
  const { language } = useLanguage()
  const isTR = language === 'tr'

  return (
    <>
      <Navigation />
      <main className="flex min-h-screen items-center justify-center px-6 py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto max-w-2xl text-center"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl" />
              <h1 className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-[120px] font-bold leading-none text-transparent md:text-[180px]">
                404
              </h1>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                {isTR ? 'Sayfa bulunamadı' : 'Page not found'}
              </h2>
              <p className="mx-auto max-w-md text-lg text-muted-foreground">
                {isTR
                  ? 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.'
                  : "The page you're looking for doesn't exist or may have been moved."}
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                <Home className="h-4 w-4" />
                {isTR ? 'Ana sayfaya dön' : 'Back to home'}
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-8 text-sm font-medium transition-colors hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                {isTR ? 'Geri dön' : 'Go back'}
              </button>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.8 }}
              className="mt-16 rounded-3xl border border-border bg-muted/30 p-6 md:p-8"
            >
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                {isTR ? 'Popüler sayfalar:' : 'Popular pages:'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: '/services', label: { en: 'Services', tr: 'Hizmetler' } },
                  { href: '/blog', label: { en: 'Blog', tr: 'Blog' } },
                  { href: '/#work', label: { en: 'Our work', tr: 'İşlerimiz' } },
                  { href: '/#contact', label: { en: 'Contact', tr: 'İletişim' } },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    {link.label[language]}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
