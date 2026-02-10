'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechVision',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    content: 'Working with a88studio was transformative. They took our vision and created something beyond our expectations. The attention to detail and commitment to excellence is unmatched.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Founder',
    company: 'BeautyBox',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    content: 'The team delivered our mobile app on time and exceeded all quality benchmarks. Their expertise in both design and development made the entire process seamless.',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Product Lead',
    company: 'EduPlatform',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    content: 'a88studio doesn\'t just build products—they become true partners in your success. Their strategic insights and technical prowess are remarkable.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 text-center md:mb-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Trusted by forward-thinking teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Don't just take our word for it—hear from the brands we've partnered with.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
              className="group relative flex flex-col rounded-3xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg md:p-8"
            >
              <div className="mb-6 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground md:text-base">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 text-8xl font-bold text-muted/10 transition-all duration-300 group-hover:text-muted/20">
                "
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
