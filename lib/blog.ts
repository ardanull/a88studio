export interface BlogPost {
  slug: string
  title: {
    en: string
    tr: string
  }
  date: string
  readingTime: {
    en: string
    tr: string
  }
  excerpt: {
    en: string
    tr: string
  }
  tag: {
    en: string
    tr: string
  }
  image: string
  author: {
    name: string
    avatar: string
    role: {
      en: string
      tr: string
    }
  }
  content: {
    en: {
      intro: string
      sections: Array<{
        heading: string
        paragraphs: string[]
      }>
      conclusion: string
    }
    tr: {
      intro: string
      sections: Array<{
        heading: string
        paragraphs: string[]
      }>
      conclusion: string
    }
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'designing-product-first-experiences',
    title: {
      en: 'Designing product-first experiences',
      tr: 'Ürün odaklı deneyimler tasarlamak',
    },
    date: '2024-10-01',
    readingTime: {
      en: '5 min read',
      tr: '5 dk okuma',
    },
    excerpt: {
      en: 'How we approach interface design when the product strategy, constraints, and roadmap are still evolving.',
      tr: 'Ürün stratejisi, kısıtlamalar ve yol haritası hala gelişirken arayüz tasarımına nasıl yaklaşıyoruz.',
    },
    tag: {
      en: 'Design',
      tr: 'Tasarım',
    },
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=800&fit=crop&q=80',
    author: {
      name: 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      role: {
        en: 'Creative Director',
        tr: 'Kreatif Direktör',
      },
    },
    content: {
      en: {
        intro: 'In the fast-paced world of product development, design often needs to move in parallel with strategy. This creates unique challenges—and opportunities—for designers who must balance flexibility with coherence.',
        sections: [
          {
            heading: 'Starting with principles, not pixels',
            paragraphs: [
              'When product strategy is still taking shape, jumping straight into high-fidelity mockups can be premature. Instead, we begin by establishing design principles that can guide decisions even as requirements shift.',
              'These principles act as guardrails, ensuring that whatever we build maintains a consistent vision and user experience, regardless of how features or priorities evolve.',
            ],
          },
          {
            heading: 'Embracing modularity',
            paragraphs: [
              'A modular approach to design allows us to build flexible systems that can adapt to change. By designing components rather than complete pages, we create building blocks that work together in multiple configurations.',
              'This modularity extends to our design systems, where reusable patterns and components enable rapid iteration without sacrificing quality or consistency.',
            ],
          },
          {
            heading: 'Continuous validation',
            paragraphs: [
              'Regular user testing and stakeholder feedback loops are essential when working in uncertain conditions. We prototype early and often, using lo-fi sketches and interactive prototypes to validate assumptions quickly.',
              'This iterative approach helps us course-correct before investing too heavily in any single direction, reducing waste and improving outcomes.',
            ],
          },
        ],
        conclusion: 'Product-first design isn\'t about having all the answers upfront—it\'s about building systems and processes that allow you to discover the right answers along the way. By staying flexible, modular, and user-focused, we can create exceptional experiences even in the face of uncertainty.',
      },
      tr: {
        intro: 'Hızlı tempolu ürün geliştirme dünyasında, tasarım genellikle strateji ile paralel ilerlemelidir. Bu, esneklik ve tutarlılık arasında denge kurması gereken tasarımcılar için benzersiz zorluklar ve fırsatlar yaratır.',
        sections: [
          {
            heading: 'Piksellerle değil, prensiplerle başlamak',
            paragraphs: [
              'Ürün stratejisi hala şekillenirken, doğrudan yüksek kaliteli maketlere atlamak erken olabilir. Bunun yerine, gereksinimler değişse bile kararları yönlendirebilecek tasarım prensipleri oluşturarak başlıyoruz.',
              'Bu prensipler, özellikler veya öncelikler nasıl evrilirse evrilsin, inşa ettiğimiz her şeyin tutarlı bir vizyon ve kullanıcı deneyimi korumasını sağlayan korkuluklar görevi görür.',
            ],
          },
          {
            heading: 'Modülerliği benimsemek',
            paragraphs: [
              'Tasarıma modüler bir yaklaşım, değişime uyum sağlayabilen esnek sistemler oluşturmamıza olanak tanır. Tam sayfalar yerine bileşenler tasarlayarak, birden fazla yapılandırmada birlikte çalışan yapı taşları yaratıyoruz.',
              'Bu modülerlik, yeniden kullanılabilir kalıplar ve bileşenlerin kalite veya tutarlılıktan ödün vermeden hızlı iterasyonu mümkün kıldığı tasarım sistemlerimize kadar uzanır.',
            ],
          },
          {
            heading: 'Sürekli doğrulama',
            paragraphs: [
              'Belirsiz koşullarda çalışırken düzenli kullanıcı testleri ve paydaş geri bildirim döngüleri esastır. Varsayımları hızlı bir şekilde doğrulamak için düşük kaliteli eskizler ve etkileşimli prototiplerle erken ve sık prototipleme yapıyoruz.',
              'Bu yinelemeli yaklaşım, herhangi bir yöne çok fazla yatırım yapmadan rotayı düzeltmemize yardımcı olur, israfı azaltır ve sonuçları iyileştirir.',
            ],
          },
        ],
        conclusion: 'Ürün odaklı tasarım, önceden tüm cevaplara sahip olmakla ilgili değildir—yol boyunca doğru cevapları keşfetmenizi sağlayan sistemler ve süreçler oluşturmakla ilgilidir. Esnek, modüler ve kullanıcı odaklı kalarak, belirsizlik karşısında bile olağanüstü deneyimler yaratabiliriz.',
      },
    },
  },
  {
    slug: 'from-brief-to-launch-in-six-weeks',
    title: {
      en: 'From brief to launch in six weeks',
      tr: 'Briften lansmana altı haftada',
    },
    date: '2024-08-12',
    readingTime: {
      en: '7 min read',
      tr: '7 dk okuma',
    },
    excerpt: {
      en: 'A behind-the-scenes look at our process for shipping a marketing site and web app under a tight deadline.',
      tr: 'Sıkı bir son tarih altında pazarlama sitesi ve web uygulaması geliştirme sürecimizin perde arkası.',
    },
    tag: {
      en: 'Process',
      tr: 'Süreç',
    },
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop&q=80',
    author: {
      name: 'Sophia Lee',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      role: {
        en: 'Lead Designer',
        tr: 'Baş Tasarımcı',
      },
    },
    content: {
      en: {
        intro: 'Six weeks from kickoff to launch. It sounds impossible, but with the right process, team, and mindset, it\'s entirely achievable. Here\'s how we did it.',
        sections: [
          {
            heading: 'Week 1: Discovery & alignment',
            paragraphs: [
              'The first week is all about understanding the business goals, user needs, and technical constraints. We conducted stakeholder interviews, reviewed existing research, and documented key requirements.',
              'By the end of week one, we had a clear creative brief, user personas, and a shared understanding of what success looks like.',
            ],
          },
          {
            heading: 'Week 2-3: Design sprint',
            paragraphs: [
              'With alignment established, we moved into a focused design sprint. Our team created wireframes, explored visual directions, and built interactive prototypes—all while maintaining close communication with the client.',
              'Rapid iteration and daily check-ins ensured we stayed on track and incorporated feedback without losing momentum.',
            ],
          },
          {
            heading: 'Week 4-5: Development & iteration',
            paragraphs: [
              'As designs were finalized, our development team began building in parallel. We used a component-based approach with Next.js and TypeScript, enabling us to work efficiently and maintain code quality.',
              'Regular demos with the client kept everyone aligned, and we made incremental improvements based on real-world testing.',
            ],
          },
          {
            heading: 'Week 6: Polish & launch',
            paragraphs: [
              'The final week focused on polish, performance optimization, and thorough QA testing. We conducted accessibility audits, cross-browser testing, and load testing to ensure a smooth launch.',
              'On launch day, everything went live without a hitch. The tight timeline forced us to prioritize ruthlessly and communicate constantly—and the results spoke for themselves.',
            ],
          },
        ],
        conclusion: 'Tight deadlines don\'t have to mean compromised quality. With disciplined process, clear communication, and a collaborative team, you can ship exceptional work in record time.',
      },
      tr: {
        intro: 'Başlangıçtan lansmana altı hafta. İmkansız gibi görünüyor, ancak doğru süreç, ekip ve zihniyet ile tamamen başarılabilir. İşte bunu nasıl yaptık.',
        sections: [
          {
            heading: 'Hafta 1: Keşif ve hizalama',
            paragraphs: [
              'İlk hafta tamamen iş hedeflerini, kullanıcı ihtiyaçlarını ve teknik kısıtlamaları anlamakla ilgili. Paydaş görüşmeleri yaptık, mevcut araştırmaları gözden geçirdik ve ana gereksinimleri belgeledik.',
              'Birinci haftanın sonunda, net bir yaratıcı özet, kullanıcı kişilikleri ve başarının nasıl göründüğüne dair ortak bir anlayışa sahiptik.',
            ],
          },
          {
            heading: 'Hafta 2-3: Tasarım sprint',
            paragraphs: [
              'Hizalama sağlandıktan sonra, odaklanmış bir tasarım sprintine geçtik. Ekibimiz tel çerçeveler oluşturdu, görsel yönler keşfetti ve etkileşimli prototipleri inşa etti—tüm bunları müşteriyle yakın iletişim halinde sürdürerek.',
              'Hızlı iterasyon ve günlük kontroller, momentumu kaybetmeden yolda kalmamızı ve geri bildirimleri dahil etmemizi sağladı.',
            ],
          },
          {
            heading: 'Hafta 4-5: Geliştirme ve iterasyon',
            paragraphs: [
              'Tasarımlar tamamlanırken, geliştirme ekibimiz paralel olarak inşa etmeye başladı. Next.js ve TypeScript ile bileşen tabanlı bir yaklaşım kullandık, bu da verimli çalışmamızı ve kod kalitesini korumamızı sağladı.',
              'Müşteriyle düzenli demolar herkesi hizalı tuttu ve gerçek dünya testlerine dayalı olarak artımlı iyileştirmeler yaptık.',
            ],
          },
          {
            heading: 'Hafta 6: Cilalama ve lansman',
            paragraphs: [
              'Son hafta cilalama, performans optimizasyonu ve kapsamlı QA testine odaklandı. Sorunsuz bir lansman sağlamak için erişilebilirlik denetimleri, tarayıcılar arası testler ve yük testleri yaptık.',
              'Lansman günü, her şey aksama olmadan yayına girdi. Sıkı zaman çizelgesi bizi acımasızca önceliklendirmeye ve sürekli iletişim kurmaya zorladı—ve sonuçlar kendini gösterdi.',
            ],
          },
        ],
        conclusion: 'Sıkı son tarihler, kaliteden ödün vermek anlamına gelmek zorunda değildir. Disiplinli süreç, net iletişim ve işbirlikçi bir ekiple, rekor sürede olağanüstü işler çıkarabilirsiniz.',
      },
    },
  },
  {
    slug: 'design-systems-for-small-teams',
    title: {
      en: 'Design systems for small teams',
      tr: 'Küçük ekipler için tasarım sistemleri',
    },
    date: '2024-06-28',
    readingTime: {
      en: '6 min read',
      tr: '6 dk okuma',
    },
    excerpt: {
      en: 'Practical advice on creating a lightweight design system that actually gets used in production.',
      tr: 'Üretimde gerçekten kullanılan hafif bir tasarım sistemi oluşturma konusunda pratik öneriler.',
    },
    tag: {
      en: 'Systems',
      tr: 'Sistemler',
    },
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop&q=80',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      role: {
        en: 'Technical Lead',
        tr: 'Teknik Lider',
      },
    },
    content: {
      en: {
        intro: 'Design systems can feel like an enterprise luxury—too complex and resource-intensive for small teams. But with the right approach, even a team of 2-3 people can benefit from a lightweight, practical design system.',
        sections: [
          {
            heading: 'Start with what you\'re already using',
            paragraphs: [
              'Don\'t build a design system from scratch. Look at your existing products and extract the patterns you\'re already using. Colors, typography, spacing, common components—document what\'s there first.',
              'This audit gives you a realistic baseline and helps you identify inconsistencies that need resolving.',
            ],
          },
          {
            heading: 'Keep it minimal',
            paragraphs: [
              'Small teams don\'t need 50 button variants. Focus on the essentials: a primary and secondary button, maybe a tertiary text-only option. That\'s it.',
              'The same goes for colors. A simple palette with 2-3 brand colors, a set of neutrals, and semantic colors for success/warning/error states is more than enough.',
            ],
          },
          {
            heading: 'Make it code-first',
            paragraphs: [
              'Your design system should live where your team works—in code. Use tools like Tailwind CSS, CSS variables, or styled-components to define your system directly in your codebase.',
              'This ensures designers and developers stay in sync and reduces the maintenance burden of keeping separate design and code libraries.',
            ],
          },
          {
            heading: 'Document as you go',
            paragraphs: [
              'Don\'t wait until your system is "complete" to document it—it never will be. Create simple, practical documentation as you build. A README with examples and usage guidelines is often enough.',
              'Tools like Storybook can help, but even a simple Markdown file in your repo works for small teams.',
            ],
          },
        ],
        conclusion: 'A design system doesn\'t have to be perfect or comprehensive to be valuable. Start small, stay practical, and evolve it as your team and product grow. The best design system is the one that actually gets used.',
      },
      tr: {
        intro: 'Tasarım sistemleri kurumsal bir lüks gibi hissedilebilir—küçük ekipler için çok karmaşık ve kaynak yoğun. Ancak doğru yaklaşımla, 2-3 kişilik bir ekip bile hafif, pratik bir tasarım sisteminden faydalanabilir.',
        sections: [
          {
            heading: 'Zaten kullandığınız şeylerle başlayın',
            paragraphs: [
              'Sıfırdan bir tasarım sistemi oluşturmayın. Mevcut ürünlerinize bakın ve zaten kullandığınız kalıpları çıkarın. Renkler, tipografi, aralıklar, yaygın bileşenler—önce orada olanı belgeleyin.',
              'Bu denetim size gerçekçi bir temel verir ve çözülmesi gereken tutarsızlıkları belirlemenize yardımcı olur.',
            ],
          },
          {
            heading: 'Minimal tutun',
            paragraphs: [
              'Küçük ekiplerin 50 buton varyantına ihtiyacı yoktur. Temel olanlara odaklanın: birincil ve ikincil buton, belki üçüncül yalnızca metin seçeneği. Bu kadar.',
              'Renkler için de aynısı geçerlidir. 2-3 marka rengi, bir dizi nötr ve başarı/uyarı/hata durumları için anlamsal renklerle basit bir palet fazlasıyla yeterlidir.',
            ],
          },
          {
            heading: 'Kod odaklı yapın',
            paragraphs: [
              'Tasarım sisteminiz ekibinizin çalıştığı yerde yaşamalıdır—kodda. Sisteminizi doğrudan kod tabanınızda tanımlamak için Tailwind CSS, CSS değişkenleri veya styled-components gibi araçlar kullanın.',
              'Bu, tasarımcıların ve geliştiricilerin senkronize kalmasını sağlar ve ayrı tasarım ve kod kütüphanelerini güncel tutma bakım yükünü azaltır.',
            ],
          },
          {
            heading: 'Giderken belgeleyin',
            paragraphs: [
              'Sisteminiz "tamamlanana" kadar belgelemeyi beklemeyin—asla tamamlanmayacak. İnşa ederken basit, pratik belgeler oluşturun. Örnekler ve kullanım kılavuzlarıyla bir README çoğu zaman yeterlidir.',
              'Storybook gibi araçlar yardımcı olabilir, ancak küçük ekipler için repoda basit bir Markdown dosyası bile işe yarar.',
            ],
          },
        ],
        conclusion: 'Bir tasarım sisteminin değerli olması için mükemmel veya kapsamlı olması gerekmez. Küçük başlayın, pratik kalın ve ekibiniz ve ürününüz büyüdükçe geliştirin. En iyi tasarım sistemi, gerçekten kullanılan sistemdir.',
      },
    },
  },
  {
    slug: 'building-accessible-interfaces',
    title: {
      en: 'Building accessible interfaces',
      tr: 'Erişilebilir arayüzler oluşturmak',
    },
    date: '2024-05-15',
    readingTime: {
      en: '8 min read',
      tr: '8 dk okuma',
    },
    excerpt: {
      en: 'Essential principles and practical techniques for creating inclusive digital experiences for everyone.',
      tr: 'Herkes için kapsayıcı dijital deneyimler yaratmak için temel prensipler ve pratik teknikler.',
    },
    tag: {
      en: 'Accessibility',
      tr: 'Erişilebilirlik',
    },
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&h=800&fit=crop&q=80',
    author: {
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      role: {
        en: 'Product Strategist',
        tr: 'Ürün Stratejisti',
      },
    },
    content: {
      en: {
        intro: 'Accessibility isn\'t a feature—it\'s a fundamental aspect of good design. When we build interfaces that work for everyone, we create better experiences for all users, not just those with disabilities.',
        sections: [
          {
            heading: 'Start with semantic HTML',
            paragraphs: [
              'The foundation of accessible web design is semantic HTML. Use the right elements for the right purposes: buttons for actions, links for navigation, headings for structure.',
              'Screen readers and other assistive technologies rely on semantic markup to help users navigate and understand your content. When you use divs and spans for everything, you\'re creating barriers.',
            ],
          },
          {
            heading: 'Color and contrast',
            paragraphs: [
              'Color alone should never be the only way to convey information. Combine color with text labels, icons, or patterns to ensure everyone can understand your interface.',
              'Maintain sufficient contrast ratios between text and backgrounds (minimum 4.5:1 for normal text, 3:1 for large text). Use tools like the WebAIM contrast checker to verify your designs.',
            ],
          },
          {
            heading: 'Keyboard navigation',
            paragraphs: [
              'Every interactive element must be keyboard-accessible. Users should be able to tab through your interface, activate controls with Enter or Space, and dismiss modals with Escape.',
              'Visible focus indicators are essential. The default browser outline isn\'t always pretty, but replacing it means you need to design a clear, high-contrast alternative.',
            ],
          },
          {
            heading: 'Testing with real users',
            paragraphs: [
              'Automated tools catch maybe 30-40% of accessibility issues. Real testing with assistive technology users uncovers the rest.',
              'Consider working with accessibility consultants or user testing services that connect you with people who use screen readers, voice control, and other assistive technologies daily.',
            ],
          },
        ],
        conclusion: 'Accessibility is an ongoing practice, not a one-time checklist. By building inclusively from the start and testing continuously, we can create digital products that truly work for everyone.',
      },
      tr: {
        intro: 'Erişilebilirlik bir özellik değildir—iyi tasarımın temel bir yönüdür. Herkes için çalışan arayüzler oluşturduğumuzda, sadece engelli kullanıcılar için değil, tüm kullanıcılar için daha iyi deneyimler yaratıyoruz.',
        sections: [
          {
            heading: 'Anlamsal HTML ile başlayın',
            paragraphs: [
              'Erişilebilir web tasarımının temeli anlamsal HTML\'dir. Doğru amaçlar için doğru öğeleri kullanın: eylemler için butonlar, navigasyon için linkler, yapı için başlıklar.',
              'Ekran okuyucular ve diğer yardımcı teknolojiler, kullanıcıların içeriğinizde gezinmesine ve anlamasına yardımcı olmak için anlamsal işaretlemeye güvenir. Her şey için div ve span kullandığınızda engeller yaratırsınız.',
            ],
          },
          {
            heading: 'Renk ve kontrast',
            paragraphs: [
              'Renk tek başına bilgi iletmenin tek yolu asla olmamalıdır. Herkesin arayüzünüzü anlayabilmesini sağlamak için rengi metin etiketleri, simgeler veya desenlerle birleştirin.',
              'Metin ve arka planlar arasında yeterli kontrast oranlarını koruyun (normal metin için minimum 4.5:1, büyük metin için 3:1). Tasarımlarınızı doğrulamak için WebAIM kontrast kontrol aracı gibi araçlar kullanın.',
            ],
          },
          {
            heading: 'Klavye navigasyonu',
            paragraphs: [
              'Her etkileşimli öğe klavye erişilebilir olmalıdır. Kullanıcılar arayüzünüzde tab ile gezinebilmeli, Enter veya Space ile kontrolleri etkinleştirebilmeli ve Escape ile modalleri kapatabilmelidir.',
              'Görünür odak göstergeleri esastır. Varsayılan tarayıcı çerçevesi her zaman güzel değildir, ancak değiştirmek net, yüksek kontrastlı bir alternatif tasarlamanız gerektiği anlamına gelir.',
            ],
          },
          {
            heading: 'Gerçek kullanıcılarla test etme',
            paragraphs: [
              'Otomatik araçlar erişilebilirlik sorunlarının belki %30-40\'ını yakalar. Yardımcı teknoloji kullanıcılarıyla gerçek testler geri kalanını ortaya çıkarır.',
              'Sizi günlük olarak ekran okuyucular, sesli kontrol ve diğer yardımcı teknolojileri kullanan insanlarla buluşturan erişilebilirlik danışmanları veya kullanıcı test hizmetleriyle çalışmayı düşünün.',
            ],
          },
        ],
        conclusion: 'Erişilebilirlik süregelen bir uygulamadır, tek seferlik bir kontrol listesi değildir. Baştan kapsayıcı bir şekilde inşa ederek ve sürekli test ederek, gerçekten herkes için çalışan dijital ürünler yaratabiliriz.',
      },
    },
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}
