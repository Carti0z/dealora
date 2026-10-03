import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createUser() {
  const email = 'cartiz8080@gmail.com'
  const password = 'user123' // You can change this

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Cartiz User',
      role: 'CUSTOMER'
    }
  })

  console.log('User created successfully:', user.email)
  console.log('Password:', password)
}

createUser()
  .catch((e) => {
    console.error('Error creating user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })