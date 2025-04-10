import { Role } from '@prisma/client'

export interface UserWithRole {
  id: string
  name: string | null
  email: string
  emailVerified?: Date | null
  image?: string | null
  password?: string
  role: Role
}

export interface SessionUser {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
}
