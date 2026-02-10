'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'
import { getAllBlogPosts } from '@/lib/blog'
import Link from 'next/link'

export default function BlogPage() {
  const { language } = useLanguage()
  const isTR = language === 'tr'
  const posts = getAllBlogPosts()

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
                Blog
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                {isTR ? 'Stüdyodan içgörüler ve hikayeler' : 'Insights & stories from the studio'}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                {isTR
                  ? 'Her boyuttaki ekiple tasarım, geliştirme ve dijital ürün geliştirme üzerine düşünceler.'
                  : 'Thoughts on design, development, and building digital products with teams of all sizes.'}
              </p>
            </motion.header>

            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title[language]}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium">
                        {post.tag[language]}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime[language]}
                        </span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="mb-3 text-xl font-bold tracking-tight transition-colors hover:text-primary">
                        {post.title[language]}
                      </h2>
                    </Link>

                    <p className="mb-6 flex-grow text-sm text-muted-foreground">
                      {post.excerpt[language]}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {isTR ? 'Hikayeyi oku' : 'Read story'}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
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
              <p className="text-muted-foreground">
                {isTR ? 'Daha fazla yazı çok yakında...' : 'More articles coming soon...'}
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

