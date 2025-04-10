'use client'

import { useState } from 'react'

import { Eye, EyeOff, Lock } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'

interface CVPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  name: string
}

export function CVPassword({ className, error, label, name, ...props }: CVPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
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
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              className={cn(
                'appearance-none rounded-md relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white',
                error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                className
              )}
              {...field}
              {...props}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {error && <p className="mt-1 text-xs text-destructive-500">{error}</p>}
        </div>
      )}
    />
  )
}
