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
        cart: {
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

    // Transform cart items to cart format
    const cartItems = user.cart?.items.map((item: any) => ({
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
      include: { cart: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get or create cart
    let cart = user.cart
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id }
      })
    }

    // Check if item already exists
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    })

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      })
    }

    // Fetch updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
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

    const cartItems = updatedCart?.items.map((item: any) => ({
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
      include: { cart: true }
    })

    if (!user || !user.cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: user.cart.id,
          productId
        }
      }
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: cartItem.id }
      })
    } else {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity }
      })
    }

    // Fetch updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: user.cart.id },
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

    const cartItems = updatedCart?.items.map((item: any) => ({
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
      include: { cart: true }
    })

    if (!user || !user.cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    if (productId) {
      // Remove specific item
      await prisma.cartItem.deleteMany({
        where: {
          cartId: user.cart.id,
          productId
        }
      })
    } else {
      // Clear entire cart
      await prisma.cartItem.deleteMany({
        where: { cartId: user.cart.id }
      })
    }

    // Fetch updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: user.cart.id },
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

    const cartItems = updatedCart?.items.map((item: any) => ({
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