import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const now = new Date()
    
    const flashSaleProducts = await prisma.product.findMany({
      where: {
        isFeatured: true,
        inventory: {
          quantity: {
            gt: 0
          }
        }
      },
      include: {
        inventory: {
          select: { quantity: true }
        },
        images: {
          take: 1,
          select: { url: true }
        }
      },
      take: 8,
      orderBy: {
        rating: 'desc'
      }
    })

    const products = flashSaleProducts.map(product => {
      const originalPrice = product.compareAtPrice || product.price * 1.5
      const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100)
      
      return {
        id: product.id,
        name: product.name,
        image: product.images[0]?.url || '/placeholder.png',
        originalPrice,
        price: product.price,
        discount,
        stock: product.inventory?.quantity || 0,
        viewers: Math.floor(Math.random() * 20) + 5
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Flash sales API error:', error)
    // Return default flash sale products when database is not connected
    const defaultFlashSaleProducts = [
      {
        id: '1',
        name: 'Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        originalPrice: 120,
        price: 69.99,
        discount: 42,
        stock: 8,
        viewers: 12,
      },
      {
        id: '2',
        name: 'Smart Watch Pro',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        originalPrice: 299,
        price: 149.99,
        discount: 50,
        stock: 5,
        viewers: 8,
      },
      {
        id: '3',
        name: 'Bluetooth Speaker',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
        originalPrice: 89,
        price: 39.99,
        discount: 55,
        stock: 15,
        viewers: 6,
      },
      {
        id: '4',
        name: 'Wireless Earbuds',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
        originalPrice: 79,
        price: 29.99,
        discount: 62,
        stock: 3,
        viewers: 15,
      },
      {
        id: '5',
        name: 'Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
        originalPrice: 59,
        price: 29.99,
        discount: 49,
        stock: 12,
        viewers: 9,
      },
      {
        id: '6',
        name: 'Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=400&q=80',
        originalPrice: 149,
        price: 79.99,
        discount: 46,
        stock: 7,
        viewers: 11,
      },
      {
        id: '7',
        name: 'USB-C Hub',
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&q=80',
        originalPrice: 69,
        price: 34.99,
        discount: 49,
        stock: 20,
        viewers: 5,
      },
      {
        id: '8',
        name: 'Wireless Charger',
        image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&q=80',
        originalPrice: 49,
        price: 24.99,
        discount: 49,
        stock: 18,
        viewers: 7,
      },
    ]
    return NextResponse.json(defaultFlashSaleProducts)
  }
}
