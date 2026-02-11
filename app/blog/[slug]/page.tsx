'use client'

import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { useParams, useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'
import { getBlogPost } from '@/lib/blog'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// Dynamic metadata would go here in a server component
// For now, we'll add it via Head in the component

type EmbedBlock = { type: 'youtube' | 'image' | 'code'; value: string; caption?: string }

const renderInline = (text: string) => {
  const nodes: Array<string | JSX.Element> = []
  let rest = text
  const patterns = [
    { regex: /\[(.+?)\]\((.+?)\)/, type: 'link' },
    { regex: /\*\*(.+?)\*\*/, type: 'strong' },
    { regex: /\*(.+?)\*/, type: 'em' },
    { regex: /`(.+?)`/, type: 'code' },
  ] as const
  while (rest.length) {
    let earliest: { index: number; match: RegExpExecArray; type: string } | null = null
    for (const p of patterns) {
      const m = p.regex.exec(rest)
      if (m && (earliest === null || m.index < earliest.index)) {
        earliest = { index: m.index, match: m, type: p.type }
      }
    }
    if (!earliest) {
      nodes.push(rest)
      break
    }
    if (earliest.index > 0) {
      nodes.push(rest.slice(0, earliest.index))
    }
    const [full, a, b] = earliest.match
    if (earliest.type === 'link') {
      nodes.push(
        <a key={nodes.length} href={b} className="text-primary underline underline-offset-4">
          {a}
        </a>
      )
    } else if (earliest.type === 'strong') {
      nodes.push(
        <strong key={nodes.length} className="font-semibold">
          {a}
        </strong>
      )
    } else if (earliest.type === 'em') {
      nodes.push(
        <em key={nodes.length} className="italic">
          {a}
        </em>
      )
    } else {
      nodes.push(
        <code key={nodes.length} className="rounded bg-muted px-1.5 py-0.5 text-xs">
          {a}
        </code>
      )
    }
    rest = rest.slice(earliest.index + full.length)
  }
  return nodes
}

const renderMarkdown = (md: string) => {
  if (!md) return null
  const blocks = md.split(/\n{2,}/).filter(Boolean)
  return blocks.map((b, i) => {
    if (b.startsWith('```')) {
      const code = b.replace(/^```[^\n]*\n?/, '').replace(/\n?```$/, '')
      return (
        <pre key={i} className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-xs">
          <code>{code}</code>
        </pre>
      )
    }
    const h3 = b.match(/^###\s+(.*)/)
    const h2 = b.match(/^##\s+(.*)/)
    const h1 = b.match(/^#\s+(.*)/)
    if (h3) return <h3 key={i} className="text-xl font-semibold">{renderInline(h3[1])}</h3>
    if (h2) return <h2 key={i} className="text-2xl font-semibold">{renderInline(h2[1])}</h2>
    if (h1) return <h1 key={i} className="text-3xl font-semibold">{renderInline(h1[1])}</h1>
    return (
      <p key={i} className="leading-relaxed text-muted-foreground">
        {renderInline(b)}
      </p>
    )
  })
}

const renderEmbeds = (embeds: EmbedBlock[]) =>
  embeds.map((b, i) => {
    if (b.type === 'youtube') {
      const id = b.value.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '')
      return (
        <div key={i} className="mt-6 overflow-hidden rounded-2xl border border-border">
          <iframe src={`https://www.youtube.com/embed/${id}`} className="aspect-video w-full" allowFullScreen />
          {b.caption && <div className="p-3 text-xs text-muted-foreground">{b.caption}</div>}
        </div>
      )
    }
    if (b.type === 'image') {
      return (
        <div key={i} className="mt-6 overflow-hidden rounded-2xl border border-border">
          <img src={b.value} alt={b.caption || ''} className="w-full object-cover" />
          {b.caption && <div className="p-3 text-xs text-muted-foreground">{b.caption}</div>}
        </div>
      )
    }
    return (
      <div key={i} className="mt-6 rounded-2xl border border-border bg-muted/40 p-4 text-xs">
        <pre className="overflow-x-auto">{b.value}</pre>
        {b.caption && <div className="mt-2 text-xs text-muted-foreground">{b.caption}</div>}
      </div>
    )
  })

export default function BlogPostPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const isTR = language === 'tr'
  
  const slug = params.slug as string
  const preview = searchParams.get('preview')
  const staticPost = getBlogPost(slug)
  const [apiPost, setApiPost] = useState<any | null>(null)
  useEffect(() => {
    if (staticPost) return
    const url = preview ? `/api/blog?preview=${encodeURIComponent(preview)}&slug=${encodeURIComponent(slug)}` : '/api/blog'
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        const found = preview ? d[0] : d.find((p: any) => p.slug === slug)
        setApiPost(found || null)
      })
      .catch(() => setApiPost(null))
  }, [slug, staticPost, preview])
  const post: any = staticPost || apiPost

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

  const content = post.content?.[language]
  const markdown = post.contentMarkdown?.[language]
  const embeds = post.embeds?.[language] || []
  const tags = Array.isArray(post.tags?.[language])
    ? post.tags[language]
    : post.tag?.[language]
      ? [post.tag[language]]
      : []

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
                {tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((t: string) => (
                      <span key={t} className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime?.[language]}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {post.title?.[language]}
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                {post.excerpt?.[language]}
              </p>

              <div className="mt-8 flex items-center gap-4">
                {post.author && (
                  <>
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
                  </>
                )}
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
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title?.[language] || ''}
                  className="aspect-[21/9] w-full object-cover"
                />
              )}
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
              {content?.intro && (
                <p className="lead text-xl leading-relaxed text-muted-foreground">
                  {content.intro}
                </p>
              )}
 
              {markdown && <div className="mt-6 max-w-none">{renderMarkdown(markdown)}</div>}

              {/* Sections */}
              {content?.sections?.map((section: any, index: number) => (
                <div key={index}>
                  <h2 className="mt-12 text-3xl font-bold tracking-tight md:text-4xl">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph: string, pIndex: number) => (
                    <p key={pIndex} className="mt-6 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              {content?.conclusion && (
                <div className="mt-12 rounded-3xl border border-border bg-muted/30 p-6 md:p-8">
                  <h3 className="text-xl font-bold">{isTR ? 'Sonuç' : 'Conclusion'}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {content.conclusion}
                  </p>
                </div>
              )}
            </motion.article>

            {post.author && (
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
            )}
 
            {embeds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mx-auto mt-16 max-w-3xl"
              >
                {renderEmbeds(embeds)}
              </motion.div>
            )}

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
