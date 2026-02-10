'use client'

import { motion } from 'framer-motion'
import { Sparkles, Palette, Code, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'

const services = [
  {
    title: { en: 'Brand & Strategy', tr: 'Marka ve Strateji' },
    description: {
      en: 'We help define your brand identity and create strategies that resonate with your audience.',
      tr: 'Marka kimliğinizi tanımlamanıza ve hedef kitlenizle yankı bulacak stratejiler oluşturmanıza yardımcı oluyoruz.',
    },
    items: {
      en: ['Brand Identity', 'Visual Design', 'Strategy & Positioning'],
      tr: ['Marka Kimliği', 'Görsel Tasarım', 'Strateji ve Konumlandırma'],
    },
    icon: Sparkles,
    gradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    title: { en: 'Product Design', tr: 'Ürün Tasarımı' },
    description: {
      en: 'User-centered design that turns complex problems into simple, elegant solutions.',
      tr: 'Karmaşık problemleri basit ve zarif çözümlere dönüştüren kullanıcı odaklı tasarım.',
    },
    items: {
      en: ['UX Research', 'UI Design', 'Design Systems'],
      tr: ['UX Araştırması', 'UI Tasarımı', 'Tasarım Sistemleri'],
    },
    icon: Palette,
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    title: { en: 'Development', tr: 'Geliştirme' },
    description: {
      en: 'Modern, scalable web applications built with the latest technologies.',
      tr: 'En son teknolojilerle oluşturulmuş modern, ölçeklenebilir web uygulamaları.',
    },
    items: {
      en: ['Web Development', 'Mobile Apps', 'API Integration'],
      tr: ['Web Geliştirme', 'Mobil Uygulamalar', 'API Entegrasyonu'],
    },
    icon: Code,
    gradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    title: { en: 'Growth & Marketing', tr: 'Büyüme ve Pazarlama' },
    description: {
      en: 'Data-driven strategies to grow your digital presence and convert visitors.',
      tr: 'Dijital varlığınızı büyütmek ve ziyaretçileri dönüştürmek için veri odaklı stratejiler.',
    },
    items: {
      en: ['SEO & Analytics', 'Content Strategy', 'Performance Marketing'],
      tr: ['SEO ve Analitik', 'İçerik Stratejisi', 'Performans Pazarlama'],
    },
    icon: TrendingUp,
    gradient: 'from-orange-500/10 to-red-500/10',
  },
]

export default function Services() {
  const { language } = useLanguage()
  const isTR = language === 'tr'

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {isTR ? 'Hizmetler' : 'Services'}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {isTR ? 'Ne yapıyoruz' : 'What we do'}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {isTR
              ? 'Vizyonunuzu hayata geçirmek için uçtan uca dijital hizmetler.'
              : 'End-to-end digital services to bring your vision to life.'}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title.en}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                
                <div className="relative p-6 md:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight transition-colors md:text-3xl">
                      {service.title[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {service.description[language]}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 border-t border-border/60 pt-6">
                    {service.items[language].map((item) => (
                      <motion.li
                        key={item}
                        className="flex items-center gap-3 text-sm font-medium text-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
