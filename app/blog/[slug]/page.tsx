'use client'

import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'
import { getBlogPost } from '@/lib/blog'
import Link from 'next/link'

// Dynamic metadata would go here in a server component
// For now, we'll add it via Head in the component

export default function BlogPostPage() {
  const params = useParams()
  const { language } = useLanguage()
  const isTR = language === 'tr'
  
  const slug = params.slug as string
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <>
        <Navigation />
        <main className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold">
              {isTR ? 'Blog yazısı bulunamadı' : 'Blog post not found'}
            </h1>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {isTR ? 'Blog\'a dön' : 'Back to blog'}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const content = post.content[language]

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                {isTR ? 'Blog\'a dön' : 'Back to blog'}
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                  {post.tag[language]}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime[language]}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {post.title[language]}
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                {post.excerpt[language]}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {post.author.role[language]}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-12 md:pb-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="overflow-hidden rounded-3xl bg-muted"
            >
              <img
                src={post.image}
                alt={post.title[language]}
                className="aspect-[21/9] w-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 md:pb-32">
          <div className="container-custom">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              className="prose prose-lg mx-auto max-w-3xl"
            >
              {/* Intro */}
              <p className="lead text-xl leading-relaxed text-muted-foreground">
                {content.intro}
              </p>

              {/* Sections */}
              {content.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="mt-12 text-3xl font-bold tracking-tight md:text-4xl">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mt-6 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              {/* Conclusion */}
              <div className="mt-12 rounded-3xl border border-border bg-muted/30 p-6 md:p-8">
                <h3 className="text-xl font-bold">{isTR ? 'Sonuç' : 'Conclusion'}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {content.conclusion}
                </p>
              </div>
            </motion.article>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-background p-6 md:p-8"
            >
              <div className="flex items-start gap-6">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {isTR ? 'Yazar' : 'Written by'}
                  </div>
                  <h3 className="mt-1 text-xl font-bold">{post.author.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.author.role[language]}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-16 text-center"
            >
              <Link
                href="/blog"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                {isTR ? 'Daha fazla yazı oku' : 'Read more articles'}
                <span className="text-xs">→</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
