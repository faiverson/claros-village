'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { CVInput } from '@/components/ui/cv-input'
import { CVEmail } from '@/components/ui/cv-email'
import { CVPassword } from '@/components/ui/cv-password'
import { CVSelect } from '@/components/ui/cv-select'
import { CVPhone } from '@/components/ui/cv-phone'
import { Role } from '@prisma/client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const userSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  role: z.nativeEnum(Role),
  unidad: z.string().optional(),
})

type UserInput = z.infer<typeof userSchema>

const roleOptions = [
  { value: Role.LANDLORD, label: 'Propietario' },
  { value: Role.RENTER, label: 'Inquilino' },
  { value: Role.GUARD, label: 'Guardia' },
  { value: Role.MANAGER, label: 'Gestor' },
  { value: Role.ADMIN, label: 'Administrador' },
]

interface UserFormProps {
  units: string[]
  initialData?: Partial<UserInput>
  isEdit?: boolean
  userId?: string
}

export function UserForm({ units, initialData, isEdit = false, userId }: UserFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const methods = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: Role.LANDLORD,
      ...initialData,
    },
  })

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = methods

  const selectedRole = watch('role')

  const onSubmit = async (data: UserInput) => {
    try {
      setError(null)
      setLoading(true)

      const url = isEdit ? `/api/users/${userId}` : '/api/users'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || `Error al ${isEdit ? 'actualizar' : 'crear'} el usuario`)
      }

      router.push('/admin/usuarios')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : `Error al ${isEdit ? 'actualizar' : 'crear'} el usuario`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/usuarios" className="text-primary-500 hover:text-primary-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-primary-900">{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h1>
      </div>

      <div className="max-w-[40%]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <CVInput id="name" name="name" label="Nombre" placeholder="Nombre del usuario" error={errors.name?.message} />
              <CVEmail id="email" name="email" label="Email" placeholder="Email del usuario" error={errors.email?.message} />
              <CVPhone id="phone" name="phone" label="Teléfono" placeholder="Teléfono del usuario" error={errors.phone?.message} />
              {!isEdit && (
                <CVPassword
                  id="password"
                  name="password"
                  label="Contraseña"
                  placeholder="Contraseña del usuario"
                  error={errors.password?.message}
                />
              )}
              <CVSelect id="role" name="role" label="Tipo de usuario" options={roleOptions} error={errors.role?.message} />
              {(selectedRole === Role.RENTER || selectedRole === Role.LANDLORD) && (
                <CVSelect
                  id="unidad"
                  name="unidad"
                  label="Unidad"
                  options={units.map((unit) => ({ value: unit, label: unit }))}
                  placeholder="Seleccionar unidad"
                  error={errors.unidad?.message}
                />
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-destructive-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-destructive-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Link href="/admin/usuarios">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? (isEdit ? 'Actualizando usuario...' : 'Creando usuario...') : isEdit ? 'Actualizar usuario' : 'Crear usuario'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
