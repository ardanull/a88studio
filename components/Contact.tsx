'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/LanguageContext'
import { useToast } from '@/components/ToastProvider'

export default function Contact() {
  const { language } = useLanguage()
  const { showToast } = useToast()
  const isTR = language === 'tr'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      // Success
      showToast(
        'success',
        isTR ? 'Mesajınız gönderildi!' : 'Message sent!',
        isTR
          ? '24 saat içinde size geri döneceğiz.'
          : "We'll get back to you within 24 hours."
      )
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: '',
      })
    } catch (error) {
      console.error('Form submission error:', error)
      showToast(
        'error',
        isTR ? 'Bir hata oluştu' : 'Something went wrong',
        isTR
          ? 'Lütfen tekrar deneyin veya doğrudan email gönderin.'
          : 'Please try again or send us an email directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              {isTR ? (
                <>
                  Birlikte
                  <br />
                  çalışalım
                </>
              ) : (
                <>
                  Let&apos;s work
                  <br />
                  together
                </>
              )}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {isTR
                ? 'Aklınızda bir proje mi var? Detayları duymayı çok isteriz. Formu doldurun, 24 saat içinde size geri dönelim.'
                : 'Have a project in mind? We a love to hear about it. Fill out the form and well get back to you within 24 hours.'}
            </p>

            {/* Contact Info */}
            <div className="mt-12 space-y-6">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Email</div>
                <a href="mailto:hello@a88studio.com" className="mt-1 text-lg hover:underline">
                  hello@a88studio.com
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Phone</div>
                <a href="tel:+905551234567" className="mt-1 text-lg hover:underline">
                  +90 555 123 45 67
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Location</div>
                <div className="mt-1 text-lg">İzmir, Turkey</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex gap-4">
              {['Twitter', 'Instagram', 'LinkedIn', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="rounded-3xl border border-border bg-background/90 p-6 shadow-sm sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="mb-2 block text-sm font-medium">
                    Project budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select budget range</option>
                    <option value="10-25k">$10,000 - $25,000</option>
                    <option value="25-50k">$25,000 - $50,000</option>
                    <option value="50-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Describe your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    {isTR ? 'Gönderiliyor...' : 'Sending...'}
                  </span>
                ) : (
                  isTR ? 'Mesaj gönder' : 'Send message'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
