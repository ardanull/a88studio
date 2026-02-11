 import { NextRequest, NextResponse } from 'next/server'
 
 export async function POST(request: NextRequest) {
   const body = await request.json()
   const password = body?.password || ''
   const valid = password === (process.env.ADMIN_PASSWORD || 'changeme')
   if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
   const res = NextResponse.json({ success: true }, { status: 200 })
   res.cookies.set('admin_session', '1', { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })
   return res
 }
