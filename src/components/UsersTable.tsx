'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, XCircle, User, Mail, Shield, Activity, CheckCircle, Plus, Phone, Pencil, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { roleOptions } from '@/lib/dropdownOptions'
import { CVSelect } from '@/components/ui/cv-select'
import { useForm, FormProvider } from 'react-hook-form'
import { CVInput } from '@/components/ui/cv-input'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  role: string | null
  active: boolean
  emailVerified: Date | null
  unidad: string | null
}

interface UsersTableProps {
  users: User[]
  addUserPermission: boolean
}

interface FilterForm {
  name: string
  email: string
  phone: string
  unidad: string
  role: string
}

function formatPhoneNumber(phone: string | null): string {
  if (!phone) return '-'

  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '')

  // Check if it's a valid length for Argentine numbers
  if (cleaned.length < 10 || cleaned.length > 13) return phone

  // Format as +(country code) area code-number
  const countryCode = cleaned.slice(0, cleaned.length - 10)
  const areaCode = cleaned.slice(cleaned.length - 10, cleaned.length - 7)
  const number = cleaned.slice(cleaned.length - 7)

  return `+(${countryCode}) ${areaCode}-${number}`
}

export function UsersTable({ users, addUserPermission }: UsersTableProps) {
  const methods = useForm<FilterForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      unidad: '',
      role: '',
    },
  })

  const { watch } = methods
  const filters = watch()

  const filteredUsers = users.filter((user) => {
    return (
      (!filters.name || user.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.email || user.email?.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phone || user.phone?.toLowerCase().includes(filters.phone.toLowerCase())) &&
      (!filters.unidad || user.unidad?.toLowerCase().includes(filters.unidad.toLowerCase())) &&
      (!filters.role || user.role === filters.role)
    )
  })

  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary-900">Usuarios</h1>
        {addUserPermission && (
          <Link href="/admin/usuarios/nuevo">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
              <Plus className="h-4 w-4" />
              Nuevo Usuario
            </Button>
          </Link>
        )}
      </div>
      <div className="rounded-md border border-accent-500 bg-white shadow-sm">
        <FormProvider {...methods}>
          <Table className="border-collapse">
            <TableHeader className="bg-accent-100">
              <TableRow className="bg-accent-50/50">
                <TableHead className="font-semibold">
                  <div className="flex flex-col gap-2 py-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-accent-500" />
                      <span className="text-accent-700">Nombre</span>
                    </div>
                    <CVInput name="name" placeholder="Filtrar por nombre" leftIcon={Search} className="h-8" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent-500" />
                      <span className="text-accent-700">Email</span>
                    </div>
                    <CVInput name="email" placeholder="Filtrar por email" leftIcon={Search} className="h-8" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent-500" />
                      <span className="text-accent-700">Teléfono</span>
                    </div>
                    <CVInput name="phone" placeholder="Filtrar por teléfono" leftIcon={Search} className="h-8" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-700">Unidad</span>
                    </div>
                    <CVInput name="unidad" placeholder="Filtrar por unidad" leftIcon={Search} className="h-8" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 justify-center">
                      <Shield className="h-4 w-4 text-accent-500" />
                      <span className="text-accent-700">Tipo de usuario</span>
                    </div>
                    <div className="relative">
                      <CVSelect id="role" name="role" options={[{ value: '', label: 'Todos' }, ...roleOptions]} height="32px" />
                    </div>
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-accent-500" />
                    <span className="text-accent-700">Estado</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="h-4 w-4 text-accent-500" />
                    <span className="text-accent-700">Verificado</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-accent-700">Acciones</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-accent-200">
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-accent-50 h-8">
                  <TableCell className="px-2 align-middle">{user.name}</TableCell>
                  <TableCell className="px-2 align-middle">{user.email}</TableCell>
                  <TableCell className="px-2 align-middle">{formatPhoneNumber(user.phone)}</TableCell>
                  <TableCell className="px-2 align-middle">{user.unidad || '-'}</TableCell>
                  <TableCell className="px-2 align-middle">
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="align-middle text-center">
                    {user.active ? (
                      <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Activo
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-destructive-100 text-destructive-700">
                        <XCircle className="h-3.5 w-3.5" />
                        Inactivo
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="align-middle text-center">
                    {user.emailVerified ? (
                      <div className="inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary-500" />
                        <span className="text-xs text-primary-600">
                          {new Date(user.emailVerified).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-destructive" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => router.push(`/admin/usuarios/editar/${user.id}`)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => router.push(`/admin/usuarios/eliminar/${user.id}`)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FormProvider>
      </div>
    </div>
  )
}
