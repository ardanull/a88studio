 'use client'
 
 import Navigation from '@/components/Navigation'
 import Footer from '@/components/Footer'
 import ScrollProgress from '@/components/ScrollProgress'
 import { useLanguage } from '@/components/LanguageContext'
 import { useParams } from 'next/navigation'
 import { getProject } from '@/lib/work'
 
 export default function WorkDetailPage() {
   const { slug } = useParams<{ slug: string }>()
   const { language } = useLanguage()
   const isTR = language === 'tr'
   const project = getProject(slug)
 
   if (!project) {
     return (
       <>
         <ScrollProgress />
         <Navigation />
         <main>
           <section className="section-padding">
             <div className="container-custom">
               <h1 className="text-2xl font-semibold">{isTR ? 'Proje bulunamadı' : 'Project not found'}</h1>
             </div>
           </section>
         </main>
         <Footer />
       </>
     )
   }
 
   return (
     <>
       <ScrollProgress />
       <Navigation />
       <main>
         <section className="section-padding">
           <div className="container-custom">
             <div className="mb-8">
               <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                 {project.category}
               </p>
               <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">{project.title}</h1>
               <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                 {project.description[language]}
               </p>
             </div>
 
             <div className="rounded-3xl overflow-hidden border border-border">
               <img src={project.image} alt={project.title} className="w-full aspect-[16/9] object-cover" />
             </div>
 
             <div className="mt-10 grid gap-6 md:grid-cols-3">
               {project.metrics.map((m) => (
                 <div key={m.value} className="rounded-2xl border border-border p-6">
                   <div className="text-3xl font-bold md:text-4xl">{m.value}</div>
                   <div className="mt-1 text-sm text-muted-foreground">{m.label[language]}</div>
                 </div>
               ))}
             </div>
 
             <div className="mt-12 space-y-8">
               {project.process.map((step) => (
                 <section key={step.title.en} className="rounded-2xl border border-border p-6">
                   <h2 className="text-xl font-semibold">{step.title[language]}</h2>
                   <p className="mt-3 text-muted-foreground">{step.content[language]}</p>
                 </section>
               ))}
             </div>
 
             <div className="mt-12 rounded-2xl border border-border p-6">
               <h2 className="text-xl font-semibold">{isTR ? 'Sonuç' : 'Outcome'}</h2>
               <p className="mt-3 text-muted-foreground">{project.result[language]}</p>
             </div>
           </div>
         </section>
       </main>
       <Footer />
     </>
   )
 }
