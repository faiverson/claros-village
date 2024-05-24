'use client'

import signUp from '@/app/actions/register'
import Alert from '@/app/components/base/Alert'
import Input from '@/app/components/base/Input'
import PasswordInput from '@/app/components/base/PasswordInput'
import { RegisterSchema } from '@/app/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from '@nextui-org/react'
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

  const t = useTranslations('RegisterForm')

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      role: Role.LANDLORD,
      password: '',
      password_confirm: '',
    },
  })

  console.log(errors)

  const [verified, setVerified] = useState<User>()

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    data,
    ev,
  ) => {
    ev?.preventDefault()

    startTransition(async () => {
      const response = await signUp(data)
      console.log(response)
      if (response.error) {
        if (
          response.key === 'user_exist' ||
          response.key === 'resident_not_found'
        ) {
          setError('email', { type: 'custom', message: t(response.key) })
        } else {
          // replace with toast
          setError('name', { type: 'custom', message: t('error') })
        }
      } else {
        setVerified(response.data)
      }
    })
  }

  const handleCloseConfirmation = () => {
    setVerified(undefined)
    router.push('/')
  }

  return (
    <form
      id="register-form"
      name="register-form"
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex w-1/2 flex-col justify-start space-y-1">
          <Alert type="error" message={errorMessage} show={!!errorMessage} />
        </div>
        <div className="flex flex-col gap-y-1">
          <h2 className="text-lg font-semibold">{t('welcome')}</h2>
          <h3 className="font-medium text-gray-600">
            {t('account')} <Link href="/login">{t('here')}</Link>
          </h3>
        </div>
        <div className="flex w-1/2 flex-col gap-y-3">
          <Input
            label="Nombre completo"
            placeholder="Introduce tu nombre completo"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            {...register('name', { required: true })}
          />
          <Input
            type="email"
            label={t('email')}
            placeholder={t('email_placeholder')}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email', { required: true })}
          />
          <PasswordInput
            label={t('password')}
            autoComplete="new-password"
            placeholder={t('password_placeholder')}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register('password', { required: true })}
          />
          <PasswordInput
            id="password_confirm"
            label={t('password_confirm')}
            autoComplete="confirm-password"
            placeholder={t('password_confirm_placeholder')}
            isInvalid={!!errors.password_confirm}
            errorMessage={errors.password_confirm?.message}
            {...register('password_confirm', { required: true })}
          />
          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup
                label={t('roleType')}
                orientation="horizontal"
                {...field}
              >
                <Radio value={Role.LANDLORD}>
                  {t(Role.LANDLORD.toLowerCase())}
                </Radio>
                <Radio value={Role.RENTER}>
                  {t(Role.RENTER.toLowerCase())}
                </Radio>
              </RadioGroup>
            )}
          />

          <div className="w-full text-right">
            <Button
              radius="sm"
              className="w-fit bg-main-green text-white"
              type="submit"
              disabled={isPending}
            >
              {t('btn_register')}
            </Button>
          </div>
        </div>
      </div>

      {!!verified && (
        <Modal
          backdrop="opaque"
          isOpen={!!verified}
          onClose={handleCloseConfirmation}
          classNames={{
            backdrop:
              'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Falta solo un poco!
                </ModalHeader>
                <ModalBody>
                  Revise su correo {verified.email} para finalizar su registro.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Ok
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </form>
  )
}
