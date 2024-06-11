'use client'

import serverLogin from '@/app/actions/login'
import Alert from '@/app/components/base/Alert'
import Input from '@/app/components/base/Input'
import PasswordInput from '@/app/components/base/PasswordInput'
import { LoginSchema } from '@/app/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function LoginForm() {
  const t = useTranslations('LoginForm')
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    data,
    ev,
  ) => {
    ev?.preventDefault()
    setErrorMessage('')
    startTransition(async () => {
      const response = await serverLogin(data)
      console.log('response', response)
      if (response.error) {
        setErrorMessage(t(response.key))
      } else {
        window.location.href = '/'
        // router.refresh()
      }
    })
  }

  return (
    <form
      id="login-form"
      name="login-form"
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex flex-col justify-start space-y-1 md:w-1/2">
          <h2 className="text-2xl font-semibold">{t('welcome')}</h2>
          <h3 className="font-medium text-gray-600">{t('start_session')}</h3>
          <h3 className="font-medium text-gray-600">
            {t('account')} <Link href="/register">{t('here')}</Link>
          </h3>
        </div>
        <div className="flex w-72 flex-col gap-y-3 md:w-1/2">
          <Input
            type="email"
            label={t('email')}
            autoComplete="email"
            placeholder={t('email_placeholder')}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email', { required: true })}
          />
          <PasswordInput
            label={t('password')}
            autoComplete="new-password"
            placeholder={t('password_placeholder')}
            {...register('password', { required: true })}
          />
          <div className="w-full text-right">
            <Button
              radius="sm"
              className="w-fit bg-main-green text-white"
              type="submit"
              disabled={isPending}
            >
              {t('btn_login')}
            </Button>
          </div>
          <div className="flex w-1/2 flex-col justify-start space-y-1">
            <Alert type="error" message={errorMessage} show={!!errorMessage} />
          </div>
        </div>
      </div>
    </form>
  )
}
