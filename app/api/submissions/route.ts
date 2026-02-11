 import { NextResponse } from 'next/server'
 import { readJson } from '@/lib/store'
 
 export async function GET() {
   const submissions = readJson<any[]>('submissions.json', [])
   return NextResponse.json(submissions, { status: 200 })
 }
