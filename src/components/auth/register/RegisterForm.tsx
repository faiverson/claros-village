'use client'

import signUp from '@/actions/register'
import Alert from '@/components/base/Alert'
import Input from '@/components/base/Input'
import PasswordInput from '@/app/components/base/PasswordInput'
import { RegisterSchema } from '@/app/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { Role, type User } from '@prisma/client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function RegisterForm() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const [isPending, startTransition] = useTransition()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [registeredUser, setRegisteredUser] = useState<User | null>(null)

  const t = useTranslations('RegisterForm')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: Role.RENTER,
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    data,
    ev,
  ) => {
    ev?.preventDefault()

    startTransition(async () => {
      try {
        const result = await signUp(data)

        if (!result.success) {
          if (result.error === 'user_exist') {
            setErrorMessage('El usuario ya existe')
          } else if (result.error === 'resident_not_found') {
            setErrorMessage('Residente no encontrado')
          } else {
            setErrorMessage('Error al registrar usuario')
          }
          return
        }

        setRegisteredUser(result.data)
        setShowConfirmation(true)
      } catch (error) {
        console.error('Registration error:', error)
        setErrorMessage('Error al registrar usuario')
      }
    })
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    router.push('/auth/signin')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {t('welcome')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('account')}{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-primary-500 hover:text-primary-500/80"
            >
              {t('here')}
            </Link>
          </p>
        </div>

        {errorMessage && (
          <Alert variant="error" message={errorMessage} />
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Input
                label={t('email')}
                placeholder={t('email_placeholder')}
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div>
              <PasswordInput
                label={t('password')}
                placeholder={t('password_placeholder')}
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <div>
              <PasswordInput
                label={t('password_confirm')}
                placeholder={t('password_confirm_placeholder')}
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <div className="mb-2">{t('roleType')}</div>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={Role.RENTER} id="renter" />
                      <label htmlFor="renter">{t('renter')}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={Role.LANDLORD} id="landlord" />
                      <label htmlFor="landlord">{t('landlord')}</label>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? 'Registrando...' : t('btn_register')}
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Falta solo un poco!</DialogTitle>
            <DialogDescription>
              Tu cuenta ha sido creada con éxito. Por favor, revisa tu correo electrónico para verificar tu cuenta.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseConfirmation}>
              Ir a iniciar sesión
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
