import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    
    // Get products with compareAtPrice (clearance items)
    const clearanceProducts = await prisma.product.findMany({
      where: {
        compareAtPrice: {
          not: null
        },
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
        createdAt: 'desc'
      }
    })

    const products = clearanceProducts.map(product => {
      const originalPrice = product.compareAtPrice ? Number(product.compareAtPrice) : Number(product.price) * 1.5
      const discount = Math.round(((originalPrice - Number(product.price)) / originalPrice) * 100)
      
      return {
        id: product.id,
        name: product.name,
        image: product.images[0]?.url || '/placeholder.png',
        originalPrice,
        clearancePrice: Number(product.price),
        discount,
        rating: product.rating,
        stock: product.inventory?.quantity || 0,
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Clearance products API error:', error)
    // Return default clearance products when database is not connected
    const defaultClearanceProducts = [
      {
        id: '1',
        name: 'iPhone 15 Pro Max',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80',
        originalPrice: 1199,
        clearancePrice: 899.99,
        discount: 25,
        rating: 4.8,
        stock: 4,
      },
      {
        id: '2',
        name: 'Samsung Galaxy S24 Ultra',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
        originalPrice: 1299,
        clearancePrice: 949.99,
        discount: 27,
        rating: 4.7,
        stock: 3,
      },
      {
        id: '3',
        name: 'Nike Air Jordan 1',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
        originalPrice: 180,
        clearancePrice: 119.99,
        discount: 33,
        rating: 4.9,
        stock: 5,
      },
      {
        id: '4',
        name: 'Apple Watch Ultra 2',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80',
        originalPrice: 799,
        clearancePrice: 599.99,
        discount: 25,
        rating: 4.6,
        stock: 6,
      },
      {
        id: '5',
        name: 'Designer Leather Handbag',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
        originalPrice: 349,
        clearancePrice: 174.99,
        discount: 50,
        rating: 4.5,
        stock: 2,
      },
      {
        id: '6',
        name: 'Sony WH-1000XM5 Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        originalPrice: 399,
        clearancePrice: 279.99,
        discount: 30,
        rating: 4.7,
        stock: 8,
      },
      {
        id: '7',
        name: 'MacBook Air M3',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
        originalPrice: 1299,
        clearancePrice: 999.99,
        discount: 23,
        rating: 4.8,
        stock: 3,
      },
      {
        id: '8',
        name: 'Samsung 65" 4K Smart TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80',
        originalPrice: 899,
        clearancePrice: 599.99,
        discount: 33,
        rating: 4.4,
        stock: 4,
      },
    ]
    return NextResponse.json(defaultClearanceProducts)
  }
}
