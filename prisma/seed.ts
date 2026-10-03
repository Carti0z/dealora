import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dealora.com' },
    update: {},
    create: {
      email: 'admin@dealora.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  })
  console.log('Created admin user:', admin.email)

  // Create test customer user
  const customerPassword = await bcrypt.hash('user123', 10)
  const customer = await prisma.user.upsert({
    where: { email: 'user@dealora.com' },
    update: {},
    create: {
      email: 'user@dealora.com',
      password: customerPassword,
      name: 'Demo User',
      role: 'CUSTOMER'
    }
  })
  console.log('Created customer user:', customer.email)

  // Create a sample category
  const category = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices and accessories'
    }
  })
  console.log('Created category:', category.name)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })