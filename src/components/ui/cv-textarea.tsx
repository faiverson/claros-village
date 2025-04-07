'use client'

import { Textarea } from '@/components/ui/textarea'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface CVTextAreaProps {
  name: string
  placeholder?: string
  className?: string
  label?: string
}

export function CVTextArea({ name, placeholder, className, label }: CVTextAreaProps) {
  const { control } = useFormContext()

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Textarea {...field} placeholder={placeholder} className={cn('min-h-[100px]', className)} />}
      />
    </div>
  )
}
