export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // Added later in auth.ts
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')

      if (isOnAdmin) {
        if (isLoggedIn && (auth?.user as any)?.role === 'ADMIN') {
          return true
        }
        return false
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      }

      return true
    },
  },
}
