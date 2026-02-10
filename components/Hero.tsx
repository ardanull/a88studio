'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/LanguageContext'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useParallax } from '@/hooks/useParallax'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  const { language } = useLanguage()
  const isTR = language === 'tr'
  
  // Parallax hooks for different layers
  const parallax1 = useParallax({ speed: 0.3, direction: 'up' })
  const parallax2 = useParallax({ speed: 0.5, direction: 'down' })
  const parallax3 = useParallax({ speed: 0.2, direction: 'up' })

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Multi-layer Parallax Background */}
      <div className="absolute inset-0 -z-10">
        {/* Layer 1 - Slowest */}
        <div 
          ref={parallax1.ref}
          style={{ transform: `translateY(${parallax1.offset}px)` }}
          className="absolute inset-0 transition-transform duration-100"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        </div>
        
        {/* Layer 2 - Medium speed, opposite direction */}
        <div 
          ref={parallax2.ref}
          style={{ transform: `translateY(${parallax2.offset}px)` }}
          className="absolute inset-0 transition-transform duration-100"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_50%)]" />
        </div>
        
        {/* Layer 3 - Slowest, grid pattern */}
        <div 
          ref={parallax3.ref}
          style={{ transform: `translateY(${parallax3.offset}px)` }}
          className="absolute inset-0 transition-transform duration-100"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,hsl(var(--background))_100%)]" />
        
        {/* Animated floating shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="text-muted-foreground">Available for new projects</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          >
            {isTR ? (
              <>
                Dijital
                <br />
                <span className="text-muted-foreground">deneyimler tasarlıyoruz</span>
              </>
            ) : (
              <>
                We build digital
                <br />
                <span className="text-muted-foreground">experiences</span>
              </>
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            {isTR
              ? 'İddialı markalar için seçkin dijital ürünler tasarlayan ve geliştiren bağımsız bir stüdyoyuz.'
              : 'A design and development studio creating exceptional digital products for ambitious brands.'}
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            className="mb-10 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="h-px w-10 bg-muted" />
            Scroll to explore
            <span className="h-px w-10 bg-muted" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-foreground px-8 text-sm font-medium text-background transition-colors hover:border-foreground hover:bg-background hover:text-foreground"
            >
              <span>{isTR ? 'Proje başlat' : 'Start a project'}</span>
              <span className="text-xs">↗</span>
            </a>
            <a
              href="#work"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium hover:bg-accent transition-colors"
            >
              {isTR ? 'İşlerimizi gör' : 'View our work'}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
            className="mt-20 grid grid-cols-3 gap-8 border-t border-border/60 pt-10 text-left md:mt-24 md:pt-12"
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Projects
              </div>
              <div className="mt-3 text-3xl font-bold md:text-4xl">250+</div>
              <div className="mt-1 text-sm text-muted-foreground">Products and experiences shipped</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Satisfaction
              </div>
              <div className="mt-3 text-3xl font-bold md:text-4xl">98%</div>
              <div className="mt-1 text-sm text-muted-foreground">Average client satisfaction score</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Experience
              </div>
              <div className="mt-3 text-3xl font-bold md:text-4xl">5+</div>
              <div className="mt-1 text-sm text-muted-foreground">Years crafting digital products</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
