'use client'
 
 import { useEffect, useState } from 'react'
 import Navigation from '@/components/Navigation'
 import Footer from '@/components/Footer'
 import ScrollProgress from '@/components/ScrollProgress'
 import { useLanguage } from '@/components/LanguageContext'
 import { useToast } from '@/components/ToastProvider'
 
type Job = {
   id: string
   title: { en: string; tr: string }
   location: string
   type: string
   description: { en: string; tr: string }
 }
 
 export default function CareersPage() {
   const { language } = useLanguage()
   const isTR = language === 'tr'
   const { showToast } = useToast()
 
   const [jobs, setJobs] = useState<Job[]>([])
   useEffect(() => {
     fetch('/api/jobs')
       .then((r) => r.json())
       .then((d) => setJobs(d))
       .catch(() => setJobs([]))
   }, [])
 
   const [form, setForm] = useState({
     name: '',
     email: '',
     role: '',
     cvUrl: '',
     message: '',
   })
   const [loading, setLoading] = useState(false)
 
   const submit = async () => {
     if (!form.name || !form.email || !form.role || !form.message) {
       showToast('error', isTR ? 'Zorunlu alanlar eksik' : 'Missing required fields')
       return
     }
     try {
       setLoading(true)
       const res = await fetch('/api/careers', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(form),
       })
       const data = await res.json()
       if (res.ok) {
         showToast('success', isTR ? 'Başvuru gönderildi' : 'Application submitted')
         setForm({ name: '', email: '', role: '', cvUrl: '', message: '' })
       } else {
         showToast('error', data.error || (isTR ? 'Hata oluştu' : 'An error occurred'))
       }
     } catch {
       showToast('error', isTR ? 'Sunucu hatası' : 'Server error')
     } finally {
       setLoading(false)
     }
   }
 
   return (
     <>
       <ScrollProgress />
       <Navigation />
       <main>
         <section className="section-padding">
           <div className="container-custom">
             <header className="mb-12 md:mb-16">
               <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                 {isTR ? 'Kariyerler' : 'Careers'}
               </p>
               <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                 {isTR ? 'Ekibe katılın' : 'Join the team'}
               </h1>
               <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                 {isTR
                   ? 'Ürün tasarımı ve modern web geliştirme konusunda tutkulu yetenekler arıyoruz.'
                   : 'We’re looking for talented people passionate about product design and modern web development.'}
               </p>
             </header>
 
             <div className="grid gap-10 lg:grid-cols-2">
               <div className="space-y-6">
                {jobs.length === 0 && (
                  <div className="rounded-2xl border border-border p-6 text-center text-muted-foreground">
                    {isTR ? 'Şu an açık pozisyon bulunmuyor.' : 'No open positions at the moment.'}
                  </div>
                )}
                {jobs.map((job) => (
                   <div key={job.id} className="rounded-2xl border border-border p-6">
                     <div className="flex items-center justify-between">
                       <h3 className="text-xl font-semibold">{job.title[language]}</h3>
                       <span className="text-xs rounded-full border border-border px-3 py-1 text-muted-foreground">
                         {job.type} · {job.location}
                       </span>
                     </div>
                     <p className="mt-3 text-muted-foreground">{job.description[language]}</p>
                   </div>
                 ))}
               </div>
 
               <div className="rounded-2xl border border-border p-6">
                 <h3 className="text-lg font-semibold">{isTR ? 'Başvuru Formu' : 'Application Form'}</h3>
                 <div className="mt-4 space-y-4">
                   <input
                     value={form.name}
                     onChange={(e) => setForm({ ...form, name: e.target.value })}
                     placeholder={isTR ? 'Ad Soyad' : 'Full Name'}
                     className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                   />
                   <input
                     value={form.email}
                     onChange={(e) => setForm({ ...form, email: e.target.value })}
                     placeholder="Email"
                     type="email"
                     className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                   />
                   <select
                     value={form.role}
                     onChange={(e) => setForm({ ...form, role: e.target.value })}
                     className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                   >
                     <option value="">{isTR ? 'Pozisyon seçin' : 'Select a role'}</option>
                     {jobs.map((j) => (
                       <option key={j.id} value={j.id}>
                         {j.title[language]}
                       </option>
                     ))}
                   </select>
                   <input
                     value={form.cvUrl}
                     onChange={(e) => setForm({ ...form, cvUrl: e.target.value })}
                     placeholder={isTR ? 'CV bağlantısı (opsiyonel)' : 'CV link (optional)'}
                     className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                   />
                   <textarea
                     value={form.message}
                     onChange={(e) => setForm({ ...form, message: e.target.value })}
                     placeholder={isTR ? 'Mesajınız' : 'Your message'}
                     rows={5}
                     className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                   />
                   <button
                     onClick={submit}
                     disabled={loading}
                     className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5 disabled:opacity-60"
                   >
                     {loading ? (isTR ? 'Gönderiliyor...' : 'Submitting...') : isTR ? 'Başvuruyu gönder' : 'Submit application'}
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </section>
       </main>
       <Footer />
     </>
   )
 }
