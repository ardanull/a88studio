import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Brands from '@/components/Brands'
import Work from '@/components/Work'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import Team from '@/components/Team'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />  
        <Work />
        <Brands />
        <Services />
        <Testimonials />
        <About />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
