 export interface Project {
   slug: string
   title: string
   category: string
   description: { en: string; tr: string }
   image: string
   tags: string[]
   metrics: Array<{ label: { en: string; tr: string }; value: string }>
   color: string
   process: Array<{ title: { en: string; tr: string }; content: { en: string; tr: string } }>
   result: { en: string; tr: string }
 }
 
 export const projects: Project[] = [
   {
     slug: 'techvision-platform',
     title: 'TechVision Platform',
     category: 'E-commerce',
     description: {
       en: 'Complete redesign and development of an enterprise e-commerce platform',
       tr: 'Kurumsal e-ticaret platformunun tam yeniden tasarımı ve geliştirilmesi',
     },
     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
     tags: ['Next.js', 'TypeScript', 'Stripe'],
     metrics: [
       { label: { en: 'Revenue increase', tr: 'Gelir artışı' }, value: '+250%' },
       { label: { en: 'Load time', tr: 'Yükleme süresi' }, value: '0.8s' },
     ],
     color: 'from-blue-500/20 to-purple-500/20',
     process: [
       {
         title: { en: 'Discovery', tr: 'Keşif' },
         content: {
           en: 'Stakeholder interviews, analytics audit, checkout funnel analysis.',
           tr: 'Paydaş görüşmeleri, analitik denetimi, ödeme hunisi analizi.',
         },
       },
       {
         title: { en: 'Design system', tr: 'Tasarım sistemi' },
         content: {
           en: 'Component library, tokens, responsive patterns.',
           tr: 'Bileşen kütüphanesi, token’lar, duyarlı kalıplar.',
         },
       },
       {
         title: { en: 'Implementation', tr: 'Uygulama' },
         content: {
           en: 'Next.js app, server components, Stripe integration.',
           tr: 'Next.js uygulaması, sunucu bileşenleri, Stripe entegrasyonu.',
         },
       },
     ],
     result: {
       en: 'Faster checkout and improved discoverability led to significant revenue growth.',
       tr: 'Daha hızlı ödeme ve daha iyi keşfedilebilirlik önemli gelir artışı sağladı.',
     },
   },
   {
     slug: 'beautybox',
     title: 'BeautyBox',
     category: 'Mobile App',
     description: {
       en: 'iOS and Android app for beauty service bookings',
       tr: 'Güzellik hizmeti rezervasyonları için iOS ve Android uygulaması',
     },
     image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop&q=80',
     tags: ['React Native', 'Node.js', 'MongoDB'],
     metrics: [
       { label: { en: 'Downloads', tr: 'İndirme' }, value: '50K+' },
       { label: { en: 'Rating', tr: 'Puan' }, value: '4.8/5' },
     ],
     color: 'from-pink-500/20 to-rose-500/20',
     process: [
       {
         title: { en: 'User research', tr: 'Kullanıcı araştırması' },
         content: {
           en: 'Booking flows and salon availability constraints.',
           tr: 'Rezervasyon akışları ve salon uygunluk kısıtları.',
         },
       },
       {
         title: { en: 'Mobile UI', tr: 'Mobil arayüz' },
         content: {
           en: 'Gesture-driven patterns and delightful micro-interactions.',
           tr: 'Jest odaklı kalıplar ve keyifli mikro etkileşimler.',
         },
       },
       {
         title: { en: 'Launch', tr: 'Lansman' },
         content: {
           en: 'Phased rollout with performance monitoring.',
           tr: 'Performans izleme ile kademeli yayın.',
         },
       },
     ],
     result: {
       en: 'High ratings and strong organic growth after launch.',
       tr: 'Lansman sonrası yüksek puanlar ve güçlü organik büyüme.',
     },
   },
   {
     slug: 'eduplatform',
     title: 'EduPlatform',
     category: 'Web Application',
     description: {
       en: 'Learning management system for online education',
       tr: 'Online eğitim için öğrenme yönetim sistemi',
     },
     image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=800&fit=crop&q=80',
     tags: ['React', 'GraphQL', 'AWS'],
     metrics: [
       { label: { en: 'Active users', tr: 'Aktif kullanıcı' }, value: '10K+' },
       { label: { en: 'Uptime', tr: 'Çalışma süresi' }, value: '99.9%' },
     ],
     color: 'from-green-500/20 to-emerald-500/20',
     process: [
       {
         title: { en: 'Architecture', tr: 'Mimari' },
         content: {
           en: 'Modular services and real-time collaboration.',
           tr: 'Modüler servisler ve gerçek zamanlı işbirliği.',
         },
       },
       {
         title: { en: 'Accessibility', tr: 'Erişilebilirlik' },
         content: {
           en: 'WCAG-guided components and testing.',
           tr: 'WCAG yönlendirmeli bileşenler ve testler.',
         },
       },
       {
         title: { en: 'Deployment', tr: 'Dağıtım' },
         content: {
           en: 'Scalable infrastructure with observability.',
           tr: 'Gözlemlenebilirlik ile ölçeklenebilir altyapı.',
         },
       },
     ],
     result: {
       en: 'Reliable platform adoption across multiple institutions.',
       tr: 'Birden çok kurumda güvenilir platform benimsenmesi.',
     },
   },
 ]
 
 export function getProject(slug: string): Project | undefined {
   return projects.find((p) => p.slug === slug)
 }
