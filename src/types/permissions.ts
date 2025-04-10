import { Role } from '@prisma/client'

export enum Permission {
  // User Management
  VIEW_USERS = 'VIEW_USERS',
  CREATE_USERS = 'CREATE_USERS',
  EDIT_USERS = 'EDIT_USERS',
  DELETE_USERS = 'DELETE_USERS',

  // Resident Management
  VIEW_RESIDENTS = 'VIEW_RESIDENTS',
  CREATE_RESIDENTS = 'CREATE_RESIDENTS',
  EDIT_RESIDENTS = 'EDIT_RESIDENTS',
  DELETE_RESIDENTS = 'DELETE_RESIDENTS',

  // Sum Management
  VIEW_SUM = 'VIEW_SUM',
  CREATE_SUM = 'CREATE_SUM',
  EDIT_SUM = 'EDIT_SUM',
  DELETE_SUM = 'DELETE_SUM',

  // Reports
  VIEW_REPORTS = 'VIEW_REPORTS',
  GENERATE_REPORTS = 'GENERATE_REPORTS',

  // Settings
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
}

// Define which roles have access to which permissions
export const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.VIEW_USERS,
    Permission.CREATE_USERS,
    Permission.EDIT_USERS,
    Permission.DELETE_USERS,
    Permission.VIEW_RESIDENTS,
    Permission.CREATE_RESIDENTS,
    Permission.EDIT_RESIDENTS,
    Permission.DELETE_RESIDENTS,
    Permission.VIEW_SUM,
    Permission.CREATE_SUM,
    Permission.EDIT_SUM,
    Permission.DELETE_SUM,
    Permission.VIEW_REPORTS,
    Permission.GENERATE_REPORTS,
    Permission.MANAGE_SETTINGS,
  ],
  [Role.MANAGER]: [
    Permission.VIEW_USERS,
    Permission.CREATE_USERS,
    Permission.EDIT_USERS,
    Permission.VIEW_RESIDENTS,
    Permission.CREATE_RESIDENTS,
    Permission.EDIT_RESIDENTS,
    Permission.VIEW_SUM,
    Permission.CREATE_SUM,
    Permission.EDIT_SUM,
    Permission.VIEW_REPORTS,
    Permission.GENERATE_REPORTS,
  ],
  [Role.GUARD]: [Permission.VIEW_RESIDENTS, Permission.VIEW_SUM, Permission.CREATE_SUM],
  [Role.LANDLORD]: [Permission.VIEW_RESIDENTS, Permission.VIEW_SUM],
  [Role.RENTER]: [Permission.VIEW_RESIDENTS, Permission.VIEW_SUM],
}

// Helper function to check if a role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false
}

// Helper function to get all permissions for a role
export function getRolePermissions(role: Role): Permission[] {
  return rolePermissions[role] || []
}
