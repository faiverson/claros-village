import { Role } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { Permission, hasPermission } from '@/types/permissions'

type AllowedRoles = readonly Role[]
type AllowedPermissions = readonly Permission[]

export function usePermission(allowedRoles?: AllowedRoles, allowedPermissions?: AllowedPermissions) {
  const { data: session } = useSession()
  const userRole = session?.user?.role

  const checkPermission = () => {
    if (!userRole) return false

    // Check role-based permission
    if (allowedRoles && allowedRoles.includes(userRole as Role)) {
      return true
    }

    // Check specific permissions
    if (allowedPermissions) {
      return allowedPermissions.some(permission => hasPermission(userRole as Role, permission))
    }

    return false
  }

  return {
    hasPermission: checkPermission,
    userRole,
  }
}
