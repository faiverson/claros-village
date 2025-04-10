'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm, FormProvider } from 'react-hook-form'

import { CVEmail } from '@/components/ui/cv-email'
import { CVPassword } from '@/components/ui/cv-password'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Correo electrónico o contraseña incorrectos'
      case 'Tu cuenta no está activa. Por favor verifica tu correo electrónico.':
        return (
          <span>
            Tu cuenta no está activa. Por favor revisa tu correo electrónico y sigue las instrucciones para verificar tu cuenta.{' '}
            <Link href="/auth/register" className="text-primary-500 hover:text-primary-600 underline">
              ¿Necesitas registrarte de nuevo?
            </Link>
          </span>
        )
      case 'Por favor verifica tu correo electrónico antes de iniciar sesión.':
        return (
          <span>
            Necesitas verificar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada y sigue las instrucciones
            enviadas.
          </span>
        )
      default:
        return error || 'Ocurrió un error al iniciar sesión'
    }
  }

  const onSubmit = async (data: LoginInput) => {
    try {
      setError(null)
      setLoading(true)

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push('/')
        router.refresh()
      }
    } catch {
      setError('Algo salió mal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link href="/auth/register" className="font-medium text-primary hover:text-primary-600">
              crear una cuenta
            </Link>
          </p>
        </div>
        <FormProvider {...methods}>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <CVEmail id="email" name="email" placeholder="Escribi tu correo" error={errors.email?.message} label="Correo electrónico" />
              </div>
              <div>
                <CVPassword id="password" name="password" placeholder="Contraseña" error={errors.password?.message} label="Contraseña" />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
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
                    <p className="text-sm text-destructive-700">{getErrorMessage(error)}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">¿No tienes una cuenta? </span>
              <Link href="/auth/register" className="font-medium text-primary-500 hover:text-primary-600">
                Regístrate aquí
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
