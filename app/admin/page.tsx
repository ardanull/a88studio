 'use client'
 
 import { useEffect, useMemo, useState } from 'react'
 import Navigation from '@/components/Navigation'
 import Footer from '@/components/Footer'
 import ScrollProgress from '@/components/ScrollProgress'
 import { useLanguage } from '@/components/LanguageContext'
 
 type EmbedBlock = { type: 'youtube' | 'image' | 'code'; value: string; caption?: string }
 
 const slugify = (value: string) =>
   value
     .toLowerCase()
     .normalize('NFD')
     .replace(/[\u0300-\u036f]/g, '')
     .replace(/[^a-z0-9]+/g, '-')
     .replace(/(^-|-$)+/g, '')
     .replace(/-+/g, '-')
 
 const buildUniqueSlug = (base: string, existing: Set<string>) => {
   let slug = base
   let i = 2
   while (existing.has(slug)) {
     slug = `${base}-${i}`
     i += 1
   }
   return slug
 }
 
 const parseList = (value: string) =>
   value
     .split(',')
     .map((s) => s.trim())
     .filter(Boolean)
 
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
           <iframe
             src={`https://www.youtube.com/embed/${id}`}
             className="aspect-video w-full"
             allowFullScreen
           />
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
 
 export default function AdminPage() {
   const { language } = useLanguage()
   const isTR = language === 'tr'
 
   const [auth, setAuth] = useState(false)
   const [password, setPassword] = useState('')
  const [tab, setTab] = useState<'blog' | 'submissions' | 'careers'>('blog')
 
  const [blog, setBlog] = useState<any[]>([])
  const [blogQuery, setBlogQuery] = useState('')
  const [autoSlug, setAutoSlug] = useState(true)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState({
    slug: '',
    titleTr: '',
    titleEn: '',
    excerptTr: '',
    excerptEn: '',
    tagsTr: '',
    tagsEn: '',
    categoriesTr: '',
    categoriesEn: '',
    image: '',
    readingTr: '5 dk',
    readingEn: '5 min',
    status: 'draft',
    publishAt: '',
    authorName: '',
    authorRoleTr: '',
    authorRoleEn: '',
    authorAvatar: '',
    markdownTr: '',
    markdownEn: '',
    embedsTr: [] as EmbedBlock[],
    embedsEn: [] as EmbedBlock[],
  })

const diffLines = (before: string, after: string) => {
  const a = before.split('\n')
  const b = after.split('\n')
  const max = Math.max(a.length, b.length)
  return Array.from({ length: max }, (_, i) => {
    const left = a[i] ?? ''
    const right = b[i] ?? ''
    if (left === right) return { type: 'same', value: left }
    if (left && !right) return { type: 'remove', value: left }
    if (!left && right) return { type: 'add', value: right }
    return { type: 'change', value: `${left} → ${right}` }
  })
}
 
   const [subs, setSubs] = useState<any[]>([])
  const [subsType, setSubsType] = useState<'all' | 'contact' | 'career'>('all')
  const [jobs, setJobs] = useState<any[]>([])
  const [jobForm, setJobForm] = useState({
    id: '',
    titleTr: '',
    titleEn: '',
    location: 'Remote',
    type: 'Full-time',
    descTr: '',
    descEn: '',
    status: 'open',
  })
 
   useEffect(() => {
     fetch('/api/admin/me')
       .then((r) => r.json())
       .then((d) => setAuth(!!d.authenticated))
   }, [])
 
   useEffect(() => {
     if (!auth) return
    fetch('/api/blog?all=1')
       .then((r) => r.json())
       .then((d) => setBlog(d))
     fetch('/api/submissions')
       .then((r) => r.json())
       .then((d) => setSubs(d))
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((d) => setJobs(d))
   }, [auth])
 
   const login = async () => {
     const res = await fetch('/api/admin/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ password }),
     })
     if (res.ok) {
       setAuth(true)
     }
   }
 
   const logout = async () => {
     await fetch('/api/admin/logout', { method: 'POST' })
     setAuth(false)
   }
 
   const createBlog = async () => {
    setFormError('')
    const existing = new Set(blog.map((p) => p.slug))
    const base = slugify(form.slug || form.titleTr || form.titleEn)
    const resolved = autoSlug ? buildUniqueSlug(base, existing) : (form.slug || base)
    if (!resolved || !form.titleTr || !form.titleEn) {
      setFormError(isTR ? 'Zorunlu alanlar eksik' : 'Missing required fields')
      return
    }
    if (existing.has(resolved)) {
      setFormError(isTR ? 'Slug zaten kullanılıyor' : 'Slug already exists')
      return
    }
    const payload = {
      slug: resolved,
      title: { tr: form.titleTr, en: form.titleEn },
      excerpt: { tr: form.excerptTr, en: form.excerptEn },
      tags: { tr: parseList(form.tagsTr), en: parseList(form.tagsEn) },
      categories: { tr: parseList(form.categoriesTr), en: parseList(form.categoriesEn) },
      image: form.image,
      readingTime: { tr: form.readingTr, en: form.readingEn },
      date: new Date().toISOString(),
      status: form.status,
      publishAt: form.publishAt ? new Date(form.publishAt).toISOString() : null,
      previewToken: crypto.randomUUID(),
      author:
        form.authorName || form.authorAvatar || form.authorRoleTr || form.authorRoleEn
          ? {
              name: form.authorName,
              avatar: form.authorAvatar,
              role: { tr: form.authorRoleTr, en: form.authorRoleEn },
            }
          : null,
      contentMarkdown: { tr: form.markdownTr, en: form.markdownEn },
      embeds: { tr: form.embedsTr, en: form.embedsEn },
    }
     const res = await fetch('/api/blog', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload),
     })
    if (res.ok) {
      const list = await fetch('/api/blog?all=1').then((r) => r.json())
       setBlog(list)
       setForm({
         slug: '',
         titleTr: '',
         titleEn: '',
         excerptTr: '',
         excerptEn: '',
        tagsTr: '',
        tagsEn: '',
        categoriesTr: '',
        categoriesEn: '',
         image: '',
         readingTr: '5 dk',
         readingEn: '5 min',
        status: 'draft',
        publishAt: '',
        authorName: '',
        authorRoleTr: '',
        authorRoleEn: '',
        authorAvatar: '',
        markdownTr: '',
        markdownEn: '',
        embedsTr: [],
        embedsEn: [],
       })
     }
   }
 
   const deleteBlog = async (slug: string) => {
     const res = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' })
     if (res.ok) {
      const list = await fetch('/api/blog?all=1').then((r) => r.json())
       setBlog(list)
     }
   }
 
   const filteredBlog = useMemo(() => {
     const q = blogQuery.trim().toLowerCase()
     if (!q) return blog
     return blog.filter((p) => {
       const t = (p.title?.[language] || '').toLowerCase()
       const e = (p.excerpt?.[language] || '').toLowerCase()
      const tags = (p.tags?.[language] || p.tag?.[language] || [])
      const cats = (p.categories?.[language] || [])
      const tagText = Array.isArray(tags) ? tags.join(' ') : String(tags || '')
      const catText = Array.isArray(cats) ? cats.join(' ') : String(cats || '')
      return t.includes(q) || e.includes(q) || tagText.toLowerCase().includes(q) || catText.toLowerCase().includes(q)
     })
   }, [blog, blogQuery, language])
 
  const [editing, setEditing] = useState<any | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<any | null>(null)
  const [editForm, setEditForm] = useState({
    titleTr: '',
    titleEn: '',
    excerptTr: '',
    excerptEn: '',
    tagsTr: '',
    tagsEn: '',
    categoriesTr: '',
    categoriesEn: '',
    image: '',
    readingTr: '',
    readingEn: '',
    status: 'draft',
    publishAt: '',
    authorName: '',
    authorRoleTr: '',
    authorRoleEn: '',
    authorAvatar: '',
    markdownTr: '',
    markdownEn: '',
    embedsTr: [] as EmbedBlock[],
    embedsEn: [] as EmbedBlock[],
  })
 
  const startEdit = (p: any) => {
    if (!p.previewToken) return
    setEditing(p)
    setSelectedVersion(null)
    setEditForm({
      titleTr: p.title?.tr || '',
      titleEn: p.title?.en || '',
      excerptTr: p.excerpt?.tr || '',
      excerptEn: p.excerpt?.en || '',
      tagsTr: (p.tags?.tr || p.tag?.tr || []).join ? (p.tags?.tr || [p.tag?.tr]).filter(Boolean).join(', ') : (p.tags?.tr || p.tag?.tr || ''),
      tagsEn: (p.tags?.en || p.tag?.en || []).join ? (p.tags?.en || [p.tag?.en]).filter(Boolean).join(', ') : (p.tags?.en || p.tag?.en || ''),
      categoriesTr: (p.categories?.tr || []).join(', '),
      categoriesEn: (p.categories?.en || []).join(', '),
      image: p.image || '',
      readingTr: p.readingTime?.tr || '',
      readingEn: p.readingTime?.en || '',
      status: p.status || 'draft',
      publishAt: p.publishAt ? new Date(p.publishAt).toISOString().slice(0, 16) : '',
      authorName: p.author?.name || '',
      authorRoleTr: p.author?.role?.tr || '',
      authorRoleEn: p.author?.role?.en || '',
      authorAvatar: p.author?.avatar || '',
      markdownTr: p.contentMarkdown?.tr || '',
      markdownEn: p.contentMarkdown?.en || '',
      embedsTr: p.embeds?.tr || [],
      embedsEn: p.embeds?.en || [],
    })
  }
 
  const saveEdit = async () => {
    if (!editing) return
    const payload = {
      slug: editing.slug,
      title: { tr: editForm.titleTr, en: editForm.titleEn },
      excerpt: { tr: editForm.excerptTr, en: editForm.excerptEn },
      tags: { tr: parseList(editForm.tagsTr), en: parseList(editForm.tagsEn) },
      categories: { tr: parseList(editForm.categoriesTr), en: parseList(editForm.categoriesEn) },
      image: editForm.image,
      readingTime: { tr: editForm.readingTr, en: editForm.readingEn },
      status: editForm.status,
      publishAt: editForm.publishAt ? new Date(editForm.publishAt).toISOString() : null,
      author:
        editForm.authorName || editForm.authorAvatar || editForm.authorRoleTr || editForm.authorRoleEn
          ? {
              name: editForm.authorName,
              avatar: editForm.authorAvatar,
              role: { tr: editForm.authorRoleTr, en: editForm.authorRoleEn },
            }
          : null,
      contentMarkdown: { tr: editForm.markdownTr, en: editForm.markdownEn },
      embeds: { tr: editForm.embedsTr, en: editForm.embedsEn },
    }
    const res = await fetch('/api/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const list = await fetch('/api/blog?all=1').then((r) => r.json())
      setBlog(list)
      setEditing(null)
    }
  }

  const restoreVersion = async (versionId: string) => {
    if (!editing) return
    const res = await fetch('/api/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: editing.slug, restoreVersionId: versionId }),
    })
    if (res.ok) {
      const list = await fetch('/api/blog?all=1').then((r) => r.json())
      setBlog(list)
      const updated = list.find((p: any) => p.slug === editing.slug)
      if (updated) startEdit(updated)
    }
  }
 
   const exportSubsCsv = () => {
     const header = ['type', 'name', 'email', 'company', 'role', 'budget', 'cvUrl', 'message', 'createdAt']
     const rows = subs
       .filter((s) => (subsType === 'all' ? true : s.type === subsType))
       .map((s: any) => header.map((h) => JSON.stringify(s[h] ?? '')).join(','))
     const csv = [header.join(','), ...rows].join('\n')
     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
     const url = URL.createObjectURL(blob)
     const a = document.createElement('a')
     a.href = url
     a.download = 'submissions.csv'
     a.click()
     URL.revokeObjectURL(url)
   }
 
   const createJob = async () => {
     const payload = {
       id: jobForm.id,
       title: { tr: jobForm.titleTr, en: jobForm.titleEn },
       location: jobForm.location,
       type: jobForm.type,
       description: { tr: jobForm.descTr, en: jobForm.descEn },
       status: jobForm.status,
     }
     const res = await fetch('/api/jobs', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload),
     })
     if (res.ok) {
       const list = await fetch('/api/jobs').then((r) => r.json())
       setJobs(list)
       setJobForm({
         id: '',
         titleTr: '',
         titleEn: '',
         location: 'Remote',
         type: 'Full-time',
         descTr: '',
         descEn: '',
         status: 'open',
       })
     }
   }
 
   const deleteJob = async (id: string) => {
     const res = await fetch(`/api/jobs?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
     if (res.ok) {
       const list = await fetch('/api/jobs').then((r) => r.json())
       setJobs(list)
     }
   }
 
   const toggleJobStatus = async (id: string, next: 'open' | 'closed') => {
     const res = await fetch('/api/jobs', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ id, status: next }),
     })
     if (res.ok) {
       const list = await fetch('/api/jobs').then((r) => r.json())
       setJobs(list)
     }
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
                 {isTR ? 'Admin' : 'Admin'}
               </p>
               <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                 {isTR ? 'Yönetim Paneli' : 'Admin Panel'}
               </h1>
             </header>
 
             {!auth ? (
               <div className="max-w-md rounded-2xl border border-border p-6">
                 <input
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   type="password"
                   placeholder={isTR ? 'Parola' : 'Password'}
                   className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                 />
                 <button
                   onClick={login}
                   className="mt-4 w-full rounded-full border border-foreground bg-foreground px-4 py-2 text-sm text-background"
                 >
                   {isTR ? 'Giriş' : 'Login'}
                 </button>
               </div>
             ) : (
               <>
                <div className="mb-6 flex items-center justify-between">
                   <div className="flex gap-2">
                     <button
                       onClick={() => setTab('blog')}
                       className={`rounded-full px-3 py-1 text-sm ${
                         tab === 'blog' ? 'bg-primary/10 text-primary' : 'border border-border bg-background'
                       }`}
                     >
                       {isTR ? 'Blog' : 'Blog'}
                     </button>
                     <button
                       onClick={() => setTab('submissions')}
                       className={`rounded-full px-3 py-1 text-sm ${
                         tab === 'submissions' ? 'bg-primary/10 text-primary' : 'border border-border bg-background'
                       }`}
                     >
                       {isTR ? 'Başvurular' : 'Submissions'}
                     </button>
                    <button
                      onClick={() => setTab('careers')}
                      className={`rounded-full px-3 py-1 text-sm ${
                        tab === 'careers' ? 'bg-primary/10 text-primary' : 'border border-border bg-background'
                      }`}
                    >
                      {isTR ? 'Kariyerler' : 'Careers'}
                    </button>
                   </div>
                   <button
                     onClick={logout}
                     className="rounded-full border border-border bg-background px-3 py-1 text-sm"
                   >
                     {isTR ? 'Çıkış' : 'Logout'}
                   </button>
                 </div>
 
                <div className="mb-6 grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="text-xs text-muted-foreground">{isTR ? 'Toplam blog' : 'Total blog'}</div>
                    <div className="mt-1 text-2xl font-bold">{blog.length}</div>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="text-xs text-muted-foreground">{isTR ? 'Başvurular' : 'Submissions'}</div>
                    <div className="mt-1 text-2xl font-bold">{subs.length}</div>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="text-xs text-muted-foreground">{isTR ? 'Açık pozisyon' : 'Open jobs'}</div>
                    <div className="mt-1 text-2xl font-bold">
                      {jobs.filter((j: any) => j.status !== 'closed').length}
                    </div>
                  </div>
                </div>
 
                 {tab === 'blog' && (
                   <div className="grid gap-6 md:grid-cols-2">
                     <div className="rounded-2xl border border-border p-6">
                       <h3 className="text-lg font-semibold">{isTR ? 'Yeni yazı' : 'New post'}</h3>
                       <div className="mt-4 grid gap-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">{isTR ? 'Otomatik slug' : 'Auto slug'}</div>
                          <input
                            type="checkbox"
                            checked={autoSlug}
                            onChange={(e) => setAutoSlug(e.target.checked)}
                            className="h-4 w-4"
                          />
                        </div>
                        <input
                          value={form.slug}
                          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                          placeholder="slug"
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                        {formError && <div className="text-xs text-red-500">{formError}</div>}
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={form.titleTr}
                            onChange={(e) => {
                              const v = e.target.value
                              setForm((f) => ({
                                ...f,
                                titleTr: v,
                                slug: autoSlug ? buildUniqueSlug(slugify(v || f.titleEn), new Set(blog.map((p) => p.slug))) : f.slug,
                              }))
                            }}
                            placeholder="başlık tr"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <input
                            value={form.titleEn}
                            onChange={(e) => {
                              const v = e.target.value
                              setForm((f) => ({
                                ...f,
                                titleEn: v,
                                slug: autoSlug ? buildUniqueSlug(slugify(f.titleTr || v), new Set(blog.map((p) => p.slug))) : f.slug,
                              }))
                            }}
                            placeholder="title en"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={form.excerptTr}
                            onChange={(e) => setForm((f) => ({ ...f, excerptTr: e.target.value }))}
                            placeholder="özet tr"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <input
                            value={form.excerptEn}
                            onChange={(e) => setForm((f) => ({ ...f, excerptEn: e.target.value }))}
                            placeholder="excerpt en"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={form.tagsTr}
                            onChange={(e) => setForm((f) => ({ ...f, tagsTr: e.target.value }))}
                            placeholder="etiketler tr (virgül)"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <input
                            value={form.tagsEn}
                            onChange={(e) => setForm((f) => ({ ...f, tagsEn: e.target.value }))}
                            placeholder="tags en (comma)"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={form.categoriesTr}
                            onChange={(e) => setForm((f) => ({ ...f, categoriesTr: e.target.value }))}
                            placeholder="kategori tr (virgül)"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <input
                            value={form.categoriesEn}
                            onChange={(e) => setForm((f) => ({ ...f, categoriesEn: e.target.value }))}
                            placeholder="categories en (comma)"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <input
                          value={form.image}
                          onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                          placeholder="image url"
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={form.readingTr}
                            onChange={(e) => setForm((f) => ({ ...f, readingTr: e.target.value }))}
                            placeholder="okuma tr"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <input
                            value={form.readingEn}
                            onChange={(e) => setForm((f) => ({ ...f, readingEn: e.target.value }))}
                            placeholder="reading en"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={form.status}
                            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          >
                            <option value="draft">{isTR ? 'Taslak' : 'Draft'}</option>
                            <option value="published">{isTR ? 'Yayında' : 'Published'}</option>
                          </select>
                          <input
                            type="datetime-local"
                            value={form.publishAt}
                            onChange={(e) => setForm((f) => ({ ...f, publishAt: e.target.value }))}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={form.authorName}
                            onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
                            placeholder={isTR ? 'yazar adı' : 'author name'}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <input
                            value={form.authorAvatar}
                            onChange={(e) => setForm((f) => ({ ...f, authorAvatar: e.target.value }))}
                            placeholder={isTR ? 'yazar avatar url' : 'author avatar url'}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={form.authorRoleTr}
                            onChange={(e) => setForm((f) => ({ ...f, authorRoleTr: e.target.value }))}
                            placeholder={isTR ? 'yazar rol tr' : 'author role tr'}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <input
                            value={form.authorRoleEn}
                            onChange={(e) => setForm((f) => ({ ...f, authorRoleEn: e.target.value }))}
                            placeholder="author role en"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="grid gap-2">
                          <div className="text-xs text-muted-foreground">{isTR ? 'Markdown (TR)' : 'Markdown (TR)'}</div>
                          <textarea
                            value={form.markdownTr}
                            onChange={(e) => setForm((f) => ({ ...f, markdownTr: e.target.value }))}
                            rows={6}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <div className="rounded-xl border border-border p-3">{renderMarkdown(form.markdownTr)}</div>
                        </div>
                        <div className="grid gap-2">
                          <div className="text-xs text-muted-foreground">{isTR ? 'Markdown (EN)' : 'Markdown (EN)'}</div>
                          <textarea
                            value={form.markdownEn}
                            onChange={(e) => setForm((f) => ({ ...f, markdownEn: e.target.value }))}
                            rows={6}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <div className="rounded-xl border border-border p-3">{renderMarkdown(form.markdownEn)}</div>
                        </div>
                        <div className="grid gap-2">
                          <div className="text-xs text-muted-foreground">{isTR ? 'Embed (TR)' : 'Embeds (TR)'}</div>
                          {form.embedsTr.map((b, i) => (
                            <div key={i} className="grid grid-cols-3 gap-2">
                              <select
                                value={b.type}
                                onChange={(e) =>
                                  setForm((f) => {
                                    const next = [...f.embedsTr]
                                    next[i] = { ...next[i], type: e.target.value as any }
                                    return { ...f, embedsTr: next }
                                  })
                                }
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              >
                                <option value="youtube">YouTube</option>
                                <option value="image">{isTR ? 'Görsel' : 'Image'}</option>
                                <option value="code">Code</option>
                              </select>
                              <input
                                value={b.value}
                                onChange={(e) =>
                                  setForm((f) => {
                                    const next = [...f.embedsTr]
                                    next[i] = { ...next[i], value: e.target.value }
                                    return { ...f, embedsTr: next }
                                  })
                                }
                                placeholder="url / code"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={b.caption || ''}
                                onChange={(e) =>
                                  setForm((f) => {
                                    const next = [...f.embedsTr]
                                    next[i] = { ...next[i], caption: e.target.value }
                                    return { ...f, embedsTr: next }
                                  })
                                }
                                placeholder={isTR ? 'açıklama' : 'caption'}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                          ))}
                          <button
                            onClick={() => setForm((f) => ({ ...f, embedsTr: [...f.embedsTr, { type: 'youtube', value: '' }] }))}
                            className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                          >
                            {isTR ? 'Embed ekle' : 'Add embed'}
                          </button>
                        </div>
                        <div className="grid gap-2">
                          <div className="text-xs text-muted-foreground">{isTR ? 'Embed (EN)' : 'Embeds (EN)'}</div>
                          {form.embedsEn.map((b, i) => (
                            <div key={i} className="grid grid-cols-3 gap-2">
                              <select
                                value={b.type}
                                onChange={(e) =>
                                  setForm((f) => {
                                    const next = [...f.embedsEn]
                                    next[i] = { ...next[i], type: e.target.value as any }
                                    return { ...f, embedsEn: next }
                                  })
                                }
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              >
                                <option value="youtube">YouTube</option>
                                <option value="image">{isTR ? 'Görsel' : 'Image'}</option>
                                <option value="code">Code</option>
                              </select>
                              <input
                                value={b.value}
                                onChange={(e) =>
                                  setForm((f) => {
                                    const next = [...f.embedsEn]
                                    next[i] = { ...next[i], value: e.target.value }
                                    return { ...f, embedsEn: next }
                                  })
                                }
                                placeholder="url / code"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={b.caption || ''}
                                onChange={(e) =>
                                  setForm((f) => {
                                    const next = [...f.embedsEn]
                                    next[i] = { ...next[i], caption: e.target.value }
                                    return { ...f, embedsEn: next }
                                  })
                                }
                                placeholder={isTR ? 'açıklama' : 'caption'}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                          ))}
                          <button
                            onClick={() => setForm((f) => ({ ...f, embedsEn: [...f.embedsEn, { type: 'youtube', value: '' }] }))}
                            className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                          >
                            {isTR ? 'Embed ekle' : 'Add embed'}
                          </button>
                        </div>
                        <button
                          onClick={createBlog}
                          className="mt-2 rounded-full border border-foreground bg-foreground px-4 py-2 text-sm text-background"
                        >
                          {isTR ? 'Oluştur' : 'Create'}
                        </button>
                       </div>
                     </div>
 
                     <div className="rounded-2xl border border-border p-6">
                       <h3 className="text-lg font-semibold">{isTR ? 'Yazılar' : 'Posts'}</h3>
                      <input
                        value={blogQuery}
                        onChange={(e) => setBlogQuery(e.target.value)}
                        placeholder={isTR ? 'Ara...' : 'Search...'}
                        className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                      />
                      <div className="mt-4 grid gap-3">
                        {filteredBlog.map((p) => {
                          const tags = Array.isArray(p.tags?.[language]) ? p.tags[language].join(', ') : p.tag?.[language]
                          const cats = Array.isArray(p.categories?.[language]) ? p.categories[language].join(', ') : ''
                          const publishAt = p.publishAt ? new Date(p.publishAt) : null
                          const scheduled =
                            p.status === 'published' && publishAt && Number.isFinite(publishAt.getTime()) && publishAt.getTime() > Date.now()
                          return (
                            <div key={p.slug} className="rounded-lg border border-border p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-medium">{p.title?.[language]}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {[tags, cats].filter(Boolean).join(' · ')}
                                  </div>
                                  <div className="text-[11px] text-muted-foreground">
                                    {scheduled
                                      ? isTR
                                        ? 'Zamanlı'
                                        : 'Scheduled'
                                      : p.status === 'published'
                                        ? isTR
                                          ? 'Yayında'
                                          : 'Published'
                                        : isTR
                                          ? 'Taslak'
                                          : 'Draft'}
                                    {publishAt ? ` · ${publishAt.toLocaleString()}` : ''}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {p.previewToken && (
                                    <a
                                      href={`/blog/${p.slug}?preview=${p.previewToken}`}
                                      target="_blank"
                                      className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                                      rel="noreferrer"
                                    >
                                      {isTR ? 'Önizle' : 'Preview'}
                                    </a>
                                  )}
                                  {p.previewToken && (
                                    <button
                                      onClick={() => startEdit(p)}
                                      className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                                    >
                                      {isTR ? 'Düzenle' : 'Edit'}
                                    </button>
                                  )}
                                  {p.previewToken && (
                                    <button
                                      onClick={() => deleteBlog(p.slug)}
                                      className="rounded-full border border-red-500 px-3 py-1 text-xs text-red-600"
                                    >
                                      {isTR ? 'Sil' : 'Delete'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
 
                      {editing && (
                        <div className="mt-6 rounded-2xl border border-border p-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                              {isTR ? 'Yazıyı düzenle' : 'Edit post'} · {editing.slug}
                            </h3>
                            {editing.previewToken && (
                              <a
                                href={`/blog/${editing.slug}?preview=${editing.previewToken}`}
                                target="_blank"
                                className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                                rel="noreferrer"
                              >
                                {isTR ? 'Önizleme linki' : 'Preview link'}
                              </a>
                            )}
                          </div>
                          <div className="mt-4 grid gap-3">
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                value={editForm.titleTr}
                                onChange={(e) => setEditForm((f) => ({ ...f, titleTr: e.target.value }))}
                                placeholder="başlık tr"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={editForm.titleEn}
                                onChange={(e) => setEditForm((f) => ({ ...f, titleEn: e.target.value }))}
                                placeholder="title en"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                value={editForm.excerptTr}
                                onChange={(e) => setEditForm((f) => ({ ...f, excerptTr: e.target.value }))}
                                placeholder="özet tr"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={editForm.excerptEn}
                                onChange={(e) => setEditForm((f) => ({ ...f, excerptEn: e.target.value }))}
                                placeholder="excerpt en"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                value={editForm.tagsTr}
                                onChange={(e) => setEditForm((f) => ({ ...f, tagsTr: e.target.value }))}
                                placeholder="etiketler tr (virgül)"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={editForm.tagsEn}
                                onChange={(e) => setEditForm((f) => ({ ...f, tagsEn: e.target.value }))}
                                placeholder="tags en (comma)"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                value={editForm.categoriesTr}
                                onChange={(e) => setEditForm((f) => ({ ...f, categoriesTr: e.target.value }))}
                                placeholder="kategori tr (virgül)"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={editForm.categoriesEn}
                                onChange={(e) => setEditForm((f) => ({ ...f, categoriesEn: e.target.value }))}
                                placeholder="categories en (comma)"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <input
                              value={editForm.image}
                              onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))}
                              placeholder="image url"
                              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                value={editForm.readingTr}
                                onChange={(e) => setEditForm((f) => ({ ...f, readingTr: e.target.value }))}
                                placeholder="okuma tr"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={editForm.readingEn}
                                onChange={(e) => setEditForm((f) => ({ ...f, readingEn: e.target.value }))}
                                placeholder="reading en"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <select
                                value={editForm.status}
                                onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              >
                                <option value="draft">{isTR ? 'Taslak' : 'Draft'}</option>
                                <option value="published">{isTR ? 'Yayında' : 'Published'}</option>
                              </select>
                              <input
                                type="datetime-local"
                                value={editForm.publishAt}
                                onChange={(e) => setEditForm((f) => ({ ...f, publishAt: e.target.value }))}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                value={editForm.authorName}
                                onChange={(e) => setEditForm((f) => ({ ...f, authorName: e.target.value }))}
                                placeholder={isTR ? 'yazar adı' : 'author name'}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={editForm.authorAvatar}
                                onChange={(e) => setEditForm((f) => ({ ...f, authorAvatar: e.target.value }))}
                                placeholder={isTR ? 'yazar avatar url' : 'author avatar url'}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                value={editForm.authorRoleTr}
                                onChange={(e) => setEditForm((f) => ({ ...f, authorRoleTr: e.target.value }))}
                                placeholder={isTR ? 'yazar rol tr' : 'author role tr'}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <input
                                value={editForm.authorRoleEn}
                                onChange={(e) => setEditForm((f) => ({ ...f, authorRoleEn: e.target.value }))}
                                placeholder="author role en"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid gap-2">
                              <div className="text-xs text-muted-foreground">{isTR ? 'Markdown (TR)' : 'Markdown (TR)'}</div>
                              <textarea
                                value={editForm.markdownTr}
                                onChange={(e) => setEditForm((f) => ({ ...f, markdownTr: e.target.value }))}
                                rows={6}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <div className="rounded-xl border border-border p-3">{renderMarkdown(editForm.markdownTr)}</div>
                            </div>
                            <div className="grid gap-2">
                              <div className="text-xs text-muted-foreground">{isTR ? 'Markdown (EN)' : 'Markdown (EN)'}</div>
                              <textarea
                                value={editForm.markdownEn}
                                onChange={(e) => setEditForm((f) => ({ ...f, markdownEn: e.target.value }))}
                                rows={6}
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              />
                              <div className="rounded-xl border border-border p-3">{renderMarkdown(editForm.markdownEn)}</div>
                            </div>
                            <div className="grid gap-2">
                              <div className="text-xs text-muted-foreground">{isTR ? 'Embed (TR)' : 'Embeds (TR)'}</div>
                              {editForm.embedsTr.map((b, i) => (
                                <div key={i} className="grid grid-cols-4 gap-2">
                                  <select
                                    value={b.type}
                                    onChange={(e) =>
                                      setEditForm((f) => {
                                        const next = [...f.embedsTr]
                                        next[i] = { ...next[i], type: e.target.value as any }
                                        return { ...f, embedsTr: next }
                                      })
                                    }
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                  >
                                    <option value="youtube">YouTube</option>
                                    <option value="image">{isTR ? 'Görsel' : 'Image'}</option>
                                    <option value="code">Code</option>
                                  </select>
                                  <input
                                    value={b.value}
                                    onChange={(e) =>
                                      setEditForm((f) => {
                                        const next = [...f.embedsTr]
                                        next[i] = { ...next[i], value: e.target.value }
                                        return { ...f, embedsTr: next }
                                      })
                                    }
                                    placeholder="url / code"
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                  />
                                  <input
                                    value={b.caption || ''}
                                    onChange={(e) =>
                                      setEditForm((f) => {
                                        const next = [...f.embedsTr]
                                        next[i] = { ...next[i], caption: e.target.value }
                                        return { ...f, embedsTr: next }
                                      })
                                    }
                                    placeholder={isTR ? 'açıklama' : 'caption'}
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                  />
                                  <button
                                    onClick={() =>
                                      setEditForm((f) => ({
                                        ...f,
                                        embedsTr: f.embedsTr.filter((_, idx) => idx !== i),
                                      }))
                                    }
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-xs"
                                  >
                                    {isTR ? 'Sil' : 'Remove'}
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() =>
                                  setEditForm((f) => ({ ...f, embedsTr: [...f.embedsTr, { type: 'youtube', value: '' }] }))
                                }
                                className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                              >
                                {isTR ? 'Embed ekle' : 'Add embed'}
                              </button>
                            </div>
                            <div className="grid gap-2">
                              <div className="text-xs text-muted-foreground">{isTR ? 'Embed (EN)' : 'Embeds (EN)'}</div>
                              {editForm.embedsEn.map((b, i) => (
                                <div key={i} className="grid grid-cols-4 gap-2">
                                  <select
                                    value={b.type}
                                    onChange={(e) =>
                                      setEditForm((f) => {
                                        const next = [...f.embedsEn]
                                        next[i] = { ...next[i], type: e.target.value as any }
                                        return { ...f, embedsEn: next }
                                      })
                                    }
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                  >
                                    <option value="youtube">YouTube</option>
                                    <option value="image">{isTR ? 'Görsel' : 'Image'}</option>
                                    <option value="code">Code</option>
                                  </select>
                                  <input
                                    value={b.value}
                                    onChange={(e) =>
                                      setEditForm((f) => {
                                        const next = [...f.embedsEn]
                                        next[i] = { ...next[i], value: e.target.value }
                                        return { ...f, embedsEn: next }
                                      })
                                    }
                                    placeholder="url / code"
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                  />
                                  <input
                                    value={b.caption || ''}
                                    onChange={(e) =>
                                      setEditForm((f) => {
                                        const next = [...f.embedsEn]
                                        next[i] = { ...next[i], caption: e.target.value }
                                        return { ...f, embedsEn: next }
                                      })
                                    }
                                    placeholder={isTR ? 'açıklama' : 'caption'}
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                  />
                                  <button
                                    onClick={() =>
                                      setEditForm((f) => ({
                                        ...f,
                                        embedsEn: f.embedsEn.filter((_, idx) => idx !== i),
                                      }))
                                    }
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-xs"
                                  >
                                    {isTR ? 'Sil' : 'Remove'}
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() =>
                                  setEditForm((f) => ({ ...f, embedsEn: [...f.embedsEn, { type: 'youtube', value: '' }] }))
                                }
                                className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                              >
                                {isTR ? 'Embed ekle' : 'Add embed'}
                              </button>
                            </div>
                            {(editing.versions || []).length > 0 && (
                              <div className="rounded-xl border border-border p-4">
                                <div className="text-sm font-semibold">{isTR ? 'Versiyonlar' : 'Versions'}</div>
                                <div className="mt-2 grid gap-2">
                                  {editing.versions.map((v: any) => (
                                    <div key={v.id || v.createdAt} className="flex items-center justify-between rounded-lg border border-border p-2">
                                      <div className="text-xs text-muted-foreground">
                                        {new Date(v.createdAt).toLocaleString()}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => setSelectedVersion(v)}
                                          className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                                        >
                                          {isTR ? 'Diff' : 'Diff'}
                                        </button>
                                        <button
                                          onClick={() => restoreVersion(v.id)}
                                          className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                                        >
                                          {isTR ? 'Geri al' : 'Restore'}
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {selectedVersion && (
                              <div className="rounded-xl border border-border p-4">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-semibold">{isTR ? 'Diff görünümü' : 'Diff view'}</div>
                                  <button
                                    onClick={() => setSelectedVersion(null)}
                                    className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                                  >
                                    {isTR ? 'Kapat' : 'Close'}
                                  </button>
                                </div>
                                <div className="mt-3 grid gap-3">
                                  <div>
                                    <div className="text-xs text-muted-foreground">{isTR ? 'Markdown (TR)' : 'Markdown (TR)'}</div>
                                    <div className="mt-2 rounded-lg border border-border bg-muted/40 p-2 font-mono text-xs">
                                      {diffLines(selectedVersion.snapshot?.contentMarkdown?.tr || '', editForm.markdownTr).map((l, i) => (
                                        <div
                                          key={i}
                                          className={
                                            l.type === 'add'
                                              ? 'text-emerald-600'
                                              : l.type === 'remove'
                                                ? 'text-red-600'
                                                : l.type === 'change'
                                                  ? 'text-amber-600'
                                                  : 'text-muted-foreground'
                                          }
                                        >
                                          {l.type === 'add' ? '+ ' : l.type === 'remove' ? '- ' : l.type === 'change' ? '~ ' : '  '}
                                          {l.value}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">{isTR ? 'Markdown (EN)' : 'Markdown (EN)'}</div>
                                    <div className="mt-2 rounded-lg border border-border bg-muted/40 p-2 font-mono text-xs">
                                      {diffLines(selectedVersion.snapshot?.contentMarkdown?.en || '', editForm.markdownEn).map((l, i) => (
                                        <div
                                          key={i}
                                          className={
                                            l.type === 'add'
                                              ? 'text-emerald-600'
                                              : l.type === 'remove'
                                                ? 'text-red-600'
                                                : l.type === 'change'
                                                  ? 'text-amber-600'
                                                  : 'text-muted-foreground'
                                          }
                                        >
                                          {l.type === 'add' ? '+ ' : l.type === 'remove' ? '- ' : l.type === 'change' ? '~ ' : '  '}
                                          {l.value}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                onClick={saveEdit}
                                className="rounded-full border border-foreground bg-foreground px-4 py-2 text-sm text-background"
                              >
                                {isTR ? 'Kaydet' : 'Save'}
                              </button>
                              <button
                                onClick={() => setEditing(null)}
                                className="rounded-full border border-border bg-background px-4 py-2 text-sm"
                              >
                                {isTR ? 'İptal' : 'Cancel'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                     </div>
                   </div>
                 )}
 
                 {tab === 'submissions' && (
                   <div className="rounded-2xl border border-border p-6">
                     <h3 className="text-lg font-semibold">{isTR ? 'Başvurular' : 'Submissions'}</h3>
                    <div className="mt-3 flex items-center gap-3">
                      <select
                        value={subsType}
                        onChange={(e) => setSubsType(e.target.value as any)}
                        className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                      >
                        <option value="all">{isTR ? 'Hepsi' : 'All'}</option>
                        <option value="contact">{isTR ? 'İletişim' : 'Contact'}</option>
                        <option value="career">{isTR ? 'Kariyer' : 'Career'}</option>
                      </select>
                      <button
                        onClick={exportSubsCsv}
                        className="rounded-full border border-border bg-background px-3 py-1 text-sm"
                      >
                        {isTR ? 'CSV indir' : 'Download CSV'}
                      </button>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {subs
                        .filter((s) => (subsType === 'all' ? true : s.type === subsType))
                        .map((s, i) => (
                         <div key={i} className="rounded-lg border border-border p-3">
                           <div className="text-sm">
                             {s.type} · {s.name} · {s.email}
                           </div>
                           <div className="text-xs text-muted-foreground">{s.message}</div>
                         </div>
                      ))}
                     </div>
                   </div>
                 )}
 
                {tab === 'careers' && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-border p-6">
                      <h3 className="text-lg font-semibold">{isTR ? 'Yeni pozisyon' : 'New job'}</h3>
                      <div className="mt-4 grid gap-3">
                        <input
                          value={jobForm.id}
                          onChange={(e) => setJobForm((f) => ({ ...f, id: e.target.value }))}
                          placeholder="id"
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                        <input
                          value={jobForm.titleTr}
                          onChange={(e) => setJobForm((f) => ({ ...f, titleTr: e.target.value }))}
                          placeholder="başlık tr"
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                        <input
                          value={jobForm.titleEn}
                          onChange={(e) => setJobForm((f) => ({ ...f, titleEn: e.target.value }))}
                          placeholder="title en"
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={jobForm.location}
                            onChange={(e) => setJobForm((f) => ({ ...f, location: e.target.value }))}
                            placeholder="location"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <input
                            value={jobForm.type}
                            onChange={(e) => setJobForm((f) => ({ ...f, type: e.target.value }))}
                            placeholder="type"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <textarea
                          value={jobForm.descTr}
                          onChange={(e) => setJobForm((f) => ({ ...f, descTr: e.target.value }))}
                          placeholder="açıklama tr"
                          rows={4}
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                        <textarea
                          value={jobForm.descEn}
                          onChange={(e) => setJobForm((f) => ({ ...f, descEn: e.target.value }))}
                          placeholder="description en"
                          rows={4}
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                        <select
                          value={jobForm.status}
                          onChange={(e) => setJobForm((f) => ({ ...f, status: e.target.value }))}
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        >
                          <option value="open">{isTR ? 'Açık' : 'Open'}</option>
                          <option value="closed">{isTR ? 'Kapalı' : 'Closed'}</option>
                        </select>
                        <button
                          onClick={createJob}
                          className="mt-2 rounded-full border border-foreground bg-foreground px-4 py-2 text-sm text-background"
                        >
                          {isTR ? 'Oluştur' : 'Create'}
                        </button>
                      </div>
                    </div>
 
                    <div className="rounded-2xl border border-border p-6">
                      <h3 className="text-lg font-semibold">{isTR ? 'Pozisyonlar' : 'Jobs'}</h3>
                      <div className="mt-4 grid gap-3">
                        {jobs.map((j: any) => (
                          <div key={j.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                            <div>
                              <div className="text-sm font-medium">{j.title?.[language]}</div>
                              <div className="text-xs text-muted-foreground">
                                {j.type} · {j.location} · {j.status === 'closed' ? (isTR ? 'Kapalı' : 'Closed') : (isTR ? 'Açık' : 'Open')}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleJobStatus(j.id, j.status === 'closed' ? 'open' : 'closed')}
                                className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                              >
                                {j.status === 'closed' ? (isTR ? 'Aç' : 'Open') : (isTR ? 'Kapat' : 'Close')}
                              </button>
                              <button
                                onClick={() => deleteJob(j.id)}
                                className="rounded-full border border-red-500 px-3 py-1 text-xs text-red-600"
                              >
                                {isTR ? 'Sil' : 'Delete'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
               </>
             )}
           </div>
         </section>
       </main>
       <Footer />
     </>
   )
 }
