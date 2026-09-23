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

    // Transform wishlist items to cart format
    const cartItems = user.wishlist?.items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      quantity: item.quantity,
      image: item.product.images[0]?.url || '',
      slug: item.product.slug
    })) || []

    return NextResponse.json({ items: cartItems })
  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { productId, quantity = 1 } = body

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
      // Update quantity
      await prisma.wishlistItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
    } else {
      // Add new item
      await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId,
          quantity
        }
      })
    }

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

    const cartItems = updatedWishlist?.items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      quantity: item.quantity,
      image: item.product.images[0]?.url || '',
      slug: item.product.slug
    })) || []

    return NextResponse.json({ items: cartItems })
  } catch (error) {
    console.error('Cart add error:', error)
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { productId, quantity } = body

    const { prisma } = await import('@/lib/prisma')
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { wishlist: true }
    })

    if (!user || !user.wishlist) {
      return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 })
    }

    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: user.wishlist.id,
          productId
        }
      }
    })

    if (!wishlistItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    if (quantity <= 0) {
      await prisma.wishlistItem.delete({
        where: { id: wishlistItem.id }
      })
    } else {
      await prisma.wishlistItem.update({
        where: { id: wishlistItem.id },
        data: { quantity }
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

    const cartItems = updatedWishlist?.items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      quantity: item.quantity,
      image: item.product.images[0]?.url || '',
      slug: item.product.slug
    })) || []

    return NextResponse.json({ items: cartItems })
  } catch (error) {
    console.error('Cart update error:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
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
      // Clear entire cart
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

    const cartItems = updatedWishlist?.items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      quantity: item.quantity,
      image: item.product.images[0]?.url || '',
      slug: item.product.slug
    })) || []

    return NextResponse.json({ items: cartItems })
  } catch (error) {
    console.error('Cart delete error:', error)
    return NextResponse.json({ error: 'Failed to delete from cart' }, { status: 500 })
  }
}