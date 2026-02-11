'use client'
 
 import Navigation from '@/components/Navigation'
 import Footer from '@/components/Footer'
 import ScrollProgress from '@/components/ScrollProgress'
 import { useLanguage } from '@/components/LanguageContext'
 import { useEffect, useMemo, useState } from 'react'
 import Link from 'next/link'
 
 export default function BlogIndexPage() {
   const { language } = useLanguage()
   const isTR = language === 'tr'
 
  const [allPosts, setAllPosts] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((d) => setAllPosts(d))
      .catch(() => setAllPosts([]))
  }, [])
  const visible = useMemo(
    () => allPosts.filter((p) => !p.status || p.status === 'published'),
    [allPosts]
  )
  const tags = useMemo(() => {
    const raw = visible.flatMap((p) => (Array.isArray(p.tags?.[language]) ? p.tags[language] : p.tag?.[language] ? [p.tag[language]] : []))
    return Array.from(new Set(raw.filter(Boolean)))
  }, [visible, language])
  const categories = useMemo(() => {
    const raw = visible.flatMap((p) => (Array.isArray(p.categories?.[language]) ? p.categories[language] : []))
    return Array.from(new Set(raw.filter(Boolean)))
  }, [visible, language])
 
   const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
   const [page, setPage] = useState(1)
   const pageSize = 6
 
  const filtered = visible.filter((p) => {
     const q = query.trim().toLowerCase()
     const matchesQuery =
       !q ||
       p.title[language].toLowerCase().includes(q) ||
       p.excerpt[language].toLowerCase().includes(q)
    const postTags = Array.isArray(p.tags?.[language]) ? p.tags[language] : p.tag?.[language] ? [p.tag[language]] : []
    const postCategories = Array.isArray(p.categories?.[language]) ? p.categories[language] : []
    const matchesTag = !activeTag || postTags.includes(activeTag)
    const matchesCategory = !activeCategory || postCategories.includes(activeCategory)
    return matchesQuery && matchesTag && matchesCategory
   })
 
   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
   const start = (page - 1) * pageSize
   const pageItems = filtered.slice(start, start + pageSize)
 
  const changeTag = (t: string | null) => {
    setActiveTag(t)
    setPage(1)
  }
  const changeCategory = (c: string | null) => {
    setActiveCategory(c)
    setPage(1)
  }
 
   return (
     <>
       <ScrollProgress />
       <Navigation />
       <main>
         <section className="section-padding">
           <div className="container-custom">
             <header className="mb-10 md:mb-16">
               <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                 {isTR ? 'Blog' : 'Blog'}
               </p>
               <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                 {isTR ? 'Yazılar ve içgörüler' : 'Articles and insights'}
               </h1>
               <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                 {isTR
                   ? 'Tasarım, süreç ve modern web geliştirme üzerine notlar.'
                   : 'Notes on design, process, and modern web development.'}
               </p>
             </header>
 
            <div className="mb-6 flex flex-wrap items-center gap-3">
               <input
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder={isTR ? 'Ara...' : 'Search...'}
                 className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm md:w-64"
               />
              <div className="flex flex-wrap gap-2">
                 <button
                   onClick={() => changeTag(null)}
                   className={`rounded-full px-3 py-1 text-sm ${
                     activeTag === null ? 'bg-primary/10 text-primary' : 'border border-border bg-background'
                   }`}
                 >
                   {isTR ? 'Tümü' : 'All'}
                 </button>
                 {tags.map((t) => (
                   <button
                     key={t}
                     onClick={() => changeTag(t)}
                     className={`rounded-full px-3 py-1 text-sm ${
                       activeTag === t ? 'bg-primary/10 text-primary' : 'border border-border bg-background'
                     }`}
                   >
                     {t}
                   </button>
                 ))}
               </div>
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => changeCategory(null)}
                    className={`rounded-full px-3 py-1 text-sm ${
                      activeCategory === null ? 'bg-primary/10 text-primary' : 'border border-border bg-background'
                    }`}
                  >
                    {isTR ? 'Tüm kategoriler' : 'All categories'}
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => changeCategory(c)}
                      className={`rounded-full px-3 py-1 text-sm ${
                        activeCategory === c ? 'bg-primary/10 text-primary' : 'border border-border bg-background'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
             </div>
 
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((post) => {
                const tagLabel = Array.isArray(post.tags?.[language])
                  ? post.tags[language][0]
                  : post.tag?.[language]
                return (
                 <Link
                   key={post.slug}
                   href={`/blog/${post.slug}`}
                   className="group rounded-2xl border border-border"
                 >
                   <img
                     src={post.image}
                     alt={post.title[language]}
                     className="aspect-[4/3] w-full rounded-t-2xl object-cover"
                   />
                   <div className="p-4">
                    <div className="flex items-center justify-between">
                      {tagLabel && (
                        <span className="text-xs rounded-full border border-border px-3 py-1 text-muted-foreground">
                          {tagLabel}
                        </span>
                      )}
                       <span className="text-xs text-muted-foreground">{post.readingTime[language]}</span>
                     </div>
                     <h3 className="mt-3 text-lg font-semibold">{post.title[language]}</h3>
                     <p className="mt-2 text-sm text-muted-foreground">{post.excerpt[language]}</p>
                   </div>
                </Link>
              )})}
             </div>
 
             <div className="mt-8 flex items-center justify-center gap-2">
               <button
                 disabled={page <= 1}
                 onClick={() => setPage((p) => Math.max(1, p - 1))}
                 className="rounded-full border border-border bg-background px-3 py-1 text-sm disabled:opacity-60"
               >
                 {isTR ? 'Önceki' : 'Prev'}
               </button>
               <span className="text-sm text-muted-foreground">
                 {page} / {totalPages}
               </span>
               <button
                 disabled={page >= totalPages}
                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                 className="rounded-full border border-border bg-background px-3 py-1 text-sm disabled:opacity-60"
               >
                 {isTR ? 'Sonraki' : 'Next'}
               </button>
             </div>
           </div>
         </section>
       </main>
       <Footer />
     </>
   )
 }
