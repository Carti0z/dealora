import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        wishlist: {
          include: {
            items: {
              include: {
                product: {
                  include: {
                    images: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!user?.wishlist) {
      return NextResponse.json({ items: [] })
    }

    const items = user.wishlist.items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.images[0]?.url || '',
      slug: item.product.slug,
      brand: item.product.brand,
      discount: item.product.compareAtPrice 
        ? Math.round((1 - Number(item.product.compareAtPrice) / Number(item.product.price)) * 100)
        : undefined
    }))

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Wishlist fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get or create wishlist
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id }
    })

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: user.id }
      })
    }

    // Add item to wishlist
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId
        }
      }
    })

    if (existingItem) {
      return NextResponse.json({ message: 'Item already in wishlist' })
    }

    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId
      }
    })

    return NextResponse.json({ message: 'Item added to wishlist' })
  } catch (error) {
    console.error('Wishlist add error:', error)
    return NextResponse.json({ error: 'Failed to add item to wishlist' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { wishlist: true }
    })

    if (!user?.wishlist) {
      return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 })
    }

    await prisma.wishlistItem.deleteMany({
      where: {
        wishlistId: user.wishlist.id,
        productId
      }
    })

    return NextResponse.json({ message: 'Item removed from wishlist' })
  } catch (error) {
    console.error('Wishlist remove error:', error)
    return NextResponse.json({ error: 'Failed to remove item from wishlist' }, { status: 500 })
  }
}
