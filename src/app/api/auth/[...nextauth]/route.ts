import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

let prisma: any = null
let prismaAdapter: any = null

// Try to load Prisma, but don't fail if it's not available
try {
  const prismaModule = await import('@/lib/prisma')
  prisma = prismaModule.prisma
  const { PrismaAdapter } = await import('@auth/prisma-adapter')
  prismaAdapter = PrismaAdapter(prisma)
} catch (error) {
  console.warn('Prisma not available, running in development mode without database')
}

const handler = NextAuth({
  ...(prismaAdapter ? { adapter: prismaAdapter } : {}),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Development mode: allow default admin login without database
        if (!prisma) {
          if (credentials.email === 'admin@dealora.com' && credentials.password === 'admin123') {
            return {
              id: 'dev-admin',
              email: 'admin@dealora.com',
              name: 'Admin User',
              role: 'ADMIN'
            }
          }
          // Also allow customer login in dev mode
          if (credentials.email === 'user@dealora.com' && credentials.password === 'user123') {
            return {
              id: 'dev-user',
              email: 'user@dealora.com',
              name: 'Demo User',
              role: 'CUSTOMER'
            }
          }
          return null
        }

        // Production mode with database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
