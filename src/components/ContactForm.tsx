'use client'

import { Button } from '@/components/ui/button'
import { CVInput } from '@/components/ui/cv-input'
import { CVTextArea } from '@/components/ui/cv-textarea'
import { CVPhone } from '@/components/ui/cv-phone'
import { CVEmail } from '@/components/ui/cv-email'
import { useForm, FormProvider } from 'react-hook-form'
import { submitContactForm } from '@/actions/contact'
import { useState } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  phone: z.string().min(1, 'El teléfono es requerido').min(10, 'El teléfono debe tener al menos 10 dígitos'),
  message: z.string().min(1, 'El mensaje es requerido').min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type FormData = z.infer<typeof contactSchema>

const defaultValues = {
  name: '',
  email: '',
  phone: '54', // Default country code for Argentina
  message: '',
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(contactSchema),
  })

  const resetForm = () => {
    methods.reset(defaultValues, {
      keepDefaultValues: true,
      keepIsSubmitted: false,
      keepTouched: false,
      keepDirty: false,
      keepErrors: false,
      keepIsValid: false,
    })
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const result = await submitContactForm(data)

      if (result.success) {
        resetForm()
        toast.success('¡Mensaje enviado con éxito!')
      } else {
        toast.error(result.error || 'Error al enviar el mensaje')
      }
    } catch {
      toast.error('Ha ocurrido un error inesperado')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
        <CVInput name="name" label="Nombre" placeholder="Tu nombre" error={methods.formState.errors.name?.message} />
        <CVEmail name="email" label="Email" placeholder="Tu email" error={methods.formState.errors.email?.message} />
        <CVPhone name="phone" label="Teléfono" error={methods.formState.errors.phone?.message} />
        <CVTextArea name="message" label="Mensaje" placeholder="Tu mensaje" error={methods.formState.errors.message?.message} />
        <div className="flex justify-end">
          <Button size="sm" className="w-1/3 bg-primary-500 text-white hover:bg-primary-500/80 text-xs h-8" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
