import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const newArrival = searchParams.get('newArrival')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!) : 0

    const where: any = {
      isActive: true
    }

    if (category) {
      where.category = {
        slug: category
      }
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (newArrival === 'true') {
      where.isNewArrival = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { position: 'asc' }
        },
        variants: {
          where: { isActive: true }
        },
        inventory: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip
    })

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      brand: product.brand,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      discount: product.compareAtPrice 
        ? Math.round((1 - Number(product.compareAtPrice) / Number(product.price)) * 100)
        : null,
      rating: product.rating,
      reviewCount: product.reviewCount,
      isFeatured: product.isFeatured,
      isNewArrival: product.isNewArrival,
      category: {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug
      },
      images: product.images.map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        position: img.position
      })),
      variants: product.variants.map(variant => ({
        id: variant.id,
        name: variant.name,
        price: Number(variant.price),
        compareAtPrice: variant.compareAtPrice ? Number(variant.compareAtPrice) : null,
        sku: variant.sku,
        color: variant.color,
        size: variant.size
      })),
      stock: product.inventory?.quantity || 0
    }))

    return NextResponse.json({ products: formattedProducts })
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function GET_BY_SLUG(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: params.slug,
        isActive: true
      },
      include: {
        category: true,
        images: {
          orderBy: { position: 'asc' }
        },
        variants: {
          where: { isActive: true },
          include: {
            inventory: true
          }
        },
        inventory: true,
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: {
                name: true,
                image: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      brand: product.brand,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      discount: product.compareAtPrice 
        ? Math.round((1 - Number(product.compareAtPrice) / Number(product.price)) * 100)
        : null,
      rating: product.rating,
      reviewCount: product.reviewCount,
      category: {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug
      },
      images: product.images.map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        position: img.position
      })),
      variants: product.variants.map(variant => ({
        id: variant.id,
        name: variant.name,
        price: Number(variant.price),
        compareAtPrice: variant.compareAtPrice ? Number(variant.compareAtPrice) : null,
        sku: variant.sku,
        color: variant.color,
        size: variant.size,
        stock: variant.inventory?.quantity || 0
      })),
      stock: product.inventory?.quantity || 0,
      reviews: product.reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        isVerified: review.isVerified,
        createdAt: review.createdAt,
        user: {
          name: review.user.name,
          image: review.user.image
        }
      }))
    }

    return NextResponse.json({ product: formattedProduct })
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
