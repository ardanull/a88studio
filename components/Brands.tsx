'use client'
 
 import { motion } from 'framer-motion'
 import { useLanguage } from '@/components/LanguageContext'
 import { useMemo, useState } from 'react'
 
 type Brand = {
   name: string
   logo: string
   sector: 'Technology' | 'E-commerce' | 'Fintech' | 'Media'
   metrics: { label: { en: string; tr: string }; value: string }[]
 }
 
 const allBrands: Brand[] = [
   {
     name: 'Google',
     logo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
     sector: 'Technology',
     metrics: [
       { label: { en: 'Projects', tr: 'Projeler' }, value: '12' },
       { label: { en: 'Avg. ROI', tr: 'Ort. ROI' }, value: '180%' },
     ],
   },
   {
     name: 'Microsoft',
     logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg',
     sector: 'Technology',
     metrics: [
       { label: { en: 'Projects', tr: 'Projeler' }, value: '8' },
       { label: { en: 'Avg. ROI', tr: 'Ort. ROI' }, value: '160%' },
     ],
   },
   {
     name: 'Amazon',
     logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg',
     sector: 'E-commerce',
     metrics: [
       { label: { en: 'Projects', tr: 'Projeler' }, value: '10' },
       { label: { en: 'Avg. ROI', tr: 'Ort. ROI' }, value: '220%' },
     ],
   },
   {
     name: 'Stripe',
     logo: 'https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg',
     sector: 'Fintech',
     metrics: [
       { label: { en: 'Projects', tr: 'Projeler' }, value: '6' },
       { label: { en: 'Avg. ROI', tr: 'Ort. ROI' }, value: '200%' },
     ],
   },
   {
     name: 'Shopify',
     logo: 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg',
     sector: 'E-commerce',
     metrics: [
       { label: { en: 'Projects', tr: 'Projeler' }, value: '9' },
       { label: { en: 'Avg. ROI', tr: 'Ort. ROI' }, value: '190%' },
     ],
   },
   {
     name: 'Netflix',
     logo: 'https://www.vectorlogo.zone/logos/netflix/netflix-icon.svg',
     sector: 'Media',
     metrics: [
       { label: { en: 'Projects', tr: 'Projeler' }, value: '5' },
       { label: { en: 'Avg. ROI', tr: 'Ort. ROI' }, value: '170%' },
     ],
   },
 ]
 
 const sectors = ['All', 'Technology', 'E-commerce', 'Fintech', 'Media'] as const
 
 export default function Brands() {
   const { language } = useLanguage()
   const isTR = language === 'tr'
   const [activeSector, setActiveSector] = useState<typeof sectors[number]>('All')
 
   const filtered = useMemo(() => {
     if (activeSector === 'All') return allBrands
     return allBrands.filter((b) => b.sector === activeSector)
   }, [activeSector])
 
   const summary = useMemo(() => {
     const totalProjects = filtered
       .map((b) => Number(b.metrics.find((m) => m.label.en === 'Projects')?.value || 0))
       .reduce((a, b) => a + b, 0)
     const avgRoiNumbers = filtered
       .map((b) => Number((b.metrics.find((m) => m.label.en === 'Avg. ROI')?.value || '0').replace('%', '')))
     const avgRoi =
       avgRoiNumbers.length > 0
         ? `${Math.round(avgRoiNumbers.reduce((a, b) => a + b, 0) / avgRoiNumbers.length)}%`
         : '—'
     return { totalProjects, avgRoi }
   }, [filtered])
 
   return (
     <section className="section-padding border-y border-border/60 bg-muted/20">
       <div className="container-custom">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.4 }}
           transition={{ duration: 0.7, ease: 'easeOut' }}
           className="text-center"
         >
           <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
             {isTR ? 'Güvenilen markalar tarafından' : 'Trusted by leading brands'}
           </p>
         </motion.div>
 
         <div className="mt-8 flex flex-wrap justify-center gap-2">
           {sectors.map((s) => (
             <button
               key={s}
               onClick={() => setActiveSector(s)}
               className={`rounded-full px-3 py-1 text-sm ${
                 activeSector === s ? 'bg-primary/10 text-primary' : 'border border-border bg-background'
               }`}
             >
               {isTR
                 ? s === 'All'
                   ? 'Tümü'
                   : s === 'Technology'
                   ? 'Teknoloji'
                   : s === 'E-commerce'
                   ? 'E-ticaret'
                   : s === 'Fintech'
                   ? 'Fintek'
                   : 'Medya'
                 : s}
             </button>
           ))}
         </div>
 
         <div className="relative mt-8">
           <div className="flex flex-wrap justify-center gap-12">
             {filtered.map((brand, index) => (
               <motion.div
                 key={`${brand.name}-${index}`}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.05 }}
                 className="flex-shrink-0 text-center"
               >
                 <img
                   src={brand.logo}
                   alt={brand.name}
                   className="mx-auto h-12 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                 />
                 <div className="mt-3 text-xs text-muted-foreground">{brand.sector}</div>
               </motion.div>
             ))}
           </div>
         </div>
 
         <div className="mt-10 grid gap-6 sm:grid-cols-2">
           <div className="rounded-2xl border border-border p-6 text-center">
             <div className="text-3xl font-bold md:text-4xl">{summary.totalProjects}</div>
             <div className="mt-1 text-sm text-muted-foreground">
               {isTR ? 'Toplam proje' : 'Total projects'}
             </div>
           </div>
           <div className="rounded-2xl border border-border p-6 text-center">
             <div className="text-3xl font-bold md:text-4xl">{summary.avgRoi}</div>
             <div className="mt-1 text-sm text-muted-foreground">
               {isTR ? 'Ortalama ROI' : 'Average ROI'}
             </div>
           </div>
         </div>
       </div>
     </section>
   )
 }
