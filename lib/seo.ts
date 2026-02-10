import type { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
}

const siteConfig = {
  name: 'a88studio',
  description: 'We build digital experiences that matter. A creative studio specializing in brand strategy, product design, and development.',
  url: 'https://a88studio.com',
  ogImage: 'https://a88studio.com/og-image.jpg',
  twitter: '@a88studio',
  instagram: '@a88studio',
}

export function generateSEO({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  author,
}: SEOProps): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: [
      'digital agency',
      'web design',
      'web development',
      'branding',
      'UI/UX design',
      'product design',
      'creative studio',
      'Next.js',
      'React',
      'TypeScript',
    ],
    authors: author ? [{ name: author }] : [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && publishedTime
        ? {
            publishedTime,
            authors: author ? [author] : undefined,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  }
}

export { siteConfig }
