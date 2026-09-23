import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    
    // Try to get giveaways from database if table exists
    try {
      const giveaways = await prisma.giveaway.findMany({
        where: {
          endDate: {
            gt: new Date()
          }
        },
        orderBy: {
          endDate: 'asc'
        }
      })

      return NextResponse.json(giveaways)
    } catch (dbError) {
      // Giveaways table doesn't exist, return mock data
      console.warn('Giveaways table not found, using mock data')
    }
  } catch (error) {
    console.error('Giveaways API error:', error)
  }

  // Return mock data when database is not connected or table doesn't exist
  const giveaways = [
    {
      id: '1',
      name: 'Tech Bundle Giveaway',
      prize: 'Brand New Laptop + Accessories',
      prizeValue: 1499,
      prizeImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
      winnerCount: 3,
      entryRequirement: 'Purchase any product over $50',
      totalEntries: 12483,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      name: 'Fashion Week Special',
      prize: '$500 Shopping Spree',
      prizeValue: 500,
      prizeImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
      winnerCount: 5,
      entryRequirement: 'Sign up for newsletter',
      totalEntries: 8234,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      name: 'Gaming Paradise',
      prize: 'Next-Gen Gaming Console',
      prizeValue: 499,
      prizeImage: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80',
      winnerCount: 2,
      entryRequirement: 'Join our Discord community',
      totalEntries: 5678,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return NextResponse.json(giveaways)
}
