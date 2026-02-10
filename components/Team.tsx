'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'

const team = [
  {
    name: 'Alex Morgan',
    role: { en: 'Creative Director', tr: 'Kreatif Direktör' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: {
      en: 'Leading brand strategy and visual direction for 10+ years.',
      tr: '10+ yıldır marka stratejisi ve görsel yönlendirme liderliği yapıyor.',
    },
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Sophia Lee',
    role: { en: 'Lead Designer', tr: 'Baş Tasarımcı' },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: {
      en: 'Crafting intuitive user experiences that delight and convert.',
      tr: 'Keyif veren ve dönüşüm sağlayan sezgisel kullanıcı deneyimleri yaratıyor.',
    },
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'David Kim',
    role: { en: 'Technical Lead', tr: 'Teknik Lider' },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    bio: {
      en: 'Building scalable, performant systems with modern technologies.',
      tr: 'Modern teknolojilerle ölçeklenebilir, yüksek performanslı sistemler inşa ediyor.',
    },
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Maria Santos',
    role: { en: 'Product Strategist', tr: 'Ürün Stratejisti' },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: {
      en: 'Connecting business goals with user needs through data-driven insights.',
      tr: 'Veri odaklı içgörülerle iş hedeflerini kullanıcı ihtiyaçlarıyla buluşturuyor.',
    },
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
]

export default function Team() {
  const { language } = useLanguage()
  const isTR = language === 'tr'

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 text-center md:mb-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {isTR ? 'Ekip' : 'Team'}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {isTR ? 'Tutkulu profesyoneller' : 'The creative minds behind a88studio'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {isTR
              ? 'Her biri uzmanlık alanında lider olan yetenekli bireylerden oluşan ekibimiz.'
              : 'A diverse team of talented individuals, each a leader in their craft.'}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={member.social.twitter}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 backdrop-blur transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 backdrop-blur transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role[language]}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {member.bio[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
