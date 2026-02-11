import { NextRequest, NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/store'
import { blogPosts } from '@/lib/blog'
 
export async function GET(request: NextRequest) {
  const extra = readJson<any[]>('blog.json', [])
  const all = [...extra, ...blogPosts]
  const url = new URL(request.url)
  const allFlag = url.searchParams.get('all') === '1'
  const previewToken = url.searchParams.get('preview')
  const slug = url.searchParams.get('slug')
  if (allFlag) {
    return NextResponse.json(all, { status: 200 })
  }
  if (previewToken) {
    const list = all.filter((p) => p.previewToken === previewToken && (!slug || p.slug === slug))
    return NextResponse.json(list, { status: 200 })
  }
  const now = Date.now()
  const published = all.filter((p) => {
    if (p.status && p.status !== 'published') return false
    if (!p.publishAt) return true
    const ts = new Date(p.publishAt).getTime()
    return Number.isFinite(ts) ? ts <= now : true
  })
  return NextResponse.json(published, { status: 200 })
 }
 
 export async function POST(request: NextRequest) {
   try {
     const body = await request.json()
     if (!body?.slug || !body?.title?.en || !body?.title?.tr) {
       return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
     }
     const items = readJson<any[]>('blog.json', [])
    const staticExists = blogPosts.find((p) => p.slug === body.slug)
     const exists = items.find((p) => p.slug === body.slug)
    if (exists || staticExists) {
       return NextResponse.json({ error: 'Slug exists' }, { status: 400 })
     }
    const previewToken = body.previewToken || crypto.randomUUID()
    items.push({
      ...body,
      previewToken,
      versions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
     writeJson('blog.json', items)
     return NextResponse.json({ success: true }, { status: 201 })
   } catch {
     return NextResponse.json({ error: 'Server error' }, { status: 500 })
   }
 }

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body?.slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }
    const items = readJson<any[]>('blog.json', [])
    const idx = items.findIndex((p) => p.slug === body.slug)
    if (idx === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const prev = items[idx]
    const prevSnapshot = { ...prev }
    delete prevSnapshot.versions
    const nextVersions = [
      {
        id: crypto.randomUUID(),
        snapshot: prevSnapshot,
        createdAt: new Date().toISOString(),
      },
      ...(prev.versions || []),
    ]
    if (body.restoreVersionId || body.restoreVersionIndex !== undefined) {
      const found = body.restoreVersionId
        ? (prev.versions || []).find((v: any) => v.id === body.restoreVersionId)
        : (prev.versions || [])[body.restoreVersionIndex]
      if (!found) {
        return NextResponse.json({ error: 'Version not found' }, { status: 404 })
      }
      items[idx] = {
        ...found.snapshot,
        slug: prev.slug,
        previewToken: prev.previewToken || body.previewToken || crypto.randomUUID(),
        versions: nextVersions,
        updatedAt: new Date().toISOString(),
      }
    } else {
      items[idx] = {
        ...prev,
        ...body,
        previewToken: prev.previewToken || body.previewToken || crypto.randomUUID(),
        versions: nextVersions,
        updatedAt: new Date().toISOString(),
      }
    }
    writeJson('blog.json', items)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }
    const items = readJson<any[]>('blog.json', [])
    const next = items.filter((p) => p.slug !== slug)
    writeJson('blog.json', next)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
