import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Role } from '@prisma/client'

export async function checkServerPermission(roles: Role[]) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.role) {
    return false
  }

  return roles.includes(session.user.role)
}
