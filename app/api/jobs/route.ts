 import { NextRequest, NextResponse } from 'next/server'
 import { readJson, writeJson } from '@/lib/store'
 
 type Job = {
   id: string
   title: { en: string; tr: string }
   location: string
   type: string
   description: { en: string; tr: string }
   status?: 'open' | 'closed'
 }
 
 export async function GET() {
   const jobs = readJson<Job[]>('jobs.json', [])
   return NextResponse.json(jobs, { status: 200 })
 }
 
 export async function POST(request: NextRequest) {
   try {
     const body = (await request.json()) as Job
     if (!body?.id || !body?.title?.en || !body?.title?.tr) {
       return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
     }
     const jobs = readJson<Job[]>('jobs.json', [])
     const exists = jobs.find((j) => j.id === body.id)
     if (exists) {
       return NextResponse.json({ error: 'ID exists' }, { status: 400 })
     }
     jobs.push({ ...body, status: body.status || 'open' })
     writeJson('jobs.json', jobs)
     return NextResponse.json({ success: true }, { status: 201 })
   } catch {
     return NextResponse.json({ error: 'Server error' }, { status: 500 })
   }
 }
 
 export async function PUT(request: NextRequest) {
   try {
     const body = (await request.json()) as Partial<Job> & { id: string }
     if (!body?.id) {
       return NextResponse.json({ error: 'Missing id' }, { status: 400 })
     }
     const jobs = readJson<Job[]>('jobs.json', [])
     const idx = jobs.findIndex((j) => j.id === body.id)
     if (idx === -1) {
       return NextResponse.json({ error: 'Not found' }, { status: 404 })
     }
     jobs[idx] = { ...jobs[idx], ...body }
     writeJson('jobs.json', jobs)
     return NextResponse.json({ success: true }, { status: 200 })
   } catch {
     return NextResponse.json({ error: 'Server error' }, { status: 500 })
   }
 }
 
 export async function DELETE(request: NextRequest) {
   try {
     const { searchParams } = new URL(request.url)
     const id = searchParams.get('id')
     if (!id) {
       return NextResponse.json({ error: 'Missing id' }, { status: 400 })
     }
     const jobs = readJson<Job[]>('jobs.json', [])
     const next = jobs.filter((j) => j.id !== id)
     writeJson('jobs.json', next)
     return NextResponse.json({ success: true }, { status: 200 })
   } catch {
     return NextResponse.json({ error: 'Server error' }, { status: 500 })
   }
 }
