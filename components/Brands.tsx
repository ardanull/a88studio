'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/LanguageContext'

const brands = [
  { name: 'Google', logo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg' },
  { name: 'Microsoft', logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg' },
  { name: 'Amazon', logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg' },
  { name: 'Stripe', logo: 'https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg' },
  { name: 'Shopify', logo: 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg' },
  { name: 'Netflix', logo: 'https://www.vectorlogo.zone/logos/netflix/netflix-icon.svg' },
]

export default function Brands() {
  const { language } = useLanguage()
  const isTR = language === 'tr'

  return (
    <section className="section-padding border-y border-border/60 bg-muted/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {isTR ? 'Güvenilen markalar tarafından' : 'Trusted by leading brands'}
          </p>
        </motion.div>

        <div className="relative mt-12 overflow-hidden">
          <div className="flex animate-scroll items-center gap-16">
            {[...brands, ...brands].map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
