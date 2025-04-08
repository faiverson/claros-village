'use client'

import { cn } from '@/lib/utils'
import { Controller, useFormContext } from 'react-hook-form'
import { LucideIcon } from 'lucide-react'
import { Variant } from '@/utils/enums'

interface CVInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  name: string
  leftIcon?: LucideIcon
  variant?: Variant
}

export function CVInput({ className, error, label, name, leftIcon: LeftIcon, variant = Variant.PRIMARY, ...props }: CVInputProps) {
  const { control } = useFormContext()
  const currentVariant = error ? Variant.ERROR : variant

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative">
          {label && (
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
          )}
          <div className="relative group z-3">
            {LeftIcon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-3">
                <LeftIcon className={cn('h-4 w-4 transition-colors', `text-gray-400 group-focus-within:text-${currentVariant}-500`)} />
              </div>
            )}
            <input
              className={cn(
                'appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm bg-white border border-gray-300',
                `focus:ring-${currentVariant} focus:border-${currentVariant}`,
                error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                LeftIcon && 'pl-10',
                className
              )}
              {...field}
              {...props}
            />
          </div>
          {error && <p className="mt-1 text-xs text-destructive-500">{error}</p>}
        </div>
      )}
    />
  )
}
