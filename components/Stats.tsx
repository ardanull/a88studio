'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 })
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`
      }
    })
  }, [springValue, suffix])

  return <div ref={ref} />
}

const stats = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 150, suffix: '+', label: 'Happy Clients' },
  { value: 24, suffix: '/7', label: 'Support Available' },
]

export default function Stats() {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-custom">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-background p-8 text-center shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="text-5xl font-bold md:text-6xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
