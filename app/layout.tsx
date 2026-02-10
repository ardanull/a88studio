import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageContext'
import { ToastProvider } from '@/components/ToastProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Preloader from '@/components/Preloader'
import { generateSEO } from '@/lib/seo'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = generateSEO({
  title: 'Home',
  description: 'We build exceptional digital experiences for ambitious brands. A creative studio specializing in brand strategy, product design, and development.',
  path: '/',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <ToastProvider>
            <Preloader />
            {children}
            <LanguageSwitcher />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
