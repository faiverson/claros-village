import { PrismaAdapter } from '@auth/prisma-adapter'
import { Role } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/utils/password'

// Extend the session and JWT types
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      phone?: string | null
      image?: string | null
      role?: Role
      active?: boolean
    }
  }

  interface User {
    role?: Role
    active?: boolean
    emailVerified?: Date | null
    phone?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: Role
    name?: string | null
    email?: string | null
    phone?: string | null
    active?: boolean
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
            active: true,
            emailVerified: true,
            phone: true,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await verifyPassword(user.password, credentials.password)

        if (!isPasswordValid) {
          return null
        }

        if (!user.emailVerified) {
          throw new Error('Tu cuenta no está verificada. Por favor verifica tu correo electrónico.')
        }

        if (!user.active) {
          throw new Error(
            'Tu cuenta no está activa. Necesitamos validar tu información para activarla. Por favor comunicate con la intendencia para activarla.'
          )
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
          emailVerified: user.emailVerified,
          phone: user.phone,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.role = user.role as Role
        token.name = user.name
        token.email = user.email
        token.active = user.active
        token.phone = user.phone
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role
        session.user.name = token.name
        session.user.email = token.email
        session.user.active = token.active
      }
      return session
    },
    async signIn({ user }) {
      if (user) return true
      return false
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
