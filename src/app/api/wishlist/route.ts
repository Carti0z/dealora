import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    
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

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const wishlistItems = user.wishlist?.items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.images[0]?.url || '',
      slug: item.product.slug,
      brand: item.product.brand,
      discount: item.product.compareAtPrice ? Math.round((1 - Number(item.product.price) / Number(item.product.compareAtPrice)) * 100) : undefined
    })) || []

    return NextResponse.json({ items: wishlistItems })
  } catch (error) {
    console.error('Wishlist fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { productId } = body

    const { prisma } = await import('@/lib/prisma')
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { wishlist: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get or create wishlist
    let wishlist = user.wishlist
    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: user.id }
      })
    }

    // Check if item already exists
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId
        }
      }
    })

    if (existingItem) {
      return NextResponse.json({ message: 'Item already in wishlist' }, { status: 400 })
    }

    // Add new item
    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
        quantity: 1
      }
    })

    // Fetch updated wishlist
    const updatedWishlist = await prisma.wishlist.findUnique({
      where: { id: wishlist.id },
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
    })

    const wishlistItems = updatedWishlist?.items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.images[0]?.url || '',
      slug: item.product.slug,
      brand: item.product.brand,
      discount: item.product.compareAtPrice ? Math.round((1 - Number(item.product.price) / Number(item.product.compareAtPrice)) * 100) : undefined
    })) || []

    return NextResponse.json({ items: wishlistItems })
  } catch (error) {
    console.error('Wishlist add error:', error)
    return NextResponse.json({ error: 'Failed to add item to wishlist' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    const { prisma } = await import('@/lib/prisma')
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { wishlist: true }
    })

    if (!user || !user.wishlist) {
      return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 })
    }

    if (productId) {
      // Remove specific item
      await prisma.wishlistItem.deleteMany({
        where: {
          wishlistId: user.wishlist.id,
          productId
        }
      })
    } else {
      // Clear entire wishlist
      await prisma.wishlistItem.deleteMany({
        where: { wishlistId: user.wishlist.id }
      })
    }

    // Fetch updated wishlist
    const updatedWishlist = await prisma.wishlist.findUnique({
      where: { id: user.wishlist.id },
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
    })

    const wishlistItems = updatedWishlist?.items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.images[0]?.url || '',
      slug: item.product.slug,
      brand: item.product.brand,
      discount: item.product.compareAtPrice ? Math.round((1 - Number(item.product.price) / Number(item.product.compareAtPrice)) * 100) : undefined
    })) || []

    return NextResponse.json({ items: wishlistItems })
  } catch (error) {
    console.error('Wishlist delete error:', error)
    return NextResponse.json({ error: 'Failed to delete from wishlist' }, { status: 500 })
  }
}