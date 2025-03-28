'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Role } from '@prisma/client'
import dynamic from 'next/dynamic'
import type { CSSObjectWithLabel, StylesConfig } from 'react-select'
import { CVPassword } from '@/components/ui/cv-password'
import { CVEmail } from '@/components/ui/cv-email'

const Select = dynamic(() => import('react-select'), {
  ssr: false,
})

interface RegisterFormProps {
  units: string[]
}

interface UnitOption {
  value: string
  label: string
}

export function RegisterForm({ units }: RegisterFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role>(Role.LANDLORD)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: Role.LANDLORD,
    },
  })

  const resetForm = () => {
    setSuccess(false)
    setError(null)
    reset()
    setSelectedRole(Role.LANDLORD)
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

  const unitOptions = units.map((unit) => ({
    value: unit,
    label: unit,
  }))

  const customStyles: StylesConfig<UnitOption> = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      minHeight: '42px',
      borderRadius: '0.375rem',
      borderColor: errors.unidad ? '#ef4444' : '#d1d5db',
      '&:hover': {
        borderColor: errors.unidad ? '#ef4444' : '#9ca3af',
      },
      '&:focus-within': {
        borderColor: errors.unidad ? '#ef4444' : '#2563eb',
        boxShadow: '0 0 0 1px #2563eb',
      },
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
      color: '#1f2937',
      '&:hover': {
        backgroundColor: '#f3f4f6',
      },
    }),
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre completo
              </label>
              <input
                id="name"
                {...register('name')}
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Nombre completo"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <CVEmail
                id="email"
                {...register('email')}
                autoComplete="email"
                placeholder="Correo electrónico"
                error={errors.email?.message}
                label="Correo electrónico"
              />
            </div>
            <div>
              <CVPassword
                id="password"
                {...register('password')}
                autoComplete="new-password"
                placeholder="Contraseña"
                error={errors.password?.message}
                label="Contraseña"
              />
            </div>
            <div>
              <CVPassword
                id="confirmPassword"
                {...register('confirmPassword')}
                autoComplete="new-password"
                placeholder="Confirmar contraseña"
                error={errors.confirmPassword?.message}
                label="Confirmar contraseña"
              />
            </div>
            <div>
              <label htmlFor="unidad" className="sr-only">
                Unidad
              </label>
              <Select
                id="unidad"
                options={unitOptions}
                onChange={(option: unknown) => setValue('unidad', (option as UnitOption)?.value || '')}
                placeholder="Seleccionar Unidad"
                styles={customStyles as StylesConfig}
                isClearable
                isSearchable
                noOptionsMessage={() => 'No hay unidades disponibles'}
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {errors.unidad && <p className="mt-1 text-xs text-red-500">{errors.unidad.message}</p>}
            </div>
            <div className="mt-4">
              <RadioGroup
                value={selectedRole}
                onValueChange={(value) => {
                  setSelectedRole(value as Role)
                  setValue('role', value as Role)
                }}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Role.RENTER} id="renter" />
                  <label
                    htmlFor="renter"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Inquilino
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Role.LANDLORD} id="landlord" />
                  <label
                    htmlFor="landlord"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Propietario
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

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
      </div>
    </div>
  )
}
