'use client'

import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { Sparkles, Palette, Code, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'

// Note: metadata should be in a separate file for client components
// export const metadata: Metadata = generateSEO({
//   title: 'Services',
//   description: 'End-to-end digital services: Brand & Strategy, Product Design, Development, and Growth & Marketing.',
//   path: '/services',
// })

const services = [
  {
    id: 'brand-strategy',
    title: { en: 'Brand & Strategy', tr: 'Marka ve Strateji' },
    subtitle: { en: 'Positioning, identity, and narrative.', tr: 'Konumlandırma, kimlik ve anlatı.' },
    description: {
      en: 'We help you clarify what you stand for, how you sound, and how you show up across every touchpoint.',
      tr: 'Her temas noktasında neyi temsil ettiğinizi, nasıl bir ses tonuna sahip olduğunuzu netleştirmenize yardımcı oluyoruz.',
    },
    bullets: {
      en: ['Brand positioning & messaging', 'Visual identity & art direction', 'Design language foundations'],
      tr: ['Marka konumlandırma ve mesajlaşma', 'Görsel kimlik ve sanat yönetimi', 'Tasarım dili temelleri'],
    },
    icon: Sparkles,
    gradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    id: 'product-design',
    title: { en: 'Product Design', tr: 'Ürün Tasarımı' },
    subtitle: { en: 'Interfaces that feel sharp and intuitive.', tr: 'Keskin ve sezgisel arayüzler.' },
    description: {
      en: 'From UX flows to final UI, we design digital products that balance usability, aesthetics, and business goals.',
      tr: 'UX akışlarından final UI\'a kadar, kullanılabilirlik, estetik ve iş hedeflerini dengeleyen dijital ürünler tasarlıyoruz.',
    },
    bullets: {
      en: ['User flows & information architecture', 'High-fidelity UI design', 'Design systems & component libraries'],
      tr: ['Kullanıcı akışları ve bilgi mimarisi', 'Yüksek kaliteli UI tasarımı', 'Tasarım sistemleri ve bileşen kütüphaneleri'],
    },
    icon: Palette,
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 'development',
    title: { en: 'Development', tr: 'Geliştirme' },
    subtitle: { en: 'Fast, modern, production-ready builds.', tr: 'Hızlı, modern, üretime hazır yapılar.' },
    description: {
      en: 'We ship performant, maintainable frontends and backends using modern web technologies and best practices.',
      tr: 'Modern web teknolojileri ve en iyi uygulamalarla yüksek performanslı, bakımı kolay frontend ve backend geliştiriyoruz.',
    },
    bullets: {
      en: ['Marketing sites & web apps', 'CMS integrations', 'Performance & accessibility'],
      tr: ['Pazarlama siteleri ve web uygulamaları', 'CMS entegrasyonları', 'Performans ve erişilebilirlik'],
    },
    icon: Code,
    gradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    id: 'growth-marketing',
    title: { en: 'Growth & Marketing', tr: 'Büyüme ve Pazarlama' },
    subtitle: { en: 'Making sure the right people find you.', tr: 'Doğru insanların sizi bulmasını sağlıyoruz.' },
    description: {
      en: 'We work with you to set up the analytics, content, and experiments that drive sustainable growth.',
      tr: 'Sürdürülebilir büyüme sağlayan analitiği, içeriği ve deneyleri sizinle birlikte kuruyoruz.',
    },
    bullets: {
      en: ['SEO & content strategy', 'Analytics & funnels', 'Landing pages & experimentation'],
      tr: ['SEO ve içerik stratejisi', 'Analitik ve huniler', 'Landing sayfalar ve deneyler'],
    },
    icon: TrendingUp,
    gradient: 'from-orange-500/10 to-red-500/10',
  },
]

export default function ServicesPage() {
  const { language } = useLanguage()
  const isTR = language === 'tr'

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        <section className="section-padding">
          <div className="container-custom">
            <motion.header
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mb-16 md:mb-24"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {isTR ? 'Hizmetler' : 'Services'}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                {isTR ? 'Ekipler ve markalarla nasıl çalışıyoruz' : 'How we work with teams and brands'}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                {isTR
                  ? 'Fikirden lansmanı kadar gereksiz katmanlar olmadan ilerlemeye odaklanmış bir hizmet seti.'
                  : 'A focused set of services designed to move from idea to launch without unnecessary layers or noise.'}
              </p>
            </motion.header>

            <div className="grid gap-8 lg:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.section
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                    
                    {/* Animated Border Glow */}
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 blur transition-opacity duration-500 group-hover:opacity-20" />
                    
                    <div className="relative flex flex-col gap-6 p-6 md:p-8">
                      {/* Number Badge - Top Right */}
                      <div className="absolute right-6 top-6 md:right-8 md:top-8">
                        <span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="relative w-fit">
                        <div className="absolute inset-0 animate-pulse rounded-2xl bg-primary/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                          <Icon className="h-8 w-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold tracking-tight transition-colors md:text-3xl lg:text-4xl">
                          {service.title[language]}
                        </h2>
                        <p className="text-base font-semibold text-primary md:text-lg">
                          {service.subtitle[language]}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                          {service.description[language]}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>

                      {/* Bullets */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                          <div className="h-px w-8 bg-border" />
                          <span>{isTR ? 'Neler dahil' : 'What\'s included'}</span>
                        </div>
                        <ul className="grid gap-3">
                          {service.bullets[language].map((item, i) => (
                            <motion.li
                              key={item}
                              className="group/item flex items-start gap-3 text-sm font-medium transition-colors duration-300 hover:text-primary"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                              <span className="relative mt-1 flex h-6 w-6 flex-none items-center justify-center">
                                <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20 transition-all duration-300 group-hover/item:bg-primary/20 group-hover/item:ring-primary/40">
                                  <span className="h-2 w-2 rounded-full bg-primary transition-transform duration-300 group-hover/item:scale-125" />
                                </span>
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom CTA hint */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
                          <span className="h-px w-8 bg-border transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />
                          <span className="transition-colors group-hover:text-primary">
                            {isTR ? 'Detaylı bilgi için iletişime geçin' : 'Get in touch for details'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-16 text-center"
            >
              <a
                href="/#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                {isTR ? 'Bir proje başlat' : 'Start a project'}
                <span className="text-xs">↗</span>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

