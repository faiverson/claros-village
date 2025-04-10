import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

export async function checkServerPermission(roles: Role[]) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.role) {
    return false
  }

  return roles.includes(session.user.role)
}
