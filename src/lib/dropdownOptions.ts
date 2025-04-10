import { Role } from '@prisma/client'

export const roleOptions = [
  { value: Role.LANDLORD, label: 'Propietario' },
  { value: Role.RENTER, label: 'Inquilino' },
  { value: Role.GUARD, label: 'Guardia' },
  { value: Role.MANAGER, label: 'Gestor' },
  { value: Role.ADMIN, label: 'Administrador' },
]
