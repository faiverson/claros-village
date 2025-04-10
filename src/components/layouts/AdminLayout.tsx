import { getServerSession } from 'next-auth'
import { AuthLayout } from './AuthLayout'
import { Role } from '@prisma/client'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

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
