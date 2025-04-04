'use client'

import { cn } from '@/lib/utils'
import { Controller, useFormContext } from 'react-hook-form'

interface CVInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  name: string
}

export function CVInput({ className, error, label, name, ...props }: CVInputProps) {
  const { control } = useFormContext()

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
          <input
            className={cn(
              'appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
            {...field}
            {...props}
          />
          {error && <p className="mt-1 text-xs text-destructive-500">{error}</p>}
        </div>
      )}
    />
  )
}
