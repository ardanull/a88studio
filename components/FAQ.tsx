'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'

const faqs = [
  {
    question: {
      en: 'How long does a typical project take?',
      tr: 'Tipik bir proje ne kadar sürer?',
    },
    answer: {
      en: 'Project timelines vary based on scope and complexity. A typical website or app project takes 6-12 weeks from kickoff to launch. We provide a detailed timeline during the discovery phase.',
      tr: 'Proje süreleri kapsam ve karmaşıklığa göre değişir. Tipik bir web sitesi veya uygulama projesi, başlangıçtan lansmanı kadar 6-12 hafta sürer. Keşif aşamasında detaylı bir zaman çizelgesi sağlarız.',
    },
  },
  {
    question: {
      en: 'What is your design process?',
      tr: 'Tasarım süreciniz nasıl işler?',
    },
    answer: {
      en: 'We follow a collaborative, iterative approach: Discovery & Research → Strategy & Planning → Design & Prototyping → Development → Testing & Launch → Post-launch Support. You re involved at every stage.',
      tr: 'İşbirlikçi, yinelemeli bir yaklaşım izliyoruz: Keşif ve Araştırma → Strateji ve Planlama → Tasarım ve Prototipleme → Geliştirme → Test ve Lansman → Lansman Sonrası Destek. Her aşamada sizinle birlikte çalışıyoruz.',
    },
  },
  {
    question: {
      en: 'Do you work with startups or only established brands?',
      tr: 'Sadece yerleşik markalarla mı çalışıyorsunuz yoksa startup\'larla da mı?',
    },
    answer: {
      en: 'We work with both! Whether you\'re a startup looking to make your first impression or an established brand ready to scale, we tailor our approach to your needs and budget.',
      tr: 'Her ikisiyle de çalışıyoruz! İlk izleniminizi yaratmak isteyen bir startup veya ölçeklendirmeye hazır yerleşik bir marka olun, yaklaşımımızı ihtiyaçlarınıza ve bütçenize göre şekillendiriyoruz.',
    },
  },
  {
    question: {
      en: 'What technologies do you use?',
      tr: 'Hangi teknolojileri kullanıyorsunuz?',
    },
    answer: {
      en: 'We specialize in modern web technologies: React, Next.js, TypeScript, Tailwind CSS, and Node.js. For CMS, we often use Contentful, Sanity, or WordPress. We choose the best stack for your specific needs.',
      tr: 'Modern web teknolojilerinde uzmanız: React, Next.js, TypeScript, Tailwind CSS ve Node.js. CMS için genellikle Contentful, Sanity veya WordPress kullanıyoruz. Özel ihtiyaçlarınıza en uygun teknolojiyi seçiyoruz.',
    },
  },
  {
    question: {
      en: 'Do you provide ongoing support after launch?',
      tr: 'Lansman sonrası sürekli destek sağlıyor musunuz?',
    },
    answer: {
      en: 'Yes! We offer flexible maintenance and support packages. This includes updates, bug fixes, performance monitoring, and feature enhancements. We re here for the long term.',
      tr: 'Evet! Esnek bakım ve destek paketleri sunuyoruz. Bu, güncellemeler, hata düzeltmeleri, performans izleme ve özellik geliştirmelerini içerir. Uzun vadeli ortaklıklar için buradayız.',
    },
  },
  {
    question: {
      en: 'How do you handle project communication?',
      tr: 'Proje iletişimini nasıl yönetiyorsunuz?',
    },
    answer: {
      en: 'We believe in transparent, frequent communication. You ll have a dedicated project manager, regular check-ins (weekly or bi-weekly), and access to our project management tools. We adapt to your preferred communication style.',
      tr: 'Şeffaf ve sık iletişime inanıyoruz. Özel bir proje yöneticiniz, düzenli kontroller (haftalık veya iki haftada bir) ve proje yönetim araçlarımıza erişiminiz olacak. Tercih ettiğiniz iletişim tarzına uyum sağlarız.',
    },
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { language } = useLanguage()
  const isTR = language === 'tr'

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 text-center md:mb-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {isTR ? 'Sık sorulan sorular' : 'Frequently asked questions'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {isTR
              ? 'Merak ettiklerinize yanıt bulun. Başka sorularınız varsa iletişime geçmekten çekinmeyin.'
              : 'Everything you need to know about working with us. Can\'t find what you\'re looking for? Get in touch.'}
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
              className="border-b border-border last:border-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start justify-between gap-4 py-6 text-left transition-colors hover:text-primary"
              >
                <span className="text-lg font-semibold">{faq.question[language]}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex-shrink-0"
                >
                  <Plus className="h-6 w-6" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-muted-foreground">
                      {faq.answer[language]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            {isTR ? 'Başka sorularınız mı var?' : 'Still have questions?'}{' '}
            <a href="#contact" className="font-medium text-primary underline-offset-4 hover:underline">
              {isTR ? 'Bizimle iletişime geçin' : 'Get in touch'}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
