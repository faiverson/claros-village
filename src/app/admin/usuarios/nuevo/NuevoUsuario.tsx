'use client'

import { UserForm } from '@/components/forms/UserForm'

interface NuevoUsuarioProps {
  units: string[]
}

export default function NuevoUsuario({ units }: NuevoUsuarioProps) {
  return <UserForm units={units} />
}
