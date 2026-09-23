import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const newProducts = await prisma.product.findMany({
      where: {
        isNew: true,
        inventory: {
          quantity: {
            gt: 0
          }
        }
      },
      include: {
        category: {
          select: { name: true }
        },
        inventory: {
          select: { quantity: true }
        },
        images: {
          take: 1,
          select: { url: true }
        }
      },
      take: 16,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const products = newProducts.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand || 'Unknown',
      image: product.images[0]?.url || '/placeholder.png',
      price: product.price,
      category: product.category?.name || 'General',
      isNew: product.isNew,
    }))

    return NextResponse.json(products)
  } catch (error) {
    console.error('New arrivals API error:', error)
    // Return default new arrivals when database is not connected
    const defaultNewArrivals = [
      {
        id: '1',
        name: 'Smart Display Hub',
        brand: 'TechHome',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        price: 199.99,
        category: 'Electronics',
        isNew: true,
      },
      {
        id: '2',
        name: 'Designer Jacket',
        brand: 'StyleCo',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
        price: 149.99,
        category: 'Fashion',
        isNew: true,
      },
      {
        id: '3',
        name: 'Smart Coffee Maker',
        brand: 'BrewTech',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80',
        price: 129.99,
        category: 'Home',
        isNew: true,
      },
      {
        id: '4',
        name: 'VR Headset Pro',
        brand: 'GameVision',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80',
        price: 399.99,
        category: 'Gaming',
        isNew: true,
      },
      {
        id: '5',
        name: 'Wireless Charging Pad',
        brand: 'ChargePro',
        image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&q=80',
        price: 49.99,
        category: 'Electronics',
        isNew: true,
      },
      {
        id: '6',
        name: 'Smart Doorbell',
        brand: 'SecureHome',
        image: 'https://images.unsplash.com/photo-1558002038-1091777c8d5e?w=400&q=80',
        price: 179.99,
        category: 'Electronics',
        isNew: true,
      },
      {
        id: '7',
        name: 'Portable Projector',
        brand: 'ViewMax',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
        price: 299.99,
        category: 'Electronics',
        isNew: true,
      },
      {
        id: '8',
        name: 'Luxury Watch',
        brand: 'TimePiece',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        price: 249.99,
        category: 'Fashion',
        isNew: true,
      },
      {
        id: '9',
        name: 'Designer Sunglasses',
        brand: 'SunStyle',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
        price: 89.99,
        category: 'Fashion',
        isNew: true,
      },
      {
        id: '10',
        name: 'Leather Handbag',
        brand: 'LuxBag',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
        price: 199.99,
        category: 'Fashion',
        isNew: true,
      },
      {
        id: '11',
        name: 'Air Purifier',
        brand: 'PureAir',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
        price: 159.99,
        category: 'Home',
        isNew: true,
      },
      {
        id: '12',
        name: 'Smart Vacuum',
        brand: 'CleanBot',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        price: 349.99,
        category: 'Home',
        isNew: true,
      },
      {
        id: '13',
        name: 'Smart Light Bulbs',
        brand: 'LumiTech',
        image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
        price: 79.99,
        category: 'Home',
        isNew: true,
      },
      {
        id: '14',
        name: 'Gaming Keyboard',
        brand: 'KeyMaster',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=400&q=80',
        price: 129.99,
        category: 'Gaming',
        isNew: true,
      },
      {
        id: '15',
        name: 'Gaming Mouse',
        brand: 'ClickPro',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
        price: 79.99,
        category: 'Gaming',
        isNew: true,
      },
      {
        id: '16',
        name: 'Gaming Headset',
        brand: 'SoundMax',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        price: 99.99,
        category: 'Gaming',
        isNew: true,
      },
    ]
    return NextResponse.json(defaultNewArrivals)
  }
}
