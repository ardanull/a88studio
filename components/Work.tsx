'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'
import { useParallax, useMouseParallax } from '@/hooks/useParallax'

const projects = [
  {
    title: 'TechVision Platform',
    category: 'E-commerce',
    description: {
      en: 'Complete redesign and development of an enterprise e-commerce platform',
      tr: 'Kurumsal e-ticaret platformunun tam yeniden tasarımı ve geliştirilmesi',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    metrics: [
      { label: { en: 'Revenue increase', tr: 'Gelir artışı' }, value: '+250%' },
      { label: { en: 'Load time', tr: 'Yükleme süresi' }, value: '0.8s' },
    ],
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'BeautyBox',
    category: 'Mobile App',
    description: {
      en: 'iOS and Android app for beauty service bookings',
      tr: 'Güzellik hizmeti rezervasyonları için iOS ve Android uygulaması',
    },
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop&q=80',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    metrics: [
      { label: { en: 'Downloads', tr: 'İndirme' }, value: '50K+' },
      { label: { en: 'Rating', tr: 'Puan' }, value: '4.8/5' },
    ],
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    title: 'EduPlatform',
    category: 'Web Application',
    description: {
      en: 'Learning management system for online education',
      tr: 'Online eğitim için öğrenme yönetim sistemi',
    },
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=800&fit=crop&q=80',
    tags: ['React', 'GraphQL', 'AWS'],
    metrics: [
      { label: { en: 'Active users', tr: 'Aktif kullanıcı' }, value: '10K+' },
      { label: { en: 'Uptime', tr: 'Çalışma süresi' }, value: '99.9%' },
    ],
    color: 'from-green-500/20 to-emerald-500/20',
  },
]

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

                  <button
                    type="button"
                    className="group/btn inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {isTR ? 'Vaka çalışmasını gör' : 'View case study'}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
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
                    <img
                      src={project.image}
                      alt={project.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />
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
