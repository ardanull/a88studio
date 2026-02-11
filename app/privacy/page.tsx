 'use client'
 
 import Navigation from '@/components/Navigation'
 import Footer from '@/components/Footer'
 import ScrollProgress from '@/components/ScrollProgress'
 import { useLanguage } from '@/components/LanguageContext'
 
 export default function PrivacyPage() {
   const { language } = useLanguage()
   const isTR = language === 'tr'
 
   const sections = isTR
     ? [
         { title: 'Gizlilik Politikası', content: 'Verilerinizi yalnızca hizmetlerimizi sağlamak, iyileştirmek ve taleplerinizi yanıtlamak için işleriz.' },
         { title: 'Toplanan Veriler', content: 'İsim, e-posta, şirket ve mesaj içerikleri; analitik amaçlı anonim kullanım verileri.' },
         { title: 'Kullanım Amaçları', content: 'İletişim, proje değerlendirme, müşteri desteği ve yasal yükümlülüklerin yerine getirilmesi.' },
         { title: 'Üçüncü Taraflar', content: 'Analitik ve e-posta sağlayıcıları gibi güvenilir hizmetlerle sınırlı paylaşım.' },
         { title: 'Saklama Süresi', content: 'Yasal gereklilikler ve operasyonel ihtiyaçlar doğrultusunda makul sürelerde saklanır.' },
         { title: 'Haklarınız', content: 'Erişim, düzeltme, silme ve işlemeye itiraz etme haklarına sahipsiniz.' },
         { title: 'İletişim', content: 'Gizlilikle ilgili sorular için hello@a88studio.com adresinden bize ulaşın.' },
       ]
     : [
         { title: 'Privacy Policy', content: 'We process your data only to deliver and improve our services and to respond to your requests.' },
         { title: 'Data Collected', content: 'Name, email, company, message content; anonymized usage analytics.' },
         { title: 'Purpose of Use', content: 'Communication, project evaluation, customer support, and legal compliance.' },
         { title: 'Third Parties', content: 'Limited sharing with trusted providers like analytics and email services.' },
         { title: 'Retention', content: 'Stored for reasonable periods aligned with legal and operational requirements.' },
         { title: 'Your Rights', content: 'You may access, rectify, delete, and object to processing of your data.' },
         { title: 'Contact', content: 'For privacy questions, reach us at hello@a88studio.com.' },
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
                 {isTR ? 'Gizlilik Politikası' : 'Privacy Policy'}
               </h1>
               <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                 {isTR ? 'Verilerinizi sorumlu şekilde işliyoruz.' : 'We handle your data responsibly.'}
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
