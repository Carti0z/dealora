import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/admin/auth'

export async function GET() {
  const session = await getAdminSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Since we don't have a promotions table yet, return empty array
    // In production, this would query a promotions table
    return NextResponse.json([])
  } catch (error) {
    console.error('Promotions API error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
