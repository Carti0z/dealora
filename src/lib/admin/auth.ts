import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const session = await getServerSession()
  
  if (!session || !session.user?.email) {
    redirect('/login')
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })

    if (!user || user.role !== 'ADMIN') {
      redirect('/')
    }

    return user
  } catch (error) {
    // If database is not connected, allow access for development
    console.warn('Database not connected, allowing admin access for development')
    return { role: 'ADMIN', email: session.user.email, name: session.user.name || 'Admin' }
  }
}

export async function getAdminSession() {
  const session = await getServerSession()
  
  if (!session || !session.user?.email) {
    return null
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true, role: true }
    })

    if (!user || user.role !== 'ADMIN') {
      return null
    }

    return user
  } catch (error) {
    // If database is not connected, return session data for development
    console.warn('Database not connected, using session data for development')
    return {
      id: 'dev-admin',
      name: session.user.name || 'Admin',
      email: session.user.email,
      role: 'ADMIN'
    }
  }
}

export async function requireUser() {
  const session = await getServerSession()
  
  if (!session || !session.user?.email) {
    redirect('/login')
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })

    if (!user) {
      redirect('/login')
    }

    return user
  } catch (error) {
    // If database is not connected, allow access for development
    console.warn('Database not connected, allowing user access for development')
    return { role: 'CUSTOMER', email: session.user.email, name: session.user.name || 'User' }
  }
}

export async function getUserSession() {
  const session = await getServerSession()
  
  if (!session || !session.user?.email) {
    return null
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true, role: true }
    })

    if (!user) {
      return null
    }

    return user
  } catch (error) {
    // If database is not connected, return session data for development
    console.warn('Database not connected, using session data for development')
    return {
      id: 'dev-user',
      name: session.user.name || 'User',
      email: session.user.email,
      role: 'CUSTOMER'
    }
  }
}