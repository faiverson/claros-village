import { Role } from '@prisma/client'

export interface User {
  id?: string
  name?: string
  email?: string
  image?: string
  role?: string
}

export type FileUser = {
  name: string
  email: string
  role: Role
}
