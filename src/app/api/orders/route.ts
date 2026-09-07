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
            },
            address: true,
            payments: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const orders = user.orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      subtotal: Number(order.subtotal),
      discount: Number(order.discount),
      tax: Number(order.tax),
      shipping: Number(order.shipping),
      total: Number(order.total),
      currency: order.currency,
      estimatedDelivery: order.estimatedDelivery,
      deliveredAt: order.deliveredAt,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: Number(item.price),
        discount: Number(item.discount),
        total: Number(item.total),
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          price: Number(item.product.price),
          image: item.product.images[0]?.url || ''
        }
      })),
      address: {
        fullName: order.address.fullName,
        addressLine1: order.address.addressLine1,
        addressLine2: order.address.addressLine2,
        city: order.address.city,
        state: order.address.state,
        country: order.address.country,
        postalCode: order.address.postalCode
      },
      payment: order.payments[0] ? {
        method: order.payments[0].method,
        status: order.payments[0].status,
        amount: Number(order.payments[0].amount)
      } : null
    }))

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items, addressId, paymentMethod } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId: user.id
      }
    })

    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const discount = 0
    const tax = subtotal * 0.08
    const shipping = subtotal > 50 ? 0 : 9.99
    const total = subtotal + shipping + tax - discount

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        addressId: address.id,
        status: 'PENDING',
        subtotal,
        discount,
        tax,
        shipping,
        total,
        currency: 'USD',
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
          }))
        },
        payments: {
          create: {
            amount: total,
            method: paymentMethod,
            status: 'PENDING'
          }
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json({ order: { id: order.id, orderNumber: order.orderNumber } })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
