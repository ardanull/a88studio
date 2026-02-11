 'use client'
 
 import Navigation from '@/components/Navigation'
 import Footer from '@/components/Footer'
 import ScrollProgress from '@/components/ScrollProgress'
 import { useLanguage } from '@/components/LanguageContext'
 
 export default function CookiePage() {
   const { language } = useLanguage()
   const isTR = language === 'tr'
 
   const sections = isTR
     ? [
         { title: 'Çerez Politikası', content: 'Site deneyimini geliştirmek ve analitik toplamak için çerezler kullanıyoruz.' },
         { title: 'Çerez Türleri', content: 'Zorunlu çerezler, performans çerezleri ve tercihler için çerezler.' },
         { title: 'Yönetim', content: 'Tarayıcı ayarlarından çerezleri kontrol edebilir veya silebilirsiniz.' },
         { title: 'Rıza', content: 'Analitik ve pazarlama çerezleri için açık rıza talep edilir.' },
         { title: 'Detaylar', content: 'Kullanılan çerezlerin listesi ve amaçları talep üzerine sağlanır.' },
       ]
     : [
         { title: 'Cookie Policy', content: 'We use cookies to improve site experience and collect analytics.' },
         { title: 'Types of Cookies', content: 'Essential, performance, and preference cookies.' },
         { title: 'Control', content: 'You may manage or delete cookies via your browser settings.' },
         { title: 'Consent', content: 'Explicit consent is requested for analytics and marketing cookies.' },
         { title: 'Details', content: 'A list of cookies and purposes is available upon request.' },
       ]
 
   return (
     <>
       <ScrollProgress />
       <Navigation />
       <main>
         <section className="section-padding">
           <div className="container-custom">
             <header className="mb-12 md:mb-16">
               <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                 {isTR ? 'Yasal' : 'Legal'}
               </p>
               <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                 {isTR ? 'Çerez Politikası' : 'Cookie Policy'}
               </h1>
               <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                 {isTR ? 'Çerez tercihlerinizi saygıyla yönetiyoruz.' : 'We respect your cookie preferences.'}
               </p>
             </header>
 
             <div className="space-y-8">
               {sections.map((s) => (
                 <section key={s.title} className="border-b border-border pb-8">
                   <h2 className="text-xl font-semibold">{s.title}</h2>
                   <p className="mt-3 text-muted-foreground">{s.content}</p>
                 </section>
               ))}
             </div>
           </div>
         </section>
       </main>
       <Footer />
     </>
   )
 }
