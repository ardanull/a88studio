import { NextRequest, NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/store'
 
 export async function POST(request: NextRequest) {
   try {
     const body = await request.json()
     const { name, email, role, cvUrl, message } = body
 
     if (!name || !email || !role || !message) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
     }
 
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     if (!emailRegex.test(email)) {
       return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
     }
 
    const submissions = readJson<any[]>('submissions.json', [])
    submissions.push({
      type: 'career',
      name,
      email,
      role,
      cvUrl,
      message,
      createdAt: new Date().toISOString(),
    })
    writeJson('submissions.json', submissions)
 
     return NextResponse.json({ success: true, message: 'Application submitted' }, { status: 200 })
   } catch (error) {
     console.error('Careers form error:', error)
     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
   }
 }
