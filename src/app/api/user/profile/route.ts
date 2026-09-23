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
        orders: {
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
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        addresses: {
          orderBy: { isDefault: 'desc' }
        },
        paymentMethods: {
          orderBy: { isDefault: 'desc' }
        },
        notifications: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
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

    // Calculate cart summary from wishlist
    const cartTotal = user.wishlist?.items.reduce((sum, item) => {
      return sum + Number(item.product.price)
    }, 0) || 0

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt
      },
      stats: {
        totalOrders: user.orders.length,
        totalSpent: user.orders.reduce((sum, order) => sum + Number(order.total), 0),
        cartItems: user.wishlist?.items.length || 0,
        cartTotal
      },
      orders: user.orders,
      addresses: user.addresses,
      paymentMethods: user.paymentMethods,
      notifications: user.notifications,
      wishlist: user.wishlist?.items || []
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}