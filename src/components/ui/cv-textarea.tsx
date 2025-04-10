'use client'

import { Textarea } from '@/components/ui/textarea'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Variant } from '@/utils/enums'

interface CVTextAreaProps {
  name: string
  placeholder?: string
  className?: string
  label?: string
  error?: string
  variant?: Variant
}

export function CVTextArea({ name, placeholder, className, label, error, variant = Variant.PRIMARY }: CVTextAreaProps) {
  const { control } = useFormContext()
  const currentVariant = error ? Variant.ERROR : variant

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <Textarea
              {...field}
              placeholder={placeholder}
              className={cn(
                'min-h-[100px] border border-gray-300 focus:outline-none focus:ring-1',
                `focus:ring-${currentVariant} focus:border-${currentVariant}`,
                error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                className
              )}
            />
            {error && <p className="mt-1 text-xs text-destructive-500">{error}</p>}
          </div>
        )}
      />
    </div>
  )
}
