import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const featuredProducts = await prisma.product.findMany({
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

    const products = featuredProducts.map(product => {
      const originalPrice = product.compareAtPrice
      const discount = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : undefined
      
      return {
        id: product.id,
        name: product.name,
        brand: product.brand || 'Unknown',
        image: product.images[0]?.url || '/placeholder.png',
        price: product.price,
        originalPrice: originalPrice || undefined,
        discount,
        rating: product.rating,
        reviewCount: product.reviewCount || 0,
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Featured products API error:', error)
    // Return default featured products when database is not connected
    const defaultFeaturedProducts = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        brand: 'AudioTech',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        price: 149.99,
        originalPrice: 199.99,
        discount: 25,
        rating: 4.8,
        reviewCount: 1247,
      },
      {
        id: '2',
        name: 'Smart Watch Series X',
        brand: 'TechWear',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        price: 299.99,
        originalPrice: 349.99,
        discount: 14,
        rating: 4.6,
        reviewCount: 892,
      },
      {
        id: '3',
        name: 'Ultra-Thin Laptop',
        brand: 'CompPro',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
        price: 899.99,
        rating: 4.7,
        reviewCount: 567,
      },
      {
        id: '4',
        name: 'Designer Sunglasses',
        brand: 'LuxStyle',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
        price: 189.99,
        originalPrice: 249.99,
        discount: 24,
        rating: 4.5,
        reviewCount: 423,
      },
      {
        id: '5',
        name: 'Wireless Earbuds Pro',
        brand: 'SoundMax',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        rating: 4.4,
        reviewCount: 2156,
      },
      {
        id: '6',
        name: 'Fitness Tracker Band',
        brand: 'FitLife',
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80',
        price: 49.99,
        rating: 4.3,
        reviewCount: 1876,
      },
      {
        id: '7',
        name: 'Portable Power Bank',
        brand: 'ChargeIt',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80',
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        rating: 4.6,
        reviewCount: 3421,
      },
      {
        id: '8',
        name: 'Bluetooth Speaker Mini',
        brand: 'SoundWave',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
        price: 59.99,
        rating: 4.5,
        reviewCount: 987,
      },
    ]
    return NextResponse.json(defaultFeaturedProducts)
  }
}
