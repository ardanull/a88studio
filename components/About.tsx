'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          {/* Studio intro */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                About the studio
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                A small team,
                <br />
                <span className="text-muted-foreground">big impact.</span>
              </h2>
            </div>

            <p className="max-w-xl text-lg text-muted-foreground">
              a88studio partners with brands, startups, and product teams to design and ship digital products
              that feel sharp, considered, and unmistakably premium.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/60 p-5">
                <div className="text-sm font-medium text-muted-foreground">Focus</div>
                <div className="mt-2 text-sm">
                  Product-focused design and development with a strong eye for detail and usability.
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5">
                <div className="text-sm font-medium text-muted-foreground">Collaboration</div>
                <div className="mt-2 text-sm">
                  Direct access to the team, tight feedback loops, and transparent communication.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Process / Approach */}
          <motion.div
            className="space-y-6 rounded-3xl border border-border bg-gradient-to-b from-background/90 via-background to-background/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)]"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Process
              </h3>
              <p className="mt-3 text-base text-muted-foreground">
                A clear, collaborative process from first call to launch and beyond.
              </p>
            </div>

            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <div className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
                  01
                </div>
                <div>
                  <div className="font-medium">Discover & define</div>
                  <p className="mt-1 text-muted-foreground">
                    We align on goals, constraints, and success metrics through workshops and research.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
                  02
                </div>
                <div>
                  <div className="font-medium">Design & validate</div>
                  <p className="mt-1 text-muted-foreground">
                    Rapid exploration of directions, UX flows, and visual systems—validated with your team.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
                  03
                </div>
                <div>
                  <div className="font-medium">Build & launch</div>
                  <p className="mt-1 text-muted-foreground">
                    We ship production-ready experiences, then iterate based on real-world usage and data.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-4 rounded-2xl border border-dashed border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground">
              Prefer a quick call? Reach out via email and we&apos;ll share a short deck with selected work and pricing.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

