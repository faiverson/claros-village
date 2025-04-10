'use client'

import { useState } from 'react'
import Link from 'next/link'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { Role } from '@prisma/client'
import { CVPassword } from '@/components/ui/cv-password'
import { CVEmail } from '@/components/ui/cv-email'
import { CVPhone } from '@/components/ui/cv-phone'
import { CVInput } from '@/components/ui/cv-input'
import { CVRadioGroup } from '@/components/ui/cv-radio-group'
import { CVSelect } from '@/components/ui/cv-select'

const EMPTY_STRING = ''

interface RegisterFormProps {
  units: string[]
}

const defaultValues: RegisterInput = {
  role: Role.LANDLORD,
  name: EMPTY_STRING,
  email: EMPTY_STRING,
  phone: EMPTY_STRING,
  password: EMPTY_STRING,
  confirmPassword: EMPTY_STRING,
  unidad: EMPTY_STRING,
}

export function RegisterForm({ units }: RegisterFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = methods

  console.log(getValues())

  const resetForm = () => {
    setSuccess(false)
    setError(null)
    reset()
  }

  const onSubmit = async (data: RegisterInput) => {
    try {
      setError(null)
      setLoading(true)

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Algo salió mal')
      }

      setSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Algo salió mal')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Registro exitoso</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Te hemos enviado un correo electrónico con instrucciones para verificar tu cuenta. Por favor revisa tu bandeja de
                    entrada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <Link
              href="/"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Ir al inicio
            </Link>
            <button
              onClick={resetForm}
              className="inline-flex justify-center py-2 px-4 border border-primary shadow-sm text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Registrar otra cuenta
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear cuenta</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link href="/auth/signin" className="font-medium text-primary hover:text-primary-600">
              iniciar sesión
            </Link>
          </p>
        </div>
        <FormProvider {...methods}>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <CVInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Escribi tu nombre"
                  error={errors.name?.message}
                  label="Nombre completo"
                />
              </div>
              <div>
                <CVPhone id="phone" name="phone" placeholder="Teléfono" error={errors.phone?.message} label="Teléfono" />
              </div>
              <div>
                <CVEmail
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Escribi tu correo"
                  error={errors.email?.message}
                  label="Correo electrónico"
                />
              </div>
              <div>
                <CVPassword
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Contraseña"
                  error={errors.password?.message}
                  label="Contraseña"
                />
              </div>
              <div>
                <CVPassword
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirmar contraseña"
                  error={errors.confirmPassword?.message}
                  label="Confirmar contraseña"
                />
              </div>
              <div>
                <CVSelect
                  id="unidad"
                  name="unidad"
                  options={units.map((unit) => ({
                    value: unit,
                    label: unit,
                  }))}
                  placeholder="Seleccionar Unidad"
                  error={errors.unidad?.message}
                  label="Unidad"
                />
              </div>
              <div className="mt-4">
                <CVRadioGroup
                  id="role"
                  name="role"
                  className="flex flex-row space-x-4"
                  options={[
                    { id: 'renter', value: Role.RENTER, label: 'Inquilino' },
                    { id: 'landlord', value: Role.LANDLORD, label: 'Propietario' },
                  ]}
                />
              </div>
            </div>

            {error && <div className="text-destructive-500 text-sm text-center">{error}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
