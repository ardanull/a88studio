 'use client'
 
 import Navigation from '@/components/Navigation'
 import Footer from '@/components/Footer'
 import ScrollProgress from '@/components/ScrollProgress'
 import { useLanguage } from '@/components/LanguageContext'
 
 export default function TermsPage() {
   const { language } = useLanguage()
   const isTR = language === 'tr'
 
   const sections = isTR
     ? [
         { title: 'Hizmet Şartları', content: 'Web sitemizi ve hizmetlerimizi kullanarak bu şartları kabul etmiş olursunuz.' },
         { title: 'Fikri Mülkiyet', content: 'Tüm içerik ve görseller a88studio’ya aittir veya lisanslıdır.' },
         { title: 'Sorumluluk', content: 'Hizmetler “olduğu gibi” sunulur; dolaylı garanti verilmez.' },
         { title: 'Kullanıcı Yükümlülükleri', content: 'Doğru bilgi vermek ve yürürlükteki yasa ve düzenlemelere uymakla yükümlüsünüz.' },
         { title: 'Değişiklikler', content: 'Şartlar zaman zaman güncellenebilir. Güncel sürüm sitede yayınlanır.' },
         { title: 'İletişim', content: 'Sorularınız için hello@a88studio.com adresinden bize ulaşın.' },
       ]
     : [
         { title: 'Terms of Service', content: 'By using our website and services, you agree to these terms.' },
         { title: 'Intellectual Property', content: 'All content and visuals are owned or licensed by a88studio.' },
         { title: 'Liability', content: 'Services are provided “as is”; no implied warranties are offered.' },
         { title: 'User Obligations', content: 'You must provide accurate information and comply with applicable laws.' },
         { title: 'Changes', content: 'Terms may be updated periodically. The latest version will be posted.' },
         { title: 'Contact', content: 'For questions, reach us at hello@a88studio.com.' },
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
                 {isTR ? 'Hizmet Şartları' : 'Terms of Service'}
               </h1>
               <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                 {isTR ? 'Şeffaf ve adil kullanım şartları.' : 'Transparent and fair terms of use.'}
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
