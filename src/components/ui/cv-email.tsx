'use client'

import { Inbox } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'

interface CVEmailProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  name: string
}

export function CVEmail({ className, error, label, name, ...props }: CVEmailProps) {
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
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-3">
              <Inbox className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              className={cn(
                'appearance-none rounded-md relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-2 sm:text-sm bg-white',
                error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
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
