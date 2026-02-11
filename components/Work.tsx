'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'
import { useParallax, useMouseParallax } from '@/hooks/useParallax'
import Link from 'next/link'
import { projects } from '@/lib/work'

// using projects from lib/work

// Parallax Background Component
function ParallaxBackground() {
  const parallax1 = useParallax({ speed: 0.2, direction: 'up' })
  const parallax2 = useParallax({ speed: 0.4, direction: 'down' })

  return (
    <>
      <div 
        ref={parallax1.ref}
        style={{ transform: `translateY(${parallax1.offset}px)` }}
        className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl transition-transform duration-100"
      />
      <div 
        ref={parallax2.ref}
        style={{ transform: `translateY(${parallax2.offset}px)` }}
        className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl transition-transform duration-100"
      />
    </>
  )
}

export default function Work() {
  const { language } = useLanguage()
  const isTR = language === 'tr'

  return (
    <section id="work" className="section-padding relative overflow-hidden bg-muted/30">
      {/* Parallax Background Elements */}
      <ParallaxBackground />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {isTR ? 'Portföy' : 'Portfolio'}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {isTR ? 'Seçilmiş işler' : 'Selected work'}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {isTR
              ? 'Tasarım ve geliştirme yaklaşımımızı sergileyen projeler koleksiyonu.'
              : 'A collection of projects that showcase our approach to design and development.'}
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
            >
              <div
                className={`grid gap-8 md:gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div
                  className={`flex flex-col justify-center space-y-6 ${
                    index % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {project.category}
                    </span>
                    <div className="h-px flex-grow bg-border" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                      {project.description[language]}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                    {project.metrics.map((metric) => (
                      <div key={metric.value}>
                        <div className="text-3xl font-bold md:text-4xl">{metric.value}</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {metric.label[language]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/work/${project.slug}`}
                    className="group/btn inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {isTR ? 'Vaka çalışmasını gör' : 'View case study'}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>

                <div
                  className={`relative ${
                    index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <div className="group/img relative overflow-hidden rounded-3xl bg-muted shadow-2xl">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 transition-opacity duration-500 group-hover/img:opacity-100`}
                    />
                    <Link href={`/work/${project.slug}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                      />
                    </Link>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                      <div className="rounded-full bg-background/90 p-4 backdrop-blur-sm">
                        <ExternalLink className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-4 font-medium transition-all duration-300 hover:border-primary hover:bg-primary/5"
          >
            {isTR ? 'Daha fazla proje görün' : 'View more projects'}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
