 import { NextResponse } from 'next/server'
 import { blogPosts } from '@/lib/blog'
 import { siteConfig } from '@/lib/seo'
 
 export async function GET() {
   const items = blogPosts
     .map((p) => {
       const url = `${siteConfig.url}/blog/${p.slug}`
       const pubDate = new Date(p.date).toUTCString()
       return `
       <item>
         <title><![CDATA[${p.title.en}]]></title>
         <link>${url}</link>
         <guid>${url}</guid>
         <pubDate>${pubDate}</pubDate>
         <description><![CDATA[${p.excerpt.en}]]></description>
       </item>`
     })
     .join('')
 
   const xml = `<?xml version="1.0" encoding="UTF-8"?>
   <rss version="2.0">
     <channel>
       <title>${siteConfig.name} Blog</title>
       <link>${siteConfig.url}</link>
       <description>${siteConfig.description}</description>
       ${items}
     </channel>
   </rss>`
 
   return new NextResponse(xml, {
     status: 200,
     headers: {
       'Content-Type': 'application/rss+xml; charset=utf-8',
       'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
     },
   })
 }
