import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function requireAdmin() {
  const session = await getServerSession()
  
  if (!session || !session.user?.email) {
    redirect('/admin/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  })

  if (!user || user.role !== 'ADMIN') {
    redirect('/')
  }

  return user
}

export async function getAdminSession() {
  const session = await getServerSession()
  
  if (!session || !session.user?.email) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, role: true }
  })

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  return user
}
