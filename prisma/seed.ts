import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dealora.com' },
    update: {},
    create: {
      email: 'admin@dealora.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date()
    }
  })
  console.log('✅ Created admin user')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Discover the latest in technology with our extensive electronics collection. From smartphones to home entertainment systems, find everything you need to stay connected and entertained.',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'phones-tablets' },
      update: {},
      create: {
        name: 'Phones & Tablets',
        slug: 'phones-tablets',
        description: 'Stay connected with the latest smartphones and tablets from top brands. Featuring cutting-edge technology and stunning displays.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'computers' },
      update: {},
      create: {
        name: 'Computers',
        slug: 'computers',
        description: 'Powerful computers for work, gaming, and creativity. Find laptops, desktops, and all-in-one PCs from leading manufacturers.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'fashion' },
      update: {},
      create: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Express your style with our curated fashion collection. From trendy outfits to timeless classics, find the perfect look for any occasion.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'shoes' },
      update: {},
      create: {
        name: 'Shoes',
        slug: 'shoes',
        description: 'Step into style with our footwear collection. Sneakers, boots, sandals, and more from your favorite brands.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'beauty' },
      update: {},
      create: {
        name: 'Beauty',
        slug: 'beauty',
        description: 'Enhance your natural beauty with our premium beauty products. Skincare, makeup, haircare, and more from top brands.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'home-kitchen' },
      update: {},
      create: {
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        description: 'Transform your home with our kitchen and home essentials. Cookware, appliances, decor, and organization solutions.',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'furniture' },
      update: {},
      create: {
        name: 'Furniture',
        slug: 'furniture',
        description: 'Create your perfect space with our furniture collection. Living room, bedroom, office, and outdoor furniture for every style.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'gaming' },
      update: {},
      create: {
        name: 'Gaming',
        slug: 'gaming',
        description: 'Level up your gaming experience with consoles, games, accessories, and gaming PCs from top gaming brands.',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'sports' },
      update: {},
      create: {
        name: 'Sports',
        slug: 'sports',
        description: 'Get active with our sports and fitness equipment. Gear for every sport, fitness trackers, and outdoor adventure essentials.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Complete your look with our accessories collection. Watches, bags, jewelry, and tech accessories for every style.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'groceries' },
      update: {},
      create: {
        name: 'Groceries',
        slug: 'groceries',
        description: 'Shop fresh groceries and pantry essentials. Organic produce, snacks, beverages, and household items delivered to your door.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80'
      }
    })
  ])
  console.log('✅ Created categories')

  // Create products
  const electronicsCategory = categories.find(c => c.slug === 'electronics')
  const phonesCategory = categories.find(c => c.slug === 'phones-tablets')
  const computersCategory = categories.find(c => c.slug === 'computers')

  if (electronicsCategory) {
    await prisma.product.create({
      data: {
        name: 'iPhone 15 Pro Max',
        slug: 'iphone-15-pro-max',
        description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system.',
        brand: 'Apple',
        categoryId: electronicsCategory.id,
        price: 899.99,
        compareAtPrice: 1199,
        rating: 4.8,
        reviewCount: 245,
        isFeatured: true,
        isNewArrival: true,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80', alt: 'iPhone 15 Pro Max', position: 0 }
          ]
        },
        inventory: {
          create: { quantity: 50 }
        }
      }
    })
  }

  if (phonesCategory) {
    await prisma.product.create({
      data: {
        name: 'Samsung Galaxy S24',
        slug: 'samsung-galaxy-s24',
        description: 'Experience the future with Galaxy AI, stunning display, and powerful performance.',
        brand: 'Samsung',
        categoryId: phonesCategory.id,
        price: 799.99,
        compareAtPrice: 999,
        rating: 4.6,
        reviewCount: 189,
        isFeatured: true,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80', alt: 'Samsung Galaxy S24', position: 0 }
          ]
        },
        inventory: {
          create: { quantity: 75 }
        }
      }
    })
  }

  if (computersCategory) {
    await prisma.product.create({
      data: {
        name: 'MacBook Air M3',
        slug: 'macbook-air-m3',
        description: 'Supercharged by M3. Impossibly thin and light. With up to 18 hours of battery life.',
        brand: 'Apple',
        categoryId: computersCategory.id,
        price: 999.99,
        compareAtPrice: 1299,
        rating: 4.9,
        reviewCount: 312,
        isFeatured: true,
        isNewArrival: true,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80', alt: 'MacBook Air M3', position: 0 }
          ]
        },
        inventory: {
          create: { quantity: 30 }
        }
      }
    })
  }

  console.log('✅ Created sample products')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
