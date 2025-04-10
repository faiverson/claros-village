import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import { AuthLayout } from './AuthLayout'

interface AuthLayoutProps {
  children: React.ReactNode
}

export async function AdminLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession(authOptions)
  const allowedRoles = [Role.ADMIN, Role.MANAGER, Role.GUARD] as const
  const canAccessUsers = allowedRoles.includes(session?.user?.role as (typeof allowedRoles)[number])

  if (!canAccessUsers) redirect('/')

  return <AuthLayout>{children}</AuthLayout>
}
