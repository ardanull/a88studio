 'use client'
 
 import { useState, useMemo, useRef } from 'react'
 import Navigation from '@/components/Navigation'
 import Footer from '@/components/Footer'
 import ScrollProgress from '@/components/ScrollProgress'
 import { useLanguage } from '@/components/LanguageContext'
 
 type StepKey =
   | 'projectType'
   | 'scope'
   | 'timeline'
   | 'budget'
   | 'features'
   | 'contact'
 
 const projectTypes = [
   { key: 'marketing', label: { en: 'Marketing site', tr: 'Pazarlama sitesi' } },
   { key: 'webapp', label: { en: 'Web application', tr: 'Web uygulaması' } },
   { key: 'mobile', label: { en: 'Mobile app', tr: 'Mobil uygulama' } },
 ] as const
 
 const scopes = [
   { key: 'brand', label: { en: 'Brand & identity', tr: 'Marka ve kimlik' } },
   { key: 'design', label: { en: 'Product design', tr: 'Ürün tasarımı' } },
   { key: 'dev', label: { en: 'Development', tr: 'Geliştirme' } },
   { key: 'growth', label: { en: 'Growth & marketing', tr: 'Büyüme ve pazarlama' } },
 ] as const
 
 const timelines = [
   { key: '2-4w', label: { en: '2–4 weeks', tr: '2–4 hafta' } },
   { key: '4-8w', label: { en: '4–8 weeks', tr: '4–8 hafta' } },
   { key: '8-12w', label: { en: '8–12 weeks', tr: '8–12 hafta' } },
 ] as const
 
 const budgets = [
   { key: '10-25k', label: { en: '$10k–$25k', tr: '$10k–$25k' } },
   { key: '25-50k', label: { en: '$25k–$50k', tr: '$25k–$50k' } },
   { key: '50-100k', label: { en: '$50k–$100k', tr: '$50k–$100k' } },
 ] as const
 
 const featureOptions = [
   { key: 'cms', label: { en: 'CMS integration', tr: 'CMS entegrasyonu' } },
   { key: 'auth', label: { en: 'Authentication', tr: 'Kimlik doğrulama' } },
   { key: 'payments', label: { en: 'Payments', tr: 'Ödemeler' } },
   { key: 'analytics', label: { en: 'Analytics', tr: 'Analitik' } },
   { key: 'seo', label: { en: 'Advanced SEO', tr: 'Gelişmiş SEO' } },
 ] as const
 
 export default function QuotePage() {
   const { language } = useLanguage()
   const isTR = language === 'tr'
 
   const [step, setStep] = useState<StepKey>('projectType')
   const [data, setData] = useState({
     projectType: '',
     scope: [] as string[],
     timeline: '',
     budget: '',
     features: [] as string[],
     name: '',
     email: '',
     notes: '',
   })
 
   const summaryRef = useRef<HTMLDivElement | null>(null)
 
   const canNext = useMemo(() => {
     switch (step) {
       case 'projectType':
         return !!data.projectType
       case 'scope':
         return data.scope.length > 0
       case 'timeline':
         return !!data.timeline
       case 'budget':
         return !!data.budget
       case 'features':
         return data.features.length > 0
       case 'contact':
         return !!data.name && !!data.email
       default:
         return false
     }
   }, [step, data])
 
   const next = () => {
     const order: StepKey[] = ['projectType', 'scope', 'timeline', 'budget', 'features', 'contact']
     const idx = order.indexOf(step)
     if (idx < order.length - 1) setStep(order[idx + 1])
   }
 
   const prev = () => {
     const order: StepKey[] = ['projectType', 'scope', 'timeline', 'budget', 'features', 'contact']
     const idx = order.indexOf(step)
     if (idx > 0) setStep(order[idx - 1])
   }
 
   const toggleList = (k: keyof typeof data, v: string) => {
     setData((d) => {
       const arr = new Set<string>(d[k] as string[])
       if (arr.has(v)) arr.delete(v)
       else arr.add(v)
       return { ...d, [k]: Array.from(arr) }
     })
   }
 
   const printPDF = () => {
     window.print()
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
                 {isTR ? 'Teklif' : 'Quote'}
               </p>
               <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                 {isTR ? 'Çok adımlı teklif sihirbazı' : 'Multi-step quote wizard'}
               </h1>
               <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                 {isTR
                   ? 'Projeniz için kapsam, zaman ve bütçeyi belirleyin; özetinizi PDF olarak indirin.'
                   : 'Define scope, timeline, and budget for your project; download a PDF summary.'}
               </p>
             </header>
 
             <div className="grid gap-8 lg:grid-cols-3">
               <div className="rounded-2xl border border-border p-6 lg:col-span-2">
                 {step === 'projectType' && (
                   <div className="space-y-4">
                     <h3 className="text-lg font-semibold">{isTR ? 'Proje türü' : 'Project type'}</h3>
                     <div className="flex flex-wrap gap-3">
                       {projectTypes.map((pt) => (
                         <button
                           key={pt.key}
                           onClick={() => setData((d) => ({ ...d, projectType: pt.key }))}
                           className={`rounded-full px-4 py-2 text-sm ${
                             data.projectType === pt.key
                               ? 'bg-primary/10 text-primary'
                               : 'border border-border bg-background'
                           }`}
                         >
                           {pt.label[language]}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
 
                 {step === 'scope' && (
                   <div className="space-y-4">
                     <h3 className="text-lg font-semibold">{isTR ? 'Kapsam' : 'Scope'}</h3>
                     <div className="flex flex-wrap gap-3">
                       {scopes.map((s) => (
                         <button
                           key={s.key}
                           onClick={() => toggleList('scope', s.key)}
                           className={`rounded-full px-4 py-2 text-sm ${
                             data.scope.includes(s.key)
                               ? 'bg-primary/10 text-primary'
                               : 'border border-border bg-background'
                           }`}
                         >
                           {s.label[language]}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
 
                 {step === 'timeline' && (
                   <div className="space-y-4">
                     <h3 className="text-lg font-semibold">{isTR ? 'Zaman' : 'Timeline'}</h3>
                     <div className="flex flex-wrap gap-3">
                       {timelines.map((t) => (
                         <button
                           key={t.key}
                           onClick={() => setData((d) => ({ ...d, timeline: t.key }))}
                           className={`rounded-full px-4 py-2 text-sm ${
                             data.timeline === t.key
                               ? 'bg-primary/10 text-primary'
                               : 'border border-border bg-background'
                           }`}
                         >
                           {t.label[language]}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
 
                 {step === 'budget' && (
                   <div className="space-y-4">
                     <h3 className="text-lg font-semibold">{isTR ? 'Bütçe aralığı' : 'Budget range'}</h3>
                     <div className="flex flex-wrap gap-3">
                       {budgets.map((b) => (
                         <button
                           key={b.key}
                           onClick={() => setData((d) => ({ ...d, budget: b.key }))}
                           className={`rounded-full px-4 py-2 text-sm ${
                             data.budget === b.key
                               ? 'bg-primary/10 text-primary'
                               : 'border border-border bg-background'
                           }`}
                         >
                           {b.label[language]}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
 
                 {step === 'features' && (
                   <div className="space-y-4">
                     <h3 className="text-lg font-semibold">{isTR ? 'Özellikler' : 'Features'}</h3>
                     <div className="flex flex-wrap gap-3">
                       {featureOptions.map((f) => (
                         <button
                           key={f.key}
                           onClick={() => toggleList('features', f.key)}
                           className={`rounded-full px-4 py-2 text-sm ${
                             data.features.includes(f.key)
                               ? 'bg-primary/10 text-primary'
                               : 'border border-border bg-background'
                           }`}
                         >
                           {f.label[language]}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
 
                 {step === 'contact' && (
                   <div className="space-y-4">
                     <h3 className="text-lg font-semibold">{isTR ? 'İletişim' : 'Contact'}</h3>
                     <div className="grid gap-4 sm:grid-cols-2">
                       <input
                         value={data.name}
                         onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                         placeholder={isTR ? 'Ad Soyad' : 'Full Name'}
                         className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                       />
                       <input
                         value={data.email}
                         onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                         placeholder="Email"
                         type="email"
                         className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                       />
                     </div>
                     <textarea
                       value={data.notes}
                       onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))}
                       placeholder={isTR ? 'Ek notlar' : 'Additional notes'}
                       rows={5}
                       className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                     />
                   </div>
                 )}
 
                 <div className="mt-8 flex items-center gap-3">
                   <button
                     onClick={prev}
                     className="rounded-full border border-border bg-background px-4 py-2 text-sm disabled:opacity-60"
                     disabled={step === 'projectType'}
                   >
                     {isTR ? 'Geri' : 'Back'}
                   </button>
                   <button
                     onClick={next}
                     className={`rounded-full px-4 py-2 text-sm ${
                       canNext
                         ? 'border border-foreground bg-foreground text-background'
                         : 'border border-border bg-background text-muted-foreground'
                     }`}
                     disabled={!canNext || step === 'contact'}
                   >
                     {isTR ? 'İleri' : 'Next'}
                   </button>
                 </div>
               </div>
 
               <div className="rounded-2xl border border-border p-6">
                 <div ref={summaryRef}>
                   <h3 className="text-lg font-semibold">{isTR ? 'Özet' : 'Summary'}</h3>
                   <div className="mt-4 space-y-3 text-sm">
                     <div>
                       <div className="font-medium">{isTR ? 'Proje türü' : 'Project type'}</div>
                       <div className="text-muted-foreground">
                         {projectTypes.find((p) => p.key === data.projectType)?.label[language] || '—'}
                       </div>
                     </div>
                     <div>
                       <div className="font-medium">{isTR ? 'Kapsam' : 'Scope'}</div>
                       <div className="text-muted-foreground">
                         {data.scope.length
                           ? data.scope
                               .map((k) => scopes.find((s) => s.key === k)?.label[language])
                               .filter(Boolean)
                               .join(', ')
                           : '—'}
                       </div>
                     </div>
                     <div>
                       <div className="font-medium">{isTR ? 'Zaman' : 'Timeline'}</div>
                       <div className="text-muted-foreground">
                         {timelines.find((t) => t.key === data.timeline)?.label[language] || '—'}
                       </div>
                     </div>
                     <div>
                       <div className="font-medium">{isTR ? 'Bütçe' : 'Budget'}</div>
                       <div className="text-muted-foreground">
                         {budgets.find((b) => b.key === data.budget)?.label[language] || '—'}
                       </div>
                     </div>
                     <div>
                       <div className="font-medium">{isTR ? 'Özellikler' : 'Features'}</div>
                       <div className="text-muted-foreground">
                         {data.features.length
                           ? data.features
                               .map((k) => featureOptions.find((f) => f.key === k)?.label[language])
                               .filter(Boolean)
                               .join(', ')
                           : '—'}
                       </div>
                     </div>
                     <div>
                       <div className="font-medium">{isTR ? 'İletişim' : 'Contact'}</div>
                       <div className="text-muted-foreground">
                         {data.name || '—'} {data.email ? `· ${data.email}` : ''}
                       </div>
                     </div>
                     <div>
                       <div className="font-medium">{isTR ? 'Notlar' : 'Notes'}</div>
                       <div className="text-muted-foreground">{data.notes || '—'}</div>
                     </div>
                   </div>
                 </div>
                 <button
                   onClick={printPDF}
                   className="mt-6 w-full rounded-full border border-border bg-background px-4 py-2 text-sm"
                 >
                   {isTR ? 'PDF indir' : 'Download PDF'}
                 </button>
               </div>
             </div>
           </div>
         </section>
       </main>
       <Footer />
     </>
   )
 }
