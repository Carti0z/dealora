import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-indigo-500 to-indigo-600',
      'from-pink-500 to-pink-600',
      'from-orange-500 to-orange-600',
      'from-rose-500 to-rose-600',
      'from-green-500 to-green-600',
      'from-teal-500 to-teal-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-cyan-500 to-cyan-600',
      'from-emerald-500 to-emerald-600',
    ]

    const formattedCategories = categories.map((category, index) => ({
      name: category.name,
      image: category.image || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
      productCount: category._count.products,
      color: colors[index % colors.length],
      slug: category.slug,
    }))

    return NextResponse.json(formattedCategories)
  } catch (error) {
    console.error('Categories API error:', error)
    // Return default categories when database is not connected
    const defaultCategories = [
      { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80', productCount: 2340, color: 'from-blue-500 to-blue-600', slug: 'electronics' },
      { name: 'Phones & Tablets', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80', productCount: 1890, color: 'from-purple-500 to-purple-600', slug: 'phones-tablets' },
      { name: 'Computers', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', productCount: 1560, color: 'from-indigo-500 to-indigo-600', slug: 'computers' },
      { name: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80', productCount: 3240, color: 'from-pink-500 to-pink-600', slug: 'fashion' },
      { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', productCount: 2180, color: 'from-orange-500 to-orange-600', slug: 'shoes' },
      { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', productCount: 1450, color: 'from-rose-500 to-rose-600', slug: 'beauty' },
      { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', productCount: 2890, color: 'from-green-500 to-green-600', slug: 'home-kitchen' },
      { name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', productCount: 980, color: 'from-teal-500 to-teal-600', slug: 'furniture' },
      { name: 'Gaming', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80', productCount: 1670, color: 'from-red-500 to-red-600', slug: 'gaming' },
      { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80', productCount: 1340, color: 'from-yellow-500 to-yellow-600', slug: 'sports' },
      { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', productCount: 2560, color: 'from-cyan-500 to-cyan-600', slug: 'accessories' },
      { name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', productCount: 4120, color: 'from-emerald-500 to-emerald-600', slug: 'groceries' },
    ]
    return NextResponse.json(defaultCategories)
  }
}
